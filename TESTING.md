# TESTING

Документ описывает внедрённую архитектуру автоматизированного тестирования для проекта TudaSuda.

## 1. Уровни тестирования

В проекте настроены 4 уровня:

1. **Unit tests (backend)**  
   Проверка отдельных функций: JWT, хелперы WebPay, middleware ограничения запросов.

2. **API integration tests (backend + Supertest)**  
   Проверка критичных endpoint'ов без реальной БД, через mock-слой `pg`.

3. **Component tests (frontend)**  
   Проверка базового рендера и поведения ключевых UI-сценариев.

4. **E2E tests (Playwright)**  
   Проверка пользовательской цепочки «поиск → выбор → оплата/успех».

## 2. Структура тестов

```text
server/
  __tests__/
    setup.ts
    auth.test.ts
    security.test.ts
    helpers.test.ts
    sqlFunctions.test.ts
    mocks/
      pgMock.ts
      createTestApp.ts
    api/
      auth.api.test.ts
      otp.api.test.ts
      2fa.api.test.ts
      tickets.api.test.ts
      webpay.api.test.ts
      admin.api.test.ts
src/
  __tests__/
    setup.ts
    SearchForm.test.tsx
    ProfilePage.test.tsx
    TicketCard.test.tsx
    AdminDashboard.test.tsx
e2e/
  buy-ticket.spec.ts
```

## 3. Конфигурация

- `server/vitest.config.ts` — конфиг backend тестов, test env и coverage пороги.
- `vitest.config.ts` — общий/фронтенд конфиг Vitest (`jsdom`, alias `@`).
- `playwright.config.ts` — e2e конфиг с `baseURL=http://localhost:5173`.

## 4. Запуск тестов

Установить зависимости:

```bash
npm install
```

Основные команды:

```bash
npm run test
npm run test:ui
npm run test:coverage
npm run test:e2e
```

## 5. Моки и изоляция

### База данных (`pg`)

Используется mock-слой:

- `server/__tests__/mocks/pgMock.ts`
- перехват SQL через `onQuery(/regexp/, handler)`
- сброс состояния между тестами через `resetPgMock()`

Это исключает зависимость тестов от реального PostgreSQL.

### Внешние сервисы

Мокируются:

- Email OTP (`server/emailOtp.js`)
- SMS шлюз (`server/sendSms.js`)
- WebPay ответы (в e2e через `page.route`)

## 6. Покрытие

Покрытие генерируется через `@vitest/coverage-v8`:

```bash
npm run test:coverage
```

Отчёты:

- `coverage/server`
- `coverage/frontend`

Целевые пороги backend бизнес-логики заданы в `server/vitest.config.ts`.

## 7. CI запуск

Добавлен workflow:

- `.github/workflows/test.yml`

При `push`/`pull_request` в `main` запускаются:

1. `npm ci`
2. `npm run lint`
3. `npm run test:coverage`
4. `npm run build`

## 8. Ограничения текущей реализации

- Часть frontend тестов ориентирована на базовые smoke/рендер проверки.
- E2E сценарий использует моки платежного запроса для стабильности прогона.
- Рекомендуемое развитие: расширить e2e набор по ролям (user/admin), добавить matrix браузеров.
