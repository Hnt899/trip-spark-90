import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Yakutsk = () => {
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
          <span>Якутск</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Якутск</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Якутск</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Якутск — столица Республики Саха (Якутия), крупнейший город на северо-востоке России, расположенный на берегах реки Лены. Основанный в 1632 году как Якутский острог, город стал важным административным и культурным центром Дальнего Востока. Якутск — это самый холодный крупный город в мире.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своими экстремальными климатическими условиями, уникальной природой, алмазными месторождениями и богатой культурой якутского народа. Якутск — это место, где можно познакомиться с культурой народов Севера, посетить уникальные музеи и увидеть вечную мерзлоту.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть самый холодный крупный город в мире, познакомиться с уникальной культурой якутского народа, посетить музеи вечной мерзлоты и насладиться экстремальной природой — Якутск станет незабываемым местом для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Якутска</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Якутск расположен в зоне резко континентального климата с экстремально холодной зимой. Лето (июнь-август) короткое и тёплое, со средней температурой 18-20°C, может быть жарким до 30°C. Лето — лучшее время для посещения города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) чрезвычайно холодная, со средней температурой около -40°C, морозы могут опускаться до -50°C и ниже. Якутск — самый холодный крупный город в мире. Зимой город покрыт снегом и льдом, работают катки и зимние развлечения.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с июня по август, когда погода наиболее комфортна. Зима в Якутске — это экстремальный опыт, но требует специальной подготовки и тёплой одежды.
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
                Самолётом: аэропорт Якутск принимает рейсы из Москвы, Новосибирска, Владивостока и других городов. От аэропорта до центра можно доехать на автобусе или такси. Поездом: прямого железнодорожного сообщения нет, но можно доехать до станции Нерюнгри, а затем на автобусе или самолёте.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы самолётом полёт занимает около 6-7 часов. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе (очень длинный путь через всю страну).
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах и такси. Зимой движение затруднено из-за сильных морозов. Летом можно передвигаться пешком по центру города.
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
                Музей мамонта — уникальный музей, где хранятся останки мамонтов и других древних животных, найденные в вечной мерзлоте. Музей вечной мерзлоты — подземный музей в вечной мерзлоте, где можно увидеть ледяные скульптуры и почувствовать экстремальный холод.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Национальный художественный музей Республики Саха — собрание произведений якутского искусства. Площадь Ленина — главная площадь города. Спасо-Преображенский собор — старинный храм.
              </p>
              <p className="text-base leading-relaxed">
                За пределами города — уникальные природные достопримечательности Якутии: Ленские столбы (объект Всемирного наследия ЮНЕСКО), алмазные месторождения, природные парки, заповедники, места где находят мамонтов.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Якутске</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Саха академический театр имени П.А. Ойунского, Театр оперы и балета. В городе проходят многочисленные фестивали и культурные события, включая фестивали якутской культуры.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ночная жизнь: множество баров, клубов и ресторанов в центре города. Шопинг: торговые центры предлагают широкий выбор магазинов. Зимние развлечения: катки, зимние фестивали.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: фестивали музыки, кино, театра, якутской культуры. Якутск славится своей активной культурной жизнью и является важным культурным центром на Дальнем Востоке.
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
                Якутская кухня славится блюдами из рыбы, оленины, конины, молочных продуктов. Популярны блюда: строганина (замороженная рыба), ойогос (оленина), керчех (молочный суп), хаан (кровяная колбаса). Классические рестораны предлагают традиционные якутские блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Также популярны блюда из рыбы (особенно сибирской), дичи, ягод. Якутская кухня сочетает традиции кочевых народов Севера. Современная кухня: множество ресторанов с авторской кухней.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: якутская кухня известна блюдами из рыбы, оленины и молочных продуктов. Строганина — одно из самых известных блюд якутской кухни, обязательно попробуйте.
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
                Якутск — самый холодный крупный город в мире, зимние температуры могут опускаться до -50°C и ниже. Город был основан в 1632 году как Якутский острог. Якутск является важным административным и культурным центром на Дальнем Востоке.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Якутия известна своими алмазными месторождениями — здесь добывается около 20% всех алмазов в мире. Якутск — центр алмазодобывающей промышленности России. Ленские столбы — уникальный природный памятник, объект Всемирного наследия ЮНЕСКО.
              </p>
              <p className="text-base leading-relaxed mb-4">
                В вечной мерзлоте Якутии находят останки мамонтов и других древних животных. Музей мамонта в Якутске — один из самых известных музеев в мире, где хранятся уникальные находки.
              </p>
              <p className="text-base leading-relaxed">
                Якутск славится своей уникальной культурой и является центром развития якутской культуры. Город окружён экстремальной природой с вечной мерзлотой. Якутская кухня известна своими блюдами из рыбы и оленины.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Yakutsk;
