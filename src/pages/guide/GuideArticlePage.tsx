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

// Разборы
import Virusiantibiotiki from "./articles/analysis/Virusiantibiotiki";
import Faqprozdorove from "./articles/analysis/Faqprozdorove";
import Plemenaamazonki from "./articles/analysis/Plemenaamazonki";
import Kakoemorevybrat from "./articles/analysis/Kakoemorevybrat";
import PoletovbolsheAviaproisshestviy from "./articles/analysis/PoletovbolsheAviaproisshestviy";
import Meteorologiyaipolety from "./articles/analysis/Meteorologiyaipolety";
import Meditsinskayastrahovka from "./articles/analysis/Meditsinskayastrahovka";
import Avtorskietury from "./articles/analysis/Avtorskietury";
import Pochemumyputeshestvuem from "./articles/analysis/Pochemumyputeshestvuem";
import Kakdoytidosevernogo from "./articles/analysis/Kakdoytidosevernogo";
import Poezdkilyudeysogranicheniyami from "./articles/analysis/Poezdkilyudeysogranicheniyami";

// Транспорт
import Pitanievagona from "./articles/transport/Pitanievagona";
import Ep2dm from "./articles/transport/Ep2dm";
import Novyeplatskarty1Vm from "./articles/transport/Novyeplatskarty1Vm";
import Novyeplatskartyt from "./articles/transport/Novyeplatskartyt";
import Kapsulnyyvagon from "./articles/transport/Kapsulnyyvagon";
import PlatskartElochka from "./articles/transport/PlatskartElochka";
import Raznyeelektrichki from "./articles/transport/Raznyeelektrichki";
import Kakbyliustroenyparovozy from "./articles/transport/Kakbyliustroenyparovozy";
import Retropoezdsparovozom from "./articles/transport/Retropoezdsparovozom";
import Lastochki from "./articles/transport/Lastochki";
import Shtabnoyvagon from "./articles/transport/Shtabnoyvagon";
import Vkabinemashinista from "./articles/transport/Vkabinemashinista";
import Yahromaer2k980 from "./articles/transport/Yahromaer2k980";
import Marshrutizatsiyanazhd from "./articles/transport/Marshrutizatsiyanazhd";
import VagonElektrostantsiya from "./articles/transport/VagonElektrostantsiya";
import Lokomotivy from "./articles/transport/Lokomotivy";
import Lip from "./articles/transport/Lip";
import Aeroekspress from "./articles/transport/Aeroekspress";
import Mc21 from "./articles/transport/Mc21";
import Sobakivaeroportu from "./articles/transport/Sobakivaeroportu";
import Aeroportvnukovo from "./articles/transport/Aeroportvnukovo";
import Ekipazhperedvyletom from "./articles/transport/Ekipazhperedvyletom";
import Kakrabotaetdispetcher from "./articles/transport/Kakrabotaetdispetcher";
import Pokakimpravilamletit from "./articles/transport/Pokakimpravilamletit";
import Protsentryupravleniya from "./articles/transport/Protsentryupravleniya";
import Prosluzhbyterminala from "./articles/transport/Prosluzhbyterminala";
import Medsluzhbaaeroporta from "./articles/transport/Medsluzhbaaeroporta";
import Ty214 from "./articles/transport/Ty214";
import Avtomatizatsiyahel from "./articles/transport/Avtomatizatsiyahel";
import Zachemoblivayutsamoletpered from "./articles/transport/Zachemoblivayutsamoletpered";
import Kakposaditsamolet from "./articles/transport/Kakposaditsamolet";
import Ty144 from "./articles/transport/Ty144";
import Navigatsiyasamoleta from "./articles/transport/Navigatsiyasamoleta";
import Ty154 from "./articles/transport/Ty154";
import Boeing747 from "./articles/transport/Boeing747";
import An2 from "./articles/transport/An2";
import Sj100 from "./articles/transport/Sj100";
import Boeing737Ng from "./articles/transport/Boeing737Ng";
import AirbusA320 from "./articles/transport/AirbusA320";
import Evropeyskayaavtobusnayakompaniya from "./articles/transport/Evropeyskayaavtobusnayakompaniya";
import Progorodskoytransport from "./articles/transport/Progorodskoytransport";
import Provoditeleyavtobusov from "./articles/transport/Provoditeleyavtobusov";
import Otechestvennyemikroavtobusy from "./articles/transport/Otechestvennyemikroavtobusy";
import Ezdovyesobaki from "./articles/transport/Ezdovyesobaki";

