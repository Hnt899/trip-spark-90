import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronLeft, ChevronRight, Handshake } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogArticle } from "@/types/blogArticle";
import BlogArticleCard from "@/components/blog/BlogArticleCard";

/** Как у блока «Рекламные спецпроекты» */
const PARTNERS_GRID_CLASS =
  "grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3";

const INITIAL_PARTNER_CARDS = 3;

interface PartnersArticleScrollerProps {
  articles: BlogArticle[];
  title: string;
  id: string;
  className?: string;
  /** grid — 3 карточки + «Показать ещё» / «Свернуть» с анимацией; scroll — горизонтальная прокрутка */
  layout?: "scroll" | "grid";
}

const SCROLL_STEP = 340;

const PartnersArticleScroller = ({
  articles,
  title,
  id,
  className,
  layout = "scroll",
}: PartnersArticleScrollerProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [articles.length]);

  if (articles.length === 0) return null;

  const scrollByDir = (dir: -1 | 1) => {
    scrollerRef.current?.scrollBy({
      left: dir * SCROLL_STEP,
      behavior: "smooth",
    });
  };

  const isGrid = layout === "grid";
  const firstRow = articles.slice(0, INITIAL_PARTNER_CARDS);
  const restRow = articles.slice(INITIAL_PARTNER_CARDS);
  const hasMorePartners = isGrid && restRow.length > 0;

  const gridShellClass =
    "rounded-3xl border border-[hsl(var(--primary)/0.18)] bg-gradient-to-br from-[hsl(var(--primary)/0.07)] via-white to-violet-100/40 p-6 shadow-[0_12px_48px_rgba(16,10,111,0.08)] md:p-8 dark:border-primary/30 dark:from-primary/[0.12] dark:via-slate-950 dark:to-violet-950/25";

  return (
    <section
      className={cn("mb-12 md:mb-16", className)}
      aria-labelledby={id}
    >
      {isGrid ? (
        <div className={gridShellClass}>
          <header className="mb-6 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/90 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary shadow-sm backdrop-blur-sm dark:border-primary/40 dark:bg-slate-900/70 dark:text-violet-200">
              <Handshake className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
              Партнёрский контент
            </div>
            <h2
              id={id}
              className="heading-gradient text-2xl font-bold tracking-tight md:text-3xl"
            >
              {title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Обзоры и советы от проверенных партнёров — наравне с материалами
              редакции мы помечаем их отдельно, чтобы вы знали источник.
            </p>
          </header>
          <div className={PARTNERS_GRID_CLASS}>
            {firstRow.map((a) => (
              <div
                key={a.id}
                className="flex h-full min-h-0 min-w-0 flex-col"
              >
                <BlogArticleCard article={a} className="h-full" />
              </div>
            ))}
          </div>

          {hasMorePartners ? (
            <Collapsible open={expanded} onOpenChange={setExpanded}>
              <CollapsibleContent
                className={cn(
                  "overflow-hidden",
                  "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
                )}
              >
                <div className={cn(PARTNERS_GRID_CLASS, "mt-6")}>
                  {restRow.map((a) => (
                    <div
                      key={a.id}
                      className="flex h-full min-h-0 min-w-0 flex-col"
                    >
                      <BlogArticleCard article={a} className="h-full" />
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ) : null}

          {hasMorePartners ? (
            <div className="mt-10 flex justify-center">
              {!expanded ? (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="min-w-[200px] border-primary/40 bg-white/90 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground dark:bg-slate-900/80 dark:hover:bg-primary dark:hover:text-primary-foreground"
                  onClick={() => setExpanded(true)}
                >
                  Показать ещё
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="min-w-[200px] border-primary/40 bg-white/90 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground dark:bg-slate-900/80 dark:hover:bg-primary dark:hover:text-primary-foreground"
                  onClick={() => setExpanded(false)}
                >
                  Свернуть
                </Button>
              )}
            </div>
          ) : null}
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <h2
              id={id}
              className="heading-gradient text-2xl font-bold tracking-tight md:text-3xl"
            >
              {title}
            </h2>
            <div className="hidden gap-2 sm:flex">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-slate-200 bg-white shadow-sm"
                onClick={() => scrollByDir(-1)}
                aria-label="Прокрутить влево"
              >
                <ChevronLeft className="h-4 w-4 text-primary" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full border-slate-200 bg-white shadow-sm"
                onClick={() => scrollByDir(1)}
                aria-label="Прокрутить вправо"
              >
                <ChevronRight className="h-4 w-4 text-primary" />
              </Button>
            </div>
          </div>
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {articles.map((a) => (
              <div
                key={a.id}
                className="w-[min(100%,280px)] shrink-0 snap-start sm:w-[300px]"
              >
                <BlogArticleCard article={a} className="h-full" />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default PartnersArticleScroller;
