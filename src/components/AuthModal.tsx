import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [step, setStep] = useState<"input" | "otp" | "password" | "2fa">("input");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isRegistration, setIsRegistration] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmailFor2FA, setUserEmailFor2FA] = useState("");
  const { signIn, verifyOTP, signInWithPassword, verify2FACode } = useAuth();
  const { toast } = useToast();

  const handleSubmitEmail = async () => {
    const email = emailOrPhone.trim();
    if (!email) {
      toast({
        title: "Ошибка",
        description: "Введите email",
        variant: "destructive",
      });
      return;
    }
    if (!email.includes("@")) {
      toast({
        title: "Ошибка",
        description: "Вход по SMS отключён. Укажите корректный email.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await signIn(email);
    setLoading(false);

    if (error) {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось отправить код",
        variant: "destructive",
      });
    } else {
      setStep("otp");
      toast({
        title: "Код отправлен",
        description: "Проверьте вашу почту",
      });
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Ошибка",
        description: "Введите полный код из 6 цифр",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error, user } = await verifyOTP(emailOrPhone, otp, isRegistration);
    setLoading(false);

    if (error) {
      toast({
        title: "Ошибка",
        description: error.message || "Неверный код",
        variant: "destructive",
      });
    } else {
      onOpenChange(false);
      setStep("input");
      setEmailOrPhone("");
      setOtp("");
      toast({
        title: "Успешно",
        description: isRegistration 
          ? "Регистрация завершена. Вы можете установить пароль в личном кабинете" 
          : "Вход выполнен",
      });
    }
  };


  const handleBackToLogin = () => {
    setStep("input");
    setOtp("");
  };

  const handlePasswordLogin = async () => {
    const email = emailOrPhone.trim();
    if (!email || !password) {
      toast({
        title: "Ошибка",
        description: "Введите email и пароль",
        variant: "destructive",
      });
      return;
    }
    if (!email.includes("@")) {
      toast({
        title: "Ошибка",
        description: "Вход по номеру телефона отключён. Используйте email.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error, requires2FA, userEmail } = await signInWithPassword(emailOrPhone, password);
    setLoading(false);

    if (error) {
      toast({
        title: "Ошибка",
        description: error.message || "Неверный email или пароль",
        variant: "destructive",
      });
    } else if (requires2FA && userEmail) {
      // Требуется 2FA - переходим на шаг ввода кода
      setUserEmailFor2FA(userEmail);
      setStep("2fa");
      toast({
        title: "Код отправлен",
        description: "Мы отправили код подтверждения на вашу почту",
      });
    } else {
      onOpenChange(false);
      setStep("input");
      setEmailOrPhone("");
      setPassword("");
      toast({
        title: "Успешно",
        description: "Вход выполнен",
      });
    }
  };

  const handleVerify2FA = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Ошибка",
        description: "Введите полный код из 6 цифр",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await verify2FACode(userEmailFor2FA, otp);
    setLoading(false);

    if (error) {
      toast({
        title: "Ошибка",
        description: error.message || "Неверный код",
        variant: "destructive",
      });
    } else {
      onOpenChange(false);
      setStep("input");
      setEmailOrPhone("");
      setPassword("");
      setOtp("");
      setUserEmailFor2FA("");
      toast({
        title: "Успешно",
        description: "Вход выполнен",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {step === "input" && "Вход / Регистрация"}
            {step === "otp" && "Введите код"}
            {step === "password" && "Вход по паролю"}
            {step === "2fa" && "Двухфакторная аутентификация"}
          </DialogTitle>
          <DialogDescription>
            {step === "input" && "Введите email для входа или регистрации"}
            {step === "otp" && "Мы отправили код на вашу почту"}
            {step === "password" && "Введите email и пароль для входа"}
            {step === "2fa" && "Мы отправили код подтверждения на вашу почту"}
          </DialogDescription>
        </DialogHeader>

        {step === "input" && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="emailOrPhone">Email</Label>
              <Input
                id="emailOrPhone"
                type="email"
                placeholder="example@mail.com"
                autoComplete="email"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitEmail();
                  }
                }}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setIsRegistration(false);
                  handleSubmitEmail();
                }}
                disabled={loading}
                className="flex-1"
              >
                Войти
              </Button>
              <Button
                onClick={() => {
                  setIsRegistration(true);
                  handleSubmitEmail();
                }}
                disabled={loading}
                variant="outline"
                className="flex-1"
              >
                Зарегистрироваться
              </Button>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <span>или</span>
            </div>
            <Button
              onClick={() => {
                setStep("password");
              }}
              variant="outline"
              className="w-full"
            >
              Войти по паролю
            </Button>
          </div>
        )}

        {step === "password" && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="emailOrPhonePass">Email</Label>
              <Input
                id="emailOrPhonePass"
                type="email"
                placeholder="example@mail.com"
                autoComplete="email"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handlePasswordLogin();
                  }
                }}
              />
            </div>
            <Button onClick={handlePasswordLogin} disabled={loading} className="w-full">
              Войти
            </Button>
            <Button onClick={handleBackToLogin} variant="ghost" className="w-full">
              Назад
            </Button>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button
              onClick={handleVerifyOTP}
              disabled={loading || otp.length !== 6}
              className="w-full"
            >
              Подтвердить
            </Button>
            <Button onClick={handleBackToLogin} variant="ghost" className="w-full">
              Назад
            </Button>
          </div>
        )}

        {step === "2fa" && (
          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button
              onClick={handleVerify2FA}
              disabled={loading || otp.length !== 6}
              className="w-full"
            >
              Подтвердить
            </Button>
            <Button 
              onClick={() => {
                setStep("password");
                setOtp("");
              }} 
              variant="ghost" 
              className="w-full"
            >
              Назад
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;

