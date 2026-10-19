import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { signInWithPassword } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Ошибка",
        description: "Введите email и пароль",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error, requires2FA, userEmail } = await signInWithPassword(email, password);
    setLoading(false);

    if (error) {
      toast({
        title: "Ошибка",
        description: error.message || "Неверный email или пароль",
        variant: "destructive",
      });
      return;
    }

    if (requires2FA && userEmail) {
      toast({
        title: "Требуется 2FA",
        description: "Код подтверждения отправлен на вашу почту",
      });
      // TODO: переход на ввод 2FA-кода
      return;
    }

    toast({ title: "Успешно", description: "Вы вошли" });
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-24 pb-20 md:pt-32">
        <div className="max-w-md mx-auto">
          <h1 className="heading-gradient text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Вход
          </h1>
          <p className="text-base text-muted-foreground mb-8">
            Введите email и пароль
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Вход…
                </>
              ) : (
                "Войти"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              ← На главную
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;