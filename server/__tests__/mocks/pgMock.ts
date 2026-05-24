import { vi } from "vitest";

type QueryResult = { rows?: any[]; rowCount?: number };
type Handler = (sql: string, params: any[] | undefined) => QueryResult | Promise<QueryResult>;

const handlers: Array<{ pattern: RegExp; handler: Handler }> = [];

export const queryMock = vi.fn(async (sql: string, params?: any[]) => {
  for (const entry of handlers) {
    if (entry.pattern.test(sql)) {
      const result = await entry.handler(sql, params);
      return {
        rows: result.rows ?? [],
        rowCount: result.rowCount ?? (result.rows ? result.rows.length : 0),
      };
    }
  }
  return { rows: [], rowCount: 0 };
});

export const poolMock = {
  query: queryMock,
  connect: vi.fn(async () => ({
    query: queryMock,
    release: vi.fn(),
  })),
  end: vi.fn(async () => undefined),
};

export function onQuery(pattern: RegExp, handler: Handler) {
  handlers.push({ pattern, handler });
}

export function resetPgMock() {
  handlers.length = 0;
  queryMock.mockClear();
  poolMock.connect.mockClear();
  poolMock.end.mockClear();
}
