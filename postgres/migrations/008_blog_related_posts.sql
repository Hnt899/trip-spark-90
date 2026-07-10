ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS related_post_ids UUID[] NOT NULL DEFAULT '{}'::uuid[];
