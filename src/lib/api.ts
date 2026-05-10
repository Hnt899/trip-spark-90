import Cookies from "js-cookie";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  // Бесплатный ngrok иногда отдаёт HTML-заглушку браузеру; для fetch из Vercel это снимает проблему.
  if (
    /ngrok/i.test(API_BASE) &&
    !headers.has("ngrok-skip-browser-warning")
  ) {
    headers.set("ngrok-skip-browser-warning", "true");
  }
  const token = Cookies.get("access_token");
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (
    !headers.has("Content-Type") &&
    init?.body &&
    typeof init.body === "string"
  ) {
    headers.set("Content-Type", "application/json");
  }
  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;
  const res = await fetch(url, { ...init, headers });
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  if (!res.ok) {
    const msg =
      typeof data.error === "string"
        ? data.error
        : res.statusText || "Request failed";
    const err = new Error(msg) as Error & { status?: number; data?: unknown };
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data as T;
}
