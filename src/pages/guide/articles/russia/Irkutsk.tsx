import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Irkutsk = () => {
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
          <span>Иркутск</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Иркутск</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Иркутск</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Иркутск — старинный сибирский город, столица Иркутской области, расположенный на берегах Ангары. Основанный в 1661 году, город стал важным центром торговли и культуры Восточной Сибири. Иркутск — это "Париж Сибири", известный своей уникальной деревянной архитектурой и богатой историей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен как отправная точка для путешествий к озеру Байкал — самому глубокому озеру в мире. Иркутск сохранил множество исторических зданий, включая уникальные деревянные дома с резными наличниками. Город был местом ссылки декабристов, что оставило свой след в его культуре.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть один из самых красивых городов Сибири, познакомиться с уникальной архитектурой, посетить озеро Байкал и насладиться сибирской культурой — Иркутск станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Иркутска</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Иркутск расположен в зоне резко-континентального климата. Лето (июнь-август) тёплое и короткое, со средней температурой 18-20°C, может быть жарким до 30°C. Лето — лучшее время для посещения города и озера Байкал.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) суровая и длинная, со средней температурой около -18°C, морозы могут опускаться до -40°C. Зимой город покрыт снегом, но из-за близости к Байкалу климат немного мягче. Весна и осень короткие и прохладные.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Иркутск красив, особенно в период новогодних праздников. Летом особенно приятно прогуливаться по набережной Ангары.
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
                Самолётом: международный аэропорт Иркутск принимает рейсы из многих городов России и мира. От аэропорта до центра можно доехать на автобусе или такси за 20-30 минут. Поездом: Иркутск — крупный железнодорожный узел на Транссибирской магистрали, принимает поезда из всех регионов России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы поезд идёт около 3,5-4 суток. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе (очень длинный путь через всю страну).
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах, троллейбусах, трамваях и маршрутках. Также популярны поездки к озеру Байкал (около 70 км от города). Центр города компактный, многие достопримечательности находятся в пешей доступности.
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
                Исторический центр Иркутска — уникальная деревянная архитектура, включающая дома с резными наличниками. Многие здания сохранились с XIX века. Площадь Кирова — главная площадь города. Набережная Ангары — популярное место для прогулок с видом на реку.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Иркутский областной краеведческий музей, Музей декабристов — интересные места для знакомства с историей. Спасская церковь, Знаменский монастырь — старинные православные храмы. 130-й квартал — отреставрированный исторический квартал с деревянными домами.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Озеро Байкал — главная достопримечательность региона, находится в 70 км от Иркутска. Это самое глубокое озеро в мире, объект Всемирного наследия ЮНЕСКО. Из Иркутска можно отправиться на экскурсию к Байкалу.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: Художественный музей, Театр драмы, Театр кукол. Архитектурно-этнографический музей "Тальцы" — музей под открытым небом с деревянными постройками.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Иркутске</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Иркутский театр драмы, Театр кукол, Театр юного зрителя. В городе проходят многочисленные фестивали и культурные события. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Экскурсии к озеру Байкал — обязательный пункт программы для туристов. Шопинг: торговые центры "Комсомолл", "Ярмарка", "Сити-центр" предлагают широкий выбор магазинов. Парки: парк имени Парижской Коммуны, парк имени Кирова — отличные места для отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зимние виды спорта — популярны в Иркутске. Также популярны экскурсии к Байкалу, включая поездки на остров Ольхон, в Листвянку и другие места.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: фестивали музыки, кино, театра. Иркутск славится своими культурными традициями, связанными с историей декабристов.
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
                Сибирская кухня известна сытными блюдами из мяса, рыбы и дичи. Популярны пельмени, мясо по-сибирски, строганина из рыбы (особенно из омуля из Байкала). Классические рестораны: "Сибирская корона", "Пельмени-Сибирь", "Байкал" предлагают традиционные блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Байкальская рыба — омуль, сиг, хариус — популярные блюда. Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры, традиционные пирожки.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: сибирская кухня известна своими пельменями и блюдами из байкальской рыбы. Также популярны блюда из дичи, грибов и ягод, которые растут в сибирских лесах.
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
                Иркутск — крупный город Восточной Сибири, население превышает 600 тысяч человек. Город был основан в 1661 году как острог. Иркутск известен как "Париж Сибири" благодаря своей уникальной архитектуре и культурной жизни.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Иркутск был местом ссылки декабристов — участников восстания 1825 года. Многие декабристы внесли значительный вклад в культурную жизнь города. В городе находится музей декабристов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Озеро Байкал находится в 70 км от Иркутска — это самое глубокое озеро в мире, содержащее 20% мировых запасов пресной воды. Иркутск является главными воротами к Байкалу для туристов.
              </p>
              <p className="text-base leading-relaxed">
                Иркутск — крупный транспортный узел, через который проходят важные транспортные магистрали. Город является важным экономическим и культурным центром Восточной Сибири.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Irkutsk;
