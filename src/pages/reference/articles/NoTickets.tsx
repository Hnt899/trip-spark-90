import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Clock, CreditCard, Users, Phone, CheckCircle, XCircle, Bell } from "lucide-react";

const NoTickets = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Что делать, если билетов нет</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что делать, если билетов на поезд нет</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed mb-4">
                Продажа билетов на поезда по России начинается за <strong>45, 90, 120 и 180 дней</strong> до отправления.{" "}
                <Link to="/reference/trains/ticket-sales-periods" className="text-primary hover:underline">
                  Подробнее о сроках продаж
                </Link>
              </p>
              <p className="text-lg leading-relaxed">
                Если нужные вам билеты ещё не продаются, советуем заказать <strong>бесплатное уведомление</strong> о начале продаж. 
                Так вы не пропустите момент, когда появится возможность купить билеты. Мы сообщим вам об этом письмом, 
                если заказывали на сайте TudaSuda, или отправим пуш, если подписались на уведомление в приложении.
              </p>
            </CardContent>
          </Card>

          {/* Бесплатное уведомление */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Bell className="w-6 h-6 text-primary" />
                Как заказать бесплатное уведомление
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 border-2 border-dashed border-primary/30">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <div className="font-semibold">Сидячий</div>
                        <div className="text-sm text-muted-foreground">Скоро в продаже</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <div className="font-semibold">Купе</div>
                        <div className="text-sm text-muted-foreground">Скоро в продаже</div>
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      Заказать уведомление
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    Интерфейс продажи билетов. Напротив типов билетов надпись "Скоро в продаже" и кнопка "Заказать уведомление"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Услуга Поймать билет - краткая информация */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Search className="w-6 h-6 text-primary" />
                Если билеты раскупили
              </h2>
              <p className="text-base leading-relaxed mb-4">
                Если билеты раскупили, вы можете подключить услугу <strong>«Поймать билет»</strong>. Мы оформим для вас билет, 
                если появятся места. Вы сможете выкупить этот билет или отказаться.
              </p>
              <p className="text-base leading-relaxed">
                В высокий сезон и на праздники места на поезд быстро разбирают. Но шанс уехать всё равно есть — 
                по статистике <strong>до 15% оформленных ж/д билетов сдают назад</strong>. А иногда к поездам прикрепляют 
                дополнительные вагоны, и места появляются.
              </p>
            </CardContent>
          </Card>

          {/* Как работает услуга */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Search className="w-6 h-6 text-primary" />
                Услуга «Поймать билет» — как работает
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Услуга доступна для поездов по России.
                </p>
                <p>
                  Заказать можно, если прошло <strong>24 часа</strong> с момента открытия продаж и билеты раскуплены. 
                  Если билетов уже нет, на карточке поезда будет кнопка <strong>«Поймать билет»</strong>.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900">
                    Если нужно купить льготный билет, например, по школьному тарифу или детский билет без места, 
                    услугу можно заказать, но льгота не применится.
                  </p>
                </div>
                <p>
                  Чтобы заказать услугу, нажмите кнопку <strong>«Поймать билет»</strong> и заполните форму.
                </p>
              </div>

              <div className="mt-6 bg-muted/50 rounded-lg p-6 border-l-4 border-primary">
                <h3 className="font-semibold mb-4 text-lg">Укажите:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>количество пассажиров</strong>,</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>желаемый тип вагона</strong>,</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>предпочтения по месту</strong>,</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>данные пассажиров</strong>,</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>телефон и электронную почту</strong>, чтобы мы могли сообщить вам о найденном билете.</span>
                  </li>
                </ul>
                <p className="mt-4 font-medium">
                  Затем оплатите стоимость услуги.
                </p>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900">
                  После оформления услуги отправим вам <strong>СМС</strong> и начнём отслеживать билеты на этот поезд. 
                  Вы сможете проверять статус заказа в профиле в приложении и на сайте.
                </p>
              </div>

              {/* Имитация формы */}
              <div className="mt-6 bg-white rounded-lg p-6 border-2 border-dashed border-primary/30">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Укажите количество пассажиров</h4>
                    <div className="flex items-center gap-4">
                      <button className="w-10 h-10 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary/10">
                        −
                      </button>
                      <span className="text-2xl font-bold">1</span>
                      <button className="w-10 h-10 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary/10">
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Выберите тип вагона</h4>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium">
                        Купе
                      </button>
                      <button className="px-4 py-2 bg-white border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/5">
                        Плацкарт
                      </button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 italic">
                  Так выглядит форма заказа услуги в приложении
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Что дальше */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Что дальше
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Будем искать билет вплоть до <strong>14 часов до отправления поезда</strong>. Если мы найдём подходящий, 
                  забронируем его для вас. Пришлём СМС и покажем билет в вашем профиле.
                </p>
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <p>
                    У вас будет <strong>24 часа</strong>, чтобы решить, покупать или нет. Вы можете оплатить билет или 
                    отказаться от него в профиле.
                  </p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900">
                    Если до отправления поезда осталось меньше суток, то на оплату билета у вас будет <strong>от 2 до 12 часов</strong>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Сколько стоит услуга */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-primary" />
                Сколько стоит услуга
              </h2>
              <div className="bg-primary/10 rounded-lg p-6 mb-6">
                <p className="text-2xl font-bold text-primary mb-2">99 ₽</p>
                <p className="text-base">
                  Стоимость одинакова для всех билетов — 99 ₽. Это плата за поиск билета.
                </p>
              </div>

              <h3 className="font-semibold text-lg mb-4">Что нужно знать:</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-base">
                      если за <strong>14 часов до отправления</strong> билет не найдётся, поиск автоматически отключится 
                      и <strong>99 ₽ вернутся</strong>;
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-base">
                      если билет нашёлся, а планы поменялись, от него можно отказаться. Не оплачивайте билет, и заказ 
                      отменится автоматически. <strong>99 ₽ не вернутся</strong>;
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-base">
                      если вы отмените заказ до того, как мы найдём билет, <strong>99 ₽ вернутся</strong>. Отменить заказ 
                      можно в профиле.
                    </p>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-blue-900 text-sm">
                    Обычно деньги приходят в течение <strong>3 дней</strong>. Максимальный срок возврата — до <strong>30 дней</strong>.
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

export default NoTickets;

