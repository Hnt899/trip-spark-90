import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, DollarSign, Clock, TrendingUp, AlertCircle } from "lucide-react";

const Kogdapokupatbiletyna = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/guide" className="hover:text-primary">Путеводитель</Link>
          <span>/</span>
          <Link to="/guide" className="hover:text-primary">Полезно пассажиру</Link>
          <span>/</span>
          <span>Когда покупать билеты на поезда?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Когда покупать билеты на поезда?</h1>

        <div className="space-y-8">
          {/* Сроки продажи */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Сроки продажи</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  В России билеты на поезда дальнего следования начинают продаваться за 60-90 дней до даты отправления.
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li><strong>60 дней</strong> — для большинства поездов</li>
                  <li><strong>90 дней</strong> — для некоторых популярных направлений</li>
                  <li>Точные сроки можно уточнить на сайте РЖД или GoTrip</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Когда покупать дешевле */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Когда покупать дешевле</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Покупайте заранее</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Билеты обычно дешевле в начале продажи</li>
                    <li>Цены могут повышаться по мере приближения даты</li>
                    <li>Популярные поезда и даты разбираются быстро</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Совет:</strong> Покупайте билеты как можно раньше, особенно на популярные направления (например, в Крым, на курорты) и в праздничные дни.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Особые периоды */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold">Особые периоды</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Когда покупать особенно заранее</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li><strong>Новый год и Рождество</strong> — покупайте за 2-3 месяца</li>
                    <li><strong>Майские праздники</strong> — за 2-3 месяца</li>
                    <li><strong>Летний сезон</strong> (июнь-август) — за 1-2 месяца</li>
                    <li><strong>Популярные маршруты</strong> — чем раньше, тем лучше</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Динамическое ценообразование */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Динамическое ценообразование</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  РЖД использует динамическое ценообразование:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Цены меняются в зависимости от спроса</li>
                  <li>Чем больше билетов продано, тем выше цена</li>
                  <li>Цены могут снижаться, если билетов осталось много</li>
                  <li>Следите за ценами и покупайте при удобном моменте</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Советы */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные советы</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Покупайте заранее</p>
                    <p className="text-sm text-muted-foreground">
                      Лучше купить билет заранее и при необходимости сдать его, чем пытаться купить в последний момент по завышенной цене.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Используйте календарь низких цен</p>
                    <p className="text-sm text-muted-foreground">
                      На сайтах GoTrip и РЖД можно посмотреть календарь с ценами на разные даты и выбрать оптимальную.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Kogdapokupatbiletyna;
