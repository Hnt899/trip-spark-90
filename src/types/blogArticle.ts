/**
 * Модель статьи блога — рассчитана на последующую подстановку из API/админки.
 * Маршруты (/routes) позже можно вынести в отдельный тип с общим базовым интерфейсом.
 */
export type BlogBadge = "own" | "partner" | "ad";

/** Вкладка ленты: чему принадлежит материал по смыслу */
export type BlogChannelTab = "all" | "tudasuda" | "partners" | "special";

export type BlogSortMode = "new" | "popular";

export interface BlogTagDefinition {
  id: string;
  label: string;
}

export interface BlogTagGroup {
  id: string;
  title: string;
  tags: BlogTagDefinition[];
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  /** ISO 8601 */
  publishedAt: string;
  readingMinutes: number;
  badges: BlogBadge[];
  /** Вкладка ленты (для фильтрации) */
  channel: Exclude<BlogChannelTab, "all">;
  tagIds: string[];
  editorsPick: boolean;
  /** Показать в блоке «Рекомендуют партнёры» */
  partnerCarousel: boolean;
  /** Показать в блоке спецпроектов */
  sponsoredGrid: boolean;
  /** Для сортировки «Популярные» */
  views: number;
}
