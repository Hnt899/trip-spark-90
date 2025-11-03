import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, AlertCircle, DollarSign, Plane, CheckCircle } from "lucide-react";

const ChtodelatEsliaviareys = () => {
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
          <span>Что делать, если авиарейс задержали?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что делать, если авиарейс задержали?</h1>

        <div className="space-y-8">
          {/* Первые действия */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Первые действия</h2>
              </div>

              <div className="space-y-4">
                <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Узнайте причину задержки и новое время вылета</li>
                  <li>Проверьте информационное табло и следите за объявлениями</li>
                  <li>Сохраните все документы: билет, посадочный талон, чеки</li>
                  <li>Свяжитесь с авиакомпанией для уточнения информации</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Права пассажира */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Ваши права</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">При задержке более 2 часов</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Бесплатное питание и напитки (если ожидание более 2 часов)</li>
                    <li>Бесплатные телефонные звонки</li>
                    <li>Доступ в интернет</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">При задержке более 4 часов (ЕС)</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Компенсация в зависимости от расстояния полета</li>
                    <li>Бесплатное питание и напитки</li>
                    <li>Бесплатный отель (при ночной задержке)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">При задержке более 5 часов</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Право на возврат полной стоимости билета</li>
                    <li>Перебронирование на другой рейс</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Компенсация */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Компенсация</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Размер компенсации зависит от причины задержки и правил авиакомпании:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Если задержка по вине авиакомпании — право на компенсацию</li>
                  <li>Если задержка из-за форс-мажора (погода, забастовки) — компенсация не положена</li>
                  <li>Размер компенсации зависит от расстояния и времени задержки</li>
                </ul>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Сохраните все документы и чеки, связанные с задержкой. Они понадобятся для получения компенсации.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Что делать */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Как получить компенсацию</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Plane className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Обратитесь к авиакомпании</p>
                    <p className="text-sm text-muted-foreground">
                      Подайте заявление в авиакомпанию с требованием компенсации. Приложите все необходимые документы.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Если отказали</p>
                    <p className="text-sm text-muted-foreground">
                      Если авиакомпания отказывается выплачивать компенсацию, вы можете обратиться в суд или к регулятору авиации.
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

export default ChtodelatEsliaviareys;
