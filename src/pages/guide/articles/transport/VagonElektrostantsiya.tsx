import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Zap, Battery, Info, Settings } from "lucide-react";

const VagonElektrostantsiya = () => {
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
          <span>Вагон-электростанция</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Новый вагон-электростанция</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Вагон-электростанция — это специальный вагон, который служит источником электроэнергии для других вагонов в составе. Он может генерировать или преобразовывать энергию для питания систем вагонов, особенно в случаях, когда локомотив не может обеспечить достаточное электропитание.
              </p>
              <p className="text-base leading-relaxed">
                Этот вагон играет важную роль в обеспечении надёжности работы поезда, предоставляя резервный или дополнительный источник энергии для всех систем вагонов.
              </p>
            </CardContent>
          </Card>

          {/* Назначение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Назначение вагона-электростанции</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Вагон-электростанция обеспечивает резервное или дополнительное электропитание для вагонов поезда, гарантируя работу всех систем даже при проблемах с основным источником энергии.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  В обычных условиях вагоны получают электроэнергию от локомотива. Однако в некоторых ситуациях этого может быть недостаточно, и тогда в работу вступает вагон-электростанция.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Основные функции:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Резервное электропитание</li>
                    <li>Дополнительное питание при высокой нагрузке</li>
                    <li>Обеспечение работы систем при остановке локомотива</li>
                    <li>Поддержание работы критически важных систем</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Когда используется */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Battery className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Когда используется вагон-электростанция</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Вагон-электростанция включается в работу в различных ситуациях, когда основного источника энергии недостаточно или он недоступен.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Длительные стоянки</h3>
                    <p className="text-base leading-relaxed mb-2">
                      При длительных стоянках поезда, когда локомотив может быть отцеплен или выключен, вагон-электростанция обеспечивает питание систем вагонов.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Высокая нагрузка</h3>
                    <p className="text-base leading-relaxed mb-2">
                      В поездах с большим количеством вагонов или высоким энергопотреблением вагон-электростанция может работать параллельно с локомотивом, обеспечивая дополнительную мощность.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Аварийные ситуации</h3>
                    <p className="text-base leading-relaxed">
                      В случае проблем с основным источником питания вагон-электростанция обеспечивает работу критически важных систем до устранения проблемы.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Технические особенности */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Технические особенности</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Вагон-электростанция оснащён генератором или преобразователем энергии, который может работать от различных источников: дизельного двигателя, аккумуляторов или других источников энергии.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Современные вагоны-электростанции используют эффективные и экологичные технологии генерации энергии, обеспечивая надёжное питание при минимальном воздействии на окружающую среду.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Вагон-электростанция должен быть способен обеспечить достаточную мощность для всех систем вагонов, включая отопление, освещение, вентиляцию и другие системы.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Преимущества */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Преимущества вагона-электростанции</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Наличие вагона-электростанции в составе поезда даёт множество преимуществ, повышая надёжность и комфорт поездки.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Основные преимущества:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Повышенная надёжность электропитания</li>
                    <li>Независимость от локомотива при стоянках</li>
                    <li>Возможность работы при высоких нагрузках</li>
                    <li>Резервный источник энергии</li>
                    <li>Обеспечение комфорта пассажиров в любых условиях</li>
                  </ul>
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

export default VagonElektrostantsiya;
