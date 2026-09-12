import { Extension } from "@tiptap/core";

export const TableRowAnchorExtension = Extension.create({
  name: "tableRowAnchor",

  addGlobalAttributes() {
    return [
      {
        types: ["tableRow"],
        attributes: {
          tableAnchorId: {
            default: null,
            parseHTML: (el) => el.getAttribute("data-table-anchor-id"),
            renderHTML: (attrs) => {
              if (!attrs.tableAnchorId) return {};
              return { "data-table-anchor-id": String(attrs.tableAnchorId) };
            },
          },
        },
      },
    ];
  },
});