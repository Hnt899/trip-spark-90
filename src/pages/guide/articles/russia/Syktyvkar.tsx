import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Syktyvkar = () => {
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
          <span>Сыктывкар</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Сыктывкар</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Сыктывкар</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Сыктывкар — столица Республики Коми, расположенная в северо-восточной части Европейской России на берегах реки Сысолы. Основанный в 1586 году как село Усть-Сысольск, город стал важным административным и культурным центром региона. Сыктывкар — это ворота в Коми, регион с богатой природой, уникальной культурой и традициями.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своей культурой коми народа, богатой природой, лесами и реками. Сыктывкар — это место, где можно познакомиться с финно-угорской культурой, посетить уникальные музеи и насладиться природой северной тайги.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть столицу Коми, познакомиться с уникальной культурой коми народа, посетить музеи и насладиться природой северной тайги — Сыктывкар станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Сыктывкара</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Сыктывкар расположен в зоне умеренно-континентального климата с влиянием Арктики. Лето (июнь-август) прохладное и короткое, со средней температурой 15-17°C, днём может быть до 20-25°C. Лето — лучшее время для посещения города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) длинная и холодная, со средней температурой около -15°C, морозы могут опускаться до -35°C. Зимой город покрыт снегом, работают катки. Весна и осень прохладные и переменчивые, часто дождливые.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с июня по август, когда погода наиболее комфортна. Однако и зимой Сыктывкар красив, особенно в период новогодних праздников.
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
                Самолётом: аэропорт Сыктывкар принимает рейсы из Москвы, Санкт-Петербурга и других городов. От аэропорта до центра можно доехать на автобусе или такси. Поездом: Сыктывкар — крупный железнодорожный узел, принимает поезда из Москвы и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы поезд идёт около 20-22 часов. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе, время в пути около 14-16 часов.
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
                Национальный музей Республики Коми — крупный музейный комплекс, рассказывающий об истории, культуре и природе Коми. Площадь Стефана Пермского — главная площадь города. Стефановский собор — главный храм города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Национальная галерея Республики Коми — собрание произведений искусства. Театр оперы и балета Республики Коми. Парки и скверы для отдыха.
              </p>
              <p className="text-base leading-relaxed">
                За пределами города — природные достопримечательности Коми: тайга, реки, озёра, заповедники. Также интересны этнографические музеи и деревни с традиционной культурой коми народа.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Сыктывкаре</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Театр оперы и балета Республики Коми, Театр драмы. В городе проходят многочисленные фестивали и культурные события, включая фестивали коми культуры.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ночная жизнь: множество баров, клубов и ресторанов в центре города. Шопинг: торговые центры предлагают широкий выбор магазинов. Парки: парки для отдыха.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: фестивали музыки, кино, театра. Сыктывкар славится своей активной культурной жизнью и является важным культурным центром в регионе.
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
                Коми кухня славится блюдами из рыбы, мяса, дичи, ягод, грибов. Популярны блюда: рыбники, пельмени, блюда из дичи, ягодные пироги. Классические рестораны предлагают традиционные коми блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Также популярны блюда из рыбы (особенно северной), грибов, ягод. Коми кухня сочетает традиции финно-угорских народов и русские блюда. Современная кухня: множество ресторанов с авторской кухней.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: коми кухня известна блюдами из рыбы, дичи, грибов и ягод, которые добывают в тайге. Также популярны молочные продукты и блюда из мяса.
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
                Сыктывкар — столица Республики Коми, город был основан в 1586 году как село Усть-Сысольск. Сыктывкар является важным административным и культурным центром в северо-восточной части Европейской России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Коми известна своей богатой природой: тайгой, реками, озёрами. На территории Коми находится множество заповедников и национальных парков. Сыктывкар славится культурой коми народа.
              </p>
              <p className="text-base leading-relaxed">
                Сыктывкар — центр развития коми культуры и языка. Город окружён красивой природой северной тайги. Коми кухня известна блюдами из рыбы, дичи, грибов и ягод.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Syktyvkar;
