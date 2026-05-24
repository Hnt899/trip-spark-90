import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FolderTree, Loader2, Plus } from "lucide-react";

import { apiFetch } from "@/lib/api";
import type { GuideCategory, GuidePostListItem } from "@/types/guideCms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

export default function AdminGuideList() {
  const qc = useQueryClient();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "draft" | "published">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategorySlug, setNewCategorySlug] = useState("");
  const [newParentId, setNewParentId] = useState<string>("none");

  const categoriesQ = useQuery({
    queryKey: ["admin-guide-categories"],
    queryFn: () => apiFetch<GuideCategory[]>("/api/admin/guide/categories"),
    retry: false,
  });

  const postsQ = useQuery({
    queryKey: ["admin-guide-posts", query, status, categoryFilter],
    queryFn: () => {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (status !== "all") params.set("status", status);
      if (categoryFilter !== "all") params.set("category", categoryFilter);
      return apiFetch<GuidePostListItem[]>(`/api/admin/guide/posts?${params.toString()}`);
    },
    retry: false,
  });

  const createCategoryMut = useMutation({
    mutationFn: async () => {
      const payload = {
        name: newCategoryName.trim(),
        slug: newCategorySlug.trim() || undefined,
        parent_id: newParentId === "none" ? null : newParentId,
      };
      return apiFetch<GuideCategory>("/api/admin/guide/categories", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      setNewCategoryName("");
      setNewCategorySlug("");
      setNewParentId("none");
      qc.invalidateQueries({ queryKey: ["admin-guide-categories"] });
    },
  });

  const patchCategoryMut = useMutation({
    mutationFn: async (payload: {
      id: string;
      name?: string;
      slug?: string;
      parent_id?: string | null;
    }) =>
      apiFetch<GuideCategory>(`/api/admin/guide/categories/${payload.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-guide-categories"] });
      qc.invalidateQueries({ queryKey: ["admin-guide-posts"] });
      qc.invalidateQueries({ queryKey: ["guide-categories"] });
      qc.invalidateQueries({ queryKey: ["guide-posts"] });
    },
  });

  const deleteCategoryMut = useMutation({
    mutationFn: async (id: string) =>
      apiFetch(`/api/admin/guide/categories/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-guide-categories"] });
      qc.invalidateQueries({ queryKey: ["admin-guide-posts"] });
      qc.invalidateQueries({ queryKey: ["guide-categories"] });
      qc.invalidateQueries({ queryKey: ["guide-posts"] });
    },
  });

  const categoryMap = useMemo(() => {
    const map = new Map<string, GuideCategory>();
    for (const row of categoriesQ.data || []) map.set(row.id, row);
    return map;
  }, [categoriesQ.data]);

  const categoriesTop = useMemo(
    () => (categoriesQ.data || []).filter((s) => !s.parent_id),
    [categoriesQ.data],
  );

  const categoryOptions = useMemo(() => {
    const rows = categoriesQ.data || [];
    return rows.map((s) => ({
      ...s,
      label: s.parent_id
        ? `${categoryMap.get(s.parent_id)?.name || "Раздел"} / ${s.name}`
        : s.name,
    }));
  }, [categoriesQ.data, categoryMap]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Путеводитель (CMS)</h1>
          <p className="text-muted-foreground">Редактирование статей путеводителя по всем категориям.</p>
        </div>
        <Button asChild>
          <Link to="/admin/guide/new">
            <Plus className="mr-2 h-4 w-4" />
            Новая статья
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Фильтры</CardTitle>
          <CardDescription>Категория, статус и строка поиска</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-2">
            <Label>Категория</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categoriesTop.map((c) => (
                  <SelectItem key={c.id} value={c.slug}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Статус</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все</SelectItem>
                <SelectItem value="draft">Черновик</SelectItem>
                <SelectItem value="published">Опубликовано</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="q">Поиск</Label>
            <Input
              id="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Название или slug"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderTree className="h-4 w-4" />
            Категории
          </CardTitle>
          <CardDescription>
            Можно создавать подразделы, переименовывать и менять родительскую категорию
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-4">
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Название категории"
            />
            <Input
              value={newCategorySlug}
              onChange={(e) => setNewCategorySlug(e.target.value)}
              placeholder="slug (необязательно)"
            />
            <Select value={newParentId} onValueChange={setNewParentId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Без родителя</SelectItem>
                {categoryOptions.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => createCategoryMut.mutate()}
              disabled={createCategoryMut.isPending || !newCategoryName.trim()}
            >
              {createCategoryMut.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Добавить категорию
            </Button>
          </div>
          {createCategoryMut.isError ? (
            <p className="text-sm text-destructive">{errorMessage(createCategoryMut.error)}</p>
          ) : null}

          {categoriesQ.isLoading ? (
            <div className="flex justify-center py-6 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : categoriesQ.isError ? (
            <p className="text-sm text-destructive">{errorMessage(categoriesQ.error)}</p>
          ) : (
            <div className="space-y-3">
              {categoriesTop.map((parent) => {
                const children = (categoriesQ.data || []).filter((s) => s.parent_id === parent.id);
                return (
                  <div key={parent.id} className="rounded-md border p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-medium">
                        {parent.name}{" "}
                        <span className="ml-2 text-xs text-muted-foreground">/{parent.slug}</span>
                      </p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const name = prompt("Новое название категории", parent.name);
                            if (!name || !name.trim()) return;
                            patchCategoryMut.mutate({ id: parent.id, name: name.trim() });
                          }}
                        >
                          Переименовать
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const slug = prompt("Новый slug", parent.slug);
                            if (!slug || !slug.trim()) return;
                            patchCategoryMut.mutate({ id: parent.id, slug: slug.trim() });
                          }}
                        >
                          Slug
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm("Удалить категорию?")) deleteCategoryMut.mutate(parent.id);
                          }}
                        >
                          Удалить
                        </Button>
                      </div>
                    </div>
                    {children.length > 0 ? (
                      <ul className="mt-3 space-y-2">
                        {children.map((child) => (
                          <li
                            key={child.id}
                            className="flex flex-wrap items-center justify-between gap-2 rounded bg-muted/30 px-3 py-2"
                          >
                            <p>
                              {child.name}{" "}
                              <span className="ml-1 text-xs text-muted-foreground">/{child.slug}</span>
                            </p>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  const name = prompt("Новое название подраздела", child.name);
                                  if (!name || !name.trim()) return;
                                  patchCategoryMut.mutate({ id: child.id, name: name.trim() });
                                }}
                              >
                                Переименовать
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  patchCategoryMut.mutate({ id: child.id, parent_id: null });
                                }}
                              >
                                На верхний уровень
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  if (confirm("Удалить подраздел?")) deleteCategoryMut.mutate(child.id);
                                }}
                              >
                                Удалить
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
              {!categoriesTop.length ? (
                <p className="text-sm text-muted-foreground">Категории еще не созданы.</p>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Статьи</CardTitle>
          <CardDescription>Список всех статей путеводителя</CardDescription>
        </CardHeader>
        <CardContent>
          {postsQ.isLoading ? (
            <div className="flex justify-center py-10 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : postsQ.isError ? (
            <p className="text-sm text-destructive">{errorMessage(postsQ.error)}</p>
          ) : !postsQ.data?.length ? (
            <p className="text-sm text-muted-foreground">Статьи не найдены.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Заголовок</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {postsQ.data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.title}</TableCell>
                    <TableCell>{row.category_name}</TableCell>
                    <TableCell className="font-mono text-xs">{row.category_slug}/{row.slug}</TableCell>
                    <TableCell>{row.status || "published"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/admin/guide/${row.id}`}>Править</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
