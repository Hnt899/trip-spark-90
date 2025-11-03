import { useEffect } from "react";
import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createSlug } from "@/utils/slugify";
import ChtodelatEsliya from "./articles/passenger/ChtodelatEsliya";
import ChtodelatEsliukrali from "./articles/passenger/ChtodelatEsliukrali";
import Pokakomudokumentubrat from "./articles/passenger/Pokakomudokumentubrat";
import Gdeiskatpoteryannyeveschi from "./articles/passenger/Gdeiskatpoteryannyeveschi";
import Kakrabotaetstrahovkav from "./articles/passenger/Kakrabotaetstrahovkav";
import Kakpoluchitmeditsinskuyupomosch from "./articles/passenger/Kakpoluchitmeditsinskuyupomosch";
import Ruchnayakladbolshenormy from "./articles/passenger/Ruchnayakladbolshenormy";
import Kakiebyvayutvozvratybiletov from "./articles/passenger/Kakiebyvayutvozvratybiletov";
import Kaksestnapromezhutochnoy from "./articles/passenger/Kaksestnapromezhutochnoy";
import Gdepokupatbiletna from "./articles/passenger/Gdepokupatbiletna";
import Pochemuvozvratdenegdelayut from "./articles/passenger/Pochemuvozvratdenegdelayut";
import Gdemoyvozvrat from "./articles/passenger/Gdemoyvozvrat";
import Eslipopalvdtp from "./articles/passenger/Eslipopalvdtp";
import SeryeIBelyePerevozchiki from "./articles/passenger/SeryeIBelyePerevozchiki";
import Kakkormyatvsamolete from "./articles/passenger/Kakkormyatvsamolete";
import Kakpokupatesimpered from "./articles/passenger/Kakpokupatesimpered";
import Nuzhnoliprivivatsyapered from "./articles/passenger/Nuzhnoliprivivatsyapered";
import SmenafamiliiKakkupit from "./articles/passenger/SmenafamiliiKakkupit";
import Vozitlipasportrf from "./articles/passenger/Vozitlipasportrf";
import Kakletatsmalenkim from "./articles/passenger/Kakletatsmalenkim";
import Kakpereveztizhivotnoe from "./articles/passenger/Kakpereveztizhivotnoe";
import Kakrabotayutgostinitsydlya from "./articles/passenger/Kakrabotayutgostinitsydlya";
import ChtodelatEsliopozdali from "./articles/passenger/ChtodelatEsliopozdali";
import ChtodelatEsliaviareys from "./articles/passenger/ChtodelatEsliaviareys";
import Zachemotkryvatshtorkuillyuminatora from "./articles/passenger/Zachemotkryvatshtorkuillyuminatora";
import GdeposadkaEslipassazhiru from "./articles/passenger/GdeposadkaEslipassazhiru";
import Kakpoehatvstranu from "./articles/passenger/Kakpoehatvstranu";
import ChtodelatEsliukusila from "./articles/passenger/ChtodelatEsliukusila";
import ChtodelatEsliukusil from "./articles/passenger/ChtodelatEsliukusil";
import ChtodelatEslimoy from "./articles/passenger/ChtodelatEslimoy";
import Sovetyparanoikamperedpoezdkoy from "./articles/passenger/Sovetyparanoikamperedpoezdkoy";
import Kogdapokupatbiletyna from "./articles/passenger/Kogdapokupatbiletyna";
import ChtodelatEslipoteryal from "./articles/passenger/ChtodelatEslipoteryal";
import Peresadkailistykovka from "./articles/passenger/Peresadkailistykovka";
import Kakpereveztibuket from "./articles/passenger/Kakpereveztibuket";
import Kakpereveztibankis from "./articles/passenger/Kakpereveztibankis";
import Kakproveryayutbiletyna from "./articles/passenger/Kakproveryayutbiletyna";
import Mozhnoliprovezti18 from "./articles/passenger/Mozhnoliprovezti18";
import Mozhnolipitv from "./articles/passenger/Mozhnolipitv";
import ChtodelatEsliavtobus from "./articles/passenger/ChtodelatEsliavtobus";
import Puteshestvovatnainvalidnomkresle from "./articles/passenger/Puteshestvovatnainvalidnomkresle";
import Kakputeshestvuyutslepye from "./articles/passenger/Kakputeshestvuyutslepye";
import Chtonadoznatpro from "./articles/passenger/Chtonadoznatpro";

