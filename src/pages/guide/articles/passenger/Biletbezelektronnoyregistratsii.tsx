import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, MapPin, Clock, FileText, AlertCircle, CheckCircle } from "lucide-react";

const Biletbezelektronnoyregistratsii = () => {
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
          <span>Билет без электронной регистрации?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что делать, если купил билет на поезд без электронной регистрации и его негде получить на станции?</h1>

        <div className="space-y-8">
          {/* Основная информация */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что делать</h2>
              </div>

              <div className="space-y-6">
                {/* Шаг 1 */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Если билет был приобретен заранее</h3>
                      <p className="text-base leading-relaxed mb-3">
                        Для его получения необходимо обратиться на ближайшую станцию, где есть кассы Экспресс-3.
                      </p>
                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                        <p className="text-sm leading-relaxed">
                          <strong>Важно:</strong> Кассы Экспресс-3 — это специальные кассы, которые работают с системой электронного билетооборота. Не все кассы на станции могут быть кассами Экспресс-3.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Шаг 2 */}
                <div className="space-y-4 border-t pt-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Если такой возможности нет или поезд отправляется в ближайшее время</h3>
                      <p className="text-base leading-relaxed mb-3">
                        Нужно обратиться к проводнику поезда с посадочным купоном и удостоверяющим личность документом — объяснить ситуацию.
                      </p>
                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <p className="text-sm leading-relaxed flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>
                            <strong>Помните:</strong> Проводник должен видеть ваш посадочный купон (распечатку или скриншот) и документ, удостоверяющий личность. Без этих документов вас могут не посадить в поезд.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Шаг 3 */}
                <div className="space-y-4 border-t pt-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">Получить билет на бланке</h3>
                      <p className="text-base leading-relaxed mb-3">
                        Получить билет на бланке на ближайшей станции по пути следования поезда, где есть возможность получения бумажного билета.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Сроки получения */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Сроки получения билета</h2>
              </div>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <p className="text-base font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Поезда по России
                    </p>
                    <p className="text-sm leading-relaxed">
                      Получить билет можно в течение <strong>12 часов</strong> после отправления поезда.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-base font-semibold mb-2 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Международные поезда
                    </p>
                    <p className="text-sm leading-relaxed">
                      Получить билет можно в течение <strong>трёх часов</strong> после отправления поезда.
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Если вы не успели получить билет в указанные сроки, вам придётся покупать новый билет.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Про электронную регистрацию */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Про электронную регистрацию</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Ещё обратите внимание, что наличие или отсутствие услуги электронной регистрации относится не к поезду, а к каждому конкретному вагону.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Поэтому надо смотреть скорее не на поезд, а на конкретный вагон</strong> на шаге выбора мест (на схеме вагона есть значок ЭР).
                  </p>
                </div>
                <p className="text-base leading-relaxed">
                  У большинства поездов по России есть электронная регистрация.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Что взять с собой */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что взять с собой</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-3">
                  При обращении в кассу или к проводнику обязательно возьмите с собой:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li><strong>Документ, удостоверяющий личность</strong> — тот, данные которого были указаны при покупке билета</li>
                  <li><strong>Посадочный купон</strong> — распечатку или скриншот с номером заказа</li>
                  <li><strong>Номер заказа</strong> — если есть возможность, запишите или сохраните номер заказа</li>
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

export default Biletbezelektronnoyregistratsii;
