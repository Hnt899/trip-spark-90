-- ============================================================================
-- Миграция: Добавление полей для интеграции WebPay в таблицу tickets
-- Дата: 2025-01-27
-- Описание: Добавляет поля для отслеживания статуса оплаты, transaction_id,
--           даты оплаты, метода оплаты и raw payload от платежной системы
-- ============================================================================

-- Добавляем поле payment_status для отслеживания статуса оплаты
ALTER TABLE tickets 
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending' 
CHECK (payment_status IN ('pending', 'paid', 'failed', 'cancelled'));

-- Обновляем существующие записи: если заказ уже создан, но оплата не прошла,
-- устанавливаем статус 'pending'
UPDATE tickets SET payment_status = 'pending' WHERE payment_status IS NULL;

-- Комментарий к полю payment_status
COMMENT ON COLUMN tickets.payment_status IS 
  'Статус оплаты заказа: pending - ожидает оплаты, paid - оплачен, failed - ошибка оплаты, cancelled - отменен';

-- ============================================================================

-- Добавляем поле payment_transaction_id для хранения ID транзакции от WebPay
ALTER TABLE tickets 
ADD COLUMN IF NOT EXISTS payment_transaction_id TEXT;

-- Индекс для быстрого поиска по transaction_id (важно для обработки notify)
CREATE INDEX IF NOT EXISTS idx_tickets_payment_transaction_id 
ON tickets(payment_transaction_id) 
WHERE payment_transaction_id IS NOT NULL;

-- Комментарий к полю payment_transaction_id
COMMENT ON COLUMN tickets.payment_transaction_id IS 
  'Уникальный идентификатор транзакции от платежной системы (WebPay). Используется для идемпотентности при обработке повторных notify';

-- ============================================================================

-- Добавляем поле payment_paid_at для хранения даты и времени оплаты
ALTER TABLE tickets 
ADD COLUMN IF NOT EXISTS payment_paid_at TIMESTAMP WITH TIME ZONE;

-- Комментарий к полю payment_paid_at
COMMENT ON COLUMN tickets.payment_paid_at IS 
  'Дата и время успешной оплаты заказа. Заполняется при получении успешного notify от платежной системы';

-- ============================================================================

-- Добавляем поле payment_method для указания способа оплаты
ALTER TABLE tickets 
ADD COLUMN IF NOT EXISTS payment_method TEXT;

-- Комментарий к полю payment_method
COMMENT ON COLUMN tickets.payment_method IS 
  'Способ оплаты заказа (например: webpay, card, bank_transfer). Заполняется при инициализации платежа';

-- ============================================================================

-- Добавляем поле payment_raw для хранения полного payload от платежной системы
ALTER TABLE tickets 
ADD COLUMN IF NOT EXISTS payment_raw JSONB;

-- Комментарий к полю payment_raw
COMMENT ON COLUMN tickets.payment_raw IS 
  'Полный JSON payload от платежной системы (WebPay notify). Хранится для отладки, повторной обработки и аудита. Содержит все параметры запроса от WebPay';

-- ============================================================================

-- Индекс для быстрого поиска по статусу оплаты (важно для аналитики и фильтрации)
CREATE INDEX IF NOT EXISTS idx_tickets_payment_status 
ON tickets(payment_status) 
WHERE payment_status IS NOT NULL;

-- Составной индекс для поиска неоплаченных заказов (для мониторинга и очистки)
CREATE INDEX IF NOT EXISTS idx_tickets_payment_status_created_at 
ON tickets(payment_status, created_at DESC) 
WHERE payment_status = 'pending';

-- ============================================================================

-- Добавляем проверку: если payment_status = 'paid', то payment_paid_at должен быть заполнен
-- Это можно сделать через триггер, но для простоты оставляем на уровне приложения
-- (можно добавить CHECK constraint, но он не позволит обновлять статус без даты)

-- ============================================================================
-- ВАЖНО: После применения миграции
-- ============================================================================
-- 1. Все существующие заказы получат payment_status = 'pending'
-- 2. Для новых заказов payment_status будет устанавливаться в 'pending' по умолчанию
-- 3. При получении notify от WebPay нужно обновлять:
--    - payment_status (на 'paid', 'failed' или 'cancelled')
--    - payment_transaction_id (из notify)
--    - payment_paid_at (текущее время, если статус 'paid')
--    - payment_raw (весь payload от WebPay)
-- 4. Индексы позволят быстро находить заказы по transaction_id и статусу оплаты
-- ============================================================================