// Функция для создания имени компонента
function createComponentName(title: string): string {
  return title
    .replace(/[?«»—()!]/g, "")
    .split(/\s+/)
    .slice(0, 4)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')
    .replace(/[^a-zA-Zа-яА-ЯёЁ0-9]/g, '') || 'Article';
}

// Маппинг всех статей
const guideArticles: Record<string, { title: string; category: string; categoryName: string; componentName: string }> = {};

// Полезно пассажиру
const passenger = [
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
];

passenger.forEach(title => {
  const slug = createSlug(title);
  guideArticles[`passenger/${slug}`] = {
    title,
    category: 'passenger',
    categoryName: 'Полезно пассажиру',
    componentName: createComponentName(title)
  };
});

// Разборы
const analysis = [
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
];

analysis.forEach(title => {
  const slug = createSlug(title);
  guideArticles[`analysis/${slug}`] = {
    title,
    category: 'analysis',
    categoryName: 'Разборы',
    componentName: createComponentName(title)
  };
});

// Полезно про туризм
const tourism = [
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
];

tourism.forEach(title => {
  const slug = createSlug(title);
  guideArticles[`tourism/${slug}`] = {
    title,
    category: 'tourism',
    categoryName: 'Полезно про туризм',
    componentName: createComponentName(title)
  };
});

// Транспорт
const transport = [
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
];

transport.forEach(title => {
  const slug = createSlug(title);
  guideArticles[`transport/${slug}`] = {
    title,
    category: 'transport',
    categoryName: 'Транспорт',
    componentName: createComponentName(title)
  };
});

// Надолго в другую страну
const longTerm = [
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
];

longTerm.forEach(title => {
  const slug = createSlug(title);
  guideArticles[`long-term/${slug}`] = {
    title,
    category: 'long-term',
    categoryName: 'Надолго в другую страну',
    componentName: createComponentName(title)
  };
});

// Первый раз
const firstTime = [
  "Планеры",
  "Гастротуризм в России",
  "Гастротуры",
  "Как взойти на Эверест",
  "На мотоцикле",
  "Как встать на горные лыжи",
  "Как начать бегать",
  "Как пойти пешком в горы",
  "Как впервые встать на сап"
];

firstTime.forEach(title => {
  const slug = createSlug(title);
  guideArticles[`first-time/${slug}`] = {
    title,
    category: 'first-time',
    categoryName: 'Первый раз',
    componentName: createComponentName(title)
  };
});

// Фишки России
const russiaFeatures = [
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
];

russiaFeatures.forEach(title => {
  const slug = createSlug(title);
  guideArticles[`russia-features/${slug}`] = {
    title,
    category: 'russia-features',
    categoryName: 'Фишки России',
    componentName: createComponentName(title)
  };
});

// Самое важное
const important = [
  "Открытие границ",
  "Шенген-25"
];

important.forEach(title => {
  const slug = createSlug(title);
  guideArticles[`important/${slug}`] = {
    title,
    category: 'important',
    categoryName: 'Самое важное сейчас',
    componentName: createComponentName(title)
  };
});

