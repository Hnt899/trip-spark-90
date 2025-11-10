import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Plane, Zap, Info, Clock } from "lucide-react";

const Aeroekspress = () => {
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
          <span>Аэроэкспресс</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как устроен Аэроэкспресс</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Аэроэкспресс — это скоростные поезда, соединяющие аэропорты с центральными частями городов. Это удобный и быстрый способ добраться до аэропорта, избегая пробок на дорогах.
              </p>
              <p className="text-base leading-relaxed">
                Аэроэкспрессы работают по специальным расписаниям, синхронизированным с расписанием авиарейсов, и обеспечивают комфортную поездку для пассажиров с багажом.
              </p>
            </CardContent>
          </Card>

          {/* Особенности */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Особенности Аэроэкспресса</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Аэроэкспресс специально спроектирован для перевозки пассажиров между аэропортами и городами. Все его особенности направлены на обеспечение комфорта и удобства для путешественников.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Прямое сообщение между аэропортом и городом</li>
                    <li>Минимальное количество остановок</li>
                    <li>Специальные места для багажа</li>
                    <li>Комфортные вагоны</li>
                    <li>Частое расписание движения</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Аэроэкспресс позволяет добраться до аэропорта быстро и без стресса, что особенно важно для пассажиров, которые спешат на рейс или устали после длительного перелёта.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Преимущества */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Преимущества Аэроэкспресса</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Скорость</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Аэроэкспресс движется по выделенным путям без остановок на промежуточных станциях, что позволяет быстро добраться до аэропорта. Время в пути обычно составляет 30-45 минут.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Надёжность</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Аэроэкспресс не зависит от пробок на дорогах и работает по расписанию, что делает его более надёжным способом добраться до аэропорта, чем автомобиль или такси.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Комфорт</h3>
                    <p className="text-base leading-relaxed">
                      Вагоны Аэроэкспресса специально оборудованы для пассажиров с багажом. Есть просторные места для сумок, удобные кресла и современные удобства.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Расписание и синхронизация */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Расписание и синхронизация</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Расписание Аэроэкспресса синхронизировано с расписанием авиарейсов, что позволяет пассажирам удобно планировать поездку. Поезда отправляются часто, обычно каждые 30-60 минут.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  В часы пик, когда много рейсов, частота движения увеличивается. Это обеспечивает возможность добраться до аэропорта вовремя, даже если вы немного опоздали на предыдущий поезд.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Совет:</strong> Расписание Аэроэкспресса обычно доступно на сайте аэропорта и в мобильных приложениях. Рекомендуется проверить расписание заранее, чтобы спланировать поездку.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Удобства для пассажиров */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Удобства для пассажиров</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Аэроэкспресс оборудован всем необходимым для комфортной поездки пассажиров с багажом.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Удобства в вагонах:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Просторные места для багажа</li>
                    <li>Удобные кресла с достаточным пространством</li>
                    <li>Розетки для зарядки устройств</li>
                    <li>Wi-Fi (в некоторых поездах)</li>
                    <li>Информационные табло</li>
                    <li>Туалеты</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Все эти удобства делают поездку на Аэроэкспрессе приятной и комфортной, позволяя пассажирам отдохнуть перед полётом или после него.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Где работает Аэроэкспресс */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Где работает Аэроэкспресс</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Аэроэкспрессы работают в крупных городах, где есть международные аэропорты. В России Аэроэкспрессы связывают аэропорты с центральными вокзалами в Москве, Санкт-Петербурге и других городах.
                </p>
                <p className="text-base leading-relaxed">
                  Такие маршруты особенно популярны в крупных мегаполисах, где дорога до аэропорта на автомобиле может занять много времени из-за пробок. Аэроэкспресс предлагает быструю и надёжную альтернативу.
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

export default Aeroekspress;
