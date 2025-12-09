import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import NavDropdown from "@/components/NavDropdown";
import { popularRoutes, faqTopics, guidesList } from "@/data/navLinks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Train, Plane, Bus, User, Search } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { cities } from "@/data/cities";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo.png";
import logoWhiteImage from "@/assets/logo w.png";

type TravelType = "train" | "flight" | "bus";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [travelType, setTravelType] = useState<TravelType>("train");
  const [fromCity, setFromCity] = useState<string | undefined>();
  const [toCity, setToCity] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showStickySearch, setShowStickySearch] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isHeroMode, setIsHeroMode] = useState(true);

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === "/";

  // Отслеживание скролла для показа формы поиска и изменения стиля шапки
  useEffect(() => {
    if (!isHomePage) {
      setShowStickySearch(false);
      setIsAnimatingOut(false);
      setIsHeroMode(false);
      return;
    }

    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section");
      const featuresSection = document.getElementById("features-section");
      
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const heroBottom = heroRect.bottom;
        const shouldShow = heroBottom < 100;
        
        if (shouldShow && !showStickySearch) {
          // Показываем форму
          setIsAnimatingOut(false);
          setShowStickySearch(true);
        } else if (!shouldShow && showStickySearch) {
          // Начинаем анимацию исчезновения
          setIsAnimatingOut(true);
          // Убираем форму после завершения анимации
          setTimeout(() => {
            setShowStickySearch(false);
            setIsAnimatingOut(false);
          }, 300);
        }
      }

      // Проверяем, находимся ли мы на hero секции или уже перешли к FeaturesSection
      if (heroSection && featuresSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const featuresRect = featuresSection.getBoundingClientRect();
        const headerHeight = 96; // h-24 = 96px
        
        // Белое лого показываем, если:
        // 1. Hero секция еще видна (нижняя граница hero > 0)
        // 2. И FeaturesSection еще не достигнут (верх FeaturesSection > headerHeight)
        const isHeroVisible = heroRect.bottom > 0;
        const isFeaturesReached = featuresRect.top <= headerHeight;
        
        // Белое лого пока hero виден и FeaturesSection еще не достигнут
        setIsHeroMode(isHeroVisible && !isFeaturesReached);
      } else if (heroSection) {
        // Если FeaturesSection не найден, проверяем только Hero
        const heroRect = heroSection.getBoundingClientRect();
        setIsHeroMode(heroRect.bottom > 0);
      } else {
        setIsHeroMode(false);
      }
    };

    // Проверяем при монтировании
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHomePage, showStickySearch]);

  const handleSearch = () => {
    if (!fromCity || !toCity || !dateRange?.from) {
      return;
    }
    const params = new URLSearchParams({
      from: fromCity,
      to: toCity,
      date: format(dateRange.from, "yyyy-MM-dd"),
      passengers: "1"
    });
    // Добавляем дату возврата, если она выбрана
    if (dateRange?.to) {
      params.set("returnDate", format(dateRange.to, "yyyy-MM-dd"));
    }
    if (travelType === "train") {
      navigate(`/train-search?${params.toString()}`);
    } else if (travelType === "flight") {
      params.set("class", "economy");
      navigate(`/flight-search?${params.toString()}`);
    } else if (travelType === "bus") {
      navigate(`/bus-search?${params.toString()}`);
    }
  };

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isHomePage && isHeroMode
          ? "bg-transparent border-b border-white/20 backdrop-blur-md" 
          : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
      )}>
        <div className="container">
          {/* Верхняя часть шапки: лого, навигация, вход */}
          <div className="flex h-24 items-center justify-between gap-4">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity shrink-0">
              <img 
                src={isHomePage && isHeroMode ? logoWhiteImage : logoImage} 
                alt="TudaSuda" 
                className={cn(
                  "h-[84px] w-auto object-contain transition-all duration-300",
                  isHomePage && isHeroMode 
                    ? "drop-shadow-lg brightness-110" 
                    : "drop-shadow-sm brightness-110"
                )}
              />
            </Link>

            {/* Десктоп навигация */}
            <nav className="hidden lg:flex items-center gap-4 flex-1 justify-center">
              <Link 
                to="/" 
                className={cn(
                  "text-lg font-medium transition-colors px-3 py-2 rounded-md",
                  isActive("/") 
                    ? isHomePage && isHeroMode 
                      ? "text-white bg-white/20" 
                      : "text-primary bg-primary/10"
                    : isHomePage && isHeroMode
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-foreground/80 hover:text-primary hover:bg-muted/50"
                )}
              >
                Главная
              </Link>
              <NavDropdown 
                label="Маршруты" 
                items={popularRoutes}
                href="/routes"
                isActive={isActive("/routes") || location.pathname.startsWith("/routes/")}
                isHomePage={isHomePage && isHeroMode}
              />
              <NavDropdown 
                label="Справочная" 
                items={faqTopics}
                href="/reference"
                isActive={isActive("/reference") || location.pathname.startsWith("/reference/")}
                isHomePage={isHomePage && isHeroMode}
              />
              <Link 
                to="/blog" 
                className={cn(
                  "text-lg font-medium transition-colors px-3 py-2 rounded-md",
                  isActive("/blog") 
                    ? isHomePage && isHeroMode 
                      ? "text-white bg-white/20" 
                      : "text-primary bg-primary/10"
                    : isHomePage && isHeroMode
                      ? "text-white/90 hover:text-white hover:bg-white/10"
                      : "text-foreground/80 hover:text-primary hover:bg-muted/50"
                )}
              >
                Блог
              </Link>
              <NavDropdown 
                label="Путеводитель" 
                items={guidesList}
                href="/guide"
                isActive={isActive("/guide") || location.pathname.startsWith("/guide/")}
                isHomePage={isHomePage && isHeroMode}
              />
            </nav>

            {/* Кнопка входа/профиль */}
            <div className="flex items-center gap-2 shrink-0">
              {user ? (
                <Button 
                  asChild 
                  variant="ghost" 
                  size="icon" 
                  title="Личный кабинет" 
                  className={cn(
                    "h-14 w-14 [&_svg]:!h-8 [&_svg]:!w-8 transition-colors",
                    isHomePage && isHeroMode && "text-white hover:bg-white/10 [&_svg]:text-white"
                  )}
                >
                  <Link to="/profile">
                    <User className="h-8 w-8" />
                  </Link>
                </Button>
              ) : (
                <Button 
                  onClick={() => setAuthModalOpen(true)} 
                  variant="outline" 
                  size="icon"
                  className={cn(
                    "relative h-14 w-14 [&_svg]:!h-10 [&_svg]:!w-10 transition-colors",
                    isHomePage && isHeroMode && "border-white/30 text-white hover:bg-white/10 [&_svg]:text-white"
                  )}
                  title="Войти / Регистрация"
                >
                  <User className="h-10 w-10" />
                </Button>
              )}
            </div>
          </div>

          {/* Компактная форма поиска в шапке (только на главной странице и после прокрутки Hero) */}
          {isHomePage && (showStickySearch || isAnimatingOut) && (
            <div className={cn(
              "pb-4 transition-all duration-300",
              showStickySearch && !isAnimatingOut 
                ? "animate-in slide-in-from-top-2 fade-in" 
                : "animate-out slide-out-to-top-2 fade-out"
            )}>
              <div className="bg-card/80 backdrop-blur-sm rounded-xl border shadow-lg p-3">
                <div className="flex flex-col lg:flex-row gap-3 items-stretch">
                  {/* Быстрые категории */}
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => setTravelType("train")}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-medium",
                        travelType === "train"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Train className="h-4 w-4" />
                      <span className="hidden sm:inline">Ж/д</span>
                    </button>
                    <button
                      onClick={() => setTravelType("flight")}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-medium",
                        travelType === "flight"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Plane className="h-4 w-4" />
                      <span className="hidden sm:inline">Авиа</span>
                    </button>
                    <button
                      onClick={() => {
                        setTravelType("bus");
                        // Сбрасываем дату возврата при переключении на автобусы
                        if (dateRange?.to) {
                          setDateRange({ from: dateRange.from, to: undefined });
                        }
                      }}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-medium",
                        travelType === "bus"
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Bus className="h-4 w-4" />
                      <span className="hidden sm:inline">Автобус</span>
                    </button>
                  </div>

                  {/* Поля формы поиска */}
                  <div className="flex flex-col sm:flex-row gap-2 flex-1">
                    <Select value={fromCity} onValueChange={setFromCity}>
                      <SelectTrigger className="h-10 text-sm min-w-[140px] flex-1">
                        <SelectValue placeholder="Откуда" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={`header-from-${city}`} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={toCity} onValueChange={setToCity}>
                      <SelectTrigger className="h-10 text-sm min-w-[140px] flex-1">
                        <SelectValue placeholder="Куда" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={`header-to-${city}`} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "h-10 px-3 justify-start text-left font-normal text-sm min-w-[200px]",
                            !dateRange?.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                          {travelType === "bus" ? (
                            dateRange?.from ? (
                              format(dateRange.from, "dd.MM", { locale: ru })
                            ) : (
                              <span>Дата поездки</span>
                            )
                          ) : (
                            dateRange?.from && dateRange?.to ? (
                              `${format(dateRange.from, "dd.MM", { locale: ru })} – ${format(dateRange.to, "dd.MM", { locale: ru })}`
                            ) : dateRange?.from ? (
                              format(dateRange.from, "dd.MM", { locale: ru })
                            ) : (
                              <span>Даты поездки</span>
                            )
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        {travelType === "bus" ? (
                          <Calendar
                            mode="single"
                            selected={dateRange?.from}
                            onSelect={(date) => setDateRange(date ? { from: date, to: undefined } : undefined)}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        ) : (
                          <Calendar
                            mode="range"
                            selected={dateRange}
                            onSelect={setDateRange}
                            initialFocus
                            numberOfMonths={2}
                            disabled={(date) => date < new Date()}
                          />
                        )}
                      </PopoverContent>
                    </Popover>

                    <Button
                      onClick={handleSearch}
                      className="h-10 px-4 bg-primary hover:bg-primary/90 shrink-0"
                      disabled={!fromCity || !toCity || !dateRange?.from}
                      title={!fromCity || !toCity || !dateRange?.from ? "Заполните все поля" : ""}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Найти</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Мобильная навигация */}
          <nav className="flex lg:hidden items-center gap-2 pb-4 overflow-x-auto">
            <Link 
              to="/" 
              className={cn(
                "text-lg font-medium transition-colors px-2 py-1 rounded whitespace-nowrap",
                isActive("/") 
                  ? isHomePage && isHeroMode 
                    ? "text-white bg-white/20" 
                    : "text-primary bg-primary/10"
                  : isHomePage && isHeroMode
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-foreground/80 hover:text-primary"
              )}
            >
              Главная
            </Link>
            <NavDropdown 
              label="Маршруты" 
              items={popularRoutes}
              href="/routes"
              isActive={isActive("/routes") || location.pathname.startsWith("/routes/")}
              isHomePage={isHomePage && isHeroMode}
            />
            <NavDropdown 
              label="Справочная" 
              items={faqTopics}
              href="/reference"
              isActive={isActive("/reference") || location.pathname.startsWith("/reference/")}
              isHomePage={isHomePage && isHeroMode}
            />
            <Link 
              to="/blog" 
              className={cn(
                "text-lg font-medium transition-colors px-2 py-1 rounded whitespace-nowrap",
                isActive("/blog") 
                  ? isHomePage && isHeroMode 
                    ? "text-white bg-white/20" 
                    : "text-primary bg-primary/10"
                  : isHomePage && isHeroMode
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-foreground/80 hover:text-primary"
              )}
            >
              Блог
            </Link>
            <NavDropdown 
              label="Путеводитель" 
              items={guidesList}
              href="/guide"
              isActive={isActive("/guide") || location.pathname.startsWith("/guide/")}
              isHomePage={isHomePage && isHeroMode}
            />
          </nav>
        </div>
      </header>
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
};

export default Header;