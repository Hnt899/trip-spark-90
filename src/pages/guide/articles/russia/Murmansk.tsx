import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Murmansk = () => {
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
          <span>Мурманск</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Мурманск</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Мурманск</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Мурманск — крупнейший город за Полярным кругом, расположенный на Кольском полуострове на берегу Баренцева моря. Основанный в 1916 году, город является крупнейшим портом в Арктике и важным военно-морским центром. Мурманск — это ворота в Арктику, уникальный город, где можно увидеть полярную ночь и северное сияние.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своим уникальным расположением, красивой природой Кольского полуострова и возможностью увидеть северное сияние. Мурманск — это место, где можно познакомиться с арктической культурой, посетить атомный ледокол "Ленин" и насладиться уникальной атмосферой заполярного города.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть самый крупный город за Полярным кругом, познакомиться с арктической культурой, увидеть северное сияние и насладиться уникальной природой Кольского полуострова — Мурманск станет незабываемым местом для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Мурманска</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Мурманск расположен в зоне субарктического климата с влиянием тёплого течения Гольфстрим. Благодаря этому, несмотря на расположение за Полярным кругом, климат относительно мягкий. Лето (июнь-август) прохладное, со средней температурой 12-15°C, может быть тёплым до 25°C. Лето — лучшее время для посещения.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) длинная и снежная, со средней температурой около -10°C, но из-за Гольфстрима морозы обычно не опускаются ниже -25°C. Зимой наступает полярная ночь — солнце не появляется над горизонтом около 40 дней. В это время можно увидеть северное сияние.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда длится полярный день (солнце не заходит за горизонт около 60 дней). Однако и зимой Мурманск красив, особенно если вы хотите увидеть северное сияние и полярную ночь.
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
                Самолётом: международный аэропорт Мурманск принимает рейсы из многих городов России. От аэропорта до центра можно доехать на автобусе или такси. Поездом: Мурманск — конечная точка железнодорожной линии, принимает поезда из Москвы, Санкт-Петербурга и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы поезд идёт около 30-35 часов. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе через Санкт-Петербург, время в пути около 20-25 часов.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах, троллейбусах и маршрутках. Центр города компактный, многие достопримечательности находятся в пешей доступности.
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
                Атомный ледокол "Ленин" — первый в мире атомный ледокол, сейчас музей. Это уникальный объект, который можно посетить. Памятник "Алёша" — монумент защитникам Заполярья, символ города. Морской порт — крупнейший порт в Арктике, можно посетить с экскурсией.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Мурманский краеведческий музей — интересное место для знакомства с историей и культурой региона. Океанариум — единственный океанариум за Полярным кругом. Площадь Пять Углов — главная площадь города.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: Художественный музей, театры. За пределами города — природные достопримечательности Кольского полуострова, включая горы, озёра, тундру. Также популярны экскурсии для наблюдения за северным сиянием.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Мурманске</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Мурманский театр драмы, Театр кукол. В городе проходят многочисленные культурные события. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Наблюдение за северным сиянием — уникальное развлечение, особенно популярно в зимний период. Экскурсии по природным достопримечательностям Кольского полуострова. Шопинг: торговые центры предлагают широкий выбор магазинов.
              </p>
              <p className="text-base leading-relaxed">
                Мурманск славится своей уникальной атмосферой заполярного города и является популярным местом для туристов, интересующихся Арктикой.
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
                Северная кухня известна блюдами из рыбы и морепродуктов. Популярны блюда из трески, камбалы, крабов, креветок. Классические рестораны предлагают блюда из рыбы и морепродуктов. Современная кухня: множество ресторанов с авторской кухней.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: северная кухня известна блюдами из рыбы и морепродуктов. Также популярны блюда из оленины и других местных продуктов.
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
                Мурманск — крупнейший город за Полярным кругом, население превышает 280 тысяч человек. Город был основан в 1916 году как порт. Мурманск — крупнейший порт в Арктике и важный военно-морской центр.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Благодаря тёплому течению Гольфстрим, Мурманск является незамерзающим портом, что делает его уникальным в Арктике. В городе наступает полярная ночь (около 40 дней) и полярный день (около 60 дней).
              </p>
              <p className="text-base leading-relaxed">
                Атомный ледокол "Ленин" — первый в мире атомный ледокол, сейчас музей. Мурманск — популярное место для наблюдения за северным сиянием. Город славится своей уникальной природой и арктической культурой.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Murmansk;
