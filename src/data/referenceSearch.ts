// Данные для поиска по справочной поездов
export interface ReferenceArticle {
  title: string;
  path: string;
  keywords: string[];
  category: string;
}

export const trainsArticles: ReferenceArticle[] = [
  // Покупка ж/д билета
  {
    title: "Документы для покупки билетов",
    path: "/reference/trains/documents-for-purchase",
    keywords: ["документы", "покупка", "билет", "паспорт", "удостоверение"],
    category: "Покупка ж/д билета"
  },
  {
    title: "Как купить ж/д билет",
    path: "/reference/trains/how-to-buy",
    keywords: ["купить", "покупка", "билет", "заказ", "оформление"],
    category: "Покупка ж/д билета"
  },
  {
    title: "Как оплатить ж/д билет",
    path: "/reference/trains/how-to-pay",
    keywords: ["оплата", "платеж", "карта", "билет", "деньги"],
    category: "Покупка ж/д билета"
  },
  {
    title: "Как оплатить билет позже",
    path: "/reference/trains/pay-later",
    keywords: ["оплата", "позже", "отложить", "билет", "время"],
    category: "Покупка ж/д билета"
  },
  {
    title: "Как сделать предзаказ ж/д билетов",
    path: "/reference/trains/pre-order",
    keywords: ["предзаказ", "забронировать", "билет", "заранее"],
    category: "Покупка ж/д билета"
  },
  {
    title: "Что делать, если билетов нет",
    path: "/reference/trains/no-tickets",
    keywords: ["нет билетов", "билеты закончились", "альтернатива", "другая дата"],
    category: "Покупка ж/д билета"
  },
  {
    title: "Как получить ж/д билет",
    path: "/reference/trains/how-to-get-ticket",
    keywords: ["получить", "билет", "касса", "терминал", "электронный"],
    category: "Покупка ж/д билета"
  },
  {
    title: "Как получить билет в печатном виде",
    path: "/reference/trains/printed-ticket",
    keywords: ["печатный", "бланк", "распечатать", "билет", "касса"],
    category: "Покупка ж/д билета"
  },
  {
    title: "Автоматический ввод данных пассажиров",
    path: "/reference/trains/auto-fill-passenger-data",
    keywords: ["автозаполнение", "данные", "пассажир", "профиль"],
    category: "Покупка ж/д билета"
  },
  
  // Вопросы после покупки
  {
    title: "Электронная регистрация",
    path: "/reference/trains/electronic-registration",
    keywords: ["электронная регистрация", "эл регистрация", "регистрация", "посадочный купон", "электронный билет"],
    category: "Вопросы после покупки"
  },
  {
    title: "Можно ли что-то изменить в билете после оплаты",
    path: "/reference/trains/change-after-payment",
    keywords: ["изменить", "билет", "после оплаты", "данные", "исправить"],
    category: "Вопросы после покупки"
  },
  {
    title: "Что нужно для посадки в поезд",
    path: "/reference/trains/what-needed-for-boarding",
    keywords: ["посадка", "поезд", "документы", "билет", "посадочный купон"],
    category: "Вопросы после покупки"
  },
  {
    title: "Как вернуть билет на поезд",
    path: "/reference/trains/how-to-return-ticket",
    keywords: ["вернуть", "возврат", "билет", "сдать", "деньги"],
    category: "Вопросы после покупки"
  },
  
  // Частые вопросы
  {
    title: "Как узнать расписание, маршрут, график поезда",
    path: "/reference/trains/train-schedule",
    keywords: ["расписание", "маршрут", "график", "поезд", "время"],
    category: "Частые вопросы"
  },
  {
    title: "Как узнать, есть ли билеты на поезд и сколько они стоят",
    path: "/reference/trains/check-tickets-availability",
    keywords: ["наличие", "билеты", "цена", "стоимость", "проверить"],
    category: "Частые вопросы"
  },
  {
    title: "Для чего нужен профиль TudaSuda",
    path: "/reference/trains/profile-purpose",
    keywords: ["профиль", "личный кабинет", "аккаунт", "регистрация"],
    category: "Частые вопросы"
  },
  {
    title: "Что делать, если оплата пластиковой картой не проходит",
    path: "/reference/trains/card-payment-failed",
    keywords: ["оплата", "карта", "не проходит", "ошибка", "платеж"],
    category: "Частые вопросы"
  },
  {
    title: "Почему деньги возвращаются на карту, которой оплачен заказ",
    path: "/reference/trains/refund-to-card",
    keywords: ["возврат", "деньги", "карта", "возврат средств"],
    category: "Частые вопросы"
  },
  {
    title: "Можно ли выкупить целое купе",
    path: "/reference/trains/buy-whole-compartment",
    keywords: ["купе", "целое", "выкупить", "вагон"],
    category: "Частые вопросы"
  },
  {
    title: "Как купить билеты на скорые пригородные поезда",
    path: "/reference/trains/suburban-trains",
    keywords: ["пригородные", "электричка", "скорые", "поезда"],
    category: "Частые вопросы"
  },
  {
    title: "Как провезти в поезде спортивный или туристический инвентарь",
    path: "/reference/trains/sports-equipment",
    keywords: ["спортивный инвентарь", "багаж", "провезти", "вещи"],
    category: "Частые вопросы"
  },
  {
    title: "Как купить дешёвые ж/д билеты",
    path: "/reference/trains/cheap-tickets",
    keywords: ["дешевые", "билеты", "скидка", "экономия", "цена"],
    category: "Частые вопросы"
  },
  {
    title: "Что делать при отсутствии, замене или утере паспорта",
    path: "/reference/trains/passport-issues",
    keywords: ["паспорт", "утеря", "замена", "документы", "отсутствие"],
    category: "Частые вопросы"
  },
  
  // Правила перевозки
  {
    title: "Правила заказа ж/д билетов",
    path: "/reference/trains/ticket-order-rules",
    keywords: ["правила", "заказ", "билеты", "условия"],
    category: "Правила перевозки и нормативные документы"
  },
  {
    title: "Льготы для детей в поездах",
    path: "/reference/trains/children-benefits",
    keywords: ["дети", "льготы", "скидка", "ребенок"],
    category: "Правила перевозки и нормативные документы"
  },
  {
    title: "Правила перевозки багажа",
    path: "/reference/trains/luggage-rules",
    keywords: ["багаж", "вещи", "правила", "перевозка", "вес"],
    category: "Правила перевозки и нормативные документы"
  },
  {
    title: "Правила перевозки животных в поезде",
    path: "/reference/trains/animals-rules",
    keywords: ["животные", "собака", "кошка", "перевозка", "правила"],
    category: "Правила перевозки и нормативные документы"
  },
  {
    title: "Нормативные акты",
    path: "/reference/trains/regulatory-acts",
    keywords: ["нормативные акты", "закон", "правила", "документы"],
    category: "Правила перевозки и нормативные документы"
  },
  {
    title: "Публичная оферта раздела Ж/д билеты",
    path: "/reference/trains/public-offer",
    keywords: ["оферта", "договор", "условия", "правила"],
    category: "Правила перевозки и нормативные документы"
  },
  
  // О поездах
  {
    title: "Сапсан",
    path: "/reference/trains/sapsan",
    keywords: ["сапсан", "скоростной", "поезд"],
    category: "О поездах"
  },
  {
    title: "Какие бывают вагоны и поезда",
    path: "/reference/trains/train-types",
    keywords: ["вагоны", "типы", "поезда", "плацкарт", "купе", "СВ"],
    category: "О поездах"
  },
  {
    title: "Схемы вагонов ЖД",
    path: "/reference/trains/carriage-schemes",
    keywords: ["схемы", "вагоны", "расположение", "места"],
    category: "О поездах"
  },
  {
    title: "Схемы составов ЖД и расположение вагонов",
    path: "/reference/trains/train-composition-schemes",
    keywords: ["состав", "вагоны", "расположение", "схема"],
    category: "О поездах"
  },
  
  // Полезные статьи
  {
    title: "Сезонные коэффициенты РЖД",
    path: "/reference/trains/seasonal-coefficients",
    keywords: ["сезонные", "коэффициенты", "цена", "сезон"],
    category: "Полезные статьи"
  },
  {
    title: "Как добраться в Крым на поезде",
    path: "/reference/trains/crimea-by-train",
    keywords: ["крым", "поезд", "как добраться"],
    category: "Полезные статьи"
  },
  {
    title: "Сроки продаж билетов",
    path: "/reference/trains/ticket-sales-periods",
    keywords: ["сроки", "продажа", "билеты", "когда"],
    category: "Полезные статьи"
  },
  {
    title: "Билет на бланке",
    path: "/reference/trains/ticket-on-form",
    keywords: ["бланк", "билет", "печатный"],
    category: "Полезные статьи"
  },
  {
    title: "Поезд в Новый год. Идеи путешествий на новогодние праздники",
    path: "/reference/trains/new-year-travel",
    keywords: ["новый год", "праздники", "путешествие"],
    category: "Полезные статьи"
  },
  {
    title: "Куда поехать на майские праздники",
    path: "/reference/trains/may-holidays",
    keywords: ["майские", "праздники", "куда поехать"],
    category: "Полезные статьи"
  },
  {
    title: "Как купить билет на поезд: наши советы",
    path: "/reference/trains/buy-ticket-tips",
    keywords: ["советы", "как купить", "билет"],
    category: "Полезные статьи"
  },
  {
    title: "Где ходят поезда с наклоняющимися при повороте вагонами",
    path: "/reference/trains/tilting-carriages",
    keywords: ["наклоняющиеся", "вагоны", "поворот"],
    category: "Полезные статьи"
  },
  {
    title: "Необычные железные дороги",
    path: "/reference/trains/unusual-railways",
    keywords: ["необычные", "железные дороги"],
    category: "Полезные статьи"
  },
  {
    title: "Часовые пояса и их связь с ЖД",
    path: "/reference/trains/time-zones",
    keywords: ["часовые пояса", "время", "разница"],
    category: "Полезные статьи"
  },
  {
    title: "Интересные факты о ж/д",
    path: "/reference/trains/railway-facts",
    keywords: ["факты", "интересное", "ж/д"],
    category: "Полезные статьи"
  },
  {
    title: "Наличие ж/д билетов",
    path: "/reference/trains/ticket-availability",
    keywords: ["наличие", "билеты", "проверить"],
    category: "Полезные статьи"
  },
  {
    title: "История железных дорог России",
    path: "/reference/trains/russian-railways-history",
    keywords: ["история", "железные дороги", "россия"],
    category: "Полезные статьи"
  },
  {
    title: "Вокзалы России",
    path: "/reference/trains/russian-stations",
    keywords: ["вокзалы", "россия", "станции"],
    category: "Полезные статьи"
  },
  {
    title: "Вокзалы Москвы",
    path: "/reference/trains/moscow-stations",
    keywords: ["вокзалы", "москва", "станции"],
    category: "Полезные статьи"
  },
  {
    title: "Вокзалы Санкт-Петербурга",
    path: "/reference/trains/spb-stations",
    keywords: ["вокзалы", "санкт-петербург", "спб", "станции"],
    category: "Полезные статьи"
  },
  {
    title: "Поезда с вагонами-ресторанами",
    path: "/reference/trains/restaurant-cars",
    keywords: ["ресторан", "вагон", "питание", "еда"],
    category: "Полезные статьи"
  },
  {
    title: "Как поесть в поезде: все способы",
    path: "/reference/trains/eating-on-train",
    keywords: ["еда", "питание", "поезд", "ресторан"],
    category: "Полезные статьи"
  }
];

