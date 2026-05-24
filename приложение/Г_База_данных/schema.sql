-- Standalone PostgreSQL schema (no Supabase auth schema).
-- Apply once to a fresh database: psql $DATABASE_URL -f postgres/schema.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- users (replaces auth.users for this application)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  phone TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  raw_user_meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone) WHERE phone IS NOT NULL;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ---------------------------------------------------------------------------
-- Core tables
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  patronymic TEXT,
  phone TEXT,
  email TEXT,
  birth_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS passengers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  display_name TEXT,
  name TEXT NOT NULL,
  surname TEXT NOT NULL,
  patronymic TEXT,
  gender TEXT,
  passport_series TEXT NOT NULL,
  passport_number TEXT NOT NULL,
  birth_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_passengers_user_id ON passengers(user_id);

DROP TRIGGER IF EXISTS update_passengers_updated_at ON passengers;
CREATE TRIGGER update_passengers_updated_at
  BEFORE UPDATE ON passengers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL,
  transport_type TEXT NOT NULL CHECK (transport_type IN ('train', 'flight', 'bus')),
  total_price DECIMAL(10, 2) NOT NULL,
  tickets_data JSONB NOT NULL,
  from_city TEXT NOT NULL,
  to_city TEXT NOT NULL,
  departure_date DATE NOT NULL,
  electronic_registration_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (electronic_registration_status IN ('pending', 'confirmed')),
  order_status TEXT DEFAULT 'active' CHECK (order_status IN ('active', 'refunded', 'exchanged')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'cancelled')),
  payment_transaction_id TEXT,
  payment_paid_at TIMESTAMPTZ,
  payment_method TEXT,
  payment_raw JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tickets_user_id ON tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_order_number ON tickets(order_number);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON tickets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tickets_payment_transaction_id ON tickets(payment_transaction_id)
  WHERE payment_transaction_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_tickets_payment_status ON tickets(payment_status) WHERE payment_status IS NOT NULL;

DROP TRIGGER IF EXISTS update_tickets_updated_at ON tickets;
CREATE TRIGGER update_tickets_updated_at
  BEFORE UPDATE ON tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS verification_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_verification_codes_phone ON verification_codes(phone);
CREATE INDEX IF NOT EXISTS idx_verification_codes_code ON verification_codes(code);
CREATE INDEX IF NOT EXISTS idx_verification_codes_expires_at ON verification_codes(expires_at);

CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  certificate_code TEXT NOT NULL UNIQUE,
  transport_type TEXT NOT NULL CHECK (transport_type IN ('train', 'flight', 'bus')),
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'used', 'expired')),
  used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ NOT NULL,
  order_id UUID REFERENCES tickets(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_code ON certificates(certificate_code);
CREATE INDEX IF NOT EXISTS idx_certificates_status ON certificates(status);

DROP TRIGGER IF EXISTS update_certificates_updated_at ON certificates;
CREATE TRIGGER update_certificates_updated_at
  BEFORE UPDATE ON certificates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS security_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level TEXT NOT NULL CHECK (level IN ('info', 'warn', 'error', 'security')),
  message TEXT NOT NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  ip_address TEXT,
  user_agent TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_security_logs_created_at ON security_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_security_logs_user_id ON security_logs(user_id);

CREATE TABLE IF NOT EXISTS user_2fa (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  secret TEXT NOT NULL,
  enabled BOOLEAN DEFAULT false,
  backup_codes TEXT[],
  last_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_2fa_user_id ON user_2fa(user_id);

DROP TRIGGER IF EXISTS update_user_2fa_updated_at ON user_2fa;
CREATE TRIGGER update_user_2fa_updated_at
  BEFORE UPDATE ON user_2fa
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS email_otp_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  purpose TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_otp_email ON email_otp_challenges(email);

-- ---------------------------------------------------------------------------
-- Functions
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION cleanup_expired_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM verification_codes
  WHERE expires_at < NOW() OR used = TRUE;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_certificate_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists_check INTEGER;
BEGIN
  LOOP
    code := LPAD(FLOOR(RANDOM() * 10000000000)::TEXT, 10, '0');
    SELECT COUNT(*) INTO exists_check FROM certificates WHERE certificate_code = code;
    EXIT WHEN exists_check = 0;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION expire_old_certificates()
RETURNS void AS $$
BEGIN
  UPDATE certificates
  SET status = 'expired', updated_at = NOW()
  WHERE status = 'active' AND expires_at < NOW();

  UPDATE certificates
  SET status = 'expired', updated_at = NOW()
  WHERE status = 'used'
    AND used_at IS NOT NULL
    AND used_at < NOW() - INTERVAL '1 day';
END;
$$ LANGUAGE plpgsql;

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
  expires_at TIMESTAMPTZ
) AS $$
DECLARE
  v_code TEXT;
  v_expires_at TIMESTAMPTZ;
  v_cert_id UUID;
  v_amount DECIMAL(10,2);
BEGIN
  v_code := generate_certificate_code();
  v_expires_at := NOW() + INTERVAL '1 month';

  INSERT INTO certificates (
    user_id, certificate_code, transport_type, amount, status, expires_at, order_id
  ) VALUES (
    p_user_id, v_code, p_transport_type, p_amount, 'active', v_expires_at, p_order_id
  )
  RETURNING certificates.id, certificates.certificate_code, certificates.amount, certificates.expires_at
  INTO v_cert_id, v_code, v_amount, v_expires_at;

  RETURN QUERY SELECT v_cert_id, v_code, v_amount, v_expires_at;
END;
$$ LANGUAGE plpgsql;

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
  v_secret := encode(gen_random_bytes(20), 'base64');
  v_backup_codes := ARRAY(
    SELECT LPAD(TO_HEX((RANDOM() * 4294967295)::BIGINT), 8, '0')
    FROM generate_series(1, 10)
  );

  INSERT INTO user_2fa (user_id, secret, backup_codes, enabled)
  VALUES (p_user_id, v_secret, v_backup_codes, false)
  ON CONFLICT (user_id)
  DO UPDATE SET
    secret = EXCLUDED.secret,
    backup_codes = EXCLUDED.backup_codes,
    enabled = false,
    updated_at = NOW();

  v_result := jsonb_build_object('secret', v_secret, 'backup_codes', to_jsonb(v_backup_codes));
  RETURN v_result;
END;
$$;

CREATE OR REPLACE FUNCTION enable_2fa(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE user_2fa SET enabled = true, updated_at = NOW() WHERE user_id = p_user_id;
  RETURN FOUND;
END;
$$;

CREATE OR REPLACE FUNCTION disable_2fa(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE user_2fa SET enabled = false, updated_at = NOW() WHERE user_id = p_user_id;
  RETURN FOUND;
END;
$$;

CREATE OR REPLACE FUNCTION is_2fa_enabled(p_user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_enabled BOOLEAN;
BEGIN
  SELECT enabled INTO v_enabled FROM user_2fa WHERE user_id = p_user_id;
  RETURN COALESCE(v_enabled, false);
END;
$$;

CREATE OR REPLACE FUNCTION use_backup_code(p_user_id UUID, p_code TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_backup_codes TEXT[];
  v_code_index INT;
BEGIN
  SELECT backup_codes INTO v_backup_codes FROM user_2fa WHERE user_id = p_user_id;
  SELECT array_position(v_backup_codes, p_code) INTO v_code_index;
  IF v_code_index IS NULL THEN
    RETURN false;
  END IF;
  v_backup_codes := array_remove(v_backup_codes, p_code);
  UPDATE user_2fa
  SET backup_codes = v_backup_codes, last_used_at = NOW(), updated_at = NOW()
  WHERE user_id = p_user_id;
  RETURN true;
END;
$$;

-- ---------------------------------------------------------------------------
-- Blog (CMS): статьи с JSON-блоками контента
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT,
  content_blocks JSONB NOT NULL DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  reading_minutes INT NOT NULL DEFAULT 5 CHECK (reading_minutes >= 1 AND reading_minutes <= 240),
  badges TEXT[] NOT NULL DEFAULT ARRAY['own']::text[],
  channel TEXT NOT NULL DEFAULT 'tudasuda' CHECK (channel IN ('tudasuda', 'partners', 'special')),
  tag_ids TEXT[] NOT NULL DEFAULT '{}'::text[],
  editors_pick BOOLEAN NOT NULL DEFAULT false,
  partner_carousel BOOLEAN NOT NULL DEFAULT false,
  sponsored_grid BOOLEAN NOT NULL DEFAULT false,
  views INT NOT NULL DEFAULT 0,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts (published_at DESC)
  WHERE status = 'published';

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
