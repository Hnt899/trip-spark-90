CREATE TABLE IF NOT EXISTS page_seo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_seo_page_key ON page_seo(page_key);

-- Начальные страницы
INSERT INTO page_seo (page_key, title, description) VALUES
  ('home', 'TudaSuda — поиск билетов на поезд, самолёт и автобус', 'Онлайн-сервис поиска и бронирования билетов. Поезда, самолёты, автобусы — всё в одном месте.'),
  ('routes', 'Маршруты по России — TudaSuda', 'Популярные маршруты по регионам России: описания, цены, лучшие сезоны и достопримечательности.'),
  ('routes-list', 'Список маршрутов — TudaSuda', 'Все маршруты по России с рейтингами, ценами и описаниями.'),
  ('blog', 'Блог о путешествиях — TudaSuda', 'Статьи о путешествиях по России и миру: лайфхаки, обзоры, инструкции и вдохновение.'),
  ('reference', 'Справочная информация — TudaSuda', 'Правила покупки билетов, возврат, провоз багажа, оформление документов — всё в одном месте.'),
  ('guide', 'Путеводитель — TudaSuda', 'Подробные гиды по городам и регионам России: что посмотреть, где поесть, как добраться.')
ON CONFLICT (page_key) DO NOTHING;
