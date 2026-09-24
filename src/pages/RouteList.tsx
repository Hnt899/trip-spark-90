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
import heroTrain from "@/assets/images/hero/hero-train.jpg";

interface RouteItem {
  id: string;
  name: string;
  rating: number;
  image: string;
  region: string;
}

interface Region {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
}

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

const RouteList = () => {
  const [activeRegion, setActiveRegion] = useState("Все регионы");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Загружаем регионы из API для табов
  const regionsQuery = useQuery<Region[]>({
    queryKey: ["regions"],
    queryFn: () =>
      fetch("/api/regions").then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json() as Promise<Region[]>;
      }),
    retry: false,
    staleTime: 60_000,
  });

  // Формируем список регионов для табов: "Все регионы" + загруженные из API
  const regions = useMemo(() => {
    const apiRegions = regionsQuery.data ?? [];
    return ["Все регионы", ...apiRegions.map((r) => r.name)];
  }, [regionsQuery.data]);

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

  // Только данные из API — без хардкода
  const routes = useMemo<RouteItem[]>(() => {
    const apiRoutes = apiQ.data ?? [];
    return apiRoutes.map((ar) => ({
      id: ar.slug || ar.legacy_id || ar.id,
      name: ar.name,
      rating: Number(ar.rating) || 0,
      image: ar.cover_image_url || heroTrain,
      region: ar.region,
    }));
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
  }, [searchQuery, regions]);

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
                <p className="text-base text-[#21252E]/70 md:text-lg">
                  {routes.length} готовых маршрутов для путешествий
                </p>
              </div>
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0A8FE8]" />
                <Input
                  type="text"
                  placeholder="Поиск региона..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border-[#0A8FE8] pl-10 pr-4 focus:border-[#0A8FE8] focus:ring-[#0A8FE8] md:w-64"
                />
              </div>
            </div>

            <div className="rounded-lg bg-white p-3 shadow-sm md:p-4">
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                {regionsQuery.isPending ? (
                  <span className="text-xs text-[#0A8FE8]/70">Загрузка регионов...</span>
                ) : (
                  regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => setActiveRegion(region)}
                      className={cn(
                        "rounded-lg px-3 py-2 text-xs font-medium transition-colors md:px-4 md:text-sm",
                        activeRegion === region
                          ? "bg-[#0A8FE8] text-white"
                          : "text-[#0A8FE8] hover:text-[#0A8FE8]/80",
                      )}
                    >
                      {region}
                    </button>
                  ))
                )}
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
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0A8FE8] to-[#0FB5F0] md:rounded-3xl">
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
                    className="w-full rounded-full bg-white px-4 py-4 text-base font-semibold text-[#0A8FE8] hover:bg-white/90 sm:w-auto md:px-6 md:py-6 md:text-lg"
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
                <div className="absolute inset-0 rounded-l-3xl bg-gradient-to-l from-[#0A8FE8] to-transparent" />
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