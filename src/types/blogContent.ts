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
};

export type BlogCarouselMode = "manual" | "auto" | "hybrid";

export type BlogTableCell = { text: string };
export type BlogTableRow = { cells: BlogTableCell[] };

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

export type BlogContentBlock =
  | { type: "paragraph"; text: string; anchor?: boolean; anchorLabel?: string }
  | { type: "heading"; level: number; text: string; anchor?: boolean; anchorLabel?: string }
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
  | { type: "routeByDays"; image: string; days: RouteDayItem[] };