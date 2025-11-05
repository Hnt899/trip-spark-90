import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Tver = () => {
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
          <span>Тверь</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Тверь</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Тверь</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Тверь — старинный русский город на берегах Волги, основанный в 1135 году. Город расположен между Москвой и Санкт-Петербургом и является важным культурным и историческим центром Центральной России. Тверь входит в состав Золотого кольца России и славится своей богатой историей и красивой архитектурой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Тверь — это город, где сохранилась атмосфера старинной России. Город известен своими храмами, монастырями, уникальной архитектурой XVIII-XIX веков и богатой культурной жизнью. Тверь была одним из центров Тверского княжества и играла важную роль в истории Древней Руси.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть один из старейших городов Центральной России, познакомиться с историей Тверского княжества, посетить уникальные храмы и архитектурные памятники, насладиться видами на Волгу — Тверь станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Твери</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Тверь расположена в зоне умеренно-континентального климата. Лето (июнь-август) тёплое, со средней температурой 18-20°C, может быть жарким до 30°C. Лето — лучшее время для прогулок по городу и речных прогулок по Волге.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) умеренно холодная, со средней температурой около -8°C, морозы могут опускаться до -25°C. Зимой город покрыт снегом, работают катки. Весна и осень прохладные и переменчивые, но достаточно комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Тверь красива, особенно в период новогодних праздников. Летом особенно приятно прогуливаться по набережной Волги.
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
                Поездом: Тверь — крупный железнодорожный узел на линии Москва — Санкт-Петербург, принимает поезда из обоих городов. Из Москвы ходит скоростной поезд "Сапсан" (1,5 часа) и обычные поезда. Из Санкт-Петербурга также удобно добраться поездом.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе М-10, время в пути около 2-3 часов. Из Санкт-Петербурга также удобно добраться по трассе М-10.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах, троллейбусах и маршрутках. Центр города компактный, многие достопримечательности находятся в пешей доступности. Также популярны речные прогулки по Волге.
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
                Тверской кремль — исторический центр города, где сохранились остатки древней крепости. Путевой дворец Екатерины II — красивый дворец XVIII века, построенный для остановок императрицы на пути между Москвой и Санкт-Петербургом. Сейчас здесь находится картинная галерея.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Набережная Волги — популярное место для прогулок с видом на реку. Староволжский мост — один из символов города. Успенский собор Отроч монастыря — старинный храм. Церковь Белая Троица — старейший храм Твери, построенный в XVI веке.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Тверской областной краеведческий музей — интересное место для знакомства с историей и культурой региона. Тверская областная картинная галерея — собрание произведений искусства. Площадь Ленина — главная площадь города.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: театры, музеи, архитектурные памятники. За пределами города — Торжок (старинный город с золотым шитьём), Старица (древний город с монастырём), другие достопримечательности Тверской области.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Твери</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Тверской театр драмы, Театр кукол. В городе проходят многочисленные фестивали и культурные события. Речные прогулки по Волге — обязательный пункт программы для туристов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ночная жизнь: множество баров, клубов и ресторанов в центре города. Шопинг: торговые центры предлагают широкий выбор магазинов. Парки: парки для отдыха, включая парк на набережной Волги.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: фестивали музыки, кино, театра. Тверь славится своими культурными традициями и является популярным туристическим направлением на маршруте между Москвой и Санкт-Петербургом.
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
                Тверская кухня сочетает русские традиции с местными особенностями. Популярны блюда из рыбы (особенно волжской), пельмени, пироги. Классические рестораны предлагают традиционные блюда русской кухни.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры, традиционные пирожки. Сладости: местные конфеты, торты из местных кондитерских.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: тверская кухня известна блюдами из волжской рыбы и традиционными русскими блюдами. Также популярны пироги с различными начинками и местные напитки. Торжок, расположенный недалеко, славится золотым шитьём и традиционными блюдами.
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
                Тверь — один из старейших городов России, основанный в 1135 году. Город был столицей Тверского княжества и играл важную роль в истории Древней Руси. Тверь входит в состав Золотого кольца России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Тверь расположена между Москвой и Санкт-Петербургом, что делает её удобной остановкой на пути между двумя столицами. Путевой дворец Екатерины II был построен специально для остановок императрицы на этом пути.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Тверь — родина известного путешественника Афанасия Никитина, который совершил путешествие в Индию в XV веке. В городе установлен памятник Афанасию Никитину. Тверь славится своей архитектурой XVIII-XIX веков.
              </p>
              <p className="text-base leading-relaxed">
                Тверь — важный культурный центр Центральной России. Город славится своими театрами, музеями и культурными традициями. Тверская область известна своими природными достопримечательностями и старинными городами.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tver;
