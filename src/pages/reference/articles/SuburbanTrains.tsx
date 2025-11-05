import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Train, Calendar, Baby, FileText, RefreshCw } from "lucide-react";

const SuburbanTrains = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Как купить билеты на скорые пригородные поезда</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как купить билеты на скорые пригородные поезда</h1>

        <div className="space-y-8">
          {/* Как купить на сайте */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Как купить билет на скорые пригородные поезда на сайте TudaSuda</h2>
              <p className="text-base leading-relaxed mb-4">
                На TudaSuda можно купить билеты на скорые пригородные поезда с предоставлением места.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="text-base leading-relaxed">
                      Заполните форму поиска: задайте начальную и конечную станции следования в разделе <strong>«Поезда»</strong>. Выберите из списка интересующий вас поезд.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-base leading-relaxed mb-2">Заполните поля данных пассажиров:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>ФИО;</li>
                      <li>тип документа;</li>
                      <li>номер документа.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-base leading-relaxed">
                      Перейдите к способу оплаты. Оплатить билет на скорый пригородный поезд можно с помощью <strong>банковской карты</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* На какие поезда */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                На какие скорые пригородные поезда можно купить билет?
              </h2>
              <p className="text-base leading-relaxed mb-4">
                На TudaSuda можно купить билеты на скорые пригородные поезда формирования ЦППК с предоставлением мест, следующие по маршрутам:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <ul className="list-disc list-inside space-y-2 text-base ml-4">
                  <li>Москва — Владимир;</li>
                  <li>Москва — Калуга;</li>
                  <li>Москва — Дубна;</li>
                  <li>Москва — Рязань;</li>
                </ul>
                <ul className="list-disc list-inside space-y-2 text-base ml-4">
                  <li>Москва — Сергиев Посад;</li>
                  <li>Москва — Тула;</li>
                  <li>Москва — Александров;</li>
                  <li>Москва — Орехово-Зуево.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Как отличить */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Как отличить поезд дальнего следования от скорого пригородного поезда?</h2>
              <p className="text-base leading-relaxed">
                По номерам. У скорых пригородных поездов они <strong>7000-е</strong>. Нумерация начинается с 7001 и заканчивается 7098.
              </p>
            </CardContent>
          </Card>

          {/* Когда можно купить */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Когда можно купить билет на скорые пригородные поезда?
              </h2>
              <p className="text-base leading-relaxed">
                Купить билет на скорый пригородный поезд можно за <strong>10 суток</strong> до его отправления. Самый поздний срок, когда вы можете купить билет 
                на скорый пригородный поезд онлайн — <strong>за 1 час</strong> до его отправления.
              </p>
            </CardContent>
          </Card>

          {/* Детские билеты */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Baby className="w-6 h-6 text-primary" />
                Как купить детский билет на скорый пригородный поезд?
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Дети до 5 лет могут проезжать <strong>бесплатно</strong> без предоставления отдельного места.
                </p>
                <p>
                  Оформить билет с местом для ребенка по детскому тарифу можно, если ребенок младше 7 лет. При покупке билета по детскому тарифу на странице ввода 
                  данных пассажиров нужно будет указать дату рождения ребенка.
                </p>
                <p>
                  Если ребенку уже исполнилось 7 лет, билет оформляется по взрослому тарифу.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Как получить билет */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Как получить билет на скорый пригородный поезд?
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  После покупки вы получите <strong>посадочный купон</strong>, который действителен для проезда в скором пригородном поезде. 
                  Все билеты на скорые пригородные поезда продаются с электронной регистрацией.
                </p>
                <p>
                  Билет на бланке можно получить в специализированной кассе перевозчика (ЦППК) на вокзале отправления и прибытия поезда.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Как вернуть билет */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-primary" />
                Как вернуть билет на скорый пригородный поезд?
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Вернуть билет, купленный на TudaSuda, можно в личном кабинете. Процедура возврата похожа на возврат ж/д билета на поезда дальнего следования.
                </p>
                <p>
                  Также вы можете вернуть билет на вокзале отправления и прибытия поезда. Для этого нужно обратиться в кассу перевозчика (ЦППК).
                </p>

                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 mt-4">
                  <h3 className="font-semibold mb-3">Сколько денег можно вернуть?</h3>
                  <ul className="space-y-2">
                    <li>
                      При возврате билетов <strong>не позднее 2 часов</strong> до отправления поезда — возвращается полная стоимость билета за вычетом 
                      сервисных сборов TudaSuda и партнеров, а также комиссии платежных систем.
                    </li>
                    <li>
                      При возврате билетов <strong>менее чем за 2 часа</strong>, но не позднее отправления поезда — <strong>50% стоимости билета</strong> 
                      за вычетом сервисных сборов TudaSuda и партнеров, а также комиссии платежных систем.
                    </li>
                    <li>
                      <strong>После отправления</strong> поезда со станции посадки пассажира — стоимость билета не возвращается.
                    </li>
                  </ul>
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
                    to="/reference/trains/how-to-buy" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    Как купить ж/д билет
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

export default SuburbanTrains;

