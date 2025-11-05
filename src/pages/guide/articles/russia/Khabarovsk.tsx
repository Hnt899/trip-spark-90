import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Khabarovsk = () => {
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
          <span>Хабаровск</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Хабаровск</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Хабаровск</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Хабаровск — крупный город на Дальнем Востоке России, столица Хабаровского края, расположенный на берегах Амура. Основанный в 1858 году, город стал важным административным и культурным центром Дальнего Востока. Хабаровск — это город, где можно познакомиться с уникальной культурой Дальнего Востока и насладиться красивой природой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своей историей, красивой архитектурой, развитой культурной жизнью и близостью к природным достопримечательностям. Хабаровск — это место, где можно увидеть уникальную природу Дальнего Востока, посетить музеи и театры, насладиться морепродуктами и местной кухней.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть один из крупнейших городов Дальнего Востока, познакомиться с уникальной культурой региона, посетить природные достопримечательности и насладиться активной культурной жизнью — Хабаровск станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Хабаровска</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Хабаровск расположен в зоне муссонного климата. Лето (июнь-август) тёплое и влажное, со средней температурой 20-22°C, может быть жарким до 30°C. Лето — лучшее время для посещения города и природных достопримечательностей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) холодная и сухая, со средней температурой около -20°C, морозы могут опускаться до -35°C. Зимой город покрыт снегом. Весна и осень прохладные и переменчивые, но достаточно комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Хабаровск красив, особенно в период новогодних праздников.
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
                Самолётом: международный аэропорт Новый принимает рейсы из многих городов России и Азии. От аэропорта до центра можно доехать на автобусе или такси. Поездом: Хабаровск — крупный железнодорожный узел на Транссибирской магистрали, принимает поезда из всех регионов России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы поезд идёт около 6-7 суток. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе (очень длинный путь через всю страну).
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
                Площадь Ленина — главная площадь города. Набережная Амура — популярное место для прогулок с видом на реку. Хабаровский краеведческий музей — интересное место для знакомства с историей и культурой региона. Художественный музей — собрание произведений искусства.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Спасо-Преображенский собор — главный храм города. Парк имени Муравьёва-Амурского — популярное место для отдыха. Также стоит посетить: театры, музеи, архитектурные памятники.
              </p>
              <p className="text-base leading-relaxed">
                За пределами города — природные достопримечательности Дальнего Востока, включая национальные парки, заповедники, горы, реки.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Хабаровске</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Хабаровский театр драмы, Театр кукол. В городе проходят многочисленные фестивали и культурные события. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры предлагают широкий выбор магазинов. Парки: парки для отдыха. Культурные события: фестивали музыки, кино, театра.
              </p>
              <p className="text-base leading-relaxed">
                Хабаровск славится своей активной культурной жизнью и является важным культурным центром на Дальнем Востоке.
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
                Дальневосточная кухня славится морепродуктами и рыбой. Популярны блюда из лосося, крабов, креветок, морских ежей. Классические рестораны предлагают блюда из морепродуктов. Современная кухня: множество ресторанов с авторской кухней.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: дальневосточная кухня известна блюдами из морепродуктов и рыбы. Также популярны азиатские блюда благодаря близости к Азии.
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
                Хабаровск — крупный город на Дальнем Востоке России, население превышает 600 тысяч человек. Город был основан в 1858 году как военный пост. Хабаровск является важным административным и культурным центром Дальнего Востока.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Хабаровск расположен на реке Амур, которая является границей между Россией и Китаем. Город является важным транспортным узлом, через который проходит Транссибирская магистраль.
              </p>
              <p className="text-base leading-relaxed">
                Хабаровск славится своей уникальной природой и является важным центром туризма на Дальнем Востоке. Разница во времени с Москвой составляет 7 часов.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Khabarovsk;
