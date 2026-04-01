/** Видимое имя бренда в статьях (кириллица, в UI подсвечивается primary). */
export const BRAND_DISPLAY_NAME = "Туда суда";

/**
 * Замена упоминаний конкурента на бренд.
 * URL в externalUrl остаются в данных; здесь только видимый текст и подписи ссылок.
 */
export function applyBrandToText(text: string): string {
  const B = BRAND_DISPLAY_NAME;
  let s = text;
  s = s.replace(/\bTudaSuda\b/g, B);
  s = s.replace(/Туту\.ru/gi, B);
  s = s.replace(/Туту/g, B);
  s = s.replace(/туту/g, B);
  return s;
}

/** Разбить длинные абзацы по предложениям для читабельности */
export function splitLongParagraph(text: string, maxLen = 200): string[] {
  const t = text.trim();
  if (t.length <= maxLen) return [t];
  const parts = t.split(/(?<=[.!?…])\s+/);
  const out: string[] = [];
  let cur = "";
  for (const p of parts) {
    const next = cur ? `${cur} ${p}` : p;
    if (next.length > maxLen && cur) {
      out.push(cur.trim());
      cur = p;
    } else {
      cur = next;
    }
  }
  if (cur.trim()) out.push(cur.trim());
  return out.length ? out : [t];
}

/** Перед двойным переводом строки — чаще после точки перед заглавной буквой */
export function expandParagraphBreaks(body: string): string {
  return body
    .replace(/([.!?…])\n(?=[А-ЯЁA-Z«"„(])/g, "$1\n\n")
    .replace(/;\s*\n(?=[а-яёa-zА-ЯЁA-Z])/g, ";\n\n");
}

export type ParagraphTone = "normal" | "critical" | "warn" | "good";

/** Акценты: красный — критично, жёлтый — важно, зелёный — выгода / облегчение */
export function classifyParagraph(text: string): ParagraphTone {
  const lower = text.toLowerCase();
  const critical =
    /нельзя\b|запрещен|не допустят|не пустят|прид(ёт|е)тся сдать|отказ в перевозке|не получится вернуть|уголовн|штраф до|критически важно|смерти близкого|утратой паспорта|обманут|мошенник/i;
  const warn =
    /важно\b|обратите внимание|помните,|советуем|рекомендуем|необходимо указать|обязательно уточн|не позднее|как минимум за|не забудьте|уточните в|проверьте,|срок —|дедлайн/i;
  const good =
    /бесплатно\b|безвозмездно|не возвращается только|не списываем|верн(ём|ем) полн|можно не|можно идти|удобно, если|выгодн|экономить|сэкономить|кешбэк|лайфхак|проще всего|не придётся|не придется|начислим|поможем|зелён(ым|ого) цветом|выгоднее всего/i;
  if (critical.test(lower)) return "critical";
  if (warn.test(lower)) return "warn";
  if (good.test(lower)) return "good";
  return "normal";
}

const CALLOUT: Record<Exclude<ParagraphTone, "normal">, string> = {
  critical: "rounded-xl border border-red-200 bg-red-50/90 p-4 sm:p-5 my-4 shadow-sm text-red-950",
  warn: "rounded-xl border border-amber-200 bg-amber-50/90 p-4 sm:p-5 my-4 shadow-sm text-amber-950",
  good: "rounded-xl border border-emerald-200 bg-emerald-50/85 p-4 sm:p-5 my-4 shadow-sm text-emerald-950",
};

export function calloutClass(tone: ParagraphTone): string | null {
  if (tone === "normal") return null;
  return CALLOUT[tone];
}

/** Если ссылка на tutu — ведём на разделы сервиса где логично */
export function rewriteTutuLink(href: string): string {
  try {
    const u = new URL(href);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "tutu.ru" && (u.pathname === "/" || u.pathname === "")) return "/";
    if (host.endsWith("tutu.ru")) {
      if (u.pathname.includes("/avia") || u.hostname.startsWith("avia.")) return "/flight-search";
      if (
        u.pathname.includes("/bus/") ||
        u.pathname.includes("/bus_news/") ||
        /moscow_region|moscow_fares|mostransavto/i.test(u.pathname)
      ) {
        return "/bus-search";
      }
      if (u.pathname.includes("/user/profile")) return "/profile";
      if (u.pathname.includes("/mobile") || u.pathname.includes("mobilnoe")) return "/";
      return "/";
    }
  } catch {
    /* relative or invalid */
  }
  return href;
}

/** После rewriteTutuLink: ведёт только на главную — показываем подпись обычным текстом, без ссылки */
export function isHomePageLink(href: string): boolean {
  const h = href.trim();
  return h === "/" || h === "";
}

/**
 * Ссылки на материалы Tutu с якорем (#раздел) — на нашем сайте не куда вести;
 * показываем только подпись (как обычный текст). Проверять исходный href из markdown, до rewriteTutuLink.
 */
export function isTutuAnchorLink(href: string): boolean {
  const h = href.trim();
  if (h.startsWith("#")) return true;
  try {
    const u = new URL(h);
    const host = u.hostname.replace(/^www\./, "");
    const isTutu = host === "tutu.ru" || host.endsWith(".tutu.ru");
    if (!isTutu) return false;
    return u.hash.length > 0;
  } catch {
    return false;
  }
}
