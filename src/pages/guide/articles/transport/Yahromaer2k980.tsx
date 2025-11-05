import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Clock, Info } from "lucide-react";

const Yahromaer2k980 = () => {
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
          <span>Яхрома ЭР2К-980</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Ретроэлектричка Яхрома ЭР2К-980</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                ЭР2К-980 «Яхрома» — это восстановленная ретроэлектричка, которая используется для туристических поездок. Это восстановленный и отреставрированный электропоезд серии ЭР2, который позволяет пассажирам окунуться в атмосферу советских времён.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Yahromaer2k980;
