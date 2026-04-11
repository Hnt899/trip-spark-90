import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Loader2 } from "lucide-react";

type Overview = {
  users: number;
  tickets: number;
  orders: number;
  revenuePaidTickets: string;
  ticketsByPaymentStatus: Record<string, number>;
  ordersByStatus: Record<string, number>;
};

type Timeseries = {
  days: number;
  usersPerDay: { date: string; count: number }[];
  ticketsPerDay: { date: string; count: number }[];
  revenuePerDay: { date: string; sum: string }[];
};

/** Единый ключ дня YYYY-MM-DD (PostgreSQL / ISO приходит по-разному). */
function normalizeDayKey(d: string | Date): string {
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  const s = String(d).trim();
  const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
  if (m) return m[1];
  const t = Date.parse(s);
  if (!Number.isNaN(t)) return new Date(t).toISOString().slice(0, 10);
  return s.slice(0, 10);
}

function formatAxisDay(yyyyMmDd: string) {
  const p = String(yyyyMmDd).slice(0, 10);
  const [, m, d] = p.split("-");
  if (!m || !d) return p;
  return `${d}.${m}`;
}

function StatCard({
  title,
  value,
  sub,
}: {
  title: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tabular-nums">{value}</p>
        {sub ? <p className="mt-1 text-xs text-muted-foreground">{sub}</p> : null}
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const overviewQ = useQuery({
    queryKey: ["admin-stats-overview"],
    queryFn: () => apiFetch<Overview>("/api/admin/stats/overview"),
  });

  const seriesQ = useQuery({
    queryKey: ["admin-stats-timeseries", 30],
    queryFn: () =>
      apiFetch<Timeseries>("/api/admin/stats/timeseries?days=30"),
  });

  const payBreakdown = overviewQ.data?.ticketsByPaymentStatus;
  const payChartData = payBreakdown
    ? Object.entries(payBreakdown).map(([name, count]) => ({ name, count }))
    : [];

  const mergedDaily =
    seriesQ.data &&
    (() => {
      const map = new Map<
        string,
        { date: string; users: number; tickets: number; revenue: number }
      >();

      for (const r of seriesQ.data.usersPerDay) {
        const key = normalizeDayKey(r.date as string | Date);
        map.set(key, {
          date: key,
          users: r.count,
          tickets: 0,
          revenue: 0,
        });
      }
      for (const r of seriesQ.data.ticketsPerDay) {
        const key = normalizeDayKey(r.date as string | Date);
        const row = map.get(key) || {
          date: key,
          users: 0,
          tickets: 0,
          revenue: 0,
        };
        row.tickets = r.count;
        map.set(key, row);
      }
      for (const r of seriesQ.data.revenuePerDay) {
        const key = normalizeDayKey(r.date as string | Date);
        const row = map.get(key) || {
          date: key,
          users: 0,
          tickets: 0,
          revenue: 0,
        };
        row.revenue = Number(r.sum);
        map.set(key, row);
      }
      return [...map.values()].sort((a, b) => a.date.localeCompare(b.date));
    })();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Статистика</h1>
        <p className="text-muted-foreground">
          Сводка по пользователям, билетам и заказам за всё время и за 30 дней.
        </p>
      </div>

      {overviewQ.isLoading ? (
        <div className="flex justify-center py-12 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : overviewQ.isError ? (
        <p className="text-destructive">
          Не удалось загрузить статистику. Проверьте вход и права администратора.
        </p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Пользователи" value={overviewQ.data!.users} />
            <StatCard title="Билеты (записей)" value={overviewQ.data!.tickets} />
            <StatCard title="Заказы" value={overviewQ.data!.orders} />
            <StatCard
              title="Выручка (оплаченные билеты)"
              value={`${overviewQ.data!.revenuePaidTickets} ₽`}
              sub="Сумма total_price со статусом paid"
            />
          </div>

          {payChartData.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Билеты по статусу оплаты</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={payChartData} margin={{ left: 8, right: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                    <Tooltip />
                    <Bar
                      dataKey="count"
                      name="Кол-во"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    >
                      <LabelList
                        dataKey="count"
                        position="top"
                        className="fill-foreground text-xs"
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ) : null}
        </>
      )}

      {seriesQ.isLoading ? (
        <div className="flex justify-center py-8 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : seriesQ.isError ? null : mergedDaily && mergedDaily.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Динамика за {seriesQ.data!.days} дней
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              По каждой дате — три столбца: регистрации, билеты (левая шкала), выручка в ₽
              (правая шкала). Цифры сверху столбцов.
            </p>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mergedDaily} margin={{ left: 8, right: 8, top: 28 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) => formatAxisDay(String(v))}
                />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} allowDecimals={false} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(v) =>
                    Number(v) >= 1000 ? `${(Number(v) / 1000).toFixed(1)}k` : String(v)
                  }
                />
                <Tooltip
                  labelFormatter={(label) => `Дата: ${formatAxisDay(String(label))}`}
                  formatter={(
                    value: number,
                    _name: string,
                    item: { dataKey?: string }
                  ) => {
                    const key = item?.dataKey;
                    if (key === "revenue")
                      return [`${value} ₽`, "Выручка"];
                    if (key === "users") return [value, "Регистрации"];
                    if (key === "tickets") return [value, "Билеты"];
                    return [value, _name];
                  }}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="users"
                  name="Регистрации"
                  fill="#2563eb"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={36}
                >
                  <LabelList
                    dataKey="users"
                    position="top"
                    className="fill-blue-700 text-[10px] font-medium"
                    formatter={(v: number) => (v > 0 ? String(v) : "")}
                  />
                </Bar>
                <Bar
                  yAxisId="left"
                  dataKey="tickets"
                  name="Билеты"
                  fill="#16a34a"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={36}
                >
                  <LabelList
                    dataKey="tickets"
                    position="top"
                    className="fill-green-700 text-[10px] font-medium"
                    formatter={(v: number) => (v > 0 ? String(v) : "")}
                  />
                </Bar>
                <Bar
                  yAxisId="right"
                  dataKey="revenue"
                  name="Выручка ₽"
                  fill="#c026d3"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={36}
                >
                  <LabelList
                    dataKey="revenue"
                    position="top"
                    className="fill-fuchsia-800 text-[10px] font-medium"
                    formatter={(v: number) =>
                      v > 0 ? `${Number(v).toLocaleString("ru-RU")}` : ""
                    }
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      ) : (
        <p className="text-sm text-muted-foreground">
          За выбранный период нет данных для графика.
        </p>
      )}
    </div>
  );
}
