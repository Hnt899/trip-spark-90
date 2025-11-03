import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Plane, AlertCircle, MapPin, Phone } from "lucide-react";

const GdeposadkaEslipassazhiru = () => {
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
          <span>Где посадка, если пассажиру плохо?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Если кому-то стало плохо, где посадят в конечном аэропорту или по дороге?</h1>

        <div className="space-y-8">
          {/* На борту */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Если пассажиру стало плохо на борту</h2>
              </div>

              <div className="space-y-4">
                <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Немедленно обратитесь к бортпроводникам</li>
                  <li>Бортпроводники имеют базовую медицинскую подготовку</li>
                  <li>На борту есть аптечка первой помощи</li>
                  <li>Экипаж может связаться с врачом на земле для консультации</li>
                  <li>Капитан принимает решение о необходимости экстренной посадки</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Экстренная посадка */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Экстренная посадка</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Если состояние пассажира критическое, капитан может принять решение об экстренной посадке:
                </p>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Где могут посадить</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li><strong>Ближайший аэропорт</strong> — по маршруту полета, который имеет возможность принять самолет</li>
                    <li><strong>Аэропорт назначения</strong> — если полет близок к завершению</li>
                    <li><strong>Аэропорт вылета</strong> — если проблема возникла в начале полета</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Решение об экстренной посадке принимает только капитан воздушного судна на основе рекомендаций медицинских специалистов и оценки ситуации.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Медицинская помощь */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Медицинская помощь при посадке</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  При экстренной посадке в аэропорту:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Скорая медицинская помощь ожидает самолет на перроне</li>
                    <li>Пассажира транспортируют в медицинское учреждение</li>
                    <li>Остальные пассажиры продолжают полет или ждут следующего рейса</li>
                    <li>Авиакомпания обычно помогает с продолжением поездки</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Что делать */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Что делать, если вам плохо</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Немедленно сообщите</p>
                    <p className="text-sm text-muted-foreground">
                      Не стесняйтесь сообщить бортпроводникам, если вам плохо. Они обучены оказывать первую помощь.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Возьмите лекарства</p>
                    <p className="text-sm text-muted-foreground">
                      Если у вас есть хронические заболевания, возьмите необходимые лекарства в ручную кладь.
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

export default GdeposadkaEslipassazhiru;
