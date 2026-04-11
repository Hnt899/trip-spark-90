import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getBlogArticleBySlug } from "@/data/blogArticles";
import { apiFetch } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { BlogArticle, BlogBadge } from "@/types/blogArticle";
import type { BlogContentBlock } from "@/types/blogContent";
import BlogBlockRenderer from "@/components/blog/BlogBlockRenderer";
import { Loader2 } from "lucide-react";

const BADGE_LABEL: Record<BlogBadge, string> = {
  own: "Наша статья",
  partner: "Партнёр",
  ad: "Реклама",
};

type RemotePost = BlogArticle & { content_blocks: BlogContentBlock[] };

const BlogArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();

  const remoteQ = useQuery({
    queryKey: ["blog-post", slug],
    enabled: !!slug,
    queryFn: async () => {
      try {
        return await apiFetch<RemotePost>(
          `/api/blog/posts/by-slug/${encodeURIComponent(slug!)}`,
        );
      } catch (e) {
        const err = e as Error & { status?: number };
        if (err.status === 404) return null;
        throw e;
      }
    },
  });

  const staticArticle = slug ? getBlogArticleBySlug(slug) : undefined;
  const article = remoteQ.data ?? undefined;
  const meta: BlogArticle | undefined = article ?? staticArticle;

  if (remoteQ.isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-background">
        <Header />
        <main className="flex min-h-[50vh] items-center justify-center px-4 pt-[calc(var(--site-header-height)+2rem)]">
          <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
        </main>
        <Footer />
      </div>
    );
  }

  if (remoteQ.isError) {
    return (
      <div className="min-h-screen bg-white dark:bg-background">
        <Header />
        <main className="mx-auto max-w-xl px-4 py-[calc(var(--site-header-height)+3rem)] text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Ошибка загрузки
          </h1>
          <p className="mt-2 text-muted-foreground">Попробуйте обновить страницу.</p>
          <Button asChild className="mt-6">
            <Link to="/blog">К блогу</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  if (!meta) {
    return (
      <div className="min-h-screen bg-white dark:bg-background">
        <Header />
        <main className="mx-auto max-w-xl px-4 py-[calc(var(--site-header-height)+3rem)] text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Статья не найдена
          </h1>
          <p className="mt-2 text-muted-foreground">
            Проверьте ссылку или вернитесь к списку материалов.
          </p>
          <Button asChild className="mt-6">
            <Link to="/blog">К блогу</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const dateRu = new Date(meta.publishedAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <Header />
      <article className="mx-auto min-w-0 max-w-3xl break-words px-4 py-[calc(var(--site-header-height)+1.5rem)] pb-16 md:px-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {meta.badges.map((b) => (
            <span
              key={b}
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-xs font-medium",
                b === "own" &&
                  "border-[hsl(var(--primary)/0.25)] bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]",
                b === "partner" &&
                  "border-violet-200 bg-violet-100 text-violet-900 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-200",
                b === "ad" &&
                  "border-amber-300 bg-amber-100 text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100",
              )}
            >
              {BADGE_LABEL[b]}
            </span>
          ))}
        </div>
        <h1 className="heading-gradient break-words text-3xl font-bold tracking-tight md:text-4xl">
          {meta.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {dateRu} · {meta.readingMinutes} мин чтения
        </p>
        {meta.coverImage ? (
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-muted dark:border-slate-800">
            <img
              src={meta.coverImage}
              alt=""
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        ) : null}
        <p className="mt-8 break-words text-lg leading-relaxed text-slate-700 dark:text-slate-200">
          {meta.excerpt}
        </p>
        {article ? (
          <div className="mt-10 min-w-0">
            <BlogBlockRenderer blocks={article.content_blocks} />
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-6 text-center text-muted-foreground dark:border-slate-700 dark:bg-slate-900/40">
            Полный текст этой статьи пока только в статической версии проекта. Откройте
            материал из{" "}
            <Link to="/blog" className="text-primary underline-offset-2 hover:underline">
              блога
            </Link>{" "}
            после переноса в CMS или создайте статью с тем же slug в админке.
          </div>
        )}
        <div className="mt-10">
          <Button variant="outline" asChild>
            <Link to="/blog">Все статьи блога</Link>
          </Button>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogArticlePage;
