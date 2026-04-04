import { ArrowRight, Plane, Train, Hotel, Bus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cities } from "@/data/cities";
import { useState, useMemo } from "react";
import type { SectionSurface } from "@/lib/sectionSurface";
import {
  sectionCardLiftClass,
  sectionLeadClass,
  sectionShellClass,
} from "@/lib/sectionSurface";

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

interface RoutesSectionProps {
  surface?: SectionSurface;
}

const RoutesSection = ({ surface = "brand" }: RoutesSectionProps) => {
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
    { from: "Москва", to: "Сочи", minPrice: 2500, isPopular: true, duration: "24ч" },
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
    <section className={sectionShellClass(surface, "py-16 md:py-24")}>
      {/* Декоративные желтые пятна */}
      {surface === "brand" && (
      <div className="absolute inset-0 pointer-events-none hidden lg:block z-0">
        {/* Левое пятно - от центра поднимаемся вверх на 30px */}
        <div 
          className="absolute rounded-full blur-3xl"
          style={{
            width: '400px',
            height: '400px',
            left: '-150px',
            top: 'calc(50% - 30px)',
            transform: 'translateY(-50%)',
            background: '#F9B84F',
            opacity: 0.3,
          }}
        />
        {/* Правое пятно - от центра опускаемся вниз на 30px */}
        <div 
          className="absolute rounded-full blur-3xl"
          style={{
            width: '400px',
            height: '400px',
            right: '-100px',
            top: 'calc(50% + 30px)',
            transform: 'translateY(-50%)',
            background: '#F9B84F',
            opacity: 0.3,
          }}
        />
      </div>
      )}
      <div className="container relative z-10">
        {/* Заголовок секции */}
        <div className="mb-12 text-center">
          <h2 className="heading-gradient text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight pb-2 tracking-tight">
            Популярные направления
          </h2>
          <p className={cn("text-lg md:text-xl max-w-2xl mx-auto", sectionLeadClass(surface))}>
            Самые востребованные маршруты с актуальными ценами
          </p>
        </div>

        {/* Двухколоночный layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8 lg:items-stretch">
          {/* Левая колонка: Таблица маршрутов */}
          <div className="w-full lg:h-full lg:min-h-0 lg:flex lg:flex-col">
            <div className="flex flex-col gap-1 md:gap-3 lg:flex-1 lg:min-h-0">
              {popularRoutes.map((route, index) => (
                <div key={index} className="relative lg:flex-1 lg:min-h-0 lg:flex lg:flex-col">
                  {/* Карточка маршрута */}
                  <div
                    onClick={() => handleRouteClick(route.from, route.to)}
                    className={cn(
                      "relative rounded-lg p-3 md:p-5",
                      "bg-card",
                      "cursor-pointer",
                      "lg:flex-1 lg:flex lg:flex-col lg:justify-center",
                      sectionCardLiftClass(surface),
                      // Фиолетовая обводка для популярных маршрутов
                      route.isPopular
                        ? "border-2 border-purple-600"
                        : "border border-border/60"
                    )}
                  >
                    {/* Десктоп layout: левая колонка | центральная (фикс) | правая колонка | цена */}
                    <div className="hidden md:grid md:grid-cols-[1fr_200px_1fr_auto] gap-4 items-center">
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
                          <div className="flex-1 h-0.5 bg-border"></div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <div className="flex-1 h-0.5 bg-border"></div>
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

                    {/* Мобильный layout: компактный вертикальный */}
                    <div className="md:hidden flex flex-col gap-1">
                      {/* Верхняя строка: города и время */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-sm font-semibold text-foreground truncate">
                            {route.from}
                          </span>
                          <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm font-semibold text-foreground truncate">
                            {route.to}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          {route.duration || "—"}
                        </div>
                      </div>
                      {/* Строка с типами транспорта */}
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>поезд</span>
                        <span>•</span>
                        <span>автобус</span>
                        <span>•</span>
                        <span>самолёт</span>
                      </div>
                      {/* Нижняя строка: цена */}
                      <div className="flex justify-end">
                        <div className="text-base font-bold text-foreground">
                          от {formatPrice(route.minPrice)} ₽
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Правая колонка: калькулятор сравнения — акцентный блок (особенно на мобилке) */}
          <div
            className={cn(
              "lg:h-full lg:min-h-0 lg:flex lg:flex-col",
              surface === "light" &&
                "max-lg:mt-8 max-lg:pt-8 max-lg:border-t-2 max-lg:border-primary/20 max-lg:rounded-t-2xl"
            )}
          >
            <div
              className={cn(
                "rounded-xl p-5 md:p-6 lg:flex-1 lg:flex lg:flex-col lg:min-h-0 lg:rounded-lg",
                surface === "light"
                  ? cn(
                      "border-2 border-primary/35",
                      "bg-gradient-to-br from-[#eef1fc] via-white to-[#f5f2ff]",
                      "shadow-[0_12px_40px_rgba(67,56,202,0.12)]",
                      "ring-1 ring-inset ring-primary/[0.08]",
                      "max-lg:shadow-[0_16px_52px_rgba(59,49,179,0.16)]"
                    )
                  : cn(
                      "border-2 border-white/25 bg-white/10 backdrop-blur-md",
                      "shadow-lg shadow-black/20"
                    )
              )}
            >
              {/* Заголовок калькулятора */}
              <div className="mb-6 shrink-0">
                <p
                  className={cn(
                    "mb-2 text-xs font-semibold uppercase tracking-wide",
                    surface === "light" ? "text-primary" : "text-white/80"
                  )}
                >
                  Сравнение транспорта
                </p>
                <h3
                  className={cn(
                    "text-xl font-bold mb-2",
                    surface === "light" ? "heading-gradient" : "text-white"
                  )}
                >
                  Сравнить поезд и самолёт
                </h3>
                <p
                  className={cn(
                    "text-sm",
                    surface === "light" ? "text-muted-foreground" : "text-white/75"
                  )}
                >
                  Покажем время в пути и реальную выгоду логистики
                </p>
              </div>

              {/* Форма калькулятора */}
              <div className="space-y-4 mb-6 shrink-0">
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
              <div className="space-y-3 mb-6 min-h-0 lg:mb-0 lg:flex-1 lg:flex lg:flex-col">
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
                <div className="mt-4 shrink-0 lg:mt-auto lg:pt-4">
                  <Button
                    className="w-full rounded-full"
                    onClick={() => handleRouteClick(calcFrom, calcTo, selectedTransport)}
                  >
                    Показать билеты
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoutesSection;
