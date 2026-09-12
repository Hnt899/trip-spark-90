import { Node } from "@tiptap/core";

export interface QuickBookingOptions {}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    quickBooking: {
      insertQuickBooking: () => ReturnType;
    };
  }
}

export const QuickBookingExtension = Node.create<QuickBookingOptions>({
  name: "quickBooking",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      title1: {
        default: "Забронировать жильё",
      },
      title2: {
        default: "и купить билеты можно",
      },
      title3: {
        default: "на TudaSuda",
      },
      button1Text: {
        default: "Найти билеты",
      },
      button1Url: {
        default: "",
      },
      button2Text: {
        default: "Выбрать отель",
      },
      button2Url: {
        default: "",
      },
      bgGradient: {
        default: "from-[#8A70F8] to-[#9B82F8]",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="quick-booking"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { ...HTMLAttributes, "data-type": "quick-booking" }, 0];
  },

  addCommands() {
    return {
      insertQuickBooking:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {},
          });
        },
    };
  },
});
