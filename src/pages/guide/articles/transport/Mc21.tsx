import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Zap, Users, Info, CheckCircle } from "lucide-react";

const Mc21 = () => {
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
          <span>MC-21</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Про МС-21: новый российский пассажирский самолёт</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                МС-21 (Магистральный Самолёт XXI века) — это новый российский среднемагистральный пассажирский самолёт, разработанный корпорацией «Иркут». Это один из ключевых проектов российской авиапромышленности, призванный заменить устаревшие самолёты и конкурировать с зарубежными аналогами.
              </p>
              <p className="text-base leading-relaxed">
                МС-21 представляет собой современный, экономичный и комфортный самолёт, созданный с использованием передовых технологий и материалов.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Основные характеристики</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Вместимость: от 163 до 211 пассажиров в зависимости от модификации</li>
                    <li>Дальность полёта: до 6000 км</li>
                    <li>Крейсерская скорость: до 870 км/ч</li>
                    <li>Ширина салона: 4,06 метра (шире, чем у большинства конкурентов)</li>
                    <li>Экономичность: снижение расхода топлива до 20% по сравнению с предшественниками</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Комфорт для пассажиров</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                МС-21 имеет самый широкий салон в своём классе, что обеспечивает повышенный комфорт пассажиров. Более широкие кресла и проходы, улучшенная система вентиляции, большое пространство для ручной клади — всё это делает полёт более приятным.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Инновационные технологии</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  МС-21 создан с использованием самых современных технологий и материалов, что делает его конкурентоспособным на мировом рынке.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Композитные материалы в конструкции</p>
                      <p className="text-sm text-muted-foreground">
                        Использование композитных материалов снижает вес самолёта, повышает прочность и долговечность конструкции
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Современные экономичные двигатели</p>
                      <p className="text-sm text-muted-foreground">
                        Новые двигатели обеспечивают снижение расхода топлива и выбросов, что делает полёты более экологичными и экономичными
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Передовая авионика и системы управления</p>
                      <p className="text-sm text-muted-foreground">
                        Современные системы управления и навигации повышают безопасность полёта и облегчают работу экипажа
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Разработка и производство */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Разработка и производство</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  МС-21 разрабатывался как проект национального значения, призванный возродить российскую авиапромышленность и создать конкурентоспособный самолёт.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Разработка включала создание новых технологий, материалов и систем. Производство организовано на современных заводах с использованием передового оборудования.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> МС-21 — это не просто самолёт, а символ возрождения российской авиапромышленности и демонстрация способности создавать современную авиационную технику мирового уровня.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Будущее МС-21 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Будущее МС-21</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  МС-21 призван заменить устаревшие самолёты на внутренних и международных маршрутах. Он должен стать основой парка российских авиакомпаний и конкурировать с зарубежными аналогами.
                </p>
                <p className="text-base leading-relaxed">
                  Развитие проекта МС-21 продолжается, создаются новые модификации, улучшаются характеристики. Это долгосрочный проект, который будет развиваться и совершенствоваться.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Mc21;
