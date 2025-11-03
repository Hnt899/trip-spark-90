import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, User, FileText, Smartphone, Printer, AlertCircle, XCircle, Clock, Info, RefreshCw } from "lucide-react";

const ElectronicRegistration = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Электронная регистрация</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Электронная регистрация</h1>

        <div className="space-y-8">
          {/* Что такое электронная регистрация */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                Что такое электронная регистрация
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Электронная регистрация — это опция, которая упрощает жизнь пассажиру. Её преимущество в том, что 
                  <strong> не нужно ехать на вокзал и получать билет на бланке</strong>.
                </p>
                <p>
                  Электронную регистрацию можно пройти онлайн при оформлении ж/д билета — галочка «пройти эл. регистрацию» 
                  часто стоит по умолчанию. Можно пройти регистрацию не сразу, но не позднее часа до отправления поезда с начальной станции.
                </p>
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <p>
                    После покупки на GoTrip билет (посадочный купон) в формате pdf придет на электронную почту, указанную в заказе. 
                    Также посадочный купон можно скачать в личном кабинете в разделе <strong>«Личные заказы»</strong>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Что нужно для посадки */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-primary" />
                Что нужно для посадки в поезд
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Если вы прошли электронную регистрацию, для посадки в поезд понадобятся:
                </p>
                
                <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                      1
                    </div>
                    <p>
                      <strong>Оригинал удостоверения личности</strong>, указанного при покупке билета: паспорт или свидетельство о рождении;
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                      2
                    </div>
                    <p>
                      <strong>Посадочный купон</strong> в печатном или электронном виде.
                    </p>
                  </div>
                </div>

                <p>
                  В каком виде нужно показать билет проводнику, в печатном или электронном, будет написано в самом билете.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-amber-900 flex items-center gap-2">
                    <Printer className="w-5 h-5" />
                    Важно: билеты на некоторые направления нужно распечатывать
                  </h3>
                  <p className="text-amber-900">
                    Иногда для посадки в поезд посадочный купон нужно предъявить только в распечатанном виде (не на электронном носителе). 
                    Это правило действует для поездов сообщением между Россией и Беларусью, Казахстаном, Киргизией, Таджикистаном, 
                    Абхазией, Узбекистаном, Эстонией, Литвой, Латвией, Польшей (поезд № 9/10). Билет можно распечатать дома на принтере 
                    или в любом копировальном центре.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-green-900 flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Чаще достаточно электронного вида
                  </h3>
                  <p className="text-green-900">
                    Чаще достаточно показать купон в электронном виде — можно скачать его на телефон в виде pdf или сфотографировать. 
                    Главное, чтобы штрихкод в купоне был отчётливо виден, так как проводник, возможно, будет его сканировать.
                  </p>
                </div>

                <p>
                  Некоторые проводники не требуют показывать купон при входе в вагон, им достаточно удостоверения личности. 
                  Но, по правилам ОАО «РЖД», купон у пассажира должен быть.
                </p>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-900 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>
                      Если ФИО пассажира или номер удостоверяющего личность документа не соответствуют данным у проводника, 
                      пассажира не пустят в поезд.
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как узнать, пройдена ли регистрация */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-primary" />
                Как узнать, пройдена ли у вас электронная регистрация
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Регистрация в большинстве случаев проходит автоматически, но в очень редких случаях может понадобится получить билет в кассе. 
                  В этом случае, об этом вам подскажет соответствующая метка. Если её нет, то волноваться не о чем — получать билеты в кассе не надо.
                </p>
                <p>
                  По некоторым направлениям могут попадаться билеты старого образца. Если электронная регистрация пройдена, в них это указано 
                  в строке <strong>«Статус электронного билета»</strong>. Если не пройдена, на купоне большими красными буквами будет написано 
                  <strong> «Для проезда недействителен, получите билет в кассе или терминале»</strong>.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Что нужно знать */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                Что нужно знать об электронной регистрации
              </h2>
              
              <div className="space-y-6 text-base leading-relaxed">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                    1
                  </div>
                  <p>
                    Электронная регистрация выполняется одновременно для всех пассажиров, указанных в заказе. Человек, оформляющий заказ, 
                    представляет всех пассажиров заказа, поэтому все пассажиры заказа считаются проинформированными об условиях посадки и проезда в поезде.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                    2
                  </div>
                  <div>
                    <p className="mb-2">
                      Электронная регистрация доступна при оформлении электронного билета от любой станции на всем пути следования следующих поездов:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                      <li>поездов с номерами от 001 до 898 формирования ОАО «ФПК» и некоторых других перевозчиков, следующих только по России 
                        (включая поезда, следующие несколько километров по территории Украины без остановок) и по Петропавловскому отделению 
                        Южно-Уральской железной дороги;</li>
                      <li>поездов «Аллегро» Санкт-Петербург — Хельсинки, «Лев Толстой» Москва — Хельсинки, а также дополнительных поездов 
                        Москва — Хельсинки, назначаемых на праздники (только в направлении из России в Финляндию);</li>
                      <li>поездов между Россией и Латвией;</li>
                      <li>некоторых поездов, следующих между Россией и Украиной, между Россией и Беларусью.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                    3
                  </div>
                  <p>
                    Даже пройдя электронную регистрацию, вы можете получить билет на бланке. Для этого нужно обратиться в кассу или распечатать 
                    билет в билетном терминале. После этого электронная регистрация отменяется и заново её пройти нельзя. Без билета на бланке 
                    в поезд вас уже не пустят.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                    4
                  </div>
                  <div>
                    <p className="mb-2">
                      При пройденной электронной регистрации невозможно:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>возобновить срок действия электронного билета в случае опоздания на поезд (кроме поездов внутрироссийского сообщения);</li>
                      <li>возобновить срок действия электронного билета в случае прерывания поездки в пути следования (отказ от поездки или остановка в пути следования).</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                    5
                  </div>
                  <p>
                    Электронная регистрация невозможна, если пассажир едет на транзитном поезде по участкам железных дорог СНГ, Латвии, Литвы, 
                    Эстонии или на поезде стороннего перевозчика (не ОАО «РЖД»).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как отменить */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-primary" />
                Как отменить электронную регистрацию
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Отменить электронную регистрацию можно <strong>не позднее часа до отправления поезда с начальной станции</strong>. 
                  За час до отправления с начальной станции формируются повагонные ведомости с данными всех пассажиров, прошедших электронную регистрацию. 
                  С этого момента пассажир уже не может отменить электронную регистрацию.
                </p>
                <p>
                  Чтобы отказаться от электронной регистрации, зайдите в личный кабинет GoTrip. Вы можете отменить электронную регистрацию 
                  для всего заказа или для отдельных билетов.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-blue-900">Электронная регистрация отменяется автоматически, если:</h3>
                  <ul className="list-disc list-inside space-y-1 text-blue-900">
                    <li>вы получили билет на бланке на вокзале, в кассе или терминале;</li>
                    <li>вы оформили возврат билета (онлайн или в кассе).</li>
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900">
                    Для некоторых поездов «ФПК» (дочерней компании РЖД) отмена электронной регистрации невозможна. Кнопки «Отменить эл. регистрацию» 
                    в личном кабинете нет. При этом сдать билет онлайн в личном кабинете GoTrip можно вплоть до отправления поезда со станции пассажира, 
                    а не начальной станции (вокзала). После того как поезд проедет станцию отправления пассажира, сдать билет можно только в кассе.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как вернуть билет */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-primary" />
                Как вернуть билет с электронной регистрацией
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Билет на поезд по России</h3>
                  <div className="space-y-4 text-base leading-relaxed">
                    <p>
                      Как правило, сдать билет онлайн можно сдать не позднее часа до отправления поезда. Но билеты на некоторые поезда «ФПК», 
                      оборудованные новой системой идентификации и обслуживания пассажиров (СИОП), можно вернуть вплоть до отправления поезда 
                      со станции отправления пассажира.
                    </p>
                    <p>
                      При возврате билета важно, как его оплачивали. Если билет был оплачен банковской картой, деньги вернутся на нее.
                    </p>
                    <p>
                      Если билет был оплачен наличными, вернуть его можно только в кассе, вне зависимости от статуса эл. регистрации. 
                      Деньги будут возвращены в кассе в момент обращения.
                    </p>
                    <p>
                      В кассе можно сдать билет и после отправления поезда. Для этого необходимо не раньше 20 минут и не позже 3 часов 
                      после отправления с вашей станции подойти в кассу на вокзале и предъявить документ, удостоверяющий личность, 
                      который указан в электронном билете. Иногда требуется написать заявление на претензионный возврат.
                    </p>
                    <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                      <p className="font-semibold mb-2">В претензионном порядке билет возвращается в следующих случаях:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>если вы возвращаете билет менее чем за час до отправления поезда с его начальной станции и не более 20 минут 
                          после отправления поезда со станции отправления пассажира;</li>
                        <li>если прошло не меньше 3 и не больше 12 часов после отправления поезда со станции отправления пассажира;</li>
                        <li>если билет сдаете не вы сами, а ваше доверенное лицо (по доверенности).</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Билет на поезд, пересекающий границу России</h3>
                  <div className="space-y-4 text-base leading-relaxed">
                    <p>
                      При возврате билета с электронной регистрацией меньше чем за час до отправления поезда с начальной станции и больше 
                      чем за 6 часов до отправления поезда с вашей станции (по местному времени) вернуть деньги за билет можно только в претензионном порядке.
                    </p>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-900">
                        При возврате билета с электронной регистрацией меньше чем за 6 часов до отправления поезда с вашей станции 
                        деньги не возвращаются.
                      </p>
                    </div>
                    <p>
                      Билеты с электронной регистрацией на поезда в сообщении с Латвией, Беларусью и Украиной нельзя вернуть меньше чем 
                      за час до отправления поезда с начальной станции.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/reference/trains/how-to-get-ticket" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Как получить ж/д билет
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/reference/trains/printed-ticket" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Как получить билет в печатном виде
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/reference/trains/what-needed-for-boarding" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Что нужно для посадки в поезд
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/reference/trains/how-to-return-ticket" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Как вернуть билет на поезд
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA кнопка */}
          <div className="flex justify-center pt-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold">
              <Link to="/routes/list">
                Перейти к покупке ж/д билетов
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ElectronicRegistration;

