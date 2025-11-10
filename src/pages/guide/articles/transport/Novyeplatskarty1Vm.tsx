import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Bed, Users, Info } from "lucide-react";

const Novyeplatskarty1Vm = () => {
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
          <span>Новые плацкарты 1-ВМ</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Новый плацкарт 1-ВМ: комфорт нового поколения</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Плацкартные вагоны 1-ВМ — это новое поколение вагонов с улучшенной планировкой и повышенным комфортом для пассажиров. Эти вагоны представляют собой результат модернизации классических плацкартных вагонов.
              </p>
              <p className="text-base leading-relaxed">
                Давайте узнаем, что нового появилось в вагонах 1-ВМ и чем они отличаются от традиционных плацкартных вагонов.
              </p>
            </CardContent>
          </Card>

          {/* Что изменилось */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bed className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что изменилось в новых плацкартах</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Улучшенная планировка</h3>
                  <p className="text-base leading-relaxed mb-3">
                    В вагонах 1-ВМ применена новая планировка, которая обеспечивает больше пространства для пассажиров. Места расположены таким образом, чтобы каждому пассажиру было комфортно.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Современные материалы</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Использованы новые материалы для обивки, что делает поездку более комфортной и приятной.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Улучшенное освещение</h3>
                  <p className="text-base leading-relaxed">
                    Современная система освещения позволяет создать комфортную атмосферу в вагоне в любое время суток.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Преимущества */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Преимущества для пассажиров</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Вагоны 1-ВМ предлагают множество преимуществ, которые делают поездку более комфортной и приятной. Эти улучшения заметны сразу при входе в вагон.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Больше пространства для ног и ручной клади</li>
                    <li>Улучшенная вентиляция</li>
                    <li>Более удобные спальные места</li>
                    <li>Современный дизайн интерьера</li>
                    <li>Улучшенная шумоизоляция</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Все эти улучшения работают вместе, создавая более комфортную атмосферу в вагоне. Пассажиры отмечают, что поездка в вагонах 1-ВМ более приятная, чем в традиционных плацкартных вагонах.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Детали улучшений */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Детали улучшений</h2>
              </div>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Пространство для ног</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Улучшенная планировка обеспечивает больше места для ног, что особенно важно для высоких пассажиров. Это делает поездку более комфортной, особенно во время длительных путешествий.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Вентиляция</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Современная система вентиляции обеспечивает постоянный приток свежего воздуха в вагон. Это создаёт более комфортную атмосферу и улучшает самочувствие пассажиров.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Спальные места</h3>
                    <p className="text-base leading-relaxed">
                      Спальные места в вагонах 1-ВМ более удобные и просторные. Улучшенные матрасы и постельное бельё делают ночной отдых более качественным.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Сравнение с традиционными вагонами */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Сравнение с традиционными вагонами</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Вагоны 1-ВМ представляют собой эволюцию традиционных плацкартных вагонов. Они сохраняют все преимущества плацкарта, но добавляют современный комфорт и удобство.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Что осталось от традиционных вагонов:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Открытая планировка</li>
                    <li>Доступная цена</li>
                    <li>Возможность общения с попутчиками</li>
                    <li>Традиционная атмосфера поездки</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Что добавилось нового:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Больше пространства</li>
                    <li>Современные материалы</li>
                    <li>Улучшенное освещение</li>
                    <li>Лучшая вентиляция</li>
                    <li>Современный дизайн</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Где можно встретить */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Где можно встретить вагоны 1-ВМ</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Вагоны 1-ВМ постепенно появляются на различных маршрутах дальнего следования. Они используются в составе поездов разных категорий и направлений.
                </p>
                <p className="text-base leading-relaxed">
                  При покупке билета можно уточнить тип вагона, чтобы выбрать наиболее подходящий вариант. Вагоны 1-ВМ особенно популярны среди пассажиров, которые ценят комфорт и современные удобства.
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

export default Novyeplatskarty1Vm;
