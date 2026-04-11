import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { apiFetch } from "@/lib/api";
import { logger } from "@/lib/logger";
import type { AppUser, AppSession } from "@/types/appSession";
import {
  checkOTPRateLimit,
  checkLoginRateLimit,
  checkOTPVerifyRateLimit,
  checkPasswordUpdateRateLimit,
  resetRateLimit,
} from "@/lib/rateLimit";

interface AuthContextType {
  user: AppUser | null;
  session: AppSession | null;
  loading: boolean;
  signIn: (emailOrPhone: string) => Promise<{ error: unknown }>;
  verifyOTP: (
    emailOrPhone: string,
    token: string,
    isRegistration: boolean
  ) => Promise<{ error: unknown; user?: AppUser }>;
  signOut: () => Promise<void>;
  updatePassword: (newPassword: string) => Promise<{ error: unknown }>;
  signInWithPassword: (
    emailOrPhone: string,
    password: string
  ) => Promise<{
    error: unknown;
    requires2FA?: boolean;
    userEmail?: string;
  }>;
  verify2FACode: (email: string, code: string) => Promise<{ error: unknown }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

const TOKEN_COOKIE = "access_token";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<AppSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Cookies.remove("sb_session");
    Cookies.remove("sb_refresh_token");

    const token = Cookies.get(TOKEN_COOKIE);
    if (!token) {
      setLoading(false);
      return;
    }

