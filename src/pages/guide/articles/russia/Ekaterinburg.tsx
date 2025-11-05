import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Ekaterinburg = () => {
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
          <span>Екатеринбург</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Екатеринбург</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Екатеринбург</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Екатеринбург — столица Урала, крупнейший город региона, расположенный на границе Европы и Азии. Основанный в 1723 году, город стал важным промышленным и культурным центром. Екатеринбург — это современный мегаполис с богатой историей, уникальной архитектурой и динамичной культурной жизнью.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен как место трагической гибели последнего российского императора Николая II и его семьи. Здесь находится Храм-на-Крови, построенный на месте их расстрела. Екатеринбург — это город, где можно увидеть контраст между историческим наследием и современной урбанистикой.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите познакомиться с уральской культурой, увидеть границу Европы и Азии, посетить уникальные музеи и насладиться активной ночной жизнью — Екатеринбург станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Екатеринбурга</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Екатеринбург расположен в зоне умеренно-континентального климата. Лето (июнь-август) тёплое, со средней температурой 18-20°C, но может быть жарким до 30°C. Лето — лучшее время для прогулок по городу и посещения парков.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) холодная и снежная, со средней температурой около -12°C, морозы могут опускаться до -30°C и ниже. Зимой город покрыт снегом, работает множество катков и зимних развлечений. Весна и осень прохладные и переменчивые.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Екатеринбург красив, особенно в период новогодних праздников. Летом особенно приятно прогуливаться по набережной Исети и отдыхать в парках.
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
                Самолётом: международный аэропорт Кольцово принимает рейсы из многих городов России и мира. От аэропорта до центра можно доехать на автобусе или такси за 30-40 минут. Поездом: Екатеринбург — крупный железнодорожный узел, принимает поезда из Москвы, Санкт-Петербурга и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы ходит скоростной поезд "Ласточка" (26-27 часов) и обычные поезда. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе М-7, время в пути около 18-20 часов.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на метро, автобусах, троллейбусах и трамваях. Центр города компактный, многие достопримечательности находятся в пешей доступности. Также популярны велосипедные прогулки по городу.
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
                Храм-на-Крови — главная достопримечательность города, построенный на месте расстрела семьи Романовых. Это один из крупнейших православных храмов России. Музей истории Екатеринбурга, Музей изобразительных искусств — крупные культурные центры.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Площадь 1905 года — главная площадь города с памятником Ленину. Улица Вайнера — пешеходная улица, "уральский Арбат" с магазинами и кафе. Набережная Исети — популярное место для прогулок с видом на реку и город.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Обелиск "Европа-Азия" — граница между двумя частями света, популярное место для фотосессий. Парк "Зелёная роща", парк Маяковского — отличные места для отдыха. Усадьба Расторгуевых-Харитоновых — памятник архитектуры классицизма.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: Музей военной техники "Боевая слава Урала", Музей истории камнерезного и ювелирного искусства, Свердловский государственный академический театр драмы. За пределами города — природные достопримечательности Урала.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Екатеринбурге</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Свердловский театр драмы, Театр оперы и балета, Театр музыкальной комедии. В городе проходят многочисленные фестивали и культурные события, включая фестиваль "Белая башня", джазовые концерты.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ночная жизнь: множество баров, клубов и ресторанов в центре города. Екатеринбург славится своей активной ночной жизнью. Летом особенно популярны открытые террасы с видом на город.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры "Мега", "Гринвич", "Радуга Парк" предлагают широкий выбор магазинов и развлечений. Парки: парк Маяковского, парк "Зелёная роща" — отличные места для отдыха. Летом можно покататься на велосипедах, зимой — на коньках.
              </p>
              <p className="text-base leading-relaxed">
                Спорт: Екатеринбург Арена — крупный спортивный объект. Аквапарк "Лимпопо", парк аттракционов — популярные развлечения для всей семьи. Также популярны экскурсии по природным достопримечательностям Урала.
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
                Уральская кухня сочетает русские традиции с местными особенностями. Популярны блюда из мяса, пельмени, пироги. Классические рестораны: "Дом Актёра", "Паштет", "Пельмени-Классик" предлагают традиционные блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Современная кухня: множество ресторанов с авторской кухней, фьюжн-концепциями. "Бар BQ", "Пармезан", "Итальянская кухня" — популярные заведения. Уличная еда: шаурма, бургеры, традиционные пирожки на каждом шагу.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Сладости: уральские конфеты, торты из местных кондитерских. "Кондитерская Кристина", "Птичье молоко" — известные кондитерские. Напитки: крафтовое пиво местных пивоварен, традиционный чай.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: уральская кухня известна своими пельменями, которые здесь готовят с различными начинками. Также популярны блюда из дичи, грибов и ягод, которые растут в уральских лесах.
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
                Екатеринбург — четвёртый по численности населения город России после Москвы, Санкт-Петербурга и Новосибирска. Население города превышает 1,4 миллиона человек. Город был основан в 1723 году как завод-крепость.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Екатеринбург расположен на границе Европы и Азии, через город проходит символическая граница между двумя частями света. Обелиск "Европа-Азия" — популярное место для туристов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                В 1918 году в Екатеринбурге были расстреляны последний российский император Николай II и его семья. Храм-на-Крови построен на месте их гибели. Город носил имя Свердловск с 1924 по 1991 год.
              </p>
              <p className="text-base leading-relaxed">
                Екатеринбург — крупный промышленный и научный центр. Здесь расположены Уральский федеральный университет, множество научно-исследовательских институтов. Город также является крупным транспортным узлом, через который проходит Транссибирская магистраль.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ekaterinburg;
