import type { PageContentDocument } from "@/types/pageContent";

export const ROUTES_SECTION_ORDER = [
  "heroRoutes",
  "routesHero",
  "regionsDay",
  "verified",
  "process",
  "photographers",
] as const;

export const routesPageDefaults: PageContentDocument = {
  version: 1,
  sectionOrder: [...ROUTES_SECTION_ORDER],
  sections: {
    heroRoutes: {
      visible: true,
      fields: {
        mobileTitleAccent: "Лучшие",
        mobileTitleRest: "маршруты",
        cards: [
          {
            id: "sochi",
            title: "Сочи",
            description:
              "Черноморский курорт с субтропическим климатом, горнолыжными склонами, пляжами и богатой историей. Идеальное место для отдыха в любое время года.",
            image: "",
            hoverImage: "",
            href: "/routes/17",
            routePageId: "",
          },
          {
            id: "kazan",
            title: "Казань",
            description:
              "Тысячелетний город, где встречаются Восток и Запад. Современные комплексы и древние мечети создают неповторимый облик города.",
            image: "",
            hoverImage: "",
            href: "/routes/18",
            routePageId: "",
          },
          {
            id: "rostov",
            title: "Ростов-на-Дону",
            description:
              "Южная столица России, город на берегу Дона с богатой историей и архитектурными памятниками.",
            image: "",
            hoverImage: "",
            href: "/routes/14",
            routePageId: "",
          },
          {
            id: "moscow",
            title: "Москва",
            description:
              "Столица России с богатой историей, архитектурными памятниками, музеями мирового уровня и динамичной культурной жизнью.",
            image: "",
            hoverImage: "",
            href: "/routes/list",
            routePageId: "",
          },
          {
            id: "spb",
            title: "Санкт-Петербург",
            description:
              "Северная столица с великолепной архитектурой, дворцами, музеями и белыми ночами. Культурное сердце России.",
            image: "",
            hoverImage: "",
            href: "/routes/list",
            routePageId: "",
          },
        ],
      },
    },
    routesHero: {
      visible: true,
      fields: {
        titleLine1: "Создавайте свои",
        titleLine2: "истории с TudaSuda",
        videoUrl: "",
        advantages: [
          {
            number: "50",
            title: "готовых маршрутов для путешествий",
            description:
              "Подробные маршруты по самым интересным местам России, проверенные опытными путешественниками и журналистами",
          },
          {
            number: "108",
            title: "туров по регионам за 4 года",
            description:
              "Более ста проверенных туров по всем уголкам нашей страны с детальными отзывами и рекомендациями",
          },
          {
            number: "250+",
            title: "блогеров и журналистов",
            description:
              "Наша команда состоит из профессиональных тревел-блогеров, журналистов и экспертов по путешествиям",
          },
        ],
      },
    },
    regionsDay: {
      visible: true,
      fields: {
        titlePrefix: "Make Your ",
        titleAccent: "DAY",
        items: [
          {
            id: "arkh",
            kind: "custom",
            name: "Архангельская область",
            image: "",
            rating: 9.3,
            href: "/routes/list",
            refId: "",
          },
          {
            id: "murm",
            kind: "custom",
            name: "Мурманская область",
            image: "",
            rating: 9.3,
            href: "/routes/list",
            refId: "",
          },
          {
            id: "hmao",
            kind: "custom",
            name: "ХМАО - Югра",
            image: "",
            rating: 9.9,
            href: "/routes/list",
            refId: "",
          },
          {
            id: "kalin",
            kind: "custom",
            name: "Калининградская область",
            image: "",
            rating: 9.3,
            href: "/routes/list",
            refId: "",
          },
          {
            id: "kras",
            kind: "custom",
            name: "Краснодарский край",
            image: "",
            rating: 10,
            href: "/routes/list",
            refId: "",
          },
          {
            id: "msk",
            kind: "custom",
            name: "Москва",
            image: "",
            rating: 9.5,
            href: "/routes/list",
            refId: "",
          },
          {
            id: "spb",
            kind: "custom",
            name: "Санкт-Петербург",
            image: "",
            rating: 9.7,
            href: "/routes/list",
            refId: "",
          },
          {
            id: "kazan",
            kind: "custom",
            name: "Казань",
            image: "",
            rating: 9.4,
            href: "/routes/list",
            refId: "",
          },
          {
            id: "novg",
            kind: "custom",
            name: "Великий Новгород",
            image: "",
            rating: 9.2,
            href: "/routes/list",
            refId: "",
          },
        ],
      },
    },
    verified: {
      visible: true,
      fields: {
        badgeLeft: "Проверено",
        badgeRight: "TudaSuda",
        title: "Готовые маршруты для путешествий",
        description:
          "Проверенные тревел-блогерами и журналистами маршруты по всей России. Каждый маршрут включает подробную информацию о достопримечательностях и советы от опытных путешественников.",
        ctaLabel: "Все маршруты",
        ctaHref: "/routes/list",
        polaroids: [],
      },
    },
    process: {
      visible: true,
      fields: {
        title:
          "Мы анализируем пользователей, общаемся с блогерами, чтобы собирать только лучшие маршруты",
        titleColor: "",
        paragraph:
          "Хотите узнавать о новых трендах раньше всех? Подписывайтесь на наш Instagram!",
        paragraphColor: "",
        ctaLabel: "Перейти в Instagram",
        ctaHref: "https://instagram.com/tudasuda",
        image: "",
        bottomText:
          "Если у вас было яркое путешествие, пишите нам в Instagram, и мы можем сделать про вас блог или сделать из вашего маршрута статью.",
        bottomColor: "",
      },
    },
    photographers: {
      visible: true,
      fields: {
        eyebrow: "Photographers",
        title: "Наши фотографы",
        subtitle:
          "Живые кадры, реальная Россия и авторские точки зрения — выбирай, чьи фото вдохновляют.",
        titleColor: "",
        subtitleColor: "",
        eyebrowColor: "",
        items: [
          {
            name: "Андрей Белавин",
            handle: "@ted.ns",
            avatar: "",
            image: "",
            href: "",
          },
          {
            name: "Сергей Шандин",
            handle: "@pictotravel",
            avatar: "",
            image: "",
            href: "",
          },
          {
            name: "Георгий Шпикалов",
            handle: "@george_shpikalov",
            avatar: "",
            image: "",
            href: "",
          },
          {
            name: "Сергей Крылов",
            handle: "@skrylov_official",
            avatar: "",
            image: "",
            href: "",
          },
          {
            name: "Константин Парфеньев",
            handle: "@parfenevk",
            avatar: "",
            image: "",
            href: "",
          },
          {
            name: "Дмитрий Огнев",
            handle: "@timonich",
            avatar: "",
            image: "",
            href: "",
          },
        ],
      },
    },
  },
};
