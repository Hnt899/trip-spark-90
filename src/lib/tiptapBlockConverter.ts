import type { JSONContent } from "@tiptap/react";
import type { BlogContentBlock, BlogCarouselSlide } from "@/types/blogContent";

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
          attrs: { slides: block.slides || [] },
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
          blocks.push({ type: "carousel", slides });
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
