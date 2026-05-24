# -*- coding: utf-8 -*-
"""Синхронизировать Приложение Д — листинги в приложение/Д_Листинги/src_server_snapshot/."""
from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEST_DIR = ROOT / "приложение" / "Д_Листинги" / "src_server_snapshot"

# исходный путь от корня -> имя файла в приложении (без слэшей для Word/архива)
MAP = {
    "server/db.js": "server_db.js",
    "server/index.js": "server_index.js",
    "server/registerApiRoutes.js": "server_registerApiRoutes.js",
    "src/App.tsx": "src_App.tsx",
    "src/main.tsx": "src_main.tsx",
    "vite.config.ts": "vite.config.ts",
}


def main() -> None:
    DEST_DIR.mkdir(parents=True, exist_ok=True)
    for rel, name in MAP.items():
        src = ROOT / rel
        if not src.is_file():
            raise SystemExit(f"Нет файла: {src}")
        shutil.copy2(src, DEST_DIR / name)
        print("OK", name)
    print("DIR:", DEST_DIR)


if __name__ == "__main__":
    main()
