import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Plane, AlertCircle, CheckCircle, Eye } from "lucide-react";

const Chtonadoznatpro = () => {
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
          <span>Что надо знать про безопасность?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что надо знать про безопасность авиаперелетов</h1>

        <div className="space-y-8">
          {/* Статистика */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Авиаперелеты — самый безопасный транспорт</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Авиаперелеты считаются одним из самых безопасных видов транспорта. Вероятность попасть в авиакатастрофу крайне мала.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Статистика:</strong> По статистике, авиаперелеты безопаснее автомобильных поездок в разы. Современные самолеты оснащены системами безопасности, которые делают полеты максимально надежными.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Правила безопасности */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Правила безопасности на борту</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Обязательные требования</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Пристегивайте ремни безопасности во время взлета, посадки и турбулентности</li>
                    <li>Следуйте инструкциям бортпроводников</li>
                    <li>Выключайте электронные устройства во время взлета и посадки</li>
                    <li>Открывайте шторки иллюминаторов при взлете и посадке</li>
                    <li>Знайте, где находятся запасные выходы</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Запрещено</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Курить на борту</li>
                    <li>Распивать алкоголь, принесенный с собой</li>
                    <li>Вставать во время взлета и посадки</li>
                    <li>Мешать работе экипажа</li>
                    <li>Открывать двери и аварийные выходы</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Системы безопасности */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Системы безопасности самолета</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Современные самолеты оснащены множеством систем безопасности:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Дублирование всех критических систем</li>
                  <li>Системы предупреждения столкновений</li>
                  <li>Автопилот и системы автоматической посадки</li>
                  <li>Противопожарные системы</li>
                  <li>Системы обнаружения турбулентности</li>
                  <li>Надежные двигатели с высоким запасом прочности</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Турбулентность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold">Турбулентность</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Турбулентность — это нормальное явление во время полета. Она не опасна для самолета.
                </p>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Что делать при турбулентности</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Пристегните ремни безопасности</li>
                    <li>Сохраняйте спокойствие</li>
                    <li>Не вставайте со своего места</li>
                    <li>Уберите вещи с откидных столиков</li>
                    <li>Следуйте инструкциям бортпроводников</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Турбулентность не опасна для самолета. Современные самолеты выдерживают гораздо более сильную турбулентность, чем та, которую вы можете испытать.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Что делать в экстренной ситуации */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Что делать в экстренной ситуации</h2>
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Сохраняйте спокойствие</li>
                  <li>Следуйте инструкциям бортпроводников</li>
                  <li>Пристегните ремни безопасности</li>
                  <li>Примите позу безопасности (если указано)</li>
                  <li>Не паникуйте и не мешайте экипажу</li>
                  <li>При эвакуации следуйте указаниям экипажа</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Важно помнить */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Важно помнить</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Слушайте инструктаж</p>
                    <p className="text-sm text-muted-foreground">
                      Внимательно слушайте инструктаж по безопасности перед полетом. Эта информация может спасти жизнь.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Доверяйте экипажу</p>
                    <p className="text-sm text-muted-foreground">
                      Экипаж обучен действовать в различных ситуациях. Следуйте их инструкциям.
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

export default Chtonadoznatpro;
