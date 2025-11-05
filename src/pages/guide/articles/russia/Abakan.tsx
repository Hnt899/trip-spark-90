import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Abakan = () => {
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
          <span>Абакан</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Абакан</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Абакан</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Абакан — столица Республики Хакасия, расположенная в Южной Сибири на берегах реки Абакан. Основанный в 1931 году, город стал важным административным и культурным центром региона. Абакан — это ворота в Хакасию, регион с богатой историей, уникальной природой и археологическими памятниками.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своими археологическими памятниками, древними курганами, менгирами (каменными столбами) и петроглифами. Абакан — это место, где можно познакомиться с хакасской культурой, традициями коренных народов, посетить музеи и насладиться сибирской природой.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть столицу Хакасии, познакомиться с уникальной культурой и историей региона, посетить археологические памятники и насладиться природой Южной Сибири — Абакан станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Абакана</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Абакан расположен в зоне резко континентального климата. Лето (июнь-август) тёплое и солнечное, со средней температурой 18-20°C, днём может быть до 25-30°C. Лето — лучшее время для посещения города и природных достопримечательностей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) холодная и сухая, со средней температурой около -18°C, морозы могут опускаться до -35°C. Зимой город покрыт снегом. Весна и осень прохладные и переменчивые, но достаточно комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Абакан красив, особенно в период новогодних праздников.
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
                Самолётом: аэропорт Абакан принимает рейсы из Москвы, Красноярска, Новосибирска и других городов. От аэропорта до центра можно доехать на автобусе или такси. Поездом: Абакан — крупный железнодорожный узел, принимает поезда из Москвы, Красноярска и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы поезд идёт около 3-4 суток. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе (очень длинный путь через всю страну).
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах, троллейбусах и маршрутках. Центр города компактный, многие достопримечательности находятся в пешей доступности. Для поездок по Хакасии лучше арендовать автомобиль или воспользоваться организованными экскурсиями.
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
                Хакасский национальный краеведческий музей имени Кызласова — крупный музейный комплекс, рассказывающий об истории, культуре и природе Хакасии. Здесь хранятся уникальные археологические находки и экспонаты. Площадь Ленина — главная площадь города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Парк топиарного искусства — уникальный парк с фигурами из кустарников и деревьев. Спасо-Преображенский собор — главный храм города. Памятники и скульптуры, отражающие хакасскую культуру.
              </p>
              <p className="text-base leading-relaxed">
                За пределами города — уникальные археологические памятники Хакасии: древние курганы, менгиры (каменные столбы), петроглифы (наскальные рисунки), крепости-све. Также интересны природные достопримечательности: Саяно-Шушенское водохранилище, горы, степи, заповедники.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Абакане</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Хакасский национальный театр драмы имени Топанова, Театр кукол. В городе проходят многочисленные фестивали и культурные события, включая фестивали хакасской культуры и традиций.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Активный отдых: горные походы, рафтинг, конные прогулки, рыбалка. Ночная жизнь: множество баров, клубов и ресторанов в центре города. Шопинг: торговые центры и сувенирные лавки предлагают изделия народных промыслов.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: фестивали музыки, культуры коренных народов. Абакан славится своими культурными традициями и является центром развития хакасской культуры.
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
                Хакасская кухня славится блюдами из мяса (баранина, говядина, конина), молочными продуктами. Популярны блюда: талган (молочная каша), уйгур (молочный суп), мясные блюда. Классические рестораны предлагают традиционные хакасские блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Также популярны блюда из рыбы, дичи, ягод. Хакасская кухня сочетает традиции кочевых народов и русские блюда. Современная кухня: множество ресторанов с авторской кухней. Уличная еда: шаурма, бургеры.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: хакасская кухня известна блюдами из мяса и молочными продуктами. Также популярны блюда из дичи и ягод, которые добывают в Хакасии.
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
                Абакан — столица Республики Хакасия, город был основан в 1931 году. Абакан является важным административным и культурным центром в Южной Сибири. Город расположен в месте слияния рек Абакан и Енисей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Хакасия известна своими уникальными археологическими памятниками: древние курганы, менгиры (каменные столбы), петроглифы (наскальные рисунки). На территории Хакасии находится более 30 тысяч археологических памятников.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Хакасия — родина древних цивилизаций, оставивших после себя множество археологических памятников. Саяно-Шушенское водохранилище, расположенное недалеко от Абакана, является одним из крупнейших водохранилищ в России.
              </p>
              <p className="text-base leading-relaxed">
                Абакан славится своей уникальной культурой и является центром развития хакасской культуры. Город окружён красивой природой: степями, горами, реками. Хакасия — популярное место для археологического туризма и активного отдыха.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Abakan;
