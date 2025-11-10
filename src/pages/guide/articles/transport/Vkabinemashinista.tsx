import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Settings, Eye, Info } from "lucide-react";

const Vkabinemashinista = () => {
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
          <span>В кабине машиниста</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что находится в кабине машиниста поезда</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Кабина машиниста — это командный центр поезда, где сосредоточены все системы управления и контроля. Современные кабины оборудованы множеством приборов, экранов и систем безопасности.
              </p>
              <p className="text-base leading-relaxed">
                От работы машиниста и состояния оборудования в кабине зависит безопасность движения поезда и комфорт пассажиров. Кабина — это место, где принимаются все ключевые решения во время движения.
              </p>
            </CardContent>
          </Card>

          {/* Оборудование кабины */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Оборудование кабины</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  В кабине машиниста находятся: пульт управления, системы контроля скорости, радиосвязь, экраны мониторинга систем поезда, системы безопасности и аварийного торможения.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Основные элементы оборудования:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Пульт управления локомотивом</li>
                    <li>Контроллер скорости и тяги</li>
                    <li>Системы радиосвязи</li>
                    <li>Мониторы состояния систем</li>
                    <li>Приборы контроля давления и температуры</li>
                    <li>Системы безопасности и сигнализации</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Пульт управления */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Пульт управления</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Пульт управления — это центральный элемент кабины, где расположены все основные органы управления локомотивом. Машинист использует его для управления скоростью, торможением и другими системами.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Контроллер машиниста</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Основной орган управления, с помощью которого машинист регулирует скорость и тягу локомотива. Поворот контроллера увеличивает или уменьшает мощность двигателя.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Тормозной кран</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Устройство для управления тормозной системой поезда. Машинист может плавно или экстренно затормозить состав в зависимости от ситуации.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Переключатели и кнопки</h3>
                    <p className="text-base leading-relaxed">
                      Множество переключателей и кнопок для управления различными системами локомотива: освещение, отопление, вентиляция, системы безопасности и другие.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Системы безопасности */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Системы безопасности</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Безопасность — приоритет номер один в работе железных дорог. В кабине машиниста установлены многочисленные системы, обеспечивающие безопасность движения.
                </p>
                <div className="space-y-3">
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Система автоматической остановки</p>
                    <p className="text-sm leading-relaxed">
                      Если машинист не реагирует на сигналы или не нажимает кнопку бдительности, система автоматически останавливает поезд для предотвращения аварии.
                    </p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Сигнализация и предупреждения</p>
                    <p className="text-sm leading-relaxed">
                      Системы сигнализации предупреждают машиниста о различных ситуациях: превышение скорости, проблемы с оборудованием, сигналы светофоров и другие.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Системы контроля скорости</p>
                    <p className="text-sm leading-relaxed">
                      Автоматические системы контролируют скорость движения и могут автоматически снижать её при превышении допустимых значений или приближении к опасным участкам.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Связь и коммуникация */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Связь и коммуникация</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Машинист должен постоянно поддерживать связь с диспетчерскими службами, другими поездами и персоналом состава. Для этого в кабине установлены различные системы связи.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Системы связи:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Радиосвязь с диспетчером</li>
                    <li>Связь с начальником поезда</li>
                    <li>Связь с другими локомотивами</li>
                    <li>Системы оповещения пассажиров</li>
                    <li>Экстренная связь</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Эргономика и комфорт */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Эргономика и комфорт</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Современные кабины машиниста проектируются с учётом эргономики и комфорта. Машинист проводит в кабине много часов, поэтому важно обеспечить удобные условия работы.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Кресло машиниста регулируется по высоте и наклону, все органы управления расположены в пределах досягаемости, освещение настроено для комфортной работы в любое время суток.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Комфортные условия работы машиниста напрямую влияют на безопасность движения. Усталость и дискомфорт могут снизить концентрацию и реакцию.
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

export default Vkabinemashinista;
