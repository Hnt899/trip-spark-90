# AGENTS.md

Travel booking app ("TudaSuda"): React 18 + Vite + TS + Tailwind + shadcn/ui frontend,
Express backend (`server/`), PostgreSQL via `pg`, Supabase edge functions in `supabase/`.

## Commands

- `npm run dev` — Vite dev server (frontend on :5173)
- `npm run build` — production build; `npm run build:dev` — dev-mode build
- `npm run lint` — ESLint (`eslint .`)
- `npm test` — Vitest watch mode; `npm run test:coverage` — coverage
- `npm run test:e2e` — Playwright (needs dev server running at localhost:5173)
- `npm run server` — Express backend (node server/index.js)
- `npm run migrate` — DB migrations; `npm run seed-content` / `seed:reference` / `seed:guide` — seeding

## Structure

- `src/` — frontend: `pages/` (routes incl. `admin/`, `guide/`, `reference/`), `components/`,
  `contexts/` (AuthContext, PageCmsContext), `hooks/`, `lib/` (api client, helpers), `types/`
- `server/` — Express API: route modules per domain (auth, blog, webpay, yookassa, RZD search…),
  `db.js` for pg pool, tests in `__tests__/`
- `api/support/` — serverless function entry
- `scripts/` — migrations, seeds, one-off utility scripts (js/mjs/py)
- `e2e/` — Playwright specs; `supabase/` — edge functions & SQL; `docs/` — docs
- Path alias `@/*` → `src/*`

## Conventions

- TypeScript strict is OFF; avoid adding `any` where inference works (ESLint warns on explicit any).
- Frontend uses shadcn/ui components (Radix + CVA), Tailwind for styling; icons from lucide-react.
- Server state via @tanstack/react-query; forms via react-hook-form + zod.
- Backend routes are CommonJS-style ESM plain JS files exporting express routers; auth via JWT
  middleware (`authMiddleware.js`).
- Tests colocated under `src/__tests__/` and `server/__tests__/` (pg is mocked, no real DB needed);
  e2e specs live only in `e2e/`.
- Comments/docs often in Russian; keep user-facing strings consistent with existing language.
