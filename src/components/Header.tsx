import { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import NavDropdown from "@/components/NavDropdown";
import { popularRoutes, faqTopics } from "@/data/navLinks";
import { Train, Bus, Plane, Car, User, Search, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/images/logo/logo.png";
import logoWhiteImage from "@/assets/images/logo/logo w.png";
import logoMobile from "@/assets/images/logo/logo-mobile.png";
import logoMobile2 from "@/assets/images/logo/logom.png";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import FlightSearchForm from "@/components/flight/FlightSearchForm";
import WhiteLabelBusPortal from "@/components/WhiteLabelBusPortal";

type MenuRouteRow = {
  slug: string;
  name: string;
  show_in_menu: boolean;
  menu_order: number;
};

type SearchTravelType = "flight" | "bus" | "transfer";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [fromLabel, setFromLabel] = useState<string | undefined>();
  const [toLabel, setToLabel] = useState<string | undefined>();
  const [showStickySearch, setShowStickySearch] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isHeroMode, setIsHeroMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBookingOpen, setMobileBookingOpen] = useState(false);
  const [travelType, setTravelType] = useState<SearchTravelType>("flight");

  const isActive = (path: string) => location.pathname === path;
  const isHomePage = location.pathname === "/";
  const isRoutesPage = location.pathname === "/routes";
  const isBlogPage =
    location.pathname === "/blog" || location.pathname.startsWith("/blog/");
  const isBlogNavActive =
    location.pathname === "/blog" || location.pathname.startsWith("/blog/");
  const isMobile = useIsMobile();

  // При каждой смене страницы — сбрасываем на «Авиа»,
  // чтобы после редиректа с «ЖД/Автобус» не залипало на пустой вкладке.
  useEffect(() => {
    // Если пришли с state.travelType — не сбрасываем на "flight"
    const state = location.state as { travelType?: SearchTravelType } | null;
    if (state?.travelType) return;
    setTravelType("flight");
  }, [location.pathname, location.state]);

  // Пункты меню «Маршруты» в шапке
  const routesMenuQ = useQuery<MenuRouteRow[]>({
    queryKey: ["header-routes-menu"],
    queryFn: () =>
      fetch("/api/route-pages").then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json() as Promise<MenuRouteRow[]>;
      }),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const navRouteItems = useMemo(() => {
    const rows = routesMenuQ.data ?? [];
    const menu = rows
      .filter((r) => r.show_in_menu)
      .sort(
        (a, b) =>
          (a.menu_order ?? 0) - (b.menu_order ?? 0) ||
          a.name.localeCompare(b.name),
      )
      .map((r) => ({
        label: r.name,
        href: `/routes/${r.slug}`,
      }));
    return menu.length > 0 ? menu : popularRoutes;
  }, [routesMenuQ.data]);

  useEffect(() => {
    if (!isHomePage && !isRoutesPage && !isBlogPage) {
      setShowStickySearch(false);
      setIsAnimatingOut(false);
      setIsHeroMode(false);
      return;
    }

    if (isMobile) {
      const handleScroll = () => {
        const heroSection = document.getElementById("hero-section");
        const featuresSection = isHomePage ? document.getElementById("features-section") : null;
        const heroRect = heroSection ? heroSection.getBoundingClientRect() : null;

        if (heroRect && featuresSection) {
          const nextSectionRect = featuresSection.getBoundingClientRect();
          const headerHeight = 64;

          const isHeroVisible = heroRect.bottom > 0;
          const isNextSectionReached = nextSectionRect.top <= headerHeight;
          setIsHeroMode(isHeroVisible && !isNextSectionReached);
        } else if (heroRect) {
          setIsHeroMode(heroRect.bottom > 0);
        } else {
          setIsHeroMode(false);
        }

        if (isRoutesPage) {
          setShowStickySearch(heroRect && heroRect.bottom > 0 ? false : true);
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

    if (isBlogPage) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const shouldShow = scrollY > 50;

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
          setIsAnimatingOut(false);
          setShowStickySearch(true);
        } else if (!shouldShow && showStickySearch && (isHomePage || isRoutesPage)) {
          setIsAnimatingOut(true);
          setTimeout(() => {
            setShowStickySearch(false);
            setIsAnimatingOut(false);
          }, 300);
        }
      }

      if (heroSection && featuresSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const nextSectionRect = featuresSection.getBoundingClientRect();
        const headerHeight = 96;

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
  }, [isHomePage, isRoutesPage, isBlogPage, showStickySearch, isMobile]);

  type SearchFormVariant = "headerDesktop" | "headerMobileSheet";

  /**
   * Клик по «ЖД/Автобус»:
   * 1) Плавно закрываем все открытые Sheet.
   * 2) Переходим на главную (без ?travel=bus — hero откроется на «Авиа»).
   * 3) Плавно скроллим к hero-блоку.
   */
  const handleBusRedirect = () => {
    setMobileMenuOpen(false);
    setMobileBookingOpen(false);
  
    window.setTimeout(() => {
      // Передаём сигнал через state — HeroSection прочитает и переключит вкладку
      navigate("/", { state: { travelType: "bus" } });
  
      window.requestAnimationFrame(() => {
        const hero = document.getElementById("hero-section");
        if (hero) {
          const top = hero.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }, 180);
  };

  /**
   * «Трансфер»: виджет KiwiTaxi инициализируется один раз на страницу,
   * поэтому из шапки ведём на hero главной, где он и открывается.
   */
  const handleTransferRedirect = () => {
    setMobileMenuOpen(false);
    setMobileBookingOpen(false);

    window.setTimeout(() => {
      navigate("/", { state: { travelType: "transfer" } });

      window.requestAnimationFrame(() => {
        const hero = document.getElementById("hero-section");
        if (hero) {
          const top = hero.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    }, 180);
  };

  const renderSearchForm = (variant: SearchFormVariant) => {
    const isSheet = variant === "headerMobileSheet";
    return (
      <div
        className={cn(
          "rounded-xl border border-border/80 bg-card/95 backdrop-blur-sm shadow-sm space-y-3",
          isSheet ? "p-4 rounded-2xl shadow-md" : "p-3"
        )}
      >
        {/* Две кнопки: Авиа / ЖД-Автобус */}
        <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-md">
          <button
            type="button"
            onClick={() => setTravelType("flight")}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 h-9 px-2 rounded-md transition-all text-sm font-medium",
              travelType === "flight"
                ? "bg-gradient-to-r from-[#0B5FD9] via-[#0A8FE8] to-[#0FB5F0] text-white shadow-sm"
                : "text-foreground/70 hover:text-foreground"
            )}
            aria-label="Авиабилеты"
          >
            <Plane className="h-4 w-4" />
            <span className="hidden md:inline">Авиа</span>
          </button>
          <button
            type="button"
            onClick={handleBusRedirect}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 h-9 px-2 rounded-md transition-all text-sm font-medium",
              travelType === "bus"
                ? "bg-gradient-to-r from-[#0B5FD9] via-[#0A8FE8] to-[#0FB5F0] text-white shadow-sm"
                : "text-foreground/70 hover:text-foreground"
            )}
            aria-label="Поезда и автобусы"
          >
            <Train className="h-4 w-4" />
            <span
              className={cn(
                "md:hidden mx-0.5",
                travelType === "bus" ? "text-white/60" : "text-foreground/40"
              )}
            >
              /
            </span>
            <Bus className="h-4 w-4" />
            <span className="hidden md:inline whitespace-nowrap">ЖД/Автобус</span>
          </button>
          <button
            type="button"
            onClick={handleTransferRedirect}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 h-9 px-2 rounded-md transition-all text-sm font-medium",
              travelType === "transfer"
                ? "bg-gradient-to-r from-[#0B5FD9] via-[#0A8FE8] to-[#0FB5F0] text-white shadow-sm"
                : "text-foreground/70 hover:text-foreground"
            )}
            aria-label="Трансфер"
          >
            <Car className="h-4 w-4" />
            <span className="hidden md:inline whitespace-nowrap">Трансфер</span>
          </button>
        </div>

        {travelType === "flight" ? (
          <FlightSearchForm
            variant={isSheet ? "header-mobile" : "header-desktop"}
            showTripTypeToggle={false}
            onFromLabelChange={setFromLabel}
            onToLabelChange={setToLabel}
            onSearchComplete={() => {
              if (isMobile) {
                setMobileMenuOpen(false);
                setMobileBookingOpen(false);
              }
            }}
          />
        ) : travelType === "bus" ? (
          <div className="rounded-lg bg-white p-2">
            <WhiteLabelBusPortal />
          </div>
        ) : (
          <div className="rounded-lg bg-white/90 p-3 text-sm text-foreground/70">
            Подбор трансфера открывается в форме поиска на главной странице.
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isHomePage && isHeroMode
          ? "bg-transparent border-b border-white/20 backdrop-blur-md"
          : "bg-[#F1F5F9] backdrop-blur-md border-b border-[#0B5FD9]/10 shadow-sm"
      )}>
        <div className="container">
          <div className="flex h-16 md:h-24 items-center justify-between gap-2 md:gap-4">
            {/* Лого */}
            <Link
              to="/"
              className="flex items-center hover:opacity-80 transition-opacity shrink-0 -ml-2 md:ml-0"
            >
              <img
                src={isHomePage && isHeroMode ? logoMobile2 : logoMobile}
                alt="TudaSuda"
                className={cn(
                  "block md:hidden h-14 w-auto max-w-none object-contain transition-all duration-300",
                  isHomePage && isHeroMode
                    ? "drop-shadow-lg brightness-110"
                    : "drop-shadow-sm brightness-110"
                )}
              />
              <img
                src={isHomePage && isHeroMode ? logoWhiteImage : logoImage}
                alt="TudaSuda"
                className={cn(
                  "hidden md:block h-14 md:h-[84px] w-auto object-contain transition-all duration-300",
                  isHomePage && isHeroMode
                    ? "drop-shadow-lg brightness-110"
                    : "drop-shadow-sm brightness-110"
                )}
              />
            </Link>

            {/* Мобилка: капсула */}
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
                    "shadow-[0_2px_20px_-2px_rgba(10,143,232,0.42),0_0_0_1px_rgba(96,242,255,0.5)]",
                    "animate-search-pill-glow-opacity motion-reduce:animate-none motion-reduce:opacity-0"
                  )}
                  aria-hidden
                />
                <Search
                  className="relative z-[1] h-4 w-4 shrink-0 text-foreground"
                  strokeWidth={2.25}
                />
                <span className="relative z-[1] flex min-w-0 flex-1 items-center gap-2 text-sm leading-tight font-semibold">
                  {fromLabel && toLabel ? (
                    <>
                      <span className="max-w-[42%] min-w-0 shrink truncate text-foreground">{fromLabel}</span>
                      <span
                        className="h-[3px] min-h-[3px] min-w-6 flex-1 shrink-0 rounded-full bg-muted-foreground/45 self-center"
                        aria-hidden
                      />
                      <span className="max-w-[42%] min-w-0 shrink truncate text-foreground">{toLabel}</span>
                    </>
                  ) : (
                    <>
                      <span className="shrink-0 text-muted-foreground font-normal">Откуда</span>
                      <span
                        className="h-[3px] min-h-[3px] min-w-6 flex-1 shrink-0 rounded-full bg-muted-foreground/45 self-center"
                        aria-hidden
                      />
                      <span className="shrink-0 text-muted-foreground font-normal">Куда</span>
                    </>
                  )}
                </span>
              </button>
            )}

            <nav className="hidden lg:flex items-center gap-4 flex-1 justify-center">
              <Link
                to="/"
                className={cn(
                  "text-lg font-medium transition-colors px-3 py-2 rounded-md border",
                  isActive("/")
                    ? isHomePage && isHeroMode
                      ? "text-foreground bg-white/80 backdrop-blur-lg border-foreground/20"
                      : "text-primary bg-primary/10 border-transparent"
                    : isHomePage && isHeroMode
                      ? "text-white/90 border-transparent hover:bg-white/80 hover:backdrop-blur-lg hover:border-foreground/20 hover:text-foreground"
                      : "text-foreground/80 border-transparent hover:text-primary hover:bg-muted/50"
                )}
              >
                Главная
              </Link>
              <NavDropdown
                label="Маршруты"
                items={navRouteItems}
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
                  "text-lg font-medium transition-colors px-3 py-2 rounded-md border",
                  isBlogNavActive
                    ? isHomePage && isHeroMode
                      ? "text-foreground bg-white/80 backdrop-blur-lg border-foreground/20"
                      : "text-primary bg-primary/10 border-transparent"
                    : isHomePage && isHeroMode
                      ? "text-white/90 border-transparent hover:bg-white/80 hover:backdrop-blur-lg hover:border-foreground/20 hover:text-foreground"
                      : "text-foreground/80 border-transparent hover:text-primary hover:bg-muted/50"
                )}
              >
                Блог
              </Link>
              <Link
                to="/guide"
                className={cn(
                  "text-lg font-medium transition-colors px-3 py-2 rounded-md border",
                  isActive("/guide") || location.pathname.startsWith("/guide/")
                    ? isHomePage && isHeroMode
                      ? "text-foreground bg-white/80 backdrop-blur-lg border-foreground/20"
                      : "text-primary bg-primary/10 border-transparent"
                    : isHomePage && isHeroMode
                      ? "text-white/90 border-transparent hover:bg-white/80 hover:backdrop-blur-lg hover:border-foreground/20 hover:text-foreground"
                      : "text-foreground/80 border-transparent hover:text-primary hover:bg-muted/50"
                )}
              >
                Путеводитель
              </Link>
            </nav>

            <div className="flex items-center gap-2 shrink-0">
              {user ? (
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  title="Личный кабинет"
                  className={cn(
                    "h-10 w-10 md:h-14 md:w-14 [&_svg]:!h-5 [&_svg]:!w-5 md:[&_svg]:!h-8 md:[&_svg]:!w-8 transition-colors rounded-lg",
                    isHomePage && isHeroMode
                      ? "bg-black/40 backdrop-blur-md hover:bg-black/50 border-0 [&_svg]:text-white [&_svg]:stroke-white [&_svg]:fill-none"
                      : "bg-transparent hover:bg-white/50 border-0 [&_svg]:text-primary [&_svg]:stroke-primary [&_svg]:fill-none"
                  )}
                >
                  <Link to="/profile">
                    <User className="h-5 w-5 md:h-8 md:w-8" strokeWidth={2} />
                  </Link>
                </Button>
                ) : null}

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
                      isHomePage && isHeroMode
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
                          isBlogNavActive
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
              items={navRouteItems}
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
                isBlogNavActive
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
            <Link
              to="/guide"
              className={cn(
                "text-lg font-medium transition-colors px-2 py-1 rounded whitespace-nowrap border",
                isActive("/guide") || location.pathname.startsWith("/guide/")
                  ? isHomePage && isHeroMode
                    ? "text-foreground bg-white/80 backdrop-blur-lg border-foreground/20"
                    : "text-primary bg-primary/10 border-transparent"
                  : isHomePage && isHeroMode
                    ? "text-white/90 border-transparent hover:bg-white/80 hover:backdrop-blur-lg hover:border-foreground/20 hover:text-foreground"
                    : "text-foreground/80 border-transparent hover:text-primary"
              )}
            >
              Путеводитель
            </Link>
          </nav>
        </div>
      </header>
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
};

export default Header;