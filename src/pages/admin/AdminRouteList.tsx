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
import { Loader2, Plus, Star } from "lucide-react";

type Row = {
  id: string;
  legacy_id: string | null;
  slug: string;
  name: string;
  region: string;
  rating: number;
  status: string;
  updated_at: string;
};

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

function errorStatus(err: unknown): number | undefined {
  return (err as Error & { status?: number })?.status;
}

export default function AdminRouteList() {
  const q = useQuery({
    queryKey: ["admin-route-pages"],
    queryFn: () => apiFetch<Row[]>("/api/admin/routes"),
    retry: false,
  });

  const errText = q.isError ? errorMessage(q.error) : "";
  const errCode = q.isError ? errorStatus(q.error) : undefined;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Маршруты (CMS)</h1>
          <p className="text-muted-foreground">
            Страницы маршрутов в PostgreSQL. На сайте они подменяют захардкоженные
            карточки при совпадении legacy_id.
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/routes/new">
            <Plus className="mr-2 h-4 w-4" />
            Новый маршрут
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все маршруты</CardTitle>
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
                {errCode != null ? ` (HTTP ${errCode})` : ""}
              </p>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                <li>
                  Запущена ли миграция{" "}
                  <code className="rounded bg-muted px-1">003_route_pages.sql</code>?
                </li>
                <li>
                  Запущен ли API:{" "}
                  <code className="rounded bg-muted px-1">npm run server</code>
                </li>
              </ul>
            </div>
          ) : !q.data?.length ? (
            <p className="text-muted-foreground">Пока нет маршрутов в базе.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Регион</TableHead>
                  <TableHead>Рейтинг</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {q.data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="max-w-[240px] font-medium">
                      {row.name}
                      {row.legacy_id && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          #{row.legacy_id}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">{row.region}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center gap-1 text-sm">
                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        {Number(row.rating).toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/admin/routes/${row.id}`}>Править</Link>
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
