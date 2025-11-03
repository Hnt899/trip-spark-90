import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Syringe, Globe, AlertCircle, CheckCircle, FileText } from "lucide-react";

const Nuzhnoliprivivatsyapered = () => {
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
          <span>Нужно ли прививаться перед поездкой?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Нужно ли прививаться перед поездкой?</h1>

        <div className="space-y-8">
          {/* Обязательные прививки */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Обязательные прививки</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Некоторые страны требуют обязательные прививки для въезда. Без них вас могут не пустить в страну.
                </p>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Примеры обязательных прививок</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li><strong>Желтая лихорадка</strong> — требуется для посещения некоторых стран Африки и Южной Америки</li>
                    <li><strong>Менингококковая инфекция</strong> — требуется для паломников в Саудовскую Аравию</li>
                    <li><strong>Другие прививки</strong> — в зависимости от страны и эпидемиологической обстановки</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Узнайте требования к вакцинации для страны назначения заранее. Некоторые прививки нужно делать за несколько недель до поездки.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Рекомендуемые прививки */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Рекомендуемые прививки</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Даже если прививка не обязательна, она может защитить вас от заболеваний, распространенных в стране назначения.
                </p>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Какие прививки могут быть рекомендованы</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Гепатит A и B</li>
                    <li>Брюшной тиф</li>
                    <li>Бешенство</li>
                    <li>Японский энцефалит</li>
                    <li>Клещевой энцефалит</li>
                    <li>Дифтерия, столбняк, коклюш</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Где узнать требования */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Где узнать требования</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>На сайте посольства или консульства страны назначения</li>
                  <li>В центрах вакцинопрофилактики</li>
                  <li>У врача-инфекциониста</li>
                  <li>На сайте Роспотребнадзора</li>
                  <li>В ВОЗ (Всемирная организация здравоохранения)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Когда делать прививки */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Syringe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Когда делать прививки</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Планируйте вакцинацию заранее:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Начинайте планировать за 4-8 недель до поездки</li>
                  <li>Некоторые прививки требуют нескольких этапов</li>
                  <li>Иммунитет вырабатывается через 1-4 недели после вакцинации</li>
                  <li>Получите международный сертификат о вакцинации</li>
                </ul>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Совет:</strong> Даже если прививка не обязательна, проконсультируйтесь с врачом о рисках заболеваний в стране назначения.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Nuzhnoliprivivatsyapered;