    apiFetch<{ user: AppUser; access_token?: string }>("/api/auth/session")
      .then((data) => {
        setUser(data.user);
        setSession({
          access_token: token,
          user: data.user,
        });
        logger.logInfo("Session restored", data.user.id);
      })
      .catch(() => {
        Cookies.remove(TOKEN_COOKIE);
        setUser(null);
        setSession(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const normalizePhoneForSMS = (phone: string): string => {
    const digits = phone.replace(/\D/g, "");
    if (digits.startsWith("8")) {
      return "+7" + digits.substring(1);
    } else if (digits.startsWith("7")) {
      return "+" + digits;
    }
    return "+7" + digits;
  };

  const signIn = async (emailOrPhone: string) => {
    const rateLimitCheck = await checkOTPRateLimit(emailOrPhone);
    if (!rateLimitCheck.allowed) {
      return {
        error: {
          message:
            rateLimitCheck.error || "Превышен лимит отправки кодов",
        },
      };
    }

    const isEmail = emailOrPhone.includes("@");

    if (isEmail) {
      try {
        await apiFetch("/api/auth/email/send-otp", {
          method: "POST",
          body: JSON.stringify({ email: emailOrPhone }),
        });
        await logger.logSecurityEvent("Email OTP sent", undefined, {
          emailOrPhone: emailOrPhone.replace(/(.{2})(.*)(.{2})/, "$1***$3"),
        });
        return { error: null };
      } catch (e: unknown) {
        const err = e as Error;
        await logger.logError(err, undefined, {
          action: "send_email_otp",
          emailOrPhone: emailOrPhone.replace(/(.{2})(.*)(.{2})/, "$1***$3"),
        });
        return { error: { message: err.message } };
      }
    }

    const normalizedPhone = normalizePhoneForSMS(emailOrPhone);
    try {
      await apiFetch<{ success: boolean; error?: string }>(
        "/api/auth/sms/send",
        {
          method: "POST",
          body: JSON.stringify({ phone: normalizedPhone }),
        }
      );
      await logger.logSecurityEvent("SMS OTP sent", undefined, {
        phone: normalizedPhone.replace(/(.{3})(.*)(.{2})/, "$1***$3"),
      });
      return { error: null };
    } catch (e: unknown) {
      const err = e as Error;
      await logger.logError(err, undefined, { action: "call_sms_function" });
      return { error: { message: err.message || "Ошибка при отправке SMS" } };
    }
  };

  const verifyOTP = async (
    emailOrPhone: string,
    token: string,
    isRegistration: boolean
  ) => {
    const rateLimitCheck = await checkOTPVerifyRateLimit(emailOrPhone);
    if (!rateLimitCheck.allowed) {
      return {
        error: {
          message:
            rateLimitCheck.error || "Превышен лимит попыток верификации",
        },
        user: undefined,
      };
    }

    const isEmail = emailOrPhone.includes("@");

    if (isEmail) {
      try {
        const data = await apiFetch<{
          user: AppUser;
          access_token: string;
        }>("/api/auth/email/verify-otp", {
          method: "POST",
          body: JSON.stringify({
            email: emailOrPhone,
            token,
            isRegistration,
          }),
        });

        let u = data.user;
        if (!u.user_metadata?.has_password) {
          const autoPassword =
            Math.random().toString(36).slice(-12) +
            Math.random().toString(36).slice(-12);
          try {
            await apiFetch("/api/auth/me", {
              method: "PATCH",
              body: JSON.stringify({
                password: autoPassword,
                user_metadata: {
                  has_password: false,
                  auto_password: autoPassword,
                },
              }),
              headers: {
                Authorization: `Bearer ${data.access_token}`,
              },
            });
            const sess = await apiFetch<{ user: AppUser }>("/api/auth/session", {
              headers: { Authorization: `Bearer ${data.access_token}` },
            });
            u = sess.user;
          } catch {
            /* ignore */
          }
        }

        Cookies.set(TOKEN_COOKIE, data.access_token, { expires: 30 });
        setSession({ access_token: data.access_token, user: u });
        setUser(u);
        resetRateLimit(`otp_verify:${emailOrPhone}`);
        resetRateLimit(`otp:${emailOrPhone}`);
        await logger.logLoginAttempt(emailOrPhone, true, u.id);
        return { error: null, user: u };
      } catch (e: unknown) {
        const err = e as Error;
        await logger.logLoginAttempt(emailOrPhone, false, undefined);
        return { error: { message: err.message }, user: undefined };
      }
    }

    const normalizedPhone = normalizePhoneForSMS(emailOrPhone);
    try {
      const data = await apiFetch<{ user: AppUser; access_token: string }>(
        "/api/auth/sms/verify",
        {
          method: "POST",
          body: JSON.stringify({
            phone: normalizedPhone,
            token,
            isRegistration,
          }),
        }
      );

      Cookies.set(TOKEN_COOKIE, data.access_token, { expires: 30 });
      setSession({ access_token: data.access_token, user: data.user });
      setUser(data.user);
      resetRateLimit(`otp_verify:${emailOrPhone}`);
      resetRateLimit(`otp:${emailOrPhone}`);
      await logger.logLoginAttempt(normalizedPhone, true, data.user.id);
      return { error: null, user: data.user };
    } catch (e: unknown) {
      const err = e as Error & { data?: { code?: string } };
      if (err.data && (err.data as { code?: string }).code === "PHONE_NOT_REGISTERED") {
        await logger.logLoginAttempt(normalizedPhone, false, undefined);
        return {
          error: {
            message:
              "Неверный код подтверждения или номер не зарегистрирован",
          },
          user: undefined,
        };
      }
      await logger.logLoginAttempt(normalizedPhone, false, undefined);
      return {
        error: { message: err.message || "Ошибка верификации" },
        user: undefined,
      };
    }
  };

  const normalizePhone = (phone: string): string[] => {
    const digits = phone.replace(/\D/g, "");
    const variants: string[] = [];
    if (digits.startsWith("8")) {
      const with7 = "7" + digits.substring(1);
      variants.push("+" + with7);
      variants.push(with7);
      variants.push("8" + digits.substring(1));
    } else if (digits.startsWith("7")) {
      variants.push("+" + digits);
      variants.push(digits);
      variants.push("8" + digits.substring(1));
    } else {
      variants.push("+7" + digits);
      variants.push("7" + digits);
      variants.push("8" + digits);
      variants.push(digits);
    }
    return [...new Set(variants)];
  };

  const signInWithPassword = async (emailOrPhone: string, password: string) => {
    const rateLimitCheck = await checkLoginRateLimit(emailOrPhone);
    if (!rateLimitCheck.allowed) {
      return {
        error: {
          message: rateLimitCheck.error || "Превышен лимит попыток входа",
        },
      };
    }

    const isEmail = emailOrPhone.includes("@");

    const finishLogin = async (body: Record<string, string>) => {
      const json = await apiFetch<{
        user?: AppUser;
        access_token?: string;
        requires2FA?: boolean;
        preAuthToken?: string;
        userEmail?: string;
      }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ password, ...body }),
      });

      if (json.requires2FA && json.preAuthToken) {
        sessionStorage.setItem("pre2fa_token", json.preAuthToken);
        try {
          await apiFetch("/api/auth/2fa-login/send-email", {
            method: "POST",
            headers: { Authorization: `Bearer ${json.preAuthToken}` },
          });
        } catch (e) {
          console.error("2FA send email", e);
        }
        await logger.logSecurityEvent(
          "2FA code sent for login",
          undefined,
          { email: json.userEmail }
        );
        return {
          error: null,
          requires2FA: true,
          userEmail: json.userEmail,
        };
      }

      if (json.access_token && json.user) {
        Cookies.set(TOKEN_COOKIE, json.access_token, { expires: 30 });
        setSession({ access_token: json.access_token, user: json.user });
        setUser(json.user);
        resetRateLimit(`login:${emailOrPhone}`);
        await logger.logLoginAttempt(emailOrPhone, true, json.user.id);
        return { error: null };
      }

      return { error: { message: "Неверный ответ сервера" } };
    };

