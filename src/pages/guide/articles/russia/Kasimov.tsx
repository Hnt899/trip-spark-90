import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Kasimov = () => {
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
          <span>Касимов</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Касимов</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Касимов</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Касимов — старинный русский город на берегу реки Оки, основанный в 1152 году. Город известен своей уникальной историей — в XV-XVII веках он был столицей Касимовского ханства, татарского государства в составе России. Касимов — это единственный город в Центральной России, где сохранилась татарская культура и архитектура.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своими мечетями, минаретами, татарскими памятниками архитектуры, а также русскими храмами и монастырями. Касимов — это место, где можно познакомиться с уникальным сочетанием русской и татарской культур, посетить исторические памятники и насладиться атмосферой старинного города.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть уникальный город с татарской историей в Центральной России, познакомиться с культурой Касимовского ханства, посетить мечети и минареты — Касимов станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Касимова</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Касимов расположен в зоне умеренно-континентального климата. Лето (июнь-август) тёплое, со средней температурой 18-20°C, может быть жарким до 30°C. Лето — лучшее время для прогулок по городу и посещения достопримечательностей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) умеренно холодная, со средней температурой около -8°C, морозы могут опускаться до -25°C. Зимой город покрыт снегом. Весна и осень прохладные и переменчивые, но достаточно комфортные для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Касимов красив, особенно в период новогодних праздников.
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
                Поездом: ближайшая железнодорожная станция — в Рязани (около 100 км от Касимова), откуда можно доехать на автобусе. Автобусом: междугородние автобусы прибывают на автовокзал из Рязани, Москвы и других городов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Автомобилем: из Москвы по трассе М-5, время в пути около 4-5 часов. Из Рязани — около 1,5-2 часов. Внутри города удобно передвигаться пешком — город небольшой, все достопримечательности находятся в пешей доступности.
              </p>
              <p className="text-base leading-relaxed">
                Касимов находится недалеко от Рязани, что делает его популярным местом для однодневных поездок из Рязани или Москвы.
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
                Ханская мечеть — старинная мечеть XV века с минаретом, один из символов города. Мавзолей Шах-Али хана — усыпальница касимовских ханов, памятник татарской архитектуры. Соборная площадь — главная площадь города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Вознесенский собор — главный православный храм города. Церковь Благовещения, церковь Успения — старинные русские храмы. Касимовский краеведческий музей — интересное место для знакомства с историей города и Касимовского ханства.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: исторические кварталы с татарской и русской архитектурой, набережную Оки, памятники. Касимов — это город, где каждая улица, каждый дом рассказывает историю уникального сочетания русской и татарской культур.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Касимове</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Экскурсии по историческим местам, музеи, прогулки по городу. В городе проходят фестивали и культурные события, связанные с татарской и русской культурой. Ночная жизнь: кафе и рестораны в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: сувенирные лавки предлагают изделия и сувениры. Парки: парки для отдыха. Культурные события: фестивали, праздники, связанные с историей города.
              </p>
              <p className="text-base leading-relaxed">
                Касимов — тихий, спокойный город, идеальный для культурного туризма и знакомства с уникальной историей Касимовского ханства.
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
                Касимовская кухня сочетает русские и татарские традиции. Популярны блюда татарской кухни: чак-чак, эчпочмак, беляши, татарские пироги. Также популярны русские блюда: пельмени, пироги, борщ. Классические рестораны предлагают блюда русской и татарской кухни.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Современная кухня: множество ресторанов и кафе с авторской кухней. Уличная еда: шаурма, бургеры, традиционные пирожки. Особенность: обязательно попробуйте татарские блюда, особенно чак-чак и эчпочмак.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: касимовская кухня известна сочетанием русских и татарских блюд. Также популярны местные продукты и напитки.
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
                Касимов — старинный русский город, основанный в 1152 году. В XV-XVII веках город был столицей Касимовского ханства — татарского государства в составе России. Касимов — единственный город в Центральной России, где сохранилась татарская культура и архитектура.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ханская мечеть с минаретом — один из символов города и памятник татарской архитектуры. Мавзолей Шах-Али хана — усыпальница касимовских ханов, уникальный памятник. Касимов — это город, где гармонично сочетаются русская и татарская культуры.
              </p>
              <p className="text-base leading-relaxed">
                Касимов — популярное место для туристов, интересующихся историей Касимовского ханства и уникальным сочетанием культур. Город славится своими историческими памятниками и является важным культурным центром в Рязанской области.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Kasimov;
