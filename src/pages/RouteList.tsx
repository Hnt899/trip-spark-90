import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RoutesHeader from "@/components/RoutesHeader";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Plane, BedDouble } from "lucide-react";
import karelia from "@/assets/karelia.jpg";
import moscow from "@/assets/moscow.jpg";
import stPetersburg from "@/assets/saint-petersburg.jpg";
import kazan from "@/assets/kazan.jpg";
import novgorod from "@/assets/novgorod.jpg";
import armenia from "@/assets/armenia.jpg";
import china from "@/assets/china.jpg";
import heroTrain from "@/assets/hero-train.jpg";

interface Route {
  id: string;
  name: string;
  rating: number;
  image: string;
  region: string;
}

const routes: Route[] = [
  // Центр
  { id: "1", name: "Владимирская область", rating: 8.2, image: karelia, region: "Центр" },
  { id: "2", name: "Воронежская область", rating: 9.5, image: moscow, region: "Центр" },
  { id: "3", name: "Зарайск и Коломна", rating: 8.5, image: stPetersburg, region: "Центр" },
  { id: "5", name: "Ивановская область, маршрут №1", rating: 8.6, image: novgorod, region: "Центр" },
  { id: "6", name: "Ивановская область, маршрут №2", rating: 9.5, image: armenia, region: "Центр" },
  // Северо-Запад
  { id: "7", name: "Калининградская область, маршрут №1", rating: 9.3, image: china, region: "Северо-Запад" },
  { id: "8", name: "Калининградская область, маршрут №4", rating: 9.0, image: heroTrain, region: "Северо-Запад" },
  { id: "10", name: "Мурманская область, маршрут №1", rating: 9.3, image: moscow, region: "Северо-Запад" },
  { id: "11", name: "Мурманская область, маршрут №2", rating: 9.8, image: stPetersburg, region: "Северо-Запад" },
  { id: "13", name: "Архангельская область", rating: 9.3, image: karelia, region: "Северо-Запад" },
  // Юг
  { id: "9", name: "Краснодарский край", rating: 10, image: karelia, region: "Юг" },
  { id: "14", name: "Ростов-на-Дону", rating: 9.1, image: moscow, region: "Юг" },
  { id: "15", name: "Крым", rating: 9.7, image: stPetersburg, region: "Юг" },
  { id: "16", name: "Ставропольский край", rating: 8.8, image: kazan, region: "Юг" },
  { id: "17", name: "Сочи и окрестности", rating: 9.6, image: novgorod, region: "Юг" },
  // Поволжье
  { id: "18", name: "Казань", rating: 9.4, image: kazan, region: "Поволжье" },
  { id: "19", name: "Самара", rating: 8.7, image: armenia, region: "Поволжье" },
  { id: "20", name: "Нижний Новгород", rating: 9.2, image: china, region: "Поволжье" },
  { id: "21", name: "Волгоград", rating: 8.9, image: heroTrain, region: "Поволжье" },
  { id: "22", name: "Великий Волжский путь", rating: 9.7, image: karelia, region: "Поволжье" },
  // Урал
  { id: "4", name: "Екатеринбург", rating: 8.9, image: kazan, region: "Урал" },
  { id: "23", name: "Челябинск", rating: 8.4, image: moscow, region: "Урал" },
  { id: "24", name: "Пермь", rating: 8.6, image: stPetersburg, region: "Урал" },
  { id: "25", name: "Тюмень", rating: 9.0, image: kazan, region: "Урал" },
  { id: "26", name: "ХМАО - Югра", rating: 9.9, image: novgorod, region: "Урал" },
  // Сибирь
  { id: "12", name: "Новосибирская область", rating: 7.4, image: kazan, region: "Сибирь" },
  { id: "27", name: "Красноярск", rating: 8.8, image: armenia, region: "Сибирь" },
  { id: "28", name: "Иркутск и Байкал", rating: 9.8, image: china, region: "Сибирь" },
  { id: "29", name: "Алтайский край", rating: 9.7, image: heroTrain, region: "Сибирь" },
  { id: "30", name: "Томск", rating: 8.5, image: karelia, region: "Сибирь" },
  // Кавказ
  { id: "31", name: "Дагестан", rating: 9.3, image: moscow, region: "Кавказ" },
  { id: "32", name: "Карачаево-Черкесия", rating: 9.1, image: stPetersburg, region: "Кавказ" },
  { id: "33", name: "Кабардино-Балкария", rating: 9.5, image: kazan, region: "Кавказ" },
  { id: "34", name: "Осетия", rating: 9.0, image: novgorod, region: "Кавказ" },
  { id: "35", name: "Чечня", rating: 9.2, image: armenia, region: "Кавказ" },
  // Дальний Восток
  { id: "36", name: "Владивосток и окрестности", rating: 10, image: china, region: "Дальний Восток" },
  { id: "37", name: "Хабаровск", rating: 8.9, image: heroTrain, region: "Дальний Восток" },
  { id: "38", name: "Камчатка", rating: 9.8, image: karelia, region: "Дальний Восток" },
  { id: "39", name: "Сахалин", rating: 9.4, image: moscow, region: "Дальний Восток" },
  { id: "40", name: "Якутия", rating: 9.6, image: stPetersburg, region: "Дальний Восток" },
];

