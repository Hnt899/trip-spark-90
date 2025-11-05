import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Plane, Heart } from "lucide-react";

const BuyTicketTips = () => {
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
          <span>Как купить билет на поезд</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Как купить билет на поезд</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                Путешествовать можно разными способами — пешком, на велосипеде, на автомобиле, поезде или самолете. 
                Самыми популярными и доступными средствами перемещения на далекие расстояния остаются поезд и самолет.
              </p>
            </CardContent>
          </Card>

          {/* Преимущества поезда */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                Почему выбирают поезд
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Самолет, конечно, безусловный лидер по скорости перемещения пассажира из точки А в точку Б. Однако множество людей продолжают хранить верность ж/д поездкам. 
                  Причина проста: аэропорты есть только в крупных городах. А вот железнодорожными путями опутана почти вся территория нашей страны.
                </p>
                <p>
                  У путешествия на поезде есть масса достоинств: начиная от уникальной дорожной атмосферы с перестуком колес и звоном ложечки в стакане железнодорожного чая 
                  и заканчивая возможностью добраться до самых маленьких, провинциальных городков, куда не летят самолеты. Поезд любят аэрофобы, те, кто боятся оказаться между небом и землей. 
                  Они готовы потратить больше времени на дорогу. Чем больше времени в пути — тем больше впечатлений.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Покупка на TudaSuda */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Heart className="w-6 h-6 text-primary" />
                Покупка на TudaSuda
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  На TudaSuda можно легко выбрать и безопасно оплатить ж/д билеты. Такие билеты ничем не отличаются от билетов, приобретенных в кассе. 
                  Электронный билет совершенно равноправен с билетом на бланке — по тому и другому вас обязательно пустят в поезд.
                </p>
                <p>
                  Электронная регистрация, которая доступна на большинство поездов, курсирующих внутри России, гарантирует, что вы внесены в списки пассажиров.
                </p>
                <p>
                  После покупки билетов останется только приехать на вокзал в день отправления поезда и предъявить проводнику оригинал удостоверения личности по которому заказывали билет. 
                  Это может быть паспорт или свидетельство о рождении. Иногда проводники просят показать еще и посадочный купон. Вы можете распечатать его или продемонстрировать на экране своего смартфона или планшета.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Когда покупать */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                Когда лучше покупать билеты
              </h2>
              <p className="text-base leading-relaxed">
                Лучше покупать билеты заранее — так больше выбор мест и билет может стоить дешевле. На большинство поездов по России билеты продаются за 90 дней, на некоторые поезда — за 120 дней.
              </p>
              <p className="text-base leading-relaxed mt-3">
                <Link to="/reference/trains/ticket-sales-periods" className="text-primary hover:underline">
                  Подробнее о сроках продажи билетов
                </Link>
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
                    Как купить ж/д билет: пошаговая инструкция
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

export default BuyTicketTips;
