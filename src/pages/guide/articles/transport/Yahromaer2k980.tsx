import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Clock, Info } from "lucide-react";

const Yahromaer2k980 = () => {
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
          <span>Яхрома ЭР2К-980</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Ретроэлектричка Яхрома ЭР2К-980</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                ЭР2К-980 «Яхрома» — это восстановленная ретроэлектричка, которая используется для туристических поездок. Это восстановленный и отреставрированный электропоезд серии ЭР2, который позволяет пассажирам окунуться в атмосферу советских времён.
              </p>
              <p className="text-base leading-relaxed">
                «Яхрома» — это не просто транспорт, а живая история железных дорог, которая даёт возможность современным пассажирам проехать на электричке, которая когда-то была обычным явлением на пригородных маршрутах.
              </p>
            </CardContent>
          </Card>

          {/* История восстановления */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">История восстановления</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  ЭР2К-980 был восстановлен и отреставрирован энтузиастами железных дорог. Работа по восстановлению включала не только техническое восстановление, но и воссоздание аутентичного интерьера и внешнего вида.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Восстановление такого поезда — это сложная и кропотливая работа, требующая знаний, опыта и любви к железным дорогам. Каждая деталь была тщательно восстановлена или воссоздана.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Интересный факт:</strong> Восстановление ретроэлектричек — это способ сохранить историю железных дорог и дать возможность людям прикоснуться к прошлому.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Особенности ЭР2 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Особенности серии ЭР2</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  ЭР2 — это одна из самых массовых серий советских электричек. Эти поезда производились с 1962 года и долгие годы были основой пригородного сообщения.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Характеристики ЭР2:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Максимальная скорость: 130 км/ч</li>
                    <li>Классический дизайн советской эпохи</li>
                    <li>Надёжная и простая конструкция</li>
                    <li>Характерный звук и вибрация</li>
                    <li>Аутентичный интерьер</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Туристические поездки */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Туристические поездки</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  «Яхрома» используется для туристических поездок, которые позволяют пассажирам не только добраться до места назначения, но и получить уникальный опыт путешествия на ретроэлектричке.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Поездка на «Яхроме» — это путешествие во времени. Интерьер вагонов, звуки, вибрация — всё это переносит пассажиров в прошлое, когда такие электрички были обычным явлением.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    Туристические поездки на «Яхроме» особенно популярны среди любителей железных дорог, фотографов и людей, интересующихся историей транспорта.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Атмосфера советской эпохи */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Атмосфера советской эпохи</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Поездка на «Яхроме» — это возможность окунуться в атмосферу советской эпохи. Интерьер вагонов, плакаты, объявления — всё воссоздано с максимальной точностью.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Для многих пассажиров это ностальгическое путешествие, которое напоминает о поездках в детстве или юности. Для молодого поколения это возможность увидеть, как выглядели электрички в прошлом.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> «Яхрома» — это не просто транспорт, а живой музей на колёсах, который сохраняет историю железных дорог для будущих поколений.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Сохранение истории */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Сохранение истории</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Восстановление и эксплуатация «Яхромы» — это важный вклад в сохранение исторического наследия железных дорог. Каждая поездка помогает поддерживать этот уникальный поезд в рабочем состоянии.
                </p>
                <p className="text-base leading-relaxed">
                  Такие проекты показывают, что история железных дорог — это не только музейные экспонаты, но и живые, работающие поезда, которые продолжают радовать людей и напоминать о прошлом.
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

export default Yahromaer2k980;
