import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, TreePine, Bed, Info } from "lucide-react";

const PlatskartElochka = () => {
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
          <span>Плацкарт-ёлочка</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Плацкарт-ёлочка: необычная планировка вагона</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                «Плацкарт-ёлочка» — это неофициальное название плацкартных вагонов с особой планировкой мест, где места расположены под углом, напоминая ветви ёлки. Такая планировка применяется для более эффективного использования пространства вагона.
              </p>
              <p className="text-base leading-relaxed">
                В таких вагонах места расположены не параллельно оси вагона, а под определённым углом, что создаёт интересный визуальный эффект и несколько изменяет ощущения от поездки.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TreePine className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Особенности планировки</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Планировка «ёлочка» позволяет более эффективно использовать пространство вагона, размещая больше мест при сохранении комфорта пассажиров.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlatskartElochka;
