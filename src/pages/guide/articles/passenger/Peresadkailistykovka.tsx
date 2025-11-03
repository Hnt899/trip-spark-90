import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRightLeft, Plane, AlertCircle, CheckCircle, Clock } from "lucide-react";

const Peresadkailistykovka = () => {
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
          <span>Пересадка или стыковка?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">В чём разница между пересадками и стыковкой рейсов?</h1>

        <div className="space-y-8">
          {/* Стыковка */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Стыковка</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Стыковка — это перелет с пересадкой, оформленный одним билетом.
                </p>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Особенности стыковки</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Один билет на весь маршрут</li>
                    <li>Багаж регистрируется до конечного пункта</li>
                    <li>Авиакомпания гарантирует пересадку</li>
                    <li>Если опоздаете на второй рейс, авиакомпания предоставит альтернативу</li>
                    <li>Не нужно проходить таможню и паспортный контроль при международных перелетах</li>
                    <li>Время пересадки обычно уже рассчитано</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Преимущество:</strong> При стыковке вся ответственность за своевременную пересадку лежит на авиакомпании. Если первый рейс задержался и вы опоздали на второй, вам предоставят альтернативный рейс.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Пересадка */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowRightLeft className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Пересадка (отдельные билеты)</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Пересадка — это когда вы покупаете два отдельных билета у разных авиакомпаний или на разные рейсы.
                </p>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Особенности пересадки</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Два или более отдельных билета</li>
                    <li>Багаж нужно забирать и регистрировать заново</li>
                    <li>Нужно пройти таможню и паспортный контроль</li>
                    <li>Вы сами несете ответственность за пересадку</li>
                    <li>Если опоздаете на второй рейс, потеряете деньги</li>
                    <li>Может быть дешевле, чем стыковка</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Риски:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-6">
                    <li>Если первый рейс задержался, вы можете опоздать на второй</li>
                    <li>Авиакомпания второго рейса не обязана ждать вас</li>
                    <li>Придется покупать новый билет за свой счет</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Что выбрать */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что выбрать?</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Выбирайте стыковку, если:</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Цена приемлема</li>
                    <li>Важна надежность пересадки</li>
                    <li>Международный перелет</li>
                    <li>Хотите избежать лишних хлопот</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">Можно выбирать пересадку, если:</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Есть достаточно времени между рейсами (минимум 3-4 часа)</li>
                    <li>Значительно дешевле</li>
                    <li>Готовы рискнуть</li>
                    <li>Планируете остаться в промежуточном городе</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Советы */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные советы</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Время пересадки</p>
                    <p className="text-sm text-muted-foreground">
                      При пересадке с отдельными билетами оставляйте минимум 3-4 часа между рейсами, особенно при международных перелетах.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Страхование</p>
                    <p className="text-sm text-muted-foreground">
                      При пересадке с отдельными билетами рассмотрите возможность страхования поездки.
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

export default Peresadkailistykovka;
