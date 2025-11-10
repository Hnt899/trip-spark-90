import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Zap, Settings, Info } from "lucide-react";

const Ep2dm = () => {
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
          <span>ЭП2ДМ</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">ЭП2ДМ: что сделали с новой электричкой</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                ЭП2ДМ — это новое поколение электропоездов, которые пришли на смену старым моделям электричек. Эти поезда представляют собой результат модернизации и развития российского пригородного железнодорожного транспорта.
              </p>
              <p className="text-base leading-relaxed">
                Давайте разберёмся, что нового появилось в ЭП2ДМ по сравнению с предыдущими моделями и как это улучшило комфорт пассажиров.
              </p>
            </CardContent>
          </Card>

          {/* Что такое ЭП2ДМ */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что такое ЭП2ДМ</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  ЭП2ДМ (Электропоезд Пригородный, 2-я модель, Декаполя, Модернизированный) — это модернизированная версия электропоезда ЭП2Д, созданная для улучшения комфорта пассажиров и повышения надёжности работы.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Основные характеристики:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Скорость до 160 км/ч</li>
                    <li>Улучшенная система кондиционирования</li>
                    <li>Современная система управления</li>
                    <li>Повышенный комфорт для пассажиров</li>
                    <li>Энергоэффективность</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Улучшения комфорта */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Улучшения комфорта для пассажиров</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Система климат-контроля</h3>
                  <p className="text-base leading-relaxed mb-3">
                    В ЭП2ДМ установлена современная система кондиционирования, которая обеспечивает комфортную температуру в вагонах в любое время года. Система автоматически поддерживает оптимальный микроклимат.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Улучшенные сиденья</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Новые кресла более удобные и эргономичные. Улучшена планировка вагонов для большего комфорта пассажиров.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Информационные системы</h3>
                  <p className="text-base leading-relaxed">
                    Современные информационные табло и системы оповещения помогают пассажирам лучше ориентироваться в поездке.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Технические улучшения */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Технические улучшения</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Модернизация коснулась не только комфорта, но и технических характеристик:
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Улучшенная система управления</li>
                    <li>Повышенная надёжность работы</li>
                    <li>Энергоэффективность</li>
                    <li>Снижение шума и вибрации</li>
                    <li>Современные системы безопасности</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Где используются */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Где используются ЭП2ДМ</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  ЭП2ДМ работают на различных пригородных маршрутах, заменяя устаревшие модели электричек. Эти поезда можно встретить на линиях, где требуется повышенный комфорт и скорость движения.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  ЭП2ДМ используются на маршрутах с высокой пассажиропотоком, где важно обеспечить комфорт и надёжность перевозок. Они особенно популярны на линиях, связывающих крупные города с пригородами.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    Постепенное внедрение ЭП2ДМ на различных маршрутах позволяет пассажирам оценить преимущества новых поездов и насладиться улучшенным комфортом поездки.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Преимущества модернизации */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Преимущества модернизации</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Модернизация до ЭП2ДМ принесла множество преимуществ как для пассажиров, так и для железнодорожной инфраструктуры.
                </p>
                <div className="space-y-3">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Для пассажиров:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>Повышенный комфорт поездки</li>
                      <li>Лучшие условия в вагонах</li>
                      <li>Современные удобства</li>
                      <li>Более надёжное расписание</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Для перевозчика:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>Повышенная надёжность</li>
                      <li>Энергоэффективность</li>
                      <li>Снижение затрат на обслуживание</li>
                      <li>Улучшение имиджа</li>
                    </ul>
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

export default Ep2dm;