// Надолго в другую страну
import Argentina from "./articles/long-term/Argentina";
import Armeniya from "./articles/long-term/Armeniya";
import Bali from "./articles/long-term/Bali";
import Braziliya from "./articles/long-term/Braziliya";
import Gruziya from "./articles/long-term/Gruziya";
import Germaniya from "./articles/long-term/Germaniya";
import Dubay from "./articles/long-term/Dubay";
import Egipet from "./articles/long-term/Egipet";
import Ispaniya from "./articles/long-term/Ispaniya";
import Kazahstan from "./articles/long-term/Kazahstan";
import KyrgyzstanKirgiziya from "./articles/long-term/KyrgyzstanKirgiziya";
import Kolumbiya from "./articles/long-term/Kolumbiya";
import KostaRika from "./articles/long-term/KostaRika";
import Meksika from "./articles/long-term/Meksika";
import Portugaliya from "./articles/long-term/Portugaliya";
import Serbiya from "./articles/long-term/Serbiya";
import Tailand from "./articles/long-term/Tailand";
import Tayvan from "./articles/long-term/Tayvan";
import Uzbekistan from "./articles/long-term/Uzbekistan";
import Frantsiya from "./articles/long-term/Frantsiya";
import Chernogoriya from "./articles/long-term/Chernogoriya";
import ShriLanka from "./articles/long-term/ShriLanka";
import Yuzhnayakoreya from "./articles/long-term/Yuzhnayakoreya";

// Первый раз
import Planery from "./articles/first-time/Planery";
import Gastroturizmvrossii from "./articles/first-time/Gastroturizmvrossii";
import Gastrotury from "./articles/first-time/Gastrotury";
import Kakvzoytinaeverest from "./articles/first-time/Kakvzoytinaeverest";
import Namototsikle from "./articles/first-time/Namototsikle";
import Kakvstatnagornye from "./articles/first-time/Kakvstatnagornye";
import Kaknachatbegat from "./articles/first-time/Kaknachatbegat";
import Kakpoytipeshkomv from "./articles/first-time/Kakpoytipeshkomv";
import Kakvpervyevstatna from "./articles/first-time/Kakvpervyevstatna";

// Фишки России
import Cheburashka from "./articles/russia-features/Cheburashka";
import Elka from "./articles/russia-features/Elka";
import Kvashenayakapusta from "./articles/russia-features/Kvashenayakapusta";
import Dalnoboyschikipozimnikam from "./articles/russia-features/Dalnoboyschikipozimnikam";
import Maslenitsa from "./articles/russia-features/Maslenitsa";
import Zavodkabelya from "./articles/russia-features/Zavodkabelya";
import Interesnyemesta from "./articles/russia-features/Interesnyemesta";
import Kosmoskakkonstruktsiya from "./articles/russia-features/Kosmoskakkonstruktsiya";
import GdeKogdaChtoraspuskaetsya from "./articles/russia-features/GdeKogdaChtoraspuskaetsya";
import Etochtozaborschevik from "./articles/russia-features/Etochtozaborschevik";
import Kakchitatnalichniki from "./articles/russia-features/Kakchitatnalichniki";

