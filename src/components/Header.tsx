import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import NavDropdown from "@/components/NavDropdown";
import { popularRoutes, faqTopics, guidesList } from "@/data/navLinks";
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

          {/* Десктоп навигация */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-lg font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-foreground"}`}
            >
              Главная
            </Link>
            <NavDropdown 
              label="Маршруты" 
              items={popularRoutes}
              href="/routes"
              isActive={isActive("/routes") || location.pathname.startsWith("/routes/")}
            />
            <NavDropdown 
              label="Справочная" 
              items={faqTopics}
              href="/reference"
              isActive={isActive("/reference") || location.pathname.startsWith("/reference/")}
            />
            <Link 
              to="/blog" 
              className={`text-lg font-medium transition-colors hover:text-primary ${isActive("/blog") ? "text-primary" : "text-foreground"}`}
            >
              Блог
            </Link>
            <NavDropdown 
              label="Путеводитель" 
              items={guidesList}
              href="/guide"
              isActive={isActive("/guide") || location.pathname.startsWith("/guide/")}
            />
          </nav>

          {/* Мобильная навигация */}
          <nav className="flex md:hidden items-center gap-4">
            <Link 
              to="/" 
              className={`text-base font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-foreground"}`}
            >
              Главная
            </Link>
            <NavDropdown 
              label="Маршруты" 
              items={popularRoutes}
              href="/routes"
              isActive={isActive("/routes") || location.pathname.startsWith("/routes/")}
            />
            <NavDropdown 
              label="Справочная" 
              items={faqTopics}
              href="/reference"
              isActive={isActive("/reference") || location.pathname.startsWith("/reference/")}
            />
            <Link 
              to="/blog" 
              className={`text-base font-medium transition-colors hover:text-primary ${isActive("/blog") ? "text-primary" : "text-foreground"}`}
            >
              Блог
            </Link>
            <NavDropdown 
              label="Путеводитель" 
              items={guidesList}
              href="/guide"
              isActive={isActive("/guide") || location.pathname.startsWith("/guide/")}
            />
          </nav>

          {user ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="text-lg">
                <Link to="/profile">Личный кабинет</Link>
              </Button>
              <Button onClick={handleSignOut} variant="ghost" className="text-lg">
                Выйти
              </Button>
            </div>
          ) : (
            <Button onClick={() => setAuthModalOpen(true)} variant="outline" className="text-lg">
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