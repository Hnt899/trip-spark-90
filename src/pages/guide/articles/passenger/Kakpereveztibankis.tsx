import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Plane, Train, AlertCircle, CheckCircle } from "lucide-react";

const Kakpereveztibankis = () => {
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
          <span>Как перевезти банки с закатками?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как перевезти банки с домашними консервами?</h1>

        <div className="space-y-8">
          {/* Упаковка */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Правильная упаковка</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Как упаковать</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Оберните каждую банку в мягкую ткань или бумагу</li>
                    <li>Положите банки вертикально в коробку</li>
                    <li>Заполните пустое пространство мягким материалом (одежда, бумага)</li>
                    <li>Банки не должны касаться друг друга</li>
                    <li>Используйте прочную коробку с жесткими стенками</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Банки должны быть плотно закручены и не протекать. Проверьте банки перед упаковкой.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

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
                  <h3 className="text-xl font-semibold mb-3">Багаж</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Банки можно провозить в багаже</li>
                    <li>Упакуйте их очень тщательно, так как багаж могут бросать</li>
                    <li>Учитывайте вес банок при расчете багажа</li>
                    <li>Ограничений по количеству банок обычно нет (в разумных пределах)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Ручная кладь</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Жидкости в банках могут быть ограничены нормами ручной клади</li>
                    <li>Лучше провозить в багаже</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Международные перелеты:</strong> При перелетах за границу могут быть ограничения на ввоз продуктов. Уточните правила таможни.
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
                  В поезде перевезти банки проще:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Можно взять с собой в вагон</li>
                  <li>Банки должны быть хорошо упакованы</li>
                  <li>Не забывайте про вес — учитывайте нормы провоза багажа</li>
                  <li>Храните банки в безопасном месте, чтобы они не разбились</li>
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
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Проверьте банки</p>
                    <p className="text-sm text-muted-foreground">
                      Убедитесь, что банки плотно закручены и не протекают перед упаковкой.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Таможня</p>
                    <p className="text-sm text-muted-foreground">
                      При международных поездках узнайте правила ввоза продуктов в страну назначения.
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

export default Kakpereveztibankis;
