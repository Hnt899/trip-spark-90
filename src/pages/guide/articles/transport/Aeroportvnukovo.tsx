import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Building2, MapPin, Info } from "lucide-react";

const Aeroportvnukovo = () => {
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
          <span>Аэропорт Внуково</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как работает аэропорт Внуково</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Аэропорт Внуково — один из крупнейших аэропортов России, обслуживающий миллионы пассажиров ежегодно. Это сложный организм, в котором множество служб и систем работают круглосуточно для обеспечения безопасных и комфортных перелётов.
              </p>
              <p className="text-base leading-relaxed">
                Внуково — это не просто место, где взлетают и садятся самолёты, а целый комплекс служб, систем и инфраструктуры, которые работают слаженно для обеспечения эффективной работы аэропорта.
              </p>
            </CardContent>
          </Card>

          {/* Основные службы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Основные службы аэропорта</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Работа аэропорта обеспечивается множеством служб, каждая из которых выполняет свою важную функцию.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Служба безопасности и досмотра</li>
                    <li>Регистрация пассажиров и багажа</li>
                    <li>Служба управления воздушным движением</li>
                    <li>Метеорологическая служба</li>
                    <li>Служба технического обслуживания самолётов</li>
                    <li>Медицинская служба</li>
                    <li>Кинологическая служба</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Все эти службы работают круглосуточно, обеспечивая непрерывную работу аэропорта и безопасность пассажиров.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Терминалы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Терминалы и инфраструктура</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Аэропорт Внуково имеет несколько терминалов, каждый из которых обслуживает определённые направления и авиакомпании. Инфраструктура включает взлётно-посадочные полосы, рулёжные дорожки, места стоянки самолётов, грузовые терминалы и многое другое.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Каждый терминал оборудован всем необходимым для комфортного обслуживания пассажиров: стойками регистрации, зонами досмотра, залами ожидания, магазинами, кафе и другими удобствами.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> При планировании поездки уточните, из какого терминала отправляется ваш рейс, так как терминалы могут находиться на значительном расстоянии друг от друга.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Управление воздушным движением */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Управление воздушным движением</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Диспетчеры управления воздушным движением координируют взлёты и посадки самолётов, обеспечивая безопасность и эффективность работы аэропорта. Это одна из самых ответственных служб аэропорта.
                </p>
                <p className="text-base leading-relaxed">
                  Диспетчеры работают в диспетчерской вышке и используют современные системы радиолокации и связи для управления движением самолётов в зоне аэропорта.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Безопасность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Безопасность в аэропорту</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Безопасность — приоритет номер один в работе аэропорта. Служба безопасности использует современные технологии досмотра, кинологическую службу и другие методы для обеспечения безопасности пассажиров и грузов.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Все пассажиры и их багаж проходят обязательный досмотр перед посадкой на рейс. Это необходимо для предотвращения проноса опасных предметов на борт самолёта.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Совет:</strong> Приезжайте в аэропорт заранее, чтобы успеть пройти все процедуры досмотра и регистрации без спешки. Рекомендуется прибывать за 2-3 часа до вылета для международных рейсов и за 1-2 часа для внутренних.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Удобства для пассажиров */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Удобства для пассажиров</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Аэропорт Внуково предлагает множество удобств для пассажиров, делая ожидание рейса более комфортным.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Удобства в аэропорту:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Магазины и кафе</li>
                    <li>Зоны отдыха</li>
                    <li>Бизнес-залы</li>
                    <li>Wi-Fi</li>
                    <li>Зарядные станции</li>
                    <li>Детские комнаты</li>
                    <li>Медицинская помощь</li>
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

export default Aeroportvnukovo;
