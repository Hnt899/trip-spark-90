import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Users, Zap, Info } from "lucide-react";

const Boeing737Ng = () => {
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
          <span>Boeing 737 NG</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Boeing 737 NG</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Boeing 737 NG (Next Generation) — это семейство узкофюзеляжных самолётов, которое стало одним из самых популярных и распространённых в мире. Модели -600, -700, -800 и -900 представляют третье поколение семейства Boeing 737.
              </p>
              <p className="text-base leading-relaxed">
                Boeing 737 NG стал одним из самых успешных самолётов в истории авиации, перевезя миллиарды пассажиров по всему миру. Его популярность объясняется надёжностью, экономичностью и универсальностью.
              </p>
            </CardContent>
          </Card>

          {/* Характеристики */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Характеристики</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Boeing 737 NG отличаются улучшенными двигателями, обновлёнными системами, увеличенной дальностью полёта и вместимостью. Это надёжные и экономичные самолёты для среднемагистральных перелётов.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Основные характеристики:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Вместимость: от 108 до 215 пассажиров (в зависимости от модели)</li>
                    <li>Дальность полёта: до 6000 км</li>
                    <li>Современные двигатели CFM56</li>
                    <li>Улучшенная аэродинамика</li>
                    <li>Обновлённые системы управления</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Эти характеристики делают Boeing 737 NG идеальным для среднемагистральных перелётов, обеспечивая баланс между вместимостью, дальностью и экономичностью.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Модели семейства */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Модели семейства</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Семейство Boeing 737 NG включает несколько моделей, каждая из которых предназначена для определённых задач.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Модели:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>737-600 — самая маленькая модель, до 108 пассажиров</li>
                    <li>737-700 — стандартная модель, до 149 пассажиров</li>
                    <li>737-800 — самая популярная модель, до 189 пассажиров</li>
                    <li>737-900 — самая большая модель, до 215 пассажиров</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Каждая модель имеет свои преимущества и используется в зависимости от требований авиакомпании и маршрута.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Улучшения */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Улучшения по сравнению с предыдущими поколениями</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Boeing 737 NG включает множество улучшений по сравнению с предыдущими поколениями: более экономичные двигатели, улучшенная аэродинамика, обновлённые системы управления, увеличенная дальность и вместимость.
                </p>
                <p className="text-base leading-relaxed">
                  Эти улучшения делают Boeing 737 NG более экономичным, комфортным и безопасным, что объясняет его популярность среди авиакомпаний.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Популярность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Популярность Boeing 737 NG</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Boeing 737 NG стал одним из самых популярных самолётов в мире. Тысячи самолётов этого семейства работают в авиакомпаниях по всему миру, перевозя миллионы пассажиров ежедневно.
                </p>
                <p className="text-base leading-relaxed">
                  Популярность объясняется надёжностью, экономичностью, универсальностью и удобством эксплуатации, что делает Boeing 737 NG идеальным выбором для многих авиакомпаний.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Применение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Применение</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Boeing 737 NG используется на среднемагистральных маршрутах по всему миру. Он идеально подходит для перелётов на расстояния до 6000 км, что покрывает большинство внутренних и региональных международных маршрутов.
                </p>
                <p className="text-base leading-relaxed">
                  Самолёт работает в различных условиях: от крупных международных аэропортов до небольших региональных, демонстрируя свою универсальность.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Наследие */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Наследие Boeing 737 NG</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Boeing 737 NG оставил огромное наследие в истории авиации. Он стал одним из самых успешных самолётов в истории, перевезя миллиарды пассажиров и став основой для следующего поколения — Boeing 737 MAX.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Опыт эксплуатации Boeing 737 NG используется при разработке новых самолётов, а сам самолёт продолжает работать во многих авиакомпаниях по всему миру.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Вывод:</strong> Boeing 737 NG — это не просто самолёт, а символ успеха в авиации, который продемонстрировал, как правильное сочетание характеристик может создать один из самых популярных самолётов в истории.
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

export default Boeing737Ng;
