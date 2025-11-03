import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Baby, Users, Info, AlertCircle, Train as TrainIcon } from "lucide-react";

const ChildrenBenefits = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Льготы для детей в поездах</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Льготы для детей в поездах</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                В России работают несколько железнодорожных перевозчиков. Рассказываем о действующих у них скидках, 
                чтобы вы могли сэкономить на путешествиях с ребёнком внутри страны и за рубеж.
              </p>
              <p className="text-base leading-relaxed mt-3">
                Проверить, к какому перевозчику относится тот или иной поезд, вы можете на странице выбора вагона, рядом с его номером.
              </p>
            </CardContent>
          </Card>

          {/* Содержание */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Содержание</h2>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li><a href="#fpk" className="text-primary hover:underline">Льготы в поездах ФПК</a></li>
                <li><a href="#doss" className="text-primary hover:underline">Льготы в поездах ДОСС</a></li>
                <li><a href="#grand" className="text-primary hover:underline">Льготы в поездах «Гранд Сервис Экспресс»</a></li>
                <li><a href="#megapolis" className="text-primary hover:underline">Льготы в поездах «Мегаполис»</a></li>
                <li><a href="#abroad" className="text-primary hover:underline">Льготы в поездах за рубеж</a></li>
              </ul>
            </CardContent>
          </Card>

          {/* Льготы в поездах ФПК */}
          <Card id="fpk">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TrainIcon className="w-6 h-6 text-primary" />
                Льготы в поездах ФПК
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  АО «ФПК» — дочерняя структура РЖД, ей принадлежит большинство пассажирских перевозок в поездах дальнего следования.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Baby className="w-5 h-5" />
                    Дети до 5 лет
                  </h3>
                  <p className="text-blue-900">
                    Дети до 5 лет едут бесплатно, если не занимают отдельное место. Однако бесплатный билет всё равно нужно оформить. 
                    Это можно сделать при покупке взрослого билета, добавив в заказ малыша до 5 лет без места, или в кассе перед отправлением поезда.
                  </p>
                  <p className="text-blue-900 mt-2">
                    Бесплатный билет без места доступен детям с любым гражданством. Чтобы оформить билет и сесть в поезд, понадобится свидетельство о рождении.
                  </p>
                  <p className="text-blue-900 mt-2">
                    Если малышу нужно отдельное место, укажите его как ребёнка старше 5 лет. Цена билета автоматически пересчитывается по тарифу для детей от 5 до 10 лет.
                  </p>
                  <p className="text-blue-900 mt-3 font-semibold">
                    Билет без места оформляйте в одном заказе со взрослым билетом
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Дети от 5 до 10 лет
                  </h3>
                  <p className="text-green-900">
                    Для детей от 5 до 10 лет ж/д билеты стоят <strong>35–70%</strong> от стоимости взрослых билетов. 
                    Размер скидки зависит от категории поезда, типа вагона, класса обслуживания и маршрута. На GoTrip скидка применится автоматически, 
                    когда укажете возраст ребёнка. Чтобы сесть в поезд, ребёнку нужно свидетельство о рождении.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                    <p className="text-amber-900">
                      Скидка распространяется только на граждан РФ. Если у ребёнка иностранное гражданство, билет придётся купить по полному тарифу.
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Пассажиры от 10 до 17 лет
                  </h3>
                  <p className="text-purple-900">
                    Для пассажиров от 10 до 17 лет включительно действует круглогодичная скидка. Билеты в плацкарты, общие вагоны и вагоны 2-го или 3-го классов 
                    поездов дальнего следования можно купить за <strong>50% от цены взрослого билета</strong>, а в купе двухэтажных поездов — за 50% от цены взрослого билета в плацкартном вагоне.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                    <p className="text-amber-900">
                      Скидка действует только для граждан России. Для оформления билета и посадки не нужна справка из школы.
                    </p>
                  </div>
                  <p className="text-purple-900 mt-3">
                    Возраст пассажира определяется на момент посадки в поезд. Если вы купили билет по свидетельству о рождении, и ребёнок успел получить паспорт до отправления поезда, билет придётся переоформить.
                  </p>
                  <p className="text-purple-900 mt-2">
                    <Link to="/reference/trains/reissue-ticket" className="text-primary hover:underline">
                      Как переоформить ж/д билет
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Льготы в поездах ДОСС */}
          <Card id="doss">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TrainIcon className="w-6 h-6 text-primary" />
                Льготы в поездах ДОСС
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  ДОСС — дочерняя компания РЖД. Занимается скорыми, скоростными и высокоскоростными поездами и отвечает за маршруты «Сапсанов» и некоторых маршрутов «Ласточек».
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Baby className="w-5 h-5" />
                    Дети до 5 лет
                  </h3>
                  <p className="text-blue-900">
                    Малыши до 5 лет едут в «Сапсанах» и «Ласточках» перевозчика «ДОСС» бесплатно, если не занимают отдельное место. 
                    Бесплатный билет без места можно оформить на GoTrip вместе со взрослым билетом. Распространяется на детей с любым гражданством.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Дети до 10 лет
                  </h3>
                  <p className="text-green-900">
                    Детям до 10 лет билеты на скоростные поезда продаются со скидкой до <strong>70%</strong>. Она доступна только гражданам России.
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Пассажиры от 10 до 21 года
                  </h3>
                  <p className="text-purple-900">
                    Для пассажиров от 10 до 21 года, включая день 21-летия, есть скидка <strong>30%</strong>, которая действует во всех классах, кроме 1Р, 1В, 1П и 1Е. 
                    Льготы доступны гражданам РФ и иностранцам с ВНЖ.
                  </p>
                  <p className="text-purple-900 mt-2">
                    Возраст пассажира определяется на момент отправления поезда. На GoTrip скидка применяется автоматически, если возраст подходит под спецтариф. 
                    Льготы не применяются вместе с другими скидками и акциями.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Льготы в поездах «Гранд Сервис Экспресс» */}
          <Card id="grand">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TrainIcon className="w-6 h-6 text-primary" />
                Льготы в поездах «Гранд Сервис Экспресс»
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  «Гранд Сервис Экспресс»— первый частный железнодорожный перевозчик. Их поезда «Гранд Экспресс» и «Таврия» курсируют между Москвой, Санкт-Петербургом и Крымом.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Baby className="w-5 h-5" />
                    Дети до 5 лет
                  </h3>
                  <p className="text-blue-900">
                    Малыши до 5 лет в купе, СВ и плацкартах, а также дети до 10 лет в люксах едут бесплатно, если не занимают отдельное место. 
                    Для ребёнка нужно получить бесплатный билет. Сделать это можно во время оформления заказа онлайн или в кассе перед поездкой. 
                    Для посадки нужно свидетельство о рождении. Действует для пассажиров с любым гражданством.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Дети до 10 лет
                  </h3>
                  <p className="text-green-900">
                    Для детей до 10 лет можно купить билет с местом, который стоит около <strong>35% от взрослого билета</strong>. 
                    Скидка распространяется только на граждан РФ. Она рассчитается автоматически, когда укажете возраст и гражданство пассажира. 
                    Для посадки в вагон не забудьте взять свидетельство о рождении.
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Пассажиры от 10 до 17 лет
                  </h3>
                  <p className="text-purple-900">
                    Для пассажиров от 10 до 17 лет включительно действует круглогодичная скидка. Билеты в плацкарты, общие вагоны, вагоны 2-го и 3-го классов 
                    поездов дальнего следования можно купить со скидкой <strong>50% от стоимости взрослого билета в плацкартном вагоне</strong>.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                    <p className="text-amber-900">
                      Скидка действует только для граждан России. Предоставлять справку из школы не надо. Если вы купили билет по «Школьному тарифу», 
                      то при посадке на поезд будут действовать старые правила — понадобится справка из школы. В этом случае гражданство ребенка не имеет значения.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Льготы в поездах «Мегаполис» */}
          <Card id="megapolis">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TrainIcon className="w-6 h-6 text-primary" />
                Льготы в поездах «Мегаполис»
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Поезд «Мегаполис» перевозчика «Тверской Экспресс» ходит между Москвой и Санкт-Петербургом.
                </p>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Дети 10-14 лет
                  </h3>
                  <p className="text-purple-900">
                    Для детей 10-14 включительно действует скидка <strong>10%</strong> на билеты в купе. В 2025 году билеты со скидкой продаются с 9 января по 25 апреля и с 15 сентября по 25 декабря.
                  </p>
                  <p className="text-purple-900 mt-2">
                    На GoTrip скидка применяется автоматически, когда укажете возраст пассажира. Скидка не суммируется с другими льготами и тарифами.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Льготы в поездах за рубеж */}
          <Card id="abroad">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TrainIcon className="w-6 h-6 text-primary" />
                Льготы в поездах за рубеж
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  В страны СНГ и в Абхазию ребёнка до 5 лет без места можно провезти бесплатно, а ребёнка от 5 до 10 лет — со скидкой до <strong>65%</strong>. 
                  Размер скидки зависит от маршрута и страны.
                </p>
                <p>
                  В поездах в Китай и Монголию ребёнок до 4 лет едет бесплатно, если не занимает отдельное место. Для детей от 4 до 12 лет скидка на билет в эти страны около <strong>50%</strong>.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900">
                    На зарубежных направлениях скидка действует только на проезд по российской части. Скидка по детскому тарифу применится к плацкарте для граждан СНГ, 
                    если это поезд иностранного перевозчика.
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

export default ChildrenBenefits;
