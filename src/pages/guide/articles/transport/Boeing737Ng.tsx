import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Users, Zap, Info } from "lucide-react";

const Boeing737Ng = () => {
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
          <span>Boeing 737 NG</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Boeing 737 NG</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Boeing 737 NG (Next Generation) — это семейство узкофюзеляжных самолётов, которое стало одним из самых популярных и распространённых в мире. Модели -600, -700, -800 и -900 представляют третье поколение семейства Boeing 737.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Характеристики</h2>
              </div>
              <p className="text-base leading-relaxed">
                Boeing 737 NG отличаются улучшенными двигателями, обновлёнными системами, увеличенной дальностью полёта и вместимостью. Это надёжные и экономичные самолёты для среднемагистральных перелётов.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Boeing737Ng;
