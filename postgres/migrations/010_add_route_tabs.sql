-- Миграция для добавления колонки tabs в таблицу route_pages
-- Хранит массив дополнительных этапов маршрута (табов)
-- Основной контент остаётся в content_blocks

ALTER TABLE route_pages ADD COLUMN IF NOT EXISTS tabs JSONB DEFAULT '[]'::jsonb;
