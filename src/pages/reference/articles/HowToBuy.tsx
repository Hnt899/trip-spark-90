import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Train, Users, User, CreditCard, CheckCircle, Clock } from "lucide-react";

const HowToBuy = () => {
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
          <span>Как купить ж/д билет</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Как купить ж/д билет</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-xl font-semibold mb-2">
                На GoTrip покупка ж/д билетов занимает меньше 5 минут.
              </p>
              <p className="text-base text-muted-foreground">
                Для оформления билета потребуется несколько простых шагов.
              </p>
            </CardContent>
          </Card>

          {/* Шаг 1 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">1. Укажите маршрут и дату</h2>
                  <div className="space-y-3 text-base leading-relaxed">
                    <p>
                      Зайдите в раздел <strong>Ж/д билеты</strong> и укажите место отправления, прибытия и дату. 
                      Если оставить поле даты пустой, то вы увидите общее расписание поездов по выбранному маршруту. 
                      После этого нажмите на кнопку поиска.
                    </p>
                    <p>
                      Если ж/д билетов нет, закажите на GoTrip <strong>бесплатное уведомление</strong> — сообщим, 
                      когда начнутся продажи или кто-то сдаст билет. Ещё вы можете подключить услугу 
                      <strong> «Поймать билет»</strong>, и мы оформим для вас билет, когда он появится в продаже.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Шаг 2 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">2. Выберите подходящий поезд и тип вагона</h2>
                  <div className="space-y-3 text-base leading-relaxed">
                    <p>
                      Для каждого рейса мы показываем время отправления и прибытия, продолжительность поездки, 
                      количество мест в разных вагонах и их стоимость.
                    </p>
                    <p>
                      На карточке поезда услуги, доступные в вагоне, обозначены иконками: кондиционер, биотуалет, 
                      провоз животных, питание и другие. Чтобы прочитать отклики пассажиров, нажмите на плашку 
                      с рейтингом или слово «Отзывы». А если нажать на вкладку «Маршрут», можно посмотреть 
                      список всех остановок поезда.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Шаг 3 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">3. Введите количество пассажиров и выберите места</h2>
                  <div className="space-y-3 text-base leading-relaxed">
                    <p>
                      В одном заказе может быть максимум <strong>4 пассажира</strong>. Если пассажиров больше, 
                      оформите несколько заказов. Билет ребёнку без места оформляется только вместе со взрослым пассажиром. 
                      Детские билеты могут продаваться со скидкой.
                    </p>
                    <p>
                      Для вашего удобства мы подсказываем <strong>лучшие свободные места</strong> в поезде, например, 
                      возле окна или на нижней полке. Опция доступна не для всех вагонов.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Шаг 4 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">4. Заполните данные пассажиров и укажите контакты</h2>
                  <div className="space-y-4 text-base leading-relaxed">
                    <p>
                      Для оформления билетов укажите <strong>ФИО пассажиров</strong> и данные удостоверения личности. 
                      Список документов, которые можно использовать при заказе билетов:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-muted-foreground">
                      <li>
                        Если покупаете билет на российский заграничный паспорт или иностранный документ, заполняйте ФИО так, 
                        как они записаны в документе — английскими буквами. Исключение: внутренние документы граждан Беларуси, 
                        данные в которых указаны на кириллице. Заполните отчество, если оно есть в документе.
                      </li>
                      <li>
                        Если в иностранном документе ФИО записаны буквами национального алфавита, их нужно транслитерировать. 
                        Буквы в номере иностранного документа не транслитерируют.{" "}
                        <Link to="/reference/trains/documents-for-purchase" className="text-primary hover:underline">
                          Правила транслитерации
                        </Link>
                      </li>
                      <li>
                        Если в ФИО есть твёрдый знак «Ъ», он автоматически заменится на мягкий «Ь».
                      </li>
                      <li>
                        Если покупаете билет ребёнку на иностранное свидетельство о рождении, в поле «Тип документа» выберите 
                        «Иностранный документ», а в гражданстве — страну, выдавшую свидетельство. Даже если ребёнок уже успел 
                        получить российское гражданство, данные заполняются так, как они указаны в документе.
                      </li>
                      <li>
                        Обратите внимание, что с иностранным свидетельством о рождении не получится оформить билет со скидкой. 
                        Вы сможете это сделать только в кассах РЖД.
                      </li>
                    </ul>
                    <div className="space-y-2">
                      <p>
                        Вместе с паспортными данными нужно указать <strong>адрес электронной почты</strong> и 
                        <strong> номер телефона</strong> пассажира. На почту мы пришлём билеты, а на телефон — СМС с кодом заказа 
                        и напоминанием о поездке.
                      </p>
                      <p>
                        После первой покупки на GoTrip вводить данные документов больше не понадобится — при следующем заказе 
                        поля заполнятся автоматически после указания фамилии пассажира. Перед покупкой нужно войти в профиль.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Шаг 5 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">5. Выберите вариант оплаты</h2>
                  <div className="space-y-3 text-base leading-relaxed">
                    <p>
                      Вы можете оплатить заказ сразу или оставить билет за собой и выкупить его позже, через несколько дней. 
                      На это время цена замораживается. Услуга позднего выкупа платная. Подробнее об услуге
                    </p>
                    <p>
                      К оплате принимаются банковские карты платёжных систем <strong>Visa, MasterCard, МИР</strong>, 
                      выпущенные в России. Картами, полученными за рубежом, оплатить заказ не получится из-за технических 
                      ограничений платёжных систем. Если у вас есть сертификат или промокод GoTrip, отметьте соответствующее 
                      поле и введите его номер. Билет резервируется для оплаты на <strong>15 минут</strong>.
                    </p>
                    <p>
                      На GoTrip нельзя потратить бонусы РЖД. Но вы можете указать номер счёта РЖД Бонус, и после поездки на этот 
                      счёт начислятся бонусы перевозчика.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Шаг 6 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">6. Подтвердите заказ и оплатите его</h2>
                  <div className="space-y-3 text-base leading-relaxed">
                    <p>
                      По правилам РЖД, на оплату выбранных мест отводится <strong>15 минут</strong>. Если за это время вы не 
                      оплатите заказ, места станут доступны другим покупателям. Поторопитесь, особенно если билетов на выбранный 
                      поезд осталось мало.
                    </p>
                    <p>
                      Продажа электронных билетов на российские поезда закрывается за <strong>15 минут до отправления</strong> 
                      поезда со станции пассажира.
                    </p>
                    <p>
                      После оплаты вам на почту придёт <strong>электронный билет (посадочный купон)</strong>, а на телефон — 
                      СМС с 14-значным номером заказа (билета). Билет можно распечатать или показать проводнику в электронном виде. 
                      Некоторые билеты печатать обязательно. Если вдруг билет не пришёл, например, вы ошиблись в адресе почты, 
                      свяжитесь с нашим контакт-центром, сообщите номер заказа и верный адрес.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Дополнительная информация */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Что ещё нужно знать
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  При оформлении большинства ж/д билетов российских железных дорог вы автоматически проходите 
                  <strong> электронную регистрацию</strong> на рейс. Благодаря ей вы можете не получать билет в кассе, 
                  а сразу садиться в поезд. Для посадки потребуется оригинал удостоверения личности, по которому вы оформляли заказ. 
                  По правилам РЖД, проводник может потребовать показать билет в электронном или печатном виде, но на практике 
                  обычно достаточно паспорта. Вы можете предъявить электронный билет с экрана мобильного телефона или любого другого устройства.
                </p>
                <p>
                  Билет с электронной регистрацией при желании можно получить на бланке: обратитесь на вокзале в кассу 
                  (только на территории РФ) или самостоятельно распечатайте билет в терминале самообслуживания. Это можно сделать 
                  в любое время с момента покупки и до отправления поезда. Вам понадобится номер заказа (билета) и удостоверение личности, 
                  указанное при покупке. Ж/д кассы могут быть закрыты на перерыв, рекомендуем заранее уточнять график их работы.
                </p>
                <p>
                  На некоторых рейсах, например зарубежных, нет электронной регистрации, тогда билет надо будет получить на бланке. 
                  Вы увидите эту информацию при оформлении билета.
                </p>
              </div>
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

export default HowToBuy;

