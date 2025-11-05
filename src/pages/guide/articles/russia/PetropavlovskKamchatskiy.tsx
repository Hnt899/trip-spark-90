import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const PetropavlovskKamchatskiy = () => {
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
          <span>Петропавловск-Камчатский</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Петропавловск-Камчатский</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Петропавловск-Камчатский</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Петропавловск-Камчатский — административный центр Камчатского края, крупный город на Дальнем Востоке России, расположенный на берегу Авачинской бухты Тихого океана. Основанный в 1740 году, город стал важным административным и культурным центром Камчатки. Петропавловск-Камчатский — это ворота в уникальный мир вулканов, гейзеров и дикой природы.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своей близостью к вулканам, гейзерам, уникальной природой и богатой морской фауной. Петропавловск-Камчатский — это место, где можно познакомиться с природой Камчатки, посетить вулканы, гейзеры и насладиться морепродуктами.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть один из самых уникальных городов России, познакомиться с вулканами и гейзерами, посетить уникальные природные достопримечательности и насладиться морепродуктами — Петропавловск-Камчатский станет незабываемым местом для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Петропавловска-Камчатского</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Петропавловск-Камчатский расположен в зоне умеренного морского климата. Лето (июнь-август) прохладное и влажное, со средней температурой 12-14°C, днём может быть до 18-20°C. Лето — лучшее время для посещения города и природных достопримечательностей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) мягкая, со средней температурой около -8°C, морозы редко опускаются ниже -15°C. Зимой выпадает много снега. Весна и осень прохладные и влажные.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с июня по август, когда погода наиболее комфортна для походов и экскурсий. Однако и зимой можно посетить вулканы и заняться зимними видами спорта.
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
                Самолётом: аэропорт Елизово принимает рейсы из Москвы, Владивостока и других городов. От аэропорта до центра можно доехать на автобусе или такси. Поездом: прямого железнодорожного сообщения нет, так как Камчатка не соединена с материком железной дорогой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы самолётом полёт занимает около 8-9 часов. Морским путём: можно добраться на пароме из Владивостока, но это долгий путь. Автомобилем: дорог нет, так как Камчатка не соединена с материком.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах и такси. Для поездок по Камчатке лучше использовать организованные экскурсии или арендовать транспорт с водителем.
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
                Площадь Ленина — главная площадь города. Камчатский краеведческий музей — интересное место для знакомства с историей и природой Камчатки. Набережная Авачинской бухты — популярное место для прогулок с видом на океан.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Памятники и скульптуры, связанные с историей Камчатки. Вулканы, видимые из города — Авачинская сопка, Корякская сопка.
              </p>
              <p className="text-base leading-relaxed">
                За пределами города — уникальные природные достопримечательности Камчатки: Долина Гейзеров (одна из крупнейших в мире), вулканы (более 300 вулканов, из них 29 действующих), природные парки, заповедники, термальные источники, медведи, лосось.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Петропавловске-Камчатском</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Активный отдых: походы к вулканам, гейзерам, рафтинг, рыбалка, наблюдение за медведями, катание на лыжах, сноуборде. Театры и культурные центры: в городе проходят фестивали и культурные события.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ночная жизнь: множество баров, клубов и ресторанов в центре города. Шопинг: торговые центры и сувенирные лавки предлагают изделия и сувениры. Парки: парки для отдыха.
              </p>
              <p className="text-base leading-relaxed">
                Культурные события: фестивали, экотуризм. Петропавловск-Камчатский славится своими природными достопримечательностями и является центром экотуризма в России.
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
                Камчатская кухня славится морепродуктами и рыбой. Популярны блюда из лосося, крабов, креветок, морских ежей, гребешков. Классические рестораны предлагают блюда из морепродуктов. Обязательно попробуйте камчатского краба, лосося, икру.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Также популярны блюда из дичи, ягод, грибов. Камчатская кухня сочетает традиции коренных народов и современные блюда. Современная кухня: множество ресторанов с авторской кухней.
              </p>
              <p className="text-base leading-relaxed">
                Особенности: камчатская кухня известна блюдами из морепродуктов и рыбы. Камчатский краб — одно из самых известных блюд, обязательно попробуйте. Также популярны блюда из дичи и ягод.
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
                Петропавловск-Камчатский — административный центр Камчатского края, город был основан в 1740 году. Петропавловск-Камчатский является важным административным и культурным центром на Дальнем Востоке России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Камчатка известна своими вулканами — здесь находится более 300 вулканов, из них 29 действующих. Долина Гейзеров — одна из крупнейших в мире и самая большая в Евразии. Камчатка — объект Всемирного наследия ЮНЕСКО.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Камчатка не соединена с материком железной дорогой или автомобильными дорогами, добраться можно только самолётом или морским путём. Камчатка славится своей уникальной природой и является центром экотуризма.
              </p>
              <p className="text-base leading-relaxed">
                Камчатка известна медведями, лососем, камчатским крабом. Петропавловск-Камчатский славится своей уникальной природой и является воротами в мир вулканов и гейзеров. Камчатская кухня известна блюдами из морепродуктов.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PetropavlovskKamchatskiy;
