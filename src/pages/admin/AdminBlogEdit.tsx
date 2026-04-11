import { useEffect, useRef, useState, useCallback, lazy, Suspense } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import type { BlogBadge } from "@/types/blogArticle";
import type { BlogContentBlock } from "@/types/blogContent";
import { expandCarouselsAndPhotosInText } from "@/lib/blogBodyExpand";

const TiptapEditor = lazy(() => import("@/components/editor/TiptapEditor"));

type Loaded = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover_image_url: string | null;
  content_blocks?: BlogContentBlock[];
  body_text?: string;
  status: string;
  reading_minutes: number;
  channel: string;
  tag_ids: string[];
  badges: string[];
  editors_pick: boolean;
  partner_carousel: boolean;
  sponsored_grid: boolean;
};

const CHANNELS = [
  { v: "tudasuda", l: "TudaSuda" },
  { v: "partners", l: "Партнёры" },
  { v: "special", l: "Спецпроекты" },
];

/**
 * Migrate legacy body_text (with <фото>/<карусель> tags) to structured blocks.
 * If content_blocks already exist and are non-empty, use them directly.
 */
function resolveInitialBlocks(row: Loaded): BlogContentBlock[] {
  if (Array.isArray(row.content_blocks) && row.content_blocks.length > 0) {
    return row.content_blocks;
  }
  if (row.body_text) {
    return expandCarouselsAndPhotosInText(row.body_text);
  }
  return [];
}

