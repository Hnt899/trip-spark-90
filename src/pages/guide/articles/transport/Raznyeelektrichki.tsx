import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Zap, Info } from "lucide-react";

const Raznyeelektrichki = () => {
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
          <span>Разные электрички</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Электрички: разные, очень разные</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Электрички — это разнообразный класс поездов пригородного сообщения. Существует множество различных моделей и типов электричек, каждая из которых имеет свои особенности, характеристики и историю.
              </p>
              <p className="text-base leading-relaxed">
                От старых советских ЭР2 и ЭР2Т до современных «Ласточек», «Иволг» и ЭП2ДМ — каждая модель представляет свой этап развития пригородного железнодорожного транспорта.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Разнообразие моделей</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Каждая модель электрички имеет свои особенности: скорость, комфорт, вместимость, систему управления, внешний вид и внутреннее устройство. Различия могут быть как значительными, так и едва заметными для обычного пассажира.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Raznyeelektrichki;
