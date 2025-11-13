-- Восстановление старых SQL функций для отправки SMS

-- 1. Функция для отправки SMS через SMSC.ru
CREATE OR REPLACE FUNCTION send_otp_sms_hook(
  phone TEXT,
  message TEXT
) RETURNS JSONB AS $$
DECLARE
  smsc_login TEXT := 'Artur_899'; -- Замените на ваш логин
  smsc_password TEXT := '5675esTa@'; -- Замените на ваш пароль
  smsc_url TEXT := 'https://smsc.ru/sys/send.php';
  response_text TEXT;
  response_json JSONB;
BEGIN
  -- Формируем URL запроса к SMSC.ru API
  -- Формат: https://smsc.ru/sys/send.php?login=LOGIN&psw=PASSWORD&phones=PHONE&mes=MESSAGE
  smsc_url := smsc_url || '?login=' || smsc_login;
  smsc_url := smsc_url || '&psw=' || smsc_password;
  smsc_url := smsc_url || '&phones=' || phone;
  smsc_url := smsc_url || '&mes=' || encode(convert_to(message, 'UTF8'), 'hex');
  smsc_url := smsc_url || '&fmt=3'; -- Формат ответа JSON
  smsc_url := smsc_url || '&charset=utf-8';

  -- Выполняем HTTP запрос
  SELECT content INTO response_text
  FROM http_get(smsc_url);

  -- Парсим JSON ответ
  response_json := response_text::JSONB;

  -- Проверяем успешность отправки
  IF response_json->>'error' IS NOT NULL THEN
    RAISE EXCEPTION 'SMS sending failed: %', response_json->>'error';
  END IF;

  RETURN jsonb_build_object('success', true, 'response', response_json);
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Error sending SMS: %', SQLERRM;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Даем права на выполнение функции
GRANT EXECUTE ON FUNCTION send_otp_sms_hook(TEXT, TEXT) TO anon, authenticated;

-- 2. Таблица для хранения кодов подтверждения
CREATE TABLE IF NOT EXISTS verification_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индекс для быстрого поиска кодов по телефону
CREATE INDEX IF NOT EXISTS idx_verification_codes_phone ON verification_codes(phone);
CREATE INDEX IF NOT EXISTS idx_verification_codes_code ON verification_codes(code);

-- Индекс для очистки истекших кодов
CREATE INDEX IF NOT EXISTS idx_verification_codes_expires_at ON verification_codes(expires_at);

-- 3. Функция для очистки истекших кодов (можно вызывать периодически)
CREATE OR REPLACE FUNCTION cleanup_expired_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM verification_codes
  WHERE expires_at < NOW() OR used = TRUE;
END;
$$ LANGUAGE plpgsql;

