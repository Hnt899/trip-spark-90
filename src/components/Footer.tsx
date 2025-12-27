import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoWhiteImage from "@/assets/logo w.png";
import { MessageCircle, Mail, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#0B0F26] text-white relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container relative z-10 py-16 md:py-20">
        {/* Основной контент */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Колонка 1: Логотип и описание */}
          <div className="lg:col-span-1 space-y-6">
            <Link 
              to="/" 
              onClick={handleLogoClick}
              className="inline-block relative hover:opacity-90 transition-opacity"
            >
              <img 
                src={logoWhiteImage} 
                alt="TudaSuda" 
                className="h-20 md:h-24 w-auto object-contain relative z-10"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Сервис для поиска и бронирования билетов на поезда, самолёты и автобусы по всей России.
            </p>
            {/* CTA кнопка */}
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/" className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Нужна помощь?
              </Link>
            </Button>
          </div>

          {/* Колонка 2: Навигация */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-6">Навигация</h3>
            <nav className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm"
              >
                Главная
              </Link>
              <Link 
                to="/routes" 
                className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm"
              >
                Маршруты
              </Link>
              <Link 
                to="/reference" 
                className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm"
              >
                Справочная
              </Link>
              <Link 
                to="/blog" 
                className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm"
              >
                Блог
              </Link>
              <Link 
                to="/guide" 
                className="text-muted-foreground hover:text-white transition-colors duration-200 text-sm"
              >
                Путеводитель
              </Link>
            </nav>
          </div>

          {/* Колонка 3: Поддержка */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-6">Поддержка</h3>
            <div className="flex flex-col gap-4">
              <a 
                href="tel:+79853656924" 
                className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors duration-200 text-sm group"
              >
                <Phone className="w-4 h-4 group-hover:text-primary transition-colors" />
                <span>+7 (985) 365-69-24</span>
              </a>
              <a 
                href="mailto:demyanovdi@mail.ru" 
                className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors duration-200 text-sm group"
              >
                <Mail className="w-4 h-4 group-hover:text-primary transition-colors" />
                <span>demyanovdi@mail.ru</span>
              </a>
            </div>
          </div>

          {/* Колонка 4: Подписка */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-6">Подписка на новости</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Получайте актуальные предложения и специальные акции на почту
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input 
                type="email" 
                placeholder="Ваш email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/15 focus:border-primary h-12"
                required
              />
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-semibold h-12 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isSubscribed ? (
                  <>
                    <span>Подписка оформлена!</span>
                  </>
                ) : (
                  <>
                    Подписаться
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Разделительная линия */}
        <div className="border-t border-white/10 my-12"></div>

        {/* Нижняя часть */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm">
            © 2025 TudaSuda. Все права защищены.
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <Link 
              to="/reference" 
              className="text-muted-foreground hover:text-white transition-colors duration-200"
            >
              Политика конфиденциальности
            </Link>
            <Link 
              to="/reference" 
              className="text-muted-foreground hover:text-white transition-colors duration-200"
            >
              Условия использования
            </Link>
            <Link 
              to="/reference" 
              className="text-muted-foreground hover:text-white transition-colors duration-200"
            >
              Оферта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
