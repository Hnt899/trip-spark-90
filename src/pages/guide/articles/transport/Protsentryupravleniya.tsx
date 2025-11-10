import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Monitor, Radio, Info } from "lucide-react";

const Protsentryupravleniya = () => {
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
          <span>Про центры управления</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что внутри аэропорта: центры управления</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Центры управления аэропортом — это «мозг» всего комплекса. Здесь сосредоточены диспетчерские службы, которые координируют все процессы: от движения самолётов до работы наземных служб.
              </p>
              <p className="text-base leading-relaxed">
                Эти центры работают круглосуточно, обеспечивая безопасность, эффективность и координацию всех операций аэропорта. От их работы зависит функционирование всего аэропорта.
              </p>
            </CardContent>
          </Card>

          {/* Структура центров управления */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Структура центров управления</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Центры управления аэропортом включают множество различных служб и систем, каждая из которых отвечает за свою область.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Диспетчерские пункты управления воздушным движением</li>
                    <li>Центры координации наземных служб</li>
                    <li>Системы мониторинга и контроля</li>
                    <li>Информационные системы для пассажиров</li>
                    <li>Системы безопасности</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Все эти службы работают в тесной координации, обеспечивая слаженную работу всего аэропорта.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Диспетчерские пункты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Radio className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Диспетчерские пункты управления воздушным движением</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Диспетчерские пункты — это сердце управления воздушным движением в аэропорту. Здесь диспетчеры координируют взлёты, посадки и движение самолётов в зоне аэропорта.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Диспетчеры используют современные системы радиолокации и связи для отслеживания всех самолётов и обеспечения безопасных интервалов между ними.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Работа диспетчеров критически важна для безопасности полётов. Они принимают решения, от которых зависит безопасность тысяч пассажиров.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Центры координации наземных служб */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Центры координации наземных служб</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Центры координации наземных служб управляют работой всех наземных служб аэропорта: обслуживания самолётов, обработки багажа, заправки, уборки и других.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Эти центры координируют работу различных служб, обеспечивая, что все операции выполняются своевременно и эффективно, без задержек для пассажиров и авиакомпаний.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    Эффективная координация наземных служб позволяет минимизировать время стоянки самолётов и обеспечивать соблюдение расписания.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Системы мониторинга */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Системы мониторинга и контроля</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Современные центры управления оснащены сложными системами мониторинга, которые отслеживают все аспекты работы аэропорта в реальном времени.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Мониторинг движения самолётов</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Системы отслеживают положение всех самолётов в зоне аэропорта, их статус, время прибытия и отправления.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Мониторинг наземных операций</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Системы контролируют работу всех наземных служб, отслеживая выполнение операций и выявляя возможные проблемы.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Мониторинг инфраструктуры</h3>
                    <p className="text-base leading-relaxed">
                      Системы отслеживают состояние инфраструктуры аэропорта: взлётно-посадочных полос, терминалов, систем безопасности и других элементов.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Информационные системы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Информационные системы для пассажиров</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Центры управления координируют работу информационных систем, которые предоставляют пассажирам актуальную информацию о рейсах, задержках, терминалах и других важных деталях.
                </p>
                <p className="text-base leading-relaxed">
                  Информационные табло, объявления, мобильные приложения и веб-сайты получают данные из центров управления, обеспечивая пассажиров своевременной и точной информацией.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Системы безопасности */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Системы безопасности</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Центры управления координируют работу всех систем безопасности аэропорта: видеонаблюдения, контроля доступа, досмотра, кинологической службы и других.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Все системы безопасности интегрированы в единую систему управления, что позволяет оперативно реагировать на любые угрозы и обеспечивать безопасность пассажиров и персонала.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Безопасность — приоритет номер один. Все системы безопасности работают круглосуточно и постоянно обновляются для обеспечения максимальной защиты.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Важность центров управления */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Важность центров управления</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Центры управления — это нервная система аэропорта. Без них аэропорт не смог бы функционировать эффективно и безопасно.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Они обеспечивают координацию всех служб, оперативное реагирование на изменения ситуации, эффективное использование ресурсов и обеспечение безопасности.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Вывод:</strong> Центры управления — это невидимая, но критически важная часть аэропорта, которая обеспечивает его эффективную и безопасную работу.
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

export default Protsentryupravleniya;
