import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Volgograd = () => {
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
          <span>Волгоград</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Волгоград</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Волгоград</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Волгоград — город-герой на Волге, известный своей героической историей и ставший символом мужества и стойкости. Основанный в 1589 году как Царицын, город прошёл через тяжелейшие испытания в годы Великой Отечественной войны, когда здесь проходила Сталинградская битва.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Волгоград — это город-памятник, где каждая улица, каждый дом хранит память о великой битве. Мамаев курган с монументом "Родина-мать зовёт!" — один из самых знаменитых памятников России. Город стал символом Победы и мужества советского народа.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть город-герой, поклониться памяти павших, посетить места великой битвы, познакомиться с историей Великой Отечественной войны и увидеть один из самых величественных памятников России — Волгоград станет местом, которое нельзя пропустить.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Волгограда</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Волгоград расположен в зоне континентального климата. Лето (июнь-август) жаркое и сухое, со средней температурой 23-25°C, часто бывает жарко до 35-40°C. Лето — лучшее время для прогулок по городу, хотя может быть очень жарко.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) умеренно холодная, со средней температурой около -6°C, морозы могут опускаться до -20°C. Снег выпадает, но тает быстро. Весна и осень тёплые и продолжительные, очень комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с апреля по октябрь, когда погода наиболее комфортна. Однако и зимой Волгоград красив, особенно в период празднования Дня Победы. Летом особенно приятно прогуливаться по набережной Волги.
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
                Самолётом: международный аэропорт Гумрак принимает рейсы из многих городов России. От аэропорта до центра можно доехать на автобусе или такси. Поездом: Волгоград — крупный железнодорожный узел, принимает поезда из Москвы, Санкт-Петербурга и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы ходит скоростной поезд (около 18 часов) и обычные поезда. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе М-6, время в пути около 14-16 часов.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах, троллейбусах, трамваях, метротраме (скоростной трамвай). Центр города компактный, многие достопримечательности находятся в пешей доступности.
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
                Мамаев курган — главная достопримечательность Волгограда, мемориальный комплекс с монументом "Родина-мать зовёт!" — одним из самых высоких памятников в мире (85 метров). Это место, где проходили ожесточённые бои, священное место для всех россиян.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Музей-панорама "Сталинградская битва" — уникальный музей, посвящённый великой битве, с панорамой и множеством экспонатов. Дом Павлова — легендарный дом, который обороняли 58 дней. Мельница Гергардта — разрушенное здание, оставленное как памятник.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Набережная Волги — красивая набережная с памятниками и фонтанами. Площадь Павших Борцов — главная площадь города с Вечным огнём. Аллея Героев — мемориальная аллея с памятниками героям войны.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: Волгоградский краеведческий музей, Художественный музей, Музей истории Волго-Донского канала. За пределами города — природные достопримечательности Волгоградской области.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Волгограде</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Волгоградский театр драмы, Театр кукол, Театр музыкальной комедии. В городе проходят многочисленные культурные события, особенно связанные с историей войны. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры "Парк Хаус", "Европа Сити Молл" предлагают широкий выбор магазинов. Парки: парк Победы, Центральный парк — отличные места для отдыха. Речные прогулки по Волге — популярное развлечение.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: особенно значимы празднования Дня Победы, когда город становится центром торжеств. Волгоград славится своей историей и культурными традициями.
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
                Волгоградская кухня сочетает русские традиции с местными особенностями. Популярны блюда из рыбы (особенно волжской), мяса, пельмени. Классические рестораны предлагают традиционные русские блюда. Современная кухня: множество ресторанов с авторской кухней.
              </p>
              <p className="text-base leading-relaxed">
                Уличная еда: шаурма, бургеры, традиционные пирожки. Особенности: волгоградская кухня известна блюдами из волжской рыбы и традиционными русскими блюдами.
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
                Волгоград — город-герой, население превышает 1 миллион человек. Город был основан в 1589 году как Царицын, с 1925 по 1961 год носил имя Сталинград. Сталинградская битва (1942-1943) — одна из самых кровопролитных битв в истории человечества.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Монумент "Родина-мать зовёт!" на Мамаевом кургане — один из самых высоких памятников в мире (85 метров) и самый высокий памятник в России. Мамаев курган — место, где проходили ожесточённые бои, высота 102 метра стала символом обороны.
              </p>
              <p className="text-base leading-relaxed">
                Волгоград — город, который был полностью разрушен во время войны и восстановлен после. Город стал символом мужества и стойкости советского народа. Каждый год 2 февраля отмечается День разгрома советскими войсками немецко-фашистских войск в Сталинградской битве.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Volgograd;
