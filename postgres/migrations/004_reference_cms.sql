-- CMS for Reference section (trains / flights / buses)

CREATE TABLE IF NOT EXISTS reference_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES reference_sections(id) ON DELETE SET NULL,
  kind TEXT NOT NULL CHECK (kind IN ('trains', 'flights', 'buses')),
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (kind, parent_id, slug)
);

CREATE INDEX IF NOT EXISTS idx_reference_sections_kind_parent
  ON reference_sections(kind, parent_id, sort_order, name);

DROP TRIGGER IF EXISTS update_reference_sections_updated_at ON reference_sections;
CREATE TRIGGER update_reference_sections_updated_at
  BEFORE UPDATE ON reference_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS reference_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES reference_sections(id) ON DELETE RESTRICT,
  kind TEXT NOT NULL CHECK (kind IN ('trains', 'flights', 'buses')),
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
  UNIQUE (kind, slug)
);

CREATE INDEX IF NOT EXISTS idx_reference_posts_section ON reference_posts(section_id);
CREATE INDEX IF NOT EXISTS idx_reference_posts_kind_status_pub
  ON reference_posts(kind, status, published_at DESC);

DROP TRIGGER IF EXISTS update_reference_posts_updated_at ON reference_posts;
CREATE TRIGGER update_reference_posts_updated_at
  BEFORE UPDATE ON reference_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
