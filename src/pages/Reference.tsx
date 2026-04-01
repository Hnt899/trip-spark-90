import { useState, useMemo, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Train, Plane, Bus, Search, CalendarIcon } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { trainsArticles } from "@/data/referenceSearch";
import { flightsArticles } from "@/data/flightsArticles";
import { busesArticles } from "@/data/busesArticles";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { cities } from "@/data/cities";
import { useIsMobile } from "@/hooks/use-mobile";

type TransportType = "trains" | "flights" | "buses";
type TravelType = "train" | "flight" | "bus";

const Reference = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<TransportType>("trains");

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

  const groupedFlightsArticles = useMemo(() => {
    const grouped: Record<string, typeof flightsArticles> = {};
    flightsArticles.forEach((article) => {
      if (!grouped[article.category]) {
        grouped[article.category] = [];
      }
      grouped[article.category].push(article);
    });
    return grouped;
  }, []);

  const groupedBusesArticles = useMemo(() => {
    const grouped: Record<string, typeof busesArticles> = {};
    busesArticles.forEach((article) => {
      if (!grouped[article.category]) {
        grouped[article.category] = [];
      }
      grouped[article.category].push(article);
    });
    return grouped;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Фильтры - прикреплены к header только на мобилке */}
      <div className="md:hidden sticky top-[56px] z-40 bg-background border-b">
        <div className="container">
          <div className="flex items-center justify-center gap-2 py-3">
            <button
              onClick={() => {
                setActiveTab("trains");
                navigate("/reference#trains");
              }}
              className={cn(
                "flex items-center justify-center px-3 py-2 rounded-lg transition-all",
                activeTab === "trains"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted/50 text-foreground hover:bg-muted"
              )}
              title="Поезда"
            >
              <Train className="w-5 h-5 shrink-0" />
            </button>
            
            <button
              onClick={() => {
                setActiveTab("flights");
                navigate("/reference#flights");
              }}
              className={cn(
                "flex items-center justify-center px-3 py-2 rounded-lg transition-all",
                activeTab === "flights"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted/50 text-foreground hover:bg-muted"
              )}
              title="Самолёты"
            >
              <Plane className="w-5 h-5 shrink-0" />
            </button>
            
            <button
              onClick={() => {
                setActiveTab("buses");
                navigate("/reference#buses");
              }}
              className={cn(
                "flex items-center justify-center px-3 py-2 rounded-lg transition-all",
                activeTab === "buses"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted/50 text-foreground hover:bg-muted"
              )}
              title="Автобусы"
            >
              <Bus className="w-5 h-5 shrink-0" />
            </button>
          </div>
        </div>
      </div>

      <main className="container pt-28 md:pt-32 pb-12">
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

        {/* Десктопная версия - с боковой панелью */}
        <div className="hidden md:flex gap-8 items-start">
          {/* Левая панель с табами */}
          <aside className="w-64 shrink-0">
            <div className="space-y-2">
              <button
                onClick={() => {
                  setActiveTab("trains");
                  navigate("/reference#trains");
                }}
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
                onClick={() => {
                  setActiveTab("flights");
                  navigate("/reference#flights");
                }}
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
                onClick={() => {
                  setActiveTab("buses");
                  navigate("/reference#buses");
                }}
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
              <div className="space-y-8">
                {Object.entries(groupedFlightsArticles).map(([category, articles]) => (
                  <section key={category}>
                    <h2 className="text-2xl font-bold text-foreground mb-4">{category}</h2>
                    <ul className="space-y-2">
                      {articles.map((article) => (
                        <li key={article.path}>
                          <Link to={article.path} className="text-primary hover:underline text-lg">
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}

            {activeTab === "buses" && (
              <div className="space-y-8">
                {Object.entries(groupedBusesArticles).map(([category, articles]) => (
                  <section key={category}>
                    <h2 className="text-2xl font-bold text-foreground mb-4">{category}</h2>
                    <ul className="space-y-2">
                      {articles.map((article) => (
                        <li key={article.path}>
                          <Link to={article.path} className="text-primary hover:underline text-lg">
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Мобильная версия - без боковой панели */}
        <div className="md:hidden w-full">
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
              <div className="space-y-8">
                {Object.entries(groupedFlightsArticles).map(([category, articles]) => (
                  <section key={category}>
                    <h2 className="text-2xl font-bold text-foreground mb-4">{category}</h2>
                    <ul className="space-y-2">
                      {articles.map((article) => (
                        <li key={article.path}>
                          <Link to={article.path} className="text-primary hover:underline text-lg">
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}

            {activeTab === "buses" && (
              <div className="space-y-8">
                {Object.entries(groupedBusesArticles).map(([category, articles]) => (
                  <section key={category}>
                    <h2 className="text-2xl font-bold text-foreground mb-4">{category}</h2>
                    <ul className="space-y-2">
                      {articles.map((article) => (
                        <li key={article.path}>
                          <Link to={article.path} className="text-primary hover:underline text-lg">
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reference;
