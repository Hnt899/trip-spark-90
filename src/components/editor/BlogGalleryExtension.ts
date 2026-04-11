import { Node, mergeAttributes } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { BlogGalleryView } from "./BlogGalleryView";
import type { BlogCarouselSlide } from "@/types/blogContent";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blogGallery: {
      insertBlogGallery: (attrs?: {
        slides?: BlogCarouselSlide[];
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
            attrs: { slides: attrs?.slides || [] },
          }),
    };
  },
});
