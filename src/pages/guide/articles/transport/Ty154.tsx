import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Users, History, Star } from "lucide-react";

const Ty154 = () => {
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
          <span>Ту-154</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Ту-154: главный самолёт страны</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Ту-154 — это легендарный среднемагистральный самолёт, который был основным пассажирским самолётом СССР и России на протяжении нескольких десятилетий. Этот самолёт перевёз миллионы пассажиров и стал символом эпохи.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">История и значение</h2>
              </div>
              <p className="text-base leading-relaxed">
                Ту-154 производился с 1968 по 2013 год и был основным самолётом Аэрофлота. Он обслуживал маршруты по всей стране и за её пределами, став настоящим символом советской и российской гражданской авиации.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ty154;
