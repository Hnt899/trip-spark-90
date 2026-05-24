# -*- coding: utf-8 -*-
"""Правки ПЗ (Word OOXML): Vercel/Railway → VPS; убрать подтверждение по SMS (только email OTP)."""
from __future__ import annotations

import shutil
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DESKTOP_SRC = Path(r"c:\Users\Леонид\Desktop\диплом\6 ПЗ.docx")
SRC_COPY = ROOT / "_diplom_6pz.docx"
UNZIP_DIR = ROOT / "_diplom_6pz_unzip"
OUT_DOCX = ROOT / "_diplom_6pz_vps.docx"
DESKTOP_OUT = Path(r"c:\Users\Леонид\Desktop\диплом\6 ПЗ_vps.docx")

RELS_PATH = UNZIP_DIR / "word" / "_rels" / "document.xml.rels"
DOC_XML = UNZIP_DIR / "word" / "document.xml"


def apply_vps_replacements(xml: str) -> str:
    if "Vercel" not in xml and "Railway" not in xml:
        return xml

    pairs: list[tuple[str, str]] = [
        (
            "При каждом пуше в ветку main происходит следующее: Vercel автоматически собирает SPA командой npx vite build и публикует полученный бандл в своей Content Delivery Network; Railway синхронизирует репозиторий, выполняет стартовый скрипт, включающий копирование seed-изображений и запуск миграций базы данных (scripts/migrate.js), после чего запускает сервер Express; проксирование клиентских запросов с префиксами /api и /uploads на Railway обеспечивается механизмом Vercel Rewrites, описанным в разделе 2.4.",
            "При каждом пуше в ветку main в сценарии CI/CD на VPS происходит следующее: выполняется сборка SPA (npx vite build), статика из каталога dist отдаётся через nginx; на сервере обновляется код (например, git pull), выполняется стартовый скрипт с копированием seed-изображений и миграциями базы данных (scripts/migrate.js), после чего перезапускается процесс Node.js (Express); проксирование запросов с префиксами /api и /uploads на приложение обеспечивается конфигурацией nginx (reverse proxy), описанной в разделе 2.4.",
        ),
        (
            "production-связка Vercel + Railway с автодеплоем по ветке main",
            "production-развёртывание на VPS (Ubuntu LTS): nginx, Node.js/Express, PostgreSQL; автодеплой по ветке main",
        ),
        (
            "Приложение развёрнуто на Vercel (frontend) и Railway (backend + PostgreSQL) с настроенным циклом деплоя и health-check",
            "Приложение развёрнуто на VPS (Ubuntu LTS): клиентская часть — статическая сборка (Vite), сервер — Node.js/Express, СУБД — PostgreSQL на той же машине; настроены цикл деплоя и health-check",
        ),
        (
            "Vercel, Railway, Git/GitHub, автодеплой (инфраструктура)",
            "VPS (Ubuntu LTS), nginx, certbot, Git/GitHub, автодеплой (инфраструктура)",
        ),
        (
            "Серверная ОС Linux, контейнеризированная среда Railway; backend – Node.js + Express; СУБД – PostgreSQL; клиентская часть размещается на Vercel. Минимальные ресурсы: 1 vCPU, 2 ГБ ОЗУ, SSD.",
            "Серверная ОС Linux (Ubuntu LTS) на VPS; backend – Node.js + Express; СУБД – PostgreSQL; клиентская часть отдаётся nginx как статика из сборки. Минимальные ресурсы: 1 vCPU, 2 ГБ ОЗУ, SSD.",
        ),
        (
            "задаются через интерфейсы платформ Vercel и Railway.",
            "задаются в конфигурации на VPS (переменные окружения, файлы на сервере).",
        ),
        (
            ", в продакшен-среде в интерфейсах платформ Vercel и Railway, что предотвращает",
            ", в продакшен-среде на VPS (секреты и переменные окружения на сервере), что предотвращает",
        ),
        (
            "описывающая настройку окружений Vercel и Railway, переменные окружения",
            "описывающая настройку VPS (Ubuntu LTS), переменные окружения",
        ),
        (
            "инфраструктура непрерывной доставки с автоматическим деплоем клиентской части на Vercel и серверной с базой данных на Railway.",
            "инфраструктура непрерывной доставки с автоматическим деплоем на VPS (Ubuntu LTS): статика, API и PostgreSQL на одном сервере.",
        ),
        (
            "В продакшен-окружении сервер Vercel, используя директивы",
            "В продакшен-окружении reverse-proxy nginx, используя директивы",
        ),
        ("<w:t>rewrites</w:t>", "<w:t>location и proxy_pass</w:t>"),
        (
            "проксирует эти запросы на Railway.",
            "проксирует эти запросы на процесс Node.js.",
        ),
        (
            "Vercel обслуживает статические ресурсы клиента, Railway — серверное приложение и базу данных.",
            "nginx отдаёт статические ресурсы клиента (сборка Vite), Node.js — серверное приложение, PostgreSQL — базу данных на том же VPS.",
        ),
        (
            "Связка GitHub, Vercel и Railway обеспечивает сквозной процесс CI/CD: при каждом обновлении ветки main автоматически запускается сборка клиентского приложения на Vercel и деплой серверной части с миграциями на Railway.",
            "Связка GitHub и VPS обеспечивает сквозной процесс CI/CD: при каждом обновлении ветки main автоматически запускается сборка клиентского приложения и деплой серверной части с миграциями на сервер.",
        ),
        ("Документация Railway. – ", "Документация Ubuntu Server. – "),
        (" электронный // Railway : сайт. – URL:", " электронный // Ubuntu Server : сайт. – URL:"),
        ("Документация Vercel. – ", "Документация nginx. – "),
        (" электронный // Vercel : сайт. – URL:", " электронный // nginx : сайт. – URL:"),
        ("https://docs.railway.app/", "https://ubuntu.com/server/docs"),
        ("https://vercel.com/docs", "https://nginx.org/en/docs/"),
    ]

    for old, new in pairs:
        if old not in xml:
            raise SystemExit(f"VPS: substring not found (update script): {old[:80]}…")
        xml = xml.replace(old, new)

    for needle in ("Vercel", "Railway", "vercel.com", "railway.app"):
        if needle in xml:
            raise SystemExit(f"Still contains {needle!r} after VPS replacements")

    return xml


