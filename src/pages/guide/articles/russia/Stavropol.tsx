import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Stavropol = () => {
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
          <span>Ставрополь</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Ставрополь</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Ставрополь</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Ставрополь — административный центр Ставропольского края, крупный город на юге России, расположенный на Ставропольской возвышенности. Основанный в 1777 году как крепость, город стал важным административным и культурным центром Северного Кавказа. Ставрополь известен как "ворота Кавказа" и славится своей красивой архитектурой и природой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своим мягким климатом, множеством парков и скверов, красивой архитектурой XIX-XX веков. Ставрополь — это место, где можно познакомиться с историей Кавказа, посетить уникальные музеи и насладиться природой предгорий Кавказа.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть один из крупнейших городов Северного Кавказа, познакомиться с историей региона, посетить музеи и насладиться мягким климатом и природой — Ставрополь станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Ставрополя</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Ставрополь расположен в зоне умеренно-континентального климата с мягкой зимой. Лето (июнь-август) тёплое и солнечное, со средней температурой 22-24°C, может быть жарким до 35°C. Лето — лучшее время для посещения города и природных достопримечательностей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) мягкая, со средней температурой около 0°C, морозы редко опускаются ниже -10°C. Зимой обычно мало снега. Весна и осень тёплые и комфортные, идеальны для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Ставрополь приятен для посещения благодаря мягкому климату.
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
                Самолётом: аэропорт Шпаковское принимает рейсы из Москвы и других городов. От аэропорта до центра можно доехать на автобусе или такси. Поездом: Ставрополь — крупный железнодорожный узел, принимает поезда из Москвы, Ростова-на-Дону и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы поезд идёт около 24-26 часов. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе, время в пути около 16-18 часов.
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
                Площадь Ленина — главная площадь города. Казанский собор — главный храм города. Ставропольский краеведческий музей — крупный музейный комплекс, рассказывающий об истории и природе региона.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ставропольский государственный музей-заповедник имени Прозрителева и Праве. Художественный музей. Парки и скверы: множество зелёных зон для отдыха.
              </p>
              <p className="text-base leading-relaxed">
                За пределами города — природные достопримечательности Ставропольского края: Кавказские Минеральные Воды, горы, предгорья Кавказа, заповедники.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Ставрополе</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Ставропольский театр драмы, Театр кукол. В городе проходят многочисленные фестивали и культурные события. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры предлагают широкий выбор магазинов. Парки: множество парков для отдыха. Культурные события: фестивали музыки, кино, театра.
              </p>
              <p className="text-base leading-relaxed">
                Ставрополь славится своей активной культурной жизнью и является важным культурным центром на Северном Кавказе.
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
                Ставропольская кухня сочетает русские традиции с кавказскими влияниями. Популярны блюда из мяса, рыбы, овощей. Классические рестораны предлагают традиционные блюда русской и кавказской кухни.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Также популярны блюда кавказской кухни: шашлык, хинкали, плов. Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: ставропольская кухня известна блюдами из мяса и овощей, а также кавказскими влияниями. Также популярны местные продукты и вина.
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
                Ставрополь — административный центр Ставропольского края, город был основан в 1777 году как крепость. Ставрополь известен как "ворота Кавказа" и является важным административным центром на Северном Кавказе.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ставрополь славится мягким климатом и множеством парков. Город известен своей красивой архитектурой XIX-XX веков. Ставропольский край известен курортами Кавказских Минеральных Вод.
              </p>
              <p className="text-base leading-relaxed">
                Ставрополь — важный культурный центр на Северном Кавказе. Город окружён красивой природой предгорий Кавказа. Ставропольский край славится своими курортами и природными достопримечательностями.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Stavropol;
