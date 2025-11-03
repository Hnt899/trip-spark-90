import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, AlertCircle, DollarSign, FileText, CheckCircle } from "lucide-react";

const Kakiebyvayutvozvratybiletov = () => {
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
          <span>Какие бывают возвраты билетов?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Какие бывают возвраты билетов?</h1>

        <div className="space-y-8">
          {/* Добровольный возврат */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Добровольный возврат</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Добровольный возврат — это возврат билета по инициативе пассажира без уважительных причин.
                </p>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Особенности</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Пассажир сам решает вернуть билет</li>
                    <li>Возврат производится с удержанием сборов и штрафов</li>
                    <li>Размер возвращаемой суммы зависит от времени возврата</li>
                    <li>Обычно чем ближе к дате отправления, тем меньше возвращается денег</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Размер возврата</h3>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-2 text-sm ml-4">
                      <li>Более чем за 8 часов до отправления — возвращается большая часть стоимости</li>
                      <li>Менее чем за 8 часов — возвращается меньшая часть</li>
                      <li>После отправления — возврат возможен только в исключительных случаях</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Вынужденный возврат */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Вынужденный возврат</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Вынужденный возврат — это возврат билета по уважительным причинам, не зависящим от пассажира.
                </p>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Основания для вынужденного возврата</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li><strong>Болезнь пассажира</strong> или члена семьи (необходима справка от врача)</li>
                    <li><strong>Смерть</strong> близкого родственника</li>
                    <li><strong>Отмена рейса</strong> перевозчиком</li>
                    <li><strong>Задержка рейса</strong> на длительное время</li>
                    <li><strong>Отказ в перевозке</strong> по вине перевозчика</li>
                    <li><strong>Изменение расписания</strong> перевозчиком</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Особенности</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Возвращается полная стоимость билета</li>
                    <li>Штрафы и сборы не удерживаются</li>
                    <li>Требуется документальное подтверждение причины возврата</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold mb-1">Преимущество:</p>
                      <p className="text-sm leading-relaxed">
                        При вынужденном возврате пассажир получает полную стоимость билета обратно без удержаний.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Документы для возврата */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Документы для возврата</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Для добровольного возврата</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Документ, удостоверяющий личность</li>
                    <li>Билет (если это физический билет)</li>
                    <li>Номер заказа (для электронных билетов)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Для вынужденного возврата</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Все документы, необходимые для добровольного возврата</li>
                    <li>Справка от врача (при болезни)</li>
                    <li>Справка о смерти (при смерти родственника)</li>
                    <li>Документы, подтверждающие отмену или задержку рейса</li>
                    <li>Другие документы в зависимости от причины возврата</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Сроки возврата денег */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Сроки возврата денег</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Сроки возврата денежных средств зависят от способа оплаты:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li><strong>Банковская карта:</strong> до 30 дней (обычно 7-14 дней)</li>
                  <li><strong>Электронные кошельки:</strong> до 10 рабочих дней</li>
                  <li><strong>Наличные:</strong> при обращении в кассу</li>
                </ul>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Примечание:</strong> Задержки в возврате денег могут быть связаны с процедурами банка или платежной системы. Если деньги не вернулись в указанные сроки, обратитесь в службу поддержки перевозчика.
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

export default Kakiebyvayutvozvratybiletov;
