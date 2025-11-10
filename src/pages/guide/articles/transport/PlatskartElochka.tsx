import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, TreePine, Bed, Info } from "lucide-react";

const PlatskartElochka = () => {
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
          <span>Плацкарт-ёлочка</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Плацкарт-ёлочка: необычная планировка вагона</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                «Плацкарт-ёлочка» — это неофициальное название плацкартных вагонов с особой планировкой мест, где места расположены под углом, напоминая ветви ёлки. Такая планировка применяется для более эффективного использования пространства вагона.
              </p>
              <p className="text-base leading-relaxed">
                В таких вагонах места расположены не параллельно оси вагона, а под определённым углом, что создаёт интересный визуальный эффект и несколько изменяет ощущения от поездки.
              </p>
            </CardContent>
          </Card>

          {/* Особенности планировки */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TreePine className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Особенности планировки</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Планировка «ёлочка» позволяет более эффективно использовать пространство вагона, размещая больше мест при сохранении комфорта пассажиров.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  В отличие от традиционной планировки, где все места расположены параллельно продольной оси вагона, в «ёлочке» места развёрнуты под углом, обычно около 30-45 градусов. Это создаёт визуальный эффект, напоминающий ветви новогодней ёлки.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Преимущества планировки «ёлочка»:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Более эффективное использование пространства вагона</li>
                    <li>Улучшенная эргономика размещения мест</li>
                    <li>Возможность разместить больше мест без потери комфорта</li>
                    <li>Интересный визуальный эффект</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* История появления */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">История появления</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Планировка «ёлочка» появилась как инновационное решение для оптимизации использования пространства в плацкартных вагонах. Эта концепция была разработана для того, чтобы максимально эффективно использовать каждый квадратный метр вагона.
                </p>
                <p className="text-base leading-relaxed">
                  Такая планировка применяется в различных моделях вагонов и позволяет перевозить больше пассажиров при сохранении приемлемого уровня комфорта. Несмотря на необычный вид, эта планировка хорошо зарекомендовала себя на практике.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ощущения пассажиров */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bed className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Ощущения пассажиров</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Поездка в вагоне с планировкой «ёлочка» может показаться необычной для тех, кто привык к традиционным плацкартным вагонам. Угловое расположение мест создаёт несколько иное ощущение пространства.
                </p>
                <div className="space-y-3">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Положительные стороны:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>Более интересное визуальное восприятие пространства</li>
                      <li>Возможность лучше видеть происходящее в вагоне</li>
                      <li>Улучшенная циркуляция воздуха благодаря угловому расположению</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Особенности:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>Может потребоваться время для привыкания к необычной планировке</li>
                      <li>Некоторые пассажиры отмечают, что угловое расположение создаёт ощущение большего пространства</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Где встречаются */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Train className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Где встречаются вагоны «ёлочка»</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Вагоны с планировкой «ёлочка» можно встретить на различных маршрутах дальнего следования. Они используются в составе поездов разных категорий и направлений.
                </p>
                <p className="text-base leading-relaxed">
                  Эта планировка применяется как в новых, так и в модернизированных вагонах. При покупке билета можно уточнить тип планировки вагона, чтобы знать, чего ожидать от поездки.
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

export default PlatskartElochka;
