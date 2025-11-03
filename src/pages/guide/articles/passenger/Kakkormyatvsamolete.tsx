import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { UtensilsCrossed, Clock, DollarSign, CheckCircle, AlertCircle } from "lucide-react";

const Kakkormyatvsamolete = () => {
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
          <span>Как кормят в самолёте?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как кормят в самолёте?</h1>

        <div className="space-y-8">
          {/* Включено в билет */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Питание, включенное в билет</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Когда питание включено</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li><strong>Дальние рейсы</strong> (обычно более 3-4 часов) — горячее питание включено</li>
                    <li><strong>Бизнес-класс и первый класс</strong> — питание включено на всех рейсах</li>
                    <li><strong>Некоторые тарифы эконом-класса</strong> — питание может быть включено</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Что обычно включают</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Горячее блюдо (мясо или рыба с гарниром)</li>
                    <li>Салат или закуска</li>
                    <li>Хлеб и масло</li>
                    <li>Десерт</li>
                    <li>Напитки (вода, сок, чай, кофе)</li>
                    <li>Алкогольные напитки (в бизнес-классе обычно включены)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Специальное питание */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Специальное питание</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Многие авиакомпании предлагают специальное питание по предварительному заказу:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li><strong>Вегетарианское</strong> — без мяса и рыбы</li>
                  <li><strong>Веганское</strong> — без продуктов животного происхождения</li>
                  <li><strong>Кошерное</strong> — соответствующее еврейским диетическим законам</li>
                  <li><strong>Халяльное</strong> — соответствующее исламским требованиям</li>
                  <li><strong>Детское</strong> — адаптированное для детей</li>
                  <li><strong>Диетическое</strong> — низкокалорийное, безглютеновое и др.</li>
                </ul>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Специальное питание нужно заказывать заранее (обычно при покупке билета или не менее чем за 24-48 часов до вылета).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Питание за доплату */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Питание за доплату</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  На многих рейсах питание можно купить на борту:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Горячие блюда</li>
                  <li>Снэки и закуски</li>
                  <li>Напитки (включая алкоголь)</li>
                  <li>Детское питание</li>
                </ul>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Обратите внимание:</strong> Цены на борту обычно выше, чем на земле. Если знаете, что вам понадобится еда, лучше взять с собой или заказать при покупке билета.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Что можно взять с собой */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что можно взять с собой</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  В ручную кладь можно взять:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Сухую еду (печенье, бутерброды, фрукты)</li>
                  <li>Напитки, купленные после досмотра (или в зоне стерилизации)</li>
                  <li>Детское питание (в разумных количествах)</li>
                  <li>Лекарства</li>
                </ul>

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Нельзя брать:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Жидкости объемом более 100 мл в ручной клади (до досмотра)</li>
                    <li>Спиртные напитки (кроме купленных в дьюти-фри)</li>
                    <li>Еду с сильным запахом (может мешать другим пассажирам)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Советы */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные советы</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Заказывайте специальное питание заранее</p>
                    <p className="text-sm text-muted-foreground">
                      Если у вас есть особые требования к питанию, закажите специальное питание при покупке билета или не менее чем за 24 часа до вылета.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Проверяйте тариф</p>
                    <p className="text-sm text-muted-foreground">
                      При покупке билета уточните, включено ли питание в стоимость или его нужно заказывать отдельно.
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

export default Kakkormyatvsamolete;
