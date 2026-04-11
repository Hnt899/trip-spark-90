-- Таблица маршрутов (CMS): страницы маршрутов с JSON-блоками контента
CREATE TABLE IF NOT EXISTS route_pages (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  legacy_id     TEXT UNIQUE,                          -- "1","2",… для обратной совместимости с захардкоженными ID
  slug          TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  region        TEXT NOT NULL DEFAULT '',
  rating        NUMERIC(3,1) NOT NULL DEFAULT 0 CHECK (rating >= 0 AND rating <= 10),
  cover_image_url TEXT,
  excerpt       TEXT NOT NULL DEFAULT '',
  content_blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  status        TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at  TIMESTAMPTZ,
  views         INT NOT NULL DEFAULT 0,
  author_id     UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
