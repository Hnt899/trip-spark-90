-- Добавляем поле order_status для отслеживания статуса заказа (возврат, обмен)
ALTER TABLE tickets 
ADD COLUMN IF NOT EXISTS order_status TEXT DEFAULT 'active' 
CHECK (order_status IN ('active', 'refunded', 'exchanged'));

-- Обновляем существующие записи на 'active' если статус NULL
UPDATE tickets SET order_status = 'active' WHERE order_status IS NULL;

-- Добавляем комментарий к полю для документации
COMMENT ON COLUMN tickets.order_status IS 'Статус заказа: active - активный, refunded - возвращен, exchanged - обменен';

