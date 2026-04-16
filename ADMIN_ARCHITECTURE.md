# ADMIN_ARCHITECTURE

Документ описывает архитектуру административной панели и служит быстрым onboarding-контекстом для AI-ассистента и нового разработчика.

## 1) Технический стек

### Frontend
- `Next.js 14` (App Router)
- `TypeScript`
- `Shadcn/ui`
- `Tailwind CSS`
- `Zustand` (локальное UI/global состояние)
- `TanStack Query` (server-state и кэш)
- `React Hook Form + Zod` (валидация форм)
- `Axios` (HTTP-клиент)

### Backend
- `Next.js API Routes` (или `NestJS` в случае выноса backend в отдельный сервис)
- `JWT`-аутентификация через `HttpOnly cookies`

### Database
- `PostgreSQL`
- `Prisma ORM`

### File storage
- `AWS S3` или `Cloudflare R2` (через presigned URL или backend-proxy upload)

---

## 2) Структура папок (Next.js App Router)

Пример целевой структуры:

```txt
app/
  (auth)/
    login/
      page.tsx
    forgot-password/
      page.tsx
  (dashboard)/
    layout.tsx
    users/
      page.tsx
    content/
      page.tsx
      [id]/
        page.tsx
    analytics/
      page.tsx
    settings/
      page.tsx
  api/
    auth/
      login/route.ts
      logout/route.ts
      me/route.ts
    users/route.ts
    posts/route.ts
    uploads/sign/route.ts

components/
  ui/
  modules/
    users/
    posts/
    analytics/

lib/
  auth.ts
  prisma.ts
  permissions.ts
  slug.ts

hooks/
  useAuth.ts
  useDebounce.ts

services/
  api-client.ts
  users.service.ts
  posts.service.ts

types/
  api.ts
  auth.ts
  post.ts
  user.ts

prisma/
  schema.prisma
  migrations/
```

### Принципы организации
- `app/(auth)` — публичные auth-экраны.
- `app/(dashboard)` — только защищённые страницы (через middleware + server checks).
- `components/ui` — примитивы UI (button, table, dialog).
- `components/modules` — бизнес-компоненты по доменам.
- `services` — HTTP-слой с Axios.
- `lib` — инфраструктурные утилиты (Prisma singleton, RBAC, auth helpers).

---

## 3) Логическая модель данных (Prisma)

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  EDITOR
  VIEWER
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(VIEWER)
  avatar    String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(cuid())
  title     String
  slug      String   @unique
  content   Json
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([authorId])
  @@index([published, createdAt])
}
```

### Связи
- `User 1 -> N Post`: один пользователь может создать много постов.
- `Post N -> 1 User`: у каждого поста ровно один автор.
- `Role` хранится в `User.role` и используется для RBAC.

---

## 4) Логика работы и бизнес-процессы

## Аутентификация и RBAC

- После логина backend выдаёт `accessToken`/JWT в `HttpOnly cookie`.
- `middleware.ts` проверяет наличие токена для `/(dashboard)` маршрутов.
- API дополнительно валидирует роль через RBAC guard.

Пример простого permission-check:

```ts
// lib/permissions.ts
export type Role = "ADMIN" | "EDITOR" | "VIEWER";

const roleMatrix: Record<Role, string[]> = {
  ADMIN: ["users:read", "users:write", "posts:read", "posts:write", "analytics:read"],
  EDITOR: ["posts:read", "posts:write", "analytics:read"],
  VIEWER: ["posts:read"],
};

export function can(role: Role, permission: string) {
  return roleMatrix[role]?.includes(permission) ?? false;
}
```

### Управление пользователями
- Экран таблицы пользователей с:
  - server-side pagination
  - фильтрами (`email`, `role`, `createdAt`)
  - сортировкой
- Инвайты:
  - `ADMIN` отправляет invite-link/email
  - пользователь завершает onboarding и задаёт пароль

### Управление контентом
- WYSIWYG редактор (например TipTap/Editor.js).
- Загрузка изображений:
  - frontend получает signed URL (`/api/uploads/sign`)
  - загружает файл в S3/R2
  - сохраняет публичный URL в `content`/`cover`.
- `slug` генерируется автоматически из `title`, с проверкой уникальности.

Пример генерации slug:

```ts
// lib/slug.ts
export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
```

### Аналитика
- Dashboard с графиками по ключевым метрикам:
  - `newUsers`
  - `postsPublished`
  - `activeEditors`
- Данные идут через агрегированные SQL/Prisma-запросы (день/неделя/месяц).

---

## 5) Ключевые технические нюансы

### Переиспользуемая `DataTable`
- Один универсальный компонент под разные сущности.
- Поддержка:
  - server-side pagination (`page`, `pageSize`)
  - server-side sorting (`sortBy`, `sortOrder`)
  - filters/query params
- Состояние таблицы синхронизируется с URL (`searchParams`), чтобы можно было делиться ссылкой на текущий view.

### Кэширование через React Query
- Query keys по доменам:
  - `["users", params]`
  - `["posts", params]`
  - `["analytics", range]`
- После мутаций:
  - `invalidateQueries` на список
  - опционально optimistic update для UX

Пример:

```ts
const queryClient = useQueryClient();

const createPostMutation = useMutation({
  mutationFn: createPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
});
```

### Prisma в Next.js API Routes
- В dev mode у Next hot-reload, поэтому PrismaClient нужно инициализировать singleton-паттерном.

```ts
// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ log: ["error", "warn"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

- Всегда делайте явные `select`/`include`, чтобы не тянуть лишние данные.
- Для тяжёлых аналитических выборок используйте:
  - `prisma.$queryRaw` (аккуратно, только параметризованные запросы)
  - materialized views/rollup tables при росте объёма данных.

---

## Резюме архитектуры

- App Router даёт чёткое разделение public/private зон.
- Prisma + PostgreSQL покрывают транзакционные CRUD и аналитику.
- RBAC реализуется на двух уровнях: UI + API.
- S3/R2 выносит файлы из runtime сервера.
- React Query + DataTable дают масштабируемый паттерн для всех админ-модулей.

