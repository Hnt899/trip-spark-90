import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Download, Trash2, Search } from "lucide-react";

type SubRow = {
  id: string;
  email: string;
  source: string;
  created_at: string;
  unsubscribed_at: string | null;
};

type ListResponse = {
  items: SubRow[];
  total: number;
  limit: number;
  offset: number;
};

const PAGE_SIZE = 50;

export default function AdminSubscriptions() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [onlyActive, setOnlyActive] = useState(true);
  const [offset, setOffset] = useState(0);

  const q = useQuery({
    queryKey: ["admin-subscriptions", search, onlyActive, offset],
    queryFn: () => {
      const params = new URLSearchParams();
      params.set("limit", String(PAGE_SIZE));
      params.set("offset", String(offset));
      if (search.trim()) params.set("search", search.trim());
      if (onlyActive) params.set("active", "1");
      return apiFetch<ListResponse>(`/api/admin/subscriptions?${params.toString()}`);
    },
    refetchOnWindowFocus: false,
  });

  const delMut = useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/api/admin/subscriptions/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-subscriptions"] });
    },
  });

  const handleExport = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];
    const url = "/api/admin/subscriptions/export";
    fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => r.blob())
      .then((blob) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `subscriptions-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(a.href);
      })
      .catch((e) => alert("Ошибка экспорта: " + e.message));
  };

  const items = q.data?.items || [];
  const total = q.data?.total || 0;
  const hasNext = offset + PAGE_SIZE < total;
  const hasPrev = offset > 0;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Подписки на новости</h1>
          <p className="text-sm text-muted-foreground">Всего: {total}</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Экспорт в CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Фильтры</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOffset(0);
              }}
              placeholder="Поиск по email…"
              className="pl-8"
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={onlyActive}
              onChange={(e) => {
                setOnlyActive(e.target.checked);
                setOffset(0);
              }}
            />
            Только активные
          </label>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {q.isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : items.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted-foreground">
              Пока нет подписок.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b bg-muted/50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Источник</th>
                    <th className="px-4 py-3 font-medium">Дата</th>
                    <th className="px-4 py-3 font-medium">Статус</th>
                    <th className="px-4 py-3 font-medium text-right">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row) => (
                    <tr key={row.id} className="border-b hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <a
                          href={`mailto:${row.email}`}
                          className="text-primary hover:underline"
                        >
                          {row.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{row.source}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(row.created_at).toLocaleString("ru-RU")}
                      </td>
                      <td className="px-4 py-3">
                        {row.unsubscribed_at ? (
                          <span className="text-xs text-muted-foreground">Отписан</span>
                        ) : (
                          <span className="text-xs text-green-600">Активен</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {!row.unsubscribed_at && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              if (confirm(`Отписать ${row.email}?`)) {
                                delMut.mutate(row.id);
                              }
                            }}
                            disabled={delMut.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {total > PAGE_SIZE && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            disabled={!hasPrev}
            onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
          >
            Назад
          </Button>
          <span className="text-sm text-muted-foreground">
            {offset + 1}–{Math.min(offset + PAGE_SIZE, total)} из {total}
          </span>
          <Button
            variant="outline"
            disabled={!hasNext}
            onClick={() => setOffset(offset + PAGE_SIZE)}
          >
            Вперёд
          </Button>
        </div>
      )}
    </div>
  );
}
