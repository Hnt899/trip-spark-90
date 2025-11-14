// Мок-данные для страницы блога
import trainInterior from "@/assets/train-interior.jpg";
import heroTrain from "@/assets/hero-train.jpg";
import saintPetersburg from "@/assets/saint-petersburg.jpg";
import moscow from "@/assets/moscow.jpg";
import kazan from "@/assets/kazan.jpg";
import novgorod from "@/assets/novgorod.jpg";
import karelia from "@/assets/karelia.jpg";
import interfaceImage from "@/assets/интерфейс.png";
import routesImage from "@/assets/маршруты.png";
import discountImage from "@/assets/скидка.png";
import mobileAppImage from "@/assets/приложение.png";
import russiaRoutesImage from "@/assets/россия м.png";
import loyaltyImage from "@/assets/лояльность.png";
import whiteNightsImage from "@/assets/белые ночи.jpg";
import exhibitionImage from "@/assets/выставка.jpeg";
import jazzImage from "@/assets/джаз.jpg";
import foodImage from "@/assets/еда.jpg";
import rockImage from "@/assets/рок.jpg";
import theaterImage from "@/assets/ткатральный фестиаль.jpg";
import flowersImage from "@/assets/цветы.jpg";
import sapsanImage from "@/assets/сапсан.jpeg";
import infrastructureImage from "@/assets/инфаструктура.png";
import ecoImage from "@/assets/эко.jpg";
import vladivostok1 from "@/assets/владивосток 1.jpg";
import vladivostok2 from "@/assets/владивосток 2.jpg";
import vladivostok3 from "@/assets/владивосток 3.jpg";
import vladivostok4 from "@/assets/владивосток 4.jpg";
import vladivostok5 from "@/assets/владивосток 5.jpg";
import kaliningrad1 from "@/assets/калиниград 1.jpg";
import kaliningrad2 from "@/assets/калиниград 2.jpg";
import kaliningrad3 from "@/assets/калиниград 3.jpg";
import kaliningrad4 from "@/assets/калиниград 4.jpg";
import kaliningrad5 from "@/assets/калиниград 5.jpg";
import baikal1 from "@/assets/байкал1.jpg";
import baikal2 from "@/assets/байкал 2.jpg";
import baikal3 from "@/assets/байкал 3.jpg";
import baikal4 from "@/assets/байкал 4.jpg";
import baikal5 from "@/assets/байкал 5.jpg";
import { createSlug } from "@/utils/slugify";

export interface InfoCardData {
  id: string;
  type: string;
  title: string;
  description: string;
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText?: string;
  url?: string;
}

export interface EventData {
  id: string;
  title: string;
  description: string;
  city: string;
  date: string;
  image: string;
  url: string;
  maskType: 'left' | 'right' | 'none';
  textPosition: 'top' | 'bottom' | 'left' | 'right';
}

export interface StoryData {
  id: string;
  city: string;
  text: string;
  images: string[];
}

export interface TipData {
  id: string;
  title: string;
  description: string;
  image: string;
  url?: string;
}

// Блок 1: Информационные карточки
export const infoCards: InfoCardData[] = [
  {
    id: '1',
    type: 'Обновление сайта',
    title: 'Новый дизайн интерфейса',
    description: 'Мы обновили дизайн сайта для более удобного поиска билетов и планирования путешествий. Теперь всё стало ещё проще и быстрее.',
    image: interfaceImage,
  },
  {
    id: '2',
    type: 'Важно',
    title: 'Изменения в расписании поездов',
    description: 'Обратите внимание на изменения в расписании некоторых маршрутов. Проверяйте актуальное время.',
    image: routesImage,
  },
  {
    id: '3',
    type: 'Новость',
    title: 'Скидки на билеты до конца месяца',
    description: 'Специальное предложение: скидка 15% на все билеты при покупке до конца месяца. Успейте забронировать поездку!',
    image: discountImage,
  },
];

