import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Perm = () => {
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
          <span>Пермь</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Пермь</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Пермь</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Пермь — крупный город на Урале, столица Пермского края, расположенный на берегах Камы. Основанный в 1723 году как поселение при медеплавильном заводе, город стал важным промышленным и культурным центром Урала. Пермь — это город с богатой историей, развитой культурой и уникальной природой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен как "столица современного искусства Урала", здесь проходит знаменитая Пермская биеннале и множество культурных событий. Пермь также славится своей театральной культурой и уникальной природой Урала, включая знаменитую Кунгурскую ледяную пещеру.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите познакомиться с уральской культурой, посетить уникальные музеи и театры, увидеть красоту Урала и насладиться активной культурной жизнью — Пермь станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Перми</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Пермь расположена в зоне умеренно-континентального климата. Лето (июнь-август) тёплое, со средней температурой 18-20°C, может быть жарким до 30°C. Лето — лучшее время для прогулок по городу и посещения природных достопримечательностей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) холодная и снежная, со средней температурой около -12°C, морозы могут опускаться до -30°C. Зимой город покрыт снегом, работают катки и зимние развлечения. Весна и осень прохладные и переменчивые.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Пермь красива, особенно в период новогодних праздников. Летом особенно приятно прогуливаться по набережной Камы.
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
                Самолётом: международный аэропорт Большое Савино принимает рейсы из многих городов России. От аэропорта до центра можно доехать на автобусе или такси. Поездом: Пермь — крупный железнодорожный узел, принимает поезда из Москвы, Санкт-Петербурга и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы ходит скоростной поезд "Ласточка" (20-22 часа) и обычные поезда. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе, время в пути около 18-20 часов.
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
                Пермский краеведческий музей, Пермская художественная галерея — крупные культурные центры. Площадь Ленина — главная площадь города. Набережная Камы — популярное место для прогулок с видом на реку.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Пермский театр оперы и балета, Пермский театр драмы — известные театральные площадки. Архитектура города: множество исторических зданий и памятников. Парк имени Горького — крупный парк для отдыха.
              </p>
              <p className="text-base leading-relaxed">
                За пределами города — природные достопримечательности Урала: Кунгурская ледяная пещера, заповедники, горные пейзажи. Также стоит посетить музеи, включая музей современного искусства PERMM.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Перми</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Пермский театр оперы и балета, Пермский театр драмы. В городе проходят многочисленные фестивали и культурные события, включая Пермскую биеннале. Ночная жизнь: множество баров, клубов и ресторанов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры предлагают широкий выбор магазинов. Парки: парк имени Горького — отличное место для отдыха. Культурные события: фестивали музыки, кино, театра, современного искусства.
              </p>
              <p className="text-base leading-relaxed">
                Пермь славится своей активной культурной жизнью и является центром современного искусства на Урале.
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
                Уральская кухня известна сытными блюдами из мяса, пельменями, пирогами. Классические рестораны предлагают традиционные блюда. Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры, традиционные пирожки.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: уральская кухня известна своими пельменями и блюдами из дичи. Также популярны блюда из грибов и ягод, которые растут в уральских лесах.
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
                Пермь — крупный город на Урале, население превышает 1 миллион человек. Город был основан в 1723 году как поселение при медеплавильном заводе. Пермь является важным промышленным и культурным центром Урала.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Пермь известна как "столица современного искусства Урала", здесь проходит знаменитая Пермская биеннале. Пермский театр оперы и балета — один из старейших театров России, основан в 1870 году.
              </p>
              <p className="text-base leading-relaxed">
                Кунгурская ледяная пещера, расположенная недалеко от Перми, — одна из самых известных пещер в мире. Пермь также славится своей уникальной природой и является важным центром туризма на Урале.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Perm;
