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
                <div className="bg-muted/50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Больше пространства для ног и ручной клади</li>
                    <li>Улучшенная вентиляция</li>
                    <li>Более удобные спальные места</li>
                    <li>Современный дизайн интерьера</li>
                    <li>Улучшенная шумоизоляция</li>
                  </ul>
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

export default Novyeplatskarty1Vm;
