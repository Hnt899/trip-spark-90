import { Node, mergeAttributes } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { RouteDaysView } from "./RouteDaysView";
import type { RouteDayItem } from "@/types/blogContent";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    routeDays: {
      insertRouteDays: (attrs?: {
        image?: string;
        days?: RouteDayItem[];
      }) => ReturnType;
    };
  }
}

export const RouteDaysExtension = Node.create({
  name: "routeDays",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      image: { default: "" },
      days: {
        default: [
          { label: "День 1", title: "", description: "" },
          { label: "День 2", title: "", description: "" },
          { label: "День 3", title: "", description: "" },
        ] as RouteDayItem[],
        parseHTML: (el: HTMLElement) => {
          try {
            return JSON.parse(el.getAttribute("data-days") || "[]");
          } catch {
            return [];
          }
        },
        renderHTML: (attrs: Record<string, unknown>) => ({
          "data-days": JSON.stringify(attrs.days || []),
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="route-days"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "route-days" }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(RouteDaysView);
  },

  addCommands() {
    return {
      insertRouteDays:
        (attrs) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: {
              image: attrs?.image || "",
              days: attrs?.days || [
                { label: "День 1", title: "", description: "" },
                { label: "День 2", title: "", description: "" },
                { label: "День 3", title: "", description: "" },
              ],
            },
          }),
    };
  },
});
