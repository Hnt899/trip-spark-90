import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Zap, History, Star } from "lucide-react";

const Ty144 = () => {
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
          <span>Ту-144</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Ту-144: легендарный советский самолёт</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Ту-144 — это первый в мире сверхзвуковой пассажирский самолёт, который начал коммерческие полёты. Разработанный в СССР, он стал символом технологического прогресса советской авиации.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Историческое значение</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Ту-144 совершил первый полёт в 1968 году, опередив знаменитый Concorde. Этот самолёт мог летать со скоростью более 2000 км/ч, что позволяло сократить время полёта в несколько раз.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong>Интересный факт:</strong> Ту-144 был первым сверхзвуковым пассажирским самолётом, который начал перевозить пассажиров, хотя коммерческая эксплуатация оказалась экономически невыгодной.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ty144;
