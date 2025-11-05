import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Arkhangelsk = () => {
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
          <span>Архангельск</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Архангельск</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Архангельск</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Архангельск — старинный русский город на берегу Белого моря, основанный в 1584 году по указу Ивана Грозного. Город является крупнейшим портом на севере России и административным центром Архангельской области. Архангельск — это город с богатой историей, связанной с мореплаванием, торговлей и освоением Русского Севера.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Архангельск известен как "ворота в Арктику" и родина русской морской торговли. Город славится своими деревянными домами, уникальной архитектурой, музеями и культурными традициями. Здесь можно познакомиться с поморской культурой, увидеть уникальные памятники деревянного зодчества и насладиться суровой красотой Русского Севера.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть один из старейших городов Русского Севера, познакомиться с поморской культурой, посетить уникальные музеи и архитектурные памятники, насладиться видами на Белое море и реку Северную Двину — Архангельск станет незабываемым местом для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Архангельска</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Архангельск расположен в зоне умеренного морского климата с влиянием Арктики. Лето (июнь-август) прохладное и короткое, со средней температурой 13-15°C, днём может быть до 20-25°C. Лето — лучшее время для посещения города, когда светит белое солнце и можно насладиться северной природой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) длинная и холодная, со средней температурой около -12°C, морозы могут опускаться до -30°C и ниже. Зимой город покрыт снегом, работают катки и зимние развлечения. Весна и осень прохладные и переменчивые, часто дождливые.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с июня по август, когда погода наиболее комфортна и можно насладиться белыми ночами. Однако и зимой Архангельск красив, особенно в период новогодних праздников, когда город покрыт снегом и создаёт атмосферу северной сказки.
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
                Самолётом: аэропорт Талаги принимает рейсы из Москвы, Санкт-Петербурга и других городов России. От аэропорта до центра можно доехать на автобусе или такси. Поездом: Архангельск — конечная станция железной дороги, принимает поезда из Москвы (около 20 часов), Санкт-Петербурга и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе М-8, время в пути около 18-20 часов. Также можно добраться водным путём — через Белое море.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах, троллейбусах и маршрутках. Центр города компактный, многие достопримечательности находятся в пешей доступности. Также популярны речные прогулки по Северной Двине.
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
                Гостиный двор — старейшее каменное здание города, построенное в XVII веке, памятник архитектуры. Набережная Северной Двины — популярное место для прогулок с видом на реку и порт. Памятник Петру I — один из символов города, установленный в честь основателя русского флота.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Архангельский краеведческий музей — крупный музейный комплекс, рассказывающий об истории и культуре Поморья. Музей деревянного зодчества "Малые Корелы" — уникальный музей под открытым небом в 25 км от города, где собраны деревянные постройки Русского Севера: церкви, избы, мельницы, амбары.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Соборная площадь — главная площадь города. Церковь Успения Пресвятой Богородицы — старинный храм. Памятник тюленю — необычный памятник, посвящённый животному, которое спасало жителей от голода. Также стоит посетить: театры, музеи, архитектурные памятники.
              </p>
              <p className="text-base leading-relaxed">
                За пределами города — Соловецкие острова (Соловки), уникальный архипелаг с монастырём и богатой историей, Соловецкий монастырь — объект Всемирного наследия ЮНЕСКО. Также интересны природные достопримечательности Архангельской области.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Архангельске</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Архангельский театр драмы имени Ломоносова, Театр кукол. В городе проходят многочисленные фестивали и культурные события, включая фестиваль "Беломорские зори". Речные прогулки по Северной Двине — популярное развлечение летом.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ночная жизнь: множество баров, клубов и ресторанов в центре города. Шопинг: торговые центры "Титан-Арена", "Полярный" предлагают широкий выбор магазинов. Парки: парки для отдыха, включая парк культуры и отдыха.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: фестивали музыки, кино, театра. Архангельск славится своими культурными традициями и является важным культурным центром на Русском Севере. Летом особенно популярны белые ночи и фестивали под открытым небом.
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
                Поморская кухня славится блюдами из рыбы и морепродуктов. Популярны блюда из трески, сельди, сёмги, а также крабы и креветки. Классические рестораны: "Поморская трапеза", "Северный" предлагают традиционные поморские блюда. Обязательно попробуйте поморскую уху, рыбу в различных видах, северные пироги.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Традиционные блюда: поморские шаньги, калитки, рыбники, морошка. Морошка — северная ягода, популярная в местной кухне. Также популярны блюда из дичи и местных продуктов. Современная кухня: множество ресторанов с авторской кухней.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: поморская кухня известна блюдами из рыбы и морепродуктов, а также использованием местных продуктов — ягод, грибов, дичи. Также популярны традиционные русские блюда, адаптированные к северным условиям.
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
                Архангельск — один из старейших городов Русского Севера, основанный в 1584 году по указу Ивана Грозного. Город был первым морским портом России и сыграл важную роль в развитии русской торговли и мореплавания. Архангельск называли "воротами в Арктику".
              </p>
              <p className="text-base leading-relaxed mb-4">
                Архангельск — родина русского флота. Именно здесь при Петре I строились первые русские корабли. Город известен своими деревянными домами и уникальной архитектурой. Музей деревянного зодчества "Малые Корелы" — один из крупнейших музеев под открытым небом в России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Соловецкие острова, расположенные недалеко от Архангельска, являются объектом Всемирного наследия ЮНЕСКО. Соловецкий монастырь — один из самых известных монастырей России с богатой историей. Архангельск славится поморской культурой и традициями.
              </p>
              <p className="text-base leading-relaxed">
                Архангельск — крупнейший порт на севере России. Город является важным центром лесной промышленности и судостроения. Архангельск славится своими белыми ночами летом, когда солнце практически не заходит за горизонт.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Arkhangelsk;
