import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Clock, History, Info, Settings } from "lucide-react";

const Lip = () => {
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
          <span>Л и П - паровозы прошлого</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Л и П — паровозы прошлого</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Паровозы серий Л и П — это легендарные локомотивы советской эпохи, которые сыграли важную роль в развитии железных дорог. Эти паровозы были одними из самых массовых и надёжных локомотивов своего времени.
              </p>
              <p className="text-base leading-relaxed">
                Паровозы Л (Лазарь Каганович) и П (Победа) стали символами послевоенного восстановления и развития железнодорожного транспорта в СССР. Они работали на магистралях страны десятилетиями и заслужили репутацию надёжных и мощных локомотивов.
              </p>
            </CardContent>
          </Card>

          {/* Паровоз серии Л */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Паровоз серии Л</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Паровоз серии Л (Лазарь Каганович) был разработан в 1945 году и стал одним из самых успешных послевоенных паровозов. Он был создан для замены устаревших паровозов и работы на грузовых и пассажирских маршрутах.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Характеристики паровоза Л:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Мощность: около 2200 лошадиных сил</li>
                    <li>Конструкционная скорость: 80 км/ч</li>
                    <li>Осевая формула: 1-5-0</li>
                    <li>Массовое производство с 1945 по 1955 год</li>
                    <li>Более 4000 построенных экземпляров</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Паровоз Л отличался надёжностью, простотой в обслуживании и хорошими тяговыми характеристиками. Он мог работать как с грузовыми, так и с пассажирскими составами.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Паровоз серии П */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Паровоз серии П</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Паровоз серии П (Победа) был разработан в 1945 году и назван в честь победы в Великой Отечественной войне. Это был пассажирский паровоз, предназначенный для вождения скорых и пассажирских поездов.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Характеристики паровоза П:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Мощность: около 1900 лошадиных сил</li>
                    <li>Конструкционная скорость: 125 км/ч</li>
                    <li>Осевая формула: 2-3-2</li>
                    <li>Производство с 1945 по 1954 год</li>
                    <li>Более 200 построенных экземпляров</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Паровоз П был одним из самых быстрых советских паровозов и использовался на важнейших пассажирских маршрутах, включая знаменитые скорые поезда.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Историческое значение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <History className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Историческое значение</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Паровозы Л и П стали символами железнодорожного транспорта СССР и внесли огромный вклад в развитие железнодорожной сети страны.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Эти паровозы работали в период послевоенного восстановления и развития экономики. Они обеспечивали перевозки на магистральных линиях, способствуя восстановлению страны и развитию промышленности.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Интересный факт:</strong> Паровозы Л и П стали последними массовыми паровозами в СССР. Вскоре после их производства начался переход на тепловозы и электровозы, которые были более эффективными и экономичными.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Технические особенности */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Технические особенности</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Паровозы Л и П были созданы с использованием передовых для своего времени технологий и конструктивных решений. Они отличались хорошими характеристиками и надёжностью.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Конструкция</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Оба паровоза имели современную для своего времени конструкцию с улучшенной аэродинамикой, эффективной системой парообразования и надёжными механизмами.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Экономичность</h3>
                    <p className="text-base leading-relaxed mb-2">
                      По сравнению с более старыми паровозами, Л и П были более экономичными в расходе топлива и воды, что снижало эксплуатационные затраты.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Надёжность</h3>
                    <p className="text-base leading-relaxed">
                      Эти паровозы заслужили репутацию надёжных локомотивов, способных работать в различных условиях и с различными составами.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Наследие */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Наследие паровозов Л и П</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Хотя эпоха паровозов давно прошла, паровозы Л и П оставили важное наследие. Некоторые из них сохранились в музеях и на туристических маршрутах, напоминая о важной эпохе в истории железных дорог.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Эти паровозы стали частью истории железнодорожного транспорта и символом технического прогресса своего времени. Они демонстрируют мастерство инженеров и конструкторов, создавших надёжные и эффективные локомотивы.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Паровозы Л и П — это не просто техника прошлого, а важная часть истории железных дорог, которая продолжает вдохновлять и напоминать о достижениях железнодорожного транспорта.
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

export default Lip;
