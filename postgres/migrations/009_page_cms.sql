-- Page CMS: draft/published JSON overrides for Home and Routes landing pages

CREATE TABLE IF NOT EXISTS page_contents (
  page_key TEXT PRIMARY KEY CHECK (page_key IN ('home', 'routes')),
  draft_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  published_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  locked_by UUID REFERENCES users(id) ON DELETE SET NULL,
  locked_at TIMESTAMPTZ,
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS update_page_contents_updated_at ON page_contents;
CREATE TRIGGER update_page_contents_updated_at
  BEFORE UPDATE ON page_contents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS page_content_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key TEXT NOT NULL CHECK (page_key IN ('home', 'routes')),
  snapshot JSONB NOT NULL,
  action TEXT NOT NULL CHECK (action IN (
    'save_draft', 'publish', 'reset_page', 'reset_section', 'restore'
  )),
  section_id TEXT,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_content_revisions_page_created
  ON page_content_revisions(page_key, created_at DESC);

INSERT INTO page_contents (page_key, draft_json, published_json)
VALUES
  ('home', '{}'::jsonb, '{}'::jsonb),
  ('routes', '{}'::jsonb, '{}'::jsonb)
ON CONFLICT (page_key) DO NOTHING;
