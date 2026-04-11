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
import { Loader2, Trash2 } from "lucide-react";
import CoverUpload from "@/components/admin/CoverUpload";
import type { BlogContentBlock } from "@/types/blogContent";

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
  status: string;
};

const REGIONS = [
  "Центр",
  "Северо-Запад",
  "Юг",
  "Поволжье",
  "Урал",
  "Сибирь",
  "Кавказ",
  "Дальний Восток",
];

export default function AdminRouteEdit() {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isNew = routeId === "new";

  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [legacyId, setLegacyId] = useState("");
  const [region, setRegion] = useState("");
  const [rating, setRating] = useState("0");
  const [coverUrl, setCoverUrl] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [contentBlocks, setContentBlocks] = useState<BlogContentBlock[]>([]);
  const [status, setStatus] = useState<"draft" | "published">("draft");

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
    setStatus("draft");
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
    setStatus(row.status === "published" ? "published" : "draft");
    setEditorKey((k) => k + 1);
  }, [isNew, routeId, loadQ.data]);

  const handleEditorChange = useCallback((blocks: BlogContentBlock[]) => {
    setContentBlocks(blocks);
  }, []);

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
        status,
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
                  {REGIONS.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
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
              key={editorKey}
              initialBlocks={contentBlocks}
              onChange={handleEditorChange}
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
