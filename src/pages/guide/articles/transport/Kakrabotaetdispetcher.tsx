import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Radio, Plane, Headphones, AlertCircle, Info } from "lucide-react";

const Kakrabotaetdispetcher = () => {
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
          <span>Как работает диспетчер</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как работает диспетчер</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Авиадиспетчеры — это специалисты, которые управляют движением самолётов в воздушном пространстве. Их работа критически важна для безопасности полётов и требует высокой концентрации, быстрой реакции и глубоких знаний авиационных процедур.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Обязанности диспетчера</h2>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Управление движением самолётов в зоне ответственности</li>
                  <li>Координация взлётов и посадок</li>
                  <li>Обеспечение безопасных интервалов между самолётами</li>
                  <li>Мониторинг погодных условий</li>
                  <li>Координация с другими диспетчерскими службами</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Radio className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Радиосвязь с экипажами</h2>
              </div>
              <p className="text-base leading-relaxed">
                Диспетчер постоянно поддерживает связь с пилотами самолётов, даёт инструкции по высоте, скорости, курсу и маршруту. Все команды передаются через специальную радиосвязь с использованием стандартизированной фразеологии.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Kakrabotaetdispetcher;
