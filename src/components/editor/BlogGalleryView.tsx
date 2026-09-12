import { useCallback, useRef } from "react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { GalleryHorizontal, ImagePlus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImages } from "@/lib/uploadImages";
import type { BlogCarouselMode, BlogCarouselSlide } from "@/types/blogContent";

export function BlogGalleryView({
  node,
  updateAttributes,
  deleteNode,
  selected,
}: NodeViewProps) {
  const slides: BlogCarouselSlide[] = node.attrs.slides || [];
  const mode: BlogCarouselMode = node.attrs.mode || "manual";
  const intervalSec = Number(node.attrs.intervalSec) || 5;
  const fileRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return;
      try {
        const urls = await uploadImages(Array.from(files));
        const newSlides: BlogCarouselSlide[] = urls.map((url) => ({
          image: url,
        }));
        updateAttributes({ slides: [...slides, ...newSlides] });
      } catch (e) {
        console.error("Gallery upload failed", e);
      }
    },
    [slides, updateAttributes],
  );

  const removeSlide = useCallback(
    (index: number) => {
      updateAttributes({ slides: slides.filter((_, i) => i !== index) });
    },
    [slides, updateAttributes],
  );

  const updateSlideField = useCallback(
    (index: number, patch: Partial<BlogCarouselSlide>) => {
      const next = slides.map((s, i) => (i === index ? { ...s, ...patch } : s));
      updateAttributes({ slides: next });
    },
    [slides, updateAttributes],
  );

  return (
    <NodeViewWrapper
      data-type="blog-gallery"
      className={`my-4 rounded-lg border-2 p-3 transition-colors ${
        selected ? "border-primary" : "border-slate-200 dark:border-slate-800"
      }`}
      draggable
      data-drag-handle=""
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <GalleryHorizontal className="h-4 w-4" />
          Галерея ({slides.length} фото)
        </div>
        <div className="flex flex-wrap items-center gap-1">
          {(
            [
              { v: "manual", t: "Вручную" },
              { v: "auto", t: "Авто" },
              { v: "hybrid", t: "Авто + вручную" },
            ] as const
          ).map((x) => (
            <Button
              key={x.v}
              type="button"
              size="sm"
              variant={mode === x.v ? "default" : "outline"}
              className="h-8 px-2.5 text-xs"
              onClick={() => updateAttributes({ mode: x.v as BlogCarouselMode })}
            >
              {x.t}
            </Button>
          ))}
        </div>

        {mode !== "manual" ? (
          <div className="flex items-center gap-1">
            <Input
              type="number"
              min={1}
              max={30}
              value={intervalSec}
              onChange={(e) => {
                const n = parseInt(e.target.value || "5", 10);
                updateAttributes({
                  intervalSec: Number.isFinite(n) ? Math.min(30, Math.max(1, n)) : 5,
                });
              }}
              className="h-8 w-20 text-xs"
              title="Интервал автопрокрутки в секундах"
            />
            <span className="text-xs text-muted-foreground">сек</span>
          </div>
        ) : null}

        <div className="ml-auto flex gap-1">
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => fileRef.current?.click()}
          >
            <ImagePlus className="mr-1 h-4 w-4" />
            Добавить
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={deleteNode}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {slides.length === 0 ? (
        <div
          className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-muted/30 py-10 transition-colors hover:border-primary hover:bg-muted/50 dark:border-slate-700"
          onClick={() => fileRef.current?.click()}
        >
          <GalleryHorizontal className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Нажмите или перетащите изображения
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {slides.map((slide, i) => (
            <div key={i} className="group relative space-y-1.5">
              <div className="relative flex items-center justify-center overflow-hidden rounded-lg border bg-transparent">
                <img
                  src={slide.image}
                  alt={slide.alt || ""}
                  className="aspect-[4/3] w-full object-contain"
                  draggable={false}
                />
                <button
                  type="button"
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => removeSlide(i)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              <Input
                value={slide.alt || ""}
                onChange={(e) => updateSlideField(i, { alt: e.target.value })}
                placeholder="Alt-текст (SEO)"
                className="h-7 text-xs"
              />
              <Input
                value={slide.caption || ""}
                onChange={(e) => updateSlideField(i, { caption: e.target.value })}
                placeholder="Подпись"
                className="h-7 text-xs text-muted-foreground"
              />
            </div>
          ))}
        </div>
      )}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />
    </NodeViewWrapper>
  );
}