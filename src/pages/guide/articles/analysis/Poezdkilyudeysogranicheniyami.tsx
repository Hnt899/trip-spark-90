import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Building2, Plane, Train, Bus, MapPin, CheckCircle, AlertCircle, Info } from "lucide-react";

const Poezdkilyudeysogranicheniyami = () => {
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
          <Link to="/guide" className="hover:text-primary">Разборы</Link>
          <span>/</span>
          <span>Поездки людей с ограничениями по здоровью</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как путешествуют по России люди с ограничениями по здоровью</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Путешествие — это право каждого человека, независимо от его физических возможностей. В России всё больше делается для того, чтобы сделать путешествия доступными для людей с ограничениями по здоровью.
              </p>
              <p className="text-base leading-relaxed">
                Современные технологии, законодательство и осознание важности доступного туризма делают путешествия по России реальностью для людей с инвалидностью.
              </p>
            </CardContent>
          </Card>

          {/* Железнодорожный транспорт */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Железнодорожный транспорт</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Российские железные дороги (РЖД) активно развивают услуги для людей с ограниченными возможностями:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Специальные вагоны</p>
                      <p className="text-sm text-muted-foreground">
                        В некоторых поездах есть специальные купе для людей с ограниченными возможностями с широкими дверями, специальным туалетом и местом для инвалидной коляски
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Скидки на билеты</p>
                      <p className="text-sm text-muted-foreground">
                        Людям с инвалидностью предоставляются существенные скидки на билеты (до 50% и более)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Помощь при посадке</p>
                      <p className="text-sm text-muted-foreground">
                        На вокзалах можно заказать помощь при посадке и высадке из поезда
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Доступные вокзалы</p>
                      <p className="text-sm text-muted-foreground">
                        Многие крупные вокзалы оборудованы пандусами, лифтами и другими приспособлениями
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Как заказать:</strong> При покупке билета обязательно укажите о необходимости специального места или помощи. Это можно сделать на сайте РЖД, в кассе или по телефону службы поддержки.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Авиационный транспорт */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Авиационный транспорт</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Авиакомпании также предоставляют специальные услуги для людей с ограниченными возможностями:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Коляски для передвижения</p>
                      <p className="text-sm text-muted-foreground">
                        Аэропорты предоставляют коляски для передвижения по терминалу
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Помощь при регистрации и посадке</p>
                      <p className="text-sm text-muted-foreground">
                        Сотрудники аэропорта помогают с регистрацией, досмотром и посадкой в самолёт
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Специальные места в самолёте</p>
                      <p className="text-sm text-muted-foreground">
                        В некоторых самолётах есть места с более широким проходом и возможностью размещения коляски
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Перевозка инвалидной коляски</p>
                      <p className="text-sm text-muted-foreground">
                        Инвалидная коляска перевозится бесплатно в багажном отделении
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Обязательно уведомите авиакомпанию о ваших потребностях при бронировании билета (минимум за 48 часов до вылета). Принесите медицинские документы, подтверждающие необходимость помощи.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Автобусный транспорт */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Автобусный транспорт</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Доступность автобусного транспорта пока ограничена, но ситуация улучшается:
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Что доступно:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>В крупных городах появляются низкопольные автобусы с пандусами</li>
                    <li>Междугородние перевозчики могут помочь с посадкой (нужно предупредить заранее)</li>
                    <li>Некоторые перевозчики предоставляют скидки</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Совет:</strong> Заранее свяжитесь с перевозчиком, чтобы уточнить возможности посадки и необходимые условия. Возможно, потребуется помощь сопровождающего.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Отели и размещение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Отели и размещение</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  В России постепенно появляется всё больше доступных отелей и гостиниц:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Доступные номера</p>
                      <p className="text-sm text-muted-foreground">
                        Многие отели имеют номера, адаптированные для людей с ограниченными возможностями: широкие двери, специальные туалеты, поручни
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Доступная инфраструктура</p>
                      <p className="text-sm text-muted-foreground">
                        Пандусы, лифты, доступные входы в здание и общественные зоны
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Помощь персонала</p>
                      <p className="text-sm text-muted-foreground">
                        Персонал готов помочь с багажом и передвижением по отелю
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>При бронировании:</strong> Укажите ваши потребности при бронировании. Многие крупные отели и хостелы имеют доступные номера. Проверьте наличие доступных номеров на сайтах отелей или при звонке.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Доступность туристических объектов */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Доступность туристических объектов</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ситуация с доступностью музеев, театров и других туристических объектов улучшается:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Музеи и галереи</p>
                    <p className="text-sm text-muted-foreground">
                      Многие крупные музеи имеют доступные входы, лифты и специальные программы для людей с ограниченными возможностями
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Театры</p>
                    <p className="text-sm text-muted-foreground">
                      В крупных театрах есть места для людей с инвалидностью, доступные входы и туалеты
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Парки и заповедники</p>
                    <p className="text-sm text-muted-foreground">
                      Некоторые парки имеют доступные тропы и маршруты, но это пока редкость
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Совет:</strong> Заранее уточняйте доступность объектов, которые хотите посетить. Многие музеи и театры предоставляют информацию о доступности на своих сайтах или по телефону.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Полезные советы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Полезные советы для путешественников</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="text-base font-semibold mb-1">Планируйте заранее</p>
                      <p className="text-sm text-muted-foreground">
                        Заблаговременно уведомляйте перевозчиков и отели о ваших потребностях. Это поможет им лучше подготовиться.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="text-base font-semibold mb-1">Берите документы</p>
                      <p className="text-sm text-muted-foreground">
                        Имейте при себе документы, подтверждающие инвалидность, для получения скидок и помощи.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="text-base font-semibold mb-1">Изучайте маршруты</p>
                      <p className="text-sm text-muted-foreground">
                        Перед поездкой изучите доступность маршрутов и объектов, которые хотите посетить.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                      4
                    </div>
                    <div>
                      <p className="text-base font-semibold mb-1">Рассмотрите сопровождение</p>
                      <p className="text-sm text-muted-foreground">
                        В некоторых случаях может быть полезно взять с собой сопровождающего для помощи в путешествии.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                      5
                    </div>
                    <div>
                      <p className="text-base font-semibold mb-1">Используйте специализированные ресурсы</p>
                      <p className="text-sm text-muted-foreground">
                        Существуют сайты и организации, которые предоставляют информацию о доступном туризме в России.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Заключение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Путешествия доступны каждому</h2>
              </div>

              <p className="text-base leading-relaxed mb-4">
                Хотя доступность туризма в России ещё развивается, уже сегодня люди с ограничениями по здоровью могут путешествовать по стране. Ключ к успешному путешествию — это тщательное планирование и знание своих прав и возможностей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Помните: путешествие — это право каждого человека. Не бойтесь обращаться за помощью и требовать доступности. Каждое обращение помогает сделать туризм более доступным для всех.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Если вы столкнулись с дискриминацией или недоступностью услуг, не молчите. Обращайтесь к руководству компании, в органы власти или организации по защите прав людей с инвалидностью.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Poezdkilyudeysogranicheniyami;
