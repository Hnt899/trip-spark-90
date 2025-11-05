import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Building2, MapPin, Info } from "lucide-react";

const Aeroportvnukovo = () => {
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
          <span>Аэропорт Внуково</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как работает аэропорт Внуково</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Аэропорт Внуково — один из крупнейших аэропортов России, обслуживающий миллионы пассажиров ежегодно. Это сложный организм, в котором множество служб и систем работают круглосуточно для обеспечения безопасных и комфортных перелётов.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Основные службы аэропорта</h2>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Служба безопасности и досмотра</li>
                  <li>Регистрация пассажиров и багажа</li>
                  <li>Служба управления воздушным движением</li>
                  <li>Метеорологическая служба</li>
                  <li>Служба технического обслуживания самолётов</li>
                  <li>Медицинская служба</li>
                  <li>Кинологическая служба</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Терминалы и инфраструктура</h2>
              </div>
              <p className="text-base leading-relaxed">
                Аэропорт Внуково имеет несколько терминалов, каждый из которых обслуживает определённые направления и авиакомпании. Инфраструктура включает взлётно-посадочные полосы, рулёжные дорожки, места стоянки самолётов, грузовые терминалы и многое другое.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Aeroportvnukovo;
