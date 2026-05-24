# -*- coding: utf-8 -*-
"""Собрать ПРИЛОЖЕНИЕ Д в один .txt для вставки в Word."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SNAP = ROOT / "приложение" / "Д_Листинги" / "src_server_snapshot"
OUT = ROOT / "приложение" / "Д_Листинги" / "ПРИЛОЖЕНИЕ_Д_полный.txt"

FILES = [
    ("server/db.js", "server_db.js"),
    ("server/index.js", "server_index.js"),
    ("server/registerApiRoutes.js", "server_registerApiRoutes.js"),
    ("src/App.tsx", "src_App.tsx"),
    ("src/main.tsx", "src_main.tsx"),
    ("vite.config.ts", "vite.config.ts"),
]


def main() -> None:
    lines: list[str] = []
    lines.append("ПРИЛОЖЕНИЕ Д")
    lines.append("Листинги основных модулей программного продукта TudaSuda")
    lines.append("")
    lines.append(
        "Ниже приведены фрагменты исходного кода: серверная часть (подключение к PostgreSQL, "
        "точка входа Express, регистрация маршрутов API), клиентская часть (корневой компонент "
        "приложения, точка монтирования React), конфигурация сборки Vite. Файлы приведены в виде, "
        "используемом в репозитории; имена без символа «/» соответствуют копиям в каталоге приложения."
    )
    lines.append("")
    lines.append("=" * 72)
    lines.append("")

    for orig, snap_name in FILES:
        path = SNAP / snap_name
        if not path.is_file():
            raise SystemExit(f"Нет {path}; запустите: python scripts/sync_prilozhenie_d.py")
        lines.append(f"Файл: {orig}")
        lines.append(f"(листинг: {snap_name})")
        lines.append("")
        lines.append("-" * 72)
        lines.append(path.read_text(encoding="utf-8").rstrip())
        lines.append("")
        lines.append("-" * 72)
        lines.append("")
        lines.append("=" * 72)
        lines.append("")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print("Written:", OUT)
    print("Lines:", len(OUT.read_text(encoding="utf-8").splitlines()))


if __name__ == "__main__":
    main()
