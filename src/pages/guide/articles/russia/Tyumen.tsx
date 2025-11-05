import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Tyumen = () => {
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
          <span>Тюмень</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Тюмень</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Тюмень</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Тюмень — первый русский город в Сибири, основанный в 1586 году. Город является столицей Тюменской области и важным экономическим центром Западной Сибири. Тюмень известна как "нефтяная столица России" благодаря развитой нефтегазовой отрасли.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город сочетает богатую историю с современной динамикой развития. Тюмень — это город с уникальной архитектурой, развитой инфраструктурой и активной культурной жизнью. Город известен своими термальными источниками и уникальной природой.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть первый русский город в Сибири, познакомиться с историей освоения Сибири, посетить термальные источники и насладиться современной инфраструктурой — Тюмень станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Тюмени</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Тюмень расположена в зоне континентального климата. Лето (июнь-август) тёплое, со средней температурой 18-20°C, может быть жарким до 30°C. Лето — лучшее время для прогулок по городу и посещения термальных источников.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) холодная и снежная, со средней температурой около -15°C, морозы могут опускаться до -35°C. Зимой город покрыт снегом, работают катки и зимние развлечения. Весна и осень прохладные и переменчивые.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Тюмень красива, особенно в период новогодних праздников. Летом особенно приятно отдыхать на термальных источниках.
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
                Самолётом: международный аэропорт Рощино принимает рейсы из многих городов России. От аэропорта до центра можно доехать на автобусе или такси. Поездом: Тюмень — крупный железнодорожный узел, принимает поезда из Москвы, Санкт-Петербурга и других городов.
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
                Исторический центр Тюмени — множество исторических зданий и памятников. Тюменский краеведческий музей, Музей истории города — интересные места для знакомства с историей. Площадь Ленина — главная площадь города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Церковь Спаса Преображения, Знаменский собор — старинные православные храмы. Набережная Туры — популярное место для прогулок. Термальные источники — уникальная достопримечательность региона.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: Художественный музей, театры, архитектурные памятники. За пределами города — природные достопримечательности, термальные источники, заповедники.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Тюмени</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Тюменский театр драмы, Театр кукол. В городе проходят многочисленные фестивали и культурные события. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Термальные источники — уникальное развлечение, можно круглый год купаться в тёплой воде. Шопинг: торговые центры предлагают широкий выбор магазинов. Парки: парки для отдыха.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: фестивали музыки, кино, театра. Тюмень славится своей современной инфраструктурой и активной культурной жизнью.
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
                Сибирская кухня известна сытными блюдами из мяса, пельменями, пирогами. Классические рестораны предлагают традиционные блюда. Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры, традиционные пирожки.
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
                Тюмень — первый русский город в Сибири, основанный в 1586 году. Город стал отправной точкой для освоения Сибири и Дальнего Востока. Население города превышает 800 тысяч человек.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Тюмень известна как "нефтяная столица России" благодаря развитой нефтегазовой отрасли. В Тюменской области добывается значительная часть российской нефти и газа. Город является важным экономическим центром Западной Сибири.
              </p>
              <p className="text-base leading-relaxed">
                Тюмень известна своими термальными источниками, где можно купаться круглый год. Город также славится своей современной инфраструктурой и является одним из самых развитых городов Сибири.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tyumen;
