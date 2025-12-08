import { useEffect, useState } from "react";
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
import { format, addDays } from "date-fns";
import { ru } from "date-fns/locale";
import { cities } from "@/data/cities";
import { cn } from "@/lib/utils";

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

import { getStation } from "@/data/stations";

// Функция для генерации маршрутов на основе параметров поиска
const generateRoutes = (
  fromCity: string,
  toCity: string,
  departureDate: Date,
  ticketType: string
): TrainRoute[] => {
  // Хардкоженные данные маршрутов
  const routes: TrainRoute[] = [
    {
      id: "1",
      trainNumber: "022А",
      trainName: "Ночной экспресс",
      departureTime: "00:25",
      departureDate,
      departureStation: getStation(fromCity, 0),
      departureCity: fromCity,
      arrivalTime: "09:26",
      arrivalDate: departureDate,
      arrivalStation: getStation(toCity, 0),
      arrivalCity: toCity,
      duration: "9 ч 1 м",
      amenities: [amenitiesData[0], amenitiesData[1], amenitiesData[2], amenitiesData[3], amenitiesData[4], amenitiesData[5]],
      reviews: {
        count: 169,
        rating: 9.7
      },
      tickets: [
        {
          type: "coupe",
          name: "Купе",
          lowerBerths: 140,
          upperBerths: 142,
          price: 4605
        },
        {
          type: "sv",
          name: "СВ",
          lowerBerths: 16,
          upperBerths: 0,
          price: 12987
        }
      ],
      minPrice: 4605
    },
    {
      id: "2",
      trainNumber: "016А",
      trainName: "Арктика",
      tags: ["Фирменный", "Проходящий"],
      departureTime: "00:46",
      departureDate,
      departureStation: getStation(fromCity, 0),
      departureCity: fromCity,
      arrivalTime: "09:13",
      arrivalDate: departureDate,
      arrivalStation: getStation(toCity, 1),
      arrivalCity: toCity,
      duration: "8 ч 27 м",
      amenities: [amenitiesData[0], amenitiesData[1], amenitiesData[2], amenitiesData[3], amenitiesData[4]],
      reviews: {
        count: 2000,
        rating: 8.7
      },
      tickets: [
        {
          type: "platzkart",
          name: "Плацкарт",
          lowerBerths: 29,
          upperBerths: 98,
          price: 2451
        },
        {
          type: "coupe",
          name: "Купе",
          lowerBerths: 22,
          upperBerths: 20,
          price: 5516
        },
        {
          type: "sv",
          name: "СВ",
          lowerBerths: 6,
          upperBerths: 6,
          price: 14867
        }
      ],
      minPrice: 2451
    },
    {
      id: "3",
      trainNumber: "060*Г",
      trainName: "Волга",
      tags: ["Фирменный", "Проходящий"],
      departureTime: "00:48",
      departureDate,
      departureStation: getStation(fromCity, 2),
      departureCity: fromCity,
      arrivalTime: "09:57",
      arrivalDate: departureDate,
      arrivalStation: getStation(toCity, 0),
      arrivalCity: toCity,
      duration: "9 ч 9 м",
      amenities: [amenitiesData[0], amenitiesData[1], amenitiesData[2], amenitiesData[3], amenitiesData[6]],
      reviews: {
        count: 1400,
        rating: 9.0
      },
      tickets: [
        {
          type: "platzkart",
          name: "Плацкарт",
          lowerBerths: 72,
          upperBerths: 79,
          price: 3220
        },
        {
          type: "coupe",
          name: "Купе",
          lowerBerths: 21,
          upperBerths: 27,
          price: 4861
        },
        {
          type: "sv",
          name: "СВ",
          lowerBerths: 16,
          upperBerths: 0,
          price: 16840
        }
      ],
      minPrice: 3220
    },
    {
      id: "4",
      trainNumber: "057M",
      trainName: "",
      departureTime: "01:00",
      departureDate,
      departureStation: getStation(fromCity, 1),
      departureCity: fromCity,
      arrivalTime: "10:41",
      arrivalDate: departureDate,
      arrivalStation: getStation(toCity, 0),
      arrivalCity: toCity,
      duration: "9 ч 41 м",
      amenities: [amenitiesData[0], amenitiesData[1], amenitiesData[4], amenitiesData[5]],
      reviews: {
        count: 164,
        rating: 7.8
      },
      tickets: [
        {
          type: "platzkart",
          name: "Плацкарт",
          lowerBerths: 150,
          upperBerths: 153,
          price: 2196
        },
        {
          type: "coupe",
          name: "Купе",
          lowerBerths: 61,
          upperBerths: 66,
          price: 2239
        },
        {
          type: "sv",
          name: "СВ",
          lowerBerths: 0,
          upperBerths: 0,
          price: 10005
        }
      ],
      minPrice: 2196
    },
    {
      id: "5",
      trainNumber: "050*C",
      trainName: "",
      tags: ["Проходящий"],
      departureTime: "02:05",
      departureDate,
      departureStation: getStation(fromCity, 2),
      departureCity: fromCity,
      arrivalTime: "11:00",
      arrivalDate: departureDate,
      arrivalStation: getStation(toCity, 0),
      arrivalCity: toCity,
      duration: "8 ч 55 м",
      amenities: [amenitiesData[0], amenitiesData[4], amenitiesData[5]],
      reviews: {
        count: 282,
        rating: 7.6
      },
      tickets: [
        {
          type: "platzkart",
          name: "Плацкарт",
          lowerBerths: 76,
          upperBerths: 96,
          price: 2196
        },
        {
          type: "coupe",
          name: "Купе",
          lowerBerths: 41,
          upperBerths: 57,
          price: 3183
        }
      ],
      minPrice: 2196
    },
    {
      id: "6",
      trainNumber: "082B",
      trainName: "",
      tags: ["Двухэтажный", "Проходящий"],
      departureTime: "03:13",
      departureDate,
      departureStation: getStation(fromCity, 2),
      departureCity: fromCity,
      arrivalTime: "11:40",
      arrivalDate: departureDate,
      arrivalStation: getStation(toCity, 0),
      arrivalCity: toCity,
      duration: "8 ч 27 м",
      amenities: [amenitiesData[0], amenitiesData[1], amenitiesData[4], amenitiesData[5], amenitiesData[6]],
      reviews: {
        count: 1100,
        rating: 7.8
      },
      tickets: [
        {
          type: "coupe",
          name: "Купе",
          lowerBerths: 160,
          upperBerths: 186,
          price: 2389
        },
        {
          type: "sv",
          name: "СВ",
          lowerBerths: 22,
          upperBerths: 0,
          price: 13098
        }
      ],
      minPrice: 2389
    }
  ];

  // Фильтруем по типу билета, если указан
  if (ticketType && ticketType !== "all") {
    return routes.filter(route => 
      route.tickets.some(ticket => ticket.type === ticketType)
    );
  }

  return routes;
};

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

  const routes = generateRoutes(fromCity, toCity, departureDate, ticketType);

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
                          {routes[0]?.minPrice?.toLocaleString("ru-RU") || "4605"} Р
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
          <h1 className="text-3xl font-bold">
            Ж/д билеты
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
                      <span className="text-sm text-muted-foreground">
                        {formatReviewCount(route.reviews.count)} отзывов
                      </span>
                      <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">
                        {route.reviews.rating}
                      </div>
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
                        от {route.minPrice.toLocaleString("ru-RU")} Р
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

        {routes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              К сожалению, на выбранную дату нет доступных поездов
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TrainSearchResults;

