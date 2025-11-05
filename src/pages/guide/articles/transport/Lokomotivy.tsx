import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Zap, AlertCircle, Info } from "lucide-react";

const Lokomotivy = () => {
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
          <span>Локомотивы</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Почему практически бесполезно делать локомотив мощнее</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Мощность локомотива должна соответствовать весу состава и условиям движения. Избыточная мощность не только не нужна, но и может быть неэффективной и экономически невыгодной.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Баланс мощности</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Мощность локомотива выбирается исходя из максимального веса состава и скорости движения. Слишком мощный локомотив будет расходовать больше топлива, не давая реальных преимуществ.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Lokomotivy;
