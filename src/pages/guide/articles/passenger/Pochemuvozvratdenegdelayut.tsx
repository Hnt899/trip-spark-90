import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Building2, AlertCircle, CheckCircle } from "lucide-react";

const Pochemuvozvratdenegdelayut = () => {
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
          <span>Почему возврат денег делают 30 дней?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Почему возврат денег делают до 30 дней?</h1>

        <div className="space-y-8">
          {/* Банковские процедуры */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Банковские процедуры</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Срок возврата денег до 30 дней установлен законом и связан с процедурами обработки платежей между различными участниками платежной системы.
                </p>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Этапы возврата</h3>
                  <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Перевозчик обрабатывает заявление на возврат (1-3 дня)</li>
                    <li>Деньги переводятся от перевозчика в банк-эквайер (1-3 дня)</li>
                    <li>Банк-эквайер отправляет запрос в банк-эмитент вашей карты (1-5 дней)</li>
                    <li>Банк-эмитент зачисляет деньги на ваш счет (1-5 дней)</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Почему именно 30 дней */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Почему именно 30 дней</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Максимальный срок в 30 дней установлен Федеральным законом "О защите прав потребителей" и связан с необходимостью проверки транзакций и защиты от мошенничества.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Обычно возврат происходит быстрее — в течение 7-14 дней. Максимальный срок в 30 дней — это крайний срок, на случай если возникнут какие-либо задержки в обработке.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Что влияет на скорость */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что влияет на скорость возврата</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li><strong>Банк-эмитент</strong> — разные банки обрабатывают возвраты с разной скоростью</li>
                  <li><strong>Тип карты</strong> — возвраты на дебетовые карты обычно быстрее, чем на кредитные</li>
                  <li><strong>Время подачи заявления</strong> — заявления, поданные в рабочие дни, обрабатываются быстрее</li>
                  <li><strong>Праздничные дни</strong> — в праздники и выходные обработка может затянуться</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Если деньги не вернулись */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Если деньги не вернулись</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Если прошло более 30 дней, а деньги не вернулись:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Свяжитесь со службой поддержки перевозчика</li>
                  <li>Уточните статус возврата и причину задержки</li>
                  <li>Обратитесь в банк, выпустивший вашу карту</li>
                  <li>При необходимости подайте жалобу в Роспотребнадзор</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pochemuvozvratdenegdelayut;
