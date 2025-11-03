import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Dog, CheckCircle, AlertCircle, Phone, Globe } from "lucide-react";

const Kakputeshestvuyutslepye = () => {
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
          <span>Как путешествуют слепые?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как путешествуют слепые?</h1>

        <div className="space-y-8">
          {/* Это возможно */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Да, это возможно!</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Незрячие люди могут путешествовать самостоятельно или с сопровождением. Современный транспорт предоставляет необходимые услуги и поддержку.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Главное — заранее уведомить перевозчика о своих потребностях и подготовиться к поездке.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Собаки-поводыри */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Dog className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Собаки-поводыри</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Провоз собаки-поводыря</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Собака-поводырь провозится бесплатно</li>
                    <li>Не требуется клетка или переноска</li>
                    <li>Собака сидит рядом с хозяином</li>
                    <li>Нужны документы на собаку-поводыря</li>
                    <li>Уведомите перевозчика заранее</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Документы</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Паспорт собаки-поводыря</li>
                    <li>Справка о том, что собака является поводырем</li>
                    <li>Ветеринарный паспорт с прививками</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> При международных поездках уточните правила ввоза собак-поводырей в страну назначения.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Помощь перевозчиков */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Помощь перевозчиков</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Услуги, которые могут предоставить</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Сопровождение в аэропорту/на вокзале</li>
                    <li>Помощь при регистрации</li>
                    <li>Помощь при посадке и высадке</li>
                    <li>Информация в доступных форматах</li>
                    <li>Приоритетная посадка</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Как заказать помощь</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Уведомите перевозчика при покупке билета</li>
                    <li>Закажите услуги заранее (минимум за 48 часов)</li>
                    <li>Сообщите о своих потребностях</li>
                    <li>Приезжайте заранее для оформления помощи</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Планирование */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Планирование поездки</h2>
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Изучите доступность инфраструктуры в пункте назначения</li>
                  <li>Узнайте о доступных сервисах для незрячих</li>
                  <li>Рассмотрите возможность сопровождения</li>
                  <li>Подготовьте все необходимые документы</li>
                  <li>Используйте мобильные приложения с навигацией для незрячих</li>
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

export default Kakputeshestvuyutslepye;
