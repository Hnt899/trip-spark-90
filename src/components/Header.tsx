import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Train } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary">
              <Train className="w-5 h-5 text-secondary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">GoTrip</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-foreground"}`}
            >
              Главная
            </Link>
            <Link 
              to="/routes" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/routes") ? "text-primary" : "text-foreground"}`}
            >
              Маршруты
            </Link>
            <Link 
              to="/reference" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/reference") ? "text-primary" : "text-foreground"}`}
            >
              Справочная
            </Link>
            <Link 
              to="/blog" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/blog") ? "text-primary" : "text-foreground"}`}
            >
              Блог
            </Link>
            <Link 
              to="/guide" 
              className={`text-sm font-medium transition-colors hover:text-primary ${isActive("/guide") ? "text-primary" : "text-foreground"}`}
            >
              Путеводитель
            </Link>
          </nav>

          {user ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="outline">
                <Link to="/profile">Личный кабинет</Link>
              </Button>
              <Button onClick={handleSignOut} variant="ghost" size="sm">
                Выйти
              </Button>
            </div>
          ) : (
            <Button onClick={() => setAuthModalOpen(true)} variant="outline">
              Войти / Регистрация
            </Button>
          )}
        </div>
      </header>
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
};

export default Header;