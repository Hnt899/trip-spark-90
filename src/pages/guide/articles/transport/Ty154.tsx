import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Users, History, Star } from "lucide-react";

const Ty154 = () => {
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
          <span>Ту-154</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Ту-154: главный самолёт страны</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Ту-154 — это легендарный среднемагистральный самолёт, который был основным пассажирским самолётом СССР и России на протяжении нескольких десятилетий. Этот самолёт перевёз миллионы пассажиров и стал символом эпохи.
              </p>
              <p className="text-base leading-relaxed">
                Ту-154 был настоящим «рабочей лошадкой» советской и российской авиации, обслуживая маршруты по всей стране и за её пределами. Он стал символом целой эпохи в истории гражданской авиации.
              </p>
            </CardContent>
          </Card>

          {/* История и значение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">История и значение</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ту-154 производился с 1968 по 2013 год и был основным самолётом Аэрофлота. Он обслуживал маршруты по всей стране и за её пределами, став настоящим символом советской и российской гражданской авиации.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  За время производства было построено более 1000 самолётов Ту-154 различных модификаций. Он стал одним из самых массовых советских пассажирских самолётов.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Интересный факт:</strong> Ту-154 был основным самолётом Аэрофлота на протяжении более 40 лет, перевезя миллионы пассажиров по всему миру.
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
                  <History className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Характеристики Ту-154</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ту-154 обладал характеристиками, которые делали его подходящим для среднемагистральных перелётов.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Основные характеристики:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Вместимость: до 180 пассажиров</li>
                    <li>Дальность полёта: до 3900 км</li>
                    <li>Крейсерская скорость: около 900 км/ч</li>
                    <li>Три двигателя в хвостовой части</li>
                    <li>Надёжная конструкция</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Эти характеристики делали Ту-154 эффективным для перевозки пассажиров на средние расстояния, что было основным назначением самолёта.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Модификации */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Модификации Ту-154</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  За время производства было создано множество модификаций Ту-154, каждая из которых имела свои особенности и улучшения.
                </p>
                <p className="text-base leading-relaxed">
                  Модификации включали улучшения двигателей, систем, комфорта пассажиров и других аспектов. Это позволяло самолёту оставаться актуальным на протяжении десятилетий.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Применение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Применение Ту-154</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ту-154 использовался на маршрутах по всей стране и за её пределами. Он обслуживал как внутренние, так и международные рейсы, став основным самолётом для среднемагистральных перелётов.
                </p>
                <p className="text-base leading-relaxed">
                  Самолёт работал в различных условиях: от крупных аэропортов до небольших региональных, демонстрируя свою универсальность и надёжность.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Наследие */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Наследие Ту-154</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ту-154 оставил важное наследие в истории авиации. Он стал символом целой эпохи и продемонстрировал возможности советской авиапромышленности.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Хотя производство Ту-154 завершено, многие самолёты продолжают работать, а опыт их эксплуатации используется при разработке новых самолётов.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Вывод:</strong> Ту-154 — это не просто самолёт, а важная часть истории гражданской авиации, которая перевозила миллионы пассажиров и стала символом целой эпохи.
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

export default Ty154;
