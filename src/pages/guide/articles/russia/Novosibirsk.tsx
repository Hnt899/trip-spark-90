import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Novosibirsk = () => {
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
          <span>Новосибирск</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Новосибирск</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Новосибирск</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Новосибирск — столица Сибири, третий по численности населения город России. Основанный в 1893 году как поселение при строительстве Транссибирской магистрали, город стремительно вырос и стал крупнейшим научным, культурным и промышленным центром Сибири.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Новосибирск — это город науки, здесь расположен знаменитый Академгородок, где работают ведущие научные институты России. Город известен своими театрами, музеями и современной архитектурой. Это динамичный мегаполис с развитой инфраструктурой и активной культурной жизнью.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть "сибирскую столицу", познакомиться с научными достижениями России, посетить уникальные театры и музеи, насладиться сибирской природой — Новосибирск станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Новосибирска</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Новосибирск расположен в зоне резко-континентального климата. Лето (июнь-август) тёплое и короткое, со средней температурой 18-20°C, но может быть жарким до 30°C и выше. Лето — лучшее время для прогулок по городу и посещения парков.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) суровая и длинная, со средней температурой около -16°C, морозы могут опускаться до -35°C и ниже. Зимой город покрыт снегом, работают катки и зимние развлечения. Весна и осень короткие и прохладные.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Новосибирск красив, особенно в период новогодних праздников. Летом особенно приятно прогуливаться по набережной Оби и отдыхать в парках.
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
                Самолётом: международный аэропорт Толмачёво принимает рейсы из многих городов России и мира. От аэропорта до центра можно доехать на автобусе или такси за 40-50 минут. Поездом: Новосибирск — крупный железнодорожный узел на Транссибирской магистрали, принимает поезда из всех регионов России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы ходит скоростной поезд (50-55 часов) и обычные поезда. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе М-51, время в пути около 35-40 часов.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на метро, автобусах, троллейбусах и трамваях. Новосибирское метро — самое длинное однопутное метро в мире. Центр города компактный, многие достопримечательности находятся в пешей доступности.
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
                Новосибирский театр оперы и балета — крупнейший театр России, символ города. Театр известен своей архитектурой и богатым репертуаром. Площадь Ленина — главная площадь города с памятником Ленину и театром оперы и балета.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Академгородок — уникальный научный центр, где расположены научно-исследовательские институты и Новосибирский государственный университет. Здесь можно увидеть современную архитектуру и посетить музеи науки.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Новосибирский зоопарк — один из крупнейших зоопарков России, известный своими успехами в разведении редких животных. Набережная Оби — популярное место для прогулок с видом на реку и мосты.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: Музей истории города, Художественный музей, Музей железнодорожной техники, Собор Александра Невского. Парк "Берёзовая роща", Центральный парк — отличные места для отдыха. За пределами города — Новосибирское водохранилище и природные достопримечательности.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Новосибирске</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Новосибирский театр оперы и балета, Театр "Красный факел", Театр музыкальной комедии. В городе проходят многочисленные фестивали и культурные события, включая фестиваль "Сибирские огни", джазовые концерты.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ночная жизнь: множество баров, клубов и ресторанов в центре города. Новосибирск славится своей активной ночной жизнью. Летом особенно популярны открытые террасы с видом на город.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры "Мега", "Аура", "Галерея Новосибирск" предлагают широкий выбор магазинов и развлечений. Парки: Центральный парк, парк "Берёзовая роща" — отличные места для отдыха. Летом можно покататься на велосипедах, зимой — на коньках и лыжах.
              </p>
              <p className="text-base leading-relaxed">
                Спорт: "Новосибирск Арена" — крупный спортивный объект. Аквапарк "Аквамир", парк аттракционов — популярные развлечения для всей семьи. Также популярны экскурсии по Академгородку и природным достопримечательностям Сибири.
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
                Сибирская кухня известна сытными блюдами из мяса, рыбы и дичи. Популярны пельмени, мясо по-сибирски, строганина из рыбы. Классические рестораны: "Сибирская корона", "Пельмени-Сибирь", "Дом Актёра" предлагают традиционные блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Современная кухня: множество ресторанов с авторской кухней, фьюжн-концепциями. "Трактир на Дворцовой", "Берёзка", "Итальянская кухня" — популярные заведения. Уличная еда: шаурма, бургеры, традиционные пирожки на каждом шагу.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Сладости: сибирские конфеты, торты из местных кондитерских. "Кондитерская Сибирь", "Птичье молоко" — известные кондитерские. Напитки: крафтовое пиво местных пивоварен, традиционный чай, морсы из местных ягод.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: сибирская кухня известна своими пельменями, которые здесь готовят с различными начинками. Также популярны блюда из дичи, рыбы, грибов и ягод, которые растут в сибирских лесах.
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
                Новосибирск — третий по численности населения город России после Москвы и Санкт-Петербурга. Население города превышает 1,6 миллиона человек. Город был основан в 1893 году как поселение при строительстве железнодорожного моста через Обь.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Новосибирск — самый быстрорастущий город-миллионник в истории человечества. От статуса города до миллионера он прошёл за 70 лет. Новосибирское метро — самое длинное однопутное метро в мире, его длина составляет 15,9 км.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Академгородок — уникальный научный центр, созданный в 1950-х годах. Здесь расположены десятки научно-исследовательских институтов и Новосибирский государственный университет. Академгородок считается одним из ведущих научных центров России.
              </p>
              <p className="text-base leading-relaxed">
                Новосибирский театр оперы и балета — крупнейший театр России, его площадь составляет более 40 000 м². Новосибирский зоопарк известен своими успехами в разведении редких животных, включая лигров и белых медведей.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Novosibirsk;
