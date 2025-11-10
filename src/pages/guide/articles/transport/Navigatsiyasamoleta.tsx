import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation, Settings, Info } from "lucide-react";

const Navigatsiyasamoleta = () => {
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
          <span>Навигация самолёта</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как строится маршрут полёта</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Планирование маршрута полёта — это сложный процесс, который учитывает множество факторов: погодные условия, воздушное движение, топливную эффективность, безопасность и многое другое.
              </p>
              <p className="text-base leading-relaxed">
                От правильного планирования маршрута зависит безопасность полёта, экономическая эффективность и соблюдение расписания. Это сложная задача, которая требует учёта множества переменных.
              </p>
            </CardContent>
          </Card>

          {/* Факторы планирования */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Факторы планирования маршрута</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  При планировании маршрута учитывается множество факторов, каждый из которых влияет на выбор оптимального пути.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Погодные условия и ветра</li>
                    <li>Занятость воздушного пространства</li>
                    <li>Топливная эффективность</li>
                    <li>Высота полёта</li>
                    <li>Ограничения и запретные зоны</li>
                    <li>Требования авиакомпании</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Все эти факторы анализируются вместе, чтобы найти оптимальный маршрут, который обеспечивает безопасность, эффективность и соблюдение расписания.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Погодные условия */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Погодные условия и ветра</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Погодные условия играют ключевую роль в планировании маршрута. Ветра могут значительно влиять на время полёта и расход топлива. Попутный ветер ускоряет полёт и экономит топливо, а встречный — замедляет и увеличивает расход.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Метеорологи анализируют прогнозы погоды и ветров на различных высотах, чтобы выбрать оптимальный маршрут и высоту полёта.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Избегание опасных погодных явлений — гроз, сильной турбулентности, обледенения — критически важно для безопасности полёта.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Воздушное движение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Занятость воздушного пространства</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Воздушное пространство разделено на маршруты и зоны, и не все маршруты доступны одновременно. Диспетчерские службы координируют движение самолётов, распределяя их по различным маршрутам и высотам.
                </p>
                <p className="text-base leading-relaxed">
                  При планировании маршрута учитывается загруженность воздушного пространства, чтобы избежать задержек и обеспечить безопасные интервалы между самолётами.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Топливная эффективность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Топливная эффективность</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Топливо — одна из основных статей расходов авиакомпаний, поэтому выбор маршрута, который минимизирует расход топлива, очень важен для экономической эффективности.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Оптимальный маршрут учитывает ветра, высоту полёта, расстояние и другие факторы, чтобы минимизировать расход топлива при сохранении безопасности и соблюдении расписания.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    Современные системы планирования маршрутов используют сложные алгоритмы для оптимизации топливной эффективности, учитывая множество переменных.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Высота полёта */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Высота полёта</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Высота полёта выбирается с учётом множества факторов: типа самолёта, погодных условий, ветров, загруженности воздушного пространства, топливной эффективности.
                </p>
                <p className="text-base leading-relaxed">
                  Различные высоты имеют свои преимущества: на больших высотах меньше сопротивление воздуха и лучше топливная эффективность, но могут быть сильные ветра. Выбор оптимальной высоты — это баланс между различными факторами.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ограничения и запретные зоны */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Ограничения и запретные зоны</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  В воздушном пространстве есть ограничения и запретные зоны, которые нельзя пересекать: военные зоны, зоны вокруг важных объектов, зоны с особыми требованиями.
                </p>
                <p className="text-base leading-relaxed">
                  При планировании маршрута все эти ограничения должны быть учтены. Маршрут должен обходить запретные зоны и соблюдать все ограничения.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Современные системы навигации */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Современные системы навигации</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Современные самолёты оснащены сложными системами навигации: GPS, инерциальные навигационные системы, радионавигационные системы. Эти системы обеспечивают точное определение положения самолёта в любой момент времени.
                </p>
                <p className="text-base leading-relaxed">
                  Системы навигации работают вместе, обеспечивая надёжность и точность. Если одна система выходит из строя, другие продолжают работать, обеспечивая безопасность полёта.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Важность правильного маршрута */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Важность правильного маршрута</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Правильное планирование маршрута критически важно для безопасности, эффективности и экономичности полёта. Ошибки в планировании могут привести к задержкам, увеличению расхода топлива или даже проблемам с безопасностью.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Современные системы планирования маршрутов используют сложные алгоритмы и большие объёмы данных для оптимизации маршрутов, обеспечивая лучший баланс между безопасностью, эффективностью и экономичностью.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Вывод:</strong> Планирование маршрута — это сложная и важная задача, которая требует учёта множества факторов. От качества планирования зависит успех всего полёта.
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

export default Navigatsiyasamoleta;