def apply_sms_replacements(xml: str) -> str:
    pairs: list[tuple[str, str]] = [
        (
            "подтверждения по электронной почте и SMS, а также двухфакторной",
            "подтверждения по электронной почте, а также двухфакторной",
        ),
        (
            "двухфакторная аутентификация (TOTP + резервные коды + email-подтверждение), OTP по email/SMS; интеграция",
            "двухфакторная аутентификация (TOTP + резервные коды + email-подтверждение), OTP по email; интеграция",
        ),
        (
            ", SMS API, email OTP (интеграции); VPS",
            ", email OTP (интеграции); VPS",
        ),
        (
            "Парольная защита, подтверждение операций по SMS/email (одноразовые коды). Для администраторов",
            "Парольная защита, подтверждение операций по электронной почте (одноразовые коды). Для администраторов",
        ),
        (
            "запрос и проверка одноразового кода (OTP) по email или SMS для чувствительных операций; настройка двухфакторной",
            "запрос и проверка одноразового кода (OTP) по email для чувствительных операций; настройка двухфакторной",
        ),
        (
            "подтверждение смены пароля, настройки 2FA и критических действий через email/SMS OTP; обязательную двухфакторную",
            "подтверждение смены пароля, настройки 2FA и критических действий через email OTP; обязательную двухфакторную",
        ),
        (
            "email для транзакционных писем и OTP, SMS для отправки кодов; Hugging Face Router",
            "email для транзакционных писем и OTP; Hugging Face Router",
        ),
        (
            ", SMS-шлюзом, почтовым сервисом и Hugging Face Router. Отчетность",
            ", почтовым сервисом и Hugging Face Router. Отчетность",
        ),
        (
            "аутентификацию (вход по паролю, Email OTP, SMS OTP, JWT, 2FA), управление",
            "аутентификацию (вход по паролю, Email OTP, JWT, 2FA), управление",
        ),
        (
            "регистрацию и вход с использованием Email OTP, вход с использованием SMS OTP, вход с двухфакторной аутентификацией после проверки пароля",
            "регистрацию и вход с использованием Email OTP, вход с двухфакторной аутентификацией после проверки пароля",
        ),
        (
            "Одноразовые коды по email и SMS. Генерируется шестизначный цифровой код с ограниченным сроком жизни (десять минут). Код сохраняется в таблицах email_otp_challenges и verification_codes и помечается использованным после успешной проверки. Для предотвращения злоупотреблений действует ограничение: не более трёх SMS-сообщений в час на один номер, а также глобальный лимит частоты запросов.",
            "Одноразовые коды по email. Генерируется шестизначный цифровой код с ограниченным сроком жизни (десять минут). Код сохраняется в таблицах email_otp_challenges и verification_codes и помечается использованным после успешной проверки. Для предотвращения злоупотреблений действует глобальный лимит частоты запросов.",
        ),
        (
            "Сервисы SMS и Email. Для доставки одноразовых кодов и транзакционных писем (подтверждение регистрации, восстановление пароля, информация о билетах) используются соответствующие провайдеры. Логика отправки инкапсулирована в модулях server/sendSms.js и server/emailOtp.js, обеспечивая единообразный интерфейс.",
            "Сервис электронной почты. Для доставки одноразовых кодов и транзакционных писем (подтверждение регистрации, восстановление пароля, информация о билетах) используются соответствующие провайдеры. Логика отправки инкапсулирована в модуле server/emailOtp.js, обеспечивая единообразный интерфейс.",
        ),
        (
            "Отправка одноразовых кодов по электронной почте и транзакционных писем осуществляется с помощью nodemailer через SMTP-протокол, что минимизирует зависимость от одного почтового сервиса и снижает стартовые затраты. Для отправки SMS-кодов задействован локальный провайдер МТС Exolve, упрощающий интеграцию в условиях регионального рынка. Все критические параметры, включая ключи API и строки подключения к базе данных, хранятся исключительно в переменных окружения — локально в ",
            "Отправка одноразовых кодов по электронной почте и транзакционных писем осуществляется с помощью nodemailer через SMTP-протокол, что минимизирует зависимость от одного почтового сервиса и снижает стартовые затраты. Все критические параметры, включая ключи API и строки подключения к базе данных, хранятся исключительно в переменных окружения — локально в ",
        ),
        (
            ", SMS- и Email-шлюзами, Hugging Face Router и корректность синхронизации статусов в базе данных. Системное тестирование",
            ", почтовым шлюзом, Hugging Face Router и корректность синхронизации статусов в базе данных. Системное тестирование",
        ),
        (
            ", SMS, email, Hugging Face). Цели тестирования",
            ", email, Hugging Face). Цели тестирования",
        ),
        (
            "верификацию через одноразовый код, отправленный на электронную почту или в SMS-сообщении, и проверку доступа к защищённым разделам личного кабинета. Более сложный сценарий",
            "верификацию через одноразовый код, отправленный на электронную почту, и проверку доступа к защищённым разделам личного кабинета. Более сложный сценарий",
        ),
        (
            "Успешная отправка SMS OTP",
            "Успешная отправка email OTP",
        ),
        (
            "POST /api/auth/sms/send на валидный номер",
            "POST /api/auth/email/send-otp на действительный адрес",
        ),
        (
            "Успешная верификация SMS OTP",
            "Успешная верификация email OTP",
        ),
        (
            "POST /api/auth/sms/verify ",
            "POST /api/auth/email/verify-otp ",
        ),
        (
            "Неверный SMS код",
            "Неверный код подтверждения",
        ),
        (
            "Лимит SMS OTP",
            "Лимит запросов email OTP",
        ),
        (
            "одноразовые коды подтверждения (email OTP, SMS OTP), секреты",
            "одноразовые коды подтверждения (email OTP), секреты",
        ),
        (
            "Одноразовые коды подтверждения (OTP) по email и SMS генерируются как 6-значные случайные числа. Срок действия кода — 10 минут. Коды хранятся в таблицах email_otp_challenges и verification_codes с флагом used, что предотвращает повторное использование. Отправка SMS ограничена тремя запросами в час на один номер.",
            "Одноразовые коды подтверждения (OTP) по email генерируются как 6-значные случайные числа. Срок действия кода — 10 минут. Коды хранятся в таблицах email_otp_challenges и verification_codes с флагом used, что предотвращает повторное использование.",
        ),
        (
            "Отправка SMS-кодов дополнительно ограничена тремя кодами в час на один номер телефона на уровне бизнес-логики.",
            "",
        ),
        (
            "_SECRET_KEY, токен Hugging Face API, параметры SMTP и SMS-шлюза, а также строку подключения к базе данных (DATABASE_URL), вынесены в переменные окружения. В локальной среде они хранятся в ",
            "_SECRET_KEY, токен Hugging Face API, параметры SMTP, а также строку подключения к базе данных (DATABASE_URL), вынесены в переменные окружения. В локальной среде они хранятся в ",
        ),
        (
            "одноразовые коды подтверждения по email и SMS, двухфакторную аутентификацию на основе TOTP и резервных кодов, ограничение частоты запросов, журналирование событий безопасности и защиту секретов через переменные окружения. Создана административная панель",
            "одноразовые коды подтверждения по email, двухфакторную аутентификацию на основе TOTP и резервных кодов, ограничение частоты запросов, журналирование событий безопасности и защиту секретов через переменные окружения. Создана административная панель",
        ),
    ]

    for old, new in pairs:
        if old not in xml:
            raise SystemExit(f"SMS: substring not found (update script): {old[:80]}…")
        xml = xml.replace(old, new)

    for needle in ("SMS", "/sms/", "sms/send", "sms/verify"):
        if needle in xml:
            raise SystemExit(f"Still contains {needle!r} after SMS replacements")

    return xml


