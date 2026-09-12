import { Node, mergeAttributes } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { QuickBookingView } from "./QuickBookingView";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    quickBooking: {
      insertQuickBooking: (attrs?: {
        title?: string;
        button1Text?: string;
        button1Url?: string;
        button2Text?: string;
        button2Url?: string;
        image?: string;
        imageAlt?: string;
        bgGradient?: string;
      }) => ReturnType;
    };
  }
}

export const QuickBookingExtension = Node.create({
  name: "quickBooking",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      title: { default: "Забронировать жильё и купить билеты можно на TudaSuda" },
      button1Text: { default: "Найти билеты" },
      button1Url: { default: "" },
      button2Text: { default: "Выбрать отель" },
      button2Url: { default: "" },
      image: { default: "" },
      imageAlt: { default: "" },
      bgGradient: { default: "from-[#8A70F8] to-[#9B82F8]" },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="quick-booking"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "quick-booking" }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(QuickBookingView);
  },

  addCommands() {
    return {
      insertQuickBooking:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: {
              title: attrs?.title || "Забронировать жильё и купить билеты можно на TudaSuda",
              button1Text: attrs?.button1Text || "Найти билеты",
              button1Url: attrs?.button1Url || "",
              button2Text: attrs?.button2Text || "Выбрать отель",
              button2Url: attrs?.button2Url || "",
              image: attrs?.image || "",
              imageAlt: attrs?.imageAlt || "",
              bgGradient: attrs?.bgGradient || "from-[#8A70F8] to-[#9B82F8]",
            },
          }),
    };
  },
});