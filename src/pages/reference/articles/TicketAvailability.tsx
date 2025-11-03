import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Clock, Calendar, CheckCircle } from "lucide-react";

const TicketAvailability = () => {
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
          <span>Наличие ж/д билетов</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Наличие жд билетов</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                Всем хочется доехать до нужной станции хорошо и быстро. Первое, что мы делаем — смотрим расписание РЖД. Выбираем удобное время отправления и прибытия, 
                какой поезд (обычный или скоростной), думаем, какой вагон лучше: купе, плацкарт, сидячий, а, может, люкс? Решаем, что для нас важнее — удобство или цены на жд билеты. 
                Хорошо, если поездка планируется заранее и можно сделать все не спеша. В любом случае нужно, чтобы на выбранный нами поезд были билеты.
              </p>
            </CardContent>
          </Card>

          {/* Сроки продажи */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Когда лучше покупать билеты на поезд?
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Как правило, билеты начинают продавать за <strong>90 суток</strong> до отправления поезда, в 8:00 по московскому времени. 
                  На международные маршруты и некоторые популярные скоростные поезда (например, на направлении Москва-Санкт-Петербург) билеты доступны за <strong>60 суток</strong>.
                </p>
                <p>
                  Для поездов, проходящих через Украину, информация о наличии свободных мест появляется в системе за <strong>30 суток</strong>. 
                  Если нужно уехать не с конечной точки маршрута, а с промежуточной станции, и ваш вагон прицепной, то свободные места будут видны кассиру только за <strong>3 суток</strong> до даты отправления.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Выбор онлайн */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Search className="w-6 h-6 text-primary" />
                Выбор билетов онлайн
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Заказывая билеты онлайн, на сайте, помнить все эти сроки не обязательно. При любом запросе расписания система скажет вам, на какие даты возможен заказ билета. 
                  Наличие билетов на поезд вы увидите так же, как это видит кассир на вокзале. Можно не выходя из дома выбрать подходящий поезд и вагон.
                </p>
                <p>
                  На схеме вагона — выбрать удобное место: верхнее (вы, например, собираетесь всю дорогу проспать и не хотите, чтобы вас тревожили), нижнее — для пожилого родственника, 
                  или целое купе для дружной компании.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Процесс покупки */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-primary" />
                Процесс оформления билета
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Теперь осталось сообщить системе данные пассажиров: имя, фамилию, дату и место рождения и номер документа, на который оформляется билет. 
                  Сложного здесь ничего нет, на каждом шаге есть подсказки. И всегда готовы помочь операторы контакт-центра.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900">
                    Просим учесть, что выбранные вами места система хранит в течение <strong>15 минут</strong>, за это время нужно успеть оплатить заказ. 
                    Быстрее всего это сделать банковской картой.
                  </p>
                </div>
                <p>
                  Если на поезд есть электронная регистрация, проходим ее, и — приятного путешествия!
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

export default TicketAvailability;
