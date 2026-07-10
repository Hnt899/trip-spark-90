import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { BlogArticle } from "@/types/blogArticle";

interface SimilarArticlesSidebarProps {
  articles: BlogArticle[];
  className?: string;
}

export default function SimilarArticlesSidebar({
  articles,
  className,
}: SimilarArticlesSidebarProps) {
  if (!articles.length) return null;

  return (
    <aside className={cn("w-full", className)} aria-label="Похожие статьи">
      <ul className="space-y-3">
        {articles.map((article) => (
          <li key={article.id}>
            <Link
              to={`/blog/${article.slug}`}
              className="group block overflow-hidden rounded-2xl border border-[#867DFF]/40 bg-white transition-shadow hover:shadow-md hover:shadow-[#867DFF]/10"
            >
              {article.coverImage ? (
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={article.coverImage}
                    alt=""
                    className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                  />
                </div>
              ) : null}
              <p className="px-3 py-3 text-sm italic leading-snug text-[#867DFF] group-hover:text-[#6b5fe0]">
                {article.title}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** Горизонтальный вариант для мобильных экранов */
export function SimilarArticlesMobile({
  articles,
  className,
}: SimilarArticlesSidebarProps) {
  if (!articles.length) return null;

  return (
    <section className={cn("lg:hidden", className)} aria-label="Похожие статьи">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#867DFF]">
        Похожие статьи
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/blog/${article.slug}`}
            className="w-56 shrink-0 overflow-hidden rounded-2xl border border-[#867DFF]/40 bg-white"
          >
            {article.coverImage ? (
              <img
                src={article.coverImage}
                alt=""
                className="aspect-[16/10] w-full object-cover"
              />
            ) : null}
            <p className="px-3 py-2 text-sm italic text-[#867DFF] line-clamp-2">
              {article.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
