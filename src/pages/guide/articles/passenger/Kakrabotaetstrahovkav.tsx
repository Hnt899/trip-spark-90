import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertCircle, FileText, Clock, CheckCircle, DollarSign } from "lucide-react";

const Kakrabotaetstrahovkav = () => {
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
          <span>Как работает страховка в билете?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как работает страховка в билете?</h1>

        <div className="space-y-8">
          {/* Что такое страховка */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что такое страховка в билете</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Страховка в билете — это дополнительная услуга, которая обеспечивает финансовую защиту пассажира на случай непредвиденных ситуаций во время поездки.
                </p>
                <p className="text-base leading-relaxed">
                  При покупке билета вы можете подключить страховку от несчастных случаев. Страховая премия обычно добавляется к стоимости билета автоматически или по выбору пассажира.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Что покрывает страховка */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что покрывает страховка</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Основные риски</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li><strong>Несчастный случай</strong> во время поездки</li>
                    <li><strong>Травмы</strong>, полученные в транспорте или на вокзале</li>
                    <li><strong>Временная нетрудоспособность</strong> в результате несчастного случая</li>
                    <li><strong>Инвалидность</strong> в результате несчастного случая</li>
                    <li><strong>Смерть</strong> в результате несчастного случая</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Страховка покрывает только несчастные случаи, произошедшие во время поездки. Обычно она не покрывает хронические заболевания, обострения существующих болезней и другие исключения, указанные в договоре.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как получить выплату */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как получить страховую выплату</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Необходимые документы</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Заявление о страховом случае (бланк можно получить у страховой компании)</li>
                    <li>Медицинские документы, подтверждающие факт несчастного случая</li>
                    <li>Справки из медицинского учреждения о полученных травмах</li>
                    <li>Копия билета с отметкой о страховке</li>
                    <li>Документ, удостоверяющий личность</li>
                    <li>Другие документы по требованию страховой компании</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Процедура получения</h3>
                  <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Немедленно обратитесь за медицинской помощью при наступлении страхового случая</li>
                    <li>Сообщите страховой компании о страховом случае в течение установленного срока (обычно 30 дней)</li>
                    <li>Соберите все необходимые документы</li>
                    <li>Подайте заявление и документы в страховую компанию</li>
                    <li>Дождитесь рассмотрения заявления (обычно 10-30 дней)</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Важные моменты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Важные моменты</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Обратите внимание:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Внимательно читайте условия страхования перед покупкой билета</li>
                    <li>Уточните размер страховой суммы и перечень покрываемых рисков</li>
                    <li>Сохраняйте все документы, связанные с поездкой и страховкой</li>
                    <li>Обращайтесь в страховую компанию своевременно</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Исключения из покрытия</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Заболевания, не связанные с несчастным случаем</li>
                    <li>Хронические заболевания и их обострения</li>
                    <li>Употребление алкоголя или наркотических веществ</li>
                    <li>Самоубийство или попытка самоубийства</li>
                    <li>Участие в противоправных действиях</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Полезные советы */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные советы</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Изучите договор</p>
                    <p className="text-sm text-muted-foreground">
                      Перед поездкой ознакомьтесь с условиями страхования и сохраните контакты страховой компании.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Действуйте быстро</p>
                    <p className="text-sm text-muted-foreground">
                      При наступлении страхового случая немедленно обращайтесь за медицинской помощью и сообщайте страховой компании.
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

export default Kakrabotaetstrahovkav;
