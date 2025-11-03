import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { TicketCheck, Bus, AlertCircle, CheckCircle, User } from "lucide-react";

const Kakproveryayutbiletyna = () => {
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
          <span>Как проверяют билеты на автобус?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как проверяют билеты на автобус?</h1>

        <div className="space-y-8">
          {/* Где проверяют */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Где проверяют билеты</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">При посадке</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Контроллер или водитель проверяет билеты при входе в автобус</li>
                    <li>Проверяет соответствие данных в билете документу</li>
                    <li>Может проверить наличие билета в списке пассажиров</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">В пути</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Контроллеры могут проверить билеты во время поездки</li>
                    <li>Особенно на междугородных и международных рейсах</li>
                    <li>Проверка может проводиться на остановках или в пути</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Что проверяют */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TicketCheck className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что проверяют</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Наличие билета</li>
                  <li>Соответствие данных пассажира в билете документу</li>
                  <li>Правильность маршрута и даты</li>
                  <li>Наличие билета в списке пассажиров</li>
                  <li>Оплату билета</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Электронные билеты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Электронные билеты</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  При использовании электронного билета:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Можно показать билет на экране телефона</li>
                  <li>Или распечатанную копию</li>
                  <li>Контроллер может отсканировать QR-код</li>
                  <li>Предъявите документ, удостоверяющий личность</li>
                </ul>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Совет:</strong> Сохраните билет на телефон или распечатайте заранее. В некоторых местах может не быть интернета.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Сохраняйте билет */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold">Важно</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Сохраняйте билет до конца поездки</li>
                  <li>Билет могут проверить несколько раз</li>
                  <li>Без билета вас могут оштрафовать</li>
                  <li>Имейте при себе документ, удостоверяющий личность</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Kakproveryayutbiletyna;
