import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const GornoAltaysk = () => {
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
          <span>Горно-Алтайск</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Горно-Алтайск</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Горно-Алтайск</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Горно-Алтайск — столица Республики Алтай, уникальный город, окружённый живописными горами Алтая. Город был основан в 1830 году как село Улала, а в 1928 году получил статус города. Горно-Алтайск — это ворота в Алтайские горы, одно из самых красивых мест России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своей уникальной природой, близостью к Алтайским горам, чистыми реками и озёрами. Горно-Алтайск — это место, где можно познакомиться с алтайской культурой, традициями коренных народов, посетить музеи и насладиться горной природой.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть столицу Алтая, познакомиться с уникальной природой и культурой региона, посетить горные достопримечательности и насладиться чистейшим воздухом — Горно-Алтайск станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Горно-Алтайска</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Горно-Алтайск расположен в зоне резко континентального климата. Лето (июнь-август) тёплое и солнечное, со средней температурой 18-20°C, днём может быть до 25-30°C. Лето — лучшее время для посещения города и горных походов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) умеренно холодная, со средней температурой около -12°C, морозы могут опускаться до -25°C. Зимой город покрыт снегом, работают горнолыжные курорты. Весна и осень прохладные и переменчивые, но достаточно комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна для горных походов и активного отдыха. Однако и зимой Горно-Алтайск красив, особенно для любителей горнолыжного спорта.
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
                Самолётом: аэропорт Горно-Алтайск принимает рейсы из Москвы, Новосибирска и других городов. От аэропорта до центра можно доехать на автобусе или такси. Поездом: ближайшая железнодорожная станция — в Бийске (100 км от Горно-Алтайска), откуда можно доехать на автобусе.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Автобусом: междугородние автобусы прибывают на автовокзал из Новосибирска, Барнаула, Бийска. Автомобилем: из Новосибирска по трассе, время в пути около 5-6 часов. Из Барнаула — около 4 часов.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах и маршрутках. Центр города компактный, многие достопримечательности находятся в пешей доступности. Для поездок по Алтаю лучше арендовать автомобиль или воспользоваться организованными экскурсиями.
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
                Национальный музей Республики Алтай имени Анохина — крупный музейный комплекс, рассказывающий об истории, культуре и природе Алтая. Здесь хранится мумия "Алтайской принцессы" — уникальная археологическая находка. Площадь Ленина — главная площадь города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Городской парк — популярное место для отдыха с видом на горы. Памятники алтайской культуры и истории. Церкви и храмы. Также стоит посетить: музеи, театры, культурные центры.
              </p>
              <p className="text-base leading-relaxed">
                За пределами города — уникальные природные достопримечательности Алтая: Телецкое озеро (одно из самых красивых озёр России), гора Белуха (самая высокая точка Сибири), Катунский заповедник, Чуйский тракт (одна из самых живописных дорог России), многочисленные пещеры, водопады и горные реки.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Горно-Алтайске</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Активный отдых: горные походы, рафтинг, конные прогулки, альпинизм, рыбалка. Горнолыжные курорты работают зимой. Театры и культурные центры: в городе проходят фестивали алтайской культуры и традиций.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ночная жизнь: множество баров, ресторанов и кафе в центре города. Шопинг: торговые центры и сувенирные лавки предлагают изделия народных промыслов и алтайские сувениры. Парки: парки для отдыха с видом на горы.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: фестивали музыки, культуры коренных народов, экотуризма. Горно-Алтайск славится своими культурными традициями и является центром развития алтайской культуры.
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
                Алтайская кухня славится блюдами из мяса (баранина, конина, оленина), молочными продуктами, мёдом. Популярны блюда: алтайский сыр, курут (сушёный творог), мясные блюда, алтайский мёд. Классические рестораны предлагают традиционные алтайские блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Также популярны блюда из рыбы, ягод, дичи. Алтайский мёд — один из лучших в России, обязательно попробуйте. Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: алтайская кухня известна использованием натуральных продуктов, мёда, молочных продуктов и мяса. Также популярны блюда из ягод и дичи, которые добывают в Алтайских горах.
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
                Горно-Алтайск — столица Республики Алтай, самый маленький административный центр России. Город был основан в 1830 году как село Улала. Горно-Алтайск окружён Алтайскими горами и является воротами в один из самых красивых регионов России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Республика Алтай известна своими уникальными природными достопримечательностями: Телецкое озеро, гора Белуха, Катунский заповедник. Алтай — это место, где сохранилась уникальная природа и культура коренных народов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                В Национальном музее Республики Алтай хранится мумия "Алтайской принцессы" — уникальная археологическая находка, обнаруженная в 1993 году. Алтай известен своими археологическими памятниками и древними находками.
              </p>
              <p className="text-base leading-relaxed">
                Алтай — популярное место для экотуризма, альпинизма, рафтинга и активного отдыха. Горно-Алтайск славится чистейшим воздухом и уникальной природой. Алтайский мёд считается одним из лучших в России.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GornoAltaysk;
