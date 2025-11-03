import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Info, AlertCircle } from "lucide-react";

const TiltingCarriages = () => {
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
          <span>Где ходят поезда с наклоняющимися при повороте вагонами</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Где ходят поезда с наклоняющимися при повороте вагонами?</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                Скорости на железной дороге растут. Расписание поездов становится с каждым годом все плотнее. А поезда, как и раньше, вынуждены снижать на поворотах скорость, 
                иначе центробежная сила заставит их сойти с колеи. Где же найти резерв скорости?
              </p>
              <p className="text-base leading-relaxed mt-3">
                Придумали наклонять вагон в повороте и компенсировать действие центробежной силы. При этом скорость прохождения криволинейных участков дороги увеличивается почти на <strong>40 км/час</strong>.
              </p>
            </CardContent>
          </Card>

          {/* История */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                История технологии
              </h2>
              <p className="text-base leading-relaxed">
                Начиная с 1940-х годов разработки велись в США и Европе. В 1973 году поезда с наклоняющимися вагонами начали курсировать в Японии. 
                Эксперимент сочли не очень удачным, т.к. многих пассажиров в таких вагонах укачивало.
              </p>
            </CardContent>
          </Card>

          {/* Активная система */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                Активная система управления наклоном
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  В активной системе наклон вагона меняется с помощью гидравлического цилиндра или электрического серводвигателя. Управление наклоном — электронное, 
                  зависит от команд датчиков, расположенных под передним вагоном. Вагон отклоняется внутрь поворота, как это делает, например, мотоциклист. Угол наклона — до <strong>8 градусов</strong>.
                </p>
                <p>
                  Механизм начинает действовать, если скорость поезда превышает 70 км/час. Применяется такая система наклона на скоростных поездах Eurostar и ICE многих европейских стран. 
                  Больше всего известны итальянские поезда Pendolino различных модификаций. Это, например, поезд «Аллегро», который ходит из Санкт-Петербурга в Хельсинки, или «Сапсан».
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Пассивная система */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                Пассивная система управления наклоном
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Пассивная система используется в поездах Talgo. Здесь вагон под действием центробежной силы отклоняется наружу. Угол допустимого наклона здесь меньше — до <strong>3.5 градусов</strong>. 
                  Значит, и скорость прохождения поворотов меньше. Но эта система дешевле, т. к. нет необходимости ни в датчиках, ни в элементах управления.
                </p>
                <p>
                  Вагоны Talgo часто используются в ночных поездах, где важнее не скорость, а комфорт. Больше всего поездов с такой системой на железных дорогах в Испании и Германии.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2 text-base">
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

export default TiltingCarriages;
