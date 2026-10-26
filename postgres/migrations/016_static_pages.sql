-- Static pages: FAQ, Privacy, Terms, Offer — редактируются в админке.
-- Контент — массив блоков (как в блоге: BlogContentBlock[]).

CREATE TABLE IF NOT EXISTS static_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content_blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  seo_title TEXT,
  seo_description TEXT,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_static_pages_slug ON static_pages(slug);

DROP TRIGGER IF EXISTS update_static_pages_updated_at ON static_pages;
CREATE TRIGGER update_static_pages_updated_at
  BEFORE UPDATE ON static_pages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4 пустые страницы — админ заполнит через админку
INSERT INTO static_pages (slug, title, content_blocks, status)
VALUES
  ('frequently-asked-questions', 'Часто задаваемые вопросы', '[]'::jsonb, 'published'),
  ('privacy', 'Политика конфиденциальности', '[]'::jsonb, 'published'),
  ('terms', 'Условия использования', '[]'::jsonb, 'published'),
  ('offer', 'Оферта', '[]'::jsonb, 'published')
ON CONFLICT (slug) DO NOTHING;
