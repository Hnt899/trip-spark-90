import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Plane, Zap, Info } from "lucide-react";

const Aeroekspress = () => {
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
          <span>Аэроэкспресс</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как устроен Аэроэкспресс</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Аэроэкспресс — это скоростные поезда, соединяющие аэропорты с центральными частями городов. Это удобный и быстрый способ добраться до аэропорта, избегая пробок на дорогах.
              </p>
              <p className="text-base leading-relaxed">
                Аэроэкспрессы работают по специальным расписаниям, синхронизированным с расписанием авиарейсов, и обеспечивают комфортную поездку для пассажиров с багажом.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Особенности Аэроэкспресса</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Прямое сообщение между аэропортом и городом</li>
                    <li>Минимальное количество остановок</li>
                    <li>Специальные места для багажа</li>
                    <li>Комфортные вагоны</li>
                    <li>Частое расписание движения</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Aeroekspress;
