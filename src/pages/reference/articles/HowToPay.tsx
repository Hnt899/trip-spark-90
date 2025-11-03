import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Smartphone, Clock, Shield, QrCode, Building2 } from "lucide-react";

const HowToPay = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Как оплатить ж/д билет</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как оплатить ж/д билет</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed mb-4">
                После того как вы укажете пассажиров и проверите детали о заказе, вы можете выбрать один из двух способов оплаты: 
                <strong> картой</strong> или <strong>СБП</strong>. Выберите нужный способ и нажмите «Оплатить».
              </p>
              <div className="bg-white rounded-lg p-4 border-2 border-dashed border-primary/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Smartphone className="w-8 h-8 text-primary" />
                    <div>
                      <div className="font-semibold">СБП</div>
                      <div className="text-sm text-muted-foreground">Быстрая оплата</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <CreditCard className="w-8 h-8 text-primary" />
                    <div>
                      <div className="font-semibold">Банковская карта</div>
                      <div className="text-sm text-muted-foreground">Visa, MasterCard, МИР</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-2 text-sm bg-amber-50 border border-amber-200 rounded-lg p-3">
                <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-900">
                  Когда вы выберете способ оплаты, у вас будет <strong>15 минут</strong>, чтобы купить билеты. 
                  Если не успеть этого сделать, то бронь снимется и билеты сможет купить кто-нибудь другой.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Банковская карта */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Банковской картой</h2>
                  <p className="text-base mb-4">
                    Мы принимаем к оплате выпущенные в России банковские карты следующих платежных систем:
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="px-4 py-2 bg-white border-2 border-blue-500 rounded-lg font-semibold text-blue-600">
                      Visa
                    </div>
                    <div className="px-4 py-2 bg-white border-2 border-orange-500 rounded-lg font-semibold text-orange-600">
                      MasterCard
                    </div>
                    <div className="px-4 py-2 bg-white border-2 border-green-600 rounded-lg font-semibold text-green-600">
                      МИР
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  После выбора способа оплаты система направит вас на страницу, где потребуется ввести данные банковской карты 
                  и подтвердить оплату. Все ваши данные надёжно защищены по международным стандартам безопасности.
                </p>

                <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    На странице авторизации введите:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>номер карты</strong> (без пробелов),</li>
                    <li><strong>имя и фамилию</strong> держателя карты,</li>
                    <li><strong>срок действия</strong> карты,</li>
                    <li><strong>верификационный номер карты (CVV)</strong>.</li>
                  </ul>
                  <p className="mt-3 text-sm">
                    Все данные есть на самой карте. CVV — это три цифры на обратной стороне карты.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900">
                    <strong>Важно:</strong> Транзакция может занять около 40 секунд. Дождитесь завершения операции. 
                    Не нажимайте повторно кнопку «Оплатить».
                  </p>
                </div>

                <div className="flex items-start gap-2 text-sm bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-900">
                    Оплатить заказ необходимо в течение <strong>15 минут</strong> после перехода на страницу авторизации карточки. 
                    Через 15 минут бронь билета снимается.
                  </p>
                </div>

                <p className="text-muted-foreground">
                  Оплата заказа с помощью платёжных приложений (Apple Pay, Google Pay и др.) и карт, выпущенных за рубежом, недоступна.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* СБП */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4">Через СБП</h2>
                  <p className="text-base mb-4">
                    <strong>СБП</strong> — система быстрых платежей, с помощью которой вы можете купить билеты, не вводя данные карты. 
                    Эту систему поддерживают большинство банков, но некоторые банки к ней могут быть не подключены. 
                    Если банк не поддерживает СБП, то на экране выбора банка его не будет.
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-base leading-relaxed">
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-primary" />
                    Шаг 1: Сканирование QR-кода
                  </h3>
                  <p>
                    Выберите способ оплаты СБП и вы автоматически перейдёте на страницу, где указан QR-код. 
                    Его надо отсканировать телефоном, чтобы продолжить оплату.
                  </p>
                </div>

                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Шаг 2: Выбор банка
                  </h3>
                  <p>
                    Вы попадёте на страницу выбора банка. Если вы пользовались СБП до этого, то вверху экрана отобразится банк, 
                    который вы использовали в последний раз. Если вы оплачиваете через СБП в первый раз или хотите выбрать другой банк, 
                    нажмите на «Система быстрых платежей» и выберите нужный банк.
                  </p>
                </div>

                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Шаг 3: Подтверждение оплаты
                  </h3>
                  <p>
                    Далее процесс оплаты зависит от вашего банка — он может выглядеть по-разному. Например, где-то откроется приложение, 
                    а где-то — страница в браузере. Обычно требуется выбрать счёт, с которого спишутся деньги, и подтвердить оплату.
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

export default HowToPay;

