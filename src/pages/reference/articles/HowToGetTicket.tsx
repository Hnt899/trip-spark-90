import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Smartphone, Printer, Building2, CheckCircle, AlertCircle } from "lucide-react";

const HowToGetTicket = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Как получить ж/д билет</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как получить ж/д билет</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed">
                Когда вы оплатите билеты, мы пришлём <strong>СМС с кодом заказа</strong> и <strong>письмо с электронным билетом</strong>. 
                Билет также можно найти в профиле на сайте или разделе <strong>«Заказы»</strong> приложения.
              </p>
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
                  Нужно ли печатать электронный билет или получать его в кассе, зависит от того, прошли ли вы электронную регистрацию.{" "}
                  <Link to="/reference/trains/electronic-registration" className="text-primary hover:underline">
                    Как узнать, пройдена ли электронная регистрация
                  </Link>
                </p>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-green-900">
                    <Smartphone className="w-5 h-5" />
                    Если вы прошли электронную регистрацию
                  </h3>
                  <p className="text-green-900">
                    Печатать электронный билет <strong>не нужно</strong>. Покажите его на экране смартфона, если проводник попросит это сделать.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-blue-900">
                    <Printer className="w-5 h-5" />
                    Если нужен билет на бланке
                  </h3>
                  <p className="text-blue-900 mb-2">
                    Если вы не зарегистрировались онлайн или нужен билет на бланке перевозчика, получите его в кассе или в терминале регистрации. 
                    Сделать это можно в любой момент до отправления поезда.
                  </p>
                  <p className="text-blue-900 text-sm">
                    <strong>Важно:</strong> Уточните время работы кассы, чтобы не приехать во время перерыва.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Что делать, если нет кассы */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-primary" />
                Если на вокзале нет кассы или терминала
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Если на вокзале нет кассы или терминала, а до отправления поезда осталось мало времени, покажите электронный билет проводнику 
                  и объясните ситуацию. Вас должны пустить в поезд.
                </p>
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
                    to="/reference/trains/electronic-registration" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Электронная регистрация
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

export default HowToGetTicket;

