import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Package, Users, Info } from "lucide-react";

const Kapsulnyyvagon = () => {
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
          <span>Капсульный вагон</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Экспериментальный вагон с капсулами вместо плацкартов</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Капсульный вагон — это экспериментальная разработка, в которой традиционные плацкартные места заменены на индивидуальные капсулы. Это новая концепция путешествия в поезде, направленная на повышение приватности и комфорта пассажиров.
              </p>
              <p className="text-base leading-relaxed">
                Капсульный подход широко используется в Японии и других странах, и теперь эта концепция адаптируется для российских железных дорог.
              </p>
            </CardContent>
          </Card>

          {/* Что такое капсульный вагон */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что такое капсульный вагон</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  В капсульном вагоне каждое место представляет собой отдельную капсулу — небольшое индивидуальное пространство, отделённое от остальных пассажиров. Это обеспечивает:
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Приватность и уединённость</li>
                    <li>Личное пространство</li>
                    <li>Защиту от шума соседей</li>
                    <li>Возможность комфортно отдохнуть</li>
                    <li>Индивидуальное освещение и вентиляцию</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Преимущества */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Преимущества капсульного подхода</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Приватность</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Каждая капсула — это отдельное пространство, где пассажир может чувствовать себя уединённо, не отвлекаясь на других пассажиров.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Комфорт</h3>
                  <p className="text-base leading-relaxed mb-3">
                    В капсуле есть всё необходимое для комфортного отдыха: кровать, индивидуальное освещение, розетки для зарядки устройств, место для багажа.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Шумоизоляция</h3>
                  <p className="text-base leading-relaxed">
                    Капсулы обеспечивают лучшую шумоизоляцию, чем открытые плацкартные места, что способствует более качественному отдыху.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Экспериментальный статус */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold">Экспериментальный характер</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Капсульные вагоны пока находятся в стадии эксперимента и тестирования. Они позволяют оценить, насколько такая концепция подходит для российских пассажиров и железных дорог.
                </p>
                
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> В зависимости от результатов эксперимента, капсульные вагоны могут стать частью регулярного парка поездов или остаться нишевым решением для определённых маршрутов.
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

export default Kapsulnyyvagon;
