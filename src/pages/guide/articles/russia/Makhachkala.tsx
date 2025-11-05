import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Makhachkala = () => {
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
          <span>Махачкала</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Махачкала</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Махачкалу</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Махачкала — столица Республики Дагестан, крупный город на берегу Каспийского моря. Основанный в 1844 году как крепость Порт-Петровск, город стал важным административным и культурным центром Северного Кавказа. Махачкала — это единственный крупный город России на берегу Каспийского моря.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своей уникальной культурой, сочетающей традиции многочисленных народов Дагестана, тёплым климатом, близостью к морю и горам. Махачкала — это место, где можно познакомиться с дагестанской культурой, посетить уникальные музеи и насладиться природой Каспийского моря и Кавказских гор.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть столицу Дагестана, познакомиться с уникальной культурой многочисленных народов региона, посетить музеи и насладиться тёплым климатом и природой Каспийского моря — Махачкала станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Махачкалы</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Махачкала расположена в зоне умеренно-континентального климата с тёплым летом. Лето (июнь-август) жаркое и солнечное, со средней температурой 24-26°C, может быть жарким до 35°C. Лето — лучшее время для посещения города и пляжного отдыха на Каспийском море.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) мягкая, со средней температурой около 2°C, морозы редко опускаются ниже -5°C. Зимой обычно мало снега. Весна и осень тёплые и комфортные, идеальны для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна для пляжного отдыха и прогулок. Однако и зимой Махачкала приятна для посещения благодаря мягкому климату.
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
                Самолётом: аэропорт Уйташ принимает рейсы из Москвы, Санкт-Петербурга и других городов. От аэропорта до центра можно доехать на автобусе или такси. Поездом: Махачкала — крупный железнодорожный узел, принимает поезда из Москвы, Ростова-на-Дону и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы поезд идёт около 30-32 часов. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе, время в пути около 18-20 часов.
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
                Площадь Ленина — главная площадь города. Центральная Джума-мечеть — крупнейшая мечеть на Северном Кавказе. Дагестанский музей изобразительных искусств — собрание произведений искусства народов Дагестана.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Национальный музей Республики Дагестан — крупный музейный комплекс, рассказывающий об истории и культуре многочисленных народов Дагестана. Набережная Каспийского моря — популярное место для прогулок.
              </p>
              <p className="text-base leading-relaxed">
                За пределами города — природные достопримечательности Дагестана: Каспийское море, Кавказские горы, древние аулы, крепости, природные парки и заповедники.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Махачкале</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Пляжный отдых: набережная Каспийского моря, пляжи для отдыха. Театры: Дагестанский театр оперы и балета, Театр драмы. В городе проходят многочисленные фестивали и культурные события.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ночная жизнь: множество баров, клубов и ресторанов в центре города. Шопинг: торговые центры предлагают широкий выбор магазинов. Парки: парки для отдыха.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: фестивали музыки, кино, театра, дагестанской культуры. Махачкала славится своей активной культурной жизнью и является важным культурным центром на Северном Кавказе.
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
                Дагестанская кухня славится блюдами из мяса, рыбы, овощей, молочных продуктов. Популярны блюда: хинкал, чуду (лепёшки с начинкой), шашлык, плов, долма. Классические рестораны предлагают традиционные дагестанские блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Также популярны блюда из рыбы (особенно каспийской), овощей, молочных продуктов. Дагестанская кухня сочетает традиции многочисленных народов Дагестана. Современная кухня: множество ресторанов с авторской кухней.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: дагестанская кухня известна своими лепёшками чуду, хинкалом и блюдами из мяса. Также популярны блюда из каспийской рыбы и местные молочные продукты.
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
                Махачкала — столица Республики Дагестан, единственный крупный город России на берегу Каспийского моря. Город был основан в 1844 году как крепость Порт-Петровск. Махачкала является важным административным и культурным центром на Северном Кавказе.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Дагестан — самый многонациональный регион России, здесь проживают более 30 народов. Махачкала — центр многонациональной культуры Дагестана. Центральная Джума-мечеть — крупнейшая мечеть на Северном Кавказе.
              </p>
              <p className="text-base leading-relaxed">
                Махачкала славится своей уникальной культурой и является центром развития культуры многочисленных народов Дагестана. Город расположен на берегу Каспийского моря и окружён Кавказскими горами. Дагестанская кухня известна своими лепёшками чуду и хинкалом.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Makhachkala;
