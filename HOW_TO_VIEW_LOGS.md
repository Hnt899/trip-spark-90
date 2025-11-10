# Как посмотреть логи Edge Function в Supabase

## Способ 1: Через Dashboard (рекомендуется)

### Шаг 1: Откройте Supabase Dashboard
1. Перейдите на https://supabase.com/dashboard
2. Войдите в свой аккаунт
3. Выберите проект `tudasuda` (или ваш проект)

### Шаг 2: Перейдите в Edge Functions
1. В левом меню найдите раздел **"Edge Functions"**
2. Или перейдите напрямую: https://supabase.com/dashboard/project/fwjwqtwwsxchjlgwrmdj/functions

### Шаг 3: Откройте функцию и логи
1. Найдите функцию **`send-sms-exolve`** в списке
2. Нажмите на неё
3. Перейдите на вкладку **"Logs"** (Логи)

### Шаг 4: Найдите нужный лог
1. В списке логов найдите запись с ошибкой 400
2. Нажмите на неё, чтобы увидеть детали
3. В правой панели будут видны:
   - Все `console.log()` сообщения
   - Ошибки
   - Детали запроса и ответа

## Способ 2: Через Logs & Analytics

### Шаг 1: Откройте Logs & Analytics
1. В левом меню найдите **"Logs & Analytics"**
2. Или перейдите: https://supabase.com/dashboard/project/fwjwqtwwsxchjlgwrmdj/logs

### Шаг 2: Фильтруйте по Edge Functions
1. В левой панели найдите раздел **"COLLECTIONS"**
2. Раскройте его
3. Выберите **"Edge Functions"**

### Шаг 3: Найдите нужный лог
1. В списке найдите запись с методом **POST** и статусом **400**
2. Нажмите на неё
3. В правой панели будут детали

### Шаг 4: Посмотрите детальные логи функции
1. В правой панели найдите поле **"metadata"**
2. Раскройте его
3. Там должны быть детали выполнения функции
4. **Важно:** Детальные `console.log()` могут быть в отдельном разделе

## Способ 3: Через CLI (для разработчиков)

```bash
# Посмотреть логи Edge Function
npx supabase functions logs send-sms-exolve

# Посмотреть логи в реальном времени
npx supabase functions logs send-sms-exolve --follow

# Посмотреть логи за последний час
npx supabase functions logs send-sms-exolve --since 1h
```

## Что искать в логах

Когда найдете нужный лог, обратите внимание на:

1. **Сообщения `console.log()`:**
   - `=== МТС Exolve SMS Sending ===`
   - `EXOLVE_API_KEY configured: true/false`
   - `Request body: {...}`
   - `Response status: ...`
   - `МТС Exolve response text: ...`

2. **Ошибки:**
   - `Error: ...`
   - `Failed to parse ...`
   - `Network error: ...`

3. **Детали запроса:**
   - Какой endpoint используется
   - Какие заголовки отправляются
   - Какое тело запроса

## Прямые ссылки

- **Edge Functions:** https://supabase.com/dashboard/project/fwjwqtwwsxchjlgwrmdj/functions
- **Logs & Analytics:** https://supabase.com/dashboard/project/fwjwqtwwsxchjlgwrmdj/logs
- **Конкретная функция:** https://supabase.com/dashboard/project/fwjwqtwwsxchjlgwrmdj/functions/send-sms-exolve

## Если логи не видны

1. Убедитесь, что функция была вызвана (попробуйте зарегистрироваться снова)
2. Проверьте фильтры времени (выберите "Last hour" или "Last 24 hours")
3. Обновите страницу
4. Проверьте, что вы смотрите правильный проект

