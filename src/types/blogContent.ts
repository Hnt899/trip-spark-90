/** Блоки тела статьи (хранятся в blog_posts.content_blocks, JSONB). */

export type BlogCarouselSlide = {
  image: string;
  caption?: string;
  badge?: string;
  discount?: string;
  route?: string;
  subtitle?: string;
  price?: string;
  oldPrice?: string;
  alt?: string;
};

export type BlogCarouselMode = "manual" | "auto" | "hybrid";

export type BlogTableCell = { text: string };
export type BlogTableRow = {
  cells: BlogTableCell[];
  /** id табличного якоря строки (t-anchor-N), глобальный счётчик по документу */
  tableAnchorId?: string;
};

export type CtaButtonVariant = "primary" | "secondary";

export type RouteDayItem = {
  label: string;
  title: string;
  description: string;
  anchorIndex?: number;
};

export type DestinationCardBlock = {
  type: "destinationCard";
  season: string;
  format: string;
  comfort: string;
  uniqueness: string;
  season_label?: string;
  format_label?: string;
  comfort_label?: string;
  uniqueness_label?: string;
  season_icon?: string;
  format_icon?: string;
  comfort_icon?: string;
  uniqueness_icon?: string;
};

export type QuickBookingBlock = {
  type: "quickBooking";
  title: string;
  button1Text: string;
  button1Url: string;
  button2Text: string;
  button2Url: string;
  image: string;
  imageAlt?: string;
  bgGradient?: string;
};

export type BlogContentBlock =
  | { type: "paragraph"; text: string; anchor?: boolean; anchorLabel?: string; anchorOrdinal?: number }
  | { type: "heading"; level: number; text: string; anchor?: boolean; anchorLabel?: string; anchorOrdinal?: number }
  | { type: "image"; url: string; alt?: string; caption?: string }
  | {
      type: "carousel";
      slides: BlogCarouselSlide[];
      mode?: BlogCarouselMode;
      intervalSec?: number;
    }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "bulletList"; items: string[] }
  | { type: "orderedList"; items: string[] }
  | { type: "divider" }
  | { type: "table"; rows: BlogTableRow[]; hasHeader: boolean }
  | { type: "ctaButton"; text: string; url: string; variant: CtaButtonVariant }
  | DestinationCardBlock
  | QuickBookingBlock
  | { type: "routeByDays"; image: string; imageAlt?: string; days: RouteDayItem[] };