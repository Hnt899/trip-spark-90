import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PageCmsProvider } from "@/contexts/PageCmsContext";
import {
  getPageDefaults,
  mergePageContent,
  toPageOverrides,
} from "@/lib/pageContentMerge";
import { renderPageSections, SECTION_LABELS } from "@/components/cms/PageSectionRenderer";
import { AdminPageSectionFields } from "@/pages/admin/AdminPageSectionFields";
import type { PageContentDocument, PageKey } from "@/types/pageContent";
import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  History,
  Loader2,
  Monitor,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";

type AdminPagePayload = {
  pageKey: string;
  draft: Partial<PageContentDocument>;
  published: Partial<PageContentDocument>;
  lock: {
    lockedBy: string;
    lockedAt: string;
    email: string | null;
    isMine: boolean;
  } | null;
  updatedAt: string;
};

type RevisionRow = {
  id: string;
  action: string;
  section_id: string | null;
  user_email: string | null;
  created_at: string;
};

function isPageKey(v: string | undefined): v is PageKey {
  return v === "home" || v === "routes";
}

export default function AdminPageEditor() {
  const { pageKey: rawKey } = useParams();
  const pageKey = isPageKey(rawKey) ? rawKey : null;
  const qc = useQueryClient();
  const [draft, setDraft] = useState<PageContentDocument | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const pageQ = useQuery({
    queryKey: ["admin-page", pageKey],
    enabled: !!pageKey,
    queryFn: () => apiFetch<AdminPagePayload>(`/api/admin/pages/${pageKey}`),
  });

  useEffect(() => {
    if (!pageKey || !pageQ.data) return;
    const merged = mergePageContent(getPageDefaults(pageKey), pageQ.data.draft);
    setDraft(merged);
    setSelectedSectionId((prev) => prev || merged.sectionOrder[0] || null);
  }, [pageKey, pageQ.data]);

  useEffect(() => {
    if (!pageKey) return;
    apiFetch(`/api/admin/pages/${pageKey}/lock`, { method: "POST" }).catch(() => {});
    return () => {
      apiFetch(`/api/admin/pages/${pageKey}/unlock`, { method: "POST" }).catch(() => {});
    };
  }, [pageKey]);

  const revisionsQ = useQuery({
    queryKey: ["admin-page-revisions", pageKey],
    enabled: !!pageKey && showHistory,
    queryFn: () =>
      apiFetch<{ revisions: RevisionRow[] }>(`/api/admin/pages/${pageKey}/revisions`),
  });

  const saveMut = useMutation({
    mutationFn: (doc: PageContentDocument) => {
      const override = toPageOverrides(getPageDefaults(pageKey!), doc);
      return apiFetch(`/api/admin/pages/${pageKey}/draft`, {
        method: "PUT",
        body: JSON.stringify({ draft: override }),
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-page", pageKey] });
      qc.invalidateQueries({ queryKey: ["admin-page-revisions", pageKey] });
    },
  });

  const publishMut = useMutation({
    mutationFn: (doc: PageContentDocument) => {
      const override = toPageOverrides(getPageDefaults(pageKey!), doc);
      return apiFetch(`/api/admin/pages/${pageKey}/publish`, {
        method: "POST",
        body: JSON.stringify({ draft: override }),
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-page", pageKey] });
      qc.invalidateQueries({ queryKey: ["page-content", pageKey] });
      qc.invalidateQueries({ queryKey: ["admin-page-revisions", pageKey] });
    },
  });

  const resetMut = useMutation({
    mutationFn: (body: { scope: "page" | "section"; sectionId?: string }) =>
      apiFetch<{ draft: Partial<PageContentDocument> }>(`/api/admin/pages/${pageKey}/reset`, {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: (data) => {
      if (!pageKey) return;
      setDraft(mergePageContent(getPageDefaults(pageKey), data.draft));
      qc.invalidateQueries({ queryKey: ["admin-page", pageKey] });
      qc.invalidateQueries({ queryKey: ["admin-page-revisions", pageKey] });
    },
  });

  const restoreMut = useMutation({
    mutationFn: (id: string) =>
      apiFetch<{ draft: Partial<PageContentDocument> }>(
        `/api/admin/pages/${pageKey}/revisions/${id}/restore`,
        { method: "POST" }
      ),
    onSuccess: (data) => {
      if (!pageKey) return;
      setDraft(mergePageContent(getPageDefaults(pageKey), data.draft));
      qc.invalidateQueries({ queryKey: ["admin-page", pageKey] });
    },
  });

  const onChange = useCallback((doc: PageContentDocument) => setDraft(doc), []);

  if (!pageKey) {
    return <p className="text-muted-foreground">Неизвестная страница</p>;
  }

  if (!isDesktop) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <Monitor className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
        <h1 className="text-xl font-semibold">Только desktop</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Визуальный редактор страниц доступен на экранах от 1024px.
        </p>
        <Button asChild className="mt-6" variant="outline">
          <Link to="/admin/dashboard">Назад</Link>
        </Button>
      </div>
    );
  }

  if (pageQ.isLoading || !draft) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const lock = pageQ.data?.lock;
  const lockedByOther = lock && !lock.isMine;
  const title = pageKey === "home" ? "Редактор главной" : "Редактор маршрутов";

  return (
    <div className="-m-6 md:-m-8 flex h-[calc(100vh)] flex-col bg-muted/20">
      <header className="flex shrink-0 items-center gap-3 border-b bg-card px-4 py-3">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-semibold">{title}</h1>
          {lock && (
            <p className="text-xs text-muted-foreground">
              Блокировка: {lock.isMine ? "вы" : lock.email || "другой админ"}
            </p>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowHistory((v) => !v)}
        >
          <History className="mr-1 h-4 w-4" />
          История
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={lockedByOther || resetMut.isPending}
          onClick={() => {
            if (confirm("Сбросить всю страницу к дефолтам в коде?")) {
              resetMut.mutate({ scope: "page" });
            }
          }}
        >
          Сброс страницы
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={lockedByOther || !draft || saveMut.isPending}
          onClick={() => draft && saveMut.mutate(draft)}
        >
          {saveMut.isPending ? (
            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-1 h-4 w-4" />
          )}
          Черновик
        </Button>
        <Button
          size="sm"
          disabled={lockedByOther || !draft || publishMut.isPending}
          onClick={() => {
            if (confirm("Опубликовать черновик на сайт?")) {
              draft && publishMut.mutate(draft);
            }
          }}
        >
          {publishMut.isPending ? (
            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
          ) : null}
          Опубликовать
        </Button>
      </header>

      {lockedByOther && (
        <div className="bg-amber-50 px-4 py-2 text-sm text-amber-900">
          Страницу редактирует {lock?.email || "другой администратор"}. Сохранение недоступно.
        </div>
      )}

      <div className="flex min-h-0 flex-1">
        {/* Sections */}
        <aside className="flex w-56 shrink-0 flex-col border-r bg-card">
          <p className="px-3 py-2 text-xs font-medium uppercase text-muted-foreground">
            Блоки
          </p>
          <ul className="flex-1 overflow-y-auto px-2 pb-4">
            {draft.sectionOrder.map((id, index) => {
              const visible = draft.sections[id]?.visible !== false;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setSelectedSectionId(id)}
                    className={cn(
                      "mb-1 flex w-full items-center gap-1 rounded-md px-2 py-2 text-left text-sm",
                      selectedSectionId === id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <span className="min-w-0 flex-1 truncate">
                      {SECTION_LABELS[id] || id}
                    </span>
                    {!visible && <EyeOff className="h-3.5 w-3.5 shrink-0 opacity-70" />}
                  </button>
                  {selectedSectionId === id && (
                    <div className="mb-2 flex gap-1 px-1">
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        disabled={index === 0}
                        onClick={() => {
                          const order = [...draft.sectionOrder];
                          [order[index - 1], order[index]] = [order[index], order[index - 1]];
                          setDraft({ ...draft, sectionOrder: order });
                        }}
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        disabled={index === draft.sectionOrder.length - 1}
                        onClick={() => {
                          const order = [...draft.sectionOrder];
                          [order[index], order[index + 1]] = [order[index + 1], order[index]];
                          setDraft({ ...draft, sectionOrder: order });
                        }}
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        onClick={() => {
                          const prev = draft.sections[id] || { visible: true, fields: {} };
                          setDraft({
                            ...draft,
                            sections: {
                              ...draft.sections,
                              [id]: { ...prev, visible: !visible },
                            },
                          });
                        }}
                      >
                        {visible ? (
                          <Eye className="h-3.5 w-3.5" />
                        ) : (
                          <EyeOff className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Preview */}
        <div className="min-w-0 flex-1 overflow-y-auto bg-white">
          <PageCmsProvider
            pageKey={pageKey}
            content={draft}
            editMode
            selectedSectionId={selectedSectionId}
            setSelectedSectionId={setSelectedSectionId}
            onChange={onChange}
          >
            <div className="pointer-events-auto">{renderPageSections(pageKey, draft)}</div>
          </PageCmsProvider>
        </div>

        {/* Fields */}
        <aside className="flex w-80 shrink-0 flex-col border-l bg-card">
          <div className="border-b px-3 py-2">
            <p className="text-sm font-semibold">
              {selectedSectionId
                ? SECTION_LABELS[selectedSectionId] || selectedSectionId
                : "Выберите блок"}
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {selectedSectionId && (
              <>
                <div className="mb-3 flex items-center gap-2">
                  <Checkbox
                    id="sec-vis"
                    checked={draft.sections[selectedSectionId]?.visible !== false}
                    onCheckedChange={(c) => {
                      const prev =
                        draft.sections[selectedSectionId] || {
                          visible: true,
                          fields: {},
                        };
                      setDraft({
                        ...draft,
                        sections: {
                          ...draft.sections,
                          [selectedSectionId]: {
                            ...prev,
                            visible: c === true,
                          },
                        },
                      });
                    }}
                  />
                  <Label htmlFor="sec-vis" className="text-sm">
                    Показывать блок
                  </Label>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mb-4 w-full"
                  disabled={lockedByOther}
                  onClick={() => {
                    if (confirm("Сбросить этот блок к дефолту?")) {
                      resetMut.mutate({
                        scope: "section",
                        sectionId: selectedSectionId,
                      });
                    }
                  }}
                >
                  Сброс блока
                </Button>
                <AdminPageSectionFields
                  sectionId={selectedSectionId}
                  fields={
                    (draft.sections[selectedSectionId]?.fields ||
                      {}) as Record<string, unknown>
                  }
                  onPatch={(patch) => {
                    const prev =
                      draft.sections[selectedSectionId] || {
                        visible: true,
                        fields: {},
                      };
                    setDraft({
                      ...draft,
                      sections: {
                        ...draft.sections,
                        [selectedSectionId]: {
                          ...prev,
                          fields: { ...prev.fields, ...patch },
                        },
                      },
                    });
                  }}
                />
              </>
            )}
          </div>
        </aside>

        {showHistory && (
          <aside className="flex w-72 shrink-0 flex-col border-l bg-card">
            <div className="border-b px-3 py-2 text-sm font-semibold">История</div>
            <ul className="flex-1 overflow-y-auto p-2 text-sm">
              {revisionsQ.isLoading && (
                <li className="p-2 text-muted-foreground">Загрузка…</li>
              )}
              {(revisionsQ.data?.revisions || []).map((r) => (
                <li
                  key={r.id}
                  className="mb-2 rounded-md border p-2"
                >
                  <p className="font-medium">{r.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.user_email || "—"} ·{" "}
                    {new Date(r.created_at).toLocaleString("ru-RU")}
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-1 h-7 px-2 text-xs"
                    disabled={lockedByOther || restoreMut.isPending}
                    onClick={() => {
                      if (confirm("Восстановить эту версию в черновик?")) {
                        restoreMut.mutate(r.id);
                      }
                    }}
                  >
                    Откатить
                  </Button>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </div>
  );
}
