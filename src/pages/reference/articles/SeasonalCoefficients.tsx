import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, TrendingDown, TrendingUp, Info } from "lucide-react";

const SeasonalCoefficients = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Сезонные коэффициенты РЖД</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <h1 className="text-4xl font-bold">Сезонные коэффициенты РЖД</h1>
          <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">Обновлено 22 апреля 2025</span>
        </div>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                Изменения цен на железнодорожные билеты в течение года связаны с сезонными коэффициентами. 
                Такую систему ценообразования использует АО «Федеральная пассажирская компания». В разное время года цены на билеты повышаются 
                или понижаются согласно действующему коэффициенту. Эта таблица поможет понять, когда путешествовать выгоднее. 
                <span className="font-semibold text-green-700">Зеленым цветом</span> отмечены периоды, когда билеты дешевле всего.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                <p className="text-amber-900 text-sm">
                  <Info className="w-4 h-4 inline mr-2" />
                  Коэффициенты не применяются для поездов, которые участвуют в программе динамического ценообразования.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Таблица для купе и СВ */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Сезонные коэффициенты на 2025 год
              </h2>
              <h3 className="text-xl font-semibold mb-4">Купе и СВ</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-3 text-left">Даты поездки</th>
                      <th className="border border-border p-3 text-left">На сколько процентов дешевле или дороже билет</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-50">
                      <td className="border border-border p-3">1 января — 8 января</td>
                      <td className="border border-border p-3"><span className="text-green-700 font-semibold">-11%</span></td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-border p-3">9 января — 31 января</td>
                      <td className="border border-border p-3"><span className="text-green-700 font-semibold">-20%</span></td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-border p-3">1 февраля — 28 февраля</td>
                      <td className="border border-border p-3"><span className="text-green-700 font-semibold">-15%</span></td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-border p-3">1 марта — 23 марта</td>
                      <td className="border border-border p-3"><span className="text-green-700 font-semibold">-10%</span></td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">24 марта — 2 апреля</td>
                      <td className="border border-border p-3"><span className="text-red-700 font-semibold">+4%</span></td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-border p-3">3 апреля — 27 апреля</td>
                      <td className="border border-border p-3"><span className="text-green-700 font-semibold">-6%</span></td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">28 апреля — 11 мая</td>
                      <td className="border border-border p-3"><span className="text-red-700 font-semibold">+15%</span></td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">12 мая — 8 июня</td>
                      <td className="border border-border p-3"><span className="text-red-700 font-semibold">+11%</span></td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">9 июня — 12 июня</td>
                      <td className="border border-border p-3"><span className="text-red-700 font-semibold">+15%</span></td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">13 июня — 31 августа</td>
                      <td className="border border-border p-3"><span className="text-red-700 font-semibold">+20%</span></td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">1 сентября — 17 сентября</td>
                      <td className="border border-border p-3"><span className="text-red-700 font-semibold">+15%</span></td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-border p-3">18 сентября — 31 октября</td>
                      <td className="border border-border p-3"><span className="text-green-700 font-semibold">-10%</span></td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-border p-3">1 ноября — 15 декабря</td>
                      <td className="border border-border p-3"><span className="text-green-700 font-semibold">-13%</span></td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-border p-3">16 декабря — 25 декабря</td>
                      <td className="border border-border p-3"><span className="text-green-700 font-semibold">-10%</span></td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">26 декабря — 31 декабря</td>
                      <td className="border border-border p-3">0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Таблица для плацкарта */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Плацкарт и общие вагоны</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-3 text-left">Даты поездки</th>
                      <th className="border border-border p-3 text-left">На сколько процентов дешевле или дороже билет</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-50">
                      <td className="border border-border p-3">1 января — 8 января</td>
                      <td className="border border-border p-3"><span className="text-green-700 font-semibold">-11%</span></td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-border p-3">9 января — 31 января</td>
                      <td className="border border-border p-3"><span className="text-green-700 font-semibold">-20%</span></td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-border p-3">1 февраля — 28 февраля</td>
                      <td className="border border-border p-3"><span className="text-green-700 font-semibold">-15%</span></td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-border p-3">1 марта — 23 марта</td>
                      <td className="border border-border p-3"><span className="text-green-700 font-semibold">-10%</span></td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">24 марта — 2 апреля</td>
                      <td className="border border-border p-3"><span className="text-red-700 font-semibold">+4%</span></td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-border p-3">3 апреля — 27 апреля</td>
                      <td className="border border-border p-3"><span className="text-green-700 font-semibold">-6%</span></td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">28 апреля — 11 мая</td>
                      <td className="border border-border p-3"><span className="text-red-700 font-semibold">+15%</span></td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">12 мая — 8 июня</td>
                      <td className="border border-border p-3"><span className="text-red-700 font-semibold">+11%</span></td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">9 июня — 12 июня</td>
                      <td className="border border-border p-3"><span className="text-red-700 font-semibold">+15%</span></td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">13 июня — 31 августа</td>
                      <td className="border border-border p-3"><span className="text-red-700 font-semibold">+20%</span></td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">1 сентября — 17 сентября</td>
                      <td className="border border-border p-3"><span className="text-red-700 font-semibold">+15%</span></td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-border p-3">18 сентября — 31 октября</td>
                      <td className="border border-border p-3"><span className="text-green-700 font-semibold">-10%</span></td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-border p-3">1 ноября — 15 декабря</td>
                      <td className="border border-border p-3"><span className="text-green-700 font-semibold">-13%</span></td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-border p-3">16 декабря — 25 декабря</td>
                      <td className="border border-border p-3"><span className="text-green-700 font-semibold">-10%</span></td>
                    </tr>
                    <tr>
                      <td className="border border-border p-3">26 декабря — 31 декабря</td>
                      <td className="border border-border p-3">0%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2 text-base">
                <li>
                  <Link to="/reference/trains/how-to-buy" className="text-primary hover:underline">
                    Покупка ж/д билетов
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SeasonalCoefficients;
