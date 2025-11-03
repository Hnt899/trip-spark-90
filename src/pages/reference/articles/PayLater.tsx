import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, CreditCard, CheckCircle, XCircle, AlertCircle, Calendar, Info } from "lucide-react";

const PayLater = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Как оплатить билет позже</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Билет сейчас, оплата потом</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed">
                Оформляйте ж/д билет сейчас, а платите потом с услугой <strong>«Оплатить позже»</strong>. 
                У вас будет до <strong>7 или 14 дней</strong> на оплату. Цена билета за это время не изменится. 
                Чтобы оставить билет за собой, нужно заплатить небольшую сумму. Размер зависит от стоимости билета.
              </p>
            </CardContent>
          </Card>

          {/* Как подключить услугу */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Как подключить услугу «Оплатить позже»</h2>
              
              <div className="space-y-6">
                {/* Шаг 1 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="text-base leading-relaxed">
                      Зайдите в раздел <strong>Ж/д билеты</strong> и выберите подходящий поезд, вагон и место. 
                      После оформления заказа изменить эти данные нельзя — только отменить заказ и оформить снова.
                    </p>
                  </div>
                </div>

                {/* Шаг 2 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-base leading-relaxed">
                      Заполните данные пассажиров и контакты. Важно сразу правильно вписать данные пассажиров, 
                      чтобы не пришлось сдавать билет или платно переоформлять.{" "}
                      <Link to="/reference/trains/change-after-payment" className="text-primary hover:underline">
                        Подробнее про ошибки в ж/д билете
                      </Link>
                    </p>
                  </div>
                </div>

                {/* Шаг 3 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    3
                  </div>
                  <div className="flex-1">
                    <div className="space-y-3">
                      <p className="text-base leading-relaxed">
                        На шаге оплаты выберите пункт <strong>«Оплатить позже»</strong>. Вы сразу увидите цену услуги 
                        и срок, до которого нужно выкупить билет.
                      </p>
                      <div className="bg-white rounded-lg p-4 border-2 border-dashed border-primary/30">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                            <CreditCard className="w-6 h-6 text-muted-foreground" />
                            <div>
                              <div className="font-medium text-sm">Оплатить сейчас</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-primary/10 border-2 border-primary rounded-lg">
                            <Clock className="w-6 h-6 text-primary" />
                            <div>
                              <div className="font-semibold">Оплатить позже</div>
                              <div className="text-xs text-muted-foreground">Выбрано</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-sm text-amber-900">
                          <strong>Важно:</strong> Оплатить услугу можно только банковской картой, выпущенной в России.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* После оплаты */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-primary" />
                После оплаты услуги
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  После оплаты вам придут <strong>электронное письмо</strong> и <strong>СМС</strong> с указанием срока выкупа 
                  и ссылкой для оплаты. Повторные уведомления пришлём за <strong>3 часа до истечения срока</strong>.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900">
                    Если не выкупить билет в срок, заказ отменится автоматически, никаких списаний с карты не будет.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как отменить заказ */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-primary" />
                Как отменить заказ
              </h2>
              <p className="text-base leading-relaxed">
                Билеты, которые удалось найти через «Оплатить потом», появляются в профиле в разделе <strong>«Мои заказы»</strong>. 
                При желании вы можете вернуть их так же, как если вы оплачивали билеты сразу — откройте заказ и нажмите 
                <strong> «Отменить»</strong>. Стоимость услуги «Оплатить позже» не возвращается.
              </p>
            </CardContent>
          </Card>

          {/* Что нужно знать */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                Что нужно знать об услуге
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-base">
                    <strong>Стоимость услуги не возвращается.</strong>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-base">
                    Услуга недоступна, если до отправления поезда осталось <strong>меньше 76 часов</strong>.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-base">
                    Максимальная сумма заказа — <strong>50 000 рублей</strong>.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-base">
                    Услугу нельзя оплатить с помощью <strong>промокода</strong>.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-base">
                    В заказе может быть только билет <strong>в одну сторону</strong>. Чтобы воспользоваться отсроченной оплатой 
                    и для обратного билета, оформите его отдельным заказом.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-base">
                    Услуга может быть недоступна для некоторых поездов.
                  </p>
                </div>
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

export default PayLater;

