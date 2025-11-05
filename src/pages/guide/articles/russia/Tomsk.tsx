import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Tomsk = () => {
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
          <span>Томск</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Томск</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Томск</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Томск — старинный сибирский город, основанный в 1604 году, известный как "Сибирские Афины" благодаря своим университетам и научным традициям. Город является крупным образовательным и научным центром Сибири, где расположены одни из старейших университетов России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Томск славится своей уникальной деревянной архитектурой с резными наличниками, которая сохранилась с XIX-XX веков. Город известен своими университетами, музеями, театрами и активной культурной жизнью. Томск — это город студентов и интеллигенции.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть один из самых красивых городов Сибири, познакомиться с уникальной деревянной архитектурой, посетить старейшие университеты России и насладиться атмосферой студенческого города — Томск станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Томска</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Томск расположен в зоне резко-континентального климата. Лето (июнь-август) тёплое и короткое, со средней температурой 18-20°C, может быть жарким до 30°C. Лето — лучшее время для прогулок по городу и посещения достопримечательностей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) суровая и длинная, со средней температурой около -17°C, морозы могут опускаться до -40°C. Зимой город покрыт снегом, работают катки и зимние развлечения. Весна и осень короткие и прохладные.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Томск красив, особенно в период новогодних праздников, когда деревянные дома покрыты снегом.
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
                Самолётом: аэропорт Богашёво принимает рейсы из многих городов России. От аэропорта до центра можно доехать на автобусе или такси. Поездом: Томск находится на ветке от Транссибирской магистрали, можно доехать через Новосибирск.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы можно доехать поездом через Новосибирск. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе через Новосибирск.
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
                Деревянная архитектура Томска — уникальные деревянные дома с резными наличниками, которые сохранились с XIX-XX веков. Это одна из главных достопримечательностей города. Томский государственный университет — один из старейших университетов России, основанный в 1878 году.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Томский краеведческий музей, Музей истории Томска — интересные места для знакомства с историей. Площадь Ленина — главная площадь города. Воскресенская гора — историческое место с видом на город.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: Художественный музей, театры, архитектурные памятники. Томск славится своими университетами и научными традициями.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Томске</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Томский театр драмы, Театр кукол. В городе проходят многочисленные фестивали и культурные события. Ночная жизнь: множество баров, клубов и ресторанов, особенно популярны студенческие заведения.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры предлагают широкий выбор магазинов. Парки: парки для отдыха. Культурные события: фестивали музыки, кино, театра.
              </p>
              <p className="text-base leading-relaxed">
                Томск славится своей студенческой атмосферой и активной культурной жизнью.
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
                Сибирская кухня: популярны блюда из мяса, пельмени, пироги. Классические рестораны предлагают традиционные блюда. Современная кухня: множество ресторанов с авторской кухней, особенно популярны студенческие кафе. Уличная еда: шаурма, бургеры, традиционные пирожки.
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
                Томск — старинный сибирский город, основанный в 1604 году. Город известен как "Сибирские Афины" благодаря своим университетам и научным традициям. Томский государственный университет — один из старейших университетов России, основанный в 1878 году.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Томск славится своей уникальной деревянной архитектурой с резными наличниками, которая сохранилась с XIX-XX веков. Город известен своими университетами, где учится много студентов из разных городов России и мира.
              </p>
              <p className="text-base leading-relaxed">
                Томск — город студентов и интеллигенции, здесь расположены несколько крупных университетов. Город славится своей активной культурной жизнью и является важным образовательным центром Сибири.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tomsk;
