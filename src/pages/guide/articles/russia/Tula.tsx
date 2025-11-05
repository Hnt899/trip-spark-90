import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Tula = () => {
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
          <span>Тула</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Тула</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Тулу</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Тула — старинный русский город, известный как "родина пряников, самоваров и оружия". Основанная в XII веке, Тула стала важным промышленным центром и сыграла значительную роль в истории России. Город известен своими уникальными промыслами и богатой историей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Тула — это город, где можно познакомиться с русскими традициями, посетить музеи оружия, пряников и самоваров, увидеть уникальную архитектуру и насладиться атмосферой старинного русского города. Город также известен своим кремлём и красивой архитектурой.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть "родину пряников и самоваров", познакомиться с русскими промыслами, посетить уникальные музеи и насладиться атмосферой старинного города — Тула станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Тулы</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Тула расположена в зоне умеренно-континентального климата. Лето (июнь-август) тёплое, со средней температурой 18-20°C, может быть жарким до 30°C. Лето — лучшее время для прогулок по городу и посещения достопримечательностей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) умеренно холодная, со средней температурой около -8°C, морозы могут опускаться до -25°C. Зимой город покрыт снегом, работают катки. Весна и осень прохладные и переменчивые, но достаточно комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Тула красива, особенно в период новогодних праздников.
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
                Поездом: Тула — крупный железнодорожный узел, принимает поезда из Москвы, Санкт-Петербурга и других городов. Из Москвы ходит скоростной поезд "Ласточка" (2-2,5 часа) и обычные поезда. Автобусом: междугородние автобусы прибывают на автовокзал.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Автомобилем: из Москвы по трассе М-2, время в пути около 2-3 часов. Внутри города удобно передвигаться на автобусах, троллейбусах, трамваях и маршрутках. Центр города компактный, многие достопримечательности находятся в пешей доступности.
              </p>
              <p className="text-base leading-relaxed">
                Тула находится недалеко от Москвы, что делает её популярным местом для однодневных поездок из столицы.
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
                Тульский кремль — главная достопримечательность города, древняя крепость XVI века. Музей оружия — уникальный музей, посвящённый истории оружейного производства в Туле. Музей тульского пряника — интересный музей, где можно узнать о производстве знаменитых тульских пряников и попробовать их.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Музей самоваров — коллекция самоваров, символ Тулы. Площадь Ленина — главная площадь города. Успенский собор в кремле — старинный храм. Также стоит посетить: музеи, театры, архитектурные памятники.
              </p>
              <p className="text-base leading-relaxed">
                За пределами города — Ясная Поляна (усадьба Льва Толстого), другие достопримечательности Тульской области.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Туле</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Тульский театр драмы, Театр кукол. В городе проходят многочисленные фестивали и культурные события. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры и сувенирные лавки предлагают широкий выбор, особенно тульские пряники и самовары. Парки: парки для отдыха. Культурные события: фестивали музыки, кино, театра.
              </p>
              <p className="text-base leading-relaxed">
                Тула славится своими традициями и является популярным туристическим направлением.
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
                Тульские пряники — главная гастрономическая достопримечательность города, обязательно попробуйте их. Русская кухня: популярны традиционные блюда. Классические рестораны предлагают традиционные блюда. Современная кухня: множество ресторанов с авторской кухней.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: тульская кухня известна своими пряниками, которые делают здесь с XVII века. Также популярны местные напитки и традиционные русские блюда.
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
                Тула — старинный русский город, основанный в XII веке. Город известен как "родина пряников, самоваров и оружия". Тульские пряники производятся с XVII века и являются одним из символов города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Тульский кремль — древняя крепость XVI века, одна из немногих каменных крепостей, сохранившихся в России. Тула также известна оружейным производством — здесь находится один из старейших оружейных заводов России.
              </p>
              <p className="text-base leading-relaxed">
                Ясная Поляна — усадьба Льва Толстого, находится недалеко от Тулы. Тула — популярное место для туристов, приезжающих из Москвы на однодневные экскурсии.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tula;
