import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Simferopol = () => {
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
          <span>Симферополь</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Симферополь</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Симферополь</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Симферополь — административный центр Республики Крым, крупный город на полуострове Крым. Основанный в 1784 году, город стал важным административным и транспортным центром Крыма. Симферополь — это ворота в Крым, через которые проходит большинство туристов, направляющихся на курорты полуострова.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своей историей, близостью к крымским курортам, развитой инфраструктурой и красивой архитектурой. Симферополь — это место, где можно познакомиться с историей Крыма, посетить музеи и отправиться на знаменитые курорты полуострова.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть столицу Крыма, познакомиться с историей полуострова, посетить музеи и насладиться близостью к крымским курортам — Симферополь станет отличным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Симферополя</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Симферополь расположен в зоне умеренно-континентального климата с тёплым летом. Лето (июнь-август) жаркое и солнечное, со средней температурой 22-24°C, может быть жарким до 35°C. Лето — лучшее время для посещения города и поездок на курорты.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) мягкая, со средней температурой около 2°C, морозы редко опускаются ниже -5°C. Зимой обычно мало снега. Весна и осень тёплые и комфортные, идеальны для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна. Однако и зимой Симферополь приятен для посещения благодаря мягкому климату.
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
                Самолётом: аэропорт Симферополь принимает рейсы из многих городов России. От аэропорта до центра можно доехать на автобусе или такси. Поездом: через Крымский мост можно добраться поездом до Симферополя из материковой России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Автобусом: междугородние автобусы прибывают на автовокзал из всех городов Крыма и материковой России. Автомобилем: через Крымский мост из материковой России.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах, троллейбусах и маршрутках. Центр города компактный, многие достопримечательности находятся в пешей доступности. Из Симферополя удобно добираться до всех курортов Крыма.
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
                Площадь Ленина — главная площадь города. Крымский этнографический музей — интересное место для знакомства с историей и культурой народов Крыма. Центральный музей Тавриды — крупный музейный комплекс, рассказывающий об истории Крыма.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Неаполь Скифский — древний город, археологический памятник на окраине Симферополя. Парки и скверы для отдыха. Также стоит посетить: театры, музеи, архитектурные памятники.
              </p>
              <p className="text-base leading-relaxed">
                Симферополь — ворота в Крым, отсюда удобно добираться до всех достопримечательностей полуострова: Ялты, Севастополя, Бахчисарая, других курортов и исторических мест.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Симферополе</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Крымский академический русский драматический театр имени Горького, Театр кукол. В городе проходят многочисленные фестивали и культурные события. Ночная жизнь: множество баров, клубов и ресторанов в центре города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры предлагают широкий выбор магазинов. Парки: парки для отдыха. Культурные события: фестивали музыки, кино, театра.
              </p>
              <p className="text-base leading-relaxed">
                Симферополь славится своей активной культурной жизнью и является важным культурным центром в Крыму. Из города удобно добираться до всех курортов и развлечений полуострова.
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
                Крымская кухня славится блюдами из морепродуктов, рыбы, овощей, фруктов. Популярны блюда: рыба, морепродукты, шашлык, плов, баклажаны, крымские вина. Классические рестораны предлагают блюда крымской и русской кухни.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Также популярны блюда татарской кухни: чак-чак, плов, лагман. Крымская кухня сочетает традиции различных народов Крыма. Современная кухня: множество ресторанов с авторской кухней.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: крымская кухня известна блюдами из морепродуктов и рыбы, а также крымскими винами. Обязательно попробуйте крымские вина и морепродукты.
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
                Симферополь — административный центр Республики Крым, город был основан в 1784 году. Симферополь является важным административным и транспортным центром полуострова. Город — ворота в Крым, через которые проходит большинство туристов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Неаполь Скифский — древний город, столица скифского государства, археологический памятник на окраине Симферополя. Симферополь расположен в центре Крыма, что делает его удобным транспортным узлом для поездок по всему полуострову.
              </p>
              <p className="text-base leading-relaxed">
                Симферополь — важный культурный и исторический центр в Крыму. Город окружён красивой природой и находится недалеко от крымских курортов. Симферополь славится своими музеями и является воротами в мир крымских курортов и достопримечательностей.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Simferopol;
