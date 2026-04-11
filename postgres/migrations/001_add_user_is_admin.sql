-- Для уже существующей БД без колонки is_admin (однократно):
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE;
