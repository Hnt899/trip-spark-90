-- CMS for Guide section

CREATE TABLE IF NOT EXISTS guide_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES guide_categories(id) ON DELETE SET NULL,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (parent_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_guide_categories_parent
  ON guide_categories(parent_id, sort_order, name);

DROP TRIGGER IF EXISTS update_guide_categories_updated_at ON guide_categories;
CREATE TRIGGER update_guide_categories_updated_at
  BEFORE UPDATE ON guide_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS guide_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES guide_categories(id) ON DELETE RESTRICT,
  category_slug TEXT NOT NULL,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content_blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  views INT NOT NULL DEFAULT 0,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (category_slug, slug)
);

CREATE INDEX IF NOT EXISTS idx_guide_posts_category ON guide_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_guide_posts_category_status_pub
  ON guide_posts(category_slug, status, published_at DESC);

DROP TRIGGER IF EXISTS update_guide_posts_updated_at ON guide_posts;
CREATE TRIGGER update_guide_posts_updated_at
  BEFORE UPDATE ON guide_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
