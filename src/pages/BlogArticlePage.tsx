import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getBlogArticleBySlug } from "@/data/blogArticles";
import { cn } from "@/lib/utils";
import type { BlogBadge } from "@/types/blogArticle";

const BADGE_LABEL: Record<BlogBadge, string> = {
  own: "Наша статья",
  partner: "Партнёр",
  ad: "Реклама",
};

const BlogArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getBlogArticleBySlug(slug) : undefined;

  if (!article) {
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

  const dateRu = new Date(article.publishedAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-white dark:bg-background">
      <Header />
      <article className="mx-auto max-w-3xl px-4 py-[calc(var(--site-header-height)+1.5rem)] pb-16 md:px-6">
        <div className="mb-6 flex flex-wrap gap-2">
          {article.badges.map((b) => (
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
        <h1 className="heading-gradient text-3xl font-bold tracking-tight md:text-4xl">
          {article.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {dateRu} · {article.readingMinutes} мин чтения
        </p>
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-muted dark:border-slate-800">
          <img
            src={article.coverImage}
            alt=""
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
        <p className="mt-8 text-lg leading-relaxed text-slate-700 dark:text-slate-200">
          {article.excerpt}
        </p>
        <div className="mt-10 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-6 text-center text-muted-foreground dark:border-slate-700 dark:bg-slate-900/40">
          Полный текст материала появится здесь после подключения редактора и
          админ-панели. Сейчас карточка в ленте уже привязана к этому адресу —{" "}
          <span className="font-mono text-sm">/blog/{article.slug}</span>.
        </div>
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
