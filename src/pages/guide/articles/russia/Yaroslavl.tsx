import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Yaroslavl = () => {
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
          <span>Ярославль</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Ярославль</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Ярославль</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Ярославль — один из старейших городов России, основанный в 1010 году князем Ярославом Мудрым. Город расположен на берегах Волги и является жемчужиной Золотого кольца России. Ярославль — это город с уникальной историей, богатым культурным наследием и красивой архитектурой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Исторический центр Ярославля включён в список Всемирного наследия ЮНЕСКО. Город известен своими многочисленными храмами, монастырями, уникальной архитектурой XVII-XVIII веков и богатой историей. Ярославль — это город, где сохранилась атмосфера старинной России.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть один из самых красивых городов Золотого кольца, познакомиться с историей Древней Руси, посетить уникальные храмы и монастыри, насладиться видами на Волгу — Ярославль станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Ярославля</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Ярославль расположен в зоне умеренно-континентального климата. Лето (июнь-август) тёплое, со средней температурой 18-20°C, может быть жарким до 30°C. Лето — лучшее время для прогулок по городу и речных прогулок по Волге.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) холодная и снежная, со средней температурой около -10°C, морозы могут опускаться до -25°C. Зимой город покрыт снегом, работают катки. Весна и осень прохладные и переменчивые, но достаточно комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Ярославль красив, особенно в период новогодних праздников. Летом особенно приятно прогуливаться по набережной Волги.
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
                Самолётом: ближайший аэропорт — в Ярославле есть аэропорт, принимающий рейсы из некоторых городов России. Поездом: Ярославль — крупный железнодорожный узел, принимает поезда из Москвы, Санкт-Петербурга и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы ходит скоростной поезд "Ласточка" (3-3,5 часа) и обычные поезда. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе М-8, время в пути около 3-4 часов.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах, троллейбусах и маршрутках. Также популярны речные прогулки по Волге. Центр города компактный, многие достопримечательности находятся в пешей доступности.
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
                Спасо-Преображенский монастырь — старейший монастырь Ярославля, основанный в XII веке. На его территории находится музей-заповедник. Церковь Ильи Пророка — уникальный храм XVII века с фресками, один из символов города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Исторический центр Ярославля — объект Всемирного наследия ЮНЕСКО, с множеством храмов, церквей и исторических зданий. Набережная Волги — популярное место для прогулок с видом на реку и город.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Толгский монастырь — действующий женский монастырь на берегу Волги. Ярославский художественный музей, Музей истории города — интересные места для знакомства с историей и культурой. Площадь Волкова — главная площадь города.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: церковь Богоявления, церковь Иоанна Предтечи, Театр драмы имени Волкова — один из старейших театров России. За пределами города — природные достопримечательности Ярославской области.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Ярославле</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Ярославский театр драмы имени Волкова — один из старейших театров России, Театр кукол. В городе проходят многочисленные фестивали и культурные события. Речные прогулки по Волге — обязательный пункт программы для туристов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ночная жизнь: множество баров, клубов и ресторанов в центре города. Шопинг: торговые центры "Аура", "Рио" предлагают широкий выбор магазинов. Парки: парк на Стрелке, парк Тысячелетия — отличные места для отдыха.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: фестивали музыки, кино, театра. Ярославль славится своими культурными традициями и богатой историей.
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
                Ярославская кухня сочетает русские традиции с местными особенностями. Популярны блюда из рыбы (особенно волжской), пельмени, пироги. Классические рестораны: "Пельмени-Классик", "Волга", "Дом Актёра" предлагают традиционные блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры, традиционные пирожки. Сладости: местные конфеты, торты из местных кондитерских.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: ярославская кухня известна блюдами из волжской рыбы и традиционными русскими блюдами. Также популярны пироги с различными начинками и местные напитки.
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
                Ярославль — один из старейших городов России, основанный в 1010 году князем Ярославом Мудрым. Исторический центр города включён в список Всемирного наследия ЮНЕСКО. Население города превышает 600 тысяч человек.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ярославль — один из городов Золотого кольца России, популярного туристического маршрута. Город известен своими многочисленными храмами и церквями, многие из которых построены в XVII веке.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ярославский театр драмы имени Волкова — один из старейших театров России, основанный в 1750 году. Ярославль был временной столицей России в период Смутного времени (1612-1613 годы).
              </p>
              <p className="text-base leading-relaxed">
                Ярославль — родина первого русского театра и первого русского университета. Город славится своей богатой историей и культурным наследием.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Yaroslavl;
