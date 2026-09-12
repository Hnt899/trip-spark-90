import { Node, mergeAttributes } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { DestinationCardView } from "./DestinationCardView";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    destinationCard: {
      insertDestinationCard: (attrs?: {
        season?: string;
        format?: string;
        comfort?: string;
        uniqueness?: string;
        season_label?: string;
        format_label?: string;
        comfort_label?: string;
        uniqueness_label?: string;
        season_emoji?: string;
        format_emoji?: string;
        comfort_emoji?: string;
        uniqueness_emoji?: string;
      }) => ReturnType;
    };
  }
}

export const DestinationCardExtension = Node.create({
  name: "destinationCard",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      season: { default: "" },
      format: { default: "" },
      comfort: { default: "" },
      uniqueness: { default: "" },
      season_label: { default: "" },
      format_label: { default: "" },
      comfort_label: { default: "" },
      uniqueness_label: { default: "" },
      season_emoji: { default: "" },
      format_emoji: { default: "" },
      comfort_emoji: { default: "" },
      uniqueness_emoji: { default: "" },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="destination-card"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "destination-card" }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DestinationCardView);
  },

  addCommands() {
    return {
      insertDestinationCard:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: {
              season: attrs?.season || "",
              format: attrs?.format || "",
              comfort: attrs?.comfort || "",
              uniqueness: attrs?.uniqueness || "",
            },
          }),
    };
  },
});
