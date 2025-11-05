import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Zap, Battery, Info } from "lucide-react";

const VagonElektrostantsiya = () => {
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
          <span>Вагон-электростанция</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Новый вагон-электростанция</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Вагон-электростанция — это специальный вагон, который служит источником электроэнергии для других вагонов в составе. Он может генерировать или преобразовывать энергию для питания систем вагонов, особенно в случаях, когда локомотив не может обеспечить достаточное электропитание.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Назначение вагона-электростанции</h2>
              </div>
              <p className="text-base leading-relaxed">
                Вагон-электростанция обеспечивает резервное или дополнительное электропитание для вагонов поезда, гарантируя работу всех систем даже при проблемах с основным источником энергии.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VagonElektrostantsiya;
