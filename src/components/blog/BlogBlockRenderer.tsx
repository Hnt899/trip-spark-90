import { cn } from "@/lib/utils";
import { expandRichParagraphBlocks } from "@/lib/blogBodyExpand";
import BlogCarouselBlock from "@/components/blog/BlogCarouselBlock";
import type { BlogContentBlock } from "@/types/blogContent";
import { slugFromText } from "@/components/blog/ArticleTabs";
import { ExternalLink, Sun, Tent, Star, Sparkles, MapPin } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Inline HTML sanitizer + renderer                                   */
/* ------------------------------------------------------------------ */

const ALLOWED_TAG_RE = /^\/?(strong|b|em|i|s|del|br|span)\b/i;
const CELL_TAG_RE = /^\/?(strong|b|em|i|s|del|br|span|p|ul|ol|li)\b/i;
const ACCENT_RE =
  /<(?:акцент|accent)>\s*([\s\S]*?)\s*<\/\s*(?:акцент|accent)\s*>/gi;

function sanitizeInlineHtml(raw: string): string {
  return raw.replace(/<(\/?)([^>]*)>/g, (full, _slash: string, inner: string) => {
    const tag = inner.trim().split(/[\s/>/]/)[0];
    if (ALLOWED_TAG_RE.test(`${_slash}${tag}`)) return full;
    return full.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  });
}

function prepareHtml(text: string): string {
  let html = text.replace(/\n/g, "<br>");
  html = html.replace(
    ACCENT_RE,
    '<span class="font-bold underline decoration-wavy decoration-2 decoration-primary underline-offset-[3px]">$1</span>',
  );
  return sanitizeInlineHtml(html);
}

function InlineHtml({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: prepareHtml(text) }}
    />
  );
}

function sanitizeCellHtml(raw: string): string {
  return raw.replace(/<(\/?)([^>]*)>/g, (full, _slash: string, inner: string) => {
    const tag = inner.trim().split(/[\s/>/]/)[0];
    if (CELL_TAG_RE.test(`${_slash}${tag}`)) return full;
    return full.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  });
}

