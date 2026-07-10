import { Extension } from "@tiptap/core";

/** Добавляет anchor / anchorLabel к paragraph и heading для навигации по статье. */
export const AnchorAttributesExtension = Extension.create({
  name: "anchorAttributes",

  addGlobalAttributes() {
    return [
      {
        types: ["paragraph", "heading"],
        attributes: {
          anchor: {
            default: false,
            parseHTML: (el) => el.getAttribute("data-anchor") === "true",
            renderHTML: (attrs) =>
              attrs.anchor ? { "data-anchor": "true" } : {},
          },
          anchorLabel: {
            default: null,
            parseHTML: (el) => el.getAttribute("data-anchor-label") || null,
            renderHTML: (attrs) =>
              attrs.anchorLabel
                ? { "data-anchor-label": attrs.anchorLabel }
                : {},
          },
        },
      },
    ];
  },
});
