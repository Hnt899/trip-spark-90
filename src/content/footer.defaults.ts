import type { FooterFields } from "@/types/footerContent";

export const footerDefaults: FooterFields = {
  email: "info@ts-trip.ru",
  socials: [
    { kind: "telegram", url: "https://t.me/ts_trip_ru" },
    { kind: "vk", url: "https://vk.ru/tstrip" },
    { kind: "instagram", url: "https://www.instagram.com/tstripru" },
    { kind: "dzen", url: "https://dzen.ru/tstrip" },
  ],
  documents: [
    { label: "Политика конфиденциальности", fileUrl: "" },
    { label: "Условия использования", fileUrl: "" },
    { label: "Оферта", fileUrl: "" },
  ],
  copyright: "© 2025 TudaSuda. Все права защищены.",
  freeText: "",
};

export function mergeFooter(defaults: FooterFields, override: Partial<FooterFields> | null | undefined): FooterFields {
  if (!override) return defaults;
  const socials = Array.isArray(override.socials) && override.socials.length > 0 ? override.socials : defaults.socials;
  const documents = Array.isArray(override.documents) && override.documents.length > 0 ? override.documents : defaults.documents;
  return {
    email: typeof override.email === "string" && override.email.trim() !== "" ? override.email.trim() : defaults.email,
    socials, documents,
    copyright: typeof override.copyright === "string" && override.copyright.trim() !== "" ? override.copyright.trim() : defaults.copyright,
    freeText: typeof override.freeText === "string" ? override.freeText : defaults.freeText,
  };
}
