import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Bus, Globe, Users, Info } from "lucide-react";

const Evropeyskayaavtobusnayakompaniya = () => {
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
          <span>Европейская автобусная компания</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как европейская автобусная компания работает в России</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Европейские автобусные компании, работающие в России, привносят международные стандарты обслуживания, современные автобусы и новые подходы к организации перевозок. Их работа на российском рынке имеет свои особенности и преимущества.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Особенности работы в России</h2>
              </div>
              <p className="text-base leading-relaxed">
                Европейские компании адаптируют свои услуги к российским условиям: требованиям законодательства, особенностям дорог, климата и предпочтениям пассажиров, сохраняя при этом высокие стандарты качества.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Evropeyskayaavtobusnayakompaniya;
