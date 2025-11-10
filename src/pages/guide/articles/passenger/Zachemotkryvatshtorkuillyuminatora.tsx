import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, AlertCircle, CheckCircle, Plane } from "lucide-react";

const Zachemotkryvatshtorkuillyuminatora = () => {
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
          <span>Зачем открывать шторку иллюминатора?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Зачем открывать шторку иллюминатора?</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Открытие шторок иллюминаторов при взлёте и посадке самолёта является важной мерой безопасности. Это требование авиакомпаний, которое помогает обеспечить безопасность пассажиров и экипажа в критических фазах полёта.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Обзор для экипажа */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Обзор для экипажа</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  В случае нештатной ситуации экипаж должен иметь полный обзор окружающей обстановки через окна самолета.
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Бортпроводники могут наблюдать за происходящим за бортом и своевременно реагировать на возможные нештатные ситуации</li>
                  <li>Экипаж может быстро оценить обстановку снаружи и принять правильное решение</li>
                  <li>При эвакуации экипаж видит, какие выходы безопасны и доступны</li>
                  <li>Можно заметить дым, огонь или другие проблемы снаружи самолета</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Адаптация зрения */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Адаптация зрения пассажиров</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  При аварийной ситуации пассажирам может потребоваться быстро покинуть самолет. Открытые шторки и выключенный в салоне свет помогают глазам адаптироваться к внешним условиям.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Адаптация зрения происходит как к яркому свету (если полёт днём), так и к темноте (если полёт ночью). Это облегчает эвакуацию в случае необходимости, так как глаза уже привыкли к внешнему освещению.
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Глаза пассажиров и экипажа заранее адаптируются к естественному освещению</li>
                  <li>При эвакуации не будет резкого перехода от яркого света салона к темноте или наоборот</li>
                  <li>Пассажиры могут быстро сориентироваться в пространстве и найти выходы</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Почему именно при взлете и посадке */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Почему именно при взлете и посадке</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Взлет и посадка — это самые опасные фазы полета. Большинство аварий происходят именно в эти моменты.
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>В эти моменты самолет находится близко к земле</li>
                  <li>Скорость самолета высокая, а времени на реакцию мало</li>
                  <li>При аварийной ситуации важна каждая секунда</li>
                  <li>Экипаж должен быстро оценить ситуацию и принять решение</li>
                  <li>Пассажиры должны быть готовы к быстрой эвакуации</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Что будет, если не открыть */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold">Что будет, если не открыть</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Бортпроводники обязательно попросят вас открыть шторку. Это не прихоть, а требование безопасности, установленное авиакомпаниями и авиационными правилами.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Помните:</strong> Соблюдение требований безопасности — это вклад каждого пассажира в общую безопасность полета. Даже если вам кажется, что это не важно, это может спасти жизни в критической ситуации.
                  </p>
                </div>
                <p className="text-base leading-relaxed">
                  Отказ открыть шторку может создать проблемы не только для вас, но и для других пассажиров, так как это мешает экипажу и пассажирам быстро оценить ситуацию в случае аварии.
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

export default Zachemotkryvatshtorkuillyuminatora;
