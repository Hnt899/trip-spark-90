# Интеграция МТС Exolve для SMS-авторизации

## Обзор

МТС Exolve — это облачная платформа для отправки SMS-сообщений. Мы используем REST API для отправки SMS с кодами подтверждения при регистрации и авторизации пользователей.

## Документация

Официальная документация МТС Exolve доступна на: https://exolve.ru/documents/

**Основные разделы:**
- [Как отправить SMS](https://docs.exolve.ru/docs/ru/instructions/sending-sms/) - Инструкция по отправке SMS
- [SMS API](https://docs.exolve.ru/docs/ru/api-reference/sms-api/) - REST API для отправки SMS
- [SMS-рассылки](https://docs.exolve.ru/docs/ru/api-reference/sms-api/) - Массовые рассылки
- [SMS SMPP](https://docs.exolve.ru/docs/ru/api-reference/sms-smpp/) - SMPP протокол для высоконагруженных систем
- [Campaign API](https://docs.exolve.ru/docs/ru/api-reference/campaign-api/) - Создание массовых рассылок
- [Voice API](https://docs.exolve.ru/docs/ru/api-reference/voice-api/) - Голосовые вызовы
- [Numbering API](https://docs.exolve.ru/docs/ru/api-reference/numbering-api/) - Управление номерами
- [Statistics API](https://docs.exolve.ru/docs/ru/api-reference/statistics-api/) - Статистика по коммуникациям

**Полезные ссылки:**
- [Полная документация](https://docs.exolve.ru/)
- [Инструкции по интеграции](https://docs.exolve.ru/docs/ru/instructions/)
- [Личный кабинет](https://exolve.ru/)

## Что было сделано

1. ✅ Создана Edge Function `send-sms-exolve` для отправки SMS через МТС Exolve API
2. ✅ Обновлена логика регистрации/авторизации в `AuthContext.tsx`
3. ✅ Используется таблица `verification_codes` для хранения кодов подтверждения

## Настройка

### Шаг 1: Регистрация в МТС Exolve

1. Зарегистрируйтесь на платформе [МТС Exolve](https://exolve.ru/)
2. Создайте приложение в личном кабинете
3. Получите API-ключ для авторизации запросов

### Шаг 2: Настройка отправителя

У вас есть два варианта:

**Вариант 1: Использовать номер телефона (рекомендуется для начала)**
- Купите номер телефона в личном кабинете МТС Exolve
- Используйте этот номер в качестве отправителя
- Не требует согласования, работает сразу
- Установите секрет: `EXOLVE_SENDER=+79001234567` (ваш номер)

**Вариант 2: Альфа-имя (для продакшена)**
- Для отправки SMS от имени вашей компании можно согласовать альфа-имя
- Процесс согласования может занять **3–4 недели**
- Требуются подтверждающие документы на владение товарным знаком или доменным именем
- Подробнее: [Согласование альфа-имени](https://help.mts-link.ru/article/21276)
- Установите секрет: `EXOLVE_SENDER=ваше_альфа_имя`

**Примечание:** Если `EXOLVE_SENDER` не установлен, будет использован номер по умолчанию из настроек вашего аккаунта МТС Exolve.

### Шаг 3: Установка секретов в Supabase

Установите следующие секреты через Supabase CLI:

```bash
# API ключ МТС Exolve (обязательно)
npx supabase secrets set EXOLVE_API_KEY=ваш_api_ключ

# Номер телефона или альфа-имя отправителя (опционально)
# Если используете номер: EXOLVE_SENDER=+79001234567
# Если используете альфа-имя: EXOLVE_SENDER=ваше_альфа_имя
# Если не указан - будет использован номер по умолчанию из аккаунта
npx supabase secrets set EXOLVE_SENDER=+79001234567
```

**Где найти API ключ:**
1. Войдите в личный кабинет МТС Exolve: https://exolve.ru/
2. Перейдите в раздел **"Приложения"** (Applications)
3. Выберите ваше приложение (или создайте новое)
4. В настройках приложения найдите раздел **"API ключи"** или **"Ключи"**
5. Скопируйте API ключ (длинная строка символов, может быть в формате UUID)

**Где найти номер телефона или альфа-имя:**
1. В личном кабинете МТС Exolve
2. **Для номера:** раздел **"Нумерация"** (Numbering) → **"Мои номера"** (My Numbers) - купите номер, если его нет
3. **Для альфа-имени:** раздел **"Сообщения"** (Messages) → **"Альфа-имена"** (Alpha Names) - согласуйте, если нужно (процесс может занять 3-4 недели)

**Подробная инструкция:** См. файл `EXOLVE_ACCOUNT_DATA.md` для детального описания всех данных из аккаунта.

### Шаг 4: Деплой Edge Function

```bash
npx supabase functions deploy send-sms-exolve
```

### Шаг 5: Создание таблицы verification_codes

Если таблица еще не создана, выполните SQL в Supabase Dashboard → SQL Editor:

```sql
-- Таблица для хранения кодов подтверждения
CREATE TABLE IF NOT EXISTS verification_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_verification_codes_phone ON verification_codes(phone);
CREATE INDEX IF NOT EXISTS idx_verification_codes_code ON verification_codes(code);
CREATE INDEX IF NOT EXISTS idx_verification_codes_expires_at ON verification_codes(expires_at);
```

## Как это работает

### Отправка SMS

1. Пользователь вводит номер телефона
2. Генерируется 6-значный код подтверждения
3. Код отправляется через Edge Function `send-sms-exolve` на API МТС Exolve
4. Код сохраняется в таблице `verification_codes` с временем истечения (10 минут)
5. Пользователь получает SMS с кодом

### Верификация кода

1. Пользователь вводит полученный код
2. Код проверяется в таблице `verification_codes`:
   - Совпадает ли код
   - Не истек ли срок действия
   - Не был ли уже использован
3. При успешной проверке:
   - Код помечается как использованный
   - Создается или находится пользователь в Supabase Auth
   - Номер телефона сохраняется в таблице `user_profiles`

## API Endpoint

**МТС Exolve API:**
- URL: `https://api.exolve.ru/messaging/v1/SendSMS`
- Метод: `POST`
- Авторизация: `Bearer {API_KEY}`

**Формат запроса:**
Согласно [официальной документации МТС Exolve](https://docs.exolve.ru/docs/ru/instructions/sending-sms/):
```json
{
  "number": "number",  // Номер отправителя или имя отправителя (альфа-имя) - опционально
  "destination": "destination",  // Номер получателя (без +, формат: 7XXXXXXXXXX)
  "text": "text"  // Текст сообщения
}
```

**Пример:**
```json
{
  "number": "79926690870",  // Номер отправителя БЕЗ + или альфа-имя
  "destination": "79508658698",  // Номер получателя БЕЗ +
  "text": "Ваш код подтверждения: 123456"
}
```

**Важно:** 
- Поле `number` опционально — если не указано, используется номер по умолчанию из аккаунта
- Номера в `destination` и `number` должны быть **без префикса +** (формат: `7XXXXXXXXXX`)
- Для альфа-имени используйте текстовое значение (например: `"TripSpark"`)

**Формат ответа (успех):**
```json
{
  "message_id": "1234567890"  // ID сообщения для отслеживания
}
```

## Формат номера телефона

МТС Exolve требует номера в формате **E.164**: `+7XXXXXXXXXX`

Функция `normalizePhoneForSMS` автоматически преобразует:
- `8XXXXXXXXXX` → `+7XXXXXXXXXX`
- `7XXXXXXXXXX` → `+7XXXXXXXXXX`
- `XXXXXXXXXX` → `+7XXXXXXXXXX`

## Тестирование

### Проверка отправки SMS

1. Попробуйте зарегистрироваться на сайте с номером телефона
2. Откройте логи Edge Function в Supabase Dashboard:
   - Project Settings → Edge Functions → `send-sms-exolve` → Logs
3. Проверьте логи на наличие ошибок
4. Убедитесь, что SMS доставляется с вашим текстом сообщения

**Примечание:** После подписания договора:
- ✅ Можно отправлять SMS на любые номера
- ✅ Можно использовать произвольный текст сообщений
- ✅ Код подтверждения доставляется корректно
- ✅ REST API работает полноценно

## Устранение проблем

### Ошибка: "EXOLVE_API_KEY not configured"

**Решение:** Установите секрет через CLI:
```bash
npx supabase secrets set EXOLVE_API_KEY=ваш_ключ
npx supabase functions deploy send-sms-exolve
```

### Ошибка: "Invalid phone number format"

**Решение:** Убедитесь, что номер в формате `+7XXXXXXXXXX`. Функция нормализации должна автоматически преобразовать номер.

### Ошибка: "Unauthorized" или "Invalid API key"

**Решение:** 
1. Проверьте правильность API ключа
2. Убедитесь, что ключ активен в личном кабинете МТС Exolve
3. Проверьте, что ключ установлен правильно (без лишних пробелов)

### SMS не доставляются

**Возможные причины:**
1. Недостаточно средств на балансе МТС Exolve
2. Альфа-имя не согласовано (если используется)
3. Номер получателя заблокирован или невалиден
4. Неверный API ключ или он не обновлён после создания нового аккаунта

**Решение:**
1. Проверьте баланс в личном кабинете МТС Exolve
2. Проверьте статус альфа-имени
3. Попробуйте отправить на другой номер
4. Проверьте логи Edge Function для деталей ошибки
5. Убедитесь, что используете правильный API ключ из нового аккаунта (см. `UPDATE_NEW_ACCOUNT.md`)

## Стоимость

- Стоимость отправки SMS зависит от тарифа МТС Exolve
- Обычно от 1-3 рублей за SMS в России
- Проверьте актуальные тарифы в личном кабинете

## Дополнительные возможности

### Отслеживание статуса доставки

МТС Exolve предоставляет webhook для отслеживания статуса доставки SMS. Можно настроить обработку событий доставки.

### Массовые рассылки

Для массовых рассылок можно использовать [Campaign API](https://docs.exolve.ru/docs/ru/api-reference/campaign-api/creating-campaign/).

### SMPP протокол

Для высоконагруженных систем (тысячи SMS в секунду) можно использовать SMPP протокол вместо REST API. Подробнее: [SMPP Documentation](https://docs.exolve.ru/docs/ru/api-reference/sms-smpp/).

## Полезные ссылки

- [Документация МТС Exolve](https://docs.exolve.ru/)
- [Все API и инструкции](https://exolve.ru/documents/)
- [SMS API Reference](https://docs.exolve.ru/docs/ru/api-reference/sms-api/)
- [Инструкции по отправке SMS](https://docs.exolve.ru/docs/ru/instructions/sending-sms/)
- [Campaign API](https://docs.exolve.ru/docs/ru/api-reference/campaign-api/) - для массовых рассылок
- [SMPP Protocol](https://docs.exolve.ru/docs/ru/api-reference/sms-smpp/) - для высоконагруженных систем
- [Личный кабинет МТС Exolve](https://exolve.ru/)

## Дополнительные материалы

- `EXOLVE_ACCOUNT_DATA.md` - Подробное описание всех данных из аккаунта
- `UPDATE_NEW_ACCOUNT.md` - Инструкция по обновлению данных для нового аккаунта
- `QUICK_UPDATE.md` - Быстрая инструкция по обновлению

