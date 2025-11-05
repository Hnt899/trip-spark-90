import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Minus,
  Plus,
  Power,
  Info,
  Image as ImageIcon
} from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface Car {
  id: string;
  number: string;
  name: string;
  type: "coupe" | "sv";
  totalSeats: number;
  lowerBerths: number;
  upperBerths: number;
  priceRange: {
    min: number;
    max: number;
  };
  rating: number;
  reviews: number;
  amenities: string[];
  availableSeats: number[];
}

interface BestOption {
  id: string;
  carNumber: string;
  seatNumber: string;
  type: "lower" | "upper";
  price: number;
  description: string[];
  rating: number;
  amenities: string[];
}

const SelectSeats = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const routeId = searchParams.get("routeId");
  const fromCity = searchParams.get("from") || "Москва";
  const toCity = searchParams.get("to") || "Санкт-Петербург";
  const dateStr = searchParams.get("date");
  const ticketType = searchParams.get("ticketType") || "coupe";
  const passengersParam = searchParams.get("passengers") || "1";

  // Если передано количество пассажиров (2, 3, 4), устанавливаем его как взрослых
  const initialAdults = parseInt(passengersParam) >= 2 && parseInt(passengersParam) <= 4 
    ? parseInt(passengersParam) 
    : 1;

  const [adults, setAdults] = useState(initialAdults);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [selectedTicketType, setSelectedTicketType] = useState<string>(ticketType);

  const departureDate = dateStr ? new Date(dateStr) : new Date();
  
  // Вычисляем общее количество пассажиров (взрослые + дети с местами, исключая малышей до 5 лет)
  const totalPassengers = adults + children;

  // Хардкоженные данные для лучших вариантов
  const bestOptions: BestOption[] = [
    {
      id: "1",
      carNumber: "4",
      seatNumber: "19",
      type: "lower",
      price: 5892,
      description: [
        "Свободное купе",
        "Вагон посвободнее",
        "Меньше шума",
        "Нижние места"
      ],
      rating: 9.7,
      amenities: ["dining", "wifi", "ac", "power", "pets"]
    },
    {
      id: "2",
      carNumber: "4",
      seatNumber: "18",
      type: "upper",
      price: 5300,
      description: [
        "Свободное купе",
        "Вагон посвободнее",
        "Меньше шума",
        "Дешевле других мест в вагоне",
        "Верхние места"
      ],
      rating: 9.7,
      amenities: ["dining", "wifi", "ac", "power", "pets"]
    },
    {
      id: "3",
      carNumber: "4",
      seatNumber: "29",
      type: "lower",
      price: 5892,
      description: [
        "Свободное купе",
        "Вагон посвободнее",
        "Нижние места",
        "Рядом с туалетом"
      ],
      rating: 9.7,
      amenities: ["dining", "wifi", "ac", "power", "pets"]
    }
  ];

  // Хардкоженные данные для вагонов
  const coupeCars: Car[] = [
    {
      id: "coupe-1",
      number: "2",
      name: "ТВЕРСК",
      type: "coupe",
      totalSeats: 34,
      lowerBerths: 16,
      upperBerths: 18,
      priceRange: { min: 4605, max: 5893 },
      rating: 9.8,
      reviews: 36,
      amenities: ["wifi", "ac", "power", "pets", "info"],
      availableSeats: Array.from({ length: 34 }, (_, i) => i + 1)
    },
    {
      id: "coupe-2",
      number: "3",
      name: "ТВЕРСК",
      type: "coupe",
      totalSeats: 36,
      lowerBerths: 18,
      upperBerths: 18,
      priceRange: { min: 5300, max: 5892 },
      rating: 9.7,
      reviews: 42,
      amenities: ["dining", "gender", "ac", "wifi", "toilet", "power", "blanket", "no-pets", "info"],
      availableSeats: Array.from({ length: 36 }, (_, i) => i + 1)
    },
    {
      id: "coupe-3",
      number: "4",
      name: "ТВЕРСК",
      type: "coupe",
      totalSeats: 36,
      lowerBerths: 18,
      upperBerths: 18,
      priceRange: { min: 5300, max: 5892 },
      rating: 9.7,
      reviews: 42,
      amenities: ["dining", "gender", "ac", "wifi", "toilet", "power", "blanket", "no-pets", "info"],
      availableSeats: Array.from({ length: 36 }, (_, i) => i + 1)
    }
  ];

  const svCars: Car[] = [
    {
      id: "sv-1",
      number: "8",
      name: "ТВЕРСК",
      type: "sv",
      totalSeats: 16,
      lowerBerths: 16,
      upperBerths: 0,
      priceRange: { min: 12987, max: 12987 },
      rating: 9.7,
      reviews: 14,
      amenities: ["dining", "gender", "ac", "wifi", "toilet", "power", "newspaper", "blanket", "no-pets", "info"],
      availableSeats: Array.from({ length: 16 }, (_, i) => i + 1)
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatDate = (date: Date) => {
    return format(date, "d MMM, EEE", { locale: ru });
  };

  const formatReviewCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}К`;
    }
    return count.toString();
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "ac":
        return <Snowflake className="w-4 h-4" />;
      case "dining":
        return <Utensils className="w-4 h-4" />;
      case "wifi":
        return <Wifi className="w-4 h-4" />;
      case "restaurant":
        return <Coffee className="w-4 h-4" />;
      case "gender":
        return <Users className="w-4 h-4" />;
      case "toilet":
        return <Droplet className="w-4 h-4" />;
      case "power":
        return <Power className="w-4 h-4" />;
      case "info":
        return <Info className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getAmenityName = (amenity: string) => {
    const names: Record<string, string> = {
      ac: "Кондиционер",
      dining: "Питание",
      wifi: "Wi-Fi",
      restaurant: "Вагон-ресторан",
      gender: "Женское/мужское купе",
      toilet: "Биотуалет",
      power: "Розетка",
      info: "Информация"
    };
    return names[amenity] || amenity;
  };

  const handleSelectOption = (option: BestOption) => {
    const totalPrice = option.price * totalPassengers;
    const params = new URLSearchParams({
      routeId: routeId || "",
      from: fromCity,
      to: toCity,
      date: dateStr || format(departureDate, "yyyy-MM-dd"),
      carNumber: option.carNumber,
      seatNumber: option.seatNumber,
      seatType: option.type,
      price: totalPrice.toString(),
      adults: adults.toString(),
      children: children.toString(),
      infants: infants.toString()
    });
    navigate(`/checkout?${params.toString()}`);
  };

  const handleSelectCar = (car: Car) => {
    const totalPrice = car.priceRange.min * totalPassengers;
    const params = new URLSearchParams({
      routeId: routeId || "",
      from: fromCity,
      to: toCity,
      date: dateStr || format(departureDate, "yyyy-MM-dd"),
      carId: car.id,
      carNumber: car.number,
      ticketType: car.type,
      price: totalPrice.toString(),
      adults: adults.toString(),
      children: children.toString(),
      infants: infants.toString()
    });
    navigate(`/checkout?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        {/* Заголовок с информацией о маршруте */}
        <div className="mb-6 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">{fromCity}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="font-medium">{toCity}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(departureDate)}</span>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold">022А Ночной экспресс</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">169 отзывов</span>
              <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">
                9.7
              </div>
            </div>
          </div>
        </div>

        {/* Информация о поезде */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center w-full">
                <div>
                  <div className="text-2xl font-bold">00:25</div>
                  <div className="text-sm text-muted-foreground">{formatDate(departureDate)}</div>
                  <div className="text-sm font-medium mt-1">Ленинградский вокзал</div>
                  <div className="text-sm text-muted-foreground">{fromCity}</div>
                </div>
                {/* Продолжительность с линией */}
                <div className="flex-1 relative">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                    <Clock className="w-4 h-4" />
                    <span>9 ч 1 м в пути</span>
                  </div>
                  <div className="relative h-[2px] bg-border">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold">09:26</div>
                  <div className="text-sm text-muted-foreground">{formatDate(departureDate)}</div>
                  <div className="text-sm font-medium mt-1">Московский вокзал</div>
                  <div className="text-sm text-muted-foreground">{toCity}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">169 отзывов</span>
                <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">
                  9.7
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Выбор пассажиров */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Укажите пассажиров</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Взрослые и дети старше 10 лет</div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    disabled={adults <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{adults}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setAdults(adults + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Дети до 10 лет с местом, дешевле</div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    disabled={children <= 0}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{children}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setChildren(children + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Малыши до 5 лет без места, бесплатно</div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setInfants(Math.max(0, infants - 1))}
                    disabled={infants <= 0}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center font-medium">{infants}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setInfants(infants + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Выбор вагона и мест */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Выберите вагон и места</h2>
          <Tabs value={selectedTicketType} onValueChange={setSelectedTicketType}>
            <TabsList className="mb-6">
              <TabsTrigger value="coupe">
                Купе
                <span className="ml-2 text-sm text-muted-foreground">
                  {coupeCars.reduce((sum, car) => sum + car.totalSeats, 0)} мест
                </span>
                <span className="ml-2 text-sm font-medium">
                  {Math.min(...coupeCars.map(c => c.priceRange.min)).toLocaleString("ru-RU")} — {Math.max(...coupeCars.map(c => c.priceRange.max)).toLocaleString("ru-RU")} Р
                </span>
              </TabsTrigger>
              <TabsTrigger value="sv">
                СВ
                <span className="ml-2 text-sm text-muted-foreground">
                  {svCars.reduce((sum, car) => sum + car.totalSeats, 0)} мест
                </span>
                <span className="ml-2 text-sm font-medium">
                  от {svCars[0]?.priceRange.min.toLocaleString("ru-RU")} Р
                </span>
              </TabsTrigger>
            </TabsList>

            {/* Лучшие варианты */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Нашли лучшие варианты</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {bestOptions.map((option) => (
                  <Card key={option.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <div className="font-semibold">Купе, {totalPassengers} {totalPassengers === 1 ? "место" : totalPassengers < 5 ? "места" : "мест"}</div>
                          <div className="text-sm text-muted-foreground">
                            {option.seatNumber} {option.type === "lower" ? "нижнее" : "верхнее"}, {option.carNumber} вагон
                          </div>
                        </div>
                        <div className="text-2xl font-bold">
                          {(option.price * totalPassengers).toLocaleString("ru-RU")} Р
                        </div>
                        {totalPassengers > 1 && (
                          <div className="text-sm text-muted-foreground">
                            {option.price.toLocaleString("ru-RU")} Р × {totalPassengers}
                          </div>
                        )}
                        <div className="space-y-1">
                          {option.description.map((desc, idx) => (
                            <div key={idx} className="text-sm text-muted-foreground">• {desc}</div>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{option.rating}</span>
                          <div className="flex gap-1">
                            {option.amenities.map((amenity, idx) => (
                              <div key={idx} className="w-6 h-6 rounded bg-purple-50 flex items-center justify-center text-purple-600">
                                {getAmenityIcon(amenity)}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            className="flex-1 bg-purple-600 hover:bg-purple-700"
                            onClick={() => handleSelectOption(option)}
                          >
                            Выбрать
                          </Button>
                          <Button variant="outline" size="sm">
                            Подробнее
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Список вагонов */}
            <TabsContent value="coupe" className="space-y-4">
              {coupeCars.map((car) => (
                <Card key={car.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div>
                            <div className="text-xl font-bold">{car.number} вагон</div>
                            <div className="text-sm text-muted-foreground">{car.name}</div>
                            <div className="text-sm text-muted-foreground">Купе, 2Л</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">
                              {car.rating}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {formatReviewCount(car.reviews)} отзывов
                            </span>
                            <Button variant="outline" size="sm">
                              <ImageIcon className="w-4 h-4 mr-2" />
                              Фото
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                          <TooltipProvider delayDuration={0}>
                            {car.amenities.map((amenity, idx) => (
                              <Tooltip key={idx}>
                                <TooltipTrigger asChild>
                                  <div className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100 cursor-help transition-colors border border-purple-100">
                                    <div className="text-purple-600">
                                      {getAmenityIcon(amenity)}
                                    </div>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-[#1a1a1a] text-white border-0">
                                  <div className="font-semibold text-white">{getAmenityName(amenity)}</div>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </TooltipProvider>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {car.totalSeats} мест
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {car.upperBerths} верх {car.lowerBerths} ниж
                        </div>
                        {/* Визуализация мест */}
                        <div className="mt-4 flex gap-1 flex-wrap max-w-md">
                          {Array.from({ length: car.totalSeats }).map((_, idx) => (
                            <div
                              key={idx}
                              className="w-6 h-6 rounded bg-blue-100 border border-blue-200"
                              title={`Место ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="md:w-48 space-y-4">
                        <div>
                          <div className="text-2xl font-bold">
                            {(car.priceRange.min * totalPassengers).toLocaleString("ru-RU")} — {(car.priceRange.max * totalPassengers).toLocaleString("ru-RU")} Р
                          </div>
                          {totalPassengers > 1 && (
                            <div className="text-sm text-muted-foreground mt-1">
                              {car.priceRange.min.toLocaleString("ru-RU")} — {car.priceRange.max.toLocaleString("ru-RU")} Р × {totalPassengers}
                            </div>
                          )}
                        </div>
                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          onClick={() => handleSelectCar(car)}
                        >
                          Выбрать
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="sv" className="space-y-4">
              {svCars.map((car) => (
                <Card key={car.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div>
                            <div className="text-xl font-bold">{car.number} вагон</div>
                            <div className="text-sm text-muted-foreground">{car.name}</div>
                            <div className="text-sm text-muted-foreground">СВ, 1Б</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">
                              {car.rating}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {formatReviewCount(car.reviews)} отзывов
                            </span>
                            <Button variant="outline" size="sm">
                              <ImageIcon className="w-4 h-4 mr-2" />
                              Фото
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                          <TooltipProvider delayDuration={0}>
                            {car.amenities.map((amenity, idx) => (
                              <Tooltip key={idx}>
                                <TooltipTrigger asChild>
                                  <div className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100 cursor-help transition-colors border border-purple-100">
                                    <div className="text-purple-600">
                                      {getAmenityIcon(amenity)}
                                    </div>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-[#1a1a1a] text-white border-0">
                                  <div className="font-semibold text-white">{getAmenityName(amenity)}</div>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </TooltipProvider>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {car.totalSeats} мест
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {car.lowerBerths} ниж
                        </div>
                        {/* Визуализация мест */}
                        <div className="mt-4 flex gap-1 flex-wrap max-w-md">
                          {Array.from({ length: car.totalSeats }).map((_, idx) => (
                            <div
                              key={idx}
                              className="w-6 h-6 rounded bg-blue-100 border border-blue-200"
                              title={`Место ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="md:w-48 space-y-4">
                        <div>
                          <div className="text-2xl font-bold">
                            {(car.priceRange.min * totalPassengers).toLocaleString("ru-RU")} Р
                          </div>
                          {totalPassengers > 1 && (
                            <div className="text-sm text-muted-foreground mt-1">
                              {car.priceRange.min.toLocaleString("ru-RU")} Р × {totalPassengers}
                            </div>
                          )}
                        </div>
                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          onClick={() => handleSelectCar(car)}
                        >
                          Выбрать
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SelectSeats;

