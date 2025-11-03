import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Ticket, AlertCircle, FileText, CheckCircle, CreditCard } from "lucide-react";

const ChtodelatEslipoteryal = () => {
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
          <span>Что делать, если потерял свой билет?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что делать, если потерял свой билет?</h1>

        <div className="space-y-8">
          {/* Электронная регистрация */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Если билет с электронной регистрацией</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Если у вас билет с электронной регистрацией, потеря физического билета не критична:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Для посадки достаточно предъявить документ, удостоверяющий личность</li>
                  <li>Данные о билете есть в системе</li>
                  <li>Вы можете показать билет на экране телефона (если сохранили)</li>
                  <li>Или найти билет в личном кабинете на сайте</li>
                </ul>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Преимущество:</strong> Электронная регистрация защищает от потери билета. Даже если вы потеряете все документы, билет остается в системе.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Физический билет */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Если потеряли физический билет</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Немедленные действия</h3>
                  <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Обратитесь в кассу вокзала или аэропорта</li>
                    <li>Предъявите документ, удостоверяющий личность</li>
                    <li>Сообщите номер заказа или данные пассажира</li>
                    <li>Кассир найдет ваш билет в системе и восстановит его</li>
                    <li>Может взиматься плата за восстановление билета</li>
                  </ol>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Если вы помните номер заказа или данные билета, восстановление пройдет быстрее. Сохраняйте подтверждения покупки!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Что нужно для восстановления */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что нужно для восстановления</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Документ, удостоверяющий личность (паспорт)</li>
                  <li>Номер заказа (если помните)</li>
                  <li>Данные пассажира (ФИО, дата поездки, маршрут)</li>
                  <li>Электронная квитанция или чек (если сохранили)</li>
                  <li>Данные карты, которой оплачивали (иногда)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Предотвращение потери */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Как избежать потери</h2>
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Покупайте билеты с электронной регистрацией</li>
                  <li>Сохраняйте подтверждения покупки на телефон</li>
                  <li>Сфотографируйте физический билет сразу после покупки</li>
                  <li>Храните билет в безопасном месте</li>
                  <li>Не выкидывайте подтверждения до окончания поездки</li>
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

export default ChtodelatEslipoteryal;
