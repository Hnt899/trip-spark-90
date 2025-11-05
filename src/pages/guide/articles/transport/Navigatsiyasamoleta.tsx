import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Navigation, Settings, Info } from "lucide-react";

const Navigatsiyasamoleta = () => {
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
          <span>Навигация самолёта</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как строится маршрут полёта</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Планирование маршрута полёта — это сложный процесс, который учитывает множество факторов: погодные условия, воздушное движение, топливную эффективность, безопасность и многое другое.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Факторы планирования маршрута</h2>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Погодные условия и ветра</li>
                  <li>Занятость воздушного пространства</li>
                  <li>Топливная эффективность</li>
                  <li>Высота полёта</li>
                  <li>Ограничения и запретные зоны</li>
                  <li>Требования авиакомпании</li>
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

export default Navigatsiyasamoleta;