// Регионы России
const russiaArticles = [
  // Москва
  "Москва",
  "Московская область",
  "Про пастилу в Коломне",
  "Производство в Жостово",
  "Москва по вертикали",
  "Про Коломну",
  "«Диснейленды» в Москве",
  "Про юрты и чумы в Москве",
  "Как делают коврижки в Зарайске",
  // Санкт-Петербург
  "Санкт-Петербург",
  "Ленинградская область",
  "Библиотека Аалто в Выборге",
  "Другой взгляд на привычные места",
  "Дешёвые билеты в Петербург",
  "Про Выборг",
  "Как точно выкопать себе трилобита",
  "Про кафе в оранжереях",
  "Рутуб: Про Выборг",
  // Крым
  "Крым",
  "Симферополь",
  "Севастополь",
  "Как попасть в «Артек»",
  // Адыгея
  "Майкоп",
  "Республика Адыгея",
  // Татарстан
  "Казань",
  "Республика Татарстан",
  "Как делают валенки",
  "С детьми — в Казань",
  "Про Казань",
  "Рутуб: Про Казань",
  "Про татарскую кухню",
  "Про мясо",
  // Свердловская область
  "Екатеринбург",
  "Свердловская область",
  "Сысерть: как делают фарфоровые чашки",
  "Про Екатеринбург",
  "Где купаться на Урале",
  "Про стрит-арт в Екатеринбурге",
  // Краснодарский край
  "Краснодар",
  "Краснодарский край",
  "Как выращивают краснодарский чай",
  // Ростовская область
  "Ростов-на-Дону",
  "Ростовская область",
  // Приморский край
  "Владивосток",
  "Приморский край",
  "Чайна-таун Миллионка",
  "Про Владивосток",
  "Рутуб: Про Владивосток",
  // Самарская область
  "Самара",
  "Самарская область",
  "Самара: запасная главная",
  "Про Самару",
  // Нижегородская область
  "Нижний Новгород",
  "Нижегородская область",
  "Нижний Новгород — за что его все ругают",
  // Новосибирская область
  "Новосибирск",
  "Новосибирская область",
  "Город на шпалах",
  // Красноярский край
  "Красноярск",
  "Красноярский край",
  "Красноярская и Саяно-Шушенская ГЭС",
  "В тундру к оленеводам",
  "Как мы строили Норильск",
  // Иркутская область
  "Иркутск",
  "Иркутская область",
  // Калининградская область
  "Калининград",
  "Калининградская область",
  "С детьми — в Калининград",
  "Зоопарк здорового человека",
  "Эскимо из зяблика",
  "Как развивался туризм",
  "Про Калининград",
  "Рутуб: Про Калининград",
  // Камчатский край
  "Петропавловск-Камчатский",
  "Камчатский край",
  "Как живут на Камчатке",
  // Якутия
  "Якутск",
  "Республика Саха (Якутия)",
  "Про Якутию",
  "Рутуб: Про Якутию",
  // Дагестан
  "Махачкала",
  "Республика Дагестан",
  "Про Дагестан",
  "Ответы про Дагестан",
  "Рутуб: Ответы про Дагестан",
  // Мурманская область
  "Мурманск",
  "Мурманская область",
  "Рыбачий и Средний",
  "Зачем ехать на край Земли",
  "Про Рыбачий",
  "Про Терский берег",
  "Рутуб: Про Рыбачий",
  // Хабаровский край
  "Хабаровск",
  "Хабаровский край",
  "Про икру",
  "Про китов на Шантарах",
  "Про китов",
  "Рутуб: Про китов",
  // Рязанская область
  "Рязань",
  "Рязанская область",
  "Касимов",
  "Выходные в Рязани",
  // Ставропольский край
  "Ставрополь",
  "Ставропольский край",
  // Ярославская область
  "Ярославль",
  "Ярославская область",
  "Нетипичный Ярославль",
  "Как полетать на воздушном шаре",
  "Про рыбинские вывески",
  // Волгоградская область
  "Волгоград",
  "Волгоградская область",
  "Про Волгоград",
  "Скоростной трамвай",
  // Пермский край
  "Пермь",
  "Пермский край",
  // Тюменская область
  "Тюмень",
  "Тюменская область",
  "Россия — месторождение слонов",
  // Коми
  "Сыктывкар",
  "Республика Коми",
  "Первая в мире лосеферма в Коми",
  "Седьмое чудо России",
  "Рутуб: Про Маньпупунёр",
  "Рутуб: Про лосей",
  // Воронежская область
  "Воронеж",
  "Воронежская область",
  "Бобры в бобронариуме",
  // Владимирская область
  "Владимир",
  "Владимирская область",
  "Суздаль",
  // Удмуртия
  "Ижевск",
  "Удмуртская Республика",
  "ЦСДР в Ижевске",
  "Про Удмуртию",
  "Как жарят кофе в Ижевске",
  "Один день на пожарной каланче",
  // Томская область
  "Томск",
  "Томская область",
  // Тульская область
  "Тула",
  "Тульская область",
  "Как работают археологи",
  "Про Тулу",
  // Тверская область
  "Тверь",
  "Тверская область",
  "Русские котики",
  // Хакасия
  "Абакан",
  "Республика Хакасия",
  "Про Хакасию",
  // Челябинская область
  "Челябинск",
  "Челябинская область",
  // Бурятия
  "Улан-Удэ",
  "Республика Бурятия",
  "Бурятская национальная юрта",
  "Советы от местных жителей",
  "Про швейцарца из Бурятии",
  // Архангельская область
  "Архангельск",
  "Архангельская область",
  "Как сшить судно",
  "Один день в аэропорту на краю земли",
  // Башкирия
  "Уфа",
  "Республика Башкортостан",
  // Алтай
  "Горно-Алтайск",
  "Республика Алтай",
  // Астраханская область
  "Астрахань",
  "Астраханская область",
  "Шелковичный червь",
  "Цветение кактусов",
  "Пересадочный узел для птиц",
  "Про Астрахань",
  // Белгородская область
  "Белгород",
  "Белгородская область",
  // Брянская область
  "Брянск",
  "Брянская область",
  // Вологодская область
  "Вологда",
  "Вологодская область",
  // Еврейская АО
  "Биробиджан",
  "Еврейская автономная область",
  // Ивановская область
  "Иваново",
  "Ивановская область",
  "Плёс",
  "Первый советский вокзал",
  "Про Иваново",
  // Ингушетия
  "Магас",
  "Республика Ингушетия",
  // Кабардино-Балкария
  "Нальчик",
  "Кабардино-Балкарская Республика",
  // Калмыкия
  "Элиста",
  "Республика Калмыкия",
  // Калужская область
  "Калуга",
  "Калужская область",
  "Мусор как искусство",
  // Карачаево-Черкесия
  "Черкесск",
  "Карачаево-Черкесская Республика",
  "Астрономическое путешествие",
  // Кемеровская область
  "Кемерово",
  "Кемеровская область — Кузбасс",
  // Кировская область
  "Киров",
  "Кировская область",
  // Костромская область
  "Кострома",
  "Костромская область",
  // Курганская область
  "Курган",
  "Курганская область",
  // Курская область
  "Курск",
  "Курская область",
  // Липецкая область
  "Липецк",
  "Липецкая область",
  // Магаданская область
  "Магадан",
  "Магаданская область",
  // Марий Эл
  "Йошкар-Ола",
  "Республика Марий Эл",
  // Мордовия
  "Саранск",
  "Республика Мордовия",
  // Ненецкий АО
  "Нарьян-Мар",
  "Ненецкий автономный округ",
  // Новгородская область
  "Великий Новгород",
  "Новгородская область",
  "Про ёлочные игрушки",
  // Омская область
  "Омск",
  "Омская область",
  // Оренбургская область
  "Оренбург",
  "Оренбургская область",
  // Орловская область
  "Орёл",
  "Орловская область",
  // Пензенская область
  "Пенза",
  "Пензенская область",
  // Псковская область
  "Псков",
  "Псковская область",
  // Саратовская область
  "Саратов",
  "Саратовская область",
  // Сахалинская область
  "Южно-Сахалинск",
  "Сахалинская область",
  // Северная Осетия
  "Владикавказ",
  "Республика Северная Осетия – Алания",
  // Смоленская область
  "Смоленск",
  "Смоленская область",
  // Тамбовская область
  "Тамбов",
  "Тамбовская область",
  // Тыва
  "Кызыл",
  "Республика Тыва",
  // Ульяновская область
  "Ульяновск",
  "Ульяновская область",
  "Про байбака",
  // Чечня
  "Грозный",
  "Чеченская Республика",
  // Чувашия
  "Чебоксары",
  "Чувашская Республика",
  // Чукотский АО
  "Анадырь",
  "Чукотский автономный округ",
  // Ямало-Ненецкий АО
  "Салехард",
  "Ямало-Ненецкий автономный округ",
  "Салехард – транспортный рай",
  "Бросить всё и уйти в тундру",
  // Алтайский край
  "Барнаул",
  "Алтайский край",
  // Забайкальский край
  "Чита",
  "Забайкальский край",
];

