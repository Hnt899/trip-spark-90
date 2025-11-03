import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Calendar, Info, Bell } from "lucide-react";

const CheckTicketsAvailability = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Как узнать, есть ли билеты на поезд и сколько они стоят</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как узнать, есть ли билеты на поезд и сколько они стоят</h1>

        <div className="space-y-8">
          {/* Основная информация */}
          <Card>
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed mb-4">
                Укажите в форме поиска маршрут, дату поездки и нажмите на кнопку для поиска билетов. Система найдёт все подходящие поезда, 
                проходящие через указанные станции в этот день. <strong>Наличие мест и стоимость билетов</strong> будут указаны напротив каждого поезда.
              </p>
              <p className="text-lg leading-relaxed">
                Обычно билеты стоят дешевле, если покупать их заранее или учесть сезонные коэффициенты РЖД.{" "}
                <Link to="/reference/trains/cheap-tickets" className="text-primary hover:underline">
                  Прочитайте наши советы о том, как сэкономить на билетах
                </Link>
                .
              </p>
            </CardContent>
          </Card>

          {/* Если билетов нет */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Bell className="w-6 h-6 text-primary" />
                Если билетов нет в продаже
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Билетов на некоторые поезда может не оказаться в продаже. Чтобы узнать их примерную стоимость, сотрите в форме поиска дату поездки 
                  и нажмите на кнопку для поиска билетов.
                </p>
                <p>
                  Если нужные вам билеты ещё не продаются, закажите <strong>бесплатное оповещение о начале их продажи</strong>.{" "}
                  <Link to="/reference/trains/no-tickets" className="text-primary hover:underline">
                    Подробнее об этом
                  </Link>
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
                    to="/reference/trains/train-schedule" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Как узнать расписание, маршрут, график поезда
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/reference/trains/no-tickets" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <Bell className="w-4 h-4" />
                    Что делать, если билетов нет
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/reference/trains/cheap-tickets" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <Info className="w-4 h-4" />
                    Как купить дешёвые ж/д билеты
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

export default CheckTicketsAvailability;