// Блок 2: Новости сайта
export const siteNews: NewsItem[] = [
  {
    id: '1',
    title: 'Сайт адаптирован под мобильные устройства',
    description: 'Теперь наш сайт полностью адаптирован для удобного использования на смартфонах и планшетах. Покупайте билеты, планируйте поездки и управляйте бронированиями прямо с телефона. Удобный интерфейс, быстрая загрузка и все функции доступны на любом устройстве. Оптимизированный дизайн для комфортной работы на маленьких экранах.',
    image: mobileAppImage,
    buttonText: 'Подробнее',
  },
  {
    id: '2',
    title: 'Новые маршруты по России',
    description: 'Добавлены маршруты в Карелию, на Алтай и в другие популярные направления. Откройте для себя новые места! Теперь вы можете добраться до самых живописных уголков нашей страны с комфортом. Регулярные рейсы, удобное расписание и выгодные цены. Планируйте свои путешествия заранее и экономьте до 30% на билетах.',
    image: russiaRoutesImage,
    buttonText: 'Подписаться',
  },
  {
    id: '3',
    title: 'Система лояльности',
    description: 'Накопительные баллы за каждую поездку. Обменивайте их на скидки и бесплатные билеты. Чем больше вы путешествуете, тем больше бонусов получаете. Участвуйте в специальных акциях, получайте привилегии и эксклюзивные предложения. Начните копить баллы уже сегодня и получите первый подарок после третьей поездки.',
    image: loyaltyImage,
    buttonText: 'Узнать больше',
  },
];

// Блок 3: Мероприятия
export const events: EventData[] = [
  {
    id: '1',
    title: 'Фестиваль "Белые ночи"',
    description: 'Крупнейший музыкальный фестиваль в Санкт-Петербурге',
    city: 'Санкт-Петербург',
    date: '15-20 июня',
    image: whiteNightsImage,
    url: 'https://example.com/event1',
    maskType: 'none',
    textPosition: 'bottom',
  },
  {
    id: '2',
    title: 'Выставка современного искусства',
    description: 'Работы известных художников со всего мира',
    city: 'Москва',
    date: '10-25 мая',
    image: exhibitionImage,
    url: 'https://example.com/event2',
    maskType: 'left',
    textPosition: 'left',
  },
  {
    id: '3',
    title: 'Джазовый концерт',
    description: 'Вечер джазовой музыки в историческом центре',
    city: 'Казань',
    date: '5 мая',
    image: jazzImage,
    url: 'https://example.com/event3',
    maskType: 'none',
    textPosition: 'left',
  },
  {
    id: '4',
    title: 'Театральный фестиваль',
    description: 'Лучшие спектакли сезона',
    city: 'Екатеринбург',
    date: '12-18 мая',
    image: theaterImage,
    url: 'https://example.com/event4',
    maskType: 'none',
    textPosition: 'top',
  },
  {
    id: '5',
    title: 'Кулинарный мастер-класс',
    description: 'Учимся готовить блюда русской кухни',
    city: 'Новгород',
    date: '8 мая',
    image: foodImage,
    url: 'https://example.com/event5',
    maskType: 'none',
    textPosition: 'right',
  },
  {
    id: '6',
    title: 'Фестиваль цветов',
    description: 'Весенний праздник в парке',
    city: 'Сочи',
    date: '20-22 мая',
    image: flowersImage,
    url: 'https://example.com/event6',
    maskType: 'right',
    textPosition: 'right',
  },
  {
    id: '7',
    title: 'Рок-концерт под открытым небом',
    description: 'Выступления популярных групп',
    city: 'Краснодар',
    date: '25 мая',
    image: rockImage,
    url: 'https://example.com/event7',
    maskType: 'none',
    textPosition: 'bottom',
  },
];