    try {
      if (isEmail) {
        return await finishLogin({ email: emailOrPhone.trim().toLowerCase() });
      }

      const phoneVariants = normalizePhone(emailOrPhone);
      for (const phoneVariant of phoneVariants) {
        const profile = await apiFetch<{
          email?: string;
          user_id?: string;
          phone?: string;
        } | null>(
          `/api/auth/public/profile-by-phone?phone=${encodeURIComponent(phoneVariant)}`
        );
        if (profile?.email) {
          return await finishLogin({ email: profile.email.trim().toLowerCase() });
        }
      }

      const digitsOnly = emailOrPhone.replace(/\D/g, "");
      if (digitsOnly.length >= 10) {
        const last10 = digitsOnly.slice(-10);
        const { matches } = await apiFetch<{ matches: Array<{ email: string }> }>(
          "/api/auth/match-profiles-last10",
          { method: "POST", body: JSON.stringify({ last10 }) }
        );
        if (matches?.length && matches[0].email) {
          return await finishLogin({
            email: matches[0].email.trim().toLowerCase(),
          });
        }
      }

      for (const phoneVariant of phoneVariants) {
        const digitsOnlyV = phoneVariant.replace(/\D/g, "");
        const tempEmail = digitsOnlyV + "@temp.com";
        try {
          await finishLogin({ email: tempEmail, password });
          return { error: null };
        } catch {
          /* try next */
        }
      }

      await logger.logLoginAttempt(emailOrPhone, false, undefined);
      return {
        error: {
          message:
            "Неверный номер телефона или пароль. Если вы регистрировались через email, используйте email для входа. Если номер не привязан, добавьте его в личном кабинете.",
        },
      };
    } catch (e: unknown) {
      const err = e as Error;
      await logger.logLoginAttempt(emailOrPhone, false, undefined);
      await logger.logError(err, undefined, {
        action: "sign_in_with_password",
        method: isEmail ? "email" : "phone",
      });
      return { error: { message: err.message || "Ошибка входа" } };
    }
  };

  const updatePassword = async (newPassword: string) => {
    if (user?.id) {
      const rateLimitCheck = await checkPasswordUpdateRateLimit(user.id);
      if (!rateLimitCheck.allowed) {
        return {
          error: {
            message:
              rateLimitCheck.error || "Превышен лимит попыток смены пароля",
          },
        };
      }
    }

    try {
      await apiFetch("/api/auth/me", {
        method: "PATCH",
        body: JSON.stringify({
          password: newPassword,
          user_metadata: { has_password: true },
        }),
      });
      const token = Cookies.get(TOKEN_COOKIE);
      if (token) {
        const sess = await apiFetch<{ user: AppUser }>("/api/auth/session");
        setUser(sess.user);
        setSession((s) =>
          s ? { ...s, user: sess.user } : { access_token: token, user: sess.user }
        );
      }
      await logger.logSecurityEvent("Password updated", user?.id);
      if (user?.id) resetRateLimit(`password_update:${user.id}`);
      return { error: null };
    } catch (e: unknown) {
      const err = e as Error;
      await logger.logError(err, user?.id, { action: "update_password" });
      return { error: { message: err.message } };
    }
  };

  const verify2FACode = async (_email: string, code: string) => {
    const pre = sessionStorage.getItem("pre2fa_token");
    if (!pre) {
      return { error: { message: "Сессия 2FA истекла. Войдите снова." } };
    }
    try {
      const data = await apiFetch<{ user: AppUser; access_token: string }>(
        "/api/auth/2fa-login/verify",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${pre}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        }
      );
      sessionStorage.removeItem("pre2fa_token");
      Cookies.set(TOKEN_COOKIE, data.access_token, { expires: 30 });
      setSession({ access_token: data.access_token, user: data.user });
      setUser(data.user);
      await logger.logSecurityEvent(
        "2FA verified, login successful",
        data.user.id
      );
      return { error: null };
    } catch (e: unknown) {
      const err = e as Error;
      await logger.logError(err, undefined, { action: "verify_2fa_code" });
      return { error: { message: err.message } };
    }
  };

  const signOut = async () => {
    const userId = user?.id;
    Cookies.remove(TOKEN_COOKIE);
    sessionStorage.removeItem("pre2fa_token");
    setUser(null);
    setSession(null);
    await logger.logSecurityEvent("User signed out", userId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        verifyOTP,
        signOut,
        updatePassword,
        signInWithPassword,
        verify2FACode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
