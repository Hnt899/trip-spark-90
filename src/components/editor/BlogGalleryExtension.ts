import { Node, mergeAttributes } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { BlogGalleryView } from "./BlogGalleryView";
import type { BlogCarouselMode, BlogCarouselSlide } from "@/types/blogContent";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blogGallery: {
      insertBlogGallery: (attrs?: {
        slides?: BlogCarouselSlide[];
        mode?: BlogCarouselMode;
        intervalSec?: number;
      }) => ReturnType;
    };
  }
}

export const BlogGalleryExtension = Node.create({
  name: "blogGallery",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      slides: {
        default: [],
        parseHTML: (el) => {
          try {
            return JSON.parse(el.getAttribute("data-slides") || "[]");
          } catch {
            return [];
          }
        },
        renderHTML: (attrs) => ({
          "data-slides": JSON.stringify(attrs.slides || []),
        }),
      },
      mode: {
        default: "manual",
        parseHTML: (el) => {
          const raw = String(el.getAttribute("data-mode") || "manual");
          return raw === "auto" || raw === "hybrid" ? raw : "manual";
        },
        renderHTML: (attrs) => ({
          "data-mode": attrs.mode || "manual",
        }),
      },
      intervalSec: {
        default: 5,
        parseHTML: (el) => {
          const n = parseInt(String(el.getAttribute("data-interval-sec") || "5"), 10);
          return Number.isFinite(n) ? Math.min(30, Math.max(1, n)) : 5;
        },
        renderHTML: (attrs) => ({
          "data-interval-sec": String(attrs.intervalSec || 5),
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="blog-gallery"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "blog-gallery" }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(BlogGalleryView);
  },

  addCommands() {
    return {
      insertBlogGallery:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: {
              slides: attrs?.slides || [],
              mode: attrs?.mode || "manual",
              intervalSec: attrs?.intervalSec || 5,
            },
          }),
    };
  },
});
