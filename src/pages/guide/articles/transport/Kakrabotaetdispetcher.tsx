import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Radio, Plane, Headphones, AlertCircle, Info } from "lucide-react";

const Kakrabotaetdispetcher = () => {
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
          <span>Как работает диспетчер</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как работает диспетчер</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Авиадиспетчеры — это специалисты, которые управляют движением самолётов в воздушном пространстве. Их работа критически важна для безопасности полётов и требует высокой концентрации, быстрой реакции и глубоких знаний авиационных процедур.
              </p>
              <p className="text-base leading-relaxed">
                От работы диспетчера зависит безопасность тысяч пассажиров ежедневно. Это одна из самых ответственных профессий в авиации, требующая постоянной бдительности и способности принимать решения в условиях высокой нагрузки и стресса.
              </p>
            </CardContent>
          </Card>

          {/* Обязанности диспетчера */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Обязанности диспетчера</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Работа авиадиспетчера включает множество обязанностей, каждая из которых критически важна для безопасности полётов.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Управление движением самолётов в зоне ответственности</li>
                    <li>Координация взлётов и посадок</li>
                    <li>Обеспечение безопасных интервалов между самолётами</li>
                    <li>Мониторинг погодных условий</li>
                    <li>Координация с другими диспетчерскими службами</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Диспетчер должен одновременно отслеживать множество самолётов, предвидеть возможные конфликты и принимать решения, обеспечивающие безопасность всех полётов в его зоне ответственности.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Радиосвязь с экипажами */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Radio className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Радиосвязь с экипажами</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Диспетчер постоянно поддерживает связь с пилотами самолётов, даёт инструкции по высоте, скорости, курсу и маршруту. Все команды передаются через специальную радиосвязь с использованием стандартизированной фразеологии.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Использование стандартизированной фразеологии критически важно для предотвращения недопонимания. Все команды передаются чётко и однозначно, с использованием международных стандартов авиационной связи.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Каждая команда диспетчера должна быть подтверждена пилотом. Это обеспечивает, что инструкции поняты правильно и будут выполнены.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Системы управления воздушным движением */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Системы управления воздушным движением</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Диспетчеры используют сложные компьютерные системы для отслеживания и управления движением самолётов. Эти системы отображают положение всех самолётов в реальном времени.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Радиолокационные системы</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Радиолокаторы отслеживают положение самолётов в воздушном пространстве, отображая их на экранах диспетчеров. Это позволяет видеть все самолёты в зоне ответственности в реальном времени.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Компьютерные системы</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Современные компьютерные системы помогают диспетчерам анализировать траектории полётов, выявлять потенциальные конфликты и предлагать оптимальные решения.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Системы связи</h3>
                    <p className="text-base leading-relaxed">
                      Множество каналов связи обеспечивают надёжную связь с экипажами, другими диспетчерскими службами и наземными службами аэропорта.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Зоны ответственности */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зоны ответственности диспетчеров</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Воздушное пространство разделено на зоны ответственности, каждая из которых контролируется определённой диспетчерской службой. Это позволяет эффективно управлять движением самолётов на всех этапах полёта.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Основные зоны:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Диспетчер вышки — управляет движением в зоне аэропорта</li>
                    <li>Подход — управляет самолётами на этапе захода на посадку</li>
                    <li>Районный центр — управляет движением на маршруте</li>
                    <li>Руление — управляет движением самолётов по земле</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Каждая зона имеет свои особенности и требования. Диспетчеры специализируются на работе в определённых зонах, что позволяет им лучше понимать специфику управления движением в этих условиях.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Безопасность и предотвращение конфликтов */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Безопасность и предотвращение конфликтов</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Главная задача диспетчера — обеспечить безопасность полётов. Это включает предотвращение столкновений самолётов, обеспечение безопасных интервалов и координацию движения в сложных условиях.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Безопасные интервалы</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Диспетчеры обеспечивают минимальные безопасные интервалы между самолётами по вертикали, горизонтали и времени. Эти интервалы зависят от типа самолётов и условий полёта.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Предотвращение конфликтов</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Диспетчеры постоянно анализируют траектории полётов и предвидят возможные конфликты. При обнаружении потенциальной опасности они немедленно принимают меры для её предотвращения.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Действия в нештатных ситуациях</h3>
                    <p className="text-base leading-relaxed">
                      В случае нештатных ситуаций диспетчеры координируют действия всех задействованных служб, обеспечивая безопасность и минимизируя последствия.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Работа в условиях высокой нагрузки */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Работа в условиях высокой нагрузки</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Работа диспетчера требует постоянной концентрации и способности обрабатывать большое количество информации одновременно. В часы пик диспетчер может управлять десятками самолётов одновременно.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Для предотвращения перегрузки и ошибок существуют строгие правила работы: ограничения по времени непрерывной работы, обязательные перерывы, ограничения на количество самолётов, которыми может управлять один диспетчер.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Безопасность всегда важнее скорости. Если нагрузка становится слишком высокой, диспетчер может запросить ограничение количества самолётов в зоне или помощь дополнительных диспетчеров.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Обучение и квалификация */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Обучение и квалификация</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Стать авиадиспетчером непросто. Это требует длительного обучения, сдачи экзаменов и постоянного повышения квалификации.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Базовое обучение</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Обучение включает изучение авиационных правил, метеорологии, навигации, систем управления воздушным движением и множество других дисциплин.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Практическая подготовка</h3>
                    <p className="text-base leading-relaxed mb-2">
                      После теоретического обучения будущие диспетчеры проходят практическую подготовку на тренажёрах и под руководством опытных диспетчеров.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Постоянное обучение</h3>
                    <p className="text-base leading-relaxed">
                      Диспетчеры постоянно проходят переподготовку, изучают новые процедуры и системы, сдают экзамены для подтверждения квалификации.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Координация с другими службами */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Radio className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Координация с другими службами</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Диспетчеры работают в тесной координации с множеством других служб: метеорологическими службами, службами аэропорта, техническими службами, другими диспетчерскими центрами.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Эта координация обеспечивает, что все службы работают слаженно для обеспечения безопасности и эффективности полётов. Информация передаётся быстро и точно.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    Эффективная координация между службами — это ключ к безопасной и эффективной работе авиационной системы. Каждая служба играет свою важную роль.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ответственность и важность работы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Ответственность и важность работы</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Работа авиадиспетчера — это огромная ответственность. От его решений зависит безопасность тысяч людей ежедневно. Одна ошибка может привести к катастрофическим последствиям.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Именно поэтому к диспетчерам предъявляются такие высокие требования: отличное здоровье, способность работать в условиях стресса, быстрая реакция, способность принимать решения в условиях неопределённости.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Вывод:</strong> Авиадиспетчеры — это невидимые герои авиации, которые обеспечивают безопасность полётов каждый день. Их работа требует высочайшего профессионализма и ответственности.
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

export default Kakrabotaetdispetcher;
