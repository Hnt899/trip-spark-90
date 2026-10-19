import type { FooterFields, SocialLink } from "@/types/footerContent";

/** Начальные соцсети — админ сможет изменить/удалить/добавить любые. */
const defaultSocials: SocialLink[] = [
  {
    id: "telegram",
    label: "Telegram",
    url: "https://t.me/ts_trip_ru",
    bgColor: "bg-[#229ED9]",
  },
  {
    id: "vk",
    label: "VK",
    url: "https://vk.ru/tstrip",
    bgColor: "bg-[#0077FF]",
  },
  {
    id: "instagram",
    label: "Instagram",
    url: "https://www.instagram.com/tstripru",
    bgColor: "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
  },
  {
    id: "dzen",
    label: "Дзен",
    url: "https://dzen.ru/tstrip",
    bgColor: "bg-black",
  },
];

export const footerDefaults: FooterFields = {
  email: "info@ts-trip.ru",
  socials: defaultSocials,
  documents: [
    { label: "Политика конфиденциальности", fileUrl: "" },
    { label: "Условия использования", fileUrl: "" },
    { label: "Оферта", fileUrl: "" },
  ],
  copyright: "© 2025 TudaSuda. Все права защищены.",
  freeText: "",
  importantLinks: [
    {
      label: "Часто задаваемые вопросы",
      url: "https://tripandfly.ru/offers_af/frequently-asked-questions",
    },
    {
      label: "Правила покупки электронных билетов",
      url: "https://tripandfly.ru/offers_af/booking-and-payment-rules-af",
    },
    {
      label: "Правила обмена и возврата электронных билетов",
      url: "https://tripandfly.ru/offers_af/rules-for-the-exchange-and-return-of-electronic-tickets-af",
    },
  ],
};

export function mergeFooter(
  defaults: FooterFields,
  override: Partial<FooterFields> | null | undefined
): FooterFields {
  if (!override) return defaults;

  const socials =
    Array.isArray(override.socials) && override.socials.length > 0
      ? override.socials
      : defaults.socials;

  const documents =
    Array.isArray(override.documents) && override.documents.length > 0
      ? override.documents
      : defaults.documents;

  const importantLinks =
    Array.isArray(override.importantLinks) && override.importantLinks.length > 0
      ? override.importantLinks
      : defaults.importantLinks;

  return {
    email:
      typeof override.email === "string" && override.email.trim() !== ""
        ? override.email.trim()
        : defaults.email,
    socials,
    documents,
    importantLinks,
    copyright:
      typeof override.copyright === "string" && override.copyright.trim() !== ""
        ? override.copyright.trim()
        : defaults.copyright,
    freeText:
      typeof override.freeText === "string"
        ? override.freeText
        : defaults.freeText,
  };
}