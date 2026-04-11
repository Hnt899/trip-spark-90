CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT,
  content_blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  reading_minutes INT NOT NULL DEFAULT 5 CHECK (reading_minutes >= 1 AND reading_minutes <= 240),
  badges TEXT[] NOT NULL DEFAULT ARRAY['own']::text[],
  channel TEXT NOT NULL DEFAULT 'tudasuda' CHECK (channel IN ('tudasuda', 'partners', 'special')),
  tag_ids TEXT[] NOT NULL DEFAULT '{}'::text[],
  editors_pick BOOLEAN NOT NULL DEFAULT false,
  partner_carousel BOOLEAN NOT NULL DEFAULT false,
  sponsored_grid BOOLEAN NOT NULL DEFAULT false,
  views INT NOT NULL DEFAULT 0,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts (published_at DESC)
  WHERE status = 'published';

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
