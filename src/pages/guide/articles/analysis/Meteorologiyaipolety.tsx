import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Plane, Wind, Snowflake, Sun, AlertCircle, Info } from "lucide-react";

const Meteorologiyaipolety = () => {
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
          <Link to="/guide" className="hover:text-primary">Разборы</Link>
          <span>/</span>
          <span>Метеорология и полёты</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Метеорология и полёты: как погода влияет на авиацию</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Погода — один из важнейших факторов, влияющих на безопасность и эффективность полётов. Авиационные метеорологи постоянно отслеживают атмосферные условия, чтобы обеспечить безопасность пассажиров и экипажей.
              </p>
              <p className="text-base leading-relaxed">
                Понимание того, как различные погодные условия влияют на полёты, поможет вам лучше понять причины задержек и отмен рейсов.
              </p>
            </CardContent>
          </Card>

          {/* Туман */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Туман и низкая видимость</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Туман — одно из самых серьёзных препятствий для полётов, особенно при взлёте и посадке. Видимость менее 600 метров может привести к задержкам или отмене рейсов.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Почему туман опасен:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Снижает видимость для пилотов при посадке</li>
                    <li>Затрудняет визуальное ориентирование</li>
                    <li>Может скрывать препятствия на взлётно-посадочной полосе</li>
                    <li>Усложняет работу диспетчеров</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Решение:</strong> Современные самолёты могут садиться при видимости до 75-200 метров благодаря системе автоматической посадки ILS (Instrument Landing System). Однако это требует идеальных условий и квалифицированных пилотов.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Гроза */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Wind className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold">Гроза и грозовые облака</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Грозы представляют серьёзную опасность для самолётов из-за множества явлений: турбулентность, молнии, град, сильные восходящие и нисходящие потоки воздуха.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Турбулентность</p>
                      <p className="text-sm text-muted-foreground">
                        Сильные потоки воздуха внутри грозовых облаков могут вызвать экстремальную турбулентность, опасную для самолёта
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Молнии</p>
                      <p className="text-sm text-muted-foreground">
                        Хотя самолёты защищены от ударов молний, они могут повредить электронику и системы навигации
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Град</p>
                      <p className="text-sm text-muted-foreground">
                        Крупный град может серьёзно повредить самолёт, особенно при полёте на большой скорости
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Стратегия:</strong> Самолёты стараются облетать грозовые облака или ждут, пока они пройдут. Пилоты получают подробную метеорологическую информацию и планируют маршрут так, чтобы избежать опасных зон.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ветер */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wind className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Сильный ветер и сдвиг ветра</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ветер сам по себе не опасен для полёта — самолёты могут летать при ветре до 35-40 м/с. Однако боковой ветер и сдвиг ветра (резкое изменение направления или скорости ветра) могут создавать проблемы.
                </p>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Боковой ветер</h3>
                  <p className="text-base leading-relaxed mb-3">
                    При посадке слишком сильный боковой ветер может затруднить выравнивание самолёта по взлётно-посадочной полосе. Существуют ограничения по максимальной силе бокового ветра для каждого типа самолёта.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Сдвиг ветра (Wind Shear)</h3>
                  <p className="text-base leading-relaxed">
                    Это резкое изменение скорости или направления ветра на небольшом расстоянии. Особенно опасен на малых высотах при взлёте и посадке, так как может привести к потере подъёмной силы или резкому изменению траектории.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Защита:</strong> Современные самолёты оснащены системами предупреждения о сдвиге ветра, которые помогают пилотам своевременно реагировать на опасные изменения ветра.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Обледенение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">Обледенение</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Обледенение может произойти, когда самолёт пролетает через облака с переохлаждёнными каплями воды или через зоны выпадения осадков при температуре ниже нуля.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Почему обледенение опасно:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Увеличивает вес самолёта</li>
                    <li>Нарушает аэродинамику, снижая подъёмную силу</li>
                    <li>Может заблокировать подвижные части (рули, закрылки)</li>
                    <li>Забивает датчики скорости и высоты</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Решение:</strong> Самолёты оснащены системами противообледенения, которые предотвращают образование льда на критических поверхностях. Перед вылетом в холодную погоду самолёты обрабатываются специальной жидкостью.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ясная погода */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold">Идеальная погода для полётов</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Лучшие условия для полётов — это ясная погода с хорошей видимостью, слабым ветром и отсутствием осадков. Однако самолёты могут безопасно летать и при других условиях.
                </p>
                
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Идеальные условия:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Ясное небо или высокие облака</li>
                    <li>Видимость более 10 километров</li>
                    <li>Слабый ветер (до 10 м/с)</li>
                    <li>Отсутствие осадков</li>
                    <li>Температура выше точки замерзания</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как принимаются решения */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как принимаются решения о полётах в плохую погоду</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Решение о возможности вылета принимается на основе множества факторов:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4 mb-4">
                  <li><strong>Тип самолёта</strong> — разные самолёты имеют разные ограничения по погодным условиям</li>
                  <li><strong>Опыт пилота</strong> — более опытные пилоты могут работать в более сложных условиях</li>
                  <li><strong>Оборудование аэропорта</strong> — наличие систем ILS и современных средств навигации</li>
                  <li><strong>Запасные аэродромы</strong> — возможность посадки на альтернативном аэродроме в случае ухудшения погоды</li>
                  <li><strong>Прогноз погоды</strong> — не только текущие условия, но и прогноз на время полёта</li>
                </ul>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно помнить:</strong> Если ваш рейс задерживается или отменяется из-за погоды, это делается ради вашей безопасности. Авиакомпании предпочитают задержки, чем рисковать жизнями пассажиров.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Современные технологии */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Современные технологии метеорологии в авиации</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Авиация использует самые современные метеорологические технологии:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Спутниковые данные</p>
                    <p className="text-sm text-muted-foreground">
                      Постоянный мониторинг погодных условий в реальном времени по всему миру
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Радиолокация</p>
                    <p className="text-sm text-muted-foreground">
                      Обнаружение грозовых облаков, осадков и турбулентности на расстоянии сотен километров
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Компьютерное моделирование</p>
                    <p className="text-sm text-muted-foreground">
                      Точные прогнозы погоды на несколько часов и дней вперёд
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Данные от самолётов</p>
                    <p className="text-sm text-muted-foreground">
                      Метеорологические данные, собираемые самими самолётами во время полёта
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Meteorologiyaipolety;
