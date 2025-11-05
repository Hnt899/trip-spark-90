import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Users, Zap, Info } from "lucide-react";

const AirbusA320 = () => {
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
          <span>Airbus A320</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Airbus A320</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Airbus A320 — это семейство узкофюзеляжных самолётов европейского производителя Airbus, которое стало одним из основных конкурентов Boeing 737. Эти самолёты широко используются авиакомпаниями по всему миру для среднемагистральных перелётов.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Особенности</h2>
              </div>
              <p className="text-base leading-relaxed">
                A320 известен своей экономичностью, комфортом для пассажиров и современными системами управления. Семейство включает модели A318, A319, A320 и A321, которые различаются вместимостью и дальностью полёта.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AirbusA320;
