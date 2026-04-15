import { Node, mergeAttributes } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { CtaButtonView } from "./CtaButtonView";
import type { CtaButtonVariant } from "@/types/blogContent";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    ctaButton: {
      insertCtaButton: (attrs: {
        text: string;
        url: string;
        variant: CtaButtonVariant;
      }) => ReturnType;
    };
  }
}

export const CtaButtonExtension = Node.create({
  name: "ctaButton",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      text: { default: "Подробнее" },
      url: { default: "" },
      variant: { default: "primary" as CtaButtonVariant },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="cta-button"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "cta-button" }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CtaButtonView);
  },

  addCommands() {
    return {
      insertCtaButton:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs }),
    };
  },
});
