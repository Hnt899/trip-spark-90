import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Shield, Info } from "lucide-react";

const Prosluzhbyterminala = () => {
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
          <span>Про службы терминала</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что внутри лучшего регионального аэропорта страны: службы терминала</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Современный аэропорт — это сложная система множества служб, которые работают согласованно для обеспечения комфорта и безопасности пассажиров. Каждая служба имеет свою важную роль в работе аэропорта.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Службы терминала</h2>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Служба регистрации и багажа</li>
                  <li>Служба безопасности</li>
                  <li>Таможенная служба</li>
                  <li>Пограничный контроль</li>
                  <li>Медицинская служба</li>
                  <li>Информационные службы</li>
                  <li>Службы сервиса и обслуживания</li>
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

export default Prosluzhbyterminala;
