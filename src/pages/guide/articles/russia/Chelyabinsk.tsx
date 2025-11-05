import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Chelyabinsk = () => {
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
          <span>Челябинск</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Челябинск</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Челябинск</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Челябинск — крупный промышленный город на Урале, столица Челябинской области. Основанный в 1736 году как крепость, город стал важным промышленным центром и известен своей металлургией и машиностроением. Челябинск — это город с развитой инфраструктурой и активной культурной жизнью.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своими театрами, музеями, парками и красивой архитектурой. Челябинск расположен на границе Европы и Азии, что создаёт уникальную атмосферу. Город также славится близостью к природным достопримечательностям Урала, включая озёра и горы.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите познакомиться с уральской культурой, посетить уникальные музеи и театры, увидеть красоту Урала и насладиться активной культурной жизнью — Челябинск станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Челябинска</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Челябинск расположен в зоне умеренно-континентального климата. Лето (июнь-август) тёплое, со средней температурой 18-20°C, может быть жарким до 30°C. Лето — лучшее время для прогулок по городу и посещения природных достопримечательностей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) холодная и снежная, со средней температурой около -14°C, морозы могут опускаться до -30°C. Зимой город покрыт снегом, работают катки и зимние развлечения. Весна и осень прохладные и переменчивые.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Челябинск красив, особенно в период новогодних праздников.
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
                Самолётом: международный аэропорт Баландино принимает рейсы из многих городов России. От аэропорта до центра можно доехать на автобусе или такси. Поездом: Челябинск — крупный железнодорожный узел, принимает поезда из Москвы, Санкт-Петербурга и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы ходит скоростной поезд (около 30 часов) и обычные поезда. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе, время в пути около 25-30 часов.
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
                Площадь Революции — главная площадь города. Челябинский краеведческий музей, Музей истории города — интересные места для знакомства с историей. Челябинский театр оперы и балета, Театр драмы — крупные театральные площадки.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Парк имени Гагарина — крупный парк для отдыха. Набережная реки Миасс — популярное место для прогулок. Также стоит посетить: Художественный музей, архитектурные памятники.
              </p>
              <p className="text-base leading-relaxed">
                За пределами города — природные достопримечательности Урала: озёра, горы, заповедники. Челябинск расположен близко к знаменитым уральским озёрам.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Челябинске</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Челябинский театр оперы и балета, Театр драмы, Театр кукол. В городе проходят многочисленные фестивали и культурные события. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры предлагают широкий выбор магазинов. Парки: парки для отдыха. Культурные события: фестивали музыки, кино, театра.
              </p>
              <p className="text-base leading-relaxed">
                Челябинск славится своей активной культурной жизнью и является важным культурным центром Урала.
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
                Уральская кухня: популярны блюда из мяса, пельмени, пироги. Классические рестораны предлагают традиционные блюда. Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры, традиционные пирожки.
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
                Челябинск — крупный промышленный город на Урале, население превышает 1,2 миллиона человек. Город был основан в 1736 году как крепость. Челябинск является важным промышленным центром, известным своей металлургией и машиностроением.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Челябинск расположен на границе Европы и Азии, через город проходит символическая граница между двумя частями света. Город также славится близостью к природным достопримечательностям Урала, включая знаменитые уральские озёра.
              </p>
              <p className="text-base leading-relaxed">
                Челябинск — важный транспортный узел, через который проходят важные транспортные магистрали. Город является крупным экономическим и культурным центром Урала.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chelyabinsk;
