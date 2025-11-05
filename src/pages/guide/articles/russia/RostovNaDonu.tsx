import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const RostovNaDonu = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/guide" className="hover:text-primary">Путеводитель</Link>
          <span>/</span>
          <Link to="/guide" className="hover:text-primary">Россия</Link>
          <span>/</span>
          <span>Ростов-на-Дону</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Ростов-на-Дону</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Ростов-на-Дону</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Ростов-на-Дону — крупный город на юге России, столица Ростовской области, известный как "южная столица России" и "ворота Кавказа". Город основан в 1749 году и является важным экономическим, культурным и транспортным центром. Ростов-на-Дону расположен на берегах реки Дон.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своей богатой историей, казачьими традициями, развитой культурой и гостеприимством. Ростов-на-Дону — это крупный порт, важный транспортный узел и один из самых динамично развивающихся городов юга России.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите познакомиться с донской культурой, насладиться тёплым климатом, посетить исторические достопримечательности и музеи, попробовать знаменитую донскую кухню — Ростов-на-Дону станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Ростова-на-Дону</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Ростов-на-Дону расположен в зоне умеренно-континентального климата. Лето (июнь-август) жаркое, со средней температурой 23-25°C, часто бывает жарко до 35-40°C. Лето — идеальное время для прогулок и отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) мягкая, со средней температурой около -2°C, морозы редки. Снег выпадает редко и быстро тает. Весна и осень тёплые и продолжительные, очень комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с апреля по октябрь, когда погода наиболее комфортна. Ростов-на-Дону — один из самых солнечных городов России. Близость к морю делает климат мягким.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как добраться</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Самолётом: международный аэропорт Платов принимает рейсы из многих городов России и мира. От аэропорта до центра можно доехать на автобусе или такси. Поездом: Ростов-на-Дону — крупный железнодорожный узел, принимает поезда из Москвы, Санкт-Петербурга и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы ходит скоростной поезд (около 18 часов) и обычные поезда. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе М-4, время в пути около 14-16 часов.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах, троллейбусах, трамваях и маршрутках. Центр города компактный, многие достопримечательности находятся в пешей доступности.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Достопримечательности</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Набережная Дона — главная достопримечательность города, место для прогулок с красивыми видами на реку. Площадь Советов — центральная площадь с памятником Ленину. Большая Садовая улица — главная улица города с исторической застройкой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ростовский областной музей краеведения — один из крупнейших музеев на юге России. Ростовский областной музей изобразительных искусств — собрание произведений искусства. Парк имени Горького — крупный парк для отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Собор Рождества Пресвятой Богородицы — главный храм города. Театр драмы имени Горького — один из старейших театров России. Также стоит посетить музеи, включая музей истории донского казачества.
              </p>
              <p className="text-base leading-relaxed">
                Близость к Азовскому морю и Черноморскому побережью позволяет легко организовать поездки на пляжи. Ростов-на-Дону также является отправной точкой для экскурсий по Ростовской области и на Кавказ.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Ростове-на-Дону</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Ростовский театр драмы, Театр музыкальной комедии, Театр кукол. В городе проходят многочисленные фестивали и культурные события. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры "Мега", "Горизонт", "Талер" предлагают широкий выбор магазинов. Парки: парк имени Горького, парк имени Октября — отличные места для отдыха. Зимой можно покататься на коньках, летом — на велосипедах.
              </p>
              <p className="text-base leading-relaxed">
                Близость к морю позволяет легко организовать поездки на пляжи. Речные прогулки по Дону — популярное развлечение для туристов.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Донская кухня известна блюдами из рыбы (особенно из донской рыбы), мяса, овощей. Популярны уха, борщ, шашлык, блюда из баранины. Особенность — обилие свежих овощей и фруктов благодаря тёплому климату.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Классические рестораны предлагают блюда донской и русской кухни. Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры, пирожки на каждом шагу. Напитки: крафтовое пиво, вино из донских виноградников.
              </p>
              <p className="text-base leading-relaxed">
                Попробуйте донскую рыбу, местные овощи и фрукты, донской мёд, блюда из баранины.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Интересные факты</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Ростов-на-Дону — крупный город на юге России, население превышает 1,1 миллиона человек. Город основан в 1749 году и является важным экономическим и транспортным центром юга страны.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ростов-на-Дону известен как "ворота Кавказа" и является важным транспортным узлом, связывающим центральную Россию с Кавказом и Черноморским побережьем. Город также является крупным портом на реке Дон.
              </p>
              <p className="text-base leading-relaxed">
                Ростов-на-Дону — родина многих известных людей, включая спортсменов, артистов, писателей. Город также является важным образовательным центром — здесь расположен Южный федеральный университет и другие вузы.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RostovNaDonu;
