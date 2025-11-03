import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Bug, AlertCircle, CheckCircle, FileText, Calendar } from "lucide-react";

const ChtodelatEsliukusil = () => {
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
          <Link to="/guide" className="hover:text-primary">Полезно пассажиру</Link>
          <span>/</span>
          <span>Что делать, если укусил клещ?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что делать, если укусил клещ?</h1>

        <div className="space-y-8">
          {/* Первые действия */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Bug className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Первые действия</h2>
              </div>

              <div className="space-y-4">
                <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Как можно быстрее удалите клеща</li>
                  <li>Используйте пинцет или специальное устройство для удаления клещей</li>
                  <li>Захватите клеща как можно ближе к коже и аккуратно выкручивайте против часовой стрелки</li>
                  <li>Не сдавливайте тело клеща, чтобы не выдавить содержимое в рану</li>
                  <li>Обработайте место укуса антисептиком</li>
                  <li>Сохраните клеща для анализа (в баночке или пакетике)</li>
                </ol>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Чем быстрее удалить клеща, тем меньше риск заражения. Клещи обычно передают инфекцию через 24-48 часов после присасывания.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Обращение к врачу */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Обращение к врачу</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Обратитесь к врачу в течение 72 часов после укуса:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Врач оценит риск заражения</li>
                  <li>При необходимости назначит профилактический курс антибиотиков</li>
                  <li>Сдайте клеща на анализ в лабораторию</li>
                  <li>Ведите наблюдение за местом укуса и общим состоянием</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Симптомы болезней */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold">На что обратить внимание</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  После укуса клеща наблюдайте за симптомами в течение 2-4 недель:
                </p>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Возможные симптомы:</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Покраснение вокруг места укуса (мигрирующая эритема)</li>
                    <li>Повышение температуры</li>
                    <li>Головная боль</li>
                    <li>Усталость и слабость</li>
                    <li>Мышечные и суставные боли</li>
                    <li>Сыпь</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>При появлении симптомов:</strong> Немедленно обратитесь к врачу! Чем раньше начать лечение, тем лучше прогноз.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Профилактика */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Профилактика</h2>
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Используйте репелленты от клещей</li>
                  <li>Носите закрытую одежду при походе в лес</li>
                  <li>Заправляйте брюки в носки</li>
                  <li>Осматривайте себя и детей после прогулок на природе</li>
                  <li>Сделайте прививку от клещевого энцефалита (если живете в эндемичном регионе)</li>
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

export default ChtodelatEsliukusil;
