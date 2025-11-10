import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Users, Info } from "lucide-react";

const Ty214 = () => {
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
          <span>Ту-214</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Каковы Ту-214 и с чем они летят</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Ту-214 — это российский среднемагистральный пассажирский самолёт, разработанный КБ Туполева. Это современная модификация самолёта Ту-204, предназначенная для перевозки пассажиров на средние расстояния.
              </p>
              <p className="text-base leading-relaxed">
                Ту-214 представляет собой развитие успешного семейства самолётов Ту-204/214, сочетая проверенную конструкцию с современными технологиями и улучшенными характеристиками.
              </p>
            </CardContent>
          </Card>

          {/* Характеристики */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Характеристики Ту-214</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ту-214 обладает характеристиками, которые делают его подходящим для среднемагистральных перелётов.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Вместимость: до 210 пассажиров</li>
                    <li>Дальность полёта: до 6500 км</li>
                    <li>Современные двигатели ПС-90А</li>
                    <li>Соответствие международным стандартам безопасности</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Эти характеристики позволяют Ту-214 эффективно работать на внутренних и международных маршрутах средней дальности.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Двигатели ПС-90А */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Двигатели ПС-90А</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ту-214 оснащён двигателями ПС-90А, которые обеспечивают высокую тягу, экономичность и соответствие современным экологическим стандартам.
                </p>
                <p className="text-base leading-relaxed">
                  Эти двигатели разработаны специально для самолётов семейства Ту-204/214 и обеспечивают надёжную работу в различных условиях эксплуатации.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Комфорт пассажиров */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Комфорт пассажиров</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ту-214 обеспечивает комфортные условия для пассажиров. Салон спроектирован с учётом современных требований к комфорту, с удобными креслами и достаточным пространством.
                </p>
                <p className="text-base leading-relaxed">
                  Современные системы кондиционирования, освещения и развлечений делают полёт на Ту-214 приятным и комфортным.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Безопасность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Безопасность</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ту-214 соответствует всем международным стандартам безопасности и имеет необходимые сертификаты для эксплуатации на внутренних и международных маршрутах.
                </p>
                <p className="text-base leading-relaxed">
                  Самолёт оснащён современными системами безопасности, включая системы предотвращения столкновений, предупреждения о сдвиге ветра и другие важные системы.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Применение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Применение Ту-214</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ту-214 используется российскими авиакомпаниями на внутренних и международных маршрутах средней дальности. Он подходит для перевозки пассажиров на расстояния до 6500 км.
                </p>
                <p className="text-base leading-relaxed">
                  Самолёт эффективно работает на маршрутах между крупными городами, обеспечивая надёжное и комфортное сообщение.
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

export default Ty214;
