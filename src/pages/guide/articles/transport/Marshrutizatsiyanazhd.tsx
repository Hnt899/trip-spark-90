import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, MapPin, Settings, Info } from "lucide-react";

const Marshrutizatsiyanazhd = () => {
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
          <span>Маршрутизация на ЖД</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как поезд проходит путь от станции до станции</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Маршрутизация поездов — это сложный процесс управления движением поездов на железных дорогах. Каждый поезд следует по заранее спланированному маршруту, который координируется диспетчерами и системами управления движением.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Планирование маршрута</h2>
              </div>
              <p className="text-base leading-relaxed">
                Маршрут поезда планируется заранее, учитывая расписание, состояние путей, другие поезда на линии и множество других факторов для обеспечения безопасности и эффективности движения.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marshrutizatsiyanazhd;
