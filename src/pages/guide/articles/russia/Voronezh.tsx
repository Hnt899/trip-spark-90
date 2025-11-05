import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Voronezh = () => {
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
          <span>Воронеж</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Воронеж</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Воронеж</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Воронеж — крупный город в Центральной России, столица Воронежской области. Основанный в 1586 году как крепость, город стал важным экономическим и культурным центром. Воронеж известен как колыбель русского военно-морского флота — здесь Пётр I строил первые корабли.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город имеет богатую историю, развитую культуру и множество достопримечательностей. Воронеж — это город с красивой архитектурой, активной культурной жизнью и гостеприимством местных жителей. Город известен своими театрами, музеями и парками.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите познакомиться с историей русского флота, посетить уникальные музеи и театры, насладиться культурной жизнью и увидеть красивый город на берегах реки Воронеж — Воронеж станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Воронежа</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Воронеж расположен в зоне умеренно-континентального климата. Лето (июнь-август) тёплое, со средней температурой 20-22°C, может быть жарким до 35°C. Лето — лучшее время для прогулок по городу и посещения парков.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) умеренно холодная, со средней температурой около -8°C, морозы могут опускаться до -25°C. Зимой город покрыт снегом, работают катки. Весна и осень прохладные и переменчивые, но достаточно комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Воронеж красив, особенно в период новогодних праздников. Летом особенно приятно прогуливаться по набережной Воронежского водохранилища.
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
                Самолётом: международный аэропорт Воронеж принимает рейсы из многих городов России. От аэропорта до центра можно доехать на автобусе или такси. Поездом: Воронеж — крупный железнодорожный узел, принимает поезда из Москвы, Санкт-Петербурга и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы ходит скоростной поезд "Ласточка" (6-7 часов) и обычные поезда. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе М-4, время в пути около 6-7 часов.
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
                Площадь Ленина — главная площадь города с памятником Ленину. Благовещенский собор — главный храм города. Набережная Воронежского водохранилища — популярное место для прогулок с видом на водохранилище.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Воронежский краеведческий музей, Музей истории Воронежа — интересные места для знакомства с историей. Корабль-музей "Гото Предестинация" — реплика корабля петровской эпохи, плавучий музей. Памятник Петру I — символ города.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: Художественный музей, театры, парки. Воронежский зоопарк, парк "Алые паруса" — отличные места для отдыха. За пределами города — природные достопримечательности Воронежской области.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Воронеже</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Воронежский театр драмы, Театр оперы и балета, Театр кукол. В городе проходят многочисленные фестивали и культурные события. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры предлагают широкий выбор магазинов. Парки: парк "Алые паруса", парк "Динамо" — отличные места для отдыха. Культурные события: фестивали музыки, кино, театра.
              </p>
              <p className="text-base leading-relaxed">
                Воронеж славится своей активной культурной жизнью и гостеприимством.
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
                Русская кухня: популярны блюда из мяса, рыбы, пельмени, пироги. Классические рестораны предлагают традиционные блюда. Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры, традиционные пирожки.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: воронежская кухня известна традиционными русскими блюдами и местными особенностями.
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
                Воронеж — крупный город в Центральной России, население превышает 1 миллион человек. Город был основан в 1586 году как крепость. Воронеж известен как колыбель русского военно-морского флота — здесь Пётр I строил первые корабли для Азовского похода.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Воронеж был сильно разрушен во время Великой Отечественной войны и восстановлен после. Город славится своими театрами и культурной жизнью. Воронежский театр драмы — один из старейших театров России.
              </p>
              <p className="text-base leading-relaxed">
                Воронеж — родина многих известных людей, включая писателей, артистов, учёных. Город является важным экономическим и культурным центром Центральной России.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Voronezh;
