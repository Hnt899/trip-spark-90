import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Star, Info } from "lucide-react";

const Provoditeleyavtobusov = () => {
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
          <span>Про водителей автобусов</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как водитель может резко улучшить впечатление от поездки в автобусе</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Водитель автобуса играет ключевую роль в создании впечатления от поездки. Вежливость, профессиональное вождение, внимание к пассажирам и позитивный настрой могут превратить обычную поездку в приятное путешествие.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что делает хорошего водителя</h2>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Плавное и аккуратное вождение</li>
                  <li>Внимательность к пассажирам</li>
                  <li>Вежливость и готовность помочь</li>
                  <li>Знание маршрута и остановок</li>
                  <li>Пунктуальность</li>
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

export default Provoditeleyavtobusov;
