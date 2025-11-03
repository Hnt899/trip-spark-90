import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Luggage, AlertCircle, DollarSign, Package, Plane, Train } from "lucide-react";

const Ruchnayakladbolshenormy = () => {
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
          <span>Ручная кладь больше нормы?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что делать, если ручная кладь больше нормы?</h1>

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
                  <h3 className="text-xl font-semibold mb-3">Нормы ручной клади</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Размеры и вес ручной клади зависят от авиакомпании и тарифа. Обычно это:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li><strong>Размеры:</strong> до 55×40×20 см или сумма трех измерений до 115 см</li>
                    <li><strong>Вес:</strong> от 5 до 10 кг в зависимости от авиакомпании</li>
                    <li><strong>Количество:</strong> обычно одна единица ручной клади</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Если ручная кладь превышает норму</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Можно сдать излишки в багаж (за дополнительную плату)</li>
                    <li>Оплатить доплату за превышение веса или размера ручной клади</li>
                    <li>Переместить часть вещей в зарегистрированный багаж (если он еще не сдан)</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Проверьте нормы ручной клади на сайте авиакомпании заранее. Штрафы за превышение нормы могут быть очень высокими.
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
                <div>
                  <h3 className="text-xl font-semibold mb-3">Нормы провоза ручной клади</h3>
                  <p className="text-base leading-relaxed mb-3">
                    В поездах обычно разрешается провозить ручную кладь:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li><strong>Вес:</strong> до 36 кг на взрослого пассажира</li>
                    <li><strong>Размеры:</strong> сумма трех измерений до 180 см</li>
                    <li>Ручная кладь должна размещаться на полке или под сиденьем</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Если ручная кладь превышает норму</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Можно сдать излишки в багажный вагон (за дополнительную плату)</li>
                    <li>Оплатить доплату за провоз сверхнормативного багажа</li>
                    <li>Разместить вещи в проходе, если это не мешает другим пассажирам (с разрешения проводника)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Полезные советы */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные советы</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Взвесьте и измерьте заранее</p>
                    <p className="text-sm text-muted-foreground">
                      Перед поездкой проверьте вес и размеры ручной клади, чтобы избежать неожиданностей в аэропорту или на вокзале.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Узнайте о доплатах заранее</p>
                    <p className="text-sm text-muted-foreground">
                      Стоимость доплаты за превышение нормы обычно ниже при оплате заранее через сайт перевозчика.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Оптимизируйте багаж</p>
                    <p className="text-sm text-muted-foreground">
                      Распределите вещи между ручной кладью и зарегистрированным багажом наиболее оптимальным образом.
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

export default Ruchnayakladbolshenormy;
