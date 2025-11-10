import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Zap, Monitor, Info } from "lucide-react";

const Avtomatizatsiyahel = () => {
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
          <span>Автоматизация HEL</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Автоматизация аэропорта в Хельсинки</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Аэропорт Хельсинки (HEL) является одним из самых автоматизированных аэропортов в мире. Современные технологии позволяют автоматизировать множество процессов: от регистрации пассажиров до управления багажом и обслуживания самолётов.
              </p>
              <p className="text-base leading-relaxed">
                Автоматизация делает аэропорт более эффективным, быстрым и удобным для пассажиров, сокращая время ожидания и улучшая качество обслуживания.
              </p>
            </CardContent>
          </Card>

          {/* Системы автоматизации */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Системы автоматизации</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Автоматизация включает саморегистрацию пассажиров, автоматические системы обработки багажа, роботизированные системы обслуживания и многие другие технологии, которые делают аэропорт более эффективным и удобным.
                </p>
                <p className="text-base leading-relaxed">
                  Все эти системы работают вместе, создавая единую автоматизированную экосистему, которая оптимизирует все процессы в аэропорту.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Саморегистрация */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Саморегистрация пассажиров</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Системы саморегистрации позволяют пассажирам самостоятельно зарегистрироваться на рейс, выбрать места и получить посадочные талоны без обращения к стойкам регистрации.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Это значительно сокращает время ожидания и делает процесс регистрации более удобным. Пассажиры могут зарегистрироваться онлайн или на терминалах самообслуживания в аэропорту.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Преимущество:</strong> Саморегистрация экономит время пассажиров и снижает нагрузку на стойки регистрации, что особенно важно в часы пик.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Автоматическая обработка багажа */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Автоматическая обработка багажа</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Автоматические системы обработки багажа сортируют, транспортируют и загружают багаж на самолёты без участия человека. Это повышает скорость обработки и снижает вероятность ошибок.
                </p>
                <p className="text-base leading-relaxed">
                  Системы используют штрих-коды и RFID-метки для отслеживания багажа, обеспечивая его точную доставку на нужный рейс.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Роботизированные системы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Роботизированные системы обслуживания</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Роботы используются для различных задач в аэропорту: уборки, обслуживания самолётов, доставки багажа и других операций. Это повышает эффективность и снижает затраты.
                </p>
                <p className="text-base leading-relaxed">
                  Роботизированные системы работают круглосуточно, не устают и выполняют задачи с высокой точностью.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Информационные системы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Информационные системы</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Автоматизированные информационные системы предоставляют пассажирам актуальную информацию о рейсах, задержках, терминалах и других важных деталях через различные каналы.
                </p>
                <p className="text-base leading-relaxed">
                  Мобильные приложения, информационные табло, веб-сайты — все эти системы автоматически обновляются и синхронизируются, обеспечивая пассажиров точной информацией в реальном времени.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Преимущества автоматизации */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Преимущества автоматизации</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Автоматизация аэропорта приносит множество преимуществ: сокращение времени ожидания, повышение эффективности, снижение ошибок, улучшение качества обслуживания.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Основные преимущества:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Сокращение времени обработки пассажиров</li>
                    <li>Повышение точности обработки багажа</li>
                    <li>Снижение операционных затрат</li>
                    <li>Улучшение качества обслуживания</li>
                    <li>Повышение пропускной способности аэропорта</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Будущее автоматизации */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Будущее автоматизации</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Автоматизация аэропортов продолжает развиваться. Появляются новые технологии: искусственный интеллект, машинное обучение, биометрические системы, которые делают аэропорты ещё более эффективными и удобными.
                </p>
                <p className="text-base leading-relaxed">
                  Аэропорт Хельсинки является примером того, как автоматизация может улучшить работу аэропорта и опыт пассажиров, создавая более быстрый, эффективный и удобный процесс обслуживания.
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

export default Avtomatizatsiyahel;
