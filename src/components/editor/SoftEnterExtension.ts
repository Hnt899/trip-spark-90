import { Extension } from "@tiptap/core";

/**
 * Custom Enter behaviour:
 *
 * - **Heading**: Enter splits the heading and converts the new block to a
 *   plain paragraph so the user never accidentally chains headings.
 *
 * - **Paragraph / Blockquote**: single Enter inserts a soft line break
 *   (`<br>`, stays in the same block). If the character right before the
 *   cursor is already a `<br>` (i.e. Enter×2), the previous `<br>` is
 *   removed and the block is split into two → new paragraph.
 *
 * - **Lists**: default Tiptap behaviour (new list item) is preserved.
 */
export const SoftEnterExtension = Extension.create({
  name: "softEnter",

  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => {
        const { state } = editor;
        const { $from, empty } = state.selection;
        if (!empty) return false;

        for (let d = $from.depth; d >= 0; d--) {
          const name = $from.node(d).type.name;
          if (
            name === "listItem" ||
            name === "bulletList" ||
            name === "orderedList"
          ) {
            return false;
          }
        }

        const parent = $from.parent;

        if (parent.type.name === "heading") {
          return editor.chain().splitBlock().setNode("paragraph").run();
        }

        if (
          parent.type.name !== "paragraph" &&
          parent.type.name !== "blockquote"
        ) {
          return false;
        }

        if ($from.nodeBefore?.type.name === "hardBreak") {
          return editor
            .chain()
            .deleteRange({ from: $from.pos - 1, to: $from.pos })
            .splitBlock()
            .run();
        }

        return editor.commands.setHardBreak();
      },
    };
  },
});
