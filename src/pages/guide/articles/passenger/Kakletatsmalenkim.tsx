import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Baby, Plane, CheckCircle, AlertCircle, DollarSign } from "lucide-react";

const Kakletatsmalenkim = () => {
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
          <span>Как летать с маленьким ребёнком?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как летать с маленьким ребёнком?</h1>

        <div className="space-y-8">
          {/* Возраст и билеты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Baby className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Возраст и стоимость билетов</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">До 2 лет (младенцы)</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Обычно летят без отдельного места (на руках у родителя)</li>
                    <li>Билет стоит 10-25% от стоимости взрослого билета</li>
                    <li>Можно заказать люльку на некоторых рейсах (обычно бесплатно)</li>
                    <li>Можно купить отдельное место для ребенка</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">От 2 до 12 лет</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Нужен отдельный билет с местом</li>
                    <li>Обычно действует детская скидка 25-50%</li>
                    <li>Ребенок должен сидеть на своем месте</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Документы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Документы</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li><strong>Свидетельство о рождении</strong> — для детей до 14 лет</li>
                  <li><strong>Паспорт</strong> — для детей с 14 лет</li>
                  <li><strong>Заграничный паспорт</strong> — для поездок за границу</li>
                  <li><strong>Доверенность</strong> — если ребенок летит с одним родителем или без родителей</li>
                </ul>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> При поездке за границу с одним родителем может потребоваться нотариально заверенная доверенность от второго родителя.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Подготовка к полёту */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Подготовка к полёту</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Что взять с собой</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Сменная одежда для ребенка</li>
                    <li>Подгузники и средства ухода</li>
                    <li>Детское питание и вода (можно провозить в разумных количествах)</li>
                    <li>Любимые игрушки для развлечения</li>
                    <li>Лекарства, если нужны</li>
                    <li>Влажные салфетки</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Во время полёта</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>При взлете и посадке давайте ребенку пить или сосать соску — это помогает справиться с перепадом давления</li>
                    <li>Возьмите сменную одежду на случай неприятностей</li>
                    <li>Развлекайте ребенка игрушками или мультфильмами</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Услуги в самолёте */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Дополнительные услуги</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li><strong>Люлька</strong> — можно заказать заранее для младенцев (обычно бесплатно, количество ограничено)</li>
                  <li><strong>Детское питание</strong> — можно заказать при покупке билета</li>
                  <li><strong>Детское кресло</strong> — можно взять собственное автокресло (уточните у авиакомпании)</li>
                  <li><strong>Приоритетная посадка</strong> — семьи с детьми часто могут пройти регистрацию и посадку без очереди</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Советы */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные советы</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Бронируйте заранее</p>
                    <p className="text-sm text-muted-foreground">
                      Заказывайте люльку и детское питание при покупке билета, так как количество мест ограничено.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Приходите раньше</p>
                    <p className="text-sm text-muted-foreground">
                      Приезжайте в аэропорт заранее, чтобы спокойно пройти все процедуры с ребенком.
                    </p>
                  </div>
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

export default Kakletatsmalenkim;
