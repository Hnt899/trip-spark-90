import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Zap, Info } from "lucide-react";

const Lastochki = () => {
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
          <Link to="/guide" className="hover:text-primary">Транспорт</Link>
          <span>/</span>
          <span>Ласточки</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как производятся «Ласточки»</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                «Ласточки» — это семейство высокоскоростных электропоездов, производимых компанией «Сименс» для российских железных дорог. Эти поезда работают на маршрутах между крупными городами и обеспечивают быстрое и комфортное передвижение.
              </p>
              <p className="text-base leading-relaxed">
                Производство «Ласточек» включает в себя современные технологии и строгий контроль качества, чтобы обеспечить надёжность и комфорт для пассажиров. Название «Ласточка» стало синонимом современного, быстрого и комфортного железнодорожного транспорта в России.
              </p>
            </CardContent>
          </Card>

          {/* История появления */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">История появления «Ласточек»</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  «Ласточки» появились в России в рамках подготовки к Олимпийским играм в Сочи в 2014 году. Эти поезда были заказаны для обеспечения быстрого и комфортного сообщения между городами и олимпийскими объектами.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Поезда основаны на платформе Siemens Desiro, которая успешно используется во многих странах мира. Адаптация для российских условий включала работу при низких температурах, соответствие российским стандартам безопасности и габаритам.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Интересный факт:</strong> Название «Ласточка» было выбрано в результате конкурса, проведённого среди пассажиров. Это название отражает скорость и лёгкость движения поезда.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Характеристики */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Характеристики «Ласточек»</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  «Ласточки» обладают впечатляющими техническими характеристиками, которые делают их одними из самых современных поездов в России.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <p className="text-sm font-semibold mb-2">Основные характеристики:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Максимальная скорость: до 250 км/ч</li>
                    <li>Современный дизайн и комфорт</li>
                    <li>Энергоэффективность</li>
                    <li>Надёжность и безопасность</li>
                    <li>Работа при температурах от -40°C до +40°C</li>
                    <li>Низкий уровень шума и вибрации</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Поезда могут работать как в составе из нескольких вагонов, так и в сцепке из двух составов, что позволяет перевозить большое количество пассажиров на популярных маршрутах.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Комфорт для пассажиров */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Комфорт для пассажиров</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  «Ласточки» обеспечивают высокий уровень комфорта для пассажиров. Внутреннее пространство вагонов спроектировано с учётом современных требований к комфорту и удобству.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Удобные кресла</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Кресла в «Ласточках» эргономичные и удобные, с регулируемыми подголовниками. Расстояние между рядами позволяет комфортно разместиться даже высоким пассажирам.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Климат-контроль</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Современная система кондиционирования обеспечивает комфортную температуру в любое время года. Система автоматически поддерживает оптимальный микроклимат.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Информационные системы</h3>
                    <p className="text-base leading-relaxed">
                      В вагонах установлены информационные табло, которые показывают скорость движения, температуру снаружи, следующую станцию и другую полезную информацию. Есть также розетки для зарядки устройств и Wi-Fi.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Где работают */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Где работают «Ласточки»</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  «Ласточки» работают на многих популярных маршрутах между крупными городами России. Они связывают столицу с регионами и обеспечивают быстрое сообщение между городами.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Среди основных маршрутов можно выделить: Москва — Санкт-Петербург, Москва — Нижний Новгород, Москва — Казань, Санкт-Петербург — Хельсинки и многие другие.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    «Ласточки» стали символом современного железнодорожного транспорта в России. Они демонстрируют, что железные дороги могут быть быстрыми, комфортными и современными.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Производство */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Производство и локализация</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Первые «Ласточки» были произведены в Германии, но затем производство было локализовано в России. Это позволило создать рабочие места и развить железнодорожное машиностроение в стране.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Локализация производства включала не только сборку, но и производство многих компонентов в России. Это способствовало развитию технологий и созданию инфраструктуры для производства современных поездов.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Локализация производства «Ласточек» стала важным шагом в развитии российского железнодорожного машиностроения и показала возможность производства высокотехнологичной продукции в России.
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

export default Lastochki;
