import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Kazan = () => {
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
          <span>Казань</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Казань</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Казань</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Казань — столица Республики Татарстан, город, где переплетаются русская и татарская культуры, где мечети соседствуют с православными храмами. Это один из старейших городов России, основанный более 1000 лет назад. Казань сочетает богатую историю с современной динамикой развития.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен как "третья столица России" и является крупным культурным, научным и спортивным центром. Здесь проходили Универсиада-2013 и чемпионат мира по футболу 2018. Казань — это место, где можно увидеть уникальное сочетание восточной и западной культур, попробовать традиционную татарскую кухню и познакомиться с историей татарского народа.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть Казанский Кремль — объект Всемирного наследия ЮНЕСКО, посетить мечеть Кул-Шариф, познакомиться с татарской культурой и насладиться гостеприимством местных жителей — Казань станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Казани</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Казань расположена в зоне умеренно-континентального климата. Лето (июнь-август) тёплое, со средней температурой 19-21°C, но может быть жарким до 30°C и выше. Лето — идеальное время для прогулок по городу и посещения парков.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) холодная, со средней температурой около -10°C, морозы могут опускаться до -25°C. Зимой город покрыт снегом, что создаёт особую атмосферу. Весна и осень прохладные и переменчивые, но достаточно комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Казань красива, особенно в период новогодних праздников. Летом особенно приятно прогуливаться по набережной Казанки и отдыхать в парках.
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
                Самолётом: международный аэропорт Казань принимает рейсы из многих городов России и мира. От аэропорта до центра можно доехать на автобусе или такси за 30-40 минут. Поездом: Казанский вокзал — один из крупнейших в Поволжье, принимает поезда из Москвы, Санкт-Петербурга и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы ходит скоростной поезд "Ласточка" (11-12 часов) и обычные поезда. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе М-7, время в пути около 12-14 часов.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на метро, автобусах, троллейбусах и трамваях. Центр города компактный, многие достопримечательности находятся в пешей доступности. Также популярны речные прогулки по Волге и Казанке.
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
                Казанский Кремль — главная достопримечательность города, объект Всемирного наследия ЮНЕСКО. На его территории находятся мечеть Кул-Шариф — одна из крупнейших мечетей Европы, Благовещенский собор, падающая башня Сююмбике, музей истории Татарстана.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Старо-Татарская слобода — исторический район с деревянными домами, мечетями и особняками XIX века. Улица Баумана — пешеходная улица в центре города, "казанский Арбат" с магазинами, кафе и сувенирными лавками.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Храм всех религий — уникальное архитектурное сооружение, объединяющее элементы разных религий. Площадь Тысячелетия — главная площадь города с фонтанами и памятниками. Набережная Казанки — популярное место для прогулок с видом на Кремль.
              </p>
              <p className="text-base leading-relaxed">
                Остров-град Свияжск — уникальный исторический город-крепость на острове в 30 км от Казани. Раифский монастырь — один из старейших монастырей Поволжья. Также стоит посетить музеи: Национальный музей Республики Татарстан, Музей исламской культуры, музей Казанского Кремля.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Казани</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Татарский академический театр оперы и балета, Казанский театр юного зрителя, Русский драматический театр. В городе проходят многочисленные фестивали и культурные события, включая фестиваль оперы и балета, джазовый фестиваль.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Спорт: Казань — крупный спортивный центр. Стадион "Казань Арена", "Ак Барс Арена", "Баскет-холл" — современные спортивные объекты. Аквапарк "Ривьера", парк аттракционов "Кырлай" — популярные развлечения для всей семьи.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ночная жизнь: множество баров, клубов и ресторанов в центре города. Летом особенно популярны открытые террасы с видом на Волгу. Шопинг: торговые центры "Мега", "Кольцо", "Проспект Победы" предлагают широкий выбор магазинов и развлечений.
              </p>
              <p className="text-base leading-relaxed">
                Парки: парк Горького, парк Победы, парк "Чёрное озеро" — отличные места для отдыха. Летом можно покататься на велосипедах, зимой — на коньках. Речные прогулки по Волге и Казанке — обязательный пункт программы для туристов.
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
                Татарская кухня — одно из главных достояний Казани. Обязательно попробуйте: эчпочмак — треугольные пирожки с мясом и картофелем, чак-чак — сладкое лакомство из теста с мёдом, беляши — жареные пирожки с мясом, кыстыбый — лепёшки с начинкой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Классические рестораны: "Дом татарской кулинарии", "Туган авылым", "Татарская усадьба" предлагают традиционные блюда. Также популярны супы — шурпа, лапша, а также плов, манты, губадия.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Современная кухня: множество ресторанов с авторской кухней, фьюжн-концепциями. "Башмачок", "Маруся", "Булгары" — популярные заведения. Уличная еда: шаурма, бургеры, традиционные пирожки на каждом шагу.
              </p>
              <p className="text-base leading-relaxed">
                Сладости: татарская кухня славится своими десертами. Помимо чак-чака, попробуйте кош-теле, баурсак, катламу. Напитки: чай — важная часть татарской культуры, его пьют с молоком и сладостями. Также популярно крафтовое пиво местных пивоварен.
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
                Казань — один из старейших городов России, ему более 1000 лет. Город был столицей Казанского ханства до его завоевания Иваном Грозным в 1552 году. Казанский Кремль — единственная сохранившаяся татарская крепость в России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Казань — третий по численности населения город России после Москвы и Санкт-Петербурга. Население города превышает 1,2 миллиона человек. Город является крупным научным и образовательным центром — здесь расположен Казанский федеральный университет, один из старейших в России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Мечеть Кул-Шариф названа в честь последнего имама Казани, который погиб при взятии города войсками Ивана Грозного. Башня Сююмбике наклонена сильнее, чем Пизанская башня — отклонение составляет почти 2 метра.
              </p>
              <p className="text-base leading-relaxed">
                Казань — один из крупнейших спортивных центров России. Здесь проходили Универсиада-2013, чемпионат мира по водным видам спорта 2015, чемпионат мира по футболу 2018. Город имеет развитую инфраструктуру для спорта и туризма.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Kazan;
