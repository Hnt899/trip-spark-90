import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Bus, Settings, Factory, Info } from "lucide-react";

const Otechestvennyemikroavtobusy = () => {
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
          <span>Отечественные микроавтобусы</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как производятся отечественные микроавтобусы</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Производство отечественных микроавтобусов — это сложный процесс, который включает разработку, сборку, тестирование и контроль качества. Российские производители создают микроавтобусы для различных нужд: городских перевозок, междугородних маршрутов и специальных задач.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Factory className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Процесс производства</h2>
              </div>
              <p className="text-base leading-relaxed">
                Производство включает множество этапов: от проектирования и заготовки материалов до сборки, установки оборудования, покраски, тестирования и контроля качества. Каждый микроавтобус проходит тщательную проверку перед выходом с завода.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Otechestvennyemikroavtobusy;
