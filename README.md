# Trip Spark - Платформа для поиска и бронирования билетов

Веб-приложение для поиска и бронирования билетов на поезда, самолеты и автобусы.

## 🚀 Технологии

- **Frontend:** React + TypeScript + Vite
- **UI:** shadcn-ui + Tailwind CSS
- **Backend:** Supabase (Auth, Database, Edge Functions)
- **SMS:** МТС Exolve API

## 📦 Установка и запуск

```bash
# Клонируйте репозиторий
git clone <YOUR_GIT_URL>
cd trip-spark-90

# Установите зависимости
npm install

# Запустите сервер разработки
npm run dev
```

## 🔧 Настройка

1. Создайте файл `.env.local`:
```env
VITE_SUPABASE_URL=https://ваш-проект.supabase.co
VITE_SUPABASE_ANON_KEY=ваш_anon_key
```

2. Настройте Supabase:
   - Создайте проект на [supabase.com](https://supabase.com)
   - Выполните миграции из папки `supabase/migrations/`
   - Настройте Edge Functions (см. `EXOLVE_SETUP.md`)

## 📚 Документация

- **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** - Быстрый деплой на Vercel (5 минут)
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Подробное руководство по деплою
- **[HOW_TO_GET_SUPABASE_KEYS.md](./HOW_TO_GET_SUPABASE_KEYS.md)** - Как получить ключи Supabase
- **[EXOLVE_SETUP.md](./EXOLVE_SETUP.md)** - Настройка МТС Exolve для SMS
- **[SUPABASE_EMAIL_SETUP.md](./SUPABASE_EMAIL_SETUP.md)** - Настройка Email OTP

## 🛠️ Команды

```bash
# Разработка
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр сборки
npm run preview

# Линтинг
npm run lint
```

## 📝 Лицензия

Private project
