-- Таблица для хранения сертификатов
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  certificate_code TEXT NOT NULL UNIQUE, -- 10-значный код сертификата
  transport_type TEXT NOT NULL CHECK (transport_type IN ('train', 'flight', 'bus')), -- Категория сертификата
  amount DECIMAL(10, 2) NOT NULL, -- Сумма сертификата
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'used', 'expired')), -- Статус: active, used, expired
  used_at TIMESTAMP WITH TIME ZONE, -- Дата использования
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL, -- Дата истечения (через месяц после создания)
  order_id UUID REFERENCES tickets(id) ON DELETE SET NULL, -- ID заказа, при котором был создан (возврат)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_code ON certificates(certificate_code);
CREATE INDEX IF NOT EXISTS idx_certificates_status ON certificates(status);
CREATE INDEX IF NOT EXISTS idx_certificates_transport_type ON certificates(transport_type);
CREATE INDEX IF NOT EXISTS idx_certificates_expires_at ON certificates(expires_at);

-- Row Level Security (RLS) политики для certificates
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Удаляем существующие политики, если они есть
DROP POLICY IF EXISTS "Users can view their own certificates" ON certificates;
DROP POLICY IF EXISTS "Users can insert their own certificates" ON certificates;
DROP POLICY IF EXISTS "Users can update their own certificates" ON certificates;

-- Создаем политики для certificates
CREATE POLICY "Users can view their own certificates"
  ON certificates FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own certificates"
  ON certificates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own certificates"
  ON certificates FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Триггер для автоматического обновления updated_at
DROP TRIGGER IF EXISTS update_certificates_updated_at ON certificates;
CREATE TRIGGER update_certificates_updated_at BEFORE UPDATE ON certificates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Функция для генерации уникального 10-значного кода сертификата
CREATE OR REPLACE FUNCTION generate_certificate_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists_check INTEGER;
BEGIN
  LOOP
    -- Генерируем 10-значный код
    code := LPAD(FLOOR(RANDOM() * 10000000000)::TEXT, 10, '0');
    
    -- Проверяем уникальность
    SELECT COUNT(*) INTO exists_check
    FROM certificates
    WHERE certificate_code = code;
    
    -- Если код уникален, выходим из цикла
    EXIT WHEN exists_check = 0;
  END LOOP;
  
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Функция для автоматического списания истекших сертификатов
CREATE OR REPLACE FUNCTION expire_old_certificates()
RETURNS void AS $$
BEGIN
  -- Помечаем как expired сертификаты, которые истекли
  UPDATE certificates
  SET status = 'expired', updated_at = NOW()
  WHERE status = 'active'
    AND expires_at < NOW();
    
  -- Помечаем как expired использованные сертификаты через сутки после использования
  UPDATE certificates
  SET status = 'expired', updated_at = NOW()
  WHERE status = 'used'
    AND used_at IS NOT NULL
    AND used_at < NOW() - INTERVAL '1 day';
END;
$$ LANGUAGE plpgsql;

-- RPC функция для создания сертификата
CREATE OR REPLACE FUNCTION create_certificate(
  p_user_id UUID,
  p_transport_type TEXT,
  p_amount DECIMAL,
  p_order_id UUID DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  certificate_code TEXT,
  amount DECIMAL,
  expires_at TIMESTAMP WITH TIME ZONE
) AS $$
DECLARE
  v_code TEXT;
  v_expires_at TIMESTAMP WITH TIME ZONE;
  v_cert_id UUID;
BEGIN
  -- Генерируем уникальный код
  v_code := generate_certificate_code();
  
  -- Дата истечения через месяц
  v_expires_at := NOW() + INTERVAL '1 month';
  
  -- Создаем сертификат
  INSERT INTO certificates (
    user_id,
    certificate_code,
    transport_type,
    amount,
    status,
    expires_at,
    order_id
  ) VALUES (
    p_user_id,
    v_code,
    p_transport_type,
    p_amount,
    'active',
    v_expires_at,
    p_order_id
  ) RETURNING certificates.id, certificates.certificate_code, certificates.amount, certificates.expires_at
  INTO v_cert_id, v_code, p_amount, v_expires_at;
  
  RETURN QUERY SELECT v_cert_id, v_code, p_amount, v_expires_at;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Комментарии для документации
COMMENT ON TABLE certificates IS 'Таблица для хранения сертификатов пользователей. Сертификаты создаются при возврате билетов и используются при оплате.';
COMMENT ON COLUMN certificates.certificate_code IS '10-значный уникальный код сертификата';
COMMENT ON COLUMN certificates.transport_type IS 'Категория сертификата: train, flight, bus. Сертификаты из одной категории нельзя использовать в другой.';
COMMENT ON COLUMN certificates.status IS 'Статус: active - активен, used - использован, expired - истек';
COMMENT ON COLUMN certificates.expires_at IS 'Дата истечения. Неиспользованные сертификаты истекают через месяц после создания.';

