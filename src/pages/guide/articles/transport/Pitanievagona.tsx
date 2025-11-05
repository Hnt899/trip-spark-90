import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Zap, Flame, AlertCircle, Info } from "lucide-react";

const Pitanievagona = () => {
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
          <span>Питание вагона</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Зачем при наличии электропитания нужен старый добрый угольный котёл в вагоне?</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Многие пассажиры удивляются, увидев в современных вагонах угольные котлы для отопления, хотя вагоны подключены к электрическому питанию. Казалось бы, зачем нужен уголь, если есть электричество?
              </p>
              <p className="text-base leading-relaxed">
                На самом деле, угольный котёл в вагоне выполняет критически важную функцию и является запасным источником тепла, который обеспечивает безопасность пассажиров в различных ситуациях.
              </p>
            </CardContent>
          </Card>

          {/* Основная причина */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Главная причина — надёжность</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Электропитание вагонов зависит от работы локомотива и может быть прервано в различных ситуациях:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4 mb-4">
                  <li>При остановке поезда на длительное время</li>
                  <li>При отключении локомотива от состава</li>
                  <li>При аварийных ситуациях или технических неполадках</li>
                  <li>При смене локомотива на станциях</li>
                  <li>При работе в районах с нестабильным электроснабжением</li>
                </ul>

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Без отопления в зимнее время температура в вагоне может опуститься до критически низких значений за очень короткое время, что представляет опасность для здоровья и жизни пассажиров.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Независимость от электричества */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Независимость от электрической системы</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Угольный котёл работает полностью автономно и не зависит от:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Локомотива</p>
                      <p className="text-sm text-muted-foreground">
                        Котёл продолжает работать даже если локомотив отцеплен или неисправен
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Электросети</p>
                      <p className="text-sm text-muted-foreground">
                        Не требует подключения к внешним источникам энергии
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Сложного оборудования</p>
                      <p className="text-sm text-muted-foreground">
                        Простая и надёжная конструкция, проверенная десятилетиями эксплуатации
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Экономическая эффективность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Экономическая эффективность</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Помимо надёжности, угольное отопление имеет экономические преимущества:
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Уголь — относительно недорогое топливо</li>
                    <li>Высокая теплоёмкость — небольшое количество угля даёт много тепла</li>
                    <li>Длительное горение — одной закладки хватает на несколько часов</li>
                    <li>Не требует постоянной работы генератора локомотива</li>
                  </ul>
                </div>

                <p className="text-base leading-relaxed">
                  Электрическое отопление более удобно, но требует постоянной работы генератора, что увеличивает расход топлива локомотива.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Как работает система */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как работает система отопления</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  В современных вагонах используется комбинированная система отопления:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Электрическое отопление (основное)</p>
                    <p className="text-sm leading-relaxed">
                      Когда поезд движется и локомотив работает, вагон отапливается электричеством. Это удобно, экологично и не требует участия проводника.
                    </p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Угольный котёл (резервное)</p>
                    <p className="text-sm leading-relaxed">
                      Используется как запасной вариант и включается проводником при необходимости: при длительных стоянках, отключении электричества или в сильные морозы для дополнительного обогрева.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Безопасность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Безопасность — главный приоритет</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Угольный котёл в вагоне — это не пережиток прошлого, а важный элемент системы безопасности:
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Преимущества с точки зрения безопасности:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Гарантированное тепло даже в аварийных ситуациях</li>
                    <li>Независимость от технических неполадок</li>
                    <li>Работа в любых погодных условиях</li>
                    <li>Проверенная надёжность десятилетиями эксплуатации</li>
                    <li>Возможность работы без участия локомотива</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Вывод:</strong> Угольный котёл остаётся в вагонах не из-за нежелания модернизировать систему, а потому что это надёжный, проверенный и безопасный способ обеспечить отопление в любых условиях. Это один из тех случаев, когда старые решения остаются актуальными и необходимыми.
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

export default Pitanievagona;
