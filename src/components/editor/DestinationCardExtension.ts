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
        season_icon?: string;
        format_icon?: string;
        comfort_icon?: string;
        uniqueness_icon?: string;
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
      season_icon: { default: "Sun" },
      format_icon: { default: "Tent" },
      comfort_icon: { default: "Star" },
      uniqueness_icon: { default: "Sparkles" },
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
              season_label: attrs?.season_label || "",
              format_label: attrs?.format_label || "",
              comfort_label: attrs?.comfort_label || "",
              uniqueness_label: attrs?.uniqueness_label || "",
              season_icon: attrs?.season_icon || "Sun",
              format_icon: attrs?.format_icon || "Tent",
              comfort_icon: attrs?.comfort_icon || "Star",
              uniqueness_icon: attrs?.uniqueness_icon || "Sparkles",
            },
          }),
    };
  },
});