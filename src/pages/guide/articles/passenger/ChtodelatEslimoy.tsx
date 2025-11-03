import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Luggage, AlertCircle, FileText, DollarSign, CheckCircle } from "lucide-react";

const ChtodelatEslimoy = () => {
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
          <span>Что делать, если мой багаж повредили?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что делать, если мой багаж повредили?</h1>

        <div className="space-y-8">
          {/* Немедленные действия */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Немедленные действия</h2>
              </div>

              <div className="space-y-4">
                <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Немедленно после получения багажа осмотрите его</li>
                  <li>Если заметили повреждения до выхода из зоны выдачи багажа, сразу обратитесь к службе обработки багажа</li>
                  <li>Если заметили после выхода — вернитесь в аэропорт и обратитесь в службу багажа</li>
                  <li>Составьте акт о повреждении багажа</li>
                  <li>Сфотографируйте повреждения</li>
                </ol>

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> У вас есть ограниченное время для подачи заявления о повреждении (обычно 7 дней с момента получения багажа). Действуйте быстро!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Оформление заявления */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Оформление заявления</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Что нужно предоставить</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Багажную квитанцию</li>
                    <li>Билет</li>
                    <li>Документ, удостоверяющий личность</li>
                    <li>Фотографии повреждений</li>
                    <li>Описывающий характер повреждений</li>
                    <li>Чеки на поврежденные вещи (при наличии)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Процедура</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Обратитесь в службу обработки багажа авиакомпании</li>
                    <li>Заполните форму заявления о повреждении</li>
                    <li>Получите копию акта о повреждении</li>
                    <li>Сохраните все документы</li>
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
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Компенсация</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Размер компенсации зависит от стоимости поврежденных вещей и правил перевозчика:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Авиакомпания оценит ущерб и предложит компенсацию</li>
                  <li>Компенсация может быть в виде денежных средств или ремонта багажа</li>
                  <li>Если стоимость превышает лимит ответственности, можно получить дополнительную компенсацию через суд</li>
                </ul>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Совет:</strong> Сохраняйте чеки на дорогие вещи в багаже — они помогут обосновать размер компенсации.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Защита багажа */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Как защитить багаж</h2>
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Используйте прочные чемоданы</li>
                  <li>Оберните чемодан пленкой в аэропорту</li>
                  <li>Не кладите хрупкие вещи в багаж</li>
                  <li>Оформите дополнительное страхование багажа</li>
                  <li>Дорогие вещи берите в ручную кладь</li>
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

export default ChtodelatEslimoy;