function CellHtml({ text, className }: { text: string; className?: string }) {
  const html = sanitizeCellHtml(text.replace(/\n/g, "<br>"));
  return (
    <div
      className={cn("cell-content [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-1 [&_li]:my-0.5 [&_p]:my-0.5", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Block type guard                                                   */
/* ------------------------------------------------------------------ */

function isBlock(x: unknown): x is BlogContentBlock {
  return (
    typeof x === "object" &&
    x !== null &&
    "type" in x &&
    typeof (x as BlogContentBlock).type === "string"
  );
}

/* ------------------------------------------------------------------ */
/*  Main renderer                                                      */
/* ------------------------------------------------------------------ */

export default function BlogBlockRenderer({
  blocks,
  className,
}: {
  blocks: unknown;
  className?: string;
}) {
  const rawList = Array.isArray(blocks) ? blocks.filter(isBlock) : [];
  const list = expandRichParagraphBlocks(rawList as BlogContentBlock[]);
  let h1Counter = 0;

  if (list.length === 0) {
    return (
      <p className={cn("text-muted-foreground", className)}>
        Текст статьи пока не добавлен.
      </p>
    );
  }

  return (
    <div
      className={cn(
        "min-w-0 space-y-6 break-words [overflow-wrap:anywhere]",
        className,
      )}
    >
      {list.map((block, i) => {
        const key = `${block.type}-${i}`;
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={key}
                className="whitespace-pre-wrap break-words text-base leading-relaxed text-slate-700 [overflow-wrap:anywhere] dark:text-slate-200"
              >
                <InlineHtml text={block.text} />
              </p>
            );
          case "heading": {
            const L = Math.min(3, Math.max(1, Number(block.level) || 2));
            const cls =
              L === 1
                ? "text-2xl font-bold mt-10 mb-4"
                : L === 2
                  ? "text-xl font-semibold mt-8 mb-3"
                  : "text-lg font-semibold mt-6 mb-2";
            const Tag = (L === 1 ? "h2" : L === 2 ? "h3" : "h4") as keyof JSX.IntrinsicElements;
            const headingId =
              L === 1 ? slugFromText(block.text.replace(/<[^>]*>/g, "").trim(), h1Counter++) : undefined;
            return (
              <Tag
                key={key}
                id={headingId}
                className={cn(
                  cls,
                  "break-words text-slate-900 [overflow-wrap:anywhere] tracking-tight dark:text-white",
                )}
              >
                <InlineHtml text={block.text} />
              </Tag>
            );
          }
          case "image":
            if (!block.url?.trim()) return null;
            return (
              <figure key={key} className="my-6">
                <div className="flex min-h-[220px] w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-transparent dark:border-slate-800">
                  <img
                    src={block.url}
                    alt={block.alt || ""}
                    referrerPolicy="no-referrer"
                    className="mx-auto block h-auto max-h-[560px] w-auto max-w-full object-contain"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="mt-2 whitespace-pre-wrap break-words text-center text-sm text-muted-foreground [overflow-wrap:anywhere]">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "carousel":
            if (!Array.isArray(block.slides) || block.slides.length === 0) {
              return null;
            }
            return <BlogCarouselBlock key={key} slides={block.slides} />;
          case "bulletList":
            if (!Array.isArray(block.items) || block.items.length === 0)
              return null;
            return (
              <ul
                key={key}
                className="my-4 list-disc space-y-1 pl-6 text-base leading-relaxed text-slate-700 dark:text-slate-200"
              >
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]"
                  >
                    <InlineHtml text={item} />
                  </li>
                ))}
              </ul>
            );
          case "orderedList":
            if (!Array.isArray(block.items) || block.items.length === 0)
              return null;
            return (
              <ol
                key={key}
                className="my-4 list-decimal space-y-1 pl-6 text-base leading-relaxed text-slate-700 dark:text-slate-200"
              >
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]"
                  >
                    <InlineHtml text={item} />
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={key}
                className="min-w-0 break-words rounded-r-lg border-l-4 border-primary/40 bg-muted/50 py-3 pl-4 pr-2 italic text-slate-700 [overflow-wrap:anywhere] dark:text-slate-200"
              >
                <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                  <InlineHtml text={block.text} />
                </p>
                {block.attribution ? (
                  <footer className="mt-2 text-sm not-italic text-muted-foreground">
                    — {block.attribution}
                  </footer>
                ) : null}
              </blockquote>
            );
          case "divider":
            return (
              <hr
                key={key}
                className="my-8 border-slate-200 dark:border-slate-700"
              />
            );
          case "table": {
            if (!block.rows?.length) return null;
            const maxCols = Math.max(...block.rows.map((r) => r.cells.length));
            return (
              <div key={key} className="my-6 overflow-x-auto">
                <table className="w-full border-collapse overflow-hidden rounded-lg border border-border text-sm">
                  {block.hasHeader && block.rows[0] && (
                    <thead>
                      <tr>
                        {block.rows[0].cells
                          .concat(
                            Array.from(
                              { length: maxCols - block.rows[0].cells.length },
                              () => ({ text: "" }),
                            ),
                          )
                          .map((cell, ci) => (
                            <th
                              key={ci}
                              className="border border-border bg-muted px-4 py-2.5 text-left font-semibold text-foreground"
                            >
                              <CellHtml text={cell.text} />
                            </th>
                          ))}
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {block.rows.slice(block.hasHeader ? 1 : 0).map((row, ri) => (
                      <tr
                        key={ri}
                        className="border-b border-border transition-colors hover:bg-muted/50"
                      >
                        {row.cells
                          .concat(
                            Array.from(
                              { length: maxCols - row.cells.length },
                              () => ({ text: "" }),
                            ),
                          )
                          .map((cell, ci) => (
                            <td key={ci} className="border border-border px-4 py-2.5">
                              <CellHtml text={cell.text} />
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          case "ctaButton": {
            const variantCls =
              block.variant === "secondary"
                ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                : "bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white";
            return (
              <div key={key} className="my-8 flex justify-center">
                <a
                  href={block.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium transition-all",
                    variantCls,
                  )}
                >
                  <ExternalLink className="h-4 w-4" />
                  {block.text}
                </a>
              </div>
            );
          }
          case "destinationCard": {
            const fields = [
              { label: "Идеальный сезон", value: block.season, icon: Sun },
              { label: "Формат", value: block.format, icon: Tent },
              { label: "Комфорт", value: block.comfort, icon: Star },
              { label: "Уникальность", value: block.uniqueness, icon: Sparkles },
            ];
            return (
              <div
                key={key}
                className="my-6 overflow-hidden rounded-xl border border-border bg-muted/30"
              >
                <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-foreground">
                    О направлении
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4">
                  {fields.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {value || "—"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          case "routeByDays": {
            if (!block.days?.length) return null;
            const DEFAULT_IMG = "/путь-no-bg-preview (carve.photos).png";
            const routeImage = block.image || DEFAULT_IMG;
            const totalDays = block.days.length;
            return (
              <div
                key={key}
                className="my-8 overflow-hidden rounded-2xl bg-[hsl(var(--primary)/0.04)] dark:bg-[hsl(var(--primary)/0.08)]"
              >
                <div className="flex flex-col md:flex-row md:min-h-[420px]">
                  {/* Image left */}
                  <div className="relative w-full shrink-0 md:w-[340px] lg:w-[400px]">
                    <img
                      src={routeImage}
                      alt=""
                      className="h-56 w-full object-contain md:absolute md:inset-0 md:h-full"
                    />
                  </div>
                  {/* Timeline right */}
                  <div className="min-w-0 flex-1 px-6 py-6 md:px-8 md:py-8">
                    <div className="mb-6 flex items-center gap-2.5">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="text-xl font-bold tracking-tight text-foreground">
                        Маршрут
                      </span>
                    </div>
                    <div className="flex flex-col">
                      {block.days.map((day, di) => {
                        const isFirst = di === 0;
                        const isLast = di === totalDays - 1;
                        return (
                          <div key={di} className="flex gap-4">
                            {/* Timeline column */}
                            <div className="flex w-5 shrink-0 flex-col items-center">
                              {/* Dot */}
                              {isFirst ? (
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15">
                                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                                </div>
                              ) : isLast ? (
                                <div className="h-5 w-5 rounded-full bg-primary shadow-[0_0_0_3px_hsl(var(--primary)/0.15)]" />
                              ) : (
                                <div className="flex h-5 w-5 items-center justify-center">
                                  <div className="h-2 w-2 rounded-full border-2 border-primary bg-white dark:bg-background" />
                                </div>
                              )}
                              {/* Line segment */}
                              {!isLast && (
                                <div className="my-1 w-px flex-1 border-l-2 border-dashed border-primary/30" />
                              )}
                            </div>
                            {/* Content */}
                            <div className={cn("min-w-0 flex-1", !isLast && "pb-5")}>
                              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary/70">
                                {day.label}
                              </p>
                              <h4 className="mt-0.5 text-base font-bold leading-snug text-foreground">
                                {day.title}
                              </h4>
                              {day.description && (
                                <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                                  {day.description}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
