import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Maykop = () => {
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
          <span>Майкоп</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Майкоп</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Майкоп</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Майкоп — столица Республики Адыгея, расположенная в предгорьях Кавказа на берегу реки Белой. Основанный в 1857 году как крепость, город стал важным административным и культурным центром Адыгеи. Майкоп — это ворота в Адыгею, регион с уникальной природой и богатой культурой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своей близостью к Кавказским горам, уникальной природой, адыгейской культурой и традициями. Майкоп — это место, где можно познакомиться с культурой адыгейского народа, посетить уникальные природные достопримечательности и насладиться природой предгорий Кавказа.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть столицу Адыгеи, познакомиться с уникальной культурой адыгейского народа, посетить природные достопримечательности и насладиться природой Кавказа — Майкоп станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Майкопа</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Майкоп расположен в зоне умеренно-континентального климата с тёплым летом. Лето (июнь-август) жаркое и солнечное, со средней температурой 22-24°C, может быть жарким до 35°C. Лето — лучшее время для посещения города и природных достопримечательностей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) мягкая, со средней температурой около 2°C, морозы редко опускаются ниже -5°C. Зимой обычно мало снега. Весна и осень тёплые и комфортные, идеальны для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Майкоп приятен для посещения благодаря мягкому климату.
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
                Самолётом: ближайший аэропорт — в Краснодаре (130 км от Майкопа), откуда можно доехать на автобусе или такси. Поездом: ближайшая железнодорожная станция — в Белореченске (20 км от Майкопа), откуда можно доехать на автобусе.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Автобусом: междугородние автобусы прибывают на автовокзал из Краснодара, Ростова-на-Дону и других городов. Автомобилем: из Краснодара по трассе, время в пути около 1,5-2 часов.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах и маршрутках. Центр города компактный, многие достопримечательности находятся в пешей доступности.
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
                Площадь Ленина — главная площадь города. Национальный музей Республики Адыгея — интересное место для знакомства с историей и культурой адыгейского народа. Парки и скверы для отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Соборная мечеть — главная мечеть города. Памятники и скульптуры, связанные с адыгейской культурой. Также стоит посетить: театры, музеи, культурные центры.
              </p>
              <p className="text-base leading-relaxed">
                За пределами города — уникальные природные достопримечательности Адыгеи: Кавказские горы, природные парки, заповедники, водопады, пещеры, горные реки.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Майкопе</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Активный отдых: горные походы, рафтинг, конные прогулки, альпинизм. Театры и культурные центры: в городе проходят фестивали адыгейской культуры. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры и сувенирные лавки предлагают изделия народных промыслов. Парки: парки для отдыха. Культурные события: фестивали музыки, культуры коренных народов.
              </p>
              <p className="text-base leading-relaxed">
                Майкоп славится своей активной культурной жизнью и является центром развития адыгейской культуры.
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
                Адыгейская кухня славится блюдами из мяса, молочных продуктов, адыгейским сыром. Популярны блюда: адыгейский сыр, шашлык, хинкали, лепёшки. Классические рестораны предлагают традиционные адыгейские блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Также популярны блюда из овощей, фруктов. Адыгейская кухня сочетает традиции кавказских народов. Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: адыгейская кухня известна адыгейским сыром и блюдами из мяса. Адыгейский сыр — одно из самых известных блюд, обязательно попробуйте.
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
                Майкоп — столица Республики Адыгея, город был основан в 1857 году как крепость. Майкоп является важным административным и культурным центром Адыгеи. Город расположен в предгорьях Кавказа на берегу реки Белой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Адыгея известна своей уникальной природой: Кавказскими горами, природными парками, заповедниками. На территории Адыгеи находится часть Кавказского заповедника. Майкоп славится культурой адыгейского народа.
              </p>
              <p className="text-base leading-relaxed">
                Майкоп — центр развития адыгейской культуры и является важным культурным центром на Северном Кавказе. Город окружён красивой природой предгорий Кавказа. Адыгейский сыр известен по всей России.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Maykop;
