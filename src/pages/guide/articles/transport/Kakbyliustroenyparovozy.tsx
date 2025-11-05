import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Flame, Settings, Info } from "lucide-react";

const Kakbyliustroenyparovozy = () => {
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
          <span>Как были устроены паровозы</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как были устроены паровозы</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Паровозы — это легендарные локомотивы, которые приводили в движение поезда на протяжении более чем ста лет. Хотя они давно уступили место более современным локомотивам, принципы их работы остаются интересными и важными для понимания истории железных дорог.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Принцип работы паровоза</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Паровоз работает на принципе паровой машины: уголь сжигается в топке, нагревает воду в котле, пар под давлением приводит в движение поршни, которые через кривошипно-шатунный механизм вращают колёса.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Kakbyliustroenyparovozy;
