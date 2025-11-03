import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { createSlug } from "@/utils/slugify";

const Guide = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-6xl">
        {/* Заголовок */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Путеводитель GoTrip</h1>
        <p className="text-lg text-muted-foreground">
            Обзоры городов и стран, достопримечательности, советы, неожиданные ответы на вопросы пассажиров и бобры. Они добры.
          </p>
        </div>

        {/* Самое важное сейчас */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Самое важное сейчас</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/guide/important/${createSlug("Открытие границ")}`}
              className="px-4 py-2 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors"
            >
              Открытие границ
            </Link>
            <Link
              to={`/guide/important/${createSlug("Шенген-25")}`}
              className="px-4 py-2 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors"
            >
              Шенген-25
            </Link>
          </div>
        </section>

        {/* Путешествия */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Путешествия</h2>
          <p className="text-muted-foreground mb-6">
            Рассказываем всё, что известно про «неизвестного науке зверя»
          </p>
          
          {/* Полезно пассажиру */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Полезно пассажиру</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Что делать, если я заболел в дороге?",
                  "Что делать, если украли документы?",
                  "По какому документу брать билет?",
                  "Где искать потерянные вещи?",
                  "Как работает страховка в билете?",
                  "Как получить медицинскую помощь?",
                  "Ручная кладь больше нормы?",
                  "Какие бывают возвраты билетов?",
                  "Как сесть на промежуточной станции?",
                  "Где покупать билет на электричку?",
                  "Почему возврат денег делают 30 дней?",
                  "Где мой возврат?",
                  "Что делать, если укусила змея?",
                  "Что делать, если укусил клещ?",
                  "Что делать, если мой багаж повредили?",
                  "Советы параноикам перед поездкой",
                  "Какие услуги входят в ж/д билет?",
                  "Когда покупать билеты на поезда?",
                  "Что делать, если потерял свой билет?",
                  "Сколько ошибок может быть в билете?",
                  "Билет без электронной регистрации?",
                  "Надо ли покупать обратный билет?",
                  "Пересадка или стыковка?",
                  "Как перевезти букет?",
                  "Как перевезти банки с закатками?",
                  "Как проверяют билеты на автобус?",
                  "Если попал в ДТП в автобусе?",
                  "Можно ли провезти 18 литров пива?",
                  "Можно ли пить в транспорте?",
                  "Что делать, если автобус не приехал?",
                  "«Серые» и «белые» перевозчики?",
                  "Как кормят в самолёте?",
                  "Как покупать eSIM перед поездкой?",
                  "Нужно ли прививаться перед поездкой?",
                  "Смена фамилии, как купить билет?",
                  "Возить ли паспорт РФ за границу?",
                  "Как летать с маленьким ребёнком?",
                  "Как перевезти животное?",
                  "Как работают гостиницы для животных?",
                  "Что делать, если опоздали на самолет?",
                  "Что делать, если авиарейс задержали?",
                  "Путешествовать на инвалидном кресле?",
                  "Как путешествуют слепые?",
                  "Что надо знать про безопасность?",
                  "Зачем открывать шторку иллюминатора?",
                  "Где посадка, если пассажиру плохо?",
                  "Как поехать в страну без турпакетов?"
                ].map((title, idx) => (
                  <Link
                    key={idx}
                    to={`/guide/passenger/${createSlug(title)}`}
                    className="px-4 py-2 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Разборы */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Разборы</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Вирус и антибиотики",
                  "FAQ про здоровье",
                  "Племена Амазонки",
                  "Какое море выбрать",
                  "Полётов больше, авиапроисшествий — нет",
                  "Метеорология и полёты",
                  "Медицинская страховка",
                  "Авторские туры",
                  "Почему мы путешествуем",
                  "Как дойти до Северного полюса",
                  "Поездки людей с ограничениями по здоровью"
                ].map((title, idx) => (
                  <Link
                    key={idx}
                    to={`/guide/analysis/${createSlug(title)}`}
                    className="px-4 py-2 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Полезно про туризм */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Полезно про туризм</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Как быть хорошим экскурсоводом",
                  "Барьеры для путешествий по России",
                  "Путевые заметки иностранцев",
                  "Занимательная топонимика",
                  "Про музеи быта",
                  "Экскурсия по собакам",
                  "Отдых в Танзании",
                  "Почему любят и ненавидят Марокко",
                  "Лыжи",
                  "Про сувениры и наказание",
                  "Российские литераторы о путешествиях",
                  "Виза за возраст",
                  "Пересадка в радость",
                  "Самые недооценённые регионы России",
                  "Безвизовые страны для россиян"
                ].map((title, idx) => (
                  <Link
                    key={idx}
                    to={`/guide/tourism/${createSlug(title)}`}
                    className="px-4 py-2 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Транспорт */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Транспорт</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Питание вагона",
                  "ЭП2ДМ",
                  "Новые плацкарты 1-ВМ",
                  "Новые плацкарты Т",
                  "Капсульный вагон",
                  "Плацкарт-ёлочка",
                  "Разные электрички",
                  "Как были устроены паровозы",
                  "Ретропоезд с паровозом",
                  "Ласточки",
                  "Штабной вагон",
                  "В кабине машиниста",
                  "Яхрома ЭР2К-980",
                  "Маршрутизация на ЖД",
                  "Вагон-электростанция",
                  "Локомотивы",
                  "Л и П - паровозы прошлого",
                  "Аэроэкспресс",
                  "MC-21",
                  "Собаки в аэропорту",
                  "Аэропорт Внуково",
                  "Экипаж перед вылетом",
                  "Как работает диспетчер",
                  "По каким правилам летит самолёт",
                  "Про центры управления",
                  "Про службы терминала",
                  "Медслужба аэропорта",
                  "Ty-214",
                  "Автоматизация HEL",
                  "Зачем обливают самолёт перед вылетом?",
                  "Как посадить самолёт?",
                  "Ty-144",
                  "Навигация самолёта",
                  "Ty-154",
                  "Boeing 747",
                  "Ан-2",
                  "SJ-100",
                  "Boeing 737 NG",
                  "Airbus A320",
                  "Европейская автобусная компания",
                  "Про городской транспорт",
                  "Про водителей автобусов",
                  "Отечественные микроавтобусы",
                  "Ездовые собаки"
                ].map((title, idx) => (
                  <Link
                    key={idx}
                    to={`/guide/transport/${createSlug(title)}`}
                    className="px-4 py-2 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Надолго в другую страну */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Надолго в другую страну</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Аргентина",
                  "Армения",
                  "Бали",
                  "Бразилия",
                  "Грузия",
                  "Германия",
                  "Дубай",
                  "Египет",
                  "Испания",
                  "Казахстан",
                  "Кыргызстан (Киргизия)",
                  "Колумбия",
                  "Коста-Рика",
                  "Мексика",
                  "Португалия",
                  "Сербия",
                  "Таиланд",
                  "Тайвань",
                  "Турция",
                  "Узбекистан",
                  "Франция",
                  "Черногория",
                  "Шри-Ланка",
                  "Южная Корея"
                ].map((title, idx) => (
                  <Link
                    key={idx}
                    to={`/guide/long-term/${createSlug(title)}`}
                    className="px-4 py-2 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Первый раз */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Первый раз</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Планеры",
                  "Гастротуризм в России",
                  "Гастротуры",
                  "Как взойти на Эверест",
                  "На мотоцикле",
                  "Как встать на горные лыжи",
                  "Как начать бегать",
                  "Как пойти пешком в горы",
                  "Как впервые встать на сап"
                ].map((title, idx) => (
                  <Link
                    key={idx}
                    to={`/guide/first-time/${createSlug(title)}`}
                    className="px-4 py-2 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Фишки России */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Фишки России</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Чебурашка",
                  "Ёлка",
                  "Квашеная капуста",
                  "Дальнобойщики по зимникам",
                  "Масленица",
                  "Завод кабеля",
                  "Интересные места",
                  "Космос как конструкция",
                  "Где, когда, что распускается",
                  "Это что за борщевик",
                  "Как читать наличники",
                  "Баня",
                  "Круги воды",
                  "Что такое советская кухня",
                  "Про коммунальные квартиры",
                  "Про ВХУТЕМАС",
                  "Про матрёшку",
                  "Про дачи",
                  "Про медведей",
                  "Про балалайку",
                  "Здравствуй, дерево!",
                  "Про панельки",
                  "Про Третьяковскую галерею",
                  "Баргузин",
                  "Про центральное отопление"
                ].map((title, idx) => (
                  <Link
                    key={idx}
                    to={`/guide/russia-features/${createSlug(title)}`}
                    className="px-4 py-2 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Россия */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Россия</h2>
          <p className="text-muted-foreground mb-6">
            Города, достопримечательности, кухня, быт и ещё много интересного
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Москва */}
            <div>
              <h3 className="text-xl font-bold mb-3">Москва</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Москва")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Москва
                </Link>
                <Link to={`/guide/russia/${createSlug("Московская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Московская область
                </Link>
                <Link to={`/guide/russia/${createSlug("Про пастилу в Коломне")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Про пастилу в Коломне
                </Link>
                <Link to={`/guide/russia/${createSlug("Производство в Жостово")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Производство в Жостово
                </Link>
                <Link to={`/guide/russia/${createSlug("Москва по вертикали")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Москва по вертикали
                </Link>
                <Link to={`/guide/russia/${createSlug("Про Коломну")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center gap-1">
                  <span>▶</span> Про Коломну
                </Link>
                <Link to={`/guide/russia/${createSlug("«Диснейленды» в Москве")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  «Диснейленды» в Москве
                </Link>
                <Link to={`/guide/russia/${createSlug("Про юрты и чумы в Москве")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Про юрты и чумы в Москве
                </Link>
                <Link to={`/guide/russia/${createSlug("Как делают коврижки в Зарайске")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Как делают коврижки в Зарайске
                </Link>
              </div>
            </div>

            {/* Санкт-Петербург */}
            <div>
              <h3 className="text-xl font-bold mb-3">Санкт-Петербург</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Санкт-Петербург")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Санкт-Петербург
                </Link>
                <Link to={`/guide/russia/${createSlug("Ленинградская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Ленинградская область
                </Link>
                <Link to={`/guide/russia/${createSlug("Библиотека Аалто в Выборге")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Библиотека Аалто в Выборге
                </Link>
                <Link to={`/guide/russia/${createSlug("Другой взгляд на привычные места")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Другой взгляд на привычные места
                </Link>
                <Link to={`/guide/russia/${createSlug("Дешёвые билеты в Петербург")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Дешёвые билеты в Петербург
                </Link>
                <Link to={`/guide/russia/${createSlug("Про Выборг")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center gap-1">
                  <span>▶</span> Про Выборг
                </Link>
                <Link to={`/guide/russia/${createSlug("Как точно выкопать себе трилобита")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Как точно выкопать себе трилобита
                </Link>
                <Link to={`/guide/russia/${createSlug("Про кафе в оранжереях")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Про кафе в оранжереях
                </Link>
                <Link to={`/guide/russia/${createSlug("Рутуб: Про Выборг")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Рутуб: Про Выборг
                </Link>
              </div>
            </div>

            {/* Крым */}
            <div>
              <h3 className="text-xl font-bold mb-3">Крым</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Крым")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Крым
                </Link>
                <Link to={`/guide/russia/${createSlug("Симферополь")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Симферополь
                </Link>
                <Link to={`/guide/russia/${createSlug("Севастополь")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Севастополь
                </Link>
                <Link to={`/guide/russia/${createSlug("Как попасть в «Артек»")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Как попасть в «Артек»
                </Link>
              </div>
            </div>

            {/* Адыгея */}
            <div>
              <h3 className="text-xl font-bold mb-3">Адыгея</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Майкоп")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Майкоп
                </Link>
                <Link to={`/guide/russia/${createSlug("Республика Адыгея")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Республика Адыгея
                </Link>
              </div>
            </div>

            {/* Татарстан */}
            <div>
              <h3 className="text-xl font-bold mb-3">Татарстан</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Казань")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Казань
                </Link>
                <Link to={`/guide/russia/${createSlug("Республика Татарстан")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Республика Татарстан
                </Link>
                <Link to={`/guide/russia/${createSlug("Как делают валенки")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Как делают валенки
                </Link>
                <Link to={`/guide/russia/${createSlug("С детьми — в Казань")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  С детьми — в Казань
                </Link>
                <Link to={`/guide/russia/${createSlug("Про Казань")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center gap-1">
                  <span>▶</span> Про Казань
                </Link>
                <Link to={`/guide/russia/${createSlug("Рутуб: Про Казань")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Рутуб: Про Казань
                </Link>
                <Link to={`/guide/russia/${createSlug("Про татарскую кухню")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Про татарскую кухню
                </Link>
                <Link to={`/guide/russia/${createSlug("Про мясо")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Про мясо
                </Link>
              </div>
            </div>

            {/* Свердловская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Свердловская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Екатеринбург")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Екатеринбург
                </Link>
                <Link to={`/guide/russia/${createSlug("Свердловская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Свердловская область
                </Link>
                <Link to={`/guide/russia/${createSlug("Сысерть: как делают фарфоровые чашки")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Сысерть: как делают фарфоровые чашки
                </Link>
                <Link to={`/guide/russia/${createSlug("Про Екатеринбург")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center gap-1">
                  <span>▶</span> Про Екатеринбург
                </Link>
                <Link to={`/guide/russia/${createSlug("Где купаться на Урале")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Где купаться на Урале
                </Link>
                <Link to={`/guide/russia/${createSlug("Про стрит-арт в Екатеринбурге")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Про стрит-арт в Екатеринбурге
                </Link>
              </div>
            </div>

            {/* Краснодарский край */}
            <div>
              <h3 className="text-xl font-bold mb-3">Краснодарский край</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Краснодар")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Краснодар
                </Link>
                <Link to={`/guide/russia/${createSlug("Краснодарский край")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Краснодарский край
                </Link>
                <Link to={`/guide/russia/${createSlug("Как выращивают краснодарский чай")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Как выращивают краснодарский чай
                </Link>
              </div>
            </div>

            {/* Ростовская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Ростовская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Ростов-на-Дону")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Ростов-на-Дону
                </Link>
                <Link to={`/guide/russia/${createSlug("Ростовская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Ростовская область
                </Link>
              </div>
            </div>

            {/* Приморский край */}
            <div>
              <h3 className="text-xl font-bold mb-3">Приморский край</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Владивосток")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Владивосток
                </Link>
                <Link to={`/guide/russia/${createSlug("Приморский край")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Приморский край
                </Link>
                <Link to={`/guide/russia/${createSlug("Чайна-таун Миллионка")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Чайна-таун Миллионка
                </Link>
                <Link to={`/guide/russia/${createSlug("Про Владивосток")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center gap-1">
                  <span>▶</span> Про Владивосток
                </Link>
                <Link to={`/guide/russia/${createSlug("Рутуб: Про Владивосток")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Рутуб: Про Владивосток
                </Link>
              </div>
            </div>

            {/* Самарская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Самарская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Самара")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Самара
                </Link>
                <Link to={`/guide/russia/${createSlug("Самарская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Самарская область
                </Link>
                <Link to={`/guide/russia/${createSlug("Самара: запасная главная")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Самара: запасная главная
                </Link>
                <Link to={`/guide/russia/${createSlug("Про Самару")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center gap-1">
                  <span>▶</span> Про Самару
                </Link>
              </div>
            </div>

            {/* Нижегородская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Нижегородская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Нижний Новгород")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Нижний Новгород
                </Link>
                <Link to={`/guide/russia/${createSlug("Нижегородская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Нижегородская область
                </Link>
                <Link to={`/guide/russia/${createSlug("Нижний Новгород — за что его все ругают")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Нижний Новгород — за что его все ругают
                </Link>
              </div>
            </div>

            {/* Новосибирская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Новосибирская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Новосибирск")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Новосибирск
                </Link>
                <Link to={`/guide/russia/${createSlug("Новосибирская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Новосибирская область
                </Link>
                <Link to={`/guide/russia/${createSlug("Город на шпалах")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Город на шпалах
                </Link>
              </div>
            </div>

            {/* Красноярский край */}
            <div>
              <h3 className="text-xl font-bold mb-3">Красноярский край</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Красноярск")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Красноярск
                </Link>
                <Link to={`/guide/russia/${createSlug("Красноярский край")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Красноярский край
                </Link>
                <Link to={`/guide/russia/${createSlug("Красноярская и Саяно-Шушенская ГЭС")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Красноярская и Саяно-Шушенская ГЭС
                </Link>
                <Link to={`/guide/russia/${createSlug("В тундру к оленеводам")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  В тундру к оленеводам
                </Link>
                <Link to={`/guide/russia/${createSlug("Как мы строили Норильск")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Как мы строили Норильск
                </Link>
              </div>
            </div>

            {/* Иркутская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Иркутская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Иркутск")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Иркутск
                </Link>
                <Link to={`/guide/russia/${createSlug("Иркутская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Иркутская область
                </Link>
              </div>
            </div>

            {/* Калининградская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Калининградская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Калининград")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Калининград
                </Link>
                <Link to={`/guide/russia/${createSlug("Калининградская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Калининградская область
                </Link>
                <Link to={`/guide/russia/${createSlug("С детьми — в Калининград")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  С детьми — в Калининград
                </Link>
                <Link to={`/guide/russia/${createSlug("Зоопарк здорового человека")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Зоопарк здорового человека
                </Link>
                <Link to={`/guide/russia/${createSlug("Эскимо из зяблика")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Эскимо из зяблика
                </Link>
                <Link to={`/guide/russia/${createSlug("Как развивался туризм")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Как развивался туризм
                </Link>
                <Link to={`/guide/russia/${createSlug("Про Калининград")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center gap-1">
                  <span>▶</span> Про Калининград
                </Link>
                <Link to={`/guide/russia/${createSlug("Рутуб: Про Калининград")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Рутуб: Про Калининград
                </Link>
              </div>
            </div>

            {/* Камчатский край */}
            <div>
              <h3 className="text-xl font-bold mb-3">Камчатский край</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Петропавловск-Камчатский")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Петропавловск-Камчатский
                </Link>
                <Link to={`/guide/russia/${createSlug("Камчатский край")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Камчатский край
                </Link>
                <Link to={`/guide/russia/${createSlug("Как живут на Камчатке")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Как живут на Камчатке
                </Link>
              </div>
            </div>

            {/* Якутия */}
            <div>
              <h3 className="text-xl font-bold mb-3">Якутия</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Якутск")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Якутск
                </Link>
                <Link to={`/guide/russia/${createSlug("Республика Саха (Якутия)")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Республика Саха (Якутия)
                </Link>
                <Link to={`/guide/russia/${createSlug("Про Якутию")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center gap-1">
                  <span>▶</span> Про Якутию
                </Link>
                <Link to={`/guide/russia/${createSlug("Рутуб: Про Якутию")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Рутуб: Про Якутию
                </Link>
              </div>
            </div>

            {/* Дагестан */}
            <div>
              <h3 className="text-xl font-bold mb-3">Дагестан</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Махачкала")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Махачкала
                </Link>
                <Link to={`/guide/russia/${createSlug("Республика Дагестан")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Республика Дагестан
                </Link>
                <Link to={`/guide/russia/${createSlug("Про Дагестан")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center gap-1">
                  <span>▶</span> Про Дагестан
                </Link>
                <Link to={`/guide/russia/${createSlug("Ответы про Дагестан")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center gap-1">
                  <span>▶</span> Ответы про Дагестан
                </Link>
                <Link to={`/guide/russia/${createSlug("Рутуб: Ответы про Дагестан")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Рутуб: Ответы про Дагестан
                </Link>
              </div>
            </div>

            {/* Мурманская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Мурманская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Мурманск")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Мурманск
                </Link>
                <Link to={`/guide/russia/${createSlug("Мурманская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Мурманская область
                </Link>
                <Link to={`/guide/russia/${createSlug("Рыбачий и Средний")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Рыбачий и Средний
                </Link>
                <Link to={`/guide/russia/${createSlug("Зачем ехать на край Земли")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Зачем ехать на край Земли
                </Link>
                <Link to={`/guide/russia/${createSlug("Про Рыбачий")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center gap-1">
                  <span>▶</span> Про Рыбачий
                </Link>
                <Link to={`/guide/russia/${createSlug("Про Терский берег")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Про Терский берег
                </Link>
                <Link to={`/guide/russia/${createSlug("Рутуб: Про Рыбачий")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Рутуб: Про Рыбачий
                </Link>
              </div>
            </div>

            {/* Хабаровский край */}
            <div>
              <h3 className="text-xl font-bold mb-3">Хабаровский край</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Хабаровск")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Хабаровск
                </Link>
                <Link to={`/guide/russia/${createSlug("Хабаровский край")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Хабаровский край
                </Link>
                <Link to={`/guide/russia/${createSlug("Про икру")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Про икру
                </Link>
                <Link to={`/guide/russia/${createSlug("Про китов на Шантарах")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Про китов на Шантарах
                </Link>
                <Link to={`/guide/russia/${createSlug("Про китов")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center gap-1">
                  <span>▶</span> Про китов
                </Link>
                <Link to={`/guide/russia/${createSlug("Рутуб: Про китов")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Рутуб: Про китов
                </Link>
              </div>
            </div>

            {/* Рязанская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Рязанская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Рязань")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Рязань
                </Link>
                <Link to={`/guide/russia/${createSlug("Рязанская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Рязанская область
                </Link>
                <Link to={`/guide/russia/${createSlug("Касимов")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Касимов
                </Link>
                <Link to={`/guide/russia/${createSlug("Выходные в Рязани")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Выходные в Рязани
                </Link>
              </div>
            </div>

            {/* Ставропольский край */}
            <div>
              <h3 className="text-xl font-bold mb-3">Ставропольский край</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Ставрополь")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Ставрополь
                </Link>
                <Link to={`/guide/russia/${createSlug("Ставропольский край")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Ставропольский край
                </Link>
              </div>
            </div>

            {/* Ярославская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Ярославская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Ярославль")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Ярославль
                </Link>
                <Link to={`/guide/russia/${createSlug("Ярославская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Ярославская область
                </Link>
                <Link to={`/guide/russia/${createSlug("Нетипичный Ярославль")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Нетипичный Ярославль
                </Link>
                <Link to={`/guide/russia/${createSlug("Как полетать на воздушном шаре")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Как полетать на воздушном шаре
                </Link>
                <Link to={`/guide/russia/${createSlug("Про рыбинские вывески")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Про рыбинские вывески
                </Link>
              </div>
            </div>

            {/* Волгоградская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Волгоградская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Волгоград")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Волгоград
                </Link>
                <Link to={`/guide/russia/${createSlug("Волгоградская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Волгоградская область
                </Link>
                <Link to={`/guide/russia/${createSlug("Про Волгоград")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center gap-1">
                  <span>▶</span> Про Волгоград
                </Link>
                <Link to={`/guide/russia/${createSlug("Скоростной трамвай")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Скоростной трамвай
                </Link>
              </div>
            </div>

            {/* Пермский край */}
            <div>
              <h3 className="text-xl font-bold mb-3">Пермский край</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Пермь")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Пермь
                </Link>
                <Link to={`/guide/russia/${createSlug("Пермский край")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Пермский край
                </Link>
              </div>
            </div>

            {/* Тюменская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Тюменская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Тюмень")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Тюмень
                </Link>
                <Link to={`/guide/russia/${createSlug("Тюменская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Тюменская область
                </Link>
                <Link to={`/guide/russia/${createSlug("Россия — месторождение слонов")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Россия — месторождение слонов
                </Link>
              </div>
            </div>

            {/* Коми */}
            <div>
              <h3 className="text-xl font-bold mb-3">Коми</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Сыктывкар")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Сыктывкар
                </Link>
                <Link to={`/guide/russia/${createSlug("Республика Коми")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Республика Коми
                </Link>
                <Link to={`/guide/russia/${createSlug("Первая в мире лосеферма в Коми")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Первая в мире лосеферма в Коми
                </Link>
                <Link to={`/guide/russia/${createSlug("Седьмое чудо России")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Седьмое чудо России
                </Link>
                <Link to={`/guide/russia/${createSlug("Рутуб: Про Маньпупунёр")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Рутуб: Про Маньпупунёр
                </Link>
                <Link to={`/guide/russia/${createSlug("Рутуб: Про лосей")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Рутуб: Про лосей
                </Link>
              </div>
            </div>

            {/* Воронежская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Воронежская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Воронеж")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Воронеж
                </Link>
                <Link to={`/guide/russia/${createSlug("Воронежская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Воронежская область
                </Link>
                <Link to={`/guide/russia/${createSlug("Бобры в бобронариуме")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Бобры в бобронариуме
                </Link>
              </div>
            </div>

            {/* Владимирская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Владимирская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Владимир")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Владимир
                </Link>
                <Link to={`/guide/russia/${createSlug("Владимирская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Владимирская область
                </Link>
                <Link to={`/guide/russia/${createSlug("Суздаль")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Суздаль
                </Link>
              </div>
            </div>

            {/* Удмуртия */}
            <div>
              <h3 className="text-xl font-bold mb-3">Удмуртия</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Ижевск")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Ижевск
                </Link>
                <Link to={`/guide/russia/${createSlug("Удмуртская Республика")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Удмуртская Республика
                </Link>
                <Link to={`/guide/russia/${createSlug("ЦСДР в Ижевске")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  ЦСДР в Ижевске
                </Link>
                <Link to={`/guide/russia/${createSlug("Про Удмуртию")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center gap-1">
                  <span>▶</span> Про Удмуртию
                </Link>
                <Link to={`/guide/russia/${createSlug("Как жарят кофе в Ижевске")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Как жарят кофе в Ижевске
                </Link>
                <Link to={`/guide/russia/${createSlug("Один день на пожарной каланче")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Один день на пожарной каланче
                </Link>
              </div>
            </div>

            {/* Томская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Томская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Томск")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Томск
                </Link>
                <Link to={`/guide/russia/${createSlug("Томская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Томская область
                </Link>
              </div>
            </div>

            {/* Тульская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Тульская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Тула")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Тула
                </Link>
                <Link to={`/guide/russia/${createSlug("Тульская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Тульская область
                </Link>
                <Link to={`/guide/russia/${createSlug("Как работают археологи")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Как работают археологи
                </Link>
                <Link to={`/guide/russia/${createSlug("Про Тулу")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center gap-1">
                  <span>▶</span> Про Тулу
                </Link>
              </div>
            </div>

            {/* Тверская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Тверская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Тверь")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Тверь
                </Link>
                <Link to={`/guide/russia/${createSlug("Тверская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Тверская область
                </Link>
                <Link to={`/guide/russia/${createSlug("Русские котики")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Русские котики
                </Link>
              </div>
            </div>

            {/* Хакасия */}
            <div>
              <h3 className="text-xl font-bold mb-3">Хакасия</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Абакан")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Абакан
                </Link>
                <Link to={`/guide/russia/${createSlug("Республика Хакасия")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Республика Хакасия
                </Link>
                <Link to={`/guide/russia/${createSlug("Про Хакасию")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center gap-1">
                  <span>▶</span> Про Хакасию
                </Link>
              </div>
            </div>

            {/* Челябинская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Челябинская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Челябинск")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Челябинск
                </Link>
                <Link to={`/guide/russia/${createSlug("Челябинская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Челябинская область
                </Link>
              </div>
            </div>

            {/* Бурятия */}
            <div>
              <h3 className="text-xl font-bold mb-3">Бурятия</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Улан-Удэ")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Улан-Удэ
                </Link>
                <Link to={`/guide/russia/${createSlug("Республика Бурятия")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Республика Бурятия
                </Link>
                <Link to={`/guide/russia/${createSlug("Бурятская национальная юрта")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Бурятская национальная юрта
                </Link>
                <Link to={`/guide/russia/${createSlug("Советы от местных жителей")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Советы от местных жителей
                </Link>
                <Link to={`/guide/russia/${createSlug("Про швейцарца из Бурятии")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Про швейцарца из Бурятии
                </Link>
              </div>
            </div>

            {/* Архангельская область */}
            <div>
              <h3 className="text-xl font-bold mb-3">Архангельская область</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Архангельск")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Архангельск
                </Link>
                <Link to={`/guide/russia/${createSlug("Архангельская область")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Архангельская область
                </Link>
                <Link to={`/guide/russia/${createSlug("Как сшить судно")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Как сшить судно
                </Link>
                <Link to={`/guide/russia/${createSlug("Один день в аэропорту на краю земли")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Один день в аэропорту на краю земли
                </Link>
              </div>
            </div>

            {/* Башкирия */}
            <div>
              <h3 className="text-xl font-bold mb-3">Башкирия</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Уфа")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Уфа
                </Link>
                <Link to={`/guide/russia/${createSlug("Республика Башкортостан")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Республика Башкортостан
                </Link>
              </div>
            </div>

            {/* Алтай */}
            <div>
              <h3 className="text-xl font-bold mb-3">Алтай</h3>
              <div className="flex flex-wrap gap-2">
                <Link to={`/guide/russia/${createSlug("Горно-Алтайск")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Горно-Алтайск
                </Link>
                <Link to={`/guide/russia/${createSlug("Республика Алтай")}`} className="px-3 py-1.5 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                  Республика Алтай
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Страны */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">Узнайте о путешествиях в 173 страны</h2>
          <p className="text-muted-foreground mb-6">
            Когда начинается сезон в Таиланде, как получить визу в Испанию и что привезти из Греции
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: "Австралия", code: "au" },
              { name: "Австрия", code: "at" },
              { name: "Азербайджан", code: "az" },
              { name: "Албания", code: "al" },
              { name: "Аргентина", code: "ar" },
              { name: "Армения", code: "am" },
              { name: "Бахрейн", code: "bh" },
              { name: "Беларусь", code: "by" },
              { name: "Бельгия", code: "be" },
              { name: "Болгария", code: "bg" },
              { name: "Бразилия", code: "br" },
              { name: "Великобритания", code: "gb" },
              { name: "Венгрия", code: "hu" },
              { name: "Вьетнам", code: "vn" },
              { name: "Германия", code: "de" },
              { name: "Греция", code: "gr" },
              { name: "Грузия", code: "ge" },
              { name: "Доминикана", code: "do" },
              { name: "Дубай", code: "ae" },
              { name: "Египет", code: "eg" },
              { name: "Израиль", code: "il" },
              { name: "Индия", code: "in" },
              { name: "Индонезия", code: "id" },
              { name: "Испания", code: "es" },
              { name: "Италия", code: "it" },
              { name: "Казахстан", code: "kz" },
              { name: "Камбоджа", code: "kh" },
              { name: "Канада", code: "ca" },
              { name: "Кипр", code: "cy" },
              { name: "Китай", code: "cn" },
              { name: "Куба", code: "cu" },
              { name: "Латвия", code: "lv" },
              { name: "Ливан", code: "lb" },
              { name: "Маврикий", code: "mu" },
              { name: "Малайзия", code: "my" },
              { name: "Мальдивы", code: "mv" },
              { name: "Марокко", code: "ma" },
              { name: "Мексика", code: "mx" },
              { name: "Нидерланды", code: "nl" },
              { name: "Норвегия", code: "no" },
              { name: "ОАЭ", code: "ae" },
              { name: "Польша", code: "pl" },
              { name: "Португалия", code: "pt" },
              { name: "Россия", code: "ru" },
              { name: "Сейшелы", code: "sc" },
              { name: "Сингапур", code: "sg" },
              { name: "Словакия", code: "sk" },
              { name: "Словения", code: "si" },
              { name: "США", code: "us" },
              { name: "Таиланд", code: "th" },
              { name: "Турция", code: "tr" },
              { name: "Тунис", code: "tn" },
              { name: "Франция", code: "fr" },
              { name: "Черногория", code: "me" },
              { name: "Чехия", code: "cz" },
              { name: "Чили", code: "cl" },
              { name: "Швейцария", code: "ch" },
              { name: "Швеция", code: "se" },
              { name: "Шри-Ланка", code: "lk" },
              { name: "Южная Корея", code: "kr" },
              { name: "Япония", code: "jp" },
            ].map((country) => (
              <Link
                key={country.name}
                to={`/guide/countries/${createSlug(country.name)}`}
                className="flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-sm border border-purple-100"
              >
                <img 
                  src={`https://flagcdn.com/w20/${country.code}.png`}
                  alt={`${country.name} flag`}
                  className="w-5 h-4 object-cover rounded-sm"
                />
                <span className="text-purple-900 hover:text-purple-700">{country.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Guide;
