import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiFetch } from "@/lib/api";
import type { GuidePost } from "@/types/guideCms";
import BlogBlockRenderer from "@/components/blog/BlogBlockRenderer";
import ArticleTabs from "@/components/blog/ArticleTabs";

export default function GuideArticlePage() {
  const { category, slug } = useParams<{ category: string; slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category, slug]);

  if (!category || !slug) {
    return <Navigate to="/guide" replace />;
  }

  const q = useQuery({
    queryKey: ["guide-post", category, slug],
    enabled: Boolean(category && slug),
    queryFn: async () => {
      try {
        return await apiFetch<GuidePost>(
          `/api/guide/posts/by-category/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`,
        );
      } catch (e) {
        const err = e as Error & { status?: number };
        if (err.status === 404) return null;
        throw e;
      }
    },
  });

  if (q.isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex min-h-[50vh] items-center justify-center pt-[calc(var(--site-header-height)+2rem)]">
          <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
        </main>
        <Footer />
      </div>
    );
  }

  if (q.isError) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-xl px-4 py-[calc(var(--site-header-height)+3rem)] text-center">
          <h1 className="text-2xl font-bold text-foreground">Ошибка загрузки</h1>
          <p className="mt-2 text-muted-foreground">Попробуйте обновить страницу.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const post = q.data;
  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-xl px-4 py-[calc(var(--site-header-height)+3rem)] text-center">
          <h1 className="text-2xl font-bold text-foreground">Статья не найдена</h1>
          <p className="mt-2 text-muted-foreground">Проверьте ссылку или вернитесь к путеводителю.</p>
          <div className="mt-6">
            <Link to="/guide" className="text-primary hover:underline">
              Вернуться к путеводителю
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-4xl pt-24 pb-12 md:pt-32">
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link to="/guide" className="hover:text-primary">
            Путеводитель
          </Link>
          <span>/</span>
          <span>{post.category_name}</span>
          <span>/</span>
          <span className="text-foreground">{post.title}</span>
        </div>

        <h1 className="heading-gradient mb-6 text-3xl font-bold tracking-tight md:text-4xl">{post.title}</h1>
        {post.excerpt ? <p className="mb-8 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p> : null}
        <ArticleTabs blocks={post.content_blocks} />
        <BlogBlockRenderer blocks={post.content_blocks} />
      </main>
      <Footer />
    </div>
  );
}
