import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const NizhniyNovgorod = () => {
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
          <span>Нижний Новгород</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Нижний Новгород</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Нижний Новгород</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Нижний Новгород — один из старейших городов России, основанный в 1221 году. Город расположен на слиянии Волги и Оки, что создаёт уникальные пейзажи. Нижний Новгород — это крупный промышленный, научный и культурный центр Поволжья.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своим кремлём, который никогда не был взят врагами, уникальной архитектурой, богатой историей и культурными традициями. Нижний Новгород — родина многих выдающихся людей, включая писателя Максима Горького, в честь которого город носил имя Горький с 1932 по 1990 год.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть один из самых красивых городов Поволжья, посетить уникальный кремль, познакомиться с историей России и насладиться прекрасными видами на Волгу — Нижний Новгород станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Нижнего Новгорода</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Нижний Новгород расположен в зоне умеренно-континентального климата. Лето (июнь-август) тёплое, со средней температурой 18-20°C, но может быть жарким до 30°C. Лето — лучшее время для прогулок по городу и речных прогулок по Волге.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) холодная и снежная, со средней температурой около -10°C, морозы могут опускаться до -25°C. Зимой город покрыт снегом, работают катки. Весна и осень прохладные и переменчивые, но достаточно комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Нижний Новгород красив, особенно в период новогодних праздников. Летом особенно приятно прогуливаться по набережной Волги и Оки.
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
                Самолётом: международный аэропорт Стригино принимает рейсы из многих городов России. От аэропорта до центра можно доехать на автобусе или такси за 30-40 минут. Поездом: Нижний Новгород — крупный железнодорожный узел, принимает поезда из Москвы, Санкт-Петербурга и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы ходит скоростной поезд "Ласточка" (3,5-4 часа) и обычные поезда. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе М-7, время в пути около 5-6 часов.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на метро, автобусах, троллейбусах и трамваях. Также популярны речные прогулки по Волге и Оке. Центр города компактный, многие достопримечательности находятся в пешей доступности.
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
                Нижегородский кремль — главная достопримечательность города, уникальная крепость, которая никогда не была взята врагами. На территории кремля находятся музеи, храмы, памятники и административные здания. Со стен кремля открывается прекрасный вид на слияние Волги и Оки.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Чкаловская лестница — знаменитая лестница, спускающаяся от кремля к Волге, одна из самых длинных лестниц в России. Площадь Минина и Пожарского — главная площадь города с памятником Минину и Пожарскому.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Улица Большая Покровская — пешеходная улица в центре города, "нижегородский Арбат" с магазинами, кафе и историческими зданиями. Набережная Федоровского — популярное место для прогулок с видом на Волгу и заволжские дали.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: Музей-квартиру Горького, Художественный музей, Музей истории Нижегородской области, Рождественскую улицу с исторической застройкой. За пределами города — Дивеево, Макарьевский монастырь, Городец.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Нижнем Новгороде</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Нижегородский театр драмы, Театр оперы и балета, Театр кукол. В городе проходят многочисленные фестивали и культурные события. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Речные прогулки по Волге и Оке — обязательный пункт программы для туристов. Шопинг: торговые центры "Мега", "Фантастика", "Этажи" предлагают широкий выбор магазинов и развлечений.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Парки: парк "Швейцария", парк Победы — отличные места для отдыха. Летом можно покататься на велосипедах, зимой — на коньках. Спорт: стадион "Нижний Новгород", построенный к чемпионату мира по футболу 2018.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: фестивали музыки, кино, театра. Нижний Новгород славится своими культурными традициями и активной культурной жизнью.
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
                Нижегородская кухня сочетает русские традиции с местными особенностями. Популярны блюда из рыбы (особенно волжской), пельмени, пироги. Классические рестораны: "Пельмени-Классик", "Волга", "Дом Актёра" предлагают традиционные блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры, традиционные пирожки. Сладости: нижегородские конфеты, торты из местных кондитерских.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: нижегородская кухня известна блюдами из волжской рыбы, особенно стерляди. Также популярны пироги с различными начинками и местные напитки.
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
                Нижний Новгород — пятый по численности населения город России. Население города превышает 1,2 миллиона человек. Город был основан в 1221 году князем Юрием Всеволодовичем.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Нижегородский кремль — единственная крепость в России, которая никогда не была взята врагами. Чкаловская лестница — одна из самых длинных лестниц в России, имеет 560 ступеней.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Нижний Новгород носил имя Горький с 1932 по 1990 год в честь писателя Максима Горького, родившегося здесь. Город является крупным промышленным центром, здесь расположены многие предприятия машиностроения и оборонной промышленности.
              </p>
              <p className="text-base leading-relaxed">
                Нижний Новгород — родина многих выдающихся людей, включая писателя Максима Горького, лётчика Валерия Чкалова, математика Николая Лобачевского. Город славится своими культурными традициями и богатой историей.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NizhniyNovgorod;
