import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Globe, Info } from "lucide-react";

const TrainTypes = () => {
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
          <span>Какие бывают вагоны и поезда</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Какие бывают вагоны и поезда</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                При выборе поезда и вагона возникает множество вопросов. Рассказываем об основных типах вагонов и поездов, перевозчиках и их особенностях.
              </p>
            </CardContent>
          </Card>

          {/* Перевозчики */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                Все ж/д перевозчики России и стран СНГ
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Проверить, к какому перевозчику относится тот или иной поезд, вы можете на странице выбора вагона, рядом с его номером.
                </p>
                <div className="space-y-2">
                  <p className="font-semibold">Российские перевозчики:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>ФПК</strong> — АО «Федеральная пассажирская компания» (дочерняя структура РЖД)</li>
                    <li><strong>ДОСС</strong> — дочерняя компания РЖД, скоростные поезда («Сапсан», «Ласточка»)</li>
                    <li><strong>Гранд Сервис Экспресс</strong> — частный перевозчик (поезда «Гранд Экспресс», «Таврия»)</li>
                    <li><strong>Тверской экспресс</strong> — поезд «Мегаполис»</li>
                  </ul>
                </div>
                <div className="space-y-2 mt-4">
                  <p className="font-semibold">Перевозчики стран СНГ и Балтии:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>БЧ</strong> — государственный перевозчик Беларуси</li>
                    <li><strong>ЛДЗ</strong> — Латвийская железная дорога</li>
                    <li><strong>ЛГ</strong> — Литовские железные дороги</li>
                    <li><strong>ТЖД</strong> — Таджикская железная дорога</li>
                    <li><strong>Elron</strong> — перевозчик Эстонии</li>
                    <li><strong>УТИ</strong> — Узбекистанские железные дороги</li>
                    <li><strong>ЧФМ</strong> — Железная дорога Молдовы</li>
                    <li><strong>КТЖ</strong> — перевозчик Киргизии</li>
                    <li><strong>АЗ</strong> — Азербайджанские железные дороги</li>
                    <li>Перевозчики Казахстана</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Типы вагонов */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                Какие бывают вагоны
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Плацкарт</h3>
                  <p>54 места в вагоне, из них 18 боковых. Четные места — верхние, нечетные — нижние.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Купе</h3>
                  <p>36 мест, распределенных по 9 купе. В одном купе 4 полки: две нижние и две верхние.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">СВ (спальный вагон)</h3>
                  <p>18 мест в вагоне, в каждом отсеке по два места. Верхних полок нет.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Люкс</h3>
                  <p>Двухместные купе повышенной комфортности с отдельными удобствами.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Сидячие вагоны</h3>
                  <p>81 место в вагоне. Используются в скоростных поездах («Сапсан», «Ласточка», «Стриж»).</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Мужские и женские купе</h3>
                  <p>Специальные купе для одного пола, обеспечивающие дополнительный комфорт пассажирам.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Номер поезда */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                Что значит номер поезда?
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Номер поезда указывает на его категорию и особенности маршрута. Буква в номере поезда может означать тип поезда (скорый, скоростной и т.д.) 
                  или особые условия следования.
                </p>
                <p>
                  Услуги в вагоне зависят от типа поезда и перевозчика. На карточке поезда на TudaSuda вы можете увидеть все доступные услуги: кондиционер, биотуалет, 
                  Wi-Fi, розетки и другие удобства.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2 text-base">
                <li>
                  <Link to="/reference/trains/carriage-schemes" className="text-primary hover:underline">
                    Схемы вагонов ЖД
                  </Link>
                </li>
                <li>
                  <Link to="/reference/trains/sapsan" className="text-primary hover:underline">
                    Поезд «Сапсан»
                  </Link>
                </li>
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

export default TrainTypes;
