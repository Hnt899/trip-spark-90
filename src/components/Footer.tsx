import { Link } from "react-router-dom";
import { Train } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground">
                <Train className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-xl font-bold">GoTrip</span>
            </Link>

            <div className="space-y-2 text-sm">
              <p className="font-semibold">Поддержка</p>
              <p>+79853656924</p>
              <p>demyanovdi@mail.ru</p>
            </div>

            <div className="space-y-3">
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

          <div>
            <h3 className="font-semibold mb-4">Навигация</h3>
            <nav className="flex flex-col gap-3 text-sm">
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

        <div className="mt-12 pt-6 border-t border-background/20 text-center text-sm opacity-80">
          © 2025 GoTrip. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;