import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, FolderTree } from "lucide-react";

import { apiFetch } from "@/lib/api";
import type { ReferenceKind, ReferenceSection, ReferencePostListItem } from "@/types/referenceCms";
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

const KIND_LABEL: Record<ReferenceKind, string> = {
  trains: "Поезда",
  flights: "Самолеты",
  buses: "Автобусы",
};

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

export default function AdminReferenceList() {
  const qc = useQueryClient();
  const [kind, setKind] = useState<ReferenceKind>("trains");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | "draft" | "published">("all");

  const [newSectionName, setNewSectionName] = useState("");
  const [newSectionSlug, setNewSectionSlug] = useState("");
  const [newParentId, setNewParentId] = useState<string>("none");

  const sectionsQ = useQuery({
    queryKey: ["admin-reference-sections", kind],
    queryFn: () =>
      apiFetch<ReferenceSection[]>(
        `/api/admin/reference/sections?kind=${encodeURIComponent(kind)}`,
      ),
    retry: false,
  });

  const postsQ = useQuery({
    queryKey: ["admin-reference-posts", kind, query, status],
    queryFn: () => {
      const params = new URLSearchParams({ kind });
      if (query.trim()) params.set("q", query.trim());
      if (status !== "all") params.set("status", status);
      return apiFetch<ReferencePostListItem[]>(
        `/api/admin/reference/posts?${params.toString()}`,
      );
    },
    retry: false,
  });

  const createSectionMut = useMutation({
    mutationFn: async () => {
      const payload = {
        kind,
        name: newSectionName.trim(),
        slug: newSectionSlug.trim() || undefined,
        parent_id: newParentId === "none" ? null : newParentId,
      };
      return apiFetch<ReferenceSection>("/api/admin/reference/sections", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: () => {
      setNewSectionName("");
      setNewSectionSlug("");
      setNewParentId("none");
      qc.invalidateQueries({ queryKey: ["admin-reference-sections", kind] });
    },
  });

  const patchSectionMut = useMutation({
    mutationFn: async (payload: {
      id: string;
      name?: string;
      slug?: string;
      parent_id?: string | null;
    }) =>
      apiFetch<ReferenceSection>(`/api/admin/reference/sections/${payload.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-reference-sections", kind] });
      qc.invalidateQueries({ queryKey: ["admin-reference-posts"] });
      qc.invalidateQueries({ queryKey: ["reference-sections", kind] });
      qc.invalidateQueries({ queryKey: ["reference-posts", kind] });
    },
  });

  const deleteSectionMut = useMutation({
    mutationFn: async (id: string) =>
      apiFetch(`/api/admin/reference/sections/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-reference-sections", kind] });
      qc.invalidateQueries({ queryKey: ["admin-reference-posts"] });
    },
  });

  const sectionMap = useMemo(() => {
    const map = new Map<string, ReferenceSection>();
    for (const row of sectionsQ.data || []) map.set(row.id, row);
    return map;
  }, [sectionsQ.data]);

  const sectionsTop = useMemo(
    () => (sectionsQ.data || []).filter((s) => !s.parent_id),
    [sectionsQ.data],
  );

  const sectionOptions = useMemo(() => {
    const rows = sectionsQ.data || [];
    return rows.map((s) => ({
      ...s,
      label: s.parent_id ? `${sectionMap.get(s.parent_id)?.name || "Раздел"} / ${s.name}` : s.name,
    }));
  }, [sectionsQ.data, sectionMap]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Справочная (CMS)</h1>
          <p className="text-muted-foreground">
            Редактирование статей по поездам, самолетам и автобусам.
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/reference/new">
            <Plus className="mr-2 h-4 w-4" />
            Новая статья
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Фильтры</CardTitle>
          <CardDescription>Выберите транспорт, статус и строку поиска</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-2">
            <Label>Транспорт</Label>
            <Select value={kind} onValueChange={(v) => setKind(v as ReferenceKind)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trains">Поезда</SelectItem>
                <SelectItem value="flights">Самолеты</SelectItem>
                <SelectItem value="buses">Автобусы</SelectItem>
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
            Разделы ({KIND_LABEL[kind]})
          </CardTitle>
          <CardDescription>
            Можно создать подразделы, переименовывать и менять родительский раздел
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-4">
            <Input
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              placeholder="Название раздела"
            />
            <Input
              value={newSectionSlug}
              onChange={(e) => setNewSectionSlug(e.target.value)}
              placeholder="slug (необязательно)"
            />
            <Select value={newParentId} onValueChange={setNewParentId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Без родителя</SelectItem>
                {sectionOptions.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => createSectionMut.mutate()}
              disabled={createSectionMut.isPending || !newSectionName.trim()}
            >
              {createSectionMut.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Добавить раздел
            </Button>
          </div>
          {createSectionMut.isError ? (
            <p className="text-sm text-destructive">{errorMessage(createSectionMut.error)}</p>
          ) : null}

          {sectionsQ.isLoading ? (
            <div className="flex justify-center py-6 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : sectionsQ.isError ? (
            <p className="text-sm text-destructive">{errorMessage(sectionsQ.error)}</p>
          ) : (
            <div className="space-y-3">
              {sectionsTop.map((parent) => {
                const children = (sectionsQ.data || []).filter(
                  (s) => s.parent_id === parent.id,
                );
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
                            const name = prompt("Новое название раздела", parent.name);
                            if (!name || !name.trim()) return;
                            patchSectionMut.mutate({ id: parent.id, name: name.trim() });
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
                            patchSectionMut.mutate({ id: parent.id, slug: slug.trim() });
                          }}
                        >
                          Slug
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm("Удалить раздел?")) deleteSectionMut.mutate(parent.id);
                          }}
                        >
                          Удалить
                        </Button>
                      </div>
                    </div>
                    {children.length > 0 ? (
                      <ul className="mt-3 space-y-2">
                        {children.map((child) => (
                          <li key={child.id} className="flex flex-wrap items-center justify-between gap-2 rounded bg-muted/30 px-3 py-2">
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
                                  patchSectionMut.mutate({ id: child.id, name: name.trim() });
                                }}
                              >
                                Переименовать
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  patchSectionMut.mutate({ id: child.id, parent_id: null });
                                }}
                              >
                                На верхний уровень
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  if (confirm("Удалить подраздел?")) deleteSectionMut.mutate(child.id);
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
              {!sectionsTop.length ? (
                <p className="text-sm text-muted-foreground">Разделы еще не созданы.</p>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Статьи</CardTitle>
          <CardDescription>Список с фильтрацией по выбранному транспорту</CardDescription>
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
                  <TableHead>Раздел</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {postsQ.data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.title}</TableCell>
                    <TableCell>{row.section_name}</TableCell>
                    <TableCell className="font-mono text-xs">{row.slug}</TableCell>
                    <TableCell>{row.status || "published"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/admin/reference/${row.id}`}>Править</Link>
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
