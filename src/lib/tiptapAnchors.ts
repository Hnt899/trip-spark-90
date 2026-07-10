import type { Editor } from "@tiptap/react";

export type EditorAnchorItem = {
  pos: number;
  nodeType: "paragraph" | "heading";
  anchorLabel: string;
  previewText: string;
};

export function collectDocAnchors(editor: Editor): EditorAnchorItem[] {
  const items: EditorAnchorItem[] = [];
  editor.state.doc.forEach((node, pos) => {
    if (
      (node.type.name === "paragraph" || node.type.name === "heading") &&
      node.attrs.anchor
    ) {
      items.push({
        pos,
        nodeType: node.type.name as "paragraph" | "heading",
        anchorLabel: String(node.attrs.anchorLabel || node.textContent || "Якорь").trim(),
        previewText: node.textContent.trim().slice(0, 80),
      });
    }
  });
  return items;
}

export function getActiveBlockText(editor: Editor): string {
  const { $from } = editor.state.selection;
  for (let d = $from.depth; d >= 0; d -= 1) {
    const node = $from.node(d);
    if (node.type.name === "paragraph" || node.type.name === "heading") {
      return node.textContent.trim();
    }
  }
  return "";
}

export function setAnchorLabelAt(editor: Editor, pos: number, label: string) {
  const node = editor.state.doc.nodeAt(pos);
  if (!node) return;
  const { tr } = editor.state;
  editor.view.dispatch(
    tr.setNodeMarkup(pos, undefined, {
      ...node.attrs,
      anchorLabel: label,
    }),
  );
}

export function removeAnchorAt(editor: Editor, pos: number) {
  const node = editor.state.doc.nodeAt(pos);
  if (!node) return;
  const { tr } = editor.state;
  editor.view.dispatch(
    tr.setNodeMarkup(pos, undefined, {
      ...node.attrs,
      anchor: false,
      anchorLabel: null,
    }),
  );
}

export function focusAnchorAt(editor: Editor, pos: number) {
  editor
    .chain()
    .focus()
    .setTextSelection(pos + 1)
    .scrollIntoView()
    .run();
}

export function toggleAnchorOnActiveBlock(editor: Editor) {
  const type = editor.isActive("heading") ? "heading" : "paragraph";
  const attrs = editor.getAttributes(type);
  const willEnable = !attrs.anchor;

  if (willEnable) {
    const preview = getActiveBlockText(editor) || "Якорь";
    editor
      .chain()
      .focus()
      .updateAttributes(type, {
        anchor: true,
        anchorLabel: attrs.anchorLabel || preview.slice(0, 200),
      })
      .run();
  } else {
    editor
      .chain()
      .focus()
      .updateAttributes(type, { anchor: false, anchorLabel: null })
      .run();
  }
}
