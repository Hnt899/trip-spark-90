import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, Clipboard, AlertCircle } from "lucide-react";

const Ekipazhperedvyletom = () => {
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
          <span>Экипаж перед вылетом</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как экипаж самолёта готовится к вылету</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Подготовка к вылету — это комплексный процесс, который начинается за несколько часов до отправления рейса. Экипаж выполняет множество проверок и процедур, чтобы обеспечить безопасность полёта.
              </p>
              <p className="text-base leading-relaxed">
                От качества подготовки экипажа зависит безопасность полёта и комфорт пассажиров. Каждый этап подготовки тщательно проработан и обязателен для выполнения.
              </p>
            </CardContent>
          </Card>

          {/* Подготовка экипажа */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Подготовка экипажа</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Подготовка экипажа начинается задолго до вылета и включает множество важных этапов.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Брифинг экипажа</p>
                      <p className="text-sm text-muted-foreground">
                        Обсуждение маршрута, погоды, особенностей полёта, распределение обязанностей между членами экипажа
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Изучение метеорологических условий</p>
                      <p className="text-sm text-muted-foreground">
                        Анализ прогноза погоды на маршруте, оценка условий взлёта и посадки, возможных опасных явлений
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Проверка технического состояния самолёта</p>
                      <p className="text-sm text-muted-foreground">
                        Изучение технической документации, проверка результатов предварительного осмотра самолёта техническими службами
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Координация с наземными службами</p>
                      <p className="text-sm text-muted-foreground">
                        Согласование деталей с диспетчерскими службами, службами аэропорта, техническими службами
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Проверки перед вылетом */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clipboard className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Проверки перед вылетом</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Пилоты выполняют тщательную проверку всех систем самолёта, изучают документацию, проверяют запас топлива, координацию с диспетчерами и готовятся к выполнению полётного задания.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Предполётный осмотр</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Пилоты лично осматривают самолёт снаружи, проверяя состояние фюзеляжа, крыльев, двигателей, шасси и других важных элементов.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Проверка систем в кабине</h3>
                    <p className="text-base leading-relaxed mb-2">
                      В кабине пилоты проверяют работу всех систем: навигации, связи, управления, двигателей, топливной системы и других критически важных систем.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Расчёт полётных данных</h3>
                    <p className="text-base leading-relaxed">
                      Пилоты рассчитывают необходимые данные для полёта: количество топлива, вес и центровка самолёта, взлётные и посадочные скорости, маршрут полёта.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Брифинг экипажа */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Брифинг экипажа</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Брифинг экипажа — это важная часть подготовки, на которой обсуждаются все детали предстоящего полёта.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Темы брифинга:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Маршрут полёта и альтернативные маршруты</li>
                    <li>Метеорологические условия</li>
                    <li>Особенности аэропортов вылета и назначения</li>
                    <li>Распределение обязанностей в экипаже</li>
                    <li>Действия в нештатных ситуациях</li>
                    <li>Особенности самолёта и его систем</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Брифинг обеспечивает, что все члены экипажа понимают задачу и готовы к её выполнению. Это важный элемент безопасности полёта.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Работа бортпроводников */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Подготовка бортпроводников</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Бортпроводники также проходят подготовку перед вылетом. Они проверяют салон самолёта, аварийное оборудование, готовят всё необходимое для обслуживания пассажиров.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Бортпроводники проходят специальную подготовку по безопасности и действиям в аварийных ситуациях. Они готовы оказать помощь пассажирам в любой ситуации.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Финальные проверки */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Финальные проверки</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Перед вылетом экипаж выполняет финальные проверки всех систем и готовности к полёту. Только после подтверждения готовности всех систем самолёт получает разрешение на вылет.
                </p>
                <p className="text-base leading-relaxed">
                  Все эти процедуры направлены на обеспечение максимальной безопасности полёта. Каждый этап подготовки важен и не может быть пропущен.
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

export default Ekipazhperedvyletom;
