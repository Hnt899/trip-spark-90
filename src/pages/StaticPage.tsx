import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiFetch } from "@/lib/api";
import BlogBlockRenderer from "@/components/blog/BlogBlockRenderer";
import type { BlogContentBlock } from "@/types/blogContent";

type StaticPageResponse = {
  id: string;
  slug: string;
  title: string;
  content_blocks: BlogContentBlock[];
  seo_title: string | null;
  seo_description: string | null;
  status: string;
};

export default function StaticPage() {
  const { slug } = useParams<{ slug: string }>();

  const q = useQuery({
    queryKey: ["static-page", slug],
    enabled: Boolean(slug),
    queryFn: async () => {
      try {
        return await apiFetch<StaticPageResponse>(`/api/pages/${encodeURIComponent(slug || "")}`);
      } catch (e) {
        const err = e as Error & { status?: number };
        if (err.status === 404) return null;
        throw e;
      }
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug) return <Navigate to="/" replace />;

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

  const page = q.data;
  if (!page) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-xl px-4 py-[calc(var(--site-header-height)+3rem)] text-center">
          <h1 className="text-2xl font-bold text-foreground">Страница не найдена</h1>
          <p className="mt-2 text-muted-foreground">Проверьте ссылку или вернитесь на главную.</p>
          <div className="mt-6">
            <Link to="/" className="text-primary hover:underline">
              На главную
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
          <Link to="/" className="hover:text-primary">Главная</Link>
          <span>/</span>
          <span className="text-foreground">{page.title}</span>
        </div>

        <h1 className="heading-gradient mb-8 text-3xl font-bold tracking-tight md:text-4xl">
          {page.title}
        </h1>

        {page.content_blocks.length === 0 ? (
          <p className="text-muted-foreground">Информация скоро появится.</p>
        ) : (
          <BlogBlockRenderer blocks={page.content_blocks} />
        )}
      </main>
      <Footer />
    </div>
  );
}
