# Полное руководство по настройке системы авторизации

## Содержание

1. [Быстрый старт](#быстрый-старт)
2. [Настройка Supabase](#настройка-supabase)
3. [Настройка Email](#настройка-email)
4. [Настройка SMS](#настройка-sms)
5. [Российские SMS-провайдеры](#российские-sms-провайдеры)
6. [Устранение проблем](#устранение-проблем)
7. [Функциональность](#функциональность)

---

## Быстрый старт

### 1. Создание проекта в Supabase

1. Перейдите на https://app.supabase.com
2. Создайте новый проект
3. Дождитесь завершения инициализации проекта

### 2. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Вы можете найти эти значения в настройках проекта Supabase:
- Project Settings → API → Project URL
- Project Settings → API → anon/public key

### 3. Создание таблиц в Supabase

1. Откройте SQL Editor в панели управления Supabase:
   - В левом меню нажмите "SQL Editor"
   - Или перейдите по ссылке: https://app.supabase.com/project/_/sql

2. Скопируйте весь код из файла `supabase-schema.sql`

3. Вставьте код в SQL Editor и выполните скрипт (Run или Ctrl+Enter)

4. Дождитесь сообщения "Success" в панели результатов

**Что создается:**
- Таблица `user_profiles` для хранения данных пользователей
- Таблица `passengers` для хранения данных пассажиров
- Таблица `orders` для хранения заказов
- Настройки Row Level Security (RLS) для безопасности данных

**Важно:** Скрипт безопасен для повторного запуска - он автоматически удалит существующие политики перед созданием новых.

---

## Настройка Supabase

### Project Settings

1. В левом боковом меню Supabase прокрутите вниз
2. Нажмите на **"Project Settings"** (иконка шестерёнки, в самом низу меню)
3. В открывшемся окне настроек вы увидите несколько вкладок вверху
4. Найдите и нажмите на вкладку **"Authentication"** (или "Auth")

**Прямые ссылки:**
- Email Templates: `https://app.supabase.com/project/YOUR_PROJECT_ID/auth/templates`
- SMTP Settings: `https://app.supabase.com/project/YOUR_PROJECT_ID/auth/smtp`
- SMS Auth: `https://app.supabase.com/project/YOUR_PROJECT_ID/auth/sms`

---

## Настройка Email

### Шаг 1: Найти Email Templates

1. Откройте **Project Settings** → **Authentication**
2. В левой части страницы найдите подменю:
   - Users
   - Policies
   - **Email Templates** ← вот это вам нужно
   - SMTP Settings
   - URL Configuration
3. Нажмите на **"Email Templates"**

### Шаг 2: Настроить шаблон Magic Link для OTP

1. В верхней части страницы переключитесь на вкладку **"Magic link"** (это важно для OTP)
2. Измените шаблон, заменив `{{ .ConfirmationURL }}` на `{{ .Token }}`

**Было (отправляет ссылку):**
```
Magic Link

Follow this link to login:
{{ .ConfirmationURL }}
```

**Должно быть (отправляет код):**
```html
<h2>Ваш код для входа</h2>
<p>Ваш одноразовый код:</p>
<p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #2563eb; font-family: monospace;">
  {{ .Token }}
</p>
<p>Введите этот код в форму входа.</p>
<p style="color: #666; font-size: 12px;">Код действителен в течение 10 минут.</p>
```

**Важно:** 
- Используйте `{{ .Token }}` для отображения полного кода
- Supabase генерирует 8-значный код для email OTP (это нельзя изменить)
- В модалке нужно ввести все 8 цифр

3. Нажмите **"Save changes"**

### Шаг 3: Настройка SMTP (для продакшена)

1. В том же разделе Authentication → **"SMTP Settings"**
2. Включите "Enable Custom SMTP"
3. Введите данные вашего SMTP сервера (Gmail, SendGrid, Mailgun и т.д.)

**Для разработки:** Можно использовать встроенный SMTP Supabase (он работает, но есть лимиты).

### Информация о длине OTP кода

Supabase **автоматически генерирует 8-значный код** для email OTP. Это встроенная функция безопасности, и **длину кода нельзя изменить** для email-авторизации.

**Рекомендация:** Используйте **8-значный код** - это стандартная практика для email OTP и обеспечивает лучшую безопасность.

---

## Настройка SMS

### Обзор

Для отправки SMS с кодом подтверждения через Supabase необходимо настроить SMS-провайдер. Supabase поддерживает несколько провайдеров, включая Twilio (рекомендуется).

### Настройка Twilio

#### Шаг 1: Регистрация в Twilio

1. Перейдите на [Twilio.com](https://www.twilio.com) и создайте аккаунт
2. Подтвердите ваш номер телефона и email
3. После регистрации вы получите:
   - **Account SID** (начинается с `AC...`)
   - **Auth Token** (секретный токен)
   - **Phone Number** (номер для отправки SMS, формата `+1234567890`)

#### Шаг 2: Настройка в Supabase Dashboard

1. Откройте ваш проект в [Supabase Dashboard](https://app.supabase.com)
2. Перейдите в **Project Settings** (⚙️ Settings) → **Auth** → **SMS Auth**
3. Найдите раздел **SMS Provider Settings**
4. Заполните поля:
   - **Provider**: Выберите `Twilio`
   - **Account SID**: Вставьте ваш Account SID из Twilio
   - **Auth Token**: Вставьте ваш Auth Token из Twilio
   - **Phone Number**: Вставьте ваш Twilio Phone Number (формат: `+1234567890`)
5. Нажмите **Save**

#### Шаг 3: Включение SMS Auth

1. В том же разделе **SMS Auth** найдите **Enable SMS Auth**
2. Включите переключатель
3. (Опционально) Настройте **OTP Expiry** (время жизни кода, по умолчанию 60 секунд)
4. Нажмите **Save**

#### Шаг 4: Настройка шаблона SMS

1. В разделе **SMS Templates** создайте шаблон сообщения
2. Используйте переменную `{{ .Token }}` для кода подтверждения
3. Пример шаблона:
   ```
   Ваш код подтверждения: {{ .Token }}
   
   Не передавайте этот код никому.
   ```
4. Нажмите **Save**

### Альтернативные провайдеры

Supabase также поддерживает:
- **Vonage** (бывший Nexmo)
- **MessageBird**
- **Textlocal**

Настройка аналогична Twilio - укажите учетные данные провайдера в настройках Supabase.

### Важные замечания

1. **Формат номера**: Supabase требует формат E.164 (например, `+79525602363`)
   - Приложение автоматически нормализует номер перед отправкой
   
2. **Стоимость**: Twilio взимает плату за каждую отправленную SMS
   - Проверьте тарифы на сайте Twilio
   - Для тестирования Twilio предоставляет бесплатные кредиты

3. **Лимиты**: 
   - Twilio может иметь лимиты на количество SMS в день для новых аккаунтов
   - Проверьте лимиты в вашем аккаунте Twilio

4. **Безопасность**:
   - Никогда не публикуйте Auth Token в открытом коде
   - Храните секретные ключи только в настройках Supabase

### Fallback механизм

Если SMS провайдер не настроен, приложение автоматически использует email метод (отправка кода на временный email `номер@temp.com`). Это позволяет разработчикам тестировать функционал без настройки SMS.

---

## Российские SMS-провайдеры

### Обзор

Supabase поддерживает кастомных SMS-провайдеров через **Send SMS Hook**. Это позволяет использовать российские провайдеры:
- **sms.ru** - популярный российский провайдер
- **smsc.ru** - крупный российский SMS-провайдер
- **smsaero.ru** - российский SMS-провайдер
- И другие...

### ⚠️ Важное замечание

**SQL-функции в Supabase НЕ МОГУТ делать HTTP запросы!** 

Для отправки SMS через российских провайдеров **обязательно используйте Edge Function**.

**❌ НЕ создавайте SQL-функцию** - она не будет работать для отправки SMS. Используйте **ТОЛЬКО Edge Function**.

### Настройка через Edge Function (рекомендуется)

#### Шаг 1: Создание Edge Function для SMSC.ru

Используйте готовый файл `supabase/functions/send-sms-otp-smsc/index.ts` (уже создан в проекте).

#### Шаг 2: Установка Supabase CLI

**⚠️ ВАЖНО:** Supabase CLI **НЕЛЬЗЯ** установить через `npm install -g supabase`! Это больше не поддерживается.

Используйте один из способов ниже:

**✅ Вариант 1: Через winget (Windows Package Manager) - Рекомендуется для Windows**

```powershell
# Установите Supabase CLI
winget install --id=Supabase.CLI

# Перезапустите PowerShell/терминал после установки
# Проверьте установку:
supabase --version
```

**✅ Вариант 2: Через Scoop (если установлен)**

```powershell
# Если Scoop не установлен, сначала установите его:
iwr -useb get.scoop.sh | iex

# Добавьте репозиторий Supabase
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git

# Установите Supabase CLI
scoop install supabase

# Проверьте установку:
supabase --version
```

**✅ Вариант 3: Через npx (без глобальной установки)**

Если не хотите устанавливать CLI глобально, можно использовать `npx`:

```bash
# Используйте npx для выполнения команд без установки
npx supabase login
npx supabase link --project-ref your-project-ref
npx supabase functions deploy send-sms-otp-smsc
npx supabase secrets set SMSC_LOGIN=your_login
```

**✅ Вариант 4: Через Chocolatey (если установлен)**

```powershell
choco install supabase
```

**Вариант 4: Ручная установка (если ничего не работает)**

1. Перейдите на https://github.com/supabase/cli/releases
2. Скачайте последнюю версию для Windows (файл `.exe`)
3. Переименуйте файл в `supabase.exe`
4. Поместите в папку, которая есть в PATH, или добавьте папку в PATH

**Проверка установки:**
```bash
supabase --version
```

#### Шаг 3: Деплой Edge Function

**После установки CLI** (см. Шаг 2 выше), выполните:

```bash
# Авторизуйтесь в Supabase
supabase login

# Свяжите проект
# Замените 'your-project-ref' на ваш реальный project-ref (см. инструкцию ниже)
supabase link --project-ref your-project-ref

# Деплой функции для SMSC.ru
# ВАЖНО: Используйте полную команду "supabase functions deploy", а не просто "functions deploy"
supabase functions deploy send-sms-otp-smsc
# Или если используете npx:
# npx supabase functions deploy send-sms-otp-smsc

# Установите секретные ключи (ЗАМЕНИТЕ на ваши реальные данные!)
supabase secrets set SMSC_LOGIN=your_smsc_login
supabase secrets set SMSC_PASSWORD=your_smsc_password

# После настройки Hook в Dashboard, установите секрет Hook:
# supabase secrets set SMS_HOOK_SECRET=ваш_сгенерированный_секрет
```

**Если используете npx (без установки CLI):**

```bash
# Авторизуйтесь
npx supabase login

# Свяжите проект
# Замените 'your-project-ref' на ваш реальный project-ref (см. инструкцию ниже)
npx supabase link --project-ref your-project-ref

# Деплой функции
npx supabase functions deploy send-sms-otp-smsc

# Установите секреты
npx supabase secrets set SMSC_LOGIN=your_smsc_login
npx supabase secrets set SMSC_PASSWORD=your_smsc_password
```

**Где найти project-ref (ID проекта):**

`project-ref` - это уникальный идентификатор вашего проекта Supabase. Его можно найти несколькими способами:

**Способ 1: Из URL в браузере (самый простой)**
1. Откройте Supabase Dashboard: https://app.supabase.com
2. Выберите ваш проект
3. Посмотрите на URL в адресной строке браузера
4. URL будет вида: `https://app.supabase.com/project/abcdefghijklmnop`
5. `abcdefghijklmnop` - это и есть ваш **project-ref**

**Пример:**
```
URL: https://app.supabase.com/project/fwjwqtwwsxchjlgwrmdj
Project-ref: fwjwqtwwsxchjlgwrmdj
```

**Способ 2: Из Project Settings**
1. Откройте Supabase Dashboard
2. Выберите ваш проект
3. Перейдите в **Project Settings** (⚙️ в левом нижнем меню)
4. Перейдите на вкладку **General**
5. Найдите поле **Reference ID** - это и есть ваш project-ref

**Способ 3: Из переменных окружения**
Если вы уже настроили `.env` файл, project-ref есть в URL:
```env
VITE_SUPABASE_URL=https://fwjwqtwwsxchjlgwrmdj.supabase.co
                                  ↑
                         Это ваш project-ref
```

**Пример использования:**
```bash
# Если ваш project-ref = fwjwqtwwsxchjlgwrmdj
npx supabase link --project-ref fwjwqtwwsxchjlgwrmdj
```

**⚠️ ВАЖНО:**
- Используйте **ТОЛЬКО** ID проекта (например: `fwjwqtwwsxchjlgwrmdj`)
- **НЕ** используйте полный URL (например: ❌ `https://supabase.com/dashboard/project/fwjwqtwwsxchjlgwrmdj`)
- **НЕ** используйте `https://` или другие части URL

**Правильно:**
```bash
npx supabase link --project-ref fwjwqtwwsxchjlgwrmdj
```

**Неправильно:**
```bash
# ❌ Не используйте полный URL
npx supabase link --project-ref https://supabase.com/dashboard/project/fwjwqtwwsxchjlgwrmdj

# ❌ Не используйте с https://
npx supabase link --project-ref https://fwjwqtwwsxchjlgwrmdj.supabase.co
```

**Если winget не установлен:**
- Windows 10/11 обычно уже имеет winget
- Если нет, установите из Microsoft Store: https://aka.ms/getwinget
- Или используйте npx (не требует установки)

#### Шаг 4: Настройка Send SMS Hook в Supabase Dashboard

**⚠️ ВАЖНО:** Без настроенного Hook вы будете видеть ошибку `400: Unsupported phone provider` в логах Auth.

1. Откройте Supabase Dashboard → **Project Settings** → **Auth** → **Hooks**
2. Найдите раздел **Send SMS Hook**
3. Включите хук (переключатель в положение "On")
4. Выберите тип: **HTTPS**
5. Укажите URL: `https://fwjwqtwwsxchjlgwrmdj.supabase.co/functions/v1/send-sms-otp-smsc`
   - Замените `fwjwqtwwsxchjlgwrmdj` на ваш project-ref
   - **Важно:** URL должен начинаться с `https://` и быть полностью правильным
6. Сгенерируйте секретный ключ (нажмите "Generate Secret") и сохраните его
7. Установите секретный ключ в переменные окружения:
   ```bash
   # ВАЖНО: Не используйте префикс SUPABASE_ - CLI это не поддерживает
   npx supabase secrets set SMS_HOOK_SECRET=your_generated_secret_here
   ```
   
   **⚠️ ВАЖНО:** 
   - Не используйте имя `SUPABASE_SMS_HOOK_SECRET` - CLI не поддерживает переменные, начинающиеся с `SUPABASE_`
   - Используйте имя `SMS_HOOK_SECRET` (без префикса)
   - Edge Function уже обновлена для использования правильного имени
8. Нажмите **Save**

**После настройки Hook:**
- Ошибка `400: Unsupported phone provider` должна исчезнуть
- В логах Edge Functions появятся записи при попытке отправки SMS

**Примечание:** Если вы открываете URL функции напрямую в браузере, вы получите ошибку 401 "Отсутствует заголовок авторизации" - это **нормально**! Функция защищена секретом и должна вызываться только из Supabase Auth Hook, а не напрямую из браузера.

### Использование других сервисов (например, respond.io)

**Важно:** Supabase поддерживает только ограниченный список провайдеров напрямую.

**Respond.io** - это платформа для обмена сообщениями, которая использует других SMS-провайдеров (Twilio, MessageBird, Vonage) под капотом. Supabase **не поддерживает** respond.io напрямую.

**Рекомендация:** Используйте провайдера напрямую через Supabase (Twilio, MessageBird, Vonage) - это проще, дешевле и надежнее.

---

## Устранение проблем

### Проблема: Не удается войти по номеру телефона

#### Причины и решения:

1. **Номер не сохранен в профиле**
   - Откройте личный кабинет
   - Нажмите "Редактировать" в блоке "Данные пользователя"
   - Введите номер телефона в формате: `+79525602363` или `89525602363`
   - Нажмите "Сохранить"

2. **Неправильный формат номера**
   - Правильные форматы: `+79525602363`, `89525602363`, `79525602363`
   - Неправильные: `8-952-560-23-63` (с дефисами), `8 (952) 560-23-63` (со скобками)

3. **Аккаунт создан через email**
   - Входите по **email и паролю** (не по номеру)
   - Номер телефона можно добавить позже в профиле
   - После добавления номера в профиль можно входить и по номеру

4. **Пароль не установлен**
   - Войдите через OTP код (как при регистрации)
   - В личном кабинете установите пароль
   - После этого можно входить по номеру и паролю

### Проблема: Не удалось сохранить данные профиля

#### Шаг 1: Проверьте, создана ли таблица `user_profiles`

1. Откройте Supabase Dashboard → **Table Editor**
2. Проверьте, есть ли таблица **`user_profiles`**

**Если таблицы нет:**
- Выполните SQL скрипт из файла `supabase-schema.sql`

#### Шаг 2: Проверьте консоль браузера

1. Откройте консоль разработчика (F12)
2. Попробуйте сохранить данные снова
3. Посмотрите на ошибку в консоли

**Частые ошибки:**

- **"relation 'user_profiles' does not exist"** → Таблица не создана. Выполните SQL скрипт.
- **"new row violates row-level security policy"** → Политики RLS не созданы. Выполните SQL скрипт заново.
- **"permission denied for table user_profiles"** → Проблемы с правами доступа. Проверьте политики RLS.

#### Шаг 3: Выполните SQL скрипт

1. Откройте **SQL Editor** в Supabase
2. Скопируйте весь код из файла `supabase-schema.sql`
3. Вставьте и выполните (Run)
4. Убедитесь, что видите сообщение "Success"

### Проблема: SMS не отправляются

1. Проверьте, что SMS Auth включен в настройках Supabase
2. Убедитесь, что все поля (Account SID, Auth Token, Phone Number) заполнены правильно
3. Проверьте баланс в аккаунте Twilio
4. Посмотрите логи в Supabase Dashboard → Logs → Auth Logs

### Проблема: Ошибка "SMS provider not configured"

- Убедитесь, что SMS провайдер настроен в Supabase Dashboard
- Проверьте, что включен "Enable SMS Auth"
- Подождите несколько минут после сохранения настроек (может потребоваться время на применение)

### Проблема: Неверный формат номера

- Убедитесь, что номер вводится в правильном формате
- Приложение автоматически нормализует номер, но номер должен содержать код страны
- Для России: `+7XXXXXXXXXX` или `8XXXXXXXXXX`

### Проблема: Приходит ссылка вместо кода

1. Проверьте, что в шаблоне Magic Link используется `{{ .Token }}` вместо `{{ .ConfirmationURL }}`
2. Убедитесь, что в коде не указан `emailRedirectTo` в `signInWithOtp`
3. Проверьте настройки в Authentication → URL Configuration

---

## Функциональность

### Авторизация/Регистрация

- Вход и регистрация по email или номеру телефона
- Подтверждение через одноразовый код (OTP)
- Автоматическая генерация пароля при регистрации
- Возможность установить свой пароль в личном кабинете
- Вход по паролю после его установки
- Сессии хранятся в куки (30 дней)

### Личный кабинет

#### Вкладка "История заказов"
- Отображает историю покупок билетов (готово к интеграции)

#### Вкладка "Пассажиры"
- Сохранение паспортных данных пассажиров
- Добавление имен для отображения (мама, папа, и т.д.)
- Редактирование и удаление сохраненных пассажиров

#### Вкладка "Пригодится в поездке"
- Ссылка на справочную информацию

#### Вкладка "Связаться с нами"
- Контактная информация (телефон, email, Telegram, WhatsApp)

### Использование

#### Модалка авторизации

Модалка открывается при клике на кнопку "Войти / Регистрация" в Header.

После авторизации пользователь может:
- Перейти в личный кабинет через кнопку в Header
- Выйти из аккаунта

#### API

Все функции авторизации доступны через контекст `AuthContext`:

```typescript
import { useAuth } from '@/contexts/AuthContext';

const { user, signIn, signOut, updatePassword } = useAuth();
```

### Безопасность

- Все данные защищены Row Level Security (RLS) в Supabase
- Пользователи могут видеть и редактировать только свои данные
- Токены сессий хранятся в куки с ограниченным временем жизни
- Пароли хешируются Supabase

---

## Дополнительные ресурсы

- [Документация Supabase Auth](https://supabase.com/docs/guides/auth)
- [Документация Supabase SMS Auth](https://supabase.com/docs/guides/auth/auth-sms)
- [Документация Supabase Auth Hooks](https://supabase.com/docs/guides/auth/auth-hooks/send-sms-hook)
- [Документация Twilio](https://www.twilio.com/docs)
- [SMSC.ru API документация](https://smsc.ru/api/)
- [SMS.ru API документация](https://sms.ru/api/)

