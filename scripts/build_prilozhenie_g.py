# -*- coding: utf-8 -*-
"""Собрать ПРИЛОЖЕНИЕ Г: 2 предложения + путь + полный текст каждого файла."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "приложение" / "Г_Описание_БД" / "ПРИЛОЖЕНИЕ_Г_полный.txt"

PARTS: list[tuple[str, str, Path]] = [
    (
        "Текстовое описание структуры базы и перечень сущностей для дипломного пояснения. "
        "Дублирует назначение схемы и не заменяет SQL: актуальные типы полей — только в schema.sql.",
        "docs/database.md",
        ROOT / "docs" / "database.md",
    ),
    (
        "Основной скрипт создания базы: таблицы, индексы, триггеры updated_at, функции PL/pgSQL. "
        "Применяется к пустой БД командой psql … -f postgres/schema.sql.",
        "postgres/schema.sql",
        ROOT / "postgres" / "schema.sql",
    ),
    (
        "Разовое добавление колонки is_admin на уже существующей базе без переустановки схемы. "
        "Имеет смысл только для старых инсталляций, где миграция не накатывалась.",
        "postgres/migrations/001_add_user_is_admin.sql",
        ROOT / "postgres" / "migrations" / "001_add_user_is_admin.sql",
    ),
    (
        "Исторический скрипт создания таблицы blog_posts для баз, развёрнутых до включения блога в schema.sql. "
        "На новых установках таблица уже создаётся основным schema.sql.",
        "postgres/migrations/002_blog_posts.sql",
        ROOT / "postgres" / "migrations" / "002_blog_posts.sql",
    ),
    (
        "Добавляет таблицу route_pages для информационных страниц маршрутов админ-панели. "
        "Подключается после базовой схемы, если используется функциональность маршрутных страниц.",
        "postgres/migrations/003_route_pages.sql",
        ROOT / "postgres" / "migrations" / "003_route_pages.sql",
    ),
    (
        "Визуальная ER-диаграмма в браузере: сущности, связи и легенда по группам таблиц. "
        "Открывается локально; для диплома обычно делают скриншот или «Печать в PDF».",
        "диаграммы/er-database.html",
        ROOT / "диаграммы" / "er-database.html",
    ),
    (
        "Стили для HTML-диаграммы (цвета сущностей, сетка, адаптивная вёрстка). "
        "Без этого файла страница er-database.html отображается некорректно.",
        "диаграммы/er-database.css",
        ROOT / "диаграммы" / "er-database.css",
    ),
]


def main() -> None:
    lines: list[str] = []
    lines.append("ПРИЛОЖЕНИЕ Г")
    lines.append("Описание структуры базы данных (материалы проекта TudaSuda)")
    lines.append("")
    lines.append(
        "Ниже для каждого файла: два предложения о назначении, относительный путь от корня репозитория, "
        "затем полное содержимое файла."
    )
    lines.append("")
    lines.append("—" * 72)
    lines.append("")

    for desc, rel, path in PARTS:
        if not path.is_file():
            raise SystemExit(f"Нет файла: {path}")
        lines.append(desc)
        lines.append("")
        lines.append(rel)
        lines.append("")
        lines.append("--- файл начало ---")
        lines.append(path.read_text(encoding="utf-8"))
        lines.append("--- файл конец ---")
        lines.append("")
        lines.append("—" * 72)
        lines.append("")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print("Written:", OUT)


if __name__ == "__main__":
    main()
