import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ArrowLeft } from "lucide-react";
import karelia from "@/assets/images/cities/karelia.jpg";
import moscow from "@/assets/images/cities/moscow.jpg";
import stPetersburg from "@/assets/images/cities/saint-petersburg.jpg";
import kazan from "@/assets/images/cities/kazan.jpg";
import novgorod from "@/assets/images/cities/novgorod.jpg";
import armenia from "@/assets/images/cities/armenia.jpg";
import china from "@/assets/images/cities/china.jpg";
import heroTrain from "@/assets/images/hero/hero-train.jpg";

interface Route {
  id: string;
  name: string;
  rating: number;
  image: string;
  region: string;
  description?: string;
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

const RouteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const route = routes.find((r) => r.id === id);

  if (!route) {
    return (
      <div className="min-h-screen bg-[#F5F5FA]">
        <Header />
        <main className="container px-4 md:px-6 py-12 md:py-20 pt-20 md:pt-32">
          <h1 className="heading-gradient text-2xl md:text-4xl font-bold tracking-tight mb-6">
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
        <div className="container px-4 md:px-6 py-6 md:py-12">
          <Button
            variant="ghost"
            onClick={() => navigate("/routes/list")}
            className="mb-4 md:mb-6 text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к маршрутам
          </Button>

          <Card className="overflow-hidden shadow-lg">
            <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden">
              <img
                src={route.image}
                alt={route.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4 md:p-6 lg:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4 md:mb-6">
                <div className="flex-1">
                  <h1 className="heading-gradient text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
                    {route.name}
                  </h1>
                  <p className="text-base md:text-lg text-muted-foreground">
                    {route.region}
                  </p>
                </div>
                <div className="flex items-center gap-2 md:flex-shrink-0">
                  <Star className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg md:text-xl font-semibold text-foreground">
                    {route.rating}
                  </span>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
                  Детальная информация о маршруте находится в разработке.
                </p>
                <p className="text-base md:text-lg text-muted-foreground">
                  Здесь будет размещена подробная информация о маршруте, включая описание достопримечательностей, 
                  рекомендации по посещению, карту маршрута и другую полезную информацию для путешественников.
                </p>
              </div>

              <div className="mt-6 md:mt-8">
                <Button size="lg" className="w-full md:w-auto px-6 md:px-8 py-4 md:py-6 text-base md:text-lg">
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

