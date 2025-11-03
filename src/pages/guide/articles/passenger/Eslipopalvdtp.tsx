import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Phone, FileText, Heart, AlertCircle } from "lucide-react";

const Eslipopalvdtp = () => {
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
          <span>Если попал в ДТП в автобусе?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что делать, если попал в ДТП в автобусе?</h1>

        <div className="space-y-8">
          {/* Первые действия */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Первые действия</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-xl font-bold text-red-900 mb-2">112</p>
                  <p className="text-sm text-red-900">
                    Немедленно вызовите скорую помощь и полицию.
                  </p>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Оцените свое состояние и состояние других пассажиров</li>
                  <li>Если можете двигаться, покиньте автобус безопасным способом</li>
                  <li>Окажите первую помощь пострадавшим, если вы способны</li>
                  <li>Не трогайте раненых без крайней необходимости</li>
                  <li>Дождитесь прибытия экстренных служб</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Медицинская помощь */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Медицинская помощь</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Даже если вам кажется, что травм нет, обязательно пройдите медицинское обследование</li>
                  <li>Некоторые травмы могут проявиться позже (например, ушибы, растяжения)</li>
                  <li>Получите справку о медицинском осмотре — она понадобится для оформления страховки</li>
                  <li>Сохраните все чеки и документы, связанные с лечением</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Документация */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Документирование происшествия</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Что нужно зафиксировать</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Номер автобуса и маршрут</li>
                    <li>Название компании-перевозчика</li>
                    <li>Место и время происшествия</li>
                    <li>Контактные данные других пассажиров-свидетелей</li>
                    <li>Фотографии места ДТП (если возможно)</li>
                    <li>Протокол о ДТП от сотрудников полиции</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Компенсация */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Получение компенсации</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Страхование</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Перевозчик обязан иметь страховку ответственности перед пассажирами</li>
                    <li>Обратитесь в страховую компанию перевозчика с документами о ДТП</li>
                    <li>Предоставьте медицинские справки о полученных травмах</li>
                    <li>Сохраните все чеки на лечение и восстановление</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Если перевозчик отказывается выплачивать компенсацию, вы можете обратиться в суд. Обратитесь за консультацией к юристу.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Права пассажира */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Права пассажира</h2>
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Право на медицинскую помощь</li>
                  <li>Право на компенсацию морального и материального вреда</li>
                  <li>Право на возмещение расходов на лечение</li>
                  <li>Право на информацию о происшествии</li>
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

export default Eslipopalvdtp;
