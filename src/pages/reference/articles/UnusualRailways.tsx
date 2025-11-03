import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Mountain, Globe, Info } from "lucide-react";

const UnusualRailways = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Необычные железные дороги</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Необычные железные дороги</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                Инженерной мысли на железной дороге всегда было где развернуться. Особенно интересные решения всегда предлагались при прокладке дорог в горах.
              </p>
            </CardContent>
          </Card>

          {/* Цинхай-Тибетская */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mountain className="w-6 h-6 text-primary" />
                Самая высокогорная железная дорога
              </h2>
              <p className="text-base leading-relaxed">
                Самой высокогорной в мире является <strong>Цинхай-Тибетская железная дорога</strong>. Часть маршрута до Лхасы располагается на высоте более 5000 м. 
                Поэтому и вагоны здесь оборудованы специальными устройствами для подачи кислорода, и для каждого пассажира найдется индивидуальная кислородная маска.
              </p>
            </CardContent>
          </Card>

          {/* Перу */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                Железная дорога в Перу
              </h2>
              <p className="text-base leading-relaxed">
                Необычная железная дорога есть и в Перу. Это маршрут Лима-Уанкайо-Уанвелика. Инженеры, строившие дорогу, придумали специальные возвратные тупики. 
                Они позволяют хитрым образом преодолеть развороты при больших уклонах: поезд упирается в первый тупик, затем сползает хвостом до другого, и уже после этого продолжает движение в нужном направлении.
              </p>
            </CardContent>
          </Card>

          {/* БАМ */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                Байкало-Амурская магистраль
              </h2>
              <p className="text-base leading-relaxed">
                В России необычных инженерных решений потребовала трасса <strong>Байкало-Амурской магистрали</strong>. Здесь, например, находится знаменитый «Чертов мост» — 
                высоченная эстакада на двухъярусных опорах. Он изогнут, и при этом ведет на подъем. Всего мостов на БАМе построено <strong>3901</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Швейцария */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mountain className="w-6 h-6 text-primary" />
                Самая крутая железная дорога Европы
              </h2>
              <p className="text-base leading-relaxed">
                Самая крутая железная дорога Европы находится в Швейцарии. В самом прямом смысле этого слова: уклон ее местами составляет <strong>48%</strong>. 
                Дорога называется Пилатусбан. Можно купить жд билет и подняться на высоту 2133 м, на вершину горы Пилатус.
              </p>
              <p className="text-base leading-relaxed mt-3">
                В Швейцарии же есть одна из самых живописных дорог в мире — <strong>Ретийская железная дорога</strong>. Она считается визитной карточкой Швейцарии и проходит по самым красивым районам Альп, 
                через 383 моста и 84 тоннеля. Два самых красивых участка этой дороги внесены в список Всемирного наследия ЮНЕСКО.
              </p>
            </CardContent>
          </Card>

          {/* Австралия */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                Самая прямая дорога в мире
              </h2>
              <p className="text-base leading-relaxed">
                А еще есть самая прямая в мире дорога, которая занесена в Книгу рекордов Гиннесса. Построена она в пустынной равнинной части Австралии, 
                и на протяжении <strong>500 км</strong> не имеет ни одного поворота.
              </p>
            </CardContent>
          </Card>

          {/* Аргентина */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                «Дорога на край земли»
              </h2>
              <p className="text-base leading-relaxed">
                Существует и «Дорога на край земли». Находится она в Аргентине, в Национальном парке «Огненнная земля». Ширина ее колеи — всего <strong>50 см</strong> 
                (у наши узкоколейки, например, шириной 75 см). Именно там находится станция под названием «Конец света», которую очень любят туристы.
              </p>
            </CardContent>
          </Card>

          {/* Великобритания */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                Необычные гибриды
              </h2>
              <p className="text-base leading-relaxed">
                Есть в истории железных дорог и необычные гибриды, например, гибрид парома и трамвая. В начале 20 века он перевозил пассажиров в Великобритании. 
                Рельеф не позволил проложить дорогу из Брайтона в Роттингдин по суше, и рельсы проложили по дну моря.
              </p>
              <p className="text-base leading-relaxed mt-3">
                На рельсы поставили платформу на 4 ногах, каждая нога «ехала» на тележке с 4 колесами. Все колеса закрыли кожухом с скребком, который очищал рельсы от водорослей. 
                Платформа вмещала 150 пассажиров. Звалось это чудо Daddy Long Legs и приравнивалось к морскому судну, поэтому на палубе было все, что положено: и спасательные круги, 
                и судовой колокол, и флаг, и шлюпка. И в состав экипажа входил моряк.
              </p>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2 text-base">
                <li>
                  <Link to="/reference/trains/how-to-buy" className="text-primary hover:underline">
                    Покупка ж/д билетов
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UnusualRailways;
