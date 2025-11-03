import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Wheelchair, Plane, Train, CheckCircle, AlertCircle, Phone } from "lucide-react";

const Puteshestvovatnainvalidnomkresle = () => {
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
          <span>Путешествовать на инвалидном кресле?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Можно ли путешествовать на инвалидном кресле?</h1>

        <div className="space-y-8">
          {/* Да, можно */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Да, можно!</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Путешествие на инвалидном кресле возможно! Современный транспорт и инфраструктура позволяют людям с ограниченными возможностями передвигаться комфортно.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Главное — заранее уведомить перевозчика о своих потребностях, чтобы они могли подготовить необходимые услуги.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* В самолёте */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">В самолёте</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Услуги авиакомпаний</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Специальная регистрация и посадка</li>
                    <li>Помощь при пересадке в кресло самолета</li>
                    <li>Хранение инвалидного кресла в багаже</li>
                    <li>Специальные места в салоне</li>
                    <li>Помощь бортпроводников</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Что нужно сделать</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Уведомите авиакомпанию о потребностях при покупке билета</li>
                    <li>Закажите специальные услуги заранее (минимум за 48 часов)</li>
                    <li>Приезжайте в аэропорт заранее</li>
                    <li>Сообщите о типе кресла и его размерах</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* В поезде */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">В поезде</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Услуги РЖД</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Специальные места для инвалидных колясок</li>
                    <li>Пандусы для посадки</li>
                    <li>Помощь проводников</li>
                    <li>Специальные вагоны</li>
                    <li>Дополнительное место для кресла</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Бронирование</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Уведомите при покупке билета о потребностях</li>
                    <li>Забронируйте специальное место</li>
                    <li>Сообщите о размерах кресла</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Важные моменты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold">Важные моменты</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Уведомляйте перевозчика заранее (минимум за 48 часов)</li>
                  <li>Проверяйте доступность инфраструктуры в местах назначения</li>
                  <li>Берите с собой запасные части для кресла</li>
                  <li>Узнайте о доступности вокзалов и аэропортов</li>
                  <li>Рассмотрите возможность сопровождения</li>
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
                  <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Связывайтесь заранее</p>
                    <p className="text-sm text-muted-foreground">
                      Связывайтесь с перевозчиками заранее, чтобы обсудить ваши потребности и убедиться, что все услуги будут предоставлены.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Планируйте маршрут</p>
                    <p className="text-sm text-muted-foreground">
                      Планируйте маршрут с учетом доступности инфраструктуры в пунктах назначения.
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

export default Puteshestvovatnainvalidnomkresle;
