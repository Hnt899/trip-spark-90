import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Pencil } from "lucide-react";

type Row = {
  id: string;
  slug: string;
  title: string;
  status: string;
  updated_at: string;
};

export default function AdminStaticPages() {
  const q = useQuery({
    queryKey: ["admin-pages-list"],
    queryFn: () => apiFetch<Row[]>("/api/admin/pages-list"),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Страницы</h1>
        <p className="text-muted-foreground">
          FAQ, политика, условия, оферта — редактируются как блог.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все страницы</CardTitle>
        </CardHeader>
        <CardContent>
          {q.isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : q.isError ? (
            <p className="text-destructive">Не удалось загрузить список.</p>
          ) : !q.data?.length ? (
            <p className="text-muted-foreground">Пока нет страниц.</p>
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
                {q.data.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-medium">{r.title}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{r.slug}</TableCell>
                    <TableCell>{r.status}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/admin/static-pages/${r.slug}`}>
                          <Pencil className="h-3.5 w-3.5 mr-1" />
                          Править
                        </Link>
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
