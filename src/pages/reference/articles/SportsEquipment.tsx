import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Snowflake, Waves, Bike, Target, Info } from "lucide-react";

const SportsEquipment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Как провезти в поезде спортивный или туристический инвентарь</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как провезти в поезде спортивный или туристический инвентарь</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed mb-4">
                В поездах перевозчиков АО «ФПК» (дочерняя компания РЖД), «ДОСС» (скоростные поезда), «Гранд Сервис Экспресс» (поезда «Таврия» и «Гранд Экспресс») 
                и «Тверской экспресс» (поезд «Мегаполис») можно путешествовать со спортивным или туристическим инвентарём.
              </p>
              <p className="text-base leading-relaxed">
                В поездах действуют единые требования к габаритам, весу и размещению снаряжения:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Инвентарь больше 180 см по сумме трёх измерений разрешено перевозить в вагоне с собой, если вес не превышает норму ручной клади: 
                    36 кг для купейных вагонов и 50 кг для СВ.</li>
                <li>Перевозить снаряжение нужно на полках или на сиденье вместе с владельцем.</li>
                <li>Багаж не должен мешать другим пассажирам, пачкать вещи и портить салон.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Особенности перевозки */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                Особенности перевозки и стоимость
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Инвентарь можно провезти <strong>бесплатно</strong>, если объём сумок и инструментов не превышает допустимые для ручной клади габариты в 180 см 
                  по сумме трёх измерений. Если размеры больше нормы, пассажир оплачивает перевозку снаряжения отдельно.
                </p>
                <p>
                  Пассажир также может сдать тяжёлый инвентарь в багажный вагон, если он есть в составе поезда. Туда же попросят сдать и излишнюю ручную кладь, 
                  вес которой превышает допустимую норму на 14 кг.
                </p>
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <p className="font-semibold mb-2">По правилам перевозчиков:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>на человека оформляют максимум три багажных места;</li>
                    <li>на одно место принимают инвентарь с габаритами до 180 см по сумме трёх измерений и весом до 75 кг;</li>
                    <li>суммарный вес для трёх мест не должен превышать 200 кг.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Лыжи и сноуборды */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Snowflake className="w-6 h-6 text-primary" />
                Сноуборды, лыжи и палки к ним
              </h2>
              <p className="text-base leading-relaxed">
                По правилам АО «ФПК», «ДОСС», «Гранд Сервис Экспресса» и «Тверского экспресса» пассажиры могут <strong>бесплатно</strong> провозить горнолыжный инвентарь 
                из расчёта один человек — одна пара лыж и палок.
              </p>
            </CardContent>
          </Card>

          {/* Байдарки */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Waves className="w-6 h-6 text-primary" />
                Байдарки и каяки вместе с вёслами
              </h2>
              <p className="text-base leading-relaxed mb-4">
                Провозить можно разборные байдарки и неразборные каяки. В поездах АО «ФПК», «ДОСС», «Гранд Сервис Экспресса» и «Тверского экспресса» стоимость провоза 
                каждой лодки рассчитают по тарифу багажа весом в 30 кг.
              </p>
            </CardContent>
          </Card>

          {/* Велосипеды */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Bike className="w-6 h-6 text-primary" />
                Велосипеды
              </h2>
              <p className="text-base leading-relaxed">
                В вагонах АО «ФПК», «ДОСС», «Гранд Сервис Экспресса» и «Тверского экспресса» пассажиры могут перевозить безмоторные или электрические модели велосипедов, 
                самокатов и гироскутеров в разобранном и упакованном виде. Стоимость перевозки рассчитают по тарифу багажа весом в 30 кг.
              </p>
            </CardContent>
          </Card>

          {/* Спортивные шесты */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-primary" />
                Спортивные шесты
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Спортивные шесты принимают для перевозки только в купейных и в спальных двухместных вагонах. Сдать шесты в багажное отделение нельзя.
                </p>
                <p>
                  Заносить шесты в вагон на станции отправления или во время стоянки продолжительностью не меньше 5 минут. Шесты передают с высокой платформы через окно 
                  и укладывают плотной связкой вдоль коридора вагона. На конечной станции можно забрать инвентарь после того, как все пассажиры выйдут.
                </p>
                <p>
                  Стоимость перевозки спортивных шестов в поездах АО «ФПК» и «Гранд Сервис Экспресса» рассчитают по тарифу багажа весом в 30 кг. В «Тверском экспрессе» 
                  стоимость провоза шестов нужно уточнять у начальника поезда перед посадкой.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Оружие */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Охотничье и спортивное оружие
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  К перевозке принимается сложенное в кобуру или в специальный футляр разряженное оружие. Если перевозите патроны, упакуйте их отдельно.
                </p>
                <p>
                  В поездах АО «ФПК», «ДОСС» и «Гранд Сервис Экспресса» стоимость перевозки рассчитают за каждую единицу оружия по тарифу багажа весом в 30 кг. 
                  Стоимость перевозки в поезде «Мегаполис» («Тверской экспресс») уточняйте у начальника поезда.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA кнопка */}
          <div className="flex justify-center pt-4">
            <Button asChild size="lg" className="px-8 py-6 text-lg font-semibold">
              <Link to="/routes/list">
                Перейти к покупке ж/д билетов
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SportsEquipment;
