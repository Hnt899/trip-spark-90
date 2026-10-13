import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { footerDefaults, mergeFooter } from "@/content/footer.defaults";
import type { FooterFields } from "@/types/footerContent";

export function useFooterContent(): FooterFields {
  const q = useQuery({
    queryKey: ["site-settings", "footer"],
    queryFn: async () => {
      try { return await apiFetch<Partial<FooterFields>>("/api/settings/footer"); }
      catch (e) { console.warn("[footer] не удалось загрузить, используются дефолты", e); return null; }
    },
    staleTime: 5 * 60 * 1000, retry: false,
  });
  return mergeFooter(footerDefaults, q.data ?? null);
}
