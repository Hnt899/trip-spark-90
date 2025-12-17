import { TrendingUp, ArrowRight, Plane, Train, Hotel, Bus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cities } from "@/data/cities";
import { useState, useMemo } from "react";

interface PopularRoute {
  from: string;
  to: string;
  minPrice: number;
  isPopular: boolean;
  duration?: string; // Время в пути, например "3ч 55м"
}

interface TransportOption {
  type: "flight" | "train" | "bus";
  duration: string;
  price: number;
  available: boolean;
  details?: string;
  badge?: string;
}

interface RouteData {
  [key: string]: {
    flight?: TransportOption;
    train?: TransportOption;
    bus?: TransportOption;
  };
}

const RoutesSection = () => {
  const navigate = useNavigate();
  const [calcFrom, setCalcFrom] = useState("Москва");
  const [calcTo, setCalcTo] = useState("Сочи");
  const [selectedTransport, setSelectedTransport] = useState<"flight" | "train" | "bus" | null>(null);

  // Данные для разных маршрутов
  const routeData: RouteData = {
    "Москва-Сочи": {
      flight: {
        type: "flight",
        duration: "4,5ч",
        price: 4500,
        available: true,
        details: "2,5ч + 2ч до аэропорта = 4,5ч",
      },
      train: {
        type: "train",
        duration: "24ч",
        price: 3000,
        available: true,
        badge: "экономите ночь в отеле",
      },
      bus: {
        type: "bus",
        duration: "18ч",
        price: 2500,
        available: true,
      },
    },
    "Москва-Санкт-Петербург": {
      flight: {
        type: "flight",
        duration: "3,5ч",
        price: 3500,
        available: true,
        details: "1,5ч + 2ч до аэропорта = 3,5ч",
      },
      train: {
        type: "train",
        duration: "3ч 55м",
        price: 2950,
        available: true,
      },
      bus: {
        type: "bus",
        duration: "8ч",
        price: 1800,
        available: false, // Распродано
      },
    },
    "Москва-Казань": {
      flight: {
        type: "flight",
        duration: "4ч",
        price: 4200,
        available: true,
        details: "2ч + 2ч до аэропорта = 4ч",
      },
      train: {
        type: "train",
        duration: "11ч 30м",
        price: 1850,
        available: true,
      },
      bus: {
        type: "bus",
        duration: "12ч",
        price: 1500,
        available: true,
      },
    },
    "Москва-Нижний Новгород": {
      flight: {
        type: "flight",
        duration: "3,5ч",
        price: 3800,
        available: false, // Распродано
        details: "1,5ч + 2ч до аэропорта = 3,5ч",
      },
      train: {
        type: "train",
        duration: "3ч 40м",
        price: 650,
        available: true,
      },
      bus: {
        type: "bus",
        duration: "6ч",
        price: 800,
        available: true,
      },
    },
  };

  // Получаем данные для текущего маршрута
  const currentRouteData = useMemo(() => {
    const routeKey = `${calcFrom}-${calcTo}`;
    return routeData[routeKey] || {
      flight: {
        type: "flight" as const,
        duration: "—",
        price: 0,
        available: false,
      },
      train: {
        type: "train" as const,
        duration: "—",
        price: 0,
        available: false,
      },
      bus: {
        type: "bus" as const,
        duration: "—",
        price: 0,
        available: false,
      },
    };
  }, [calcFrom, calcTo]);

  // Сбрасываем выбор при изменении маршрута
  const handleRouteChange = () => {
    setSelectedTransport(null);
  };

  const popularRoutes: PopularRoute[] = [
    { from: "Москва", to: "Санкт-Петербург", minPrice: 2950, isPopular: true, duration: "3ч 55м" },
    { from: "Москва", to: "Казань", minPrice: 1850, isPopular: true, duration: "11ч 30м" },
    { from: "Москва", to: "Нижний Новгород", minPrice: 650, isPopular: false, duration: "3ч 40м" },
    { from: "Санкт-Петербург", to: "Москва", minPrice: 2950, isPopular: true, duration: "3ч 55м" },
    { from: "Казань", to: "Москва", minPrice: 1850, isPopular: false, duration: "11ч 30м" },
    { from: "Тверь", to: "Москва", minPrice: 550, isPopular: false, duration: "1ч 40м" },
  ];


  const handleRouteClick = (from: string, to: string, transportType?: "train" | "flight" | "bus") => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const params = new URLSearchParams({
      from,
      to,
      date: tomorrow.toISOString().split("T")[0],
      passengers: "1",
      ticketType: "all",
    });
    
    // Определяем страницу поиска в зависимости от типа транспорта
    if (transportType === "flight") {
      navigate(`/flight-search?${params.toString()}`);
    } else if (transportType === "bus") {
      navigate(`/bus-search?${params.toString()}`);
    } else {
      navigate(`/train-search?${params.toString()}`);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price);
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Заголовок секции */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent leading-tight pb-2">
            Популярные направления
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Самые востребованные маршруты с актуальными ценами
          </p>
        </div>

        {/* Двухколоночный layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8 items-start">
          {/* Левая колонка: Таблица маршрутов */}
          <div className="w-full">
            <div className="space-y-3">
              {popularRoutes.map((route, index) => (
                <div key={index} className="relative">
                  {/* Бейдж "Популярно" над карточкой, выровнен по правому краю */}
                  {route.isPopular && (
                    <div className="flex justify-end mb-1">
                      <span className="flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded text-xs font-medium border border-primary/20">
                        <TrendingUp className="w-3 h-3" />
                        Популярно
                      </span>
                    </div>
                  )}

                  {/* Карточка маршрута */}
                  <div
                    onClick={() => handleRouteClick(route.from, route.to)}
                    className={cn(
                      "group relative rounded-lg p-4 md:p-5",
                      "bg-card hover:bg-primary/5 hover:shadow-md",
                      "transition-all duration-200 cursor-pointer",
                      // Фиолетовая обводка для популярных маршрутов
                      route.isPopular
                        ? "border-2 border-purple-600 hover:border-purple-700"
                        : "border border-border/60 hover:border-primary/40"
                    )}
                  >
                    {/* Grid layout: левая колонка | центральная (фикс) | правая колонка | цена */}
                    <div className="grid grid-cols-[1fr_200px_1fr_auto] gap-4 items-center">
                      {/* Левая колонка: город отправления */}
                      <div className="min-w-0">
                        <span className="text-base md:text-lg font-semibold text-foreground">
                          {route.from}
                        </span>
                      </div>

                      {/* Центральная колонка (фиксированная ширина): линия/стрелка + время */}
                      <div className="flex flex-col items-center justify-center relative w-full">
                        {/* Время в пути над линией */}
                        <div className="text-xs text-muted-foreground mb-1.5 whitespace-nowrap">
                          В пути: {route.duration || "—"}
                        </div>
                        {/* Линия со стрелкой - растягивается на всю ширину */}
                        <div className="w-full flex items-center gap-1.5">
                          <div className="flex-1 h-0.5 bg-border group-hover:bg-primary/40 transition-colors duration-200"></div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors duration-200" />
                          <div className="flex-1 h-0.5 bg-border group-hover:bg-primary/40 transition-colors duration-200"></div>
                        </div>
                      </div>

                      {/* Правая колонка: город прибытия */}
                      <div className="min-w-0 text-right">
                        <span className="text-base md:text-lg font-semibold text-foreground">
                          {route.to}
                        </span>
                      </div>

                      {/* Цена (отдельная колонка справа) */}
                      <div className="text-right flex-shrink-0 min-w-[120px]">
                        <div className="text-lg md:text-xl font-bold text-foreground">
                          от {formatPrice(route.minPrice)} ₽
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Правая колонка: Калькулятор */}
          <div>
            <div className="rounded-lg border border-border bg-card p-5 md:p-6 shadow-sm">
              {/* Заголовок калькулятора */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Сравнить поезд и самолёт
                </h3>
                <p className="text-sm text-muted-foreground">
                  Покажем время в пути и реальную выгоду логистики
                </p>
              </div>

              {/* Форма калькулятора */}
              <div className="space-y-4 mb-6">
                {/* Откуда */}
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Откуда</label>
                  <Select 
                    value={calcFrom} 
                    onValueChange={(value) => {
                      setCalcFrom(value);
                      handleRouteChange();
                    }}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={`calc-from-${city}`} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Куда */}
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Куда</label>
                  <Select 
                    value={calcTo} 
                    onValueChange={(value) => {
                      setCalcTo(value);
                      handleRouteChange();
                    }}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.filter(city => city !== calcFrom).map((city) => (
                        <SelectItem key={`calc-to-${city}`} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Результаты сравнения */}
              <div className="space-y-3 mb-6">
                {/* Самолёт */}
                {currentRouteData.flight && (
                  <div
                    onClick={() => currentRouteData.flight?.available && setSelectedTransport("flight")}
                    className={cn(
                      "rounded-lg border p-4 cursor-pointer transition-all",
                      currentRouteData.flight.available
                        ? selectedTransport === "flight"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/5"
                        : "border-border/50 bg-muted/20 opacity-60 cursor-not-allowed"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Plane className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">Самолёт</span>
                      </div>
                      {!currentRouteData.flight.available && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs font-medium">
                          <X className="w-3 h-3" />
                          Распродано
                        </span>
                      )}
                    </div>
                    {currentRouteData.flight.available ? (
                      <>
                        <div className="text-xs text-muted-foreground mb-1">
                          {currentRouteData.flight.details || (
                            <span className="font-semibold text-foreground">{currentRouteData.flight.duration}</span>
                          )}
                        </div>
                        <div className="text-sm font-bold text-foreground">
                          от {formatPrice(currentRouteData.flight.price)} ₽
                        </div>
                      </>
                    ) : (
                      <div className="text-xs text-muted-foreground">Нет доступных рейсов</div>
                    )}
                  </div>
                )}

                {/* Поезд */}
                {currentRouteData.train && (
                  <div
                    onClick={() => currentRouteData.train?.available && setSelectedTransport("train")}
                    className={cn(
                      "rounded-lg border p-4 cursor-pointer transition-all",
                      currentRouteData.train.available
                        ? selectedTransport === "train"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/5"
                        : "border-border/50 bg-muted/20 opacity-60 cursor-not-allowed"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Train className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">Поезд</span>
                      </div>
                      {!currentRouteData.train.available && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs font-medium">
                          <X className="w-3 h-3" />
                          Распродано
                        </span>
                      )}
                    </div>
                    {currentRouteData.train.available ? (
                      <>
                        <div className="text-xs text-muted-foreground mb-1">
                          <span className="font-semibold text-foreground">{currentRouteData.train.duration}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <div className="text-sm font-bold text-foreground">
                            от {formatPrice(currentRouteData.train.price)} ₽
                          </div>
                          {currentRouteData.train.badge && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium w-fit">
                              <Hotel className="w-3 h-3" />
                              {currentRouteData.train.badge}
                            </span>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="text-xs text-muted-foreground">Нет доступных рейсов</div>
                    )}
                  </div>
                )}

                {/* Автобус */}
                {currentRouteData.bus && (
                  <div
                    onClick={() => currentRouteData.bus?.available && setSelectedTransport("bus")}
                    className={cn(
                      "rounded-lg border p-4 cursor-pointer transition-all",
                      currentRouteData.bus.available
                        ? selectedTransport === "bus"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/5"
                        : "border-border/50 bg-muted/20 opacity-60 cursor-not-allowed"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Bus className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-foreground">Автобус</span>
                      </div>
                      {!currentRouteData.bus.available && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs font-medium">
                          <X className="w-3 h-3" />
                          Распродано
                        </span>
                      )}
                    </div>
                    {currentRouteData.bus.available ? (
                      <>
                        <div className="text-xs text-muted-foreground mb-1">
                          <span className="font-semibold text-foreground">{currentRouteData.bus.duration}</span>
                        </div>
                        <div className="text-sm font-bold text-foreground">
                          от {formatPrice(currentRouteData.bus.price)} ₽
                        </div>
                      </>
                    ) : (
                      <div className="text-xs text-muted-foreground">Нет доступных рейсов</div>
                    )}
                  </div>
                )}
              </div>

              {/* CTA кнопка - показывается только после выбора транспорта */}
              {selectedTransport && (
                <Button
                  className="w-full rounded-full"
                  onClick={() => handleRouteClick(calcFrom, calcTo, selectedTransport)}
                >
                  Показать билеты
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoutesSection;
