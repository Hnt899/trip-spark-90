import { Node, mergeAttributes } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { BlogImageView } from "./BlogImageView";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blogImage: {
      insertBlogImage: (attrs: {
        src: string;
        alt?: string;
        caption?: string;
      }) => ReturnType;
    };
  }
}

export const BlogImageExtension = Node.create({
  name: "blogImage",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: "" },
      alt: { default: "" },
      caption: { default: "" },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="blog-image"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "blog-image" }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(BlogImageView);
  },

  addCommands() {
    return {
      insertBlogImage:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs }),
    };
  },
});
