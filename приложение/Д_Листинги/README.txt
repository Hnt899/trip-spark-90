ПРИЛОЖЕНИЕ Д — листинги основных модулей программы

Состав (то, что включается в дипломный том):

  приложение/Д_Листинги/src_server_snapshot/server_db.js
    ← server/db.js — пул PostgreSQL, загрузка .env / .env.local

  приложение/Д_Листинги/src_server_snapshot/server_index.js
    ← server/index.js — точка входа Express: CORS, rate limit, Stripe, раздача, порт

  приложение/Д_Листинги/src_server_snapshot/server_registerApiRoutes.js
    ← server/registerApiRoutes.js — регистрация REST API (auth, билеты, админ и др.)

  приложение/Д_Листинги/src_server_snapshot/src_App.tsx
    ← src/App.tsx — корневой компонент SPA, маршруты

  приложение/Д_Листинги/src_server_snapshot/src_main.tsx
    ← src/main.tsx — монтирование React в DOM

  приложение/Д_Листинги/src_server_snapshot/vite.config.ts
    ← vite.config.ts — конфигурация сборки клиента

Имена файлов в snapshot без слэшей — удобно для приложения к диплому и архива.

Обновить копии из актуального кода проекта:

  python scripts/sync_prilozhenie_d.py

Один файл для вставки всего приложения Д в Word (вводный абзац + все листинги):

  python scripts/build_prilozhenie_d_fulltxt.py

  → приложение/Д_Листинги/ПРИЛОЖЕНИЕ_Д_полный.txt
     открой в редакторе, выдели всё (Ctrl+A), скопируй (Ctrl+C), вставь в диплом.
