import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Package, AlertCircle, Globe, CheckCircle } from "lucide-react";

const Mozhnoliprovezti18 = () => {
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
          <span>Можно ли провезти 18 литров пива?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Можно ли провезти 18 литров пива?</h1>

        <div className="space-y-8">
          {/* В России */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Перевозка по России</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">В поезде</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Алкоголь можно провозить в багаже</li>
                    <li>Нет строгих ограничений по количеству для личного пользования</li>
                    <li>18 литров пива обычно можно провезти</li>
                    <li>Банки или бутылки должны быть хорошо упакованы</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">В автобусе</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Ограничения зависят от перевозчика</li>
                    <li>Обычно можно провозить в багаже</li>
                    <li>Уточните у перевозчика заранее</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* За границу */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">При поездках за границу</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  При международных поездках действуют строгие ограничения:
                </p>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Ограничения</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Обычно можно провезти до 2-3 литров алкоголя на одного взрослого</li>
                    <li>18 литров — это значительно больше нормы</li>
                    <li>За превышение могут быть штрафы и конфискация</li>
                    <li>Правила различаются в зависимости от страны</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Важно:</p>
                  <p className="text-sm leading-relaxed">
                    При международных поездках 18 литров пива провезти нельзя. Это превышает норму беспошлинного ввоза алкоголя. Уточните правила таможни страны назначения.
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
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">В самолёте</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Багаж</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Алкоголь можно провозить в багаже</li>
                    <li>Ограничения по весу багажа</li>
                    <li>При международных перелетах действуют таможенные ограничения</li>
                    <li>Крепость алкоголя ограничена (обычно до 70%)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Ручная кладь</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Алкоголь из дьюти-фри можно провозить в ручной клади</li>
                    <li>В запечатанных пакетах дьюти-фри</li>
                    <li>Количество ограничено (обычно до 1 литра)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Советы */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные советы</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Уточните правила</p>
                    <p className="text-sm text-muted-foreground">
                      Перед поездкой узнайте правила перевозки алкоголя у перевозчика и правила таможни (при международных поездках).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Упаковка</p>
                    <p className="text-sm text-muted-foreground">
                      Упакуйте бутылки или банки тщательно, чтобы они не разбились во время транспортировки.
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

export default Mozhnoliprovezti18;
