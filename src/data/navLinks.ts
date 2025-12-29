import { createSlug } from "@/utils/slugify";

export interface NavLinkItem {
  label: string;
  href: string;
}

// Популярные маршруты (топ-5)
export const popularRoutes: NavLinkItem[] = [
  { label: "Краснодарский край", href: "/routes/9" },
  { label: "Иркутск и Байкал", href: "/routes/28" },
  { label: "Камчатка", href: "/routes/38" },
  { label: "Крым", href: "/routes/15" },
  { label: "Сочи и окрестности", href: "/routes/17" },
];

// Популярные темы из справочной (3 основных раздела)
export const faqTopics: NavLinkItem[] = [
  { label: "ЖД", href: "/reference#trains" },
  { label: "Авиа", href: "/reference#flights" },
  { label: "Автобус", href: "/reference#buses" },
];

// Популярные темы из путеводителя (топ-10)
export const guidesList: NavLinkItem[] = [
  { label: "Что делать, если я заболел в дороге?", href: `/guide/passenger/${createSlug("Что делать, если я заболел в дороге?")}` },
  { label: "Что делать, если украли документы?", href: `/guide/passenger/${createSlug("Что делать, если украли документы?")}` },
  { label: "По какому документу брать билет?", href: `/guide/passenger/${createSlug("По какому документу брать билет?")}` },
  { label: "Где искать потерянные вещи?", href: `/guide/passenger/${createSlug("Где искать потерянные вещи?")}` },
  { label: "Как работает страховка в билете?", href: `/guide/passenger/${createSlug("Как работает страховка в билете?")}` },
  { label: "Как перевезти животное?", href: `/guide/passenger/${createSlug("Как перевезти животное?")}` },
  { label: "Что делать, если опоздали на самолет?", href: `/guide/passenger/${createSlug("Что делать, если опоздали на самолет?")}` },
  { label: "Как летать с маленьким ребёнком?", href: `/guide/passenger/${createSlug("Как летать с маленьким ребёнком?")}` },
  { label: "FAQ про здоровье", href: `/guide/analysis/${createSlug("FAQ про здоровье")}` },
  { label: "Москва", href: `/guide/russia/${createSlug("Москва")}` },
];