russiaArticles.forEach(title => {
  const slug = createSlug(title);
  guideArticles[`russia/${slug}`] = {
    title,
    category: 'russia',
    categoryName: 'Россия',
    componentName: createComponentName(title)
  };
});

// Страны
const countries = [
  "Австралия",
  "Австрия",
  "Азербайджан",
  "Албания",
  "Аргентина",
  "Армения",
  "Бахрейн",
  "Беларусь",
  "Бельгия",
  "Болгария",
  "Бразилия",
  "Великобритания",
  "Венгрия",
  "Вьетнам",
  "Германия",
  "Греция",
  "Грузия",
  "Доминикана",
  "Дубай",
  "Египет",
  "Израиль",
  "Индия",
  "Индонезия",
  "Испания",
  "Италия",
  "Казахстан",
  "Камбоджа",
  "Канада",
  "Кипр",
  "Китай",
  "Куба",
  "Латвия",
  "Ливан",
  "Маврикий",
  "Малайзия",
  "Мальдивы",
  "Марокко",
  "Мексика",
  "Нидерланды",
  "Норвегия",
  "ОАЭ",
  "Польша",
  "Португалия",
  "Россия",
  "Сейшелы",
  "Сингапур",
  "Словакия",
  "Словения",
  "США",
  "Таиланд",
  "Турция",
  "Тунис",
  "Франция",
  "Черногория",
  "Чехия",
  "Чили",
  "Швейцария",
  "Швеция",
  "Шри-Ланка",
  "Южная Корея",
  "Япония",
];

