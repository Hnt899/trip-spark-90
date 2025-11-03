import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Info, Train, Thermometer, Route, Clock, Music, AlertTriangle, Globe } from "lucide-react";

const RailwayFacts = () => {
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
          <span>Интересные факты о железной дороге</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Интересные факты о железной дороге</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                Такая привычная для нас вещь — железная дорога! Один из самых надежных и доступных и любимых многими видов транспорта. 
                Купил билет на поезд, пришел на вокзал. Сейчас уже никто не вспоминает, что при открытии железной дороги между Санкт-Петербургом и Москвой 
                проезд в первые трое суток сделали бесплатным именно потому, что все боялись этой «страшной штуки».
              </p>
              <p className="text-base leading-relaxed mt-3">
                В среднем, каждый из нас <strong>9 раз в год</strong> становится пассажиром железной дороги. Среднее число пассажиров ОАО «РЖД» в год — 
                <strong> 1 миллиард 300 миллионов</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Транссиб */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Route className="w-6 h-6 text-primary" />
                Транссибирская магистраль
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Самой примечательной железной дорогой считается <strong>Транссибирская магистраль</strong>. Она самая длинная в мире. 
                  От Москвы до Находки — <strong>9438 км</strong> и 97 крупных станций. Ходит по этому маршруту фирменный поезд «Россия», 
                  который находится в пути 8 дней 4 часа и 25 минут.
                </p>
                <p>
                  Самая середина Транссиба так и называется: станция <strong>Половина</strong>. От нее одинаковое расстояние и до Москвы и до Владивостока.
                </p>
                <p>
                  Самый холодный участок Транссиба находится между станциями Могоча и Сковородино. Температура здесь достигает <strong>-62 градусов</strong>. 
                  Хотя географически это не самая северная точка магистрали.
                </p>
                <p>
                  А самая высокая точка, где проложены рельсы Транссиба, лежит на высоте <strong>1040 м</strong>, между станциями Тургутуй и Яблоновая. 
                  Это 6110 км, Яблоновый перевал.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Рекорды */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                Рекорды длины поездов
              </h2>
              <p className="text-base leading-relaxed">
                Самый длинный грузовой поезд был длиной <strong>6,5 км</strong>, состоял из 440 вагонов и регулярно перевозил 42 000 тонн угля из Экибастуза на Урал еще во времена СССР. 
                На другом краю света, в ЮАР, в 1989 году зафиксировали другой рекорд: поезд длиной <strong>7,3 км</strong>, состоящий из 660 вагонов. 
                Правда, больше эксперимент не повторяли. Колея не выдержала.
              </p>
            </CardContent>
          </Card>

          {/* История */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                Первые железные дороги России
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Первая железная дорога в России была грузовой, длиной <strong>2 км</strong>. Построили ее на Урале, на Колывановском заводе и работала она на конной тяге. 
                  Первой пассажирской дорогой была известная всем <strong>Царскосельская</strong>.
                </p>
                <p>
                  Скорость первых пассажирских поездов в XIX веке была <strong>33 км/час</strong>. А железнодорожники в то время были своего рода элитой: к ним относились, 
                  как, например, в начале 20 века к авиаторам, или в 60-х годах — к космонавтам. Современные поезда могут развивать до <strong>580 км/ч</strong>.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Обходчики */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Music className="w-6 h-6 text-primary" />
                Путевые обходчики
              </h2>
              <p className="text-base leading-relaxed">
                Требования при приеме на работу путевых обходчиков за это время не поменялись: они должны обладать хорошим музыкальным слухом, 
                т. к. определяют неисправность колеса по изменению тона, когда его простукивают.
              </p>
            </CardContent>
          </Card>

          {/* Безопасность */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-primary" />
                Безопасность
              </h2>
              <p className="text-base leading-relaxed">
                По статистике, железная дорога в <strong>45 раз безопаснее</strong> автомобиля. Тем, кто все равно беспокоится, специалисты советуют выбирать вагоны в середине состава, 
                а в сидячих вагонах — купить жд билет на места против движения.
              </p>
            </CardContent>
          </Card>

          {/* Интересные маршруты */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                Необычные маршруты
              </h2>
              <p className="text-base leading-relaxed">
                Любителей же острых ощущений приглашают в Аргентину. Там курсирует специально восстановленный для туристов легендарный поезд «Патагония экспресс». 
                Кроме ярких впечатлений от местных пейзажей, можно неожиданно оказаться участником действия под названием «Ограбление поезда».
              </p>
              <p className="text-base leading-relaxed mt-3">
                В Южной Америке много неожиданностей. Например, немецкие инженеры, обследовавшие Панамский перешеек для постройки Трансамериканской жд магистрали, 
                сказали, что рельсы делать из местного железа невыгодно. Золото здесь более доступный металл...
              </p>
            </CardContent>
          </Card>

          {/* Запреты */}
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed text-amber-900">
                И, пожалуйста, осторожнее прощайтесь на вокзалах во Франции! Там еще 100 лет назад запретили поцелуи: из-за них часто срывалось расписание поездов. 
                Запрет до сих пор действует.
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

export default RailwayFacts;
