import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SMSRequest {
  phone: string
  message: string
}

serve(async (req) => {
  // Логируем сразу при получении запроса
  console.log('=== Edge Function send-sms-exolve called ===')
  console.log('Timestamp:', new Date().toISOString())
  console.log('Request method:', req.method)
  console.log('Request URL:', req.url)
  console.log('Request headers:', Object.fromEntries(req.headers.entries()))
  
  if (req.method === 'OPTIONS') {
    console.log('OPTIONS request - returning CORS headers')
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('=== МТС Exolve SMS Sending ===')
    console.log('Request method:', req.method)
    console.log('Request URL:', req.url)
    
    // Получаем API ключ и номер отправителя из переменных окружения
    const exolveApiKey = Deno.env.get('EXOLVE_API_KEY')
    // EXOLVE_SENDER может быть номером телефона (+79001234567) или альфа-именем
    // Если не указан - будет использован номер по умолчанию из аккаунта МТС Exolve
    const exolveSender = Deno.env.get('EXOLVE_SENDER') || ''
    
    console.log('EXOLVE_API_KEY configured:', !!exolveApiKey)
    console.log('EXOLVE_API_KEY length:', exolveApiKey?.length || 0)
    console.log('EXOLVE_SENDER configured:', exolveSender || 'NOT SET (will use default)')
    
    if (!exolveApiKey) {
      const errorMsg = 'EXOLVE_API_KEY not configured. Please set EXOLVE_API_KEY secret with your API key. Use: npx supabase secrets set EXOLVE_API_KEY=your_key'
      console.error(errorMsg)
      throw new Error(errorMsg)
    }
    
    // Парсим тело запроса
    let requestData
    try {
      requestData = await req.json()
      console.log('Request data received:', { phone: requestData.phone, messageLength: requestData.message?.length })
    } catch (parseError) {
      console.error('Failed to parse request JSON:', parseError)
      throw new Error('Invalid request body. Expected JSON with phone and message fields.')
    }
    
    const { phone, message } = requestData

    if (!phone || !message) {
      throw new Error(`Missing required fields. Phone: ${!!phone}, Message: ${!!message}`)
    }

    // Нормализуем номер телефона для МТС Exolve
    // Убираем все пробелы, дефисы и другие символы, оставляем только цифры
    let normalizedPhone = phone.replace(/\D/g, '')
    
    // Если номер начинается с 8 (11 цифр), заменяем первую 8 на 7
    if (normalizedPhone.startsWith('8') && normalizedPhone.length === 11) {
      normalizedPhone = '7' + normalizedPhone.substring(1)
    } else if (normalizedPhone.startsWith('7') && normalizedPhone.length === 11) {
      // Если номер начинается с 7 (11 цифр), оставляем как есть
      normalizedPhone = normalizedPhone
    } else if (normalizedPhone.length === 10) {
      // Если номер без кода страны (10 цифр), добавляем 7 в начало
      normalizedPhone = '7' + normalizedPhone
    }
    // Результат: номер в формате 7XXXXXXXXXX (11 цифр, без +)
    
    console.log('Original phone:', phone)
    console.log('Normalized phone (digits only):', normalizedPhone)

    // ============================================
    // RATE LIMITING: Проверка лимита отправки SMS
    // ============================================
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    
    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      
      // Проверяем количество отправленных SMS за последний час
      // Номер в БД хранится в формате +7XXXXXXXXXX
      const phoneWithPlus = '+' + normalizedPhone
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
      
      // Проверяем в разных форматах (на случай разных вариантов нормализации)
      const { data: recentCodes } = await supabase
        .from('verification_codes')
        .select('id')
        .or(`phone.eq.${phoneWithPlus},phone.eq.${normalizedPhone},phone.like.%${normalizedPhone.slice(-10)}`)
        .gte('created_at', oneHourAgo)
      
      const totalRecentCodes = recentCodes?.length || 0
      const MAX_SMS_PER_HOUR = 3
      
      if (totalRecentCodes >= MAX_SMS_PER_HOUR) {
        console.error(`Rate limit exceeded for phone ${normalizedPhone}: ${totalRecentCodes} SMS in last hour`)
        return new Response(
          JSON.stringify({
            success: false,
            error: `Превышен лимит отправки SMS (${MAX_SMS_PER_HOUR} в час). Попробуйте позже.`,
            details: `Отправлено ${totalRecentCodes} SMS за последний час`
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 429 // Too Many Requests
          }
        )
      }
      
      console.log(`Rate limit check passed: ${totalRecentCodes}/${MAX_SMS_PER_HOUR} SMS in last hour`)
    }

    // API МТС Exolve для отправки SMS
    // Согласно документации: https://docs.exolve.ru/docs/ru/api-reference/sms-api/
    // Endpoint: https://api.exolve.ru/messaging/v1/SendSMS
    const apiUrl = 'https://api.exolve.ru/messaging/v1/SendSMS'
    
    // Формируем тело запроса
    // Формат точно как в веб-интерфейсе МТС Exolve: {"number": "...", "destination": "...", "text": "..."}
    
    // Номер получателя уже нормализован (только цифры, формат 7XXXXXXXXXX)
    let destinationPhone = normalizedPhone
    
    // Обработка номера отправителя - убираем все нецифровые символы (если это номер)
    let senderNumber = ''
    if (exolveSender) {
      senderNumber = exolveSender
      // Если это номер (начинается с цифры или +), убираем все нецифровые символы
      if (/^[\d+]/.test(senderNumber)) {
        senderNumber = senderNumber.replace(/\D/g, '')
      }
      // Если это альфа-имя (начинается с буквы), оставляем как есть
    }
    
    // Формируем тело запроса в том же порядке, что и в веб-интерфейсе
    const requestBody: any = {
      text: message,
      destination: destinationPhone
    }
    
    // Добавляем номер отправителя только если указан (как в веб-интерфейсе)
    if (senderNumber) {
      requestBody.number = senderNumber
    }
    
    console.log('Sending SMS to МТС Exolve...')
    console.log('Endpoint:', apiUrl)
    console.log('Original destination phone:', phone)
    console.log('Normalized destination phone:', normalizedPhone)
    console.log('Final destination (for API):', destinationPhone)
    console.log('Sender (original):', exolveSender || 'NOT SET (will use default)')
    console.log('Sender (for API):', requestBody.number || 'NOT SET (will use default)')
    console.log('Message:', message)
    console.log('Request body:', JSON.stringify(requestBody, null, 2))
    console.log('Authorization header present:', !!exolveApiKey)
    console.log('API Key length:', exolveApiKey?.length || 0)
    console.log('Starting fetch request at:', new Date().toISOString())
    
    // Отправляем POST запрос с таймаутом
    // Используем AbortController для установки таймаута 60 секунд (увеличено для медленных API)
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      console.log('Timeout triggered at:', new Date().toISOString())
      controller.abort()
    }, 60000) // 60 секунд таймаут
    
    let response
    try {
      console.log('Fetch request initiated...')
      const fetchStartTime = Date.now()
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${exolveApiKey}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      })
      const fetchDuration = Date.now() - fetchStartTime
      console.log(`Fetch completed in ${fetchDuration}ms`)
      clearTimeout(timeoutId)
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      console.error('Fetch error caught:', fetchError.name, fetchError.message)
      if (fetchError.name === 'AbortError') {
        throw new Error('Request timeout: МТС Exolve API не ответил в течение 60 секунд. Проверьте подключение к интернету, доступность API и правильность API ключа.')
      }
      throw new Error(`Network error: ${fetchError.message}`)
    }
    
    console.log('Response status:', response.status)
    console.log('Response ok:', response.ok)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))

    const responseText = await response.text()
    console.log('МТС Exolve response text:', responseText)
    console.log('МТС Exolve response text length:', responseText.length)

    // Парсим JSON ответ
    let result
    try {
      result = JSON.parse(responseText)
      console.log('МТС Exolve parsed response:', JSON.stringify(result, null, 2))
    } catch (e) {
      console.error('Failed to parse МТС Exolve response as JSON:', e)
      console.error('Response text:', responseText)
      throw new Error(`МТС Exolve returned invalid JSON: ${responseText.substring(0, 200)}`)
    }

    // Проверяем успешность отправки
    if (response.ok && result.message_id) {
      console.log('SMS sent successfully!')
      console.log('Message ID:', result.message_id)
      console.log('Full response:', JSON.stringify(result, null, 2))
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message_id: result.message_id,
          message: 'SMS sent successfully'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
          status: 200 
        },
      )
    } else {
      // Ошибка от МТС Exolve - детальная диагностика
      const errorCode = result.code || result.status_code || response.status
      let errorMsg = result.error || result.message || result.detail || 'Unknown error'
      
      // Если errorMsg это объект, сериализуем его
      if (typeof errorMsg === 'object') {
        errorMsg = JSON.stringify(errorMsg)
      }
      
      const errorDetails = result.details || result.errors || null
      
      console.error('=== МТС Exolve API Error ===')
      console.error('Status code:', response.status)
      console.error('Error code:', errorCode)
      console.error('Error message:', errorMsg)
      console.error('Error details:', errorDetails)
      console.error('Full response:', JSON.stringify(result, null, 2))
      console.error('Request body that was sent:', JSON.stringify(requestBody, null, 2))
      
      // Формируем понятное сообщение об ошибке в зависимости от кода
      let userFriendlyError = ''
      
      if (response.status === 401 || errorCode === 401) {
        userFriendlyError = 'Ошибка авторизации (401): Неверный или истекший API ключ МТС Exolve. Проверьте EXOLVE_API_KEY в секретах Supabase.'
      } else if (response.status === 400 || errorCode === 400) {
        userFriendlyError = `Ошибка запроса (400): ${errorMsg}. Проверьте формат номера телефона и текста сообщения.`
      } else if (response.status === 403 || errorCode === 403) {
        userFriendlyError = 'Ошибка доступа (403): Недостаточно прав для отправки SMS. Проверьте настройки аккаунта МТС Exolve.'
      } else if (response.status === 429 || errorCode === 429) {
        userFriendlyError = 'Превышен лимит запросов (429): Слишком много запросов. Подождите немного и попробуйте снова.'
      } else {
        userFriendlyError = `МТС Exolve error (${errorCode}): ${errorMsg}`
      }
      
      if (errorDetails) {
        const detailsStr = typeof errorDetails === 'object' ? JSON.stringify(errorDetails) : String(errorDetails)
        userFriendlyError += `\nДетали: ${detailsStr}`
      }
      
      throw new Error(userFriendlyError)
    }
  } catch (error: any) {
    console.error('=== SMS Sending Error (МТС Exolve) ===')
    console.error('Error type:', error?.constructor?.name)
    console.error('Error:', error)
    console.error('Error message:', error?.message)
    console.error('Error stack:', error?.stack)
    console.error('Error name:', error?.name)
    
    // Формируем понятное сообщение об ошибке
    let errorMessage = error?.message || 'Unknown error'
    let errorDetails = error?.toString() || 'No details'
    
    // Если это ошибка парсинга JSON, добавляем больше информации
    if (error?.message?.includes('JSON')) {
      errorMessage = `Ошибка при обработке ответа от МТС Exolve: ${errorMessage}`
    }
    
    // Если это таймаут, указываем это явно
    if (error?.message?.includes('timeout')) {
      errorMessage = 'Превышено время ожидания ответа от МТС Exolve API. Проверьте подключение к интернету и доступность API.'
    }
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: errorMessage,
        details: errorDetails,
        stack: error?.stack || undefined
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 400 
      },
    )
  }
})