// Блок 4: Новости РЖД
export const rzdNews: NewsItem[] = [
  {
    id: '1',
    title: 'Новые скоростные поезда "Сапсан"',
    description: 'Расширение маршрутной сети скоростных поездов. Теперь "Сапсан" курсирует по новым направлениям.',
    image: sapsanImage,
    buttonText: 'Читать новость',
  },
  {
    id: '2',
    title: 'Обновление инфраструктуры вокзалов',
    description: 'Реконструкция крупнейших железнодорожных вокзалов для повышения комфорта пассажиров.',
    image: infrastructureImage,
    buttonText: 'Читать новость',
  },
  {
    id: '3',
    title: 'Экологические инициативы РЖД',
    description: 'Переход на экологичные виды топлива и внедрение энергосберегающих технологий.',
    image: ecoImage,
    buttonText: 'Читать новость',
  },
];

// Блок 5: Сторисы
export const stories: StoryData[] = [
  {
    id: '1',
    city: 'Санкт-Петербург',
    text: 'Путешествие по Северной столице',
    images: [saintPetersburg, moscow, kazan, novgorod, karelia],
  },
  {
    id: '2',
    city: 'Москва',
    text: 'Выходные в столице',
    images: [saintPetersburg, moscow, kazan, novgorod, karelia],
  },
  {
    id: '3',
    city: 'Казань',
    text: 'Красота Татарстана',
    images: [saintPetersburg, moscow, kazan, novgorod, karelia],
  },
  {
    id: '4',
    city: 'Сочи',
    text: 'Отдых на Чёрном море',
    images: [saintPetersburg, moscow, kazan, novgorod, karelia],
  },
  {
    id: '5',
    city: 'Екатеринбург',
    text: 'Уральские просторы',
    images: [saintPetersburg, moscow, kazan, novgorod, karelia],
  },
  {
    id: '6',
    city: 'Новгород',
    text: 'Древняя Русь',
    images: [saintPetersburg, moscow, kazan, novgorod, karelia],
  },
  {
    id: '7',
    city: 'Краснодар',
    text: 'Южная жемчужина',
    images: [saintPetersburg, moscow, kazan, novgorod, karelia],
  },
  {
    id: '8',
    city: 'Владивосток',
    text: 'Тихоокеанское побережье',
    images: [vladivostok1, vladivostok2, vladivostok3, vladivostok4, vladivostok5],
  },
  {
    id: '9',
    city: 'Калининград',
    text: 'Балтийское море',
    images: [kaliningrad4,kaliningrad1, kaliningrad2, kaliningrad3, kaliningrad5],
  },
  {
    id: '10',
    city: 'Иркутск',
    text: 'Байкал ждёт',
    images: [baikal5, baikal1, baikal2, baikal3, baikal4 ],
  },
];

// Блок 6: Советы
export const tips: TipData[] = [
  {
    id: '1',
    title: 'Когда покупать билеты на поезда?',
    description: 'Узнайте оптимальное время для покупки билетов, чтобы сэкономить и гарантировать наличие мест. Советы по раннему бронированию и специальным предложениям.',
    image: trainInterior,
    url: `/guide/passenger/${createSlug("Когда покупать билеты на поезда?")}`,
  },
  {
    id: '2',
    title: 'Как перевезти животное?',
    description: 'Полное руководство по перевозке домашних животных в поезде: документы, правила, требования к перевозке и советы для комфортного путешествия с питомцем.',
    image: heroTrain,
    url: `/guide/passenger/${createSlug("Как перевезти животное?")}`,
  },
  {
    id: '3',
    title: 'Как летать с маленьким ребёнком?',
    description: 'Практические советы для родителей: что взять с собой, как подготовить ребёнка к полёту, особенности перелёта с детьми и как сделать путешествие комфортным.',
    image: saintPetersburg,
    url: `/guide/passenger/${createSlug("Как летать с маленьким ребёнком?")}`,
  },
  {
    id: '4',
    title: 'Что делать, если я заболел в дороге?',
    description: 'Важная информация о том, как получить медицинскую помощь во время путешествия, какие документы нужны и куда обращаться в экстренной ситуации.',
    image: moscow,
    url: `/guide/passenger/${createSlug("Что делать, если я заболел в дороге?")}`,
  },
];

