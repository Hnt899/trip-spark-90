# DEPLOYMENT

Этот документ описывает текущий процесс деплоя проекта и служит пошаговой инструкцией для разработчика или AI-ассистента.

> Важно: в текущем репозитории фронтенд собран на `Vite + React` (не Next.js).  
> Инфраструктурная связка при этом соответствует целевой модели: **Vercel (frontend)** + **Railway (backend + PostgreSQL)**.

---

## 1) Общая схема

## Прод-архитектура

- **Frontend**: Vercel (статическая сборка + SPA routing).
- **Backend API**: Railway (Node.js/Express сервис).
- **Database**: Railway PostgreSQL.
- **Uploads**: backend раздаёт `/uploads` из файловой системы контейнера (рекомендуется volume).

Поток запросов:

1. Пользователь открывает домен Vercel.
2. Frontend вызывает `/api/*` и `/uploads/*`.
3. Vercel через `rewrites` проксирует эти запросы в Railway backend.
4. Railway backend работает с Railway PostgreSQL.

## Ветка деплоя

- Основная ветка для продакшена: `main`.
- Push в `main` запускает:
  - автодеплой Vercel (frontend),
  - автодеплой Railway (backend), если сервис подключён к этому же репозиторию.

---

## 2) Деплой на Vercel

## Подключение репозитория

1. В Vercel: `Add New Project`.
2. Подключить GitHub-репозиторий проекта.
3. Выбрать ветку `main` как production branch.

## Переменные окружения (Vercel)

Минимально нужны:

```bash
VITE_API_URL=
```

В текущем проекте API ходит на относительные пути (`/api`), а проксирование выполняется через `vercel.json`, поэтому `VITE_API_URL` можно оставить пустым.

Если в будущем перевод на Next.js:

```bash
DATABASE_URL=...
NEXTAUTH_SECRET=...
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
S3_ACCESS_KEY_ID=...
S3_SECRET_ACCESS_KEY=...
S3_BUCKET=...
S3_REGION=...
S3_ENDPOINT=... # для R2/S3-совместимых
```

## Настройки Vercel проекта

Для текущего репозитория:

- **Framework Preset**: `Vite`
- **Build Command**: `npx vite build`
- **Output Directory**: `dist`

Для Next.js (если миграция):

- **Framework Preset**: `Next.js`
- **Build Command**: `next build`
- **Output Directory**: `.next` (обычно авто)

## Проверка `vercel.json`

В проекте должны быть rewrites:

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://trip-spark-90-production.up.railway.app/api/:path*" },
    { "source": "/uploads/:path*", "destination": "https://trip-spark-90-production.up.railway.app/uploads/:path*" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 3) Деплой на Railway

## Backend сервис

Backend деплоится как отдельный Railway service из GitHub.

Текущий runtime:

- Buildpack: `Nixpacks`
- Конфиг: `nixpacks.toml`
- Start command:

```bash
node scripts/copy-seed-images.js && node scripts/migrate.js && node server/index.js
```

## PostgreSQL в Railway

1. В Railway проекте создать `PostgreSQL` сервис.
2. Подключить его к backend-сервису через reference variable `DATABASE_URL`.
3. Проверить, что backend переменные окружения присутствуют.

## Переменные окружения backend-сервиса

Обязательные:

```bash
DATABASE_URL=postgresql://...
JWT_SECRET=...
ALLOWED_ORIGINS=https://dima-poezda.vercel.app
NODE_ENV=production
```

Опциональные:

```bash
HF_API_TOKEN=...
HF_MODEL=meta-llama/Meta-Llama-3-8B-Instruct
PORT=4000
```

## Domain

В backend service settings:

1. `Public Networking` → `Generate Domain`
2. Порт: `4000`
3. Полученный домен прописать в `vercel.json`.

## Миграции

Сейчас используются SQL-миграции из `postgres/migrations` + `postgres/schema.sql` через `scripts/migrate.js`.

Если проект перейдёт на Prisma, целевая команда прод-миграции:

```bash
npx prisma migrate deploy
```

---

## 4) Работа с БД

## DATABASE_URL

- В Railway backend service: `DATABASE_URL` приходит из Railway Postgres reference variable.
- В Vercel обычно **не нужен** (если frontend чисто клиентский).  
  Нужен только если есть server-side DB-доступ (например Next.js server actions/API routes).

## Применение миграций в продакшене

Текущий режим: автоматический на старте backend контейнера:

```bash
node scripts/migrate.js
```

Скрипт:
- применяет `postgres/schema.sql`,
- затем применяет все `postgres/migrations/*.sql` в лексикографическом порядке.

## Бэкапы

Рекомендуемые варианты:

1. **Railway snapshots/backups** (если тариф поддерживает).
2. Ручной дамп:

```bash
pg_dump "postgresql://...railway_public_url..." --no-owner --no-acl -f backup.sql
```

3. Восстановление:

```bash
psql "postgresql://...railway_public_url..." -f backup.sql
```

---

## 5) CI/CD (опционально)

## Текущее состояние

- Автодеплой выполняется самим Vercel и Railway при push в `main`.
- GitHub Actions для обязательных проверок пока не является required step.

## Рекомендуемый pre-deploy pipeline

Перед merge/push в `main` запускать:

```bash
npx tsc --noEmit
npm run build
npm run lint
```

## Ручной деплой (fallback)

Если автодеплой не сработал:

1. Убедиться, что нужный commit в `main`.
2. В Vercel: открыть deployment и нажать `Redeploy`.
3. В Railway: открыть deployment и нажать `Redeploy`.
4. Проверить:

```bash
curl https://trip-spark-90-production.up.railway.app/api/ping
```

Ожидаемый ответ:

```json
{"ok":true,"message":"server is alive"}
```

---

## Быстрый чеклист после деплоя

1. Открывается сайт на Vercel.
2. Работают API-запросы (`/api/auth/login`, `/api/blog/posts`).
3. Открывается `/admin` (без 404).
4. В админке видны статьи и маршруты.
5. Картинки доступны по `/uploads/...`.
6. `ALLOWED_ORIGINS` соответствует домену Vercel без завершающего `/`.

