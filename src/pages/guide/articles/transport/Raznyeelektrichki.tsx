import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Zap, Info } from "lucide-react";

const Raznyeelektrichki = () => {
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
          <span>Разные электрички</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Электрички: разные, очень разные</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Электрички — это разнообразный класс поездов пригородного сообщения. Существует множество различных моделей и типов электричек, каждая из которых имеет свои особенности, характеристики и историю.
              </p>
              <p className="text-base leading-relaxed">
                От старых советских ЭР2 и ЭР2Т до современных «Ласточек», «Иволг» и ЭП2ДМ — каждая модель представляет свой этап развития пригородного железнодорожного транспорта.
              </p>
            </CardContent>
          </Card>

          {/* Разнообразие моделей */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Разнообразие моделей</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Каждая модель электрички имеет свои особенности: скорость, комфорт, вместимость, систему управления, внешний вид и внутреннее устройство. Различия могут быть как значительными, так и едва заметными для обычного пассажира.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  На российских железных дорогах можно встретить электрички разных поколений и производителей. Каждая модель создавалась для решения определённых задач и отражает уровень технологий своего времени.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Основные различия между моделями:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Максимальная скорость движения</li>
                    <li>Уровень комфорта и оснащённости</li>
                    <li>Вместимость вагонов</li>
                    <li>Система управления и автоматизации</li>
                    <li>Энергоэффективность</li>
                    <li>Дизайн интерьера и экстерьера</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Классические модели */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Классические советские модели</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  ЭР2, ЭР2Т, ЭР2Р — это классические модели электричек, которые долгие годы были основой пригородного сообщения. Эти поезда отличаются надёжностью и простотой конструкции.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">ЭР2</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Одна из самых массовых моделей советских электричек. Производилась с 1962 года и долгие годы была основой пригородного парка.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">ЭР2Т</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Модификация ЭР2 с тиристорным управлением, что позволило улучшить энергоэффективность и плавность хода.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">ЭР2Р</h3>
                    <p className="text-base leading-relaxed">
                      Реостатно-контакторная модель с улучшенными характеристиками и комфортом.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Современные модели */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Современные модели</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Современные электрички представляют собой качественно новый уровень комфорта, скорости и технологий. Среди них можно выделить несколько основных семейств.
                </p>
                <div className="space-y-3">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">«Ласточки» (Desiro RUS)</p>
                    <p className="text-sm leading-relaxed">
                      Высокоскоростные электропоезда производства Siemens, работающие на маршрутах между крупными городами. Скорость до 250 км/ч, современный комфорт.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">«Иволги»</p>
                    <p className="text-sm leading-relaxed">
                      Российские электропоезда нового поколения с улучшенным комфортом и современным дизайном. Работают на пригородных маршрутах.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">ЭП2ДМ</p>
                    <p className="text-sm leading-relaxed">
                      Модернизированные электропоезда с улучшенной системой кондиционирования и комфортом для пассажиров.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Региональные различия */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Региональные различия</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  В разных регионах России можно встретить разные модели электричек. Это связано с историей развития железных дорог в регионе, особенностями маршрутов и требованиями к перевозкам.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Например, в крупных агломерациях чаще можно встретить современные модели с высоким уровнем комфорта, в то время как на менее загруженных линиях могут работать более старые, но надёжные модели.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    Каждая модель электрички имеет свою историю и особенности. Знание этих различий помогает лучше понимать, чего ожидать от поездки и как выбрать наиболее подходящий маршрут.
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

export default Raznyeelektrichki;