countries.forEach(title => {
  const slug = createSlug(title);
  guideArticles[`countries/${slug}`] = {
    title,
    category: 'countries',
    categoryName: 'Страны',
    componentName: createComponentName(title)
  };
});

// Маппинг компонентов для заполненных статей
// Используем ту же логику createSlug для генерации ключей
const sickArticleSlug = createSlug("Что делать, если я заболел в дороге?");
const stolenDocsSlug = createSlug("Что делать, если украли документы?");
const whichDocSlug = createSlug("По какому документу брать билет?");
const lostItemsSlug = createSlug("Где искать потерянные вещи?");
const insuranceSlug = createSlug("Как работает страховка в билете?");
const medicalHelpSlug = createSlug("Как получить медицинскую помощь?");
const handLuggageSlug = createSlug("Ручная кладь больше нормы?");
const refundsSlug = createSlug("Какие бывают возвраты билетов?");
const intermediateStationSlug = createSlug("Как сесть на промежуточной станции?");
const elektrichkaSlug = createSlug("Где покупать билет на электричку?");
const refund30daysSlug = createSlug("Почему возврат денег делают 30 дней?");
const gdemoyvozvratSlug = createSlug("Где мой возврат?");
const dtpSlug = createSlug("Если попал в ДТП в автобусе?");
const seriyPerevozchikiSlug = createSlug("«Серые» и «белые» перевозчики?");
const kormyatSlug = createSlug("Как кормят в самолёте?");
const esimSlug = createSlug("Как покупать eSIM перед поездкой?");
const privivkiSlug = createSlug("Нужно ли прививаться перед поездкой?");
const smenafamiliiSlug = createSlug("Смена фамилии, как купить билет?");
const pasportrfSlug = createSlug("Возить ли паспорт РФ за границу?");
const malenkimSlug = createSlug("Как летать с маленьким ребёнком?");
const zhivotnoeSlug = createSlug("Как перевезти животное?");
const gostinitsydlyaSlug = createSlug("Как работают гостиницы для животных?");
const opozdaliSlug = createSlug("Что делать, если опоздали на самолет?");
const zaderzhaliSlug = createSlug("Что делать, если авиарейс задержали?");
const shtorkuSlug = createSlug("Почему надо открывать шторку иллюминатора?");
const plohoSlug = createSlug("Где посадка, если пассажиру плохо?");
const bezpaketovSlug = createSlug("Как поехать в страну без турпакетов?");
const zmeyaSlug = createSlug("Что делать, если укусила змея?");
const kleshhSlug = createSlug("Что делать, если укусил клещ?");
const bagazhSlug = createSlug("Что делать, если мой багаж повредили?");
const paranoikiSlug = createSlug("Советы параноикам перед поездкой");
const kogdapokupatSlug = createSlug("Когда покупать билеты на поезда?");
const poteryalSlug = createSlug("Что делать, если потерял свой билет?");
const peresadkaSlug = createSlug("Пересадка или стыковка?");
const buketSlug = createSlug("Как перевезти букет?");
const bankiSlug = createSlug("Как перевезти банки с закатками?");
const proveryayutSlug = createSlug("Как проверяют билеты на автобус?");
const pivoSlug = createSlug("Можно ли провезти 18 литров пива?");
const pitSlug = createSlug("Можно ли пить в транспорте?");
const avtobusSlug = createSlug("Что делать, если автобус не приехал?");
const invalidnoeSlug = createSlug("Путешествовать на инвалидном кресле?");
const slepyeSlug = createSlug("Как путешествуют слепые?");
const bezopasnostSlug = createSlug("Что надо знать про безопасность?");

