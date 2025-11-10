import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Users, Zap, Info } from "lucide-react";

const AirbusA320 = () => {
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
          <span>Airbus A320</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Airbus A320</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Airbus A320 — это семейство узкофюзеляжных самолётов европейского производителя Airbus, которое стало одним из основных конкурентов Boeing 737. Эти самолёты широко используются авиакомпаниями по всему миру для среднемагистральных перелётов.
              </p>
              <p className="text-base leading-relaxed">
                Airbus A320 стал символом европейской авиапромышленности и одним из самых успешных самолётов в истории. Его популярность объясняется экономичностью, комфортом и современными технологиями.
              </p>
            </CardContent>
          </Card>

          {/* Особенности */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Особенности</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  A320 известен своей экономичностью, комфортом для пассажиров и современными системами управления. Семейство включает модели A318, A319, A320 и A321, которые различаются вместимостью и дальностью полёта.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Основные особенности:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Экономичность и низкий расход топлива</li>
                    <li>Комфортный салон с широким проходом</li>
                    <li>Современные системы управления (fly-by-wire)</li>
                    <li>Экологичность и соответствие современным стандартам</li>
                    <li>Надёжность и безопасность</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Эти особенности делают Airbus A320 привлекательным для авиакомпаний и комфортным для пассажиров.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Модели семейства */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Модели семейства</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Семейство Airbus A320 включает несколько моделей, каждая из которых предназначена для определённых задач.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Модели:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>A318 — самая маленькая модель, до 132 пассажиров</li>
                    <li>A319 — компактная модель, до 160 пассажиров</li>
                    <li>A320 — стандартная модель, до 180 пассажиров</li>
                    <li>A321 — самая большая модель, до 240 пассажиров</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Все модели имеют общую конструкцию и системы, что упрощает обучение экипажей и обслуживание.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Системы fly-by-wire */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Современные системы управления</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Airbus A320 стал одним из первых узкофюзеляжных самолётов с системой fly-by-wire, где команды пилота передаются через компьютеры, а не напрямую к органам управления.
                </p>
                <p className="text-base leading-relaxed">
                  Эта система обеспечивает лучшую управляемость, безопасность и экономичность, автоматически оптимизируя полёт для максимальной эффективности.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Комфорт пассажиров */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Комфорт пассажиров</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Airbus A320 известен комфортом для пассажиров. Широкий проход, удобные кресла, современные системы кондиционирования и освещения создают приятную атмосферу в салоне.
                </p>
                <p className="text-base leading-relaxed">
                  Салон спроектирован с учётом современных требований к комфорту, обеспечивая приятный опыт полёта для пассажиров.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Экономичность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Экономичность и экологичность</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Airbus A320 разработан с учётом требований к экономичности и экологичности. Современные двигатели, улучшенная аэродинамика и системы управления обеспечивают низкий расход топлива и выбросы.
                </p>
                <p className="text-base leading-relaxed">
                  Это делает Airbus A320 экономически эффективным для авиакомпаний и экологически ответственным, что важно в условиях растущих требований к защите окружающей среды.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Популярность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Популярность Airbus A320</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Airbus A320 стал одним из самых популярных самолётов в мире. Тысячи самолётов этого семейства работают в авиакомпаниях по всему миру, конкурируя с Boeing 737.
                </p>
                <p className="text-base leading-relaxed">
                  Популярность объясняется экономичностью, комфортом, современными технологиями и надёжностью, что делает Airbus A320 привлекательным выбором для многих авиакомпаний.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Наследие */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Наследие Airbus A320</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Airbus A320 оставил огромное наследие в истории авиации. Он стал символом европейской авиапромышленности и одним из самых успешных самолётов в истории.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Опыт создания и эксплуатации Airbus A320 используется при разработке новых самолётов, включая следующее поколение — A320neo, а сам самолёт продолжает работать во многих авиакомпаниях по всему миру.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Вывод:</strong> Airbus A320 — это не просто самолёт, а символ успеха европейской авиапромышленности, который продемонстрировал, как современные технологии и правильный подход могут создать один из самых популярных самолётов в мире.
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

export default AirbusA320;
