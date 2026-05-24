import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiFetch } from "@/lib/api";
import type { ReferenceKind, ReferencePost } from "@/types/referenceCms";
import BlogBlockRenderer from "@/components/blog/BlogBlockRenderer";
import ArticleTabs from "@/components/blog/ArticleTabs";

const KIND_LABEL: Record<ReferenceKind, string> = {
  trains: "Поезда",
  flights: "Самолеты",
  buses: "Автобусы",
};

type Props = {
  kind?: ReferenceKind;
};

export default function ReferenceArticlePage({ kind: kindProp }: Props) {
  const params = useParams<{ slug: string; kind: string }>();
  const kind = (kindProp || params.kind) as ReferenceKind;
  const slug = params.slug;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [kind, slug]);

  const q = useQuery({
    queryKey: ["reference-post", kind, slug],
    enabled: Boolean(kind && slug),
    queryFn: async () => {
      try {
        return await apiFetch<ReferencePost>(
          `/api/reference/posts/by-kind/${encodeURIComponent(kind)}/${encodeURIComponent(slug!)}`,
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
          <p className="mt-2 text-muted-foreground">Проверьте ссылку или откройте список раздела.</p>
          <div className="mt-6">
            <Link to={`/reference/${kind}`} className="text-primary hover:underline">
              Вернуться к разделу «{KIND_LABEL[kind]}»
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
          <Link to="/reference" className="hover:text-primary">
            Справочная
          </Link>
          <span>/</span>
          <Link to={`/reference/${kind}`} className="hover:text-primary">
            {KIND_LABEL[kind]}
          </Link>
          <span>/</span>
          <span className="text-foreground">{post.title}</span>
        </div>

        <h1 className="heading-gradient mb-6 text-3xl font-bold tracking-tight md:text-4xl">
          {post.title}
        </h1>
        {post.excerpt ? (
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
        ) : null}

        <ArticleTabs blocks={post.content_blocks} />
        <BlogBlockRenderer blocks={post.content_blocks} />
      </main>
      <Footer />
    </div>
  );
}
