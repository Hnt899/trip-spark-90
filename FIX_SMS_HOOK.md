# Исправление настроек SMS Hook

## Проблема

В настройках Supabase SMS Hook включен и указывает на старую функцию `send-sms-otp-smsru`, но мы используем прямые вызовы функции `send-sms-exolve` из кода.

## Решение

### Вариант 1: Отключить SMS Hook (РЕКОМЕНДУЕТСЯ)

Так как мы вызываем Edge Function напрямую из `AuthContext.tsx`, SMS Hook не нужен.

**Шаги:**
1. Откройте Supabase Dashboard
2. Перейдите в **Authentication** → **Providers** → **Phone** (или **Settings** → **Auth** → **SMS Hook**)
3. Найдите настройку **"Enable Send SMS hook"**
4. **Отключите** переключатель (выключите)
5. Сохраните изменения

### Вариант 2: Обновить SMS Hook на правильную функцию

Если вы хотите использовать Hook (хотя это не обязательно для текущей реализации):

1. Откройте Supabase Dashboard
2. Перейдите в **Authentication** → **Providers** → **Phone** (или **Settings** → **Auth** → **SMS Hook**)
3. В поле **"URL"** замените:
   - Старое: `https://fwjwqtwwsxchjlgwrmdj.supabase.co/functions/v1/send-sms-otp-smsru`
   - Новое: `https://fwjwqtwwsxchjlgwrmdj.supabase.co/functions/v1/send-sms-exolve`
4. Сохраните изменения

**⚠️ Важно:** Если используете Hook, нужно будет обновить Edge Function, чтобы она принимала формат запроса от Supabase Auth Hook, а не наш текущий формат.

## Удаление старых функций

Можно удалить старые неиспользуемые функции:

1. **send-sms-otp-smsc** - старая функция для SMSC.ru
2. **send-sms-otp-smsru** - старая функция для SMS.ru  
3. **send-sms-targetsms** - старая функция для TargetSMS.ru

**Как удалить:**
1. Откройте Supabase Dashboard
2. Перейдите в **Edge Functions**
3. Найдите старую функцию
4. Нажмите на три точки (⋮) рядом с функцией
5. Выберите **"Delete"** или **"Удалить"**

Или через CLI:
```bash
# Удалить функцию (если нужно)
# npx supabase functions delete send-sms-otp-smsc
# npx supabase functions delete send-sms-otp-smsru
# npx supabase functions delete send-sms-targetsms
```

## Текущая ситуация

По логам видно, что:
- ✅ Edge Function `send-sms-exolve` вызывается успешно
- ✅ МТС Exolve API отвечает успешно (HTTP 200)
- ✅ Получен `message_id: 593001091847686706`
- ❌ SMS не доставляется на телефон

Это означает, что проблема **не в коде**, а в **доставке SMS** на стороне МТС Exolve или оператора связи.

## Что проверить

1. **Баланс МТС Exolve** - убедитесь, что есть средства
2. **Статус номера отправителя** - проверьте, что номер `+79926690870` активен
3. **Номер получателя** - убедитесь, что номер `+79508658698` правильный и активен
4. **Логи доставки** - в личном кабинете МТС Exolve можно проверить статус доставки по `message_id`

## Проверка статуса доставки

В личном кабинете МТС Exolve:
1. Перейдите в раздел **"Сообщения"** или **"История отправок"**
2. Найдите сообщение с `message_id: 593001091847686706`
3. Проверьте статус доставки

Возможные статусы:
- `sent` - отправлено
- `delivered` - доставлено
- `failed` - не доставлено
- `pending` - в обработке

