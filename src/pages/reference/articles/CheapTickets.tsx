import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, TrendingDown, DollarSign, Gift, AlertCircle, Info } from "lucide-react";

const CheapTickets = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Как купить дешёвые ж/д билеты</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как покупать ж/д билеты выгодно</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed">
                Цены на ж/д билеты зависят от разных факторов — времени до отправления поезда, сезона, тарифов. Собрали лайфхаки, как покупать билеты на поезда дешевле.
              </p>
            </CardContent>
          </Card>

          {/* Содержание */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Содержание:</h2>
              <ul className="space-y-2">
                <li>
                  <Link to="#plan-ahead" className="text-primary hover:underline flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Планируйте поездку заранее
                  </Link>
                </li>
                <li>
                  <Link to="#season" className="text-primary hover:underline flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" />
                    Учитывайте сезонные коэффициенты
                  </Link>
                </li>
                <li>
                  <Link to="#dates" className="text-primary hover:underline flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Сравнивайте цены на разные даты
                  </Link>
                </li>
                <li>
                  <Link to="#discounts" className="text-primary hover:underline flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Используйте скидки перевозчиков
                  </Link>
                </li>
                <li>
                  <Link to="#non-refundable" className="text-primary hover:underline flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Выбирайте невозвратные билеты
                  </Link>
                </li>
                <li>
                  <Link to="#loyalty" className="text-primary hover:underline flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    Пользуйтесь бонусами программы лояльности
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Планируйте заранее */}
          <Card id="plan-ahead">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Планируйте поездку заранее
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Цены на билеты в большинстве поездов «ФПК», дочерней компании «РЖД», регулируются системой динамического ценообразования. Система действует на билеты 
                  в купе, СВ и сидячие вагоны скоростных поездов — «Ласточек» и «Стрижей». Похожий принцип ценообразования работает и в поездах перевозчика «ДОСС» — 
                  «Сапсанах» и «Ласточках». В плацкарте динамическое ценообразование не применяется — здесь стоит учитывать сезонные коэффициенты РЖД.
                </p>
                <p>
                  Суть динамического ценообразования — чем выше спрос и меньше мест осталось в поезде, тем выше стоимость билетов. Это значит, что покупать билеты выгоднее 
                  на старте продаж, пока спрос невысокий и много мест.
                </p>
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <p className="font-semibold mb-2">Продажи билетов открываются в разные сроки:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>за 45, 90 и 120 дней — на поезда по России и в Калининград;</li>
                    <li>за 45 и 60 дней — в Беларусь, Казахстан, Кыргызстан, Узбекистан;</li>
                    <li>за 60 дней — в Монголию;</li>
                    <li>за 90 дней — в Абхазию.</li>
                  </ul>
                </div>
                <p>
                  Чтобы не пропустить начало продаж, закажите на GoTrip бесплатное уведомление. Когда билеты появятся, мы пришлём сообщение на указанную электронную почту.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Сезонные коэффициенты */}
          <Card id="season">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingDown className="w-6 h-6 text-primary" />
                Учитывайте сезонные коэффициенты
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  На стоимость проезда в поездах «ФПК» также влияют сезонные коэффициенты. Они формируются на год вперёд и распространяются на купе, плацкарт, общие вагоны и СВ.
                </p>
                <p>
                  Цены на билеты в течение года понижаются или повышаются согласно сезонному коэффициенту. Например, летом и в периоды праздников цены выше, чем в межсезонье. 
                  Учитывая это, можно выбрать даты поездки в период с понижающим или нулевым коэффициентом и сэкономить на билетах.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Сравнивайте даты */}
          <Card id="dates">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Сравнивайте цены на разные даты</h2>
              <p className="text-base leading-relaxed">
                Если есть возможность, выбирайте билеты на поезда с отправлением в будни или непраздничные дни. Например, поездка в четверг обойдётся дешевле, чем вечером пятницы 
                или в субботу — в эти дни билеты дороже из-за высокого спроса.
              </p>
            </CardContent>
          </Card>

          {/* Скидки */}
          <Card id="discounts">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-primary" />
                Используйте скидки перевозчиков
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Скидки на детские билеты</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Во всех поездах взрослый пассажир может бесплатно провезти одного ребёнка до 5 лет, если тот не занимает отдельного места. При оформлении заказа на GoTrip 
                    добавьте в пассажиры «малыша до 5 лет (без места)».
                  </p>
                  <p className="text-base leading-relaxed mb-3">
                    Билеты с отдельным местом для детей до 10 лет продаются за <strong>35% от цены взрослого билета</strong>. На GoTrip детская скидка применяется автоматически 
                    после указания возраста ребёнка и при переходе к оплате.
                  </p>
                  <p className="text-base leading-relaxed">
                    Для пассажиров от 10 до 17 лет (включительно) плацкартов, общих вагонов, вагонов 2-го и 3-го классов поездов дальнего следования действует круглогодичная скидка 50%. 
                    Предоставлять справку из школы не надо.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                    <p className="text-amber-900">
                      Скидка действует только для граждан России. Возраст пассажира определяется на момент посадки в поезд.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Тарифы Senior и Junior</h3>
                  <p className="text-base leading-relaxed">
                    Для пассажиров от 60 лет и от 10 до 21 года соответственно. По ним можно купить билеты на «Ласточки» и «Сапсаны» со скидкой 30%, на поезд «Мегаполис» — со скидкой 10% 
                    от тарифа перевозчика. Скидка применится автоматически при оформлении заказа, после указания возраста пассажира. Итоговая цена билета отобразится перед оплатой.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Невозвратные билеты */}
          <Card id="non-refundable">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-primary" />
                Выбирайте невозвратные билеты
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  На большинство поездов дальнего следования продаются невозвратные билеты. Они стоят дешевле обычных на <strong>10-20%</strong>. Сдать невозвратный билет получится 
                  только в определённых случаях — например из-за болезни пассажира или отмены поезда.
                </p>
                <p>
                  Покупайте невозвратные билеты, если уверены, что поездка состоится.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900">
                    Если в поезде есть невозвратные билеты, вы увидите их на схеме вагона после выбора тарифа.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Программа лояльности */}
          <Card id="loyalty">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Gift className="w-6 h-6 text-primary" />
                Пользуйтесь бонусами программы лояльности GoTrip
              </h2>
              
              <p className="text-base leading-relaxed">
                За покупку билетов на поезда, самолёты и автобусы на GoTrip начисляются баллы, которые можно обменять на подарочные сертификаты GoTrip или подключение привилегий. 
                Например, есть привилегии, которые дают скидки на ж/д билеты, на услугу «100%-ный возврат ж/д билета» или страховку.
              </p>
              <p className="text-base leading-relaxed mt-4">
                Чтобы получать баллы, зарегистрируйтесь в программе лояльности GoTrip. За регистрацию начислим 50 баллов.
              </p>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/reference/trains/no-tickets" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <Info className="w-4 h-4" />
                    Как заказать уведомление о начале продаж
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA кнопка */}
          <div className="flex justify-center pt-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold">
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

export default CheapTickets;
