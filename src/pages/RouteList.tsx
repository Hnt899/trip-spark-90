import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Plane, BedDouble } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import karelia from "@/assets/images/cities/karelia.jpg";
import moscow from "@/assets/images/cities/moscow.jpg";
import stPetersburg from "@/assets/images/cities/saint-petersburg.jpg";
import kazan from "@/assets/images/cities/kazan.jpg";
import novgorod from "@/assets/images/cities/novgorod.jpg";
import armenia from "@/assets/images/cities/armenia.jpg";
import china from "@/assets/images/cities/china.jpg";
import heroTrain from "@/assets/images/hero/hero-train.jpg";

interface RouteItem {
  id: string;
  name: string;
  rating: number;
  image: string;
  region: string;
}

const hardcodedRoutes: RouteItem[] = [
  { id: "1", name: "Владимирская область", rating: 8.2, image: karelia, region: "Центр" },
  { id: "2", name: "Воронежская область", rating: 9.5, image: moscow, region: "Центр" },
  { id: "3", name: "Зарайск и Коломна", rating: 8.5, image: stPetersburg, region: "Центр" },
  { id: "5", name: "Ивановская область, маршрут №1", rating: 8.6, image: novgorod, region: "Центр" },
  { id: "6", name: "Ивановская область, маршрут №2", rating: 9.5, image: armenia, region: "Центр" },
  { id: "7", name: "Калининградская область, маршрут №1", rating: 9.3, image: china, region: "Северо-Запад" },
  { id: "8", name: "Калининградская область, маршрут №4", rating: 9.0, image: heroTrain, region: "Северо-Запад" },
  { id: "10", name: "Мурманская область, маршрут №1", rating: 9.3, image: moscow, region: "Северо-Запад" },
  { id: "11", name: "Мурманская область, маршрут №2", rating: 9.8, image: stPetersburg, region: "Северо-Запад" },
  { id: "13", name: "Архангельская область", rating: 9.3, image: karelia, region: "Северо-Запад" },
  { id: "9", name: "Краснодарский край", rating: 10, image: karelia, region: "Юг" },
  { id: "14", name: "Ростов-на-Дону", rating: 9.1, image: moscow, region: "Юг" },
  { id: "15", name: "Крым", rating: 9.7, image: stPetersburg, region: "Юг" },
  { id: "16", name: "Ставропольский край", rating: 8.8, image: kazan, region: "Юг" },
  { id: "17", name: "Сочи и окрестности", rating: 9.6, image: novgorod, region: "Юг" },
  { id: "18", name: "Казань", rating: 9.4, image: kazan, region: "Поволжье" },
  { id: "19", name: "Самара", rating: 8.7, image: armenia, region: "Поволжье" },
  { id: "20", name: "Нижний Новгород", rating: 9.2, image: china, region: "Поволжье" },
  { id: "21", name: "Волгоград", rating: 8.9, image: heroTrain, region: "Поволжье" },
  { id: "22", name: "Великий Волжский путь", rating: 9.7, image: karelia, region: "Поволжье" },
  { id: "4", name: "Екатеринбург", rating: 8.9, image: kazan, region: "Урал" },
  { id: "23", name: "Челябинск", rating: 8.4, image: moscow, region: "Урал" },
  { id: "24", name: "Пермь", rating: 8.6, image: stPetersburg, region: "Урал" },
  { id: "25", name: "Тюмень", rating: 9.0, image: kazan, region: "Урал" },
  { id: "26", name: "ХМАО - Югра", rating: 9.9, image: novgorod, region: "Урал" },
  { id: "12", name: "Новосибирская область", rating: 7.4, image: kazan, region: "Сибирь" },
  { id: "27", name: "Красноярск", rating: 8.8, image: armenia, region: "Сибирь" },
  { id: "28", name: "Иркутск и Байкал", rating: 9.8, image: china, region: "Сибирь" },
  { id: "29", name: "Алтайский край", rating: 9.7, image: heroTrain, region: "Сибирь" },
  { id: "30", name: "Томск", rating: 8.5, image: karelia, region: "Сибирь" },
  { id: "31", name: "Дагестан", rating: 9.3, image: moscow, region: "Кавказ" },
  { id: "32", name: "Карачаево-Черкесия", rating: 9.1, image: stPetersburg, region: "Кавказ" },
  { id: "33", name: "Кабардино-Балкария", rating: 9.5, image: kazan, region: "Кавказ" },
  { id: "34", name: "Осетия", rating: 9.0, image: novgorod, region: "Кавказ" },
  { id: "35", name: "Чечня", rating: 9.2, image: armenia, region: "Кавказ" },
  { id: "36", name: "Владивосток и окрестности", rating: 10, image: china, region: "Дальний Восток" },
  { id: "37", name: "Хабаровск", rating: 8.9, image: heroTrain, region: "Дальний Восток" },
  { id: "38", name: "Камчатка", rating: 9.8, image: karelia, region: "Дальний Восток" },
  { id: "39", name: "Сахалин", rating: 9.4, image: moscow, region: "Дальний Восток" },
  { id: "40", name: "Якутия", rating: 9.6, image: stPetersburg, region: "Дальний Восток" },
];

