import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { carouselDotClass } from "@/lib/sectionSurface";
import type { BlogArticle } from "@/types/blogArticle";
import BlogArticleCard from "@/components/blog/BlogArticleCard";

interface EditorsPickSliderProps {
  articles: BlogArticle[];
}

const EditorsPickSlider = ({ articles }: EditorsPickSliderProps) => {
  const [index, setIndex] = useState(0);

  if (articles.length === 0) return null;

  const prev = () =>
    setIndex((i) => (i - 1 + articles.length) % articles.length);
  const next = () => setIndex((i) => (i + 1) % articles.length);

  /** Те же отступы, что у ряда со стрелками — заголовок не шире средней колонки (карточки) */
  const carouselRowClass =
    "flex min-w-0 items-center gap-2 sm:gap-3 md:gap-4";

  return (
    <section
      className="mb-10 md:mb-12"
      aria-labelledby="blog-editors-pick-heading"
    >
      <div className="-mx-2 min-w-0 sm:-mx-3 md:-mx-4 lg:-mx-5">
        <div className={cn(carouselRowClass, "mb-4")}>
          <div
            className="pointer-events-none shrink-0 select-none"
            aria-hidden
          >
            <div className="size-10 sm:size-11" />
          </div>
          <div className="flex min-w-0 flex-1 justify-end">
            {/* Как у featured-карточки: sm картинка 48%, текст 52%; md+ картинка 52%, текст 48% */}
            <div
              className={cn(
                "flex min-w-0 justify-end overflow-hidden",
                "w-full max-w-full",
                "sm:ml-[48%] sm:w-[52%] sm:max-w-[52%]",
                "md:ml-[52%] md:w-[48%] md:max-w-[48%]",
              )}
            >
              <h2
                id="blog-editors-pick-heading"
                className="heading-gradient max-w-full scroll-mt-[calc(var(--site-header-height)+0.75rem)] break-words text-right text-2xl font-bold tracking-tight md:text-3xl"
              >
                Выбор редакции
              </h2>
            </div>
          </div>
          <div
            className="pointer-events-none shrink-0 select-none"
            aria-hidden
          >
            <div className="size-10 sm:size-11" />
          </div>
        </div>

        {/* Стрелки снаружи карточки: ряд [назад] [карточка] [вперёд] */}
        <div className={carouselRowClass}>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full border-slate-200 bg-white shadow-md hover:bg-white sm:h-11 sm:w-11"
            onClick={prev}
            aria-label="Предыдущий материал"
          >
            <ChevronLeft className="h-5 w-5 text-primary" />
          </Button>

          <div className="min-w-0 flex-1">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex items-start transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {articles.map((a) => (
                  <div
                    key={a.id}
                    className="w-full min-w-0 shrink-0 self-start"
                  >
                    <BlogArticleCard article={a} variant="featured" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full border-slate-200 bg-white shadow-md hover:bg-white sm:h-11 sm:w-11"
            onClick={next}
            aria-label="Следующий материал"
          >
            <ChevronRight className="h-5 w-5 text-primary" />
          </Button>
        </div>

        <div className="mt-4 flex justify-center gap-2" role="tablist">
          {articles.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Слайд ${i + 1}`}
              className={cn(carouselDotClass("light", i === index))}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorsPickSlider;
