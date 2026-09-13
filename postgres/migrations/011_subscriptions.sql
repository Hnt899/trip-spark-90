-- Таблица подписок на новости
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'footer',
  user_agent TEXT,
  ip TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_email
  ON subscriptions(LOWER(email));

CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at
  ON subscriptions(created_at DESC);

-- Уникальность: нельзя подписаться дважды одним email, пока не отписан
CREATE UNIQUE INDEX IF NOT EXISTS uq_subscriptions_active_email
  ON subscriptions(LOWER(email))
  WHERE unsubscribed_at IS NULL;
