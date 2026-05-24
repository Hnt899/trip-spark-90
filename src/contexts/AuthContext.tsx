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

  const signIn = async (emailOrPhone: string) => {
    if (!emailOrPhone.includes("@")) {
      return {
        error: {
          message:
            "Вход по SMS отключён. Укажите email или используйте «Войти по паролю».",
        },
      };
    }

    const rateLimitCheck = await checkOTPRateLimit(emailOrPhone);
    if (!rateLimitCheck.allowed) {
      return {
        error: {
          message:
            rateLimitCheck.error || "Превышен лимит отправки кодов",
        },
      };
    }

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

    if (!emailOrPhone.includes("@")) {
      return {
        error: {
          message: "Вход по SMS отключён. Используйте email.",
        },
        user: undefined,
      };
    }

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

    if (!emailOrPhone.includes("@")) {
      return {
        error: {
          message: "Вход по номеру телефона отключён. Используйте email.",
        },
      };
    }

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
      return await finishLogin({ email: emailOrPhone.trim().toLowerCase() });
    } catch (e: unknown) {
      const err = e as Error;
      await logger.logLoginAttempt(emailOrPhone, false, undefined);
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
