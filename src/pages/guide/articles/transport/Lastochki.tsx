import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Zap, Info } from "lucide-react";

const Lastochki = () => {
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
          <span>Ласточки</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как производятся «Ласточки»</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                «Ласточки» — это семейство высокоскоростных электропоездов, производимых компанией «Сименс» для российских железных дорог. Эти поезда работают на маршрутах между крупными городами и обеспечивают быстрое и комфортное передвижение.
              </p>
              <p className="text-base leading-relaxed">
                Производство «Ласточек» включает в себя современные технологии и строгий контроль качества, чтобы обеспечить надёжность и комфорт для пассажиров.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Характеристики «Ласточек»</h2>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Максимальная скорость: до 250 км/ч</li>
                  <li>Современный дизайн и комфорт</li>
                  <li>Энергоэффективность</li>
                  <li>Надёжность и безопасность</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Lastochki;
