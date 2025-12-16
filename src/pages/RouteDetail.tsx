import { useParams, useNavigate } from "react-router-dom";
import RoutesHeader from "@/components/RoutesHeader";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
        <RoutesHeader />
        <main className="container py-20 pt-32">
          <h1 className="text-4xl font-bold mb-6">Маршрут не найден</h1>
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
      <RoutesHeader />
      <main className="pt-16">
        <div className="container py-12">
          <Button
            variant="ghost"
            onClick={() => navigate("/routes/list")}
            className="mb-6"
          >
            ← Назад к маршрутам
          </Button>

          <Card className="overflow-hidden shadow-lg">
            <div className="relative h-96 md:h-[500px] overflow-hidden">
              <img
                src={route.image}
                alt={route.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                    {route.name}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {route.region}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <svg
                    width="70"
                    height="70"
                    viewBox="0 0 70 70"
                    className="drop-shadow-lg"
                  >
                    <path
                      d="M35 0 L42 24.5 L70 24.5 L45.5 38.5 L52.5 63 L35 49 L17.5 63 L24.5 38.5 L0 24.5 L28 24.5 Z"
                      fill="#22C55E"
                      stroke="white"
                      strokeWidth="1"
                    />
                    <text
                      x="35"
                      y="43"
                      textAnchor="middle"
                      fill="white"
                      fontSize="22"
                      fontWeight="bold"
                    >
                      {route.rating}
                    </text>
                  </svg>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  Детальная информация о маршруте находится в разработке.
                </p>
                <p className="text-lg text-muted-foreground">
                  Здесь будет размещена подробная информация о маршруте, включая описание достопримечательностей, 
                  рекомендации по посещению, карту маршрута и другую полезную информацию для путешественников.
                </p>
              </div>

              <div className="mt-8">
                <Button size="lg" className="px-8 py-6 text-lg">
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

