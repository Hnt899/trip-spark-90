import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Bus, MapPin, Users, Info } from "lucide-react";

const Progorodskoytransport = () => {
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
          <span>Про городской транспорт</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Про городской транспорт простыми словами</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Городской транспорт — это сложная система, которая обеспечивает передвижение людей по городу. Автобусы, троллейбусы, трамваи и маршрутки работают по специальным маршрутам и расписаниям, чтобы пассажиры могли быстро и удобно добраться до нужного места.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Виды городского транспорта</h2>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Автобусы — самый распространённый вид транспорта</li>
                  <li>Троллейбусы — экологичный транспорт на электричестве</li>
                  <li>Трамваи — рельсовый городской транспорт</li>
                  <li>Маршрутные такси — гибкие маршруты и расписание</li>
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

export default Progorodskoytransport;
