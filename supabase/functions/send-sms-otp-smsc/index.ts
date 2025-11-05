import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SMSRequest {
  phone: string
  message: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('=== SMS Hook Called ===')
    console.log('Method:', req.method)
    console.log('Headers:', Object.fromEntries(req.headers.entries()))

    // Проверка секрета от Supabase (опционально, но рекомендуется)
    // Supabase отправляет секрет в заголовке Authorization: Bearer <secret>
    const authHeader = req.headers.get('authorization')
    const expectedSecret = Deno.env.get('SMS_HOOK_SECRET')
    
    console.log('Auth header present:', !!authHeader)
    console.log('Expected secret configured:', !!expectedSecret)
    
    // Если секрет настроен, проверяем его
    if (expectedSecret) {
      // Supabase может отправлять секрет в формате: Bearer <secret> или просто <secret>
      const authValue = authHeader?.replace(/^Bearer\s+/i, '').trim()
      if (authValue !== expectedSecret) {
        console.error('Unauthorized: secret mismatch or missing')
        console.error('Expected:', expectedSecret.substring(0, 10) + '...')
        console.error('Received:', authValue ? authValue.substring(0, 10) + '...' : 'MISSING')
        return new Response(
          JSON.stringify({ 
            error: 'Unauthorized',
            message: 'Отсутствует заголовок авторизации или неверный секрет',
            hint: 'Эта функция должна вызываться только из Supabase Auth Hook'
          }),
          { headers: corsHeaders, status: 401 },
        )
      }
    } else {
      console.log('⚠️ Warning: SMS_HOOK_SECRET not configured - function is not protected')
    }

    // Получаем тело запроса
    const body = await req.json()
    console.log('Request body:', JSON.stringify(body, null, 2))
    console.log('Request body keys:', Object.keys(body))

    // Supabase Send SMS Hook может отправлять данные в разных форматах:
    // Вариант 1: { phone: string, message: string }
    // Вариант 2: { phone: string, token: string } - для OTP
    // Вариант 3: другие форматы
    let phone = body.phone || body.phone_number || body.to || body.user?.phone
    let message = body.message || body.msg || body.text || body.token || body.otp

    // Если token есть, но message нет, используем token как сообщение
    if (!message && body.token) {
      message = body.token
    }

    console.log('Extracted phone:', phone)
    console.log('Extracted message:', message ? `${message.substring(0, 10)}...` : 'MISSING')
    console.log('Full body structure:', {
      hasPhone: !!phone,
      hasMessage: !!message,
      hasToken: !!body.token,
      bodyKeys: Object.keys(body)
    })

    if (!phone || !message) {
      console.error('Missing phone or message:', { phone, message })
      throw new Error(`Missing required fields: phone=${!!phone}, message=${!!message}`)
    }

    // Получаем учетные данные из переменных окружения
    const smscLogin = Deno.env.get('SMSC_LOGIN')
    const smscPassword = Deno.env.get('SMSC_PASSWORD')
    
    console.log('SMSC login configured:', !!smscLogin)
    console.log('SMSC password configured:', !!smscPassword)
    
    if (!smscLogin || !smscPassword) {
      console.error('SMSC credentials not configured')
      throw new Error('SMSC credentials not configured. Please set SMSC_LOGIN and SMSC_PASSWORD secrets.')
    }

    // API SMSC.ru
    const smscUrl = 'https://smsc.ru/sys/send.php'
    
    // Нормализуем номер телефона для SMSC.ru
    // SMSC.ru принимает номер в формате: 79991234567 (без +) или +79991234567 (с +)
    let normalizedPhone = phone.replace(/\s+/g, '') // Убираем пробелы
    if (normalizedPhone.startsWith('+')) {
      // Оставляем + если есть
      normalizedPhone = normalizedPhone
    } else if (normalizedPhone.startsWith('8') && normalizedPhone.length === 11) {
      // Заменяем 8 на +7 для российских номеров
      normalizedPhone = '+7' + normalizedPhone.substring(1)
    } else if (normalizedPhone.startsWith('7') && normalizedPhone.length === 11) {
      // Добавляем + если номер начинается с 7
      normalizedPhone = '+' + normalizedPhone
    }
    
    console.log('Original phone:', phone)
    console.log('Normalized phone:', normalizedPhone)
    
    // Формируем URL с параметрами
    // Согласно документации SMSC.ru: https://smsc.ru/api/http/send/
    const params = new URLSearchParams({
      login: smscLogin,
      psw: smscPassword,
      phones: normalizedPhone,
      mes: message,
      fmt: '3', // JSON формат ответа (3 = JSON)
      charset: 'utf-8',
    })

    const fullUrl = `${smscUrl}?${params.toString()}`
    console.log('Sending SMS to SMSC.ru...')
    console.log('Full URL (without password):', fullUrl.replace(/psw=[^&]+/, 'psw=***'))

    const response = await fetch(fullUrl, {
      method: 'GET',
    })

    const responseText = await response.text()
    console.log('SMSC.ru response status:', response.status)
    console.log('SMSC.ru response text:', responseText)

    let result
    try {
      result = JSON.parse(responseText)
      console.log('SMSC.ru parsed response:', JSON.stringify(result, null, 2))
    } catch (e) {
      console.error('Failed to parse SMSC.ru response as JSON:', responseText)
      // SMSC.ru может возвращать ошибки в текстовом формате
      throw new Error(`SMSC.ru returned invalid JSON: ${responseText}`)
    }

    // Проверка результата SMSC.ru
    // Согласно документации SMSC.ru: https://smsc.ru/api/http/send/
    // SMSC.ru может возвращать ошибки в разных форматах:
    // 1. Число (код ошибки): 1, 2, 3, и т.д.
    // 2. Строка с числом: "1", "2", и т.д.
    // 3. Объект: { error: "...", error_code: 1, ... }
    // 4. Массив с объектами ошибок
    
    const errorMessages: { [key: number]: string } = {
      1: 'Ошибка в параметрах',
      2: 'Неверный логин или пароль',
      3: 'Недостаточно средств на счете',
      4: 'IP-адрес временно заблокирован',
      5: 'Неверный формат даты',
      6: 'Сообщение запрещено (по тексту или по имени отправителя)',
      7: 'Неверный формат номера телефона',
      8: 'Сообщение на данный номер не может быть доставлено',
    }
    
    // Если result - это число, это код ошибки
    if (typeof result === 'number') {
      const errorMsg = errorMessages[result] || `Код ошибки: ${result}`
      console.error('SMSC.ru error code (number):', result, '-', errorMsg)
      throw new Error(`SMSC.ru error (${result}): ${errorMsg}`)
    }
    
    // Если result - это строка с кодом ошибки
    if (typeof result === 'string' && /^-?\d+$/.test(result.trim())) {
      const errorCode = parseInt(result.trim())
      const errorMsg = errorMessages[errorCode] || `Код ошибки: ${errorCode}`
      console.error('SMSC.ru error code (string):', errorCode, '-', errorMsg)
      throw new Error(`SMSC.ru error (${errorCode}): ${errorMsg}`)
    }
    
    // Если result - это объект с ошибкой
    if (result && typeof result === 'object') {
      // Проверяем поле error
      if (result.error) {
        console.error('SMSC.ru error (object.error):', result.error)
        throw new Error(`SMSC.ru error: ${result.error}`)
      }
      
      // Проверяем поле error_code
      if (result.error_code !== undefined && result.error_code !== null) {
        const errorCode = typeof result.error_code === 'number' 
          ? result.error_code 
          : parseInt(String(result.error_code))
        if (!isNaN(errorCode)) {
          const errorMsg = errorMessages[errorCode] || `Код ошибки: ${errorCode}`
          console.error('SMSC.ru error code (object.error_code):', errorCode, '-', errorMsg)
          throw new Error(`SMSC.ru error (${errorCode}): ${errorMsg}`)
        }
      }
      
      // Проверяем массив результатов
      if (Array.isArray(result) && result.length > 0) {
        const firstMessage = result[0]
        if (firstMessage.error) {
          console.error('SMSC.ru error in message array:', firstMessage.error)
          throw new Error(`SMSC.ru error: ${firstMessage.error}`)
        }
        if (firstMessage.error_code !== undefined && firstMessage.error_code !== null) {
          const errorCode = typeof firstMessage.error_code === 'number' 
            ? firstMessage.error_code 
            : parseInt(String(firstMessage.error_code))
          if (!isNaN(errorCode)) {
            const errorMsg = errorMessages[errorCode] || `Код ошибки: ${errorCode}`
            console.error('SMSC.ru error code (array item):', errorCode, '-', errorMsg)
            throw new Error(`SMSC.ru error (${errorCode}): ${errorMsg}`)
          }
        }
      }
    }

    console.log('SMS sent successfully!')

    return new Response(
      JSON.stringify({ 
        success: true, 
        result,
        message: 'SMS sent successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 200 
      },
    )
  } catch (error) {
    console.error('=== SMS Hook Error ===')
    console.error('Error:', error)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Unknown error',
        details: error.toString(),
        stack: error.stack
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 400 
      },
    )
  }
})

