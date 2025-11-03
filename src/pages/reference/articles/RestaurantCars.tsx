import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { UtensilsCrossed, AlertCircle, Info } from "lucide-react";

const RestaurantCars = () => {
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
          <span>Поезда с вагонами-ресторанами и бистро</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-4xl font-bold">Поезда с вагонами-ресторанами и бистро</h1>
          <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">Обновлено 18 января 2024 года</span>
        </div>

        <div className="space-y-8">
          {/* Предупреждение */}
          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed text-amber-900">
                <AlertCircle className="w-5 h-5 inline mr-2" />
                Иногда вагон-ресторан могут не пустить в составе поезда или он может быть закрыт. Эту информацию лучше уточнить в кассах или у проводника.
              </p>
            </CardContent>
          </Card>

          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                В поездах организовано несколько типов питания. Пассажиры могут посетить вагон-ресторан или вагон-бистро, купить билет с включенным питанием, 
                заказать доставку еды к вагону или купить перекус у проводника.
              </p>
              <p className="text-base leading-relaxed mt-3">
                <Link to="/reference/trains/eating-on-train" className="text-primary hover:underline font-semibold">
                  Подробнее о том, как поесть в поезде: все способы
                </Link>
              </p>
            </CardContent>
          </Card>

          {/* Вагоны-рестораны */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <UtensilsCrossed className="w-6 h-6 text-primary" />
                Поезда с вагонами-ресторанами
              </h2>
              <p className="text-base leading-relaxed mb-4">
                В поездах РЖД насчитывается более <strong>400 вагонов-ресторанов</strong>. Обычно вагон-ресторан находится в середине поезда — точный номер вагона подскажет проводник.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Это неполный список поездов с вагонами-ресторанами. Полный список включает более 200 поездов. При выборе билета на GoTrip обратите внимание на карточку поезда — 
                на ней будет значок скрещённых вилки и ложки, если в поезде есть вагон-ресторан.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-900 text-sm">
                  <Info className="w-4 h-4 inline mr-2" />
                  Примеры поездов с вагонами-ресторанами: № 001/002 (Москва — Санкт-Петербург, Москва — Казань, Москва — Владивосток), 
                  № 003/004 (Москва — Санкт-Петербург, Москва — Кисловодск), № 009/010 (Москва — Псков), и многие другие. 
                  Полный список доступен при поиске билетов на сайте GoTrip.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Вагоны-бистро */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <UtensilsCrossed className="w-6 h-6 text-primary" />
                Поезда с вагонами-бистро
              </h2>
              <p className="text-base leading-relaxed mb-4">
                В рамках новой концепции питания РЖД запустили вагоны-бистро в ряде поездов. В отличие от вагонов-ресторанов, в бистро еду не готовят, 
                а поставляют уже готовой, в стерильных контейнерах.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Примеры поездов с вагонами-бистро: № 001/002 (Волгоград — Москва, Санкт-Петербург — Москва), № 009/010 (Саратов — Москва, Самара — Москва), 
                № 011/012 (Анапа — Москва, Санкт-Петербург — Мурманск), и многие другие. При выборе билета на GoTrip вагоны-бистро также обозначаются специальным значком.
              </p>
            </CardContent>
          </Card>

          {/* Как узнать */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-blue-700" />
                Как узнать, есть ли вагон-ресторан или бистро в поезде?
              </h2>
              <p className="text-base leading-relaxed text-blue-900">
                Чтобы узнать, есть ли в поезде вагон-ресторан или вагон-бистро, при выборе билета на GoTrip обратите внимание на карточку поезда — 
                на ней будут скрещённые вилка и ложка. Иконки, показывающие удобства, находятся в левом нижнем углу карточки поезда.
              </p>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2 text-base">
                <li>
                  <Link to="/reference/trains/eating-on-train" className="text-primary hover:underline">
                    Как поесть в поезде: все способы
                  </Link>
                </li>
                <li>
                  <Link to="/reference/trains/how-to-buy" className="text-primary hover:underline">
                    Покупка ж/д билетов
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantCars;
