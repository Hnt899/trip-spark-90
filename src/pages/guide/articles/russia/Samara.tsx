import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Samara = () => {
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
          <span>Самара</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Самара</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Самару</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Самара — крупный город на Волге, столица Самарской области, известный своей промышленностью, авиационной и космической отраслью. Город основан в 1586 году как крепость и является важным экономическим и культурным центром Поволжья.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Самара — это город с богатой историей, красивой набережной Волги, уникальной архитектурой и развитой культурной жизнью. Город известен как "запасная столица" — во время Великой Отечественной войны сюда был эвакуирован советский правительство.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть один из крупнейших городов Поволжья, посетить уникальные музеи космонавтики, насладиться видами на Волгу и познакомиться с историей авиации и космоса — Самара станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Самары</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Самара расположена в зоне умеренно-континентального климата. Лето (июнь-август) тёплое, со средней температурой 20-22°C, может быть жарким до 35°C. Лето — лучшее время для прогулок по набережной и речных прогулок по Волге.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) холодная и снежная, со средней температурой около -10°C, морозы могут опускаться до -25°C. Зимой город покрыт снегом, работают катки. Весна и осень прохладные и переменчивые, но достаточно комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Самара красива, особенно в период новогодних праздников. Летом особенно приятно прогуливаться по набережной Волги.
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
                Самолётом: международный аэропорт Курумоч принимает рейсы из многих городов России. От аэропорта до центра можно доехать на автобусе или такси за 40-50 минут. Поездом: Самара — крупный железнодорожный узел, принимает поезда из Москвы, Санкт-Петербурга и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы ходит скоростной поезд "Ласточка" (14-15 часов) и обычные поезда. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе М-5, время в пути около 12-14 часов.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на метро, автобусах, троллейбусах и трамваях. Также популярны речные прогулки по Волге. Центр города компактный, многие достопримечательности находятся в пешей доступности.
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
                Набережная Волги — одна из самых длинных и красивых в России, протяжённостью более 5 км. Площадь Куйбышева — одна из крупнейших площадей в Европе. Самарский краеведческий музей, Музей истории Самары — интересные места для знакомства с историей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Самарский космический музей — уникальный музей, посвящённый космонавтике. Здесь можно увидеть ракету-носитель "Союз" и другие экспонаты. Музей авиации и космонавтики имени С.П. Королёва — ещё один интересный музей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Жигулёвский пивоваренный завод — один из старейших пивоваренных заводов России, можно посетить с экскурсией. Самарский театр оперы и балета, Театр драмы — крупные театральные площадки. Площадь Славы с монументом — важное историческое место.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: Художественный музей, Музей модерна, Старую Самару с исторической застройкой. За пределами города — Жигулёвские горы, Самарская Лука, национальный парк.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Самаре</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Самарский театр оперы и балета, Театр драмы, Театр кукол. В городе проходят многочисленные фестивали и культурные события. Речные прогулки по Волге — обязательный пункт программы для туристов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ночная жизнь: множество баров, клубов и ресторанов в центре города. Шопинг: торговые центры "Мега", "Мега-Сити", "Вива Лэнд" предлагают широкий выбор магазинов и развлечений.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Парки: Струковский сад, парк Победы — отличные места для отдыха. Летом можно покататься на велосипедах, зимой — на коньках. Спорт: стадион "Самара Арена", построенный к чемпионату мира по футболу 2018.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: фестивали музыки, кино, театра. Самара славится своими культурными традициями и активной культурной жизнью.
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
                Самарская кухня сочетает русские традиции с местными особенностями. Популярны блюда из рыбы (особенно волжской), пельмени, пироги. Классические рестораны: "Пельмени-Классик", "Волга", "Дом Актёра" предлагают традиционные блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Жигулёвское пиво — знаменитый бренд, родина которого в Самаре. Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры, традиционные пирожки.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: самарская кухня известна блюдами из волжской рыбы, особенно стерляди. Также популярны пироги с различными начинками и местные напитки.
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
                Самара — крупный город на Волге, население превышает 1,1 миллиона человек. Город был основан в 1586 году как крепость. Во время Великой Отечественной войны Самара была "запасной столицей" — сюда был эвакуирован советский правительство.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Площадь Куйбышева в Самаре — одна из крупнейших площадей в Европе, её площадь составляет 17,4 гектара. Самара — крупный центр авиационной и космической промышленности, здесь расположены предприятия, связанные с космосом.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Жигулёвское пиво — знаменитый бренд, родина которого в Самаре. Самарский космический музей — уникальный музей, где можно увидеть ракету-носитель "Союз" в натуральную величину.
              </p>
              <p className="text-base leading-relaxed">
                Самара — крупный транспортный узел, через который проходят важные транспортные магистрали. Город является важным экономическим и культурным центром Поволжья.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Samara;
