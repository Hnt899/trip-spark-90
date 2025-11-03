import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, AlertCircle, CheckCircle, User } from "lucide-react";

const SmenafamiliiKakkupit = () => {
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
          <span>Смена фамилии, как купить билет?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Я буду менять фамилию, но хочу купить билет сейчас. Что делать?</h1>

        <div className="space-y-8">
          {/* Вариант 1: Старая фамилия */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Вариант 1: Покупка на старую фамилию</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Если вы еще не успели поменять документы, купите билет на фамилию, указанную в текущем паспорте.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> При посадке в поезд или на самолет предъявляйте тот документ, данные которого указаны в билете. Если вы смените паспорт до поездки, вам нужно будет переоформить билет.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Вариант 2: Переоформление */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Вариант 2: Переоформление билета</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Если вы успели поменять документы до поездки, нужно переоформить билет:
                </p>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Что нужно для переоформления</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Старый билет или номер заказа</li>
                    <li>Старый документ (если еще не сдан)</li>
                    <li>Новый документ с новой фамилией</li>
                    <li>Справка о смене фамилии (свидетельство о браке, решение суда и т.д.)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Где переоформить</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>В кассе вокзала или аэропорта</li>
                    <li>В личном кабинете на сайте (некоторые перевозчики)</li>
                    <li>По телефону службы поддержки</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Важные нюансы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold">Важные нюансы</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Обратите внимание:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Переоформление может стоить дополнительных денег (сбор за переоформление)</li>
                    <li>На заграничных рейсах требования могут отличаться — уточните у перевозчика</li>
                    <li>Для международных рейсов может потребоваться переоформление визы</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Сроки</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Переоформление лучше делать заранее, не в день поездки</li>
                    <li>Некоторые перевозчики позволяют переоформить билет до определенного времени до отправления</li>
                    <li>После отправления переоформить билет невозможно</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Рекомендации */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Рекомендации</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Планируйте заранее</p>
                    <p className="text-sm text-muted-foreground">
                      Если знаете, что будете менять фамилию, спланируйте поездку так, чтобы не покупать билеты заранее, либо будьте готовы к переоформлению.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Берите документы</p>
                    <p className="text-sm text-muted-foreground">
                      При переоформлении берите с собой все документы: старый и новый паспорт, документ о смене фамилии.
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

export default SmenafamiliiKakkupit;
