-- Добавляем поле gender в таблицу passengers
ALTER TABLE passengers 
ADD COLUMN IF NOT EXISTS gender TEXT;

-- Комментарий к полю
COMMENT ON COLUMN passengers.gender IS 'Пол пассажира: male (Мужской) или female (Женский)';

