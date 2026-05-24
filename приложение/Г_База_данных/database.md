# Документация по базе данных TudaSuda

## 1. Источник схемы

- Основной файл схемы: `postgres/schema.sql`
- Дополнительные изменения: `postgres/migrations/*.sql`

## 2. ER-диаграмма (логическая)

[СКРИНШОТ: ER-диаграмма базы данных]

Ключевые сущности:
- `users`
- `user_profiles`
- `passengers`
- `orders`
- `tickets`
- `verification_codes`
- `email_otp_challenges`
- `certificates`
- `security_logs`
- `user_2fa`
- `blog_posts`

## 3. Связи

- `users` 1:1 `user_profiles`
- `users` 1:N `passengers`
- `users` 1:N `orders`
- `users` 1:N `tickets`
- `users` 1:N `security_logs`
- `users` 1:1 `user_2fa`
- `users` 1:N `blog_posts`

## 4. Индексы и ограничения

В `schema.sql` реализованы:
- первичные ключи на `uuid`;
- уникальные ограничения (`email`, `order_number`, `slug` и др.);
- индексы для ускорения выборок по пользователю/заказам/статусам.

## 5. Триггеры

Используются триггеры на автообновление `updated_at` для основных таблиц.

## 6. SQL-функции

Реализованы функции:
- `cleanup_expired_codes()`
- `generate_certificate_code()`
- `expire_old_certificates()`
- `create_certificate(...)`
- `generate_2fa_secret(...)`
- `is_2fa_enabled(...)`
- `use_backup_code(...)`

## 7. Практическое применение

Для полного состава полей, типов и ограничений использовать `postgres/schema.sql` как единственный источник истины.
