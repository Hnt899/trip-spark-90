import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, FileText, Shield, Info } from "lucide-react";

const Pokakimpravilamletit = () => {
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
          <span>По каким правилам летит самолёт</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">По каким правилам летит самолёт в России</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Полёты самолётов в России строго регламентированы правилами и стандартами, которые обеспечивают безопасность воздушного движения. Эти правила устанавливаются на международном и национальном уровне.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Основные правила и стандарты</h2>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Международные стандарты ИКАО (ICAO)</li>
                  <li>Воздушный кодекс РФ</li>
                  <li>Федеральные авиационные правила</li>
                  <li>Правила полётов и использования воздушного пространства</li>
                  <li>Требования к экипажам и техническому состоянию самолётов</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Безопасность — главный приоритет</h2>
              </div>
              <p className="text-base leading-relaxed">
                Все правила разработаны с единственной целью — обеспечить максимальную безопасность полётов. Они регулируют всё: от технических требований к самолётам до подготовки экипажей и управления воздушным движением.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pokakimpravilamletit;
