import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Flag } from "lucide-react";

const MayHolidays = () => {
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
          <span>Куда поехать на майские праздники</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Куда поехать на майские праздники</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                Майские праздники — еще одна вереница праздничных дней, когда в нашей стране принято с размахом отдыхать. 
                Пора навестить родных в других городах или просто отправиться в небольшое путешествие.
              </p>
            </CardContent>
          </Card>

          {/* Поезд на майские */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Поезд на майские праздники
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Майские праздники «разорваны» надвое — сначала 3 (иногда — 4) дня отмечается 1 мая, день весны и труда, а потом — День Победы. 
                  Первые выходные негласно принято проводить на даче (если, конечно, она у вас есть), а вторые – наблюдая за салютом.
                </p>
                <p>
                  Разнообразить свой отдых в майские праздники можно небольшим железнодорожным путешествием. Отправляйтесь на поезде в один из городов-героев, 
                  посмотрите на парады, вспомните сами, чем этот день отличается от остальных и расскажите об этом своим детям. В эти дни, как правило, 
                  во всех городах проходит множество мероприятий, посвященных великой Победе — есть шанс посмотреть на места, описанные в учебнике истории, своими глазами. 
                  Посмотрите на величие городов, на мирное небо над головой и задумайтесь, какую цену пришлось за это заплатить много лет назад.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Европа */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Путешествие в Европу
              </h2>
              <p className="text-base leading-relaxed">
                На майские праздники можно отправиться в Европу на поезде — например, в Париж или Прагу. 
                Купить ж/д билеты на поезда до европейских городов можно на сайте TudaSuda.
              </p>
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

export default MayHolidays;
