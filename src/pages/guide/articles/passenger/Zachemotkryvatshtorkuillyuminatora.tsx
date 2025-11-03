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
          <span>Почему надо открывать шторку иллюминатора?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Почему надо открывать шторку иллюминатора при взлете и посадке?</h1>

        <div className="space-y-8">
          {/* Безопасность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Безопасность</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Открытые шторки иллюминаторов — это требование безопасности, а не просто формальность.
                </p>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Причины требования</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li><strong>Адаптация глаз</strong> — глаза пассажиров и экипажа адаптируются к естественному освещению</li>
                    <li><strong>Видимость наружу</strong> — при аварийной ситуации пассажиры и экипаж могут видеть, что происходит снаружи</li>
                    <li><strong>Оценка ситуации</strong> — можно быстро оценить обстановку и принять решение о эвакуации</li>
                    <li><strong>Обнаружение проблем</strong> — можно заметить дым, огонь или другие проблемы снаружи самолета</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Взлет и посадка */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
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
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Помощь экипажу */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Помощь экипажу</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Открытые шторки помогают экипажу быстро оценить ситуацию в салоне и снаружи:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Бортпроводники могут видеть все иллюминаторы и быстро понять, где возникла проблема</li>
                  <li>При эвакуации экипаж видит, какие выходы безопасны</li>
                  <li>Пассажиры могут быстро сориентироваться в пространстве</li>
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
                  Бортпроводники обязательно попросят вас открыть шторку. Это не прихоть, а требование безопасности.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Помните:</strong> Соблюдение требований безопасности — это вклад каждого пассажира в общую безопасность полета. Даже если вам кажется, что это не важно, это может спасти жизни в критической ситуации.
                  </p>
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

export default Zachemotkryvatshtorkuillyuminatora;
