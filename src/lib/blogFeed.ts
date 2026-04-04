import type {
  BlogArticle,
  BlogChannelTab,
  BlogSortMode,
} from "@/types/blogArticle";

export function filterAndSortBlogArticles(
  articles: BlogArticle[],
  opts: {
    channel: BlogChannelTab;
    sort: BlogSortMode;
    selectedTagIds: Set<string>;
    onlyEditorsPick: boolean;
  },
): BlogArticle[] {
  let list = [...articles];

  if (opts.channel !== "all") {
    list = list.filter((a) => a.channel === opts.channel);
  }

  if (opts.onlyEditorsPick) {
    list = list.filter((a) => a.editorsPick);
  }

  if (opts.selectedTagIds.size > 0) {
    list = list.filter((a) =>
      a.tagIds.some((t) => opts.selectedTagIds.has(t)),
    );
  }

  if (opts.sort === "new") {
    list.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime(),
    );
  } else {
    list.sort((a, b) => b.views - a.views);
  }

  return list;
}
