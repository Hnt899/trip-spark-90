import type { BlogArticle } from "@/types/blogArticle";

/** Статьи из БД перекрывают статические с тем же slug. */
export function mergeBlogArticles(
  fromDb: BlogArticle[],
  staticArticles: BlogArticle[],
): BlogArticle[] {
  const bySlug = new Map<string, BlogArticle>();
  for (const a of fromDb) bySlug.set(a.slug, a);
  for (const a of staticArticles) {
    if (!bySlug.has(a.slug)) bySlug.set(a.slug, a);
  }
  return Array.from(bySlug.values());
}
