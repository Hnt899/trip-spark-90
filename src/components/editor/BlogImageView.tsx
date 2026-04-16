import { useCallback, useRef } from "react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { ImagePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImages } from "@/lib/uploadImages";

export function BlogImageView({ node, updateAttributes, deleteNode, selected }: NodeViewProps) {
  const src = node.attrs.src as string;
  const caption = node.attrs.caption as string;
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return;
      try {
        const urls = await uploadImages([files[0]]);
        if (urls[0]) updateAttributes({ src: urls[0] });
      } catch (e) {
        console.error("Image upload failed", e);
      }
    },
    [updateAttributes],
  );

  return (
    <NodeViewWrapper
      data-type="blog-image"
      className={`my-4 rounded-lg border-2 transition-colors ${
        selected ? "border-primary" : "border-transparent"
      }`}
      draggable
      data-drag-handle=""
    >
      {src ? (
        <figure className="group relative">
          <div className="flex min-h-[220px] w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-transparent dark:border-slate-800">
            <img
              src={src}
              alt={node.attrs.alt as string}
              className="mx-auto block h-auto max-h-[520px] w-auto max-w-full object-contain"
              draggable={false}
            />
          </div>
          <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="h-8 w-8"
              onClick={() => fileRef.current?.click()}
            >
              <ImagePlus className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="h-8 w-8"
              onClick={deleteNode}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Input
            value={caption}
            onChange={(e) => updateAttributes({ caption: e.target.value })}
            placeholder="Подпись к изображению (необязательно)"
            className="mt-2 text-sm text-muted-foreground"
          />
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files)}
          />
        </figure>
      ) : (
        <div
          className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-muted/50 py-12 transition-colors hover:border-primary hover:bg-muted dark:border-slate-700"
          onClick={() => fileRef.current?.click()}
        >
          <ImagePlus className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Нажмите или перетащите изображение
          </p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files)}
          />
        </div>
      )}
    </NodeViewWrapper>
  );
}
