import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const UlanUde = () => {
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
          <span>Улан-Удэ</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Улан-Удэ</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Улан-Удэ</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Улан-Удэ — столица Республики Бурятия, крупный город в Восточной Сибири, расположенный в месте слияния рек Селенги и Уды. Основанный в 1666 году как казачье зимовье, город стал важным культурным и экономическим центром Сибири. Улан-Удэ — это единственный город в России, где буддизм является одной из основных религий.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своей уникальной культурой, сочетающей русские, бурятские и буддийские традиции. Улан-Удэ — это место, где можно познакомиться с буддийской культурой, посетить дацаны (буддийские монастыри), увидеть уникальные памятники архитектуры и насладиться сибирской природой.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть столицу Бурятии, познакомиться с буддийской культурой, посетить уникальные дацаны и храмы, насладиться бурятской кухней и сибирской природой — Улан-Удэ станет незабываемым местом для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Улан-Удэ</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Улан-Удэ расположен в зоне резко континентального климата. Лето (июнь-август) тёплое и солнечное, со средней температурой 18-20°C, днём может быть до 25-30°C. Лето — лучшее время для посещения города и природных достопримечательностей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) холодная и сухая, со средней температурой около -20°C, морозы могут опускаться до -35°C. Зимой город покрыт снегом. Весна и осень прохладные и переменчивые, но достаточно комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Улан-Удэ красив, особенно в период новогодних праздников и буддийских праздников.
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
                Самолётом: аэропорт Байкал принимает рейсы из Москвы, Иркутска, Новосибирска и других городов. От аэропорта до центра можно доехать на автобусе или такси. Поездом: Улан-Удэ — крупный железнодорожный узел на Транссибирской магистрали, принимает поезда из всех регионов России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы поезд идёт около 3-4 суток. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе (очень длинный путь через всю страну).
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах, троллейбусах и маршрутках. Центр города компактный, многие достопримечательности находятся в пешей доступности. Также популярны поездки к озеру Байкал, которое находится в 100 км от города.
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
                Памятник "Голова Ленина" — самый большой памятник голове Ленина в мире, один из символов города. Площадь Советов — главная площадь города. Одигитриевский собор — старинный православный храм, один из старейших каменных зданий города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Иволгинский дацан — крупнейший буддийский монастырь в России, расположенный в 30 км от Улан-Удэ. Это место паломничества буддистов и туристов. В дацане хранится нетленное тело Хамбо-ламы Итигэлова — уникальная реликвия.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Бурятский театр оперы и балета — крупный театральный центр. Этнографический музей народов Забайкалья — музей под открытым небом, рассказывающий о культуре народов Бурятии. Художественный музей имени Сампилова — собрание произведений бурятского искусства.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: театры, музеи, архитектурные памятники. За пределами города — озеро Байкал (одно из самых красивых озёр мира), Иволгинский дацан, другие дацаны и природные достопримечательности Бурятии.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Улан-Удэ</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Бурятский театр оперы и балета, Театр драмы. В городе проходят многочисленные фестивали и культурные события, включая буддийские праздники и фестивали бурятской культуры.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ночная жизнь: множество баров, клубов и ресторанов в центре города. Шопинг: торговые центры предлагают широкий выбор магазинов. Парки: парки для отдыха. Культурные события: фестивали музыки, кино, театра, буддийские праздники.
              </p>
              <p className="text-base leading-relaxed">
                Улан-Удэ славится своей активной культурной жизнью и является важным культурным центром в Сибири. Особенно популярны поездки к озеру Байкал, где можно заняться активным отдыхом.
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
                Бурятская кухня славится блюдами из мяса (баранина, говядина), молочными продуктами, позами (бурятские пельмени). Популярны блюда: буузы (позы), хуушуур (жареные пирожки), саламат (молочная каша), тарасун (молочная водка). Классические рестораны предлагают традиционные бурятские блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Также популярны блюда из рыбы байкальской (омуль, сиг), дичи, ягод. Бурятская кухня сочетает традиции кочевых народов и русские блюда. Современная кухня: множество ресторанов с авторской кухней.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: бурятская кухня известна блюдами из мяса и молочными продуктами. Буузы (позы) — главное блюдо бурятской кухни, обязательно попробуйте. Также популярны блюда из байкальской рыбы.
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
                Улан-Удэ — столица Республики Бурятия, единственный город в России, где буддизм является одной из основных религий. Город был основан в 1666 году как казачье зимовье. Улан-Удэ является важным культурным и экономическим центром в Восточной Сибири.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Иволгинский дацан — крупнейший буддийский монастырь в России, расположенный в 30 км от Улан-Удэ. В дацане хранится нетленное тело Хамбо-ламы Итигэлова — уникальная реликвия, которая привлекает паломников и туристов со всего мира.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Улан-Удэ расположен в 100 км от озера Байкал — самого глубокого и чистого озера в мире. Байкал является объектом Всемирного наследия ЮНЕСКО и одним из самых популярных туристических направлений в России.
              </p>
              <p className="text-base leading-relaxed">
                Улан-Удэ славится своей уникальной культурой, сочетающей русские, бурятские и буддийские традиции. Город является центром развития буддийской культуры в России. Бурятская кухня известна своими позами (буузами) и блюдами из байкальской рыбы.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UlanUde;
