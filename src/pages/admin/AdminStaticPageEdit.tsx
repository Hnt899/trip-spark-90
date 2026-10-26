import { useEffect, useRef, useState, lazy, Suspense } from "react";
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
import { Loader2, Save, Trash2 } from "lucide-react";
import type { BlogContentBlock } from "@/types/blogContent";

const TiptapEditor = lazy(() => import("@/components/editor/TiptapEditor"));

type LoadedPage = {
  id: string;
  slug: string;
  title: string;
  content_blocks: BlogContentBlock[];
  seo_title: string | null;
  seo_description: string | null;
  status: "draft" | "published";
};

export default function AdminStaticPageEdit() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("published");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [blocks, setBlocks] = useState<BlogContentBlock[]>([]);

  const hydratedRef = useRef<string | null>(null);
  const [editorKey, setEditorKey] = useState(0);

  const loadQ = useQuery({
    queryKey: ["admin-static-page", slug],
    enabled: !!slug,
    queryFn: () => apiFetch<LoadedPage>(`/api/admin/pages/${encodeURIComponent(slug || "")}`),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const row = loadQ.data;
    if (!row || !slug) return;
    if (hydratedRef.current === slug) return;
    hydratedRef.current = slug;

    setTitle(row.title || "");
    setStatus(row.status === "draft" ? "draft" : "published");
    setSeoTitle(row.seo_title || "");
    setSeoDescription(row.seo_description || "");
    setBlocks(Array.isArray(row.content_blocks) ? row.content_blocks : []);
    setEditorKey((k) => k + 1);
  }, [slug, loadQ.data]);

  const saveMut = useMutation({
    mutationFn: async () => {
      if (!slug) throw new Error("no slug");
      return apiFetch<LoadedPage>(`/api/admin/pages/${encodeURIComponent(slug)}`, {
        method: "PUT",
        body: JSON.stringify({
          title: title.trim(),
          content_blocks: blocks,
          seo_title: seoTitle.trim() || null,
          seo_description: seoDescription.trim() || null,
          status,
        }),
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-static-page", slug] });
      qc.invalidateQueries({ queryKey: ["admin-pages-list"] });
      qc.invalidateQueries({ queryKey: ["static-page", slug] });
      alert("Сохранено");
    },
    onError: (e: Error) => alert("Ошибка: " + e.message),
  });

  if (loadQ.isLoading) {
    return (
      <div className="flex justify-center py-24 text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  if (loadQ.isError) {
    return (
      <p className="text-destructive">
        Не удалось загрузить страницу.{" "}
        <Link to="/admin/static-pages" className="underline">
          К списку
        </Link>
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Редактор страницы: {slug}
          </h1>
          <p className="text-sm text-muted-foreground">
            Публичная страница: <code>/p/{slug}</code>
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/admin/static-pages">← К списку</Link>
        </Button>
      </div>

      <div className="grid gap-4 rounded-md border p-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Заголовок страницы</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: Политика конфиденциальности"
          />
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label>Статус</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as "draft" | "published")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="published">Опубликовано</SelectItem>
                <SelectItem value="draft">Черновик</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Slug (URL)</Label>
            <Input value={slug || ""} disabled className="font-mono text-sm" />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>SEO Title (до 200)</Label>
          <Input
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            maxLength={200}
            placeholder="Заголовок для поисковиков"
          />
        </div>
        <div className="grid gap-2">
          <Label>SEO Description (до 500)</Label>
          <Textarea
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            maxLength={500}
            rows={3}
            placeholder="Краткое описание для поисковиков"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <div className="border-b px-4 py-3">
          <p className="text-sm font-semibold">Содержимое страницы</p>
          <p className="text-xs text-muted-foreground">
            Форматирование как в блоге: заголовки, списки, ссылки, цитаты, изображения.
          </p>
        </div>
        <div className="p-4">
          <Suspense
            fallback={
              <div className="flex justify-center py-12 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            }
          >
            <TiptapEditor
              key={editorKey}
              initialBlocks={blocks}
              onChange={setBlocks}
            />
          </Suspense>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          onClick={() => saveMut.mutate()}
          disabled={saveMut.isPending || !title.trim()}
        >
          {saveMut.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Сохранить
        </Button>
      </div>

      {saveMut.isError ? (
        <p className="text-sm text-destructive">
          {(saveMut.error as Error)?.message || "Ошибка сохранения"}
        </p>
      ) : null}
    </div>
  );
}