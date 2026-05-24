import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft, Loader2 } from "lucide-react";
import BlogBlockRenderer from "@/components/blog/BlogBlockRenderer";
import type { BlogContentBlock } from "@/types/blogContent";

import karelia from "@/assets/images/cities/karelia.jpg";
import moscow from "@/assets/images/cities/moscow.jpg";
import stPetersburg from "@/assets/images/cities/saint-petersburg.jpg";
import kazan from "@/assets/images/cities/kazan.jpg";
import novgorod from "@/assets/images/cities/novgorod.jpg";
import armenia from "@/assets/images/cities/armenia.jpg";
import china from "@/assets/images/cities/china.jpg";
import heroTrain from "@/assets/images/hero/hero-train.jpg";

interface LegacyRoute {
  id: string;
  name: string;
  rating: number;
  image: string;
  region: string;
}

const legacyRoutes: LegacyRoute[] = [
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
  content_blocks: BlogContentBlock[];
  views: number;
};

const RouteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const apiQ = useQuery({
    queryKey: ["route-page-public", id],
    queryFn: () =>
      fetch(`/api/route-pages/by-id/${id}`).then((r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json() as Promise<ApiRoute>;
      }),
    retry: false,
    enabled: !!id,
  });

  const legacy = legacyRoutes.find((r) => r.id === id);
  const apiRoute = apiQ.data;
  const isLoading = apiQ.isLoading;

  const routeName = apiRoute?.name ?? legacy?.name;
  const routeRegion = apiRoute?.region ?? legacy?.region ?? "";
  const routeRating = apiRoute?.rating ?? legacy?.rating ?? 0;
  const routeImage = apiRoute?.cover_image_url ?? legacy?.image;
  const contentBlocks = apiRoute?.content_blocks;
  const hasContent = Array.isArray(contentBlocks) && contentBlocks.length > 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5FA]">
        <Header />
        <main className="flex items-center justify-center py-32">
          <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!routeName) {
    return (
      <div className="min-h-screen bg-[#F5F5FA]">
        <Header />
        <main className="container px-4 py-12 pt-20 md:px-6 md:py-20 md:pt-32">
          <h1 className="heading-gradient mb-6 text-2xl font-bold tracking-tight md:text-4xl">
            Маршрут не найден
          </h1>
          <Button onClick={() => navigate("/routes/list")}>
            Вернуться к списку маршрутов
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5FA]">
      <Header />
      <main className="pt-20 md:pt-16">
        <div className="container px-4 py-6 md:px-6 md:py-12">
          <Button
            variant="ghost"
            onClick={() => navigate("/routes/list")}
            className="mb-4 text-sm md:mb-6 md:text-base"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад к маршрутам
          </Button>

          <Card className="overflow-hidden shadow-lg">
            {routeImage && (
              <div className="relative h-64 overflow-hidden md:h-96 lg:h-[500px]">
                <img
                  src={routeImage}
                  alt={routeName}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <CardContent className="p-4 md:p-6 lg:p-8">
              <div className="mb-4 flex flex-col gap-4 md:mb-6 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h1 className="heading-gradient mb-2 text-2xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                    {routeName}
                  </h1>
                  <p className="text-base text-muted-foreground md:text-lg">
                    {routeRegion}
                  </p>
                </div>
                <div className="flex items-center gap-2 md:flex-shrink-0">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 md:h-6 md:w-6" />
                  <span className="text-lg font-semibold text-foreground md:text-xl">
                    {routeRating}
                  </span>
                </div>
              </div>

              {hasContent ? (
                <BlogBlockRenderer blocks={contentBlocks} />
              ) : (
                <div className="prose max-w-none">
                  <p className="mb-4 text-base text-muted-foreground md:mb-6 md:text-lg">
                    Детальная информация о маршруте находится в разработке.
                  </p>
                  <p className="text-base text-muted-foreground md:text-lg">
                    Здесь будет размещена подробная информация о маршруте,
                    включая описание достопримечательностей, рекомендации по
                    посещению, карту маршрута и другую полезную информацию для
                    путешественников.
                  </p>
                </div>
              )}

              <div className="mt-6 md:mt-8">
                <Button
                  size="lg"
                  className="w-full px-6 py-4 text-base md:w-auto md:px-8 md:py-6 md:text-lg"
                >
                  Узнать маршрут
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RouteDetail;
