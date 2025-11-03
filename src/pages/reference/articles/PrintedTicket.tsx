import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Smartphone, Printer, Building2, CheckCircle, AlertCircle, Clock, User } from "lucide-react";

const PrintedTicket = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Как получить билет</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как получить билет</h1>

        <div className="space-y-8">
          {/* Электронный билет */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Smartphone className="w-6 h-6 text-primary" />
                Электронный билет
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Электронные билеты введены в России в <strong>2007 году</strong>. Такие билеты выбирают за удобство оформления: 
                  не нужно ехать в кассу вокзала, общаться с кассиром и терять время.
                </p>
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <p>
                    Когда вы оплатите билеты, мы пришлём <strong>СМС с кодом заказа</strong> и <strong>письмо с электронным билетом</strong>. 
                    Билет также можно найти в профиле на сайте GoTrip или в разделе <strong>«Заказы»</strong> приложения.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Электронная регистрация */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-primary" />
                Электронная регистрация
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Для поездов на территории России бумажный ж/д билет не требуется, достаточно прийти на посадку с пройденной 
                  электронной регистрацией. Она выполняется автоматически при оформлении ж/д билета. В билете будет указано, 
                  что регистрация пройдена.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <Link 
                    to="/reference/trains/electronic-registration" 
                    className="text-primary hover:underline font-medium"
                  >
                    Подробнее про электронную регистрацию
                  </Link>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>
                      Когда поезд отправляется не из России, и осталось менее часа до отправления с начальной станции, 
                      электронная регистрация может быть недоступна. В этом случае обязательно нужно обратиться в кассу, 
                      чтобы распечатать билет. Если этого не сделать, в поезд могут не пустить.
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Билет на бланке */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Printer className="w-6 h-6 text-primary" />
                Билет на бланке
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Даже пройдя электронную регистрацию, вы можете получить билет на бланке. Для этого нужно обратиться в кассу 
                  или распечатать билет в терминале регистрации. После этого электронная регистрация отменяется и заново её 
                  пройти нельзя. Без билета на бланке сесть в поезд уже не получится.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900">
                    Распечатанный электронный билет внешне почти не отличается от билета, изначально купленного на бланке.
                  </p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900 flex items-start gap-2">
                    <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>
                      Если до отправления поезда с его начальной станции осталось меньше часа, распечатать билет не получится. 
                      В поезд вас пустят, но билета на бланке не будет.
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как получить билет в кассе */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Как получить билет в кассе
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Назовите кассиру <strong>14-значный код заказа</strong>, который мы прислали вам по электронной почте. 
                  Предъявите оригинал документа, по которому оформляли электронный билет. Кассир выдаст вам билет на бланке.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                  <p className="flex items-start gap-2">
                    <User className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      В кассы для получения билета на бланке должен обращаться <strong>лично пассажир</strong>, 
                      на которого оформлен билет.
                    </span>
                  </p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900">
                    Обратите внимание, что ж/д кассы могут быть закрыты на перерыв. Советуем узнавать график работы касс заранее.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как распечатать билет в терминале */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Printer className="w-6 h-6 text-primary" />
                Как распечатать билет в терминале
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>Есть два способа:</p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      1
                    </div>
                    <div className="flex-1">
                      <p>
                        Набрать на терминале <strong>14-значный код заказа</strong> и дождаться распечатки билета.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      2
                    </div>
                    <div className="flex-1">
                      <p>
                        Открыть электронный билет на смартфоне и провести экраном перед сканером терминала. 
                        Терминал считает штрих-код билета и распечатает билет.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <p className="text-blue-900 flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>
                      Вне зависимости от способа получения билета, не забудьте взять с собой <strong>документ</strong>, 
                      по которому был куплен билет.
                    </span>
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
                    to="/reference/trains/how-to-get-ticket" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Как получить ж/д билет
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
                <li>
                  <Link 
                    to="/reference/trains/what-needed-for-boarding" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4" />
                    Что нужно для посадки в поезд
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

export default PrintedTicket;