type ApiRoute = {
  id: string;
  legacy_id: string | null;
  slug: string;
  name: string;
  region: string;
  rating: number;
  cover_image_url: string | null;
  excerpt: string;
};

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
  const isMobile = useIsMobile();

  const apiQ = useQuery({
    queryKey: ["route-pages-public-list"],
    queryFn: () =>
      fetch("/api/route-pages").then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json() as Promise<ApiRoute[]>;
      }),
    retry: false,
    staleTime: 60_000,
  });

  const routes = useMemo<RouteItem[]>(() => {
    const apiRoutes = apiQ.data ?? [];

    const overriddenLegacyIds = new Set(
      apiRoutes.filter((r) => r.legacy_id).map((r) => r.legacy_id!),
    );

    const merged: RouteItem[] = hardcodedRoutes
      .filter((r) => !overriddenLegacyIds.has(r.id))
      .map((r) => ({ ...r }));

    for (const ar of apiRoutes) {
      merged.push({
        id: ar.legacy_id || ar.id,
        name: ar.name,
        rating: Number(ar.rating) || 0,
        image: ar.cover_image_url || kazan,
        region: ar.region,
      });
    }

    return merged;
  }, [apiQ.data]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const foundRegion = regions.find(
        (region) =>
          region.toLowerCase() === searchQuery.toLowerCase().trim() &&
          region !== "Все регионы",
      );
      if (foundRegion) {
        setActiveRegion(foundRegion);
      }
    }
  }, [searchQuery]);

  let filteredRoutes: RouteItem[];

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    filteredRoutes = routes.filter(
      (route) =>
        route.name.toLowerCase().includes(query) ||
        route.region.toLowerCase().includes(query),
    );
  } else {
    filteredRoutes =
      activeRegion === "Все регионы"
        ? routes
        : routes.filter((route) => route.region === activeRegion);
  }

  const handleRouteClick = (routeId: string) => {
    navigate(`/routes/${routeId}`);
  };

  return (
    <div className="min-h-screen bg-[#F5F5FA]">
      <Header />
      <main className="pt-20 md:pt-32">
        <div className="bg-[#F5F5FA] py-6 md:py-8">
          <div className="container px-4 md:px-6">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="heading-gradient mb-2 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  Маршруты
                </h1>
                <p className="text-base text-[#3F3F7F]/70 md:text-lg">
                  {routes.length} готовых маршрутов для путешествий
                </p>
              </div>
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8A70F8]" />
                <Input
                  type="text"
                  placeholder="Поиск региона..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border-[#8A70F8] pl-10 pr-4 focus:border-[#8A70F8] focus:ring-[#8A70F8] md:w-64"
                />
              </div>
            </div>

            <div className="rounded-lg bg-white p-3 shadow-sm md:p-4">
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={cn(
                      "rounded-lg px-3 py-2 text-xs font-medium transition-colors md:px-4 md:text-sm",
                      activeRegion === region
                        ? "bg-[#8A70F8] text-white"
                        : "text-[#8A70F8] hover:text-[#8A70F8]/80",
                    )}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="container px-4 py-6 md:px-6 md:py-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
            {filteredRoutes.map((route) => (
              <Card
                key={route.id}
                onClick={() => handleRouteClick(route.id)}
                className="cursor-pointer overflow-hidden transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={route.image}
                    alt={route.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-start justify-between gap-3 md:gap-4">
                    <p className="line-clamp-2 flex-1 text-base font-semibold text-foreground md:text-lg">
                      {route.name}
                    </p>
                    <div className="flex flex-shrink-0 items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 md:h-5 md:w-5" />
                      <span className="text-sm font-semibold text-foreground md:text-base">
                        {route.rating}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#8A70F8] to-[#9B82F8] md:rounded-3xl">
            <div className="grid grid-cols-1 gap-6 p-6 md:gap-8 md:p-8 lg:grid-cols-2 lg:p-12">
              <div className="flex flex-col justify-center space-y-4 md:space-y-6">
                <div className="space-y-1 text-white md:space-y-2">
                  <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                    Забронировать жильё
                  </h2>
                  <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                    и купить билеты можно
                  </h2>
                  <h2 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                    на TudaSuda
                  </h2>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row md:gap-4">
                  <Button
                    size="lg"
                    className="w-full rounded-full bg-white px-4 py-4 text-base font-semibold text-[#8A70F8] hover:bg-white/90 sm:w-auto md:px-6 md:py-6 md:text-lg"
                  >
                    <Plane className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Найти билеты
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full rounded-full border-white bg-white/10 px-4 py-4 text-base font-semibold text-white hover:bg-white/20 sm:w-auto md:px-6 md:py-6 md:text-lg"
                  >
                    <BedDouble className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Выбрать отель
                  </Button>
                </div>
              </div>
              <div className="relative hidden h-64 lg:block lg:h-auto">
                <div className="absolute inset-0 rounded-l-3xl bg-gradient-to-l from-[#8A70F8] to-transparent" />
                <div className="relative h-full w-full overflow-hidden rounded-l-3xl bg-gray-200">
                  <img
                    src={heroTrain}
                    alt="Отель"
                    className="h-full w-full object-cover"
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
