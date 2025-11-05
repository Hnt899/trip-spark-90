import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle, Clipboard, AlertCircle } from "lucide-react";

const Ekipazhperedvyletom = () => {
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
          <span>Экипаж перед вылетом</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как экипаж самолёта готовится к вылету</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Подготовка к вылету — это комплексный процесс, который начинается за несколько часов до отправления рейса. Экипаж выполняет множество проверок и процедур, чтобы обеспечить безопасность полёта.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Подготовка экипажа</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-base leading-relaxed">Брифинг экипажа: обсуждение маршрута, погоды, особенностей полёта</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-base leading-relaxed">Изучение метеорологических условий</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-base leading-relaxed">Проверка технического состояния самолёта</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-base leading-relaxed">Координация с наземными службами</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clipboard className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Проверки перед вылетом</h2>
              </div>
              <p className="text-base leading-relaxed">
                Пилоты выполняют тщательную проверку всех систем самолёта, изучают документацию, проверяют запас топлива, координацию с диспетчерами и готовятся к выполнению полётного задания.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ekipazhperedvyletom;
