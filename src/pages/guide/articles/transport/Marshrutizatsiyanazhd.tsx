import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, MapPin, Settings, Info } from "lucide-react";

const Marshrutizatsiyanazhd = () => {
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
          <span>Маршрутизация на ЖД</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как поезд проходит путь от станции до станции</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Маршрутизация поездов — это сложный процесс управления движением поездов на железных дорогах. Каждый поезд следует по заранее спланированному маршруту, который координируется диспетчерами и системами управления движением.
              </p>
              <p className="text-base leading-relaxed">
                От правильной маршрутизации зависит безопасность движения, эффективность использования инфраструктуры и соблюдение расписания. Это сложная система, которая требует координации множества факторов.
              </p>
            </CardContent>
          </Card>

          {/* Планирование маршрута */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Планирование маршрута</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Маршрут поезда планируется заранее, учитывая расписание, состояние путей, другие поезда на линии и множество других факторов для обеспечения безопасности и эффективности движения.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Планирование начинается задолго до отправления поезда. Диспетчеры анализируют множество данных: загруженность путей, техническое состояние инфраструктуры, погодные условия, другие поезда на маршруте.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Факторы, учитываемые при планировании:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Расписание движения</li>
                    <li>Загруженность путей</li>
                    <li>Техническое состояние инфраструктуры</li>
                    <li>Другие поезда на маршруте</li>
                    <li>Погодные условия</li>
                    <li>Особенности маршрута</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Системы управления движением */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Системы управления движением</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Современные железные дороги используют сложные автоматизированные системы управления движением, которые помогают диспетчерам координировать движение поездов.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Автоматизированные системы</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Компьютерные системы анализируют множество данных в реальном времени и помогают диспетчерам принимать оптимальные решения по маршрутизации поездов.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Мониторинг в реальном времени</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Диспетчеры видят положение всех поездов на участке, их скорость, состояние путей и могут оперативно корректировать маршруты при необходимости.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Предотвращение конфликтов</h3>
                    <p className="text-base leading-relaxed">
                      Системы автоматически выявляют потенциальные конфликты маршрутов и предлагают решения для их предотвращения, обеспечивая безопасность движения.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Роль диспетчера */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Роль диспетчера</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Диспетчер играет ключевую роль в маршрутизации поездов. Он принимает решения на основе данных от автоматизированных систем и своего опыта, координируя движение поездов на вверенном ему участке.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Работа диспетчера требует высокой концентрации, быстрой реакции и способности принимать решения в условиях неопределённости. От его работы зависит безопасность и эффективность движения.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Диспетчер должен постоянно следить за ситуацией на участке, предвидеть возможные проблемы и принимать меры для их предотвращения.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Оптимизация маршрутов */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Оптимизация маршрутов</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Современные системы маршрутизации не только обеспечивают безопасность, но и оптимизируют использование инфраструктуры, сокращая время в пути и повышая эффективность перевозок.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Оптимизация маршрутов позволяет максимально эффективно использовать пропускную способность путей, минимизировать задержки и обеспечивать соблюдение расписания.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    Благодаря оптимизации маршрутизации, железные дороги могут перевозить больше поездов с большей эффективностью, что выгодно как для перевозчиков, так и для пассажиров.
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

export default Marshrutizatsiyanazhd;
