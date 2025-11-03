import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Flower, Plane, Train, AlertCircle, CheckCircle } from "lucide-react";

const Kakpereveztibuket = () => {
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
          <Link to="/guide" className="hover:text-primary">Полезно пассажиру</Link>
          <span>/</span>
          <span>Как перевезти букет цветов?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как перевезти букет цветов?</h1>

        <div className="space-y-8">
          {/* В самолёте */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">В самолёте</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Ручная кладь</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Букет можно провозить в ручной клади</li>
                    <li>Букет должен соответствовать нормам размера ручной клади</li>
                    <li>Обратите внимание, что цветы могут завянуть во время долгого перелета</li>
                    <li>При длительных перелетах лучше упаковать цветы</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">Багаж</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Цветы в багаже могут повредиться</li>
                    <li>Низкая температура и давление могут испортить цветы</li>
                    <li>Не рекомендуется провозить в багаже</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> При международных перелетах могут быть ограничения на ввоз растений и цветов. Уточните правила страны назначения.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* В поезде */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">В поезде</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  В поезде перевезти букет проще:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Можно взять букет с собой в вагон</li>
                  <li>Поставьте букет в воду, если поездка долгая</li>
                  <li>Берегите от прямых солнечных лучей</li>
                  <li>Убедитесь, что букет не мешает другим пассажирам</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Советы */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные советы</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Flower className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Упаковка</p>
                    <p className="text-sm text-muted-foreground">
                      Для длительных поездок оберните букет во влажную бумагу или ткань, чтобы сохранить свежесть.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Альтернатива</p>
                    <p className="text-sm text-muted-foreground">
                      Рассмотрите возможность заказа цветов в пункте назначения вместо перевозки букета.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Таможня</p>
                    <p className="text-sm text-muted-foreground">
                      При международных перелетах уточните правила ввоза цветов в страну назначения.
                    </p>
                  </div>
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

export default Kakpereveztibuket;
