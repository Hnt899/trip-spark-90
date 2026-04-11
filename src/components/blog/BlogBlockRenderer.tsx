import { cn } from "@/lib/utils";
import { expandRichParagraphBlocks } from "@/lib/blogBodyExpand";
import BlogCarouselBlock from "@/components/blog/BlogCarouselBlock";
import type { BlogContentBlock } from "@/types/blogContent";

/* ------------------------------------------------------------------ */
/*  Inline HTML sanitizer + renderer                                   */
/* ------------------------------------------------------------------ */

const ALLOWED_TAG_RE = /^\/?(strong|b|em|i|s|del|br|span)\b/i;
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
            return (
              <Tag
                key={key}
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
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-muted dark:border-slate-800">
                  <img
                    src={block.url}
                    alt={block.alt || ""}
                    referrerPolicy="no-referrer"
                    className="h-auto max-w-full object-cover"
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
          default:
            return null;
        }
      })}
    </div>
  );
}
