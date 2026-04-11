import { useQuery } from "@tanstack/react-query";
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

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

function errorStatus(err: unknown): number | undefined {
  return (err as Error & { status?: number })?.status;
}

export default function AdminBlogList() {
  const q = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: () => apiFetch<Row[]>("/api/admin/blog/posts"),
    retry: false,
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
    </div>
  );
}
