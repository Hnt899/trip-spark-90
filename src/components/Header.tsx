import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import logoImage from "@/assets/logo.png";

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
        <div className="container flex h-36 items-center justify-between">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src={logoImage} 
              alt="TudaSuda" 
              className="h-20 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-base font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-foreground"}`}
            >
              Главная
            </Link>
            <Link 
              to="/routes" 
              className={`text-base font-medium transition-colors hover:text-primary ${isActive("/routes") ? "text-primary" : "text-foreground"}`}
            >
              Маршруты
            </Link>
            <Link 
              to="/reference" 
              className={`text-base font-medium transition-colors hover:text-primary ${isActive("/reference") ? "text-primary" : "text-foreground"}`}
            >
              Справочная
            </Link>
            <Link 
              to="/blog" 
              className={`text-base font-medium transition-colors hover:text-primary ${isActive("/blog") ? "text-primary" : "text-foreground"}`}
            >
              Блог
            </Link>
            <Link 
              to="/guide" 
              className={`text-base font-medium transition-colors hover:text-primary ${isActive("/guide") ? "text-primary" : "text-foreground"}`}
            >
              Путеводитель
            </Link>
          </nav>

          {user ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="text-base">
                <Link to="/profile">Личный кабинет</Link>
              </Button>
              <Button onClick={handleSignOut} variant="ghost" className="text-base">
                Выйти
              </Button>
            </div>
          ) : (
            <Button onClick={() => setAuthModalOpen(true)} variant="outline" className="text-base">
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