// Россия (города)
import Moscow from "./articles/russia/Moscow";
import SPB from "./articles/russia/SPB";
import Crimea from "./articles/russia/Crimea";
import Simferopol from "./articles/russia/Simferopol";
import Sevastopol from "./articles/russia/Sevastopol";
import Maykop from "./articles/russia/Maykop";
import Kazan from "./articles/russia/Kazan";
import Ekaterinburg from "./articles/russia/Ekaterinburg";
import Krasnodar from "./articles/russia/Krasnodar";
import RostovNaDonu from "./articles/russia/RostovNaDonu";
import Vladivostok from "./articles/russia/Vladivostok";
import Samara from "./articles/russia/Samara";
import NizhniyNovgorod from "./articles/russia/NizhniyNovgorod";
import Novosibirsk from "./articles/russia/Novosibirsk";
import Krasnoyarsk from "./articles/russia/Krasnoyarsk";
import Irkutsk from "./articles/russia/Irkutsk";
import Kaliningrad from "./articles/russia/Kaliningrad";
import PetropavlovskKamchatskiy from "./articles/russia/PetropavlovskKamchatskiy";
import Yakutsk from "./articles/russia/Yakutsk";
import Makhachkala from "./articles/russia/Makhachkala";
import Murmansk from "./articles/russia/Murmansk";
import Khabarovsk from "./articles/russia/Khabarovsk";
import Ryazan from "./articles/russia/Ryazan";
import Kasimov from "./articles/russia/Kasimov";
import Stavropol from "./articles/russia/Stavropol";
import Yaroslavl from "./articles/russia/Yaroslavl";
import Volgograd from "./articles/russia/Volgograd";
import Perm from "./articles/russia/Perm";
import Tyumen from "./articles/russia/Tyumen";
import Syktyvkar from "./articles/russia/Syktyvkar";
import Voronezh from "./articles/russia/Voronezh";
import Vladimir from "./articles/russia/Vladimir";
import Suzdal from "./articles/russia/Suzdal";
import Izhevsk from "./articles/russia/Izhevsk";
import Tomsk from "./articles/russia/Tomsk";
import Tula from "./articles/russia/Tula";
import Tver from "./articles/russia/Tver";
import Abakan from "./articles/russia/Abakan";
import Chelyabinsk from "./articles/russia/Chelyabinsk";
import UlanUde from "./articles/russia/UlanUde";
import Arkhangelsk from "./articles/russia/Arkhangelsk";
import Ufa from "./articles/russia/Ufa";
import GornoAltaysk from "./articles/russia/GornoAltaysk";

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
  "Как читать наличники"
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

