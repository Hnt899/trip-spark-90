import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, AlertCircle, Phone, DollarSign, Plane } from "lucide-react";

const ChtodelatEsliopozdali = () => {
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
          <span>Что делать, если опоздали на самолет?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что делать, если опоздали на самолет?</h1>

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
                  <li>Немедленно обратитесь к стойке регистрации авиакомпании</li>
                  <li>Сообщите сотрудникам, что вы опоздали</li>
                  <li>Проверьте, не закрыта ли еще регистрация (иногда она закрывается раньше)</li>
                  <li>Если регистрация закрыта, спросите о возможности перебронирования</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Варианты решения */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Варианты решения</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Перебронирование на другой рейс</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Если есть свободные места на следующих рейсах, можно перебронировать билет</li>
                    <li>Может взиматься доплата за перебронирование</li>
                    <li>Некоторые тарифы не позволяют перебронирование</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Возврат билета</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Можно вернуть билет, но с удержанием штрафов и сборов</li>
                    <li>Размер возврата зависит от тарифа и правил авиакомпании</li>
                    <li>Некоторые тарифы не подлежат возврату</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Уважительные причины */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Если была уважительная причина</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Если вы опоздали по уважительной причине (болезнь, задержка предыдущего рейса той же авиакомпании и т.д.), авиакомпания может пойти навстречу:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Предоставить место на следующем рейсе без доплаты</li>
                  <li>Вернуть деньги без удержаний</li>
                  <li>Оформить возврат с минимальными потерями</li>
                </ul>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Обязательно предоставьте документы, подтверждающие уважительную причину опоздания (справка о болезни, документы о задержке рейса и т.д.).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как избежать */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Как избежать опоздания</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Приезжайте заранее</p>
                    <p className="text-sm text-muted-foreground">
                      Приезжайте в аэропорт за 2-3 часа до вылета для международных рейсов и за 1.5-2 часа для внутренних.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Регистрируйтесь онлайн</p>
                    <p className="text-sm text-muted-foreground">
                      Пройдите онлайн-регистрацию заранее, это сэкономит время в аэропорту.
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

export default ChtodelatEsliopozdali;
