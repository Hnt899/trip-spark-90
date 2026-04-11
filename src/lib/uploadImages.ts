import Cookies from "js-cookie";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

export async function uploadImages(files: File[]): Promise<string[]> {
  const fd = new FormData();
  for (const f of files) fd.append("files", f);

  const token = Cookies.get("access_token");
  const headers: HeadersInit = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const url = `${API_BASE}/api/upload`;
  const res = await fetch(url, { method: "POST", headers, body: fd });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(
      (data as { error?: string }).error || "Upload failed",
    );
  }
  const data = (await res.json()) as { urls: string[] };
  return data.urls;
}
