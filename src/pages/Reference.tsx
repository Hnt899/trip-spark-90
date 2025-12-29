import { useState, useMemo, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Train, Plane, Bus, Search, CalendarIcon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { trainsArticles } from "@/data/referenceSearch";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { cities } from "@/data/cities";

type TransportType = "trains" | "flights" | "buses";
type TravelType = "train" | "flight" | "bus";

const Reference = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TransportType>("trains");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sidebarLeftRef = useRef<number>(0);
  const sidebarInitialTopRef = useRef<number>(0);
  const [isSidebarFixed, setIsSidebarFixed] = useState(false);
  const [sidebarLeft, setSidebarLeft] = useState<number>(0);

  // Определяем активный таб из URL параметров или hash
  useEffect(() => {
    const hash = location.hash;
    if (hash === "#trains" || hash === "#flights" || hash === "#buses") {
      const tab = hash.substring(1) as TransportType;
      setActiveTab(tab);
    }
  }, [location]);
  const [travelType, setTravelType] = useState<TravelType>("train");
  const [fromCity, setFromCity] = useState<string | undefined>();
  const [toCity, setToCity] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [passengers, setPassengers] = useState<string>("1");

  // Сброс даты возврата для автобусов
  useEffect(() => {
    if (travelType === "bus" && dateRange?.to) {
      setDateRange({ from: dateRange.from, to: undefined });
    }
  }, [travelType]);

  const handleSearch = () => {
    if (!fromCity || !toCity || !dateRange?.from) {
      return;
    }
    const params = new URLSearchParams({
      from: fromCity,
      to: toCity,
      date: format(dateRange.from, "yyyy-MM-dd"),
      passengers
    });
    if (travelType === "train") {
      navigate(`/train-search?${params.toString()}`);
    } else if (travelType === "flight") {
      params.set("class", "economy");
      if (dateRange?.to) {
        params.set("returnDate", format(dateRange.to, "yyyy-MM-dd"));
      }
      navigate(`/flight-search?${params.toString()}`);
    } else if (travelType === "bus") {
      navigate(`/bus-search?${params.toString()}`);
    }
  };

  // Группируем статьи по категориям
  const groupedArticles = useMemo(() => {
    const grouped: Record<string, typeof trainsArticles> = {};
    trainsArticles.forEach(article => {
      if (!grouped[article.category]) {
        grouped[article.category] = [];
      }
      grouped[article.category].push(article);
    });
    return grouped;
  }, []);

  // Отслеживание скролла для фиксации левого меню
  useEffect(() => {
    let rafId: number | null = null;

    // Инициализация: сохраняем начальную позицию меню и контейнера
    if (sidebarRef.current && containerRef.current && sidebarInitialTopRef.current === 0) {
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      sidebarInitialTopRef.current = sidebarRect.top + window.scrollY;
      sidebarLeftRef.current = containerRect.left;
      setSidebarLeft(containerRect.left);
    }

    const handleScroll = () => {
      if (rafId) return; // Пропускаем, если уже запланирован кадр

      rafId = requestAnimationFrame(() => {
        if (!sidebarRef.current || !containerRef.current) {
          rafId = null;
          return;
        }

        const headerHeight = 96; // h-24 = 96px
        const scrollY = window.scrollY;
        
        // Проверяем, достиг ли скролл точки, когда меню должно стать fixed
        // Меню становится fixed, когда его начальная позиция достигает шапки
        const shouldBeFixed = scrollY + headerHeight >= sidebarInitialTopRef.current;

        // Обновляем состояние только при изменении
        if (shouldBeFixed !== isSidebarFixed) {
          setIsSidebarFixed(shouldBeFixed);
          
          // При фиксации обновляем позицию контейнера (на случай изменения размера)
          if (shouldBeFixed) {
            const containerRect = containerRef.current.getBoundingClientRect();
            sidebarLeftRef.current = containerRect.left;
            setSidebarLeft(containerRect.left);
          }
        }
        
        rafId = null;
      });
    };

    const handleResize = () => {
      if (!containerRef.current || !sidebarRef.current) return;
      // При изменении размера окна пересчитываем позиции
      const containerRect = containerRef.current.getBoundingClientRect();
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      sidebarLeftRef.current = containerRect.left;
      setSidebarLeft(containerRect.left);
      
      // Пересчитываем начальную позицию меню (если оно еще не fixed)
      if (!isSidebarFixed) {
        sidebarInitialTopRef.current = sidebarRect.top + window.scrollY;
      }
      
      handleScroll();
    };

    // Проверяем при монтировании
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarFixed]);


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-32 pb-12">
        {/* Быстрый заказ */}
        <div className="mb-12 hidden">
          <div className="bg-card/80 backdrop-blur-sm rounded-xl border shadow-lg p-4">
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
                  <span>Ж/д</span>
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
                  <span>Авиа</span>
                </button>
                <button
                  onClick={() => {
                    setTravelType("bus");
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
                  <span>Автобус</span>
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
                      <SelectItem key={`ref-from-${city}`} value={city}>
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
                      <SelectItem key={`ref-to-${city}`} value={city}>
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
                        "h-10 px-3 justify-start text-left font-normal text-sm min-w-[200px] rounded-md",
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
                  className="h-10 px-4 bg-primary hover:bg-primary/90 shrink-0 rounded-md"
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

        <div ref={containerRef} className="flex gap-8 items-start relative">
          {/* Spacer для предотвращения скачков разметки */}
          {isSidebarFixed && <div className="w-64 shrink-0" />}
          
          {/* Левая панель с табами */}
          <aside
            ref={sidebarRef}
            className={cn(
              "w-64 shrink-0 transition-all duration-300 ease-in-out will-change-transform",
              isSidebarFixed && "fixed z-40 pt-4 pb-4 bg-background/95 backdrop-blur-sm"
            )}
            style={
              isSidebarFixed && sidebarLeft > 0
                ? {
                    top: "112px", // h-24 (96px) + отступ (16px)
                    left: `${sidebarLeft}px`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }
                : {
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }
            }
          >
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab("trains")}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left",
                  activeTab === "trains"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted/50 text-foreground hover:bg-muted"
                )}
              >
                <Train className="w-5 h-5 shrink-0" />
                <span className="font-medium">Поезда</span>
              </button>
              
              <button
                onClick={() => setActiveTab("flights")}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left",
                  activeTab === "flights"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted/50 text-foreground hover:bg-muted"
                )}
              >
                <Plane className="w-5 h-5 shrink-0" />
                <span className="font-medium">Самолёты</span>
              </button>
              
              <button
                onClick={() => setActiveTab("buses")}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left",
                  activeTab === "buses"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted/50 text-foreground hover:bg-muted"
                )}
              >
                <Bus className="w-5 h-5 shrink-0" />
                <span className="font-medium">Автобусы</span>
              </button>
            </div>
          </aside>

          {/* Правая часть со списком статей */}
          <div className="flex-1">
            {activeTab === "trains" && (
              <div className="space-y-8">
                {Object.entries(groupedArticles).map(([category, articles]) => (
                  <section key={category}>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      {category}
                    </h2>
                    <ul className="space-y-2">
                      {articles.map((article, index) => (
                        <li key={index}>
                          <Link
                            to={article.path}
                            className="text-primary hover:underline text-lg"
                          >
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}

            {activeTab === "flights" && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Раздел в разработке</p>
              </div>
            )}

            {activeTab === "buses" && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Раздел в разработке</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reference;
