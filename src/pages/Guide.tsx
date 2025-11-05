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
          <h1 className="text-5xl font-bold mb-4">Путеводитель TudaSuda</h1>
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
                  "Как читать наличники"
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

          {/* Россия */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Россия</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Москва",
                  "Санкт-Петербург",
                  "Крым",
                  "Симферополь",
                  "Севастополь",
                  "Майкоп",
                  "Казань",
                  "Екатеринбург",
                  "Краснодар",
                  "Ростов-на-Дону",
                  "Владивосток",
                  "Самара",
                  "Нижний Новгород",
                  "Новосибирск",
                  "Красноярск",
                  "Иркутск",
                  "Калининград",
                  "Петропавловск-Камчатский",
                  "Якутск",
                  "Махачкала",
                  "Мурманск",
                  "Хабаровск",
                  "Рязань",
                  "Касимов",
                  "Ставрополь",
                  "Ярославль",
                  "Волгоград",
                  "Пермь",
                  "Тюмень",
                  "Сыктывкар",
                  "Воронеж",
                  "Владимир",
                  "Суздаль",
                  "Ижевск",
                  "Томск",
                  "Тула",
                  "Тверь",
                  "Абакан",
                  "Челябинск",
                  "Улан-Удэ",
                  "Архангельск",
                  "Уфа",
                  "Горно-Алтайск"
                ].map((title, idx) => (
                  <Link
                    key={idx}
                    to={`/guide/russia/${createSlug(title)}`}
                    className="px-4 py-2 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors"
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Страны */}
        <section className="mb-12 hidden">
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
