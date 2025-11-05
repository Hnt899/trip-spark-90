import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, MapPin, AlertCircle, CheckCircle, Clock } from "lucide-react";

const Kaksestnapromezhutochnoy = () => {
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
          <span>Как сесть на промежуточной станции?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как сесть в поезд на промежуточной станции?</h1>

        <div className="space-y-8">
          {/* Можно ли садиться */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Можно ли садиться на промежуточной станции?</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Да, можно сесть в поезд на любой промежуточной станции, если у вас есть билет до конечной станции или до станции, следующей после пункта посадки.
                </p>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold mb-1">Главное правило:</p>
                      <p className="text-sm leading-relaxed">
                        Вы можете начать поездку с любой промежуточной станции маршрута, указанного в вашем билете. Однако нельзя выйти раньше станции отправления, указанной в билете, или сесть на станции после станции назначения.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Что нужно сделать */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что нужно сделать</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Шаги для посадки на промежуточной станции</h3>
                  <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Убедитесь, что промежуточная станция находится на маршруте вашего билета</li>
                    <li>Придите на станцию к времени прибытия поезда (узнайте расписание)</li>
                    <li>Найдите правильный вагон и место согласно билету</li>
                    <li>Предъявите билет проводнику при посадке</li>
                    <li>Если билет с электронной регистрацией, достаточно предъявить документ, удостоверяющий личность</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Важные нюансы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold">Важные нюансы</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Что важно знать</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Ваше место в поезде сохраняется за вами, даже если вы садитесь на промежуточной станции</li>
                    <li>Если место занято (например, пассажир с другой станции не вышел), обратитесь к проводнику</li>
                    <li>Билет остается действительным, вы просто начинаете поездку не с начальной станции</li>
                    <li>Деньги за непройденный участок пути не возвращаются</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Обратите внимание:</strong> Некоторые поезда имеют ограничения на посадку на промежуточных станциях. Уточните эту информацию заранее в билетной кассе или у перевозчика.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Расписание */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как узнать расписание</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Проверьте расписание на сайте РЖД или TudaSuda</li>
                  <li>Узнайте время прибытия поезда на нужную промежуточную станцию</li>
                  <li>Придите на станцию заранее, чтобы не опоздать</li>
                  <li>Уточните платформу прибытия поезда на информационном табло</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Kaksestnapromezhutochnoy;
