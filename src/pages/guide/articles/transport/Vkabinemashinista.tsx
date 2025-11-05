import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Settings, Eye, Info } from "lucide-react";

const Vkabinemashinista = () => {
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
          <span>В кабине машиниста</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что находится в кабине машиниста поезда</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Кабина машиниста — это командный центр поезда, где сосредоточены все системы управления и контроля. Современные кабины оборудованы множеством приборов, экранов и систем безопасности.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Оборудование кабины</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                В кабине машиниста находятся: пульт управления, системы контроля скорости, радиосвязь, экраны мониторинга систем поезда, системы безопасности и аварийного торможения.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Vkabinemashinista;
