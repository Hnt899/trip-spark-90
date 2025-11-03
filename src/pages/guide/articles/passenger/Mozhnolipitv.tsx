import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Wine, AlertCircle, CheckCircle, Plane, Train, Bus } from "lucide-react";

const Mozhnolipitv = () => {
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
          <span>Можно ли пить в транспорте?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Можно ли пить в транспорте?</h1>

        <div className="space-y-8">
          {/* В самолёте */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">В самолёте</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Алкоголь от авиакомпании</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>В бизнес-классе алкоголь обычно включен</li>
                    <li>В эконом-классе алкоголь можно купить</li>
                    <li>Алкоголь подается бортпроводниками</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">Свой алкоголь</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Запрещено пить алкоголь, принесенный на борт</li>
                    <li>Можно пить только алкоголь, купленный на борту</li>
                    <li>За нарушение могут высадить из самолета</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Нельзя пить алкоголь, принесенный с собой. Можно только алкоголь, купленный на борту.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* В поезде */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">В поезде</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Правила</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>В поездах обычно можно пить алкоголь в умеренных количествах</li>
                    <li>Нельзя находиться в состоянии алкогольного опьянения</li>
                    <li>Нельзя мешать другим пассажирам</li>
                    <li>Проводник может попросить прекратить, если вы мешаете</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Помните:</strong> В состоянии сильного алкогольного опьянения вас могут высадить из поезда. Будьте умеренны и уважайте других пассажиров.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* В автобусе */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">В автобусе</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Правила</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>В большинстве автобусов употребление алкоголя запрещено</li>
                    <li>Запрет обычно указан в правилах перевозки</li>
                    <li>Водитель имеет право высадить пассажира за нарушение</li>
                    <li>Это связано с безопасностью движения</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Употребление алкоголя в автобусе обычно запрещено правилами перевозчика. Уточните правила перед поездкой.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Рекомендации */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Рекомендации</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Узнайте правила</p>
                    <p className="text-sm text-muted-foreground">
                      Перед поездкой уточните правила перевозчика относительно употребления алкоголя.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Будьте умеренны</p>
                    <p className="text-sm text-muted-foreground">
                      Даже если алкоголь разрешен, будьте умеренны и уважайте других пассажиров.
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

export default Mozhnolipitv;
