import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Dog, Plane, Train, FileText, AlertCircle, CheckCircle } from "lucide-react";

const Kakpereveztizhivotnoe = () => {
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
          <span>Как перевезти животное?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как перевезти животное?</h1>

        <div className="space-y-8">
          {/* В самолёте */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Перевозка в самолёте</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Мелкие животные (до 8 кг с переноской)</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Можно провозить в салоне в специальной переноске</li>
                    <li>Переноска должна помещаться под сиденьем</li>
                    <li>Нужно уведомить авиакомпанию заранее</li>
                    <li>Обычно взимается дополнительная плата</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">Крупные животные</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Провозятся в багажном отсеке в специальной клетке</li>
                    <li>Требуется специальный контейнер, соответствующий требованиям IATA</li>
                    <li>Нужны ветеринарные документы</li>
                    <li>Обычно стоит дороже, чем провоз в салоне</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* В поезде */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Перевозка в поезде</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Мелкие животные</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Мелкие животные (до 20 кг) могут перевозиться в вагоне в переноске</li>
                    <li>Нужно уведомить при покупке билета</li>
                    <li>Взимается дополнительная плата</li>
                    <li>Животное должно быть в клетке или переноске</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">Крупные животные</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Обычно перевозятся в багажном вагоне</li>
                    <li>Требуется специальная клетка</li>
                    <li>Нужны ветеринарные документы</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Документы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Необходимые документы</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li><strong>Ветеринарный паспорт</strong> — с отметками о прививках</li>
                  <li><strong>Ветеринарное свидетельство</strong> — выдается за 5 дней до поездки</li>
                  <li><strong>Справка о вакцинации</strong> — особенно важна при международных поездках</li>
                  <li><strong>Справка о здоровье</strong> — для некоторых стран</li>
                </ul>

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Важно:
                  </p>
                  <p className="text-sm leading-relaxed">
                    Требования к документам различаются для внутренних и международных перевозок, а также в зависимости от страны назначения. Уточните требования заранее.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Подготовка */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Подготовка к перевозке</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Заблаговременное уведомление</p>
                    <p className="text-sm text-muted-foreground">
                      Обязательно уведомите перевозчика о перевозке животного при покупке билета или заранее.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Dog className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Подходящая переноска</p>
                    <p className="text-sm text-muted-foreground">
                      Приобретите качественную переноску или клетку, соответствующую требованиям перевозчика.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Привыкание</p>
                    <p className="text-sm text-muted-foreground">
                      Дайте животному привыкнуть к переноске заранее, чтобы уменьшить стресс во время поездки.
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

export default Kakpereveztizhivotnoe;
