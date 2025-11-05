import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Phone, Mail, Clock, AlertCircle, CheckCircle } from "lucide-react";

const Gdemoyvozvrat = () => {
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
          <span>Где мой возврат?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Где мой возврат?</h1>

        <div className="space-y-8">
          {/* Проверка статуса */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Search className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как проверить статус возврата</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Онлайн</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Зайдите в личный кабинет на сайте TudaSuda</li>
                    <li>Перейдите в раздел "Мои заказы" или "Возвраты"</li>
                    <li>Найдите ваш заказ с возвратом</li>
                    <li>Проверьте статус обработки возврата</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">По телефону</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Позвоните в службу поддержки перевозчика</li>
                    <li>Назовите номер заказа и данные пассажира</li>
                    <li>Уточните статус возврата и сроки зачисления денег</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Сроки возврата */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Сроки возврата</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed mb-3">
                    <strong>Обычные сроки:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Обработка заявления: 1-3 рабочих дня</li>
                    <li>Возврат на карту: 7-30 календарных дней</li>
                    <li>Возврат на электронный кошелек: 3-10 рабочих дней</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Максимальный срок возврата денег на банковскую карту — 30 календарных дней с момента подачи заявления.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Почему может задерживаться */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold">Почему может задерживаться возврат</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Задержки обработки в банке-эмитенте вашей карты</li>
                  <li>Праздничные и выходные дни</li>
                  <li>Необходимость дополнительной проверки транзакции</li>
                  <li>Технические работы в платежных системах</li>
                  <li>Некорректно указанные данные при возврате</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Что делать, если не вернули */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Что делать, если деньги не вернулись</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Если прошло более 30 дней</h3>
                  <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Свяжитесь со службой поддержки перевозчика</li>
                    <li>Запросите письменное подтверждение обработки возврата</li>
                    <li>Обратитесь в банк, выпустивший вашу карту</li>
                    <li>Проверьте выписку по карте — возможно, деньги уже поступили</li>
                    <li>При необходимости подайте претензию или жалобу</li>
                  </ol>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold mb-1">Совет:</p>
                      <p className="text-sm leading-relaxed">
                        Сохраняйте все документы, связанные с возвратом: номер заявления, дату подачи, переписку с перевозчиком. Это поможет при решении спорных ситуаций.
                      </p>
                    </div>
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

export default Gdemoyvozvrat;
