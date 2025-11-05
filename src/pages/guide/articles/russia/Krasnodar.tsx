import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Krasnodar = () => {
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
          <span>Краснодар</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Краснодар</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Краснодар</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Краснодар — столица Краснодарского края, крупный город на юге России, известный своим тёплым климатом, гостеприимством и богатой историей. Город основан в 1793 году как крепость Екатеринодар и является важным экономическим и культурным центром юга России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Краснодар — это "южная столица России", город с развитой инфраструктурой, множеством парков и скверов, красивой архитектурой. Город известен своей кубанской культурой, казачьими традициями и близостью к Черноморскому побережью.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите познакомиться с кубанской культурой, насладиться тёплым климатом, посетить красивые парки и музеи, попробовать знаменитую кубанскую кухню — Краснодар станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Краснодара</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Краснодар расположен в зоне умеренно-континентального климата с влиянием близости к морю. Лето (июнь-август) жаркое, со средней температурой 23-25°C, часто бывает жарко до 35-40°C. Лето — идеальное время для прогулок и отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) мягкая, со средней температурой около 0°C, морозы редки и обычно не опускаются ниже -10°C. Снег выпадает редко и быстро тает. Весна и осень тёплые и продолжительные, очень комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с апреля по октябрь, когда погода наиболее комфортна. Краснодар — один из самых солнечных городов России. Близость к Черноморскому побережью делает климат мягким и приятным.
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
                Самолётом: международный аэропорт Пашковский принимает рейсы из многих городов России и мира. От аэропорта до центра можно доехать на автобусе или такси за 20-30 минут. Поездом: Краснодар — крупный железнодорожный узел, принимает поезда из Москвы, Санкт-Петербурга и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы ходит скоростной поезд (около 20 часов) и обычные поезда. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе М-4, время в пути около 15-17 часов.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах, троллейбусах, трамваях и маршрутках. Центр города компактный, многие достопримечательности находятся в пешей доступности. Также популярны поездки на автомобиле к Черноморскому побережью.
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
                Площадь Победы — главная площадь города с памятником "Аврора" и Вечным огнём. Площадь имени Ленина — центральная площадь с памятником Ленину и административными зданиями. Парк имени Горького — крупнейший парк города с аттракционами и зонами отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Краснодарский историко-археологический музей-заповедник имени Е.Д. Фелицына — один из старейших музеев на Северном Кавказе. Краснодарский краевой художественный музей — собрание произведений искусства. Музей военной техники "Оружие Победы" под открытым небом.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Свято-Екатерининский кафедральный собор — главный храм города. Чистяковская роща — популярный парк для отдыха. Набережная реки Кубань — место для прогулок. Также стоит посетить театры, включая Краснодарский театр драмы и Краснодарский музыкальный театр.
              </p>
              <p className="text-base leading-relaxed">
                Близость к Черноморскому побережью (около 100-150 км) позволяет легко добраться до курортов Анапы, Геленджика, Сочи. Краснодар также является отправной точкой для экскурсий по Краснодарскому краю.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Краснодаре</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Краснодарский театр драмы, Краснодарский музыкальный театр, Театр кукол — крупные театральные площадки. В городе проходят многочисленные фестивали и культурные события, включая фестиваль "Кубанская музыкальная весна".
              </p>
              <p className="text-base leading-relaxed mb-4">
                Музеи: помимо историко-археологического и художественного, интересны Музей казачества, различные галереи. Современные арт-пространства: выставочные залы и галереи современного искусства.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ночная жизнь: множество баров, клубов и ресторанов в центре города. Летом особенно популярны открытые террасы. Шопинг: торговые центры "Галерея Краснодар", "ОЗ Молл", "Красная Площадь" предлагают широкий выбор магазинов.
              </p>
              <p className="text-base leading-relaxed">
                Парки: парк имени Горького, Чистяковская роща, парк "Солнечный остров" — отличные места для отдыха. Зимой можно покататься на коньках, летом — на велосипедах. Близость к морю позволяет легко организовать поездки на пляжи.
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
                Кубанская кухня — одна из самых вкусных и разнообразных на юге России. Популярны блюда из мяса, рыбы, овощей и фруктов. Борщ, вареники, голубцы, шашлык — традиционные блюда. Особенность — обилие свежих овощей и фруктов благодаря тёплому климату.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Классические рестораны: "Казачья станица", "Кубанская кухня", "Партизан" предлагают блюда кубанской и русской кухни. Современная кухня: множество ресторанов с авторской кухней, фьюжн-концепциями. "Гастрономика", "Рыбацкая слобода" — популярные заведения.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Уличная еда: шаурма, бургеры, пирожки на каждом шагу. Сладости: кубанские конфеты, торты, местные фрукты и ягоды. Напитки: крафтовое пиво, вино из кубанских виноградников, свежевыжатые соки.
              </p>
              <p className="text-base leading-relaxed">
                Особенность кубанской кухни — использование местных продуктов: свежих овощей, фруктов, мяса, рыбы. Попробуйте кубанские помидоры, арбузы, местные сорта винограда, кубанский мёд.
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
                Краснодар — крупный город на юге России, население превышает 1 миллион человек. Город был основан в 1793 году как крепость Екатеринодар (в честь Екатерины II), в 1920 году переименован в Краснодар.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Краснодар — один из самых зелёных городов России, здесь множество парков, скверов и зелёных насаждений. Город известен как "южная столица России" и является важным экономическим центром юга страны.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Краснодарский край — крупнейший аграрный регион России, известный производством зерна, овощей, фруктов, винограда. Краснодар является важным транспортным узлом, связывающим Россию с Черноморским побережьем.
              </p>
              <p className="text-base leading-relaxed">
                Краснодар — родина многих известных людей, включая спортсменов, артистов, учёных. Город также является важным образовательным центром — здесь расположен Кубанский государственный университет и другие вузы.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Krasnodar;
