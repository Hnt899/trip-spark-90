import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Vladimir = () => {
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
          <span>Владимир</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Владимир</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать во Владимир</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Владимир — один из старейших городов России, основанный в 990 году. Город был столицей Владимиро-Суздальского княжества и играл важную роль в истории Древней Руси. Владимир входит в состав Золотого кольца России и является объектом Всемирного наследия ЮНЕСКО.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своими уникальными белокаменными храмами XII века, которые сохранились до наших дней. Успенский собор, Дмитриевский собор, Золотые ворота — это шедевры древнерусской архитектуры, которые нельзя пропустить. Владимир — это город, где можно прикоснуться к истории Древней Руси.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть один из самых древних городов России, познакомиться с историей Древней Руси, посетить уникальные памятники белокаменного зодчества и насладиться атмосферой старинного города — Владимир станет незабываемым местом для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Владимира</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Владимир расположен в зоне умеренно-континентального климата. Лето (июнь-август) тёплое, со средней температурой 18-20°C, может быть жарким до 30°C. Лето — лучшее время для прогулок по городу и посещения достопримечательностей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) холодная и снежная, со средней температурой около -10°C, морозы могут опускаться до -25°C. Зимой город покрыт снегом, что создаёт особую атмосферу. Весна и осень прохладные и переменчивые, но достаточно комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Владимир красив, особенно в период новогодних праздников, когда белокаменные храмы покрыты снегом.
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
                Поездом: Владимир — крупный железнодорожный узел на линии Москва-Нижний Новгород, принимает поезда из Москвы, Санкт-Петербурга и других городов. Из Москвы ходит скоростной поезд "Ласточка" (2-2,5 часа) и обычные поезда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Автобусом: междугородние автобусы из Москвы и других городов прибывают на автовокзал. Автомобилем: из Москвы по трассе М-7, время в пути около 2,5-3 часов.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах, троллейбусах и маршрутках. Центр города компактный, многие достопримечательности находятся в пешей доступности. Также популярны поездки в соседний Суздаль (около 30 км).
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
                Успенский собор — главный храм Владимира, построенный в XII веке, уникальный памятник белокаменного зодчества. В соборе сохранились фрески Андрея Рублёва. Дмитриевский собор — ещё один шедевр белокаменной архитектуры XII века с резными рельефами.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Золотые ворота — уникальный памятник XII века, единственные сохранившиеся ворота древнерусского города. Сейчас здесь находится музей. Площадь Соборная — главная площадь города с памятниками и фонтанами.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Водонапорная башня — памятник архитектуры, сейчас в ней находится музей. Патриарший сад — красивый парк с видом на город. Владимирский исторический музей — интересное место для знакомства с историей города.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: Рождественский монастырь, церкви, монастыри. За пределами города — Суздаль (30 км), Боголюбово с церковью Покрова на Нерли — уникальными памятниками древнерусской архитектуры.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения во Владимире</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Владимирский театр драмы, Театр кукол. В городе проходят многочисленные фестивали и культурные события. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры и сувенирные лавки предлагают широкий выбор. Парки: Патриарший сад, парки для отдыха. Культурные события: фестивали музыки, кино, театра, особенно связанные с историей.
              </p>
              <p className="text-base leading-relaxed">
                Экскурсии по историческим местам — популярное развлечение. Владимир славится своими культурными традициями и богатой историей.
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
                Русская кухня: популярны блюда из мяса, рыбы, пельмени, пироги. Классические рестораны предлагают традиционные блюда. Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры, традиционные пирожки.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: владимирская кухня известна традиционными русскими блюдами. Также популярны местные напитки и сладости.
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
                Владимир — один из старейших городов России, основанный в 990 году. Город был столицей Владимиро-Суздальского княжества в XII-XIII веках и играл важную роль в истории Древней Руси. Исторические памятники Владимира включены в список Всемирного наследия ЮНЕСКО.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Успенский собор — главный храм Владимира, построенный в 1158-1160 годах. В соборе сохранились фрески Андрея Рублёва. Дмитриевский собор — уникальный памятник белокаменной архитектуры с резными рельефами, построенный в 1194-1197 годах.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Золотые ворота — единственные сохранившиеся ворота древнерусского города, построенные в 1164 году. Владимир входит в состав Золотого кольца России — популярного туристического маршрута.
              </p>
              <p className="text-base leading-relaxed">
                Владимир расположен близко к Суздалю (30 км), и часто эти два города посещают вместе. Город славится своей богатой историей и является важным культурным центром России.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Vladimir;
