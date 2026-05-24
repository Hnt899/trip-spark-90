import { useCallback, useEffect, useMemo, useRef, useState, lazy, Suspense } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2 } from "lucide-react";

import { apiFetch } from "@/lib/api";
import type { BlogContentBlock } from "@/types/blogContent";
import type { GuideCategory, GuidePost } from "@/types/guideCms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TiptapEditor = lazy(() => import("@/components/editor/TiptapEditor"));

type Loaded = GuidePost;

export default function AdminGuideEdit() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const isNew = postId === "new";

  const [categoryId, setCategoryId] = useState("");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [contentBlocks, setContentBlocks] = useState<BlogContentBlock[]>([]);

  const [editorKey, setEditorKey] = useState(0);
  const hydratedRef = useRef<string | null>(null);

  const categoriesQ = useQuery({
    queryKey: ["admin-guide-categories"],
    queryFn: () => apiFetch<GuideCategory[]>("/api/admin/guide/categories"),
    retry: false,
  });

  const loadQ = useQuery({
    queryKey: ["admin-guide-post", postId],
    enabled: !isNew && !!postId,
    queryFn: () => apiFetch<Loaded>(`/api/admin/guide/posts/id/${postId}`),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (!isNew) return;
    hydratedRef.current = null;
    setCategoryId("");
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
    setCategoryId(row.category_id);
    setSlug(row.slug);
    setTitle(row.title);
    setExcerpt(row.excerpt || "");
    setStatus(row.status === "published" ? "published" : "draft");
    setContentBlocks(Array.isArray(row.content_blocks) ? row.content_blocks : []);
    setEditorKey((k) => k + 1);
  }, [isNew, postId, loadQ.data]);

  useEffect(() => {
    if (categoryId) return;
    const fallback = categoriesQ.data?.find((s) => !s.parent_id)?.id;
    if (fallback) setCategoryId(fallback);
  }, [categoriesQ.data, categoryId]);

  const categoryOptions = useMemo(() => {
    const all = categoriesQ.data || [];
    const map = new Map(all.map((s) => [s.id, s]));
    return all.map((s) => ({
      id: s.id,
      label: s.parent_id ? `${map.get(s.parent_id)?.name || "Категория"} / ${s.name}` : s.name,
    }));
  }, [categoriesQ.data]);

  const selectedCategorySlug = useMemo(() => {
    const all = categoriesQ.data || [];
    const found = all.find((c) => c.id === categoryId);
    return found?.slug || "category";
  }, [categoriesQ.data, categoryId]);

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
        category_id: categoryId,
        content_blocks: contentBlocks,
      };
      if (isNew) {
        return apiFetch<Loaded>("/api/admin/guide/posts", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      return apiFetch<Loaded>(`/api/admin/guide/posts/id/${postId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["admin-guide-posts"] });
      qc.invalidateQueries({ queryKey: ["admin-guide-post", postId] });
      qc.invalidateQueries({ queryKey: ["guide-posts"] });
      qc.invalidateQueries({ queryKey: ["guide-categories"] });
      if (isNew && data?.id) {
        navigate(`/admin/guide/${data.id}`, { replace: true });
      }
    },
  });

  const delMut = useMutation({
    mutationFn: () => apiFetch(`/api/admin/guide/posts/id/${postId}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-guide-posts"] });
      qc.invalidateQueries({ queryKey: ["guide-posts"] });
      navigate("/admin/guide");
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
        <Link to="/admin/guide" className="underline">
          К списку
        </Link>
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">
          {isNew ? "Новая статья путеводителя" : "Редактирование статьи"}
        </h1>
        <Button variant="outline" asChild>
          <Link to="/admin/guide">← К списку</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Метаданные</CardTitle>
          <CardDescription>
            Slug формирует публичный URL вида{" "}
            <span className="font-mono text-xs">/guide/{selectedCategorySlug}/slug</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Категория</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="kak-kupit-bilet"
              className="font-mono text-sm"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Заголовок</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Как купить билет"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="excerpt">Краткое описание</Label>
            <Textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} />
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
            <TiptapEditor key={editorKey} initialBlocks={contentBlocks} onChange={handleEditorChange} />
          </Suspense>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          onClick={() => saveMut.mutate()}
          disabled={saveMut.isPending || !slug.trim() || !title.trim() || !categoryId}
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
        <p className="text-sm text-destructive">{(saveMut.error as Error)?.message || "Ошибка сохранения"}</p>
      ) : null}
      {categoriesQ.isError ? (
        <p className="text-sm text-destructive">
          Не удалось загрузить категории: {(categoriesQ.error as Error)?.message}
        </p>
      ) : null}
    </div>
  );
}
