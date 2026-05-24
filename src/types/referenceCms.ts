import type { BlogContentBlock } from "@/types/blogContent";

export type ReferenceKind = "trains" | "flights" | "buses";

export type ReferenceSection = {
  id: string;
  parent_id: string | null;
  kind: ReferenceKind;
  slug: string;
  name: string;
  sort_order: number;
  published_count?: number;
  total_posts?: number;
};

export type ReferencePostListItem = {
  id: string;
  kind: ReferenceKind;
  slug: string;
  title: string;
  excerpt: string;
  status?: "draft" | "published";
  published_at?: string | null;
  updated_at?: string;
  section_id: string;
  section_name: string;
  section_slug?: string;
  section_parent_id?: string | null;
};

export type ReferencePost = {
  id: string;
  section_id: string;
  kind: ReferenceKind;
  slug: string;
  title: string;
  excerpt: string;
  content_blocks: BlogContentBlock[];
  status: "draft" | "published";
  published_at: string | null;
  views: number;
  section_name: string;
  section_slug: string;
  section_parent_id: string | null;
};