// Россия (города)
const russiaArticles = [
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
  "Горно-Алтайск",
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

// Разборы
const virusSlug = createSlug("Вирус и антибиотики");
const faqZdravieSlug = createSlug("FAQ про здоровье");
const plemenaSlug = createSlug("Племена Амазонки");
const moreSlug = createSlug("Какое море выбрать");
const poletovSlug = createSlug("Полётов больше, авиапроисшествий — нет");
const meteorologiyaSlug = createSlug("Метеорология и полёты");
const strahovkaSlug = createSlug("Медицинская страховка");
const avtorskieSlug = createSlug("Авторские туры");
const pochemuSlug = createSlug("Почему мы путешествуем");
const polyusSlug = createSlug("Как дойти до Северного полюса");
const ogranicheniyaSlug = createSlug("Поездки людей с ограничениями по здоровью");

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
  
  // Разборы
  [`analysis/${virusSlug}`]: Virusiantibiotiki,
  [`analysis/${faqZdravieSlug}`]: Faqprozdorove,
  [`analysis/${plemenaSlug}`]: Plemenaamazonki,
  [`analysis/${moreSlug}`]: Kakoemorevybrat,
  [`analysis/${poletovSlug}`]: PoletovbolsheAviaproisshestviy,
  [`analysis/${meteorologiyaSlug}`]: Meteorologiyaipolety,
  [`analysis/${strahovkaSlug}`]: Meditsinskayastrahovka,
  [`analysis/${avtorskieSlug}`]: Avtorskietury,
  [`analysis/${pochemuSlug}`]: Pochemumyputeshestvuem,
  [`analysis/${polyusSlug}`]: Kakdoytidosevernogo,
  [`analysis/${ogranicheniyaSlug}`]: Poezdkilyudeysogranicheniyami,
  
  // Транспорт
  [`transport/${createSlug("Питание вагона")}`]: Pitanievagona,
  [`transport/${createSlug("ЭП2ДМ")}`]: Ep2dm,
  [`transport/${createSlug("Новые плацкарты 1-ВМ")}`]: Novyeplatskarty1Vm,
  [`transport/${createSlug("Новые плацкарты Т")}`]: Novyeplatskartyt,
  [`transport/${createSlug("Капсульный вагон")}`]: Kapsulnyyvagon,
  [`transport/${createSlug("Плацкарт-ёлочка")}`]: PlatskartElochka,
  [`transport/${createSlug("Разные электрички")}`]: Raznyeelektrichki,
  [`transport/${createSlug("Как были устроены паровозы")}`]: Kakbyliustroenyparovozy,
  [`transport/${createSlug("Ретропоезд с паровозом")}`]: Retropoezdsparovozom,
  [`transport/${createSlug("Ласточки")}`]: Lastochki,
  [`transport/${createSlug("Штабной вагон")}`]: Shtabnoyvagon,
  [`transport/${createSlug("В кабине машиниста")}`]: Vkabinemashinista,
  [`transport/${createSlug("Яхрома ЭР2К-980")}`]: Yahromaer2k980,
  [`transport/${createSlug("Маршрутизация на ЖД")}`]: Marshrutizatsiyanazhd,
  [`transport/${createSlug("Вагон-электростанция")}`]: VagonElektrostantsiya,
  [`transport/${createSlug("Локомотивы")}`]: Lokomotivy,
  [`transport/${createSlug("Л и П - паровозы прошлого")}`]: Lip,
  [`transport/${createSlug("Аэроэкспресс")}`]: Aeroekspress,
  [`transport/${createSlug("MC-21")}`]: Mc21,
  [`transport/${createSlug("Собаки в аэропорту")}`]: Sobakivaeroportu,
  [`transport/${createSlug("Аэропорт Внуково")}`]: Aeroportvnukovo,
  [`transport/${createSlug("Экипаж перед вылетом")}`]: Ekipazhperedvyletom,
  [`transport/${createSlug("Как работает диспетчер")}`]: Kakrabotaetdispetcher,
  [`transport/${createSlug("По каким правилам летит самолёт")}`]: Pokakimpravilamletit,
  [`transport/${createSlug("Про центры управления")}`]: Protsentryupravleniya,
  [`transport/${createSlug("Про службы терминала")}`]: Prosluzhbyterminala,
  [`transport/${createSlug("Медслужба аэропорта")}`]: Medsluzhbaaeroporta,
  [`transport/${createSlug("Ty-214")}`]: Ty214,
  [`transport/${createSlug("Автоматизация HEL")}`]: Avtomatizatsiyahel,
  [`transport/${createSlug("Зачем обливают самолёт перед вылетом?")}`]: Zachemoblivayutsamoletpered,
  [`transport/${createSlug("Как посадить самолёт?")}`]: Kakposaditsamolet,
  [`transport/${createSlug("Ty-144")}`]: Ty144,
  [`transport/${createSlug("Навигация самолёта")}`]: Navigatsiyasamoleta,
  [`transport/${createSlug("Ty-154")}`]: Ty154,
  [`transport/${createSlug("Boeing 747")}`]: Boeing747,
  [`transport/${createSlug("Ан-2")}`]: An2,
  [`transport/${createSlug("SJ-100")}`]: Sj100,
  [`transport/${createSlug("Boeing 737 NG")}`]: Boeing737Ng,
  [`transport/${createSlug("Airbus A320")}`]: AirbusA320,
  [`transport/${createSlug("Европейская автобусная компания")}`]: Evropeyskayaavtobusnayakompaniya,
  [`transport/${createSlug("Про городской транспорт")}`]: Progorodskoytransport,
  [`transport/${createSlug("Про водителей автобусов")}`]: Provoditeleyavtobusov,
  [`transport/${createSlug("Отечественные микроавтобусы")}`]: Otechestvennyemikroavtobusy,
  [`transport/${createSlug("Ездовые собаки")}`]: Ezdovyesobaki,

  // Надолго в другую страну
  [`long-term/${createSlug("Аргентина")}`]: Argentina,
  [`long-term/${createSlug("Армения")}`]: Armeniya,
  [`long-term/${createSlug("Бали")}`]: Bali,
  [`long-term/${createSlug("Бразилия")}`]: Braziliya,
  [`long-term/${createSlug("Грузия")}`]: Gruziya,
  [`long-term/${createSlug("Германия")}`]: Germaniya,
  [`long-term/${createSlug("Дубай")}`]: Dubay,
  [`long-term/${createSlug("Египет")}`]: Egipet,
  [`long-term/${createSlug("Испания")}`]: Ispaniya,
  [`long-term/${createSlug("Казахстан")}`]: Kazahstan,
  [`long-term/${createSlug("Кыргызстан (Киргизия)")}`]: KyrgyzstanKirgiziya,
  [`long-term/${createSlug("Колумбия")}`]: Kolumbiya,
  [`long-term/${createSlug("Коста-Рика")}`]: KostaRika,
  [`long-term/${createSlug("Мексика")}`]: Meksika,
  [`long-term/${createSlug("Португалия")}`]: Portugaliya,
  [`long-term/${createSlug("Сербия")}`]: Serbiya,
  [`long-term/${createSlug("Таиланд")}`]: Tailand,
  [`long-term/${createSlug("Тайвань")}`]: Tayvan,
  [`long-term/${createSlug("Узбекистан")}`]: Uzbekistan,
  [`long-term/${createSlug("Франция")}`]: Frantsiya,
  [`long-term/${createSlug("Черногория")}`]: Chernogoriya,
  [`long-term/${createSlug("Шри-Ланка")}`]: ShriLanka,
  [`long-term/${createSlug("Южная Корея")}`]: Yuzhnayakoreya,

  // Первый раз
  [`first-time/${createSlug("Планеры")}`]: Planery,
  [`first-time/${createSlug("Гастротуризм в России")}`]: Gastroturizmvrossii,
  [`first-time/${createSlug("Гастротуры")}`]: Gastrotury,
  [`first-time/${createSlug("Как взойти на Эверест")}`]: Kakvzoytinaeverest,
  [`first-time/${createSlug("На мотоцикле")}`]: Namototsikle,
  [`first-time/${createSlug("Как встать на горные лыжи")}`]: Kakvstatnagornye,
  [`first-time/${createSlug("Как начать бегать")}`]: Kaknachatbegat,
  [`first-time/${createSlug("Как пойти пешком в горы")}`]: Kakpoytipeshkomv,
  [`first-time/${createSlug("Как впервые встать на сап")}`]: Kakvpervyevstatna,

  // Фишки России
  [`russia-features/${createSlug("Чебурашка")}`]: Cheburashka,
  [`russia-features/${createSlug("Ёлка")}`]: Elka,
  [`russia-features/${createSlug("Квашеная капуста")}`]: Kvashenayakapusta,
  [`russia-features/${createSlug("Дальнобойщики по зимникам")}`]: Dalnoboyschikipozimnikam,
  [`russia-features/${createSlug("Масленица")}`]: Maslenitsa,
  [`russia-features/${createSlug("Завод кабеля")}`]: Zavodkabelya,
  [`russia-features/${createSlug("Интересные места")}`]: Interesnyemesta,
  [`russia-features/${createSlug("Космос как конструкция")}`]: Kosmoskakkonstruktsiya,
  [`russia-features/${createSlug("Где, когда, что распускается")}`]: GdeKogdaChtoraspuskaetsya,
  [`russia-features/${createSlug("Это что за борщевик")}`]: Etochtozaborschevik,
  [`russia-features/${createSlug("Как читать наличники")}`]: Kakchitatnalichniki,

  // Россия (города)
  [`russia/${createSlug("Москва")}`]: Moscow,
  [`russia/${createSlug("Санкт-Петербург")}`]: SPB,
  [`russia/${createSlug("Крым")}`]: Crimea,
  [`russia/${createSlug("Симферополь")}`]: Simferopol,
  [`russia/${createSlug("Севастополь")}`]: Sevastopol,
  [`russia/${createSlug("Майкоп")}`]: Maykop,
  [`russia/${createSlug("Казань")}`]: Kazan,
  [`russia/${createSlug("Екатеринбург")}`]: Ekaterinburg,
  [`russia/${createSlug("Краснодар")}`]: Krasnodar,
  [`russia/${createSlug("Ростов-на-Дону")}`]: RostovNaDonu,
  [`russia/${createSlug("Владивосток")}`]: Vladivostok,
  [`russia/${createSlug("Самара")}`]: Samara,
  [`russia/${createSlug("Нижний Новгород")}`]: NizhniyNovgorod,
  [`russia/${createSlug("Новосибирск")}`]: Novosibirsk,
  [`russia/${createSlug("Красноярск")}`]: Krasnoyarsk,
  [`russia/${createSlug("Иркутск")}`]: Irkutsk,
  [`russia/${createSlug("Калининград")}`]: Kaliningrad,
  [`russia/${createSlug("Петропавловск-Камчатский")}`]: PetropavlovskKamchatskiy,
  [`russia/${createSlug("Якутск")}`]: Yakutsk,
  [`russia/${createSlug("Махачкала")}`]: Makhachkala,
  [`russia/${createSlug("Мурманск")}`]: Murmansk,
  [`russia/${createSlug("Хабаровск")}`]: Khabarovsk,
  [`russia/${createSlug("Рязань")}`]: Ryazan,
  [`russia/${createSlug("Касимов")}`]: Kasimov,
  [`russia/${createSlug("Ставрополь")}`]: Stavropol,
  [`russia/${createSlug("Ярославль")}`]: Yaroslavl,
  [`russia/${createSlug("Волгоград")}`]: Volgograd,
  [`russia/${createSlug("Пермь")}`]: Perm,
  [`russia/${createSlug("Тюмень")}`]: Tyumen,
  [`russia/${createSlug("Сыктывкар")}`]: Syktyvkar,
  [`russia/${createSlug("Воронеж")}`]: Voronezh,
  [`russia/${createSlug("Владимир")}`]: Vladimir,
  [`russia/${createSlug("Суздаль")}`]: Suzdal,
  [`russia/${createSlug("Ижевск")}`]: Izhevsk,
  [`russia/${createSlug("Томск")}`]: Tomsk,
  [`russia/${createSlug("Тула")}`]: Tula,
  [`russia/${createSlug("Тверь")}`]: Tver,
  [`russia/${createSlug("Абакан")}`]: Abakan,
  [`russia/${createSlug("Челябинск")}`]: Chelyabinsk,
  [`russia/${createSlug("Улан-Удэ")}`]: UlanUde,
  [`russia/${createSlug("Архангельск")}`]: Arkhangelsk,
  [`russia/${createSlug("Уфа")}`]: Ufa,
  [`russia/${createSlug("Горно-Алтайск")}`]: GornoAltaysk,
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

