import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Package, Train, Plane, Bus, Clock, Phone, MapPin, AlertCircle } from "lucide-react";

const Gdeiskatpoteryannyeveschi = () => {
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
          <span>Где искать потерянные вещи?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Где искать потерянные вещи?</h1>

        <div className="space-y-8">
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
                  <h3 className="text-xl font-semibold mb-3">Куда обращаться</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li><strong>Камера хранения вокзала</strong> — потерянные вещи из поездов передаются туда</li>
                    <li><strong>Служба уборки поезда</strong> — вещи, найденные в вагоне, передаются проводникам</li>
                    <li><strong>Дежурный по вокзалу</strong> — может помочь связаться со службой уборки</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold mb-1">Сроки хранения:</p>
                      <p className="text-sm leading-relaxed">
                        Потерянные вещи хранятся на вокзале до 30 дней. После этого они передаются в соответствующие органы.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Что нужно для получения</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Документ, удостоверяющий личность</li>
                    <li>Подробное описание потерянной вещи</li>
                    <li>Номер поезда и вагона (если помните)</li>
                    <li>Дата и время поездки</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* На самолёте */}
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
                  <h3 className="text-xl font-semibold mb-3">Служба утерянного багажа</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li><strong>Служба утерянного багажа аэропорта</strong> — основной пункт для поиска забытых вещей</li>
                    <li><strong>Авиакомпания</strong> — если вещи потеряны на борту самолета</li>
                    <li><strong>Служба безопасности аэропорта</strong> — для вещей, найденных в зоне досмотра</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold mb-1">Важно:</p>
                      <p className="text-sm leading-relaxed">
                        Обратитесь как можно скорее после обнаружения потери. Чем раньше вы сообщите, тем больше шансов найти вещь.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Что нужно предоставить</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Номер рейса и дату полета</li>
                    <li>Место в самолете (ряд и номер места)</li>
                    <li>Подробное описание вещи</li>
                    <li>Контактные данные для связи</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* В автобусе */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">В автобусе</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Куда обращаться</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li><strong>Автовокзал</strong> — камера хранения или служба находок</li>
                    <li><strong>Перевозчик</strong> — свяжитесь с компанией, которая осуществляла перевозку</li>
                    <li><strong>Водитель автобуса</strong> — если автобус еще не уехал, можно связаться с водителем</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Информация, которая понадобится</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Номер рейса и маршрут</li>
                    <li>Дата и время поездки</li>
                    <li>Место, где сидели в автобусе</li>
                    <li>Описание потерянной вещи</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Общие рекомендации */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Общие рекомендации</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Действуйте быстро</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Чем быстрее вы обратитесь за помощью, тем больше шансов найти потерянную вещь. Не откладывайте обращение на потом.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Ведите учет</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Сохраняйте номера билетов и рейсов</li>
                    <li>Фотографируйте важные вещи перед поездкой</li>
                    <li>Записывайте контактные данные перевозчиков</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold mb-1">Полезный совет:</p>
                      <p className="text-sm leading-relaxed">
                        Многие вокзалы и аэропорты имеют онлайн-сервисы для поиска потерянных вещей. Проверьте сайт перевозчика или вокзала.
                      </p>
                    </div>
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

export default Gdeiskatpoteryannyeveschi;
