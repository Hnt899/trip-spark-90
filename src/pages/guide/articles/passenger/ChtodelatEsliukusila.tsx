import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Heart, Phone, AlertCircle, FileText } from "lucide-react";

const ChtodelatEsliukusila = () => {
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
          <span>Что делать, если укусила змея?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что делать, если укусила змея?</h1>

        <div className="space-y-8">
          {/* Немедленные действия */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Немедленные действия</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-xl font-bold text-red-900 mb-2">103 или 112</p>
                  <p className="text-sm text-red-900">
                    Немедленно вызовите скорую помощь!
                  </p>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Сохраняйте спокойствие и постарайтесь не двигаться</li>
                  <li>Снимите украшения и тесную одежду с места укуса</li>
                  <li>Зафиксируйте укушенную конечность</li>
                  <li>Не пытайтесь отсосать яд или разрезать рану</li>
                  <li>Не накладывайте жгут</li>
                  <li>Дождитесь приезда скорой помощи</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Что нельзя делать */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Что нельзя делать</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Не прижигайте место укуса</li>
                  <li>Не накладывайте жгут (это может ухудшить состояние)</li>
                  <li>Не пейте алкоголь (он ускоряет всасывание яда)</li>
                  <li>Не пытайтесь отсосать яд ртом</li>
                  <li>Не разрезайте рану</li>
                  <li>Не прикладывайте лед</li>
                </ul>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Мифы о первой помощи при укусе змеи могут быть опасны. Лучше ничего не делать, чем делать что-то неправильно.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Оказание помощи */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Медицинская помощь</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  В больнице врач:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Оценит степень тяжести укуса</li>
                  <li>Определит, ядовитая ли была змея</li>
                  <li>Введет противоядие при необходимости</li>
                  <li>Окажет симптоматическую помощь</li>
                  <li>Обработает рану</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Профилактика */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Профилактика</h2>
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Смотрите под ноги при ходьбе по лесу или полю</li>
                  <li>Используйте высокую обувь и закрытую одежду</li>
                  <li>Не ходите босиком в местах, где могут быть змеи</li>
                  <li>Не суйте руки в норы и расщелины</li>
                  <li>Будьте осторожны при сборе грибов и ягод</li>
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

export default ChtodelatEsliukusila;
