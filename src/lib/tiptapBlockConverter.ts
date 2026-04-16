import type { JSONContent } from "@tiptap/react";
import type {
  BlogContentBlock,
  BlogCarouselSlide,
  BlogTableRow,
  CtaButtonVariant,
  RouteDayItem,
} from "@/types/blogContent";

/* ------------------------------------------------------------------ */
/*  Helpers: Tiptap inline content → HTML string (with marks)         */
/* ------------------------------------------------------------------ */

function escapeHtml(t: string): string {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inlineToHtml(node: JSONContent): string {
  if (!node.content) return "";
  return node.content
    .map((child) => {
      if (child.type === "hardBreak") return "\n";
      if (child.type === "text") {
        let s = escapeHtml(child.text || "");
        for (const mark of child.marks || []) {
          switch (mark.type) {
            case "bold":
              s = `<strong>${s}</strong>`;
              break;
            case "italic":
              s = `<em>${s}</em>`;
              break;
            case "strike":
              s = `<s>${s}</s>`;
              break;
          }
        }
        return s;
      }
      if (child.content) return inlineToHtml(child);
      return "";
    })
    .join("");
}

function nodeToHtml(node: JSONContent): string {
  if (!node.content) return "";
  return node.content
    .map((child) => {
      switch (child.type) {
        case "paragraph":
          return `<p>${inlineToHtml(child)}</p>`;
        case "bulletList":
          return `<ul>${child.content?.map((li) => `<li>${nodeToHtml(li)}</li>`).join("") || ""}</ul>`;
        case "orderedList":
          return `<ol>${child.content?.map((li) => `<li>${nodeToHtml(li)}</li>`).join("") || ""}</ol>`;
        case "listItem":
          return nodeToHtml(child);
        case "text": {
          let s = escapeHtml(child.text || "");
          for (const mark of child.marks || []) {
            switch (mark.type) {
              case "bold": s = `<strong>${s}</strong>`; break;
              case "italic": s = `<em>${s}</em>`; break;
              case "strike": s = `<s>${s}</s>`; break;
            }
          }
          return s;
        }
        case "hardBreak":
          return "<br>";
        default:
          if (child.content) return nodeToHtml(child);
          return "";
      }
    })
    .join("");
}

/* ------------------------------------------------------------------ */
/*  Helpers: HTML string → Tiptap inline content (with marks)         */
/* ------------------------------------------------------------------ */

function plainTextToInline(text: string): JSONContent[] | undefined {
  if (!text) return undefined;
  const lines = text.split("\n");
  const nodes: JSONContent[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (i > 0) nodes.push({ type: "hardBreak" });
    if (lines[i]) nodes.push({ type: "text", text: lines[i] });
  }
  return nodes.length > 0 ? nodes : undefined;
}

const INLINE_TAG_RE = /<[a-z/][\s\S]*?>/i;

function htmlToInline(html: string): JSONContent[] | undefined {
  if (!html) return undefined;
  if (!INLINE_TAG_RE.test(html)) return plainTextToInline(html);

  const normalized = html.replace(/\n/g, "<br>");
  const doc = new DOMParser().parseFromString(
    `<body>${normalized}</body>`,
    "text/html",
  );
  const nodes: JSONContent[] = [];

  function walk(el: Node, marks: Array<{ type: string }>) {
    for (const child of Array.from(el.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent || "";
        if (text) {
          const n: JSONContent = { type: "text", text };
          if (marks.length > 0) n.marks = marks.map((m) => ({ ...m }));
          nodes.push(n);
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const tag = (child as Element).tagName.toLowerCase();
        if (tag === "br") {
          nodes.push({ type: "hardBreak" });
          continue;
        }
        const next = [...marks];
        if (tag === "strong" || tag === "b") next.push({ type: "bold" });
        if (tag === "em" || tag === "i") next.push({ type: "italic" });
        if (tag === "s" || tag === "del") next.push({ type: "strike" });
        walk(child, next);
      }
    }
  }

  walk(doc.body, []);
  return nodes.length > 0 ? nodes : undefined;
}

function htmlToCellContent(html: string): JSONContent[] {
  if (!html) return [{ type: "paragraph" }];
  if (!/<(ul|ol|p)\b/i.test(html)) {
    return [{ type: "paragraph", content: htmlToInline(html) }];
  }
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  const result: JSONContent[] = [];

  for (const child of Array.from(doc.body.children)) {
    const tag = child.tagName.toLowerCase();
    if (tag === "ul" || tag === "ol") {
      const listType = tag === "ul" ? "bulletList" : "orderedList";
      const items: JSONContent[] = [];
      for (const li of Array.from(child.children)) {
        if (li.tagName.toLowerCase() === "li") {
          items.push({
            type: "listItem",
            content: [{ type: "paragraph", content: htmlToInline(li.innerHTML) }],
          });
        }
      }
      if (items.length > 0) result.push({ type: listType, content: items });
    } else if (tag === "p") {
      result.push({ type: "paragraph", content: htmlToInline(child.innerHTML) });
    } else {
      result.push({ type: "paragraph", content: htmlToInline(child.innerHTML) });
    }
  }

  return result.length > 0 ? result : [{ type: "paragraph" }];
}

/* ------------------------------------------------------------------ */
/*  BlogContentBlock[] → Tiptap JSONContent                           */
/* ------------------------------------------------------------------ */

export function blocksToTiptap(blocks: BlogContentBlock[]): JSONContent {
  const content: JSONContent[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case "paragraph":
        content.push({
          type: "paragraph",
          content: htmlToInline(block.text),
        });
        break;

      case "heading":
        content.push({
          type: "heading",
          attrs: { level: block.level || 2 },
          content: htmlToInline(block.text),
        });
        break;

      case "image":
        content.push({
          type: "blogImage",
          attrs: {
            src: block.url,
            alt: block.alt || "",
            caption: block.caption || "",
          },
        });
        break;

      case "carousel":
        content.push({
          type: "blogGallery",
          attrs: {
            slides: block.slides || [],
            mode: block.mode || "manual",
            intervalSec: block.intervalSec || 5,
          },
        });
        break;

      case "quote":
        content.push({
          type: "blockquote",
          content: [
            { type: "paragraph", content: htmlToInline(block.text) },
          ],
        });
        break;

      case "bulletList":
        content.push({
          type: "bulletList",
          content: (block.items || []).map((item) => ({
            type: "listItem",
            content: [{ type: "paragraph", content: htmlToInline(item) }],
          })),
        });
        break;

      case "orderedList":
        content.push({
          type: "orderedList",
          content: (block.items || []).map((item) => ({
            type: "listItem",
            content: [{ type: "paragraph", content: htmlToInline(item) }],
          })),
        });
        break;

      case "divider":
        content.push({ type: "horizontalRule" });
        break;

      case "table": {
        const rows = block.rows || [];
        const tableContent: JSONContent[] = rows.map((row, rowIdx) => ({
          type: "tableRow",
          content: row.cells.map((cell) => ({
            type: rowIdx === 0 && block.hasHeader ? "tableHeader" : "tableCell",
            content: htmlToCellContent(cell.text),
          })),
        }));
        content.push({ type: "table", content: tableContent });
        break;
      }

      case "ctaButton":
        content.push({
          type: "ctaButton",
          attrs: {
            text: block.text,
            url: block.url,
            variant: block.variant,
          },
        });
        break;

      case "destinationCard":
        content.push({
          type: "destinationCard",
          attrs: {
            season: block.season,
            format: block.format,
            comfort: block.comfort,
            uniqueness: block.uniqueness,
          },
        });
        break;

      case "routeByDays":
        content.push({
          type: "routeDays",
          attrs: { image: block.image || "", days: block.days },
        });
        break;
    }
  }

  if (content.length === 0) {
    content.push({ type: "paragraph" });
  }

  return { type: "doc", content };
}

/* ------------------------------------------------------------------ */
/*  Tiptap JSONContent → BlogContentBlock[]                           */
/* ------------------------------------------------------------------ */

export function tiptapToBlocks(doc: JSONContent): BlogContentBlock[] {
  const blocks: BlogContentBlock[] = [];
  if (!doc.content) return blocks;

  for (const node of doc.content) {
    switch (node.type) {
      case "paragraph": {
        const text = inlineToHtml(node);
        if (text || blocks.length > 0) {
          blocks.push({ type: "paragraph", text });
        }
        break;
      }

      case "heading": {
        const text = inlineToHtml(node);
        const level = (node.attrs?.level as number) || 2;
        blocks.push({ type: "heading", level, text });
        break;
      }

      case "blogImage": {
        const src = (node.attrs?.src as string) || "";
        if (src) {
          blocks.push({
            type: "image",
            url: src,
            alt: (node.attrs?.alt as string) || "",
            caption: (node.attrs?.caption as string) || undefined,
          });
        }
        break;
      }

      case "blogGallery": {
        const slides = (node.attrs?.slides as BlogCarouselSlide[]) || [];
        if (slides.length > 0) {
          const modeRaw = String(node.attrs?.mode || "manual");
          const mode =
            modeRaw === "auto" || modeRaw === "hybrid" ? modeRaw : "manual";
          const intervalSec = Math.min(
            30,
            Math.max(1, parseInt(String(node.attrs?.intervalSec || "5"), 10) || 5),
          );
          blocks.push({ type: "carousel", slides, mode, intervalSec });
        }
        break;
      }

      case "bulletList": {
        const items = extractListItems(node);
        if (items.length > 0) {
          blocks.push({ type: "bulletList", items });
        }
        break;
      }

      case "orderedList": {
        const items = extractListItems(node);
        if (items.length > 0) {
          blocks.push({ type: "orderedList", items });
        }
        break;
      }

      case "blockquote": {
        const text = inlineToHtml(node);
        blocks.push({ type: "quote", text });
        break;
      }

      case "horizontalRule":
        blocks.push({ type: "divider" });
        break;

      case "table": {
        const tableRows: BlogTableRow[] = [];
        let hasHeader = false;
        if (node.content) {
          for (const row of node.content) {
            if (row.type !== "tableRow" || !row.content) continue;
            const cells = row.content.map((cell) => ({
              text: nodeToHtml(cell),
            }));
            if (row.content[0]?.type === "tableHeader") hasHeader = true;
            tableRows.push({ cells });
          }
        }
        if (tableRows.length > 0) {
          blocks.push({ type: "table", rows: tableRows, hasHeader });
        }
        break;
      }

      case "ctaButton": {
        blocks.push({
          type: "ctaButton",
          text: (node.attrs?.text as string) || "Подробнее",
          url: (node.attrs?.url as string) || "",
          variant: (node.attrs?.variant as CtaButtonVariant) || "primary",
        });
        break;
      }

      case "destinationCard": {
        blocks.push({
          type: "destinationCard",
          season: (node.attrs?.season as string) || "",
          format: (node.attrs?.format as string) || "",
          comfort: (node.attrs?.comfort as string) || "",
          uniqueness: (node.attrs?.uniqueness as string) || "",
        });
        break;
      }

      case "routeDays": {
        const days = (node.attrs?.days as RouteDayItem[]) || [];
        if (days.length > 0) {
          blocks.push({
            type: "routeByDays",
            image: (node.attrs?.image as string) || "",
            days,
          });
        }
        break;
      }
    }
  }

  return blocks;
}

function extractListItems(node: JSONContent): string[] {
  if (!node.content) return [];
  return node.content
    .filter((child) => child.type === "listItem")
    .map((li) => inlineToHtml(li));
}
