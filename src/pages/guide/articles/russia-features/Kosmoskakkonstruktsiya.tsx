import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Zap, Cog, Info, Star, Building2 } from "lucide-react";

const Kosmoskakkonstruktsiya = () => {
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
          <Link to="/guide" className="hover:text-primary">Фишки России</Link>
          <span>/</span>
          <span>Космос как конструкция</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Космос как конструкция: как устроена космическая техника</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Космическая техника — это вершина инженерной мысли, где каждая деталь должна быть продумана до мелочей. Ракеты, спутники, космические станции — это сложные конструкции, которые должны работать в экстремальных условиях космоса: вакуум, радиация, перепады температур, невесомость.
              </p>
              <p className="text-base leading-relaxed">
                Россия имеет богатую историю космических достижений. С момента запуска первого искусственного спутника Земли и первого человека в космос Россия продолжает развивать космическую отрасль, создавая новые технологии и конструкции.
              </p>
            </CardContent>
          </Card>

          {/* Конструкция ракет */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как устроены ракеты</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Ракета — это сложная многоступенчатая конструкция, каждая часть которой выполняет свою задачу. Первая ступень поднимает ракету с Земли, вторая выводит её на орбиту, третья (если есть) корректирует траекторию. После выполнения задачи каждая ступень отделяется и сгорает в атмосфере или падает в океан.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Корпус ракеты должен быть прочным, но лёгким. Используются специальные сплавы алюминия, титана, композитные материалы. Двигатели должны работать в вакууме, выдерживать огромные температуры и давления.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Основные элементы ракеты:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Корпус из лёгких и прочных материалов</li>
                  <li>Двигатели для каждой ступени</li>
                  <li>Топливные баки</li>
                  <li>Система управления и навигации</li>
                  <li>Полезная нагрузка (спутник, космический корабль)</li>
                  <li>Система разделения ступеней</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Каждая деталь ракеты должна быть надёжной. Один сбой может привести к потере всего аппарата. Поэтому контроль качества на всех этапах производства — это критически важно.
              </p>
            </CardContent>
          </Card>

          {/* Космические станции */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Конструкция космических станций</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Космические станции — это сложные конструкции, которые собираются на орбите из модулей, доставляемых ракетами. Каждый модуль — это отдельный блок со своими системами жизнеобеспечения, научным оборудованием, жилыми отсеками.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Модули соединяются специальными стыковочными узлами, которые должны быть абсолютно герметичными. Внутри станции поддерживается атмосфера, похожая на земную, но с особым составом. Системы регенерации воздуха и воды позволяют экипажу жить на станции месяцами.
              </p>
              <p className="text-base leading-relaxed">
                Космические станции оборудуются солнечными батареями для получения энергии, системами ориентации, научными лабораториями, тренажёрами для поддержания физической формы экипажа. Всё должно работать в условиях невесомости и вакуума.
              </p>
            </CardContent>
          </Card>

          {/* Спутники */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Устройство спутников</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Спутники — это автономные космические аппараты, которые работают на орбите без участия человека. Они состоят из платформы (служебного модуля) и полезной нагрузки (научного или коммерческого оборудования).
              </p>
              <p className="text-base leading-relaxed mb-4">
                Платформа обеспечивает работу спутника: солнечные батареи для питания, система ориентации для удержания позиции, система связи для передачи данных на Землю, система терморегуляции для поддержания нужной температуры.
              </p>
              <p className="text-base leading-relaxed">
                Полезная нагрузка зависит от назначения спутника: это могут быть камеры для съёмки Земли, телескопы для наблюдения за космосом, антенны для связи, научные приборы. Каждый спутник создаётся под конкретную задачу.
              </p>
            </CardContent>
          </Card>

          {/* Материалы и технологии */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cog className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Материалы и технологии</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Космическая техника требует особых материалов и технологий. Используются лёгкие, но прочные сплавы, композитные материалы, специальные покрытия, защищающие от радиации и перепадов температур.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Технологии производства космической техники постоянно совершенствуются. Используются 3D-печать, новые методы сварки, роботизация производства. Каждая деталь изготавливается с точностью до микрон.
              </p>
              <p className="text-base leading-relaxed">
                Особое внимание уделяется надёжности. Каждый компонент проходит множество испытаний: вибрационные, температурные, вакуумные. Только после всех проверок компонент допускается к использованию в космосе.
              </p>
            </CardContent>
          </Card>

          {/* Системы жизнеобеспечения */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Системы жизнеобеспечения</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Для работы космических аппаратов с экипажем нужны системы жизнеобеспечения. Они обеспечивают воздух, воду, еду, отвод отходов, поддержание температуры и давления. Всё это должно работать в условиях ограниченных ресурсов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Системы регенерации позволяют повторно использовать воду и воздух. Углекислый газ удаляется, кислород производится из воды. Вода очищается и используется многократно. Это критически важно для длительных миссий.
              </p>
              <p className="text-base leading-relaxed">
                Все системы должны быть надёжными и иметь резервные копии. Сбой в системе жизнеобеспечения может привести к гибели экипажа, поэтому к их разработке и производству предъявляются самые строгие требования.
              </p>
            </CardContent>
          </Card>

          {/* Интересные факты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Интересные факты</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Первый спутник</h3>
                  <p className="text-base leading-relaxed">
                    Первый искусственный спутник Земли был запущен в СССР в 1957 году. Он весил всего 83,6 килограмма и имел простейшую конструкцию, но открыл эру космических полётов.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">МКС</h3>
                  <p className="text-base leading-relaxed">
                    Международная космическая станция — это самый большой космический объект, созданный человеком. Она состоит из множества модулей и весит более 400 тонн.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Точность</h3>
                  <p className="text-base leading-relaxed">
                    Точность изготовления деталей для космической техники измеряется в микронах. Одна ошибка может привести к потере всего аппарата стоимостью миллиарды рублей.
                  </p>
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

export default Kosmoskakkonstruktsiya;
