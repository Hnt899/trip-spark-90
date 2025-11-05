-- Функция для автоматического обновления updated_at (создаем первой, так как используется в триггерах)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Таблица для хранения профилей пользователей
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  patronymic TEXT,
  phone TEXT,
  email TEXT,
  birth_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индекс для быстрого поиска профилей по пользователю
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Row Level Security (RLS) политики для user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Удаляем существующие политики, если они есть
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;

-- Создаем политики для user_profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Политика для поиска по телефону при входе (доступна всем для поиска email по номеру)
-- Важно: это нужно для входа по номеру телефона
DROP POLICY IF EXISTS "Anyone can search by phone for login" ON user_profiles;
CREATE POLICY "Anyone can search by phone for login"
  ON user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Триггер для автоматического обновления updated_at для user_profiles
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Таблица для хранения данных пассажиров
CREATE TABLE IF NOT EXISTS passengers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  name TEXT NOT NULL,
  surname TEXT NOT NULL,
  patronymic TEXT,
  passport_series TEXT NOT NULL,
  passport_number TEXT NOT NULL,
  birth_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индекс для быстрого поиска пассажиров по пользователю
CREATE INDEX IF NOT EXISTS idx_passengers_user_id ON passengers(user_id);

-- Таблица для хранения заказов (для будущего использования)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',
  total_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индекс для быстрого поиска заказов по пользователю
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);

-- Row Level Security (RLS) политики для passengers
ALTER TABLE passengers ENABLE ROW LEVEL SECURITY;

-- Удаляем существующие политики, если они есть (для безопасного повторного запуска)
DROP POLICY IF EXISTS "Users can view their own passengers" ON passengers;
DROP POLICY IF EXISTS "Users can insert their own passengers" ON passengers;
DROP POLICY IF EXISTS "Users can update their own passengers" ON passengers;
DROP POLICY IF EXISTS "Users can delete their own passengers" ON passengers;

-- Создаем политики для passengers
CREATE POLICY "Users can view their own passengers"
  ON passengers FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own passengers"
  ON passengers FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own passengers"
  ON passengers FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own passengers"
  ON passengers FOR DELETE
  USING (auth.uid() = user_id);

-- Row Level Security (RLS) политики для orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Удаляем существующие политики, если они есть (для безопасного повторного запуска)
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;

-- Создаем политики для orders
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Удаляем существующие триггеры, если они есть (для безопасного повторного запуска)
DROP TRIGGER IF EXISTS update_passengers_updated_at ON passengers;
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;

-- Триггеры для автоматического обновления updated_at
CREATE TRIGGER update_passengers_updated_at BEFORE UPDATE ON passengers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
