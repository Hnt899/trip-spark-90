import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MapPin, Globe, Heart } from "lucide-react";

const Plemenaamazonki = () => {
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
          <Link to="/guide" className="hover:text-primary">Разборы</Link>
          <span>/</span>
          <span>Племена Амазонки</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Племена Амазонки: жизнь и традиции</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Амазонка — это не только самая полноводная река в мире, но и дом для множества уникальных племён, сохранивших свои традиции, культуру и образ жизни в условиях быстро меняющегося мира.
              </p>
              <p className="text-base leading-relaxed">
                Многие из этих племён живут в изоляции от современной цивилизации, сохраняя древние обычаи и знания о природе, которые передаются из поколения в поколение.
              </p>
            </CardContent>
          </Card>

          {/* Яномами */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Яномами (Венесуэла — Бразилия)</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Место проживания</p>
                    <p className="text-sm text-muted-foreground">
                      Предгорья Сьерры-Паримы и верховья реки Ориноко, на границе Венесуэлы и Бразилии
                    </p>
                  </div>
                </div>
                <p className="text-base leading-relaxed">
                  Яномами — одно из крупнейших и наиболее известных изолированных племён Южной Америки. Численность составляет около 35 тысяч человек. Племя известно своими общинными домами шабоно — большими круглыми строениями, в которых живёт вся община.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Особенности культуры:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Охота, собирательство и примитивное земледелие</li>
                    <li>Шаманизм и традиционные верования</li>
                    <li>Уникальная система социальной организации</li>
                    <li>Традиционное искусство и ремёсла</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ашанинка */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Ашанинка (Перу — Бразилия)</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Место проживания</p>
                    <p className="text-sm text-muted-foreground">
                      Тропические леса в бассейне реки Амазонка на территории Перу и Бразилии
                    </p>
                  </div>
                </div>
                <p className="text-base leading-relaxed">
                  Ашанинка — один из многочисленных народов Амазонии, говорящий на аравакских языках. Это племя имеет богатую историю и культуру, связанную с добычей каучука и взаимодействием с внешним миром.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Особенности:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Аравакская языковая семья</li>
                    <li>Традиционное земледелие и охота</li>
                    <li>Знания о лекарственных растениях</li>
                    <li>Культурные традиции и фестивали</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ваорани */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Ваорани (Эквадор)</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Место проживания</p>
                    <p className="text-sm text-muted-foreground">
                      Эквадорская Амазония, в регионе Орьенте
                    </p>
                  </div>
                </div>
                <p className="text-base leading-relaxed">
                  Ваорани — племя, известное своей воинственностью и длительным сопротивлением контактам с внешним миром. До середины XX века это племя практически не контактировало с цивилизацией, защищая свою территорию от вторжений.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Особенности:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Изоляционистская история</li>
                    <li>Мастерство в охоте с копьём</li>
                    <li>Традиции строительства домов на деревьях</li>
                    <li>Сложная социальная структура</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Тикуна */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Тикуна (Колумбия — Перу — Бразилия)</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Место проживания</p>
                    <p className="text-sm text-muted-foreground">
                      Регион тройной границы Колумбии, Перу и Бразилии, вдоль реки Амазонка
                    </p>
                  </div>
                </div>
                <p className="text-base leading-relaxed">
                  Тикуна — один из крупнейших народов Амазонии, насчитывающий около 50 тысяч человек. Это племя имеет уникальный язык, не относящийся ни к одной из известных языковых семей, и богатую культуру.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Особенности:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Изолированный язык тикуна</li>
                    <li>Традиционные маски и ритуальное искусство</li>
                    <li>Рыболовство как основа хозяйства</li>
                    <li>Праздники и церемонии</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Пираха */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Пираха (Бразилия)</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Место проживания</p>
                    <p className="text-sm text-muted-foreground">
                      Вдоль реки Маиси в бразильской Амазонии
                    </p>
                  </div>
                </div>
                <p className="text-base leading-relaxed">
                  Пираха — племя, известное своим уникальным языком и особым мировоззрением. Их язык привлёк внимание лингвистов со всего мира из-за необычных особенностей: отсутствие чисел, цветов и сложных времён.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Особенности:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Уникальная языковая система</li>
                    <li>Особое восприятие времени и пространства</li>
                    <li>Традиционный образ жизни охотников-собирателей</li>
                    <li>Минимальное взаимодействие с внешним миром</li>
                  </ul>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Интересный факт:</strong> Язык пираха стал предметом многочисленных лингвистических исследований из-за своих уникальных характеристик, которые бросают вызов традиционным представлениям о языке.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Сохранение культуры */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Сохранение традиций в современном мире</h2>
              </div>

              <p className="text-base leading-relaxed mb-4">
                Многие племена Амазонии сталкиваются с серьёзными вызовами: вырубка лесов, развитие промышленности, изменение климата и контакты с внешним миром угрожают их традиционному образу жизни.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Однако эти племена продолжают бороться за сохранение своей культуры, языка и территорий, передавая знания следующим поколениям.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> При посещении регионов, где живут коренные племена, необходимо уважать их культуру, традиции и право на самоопределение. Многие территории находятся под защитой, и для их посещения требуется специальное разрешение.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Plemenaamazonki;
