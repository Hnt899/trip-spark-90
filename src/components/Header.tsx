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
  /** Верхняя панель только с формой заказа — открывается с капсулы «откуда куда», не с бургера */
  const [mobileBookingOpen, setMobileBookingOpen] = useState(false);

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

    // Мобильные: hero-режим лого + компактная строка поиска в шапке (как у Aviasales)
    if (isMobile) {
      const handleScroll = () => {
        const heroSection = document.getElementById("hero-section");
        const featuresSection = isHomePage ? document.getElementById("features-section") : null;

        if (heroSection && featuresSection) {
          const heroRect = heroSection.getBoundingClientRect();
          const nextSectionRect = featuresSection.getBoundingClientRect();
          const headerHeight = 56;

          const isHeroVisible = heroRect.bottom > 0;
          const isNextSectionReached = nextSectionRect.top <= headerHeight;
          setIsHeroMode(isHeroVisible && !isNextSectionReached);
        } else if (heroSection) {
          const heroRect = heroSection.getBoundingClientRect();
          setIsHeroMode(heroRect.bottom > 0);
        } else {
          setIsHeroMode(false);
        }

        if (isRoutesPage) {
          setShowStickySearch(true);
          setIsAnimatingOut(false);
        } else if (isBlogPage) {
          setShowStickySearch(window.scrollY > 50);
          setIsAnimatingOut(false);
        } else if (isHomePage && heroSection) {
          const heroBottom = heroSection.getBoundingClientRect().bottom;
          const showCompact = heroBottom < 72;
          setShowStickySearch(showCompact);
          setIsAnimatingOut(false);
        } else if (!isHomePage && !isRoutesPage && !isBlogPage) {
          setShowStickySearch(false);
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
    if (isMobile) {
      setMobileMenuOpen(false);
      setMobileBookingOpen(false);
    }
  };

  type SearchFormVariant = "headerDesktop" | "headerMobileSheet";

  const renderSearchForm = (variant: SearchFormVariant) => {
    const isSheet = variant === "headerMobileSheet";
    const isDesktop = variant === "headerDesktop";
    const keyPrefix = isSheet ? "mobile" : "desktop";
    return (
      <div
        className={cn(
          "rounded-xl border border-border/80 bg-card/95 backdrop-blur-sm shadow-sm space-y-3",
          isSheet ? "p-4 rounded-2xl shadow-md" : "p-3"
        )}
      >
        {isSheet && (
          <p className="text-sm font-semibold text-foreground">Поиск билетов</p>
        )}
        <div
          className={cn(
            "flex flex-col gap-3",
            isDesktop ? "lg:flex-row lg:items-stretch" : ""
          )}
        >
          {/* Табы транспорта — как TabsList в HeroSection */}
          <div
            className={cn(
              "grid grid-cols-3 gap-1.5 shrink-0",
              isSheet ? "h-11 w-full" : isDesktop ? "h-10 w-full lg:w-auto lg:min-w-[156px]" : "h-10 w-full"
            )}
          >
            <button
              type="button"
              onClick={() => setTravelType("train")}
              className={cn(
                "flex items-center justify-center rounded-md transition-all text-sm font-medium border",
                travelType === "train"
                  ? "travel-tab-gradient border-transparent text-white"
                  : "border-border bg-background text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              )}
            >
              <Train className={cn(isSheet ? "h-6 w-6" : "h-5 w-5")} />
            </button>
            <button
              type="button"
              onClick={() => setTravelType("flight")}
              className={cn(
                "flex items-center justify-center rounded-md transition-all text-sm font-medium border",
                travelType === "flight"
                  ? "travel-tab-gradient border-transparent text-white"
                  : "border-border bg-background text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              )}
            >
              <Plane className={cn(isSheet ? "h-6 w-6" : "h-5 w-5")} />
            </button>
            <button
              type="button"
              onClick={() => {
                setTravelType("bus");
                if (dateRange?.to) {
                  setDateRange({ from: dateRange.from, to: undefined });
                }
              }}
              className={cn(
                "flex items-center justify-center rounded-md transition-all text-sm font-medium border",
                travelType === "bus"
                  ? "travel-tab-gradient border-transparent text-white"
                  : "border-border bg-background text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              )}
            >
              <Bus className={cn(isSheet ? "h-6 w-6" : "h-5 w-5")} />
            </button>
          </div>

          {/* Поля формы поиска */}
          <div
            className={cn(
              "flex gap-2 flex-1",
              isSheet ? "flex-col" : "flex-col sm:flex-row sm:items-stretch"
            )}
          >
            <Select value={fromCity} onValueChange={setFromCity}>
              <SelectTrigger
                className={cn(
                  "text-sm flex-1 w-full",
                  isSheet ? "h-12 text-base" : "h-10",
                  isDesktop && "min-w-[140px]"
                )}
              >
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
              <SelectTrigger
                className={cn(
                  "text-sm flex-1 w-full",
                  isSheet ? "h-12 text-base" : "h-10",
                  isDesktop && "min-w-[140px]"
                )}
              >
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
                    "px-3 justify-start text-left font-normal rounded-md w-full",
                    isSheet ? "h-12 text-base" : "h-10 text-sm",
                    !dateRange?.from && "text-muted-foreground",
                    isDesktop && "min-w-[200px]"
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
              <PopoverContent className={cn("w-auto p-0", isSheet && "p-1 z-[200]")} align="start">
                {travelType === "bus" ? (
                  <Calendar
                    mode="single"
                    selected={dateRange?.from}
                    onSelect={(date) => setDateRange(date ? { from: date, to: undefined } : undefined)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className={isSheet ? "p-1 [&_.rdp-month]:space-y-2 [&_.rdp-caption]:mb-1 [&_.rdp-cell]:h-8 [&_.rdp-cell]:w-8 [&_.rdp-day]:h-8 [&_.rdp-day]:w-8 [&_.rdp-head_cell]:w-8" : ""}
                  />
                ) : (
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    initialFocus
                    numberOfMonths={isSheet ? 1 : 2}
                    disabled={(date) => date < new Date()}
                    className={isSheet ? "p-1 [&_.rdp-month]:space-y-2 [&_.rdp-caption]:mb-1 [&_.rdp-cell]:h-8 [&_.rdp-cell]:w-8 [&_.rdp-day]:h-8 [&_.rdp-day]:w-8 [&_.rdp-head_cell]:w-8" : ""}
                  />
                )}
              </PopoverContent>
            </Popover>

            <Button
              onClick={handleSearch}
              className={cn(
                "shrink-0 border-0 shadow-sm font-semibold",
                isSheet
                  ? "w-full h-12 rounded-xl text-base"
                  : "h-10 px-4 rounded-md"
              )}
              disabled={!fromCity || !toCity || !dateRange?.from}
              title={!fromCity || !toCity || !dateRange?.from ? "Заполните все поля" : ""}
            >
              <Search className={cn("mr-2", isSheet ? "h-5 w-5" : "h-4 w-4")} />
              {isSheet ? (
                "Найти билеты"
              ) : (
                <>
                  <span className="hidden sm:inline">Найти</span>
                </>
              )}
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

            {/* Мобилка: капсула — только верхняя панель заказа билетов */}
            {(isHomePage || isRoutesPage || isBlogPage) && isMobile && showStickySearch && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setMobileBookingOpen(true);
                }}
                className={cn(
                  "relative md:hidden flex-1 min-w-0 flex items-center gap-2 h-10 pl-3 pr-3 rounded-full",
                  "bg-white border border-slate-200/90 text-left shadow-sm",
                  "transition-transform duration-500 ease-out",
                  "active:scale-[0.99] hover:brightness-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-2"
                )}
                aria-label="Открыть поиск"
              >
                <span
                  className={cn(
                    "pointer-events-none absolute inset-0 z-0 rounded-full opacity-[0.01]",
                    "shadow-[0_2px_20px_-2px_rgba(138,112,248,0.42),0_0_0_1px_rgba(186,198,245,0.82)]",
                    "animate-search-pill-glow-opacity motion-reduce:animate-none motion-reduce:opacity-0"
                  )}
                  aria-hidden
                />
                <Search
                  className="relative z-[1] h-4 w-4 shrink-0 text-foreground"
                  strokeWidth={2.25}
                />
                <span className="relative z-[1] flex min-w-0 flex-1 items-center gap-2 text-sm leading-tight font-semibold">
                  {fromCity && toCity ? (
                    <>
                      <span className="max-w-[42%] min-w-0 shrink truncate text-foreground">{fromCity}</span>
                      <span
                        className="h-[3px] min-h-[3px] min-w-6 flex-1 shrink-0 rounded-full bg-muted-foreground/45 self-center"
                        aria-hidden
                      />
                      <span className="max-w-[42%] min-w-0 shrink truncate text-foreground">{toCity}</span>
                    </>
                  ) : (
                    <>
                      <span className="shrink-0 text-muted-foreground font-normal">откуда</span>
                      <span
                        className="h-[3px] min-h-[3px] min-w-6 flex-1 shrink-0 rounded-full bg-muted-foreground/45 self-center"
                        aria-hidden
                      />
                      <span className="shrink-0 text-muted-foreground font-normal">куда</span>
                    </>
                  )}
                </span>
              </button>
            )}

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
                    "hidden md:inline-flex text-sm md:text-lg font-medium transition-colors px-3 md:px-4 py-1.5 md:py-2 rounded-md border h-auto",
                    (isHomePage || isRoutesPage) && isHeroMode
                        ? "text-white/90 border-white/30 bg-white/10 hover:bg-white/20 hover:border-white/40 backdrop-blur-sm"
                        : "text-foreground/80 border-border bg-background/50 hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  Войти
                </Button>
              )}

              {/* Верхняя панель: только форма заказа (капсула «откуда куда») */}
              <Sheet
                open={mobileBookingOpen}
                onOpenChange={(open) => {
                  setMobileBookingOpen(open);
                  if (open) setMobileMenuOpen(false);
                }}
              >
                <SheetContent
                  side="top"
                  hideClose
                  className={cn(
                    "w-full max-h-[min(92vh,920px)] overflow-y-auto rounded-b-2xl border-b shadow-xl",
                    "!px-4 !pb-8 !pt-4 sm:!pt-5 gap-0"
                  )}
                >
                  <SheetHeader className="sr-only">
                    <SheetTitle>Поиск билетов</SheetTitle>
                  </SheetHeader>
                  {renderSearchForm("headerMobileSheet")}
                </SheetContent>
              </Sheet>

              {/* Бургер: классическое меню справа — Войти, разделы, форма */}
              <Sheet
                open={mobileMenuOpen}
                onOpenChange={(open) => {
                  setMobileMenuOpen(open);
                  if (open) setMobileBookingOpen(false);
                }}
              >
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
                <SheetContent
                  side="right"
                  closeClassName="top-3 right-3 sm:top-4 sm:right-4"
                  className="w-[min(100vw-1rem,320px)] sm:w-[360px] overflow-y-auto !pt-14 !px-4 !pb-8"
                >
                  <SheetHeader className="sr-only">
                    <SheetTitle>Навигация и поиск</SheetTitle>
                  </SheetHeader>
                  {!user && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-1 h-11 text-base font-medium rounded-xl border-border"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setAuthModalOpen(true);
                      }}
                    >
                      Войти
                    </Button>
                  )}
                  <div
                    className={cn(
                      "border-t border-border/60 pt-5",
                      user ? "mt-2" : "mt-5"
                    )}
                  >
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1">
                      Разделы сайта
                    </p>
                    <nav className="flex flex-col gap-1">
                      <Link
                        to="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "px-4 py-3 rounded-xl text-base font-medium transition-colors",
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
                          "px-4 py-3 rounded-xl text-base font-medium transition-colors",
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
                          "px-4 py-3 rounded-xl text-base font-medium transition-colors",
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
                          "px-4 py-3 rounded-xl text-base font-medium transition-colors",
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
                          "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                          isActive("/guide") || location.pathname.startsWith("/guide/")
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/80 hover:bg-muted/50 hover:text-foreground"
                        )}
                      >
                        Путеводитель
                      </Link>
                    </nav>
                  </div>
                  <div className="mt-6">
                    {renderSearchForm("headerMobileSheet")}
                  </div>
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
              {renderSearchForm("headerDesktop")}
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
