import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw, Building2, Clock, Heart, User, CreditCard, AlertTriangle, CheckCircle } from "lucide-react";

const HowToReturnTicket = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Как вернуть билет на поезд</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как вернуть билет на поезд</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed">
                Вернуть купленные на TudaSuda билеты можно в личном кабинете или в кассе РЖД. Сдавать билет онлайн удобнее — 
                на это уйдёт всего несколько минут и не придётся никуда ехать. Рассказываем, как вернуть билет на поезд по России, 
                что делать в случае опоздания или болезни, сколько денег вернётся и когда.
              </p>
            </CardContent>
          </Card>

          {/* Где сдавать билет */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-primary" />
                Где сдавать билет
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Где можно сдать билет — онлайн или в кассе — зависит от того, проходили ли вы электронную регистрацию на рейс 
                  и сколько времени осталось до отправления поезда. Статус регистрации можно узнать в электронном билете.{" "}
                  <Link to="/reference/trains/electronic-registration" className="text-primary hover:underline">
                    Подробнее про электронную регистрацию
                  </Link>
                </p>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-green-900">Если вы прошли электронную регистрацию, сдать билет можно онлайн:</h3>
                  <ul className="list-disc list-inside space-y-1 text-green-900 ml-4">
                    <li>в любое время до отправления поезда со станции посадки — для поездов ФПК и скоростных поездов ДОСС;</li>
                    <li>не позднее чем за 1 час до отправления поезда с начальной станции маршрута — для поездов остальных перевозчиков 
                        (например, «Гранд Сервис Экспресс»). Если осталось меньше часа, вернуть билет можно только в кассе, написав претензию.</li>
                  </ul>
                </div>

                <p>
                  Время онлайн-возврата обычно указано в билете. Исключение — скорые электрички ЦППК 7000-й нумерации.
                </p>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900">
                    Если вы распечатали билет на бланке перевозчика, электронная регистрация автоматически аннулируется. 
                    Сдать билет получится только в кассе в любой момент до отправления поезда с вашей станции.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как вернуть билет онлайн */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-primary" />
                Как вернуть билет онлайн
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="text-base leading-relaxed">
                      На сайте или в приложении зайдите в раздел <strong>«Мои заказы»</strong>, выберите заказ и нажмите 
                      <strong> «Детали заказа»</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-base leading-relaxed">
                      На странице заказа нажмите <strong>«Вернуть билеты»</strong>. Выберите пассажира, чей билет вы хотите вернуть, 
                      или все билеты из заказа.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-base leading-relaxed">
                      Нажмите <strong>«Оформить возврат»</strong>.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900">
                    После этого вам придёт электронное письмо с подтверждением возврата и чеком. Ждите деньги на карту, которой вы оплатили заказ. 
                    Они придут в течение <strong>30 дней</strong>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как сдать билет в кассе */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Как сдать билет в кассе
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  До отправления поезда с вашей станции вернуть билет можно в любой кассе. Если поезд уже отправился — только в кассе 
                  на станции отправления.
                </p>
                <p>
                  В кассу должен подойти пассажир, на которого оформлен билет. Сдать билет за другого пассажира можно только по доверенности. 
                  Доверенность не требуется, если вы сдаёте билет за своего несовершеннолетнего ребёнка.
                </p>

                <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                  <p className="font-semibold mb-2">В кассе покажите:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>документ, на который оформлен билет. Если билет на ребёнка — свидетельство о рождении;</li>
                    <li>билет в электронном или распечатанном виде. Или просто назовите номер билета — это цифры в начале СМС, 
                        которая приходит после покупки билета.</li>
                  </ul>
                </div>

                <p>
                  В кассе вам выдадут квитанцию — в ней будет указана точная сумма к возврату. Деньги вернутся на карту, которой вы оплатили заказ, 
                  в течение 30 дней.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Если поезд уже отправился */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Если поезд уже отправился
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Вернуть билет онлайн не получится. Не позже 12 часов после отправления поезда со станции посадки обратитесь в кассу на этой же станции. 
                  Если есть отдельная касса возврата, подойдите туда.
                </p>
                <p>
                  В кассе покажите билет в электронном или печатном виде и удостоверение личности, на которое он оформлен. Кассир выдаст бланк заявления 
                  на возврат (претензию), который нужно заполнить. Срок возврата денег — до 60 дней. Сначала 30 дней перевозчик рассматривает претензию, 
                  потом в течение 30 дней банк перечисляет деньги.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Что делать, если вы заболели */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary" />
                Что делать, если вы заболели
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Если поездка отменилась из-за болезни, вернуть билеты можно только в кассе на станции посадки пассажира. Если на вокзале есть отдельная 
                  касса возврата, обратитесь туда. Сдать билет по болезни разрешается в течение <strong>5 дней</strong> после отправления поезда со станции посадки.
                </p>

                <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                  <p className="font-semibold mb-2">В кассе покажите:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>удостоверение личности, на которое оформлен билет;</li>
                    <li>билет в электронном или распечатанном виде. Или просто назовите номер билета;</li>
                    <li>документ, подтверждающий факт болезни: справку из больницы или больничный лист.</li>
                  </ul>
                </div>

                <p>
                  Заполните бланк заявления (претензии), который выдаст кассир. Деньги вернутся на карту, которой вы оплачивали билет. 
                  Срок возврата денег — до 60 дней.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900">
                    Если произошёл несчастный случай или авария и у пассажира нет справки из больницы, отправить перевозчику заявление на возврат денег 
                    (претензию) допустимо в течение <strong>6 месяцев</strong> с отправления поезда. Заявления в таких случаях рассматриваются в индивидуальном порядке, 
                    никаких гарантий возврата денег нет.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как сдать билет за другого пассажира */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-primary" />
                Как сдать билет за другого пассажира
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Это можно сделать только в кассе РЖД. Покажите кассиру:
                </p>

                <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary space-y-2">
                  <p>• Оригинал вашего паспорта.</p>
                  <p>• Билет пассажира в электронном или печатном виде. Либо назовите кассиру 14-значный номер билета.</p>
                  <p>• Написанную от руки доверенность на возврат билета и получение денег. Доверенность не нужна, если сдавать билет за своего 
                      несовершеннолетнего ребёнка, но понадобится его документ.</p>
                </div>

                <p>
                  Подготовьте и подпишите доверенность заранее. В документе укажите ФИО пассажира и доверенного лица, их паспортные данные, 
                  а также место и дату подписания. Сделайте два экземпляра — один останется у кассира.
                </p>
                <p>
                  Срок действия доверенности — до 3 лет. Если не указать срок, документ будет действовать в течение года.
                </p>
                <p>
                  Доверенность нужно заверить, если едете поездом перевозчика «Гранд Сервис Экспресс». У других перевозчиков такого требования нет.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Сколько денег вернётся */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-primary" />
                Сколько денег вернётся
              </h2>
              
              <div className="space-y-6">
                <div>
                  <p className="text-base leading-relaxed mb-4">
                    Тариф билета складывается из двух частей — стоимости билета (проезда) и стоимости плацкарты (место + обслуживание). 
                    Их соотношение сильно варьируется в зависимости от типа поезда. Например, в фирменном поезде плацкарта больше, чем в нефирменном.
                  </p>
                  <p className="text-base leading-relaxed mb-4">
                    При возврате билета из стоимости удерживаются сборы:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                    <li>сбор РЖД за возврат;</li>
                    <li>сервисный сбор TudaSuda, оплаченный при покупке;</li>
                    <li>если возврат оформляется на сайте или в приложении — сбор за оформление онлайн-возврата: 3,5% от стоимости каждого билета 
                        у перевозчика, но не меньше 20 ₽ и не больше 500 ₽.</li>
                  </ul>
                  <p className="text-base leading-relaxed mb-4">
                    Если билет включает бельё и/или сервисные услуги, то стоимость этих услуг не удерживается — эта сумма входит в «плацкарту».
                  </p>

                  <h3 className="text-xl font-semibold mb-4">Билеты на поезда дальнего следования</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-muted-foreground/20">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="border border-muted-foreground/20 p-3 text-left font-semibold">Когда сдаётся билет</th>
                          <th className="border border-muted-foreground/20 p-3 text-left font-semibold">Что возвращается</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-muted-foreground/20 p-3">за 8 часов и более до отправления</td>
                          <td className="border border-muted-foreground/20 p-3">стоимость перевозки и плацкарты</td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="border border-muted-foreground/20 p-3">от 2 до 8 часов до отправления</td>
                          <td className="border border-muted-foreground/20 p-3">стоимость перевозки и 50% плацкарты</td>
                        </tr>
                        <tr>
                          <td className="border border-muted-foreground/20 p-3">менее 2 часов до или в течение 12 часов после отправления</td>
                          <td className="border border-muted-foreground/20 p-3">стоимость перевозки без стоимости плацкарты</td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="border border-muted-foreground/20 p-3">при возврате из-за болезни или несчастного случая</td>
                          <td className="border border-muted-foreground/20 p-3">стоимость перевозки без стоимости плацкарты</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Билеты с местом на электричку 7000-й нумерации</h3>
                  <p className="text-base leading-relaxed mb-4">
                    При возврате из стоимости билета удерживаются:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                    <li>сбор за возврат пригородной пассажирской компании — 50 рублей;</li>
                    <li>сервисный сбор TudaSuda, уплаченный при покупке билета;</li>
                    <li>сбор за оформление онлайн-возврата, если возврат оформляется на сайте или в приложении. Размер сбора — 3,5% от стоимости 
                        каждого билета у перевозчика, но не меньше 20 рублей и не больше 500 рублей.</li>
                  </ul>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-muted-foreground/20">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="border border-muted-foreground/20 p-3 text-left font-semibold">Когда сдаётся билет</th>
                          <th className="border border-muted-foreground/20 p-3 text-left font-semibold">Что возвращается</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-muted-foreground/20 p-3">2 часа и более</td>
                          <td className="border border-muted-foreground/20 p-3">почти полная стоимость билета</td>
                        </tr>
                        <tr className="bg-muted/30">
                          <td className="border border-muted-foreground/20 p-3">меньше 2 часов</td>
                          <td className="border border-muted-foreground/20 p-3">50% от стоимости билета</td>
                        </tr>
                        <tr>
                          <td className="border border-muted-foreground/20 p-3">после отправления</td>
                          <td className="border border-muted-foreground/20 p-3">—</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Если билет оплачен сертификатом */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-primary" />
                Если билет оплачен сертификатом
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Если при покупке билетов вы использовали подарочный или возвратный сертификат, сумма за билет за вычетом сборов за возврат 
                  придёт в виде нового сертификата на вашу электронную почту.
                </p>
                <p>
                  Если часть стоимости билета оплачена подарочным сертификатом, а часть — банковской картой, доплаченные деньги вернутся на карту 
                  в срок до 30 дней, а часть, оплаченная сертификатом, придёт в виде нового подарочного сертификата с тем же номиналом.
                </p>
                <p>
                  При этом сборы за оформление возврата удерживаются из суммы, которая возвращается на банковскую карту. Если размер сборов больше, 
                  чем оплаченная деньгами сумма, сборы вычитаются из номинала сертификата.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Если билет невозвратный */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-primary" />
                Если билет невозвратный
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  По Уставу железнодорожного транспорта России вернуть стоимость невозвратного билета разрешается только в нескольких случаях, 
                  например, в случае болезни или смерти пассажира или следующего с ним члена семьи.
                </p>
                <p>
                  Если пассажир передумал ехать или опоздал на поезд, сдать билет не получится. Можно вернуть только стоимость постельного белья 
                  и услуг РЖД — например, дополнительного багажа и питания, если вы их оплачивали. Для этого зайдите в раздел «Заказы» в профиле TudaSuda, 
                  выберите нужный билет и нажмите кнопку «Оформить возврат». Оформить возврат можно также в кассе РЖД.
                </p>
                <p>
                  Из стоимости услуг удерживаются сборы:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>сбор РЖД за возврат;</li>
                  <li>сервисный сбор TudaSuda, оплаченный при покупке билета;</li>
                  <li>сбор за оформление онлайн-возврата, если возврат оформляется на сайте или в приложении. Размер сбора — 3,5% от стоимости 
                      каждого билета у перевозчика, но не меньше 20 рублей и не больше 500 рублей.</li>
                </ul>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900">
                    Если сумма сборов больше, чем стоимость услуг, не возвращается ничего.
                  </p>
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
                    to="/reference/trains/change-after-payment" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Как исправить ошибки в ж/д билете
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/reference/trains/electronic-registration" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Электронная регистрация
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

export default HowToReturnTicket;

