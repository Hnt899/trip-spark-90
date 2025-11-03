import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { UtensilsCrossed, Coffee, DollarSign, Clock, AlertCircle, Info } from "lucide-react";

const EatingOnTrain = () => {
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
          <span>Как поесть в поезде: все способы</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Как поесть в поезде: все способы</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                В поездах организовано несколько типов питания. Пассажиры могут посетить вагон-ресторан или вагон-бистро, купить билет с включенным питанием, 
                заказать доставку еды к вагону или купить перекус у проводника. Рассказываем, как кормят в поезде, как выбрать и заказать питание, 
                сколько стоит еда в вагоне-ресторане и бистро.
              </p>
            </CardContent>
          </Card>

          {/* Вагоны-рестораны */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <UtensilsCrossed className="w-6 h-6 text-primary" />
                Вагоны-рестораны
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  В поездах РЖД насчитывается более <strong>400 вагонов-ресторанов</strong>. Обычно вагон-ресторан находится в середине поезда — точный номер вагона подскажет проводник.
                </p>
                <p>
                  В вагоне-ресторане есть кухня, где повара готовят блюда из свежих продуктов и полуфабрикатов. Еду приносят официанты.
                </p>
                <p>
                  Вагоны-рестораны обслуживаются разными поставщиками, поэтому цены и меню в поездах различаются. Обычно пассажирам предлагают первые и вторые блюда, напитки, десерты, салаты, закуски, снеки, детские и вегетарианские блюда, постное меню. Средний чек — <strong>1000-1500 рублей</strong>.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Примерные цены в меню:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Завтрак — от 325 рублей</li>
                    <li>Салат — от 350 рублей</li>
                    <li>Суп — от 330 рублей</li>
                    <li>Основное блюдо — от 400 рублей</li>
                    <li>Кофе — от 200 рублей</li>
                    <li>Чай — от 90 рублей</li>
                  </ul>
                  <p className="font-semibold mt-3 mb-2">В барном меню доступны алкогольные напитки крепостью до 16,5%:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Пиво 0,4 л — от 300 до 450 рублей</li>
                    <li>Снеки (орешки, чипсы) — от 150 рублей</li>
                  </ul>
                  <div className="bg-amber-50 border border-amber-200 rounded p-3 mt-3">
                    <p className="text-amber-900 text-sm">
                      <AlertCircle className="w-4 h-4 inline mr-2" />
                      Пить алкоголь можно только в ресторане — в других местах за это оштрафуют.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  На смену вагонам-ресторанам приходят вагоны-бистро, а рестораны останутся только в фирменных и туристических поездах.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Вагоны-бистро */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Coffee className="w-6 h-6 text-primary" />
                Вагоны-бистро
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  В отличие от вагонов-ресторанов, в бистро еду не готовят, а поставляют уже готовой, в стерильных контейнерах. Пассажир может поесть за столиком или унести заказ с собой.
                </p>
                <p>
                  Меню в вагонах-бистро единое для всех поездов. Рацион помогали разрабатывать диетологи. Можно заказать супы, салаты, горячие блюда из рыбы и мяса, разные виды десертов и выпечки, горячие напитки, вегетарианские и детские блюда.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Примеры цен из меню:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Завтрак — от 524 ₽</li>
                    <li>Обед — от 735 ₽</li>
                    <li>Ужин — от 630 ₽</li>
                  </ul>
                  <p className="text-sm mt-3">
                    В барной карте большой выбор алкоголя: пиво, вина, виски, водка и коньяк.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Предоплаченное питание */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-primary" />
                Предоплаченное питание
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Предоплаченное питание входит в стоимость билетов некоторых классов обслуживания перевозчиков «ФПК» и «ДОСС».
                </p>
                <p>
                  На GoTrip билеты с питанием обозначаются специальным значком в виде иконки вилки рядом с ложкой. Входит ли питание в стоимость проезда, можно понять по самому билету. 
                  Питание обозначается буквой У: У0 — нет питания, У1 — один приём пищи, У2 — два приёма пищи и так далее.
                </p>
                <p>
                  Питание пассажира зависит от класса обслуживания и дня недели. Рацион в дорогу можно выбрать заранее на сайте РЖД, указав паспортные данные, номер поезда, вагона и места.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Дополнительное питание */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <UtensilsCrossed className="w-6 h-6 text-primary" />
                Дополнительное питание
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Если питание не включено в стоимость билета, пассажир может заказать его отдельно. Услуга доступна пассажирам поездов ФПК и пассажирам «Сапсанов». 
                  Предварительный заказ оформляется не позднее 3 дней до отправления поезда в кассе или на сайте РЖД. Также питание можно заказать в поезде у проводника.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border text-sm mt-4">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-3 text-left">Приём пищи</th>
                        <th className="border border-border p-3 text-left">Люкс</th>
                        <th className="border border-border p-3 text-left">СВ</th>
                        <th className="border border-border p-3 text-left">Купейный</th>
                        <th className="border border-border p-3 text-left">Плацкартный</th>
                        <th className="border border-border p-3 text-left">Сидячий</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="border border-border p-3">Завтрак</td><td className="border border-border p-3">635 ₽</td><td className="border border-border p-3">583 ₽</td><td className="border border-border p-3">421₽</td><td className="border border-border p-3">356 ₽</td><td className="border border-border p-3">325 ₽</td></tr>
                      <tr><td className="border border-border p-3">Обед</td><td className="border border-border p-3">930 ₽</td><td className="border border-border p-3">800 ₽</td><td className="border border-border p-3">633 ₽</td><td className="border border-border p-3">529 ₽</td><td className="border border-border p-3">479 ₽</td></tr>
                      <tr><td className="border border-border p-3">Ужин</td><td className="border border-border p-3">731 ₽</td><td className="border border-border p-3">666 ₽</td><td className="border border-border p-3">505 ₽</td><td className="border border-border p-3">404 ₽</td><td className="border border-border p-3">403 ₽</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Доставка еды */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Доставка еды к поезду
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Если питаться в вагоне-ресторане или бистро не хочется, можно заказать еду в городских кафе или ресторанах на пути следования поезда, и её доставят к вагону. 
                  Услуга доступна пассажирам поездов дальнего следования на ряде станций.
                </p>
                <p>
                  Чтобы заказать еду в поезд, нужно заполнить специальную онлайн-форму на сайте РЖД: ввести фамилию пассажира, номер билета и места в вагоне. 
                  В разделе «Доставка еды» нажать строку «Заказать доставку еды». После выбора станции вы увидите список кафе, если они доступны в этом населённом пункте.
                </p>
                <p>
                  К проекту подключены 109 предприятий в 70 населенных пунктах: Москва, Санкт-Петербург, Ярославль, Новосибирск, Краснодар, Улан-Удэ, Хабаровск и другие города.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Питание в Сапсанах */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <UtensilsCrossed className="w-6 h-6 text-primary" />
                Питание в «Сапсанах»
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Предоплаченное питание входит в стоимость билета в следующих классах: купе-премиум (1Е), купе-переговорная (1Р), первый (1В), бизнес (1С), 
                  купе-сьют (1Ж), эконом-плюс (2В), семейный (2Ю), комфорт (2Я).
                </p>
                <p>
                  Пассажирам доступно стандартное, вегетарианское и детское меню. В экономическом (2С) и базовом (2Р) классе питание не включено в билет. 
                  Пассажиры могут заказать еду за отдельную плату, но не позднее 48 часов до отправления поезда.
                </p>
                <p>
                  В составе «Сапсанов» курсирует вагон-бистро. В нём есть два барных стола и десять приоконных столиков. Билет в вагон-бистро (2Е) включает проезд в этом вагоне и 
                  блюда из меню на сумму 2000 рублей.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Питание в Ласточках */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <UtensilsCrossed className="w-6 h-6 text-primary" />
                Питание в «Ласточках»
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Предоплаченное питание доступно только в бизнес-классе (1С). Пассажир выбирает рацион в поезде или заранее на сайте РЖД, не позднее 48 часов до отправления поезда. 
                  В зависимости от времени поездки предлагают завтрак, ланч, обед и ужин.
                </p>
                <p>
                  Пассажиры остальных классов могут посетить вагон-бистро и купить еду там либо заказать доставку к месту, купить перекус у проводника или заказать еду из кафе с доставкой к вагону.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Питание в Тавриях */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <UtensilsCrossed className="w-6 h-6 text-primary" />
                Питание в «Тавриях»
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Поезда «Таврия» принадлежат частному перевозчику «Гранд Сервис Экспресс», поэтому меню здесь отличается от меню поездов ФПК и ДОСС.
                </p>
                <p>
                  В некоторых вагонах СВ (1Э) и купе (2Э) в стоимость проезда входит горячее питание. Его наличие зависит от участка следования поезда. 
                  При выборе билета на GoTrip вагоны с предоплаченным питанием будут помечены специальным значком.
                </p>
                <p>
                  Помимо этого, в поездах работают вагоны-рестораны с русской и европейской кухней и блюдами от шеф-повара.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Еда у проводников */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Coffee className="w-6 h-6 text-primary" />
                Еда у проводников
              </h2>
              <p className="text-base leading-relaxed">
                Почти во всех поездах проводники продают перекус: выпечку, печенье, чипсы, вермишель быстрого приготовления, мороженое, а также бутилированную воду, кофе и чай. 
                Во всех вагонах есть кулеры и котлы с горячей водой — вода в них бесплатная.
              </p>
              <p className="text-base leading-relaxed mt-3">
                В некоторых вагонах у проводника есть микроволновка и холодильник. Пользоваться ими можно бесплатно.
              </p>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2 text-base">
                <li>
                  <Link to="/reference/trains/restaurant-cars" className="text-primary hover:underline">
                    Поезда с вагонами-ресторанами и бистро
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

export default EatingOnTrain;
