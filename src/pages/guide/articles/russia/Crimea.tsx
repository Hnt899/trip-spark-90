import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Crimea = () => {
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
          <span>Крым</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Крым</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Крым</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Крым — уникальный полуостров на юге России, омываемый Чёрным и Азовским морями. Крым — это место, где история встречается с природой, где можно найти древние города, величественные дворцы, живописные горы и прекрасные пляжи. Крым — это один из самых популярных курортных регионов России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Полуостров известен своими курортами на Чёрном море, уникальными историческими достопримечательностями, дворцами, горами, пещерами и богатой культурой. Крым — это место, где можно отдохнуть на пляже, посетить древние города, насладиться природой и попробовать крымские вина.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть один из самых красивых регионов России, отдохнуть на пляжах Чёрного моря, посетить уникальные дворцы и исторические места, насладиться природой и крымскими винами — Крым станет идеальным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Крыма</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Крым расположен в зоне средиземноморского и умеренно-континентального климата. Лето (июнь-август) жаркое и солнечное, со средней температурой 24-26°C на побережье, может быть жарким до 35°C. Лето — лучшее время для пляжного отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) мягкая на побережье, со средней температурой около 4°C, в горах может быть холоднее. Зимой обычно мало снега на побережье, но в горах работают горнолыжные курорты. Весна и осень тёплые и комфортные, идеальны для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь для пляжного отдыха, и зимой для горнолыжного спорта в горах. Крым приятен для посещения круглый год благодаря мягкому климату.
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
                Самолётом: аэропорт Симферополь принимает рейсы из многих городов России. От аэропорта можно доехать до всех курортов Крыма. Поездом: через Крымский мост можно добраться поездом до Симферополя и других городов Крыма из материковой России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Автобусом: междугородние автобусы прибывают на автовокзалы городов Крыма из материковой России. Автомобилем: через Крымский мост из материковой России.
              </p>
              <p className="text-base leading-relaxed">
                Внутри Крыма удобно передвигаться на автобусах, троллейбусах и маршрутках между городами. Также можно арендовать автомобиль для поездок по полуострову.
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
                Ливадийский дворец — бывшая резиденция российских императоров в Ялте. Воронцовский дворец — величественный дворец в Алупке. Херсонес Таврический — древний греческий город в Севастополе, объект Всемирного наследия ЮНЕСКО.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Бахчисарай — древняя столица Крымского ханства с Ханским дворцом. Генуэзская крепость в Судаке — средневековая крепость. Пещерные города: Чуфут-Кале, Мангуп-Кале, Эски-Кермен. Ласточкино гнездо — замок на скале в Гаспре.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Никитский ботанический сад — один из старейших ботанических садов в мире. Мраморная пещера, Красная пещера — уникальные пещеры. Крымские горы — живописные горы с водопадами и заповедниками.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: многочисленные курорты на побережье, музеи, театры, природные парки, винодельни. Крым — это регион с невероятным разнообразием достопримечательностей.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Крыму</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Пляжный отдых: многочисленные пляжи на Чёрном море, от песчаных до галечных. Активный отдых: горные походы, рафтинг, дайвинг, яхтинг, конные прогулки, горнолыжный спорт зимой в горах.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Театры, музеи, фестивали: в Крыму проходят многочисленные культурные события, фестивали музыки, кино, театра. Ночная жизнь: множество баров, клубов и ресторанов на курортах.
              </p>
              <p className="text-base leading-relaxed">
                Шопинг: торговые центры, сувенирные лавки, рынки. Виноделие: экскурсии на винодельни, дегустации крымских вин. Крым предлагает бесконечные возможности для развлечений и отдыха.
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
                Крымская кухня славится блюдами из морепродуктов, рыбы, овощей, фруктов. Популярны блюда: рыба, морепродукты, шашлык, плов, баклажаны, крымские вина. Татарская кухня: чак-чак, плов, лагман, баклажаны.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Классические рестораны предлагают блюда крымской, русской, татарской кухни. Крымская кухня сочетает традиции различных народов Крыма. Современная кухня: множество ресторанов с авторской кухней на курортах.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: крымская кухня известна блюдами из морепродуктов и рыбы, а также крымскими винами. Обязательно попробуйте крымские вина, морепродукты и татарские блюда. Крым — один из самых известных винодельческих регионов России.
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
                Крым — уникальный полуостров, омываемый Чёрным и Азовским морями. Крым является одним из самых популярных курортных регионов России. Крымский мост — самый длинный мост в России, соединяющий полуостров с материком.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Херсонес Таврический — древний греческий город, объект Всемирного наследия ЮНЕСКО. Крым известен своими дворцами: Ливадийский, Воронцовский, Массандровский. Крым — один из самых известных винодельческих регионов России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Крымские горы — живописные горы с уникальной природой, пещерами, водопадами. Крым славится своими пещерными городами и крепостями. Крым — это место, где сохранилась уникальная культура различных народов.
              </p>
              <p className="text-base leading-relaxed">
                Крым — важный культурный и исторический регион России. Полуостров известен своими курортами, достопримечательностями и уникальной природой. Крым — это место, где можно найти всё: от пляжного отдыха до горных походов, от древних городов до современных курортов.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Crimea;
