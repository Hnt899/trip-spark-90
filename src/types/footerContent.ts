/**
 * Соцсети — универсальные. Админ сам задаёт название, URL и иконки.
 */
export type SocialLink = {
  /** Уникальный id (uuid или slug). Нужен для key в списках и для обновления. */
  id: string;
  /** Отображаемое название (Telegram, VK, YouTube, Rutube, Одноклассники и т.д.) */
  label: string;
  /** URL профиля */
  url: string;
  /** URL маленькой иконки (подвал). Если пусто — fallback на первую букву label */
  iconSmall?: string;
  /** URL большой иконки (блог). Если пусто — используется iconSmall */
  iconLarge?: string;
  /** Цвет фона (Tailwind class или hex). Используется как fallback, если нет иконки. */
  bgColor?: string;
};

export type FooterDocumentLink = {
  label: string;
  fileUrl: string;
};

export type ImportantLink = {
  label: string;
  url: string;
};

export type FooterFields = {
  email: string;
  socials: SocialLink[];
  documents: FooterDocumentLink[];
  copyright: string;
  freeText: string;
  importantLinks: ImportantLink[];
};