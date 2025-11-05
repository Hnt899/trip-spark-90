import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Clock, Users, Heart } from "lucide-react";

const Retropoezdsparovozom = () => {
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
          <span>Ретропоезд с паровозом</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Рускеальский экспресс: ретропоезд с паровозом</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Ретропоезда с паровозами — это уникальные туристические маршруты, которые позволяют окунуться в атмосферу прошлого и проехать на историческом паровозе. Рускеальский экспресс — один из таких проектов.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Путешествие во времени</h2>
              </div>
              <p className="text-base leading-relaxed">
                Поездка на ретропоезде — это не просто транспорт, а целое приключение, которое переносит пассажиров в другую эпоху.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Retropoezdsparovozom;
