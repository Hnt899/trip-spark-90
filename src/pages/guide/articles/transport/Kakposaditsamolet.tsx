import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Settings, AlertCircle, Info } from "lucide-react";

const Kakposaditsamolet = () => {
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
          <span>Как посадить самолёт</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как посадить самолёт</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Посадка самолёта — это один из самых сложных и ответственных этапов полёта. Требует высокой квалификации пилотов, точного выполнения всех процедур и координации с диспетчерской службой.
              </p>
              <p className="text-base leading-relaxed">
                От качества посадки зависит безопасность пассажиров и сохранность самолёта. Пилоты проходят специальную подготовку для выполнения посадок в различных условиях.
              </p>
            </CardContent>
          </Card>

          {/* Этапы посадки */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Этапы посадки</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Посадка самолёта состоит из нескольких этапов, каждый из которых требует точного выполнения.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Заход на посадку по установленному глиссаде</li>
                    <li>Снижение скорости и выпуск шасси и закрылков</li>
                    <li>Выравнивание перед касанием</li>
                    <li>Касание посадочной полосы</li>
                    <li>Торможение и пробег по полосе</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Каждый этап критически важен, и ошибка на любом из них может привести к серьёзным последствиям.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Заход на посадку */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Заход на посадку</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Заход на посадку начинается с получения разрешения от диспетчера и выхода на установленный маршрут захода. Самолёт следует по глиссаде — воображаемой линии снижения, которая ведёт к посадочной полосе.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Пилоты используют навигационные системы и визуальные ориентиры для точного следования по глиссаде. Отклонение от глиссады может привести к неправильной посадке.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Глиссада обеспечивает безопасный угол снижения, который позволяет самолёту плавно приблизиться к посадочной полосе.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Подготовка к посадке */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Подготовка к посадке</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Во время снижения пилоты готовят самолёт к посадке: снижают скорость, выпускают шасси и закрылки, проверяют все системы.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Выпуск шасси</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Шасси выпускается на определённой высоте и скорости. Пилоты проверяют, что шасси выпущено и зафиксировано перед посадкой.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Выпуск закрылков</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Закрылки увеличивают подъёмную силу и сопротивление, позволяя самолёту лететь медленнее при сохранении управляемости.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Снижение скорости</h3>
                    <p className="text-base leading-relaxed">
                      Скорость снижается до посадочной, которая зависит от типа самолёта и условий посадки. Правильная скорость критически важна для безопасной посадки.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Выравнивание и касание */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Выравнивание и касание</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  На небольшой высоте над полосой пилоты выравнивают самолёт, переводя его из режима снижения в горизонтальный полёт. Это один из самых сложных моментов посадки.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  После выравнивания самолёт плавно снижается и касается посадочной полосы. Касание должно быть мягким, с правильным углом атаки и скоростью.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Качество касания влияет на безопасность посадки. Жёсткое касание может повредить самолёт и создать дискомфорт для пассажиров.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Торможение и пробег */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Торможение и пробег</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  После касания пилоты используют различные системы торможения для остановки самолёта: колёсные тормоза, реверс тяги двигателей, спойлеры.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Торможение должно быть эффективным, но плавным, чтобы не создать дискомфорт для пассажиров и не повредить колёса и тормозную систему.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    Длина пробега зависит от скорости касания, состояния полосы, погодных условий и эффективности торможения. Пилоты рассчитывают необходимую длину пробега заранее.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Посадка в сложных условиях */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Посадка в сложных условиях</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Посадка в сложных условиях — при плохой видимости, сильном ветре, на мокрой или обледеневшей полосе — требует особых навыков и осторожности.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  В таких условиях пилоты используют специальные процедуры и системы, такие как автоматическая посадка, системы предупреждения о сдвиге ветра и другие.
                </p>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> В очень сложных условиях пилоты могут принять решение уйти на второй круг и попробовать посадку снова или направиться на запасной аэродром.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Координация с диспетчером */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Координация с диспетчером</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  На протяжении всего захода на посадку пилоты поддерживают связь с диспетчером, получая инструкции по высоте, скорости, курсу и получая разрешение на посадку.
                </p>
                <p className="text-base leading-relaxed">
                  Диспетчер координирует движение всех самолётов в зоне аэропорта, обеспечивая безопасные интервалы и предотвращая конфликты. Его инструкции обязательны для выполнения.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Важность правильной посадки */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Важность правильной посадки</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Правильная посадка — это не просто техническое выполнение процедуры, а критически важный элемент безопасности полёта. От качества посадки зависит безопасность пассажиров и сохранность самолёта.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Пилоты проходят специальную подготовку для выполнения посадок в различных условиях, регулярно тренируются на тренажёрах и проходят проверки квалификации.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Вывод:</strong> Посадка самолёта — это сложный и ответственный процесс, требующий высокой квалификации, точности и координации. От качества посадки зависит безопасность всех на борту.
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

export default Kakposaditsamolet;
