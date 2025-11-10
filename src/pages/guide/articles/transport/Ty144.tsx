import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Zap, History, Star } from "lucide-react";

const Ty144 = () => {
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
          <span>Ту-144</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Ту-144: легендарный советский самолёт</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Ту-144 — это первый в мире сверхзвуковой пассажирский самолёт, который начал коммерческие полёты. Разработанный в СССР, он стал символом технологического прогресса советской авиации.
              </p>
              <p className="text-base leading-relaxed">
                Ту-144 опередил знаменитый Concorde и стал первым сверхзвуковым пассажирским самолётом в мире. Хотя его коммерческая эксплуатация была недолгой, он остаётся важной вехой в истории авиации.
              </p>
            </CardContent>
          </Card>

          {/* Историческое значение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Историческое значение</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ту-144 совершил первый полёт в 1968 году, опередив знаменитый Concorde. Этот самолёт мог летать со скоростью более 2000 км/ч, что позволяло сократить время полёта в несколько раз.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Создание Ту-144 стало демонстрацией технологических возможностей советской авиапромышленности и показало, что СССР может создавать самолёты мирового уровня.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Интересный факт:</strong> Ту-144 был первым сверхзвуковым пассажирским самолётом, который начал перевозить пассажиров, хотя коммерческая эксплуатация оказалась экономически невыгодной.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Технические характеристики */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Технические характеристики</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ту-144 был технически сложным самолётом с уникальными характеристиками для своего времени.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Основные характеристики:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Максимальная скорость: более 2500 км/ч</li>
                    <li>Крейсерская скорость: около 2300 км/ч</li>
                    <li>Вместимость: до 140 пассажиров</li>
                    <li>Дальность полёта: до 6500 км</li>
                    <li>Высота полёта: до 20 000 метров</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Эти характеристики делали Ту-144 одним из самых быстрых пассажирских самолётов в мире, способным сократить время полёта в несколько раз по сравнению с дозвуковыми самолётами.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Конструкция */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <History className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Уникальная конструкция</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ту-144 имел уникальную конструкцию, разработанную специально для сверхзвуковых полётов. Крылья дельтовидной формы, специальная форма фюзеляжа, мощные двигатели — всё это было необходимо для достижения сверхзвуковых скоростей.
                </p>
                <p className="text-base leading-relaxed">
                  Конструкция самолёта учитывала особенности сверхзвукового полёта: нагрев от трения о воздух, аэродинамические нагрузки, необходимость эффективного управления на высоких скоростях.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Коммерческая эксплуатация */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Коммерческая эксплуатация</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ту-144 начал коммерческие полёты в 1977 году на маршруте Москва — Алма-Ата. Однако коммерческая эксплуатация оказалась экономически невыгодной из-за высокого расхода топлива и стоимости обслуживания.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Сверхзвуковые полёты требовали огромного количества топлива, что делало билеты очень дорогими. Кроме того, самолёт создавал сильный звуковой удар, что ограничивало его использование над населёнными территориями.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Интересный факт:</strong> Коммерческие полёты Ту-144 продолжались недолго, но самолёт использовался для различных исследовательских и транспортных задач.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Наследие Ту-144 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <History className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Наследие Ту-144</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Хотя Ту-144 не стал коммерчески успешным, он оставил важное наследие. Он продемонстрировал возможности сверхзвуковой авиации и стал важной вехой в истории авиации.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Опыт создания и эксплуатации Ту-144 использовался при разработке других самолётов и способствовал развитию авиационных технологий.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Вывод:</strong> Ту-144 — это не просто самолёт, а символ эпохи, когда человечество стремилось преодолеть звуковой барьер в гражданской авиации. Он остаётся важной частью истории авиации и напоминанием о смелых технологических амбициях.
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

export default Ty144;
