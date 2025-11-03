import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, Info } from "lucide-react";

const TrainCompositionSchemes = () => {
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
          <span>Схемы составов ЖД и расположение вагонов</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Схемы составов ЖД и расположение вагонов</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                В обычном составе поезда дальнего следования <strong>15 вагонов</strong>. В зависимости от сезона и загруженности направления их может быть больше или меньше. 
                Например, летом поезда южного направления комплектуются 20 вагонами. Поезда «Сапсан», которые курсируют между Москвой и Санкт-Петербургом, 
                ходят сдвоенными составами – по 10 штук в каждом.
              </p>
              <p className="text-base leading-relaxed mt-3">
                То, что мы привыкли называть «схемой поезда», у железнодорожников называется «композиция состава». Сколько каких ж/д вагонов будет в поезде, 
                зависит от его категории.
              </p>
            </CardContent>
          </Card>

          {/* Плацкартные вагоны */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                Плацкартные вагоны
              </h2>
              <p className="text-base leading-relaxed">
                Большую часть состава традиционно занимают плацкартные – билеты в них раскупают охотнее всего. Стандартный «плацкарт» поезда способен разместить 54 пассажира. 
                В составе из 15 вагонов минимум половина будут именно плацкартными.
              </p>
            </CardContent>
          </Card>

          {/* Купейные вагоны */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                Купейные вагоны
              </h2>
              <p className="text-base leading-relaxed">
                Купейные же занимают примерно треть состава. В них по 36 мест. Здесь тоже все зависит от направления – в поездах, идущих на дальние расстояния, их больше – 
                как и желающих с комфортом ехать, например, из Москвы в Иркутск. В скорых поездах купейных вагонов больше, чем плацкартных, а в поездах дальнего следования 
                (не скорых) – меньше.
              </p>
            </CardContent>
          </Card>

          {/* СВ */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                Спальные вагоны (СВ)
              </h2>
              <p className="text-base leading-relaxed">
                Билеты в спальные вагоны, или СВ – одни из самых дорогих, поэтому в поезде их обычно не больше одного. В нем 24 места. 
                Если направление не слишком популярное или поезд не фирменный, то СВ может не быть вовсе.
              </p>
            </CardContent>
          </Card>

          {/* Сидячие вагоны */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                Сидячие вагоны
              </h2>
              <p className="text-base leading-relaxed">
                Вагоны с местами для сидения постепенно исчезают из российских поездов, однако в больших составах сидячими будет 1 или 2. 
                Одновременно в них может ехать 81 пассажир (в каждом).
              </p>
            </CardContent>
          </Card>

          {/* Служебные вагоны */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                Служебные вагоны
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Кроме пассажирских вагонов, в составе поезда могут быть также почтовый, багажный и штабной. Ещё одна категория – ресторан.
                </p>
                <p>
                  Располагают вагон-ресторана обычно строго по центру поезда – чтобы все пассажиры могли до него добраться. Меню в железнодорожном ресторане и цены разные 
                  в каждом поезде, они утверждаются заранее. Однако пассажирам нужно быть готовыми к тому, что цены будут отличаться от привычных в несколько раз, 
                  причем в большую сторону.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Современные вагоны */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                Вагоны РЖД
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  В последнее время парк железнодорожных вагонов активно обновляется – старых, отслуживших 25 лет и больше, становится все меньше. 
                  Новые более эргономичны, в них есть розетки, биотуалеты, а покрытие полок мягкое и удобное.
                </p>
                <p>
                  Раньше вагоны РЖД поездов дальнего следования окрашивали в зеленый цвет. Фирменные поезда – «Татарстан», «Чувашия», «Красная стрела» и другие - 
                  имели собственный стиль, можно было встретить и синие, и белые, и красные. С недавних пор все они (за исключением поездов «Ласточка», «Сапсан», 
                  «Аллегро», «Красная стрела» и нескольких других) окрашены в фирменные цвета РЖД – красный и серый.
                </p>
                <p>
                  Схема поезда доступна заранее – вы можете узнать, сколько каких вагонов в составе и каково расположение мест в каждом. К сожалению, узнать заранее, 
                  откуда начинается нумерация – с головы или с хвоста – можно только в редких случая. Например, у «Сапсана», отбывающего в Санкт-Петербург, 
                  нумерация традиционно начинается с головы, а у прибывающего в Москву – с хвоста.
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

export default TrainCompositionSchemes;
