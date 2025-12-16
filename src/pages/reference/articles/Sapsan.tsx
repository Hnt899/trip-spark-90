import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Train, DollarSign, Ticket, Map, ArrowRight, Wifi, Users } from "lucide-react";

const Sapsan = () => {
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
          <span>Сапсан</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Поезд «Сапсан»</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                «Сапсан» — высокоскоростной поезд немецкого производства, используемый на железных дорогах России. 
                Состав разгоняется до <strong>250 км/час</strong>, поэтому на дорогу тратится в два раза меньше времени, чем в обычных поездах. 
                Поезд ездит между обеими столицами, а также из Санкт-Петербурга в Нижний Новгород.
              </p>
              <p className="text-base leading-relaxed mt-3">
                Ехать в «Сапсане» одно удовольствие: вагоны удобные и современные, есть кондиционеры и Wi-Fi. 
                Пассажиры могут выбрать места разной степени комфорта: от стандартных сидений в эконом-классе до роскошного двухместного купе-сьют.
              </p>
            </CardContent>
          </Card>

          {/* Цены и расписание */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-primary" />
                Цены и расписание поездов «Сапсан»
              </h2>
              <p className="text-base leading-relaxed mb-4">
                На TudaSuda вы можете узнать расписание поездов «Сапсан», уточнить цены в разных классах, проверить наличие мест и купить билет онлайн.
              </p>
              <Button asChild size="lg">
                <Link to="/routes/list">
                  Показать расписание
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Билет на поезд */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Ticket className="w-6 h-6 text-primary" />
                Билет на поезд «Сапсан»
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Заказ билетов на TudaSuda займёт у вас около <strong>4 минут</strong>. Чтобы купить билет, укажите город отправления, прибытия и дату поездки. 
                  Найдите подходящий рейс и нажмите «Выбрать билеты». Укажите вагон и понравившееся место на схеме, введите данные пассажиров и оплатите билет онлайн. 
                  Он придёт на вашу электронную почту.
                </p>
                <p>
                  Посадочный купон необязательно печатать. Если при заказе билета пройти электронную регистрацию, сесть в поезд можно просто по паспорту.
                </p>
                <Button asChild variant="outline" className="mt-4">
                  <Link to="/routes/list">
                    Купить билеты на «Сапсан»
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Схемы вагонов */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Map className="w-6 h-6 text-primary" />
                Схемы вагонов «Сапсана»
              </h2>
              <p className="text-base leading-relaxed">
                Детально прорисованные схемы вагонов помогут вам выбрать наиболее удобное место.
              </p>
              <Link to="/reference/trains/carriage-schemes" className="text-primary hover:underline text-base mt-2 inline-block">
                Схемы всех вагонов
              </Link>
            </CardContent>
          </Card>

          {/* Стоимость билетов */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-primary" />
                Сколько стоят билеты на «Сапсан»
              </h2>
              <p className="text-base leading-relaxed">
                Цены на билеты в «Сапсан» зависят от количества времени до отправления (чем раньше брать билет, тем он дешевле) и от спроса 
                (перед выходными и праздниками дороже). Внутри самого поезда цены варьируются в зависимости от класса.
              </p>
              <Link to="/reference/trains/cheap-tickets" className="text-primary hover:underline text-base mt-2 inline-block">
                Подробнее
              </Link>
            </CardContent>
          </Card>

          {/* Скидки */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-green-700" />
                Скидки на «Сапсан»
              </h2>
              <div className="space-y-3 text-base leading-relaxed text-green-900">
                <p>
                  На TudaSuda при покупке билетов на «Сапсан» применяются скидки для юных (от 5 лет до 21 года) и пожилых (от 60 лет) пассажиров. 
                  Дети до 5 лет без отдельного места ездят бесплатно. Также действует скидка 20% при одновременной покупке билетов туда-обратно.
                </p>
                <Link to="/reference/trains/cheap-tickets" className="text-primary hover:underline font-semibold">
                  Как купить дешевый билет на «Сапсан»
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sapsan;
