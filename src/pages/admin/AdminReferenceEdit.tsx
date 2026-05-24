import { useCallback, useEffect, useMemo, useRef, useState, lazy, Suspense } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";

import { apiFetch } from "@/lib/api";
import type { BlogContentBlock } from "@/types/blogContent";
import type { ReferenceKind, ReferencePost, ReferenceSection } from "@/types/referenceCms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TiptapEditor = lazy(() => import("@/components/editor/TiptapEditor"));

type Loaded = ReferencePost;

export default function AdminReferenceEdit() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isNew = postId === "new";

  const [kind, setKind] = useState<ReferenceKind>("trains");
  const [sectionId, setSectionId] = useState("");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [contentBlocks, setContentBlocks] = useState<BlogContentBlock[]>([]);

  const [editorKey, setEditorKey] = useState(0);
  const hydratedRef = useRef<string | null>(null);

  const sectionsQ = useQuery({
    queryKey: ["admin-reference-sections", kind],
    queryFn: () =>
      apiFetch<ReferenceSection[]>(
        `/api/admin/reference/sections?kind=${encodeURIComponent(kind)}`,
      ),
    retry: false,
  });

  const loadQ = useQuery({
    queryKey: ["admin-reference-post", postId],
    enabled: !isNew && !!postId,
    queryFn: () => apiFetch<Loaded>(`/api/admin/reference/posts/id/${postId}`),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (!isNew) return;
    hydratedRef.current = null;
    setKind("trains");
    setSectionId("");
    setSlug("");
    setTitle("");
    setExcerpt("");
    setStatus("draft");
    setContentBlocks([]);
    setEditorKey((k) => k + 1);
  }, [isNew, postId]);

  useEffect(() => {
    if (isNew) return;
    const row = loadQ.data;
    if (!row || !postId) return;
    if (hydratedRef.current === postId) return;
    hydratedRef.current = postId;
    setKind(row.kind);
    setSectionId(row.section_id);
    setSlug(row.slug);
    setTitle(row.title);
    setExcerpt(row.excerpt || "");
    setStatus(row.status === "published" ? "published" : "draft");
    setContentBlocks(Array.isArray(row.content_blocks) ? row.content_blocks : []);
    setEditorKey((k) => k + 1);
  }, [isNew, postId, loadQ.data]);

  useEffect(() => {
    if (sectionId) return;
    const fallback = sectionsQ.data?.find((s) => !s.parent_id)?.id;
    if (fallback) setSectionId(fallback);
  }, [sectionsQ.data, sectionId]);

  const sectionOptions = useMemo(() => {
    const all = sectionsQ.data || [];
    const map = new Map(all.map((s) => [s.id, s]));
    return all.map((s) => ({
      id: s.id,
      label: s.parent_id ? `${map.get(s.parent_id)?.name || "Раздел"} / ${s.name}` : s.name,
    }));
  }, [sectionsQ.data]);

  const handleEditorChange = useCallback((blocks: BlogContentBlock[]) => {
    setContentBlocks(blocks);
  }, []);

  const saveMut = useMutation({
    mutationFn: async () => {
      const payload = {
        slug: slug.trim().toLowerCase(),
        title: title.trim(),
        excerpt: excerpt.trim(),
        status,
        section_id: sectionId,
        content_blocks: contentBlocks,
      };
      if (isNew) {
        return apiFetch<Loaded>("/api/admin/reference/posts", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      return apiFetch<Loaded>(`/api/admin/reference/posts/id/${postId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["admin-reference-posts"] });
      qc.invalidateQueries({ queryKey: ["admin-reference-post", postId] });
      qc.invalidateQueries({ queryKey: ["reference-posts"] });
      qc.invalidateQueries({ queryKey: ["reference-sections"] });
      if (isNew && data?.id) {
        navigate(`/admin/reference/${data.id}`, { replace: true });
      }
    },
  });

  const delMut = useMutation({
    mutationFn: () =>
      apiFetch(`/api/admin/reference/posts/id/${postId}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-reference-posts"] });
      qc.invalidateQueries({ queryKey: ["reference-posts"] });
      navigate("/admin/reference");
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
        <Link to="/admin/reference" className="underline">
          К списку
        </Link>
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">
          {isNew ? "Новая статья справочной" : "Редактирование статьи"}
        </h1>
        <Button variant="outline" asChild>
          <Link to="/admin/reference">← К списку</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Метаданные</CardTitle>
          <CardDescription>
            Slug формирует публичный URL вида{" "}
            <span className="font-mono text-xs">/reference/{kind}/slug</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Транспорт</Label>
              <Select
                value={kind}
                onValueChange={(v) => {
                  setKind(v as ReferenceKind);
                  setSectionId("");
                }}
                disabled={!isNew}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trains">Поезда</SelectItem>
                  <SelectItem value="flights">Самолеты</SelectItem>
                  <SelectItem value="buses">Автобусы</SelectItem>
                </SelectContent>
              </Select>
              {!isNew ? (
                <p className="text-xs text-muted-foreground">
                  Транспорт меняется через перенос статьи в раздел нужного транспорта.
                </p>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label>Раздел</Label>
              <Select value={sectionId} onValueChange={setSectionId}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите раздел" />
                </SelectTrigger>
                <SelectContent>
                  {sectionOptions.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="how-to-buy"
              className="font-mono text-sm"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Заголовок</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Как купить ж/д билет"
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
          <div className="grid gap-2">
            <Label>Статус</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Черновик</SelectItem>
                <SelectItem value="published">Опубликовано</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Текст статьи</CardTitle>
          <CardDescription>
            Используйте инструменты редактора для структуры, таблиц, цитат, CTA-кнопок и медиа.
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
          disabled={saveMut.isPending || !slug.trim() || !title.trim() || !sectionId}
        >
          {saveMut.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
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
      {sectionsQ.isError ? (
        <p className="text-sm text-destructive">
          Не удалось загрузить разделы: {(sectionsQ.error as Error)?.message}
        </p>
      ) : null}
    </div>
  );
}
