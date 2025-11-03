import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Bus, Plane, AlertCircle, FileText, Clock, CreditCard, ArrowRight } from "lucide-react";

const ChtodelatEsliya = () => {
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
          <span>Что делать, если я заболел в дороге?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что делать, если я заболел в дороге?</h1>

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

              {/* Как сделать возврат */}
              <div className="space-y-4 mb-6">
                <h3 className="text-xl font-semibold">Как сделать возврат?</h3>
                <p className="text-base leading-relaxed">
                  Если вы заболели и не смогли поехать, то вернуть билеты можно только в кассе на вашей станции отправления (и больше ни на какой другой). Необходимо предъявить:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>документ, данные которого были указаны в заказе (оригинал паспорта и свидетельства о рождении для детей);</li>
                  <li>билет на бланке (если билет без электронной регистрации) или номер заказа (если билет с электронной регистрацией);</li>
                  <li>документы, подтверждающие факт болезни — справку из больницы или больничный лист.</li>
                </ul>
                <p className="text-base leading-relaxed">
                  Также в кассе будет необходимо заполнить заявление (бланк выдаст кассир). Если вы оплатили билет банковской картой, то деньги вернутся на нее.
                </p>
              </div>

              {/* Как переоформить электронный билет */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-xl font-semibold">Как переоформить электронный билет?</h3>
                <p className="text-base leading-relaxed">
                  Электронный билет можно переоформить: сменить поезд, место, вагон, класс, поменять маршрут с сохранением конечной точки (с доплатой за более длинный или возвратом части денег за более короткий), возобновить поездку после опоздания или из-за болезни.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Нельзя переоформить:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-6">
                    <li>на другого пассажира</li>
                    <li>менять конечную и начальную станции</li>
                    <li>менять перевозчика</li>
                    <li>менять билет, если взрослому был куплен детский, или наоборот</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Есть особый порядок обмена на Сапсаны и поезда, пересекающие границу страны. Стоимость билета при переоформлении рассчитывается на момент переоформления в кассе, неважно, электронный ваш билет или физический.
                </p>
                <p className="text-base leading-relaxed">
                  Нужно обратиться в кассу лично пассажиру, на которого оформлен билет, показать билет (или его скриншот) и документ, по которому он был куплен. Сбор за переоформление билета составляет 199 рублей 60 копеек (в июле 2024 года).
                </p>
                <div className="space-y-3 mt-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Более, чем за 8 часов до отправления</p>
                      <p className="text-sm text-muted-foreground">
                        Дешевле сдать билет и приобрести новый. Так вы потратите 2 рубля 90 копеек вместо 180 рублей за переоформление.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">В диапазоне 0–8 часов до отправления</p>
                      <p className="text-sm text-muted-foreground">
                        Переоформление выгоднее возврата и покупки нового билета на довольно существенную сумму.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">После опоздания</p>
                      <p className="text-sm text-muted-foreground">
                        На переоформление после опоздания даётся 12 часов в случаях вроде «я бабушку через дорогу переводил, простите» и пять суток — при болезни или несчастном случае, также надо будет предъявить подтверждающие документы.
                      </p>
                    </div>
                  </div>
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

              <p className="text-base leading-relaxed mb-4">
                Перевозчики вправе устанавливать свои требования по возвратам. Но, в целом, обобщённые правила для рейсов внутри страны выглядят так:
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">За два часа до рейса или больше</p>
                    <p className="text-sm text-muted-foreground">95% стоимости билета (туда не входит комиссия)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Меньше, чем за 2 часа, после отправления рейса</p>
                    <p className="text-sm text-muted-foreground">85% стоимости билета</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Меньше, чем через 3 часа, после отправления</p>
                    <p className="text-sm text-muted-foreground">75% стоимости билета</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Больше, чем через 3 часа, после отправления</p>
                    <p className="text-sm text-muted-foreground">Возврат уже не делается, т.к. позже кассиры уже не могут поставить отметку для внесения в систему.</p>
                  </div>
                </div>
              </div>

              <p className="text-base leading-relaxed mb-4">
                Кроме того, у перевозчиков и партнеров существуют свои дополнительные правила по возврату билетов.
              </p>

              <div className="space-y-4 border-t pt-6">
                <p className="text-base font-semibold">Если покупали билет на автобус у нас, то вернуть его можно вот такими способами:</p>
                <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>На сайте в личном кабинете</li>
                  <li>В приложении GoTrip</li>
                  <li>По заявке на возврат через почту. Нужно прикрепить справку о болезни, больничный лист или акт о несчастном случае.</li>
                </ol>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Не все перевозчики возвращают деньги по болезни. Мы обычно смотрим вашу заявку, запрашиваем возврат у перевозчика и возвращаемся к вам с ответом.
                  </p>
                </div>
                <p className="text-base leading-relaxed">
                  Если покупали билет у перевозчика напрямую или где-то ещё, то надо обращаться туда. Вам расскажут, какие нужно документы и делают ли они вообще возврат по болезни.
                </p>
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
                <h2 className="text-2xl font-bold">На самолёте</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  В случае болезни деньги за билет вернуть можно — это регламентируется Воздушным кодексом РФ. Если вы заболели и понимаете, что не сможете лететь своим рейсом, нужно поставить в известность об этом авиакомпанию (отменить регистрацию, если вы уже успели зарегистрироваться, или отменить заказ).
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Важно:
                  </p>
                  <p className="text-sm leading-relaxed">
                    Это важно сделать <strong>до окончания времени регистрации пассажиров</strong> на указанный в билете рейс. Только тогда деньги за билет вернутся полностью.
                  </p>
                </div>
                <p className="text-base leading-relaxed">
                  Поводом может стать как ваша болезнь, так и болезнь члена вашей семьи или близкого родственника. Подтвердить её можно только медицинскими документами. Подойдут справки из медицинских учреждений, листки нетрудоспособности, выписки из истории болезни и другие.
                </p>
                <p className="text-base leading-relaxed">
                  Детали по документам можно найти при оформлении возврата в личном кабинете у нас на сайте — там указаны требования конкретно той авиакомпании, которой вы летите. Другой вариант — обратиться к операторам нашего контакт-центра после оформления заявки на возврат. Ну или узнать все подробности у перевозчика.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Материалы по теме */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Материалы по теме</h2>
              <Link
                to="/guide/passenger/kak-poluchit-meditsinskuyu-pomoshch"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors group"
              >
                <span>Как получить медицинскую помощь в путешествии?</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChtodelatEsliya;
