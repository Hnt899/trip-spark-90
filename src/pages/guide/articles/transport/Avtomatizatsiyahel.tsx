import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, Zap, Monitor, Info } from "lucide-react";

const Avtomatizatsiyahel = () => {
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
          <span>Автоматизация HEL</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Автоматизация аэропорта в Хельсинки</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Аэропорт Хельсинки (HEL) является одним из самых автоматизированных аэропортов в мире. Современные технологии позволяют автоматизировать множество процессов: от регистрации пассажиров до управления багажом и обслуживания самолётов.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Системы автоматизации</h2>
              </div>
              <p className="text-base leading-relaxed">
                Автоматизация включает саморегистрацию пассажиров, автоматические системы обработки багажа, роботизированные системы обслуживания и многие другие технологии, которые делают аэропорт более эффективным и удобным.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Avtomatizatsiyahel;
