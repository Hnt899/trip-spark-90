import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Ryazan = () => {
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
          <span>Рязань</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Рязань</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Рязань</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Рязань — старинный русский город, основанный в 1095 году. Город был столицей Рязанского княжества и играл важную роль в истории Древней Руси. Рязань расположена на берегах Оки и является важным культурным и историческим центром Центральной России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своим кремлём, уникальными храмами, богатой историей и культурными традициями. Рязань — родина многих выдающихся людей, включая поэта Сергея Есенина. Город славится своими музеями, театрами и красивой архитектурой.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть один из старейших городов России, познакомиться с историей Древней Руси, посетить уникальный кремль и насладиться атмосферой старинного русского города — Рязань станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Рязани</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Рязань расположена в зоне умеренно-континентального климата. Лето (июнь-август) тёплое, со средней температурой 18-20°C, может быть жарким до 30°C. Лето — лучшее время для прогулок по городу и посещения достопримечательностей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) умеренно холодная, со средней температурой около -8°C, морозы могут опускаться до -25°C. Зимой город покрыт снегом, работают катки. Весна и осень прохладные и переменчивые, но достаточно комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Рязань красива, особенно в период новогодних праздников.
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
                Поездом: Рязань — крупный железнодорожный узел, принимает поезда из Москвы, Санкт-Петербурга и других городов. Из Москвы ходит скоростной поезд "Ласточка" (2,5-3 часа) и обычные поезда. Автобусом: междугородние автобусы прибывают на автовокзал.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Автомобилем: из Москвы по трассе М-5, время в пути около 3-4 часов. Внутри города удобно передвигаться на автобусах, троллейбусах и маршрутках. Центр города компактный, многие достопримечательности находятся в пешей доступности.
              </p>
              <p className="text-base leading-relaxed">
                Рязань находится недалеко от Москвы, что делает её популярным местом для однодневных поездок из столицы.
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
                Рязанский кремль — главная достопримечательность города, уникальный комплекс исторических зданий. Успенский собор — главный храм кремля, построенный в XVII веке. Соборная колокольня — высокая колокольня с видом на город. Архиерейские палаты — комплекс зданий, сейчас здесь находится музей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Музей-заповедник "Рязанский кремль" — крупный музейный комплекс. Музей истории Рязани — интересное место для знакомства с историей города. Площадь Ленина — главная площадь города.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: Художественный музей, Музей истории молодёжного движения, театры. За пределами города — Константиново (родина Сергея Есенина), другие достопримечательности Рязанской области.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Рязани</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Рязанский театр драмы, Театр кукол. В городе проходят многочисленные фестивали и культурные события. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры и сувенирные лавки предлагают широкий выбор. Парки: парки для отдыха. Культурные события: фестивали музыки, кино, театра.
              </p>
              <p className="text-base leading-relaxed">
                Рязань славится своими культурными традициями и является популярным туристическим направлением.
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
                Русская кухня: популярны традиционные блюда из мяса, рыбы, пельмени, пироги. Классические рестораны предлагают традиционные блюда. Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры, традиционные пирожки.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: рязанская кухня известна традиционными русскими блюдами и местными особенностями.
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
                Рязань — старинный русский город, основанный в 1095 году. Город был столицей Рязанского княжества и играл важную роль в истории Древней Руси. Рязанский кремль — уникальный комплекс исторических зданий, сохранившийся до наших дней.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Рязань — родина поэта Сергея Есенина. В окрестностях города находится Константиново, где родился и вырос поэт. Здесь находится музей-заповедник, посвящённый жизни и творчеству Есенина.
              </p>
              <p className="text-base leading-relaxed">
                Рязань — популярное место для туристов, приезжающих из Москвы на однодневные экскурсии. Город славится своей богатой историей и культурными традициями.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ryazan;
