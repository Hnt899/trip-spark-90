import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, AlertCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const TicketSalesPeriods = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Сроки продажи ж/д билетов</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Сроки продажи ж/д билетов</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                Как правило, чем раньше купить билет, тем ниже будет его стоимость. Разница между ценой в день открытия продаж и перед отправлением поезда может доходить до 50%. 
                На это влияют динамическое ценообразование и сезонные коэффициенты.
              </p>
            </CardContent>
          </Card>

          {/* За 90 дней */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Билеты, которые продаются за 90 дней
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Ж/д билеты на большинство поездов дальнего следования по России и из России в Абхазию продаются за <strong>90 дней</strong> до отправления. 
                  Например, 13 сентября вы можете купить билет на 12 декабря. Эти сроки действуют на все типы вагонов.
                </p>
                <p>
                  Чтобы не высчитывать дату начала продаж самостоятельно, вы можете воспользоваться календарём начала продаж. Введите дату поездки — и сразу увидите, когда появятся билеты.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900">
                    <AlertCircle className="w-5 h-5 inline mr-2" />
                    В том числе за 90 дней продаются билеты на поезда в Калининград. К сожалению, их нельзя купить на GoTrip, а только в кассе на вокзале или на сайте перевозчика, 
                    поскольку при покупке нужно оформить упрощённый проездной документ (УПД ЖД).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* За 45 дней */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Билеты, которые продаются за 45 дней
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  За <strong>45 дней</strong> открываются продажи билетов на «Сапсаны» и ещё некоторые поезда по России. Если покупаете билет заранее, но не видите в расписании нужный поезд, 
                  значит, продажи ещё не открылись.
                </p>
                <p>
                  Чтобы не упустить билеты, закажите на GoTrip бесплатное уведомление о старте продаж. Когда билеты появятся в продаже, вы получите электронное письмо.
                </p>
                <p>
                  Если билеты уже раскупили, вы можете воспользоваться услугой «Поймать билет». Мы будем отслеживать билеты и оформим их, если они поступят в продажу.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* За 180 дней */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Билеты, которые продаются за 180 дней
              </h2>
              <p className="text-base leading-relaxed">
                За полгода открывается продажа по ряду фирменных поездов.
              </p>
            </CardContent>
          </Card>

          {/* Международные поезда */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                Сроки продаж билетов на международные поезда
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>Для поездов, пересекающих границы России, действуют другие сроки начала продаж билетов:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Страны СНГ и Балтии</strong> — за 45 дней, а если поезд едет через Москву — за 60 суток.</li>
                  <li><strong>Дальнее зарубежье</strong> (поезд Москва — Париж и т.д.) — за 60 дней.</li>
                  <li><strong>Молдова</strong> — за 30 дней, а если поезд едет через Москву — за 45 суток.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Время открытия продаж */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Начало продажи билетов по московскому и местному времени
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Время открытия продаж зависит от того, к какой железной дороге относится станция отправления поезда. Продажа в кассах и через интернет начинается одновременно — 
                  от 7 до 12 утра по местному времени. Например, продажа билетов в Новосибирске стартует в 7 утра по местному и в 4 утра по московскому времени.
                </p>
                <p>
                  Обычно продажи открываются в 8 утра по московскому времени на европейской части России, в 6 утра мск на Урале, в 4 утра мск в Сибири и на Дальнем Востоке.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border text-sm">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-3 text-left">Регион отправления поезда</th>
                        <th className="border border-border p-3 text-left">Открытие продаж по московскому времени</th>
                        <th className="border border-border p-3 text-left">Открытие продаж по местному времени</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-border p-3">Московская ж/д</td><td className="border border-border p-3">8:00</td><td className="border border-border p-3">8:00</td></tr>
                      <tr><td className="border border-border p-3">Самарская область</td><td className="border border-border p-3">8:00</td><td className="border border-border p-3">9:00</td></tr>
                      <tr><td className="border border-border p-3">Октябрьская ж/д</td><td className="border border-border p-3">8:00</td><td className="border border-border p-3">8:00</td></tr>
                      <tr><td className="border border-border p-3">Свердловская ж/д</td><td className="border border-border p-3">6:00</td><td className="border border-border p-3">8:00</td></tr>
                      <tr><td className="border border-border p-3">Восточно-Сибирская ж/д</td><td className="border border-border p-3">4:00</td><td className="border border-border p-3">9:00</td></tr>
                      <tr><td className="border border-border p-3">Новосибирская область</td><td className="border border-border p-3">4:00</td><td className="border border-border p-3">7:00</td></tr>
                      <tr><td className="border border-border p-3">Красноярская ж/д</td><td className="border border-border p-3">4:00</td><td className="border border-border p-3">8:00</td></tr>
                      <tr><td className="border border-border p-3">Дальневосточная ж/д</td><td className="border border-border p-3">4:00</td><td className="border border-border p-3">11:00</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2 text-base">
                <li>
                  <Link to="/reference/trains/how-to-buy" className="text-primary hover:underline">
                    Покупка ж/д билетов
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TicketSalesPeriods;