export default function AdminBlogEdit() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isNew = postId === "new";

  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [contentBlocks, setContentBlocks] = useState<BlogContentBlock[]>([]);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [readingMinutes, setReadingMinutes] = useState(5);
  const [channel, setChannel] = useState("tudasuda");
  const [tagsRaw, setTagsRaw] = useState("");
  const [badgeOwn, setBadgeOwn] = useState(true);
  const [badgePartner, setBadgePartner] = useState(false);
  const [badgeAd, setBadgeAd] = useState(false);
  const [editorsPick, setEditorsPick] = useState(false);
  const [partnerCarousel, setPartnerCarousel] = useState(false);
  const [sponsoredGrid, setSponsoredGrid] = useState(false);

  const hydratedPostIdRef = useRef<string | null>(null);

  /** Key to force re-mount TiptapEditor when switching between articles */
  const [editorKey, setEditorKey] = useState(0);

  const loadQ = useQuery({
    queryKey: ["admin-blog-post", postId],
    enabled: !isNew && !!postId,
    queryFn: () => apiFetch<Loaded>(`/api/admin/blog/posts/id/${postId}`),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (!isNew) return;
    hydratedPostIdRef.current = null;
    setSlug("");
    setTitle("");
    setExcerpt("");
    setCoverUrl("");
    setContentBlocks([]);
    setStatus("draft");
    setReadingMinutes(5);
    setChannel("tudasuda");
    setTagsRaw("");
    setBadgeOwn(true);
    setBadgePartner(false);
    setBadgeAd(false);
    setEditorsPick(false);
    setPartnerCarousel(false);
    setSponsoredGrid(false);
    setEditorKey((k) => k + 1);
  }, [isNew, postId]);

  useEffect(() => {
    if (isNew) return;
    const row = loadQ.data;
    if (!row || !postId) return;
    if (hydratedPostIdRef.current === postId) return;
    hydratedPostIdRef.current = postId;

    setSlug(row.slug);
    setTitle(row.title);
    setExcerpt(row.excerpt || "");
    setCoverUrl(row.cover_image_url || "");
    setContentBlocks(resolveInitialBlocks(row));
    setStatus(row.status === "published" ? "published" : "draft");
    setReadingMinutes(row.reading_minutes || 5);
    setChannel(row.channel || "tudasuda");
    setTagsRaw((row.tag_ids || []).join(", "));
    const b = row.badges || ["own"];
    setBadgeOwn(b.includes("own"));
    setBadgePartner(b.includes("partner"));
    setBadgeAd(b.includes("ad"));
    setEditorsPick(!!row.editors_pick);
    setPartnerCarousel(!!row.partner_carousel);
    setSponsoredGrid(!!row.sponsored_grid);
    setEditorKey((k) => k + 1);
  }, [isNew, postId, loadQ.data]);

  const handleEditorChange = useCallback((blocks: BlogContentBlock[]) => {
    setContentBlocks(blocks);
  }, []);

  function collectBadges(): BlogBadge[] {
    const out: BlogBadge[] = [];
    if (badgeOwn) out.push("own");
    if (badgePartner) out.push("partner");
    if (badgeAd) out.push("ad");
    return out.length ? out : ["own"];
  }

  function collectTagIds(): string[] {
    return tagsRaw
      .split(/[,;\s]+/)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
  }

  const saveMut = useMutation({
    mutationFn: async () => {
      const payload = {
        slug: slug.trim().toLowerCase(),
        title: title.trim(),
        excerpt: excerpt.trim(),
        cover_image_url: coverUrl.trim() || null,
        content_blocks: contentBlocks,
        status,
        reading_minutes: readingMinutes,
        channel,
        tag_ids: collectTagIds(),
        badges: collectBadges(),
        editors_pick: editorsPick,
        partner_carousel: partnerCarousel,
        sponsored_grid: sponsoredGrid,
      };
      if (isNew) {
        return apiFetch<Loaded>("/api/admin/blog/posts", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      return apiFetch<Loaded>(`/api/admin/blog/posts/id/${postId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      qc.invalidateQueries({ queryKey: ["blog-posts-public"] });
      qc.invalidateQueries({ queryKey: ["blog-post"] });
      qc.invalidateQueries({ queryKey: ["admin-blog-post", postId] });
      if (isNew && data?.id) {
        navigate(`/admin/blog/${data.id}`, { replace: true });
      }
    },
  });

  const delMut = useMutation({
    mutationFn: () =>
      apiFetch(`/api/admin/blog/posts/id/${postId}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      qc.invalidateQueries({ queryKey: ["blog-posts-public"] });
      qc.invalidateQueries({ queryKey: ["blog-post"] });
      navigate("/admin/blog");
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
        Не удалось загрузить статью.{" "}
        <Link to="/admin/blog" className="underline">
          К списку
        </Link>
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">
          {isNew ? "Новая статья" : "Редактирование"}
        </h1>
        <Button variant="outline" asChild>
          <Link to="/admin/blog">← К списку</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Метаданные</CardTitle>
          <CardDescription>
            Slug — латиница и дефисы, уникальный URL{" "}
            <span className="font-mono text-xs">/blog/slug</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="moya-statya"
              className="font-mono text-sm"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Заголовок</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="excerpt">Краткое описание (для карточки)</Label>
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
            label="Обложка (необязательно)"
          />
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
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
            <div className="grid gap-2">
              <Label htmlFor="rm">Минут чтения</Label>
              <Input
                id="rm"
                type="number"
                min={1}
                max={240}
                value={readingMinutes}
                onChange={(e) =>
                  setReadingMinutes(parseInt(e.target.value, 10) || 5)
                }
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Канал ленты</Label>
            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CHANNELS.map((c) => (
                  <SelectItem key={c.v} value={c.v}>
                    {c.l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tags">Теги (id через запятую)</Label>
            <Input
              id="tags"
              value={tagsRaw}
              onChange={(e) => setTagsRaw(e.target.value)}
              placeholder="trains, lifehacks, russia"
              className="font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label>Бейджи</Label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={badgeOwn} onCheckedChange={(v) => setBadgeOwn(!!v)} />
                Наша статья
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={badgePartner}
                  onCheckedChange={(v) => setBadgePartner(!!v)}
                />
                Партнёр
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={badgeAd} onCheckedChange={(v) => setBadgeAd(!!v)} />
                Реклама
              </label>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={editorsPick}
                onCheckedChange={(v) => setEditorsPick(!!v)}
              />
              Подборка редакции
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={partnerCarousel}
                onCheckedChange={(v) => setPartnerCarousel(!!v)}
              />
              Карусель партнёров
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={sponsoredGrid}
                onCheckedChange={(v) => setSponsoredGrid(!!v)}
              />
              Сетка спецпроектов
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Текст статьи</CardTitle>
          <CardDescription>
            Используйте тулбар для форматирования. Перетаскивайте изображения
            прямо в редактор — они загрузятся автоматически.
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
              if (confirm("Удалить статью из базы?")) delMut.mutate();
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
