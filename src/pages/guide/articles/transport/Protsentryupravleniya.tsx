import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Monitor, Radio, Info } from "lucide-react";

const Protsentryupravleniya = () => {
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
          <span>Про центры управления</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что внутри аэропорта: центры управления</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Центры управления аэропортом — это «мозг» всего комплекса. Здесь сосредоточены диспетчерские службы, которые координируют все процессы: от движения самолётов до работы наземных служб.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Структура центров управления</h2>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Диспетчерские пункты управления воздушным движением</li>
                  <li>Центры координации наземных служб</li>
                  <li>Системы мониторинга и контроля</li>
                  <li>Информационные системы для пассажиров</li>
                  <li>Системы безопасности</li>
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

export default Protsentryupravleniya;
