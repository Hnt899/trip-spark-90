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
import { CalendarIcon, Train, Plane, Bus, User, Search, Menu } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { cities } from "@/data/cities";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/images/logo/logo.png";
import logoWhiteImage from "@/assets/images/logo/logo w.png";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === "/";
  const isRoutesPage = location.pathname === "/routes";
  const isBlogPage = location.pathname === "/blog";
  const isMobile = useIsMobile();

  // Отслеживание скролла для показа формы поиска и изменения стиля шапки
  useEffect(() => {
    if (!isHomePage && !isRoutesPage && !isBlogPage) {
      setShowStickySearch(false);
      setIsAnimatingOut(false);
      setIsHeroMode(false);
      return;
    }

    // На мобильных форма поиска не показывается при прокрутке (она в бургер-меню)
    if (isMobile) {
      // Только логика hero режима для мобильных
      const handleScroll = () => {
        const heroSection = document.getElementById("hero-section");
        const featuresSection = isHomePage ? document.getElementById("features-section") : null;
        
        if (heroSection && featuresSection) {
          const heroRect = heroSection.getBoundingClientRect();
          const nextSectionRect = featuresSection.getBoundingClientRect();
          const headerHeight = 56; // h-14 = 56px для мобильных
          
          const isHeroVisible = heroRect.bottom > 0;
          const isNextSectionReached = nextSectionRect.top <= headerHeight;
          setIsHeroMode(isHeroVisible && !isNextSectionReached);
        } else if (heroSection) {
          const heroRect = heroSection.getBoundingClientRect();
          setIsHeroMode(heroRect.bottom > 0);
        } else {
          setIsHeroMode(false);
        }
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      };
    }

    // На blog странице форма всегда видна после небольшой прокрутки (только для десктопа)
    if (isBlogPage) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const shouldShow = scrollY > 50; // Показываем после прокрутки на 50px
        
        if (shouldShow && !showStickySearch) {
          setIsAnimatingOut(false);
          setShowStickySearch(true);
        } else if (!shouldShow && showStickySearch) {
          setIsAnimatingOut(true);
          setTimeout(() => {
            setShowStickySearch(false);
            setIsAnimatingOut(false);
          }, 300);
        }
        setIsHeroMode(false);
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleScroll);
      };
    }

    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section");
      const featuresSection = isHomePage ? document.getElementById("features-section") : null;
      
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const heroBottom = heroRect.bottom;
        const shouldShow = heroBottom < 100;
        
        if (shouldShow && !showStickySearch) {
          // Показываем форму
          setIsAnimatingOut(false);
          setShowStickySearch(true);
        } else if (!shouldShow && showStickySearch && isHomePage) {
          // Начинаем анимацию исчезновения только на главной
          setIsAnimatingOut(true);
          // Убираем форму после завершения анимации
          setTimeout(() => {
            setShowStickySearch(false);
            setIsAnimatingOut(false);
          }, 300);
        }
      }

      // На routes форма всегда видна и шапка всегда в hero режиме
      if (isRoutesPage) {
        setShowStickySearch(true);
        setIsAnimatingOut(false);
        setIsHeroMode(true);
        return;
      }

      // Проверяем hero режим только для главной страницы
      if (heroSection && featuresSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const nextSectionRect = featuresSection.getBoundingClientRect();
        const headerHeight = 96; // h-24 = 96px
        
        // Белое лого показываем, если:
        // 1. Hero секция еще видна (нижняя граница hero > 0)
        // 2. И следующая секция еще не достигнута (верх следующей секции > headerHeight)
        const isHeroVisible = heroRect.bottom > 0;
        const isNextSectionReached = nextSectionRect.top <= headerHeight;
        
        // Белое лого пока hero виден и следующая секция еще не достигнута
        setIsHeroMode(isHeroVisible && !isNextSectionReached);
      } else if (heroSection) {
        // Если следующая секция не найдена, проверяем только Hero
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
  }, [isHomePage, isRoutesPage, isBlogPage, showStickySearch, isMobile]);

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
    // Закрываем бургер-меню после поиска на мобильных
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Функция для рендеринга формы поиска
  const renderSearchForm = (isMobileVersion = false) => {
    const keyPrefix = isMobileVersion ? "mobile" : "desktop";
    return (
      <div className={cn(
        isMobileVersion ? "bg-card/80 backdrop-blur-sm rounded-xl border shadow-lg p-4 mb-4" : ""
      )}>
        <div className={cn("flex flex-col gap-3", isMobileVersion ? "" : "lg:flex-row")}>
          {/* Быстрые категории */}
          <div className={cn("flex gap-2", isMobileVersion ? "w-full" : "shrink-0")}>
            <button
              onClick={() => setTravelType("train")}
              className={cn(
                "flex items-center justify-center rounded-lg transition-all",
                isMobileVersion ? "flex-1 py-3" : "px-3 py-2",
                travelType === "train"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Train className={cn(isMobileVersion ? "h-6 w-6" : "h-4 w-4")} />
            </button>
            <button
              onClick={() => setTravelType("flight")}
              className={cn(
                "flex items-center justify-center rounded-lg transition-all",
                isMobileVersion ? "flex-1 py-3" : "px-3 py-2",
                travelType === "flight"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Plane className={cn(isMobileVersion ? "h-6 w-6" : "h-4 w-4")} />
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
                "flex items-center justify-center rounded-lg transition-all",
                isMobileVersion ? "flex-1 py-3" : "px-3 py-2",
                travelType === "bus"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Bus className={cn(isMobileVersion ? "h-6 w-6" : "h-4 w-4")} />
            </button>
          </div>

          {/* Поля формы поиска */}
          <div className={cn("flex gap-2 flex-1", isMobileVersion ? "flex-col" : "flex-col sm:flex-row")}>
            <Select value={fromCity} onValueChange={setFromCity}>
              <SelectTrigger className={cn("h-10 text-sm flex-1", !isMobileVersion && "min-w-[140px]")}>
                <SelectValue placeholder="Откуда" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={`${keyPrefix}-from-${city}`} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={toCity} onValueChange={setToCity}>
              <SelectTrigger className={cn("h-10 text-sm flex-1", !isMobileVersion && "min-w-[140px]")}>
                <SelectValue placeholder="Куда" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={`${keyPrefix}-to-${city}`} value={city}>
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
                    "h-10 px-3 justify-start text-left font-normal text-sm rounded-md",
                    !dateRange?.from && "text-muted-foreground",
                    !isMobileVersion && "min-w-[200px]"
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
              <PopoverContent className={cn("w-auto p-0", isMobileVersion && "p-1")} align="start">
                {travelType === "bus" ? (
                  <Calendar
                    mode="single"
                    selected={dateRange?.from}
                    onSelect={(date) => setDateRange(date ? { from: date, to: undefined } : undefined)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className={isMobileVersion ? "p-1 [&_.rdp-month]:space-y-2 [&_.rdp-caption]:mb-1 [&_.rdp-cell]:h-8 [&_.rdp-cell]:w-8 [&_.rdp-day]:h-8 [&_.rdp-day]:w-8 [&_.rdp-head_cell]:w-8" : ""}
                  />
                ) : (
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    initialFocus
                    numberOfMonths={isMobileVersion ? 1 : 2}
                    disabled={(date) => date < new Date()}
                    className={isMobileVersion ? "p-1 [&_.rdp-month]:space-y-2 [&_.rdp-caption]:mb-1 [&_.rdp-cell]:h-8 [&_.rdp-cell]:w-8 [&_.rdp-day]:h-8 [&_.rdp-day]:w-8 [&_.rdp-head_cell]:w-8" : ""}
                  />
                )}
              </PopoverContent>
            </Popover>

            <Button
              onClick={handleSearch}
              className="h-10 px-4 bg-primary hover:bg-primary/90 shrink-0 rounded-md"
              disabled={!fromCity || !toCity || !dateRange?.from}
              title={!fromCity || !toCity || !dateRange?.from ? "Заполните все поля" : ""}
            >
              <Search className="h-4 w-4 mr-2" />
              <span className={isMobileVersion ? "" : "hidden sm:inline"}>Найти</span>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        (isHomePage || isRoutesPage) && isHeroMode
          ? "bg-transparent border-b border-white/20 backdrop-blur-md" 
            : "bg-[#E8ECF7]/60 backdrop-blur-md border-b"
      )}>
        <div className="container">
          {/* Верхняя часть шапки: лого, навигация, вход */}
          <div className="flex h-14 md:h-24 items-center justify-between gap-2 md:gap-4">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity shrink-0 -ml-2 md:ml-0">
              <img 
                src={(isHomePage || isRoutesPage) && isHeroMode ? logoWhiteImage : logoImage} 
                alt="TudaSuda" 
                className={cn(
                  "h-14 md:h-[84px] w-auto object-contain transition-all duration-300",
                  (isHomePage || isRoutesPage) && isHeroMode 
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
                  "text-lg font-medium transition-colors px-3 py-2 rounded-md border",
                  isActive("/") 
                    ? (isHomePage || isRoutesPage) && isHeroMode 
                      ? "text-foreground bg-white/80 backdrop-blur-lg border-foreground/20" 
                        : "text-primary bg-primary/10 border-transparent"
                    : (isHomePage || isRoutesPage) && isHeroMode
                      ? "text-white/90 border-transparent hover:bg-white/80 hover:backdrop-blur-lg hover:border-foreground/20 hover:text-foreground"
                        : "text-foreground/80 border-transparent hover:text-primary hover:bg-muted/50"
                )}
              >
                Главная
              </Link>
              <NavDropdown 
                label="Маршруты" 
                items={popularRoutes}
                href="/routes"
                isActive={isActive("/routes") || location.pathname.startsWith("/routes/")}
                isHomePage={(isHomePage || isRoutesPage) && isHeroMode}
              />
              <NavDropdown 
                label="Справочная" 
                items={faqTopics}
                href="/reference"
                isActive={isActive("/reference") || location.pathname.startsWith("/reference/")}
                isHomePage={(isHomePage || isRoutesPage) && isHeroMode}
              />
              <Link 
                to="/blog" 
                className={cn(
                  "text-lg font-medium transition-colors px-3 py-2 rounded-md border",
                  isActive("/blog") 
                    ? (isHomePage || isRoutesPage) && isHeroMode 
                      ? "text-foreground bg-white/80 backdrop-blur-lg border-foreground/20" 
                        : "text-primary bg-primary/10 border-transparent"
                    : (isHomePage || isRoutesPage) && isHeroMode
                      ? "text-white/90 border-transparent hover:bg-white/80 hover:backdrop-blur-lg hover:border-foreground/20 hover:text-foreground"
                        : "text-foreground/80 border-transparent hover:text-primary hover:bg-muted/50"
                )}
              >
                Блог
              </Link>
              <NavDropdown 
                label="Путеводитель" 
                items={guidesList}
                href="/guide"
                isActive={isActive("/guide") || location.pathname.startsWith("/guide/")}
                isHomePage={(isHomePage || isRoutesPage) && isHeroMode}
              />
            </nav>

            {/* Кнопка входа/профиль и бургер-меню для мобильных */}
            <div className="flex items-center gap-2 shrink-0">
              {user ? (
                <Button 
                  asChild 
                  variant="ghost" 
                  size="icon" 
                  title="Личный кабинет" 
                  className={cn(
                    "h-10 w-10 md:h-14 md:w-14 [&_svg]:!h-5 [&_svg]:!w-5 md:[&_svg]:!h-8 md:[&_svg]:!w-8 transition-colors rounded-lg",
                    (isHomePage || isRoutesPage) && isHeroMode
                      ? "bg-black/40 backdrop-blur-md hover:bg-black/50 border-0 [&_svg]:text-white [&_svg]:stroke-white [&_svg]:fill-none"
                        : "bg-transparent hover:bg-white/50 border-0 [&_svg]:text-primary [&_svg]:stroke-primary [&_svg]:fill-none"
                  )}
                >
                  <Link to="/profile">
                    <User className="h-5 w-5 md:h-8 md:w-8" strokeWidth={2} />
                  </Link>
                </Button>
              ) : (
                <Button 
                  onClick={() => setAuthModalOpen(true)} 
                  variant="outline" 
                  className={cn(
                    "text-sm md:text-lg font-medium transition-colors px-3 md:px-4 py-1.5 md:py-2 rounded-md border h-auto",
                    (isHomePage || isRoutesPage) && isHeroMode
                        ? "text-white/90 border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/40 backdrop-blur-sm"
                        : "text-foreground/80 border-border bg-background/50 hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  Войти
                </Button>
              )}

              {/* Бургер-меню для мобильных */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "md:hidden h-10 w-10 transition-colors",
                      (isHomePage || isRoutesPage) && isHeroMode
                        ? "text-white/90 hover:bg-white/20"
                        : "text-foreground/80 hover:bg-muted/50"
                    )}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[340px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Меню</SheetTitle>
                  </SheetHeader>
                  {/* Навигация */}
                  <nav className="flex flex-col gap-1 mt-6 mb-4">
                    <Link
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                        isActive("/")
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      Главная
                    </Link>
                    <Link
                      to="/routes"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                        isActive("/routes") || location.pathname.startsWith("/routes/")
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      Маршруты
                    </Link>
                    <Link
                      to="/reference"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                        isActive("/reference") || location.pathname.startsWith("/reference/")
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      Справочная
                    </Link>
                    <Link
                      to="/blog"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                        isActive("/blog")
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      Блог
                    </Link>
                    <Link
                      to="/guide"
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                        isActive("/guide") || location.pathname.startsWith("/guide/")
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80 hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      Путеводитель
                    </Link>
                  </nav>
                  {/* Форма поиска в бургер-меню */}
                  {renderSearchForm(true)}
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Компактная форма поиска в шапке (на главной странице, routes и blog, после прокрутки) - только для десктопа */}
          {(isHomePage || isRoutesPage || isBlogPage) && (showStickySearch || isAnimatingOut) && !isMobile && (
            <div className={cn(
              "pb-4 transition-all duration-300",
              showStickySearch && !isAnimatingOut 
                ? "animate-in slide-in-from-top-2 fade-in" 
                : "animate-out slide-out-to-top-2 fade-out"
            )}>
              <div className="bg-card/80 backdrop-blur-sm rounded-xl border shadow-lg p-3">
                {renderSearchForm(false)}
              </div>
            </div>
          )}

          {/* Мобильная навигация - скрыта, используется бургер-меню */}
          <nav className="hidden lg:hidden items-center gap-2 pb-4 overflow-x-auto">
            <Link 
              to="/" 
              className={cn(
                "text-2xl font-medium transition-colors px-2 py-1 rounded whitespace-nowrap border",
                isActive("/") 
                  ? isHomePage && isHeroMode 
                    ? "text-foreground bg-white/80 backdrop-blur-lg border-foreground/20" 
                      : "text-primary bg-primary/10 border-transparent"
                  : isHomePage && isHeroMode
                    ? "text-white/90 border-transparent hover:bg-white/80 hover:backdrop-blur-lg hover:border-foreground/20 hover:text-foreground"
                      : "text-foreground/80 border-transparent hover:text-primary"
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
                "text-lg font-medium transition-colors px-2 py-1 rounded whitespace-nowrap border",
                isActive("/blog") 
                  ? isHomePage && isHeroMode 
                    ? "text-foreground bg-white/80 backdrop-blur-lg border-foreground/20" 
                      : "text-primary bg-primary/10 border-transparent"
                  : isHomePage && isHeroMode
                    ? "text-white/90 border-transparent hover:bg-white/80 hover:backdrop-blur-lg hover:border-foreground/20 hover:text-foreground"
                      : "text-foreground/80 border-transparent hover:text-primary"
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
