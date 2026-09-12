import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { sectionShellClass, logoGradientText } from "@/lib/sectionSurface";
import type { SectionSurface } from "@/lib/sectionSurface";
import { cn } from "@/lib/utils";
import { usePageSectionFields } from "@/contexts/PageCmsContext";
import type { BlogInviteFields } from "@/types/pageContent";
import { CmsEditable } from "@/components/cms/CmsEditable";
import { cmsColorStyle, cmsHeadingClass } from "@/lib/cmsStyle";
import type { BlogArticle } from "@/types/blogArticle";
import StoriesCarousel from "@/components/blog/StoriesCarousel";

interface BlogInviteSectionProps {
  surface?: SectionSurface;
}

/** Приводит статью блога к форме, которую ждёт StoriesCarousel */
function toStory(a: BlogArticle, index: number) {
  return {
    id: a.id || String(index),
    city: a.title,
    text: a.excerpt || "",
    images: a.coverImage ? [a.coverImage] : [],
    href: `/blog/${a.slug}`,
    date: a.publishedAt,
    route: "",
  };
}

const BlogInviteSection = ({ surface = "light" }: BlogInviteSectionProps) => {
  const navigate = useNavigate();
  const f = usePageSectionFields<BlogInviteFields>("blogInvite");

  const badge = f.badge || "Для читателей";
  const title = f.title || "Актуальные новости для путешественников";
  const subtitle = f.subtitle || "Свежие статьи редакции";
  const ctaLabel = f.ctaLabel || "Перейти в блог";
  const ctaHref = f.ctaHref || "/blog";
  const articleIds: string[] = Array.isArray(f.articleIds) ? f.articleIds : [];

  // Загружаем статьи блога (все опубликованные)
  const postsQ = useQuery({
    queryKey: ["blog-posts-public-for-home"],
    queryFn: async () => {
      const r = await fetch("/api/blog/posts");
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return (await r.json()) as BlogArticle[];
    },
    staleTime: 5 * 60 * 1000,
  });

  // Отбираем статьи: сначала по ids, если их нет — последние 6
  const selectedArticles = useMemo(() => {
    const all = postsQ.data || [];
    if (articleIds.length > 0) {
      const map = new Map(all.map((a) => [a.id, a]));
      return articleIds
        .map((id) => map.get(id))
        .filter((a): a is BlogArticle => !!a)
        .slice(0, 10);
    }
    return all.slice(0, 6);
  }, [postsQ.data, articleIds]);

  const stories = selectedArticles.map((a, i) => toStory(a, i));

  return (
    <CmsEditable sectionId="blogInvite">
      <section className={sectionShellClass(surface, "py-16 md:py-24")}>
        <div className="container relative z-10">
          <div
            className="w-full min-w-0 rounded-3xl border border-[hsl(var(--primary)/0.14)] bg-gradient-to-br from-slate-50/98 via-white to-[hsl(var(--primary)/0.05)] px-6 py-7 shadow-[0_12px_44px_rgba(16,10,111,0.07)] md:px-8 md:py-9"
            aria-label="Актуальные новости для путешественников"
          >
            <div className="mb-6 flex flex-col items-start gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
              <header className="border-l-4 border-primary pl-4">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-[hsl(var(--primary)/0.08)] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                  <BookOpen className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {badge}
                </div>
                <h2
                  className={cn(
                    cmsHeadingClass(
                      f.titleColor,
                      "text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl " + logoGradientText,
                    ),
                  )}
                  style={cmsColorStyle(f.titleColor)}
                >
                  {title}
                </h2>
                {subtitle ? (
                  <p
                    className="mt-2 text-sm text-slate-600 md:text-base"
                    style={cmsColorStyle(f.subtitleColor)}
                  >
                    {subtitle}
                  </p>
                ) : null}
              </header>
              <Button
                variant="ghost"
                className="flex shrink-0 items-center gap-2"
                onClick={() => navigate(ctaHref)}
              >
                {ctaLabel} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            {postsQ.isLoading ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-80 animate-pulse rounded-2xl bg-muted" />
                ))}
              </div>
            ) : stories.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Пока нет опубликованных статей. Перейдите в блог, чтобы создать первую.
              </p>
            ) : (
              <StoriesCarousel stories={stories} />
            )}
          </div>
        </div>
      </section>
    </CmsEditable>
  );
};

export default BlogInviteSection;