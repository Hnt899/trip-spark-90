CREATE TABLE IF NOT EXISTS regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_regions_sort ON regions(sort_order ASC, name ASC);

-- Сидим начальные регионы из старого хардкода
INSERT INTO regions (name, slug, sort_order) VALUES
  ('Центр', 'centr', 1),
  ('Северо-Запад', 'sever-zapad', 2),
  ('Юг', 'yug', 3),
  ('Поволжье', 'povolzhye', 4),
  ('Урал', 'ural', 5),
  ('Сибирь', 'sibir', 6),
  ('Кавказ', 'kavkaz', 7),
  ('Дальний Восток', 'dalniy-vostok', 8)
ON CONFLICT (slug) DO NOTHING;
