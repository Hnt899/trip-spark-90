-- Таблица для хранения билетов/заказов
CREATE TABLE IF NOT EXISTS tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL,
  transport_type TEXT NOT NULL CHECK (transport_type IN ('train', 'flight', 'bus')),
  total_price DECIMAL(10, 2) NOT NULL,
  tickets_data JSONB NOT NULL, -- Массив данных о билетах (EpdData для каждого пассажира)
  from_city TEXT NOT NULL,
  to_city TEXT NOT NULL,
  departure_date DATE NOT NULL,
  electronic_registration_status TEXT NOT NULL DEFAULT 'pending' CHECK (electronic_registration_status IN ('pending', 'confirmed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_tickets_user_id ON tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_order_number ON tickets(order_number);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON tickets(created_at DESC);

-- Row Level Security (RLS) политики для tickets
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Удаляем существующие политики, если они есть
DROP POLICY IF EXISTS "Users can view their own tickets" ON tickets;
DROP POLICY IF EXISTS "Users can insert their own tickets" ON tickets;
DROP POLICY IF EXISTS "Users can update their own tickets" ON tickets;

-- Создаем политики для tickets
CREATE POLICY "Users can view their own tickets"
  ON tickets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tickets"
  ON tickets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tickets"
  ON tickets FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Триггер для автоматического обновления updated_at
DROP TRIGGER IF EXISTS update_tickets_updated_at ON tickets;
CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

