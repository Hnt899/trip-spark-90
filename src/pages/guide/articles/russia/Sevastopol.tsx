import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Sevastopol = () => {
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
          <span>Севастополь</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Севастополь</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Севастополь</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Севастополь — город-герой на берегу Чёрного моря, крупный порт и военно-морская база. Основанный в 1783 году, город стал важным историческим и культурным центром Крыма. Севастополь — это город с богатой военной историей, известный обороной в Крымской войне и Великой Отечественной войне.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своими памятниками военной славы, музеями, красивой набережной и близостью к уникальным историческим местам. Севастополь — это место, где можно познакомиться с военной историей России, посетить уникальные музеи и насладиться природой Чёрного моря.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть город-герой, познакомиться с военной историей России, посетить уникальные памятники и музеи, насладиться видами на Чёрное море — Севастополь станет незабываемым местом для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Севастополя</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Севастополь расположен в зоне средиземноморского климата с тёплым летом. Лето (июнь-август) жаркое и солнечное, со средней температурой 24-26°C, может быть жарким до 35°C. Лето — лучшее время для посещения города и пляжного отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) мягкая, со средней температурой около 4°C, морозы редко опускаются ниже -5°C. Зимой обычно мало снега. Весна и осень тёплые и комфортные, идеальны для туризма.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с мая по сентябрь, когда погода наиболее комфортна для пляжного отдыха и прогулок. Однако и зимой Севастополь приятен для посещения благодаря мягкому климату.
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
                Самолётом: ближайший аэропорт — в Симферополе (80 км от Севастополя), откуда можно доехать на автобусе или такси. Поездом: через Крымский мост можно добраться поездом до Симферополя, затем на автобусе.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Автобусом: междугородние автобусы прибывают на автовокзал из Симферополя, Ялты и других городов Крыма. Автомобилем: через Крымский мост из материковой России.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах, троллейбусах и маршрутках. Центр города компактный, многие достопримечательности находятся в пешей доступности.
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
                Площадь Нахимова — главная площадь города с памятником адмиралу Нахимову. Графская пристань — историческая пристань, один из символов города. Панорама "Оборона Севастополя 1854-1855" — уникальный музей, посвящённый Крымской войне.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Херсонес Таврический — древний город, объект Всемирного наследия ЮНЕСКО, расположенный на окраине Севастополя. Музей-заповедник "Херсонес Таврический" — крупный археологический комплекс. Диорама "Штурм Сапун-горы" — музей, посвящённый освобождению Севастополя в 1944 году.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Михайловская батарея — фортификационное сооружение, музей. Памятник затопленным кораблям — один из символов города. Набережная Корнилова — популярное место для прогулок с видом на море.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: многочисленные памятники военной славы, музеи, театры. За пределами города — природные достопримечательности Крыма, другие исторические места.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Севастополе</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Пляжный отдых: набережная и пляжи Чёрного моря. Театры: Севастопольский театр драмы, театр имени Луначарского. В городе проходят многочисленные фестивали и культурные события.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ночная жизнь: множество баров, клубов и ресторанов в центре города. Шопинг: торговые центры предлагают широкий выбор магазинов. Парки: парки для отдыха.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: фестивали музыки, кино, театра. Севастополь славится своей активной культурной жизнью и является важным культурным центром в Крыму.
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
                Также популярны блюда из овощей, фруктов, местные вина. Крымская кухня сочетает традиции различных народов Крыма. Современная кухня: множество ресторанов с авторской кухней.
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
                Севастополь — город-герой, основанный в 1783 году. Город известен своей военной историей: обороной в Крымской войне (1854-1855) и Великой Отечественной войне. Севастополь является важным военно-морским портом России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Херсонес Таврический — древний город, основанный греками в V веке до н.э., объект Всемирного наследия ЮНЕСКО. Панорама "Оборона Севастополя" — один из самых известных панорамных музеев в мире.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Памятник затопленным кораблям — один из символов Севастополя, установленный в память о кораблях, затопленных для защиты города от вражеского флота. Севастополь славится своими памятниками военной славы.
              </p>
              <p className="text-base leading-relaxed">
                Севастополь — важный культурный и исторический центр в Крыму. Город расположен на берегу Чёрного моря и окружён красивой природой. Севастополь славится своими музеями и памятниками.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sevastopol;
