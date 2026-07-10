import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { PageContentDocument, PageKey } from "@/types/pageContent";
import { resolvePublishedContent } from "@/contexts/PageCmsContext";

type PublicPageResponse = {
  pageKey: string;
  content: Partial<PageContentDocument>;
  updatedAt?: string;
};

export function usePublishedPageContent(pageKey: PageKey) {
  return useQuery({
    queryKey: ["page-content", pageKey, "published"],
    queryFn: () => apiFetch<PublicPageResponse>(`/api/pages/${pageKey}`),
    staleTime: 60_000,
  });
}

export function useMergedPublishedPage(pageKey: PageKey) {
  const q = usePublishedPageContent(pageKey);
  const content = resolvePublishedContent(pageKey, q.data?.content);
  return { ...q, content };
}
