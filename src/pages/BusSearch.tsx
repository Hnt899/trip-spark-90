import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { 
  Clock,
  ArrowLeftRight,
  Calendar as CalendarIcon,
  Bus
} from "lucide-react";
import { format, addDays } from "date-fns";
import { ru } from "date-fns/locale";
import { cities } from "@/data/cities";
import { cn } from "@/lib/utils";

interface BusRoute {
  id: string;
  busNumber: string;
  carrierName: string;
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
  reviews: {
    count: number;
    rating: number;
  };
  price: number;
}

// Маппинг автовокзалов для городов
const busStationMap: Record<string, string[]> = {
  "Москва": ["Центральный автовокзал", "Северные ворота", "Южные ворота", "Щёлковский автовокзал"],
  "Санкт-Петербург": ["Автовокзал №2", "Обводный канал", "Парнас"],
  "Казань": ["Центральный автовокзал", "Южный автовокзал"],
  "Сочи": ["Центральный автовокзал"],
  "Новосибирск": ["Центральный автовокзал", "Заельцовский"],
  "Екатеринбург": ["Северный автовокзал"],
  "Нижний Новгород": ["Центральный автовокзал"],
  "Самара": ["Центральный автовокзал"],
  "Ростов-на-Дону": ["Центральный автовокзал"],
  "Владивосток": ["Центральный автовокзал"]
};

const getBusStation = (city: string, index: number = 0): string => {
  const stations = busStationMap[city] || [city];
  return stations[index % stations.length];
};

// Функция для генерации маршрутов на основе параметров поиска
const generateRoutes = (
  fromCity: string,
  toCity: string,
  departureDate: Date
): BusRoute[] => {
  // Хардкоженные данные маршрутов
  const routes: BusRoute[] = [
    {
      id: "1",
      busNumber: "101",
      carrierName: "Автолайн",
      tags: ["Комфорт", "Прямой"],
      departureTime: "06:25",
      departureDate,
      departureStation: getBusStation(fromCity, 0),
      departureCity: fromCity,
      arrivalTime: "15:26",
      arrivalDate: departureDate,
      arrivalStation: getBusStation(toCity, 0),
      arrivalCity: toCity,
      duration: "9 ч 1 м",
      reviews: {
        count: 169,
        rating: 9.7
      },
      price: 2605
    },
    {
      id: "2",
      busNumber: "205",
      carrierName: "Экспресс",
      tags: ["Комфорт", "Прямой"],
      departureTime: "08:46",
      departureDate,
      departureStation: getBusStation(fromCity, 1),
      departureCity: fromCity,
      arrivalTime: "17:13",
      arrivalDate: departureDate,
      arrivalStation: getBusStation(toCity, 0),
      arrivalCity: toCity,
      duration: "8 ч 27 м",
      reviews: {
        count: 2000,
        rating: 8.7
      },
      price: 2451
    },
    {
      id: "3",
      busNumber: "312",
      carrierName: "Транс-Лайн",
      tags: ["Прямой", "Дневной"],
      departureTime: "10:48",
      departureDate,
      departureStation: getBusStation(fromCity, 2),
      departureCity: fromCity,
      arrivalTime: "20:57",
      arrivalDate: departureDate,
      arrivalStation: getBusStation(toCity, 0),
      arrivalCity: toCity,
      duration: "10 ч 9 м",
      reviews: {
        count: 1400,
        rating: 9.0
      },
      price: 3220
    },
    {
      id: "4",
      busNumber: "418",
      carrierName: "Автобус-Тур",
      departureTime: "14:00",
      departureDate,
      departureStation: getBusStation(fromCity, 0),
      departureCity: fromCity,
      arrivalTime: "23:41",
      arrivalDate: departureDate,
      arrivalStation: getBusStation(toCity, 0),
      arrivalCity: toCity,
      duration: "9 ч 41 м",
      reviews: {
        count: 164,
        rating: 7.8
      },
      price: 2196
    },
    {
      id: "5",
      busNumber: "527",
      carrierName: "Межгород",
      tags: ["Прямой"],
      departureTime: "16:05",
      departureDate,
      departureStation: getBusStation(fromCity, 1),
      departureCity: fromCity,
      arrivalTime: "01:00",
      arrivalDate: addDays(departureDate, 1),
      arrivalStation: getBusStation(toCity, 0),
      arrivalCity: toCity,
      duration: "8 ч 55 м",
      reviews: {
        count: 282,
        rating: 7.6
      },
      price: 2196
    },
    {
      id: "6",
      busNumber: "634",
      carrierName: "Туристический",
      tags: ["Комфорт", "Прямой"],
      departureTime: "20:13",
      departureDate,
      departureStation: getBusStation(fromCity, 2),
      departureCity: fromCity,
      arrivalTime: "04:40",
      arrivalDate: addDays(departureDate, 1),
      arrivalStation: getBusStation(toCity, 0),
      arrivalCity: toCity,
      duration: "8 ч 27 м",
      reviews: {
        count: 1100,
        rating: 7.8
      },
      price: 2389
    }
  ];

  return routes;
};

const BusSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialFromCity = searchParams.get("from") || "Москва";
  const initialToCity = searchParams.get("to") || "Санкт-Петербург";
  const dateStr = searchParams.get("date");
  const initialPassengers = searchParams.get("passengers") || "1";

  const [fromCity, setFromCity] = useState(initialFromCity);
  const [toCity, setToCity] = useState(initialToCity);
  const [passengers, setPassengers] = useState(initialPassengers);
  const [selectedDate, setSelectedDate] = useState<Date>(dateStr ? new Date(dateStr) : new Date());

  const departureDate = selectedDate;

  const routes = generateRoutes(fromCity, toCity, departureDate);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [fromCity, toCity, selectedDate]);

  // Обновляем URL при изменении параметров
  const updateSearchParams = (newFrom?: string, newTo?: string, newDate?: Date, newPassengers?: string) => {
    const params = new URLSearchParams();
    params.set("from", newFrom || fromCity);
    params.set("to", newTo || toCity);
    params.set("date", format(newDate || selectedDate, "yyyy-MM-dd"));
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
      <main className="container py-8">
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
                    updateSearchParams(undefined, undefined, undefined, value);
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
                    Найти автобусы
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
                          {routes[0]?.price?.toLocaleString("ru-RU") || "2605"} Р
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
            <Bus className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">
            Автобусы
          </h1>
        </div>

        {/* Список маршрутов */}
        <div className="space-y-6">
          {routes.map((route) => (
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
                        {route.busNumber} {route.carrierName}
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
                          <div className="text-sm font-medium mt-1">Автовокзал {route.departureStation}</div>
                          <div className="text-sm text-muted-foreground">{route.departureCity}</div>
                        </div>
                      </div>

                      {/* Продолжительность с линией */}
                      <div className="flex-1 relative">
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                          <Clock className="w-4 h-4" />
                          <span>{route.duration} в пути</span>
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
                          <div className="text-sm font-medium mt-1">Автовокзал {route.arrivalStation}</div>
                          <div className="text-sm text-muted-foreground">{route.arrivalCity}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Правая часть: Отзывы, цены и кнопка */}
                  <div className="lg:w-80 space-y-4">
                    {/* Отзывы */}
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-sm text-muted-foreground">
                        {formatReviewCount(route.reviews.count)} отзывов
                      </span>
                      <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">
                        {route.reviews.rating}
                      </div>
                    </div>

                    {/* Цена и кнопка */}
                    <div className="pt-4 border-t">
                      <div className="text-2xl font-bold mb-1">
                        {route.price.toLocaleString("ru-RU")} Р
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
                            passengers: passengers,
                            travelType: "bus"
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

        {routes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              К сожалению, на выбранную дату нет доступных автобусов
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BusSearch;
