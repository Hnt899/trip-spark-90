import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoImage from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          <div className="space-y-2 text-sm">
            <p className="font-semibold">Поддержка</p>
            <p>+79853656924</p>
            <p>demyanovdi@mail.ru</p>
            <div className="space-y-3 pt-2">
              <p className="font-semibold text-sm">Подписка на новости</p>
              <form className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Ваш email" 
                  className="bg-background/10 border-background/20 text-secondary-foreground placeholder:text-secondary-foreground/60"
                />
                <Button type="submit" variant="default">
                  Подписаться
                </Button>
              </form>
            </div>
          </div>
          <div className="text-center md:-ml-[500px]">
            <h3 className="font-semibold text-sm mb-4">Навигация</h3>
            <nav className="flex flex-col items-center gap-3 text-sm">
              <Link to="/" className="hover:text-primary transition-colors">
                Главная
              </Link>
              <Link to="/routes" className="hover:text-primary transition-colors">
                Маршруты
              </Link>
              <Link to="/reference" className="hover:text-primary transition-colors">
                Справочная
              </Link>
              <Link to="/blog" className="hover:text-primary transition-colors">
                Блог
              </Link>
              <Link to="/guide" className="hover:text-primary transition-colors">
                Путеводитель
              </Link>
            </nav>
          </div>
        </div>
        <div className="absolute right-20 top-1 bottom-12 flex items-center justify-end pr-12">
          <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
            <img 
              src={logoImage} 
              alt="TudaSuda" 
              className="h-32 md:h-40 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="mt-12 pt-6 border-t border-background/20 text-center text-sm opacity-80">
          © 2025 TudaSuda. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;