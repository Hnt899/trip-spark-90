import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Izhevsk = () => {
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
          <span>Ижевск</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Ижевск</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Ижевск</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Ижевск — столица Удмуртской Республики, крупный промышленный и культурный центр в Поволжье. Основанный в 1760 году как посёлок при железоделательном заводе, город стал известен как "родина оружия" — здесь производились знаменитые ижевские ружья и автоматы Калашникова.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своей оружейной историей, уникальной культурой удмуртского народа, развитой промышленностью и красивой архитектурой. Ижевск — это место, где можно познакомиться с историей оружейного производства, посетить уникальные музеи и насладиться природой Удмуртии.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть столицу Удмуртии, познакомиться с оружейной историей России, посетить уникальные музеи и насладиться культурой удмуртского народа — Ижевск станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Ижевска</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Ижевск расположен в зоне умеренно-континентального климата. Лето (июнь-август) тёплое, со средней температурой 18-20°C, может быть жарким до 30°C. Лето — лучшее время для прогулок по городу и посещения достопримечательностей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) умеренно холодная, со средней температурой около -12°C, морозы могут опускаться до -30°C. Зимой город покрыт снегом, работают катки. Весна и осень прохладные и переменчивые, но достаточно комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Ижевск красив, особенно в период новогодних праздников.
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
                Самолётом: аэропорт Ижевск принимает рейсы из Москвы, Санкт-Петербурга и других городов. От аэропорта до центра можно доехать на автобусе или такси. Поездом: Ижевск — крупный железнодорожный узел, принимает поезда из Москвы, Санкт-Петербурга и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы поезд идёт около 18-20 часов. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе, время в пути около 12-14 часов.
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
                Музейно-выставочный комплекс стрелкового оружия имени М.Т. Калашникова — уникальный музей, посвящённый истории оружейного производства и конструктору автомата Калашникова. Памятник Михаилу Калашникову — один из символов города. Ижевский пруд — искусственное озеро, созданное в XVIII веке, популярное место для отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Национальный музей Удмуртской Республики имени Кузебая Герда — крупный музейный комплекс, рассказывающий об истории и культуре удмуртского народа. Площадь Оружейников — главная площадь города с памятниками и фонтанами.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Свято-Михайловский собор — главный храм города, восстановленный в 2000-х годах. Удмуртский театр оперы и балета — крупный театральный центр. Также стоит посетить: театры, музеи, архитектурные памятники.
              </p>
              <p className="text-base leading-relaxed">
                За пределами города — природные достопримечательности Удмуртии, этнографические музеи, деревни с традиционной удмуртской культурой.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Ижевске</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Удмуртский театр оперы и балета, Театр драмы, Театр кукол. В городе проходят многочисленные фестивали и культурные события, включая фестивали удмуртской культуры.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ночная жизнь: множество баров, клубов и ресторанов в центре города. Шопинг: торговые центры предлагают широкий выбор магазинов. Парки: парки для отдыха, включая парк на берегу Ижевского пруда.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: фестивали музыки, кино, театра. Ижевск славится своей активной культурной жизнью и является важным культурным центром в Поволжье.
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
                Удмуртская кухня славится блюдами из мяса, рыбы, молочных продуктов, пельменями. Популярны блюда: перепечи (открытые пироги), пельмени (которые, по легенде, придумали в Удмуртии), супы, молочные блюда. Классические рестораны предлагают традиционные удмуртские блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Также популярны блюда из рыбы, грибов, ягод. Удмуртская кухня сочетает традиции финно-угорских народов и русские блюда. Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: удмуртская кухня известна своими пельменями и перепечами. Также популярны блюда из рыбы, грибов и ягод, которые добывают в Удмуртии.
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
                Ижевск — столица Удмуртской Республики, город был основан в 1760 году как посёлок при железоделательном заводе. Ижевск известен как "родина оружия" — здесь производились знаменитые ижевские ружья и автоматы Калашникова.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Михаил Калашников, конструктор знаменитого автомата АК-47, жил и работал в Ижевске. В городе установлен памятник Калашникову и открыт музей, посвящённый оружейному производству. Ижевск является одним из центров оружейной промышленности России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ижевский пруд — искусственное озеро, созданное в XVIII веке для нужд железоделательного завода. Пруд является одним из символов города и популярным местом для отдыха. Ижевск славится своей промышленностью и культурой.
              </p>
              <p className="text-base leading-relaxed">
                Ижевск — родина пельменей, по легенде, именно здесь придумали это блюдо. Удмуртская кухня известна своими пельменями и перепечами. Город славится своей уникальной культурой и является центром развития удмуртской культуры.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Izhevsk;
