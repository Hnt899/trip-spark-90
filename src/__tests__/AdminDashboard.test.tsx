import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import AdminDashboard from "@/pages/admin/AdminDashboard";

vi.mock("@/lib/api", () => ({
  apiFetch: vi.fn(async (url: string) => {
    if (url.includes("overview")) {
      return {
        users: 10,
        tickets: 20,
        orders: 15,
        revenuePaidTickets: "150000",
        ticketsByPaymentStatus: { paid: 12, pending: 8 },
        ordersByStatus: { active: 13, pending: 2 },
      };
    }
    return {
      days: 30,
      usersPerDay: [{ date: "2026-05-01", count: 1 }],
      ticketsPerDay: [{ date: "2026-05-01", count: 2 }],
      revenuePerDay: [{ date: "2026-05-01", sum: "1000" }],
    };
  }),
}));

vi.mock("recharts", () => {
  const Stub = ({ children }: any) => <div data-testid="chart">{children}</div>;
  return {
    ResponsiveContainer: Stub,
    BarChart: Stub,
    CartesianGrid: () => null,
    LabelList: () => null,
    Legend: () => null,
    Tooltip: () => null,
    XAxis: () => null,
    YAxis: () => null,
    Bar: Stub,
  };
});

describe("AdminDashboard", () => {
  it("renders key dashboard sections", async () => {
    const client = new QueryClient();
    render(
      <QueryClientProvider client={client}>
        <AdminDashboard />
      </QueryClientProvider>,
    );

    expect(await screen.findByText("Статистика")).toBeInTheDocument();
    expect(await screen.findByText("Пользователи")).toBeInTheDocument();
    expect(await screen.findByText("Билеты (записей)")).toBeInTheDocument();
    expect(await screen.findByText(/Динамика за/)).toBeInTheDocument();
  });
});
