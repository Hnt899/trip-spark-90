import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Train, Plane, Bus, Loader2 } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { apiFetch } from "@/lib/api";
import type { ReferenceKind, ReferenceSection, ReferencePostListItem } from "@/types/referenceCms";

const REFERENCE_TRANSPORT_TABS: {
  id: ReferenceKind;
  hash: string;
  label: string;
  Icon: typeof Train;
}[] = [
  { id: "trains", hash: "#trains", label: "Поезда", Icon: Train },
  { id: "flights", hash: "#flights", label: "Самолеты", Icon: Plane },
  { id: "buses", hash: "#buses", label: "Автобусы", Icon: Bus },
];

function ReferenceTransportTab({
  tab,
  active,
  onSelect,
  layout,
}: {
  tab: (typeof REFERENCE_TRANSPORT_TABS)[number];
  active: boolean;
  onSelect: () => void;
  layout: "mobile" | "desktop";
}) {
  const { Icon, label } = tab;
  return (
    <button
      type="button"
      onClick={onSelect}
      title={label}
      className={cn(
        "group relative overflow-hidden rounded-lg transition-shadow",
        layout === "mobile" && "flex items-center justify-center px-3 py-2",
        layout === "desktop" && "flex w-full items-center gap-3 px-4 py-3 text-left",
        active ? "travel-tab-gradient text-white shadow-md" : "bg-muted/50 text-foreground",
      )}
    >
      {!active && <span className="reference-tab-hover-fill" aria-hidden />}
      <span
        className={cn(
          "relative z-[1] flex items-center",
          layout === "mobile" && "justify-center",
          layout === "desktop" && "min-w-0 gap-3",
          !active && "group-hover:text-white",
        )}
      >
        <Icon
          className={cn(
            "h-5 w-5 shrink-0",
            !active && "text-foreground group-hover:text-white",
          )}
        />
        {layout === "desktop" && (
          <span className={cn("font-medium", !active && "group-hover:text-white")}>{label}</span>
        )}
      </span>
    </button>
  );
}

export default function Reference() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<ReferenceKind>("trains");

  useEffect(() => {
    const hash = location.hash;
    if (hash === "#trains" || hash === "#flights" || hash === "#buses") {
      setActiveTab(hash.slice(1) as ReferenceKind);
    }
  }, [location.hash]);

  const sectionsQ = useQuery({
    queryKey: ["reference-sections", activeTab],
    queryFn: () =>
      apiFetch<ReferenceSection[]>(
        `/api/reference/sections?kind=${encodeURIComponent(activeTab)}`,
      ),
  });
  const postsQ = useQuery({
    queryKey: ["reference-posts", activeTab],
    queryFn: () =>
      apiFetch<ReferencePostListItem[]>(
        `/api/reference/posts?kind=${encodeURIComponent(activeTab)}`,
      ),
  });

  const grouped = useMemo(() => {
    const sections = sectionsQ.data || [];
    const posts = postsQ.data || [];
    const top = sections.filter((s) => !s.parent_id);
    return top.map((section) => {
      const direct = posts.filter((p) => p.section_id === section.id);
      const children = sections
        .filter((s) => s.parent_id === section.id)
        .map((child) => ({
          child,
          posts: posts.filter((p) => p.section_id === child.id),
        }))
        .filter((x) => x.posts.length > 0);
      return { section, direct, children };
    });
  }, [sectionsQ.data, postsQ.data]);

  const content = (
    <div className="space-y-8">
      {sectionsQ.isLoading || postsQ.isLoading ? (
        <div className="flex justify-center py-10 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : sectionsQ.isError || postsQ.isError ? (
        <p className="text-destructive">Не удалось загрузить справочную. Попробуйте позже.</p>
      ) : (
        grouped
          .filter((g) => g.direct.length || g.children.length)
          .map((g) => (
            <section key={g.section.id}>
              <h2 className="heading-sub mb-4">{g.section.name}</h2>
              {g.direct.length > 0 ? (
                <ul className="space-y-2">
                  {g.direct.map((article) => (
                    <li key={article.id}>
                      <Link
                        to={`/reference/${activeTab}/${article.slug}`}
                        className="text-lg text-primary hover:underline"
                      >
                        {article.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
              {g.children.length > 0 ? (
                <div className="mt-5 space-y-5">
                  {g.children.map((x) => (
                    <div
                      key={x.child.id}
                      className="rounded-lg border border-primary/20 bg-primary/[0.04] px-4 py-3"
                    >
                      <h3 className="mb-3 text-base font-semibold text-foreground">
                        {x.child.name}
                      </h3>
                      <ul className="space-y-2">
                        {x.posts.map((article) => (
                          <li key={article.id}>
                            <Link
                              to={`/reference/${activeTab}/${article.slug}`}
                              className="text-lg text-primary hover:underline"
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
          ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="sticky top-[56px] z-40 border-b bg-background md:hidden">
        <div className="container py-3">
          <div className="flex items-center justify-center gap-2">
            {REFERENCE_TRANSPORT_TABS.map((tab) => (
              <ReferenceTransportTab
                key={tab.id}
                tab={tab}
                layout="mobile"
                active={activeTab === tab.id}
                onSelect={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <main className="container pt-28 pb-12 md:pt-32">
        <div className="hidden gap-8 md:flex">
          <aside className="w-64 shrink-0">
            <div className="space-y-2">
              {REFERENCE_TRANSPORT_TABS.map((tab) => (
                <ReferenceTransportTab
                  key={tab.id}
                  tab={tab}
                  layout="desktop"
                  active={activeTab === tab.id}
                  onSelect={() => setActiveTab(tab.id)}
                />
              ))}
            </div>
          </aside>
          <div className="flex-1">{content}</div>
        </div>
        <div className="md:hidden">{content}</div>
      </main>
      <Footer />
    </div>
  );
}
