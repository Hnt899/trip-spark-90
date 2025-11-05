import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, IdCard, ShoppingCart, CreditCard, Package, DollarSign, AlertCircle, Users, Baby } from "lucide-react";

const TicketOrderRules = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Правила заказа ж/д билетов</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Правила заказа ж/д билетов</h1>

        <div className="space-y-8">
          {/* Содержание */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Содержание</h2>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li><a href="#general" className="text-primary hover:underline">Общие положения</a></li>
                <li><a href="#documents" className="text-primary hover:underline">Необходимые документы</a></li>
                <li><a href="#process" className="text-primary hover:underline">Процесс заказа ж/д билетов</a></li>
                <li><a href="#payment" className="text-primary hover:underline">Способы оплаты ж/д билетов</a></li>
                <li><a href="#receiving" className="text-primary hover:underline">Получение и доставка ж/д билетов</a></li>
                <li><a href="#cost" className="text-primary hover:underline">Стоимость услуг по заказу ж/д билетов</a></li>
                <li><a href="#limitations" className="text-primary hover:underline">Ограничения при покупке электронных билетов</a></li>
                <li><a href="#refund" className="text-primary hover:underline">Возврат билетов</a></li>
                <li><a href="#children-under-5" className="text-primary hover:underline">Билеты для детей до 5 лет</a></li>
                <li><a href="#children-over-5" className="text-primary hover:underline">Билеты для детей от 5 лет</a></li>
              </ul>
            </CardContent>
          </Card>

          {/* 1. Общие положения */}
          <Card id="general">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                1. Общие положения
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold mb-2">1.1. Сроки начала продажи билетов</h3>
                  <p className="mb-3">За сколько дней начинается продажа билетов зависит от направления:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Продажа ж/д билетов на все поезда по России начинается за <strong>90 и 120 дней</strong> до отправления.</li>
                    <li>На поезда, отправляющиеся в дальнее зарубежье — за <strong>60 дней</strong> до отправления.</li>
                    <li>На поезда по странам СНГ и Прибалтики — за <strong>45 дней</strong>.</li>
                    <li>На Украину и Молдову — за <strong>30 дней</strong>.</li>
                  </ul>
                  <p className="mt-3">
                    По правилам ОАО «РЖД», билет без электронной регистрации на поезд от станции, находящейся за пределами России 
                    (станции стран СНГ, Балтии, Европы и др.) нельзя купить меньше, чем за 24 часа до отправления поезда.
                  </p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900">
                    Мы не продаем билеты на поезда «Крымской железной дороги» и «Железных дорог Якутии». 
                    Эти билеты продаются в кассах на ж/д вокзалах.
                  </p>
                </div>
                <p><strong>1.2.</strong> Получение билетов возможно только до отправления поезда со станции отправления пассажира.</p>
                <p><strong>1.3.</strong> Железнодорожные билеты оформляются только после оплаты или подтверждения заказа оператором.</p>
                <p>
                  <strong>1.4.</strong> Пользователь дает согласие на обработку своих персональных данных, включая такие действия (операции) 
                  с персональными данными, как сбор, систематизация, накопление, хранение, уточнение (обновление, изменение), использование, 
                  распространение (в том числе передача), обезличивание, блокирование, уничтожение персональных данных.
                </p>
                <p>
                  <strong>1.5.</strong> При заказе уведомлений «Есть надежда» и «Хочу» пользователь дает согласие на получение соответствующих 
                  электронных писем и СМС-сообщений от сервиса TudaSuda.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 2. Необходимые документы */}
          <Card id="documents">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <IdCard className="w-6 h-6 text-primary" />
                2. Необходимые документы
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <div>
                  <p className="font-semibold mb-2">2.1. Гражданам России нужен один из перечисленных документов:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>паспорт или временное удостоверение личности,</li>
                    <li>загранпаспорт,</li>
                    <li>паспорт моряка,</li>
                    <li>военный билет.</li>
                  </ul>
                </div>
                <p><strong>2.2.</strong> Иностранным гражданам — паспорт.</p>
                <p>
                  <strong>2.3.</strong> Детям до 14 лет — свидетельство о рождении или нотариально заверенная копия. Если ребёнку уже исполнилось 14 лет, 
                  но паспорт ещё не получен, в течение 90 дней после дня рождения для покупки билета и посадки в поезд можно использовать свидетельство о рождении.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 3. Процесс заказа ж/д билета */}
          <Card id="process">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-primary" />
                3. Процесс заказа ж/д билета
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p><strong>3.1.</strong> Выберите пункты отправления и прибытия, дату поездки.</p>
                <p><strong>3.2.</strong> Выберите поезд.</p>
                <p><strong>3.3.</strong> Выберите тип вагона, укажите количество пассажиров и выберите понравившиеся свободные места.</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900">
                    <strong>Для электронного билета</strong><br />
                    По правилам РЖД, в одном заказе может быть только 4 билета, включая взрослых и детей. Если нужно 5 и больше — оформите несколько заказов.
                  </p>
                </div>
                <p>
                  <strong>3.4.</strong> Укажите данные пассажиров:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>ФИО,</li>
                  <li>тип билета (взрослый, детский),</li>
                  <li>документ, удостоверяющий личность.</li>
                </ul>
                <p>Имя, фамилию и отчество пассажиров необходимо указывать полностью, без ошибок.</p>
                <p>
                  Для иностранных граждан допускается не указывать отчество — вместо него в соответствующее поле ставится прочерк (-).
                </p>
                <p><strong>3.5.</strong> Укажите контактную информацию и подтвердите заказ.</p>
              </div>
            </CardContent>
          </Card>

          {/* 4. Способ оплаты билетов */}
          <Card id="payment">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-primary" />
                4. Способ оплаты билетов
              </h2>
              <p className="text-base leading-relaxed">
                Оплатить электронный билет можно банковской картой систем Visa, MasterCard, Visa Electron, Maestro, МИР.
              </p>
            </CardContent>
          </Card>

          {/* 5. Получение и доставка ж/д билетов */}
          <Card id="receiving">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Package className="w-6 h-6 text-primary" />
                5. Получение и доставка ж/д билетов
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <h3 className="text-xl font-semibold">Получение электронного билета</h3>
                <p><strong>5.1.1.</strong> Оплатите заказ.</p>
                <p><strong>5.1.2.</strong> После оплаты вы получите 14-значный код билета по СМС или по электронной почте.</p>
                <p>
                  <strong>5.1.3.</strong> В кассе на вокзале (на территории России) предъявите 14-значный код билета или распечатанный бланк. 
                  Обязательно предъявите удостоверяющий личность документ, указанный в заказе. При отсутствии указанного документа кассир вправе отказать в выдаче билета.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900">
                    Обратите внимание, что ж/д кассы могут быть закрыты на перерыв. Пожалуйста, узнавайте график работы касс заранее.
                  </p>
                </div>
                <p>
                  Также получить билеты можно в терминалах самообслуживания. Вам понадобится ввести номер заказа и паспортные данные.
                </p>
                <p>
                  <strong>5.1.4.</strong> Если в заказе больше одного билета, достаточно предъявить один 14-значный код и удостоверяющий личность документ из всех, указанных в заказе.
                </p>
                <p><strong>5.1.5.</strong> Получите билет.</p>
                <p><strong>5.1.6.</strong> Доставка электронных билетов не осуществляется.</p>
              </div>
            </CardContent>
          </Card>

          {/* 6. Стоимость услуг по заказу ж/д билетов */}
          <Card id="cost">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-primary" />
                6. Стоимость услуг по заказу ж/д билетов
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <h3 className="text-xl font-semibold">Электронный билет</h3>
                <p>
                  <strong>6.1.1.</strong> Размер сервисного сбора зависит от стоимости билета. Окончательная сумма сервисного сбора указывается при оформлении заказа до перехода к шагу оплаты.
                </p>
                <p><strong>6.1.2.</strong> Сервисный сбор за детские билеты «без места» не взимается.</p>
              </div>
            </CardContent>
          </Card>

          {/* 7. Ограничения при покупке электронных билетов */}
          <Card id="limitations">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-primary" />
                7. Ограничения при покупке электронных билетов
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  <strong>7.1.</strong> На TudaSuda льготные билеты продаются только для детей. Льготные билеты для инвалидов, пенсионеров, ветеранов можно оформить только в кассе.
                </p>
                <p><strong>7.2.</strong> Через интернет нельзя купить билеты для организованных групп (больше 4 пассажиров).</p>
                <p><strong>7.3.</strong> Также нельзя переоформить электронный билет. Его можно только сдать и оформить другой.</p>
                <div>
                  <p className="font-semibold mb-2"><strong>7.4</strong> При пройденной электронной регистрации невозможно:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>возобновить срок действия электронного билета в случае опоздания пассажира на поезд (кроме поездов внутрироссийского сообщения);</li>
                    <li>возобновить срок действия электронного билета в случае прерывания пассажиром поездки в пути следования (отказ от поездки или остановка в пути следования).</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 8. Возврат билетов */}
          <Card id="refund">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Package className="w-6 h-6 text-primary" />
                8. Возврат билетов
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <h3 className="text-xl font-semibold">Возврат электронного билета</h3>
                <p className="mb-3">
                  Купленный на TudaSuda электронный билет можно сдать в личном кабинете на нашем сайте или в железнодорожной кассе. 
                  Если вы оплатили электронный ж/д билет банковской картой, деньги вернут на ту же карту. В остальных случаях деньги выдаются наличными в кассе в момент возврата.
                </p>
                <p><strong>8.1.1.</strong> Возврат электронного билета онлайн возможен, только если заказ был оплачен банковской картой. Чтобы сдать электронный билет онлайн, зайдите в «Личный кабинет» и нажмите на «Оформить возврат».</p>
                <p>
                  <strong>8.1.2.</strong> Для возврата электронного билета в кассе на вокзале необходимо по полученному 14-значному коду получить билет на бланке ОАО «РЖД». 
                  После этого возврат осуществляется в соответствии с общими правилами возврата проездных документов (в кассах возврата РЖД).
                </p>
                <p>
                  <strong>8.1.3.</strong> При оплате электронного ж/д билета банковской картой деньги возвращаются на карту пассажира. Сроки возврата — до 30 календарных дней с момента оформления заявки на возврат. 
                  Заявка на возврат оформляется в кассах возврата на вокзале при предъявлении:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>билета на бланке,</li>
                  <li>удостоверяющего личность документа (номер которого указан в билете).</li>
                </ul>
                <p><strong>8.1.4.</strong> При возврате билетов комиссионные и сервисные сборы не возвращаются.</p>
                <p className="mt-4">
                  <Link to="/reference/trains/return-ticket" className="text-primary hover:underline">
                    Подробнее про возврат электронного билета
                  </Link>
                </p>
                
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-3">Особые случаи возврата билетов</h3>
                  <p>
                    <strong>8.2.</strong> При отсутствии у пассажира действующей банковской карты или при обращении в кассу ОАО «РЖД», не оборудованную интегрированным платежным терминалом системы «Экспресс», 
                    или при обращении в кассу принадлежности к государствам СНГ, Латвийской Республики, Литовской Республики, Эстонской Республики, производится возврат мест без возврата денежных средств.
                  </p>
                  <p className="mt-3">Возврат денег в этом случае производится:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      на действующую банковскую карту пассажира до отправления поезда и в течение 6 месяцев с момента отправления поезда в любой кассе ОАО «РЖД», 
                      оборудованной интегрированным платежным терминалом системы «Экспресс», при предъявлении бланка возврата мест, билета на бланке ОАО «РЖД», 
                      удостоверяющего личность документа (номер которого указан в билете);
                    </li>
                    <li>
                      на банковский счет пассажира по заявлению пассажира с указанием реквизитов банка и номера счета для перечисления причитающейся суммы. 
                      Адреса подразделений ОАО «РЖД», рассматривающих заявления, указаны в пунктах продажи ОАО «РЖД».
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 9. Билеты для детей до 5 лет */}
          <Card id="children-under-5">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Baby className="w-6 h-6 text-primary" />
                9. Билеты для детей до 5 лет
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p><strong>9.1.</strong> Возраст ребенка определяется на момент отправления поезда.</p>
                <p>
                  <strong>9.2.</strong> Пассажир имеет право бесплатно провезти одного ребенка в возрасте до 5 лет без занятия отдельного места, 
                  но с оформлением специального бесплатного билета.
                </p>
                <div className="mt-4">
                  <h3 className="text-xl font-semibold mb-2">При покупке электронного билета</h3>
                  <p>
                    <strong>9.2.1.</strong> Билет на ребенка до 5 лет можно оформить при покупке электронного билета. После покупки вы можете пройти электронную регистрацию 
                    или получить билет на бланке в терминалах или кассах на вокзале.
                  </p>
                  <p className="mt-3">
                    Для получения детского билета на бланке в вокзальной кассе вам понадобится свидетельство о рождении ребенка.
                  </p>
                  <p className="mt-3">
                    Также оригинал свидетельства о рождении понадобится при посадке в поезд.
                  </p>
                  <p className="mt-3">
                    <strong>9.2.2.</strong> В одном заказе электронных билетов не может быть больше 4 пассажиров, включая взрослых и детей.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 10. Билеты для детей от 5 лет */}
          <Card id="children-over-5">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                10. Билеты для детей от 5 лет
              </h2>
              <p className="text-base leading-relaxed">
                <strong>10.1.</strong> Детям от 5 до 10 лет необходимо приобретать детский билет.
              </p>
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

export default TicketOrderRules;
