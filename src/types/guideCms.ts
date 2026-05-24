import type { BlogContentBlock } from "@/types/blogContent";

export type GuideCategory = {
  id: string;
  parent_id: string | null;
  slug: string;
  name: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  published_count?: number;
  total_posts?: number;
};

export type GuidePostListItem = {
  id: string;
  category_id: string;
  category_slug: string;
  category_name: string;
  slug: string;
  title: string;
  excerpt: string;
  status?: "draft" | "published";
  published_at?: string | null;
  updated_at?: string;
};

export type GuidePost = {
  id: string;
  category_id: string;
  category_slug: string;
  category_name: string;
  slug: string;
  title: string;
  excerpt: string;
  content_blocks: BlogContentBlock[];
  status: "draft" | "published";
  published_at: string | null;
  views: number;
};