const articleComponents: Record<string, React.ComponentType> = {
  [`passenger/${sickArticleSlug}`]: ChtodelatEsliya,
  [`passenger/${stolenDocsSlug}`]: ChtodelatEsliukrali,
  [`passenger/${whichDocSlug}`]: Pokakomudokumentubrat,
  [`passenger/${lostItemsSlug}`]: Gdeiskatpoteryannyeveschi,
  [`passenger/${insuranceSlug}`]: Kakrabotaetstrahovkav,
  [`passenger/${medicalHelpSlug}`]: Kakpoluchitmeditsinskuyupomosch,
  [`passenger/${handLuggageSlug}`]: Ruchnayakladbolshenormy,
  [`passenger/${refundsSlug}`]: Kakiebyvayutvozvratybiletov,
  [`passenger/${intermediateStationSlug}`]: Kaksestnapromezhutochnoy,
  [`passenger/${elektrichkaSlug}`]: Gdepokupatbiletna,
  [`passenger/${refund30daysSlug}`]: Pochemuvozvratdenegdelayut,
  [`passenger/${gdemoyvozvratSlug}`]: Gdemoyvozvrat,
  [`passenger/${dtpSlug}`]: Eslipopalvdtp,
  [`passenger/${seriyPerevozchikiSlug}`]: SeryeIBelyePerevozchiki,
  [`passenger/${kormyatSlug}`]: Kakkormyatvsamolete,
  [`passenger/${esimSlug}`]: Kakpokupatesimpered,
  [`passenger/${privivkiSlug}`]: Nuzhnoliprivivatsyapered,
  [`passenger/${smenafamiliiSlug}`]: SmenafamiliiKakkupit,
  [`passenger/${pasportrfSlug}`]: Vozitlipasportrf,
  [`passenger/${malenkimSlug}`]: Kakletatsmalenkim,
  [`passenger/${zhivotnoeSlug}`]: Kakpereveztizhivotnoe,
  [`passenger/${gostinitsydlyaSlug}`]: Kakrabotayutgostinitsydlya,
  [`passenger/${opozdaliSlug}`]: ChtodelatEsliopozdali,
  [`passenger/${zaderzhaliSlug}`]: ChtodelatEsliaviareys,
  [`passenger/${shtorkuSlug}`]: Zachemotkryvatshtorkuillyuminatora,
  [`passenger/${plohoSlug}`]: GdeposadkaEslipassazhiru,
  [`passenger/${bezpaketovSlug}`]: Kakpoehatvstranu,
  [`passenger/${zmeyaSlug}`]: ChtodelatEsliukusila,
  [`passenger/${kleshhSlug}`]: ChtodelatEsliukusil,
  [`passenger/${bagazhSlug}`]: ChtodelatEslimoy,
  [`passenger/${paranoikiSlug}`]: Sovetyparanoikamperedpoezdkoy,
  [`passenger/${kogdapokupatSlug}`]: Kogdapokupatbiletyna,
  [`passenger/${poteryalSlug}`]: ChtodelatEslipoteryal,
  [`passenger/${peresadkaSlug}`]: Peresadkailistykovka,
  [`passenger/${buketSlug}`]: Kakpereveztibuket,
  [`passenger/${bankiSlug}`]: Kakpereveztibankis,
  [`passenger/${proveryayutSlug}`]: Kakproveryayutbiletyna,
  [`passenger/${pivoSlug}`]: Mozhnoliprovezti18,
  [`passenger/${pitSlug}`]: Mozhnolipitv,
  [`passenger/${avtobusSlug}`]: ChtodelatEsliavtobus,
  [`passenger/${invalidnoeSlug}`]: Puteshestvovatnainvalidnomkresle,
  [`passenger/${slepyeSlug}`]: Kakputeshestvuyutslepye,
  [`passenger/${bezopasnostSlug}`]: Chtonadoznatpro,
  // Запасной вариант на случай различий в slug
  'passenger/chto-delat-esli-ya-zabelel-v-doroge': ChtodelatEsliya,
  'passenger/chto-delat-esli-ya-zabolel-v-doroge': ChtodelatEsliya,
};

