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
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Проверка секрета от Supabase (опционально, но рекомендуется)
    const authHeader = req.headers.get('authorization')
    const expectedSecret = Deno.env.get('SUPABASE_SMS_HOOK_SECRET')
    
    if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: corsHeaders, status: 401 },
      )
    }

    const { phone, message }: SMSRequest = await req.json()

    // Получаем API ключ из переменных окружения
    const smsRuApiKey = Deno.env.get('SMS_RU_API_KEY')
    
    if (!smsRuApiKey) {
      throw new Error('SMS_RU_API_KEY not configured')
    }

    // API sms.ru
    const smsRuUrl = 'https://sms.ru/sms/send'

    // Отправка SMS через sms.ru API
    const formData = new FormData()
    formData.append('api_id', smsRuApiKey)
    formData.append('to', phone)
    formData.append('msg', message)
    formData.append('json', '1') // Получаем ответ в формате JSON

    const response = await fetch(smsRuUrl, {
      method: 'POST',
      body: formData,
    })

    const result = await response.json()

    // Проверка результата
    if (result.status !== 'OK' && result.status_code !== 100) {
      throw new Error(`SMS.ru error: ${result.status_text || result.status || 'Unknown error'}`)
    }

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
    console.error('SMS sending error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }, 
        status: 400 
      },
    )
  }
})

