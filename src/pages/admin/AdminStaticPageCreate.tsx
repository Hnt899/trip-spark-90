import { useState, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import type { BlogContentBlock } from "@/types/blogContent";

const TiptapEditor = lazy(() => import("@/components/editor/TiptapEditor"));

export default function AdminStaticPageCreate() {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<BlogContentBlock[]>([]);

  const createMut = useMutation({
    mutationFn: async () => {
      const cleanSlug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
      if (!cleanSlug) throw new Error("slug required");
      if (!title.trim()) throw new Error("title required");

      const res = await apiFetch<{ ok?: boolean }>("/api/admin/pages-list", {
        method: "POST",
        body: JSON.stringify({
          slug: cleanSlug,
          title: title.trim(),
          content_blocks: blocks,
          status: "published",
        }),
      });
      return res;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-pages-list"] });
      navigate("/admin/static-pages");
    },
    onError: (e: Error) => alert("Ошибка: " + e.message),
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Новая страница</h1>
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
        <div className="grid gap-2">
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="privacy"
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Только латиница, цифры и дефисы. Публичная страница: <code>/p/{slug || "slug"}</code>
          </p>
        </div>
      </div>

      <div className="rounded-md border">
        <div className="border-b px-4 py-3">
          <p className="text-sm font-semibold">Содержимое страницы</p>
        </div>
        <div className="p-4">
          <Suspense
            fallback={
              <div className="flex justify-center py-12 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            }
          >
            <TiptapEditor initialBlocks={blocks} onChange={setBlocks} />
          </Suspense>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => createMut.mutate()}
          disabled={createMut.isPending || !slug.trim() || !title.trim()}
        >
          {createMut.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Создать
        </Button>
      </div>
    </div>
  );
}
