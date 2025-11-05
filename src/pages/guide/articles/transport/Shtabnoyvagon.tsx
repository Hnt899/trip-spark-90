import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Building2, Users, Info } from "lucide-react";

const Shtabnoyvagon = () => {
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
          <span>Штабной вагон</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Штабной вагон: офис внутри состава</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Штабной вагон — это специальный вагон, оборудованный как офисное пространство для руководства и обслуживающего персонала поезда. В нём размещаются рабочие места для начальника поезда, механиков и других специалистов.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Назначение штабного вагона</h2>
              </div>
              <p className="text-base leading-relaxed">
                В штабном вагоне размещаются рабочие места для управления составом, решения технических вопросов и координации работы поезда в пути.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shtabnoyvagon;
