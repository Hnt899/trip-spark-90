import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, FileText, CheckCircle, AlertCircle, DollarSign, Plane } from "lucide-react";

const Kakpoehatvstranu = () => {
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
          <span>Как поехать в страну без турпакетов?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как поехать в страну без турпакетов?</h1>

        <div className="space-y-8">
          {/* Планирование */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Самостоятельное планирование</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Путешествие без турпакета требует больше подготовки, но дает больше свободы и часто обходится дешевле.
                </p>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Что нужно спланировать</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li><strong>Билеты на транспорт</strong> — самолет, поезд, автобус</li>
                    <li><strong>Проживание</strong> — отель, хостел, апартаменты</li>
                    <li><strong>Виза</strong> — если требуется для страны назначения</li>
                    <li><strong>Маршрут</strong> — что посмотреть, куда поехать</li>
                    <li><strong>Страховка</strong> — медицинская страховка обязательна</li>
                    <li><strong>Бюджет</strong> — планирование расходов</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Билеты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Покупка билетов</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Билеты можно купить самостоятельно:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Через сайты авиакомпаний</li>
                  <li>Через агрегаторы билетов (TudaSuda и другие)</li>
                  <li>Сравнивайте цены на разных платформах</li>
                  <li>Покупайте заранее для лучших цен</li>
                </ul>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Совет:</strong> Используйте календарь низких цен, чтобы найти оптимальные даты для поездки.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Проживание */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Бронирование жилья</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Варианты размещения:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li><strong>Отели</strong> — бронирование через Booking.com, Agoda и другие платформы</li>
                  <li><strong>Хостелы</strong> — бюджетный вариант для путешественников</li>
                  <li><strong>Апартаменты</strong> — через Airbnb и аналогичные сервисы</li>
                  <li><strong>Гостевые дома</strong> — более аутентичный опыт</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Виза */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Оформление визы</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Если для страны нужна виза, нужно оформить ее самостоятельно:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Узнайте требования к визе на сайте посольства страны</li>
                  <li>Соберите необходимые документы</li>
                  <li>Подайте заявление в посольство или визовый центр</li>
                  <li>Оплатите консульский сбор</li>
                  <li>Дождитесь решения</li>
                </ul>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Начинайте оформление визы заранее, так как процесс может занять несколько недель.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Преимущества */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Преимущества самостоятельного путешествия</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Экономия</p>
                    <p className="text-sm text-muted-foreground">
                      Обычно самостоятельное путешествие обходится дешевле, чем турпакет.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Свобода</p>
                    <p className="text-sm text-muted-foreground">
                      Вы можете планировать маршрут по своему желанию и менять планы в процессе.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Опыт</p>
                    <p className="text-sm text-muted-foreground">
                      Самостоятельное путешествие дает больше аутентичного опыта и знакомства с местной культурой.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Советы */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные советы</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Изучите страну</p>
                    <p className="text-sm text-muted-foreground">
                      Перед поездкой изучите обычаи, законы, особенности страны назначения. Это поможет избежать проблем.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Составьте план</p>
                    <p className="text-sm text-muted-foreground">
                      Составьте примерный план поездки, но оставьте место для спонтанности.
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

export default Kakpoehatvstranu;
