-- ============================================
-- МИГРАЦИЯ: Добавление функций безопасности
-- ============================================
-- Эта миграция добавляет:
-- 1. Таблицу security_logs для логирования событий безопасности
-- 2. Таблицу user_2fa для двухфакторной аутентификации
-- 3. Функции для работы с 2FA
-- ============================================

-- ============================================
-- 1. ТАБЛИЦА ДЛЯ ЖУРНАЛОВ БЕЗОПАСНОСТИ (LOGS)
-- ============================================
CREATE TABLE IF NOT EXISTS security_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level TEXT NOT NULL CHECK (level IN ('info', 'warn', 'error', 'security')),
  message TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_security_logs_created_at ON security_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_security_logs_user_id ON security_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_security_logs_level ON security_logs(level);
CREATE INDEX IF NOT EXISTS idx_security_logs_ip_address ON security_logs(ip_address);

-- RLS политики для security_logs
ALTER TABLE security_logs ENABLE ROW LEVEL SECURITY;

-- Пользователи могут видеть только свои логи
DROP POLICY IF EXISTS "Users can view their own security logs" ON security_logs;
CREATE POLICY "Users can view their own security logs"
  ON security_logs FOR SELECT
  USING (auth.uid() = user_id);

-- Система может вставлять логи (через service_role)
-- В продакшене это должно быть ограничено только через Edge Functions
DROP POLICY IF EXISTS "Service can insert security logs" ON security_logs;
CREATE POLICY "Service can insert security logs"
  ON security_logs FOR INSERT
  WITH CHECK (true); -- В продакшене можно ограничить через проверку service_role

-- ============================================
-- 2. ТАБЛИЦА ДЛЯ 2FA (ДВУХФАКТОРНАЯ АУТЕНТИФИКАЦИЯ)
-- ============================================
CREATE TABLE IF NOT EXISTS user_2fa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  secret TEXT NOT NULL, -- Секретный ключ для TOTP
  enabled BOOLEAN DEFAULT false,
  backup_codes TEXT[], -- Резервные коды для восстановления
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индекс для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_user_2fa_user_id ON user_2fa(user_id);

-- RLS политики для user_2fa
ALTER TABLE user_2fa ENABLE ROW LEVEL SECURITY;

-- Пользователи могут видеть только свою 2FA настройку
DROP POLICY IF EXISTS "Users can view their own 2FA" ON user_2fa;
CREATE POLICY "Users can view their own 2FA"
  ON user_2fa FOR SELECT
  USING (auth.uid() = user_id);

-- Пользователи могут вставлять свою 2FA настройку
DROP POLICY IF EXISTS "Users can insert their own 2FA" ON user_2fa;
CREATE POLICY "Users can insert their own 2FA"
  ON user_2fa FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Пользователи могут обновлять свою 2FA настройку
DROP POLICY IF EXISTS "Users can update their own 2FA" ON user_2fa;
CREATE POLICY "Users can update their own 2FA"
  ON user_2fa FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Триггер для автоматического обновления updated_at
DROP TRIGGER IF EXISTS update_user_2fa_updated_at ON user_2fa;
CREATE TRIGGER update_user_2fa_updated_at BEFORE UPDATE ON user_2fa
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 3. ФУНКЦИИ ДЛЯ РАБОТЫ С 2FA
-- ============================================

-- Функция для генерации секретного ключа 2FA
-- В реальном проекте используйте библиотеку типа speakeasy или otplib
-- Здесь мы просто генерируем случайную строку, но в Edge Function будем использовать правильную библиотеку
CREATE OR REPLACE FUNCTION generate_2fa_secret(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_secret TEXT;
  v_backup_codes TEXT[];
  v_result JSONB;
BEGIN
  -- Генерируем случайную строку (в Edge Function будет использоваться speakeasy)
  v_secret := encode(gen_random_bytes(20), 'base64');
  
  -- Генерируем 10 резервных кодов (по 8 символов каждый)
  v_backup_codes := ARRAY(
    SELECT LPAD(TO_HEX((RANDOM() * 4294967295)::BIGINT), 8, '0')
    FROM generate_series(1, 10)
  );
  
  -- Вставляем или обновляем запись
  INSERT INTO user_2fa (user_id, secret, backup_codes, enabled)
  VALUES (p_user_id, v_secret, v_backup_codes, false)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    secret = EXCLUDED.secret,
    backup_codes = EXCLUDED.backup_codes,
    enabled = false,
    updated_at = NOW();
  
  -- Возвращаем секрет и резервные коды
  v_result := jsonb_build_object(
    'secret', v_secret,
    'backup_codes', v_backup_codes
  );
  
  RETURN v_result;
END;
$$;

-- Функция для включения 2FA (после верификации первого кода)
CREATE OR REPLACE FUNCTION enable_2fa(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE user_2fa
  SET enabled = true,
      updated_at = NOW()
  WHERE user_id = p_user_id;
  
  RETURN FOUND;
END;
$$;

-- Функция для отключения 2FA
CREATE OR REPLACE FUNCTION disable_2fa(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE user_2fa
  SET enabled = false,
      updated_at = NOW()
  WHERE user_id = p_user_id;
  
  RETURN FOUND;
END;
$$;

-- Функция для проверки, включена ли 2FA у пользователя
CREATE OR REPLACE FUNCTION is_2fa_enabled(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_enabled BOOLEAN;
BEGIN
  SELECT enabled INTO v_enabled
  FROM user_2fa
  WHERE user_id = p_user_id;
  
  RETURN COALESCE(v_enabled, false);
END;
$$;

-- Функция для использования резервного кода
CREATE OR REPLACE FUNCTION use_backup_code(p_user_id UUID, p_code TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_backup_codes TEXT[];
  v_code_index INT;
BEGIN
  -- Получаем текущие резервные коды
  SELECT backup_codes INTO v_backup_codes
  FROM user_2fa
  WHERE user_id = p_user_id;
  
  -- Проверяем, есть ли код в массиве
  SELECT array_position(v_backup_codes, p_code) INTO v_code_index;
  
  IF v_code_index IS NULL THEN
    RETURN false;
  END IF;
  
  -- Удаляем использованный код из массива
  v_backup_codes := array_remove(v_backup_codes, p_code);
  
  -- Обновляем запись
  UPDATE user_2fa
  SET backup_codes = v_backup_codes,
      last_used_at = NOW(),
      updated_at = NOW()
  WHERE user_id = p_user_id;
  
  RETURN true;
END;
$$;

