import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { apiFetch } from "@/lib/api";
import type { ReferenceKind, ReferenceSection, ReferencePostListItem } from "@/types/referenceCms";
import { Loader2 } from "lucide-react";

const KIND_META: Record<
  ReferenceKind,
  { label: string; title: string; contactEmail: string }
> = {
  trains: {
    label: "Поезда",
    title: "Справочная информация о ж/д билетах",
    contactEmail: "railway@tudasuda.ru",
  },
  flights: {
    label: "Самолеты",
    title: "Справочная информация об авиабилетах",
    contactEmail: "flights@tudasuda.ru",
  },
  buses: {
    label: "Автобусы",
    title: "Справочная информация об автобусных билетах",
    contactEmail: "buses@tudasuda.ru",
  },
};

type Props = {
  kind: ReferenceKind;
};

export default function ReferenceKindPage({ kind }: Props) {
  const meta = KIND_META[kind];
  const sectionsQ = useQuery({
    queryKey: ["reference-sections", kind],
    queryFn: () =>
      apiFetch<ReferenceSection[]>(
        `/api/reference/sections?kind=${encodeURIComponent(kind)}`,
      ),
    retry: false,
  });
  const postsQ = useQuery({
    queryKey: ["reference-posts", kind],
    queryFn: () =>
      apiFetch<ReferencePostListItem[]>(
        `/api/reference/posts?kind=${encodeURIComponent(kind)}`,
      ),
    retry: false,
  });

  const groups = useMemo(() => {
    const sections = sectionsQ.data || [];
    const posts = postsQ.data || [];
    const top = sections.filter((s) => !s.parent_id);

    return top.map((parent) => {
      const directPosts = posts.filter((p) => p.section_id === parent.id);
      const children = sections
        .filter((s) => s.parent_id === parent.id)
        .map((child) => ({
          section: child,
          posts: posts.filter((p) => p.section_id === child.id),
        }))
        .filter((x) => x.posts.length > 0);

      return {
        section: parent,
        directPosts,
        children,
      };
    });
  }, [sectionsQ.data, postsQ.data]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-24 pb-12 md:pt-32">
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/reference" className="hover:text-primary">
            Справочная
          </Link>
          <span>/</span>
          <Link to={`/reference/${kind}`} className="hover:text-primary">
            {meta.label}
          </Link>
        </div>

        <h1 className="heading-gradient mb-10 text-3xl font-bold tracking-tight md:text-4xl">
          {meta.title}
        </h1>

        {sectionsQ.isLoading || postsQ.isLoading ? (
          <div className="flex justify-center py-12 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : sectionsQ.isError || postsQ.isError ? (
          <p className="text-destructive">
            Не удалось загрузить справочные статьи. Попробуйте обновить страницу.
          </p>
        ) : (
          <div className="max-w-4xl space-y-12">
            {groups
              .filter((g) => g.directPosts.length > 0 || g.children.length > 0)
              .map((group) => (
                <section key={group.section.id}>
                  <h2 className="heading-sub mb-6">{group.section.name}</h2>
                  {group.directPosts.length > 0 ? (
                    <ul className="space-y-3">
                      {group.directPosts.map((article) => (
                        <li key={article.id}>
                          <Link
                            to={`/reference/${kind}/${article.slug}`}
                            className="text-primary hover:underline"
                          >
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {group.children.length > 0 ? (
                    <div className="mt-6 space-y-6">
                      {group.children.map((sub) => (
                        <div key={sub.section.id}>
                          <h3 className="mb-3 text-base font-semibold text-foreground">
                            {sub.section.name}
                          </h3>
                          <ul className="space-y-2">
                            {sub.posts.map((article) => (
                              <li key={article.id}>
                                <Link
                                  to={`/reference/${kind}/${article.slug}`}
                                  className="text-primary hover:underline"
                                >
                                  {article.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </section>
              ))}

            <section className="border-t pt-8">
              <p className="mb-2 text-muted-foreground">Не нашли ответа на вопрос?</p>
              <p className="text-muted-foreground">
                Напишите нам:{" "}
                <a href={`mailto:${meta.contactEmail}`} className="text-primary hover:underline">
                  {meta.contactEmail}
                </a>
              </p>
            </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
