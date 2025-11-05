import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Ufa = () => {
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
          <span>Уфа</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Уфа</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Уфу</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Уфа — столица Республики Башкортостан, крупный город на Урале, расположенный на берегах рек Белой и Уфы. Основанная в 1574 году как крепость, Уфа стала важным культурным и экономическим центром. Город известен своей уникальной культурой, сочетающей русские и башкирские традиции.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Уфа — это город, где можно познакомиться с культурой башкирского народа, посетить уникальные музеи, театры и мечети. Город известен своими природными достопримечательностями, включая близость к горам Урала и национальным паркам. Уфа славится своей гостеприимностью и богатой культурой.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите познакомиться с башкирской культурой, посетить уникальные достопримечательности, насладиться природой Урала и попробовать национальную кухню — Уфа станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Уфы</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Уфа расположена в зоне умеренно-континентального климата. Лето (июнь-август) тёплое, со средней температурой 18-20°C, может быть жарким до 30°C. Лето — лучшее время для прогулок по городу и посещения природных достопримечательностей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) холодная и снежная, со средней температурой около -12°C, морозы могут опускаться до -30°C. Зимой город покрыт снегом, работают катки и зимние развлечения. Весна и осень прохладные и переменчивые.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Уфа красива, особенно в период новогодних праздников.
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
                Самолётом: международный аэропорт Уфа принимает рейсы из многих городов России. От аэропорта до центра можно доехать на автобусе или такси. Поездом: Уфа — крупный железнодорожный узел, принимает поезда из Москвы, Санкт-Петербурга и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы ходит скоростной поезд (около 20 часов) и обычные поезда. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе, время в пути около 18-20 часов.
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
                Площадь Ленина — главная площадь города. Монумент Дружбы — памятник, символизирующий дружбу народов. Башкирский театр оперы и балета — крупный театральный центр. Национальный музей Республики Башкортостан — интересное место для знакомства с историей и культурой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Мечеть Ляля-Тюльпан — одна из крупнейших мечетей России. Собор Рождества Богородицы — главный православный храм города. Парк имени Гафури — популярное место для отдыха.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: Художественный музей, музеи, театры. За пределами города — природные достопримечательности, включая горы Урала, национальные парки, пещеры.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Уфе</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Башкирский театр оперы и балета, Театр драмы. В городе проходят многочисленные фестивали и культурные события. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры предлагают широкий выбор магазинов. Парки: парки для отдыха. Культурные события: фестивали музыки, кино, театра, включая национальные башкирские фестивали.
              </p>
              <p className="text-base leading-relaxed">
                Уфа славится своей активной культурной жизнью и является важным культурным центром на Урале.
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
                Башкирская кухня: популярны блюда из мяса, особенно конина, баранина, башкирский мёд, кумыс (напиток из кобыльего молока). Классические рестораны предлагают традиционные башкирские блюда. Также популярны русские и татарские блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры, традиционные пирожки. Особенность: обязательно попробуйте башкирский мёд, кумыс, башкирские блюда из мяса.
              </p>
              <p className="text-base leading-relaxed">
                Башкирская кухня известна своими блюдами из мяса и молочными продуктами. Также популярны блюда из рыбы, грибов и ягод.
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
                Уфа — столица Республики Башкортостан, население превышает 1,1 миллиона человек. Город был основан в 1574 году как крепость. Уфа является важным экономическим и культурным центром на Урале.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Уфа известна как "столица башкирского мёда" — здесь производят один из лучших мёдов в России. Башкирский мёд известен своими целебными свойствами и уникальным вкусом.
              </p>
              <p className="text-base leading-relaxed">
                Уфа — город, где сочетаются русские и башкирские традиции. Город славится своими культурными традициями и является важным центром сохранения башкирской культуры.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ufa;
