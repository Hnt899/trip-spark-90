import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BlogArticle, BlogBadge } from "@/types/blogArticle";
import { sectionCardLiftClass } from "@/lib/sectionSurface";

const BADGE_META: Record<
  BlogBadge,
  { label: string; className: string }
> = {
  own: {
    label: "Наша статья",
    className:
      "bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.25)]",
  },
  partner: {
    label: "Партнёр",
    className:
      "bg-violet-100 text-violet-900 border-violet-200 dark:bg-violet-950/50 dark:text-violet-200 dark:border-violet-800",
  },
  ad: {
    label: "Реклама",
    className:
      "bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-950/40 dark:text-amber-100 dark:border-amber-800",
  },
};

function formatPublished(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

interface BlogArticleCardProps {
  article: BlogArticle;
  variant?: "grid" | "featured";
  className?: string;
}

const BlogArticleCard = ({
  article,
  variant = "grid",
  className,
}: BlogArticleCardProps) => {
  const isFeatured = variant === "featured";

  return (
    <article
      className={cn(
        "group flex min-w-0 max-w-full flex-col overflow-hidden break-words rounded-2xl bg-card text-card-foreground",
        sectionCardLiftClass("light"),
        /* В сетке блога строка тянется по самой высокой карточке; h-full заполняет ячейку */
        !isFeatured && "h-full",
        /* Featured в слайдере: фиксированная высота на sm+, картинка только object-cover внутри неё */
        isFeatured &&
          "sm:flex-row sm:h-[300px] md:h-[320px] lg:h-[340px]",
        className,
      )}
    >
      <Link
        to={`/blog/${article.slug}`}
        className={cn(
          "relative block shrink-0 overflow-hidden bg-muted",
          isFeatured
            ? "aspect-[16/10] max-h-[220px] sm:aspect-auto sm:max-h-none sm:h-full sm:w-[48%] sm:min-h-0 md:w-[52%]"
            : "aspect-[16/10]",
        )}
      >
        {article.coverImage ? (
          <img
            src={article.coverImage}
            alt=""
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="flex h-full min-h-[140px] w-full items-center justify-center bg-gradient-to-br from-muted to-muted/60 text-xs font-medium text-muted-foreground"
            aria-hidden
          >
            Без обложки
          </div>
        )}
      </Link>
      <div
        className={cn(
          "flex min-h-0 min-w-0 flex-1 flex-col p-4 md:p-5",
          isFeatured && "justify-center overflow-hidden sm:py-4",
        )}
      >
        {isFeatured ? (
          <>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {article.badges.map((b) => (
                <span
                  key={b}
                  className={cn(
                    "inline-flex rounded-full border px-2 py-0.5 text-xs font-medium",
                    BADGE_META[b].className,
                  )}
                >
                  {BADGE_META[b].label}
                </span>
              ))}
            </div>
            <Link
              to={`/blog/${article.slug}`}
              className="min-w-0 max-w-full"
            >
              <h3 className="line-clamp-3 break-words text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-primary dark:text-white md:text-2xl md:leading-snug">
                {article.title}
              </h3>
            </Link>
            <p className="mt-1 max-w-full break-words text-xs text-muted-foreground">
              {formatPublished(article.publishedAt)} · {article.readingMinutes}{" "}
              мин чтения
            </p>
            <p className="mt-2 max-w-full break-words text-base text-muted-foreground line-clamp-3">
              {article.excerpt}
            </p>
            <div className="mt-4 min-w-0 w-fit max-w-full">
              <Button asChild size="default">
                <Link to={`/blog/${article.slug}`}>Читать</Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="min-w-0 shrink-0">
              <div className="mb-2 flex flex-wrap gap-1.5">
                {article.badges.map((b) => (
                  <span
                    key={b}
                    className={cn(
                      "inline-flex rounded-full border px-2 py-0.5 text-xs font-medium",
                      BADGE_META[b].className,
                    )}
                  >
                    {BADGE_META[b].label}
                  </span>
                ))}
              </div>
              <Link
                to={`/blog/${article.slug}`}
                className="min-w-0 max-w-full"
              >
                <h3 className="line-clamp-2 break-words text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-primary dark:text-white">
                  {article.title}
                </h3>
              </Link>
              <p className="mt-1 max-w-full break-words text-xs text-muted-foreground">
                {formatPublished(article.publishedAt)} ·{" "}
                {article.readingMinutes} мин чтения
              </p>
              <p className="mt-2 max-w-full break-words text-sm text-muted-foreground line-clamp-2">
                {article.excerpt}
              </p>
            </div>
            <div className="mt-auto min-w-0 w-fit max-w-full shrink-0 pt-4">
              <Button asChild size="sm">
                <Link to={`/blog/${article.slug}`}>Читать</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </article>
  );
};

export default BlogArticleCard;
