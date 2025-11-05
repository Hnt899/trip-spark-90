import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Krasnoyarsk = () => {
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
          <span>Красноярск</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Красноярск</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Красноярск</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Красноярск — крупнейший город Восточной Сибири, столица Красноярского края, расположенный на берегах Енисея. Основанный в 1628 году как острог, город стал важным промышленным и культурным центром Сибири. Красноярск — это ворота в Восточную Сибирь и на Дальний Восток.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своей уникальной природой, заповедником "Столбы", красноярской ГЭС — одной из крупнейших в России, и богатой культурной жизнью. Красноярск окружён горами и тайгой, что создаёт неповторимую атмосферу.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть "сибирскую столицу", познакомиться с уникальной природой Сибири, посетить заповедник "Столбы" и насладиться сибирской культурой — Красноярск станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Красноярска</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Красноярск расположен в зоне резко-континентального климата. Лето (июнь-август) тёплое и короткое, со средней температурой 18-20°C, может быть жарким до 30°C. Лето — лучшее время для прогулок по городу и посещения заповедника "Столбы".
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) суровая и длинная, со средней температурой около -15°C, морозы могут опускаться до -35°C и ниже. Зимой город покрыт снегом, работают катки и зимние развлечения. Весна и осень короткие и прохладные.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Красноярск красив, особенно в период новогодних праздников. Летом особенно приятно прогуливаться по набережной Енисея и посещать заповедник.
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
                Самолётом: международный аэропорт Емельяново принимает рейсы из многих городов России. От аэропорта до центра можно доехать на автобусе или такси за 40-50 минут. Поездом: Красноярск — крупный железнодорожный узел на Транссибирской магистрали, принимает поезда из всех регионов России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы поезд идёт около 3-4 суток. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе (очень длинный путь через всю страну).
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
                Заповедник "Столбы" — главная достопримечательность Красноярска, уникальный природный заповедник с причудливыми скальными образованиями. Это место популярно среди альпинистов и любителей природы. Здесь можно увидеть уникальную природу Сибири.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Красноярская ГЭС — одна из крупнейших гидроэлектростанций в России, можно посетить с экскурсией. Площадь Мира — главная площадь города. Набережная Енисея — популярное место для прогулок с видом на реку и мосты.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Красноярский краеведческий музей, Музей-усадьба В.И. Сурикова — интересные места для знакомства с историей и культурой. Часовня Параскевы Пятницы — символ города, расположена на Караульной горе.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: Художественный музей, Театр оперы и балета, парк "Роев ручей" — один из крупнейших зоопарков в Сибири. За пределами города — природные достопримечательности, включая Саяно-Шушенскую ГЭС.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Красноярске</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Красноярский театр оперы и балета, Театр драмы, Театр кукол. В городе проходят многочисленные фестивали и культурные события. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры "Планета", "Июнь", "Красноярье" предлагают широкий выбор магазинов и развлечений. Парки: парк "Роев ручей", Центральный парк — отличные места для отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Спорт: стадионы, спортивные комплексы. Зимние виды спорта — особенно популярны в Красноярске. Также популярны экскурсии в заповедник "Столбы" и природные достопримечательности.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: фестивали музыки, кино, театра. Красноярск славится своими культурными традициями и активной культурной жизнью.
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
                Сибирская кухня известна сытными блюдами из мяса, рыбы и дичи. Популярны пельмени, мясо по-сибирски, строганина из рыбы. Классические рестораны: "Сибирская корона", "Пельмени-Сибирь", "Дом Актёра" предлагают традиционные блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры, традиционные пирожки. Сладости: сибирские конфеты, торты из местных кондитерских.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: сибирская кухня известна своими пельменями и блюдами из дичи. Также популярны блюда из рыбы, грибов и ягод, которые растут в сибирских лесах.
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
                Красноярск — крупнейший город Восточной Сибири, население превышает 1 миллион человек. Город был основан в 1628 году как острог. Красноярск является крупным промышленным и культурным центром Сибири.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Заповедник "Столбы" — уникальный природный заповедник, известный своими причудливыми скальными образованиями. Это место популярно среди альпинистов и любителей природы. Красноярская ГЭС — одна из крупнейших гидроэлектростанций в России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Красноярск — родина художника Василия Сурикова, одного из самых известных русских живописцев. В городе находится музей-усадьба Сурикова. Часовня Параскевы Пятницы — символ города, изображена на банкноте в 10 рублей.
              </p>
              <p className="text-base leading-relaxed">
                Красноярск — крупный транспортный узел, через который проходят важные транспортные магистрали. Город является важным экономическим и культурным центром Восточной Сибири.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Krasnoyarsk;
