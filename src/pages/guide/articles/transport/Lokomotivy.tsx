import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Zap, AlertCircle, Info } from "lucide-react";

const Lokomotivy = () => {
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
          <span>Локомотивы</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Почему практически бесполезно делать локомотив мощнее</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Мощность локомотива должна соответствовать весу состава и условиям движения. Избыточная мощность не только не нужна, но и может быть неэффективной и экономически невыгодной.
              </p>
              <p className="text-base leading-relaxed">
                Выбор правильной мощности локомотива — это баланс между необходимостью обеспечить достаточную тягу и экономической эффективностью эксплуатации. Слишком мощный локомотив — это лишние затраты без реальной пользы.
              </p>
            </CardContent>
          </Card>

          {/* Баланс мощности */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Баланс мощности</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Мощность локомотива выбирается исходя из максимального веса состава и скорости движения. Слишком мощный локомотив будет расходовать больше топлива, не давая реальных преимуществ.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Идеальная мощность локомотива — это та, которая достаточна для ведения состава с требуемой скоростью, но не избыточна. Избыточная мощность означает лишний расход топлива и более высокую стоимость эксплуатации.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Факторы, влияющие на выбор мощности:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Вес состава</li>
                    <li>Требуемая скорость движения</li>
                    <li>Профиль пути (подъёмы, спуски)</li>
                    <li>Условия эксплуатации</li>
                    <li>Экономическая эффективность</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Почему избыточная мощность не нужна */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Почему избыточная мощность не нужна</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Может показаться, что чем мощнее локомотив, тем лучше. Однако на практике избыточная мощность создаёт только проблемы без реальных преимуществ.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Повышенный расход топлива</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Более мощный локомотив потребляет больше топлива даже при работе на частичной мощности. Это увеличивает стоимость эксплуатации без улучшения характеристик.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ограничения скорости</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Скорость движения поезда ограничена не мощностью локомотива, а состоянием путей, сигнализацией и безопасностью. Избыточная мощность не позволит ехать быстрее.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Высокая стоимость</h3>
                    <p className="text-base leading-relaxed">
                      Более мощные локомотивы стоят дороже в покупке и обслуживании. Эти дополнительные затраты не окупаются, если мощность не используется.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Оптимальная мощность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Как выбирается оптимальная мощность</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Выбор мощности локомотива — это сложный инженерный расчёт, который учитывает множество факторов для обеспечения оптимального баланса между производительностью и экономичностью.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Критерии выбора:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Достаточная мощность для ведения состава</li>
                    <li>Возможность преодоления подъёмов</li>
                    <li>Достижение требуемой скорости</li>
                    <li>Экономическая эффективность</li>
                    <li>Надёжность и долговечность</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Инженеры рассчитывают необходимую мощность с учётом всех факторов и выбирают локомотив, который обеспечивает требуемые характеристики при минимальных затратах.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Экономическая эффективность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Экономическая эффективность</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Правильный выбор мощности локомотива напрямую влияет на экономическую эффективность перевозок. Оптимальная мощность обеспечивает баланс между производительностью и затратами.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Использование локомотива с оптимальной мощностью позволяет минимизировать расход топлива, снизить затраты на обслуживание и обеспечить рентабельность перевозок.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Вывод:</strong> Делать локомотив мощнее, чем необходимо, — это не улучшение, а расточительство. Правильный выбор мощности — это ключ к эффективной и экономичной эксплуатации железнодорожного транспорта.
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

export default Lokomotivy;
