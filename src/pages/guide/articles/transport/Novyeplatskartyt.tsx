import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Bed, Users, Info } from "lucide-react";

const Novyeplatskartyt = () => {
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
          <span>Новые плацкарты Т</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Новый плацкарт в вагоне габарита Т</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Плацкартные вагоны габарита Т — это новое поколение вагонов с расширенным габаритом, что позволяет создать более просторные и комфортные условия для пассажиров.
              </p>
              <p className="text-base leading-relaxed">
                Увеличенная ширина вагона даёт возможность улучшить планировку и повысить комфорт поездки.
              </p>
            </CardContent>
          </Card>

          {/* Что такое габарит Т */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что такое габарит Т</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Габарит Т — это увеличенный габарит железнодорожного вагона, который позволяет сделать вагон шире, чем стандартные вагоны. Это даёт больше пространства внутри вагона для размещения пассажиров и их багажа.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    Увеличенная ширина вагона позволяет улучшить планировку мест, сделать проходы шире и создать более комфортные условия для пассажиров.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Преимущества */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Bed className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Преимущества габарита Т</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Больше пространства в вагоне</li>
                    <li>Шире проходы между местами</li>
                    <li>Более комфортные спальные места</li>
                    <li>Улучшенная вентиляция</li>
                    <li>Больше места для ручной клади</li>
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

export default Novyeplatskartyt;
