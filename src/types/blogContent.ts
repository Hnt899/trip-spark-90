/** Блоки тела статьи (хранятся в blog_posts.content_blocks, JSONB). */

/** Слайд карусели: картинка + необязательная подпись снизу. Старые JSON-посты могут иметь лишние поля — ренер соберёт подпись. */
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

export type BlogContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: number; text: string }
  | { type: "image"; url: string; alt?: string; caption?: string }
  | { type: "carousel"; slides: BlogCarouselSlide[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "bulletList"; items: string[] }
  | { type: "orderedList"; items: string[] }
  | { type: "divider" };
