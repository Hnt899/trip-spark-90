import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Calendar, Info, Bell, AlertCircle } from "lucide-react";

const TrainSchedule = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Как узнать расписание, маршрут, график поезда</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как найти информацию по расписанию, маршруту, остановкам поезда</h1>

        <div className="space-y-8">
          {/* Поиск по дате */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Поиск расписания на определённую дату
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Чтобы узнать расписание поездов на определённую дату, укажите в форме поиска ж/д билетов начальную и конечную станции маршрута, 
                  дату поездки и нажмите на кнопку для поиска билетов.
                </p>
                <p>
                  Нажмите на ссылку <strong>«Информация о поезде»</strong>, чтобы узнать детальную информацию о маршруте и графике поезда и прочитать отзывы пассажиров.
                </p>
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <p>
                    На открывшейся странице вы можете посмотреть <strong>годовой график</strong> и <strong>маршрут поезда на карте</strong>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Поиск без даты */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Search className="w-6 h-6 text-primary" />
                Поиск без указания даты
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Если вы не знаете точную дату поездки, но хотите посмотреть, есть ли поезда по маршруту. Заполните станцию отправления и прибытия, 
                  а дату оставьте пустой. Загрузится список всех поездов между указанными населёнными пунктами. Вы увидите ближайшие дни курсирования. 
                  А если нажмёте на вкладку <strong>«Дни следования»</strong>, откроется страница с годовым графиком поезда.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Если билетов нет */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-primary" />
                Если билетов нет
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Иногда может оказаться, что билетов на выбранную дату нет. Причин может быть две:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>все билеты на этот день раскупили;</li>
                  <li>продажи билетов ещё не открылись — обычно это происходит за 90 или 120 дней до рейса.</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900">
                    В обоих случаях вы можете заказать <strong>уведомление от TudaSuda</strong> — мы пришлём электронное письмо, если кто-то сдаст билет 
                    или когда начнутся продажи. Это бесплатно.
                  </p>
                </div>
                <p>
                  Нажмите <strong>«Оформить предзаказ»</strong>, если хотите, чтобы мы купили билет для вас, как только откроются продажи. 
                  Спишем только стоимость билета в день покупки.{" "}
                  <Link to="/reference/trains/pre-order" className="text-primary hover:underline">
                    Подробнее о предзаказе
                  </Link>
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900">
                    Бывает, что раскуплены билеты только в конкретный вагон, например СВ. Тогда вместо информации о количестве билетов будет вкладка 
                    <strong> «Есть надежда»</strong>. Нажав на неё, вы можете заказать уведомление, чтобы узнать, если кто-то сдаст билет.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Советы по экономии */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                Полезные советы
              </h2>
              <p className="text-base leading-relaxed">
                Обычно билеты стоят дешевле, если покупать их заранее или учесть сезонные коэффициенты РЖД.{" "}
                <Link to="/reference/trains/cheap-tickets" className="text-primary hover:underline">
                  Прочитайте наши советы о том, как сэкономить на билетах
                </Link>
                .
              </p>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2">
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
                    to="/reference/trains/pre-order" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Как сделать предзаказ ж/д билетов
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

export default TrainSchedule;

