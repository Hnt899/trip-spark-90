import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Clock, Users, Heart } from "lucide-react";

const Retropoezdsparovozom = () => {
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
          <Link to="/guide" className="hover:text-primary">Транспорт</Link>
          <span>/</span>
          <span>Ретропоезд с паровозом</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Рускеальский экспресс: ретропоезд с паровозом</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Ретропоезда с паровозами — это уникальные туристические маршруты, которые позволяют окунуться в атмосферу прошлого и проехать на историческом паровозе. Рускеальский экспресс — один из таких проектов.
              </p>
              <p className="text-base leading-relaxed">
                Эти маршруты сочетают в себе историю, романтику железных дорог и возможность увидеть красоту природы из окон старинного вагона. Поездка на ретропоезде — это особый опыт, который запоминается надолго.
              </p>
            </CardContent>
          </Card>

          {/* Путешествие во времени */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Путешествие во времени</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Поездка на ретропоезде — это не просто транспорт, а целое приключение, которое переносит пассажиров в другую эпоху. Стук колёс, дым из трубы паровоза, интерьер старинных вагонов — всё это создаёт неповторимую атмосферу.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Ретропоезда позволяют современным людям почувствовать, как путешествовали их предки, когда железные дороги только начинали развиваться. Это живая история, которую можно не только увидеть, но и прочувствовать.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Что делает поездку особенной:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Аутентичная атмосфера прошлого</li>
                    <li>Уникальный звук паровоза</li>
                    <li>Интерьер старинных вагонов</li>
                    <li>Неторопливый темп путешествия</li>
                    <li>Возможность насладиться пейзажами</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Рускеальский экспресс */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Рускеальский экспресс</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Рускеальский экспресс — это один из самых известных ретропоездов в России. Маршрут проходит по живописным местам Карелии, соединяя города и позволяя пассажирам насладиться красотой северной природы.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Поезд ведёт настоящий паровоз, который тщательно поддерживается в рабочем состоянии. Вагоны оформлены в стиле прошлых эпох, что создаёт полное ощущение путешествия во времени.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Особенности маршрута:</strong> Маршрут Рускеальского экспресса проходит через красивые места Карелии, включая знаменитый мраморный каньон Рускеала. Поездка сочетает в себе историю железных дорог и природные достопримечательности.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Что ждёт пассажиров */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Что ждёт пассажиров</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Поездка на ретропоезде — это целое событие. Пассажиров ждёт не только само путешествие, но и множество интересных моментов.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Уникальные ощущения</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Стук колёс, характерный звук паровоза, дым из трубы — всё это создаёт неповторимую атмосферу. Поездка на паровозе отличается от поездки на современном поезде не только внешне, но и по ощущениям.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Интерьер вагонов</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Вагоны ретропоездов оформлены в стиле прошлых эпох. Это может быть стиль начала XX века или советского времени. Интерьер тщательно воссоздан, чтобы максимально передать атмосферу того времени.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Неторопливое путешествие</h3>
                    <p className="text-base leading-relaxed">
                      Ретропоезда движутся не спеша, что позволяет насладиться пейзажами за окном. Это идеальный способ отдохнуть от суеты современной жизни и погрузиться в размеренный ритм путешествия.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Сохранение истории */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Сохранение истории</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ретропоезда играют важную роль в сохранении исторического наследия железных дорог. Они позволяют поддерживать в рабочем состоянии исторические паровозы и вагоны, которые иначе могли бы быть утеряны.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Содержание и эксплуатация паровозов требует больших усилий и средств. Каждый рейс ретропоезда — это результат работы энтузиастов, которые сохраняют историю железных дорог для будущих поколений.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Поездка на ретропоезде — это не только развлечение, но и поддержка важного дела сохранения исторического наследия. Каждый пассажир вносит вклад в то, чтобы эти уникальные локомотивы продолжали работать и радовать людей.
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

export default Retropoezdsparovozom;
