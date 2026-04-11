import type { BlogCarouselSlide, BlogContentBlock } from "@/types/blogContent";

/** Синхронизировать с server/blogRoutes.js */

const PHOTO_PATTERN =
  "<(?:[фФ]ото|photo)>\\s*([\\s\\S]*?)\\s*</\\s*(?:[фФ]ото|photo)\\s*>";

const CAROUSEL_PATTERN =
  "<(?:[кК]арусель|carousel)>\\s*([\\s\\S]*?)\\s*</\\s*(?:[кК]арусель|carousel)\\s*>";

function paragraphsFromFragment(fragment: string): BlogContentBlock[] {
  return fragment
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((text) => ({ type: "paragraph" as const, text }));
}

/** Первая строка — URL, остальное — подпись под фото (необязательно). */
export function parsePhotoTagInner(inner: string): {
  url: string;
  caption?: string;
} {
  const raw = String(inner ?? "").trim();
  if (!raw) return { url: "" };
  const nl = raw.search(/\r?\n/);
  if (nl === -1) {
    const url = raw.replace(/\s+/g, "").slice(0, 2000);
    return { url };
  }
  const firstLine = raw.slice(0, nl).trim().replace(/\s+/g, "");
  const rest = raw.slice(nl + 1).trim();
  if (/^https?:\/\//i.test(firstLine)) {
    const caption = rest.slice(0, 2000);
    return {
      url: firstLine.slice(0, 2000),
      ...(caption ? { caption } : {}),
    };
  }
  const collapsed = raw.replace(/\s+/g, "");
  if (/^https?:\/\//i.test(collapsed)) {
    return { url: collapsed.slice(0, 2000) };
  }
  return { url: "" };
}

/** Старый формат JSON-массива слайдов. */
function parseCarouselLegacyJson(raw: string): BlogCarouselSlide[] {
  try {
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    const out: BlogCarouselSlide[] = [];
    for (const item of data.slice(0, 15)) {
      if (!item || typeof item !== "object") continue;
      const o = item as Record<string, unknown>;
      const image = String(o.image ?? "")
        .replace(/\s+/g, "")
        .trim()
        .slice(0, 2000);
      if (!image || !/^https?:\/\/.+/i.test(image)) continue;
      const caption =
        o.caption != null
          ? String(o.caption).trim().slice(0, 2000)
          : [
              o.route,
              o.subtitle,
              o.price,
              o.oldPrice,
              o.badge,
              o.discount,
            ]
              .filter((x) => x != null && String(x).trim())
              .join("\n")
              .trim()
              .slice(0, 2000);
      out.push(
        caption
          ? { image, caption }
          : { image },
      );
    }
    return out;
  } catch {
    return [];
  }
}

/**
 * Строки: URL слайда; следующие строки до следующего URL — подпись.
 * Можно только URL подряд без текста.
 */
function parseCarouselLineBased(raw: string): BlogCarouselSlide[] {
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const slides: BlogCarouselSlide[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^https?:\/\//i.test(line)) {
      const image = line.replace(/\s+/g, "").slice(0, 2000);
      i++;
      const capLines: string[] = [];
      while (i < lines.length && !/^https?:\/\//i.test(lines[i])) {
        capLines.push(lines[i]);
        i++;
      }
      const caption = capLines.join("\n").trim().slice(0, 2000);
      slides.push(
        caption ? { image, caption } : { image },
      );
    } else {
      i++;
    }
  }
  return slides.slice(0, 15);
}

export function parseCarouselInner(raw: string): BlogCarouselSlide[] {
  const t = String(raw ?? "").trim();
  if (!t) return [];
  if (t.startsWith("[")) {
    const legacy = parseCarouselLegacyJson(t);
    if (legacy.length > 0) return legacy;
  }
  return parseCarouselLineBased(t);
}

function expandPhotoTagsInPlainText(text: string): BlogContentBlock[] {
  const t = String(text ?? "").replace(/^\uFEFF/, "");
  if (!t.trim()) return [];
  const re = new RegExp(PHOTO_PATTERN, "gi");
  const blocks: BlogContentBlock[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(t)) !== null) {
    const before = t.slice(last, m.index);
    if (before.trim()) {
      blocks.push(...paragraphsFromFragment(before));
    }
    const { url, caption } = parsePhotoTagInner(String(m[1] ?? ""));
    if (url.length > 0 && /^https?:\/\/.+/i.test(url)) {
      blocks.push({
        type: "image",
        url,
        alt: "",
        caption: caption?.trim() || undefined,
      });
    } else {
      blocks.push({
        type: "paragraph",
        text: m[0].trim().slice(0, 80000),
      });
    }
    last = re.lastIndex;
  }
  const rest = t.slice(last);
  if (rest.trim()) {
    blocks.push(...paragraphsFromFragment(rest));
  }
  return blocks;
}

/** Карусели, затем фото/абзацы (один фрагмент текста статьи). */
export function expandCarouselsAndPhotosInText(text: string): BlogContentBlock[] {
  const t = String(text ?? "").replace(/^\uFEFF/, "");
  if (!t.trim()) return [];
  const re = new RegExp(CAROUSEL_PATTERN, "gi");
  const blocks: BlogContentBlock[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(t)) !== null) {
    const before = t.slice(last, m.index);
    if (before.trim()) {
      blocks.push(...expandPhotoTagsInPlainText(before));
    }
    const slides = parseCarouselInner(String(m[1] ?? "").trim());
    if (slides.length > 0) {
      blocks.push({ type: "carousel", slides });
    } else {
      blocks.push({
        type: "paragraph",
        text: m[0].trim().slice(0, 80000),
      });
    }
    last = re.lastIndex;
  }
  const rest = t.slice(last);
  if (rest.trim()) {
    blocks.push(...expandPhotoTagsInPlainText(rest));
  }
  return blocks;
}

function paragraphNeedsExpand(text: string): boolean {
  return (
    /<\s*(?:[кК]арусель|carousel)\s*>/i.test(text) ||
    /<\s*(?:[фФ]ото|photo)\s*>/i.test(text)
  );
}

/** Раскрывает <карусель> и <фото> внутри paragraph (старые посты и черновики). */
export function expandRichParagraphBlocks(
  blocks: BlogContentBlock[],
): BlogContentBlock[] {
  const out: BlogContentBlock[] = [];
  for (const b of blocks) {
    if (b.type === "paragraph" && paragraphNeedsExpand(b.text)) {
      out.push(...expandCarouselsAndPhotosInText(b.text));
    } else {
      out.push(b);
    }
  }
  return out;
}
