import { useEffect, useRef, useState, useCallback, lazy, Suspense } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Trash2, Plus, Pencil, ChevronUp, ChevronDown } from "lucide-react";
import CoverUpload from "@/components/admin/CoverUpload";
import type { BlogContentBlock, RouteTab } from "@/types/blogContent";

const TiptapEditor = lazy(() => import("@/components/editor/TiptapEditor"));

type Loaded = {
  id: string;
  slug: string;
  name: string;
  legacy_id: string | null;
  region: string;
  rating: number;
  cover_image_url: string | null;
  excerpt: string;
  content_blocks?: BlogContentBlock[];
  tabs?: RouteTab[];
  status: string;
  seo_title?: string | null;
  seo_description?: string | null;
};

export default function AdminRouteEdit() {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isNew = routeId === "new";

  const { data: regionsData = [] } = useQuery({
    queryKey: ["admin-regions-list"],
    queryFn: () => apiFetch<Array<{ id: string; name: string; slug: string }>>("/api/admin/regions"),
    staleTime: 5 * 60 * 1000,
  });

  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [legacyId, setLegacyId] = useState("");
  const [region, setRegion] = useState("");
  const [rating, setRating] = useState("0");
  const [coverUrl, setCoverUrl] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [contentBlocks, setContentBlocks] = useState<BlogContentBlock[]>([]);
  const [tabs, setTabs] = useState<RouteTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>("__main__");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const hydratedRef = useRef<string | null>(null);
  const [editorKey, setEditorKey] = useState(0);

  const loadQ = useQuery({
    queryKey: ["admin-route-page", routeId],
    enabled: !isNew && !!routeId,
    queryFn: () => apiFetch<Loaded>(`/api/admin/routes/id/${routeId}`),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (!isNew) return;
    hydratedRef.current = null;
    setSlug("");
    setName("");
    setLegacyId("");
    setRegion("");
    setRating("0");
    setCoverUrl("");
    setExcerpt("");
    setContentBlocks([]);
    setTabs([]);
    setActiveTabId("__main__");
    setStatus("draft");
    setSeoTitle("");
    setSeoDescription("");
    setEditorKey((k) => k + 1);
  }, [isNew, routeId]);

  useEffect(() => {
    if (isNew) return;
    const row = loadQ.data;
    if (!row || !routeId) return;
    if (hydratedRef.current === routeId) return;
    hydratedRef.current = routeId;

    setSlug(row.slug);
    setName(row.name);
    setLegacyId(row.legacy_id || "");
    setRegion(row.region || "");
    setRating(String(row.rating ?? 0));
    setCoverUrl(row.cover_image_url || "");
    setExcerpt(row.excerpt || "");
    setContentBlocks(
      Array.isArray(row.content_blocks) ? row.content_blocks : [],
    );
    setTabs(Array.isArray(row.tabs) ? row.tabs : []);
    setStatus(row.status === "published" ? "published" : "draft");
    setSeoTitle(row.seo_title || "");
    setSeoDescription(row.seo_description || "");
    setActiveTabId("__main__");
    setEditorKey((k) => k + 1);
  }, [isNew, routeId, loadQ.data]);

  const handleEditorChange = useCallback((blocks: BlogContentBlock[]) => {
    if (activeTabId === "__main__") {
      setContentBlocks(blocks);
    } else {
      setTabs((prev) =>
        prev.map((t) => (t.id === activeTabId ? { ...t, blocks } : t))
      );
    }
  }, [activeTabId]);

  const anchorLimit = (() => {
    const routeBlock = contentBlocks.find((b) => b.type === "routeByDays") as
      | { type: "routeByDays"; image: string; days: { label: string; title: string; description: string }[] }
      | undefined;
    return routeBlock?.days?.length || undefined;
  })();

  const addNewTab = () => {
    const newTab: RouteTab = {
      id: `tab_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      title: "Новый этап",
      blocks: [],
    };
    const newTitle = prompt("Название этапа:", "Новый этап");
    if (newTitle && newTitle.trim()) {
      newTab.title = newTitle.trim();
    }
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTab.id);
    setEditorKey((k) => k + 1);
  };

  const renameTab = (id: string) => {
    const tab = tabs.find((t) => t.id === id);
    if (!tab) return;
    const newTitle = prompt("Название этапа:", tab.title);
    if (newTitle && newTitle.trim()) {
      setTabs((prev) =>
        prev.map((t) => (t.id === id ? { ...t, title: newTitle.trim() } : t))
      );
    }
  };

  const deleteTab = (id: string) => {
    if (!confirm("Удалить этот этап?")) return;
    setTabs((prev) => prev.filter((t) => t.id !== id));
    if (activeTabId === id) {
      setActiveTabId("__main__");
      setEditorKey((k) => k + 1);
    }
  };

  const moveTab = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= tabs.length) return;
    setTabs((prev) => {
      const newArr = [...prev];
      const [removed] = newArr.splice(index, 1);
      newArr.splice(newIndex, 0, removed);
      return newArr;
    });
  };

  const saveMut = useMutation({
    mutationFn: async () => {
      const payload = {
        slug: slug.trim().toLowerCase(),
        name: name.trim(),
        legacy_id: legacyId.trim() || null,
        region: region.trim(),
        rating: parseFloat(rating) || 0,
        cover_image_url: coverUrl.trim() || null,
        excerpt: excerpt.trim(),
        content_blocks: contentBlocks,
        tabs,
        status,
        seo_title: seoTitle.trim() || null,
        seo_description: seoDescription.trim() || null,
      };
      if (isNew) {
        return apiFetch<Loaded>("/api/admin/routes", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      return apiFetch<Loaded>(`/api/admin/routes/id/${routeId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["admin-route-pages"] });
      qc.invalidateQueries({ queryKey: ["admin-route-page", routeId] });
      qc.invalidateQueries({ queryKey: ["route-page-public"] });
      if (isNew && data?.id) {
        navigate(`/admin/routes/${data.id}`, { replace: true });
      }
    },
  });

  const delMut = useMutation({
    mutationFn: () =>
      apiFetch(`/api/admin/routes/id/${routeId}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-route-pages"] });
      qc.invalidateQueries({ queryKey: ["route-page-public"] });
      navigate("/admin/routes");
    },
  });

  if (!isNew && loadQ.isLoading) {
    return (
      <div className="flex justify-center py-24 text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (!isNew && loadQ.isError) {
    return (
      <p className="text-destructive">
        Не удалось загрузить маршрут.{" "}
        <Link to="/admin/routes" className="underline">
          К списку
        </Link>
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">
          {isNew ? "Новый маршрут" : "Редактирование маршрута"}
        </h1>
        <Button variant="outline" asChild>
          <Link to="/admin/routes">← К списку</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Метаданные</CardTitle>
          <CardDescription>
            Slug — латиница и дефисы, уникальный идентификатор.
            Legacy ID — числовой ID из старых данных (1–40), если нужна совместимость.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="sochi-i-okrestnosti"
                className="font-mono text-sm"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="legacyId">Legacy ID (необязательно)</Label>
              <Input
                id="legacyId"
                value={legacyId}
                onChange={(e) => setLegacyId(e.target.value)}
                placeholder="17"
                className="font-mono text-sm"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Название маршрута</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Сочи и окрестности"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="excerpt">Краткое описание</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
            />
          </div>
          <CoverUpload
            value={coverUrl}
            onChange={setCoverUrl}
            label="Обложка"
          />
          <div className="grid gap-2 sm:grid-cols-3 sm:gap-4">
            <div className="grid gap-2">
              <Label>Регион</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите" />
                </SelectTrigger>
                <SelectContent>
                  {(regionsData || []).map((r) => (
                    <SelectItem key={r.id} value={r.name}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rating">Рейтинг (0–10)</Label>
              <Input
                id="rating"
                type="number"
                min={0}
                max={10}
                step={0.1}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Статус</Label>
              <Select
                value={status}
                onValueChange={(v) => setStatus(v as "draft" | "published")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Черновик</SelectItem>
                  <SelectItem value="published">Опубликовано</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SEO</CardTitle>
          <CardDescription>
            Title и Description для поисковых систем. Если пусто — возьмётся название и краткое описание.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="seoTitle">SEO Title (до 200 символов)</Label>
            <Input
              id="seoTitle"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              maxLength={200}
              placeholder={name || "Заголовок для поисковиков"}
            />
            <p className="text-xs text-muted-foreground">{seoTitle.length}/200</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="seoDescription">SEO Description (до 500 символов)</Label>
            <Textarea
              id="seoDescription"
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              maxLength={500}
              rows={3}
              placeholder={excerpt || "Краткое описание для поисковиков"}
            />
            <p className="text-xs text-muted-foreground">{seoDescription.length}/500</p>
          </div>
        </CardContent>
      </Card>

      <Card id="route-editor">
        <CardHeader>
          <CardTitle>Этапы маршрута</CardTitle>
          <CardDescription>
            Создавайте отдельные разделы с текстом, фото, галереями — они появятся на сайте третьей закреплённой шапкой с табами.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => {
                setActiveTabId("__main__");
                setEditorKey((k) => k + 1);
                requestAnimationFrame(() => {
                  window.scrollTo(0, 0);
                });
              }}
              className={`rounded-full px-4 py-2 font-medium whitespace-nowrap transition-colors ${
                activeTabId === "__main__"
                  ? "bg-[#0A8FE8] text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Основной
            </button>
            {tabs.map((tab, index) => (
              <div key={tab.id} className="flex items-center gap-1 rounded-full bg-slate-100 pr-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTabId(tab.id);
                    setEditorKey((k) => k + 1);
                    requestAnimationFrame(() => {
                      window.scrollTo(0, 0);
                    });
                  }}
                  className={`rounded-full px-4 py-2 font-medium whitespace-nowrap transition-colors ${
                    activeTabId === tab.id
                      ? "bg-[#0A8FE8] text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {tab.title}
                </button>
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => moveTab(index, -1)}
                    disabled={index === 0}
                    className="p-1 rounded hover:bg-slate-200 disabled:opacity-30"
                    title="Вверх"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveTab(index, 1)}
                    disabled={index === tabs.length - 1}
                    className="p-1 rounded hover:bg-slate-200 disabled:opacity-30"
                    title="Вниз"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => renameTab(tab.id)}
                    className="p-1 rounded hover:bg-slate-200"
                    title="Переименовать"
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteTab(tab.id)}
                    className="p-1 rounded hover:bg-red-100 text-red-600"
                    title="Удалить"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addNewTab}
              className="rounded-full"
            >
              <Plus className="mr-1 h-4 w-4" />
              Новый этап
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Описание маршрута</CardTitle>
          <CardDescription>
            Подробное описание: достопримечательности, советы, фотографии, галереи.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-4">
          <Suspense
            fallback={
              <div className="flex justify-center py-12 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            }
          >
            <TiptapEditor
              key={`${activeTabId}-${editorKey}`}
              initialBlocks={
                activeTabId === "__main__"
                  ? contentBlocks
                  : (tabs.find((t) => t.id === activeTabId)?.blocks || [])
              }
              onChange={handleEditorChange}
              anchorLimit={anchorLimit}
            />
          </Suspense>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          onClick={() => saveMut.mutate()}
          disabled={saveMut.isPending}
        >
          {saveMut.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Сохранить
        </Button>
        {!isNew ? (
          <Button
            type="button"
            variant="destructive"
            disabled={delMut.isPending}
            onClick={() => {
              if (confirm("Удалить маршрут из базы?")) delMut.mutate();
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Удалить
          </Button>
        ) : null}
      </div>
      {saveMut.isError ? (
        <p className="text-sm text-destructive">
          {(saveMut.error as Error)?.message || "Ошибка сохранения"}
        </p>
      ) : null}
    </div>
  );
}