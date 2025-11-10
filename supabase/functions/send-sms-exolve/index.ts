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
    // Согласно документации: номера должны быть в формате +7XXXXXXXXXX
    let normalizedPhone = phone.replace(/\s+/g, '') // Убираем пробелы
    
    // Если номер начинается с 8, заменяем на +7
    if (normalizedPhone.startsWith('8') && normalizedPhone.length === 11) {
      normalizedPhone = '+7' + normalizedPhone.substring(1)
    } else if (normalizedPhone.startsWith('7') && normalizedPhone.length === 11 && !normalizedPhone.startsWith('+')) {
      // Если номер начинается с 7 без +, добавляем +
      normalizedPhone = '+' + normalizedPhone
    } else if (!normalizedPhone.startsWith('+') && normalizedPhone.length === 10) {
      // Если номер без кода страны (10 цифр), добавляем +7
      normalizedPhone = '+7' + normalizedPhone
    }
    // Если уже начинается с +, оставляем как есть
    
    console.log('Original phone:', phone)
    console.log('Normalized phone:', normalizedPhone)

    // API МТС Exolve для отправки SMS
    // Согласно документации: https://docs.exolve.ru/docs/ru/api-reference/sms-api/
    // Endpoint: https://api.exolve.ru/messaging/v1/SendSMS
    const apiUrl = 'https://api.exolve.ru/messaging/v1/SendSMS'
    
    // Формируем тело запроса
    // Согласно документации МТС Exolve и примеру из веб-интерфейса:
    // - destination: номер получателя БЕЗ + (формат: 7XXXXXXXXXX или 79525602363)
    // - text: текст сообщения
    // - number: номер отправителя БЕЗ + (формат: 79300663471) или альфа-имя
    const requestBody: any = {
      // Убираем + из destination для совместимости с API
      destination: normalizedPhone.startsWith('+') ? normalizedPhone.substring(1) : normalizedPhone,
      text: message
    }
    
    // Добавляем номер отправителя или альфа-имя, если указано
    // Может быть номером телефона (+79001234567 или 79001234567) или альфа-именем
    if (exolveSender) {
      // Убираем + из номера отправителя, если есть (для совместимости)
      const senderNumber = exolveSender.startsWith('+') ? exolveSender.substring(1) : exolveSender
      requestBody.number = senderNumber
    }
    
    console.log('Sending SMS to МТС Exolve...')
    console.log('Endpoint:', apiUrl)
    console.log('Sender:', exolveSender || 'NOT SET (will use default)')
    console.log('Destination:', normalizedPhone)
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
        throw new Error('Request timeout: МТС Exolve API не ответил в течение 60 секунд. Возможно, API недоступен или очень медленный. Проверьте, работает ли REST API в тестовом режиме без договора.')
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
      // Ошибка от МТС Exolve
      const errorMsg = result.error || result.message || 'Unknown error'
      const errorCode = result.code || response.status
      console.error('МТС Exolve error:', errorCode, '-', errorMsg)
      throw new Error(`МТС Exolve error (${errorCode}): ${errorMsg}`)
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

