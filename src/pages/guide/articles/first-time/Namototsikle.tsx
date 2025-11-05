import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Bike, MapPin, AlertCircle, CheckCircle, Info } from "lucide-react";

const Namototsikle = () => {
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
          <Link to="/guide" className="hover:text-primary">Первый раз</Link>
          <span>/</span>
          <span>На мотоцикле</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Путешествие на мотоцикле: свобода на двух колёсах</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Путешествие на мотоцикле — это не просто способ добраться из точки А в точку Б. Это особый опыт, который даёт ощущение свободы, единения с дорогой и природой, возможность открыть для себя места, недоступные другим видам транспорта.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Мотоцикл позволяет чувствовать каждый поворот, каждый подъём, каждый порыв ветра. Это путешествие, где путь важнее пункта назначения, где каждый километр приносит новые впечатления.
              </p>
              <p className="text-base leading-relaxed">
                Но путешествие на мотоцикле требует подготовки, опыта и понимания всех рисков. Это не для всех, но для тех, кто готов, это может стать самым захватывающим приключением в жизни.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">С чего начать</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Получите права</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Для управления мотоциклом нужны права категории А. Обучение включает теоретический курс и практические занятия. Не пытайтесь ездить без прав — это опасно и незаконно.
                  </p>
                  <p className="text-base leading-relaxed">
                    После получения прав важно набрать опыт вождения в городе, на разных типах дорог, в разных погодных условиях. Не спешите сразу отправляться в длительное путешествие — сначала нужно уверенно чувствовать себя на мотоцикле.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Выберите мотоцикл</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Для первого путешествия лучше выбрать мотоцикл, которым вы уже уверенно управляете. Разные типы мотоциклов подходят для разных типов поездок:
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li><strong>Круизеры</strong> — комфортны для дальних поездок по асфальту</li>
                      <li><strong>Туристические</strong> — специально созданы для длительных путешествий</li>
                      <li><strong>Эндуро/адвенчур</strong> — для поездок по бездорожью и смешанным маршрутам</li>
                      <li><strong>Спортивные</strong> — для быстрой езды, но менее комфортны для долгих поездок</li>
                      <li><strong>Классические</strong> — универсальный вариант для начинающих</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Подготовьте мотоцикл</h3>
                  <p className="text-base leading-relaxed">
                    Перед длительным путешествием обязательно проверьте техническое состояние мотоцикла: тормоза, шины, цепи, масло, освещение. Проведите техническое обслуживание, замените изношенные детали. Неисправный мотоцикл — это не только неудобство, но и опасность.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Экипировка</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Правильная экипировка критически важна для безопасности мотоциклиста. Шлем — это не просто требование закона, это средство, которое может спасти жизнь. Инвестируйте в качественный шлем, который соответствует стандартам безопасности.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Защита</h3>
                  <p className="text-base leading-relaxed">
                    Мотоциклетная куртка и штаны из прочных материалов (кожа или специальные синтетические материалы), защитные перчатки, обувь с защитой голеностопа, наколенники и налокотники — всё это необходимо для защиты при падении.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Погодные условия</h3>
                  <p className="text-base leading-relaxed">
                    Возьмите с собой дождевик, тёплую одежду для холодной погоды, перчатки для разных температур. Погода может быстро меняться, и быть готовым к этому важно.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Видимость</h3>
                  <p className="text-base leading-relaxed">
                    Яркая одежда со светоотражающими элементами поможет водителям других транспортных средств лучше видеть вас. Это особенно важно в сумерках и ночью.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Планирование маршрута</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Планирование маршрута — важная часть подготовки. Для первого путешествия лучше выбрать не слишком длинный маршрут, чтобы можно было легко вернуться, если что-то пойдёт не так.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Расстояние</h3>
                  <p className="text-base leading-relaxed">
                    Не планируйте проезжать слишком много километров в день. 200-300 километров в день — это комфортное расстояние для начинающих. Помните, что езда на мотоцикле требует больше концентрации и утомляет быстрее, чем вождение автомобиля.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Дороги</h3>
                  <p className="text-base leading-relaxed">
                    Изучите маршрут заранее. Избегайте дорог с плохим покрытием, если у вас нет соответствующего опыта. Планируйте остановки для отдыха, заправки, проверки мотоцикла.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Где остановиться</h3>
                  <p className="text-base leading-relaxed">
                    Заранее найдите места, где можно безопасно оставить мотоцикл на ночь. Многие отели и мотели имеют охраняемые парковки. Не оставляйте мотоцикл без присмотра в незнакомых местах.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Безопасность</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Мотоцикл — это один из самых опасных видов транспорта. Статистика показывает, что мотоциклисты гораздо чаще попадают в аварии, чем водители автомобилей. Но правильная подготовка и соблюдение правил безопасности значительно снижают риски.
              </p>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Основные правила безопасности:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Всегда носите полную экипировку, даже в жаркую погоду</li>
                  <li>Не превышайте скорость, особенно на незнакомых дорогах</li>
                  <li>Будьте особенно осторожны на мокрой дороге и в поворотах</li>
                  <li>Предполагайте, что водители других транспортных средств вас не видят</li>
                  <li>Не ездите в усталом или стрессовом состоянии</li>
                  <li>Не употребляйте алкоголь перед поездкой</li>
                  <li>Регулярно делайте остановки для отдыха</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Защитное вождение — это ключ к безопасности. Всегда думайте наперёд, предвидьте действия других участников движения, держите дистанцию, будьте готовы к неожиданностям.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bike className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что взять с собой</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Инструменты</h3>
                  <p className="text-base leading-relaxed">
                    Базовый набор инструментов для ремонта: ключи, отвёртки, запасные предохранители, компрессор для подкачки шин, ремкомплект для шин. Знание того, как починить мелкие поломки, может спасти вас в глуши.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Документы</h3>
                  <p className="text-base leading-relaxed">
                    Права, документы на мотоцикл, страховка, медицинская страховка (особенно важно для поездок за границу). Храните копии документов в безопасном месте.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Личные вещи</h3>
                  <p className="text-base leading-relaxed">
                    Минимум вещей — на мотоцикле мало места. Возьмите только самое необходимое. Используйте кофры или багажники для перевозки вещей. Помните, что лишний вес влияет на управляемость мотоцикла.
                  </p>
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

export default Namototsikle;
