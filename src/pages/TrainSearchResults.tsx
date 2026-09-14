import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  Snowflake, 
  Utensils, 
  Wifi, 
  Coffee, 
  Users, 
  Droplet, 
  Play,
  Clock,
  ChevronRight,
  ArrowLeftRight,
  Calendar as CalendarIcon,
  Train
} from "lucide-react";
import { format, addDays, parse } from "date-fns";
import { ru } from "date-fns/locale";
import { cities } from "@/data/cities";
import { cn } from "@/lib/utils";
import { apiFetch } from "@/lib/api";

interface Amenity {
  icon: React.ReactNode;
  name: string;
  description: string;
}

interface TicketType {
  type: "platzkart" | "coupe" | "sv";
  name: string;
  lowerBerths: number;
  upperBerths: number;
  price: number;
}

interface TrainRoute {
  id: string;
  trainNumber: string;
  trainName: string;
  tags?: string[];
  departureTime: string;
  departureDate: Date;
  departureStation: string;
  departureCity: string;
  arrivalTime: string;
  arrivalDate: Date;
  arrivalStation: string;
  arrivalCity: string;
  duration: string;
  amenities: Amenity[];
  reviews: {
    count: number;
    rating: number;
  };
  tickets: TicketType[];
  minPrice: number;
}

// Хардкоженные данные для удобств
const amenitiesData: Amenity[] = [
  {
    icon: <Snowflake className="w-5 h-5" />,
    name: "Кондиционер",
    description: "Кондиционер установлен в вагоне для комфортной температуры"
  },
  {
    icon: <Utensils className="w-5 h-5" />,
    name: "Питание",
    description: "Питание доступно в вагоне-ресторане или можно заказать доставку в купе"
  },
  {
    icon: <Wifi className="w-5 h-5" />,
    name: "Wi-Fi",
    description: "Бесплатный Wi-Fi доступен в поезде"
  },
  {
    icon: <Coffee className="w-5 h-5" />,
    name: "Вагон-ресторан",
    description: "В поезде есть вагон-ресторан с горячими блюдами и напитками"
  },
  {
    icon: <Users className="w-5 h-5" />,
    name: "Женское/мужское купе",
    description: "Доступны купе для женщин и мужчин"
  },
  {
    icon: <Droplet className="w-5 h-5" />,
    name: "Биотуалет",
    description: "В вагоне установлены биотуалеты"
  },
  {
    icon: <Play className="w-5 h-5" />,
    name: "Мультимедийный портал",
    description: "Кинотеатр, книги, музыка доступны через мультимедийный портал"
  }
];

/** Данные с бэкенда (даты без времени, ISO-календарь) */
interface TrainRouteFromApi
  extends Omit<TrainRoute, "departureDate" | "arrivalDate" | "amenities"> {
  departureDate: string;
  arrivalDate: string;
}

const RZD_FALLBACK_AMENITIES = amenitiesData.slice(0, 5);

function deserializeTrainRoutes(rows: TrainRouteFromApi[]): TrainRoute[] {
  const ref = new Date();
  return rows.map((r) => ({
    ...r,
    departureDate: parse(r.departureDate, "yyyy-MM-dd", ref),
    arrivalDate: parse(r.arrivalDate, "yyyy-MM-dd", ref),
    amenities: RZD_FALLBACK_AMENITIES,
  }));
}

function filterRoutesByTicketType(
  routes: TrainRoute[],
  ticketType: string
): TrainRoute[] {
  if (!ticketType || ticketType === "all") return routes;
  return routes.filter((route) =>
    route.tickets.some((ticket) => ticket.type === ticketType)
  );
}

const TrainSearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialFromCity = searchParams.get("from") || "Москва";
  const initialToCity = searchParams.get("to") || "Санкт-Петербург";
  const dateStr = searchParams.get("date");
  const initialTicketType = searchParams.get("ticketType") || "all";
  const initialPassengers = searchParams.get("passengers") || "1";

  const [fromCity, setFromCity] = useState(initialFromCity);
  const [toCity, setToCity] = useState(initialToCity);
  const [ticketType, setTicketType] = useState(initialTicketType);
  const [passengers, setPassengers] = useState(initialPassengers);
  const [selectedDate, setSelectedDate] = useState<Date>(dateStr ? new Date(dateStr) : new Date());

  const departureDate = selectedDate;

  const [rawRoutes, setRawRoutes] = useState<TrainRouteFromApi[]>([]);
  const [routeLoad, setRouteLoad] = useState<"idle" | "loading" | "error" | "ok">("idle");
  const [routeError, setRouteError] = useState<string | null>(null);

  const normalizedRoutes = useMemo(
    () => deserializeTrainRoutes(rawRoutes),
    [rawRoutes]
  );
  const routes = useMemo(
    () => filterRoutesByTicketType(normalizedRoutes, ticketType),
    [normalizedRoutes, ticketType]
  );

  useEffect(() => {
    let cancelled = false;
    const day = format(departureDate, "yyyy-MM-dd");
    setRouteLoad("loading");
    setRouteError(null);
    (async () => {
      try {
        const data = await apiFetch<{ routes: TrainRouteFromApi[]; message?: string }>(
          `/api/train-search/rzd?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&date=${encodeURIComponent(day)}`
        );
        if (cancelled) return;
        setRawRoutes(Array.isArray(data.routes) ? data.routes : []);
        setRouteLoad("ok");
        if (data.message && (!data.routes || data.routes.length === 0)) {
          setRouteError(data.message);
        }
      } catch (e) {
        if (cancelled) return;
        setRawRoutes([]);
        setRouteLoad("error");
        setRouteError(e instanceof Error ? e.message : "Не удалось загрузить расписание");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [fromCity, toCity, departureDate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [fromCity, toCity, selectedDate, ticketType]);

  // Обновляем URL при изменении параметров
  const updateSearchParams = (newFrom?: string, newTo?: string, newDate?: Date, newTicketType?: string, newPassengers?: string) => {
    const params = new URLSearchParams();
    params.set("from", newFrom || fromCity);
    params.set("to", newTo || toCity);
    params.set("date", format(newDate || selectedDate, "yyyy-MM-dd"));
    if (newTicketType !== undefined) {
      params.set("ticketType", newTicketType || "all");
    } else if (ticketType !== "all") {
      params.set("ticketType", ticketType);
    }
    params.set("passengers", newPassengers || passengers);
    setSearchParams(params);
  };

  const handleSwapCities = () => {
    const newFrom = toCity;
    const newTo = fromCity;
    setFromCity(newFrom);
    setToCity(newTo);
    updateSearchParams(newFrom, newTo);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    updateSearchParams(undefined, undefined, date);
  };

  const handleSearch = () => {
    updateSearchParams();
  };

  // Генерируем даты для календаря (выбранная + 2 до/после)
  const getDateRange = () => {
    const dates: Date[] = [];
    for (let i = -2; i <= 2; i++) {
      dates.push(addDays(selectedDate, i));
    }
    return dates;
  };

  const dateRange = getDateRange();

  const formatDate = (date: Date) => {
    return format(date, "d MMM, EEE", { locale: ru });
  };

  const formatShortDate = (date: Date) => {
    const day = format(date, "d", { locale: ru });
    const month = format(date, "MMM", { locale: ru });
    const weekday = format(date, "EEE", { locale: ru });
    // Сокращаем названия дней недели до 3 букв
    const dayMap: Record<string, string> = {
      "пн": "пнд",
      "вт": "втр", 
      "ср": "срд",
      "чт": "чтв",
      "пт": "птн",
      "сб": "сбт",
      "вс": "вск"
    };
    const shortWeekday = dayMap[weekday] || weekday;
    return `${day} ${month}, ${shortWeekday}`;
  };

  const formatReviewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}К`;
    }
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-24 pb-8 md:pt-32">
        {/* Форма поиска */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col lg:flex-row gap-3 items-stretch">
                {/* Откуда */}
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Откуда</label>
                  <Select value={fromCity} onValueChange={(value) => {
                    setFromCity(value);
                    updateSearchParams(value, undefined);
                  }}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={`from-${city}`} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Кнопка обмена */}
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12"
                    onClick={handleSwapCities}
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Куда */}
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Куда</label>
                  <Select value={toCity} onValueChange={(value) => {
                    setToCity(value);
                    updateSearchParams(undefined, value);
                  }}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={`to-${city}`} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Когда */}
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Когда</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "h-12 w-full justify-start text-left font-normal px-3",
                          "text-sm"
                        )}
                      >
                        <CalendarIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                        {formatDate(selectedDate)}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          if (date) {
                            handleDateChange(date);
                          }
                        }}
                        initialFocus
                        numberOfMonths={2}
                        disabled={(date) => date < new Date()}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Кто едет */}
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Кто едет</label>
                  <Select value={passengers} onValueChange={(value) => {
                    setPassengers(value);
                    updateSearchParams(undefined, undefined, undefined, undefined, value);
                  }}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 пассажир</SelectItem>
                      <SelectItem value="2">2 пассажира</SelectItem>
                      <SelectItem value="3">3 пассажира</SelectItem>
                      <SelectItem value="4">4 пассажира</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Кнопка поиска */}
                <div className="flex items-end">
                  <Button
                    className="h-12 px-8 bg-purple-600 hover:bg-purple-700"
                    onClick={handleSearch}
                  >
                    Найти поезда
                  </Button>
                </div>
              </div>

              {/* Календарь с датами */}
              <div className="flex items-center gap-3 mt-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm flex-shrink-0 border border-purple-200 hover:bg-purple-50 transition-colors">
                      <CalendarIcon className="w-5 h-5 text-purple-600" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        if (date) {
                          handleDateChange(date);
                        }
                      }}
                      initialFocus
                      numberOfMonths={2}
                      disabled={(date) => date < new Date()}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <div className="flex gap-2 flex-1 overflow-x-auto">
                  {dateRange.map((date, index) => {
                    const isSelected = format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
                    return (
                      <button
                        key={index}
                        onClick={() => handleDateChange(date)}
                        className={cn(
                          "px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0",
                          isSelected
                            ? "bg-purple-600 text-white shadow-md"
                            : "bg-white border border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300"
                        )}
                      >
                        <div className="font-semibold">{formatShortDate(date)}</div>
                        <div className={cn(
                          "text-xs mt-1",
                          isSelected ? "text-white/90" : "text-muted-foreground"
                        )}>
                          {routeLoad === "loading"
                            ? "…"
                            : normalizedRoutes[0]?.minPrice
                              ? `${normalizedRoutes[0].minPrice.toLocaleString("ru-RU")} Р`
                              : "—"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Заголовок */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Train className="w-5 h-5 text-primary" />
          </div>
          <h1 className="heading-gradient text-3xl md:text-4xl font-bold tracking-tight">
            Ж/д билеты
          </h1>
        </div>

        {/* Список маршрутов */}
        {routeLoad === "loading" && (
          <p className="text-center py-16 text-muted-foreground">
            Загружаем расписание РЖД…
          </p>
        )}
        {routeLoad === "error" && routeError && (
          <p className="text-center py-8 text-red-600" role="alert">
            {routeError}
          </p>
        )}
        <div className="space-y-6">
          {routeLoad !== "loading" &&
          routes.map((route) => (
            <Card key={route.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Левая часть: Информация о поезде */}
                  <div className="flex-1 space-y-4">
                    {/* Теги и номер поезда */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {route.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-900"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                        {route.trainNumber} {route.trainName}
                      </span>
                    </div>

                    {/* Время и станции */}
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                      {/* Отправление */}
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-3xl font-bold">{route.departureTime}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(route.departureDate)}
                          </div>
                          <div className="text-sm font-medium mt-1">{route.departureStation}</div>
                          <div className="text-sm text-muted-foreground">{route.departureCity}</div>
                        </div>
                      </div>

                      {/* Продолжительность с линией */}
                      <div className="flex-1 relative">
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                          <Clock className="w-4 h-4" />
                          <span>
                            {route.duration === "—"
                              ? route.duration
                              : `${route.duration} в пути`}
                          </span>
                        </div>
                        <div className="relative h-[2px] bg-border">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary" />
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary" />
                        </div>
                      </div>

                      {/* Прибытие */}
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-3xl font-bold">{route.arrivalTime}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(route.arrivalDate)}
                          </div>
                          <div className="text-sm font-medium mt-1">{route.arrivalStation}</div>
                          <div className="text-sm text-muted-foreground">{route.arrivalCity}</div>
                        </div>
                      </div>
                    </div>

                    {/* Удобства */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <TooltipProvider delayDuration={0}>
                        {route.amenities.map((amenity, index) => (
                          <Tooltip key={index}>
                            <TooltipTrigger asChild>
                              <div className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100 cursor-help transition-colors border border-purple-100">
                                <div className="text-purple-600">
                                  {amenity.icon}
                                </div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-[#1a1a1a] text-white border-0">
                              <div className="space-y-1">
                                <div className="font-semibold text-white">{amenity.name}</div>
                                <div className="text-sm text-gray-300 max-w-xs">
                                  {amenity.description}
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </TooltipProvider>
                    </div>
                  </div>

                  {/* Правая часть: Отзывы, цены и кнопка */}
                  <div className="lg:w-80 space-y-4">
                    {/* Отзывы */}
                    <div className="flex items-center justify-end gap-2">
                      {route.reviews.count > 0 ? (
                        <>
                          <span className="text-sm text-muted-foreground">
                            {formatReviewCount(route.reviews.count)} отзывов
                          </span>
                          <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">
                            {route.reviews.rating}
                          </div>
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Оценки от пассажиров не собираем
                        </span>
                      )}
                    </div>

                    {/* Типы билетов и цены */}
                    <div className="space-y-2">
                      {(() => {
                        // Все возможные типы мест
                        const allTicketTypes = [
                          { type: "platzkart" as const, name: "Плацкарт" },
                          { type: "coupe" as const, name: "Купе" },
                          { type: "sv" as const, name: "СВ" }
                        ];

                        return allTicketTypes.map((ticketTypeInfo) => {
                          // Ищем билет в маршруте
                          const ticket = route.tickets.find(t => t.type === ticketTypeInfo.type);
                          
                          // Если билета нет или он распродан
                          const isSoldOut = !ticket || (ticket.lowerBerths === 0 && ticket.upperBerths === 0);
                          
                          return (
                            <div
                              key={ticketTypeInfo.type}
                              className="flex items-center justify-between text-sm"
                            >
                              <div>
                                <span className="font-medium">{ticketTypeInfo.name}</span>
                                {isSoldOut ? (
                                  <span className="text-red-600 ml-2 font-semibold">Распродано</span>
                                ) : (
                                  <span className="text-muted-foreground ml-2">
                                    {ticket.lowerBerths > 0 && `${ticket.lowerBerths} ниж`}
                                    {ticket.lowerBerths > 0 && ticket.upperBerths > 0 && ", "}
                                    {ticket.upperBerths > 0 && `${ticket.upperBerths} верх`}
                                  </span>
                                )}
                              </div>
                              {!isSoldOut && ticket && (
                                <span className="font-semibold">
                                  от {ticket.price.toLocaleString("ru-RU")} Р
                                </span>
                              )}
                            </div>
                          );
                        });
                      })()}
                    </div>

                    {/* Цена и кнопка */}
                    <div className="pt-4 border-t">
                      <div className="text-2xl font-bold mb-1">
                        {route.minPrice > 0 ? (
                          <>от {route.minPrice.toLocaleString("ru-RU")} Р</>
                        ) : (
                          <>цена недоступна</>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">за одного</div>
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        onClick={() => {
                          const params = new URLSearchParams({
                            routeId: route.id,
                            from: fromCity,
                            to: toCity,
                            date: format(departureDate, "yyyy-MM-dd"),
                            ticketType: ticketType,
                            passengers: passengers,
                            travelType: "train"
                          });
                          navigate(`/select-seats?${params.toString()}`);
                        }}
                      >
                        Выбрать места
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {routeLoad === "ok" && routes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              {routeError ||
                "К сожалению, на выбранную дату нет подходящих поездов (измените тип мест или дату)."}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TrainSearchResults;

