# Восстановление старых SQL функций

## Что восстановлено:

### 1. Функция `send_otp_sms_hook` (SMSC.ru)
- Отправка SMS через SMSC.ru API
- Использует HTTP запросы
- Возвращает JSONB с результатом

### 2. Таблица `verification_codes`
- Хранение кодов подтверждения
- Поля: `id`, `phone`, `code`, `expires_at`, `used`, `created_at`
- Индексы для быстрого поиска

### 3. Функция `cleanup_expired_codes()`
- Очистка истекших и использованных кодов
- Можно вызывать периодически

## Как восстановить:

### Вариант 1: Через SQL Editor в Supabase Dashboard

1. Откройте Supabase Dashboard → SQL Editor
2. Скопируйте содержимое файла `supabase/migrations/restore_old_sms_functions.sql`
3. Вставьте в SQL Editor
4. Нажмите "Run" (или Ctrl+Enter)

### Вариант 2: Через миграцию

Файл уже создан: `supabase/migrations/restore_old_sms_functions.sql`

## Про SQL скрипт удаления:

SQL скрипт, который вы оставили (с `DROP FUNCTION` и `DROP TABLE`), это **не функция**, а просто набор команд для удаления.

**Можно:**
- Оставить его в SQL Editor (он не выполнится автоматически)
- Удалить из SQL Editor (если не нужен)
- Выполнить его, если хотите удалить старые функции/таблицы

**Важно:** Если вы хотите восстановить старые функции, сначала выполните `restore_old_sms_functions.sql`, а потом можете удалить SQL скрипт удаления из Editor.

## Что делать:

1. **Выполните** `restore_old_sms_functions.sql` в SQL Editor
2. **Удалите** SQL скрипт удаления из SQL Editor (если не нужен)
3. **Проверьте**, что функции созданы:
   ```sql
   SELECT routine_name 
   FROM information_schema.routines 
   WHERE routine_schema = 'public' 
   AND routine_name IN ('send_otp_sms_hook', 'cleanup_expired_codes');
   ```

## Примечание:

⚠️ **Важно:** В функции `send_otp_sms_hook` захардкожены логин и пароль SMSC.ru:
- `smsc_login := 'Artur_899'`
- `smsc_password := '5675esTa@'`

Если нужно изменить - отредактируйте значения в SQL перед выполнением.

