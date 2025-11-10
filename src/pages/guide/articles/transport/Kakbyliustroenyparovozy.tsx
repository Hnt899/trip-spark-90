import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Flame, Settings, Info } from "lucide-react";

const Kakbyliustroenyparovozy = () => {
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
          <Link to="/guide" className="hover:text-primary">Транспорт</Link>
          <span>/</span>
          <span>Как были устроены паровозы</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как были устроены паровозы</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Паровозы — это легендарные локомотивы, которые приводили в движение поезда на протяжении более чем ста лет. Хотя они давно уступили место более современным локомотивам, принципы их работы остаются интересными и важными для понимания истории железных дорог.
              </p>
              <p className="text-base leading-relaxed">
                Паровозы были первыми самоходными локомотивами и сыграли ключевую роль в развитии железнодорожного транспорта. Понимание их устройства помогает оценить масштаб технического прогресса и эволюцию железнодорожной техники.
              </p>
            </CardContent>
          </Card>

          {/* Принцип работы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Принцип работы паровоза</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Паровоз работает на принципе паровой машины: уголь сжигается в топке, нагревает воду в котле, пар под давлением приводит в движение поршни, которые через кривошипно-шатунный механизм вращают колёса.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Это классический пример преобразования тепловой энергии в механическую работу. Процесс начинается с загрузки угля в топку, где он сжигается, выделяя большое количество тепла.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Основные этапы работы:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Сжигание угля в топке</li>
                    <li>Нагрев воды в котле до образования пара</li>
                    <li>Подача пара под давлением в цилиндры</li>
                    <li>Движение поршней под давлением пара</li>
                    <li>Преобразование возвратно-поступательного движения во вращательное</li>
                    <li>Вращение колёс и движение локомотива</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Основные компоненты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Основные компоненты паровоза</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Котёл</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Котёл — это сердце паровоза. В нём вода нагревается до температуры кипения и превращается в пар под высоким давлением. Котёл состоит из множества трубок, по которым циркулирует горячий дым и газы от топки.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Топка</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Топка — это место, где сжигается топливо (уголь, дрова или мазут). Тепло от сгорания передаётся воде в котле. Топка имеет колосниковую решётку, на которую загружается топливо, и зольник для сбора золы.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Цилиндры и поршни</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Пар из котла поступает в цилиндры, где давит на поршни. Поршни совершают возвратно-поступательное движение, которое через кривошипно-шатунный механизм преобразуется во вращательное движение колёс.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Кривошипно-шатунный механизм</h3>
                    <p className="text-base leading-relaxed">
                      Этот механизм преобразует возвратно-поступательное движение поршней во вращательное движение ведущих колёс. Шатуны соединяют поршни с кривошипами на осях колёс.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Управление паровозом */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Управление паровозом</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Управление паровозом требовало от машиниста большого опыта и знаний. Машинист должен был контролировать множество параметров: давление пара, уровень воды в котле, температуру, подачу топлива.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Основные органы управления:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Реверс — для изменения направления движения</li>
                    <li>Регулятор — для управления подачей пара в цилиндры</li>
                    <li>Тормозная система</li>
                    <li>Клапаны подачи воды в котёл</li>
                    <li>Устройства для подкидывания угля в топку</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Работа машиниста паровоза была физически тяжёлой: нужно было постоянно подкидывать уголь в топку, следить за давлением и уровнем воды, управлять локомотивом. Это требовало выносливости и мастерства.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Историческое значение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Историческое значение</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Паровозы сыграли огромную роль в развитии цивилизации. Они сделали возможным быстрое перемещение людей и грузов на большие расстояния, способствовали развитию промышленности, торговли и освоению новых территорий.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Эпоха паровозов длилась более ста лет — с начала XIX века до середины XX века. За это время паровозы прошли огромный путь развития: от простых и маломощных до сложных и мощных локомотивов, способных вести тяжёлые составы на большие расстояния.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Интересный факт:</strong> Хотя паровозы давно уступили место тепловозам и электровозам, они до сих пор используются на некоторых туристических маршрутах и в музеях железнодорожной техники, позволяя современным людям прикоснуться к истории.
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

export default Kakbyliustroenyparovozy;
