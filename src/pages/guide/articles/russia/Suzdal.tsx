import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Suzdal = () => {
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
          <span>Суздаль</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Суздаль</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Суздаль</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Суздаль — уникальный город-музей под открытым небом, один из старейших городов России, основанный в 1024 году. Город входит в состав Золотого кольца России и включён в список Всемирного наследия ЮНЕСКО. Суздаль — это место, где сохранилась атмосфера Древней Руси.
              </p>
              <p className="text-base leading-relaxed mb-4">
                На небольшой территории Суздаля расположено более 200 памятников архитектуры, включая монастыри, церкви, колокольни. Город известен своими белокаменными храмами, деревянными избами и уникальной атмосферой провинциальной России. Суздаль — это город, где каждый дом, каждая улица рассказывает историю.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть настоящую Древнюю Русь, познакомиться с историей России, посетить уникальные монастыри и храмы, насладиться тишиной и покоем старинного города — Суздаль станет незабываемым местом для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Суздаля</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Суздаль расположен в зоне умеренно-континентального климата. Лето (июнь-август) тёплое, со средней температурой 18-20°C, может быть жарким до 30°C. Лето — лучшее время для прогулок по городу и посещения достопримечательностей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) холодная и снежная, со средней температурой около -10°C, морозы могут опускаться до -25°C. Зимой город покрыт снегом, что создаёт особую атмосферу русской зимы. Весна и осень прохладные и переменчивые, но достаточно комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Суздаль невероятно красив, особенно в период новогодних праздников, когда белокаменные храмы покрыты снегом и создают сказочную атмосферу.
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
                Поездом: ближайшая железнодорожная станция — во Владимире (30 км от Суздаля). Из Москвы можно доехать до Владимира поездом, а затем на автобусе или такси до Суздаля. Автобусом: из Владимира регулярно ходят автобусы до Суздаля (30-40 минут).
              </p>
              <p className="text-base leading-relaxed mb-4">
                Автомобилем: из Москвы по трассе М-7 до Владимира, затем по дороге до Суздаля (30 км). Общее время в пути из Москвы около 3-4 часов. Также можно добраться из других городов через Владимир.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города можно передвигаться пешком — город небольшой, все достопримечательности находятся в пешей доступности. Также можно арендовать велосипед или воспользоваться конными прогулками.
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
                Суздальский кремль — сердце города, древняя крепость с соборами и музеями. Рождественский собор — старейший храм Суздаля, построенный в XII веке, уникальный памятник белокаменного зодчества. Архиерейские палаты — комплекс зданий XVII века, сейчас здесь находится музей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Спасо-Евфимиев монастырь — один из крупнейших монастырей Суздаля, основанный в XIV веке. На его территории находится музей, усыпальница Пожарских, уникальные фрески. Покровский монастырь — женский монастырь, основанный в XIV веке, место ссылки знатных женщин.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Музей деревянного зодчества — уникальный музей под открытым небом, где собраны деревянные постройки из разных мест Владимирской области: церкви, избы, мельницы, амбары. Это место позволяет увидеть, как жили русские крестьяне в прошлом.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: многочисленные церкви и монастыри, торговые ряды, улицы с исторической застройкой. Суздаль — это город, где каждая церковь, каждый дом является памятником архитектуры.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Суздале</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Фестивали: Суздаль славится своими фестивалями, включая праздник огурца, фестиваль русской сказки. Музеи: множество музеев, включая музей деревянного зодчества, исторические музеи в монастырях.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Конные прогулки, катание на санях зимой — популярные развлечения. Сувенирные лавки: множество магазинов с изделиями народных промыслов, сувенирами. Рестораны: традиционные русские рестораны с местной кухней.
              </p>
              <p className="text-base leading-relaxed">
                Суздаль — тихий, спокойный город, идеальный для отдыха от суеты больших городов. Здесь можно насладиться тишиной, прогуляться по старинным улочкам, послушать колокольный звон.
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
                Русская кухня: популярны традиционные блюда — борщ, щи, пельмени, пироги, блины. Медовуха — традиционный напиток, популярный в Суздале. Классические рестораны предлагают блюда русской кухни, приготовленные по старинным рецептам.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Суздаль известен своими огурцами — здесь проходит праздник огурца. Также популярны местные продукты: мёд, варенье, домашние заготовки. Множество ресторанов и кафе предлагают традиционную русскую кухню.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: суздальская кухня известна традиционными русскими блюдами, приготовленными по старинным рецептам. Медовуха — обязательный напиток для дегустации в Суздале.
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
                Суздаль — один из старейших городов России, основанный в 1024 году. Город входит в состав Золотого кольца России и включён в список Всемирного наследия ЮНЕСКО. На небольшой территории города расположено более 200 памятников архитектуры.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Суздаль — город-музей под открытым небом. Здесь практически нет промышленности, город сохранил свой исторический облик. Музей деревянного зодчества — уникальный музей, где собраны деревянные постройки из разных мест.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Суздаль известен праздником огурца, который проходит летом. Город славится производством медовухи — традиционного русского напитка. Суздаль часто называют "городом церквей" — здесь более 50 церквей и монастырей.
              </p>
              <p className="text-base leading-relaxed">
                Суздаль — популярное место для съёмок фильмов о Древней Руси и русской истории. Город славится своей уникальной атмосферой и является одним из самых посещаемых туристами городов Золотого кольца.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Suzdal;