const GuideArticlePage = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!category || !slug) {
    return <Navigate to="/guide" replace />;
  }

  const articleKey = `${category}/${slug}`;
  const article = guideArticles[articleKey];

  if (!article) {
    return <Navigate to="/guide" replace />;
  }

  // Проверяем, есть ли специальный компонент для этой статьи
  let ArticleComponent = articleComponents[articleKey];
  
  // Если не найдено по точному совпадению, пробуем найти по другим вариантам
  if (!ArticleComponent) {
    const allKeys = Object.keys(articleComponents);
    const matchingKey = allKeys.find(key => {
      // Проверяем различные варианты совпадения
      const keyCategory = key.split('/')[0];
      const keySlug = key.split('/').slice(1).join('/');
      return keyCategory === category && (keySlug === slug || slug.includes(keySlug) || keySlug.includes(slug));
    });
    if (matchingKey) {
      ArticleComponent = articleComponents[matchingKey];
    }
  }
  
  if (ArticleComponent) {
    return <ArticleComponent />;
  }

  // Если компонента нет, показываем заглушку
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/guide" className="hover:text-primary">Путеводитель</Link>
          <span>/</span>
          <span>{article.categoryName}</span>
          <span>/</span>
          <span>{article.title}</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">{article.title}</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-muted-foreground">
            Информация находится в разработке.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuideArticlePage;

