import { useCallback, useEffect, useState } from "react";
import type { BlogCarouselMode, BlogCarouselSlide } from "@/types/blogContent";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

function slideCaption(s: BlogCarouselSlide): string | undefined {
  if (s.caption?.trim()) return s.caption.trim();
  const x = s as BlogCarouselSlide;
  const parts = [x.route, x.subtitle, x.price, x.oldPrice, x.badge, x.discount]
    .filter((p) => p != null && String(p).trim());
  const t = parts.join("\n").trim();
  return t || undefined;
}

export default function BlogCarouselBlock({
  slides,
  mode = "manual",
  intervalSec = 5,
  className,
}: {
  slides: BlogCarouselSlide[];
  mode?: BlogCarouselMode;
  intervalSec?: number;
  className?: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const autoplayEnabled = mode === "auto" || mode === "hybrid";
  const allowManual = mode !== "auto";

  const onSelect = useCallback((carousel: CarouselApi) => {
    setCurrent(carousel.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api || !autoplayEnabled || slides.length < 2 || paused) return;
    const ms = Math.min(30, Math.max(1, intervalSec || 5)) * 1000;
    const id = window.setInterval(() => {
      api.scrollNext();
    }, ms);
    return () => window.clearInterval(id);
  }, [api, autoplayEnabled, intervalSec, paused, slides.length]);

  if (!slides.length) return null;

  return (
    <div
      className={cn("my-8 w-full", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: slides.length > 1,
          containScroll: "trimSnaps",
          watchDrag: allowManual,
        }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((s, i) => {
            const cap = slideCaption(s);
            return (
              <CarouselItem
                key={i}
                className="basis-full"
              >
                <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(16,10,111,0.08)] dark:border-slate-800 dark:bg-slate-950">
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-muted">
                    <img
                      src={s.image}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {cap ? (
                    <figcaption className="border-t border-slate-100 px-4 py-3 text-center text-sm leading-relaxed text-slate-600 whitespace-pre-wrap dark:border-slate-800 dark:text-slate-300 md:px-5 md:py-4">
                      {cap}
                    </figcaption>
                  ) : null}
                </figure>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      {slides.length > 1 && allowManual ? (
        <div
          className="mt-4 flex justify-center gap-2"
          role="tablist"
          aria-label="Слайды карусели"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              className={cn(
                "h-2 rounded-full transition-all",
                i === current
                  ? "w-8 bg-primary"
                  : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600",
              )}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
