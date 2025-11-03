import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Bus, AlertCircle, Phone, DollarSign, Clock, CheckCircle } from "lucide-react";

const ChtodelatEsliavtobus = () => {
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
          <span>Что делать, если автобус не приехал?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что делать, если автобус не приехал?</h1>

        <div className="space-y-8">
          {/* Первые действия */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Первые действия</h2>
              </div>

              <div className="space-y-4">
                <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Убедитесь, что вы на правильной остановке и в правильное время</li>
                  <li>Проверьте расписание — возможно, произошли изменения</li>
                  <li>Подождите немного — автобус может задержаться</li>
                  <li>Свяжитесь с перевозчиком или автовокзалом</li>
                  <li>Уточните причину задержки</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Контакты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Куда обращаться</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Контакты</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Служба поддержки перевозчика (телефон из билета или сайта)</li>
                    <li>Автовокзал (справочная служба)</li>
                    <li>Диспетчерская служба перевозчика</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Что сообщить</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Номер рейса</li>
                    <li>Дату и время отправления</li>
                    <li>Маршрут</li>
                    <li>Место ожидания</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Возможные причины */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Возможные причины</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Задержка из-за дорожной ситуации</li>
                  <li>Технические неполадки автобуса</li>
                  <li>Отмена рейса</li>
                  <li>Изменение расписания</li>
                  <li>Автобус уже уехал (вы опоздали)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Ваши права */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Ваши права</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Если рейс отменен или сильно задержан</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Право на возврат полной стоимости билета</li>
                    <li>Перебронирование на другой рейс (при наличии мест)</li>
                    <li>Возмещение ущерба (при значительной задержке)</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Сохраняйте все документы (билеты, чеки) и записывайте время ожидания. Это может понадобиться для получения компенсации.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как избежать */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Как избежать проблем</h2>
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Приезжайте на остановку заранее</li>
                  <li>Проверяйте актуальное расписание перед поездкой</li>
                  <li>Подпишитесь на уведомления от перевозчика</li>
                  <li>Сохраните контакты перевозчика в телефоне</li>
                  <li>Покупайте билеты у надежных перевозчиков</li>
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

export default ChtodelatEsliavtobus;
