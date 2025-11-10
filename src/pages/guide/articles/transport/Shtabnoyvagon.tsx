import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Building2, Users, Info, Settings } from "lucide-react";

const Shtabnoyvagon = () => {
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
          <span>Штабной вагон</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Штабной вагон: офис внутри состава</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Штабной вагон — это специальный вагон, оборудованный как офисное пространство для руководства и обслуживающего персонала поезда. В нём размещаются рабочие места для начальника поезда, механиков и других специалистов.
              </p>
              <p className="text-base leading-relaxed">
                Этот вагон играет важную роль в обеспечении бесперебойной работы поезда в пути, позволяя персоналу решать оперативные вопросы, координировать работу и поддерживать связь с диспетчерскими службами.
              </p>
            </CardContent>
          </Card>

          {/* Назначение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Назначение штабного вагона</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  В штабном вагоне размещаются рабочие места для управления составом, решения технических вопросов и координации работы поезда в пути.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Этот вагон служит центром управления поездом, где начальник поезда и другие специалисты могут работать, принимать решения и координировать действия персонала.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Основные функции штабного вагона:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Рабочее место начальника поезда</li>
                    <li>Координация работы персонала</li>
                    <li>Решение технических вопросов</li>
                    <li>Связь с диспетчерскими службами</li>
                    <li>Ведение документации</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Оборудование */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Оборудование штабного вагона</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Штабной вагон оборудован всем необходимым для эффективной работы персонала. В нём есть рабочие столы, средства связи, компьютеры и другое оборудование.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Рабочие места</h3>
                    <p className="text-base leading-relaxed mb-2">
                      В вагоне оборудованы удобные рабочие места для начальника поезда, механиков и других специалистов. Каждое рабочее место оснащено необходимым оборудованием.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Средства связи</h3>
                    <p className="text-base leading-relaxed mb-2">
                      В штабном вагоне установлены системы радиосвязи для связи с локомотивной бригадой, диспетчерскими службами и другими подразделениями железной дороги.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Документация</h3>
                    <p className="text-base leading-relaxed">
                      В вагоне хранится необходимая документация, техническая литература и справочные материалы, которые могут понадобиться в пути.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Кто работает в штабном вагоне */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Кто работает в штабном вагоне</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  В штабном вагоне работают специалисты, отвечающие за различные аспекты работы поезда.
                </p>
                <div className="space-y-3">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Начальник поезда</p>
                    <p className="text-sm leading-relaxed">
                      Главный руководитель состава, отвечающий за общую организацию работы поезда, безопасность пассажиров и координацию действий персонала.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Механики</p>
                    <p className="text-sm leading-relaxed">
                      Специалисты, отвечающие за техническое состояние вагонов, решение технических проблем и обеспечение работоспособности оборудования.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Другие специалисты</p>
                    <p className="text-sm leading-relaxed">
                      В зависимости от типа поезда и маршрута, в штабном вагоне могут работать и другие специалисты, необходимые для обеспечения работы поезда.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Важность штабного вагона */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Важность штабного вагона</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Штабной вагон играет ключевую роль в обеспечении эффективной работы поезда. Он позволяет персоналу быстро реагировать на возникающие ситуации и координировать действия.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Наличие штабного вагона особенно важно на длительных маршрутах, где могут возникать различные ситуации, требующие оперативного вмешательства и принятия решений.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Штабной вагон обеспечивает непрерывность управления поездом в пути, что способствует безопасности, комфорту пассажиров и эффективности перевозок.
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

export default Shtabnoyvagon;