const regions = [
  "Все регионы",
  "Центр",
  "Северо-Запад",
  "Юг",
  "Поволжье",
  "Урал",
  "Сибирь",
  "Кавказ",
  "Дальний Восток",
];

const RouteList = () => {
  const [activeRegion, setActiveRegion] = useState("Все регионы");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Автоматический поиск региона при вводе, если запрос точно совпадает с регионом
  useEffect(() => {
    if (searchQuery.trim()) {
      const foundRegion = regions.find(
        (region) =>
          region.toLowerCase() === searchQuery.toLowerCase().trim() && region !== "Все регионы"
      );
      if (foundRegion) {
        setActiveRegion(foundRegion);
      }
    }
  }, [searchQuery]);

  // Фильтрация маршрутов
  let filteredRoutes: Route[];
  
  if (searchQuery.trim()) {
    // Если есть поисковый запрос, ищем по всем маршрутам независимо от региона
    const query = searchQuery.toLowerCase().trim();
    filteredRoutes = routes.filter(route =>
      route.name.toLowerCase().includes(query) ||
      route.region.toLowerCase().includes(query)
    );
  } else {
    // Если нет поискового запроса, фильтруем по активному региону
    filteredRoutes = activeRegion === "Все регионы" 
      ? routes 
      : routes.filter(route => route.region === activeRegion);
  }

  const handleRouteClick = (routeId: string) => {
    navigate(`/routes/${routeId}`);
  };

  return (
    <div className="min-h-screen bg-[#F5F5FA]">
      <RoutesHeader />
      <main className="pt-16">
        {/* Header Section */}
        <div className="bg-[#F5F5FA] py-8">
          <div className="container">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-[#3F3F7F] mb-2">
                  Маршруты
                </h1>
                <p className="text-lg text-[#3F3F7F]/70">
                  50 готовых маршрутов для путешествий
                </p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A70F8]" />
                <Input
                  type="text"
                  placeholder="Поиск региона..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-64 rounded-full border-[#8A70F8] focus:border-[#8A70F8] focus:ring-[#8A70F8]"
                />
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4 flex-wrap">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeRegion === region
                      ? "bg-[#8A70F8] text-white"
                      : "text-[#8A70F8] hover:text-[#8A70F8]/80"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Routes Grid */}
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRoutes.map((route) => (
              <Card 
                key={route.id} 
                onClick={() => handleRouteClick(route.id)}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={route.image}
                    alt={route.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-lg font-semibold text-foreground line-clamp-2 flex-1">
                      {route.name}
                    </p>
                    <div className="flex-shrink-0">
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        className="drop-shadow-md"
                      >
                        <path
                          d="M25 0 L30 17.5 L50 17.5 L32.5 27.5 L37.5 45 L25 35 L12.5 45 L17.5 27.5 L0 17.5 L20 17.5 Z"
                          fill="#22C55E"
                          stroke="white"
                          strokeWidth="0.5"
                        />
                        <text
                          x="25"
                          y="31"
                          textAnchor="middle"
                          fill="white"
                          fontSize="16"
                          fontWeight="bold"
                        >
                          {route.rating}
                        </text>
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Booking Banner */}
        <div className="container py-12">
          <div className="bg-gradient-to-r from-[#8A70F8] to-[#9B82F8] rounded-3xl overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
              <div className="flex flex-col justify-center space-y-6">
                <div className="text-white space-y-2">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Забронировать жильё
                  </h2>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    и купить билеты можно
                  </h2>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    на TudaSuda
                  </h2>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-[#8A70F8] hover:bg-white/90 rounded-full px-6 py-6 text-lg font-semibold"
                  >
                    <Plane className="w-5 h-5 mr-2" />
                    Найти билеты
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-white text-white hover:bg-white/20 rounded-full px-6 py-6 text-lg font-semibold"
                  >
                    <BedDouble className="w-5 h-5 mr-2" />
                    Выбрать отель
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block relative h-64 lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-l from-[#8A70F8] to-transparent rounded-l-3xl" />
                <div className="relative h-full w-full bg-gray-200 rounded-l-3xl overflow-hidden">
                  <img
                    src={heroTrain}
                    alt="Отель"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RouteList;