def patch_rels(content: str) -> str:
    content = content.replace(
        'Target="https://vercel.com/docs"',
        'Target="https://nginx.org/en/docs/"',
    )
    content = content.replace(
        'Target="https://docs.railway.app/"',
        'Target="https://ubuntu.com/server/docs"',
    )
    return content


def zip_docx(source_dir: Path, out_path: Path) -> None:
    out_path.unlink(missing_ok=True)
    with zipfile.ZipFile(out_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in sorted(source_dir.rglob("*")):
            if f.is_dir():
                continue
            arc = f.relative_to(source_dir).as_posix()
            zf.write(f, arc)


def unzip_docx(docx: Path, dest: Path) -> None:
    if dest.is_dir():
        shutil.rmtree(dest)
    dest.mkdir(parents=True)
    with zipfile.ZipFile(docx, "r") as zf:
        zf.extractall(dest)


def main() -> None:
    if len(sys.argv) > 1:
        arg_src = Path(sys.argv[1])
        if not arg_src.is_file():
            raise SystemExit(f"Файл не найден: {arg_src}")
        shutil.copy(arg_src, SRC_COPY)
    elif DESKTOP_SRC.is_file():
        shutil.copy(DESKTOP_SRC, SRC_COPY)
    if not SRC_COPY.is_file():
        raise SystemExit(
            f"Нет исходника: ни {DESKTOP_SRC}, ни копии {SRC_COPY}. "
            "Положите «6 ПЗ.docx» на рабочий стол в папку «диплом» или скопируйте вручную."
        )

    unzip_docx(SRC_COPY, UNZIP_DIR)

    xml = DOC_XML.read_text(encoding="utf-8")
    xml = apply_vps_replacements(xml)
    xml = apply_sms_replacements(xml)
    DOC_XML.write_text(xml, encoding="utf-8")

    rels = RELS_PATH.read_text(encoding="utf-8")
    RELS_PATH.write_text(patch_rels(rels), encoding="utf-8")

    zip_docx(UNZIP_DIR, OUT_DOCX)
    shutil.rmtree(UNZIP_DIR, ignore_errors=True)

    DESKTOP_OUT.parent.mkdir(parents=True, exist_ok=True)
    try:
        shutil.copy(OUT_DOCX, DESKTOP_OUT)
        print("Copied to:", DESKTOP_OUT)
    except OSError as e:
        print("Warning: не удалось скопировать на рабочий стол (закройте Word и повторите):", e)
    print("Written:", OUT_DOCX)


if __name__ == "__main__":
    main()
