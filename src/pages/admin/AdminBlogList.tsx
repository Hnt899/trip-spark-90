import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";

type Row = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  status: string;
  published_at: string | null;
  updated_at: string;
  channel: string;
  editors_pick: boolean;
};

type BlogTag = {
  id: string;
  slug: string;
  name: string;
};

type BlogTagGroup = {
  id: string;
  slug: string;
  name: string;
  sort_order: number;
  tags: BlogTag[];
};

type TagGroupsResponse = {
  groups: BlogTagGroup[];
  tags: BlogTag[];
};

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

function errorStatus(err: unknown): number | undefined {
  return (err as Error & { status?: number })?.status;
}

export default function AdminBlogList() {
  const qc = useQueryClient();
  const [newGroupName, setNewGroupName] = useState("");
  const [newTagName, setNewTagName] = useState("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  const q = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: () => apiFetch<Row[]>("/api/admin/blog/posts"),
    retry: false,
  });
  const tagsQ = useQuery({
    queryKey: ["admin-blog-tag-groups"],
    queryFn: () => apiFetch<TagGroupsResponse>("/api/admin/blog/tag-groups?withTags=1"),
    retry: false,
  });

  const groupByTag = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const group of tagsQ.data?.groups || []) {
      for (const tag of group.tags) {
        map.set(tag.id, [...(map.get(tag.id) || []), group.id]);
      }
    }
    return map;
  }, [tagsQ.data]);

  const createGroupMut = useMutation({
    mutationFn: () =>
      apiFetch("/api/admin/blog/tag-groups", {
        method: "POST",
        body: JSON.stringify({ name: newGroupName }),
      }),
    onSuccess: () => {
      setNewGroupName("");
      qc.invalidateQueries({ queryKey: ["admin-blog-tag-groups"] });
    },
  });

  const createTagMut = useMutation({
    mutationFn: () =>
      apiFetch("/api/admin/blog/tags", {
        method: "POST",
        body: JSON.stringify({ name: newTagName, group_ids: selectedGroups }),
      }),
    onSuccess: () => {
      setNewTagName("");
      setSelectedGroups([]);
      qc.invalidateQueries({ queryKey: ["admin-blog-tag-groups"] });
    },
  });

  const renameGroupMut = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      apiFetch(`/api/admin/blog/tag-groups/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-blog-tag-groups"] }),
  });

  const deleteGroupMut = useMutation({
    mutationFn: (id: string) => apiFetch(`/api/admin/blog/tag-groups/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-blog-tag-groups"] }),
  });

  const renameTagMut = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      apiFetch(`/api/admin/blog/tags/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-blog-tag-groups"] }),
  });

  const updateTagGroupsMut = useMutation({
    mutationFn: ({ tagId, groupIds }: { tagId: string; groupIds: string[] }) =>
      apiFetch(`/api/admin/blog/tags/${tagId}`, {
        method: "PATCH",
        body: JSON.stringify({ group_ids: groupIds }),
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-blog-tag-groups"] }),
  });

  const deleteTagMut = useMutation({
    mutationFn: (id: string) => apiFetch(`/api/admin/blog/tags/${id}`, { method: "DELETE" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-blog-tag-groups"] }),
  });

  const errText = q.isError ? errorMessage(q.error) : "";
  const errStatus = q.isError ? errorStatus(q.error) : undefined;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Блог (CMS)</h1>
          <p className="text-muted-foreground">
            Статьи в PostgreSQL; на сайте они мержатся со статическим списком (приоритет у БД).
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            Новая статья
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все записи</CardTitle>
          <CardDescription>Черновики и опубликованные</CardDescription>
        </CardHeader>
        <CardContent>
          {q.isLoading ? (
            <div className="flex justify-center py-12 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : q.isError ? (
            <div className="space-y-3 text-sm">
              <p className="font-medium text-destructive">
                Не удалось загрузить список.
              </p>
              <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 font-mono text-xs text-destructive">
                {errText || "Неизвестная ошибка"}
                {errStatus != null ? ` (HTTP ${errStatus})` : ""}
              </p>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                <li>
                  Запущен ли API: в отдельном терминале{" "}
                  <code className="rounded bg-muted px-1">npm run server</code>
                </li>
                <li>
                  В <code className="rounded bg-muted px-1">.env</code> тот же{" "}
                  <code className="rounded bg-muted px-1">DATABASE_URL</code>,
                  что и база в pgAdmin, где есть таблица{" "}
                  <code className="rounded bg-muted px-1">blog_posts</code>
                </li>
                <li>
                  Вы вошли в аккаунт и после{" "}
                  <code className="rounded bg-muted px-1">set-admin … grant</code>{" "}
                  сделали выход и снова вход (обновляется JWT)
                </li>
                <li>
                  При ответе 403 — у пользователя нет прав администратора (
                  <code className="rounded bg-muted px-1">is_admin</code> в БД)
                </li>
              </ul>
            </div>
          ) : !q.data?.length ? (
            <p className="text-muted-foreground">Пока нет статей в базе.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Заголовок</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {q.data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="max-w-[240px] font-medium">
                      {row.title}
                    </TableCell>
                    <TableCell className="font-mono text-xs">{row.slug}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/admin/blog/${row.id}`}>Править</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Теги и группы</CardTitle>
          <CardDescription>
            Создавайте теги и объединяйте их в родительские группы через чекбоксы.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 rounded-md border p-3">
              <Label htmlFor="new-group">Новая группа тегов</Label>
              <div className="flex gap-2">
                <Input
                  id="new-group"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Например: Транспорт"
                />
                <Button
                  onClick={() => createGroupMut.mutate()}
                  disabled={createGroupMut.isPending || !newGroupName.trim()}
                >
                  Создать
                </Button>
              </div>
              {createGroupMut.isError ? (
                <p className="text-xs text-destructive">{errorMessage(createGroupMut.error)}</p>
              ) : null}
            </div>
            <div className="space-y-2 rounded-md border p-3">
              <Label htmlFor="new-tag">Новый тег</Label>
              <Input
                id="new-tag"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Например: поезда"
              />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Группы тега</p>
                <div className="grid max-h-28 gap-2 overflow-auto pr-1">
                  {(tagsQ.data?.groups || []).map((group) => (
                    <label key={group.id} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={selectedGroups.includes(group.id)}
                        onCheckedChange={(value) => {
                          setSelectedGroups((prev) =>
                            value
                              ? [...prev, group.id]
                              : prev.filter((id) => id !== group.id),
                          );
                        }}
                      />
                      {group.name}
                    </label>
                  ))}
                </div>
              </div>
              <Button
                onClick={() => createTagMut.mutate()}
                disabled={createTagMut.isPending || !newTagName.trim()}
              >
                Создать тег
              </Button>
              {createTagMut.isError ? (
                <p className="text-xs text-destructive">{errorMessage(createTagMut.error)}</p>
              ) : null}
            </div>
          </div>

          {tagsQ.isLoading ? (
            <div className="flex justify-center py-6 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : tagsQ.isError ? (
            <p className="text-sm text-destructive">{errorMessage(tagsQ.error)}</p>
          ) : (
            <div className="space-y-4">
              <div className="rounded-md border p-3">
                <p className="mb-3 text-sm font-medium">Группы</p>
                <div className="space-y-2">
                  {(tagsQ.data?.groups || []).map((group) => (
                    <div key={group.id} className="flex items-center justify-between gap-2">
                      <span className="text-sm">
                        {group.name}{" "}
                        <span className="text-xs text-muted-foreground">/{group.slug}</span>
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const name = prompt("Новое название группы", group.name);
                            if (!name || !name.trim()) return;
                            renameGroupMut.mutate({ id: group.id, name: name.trim() });
                          }}
                        >
                          Переименовать
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm("Удалить группу?")) deleteGroupMut.mutate(group.id);
                          }}
                        >
                          Удалить
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-md border p-3">
                <p className="mb-3 text-sm font-medium">Теги и привязки к группам</p>
                <div className="space-y-3">
                  {(tagsQ.data?.tags || []).map((tag) => {
                    const attached = groupByTag.get(tag.id) || [];
                    return (
                      <div key={tag.id} className="rounded border p-2">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <span className="text-sm">
                            {tag.name}{" "}
                            <span className="text-xs text-muted-foreground">/{tag.slug}</span>
                          </span>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const name = prompt("Новое название тега", tag.name);
                                if (!name || !name.trim()) return;
                                renameTagMut.mutate({ id: tag.id, name: name.trim() });
                              }}
                            >
                              Переименовать
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                if (confirm("Удалить тег?")) deleteTagMut.mutate(tag.id);
                              }}
                            >
                              Удалить
                            </Button>
                          </div>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {(tagsQ.data?.groups || []).map((group) => (
                            <label key={group.id} className="flex items-center gap-2 text-xs">
                              <Checkbox
                                checked={attached.includes(group.id)}
                                onCheckedChange={(value) => {
                                  const next = value
                                    ? [...attached, group.id]
                                    : attached.filter((id) => id !== group.id);
                                  updateTagGroupsMut.mutate({ tagId: tag.id, groupIds: next });
                                }}
                              />
                              {group.name}
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
