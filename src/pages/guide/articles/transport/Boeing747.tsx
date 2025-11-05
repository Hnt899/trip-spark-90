import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Users, History, Info } from "lucide-react";

const Boeing747 = () => {
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
          <span>Boeing 747</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Boeing 747: уходящая эпоха</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Boeing 747, известный как «Jumbo Jet», — это легендарный широкофюзеляжный самолёт, который на протяжении десятилетий был королём неба. С его характерным горбом и огромной вместимостью, он перевёз миллиарды пассажиров по всему миру.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Эпоха больших самолётов</h2>
              </div>
              <p className="text-base leading-relaxed">
                Boeing 747 мог перевозить до 600 пассажиров и стал символом эпохи дальних перелётов. Однако с развитием более экономичных самолётов и изменением рынка авиаперевозок, эра «Джамбо Джетов» подходит к концу.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Boeing747;
