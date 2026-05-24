# API Reference: TudaSuda

Формат документации: Markdown.  
Базовый префикс: `/api`.

## 1. Auth

### POST `/api/auth/login`
Авторизация по email/телефону и паролю.

Request:
```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

Response 200:
```json
{
  "access_token": "jwt-token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "is_admin": false
  }
}
```

### GET `/api/auth/session`
Возвращает текущую сессию (`Authorization: Bearer <token>`).

### POST `/api/auth/email/send-otp`
Отправка OTP на email.

### POST `/api/auth/email/verify-otp`
Проверка OTP по email (вход/регистрация).

### POST `/api/auth/sms/send`
Отправка OTP по SMS.

### POST `/api/auth/sms/verify`
Проверка OTP по SMS (вход/регистрация).

## 2. 2FA

### POST `/api/2fa/generate-secret`
Генерация TOTP-секрета и backup-кодов.

### POST `/api/2fa/verify-totp`
Проверка одноразового TOTP-кода.

### POST `/api/2fa/enable`
Включение 2FA.

### POST `/api/2fa/disable`
Отключение 2FA.

### POST `/api/2fa/use-backup`
Авторизация по резервному коду.

## 3. Tickets and Orders

### GET `/api/tickets`
Список билетов текущего пользователя.

### POST `/api/tickets`
Создание билета.

Request:
```json
{
  "order_number": "T100",
  "transport_type": "train",
  "total_price": 4990,
  "tickets_data": [{ "seat": "1A" }],
  "from_city": "Москва",
  "to_city": "Санкт-Петербург",
  "departure_date": "2026-06-01"
}
```

### GET `/api/tickets/:id`
Получение билета по ID.

### GET `/api/tickets/by-order/:orderNumber`
Получение билетов по номеру заказа.

## 4. WebPay

### POST `/api/webpay-create`
Инициация платежа, возврат action и payment fields.

### POST `/api/webpay-notify`
Callback от WebPay, проверка подписи, обновление статуса.

## 5. Admin API

Требуется роль администратора.

### GET `/api/admin/stats/overview`
Сводная статистика для dashboard.

### GET `/api/admin/stats/timeseries?days=30`
Динамика метрик за период.

### GET `/api/admin/blog/posts`
Список статей блога.

### GET `/api/admin/blog/posts/id/:id`
Получить статью по ID.

### POST `/api/admin/blog/posts`
Создать статью.

### PATCH `/api/admin/blog/posts/id/:id`
Обновить статью.

### DELETE `/api/admin/blog/posts/id/:id`
Удалить статью.

### GET `/api/admin/routes`
Список route pages.

### GET `/api/admin/routes/id/:id`
Получить route page по ID.

### POST `/api/admin/routes`
Создать route page.

### PATCH `/api/admin/routes/id/:id`
Обновить route page.

### DELETE `/api/admin/routes/id/:id`
Удалить route page.

## 6. Support Chat

### POST `/api/support/chat`
Чат-помощник (Hugging Face Router).

Request:
```json
{
  "message": "Как вернуть билет?"
}
```

Response 200:
```json
{
  "reply": "Для возврата откройте личный кабинет..."
}
```

## 7. Health

### GET `/api/ping`
Проверка доступности backend.

Response:
```json
{
  "ok": true,
  "message": "server is alive"
}
```

## 8. Коды ответов

- `200` — успешная операция
- `201` — создан ресурс
- `400` — ошибка валидации/запроса
- `401` — не авторизован
- `403` — недостаточно прав
- `404` — не найдено
- `409` — конфликт (дубликат)
- `429` — превышен лимит запросов
- `500` — внутренняя ошибка

## 9. Примечание

В проекте пока не используется Swagger/OpenAPI. Документация ведется в Markdown.
