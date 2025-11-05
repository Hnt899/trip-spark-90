import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Kaliningrad = () => {
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
          <span>Калининград</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Калининград</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Калининград</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Калининград — уникальный город России, расположенный на берегу Балтийского моря, отделённый от основной территории страны. Основанный в 1255 году как Кёнигсберг, город имеет богатую историю и является единственным российским регионом на Балтике.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Калининград — это город, где переплетаются немецкая и русская культуры, где средневековая архитектура соседствует с советской. Город известен своими курортами на Балтийском побережье, янтарём, уникальной природой и богатой историей.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть уникальный российский регион на Балтике, познакомиться с историей Кёнигсберга, посетить курорты Балтийского моря, увидеть добычу янтаря и насладиться европейской атмосферой — Калининград станет незабываемым местом для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Калининграда</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Калининград расположен в зоне умеренно-морского климата с влиянием Балтийского моря. Лето (июнь-август) умеренно тёплое, со средней температурой 18-20°C, часто бывают дожди и переменчивая погода. Лето — лучшее время для посещения пляжей Балтийского моря.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) мягкая и влажная, со средней температурой около -1°C, морозы редки. Снег выпадает редко и быстро тает. Благодаря близости к морю климат мягче, чем в континентальных районах России. Весна и осень прохладные и дождливые.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Калининград красив, особенно в период рождественских праздников. Летом особенно приятно отдыхать на курортах Балтийского побережья.
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
                Самолётом: международный аэропорт Храброво принимает рейсы из многих городов России и Европы. От аэропорта до центра можно доехать на автобусе или такси за 30-40 минут. Поездом: из Москвы и Санкт-Петербурга можно доехать поездом через Литву и Беларусь (требуется транзитная виза).
              </p>
              <p className="text-base leading-relaxed mb-4">
                Автобусом: междугородние автобусы из некоторых городов России. Автомобилем: через Литву и Беларусь (требуется транзитная виза). Морским путём: из Санкт-Петербурга можно добраться паромом.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах, троллейбусах и маршрутках. Также популярны поездки к курортам Балтийского побережья (Светлогорск, Зеленоградск). Центр города компактный, многие достопримечательности находятся в пешей доступности.
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
                Кафедральный собор — главная достопримечательность Калининграда, средневековый собор, где находится могила философа Иммануила Канта. Рыбная деревня — отреставрированный исторический квартал в центре города. Бранденбургские ворота — одни из сохранившихся городских ворот Кёнигсберга.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Музей Мирового океана — уникальный музей с экспозицией океанариума, подводными лодками и кораблями. Музей янтаря — музей, посвящённый янтарю, которым славится регион. Калининградский зоопарк — один из старейших зоопарков России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Курорты Балтийского побережья: Светлогорск, Зеленоградск — популярные курорты с пляжами и санаториями. Куршская коса — уникальная природная достопримечательность, объект Всемирного наследия ЮНЕСКО.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: форты Кёнигсберга, бастионы, исторические здания. Калининградская область богата природными достопримечательностями и историческими памятниками.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Калининграде</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Калининградский театр драмы, Театр кукол. В городе проходят многочисленные фестивали и культурные события. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Курорты Балтийского побережья — обязательный пункт программы для туристов. Шопинг: торговые центры "Европа", "Калининград Плаза" предлагают широкий выбор магазинов. Парки: Центральный парк, парк Калинина — отличные места для отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Морские прогулки по Балтийскому морю, пляжный отдых. Также популярны экскурсии по историческим местам, включая форты Кёнигсберга, Куршскую косу.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: фестивали музыки, кино, театра. Калининград славится своими культурными традициями, сочетающими немецкое и русское наследие.
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
                Калининградская кухня сочетает русские и немецкие традиции. Популярны блюда из рыбы (особенно из балтийской рыбы), мяса, клопсы (местные пельмени). Классические рестораны: "Клопс", "Балтика", "Дом Актёра" предлагают традиционные блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Балтийская рыба — сельдь, треска, камбала — популярные блюда. Немецкие традиции: колбасы, копчёности, пиво. Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры, традиционные пирожки.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: калининградская кухня известна блюдами из балтийской рыбы и немецкими традициями. Также популярны местные пиво и копчёности.
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
                Калининград — уникальный российский регион, отделённый от основной территории страны. Население города превышает 490 тысяч человек. Город был основан в 1255 году как Кёнигсберг и был частью Пруссии, затем Германии.
              </p>
              <p className="text-base leading-relaxed mb-4">
                После Второй мировой войны Кёнигсберг вошёл в состав СССР и был переименован в Калининград в 1946 году. Калининградская область — единственный российский регион на Балтийском море, не имеющий сухопутной границы с основной территорией России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Калининградская область — единственное место в России, где добывается янтарь. Здесь находится около 90% мировых запасов янтаря. Куршская коса — уникальная природная достопримечательность, объект Всемирного наследия ЮНЕСКО.
              </p>
              <p className="text-base leading-relaxed">
                В Калининградском соборе находится могила философа Иммануила Канта, одного из величайших философов в истории. Калининград — крупный порт на Балтийском море и важный транспортный узел.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Kaliningrad;
