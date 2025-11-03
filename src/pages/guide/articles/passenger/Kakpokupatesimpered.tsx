import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Globe, CheckCircle, AlertCircle, Clock } from "lucide-react";

const Kakpokupatesimpered = () => {
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
          <span>Как покупать eSIM перед поездкой?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как покупать eSIM перед поездкой?</h1>

        <div className="space-y-8">
          {/* Что такое eSIM */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что такое eSIM</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  eSIM — это встроенная SIM-карта, которая встроена в ваш телефон. Вместо физической карточки вы активируете виртуальный профиль оператора.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Преимущества:</strong> Не нужно менять физическую SIM-карту, можно иметь несколько номеров одновременно, удобно при путешествиях.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Где купить */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Где купить eSIM</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Онлайн-сервисы</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Специализированные сервисы для путешественников</li>
                    <li>Сайты операторов связи других стран</li>
                    <li>Приложения для покупки eSIM</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Что нужно знать перед покупкой</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Проверьте, поддерживает ли ваш телефон eSIM</li>
                    <li>Узнайте, какие операторы работают в стране назначения</li>
                    <li>Сравните тарифы разных операторов</li>
                    <li>Проверьте, какая скорость интернета включена</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как активировать */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как активировать eSIM</h2>
              </div>

              <div className="space-y-4">
                <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Купите eSIM онлайн перед поездкой</li>
                  <li>Получите QR-код для активации на email</li>
                  <li>Откройте настройки телефона</li>
                  <li>Найдите раздел "Мобильные данные" или "Сотовые данные"</li>
                  <li>Выберите "Добавить план данных"</li>
                  <li>Отсканируйте QR-код</li>
                  <li>Следуйте инструкциям на экране</li>
                </ol>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Совет:</strong> Активируйте eSIM заранее, еще находясь дома, чтобы убедиться, что все работает правильно.
                  </p>
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
                    <p className="text-base font-semibold mb-1">Покупайте заранее</p>
                    <p className="text-sm text-muted-foreground">
                      Лучше купить eSIM еще до поездки, чтобы иметь время для активации и проверки.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Проверьте поддержку телефона</p>
                    <p className="text-sm text-muted-foreground">
                      Не все телефоны поддерживают eSIM. Проверьте это перед покупкой.
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

export default Kakpokupatesimpered;
