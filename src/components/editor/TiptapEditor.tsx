import { useCallback } from "react";
import { useEditor, EditorContent, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Dropcursor from "@tiptap/extension-dropcursor";
import { BlogImageExtension } from "./BlogImageExtension";
import { BlogGalleryExtension } from "./BlogGalleryExtension";
import { SoftEnterExtension } from "./SoftEnterExtension";
import { TiptapToolbar } from "./TiptapToolbar";
import { uploadImages } from "@/lib/uploadImages";
import type { BlogContentBlock } from "@/types/blogContent";
import { blocksToTiptap, tiptapToBlocks } from "@/lib/tiptapBlockConverter";

interface Props {
  initialBlocks: BlogContentBlock[];
  onChange: (blocks: BlogContentBlock[]) => void;
}

export default function TiptapEditor({ initialBlocks, onChange }: Props) {
  const handleUpdate = useCallback(
    (json: JSONContent) => {
      onChange(tiptapToBlocks(json));
    },
    [onChange],
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        dropcursor: false,
      }),
      Dropcursor.configure({ color: "hsl(var(--primary))", width: 3 }),
      Placeholder.configure({
        placeholder: "Начните писать статью…",
      }),
      BlogImageExtension,
      BlogGalleryExtension,
      SoftEnterExtension,
    ],
    content: blocksToTiptap(initialBlocks),
    onUpdate: ({ editor: e }) => handleUpdate(e.getJSON()),
    editorProps: {
      attributes: {
        class: [
          "prose prose-slate dark:prose-invert max-w-none min-h-[400px] px-5 py-4 focus:outline-none",
          "prose-h1:text-2xl prose-h1:font-bold prose-h1:tracking-tight prose-h1:mt-6 prose-h1:mb-2",
          "prose-h2:text-xl prose-h2:font-semibold prose-h2:tracking-tight prose-h2:mt-5 prose-h2:mb-2",
          "prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-4 prose-h3:mb-1",
          "prose-p:my-1 prose-p:leading-relaxed",
          "prose-ul:my-2 prose-ul:list-disc prose-ul:pl-6",
          "prose-ol:my-2 prose-ol:list-decimal prose-ol:pl-6",
          "prose-li:my-0.5",
          "prose-blockquote:my-3 prose-blockquote:border-l-4 prose-blockquote:border-primary/40",
          "prose-blockquote:bg-muted/40 prose-blockquote:rounded-r-lg",
          "prose-blockquote:pl-4 prose-blockquote:pr-3 prose-blockquote:py-2 prose-blockquote:italic",
          "prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-300",
          "prose-hr:my-6 prose-hr:border-slate-200 dark:prose-hr:border-slate-700",
          "prose-strong:font-bold prose-em:italic",
        ].join(" "),
      },
      handleDrop: (view, event, _slice, moved) => {
        if (moved || !event.dataTransfer?.files?.length) return false;
        const images = Array.from(event.dataTransfer.files).filter((f) =>
          f.type.startsWith("image/"),
        );
        if (!images.length) return false;

        event.preventDefault();
        const coords = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        });

        uploadImages(images).then((urls) => {
          const { tr } = view.state;
          for (const url of urls) {
            const node = view.state.schema.nodes.blogImage.create({
              src: url,
              alt: "",
              caption: "",
            });
            if (coords) {
              tr.insert(coords.pos, node);
            } else {
              tr.insert(tr.doc.content.size, node);
            }
          }
          view.dispatch(tr);
        });

        return true;
      },
      handlePaste: (_view, event) => {
        const items = event.clipboardData?.items;
        if (!items) return false;
        const images: File[] = [];
        for (const item of Array.from(items)) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) images.push(file);
          }
        }
        if (!images.length) return false;

        event.preventDefault();
        uploadImages(images).then((urls) => {
          for (const url of urls) {
            editor?.commands.insertBlogImage({ src: url, alt: "", caption: "" });
          }
        });
        return true;
      },
    },
  });

  if (!editor) return null;

  return (
    <div>
      <div className="sticky top-0 z-30 rounded-t-xl border border-b-0 border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <TiptapToolbar editor={editor} />
      </div>
      <div className="rounded-b-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
