/**
 * WebPay Create Payment Edge Function
 * 
 * Создаёт данные для инициализации платежа WebPay v2
 * 
 * POST /functions/v1/webpay-create
 * Body: { ticket_id, order_number, total_price, customer_id?, base_url? }
 * 
 * Returns: { action, fields }
 * 
 * Примечание: функция stateless, не обновляет БД
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createInitSignatureV2, parseBoolLike } from "../_shared/webpay.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface CreatePaymentRequest {
  ticket_id: string; // UUID
  order_number: string; // T123...
  total_price: number; // 12345.67
  customer_id?: string; // optional
  base_url?: string; // optional, для return URLs
}

serve(async (req) => {
  console.log('=== WebPay Create Payment Function ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Timestamp:', new Date().toISOString());

  // CORS preflight
  if (req.method === 'OPTIONS') {
    console.log('OPTIONS request - returning CORS headers');
    return new Response('ok', { headers: corsHeaders });
  }

  // Только POST
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed. Use POST.' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  try {
    // Читаем секреты
    const storeId = Deno.env.get('WEBPAY_STORE_ID');
    const secretKey = Deno.env.get('WEBPAY_SECRET_KEY');
    const testMode = Deno.env.get('WEBPAY_TEST_MODE');
    const currencyId = Deno.env.get('WEBPAY_CURRENCY_ID');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');

    console.log('Secrets check:', {
      storeId: !!storeId,
      secretKey: !!secretKey,
      testMode: testMode,
      currencyId: currencyId,
      supabaseUrl: !!supabaseUrl,
    });

    // Валидация секретов
    if (!storeId || !secretKey || !currencyId || !supabaseUrl) {
      const missing = [];
      if (!storeId) missing.push('WEBPAY_STORE_ID');
      if (!secretKey) missing.push('WEBPAY_SECRET_KEY');
      if (!currencyId) missing.push('WEBPAY_CURRENCY_ID');
      if (!supabaseUrl) missing.push('SUPABASE_URL');

      console.error('Missing required secrets:', missing);
      return new Response(
        JSON.stringify({ 
          error: `Missing required secrets: ${missing.join(', ')}` 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Парсим тело запроса
    let body: CreatePaymentRequest;
    try {
      body = await req.json();
      console.log('Request body:', {
        ticket_id: body.ticket_id,
        order_number: body.order_number,
        total_price: body.total_price,
        has_customer_id: !!body.customer_id,
        has_base_url: !!body.base_url,
      });
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Валидация обязательных полей
    if (!body.ticket_id || !body.order_number || body.total_price === undefined) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: ticket_id, order_number, total_price' 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Валидация total_price
    if (typeof body.total_price !== 'number' || body.total_price <= 0) {
      return new Response(
        JSON.stringify({ error: 'total_price must be a positive number' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Определяем base URL для return URLs
    let baseUrl = body.base_url;
    if (!baseUrl) {
      // Пытаемся взять из Origin или Referer
      const origin = req.headers.get('Origin');
      const referer = req.headers.get('Referer');
      baseUrl = origin || referer || 'http://localhost:5173';
    }

    // Убираем trailing slash
    baseUrl = baseUrl.replace(/\/$/, '');

    console.log('Base URL:', baseUrl);

    // Генерируем wsb_seed (крипто-рандом строка)
    const wsbSeed = crypto.randomUUID().replace(/-/g, '').substring(0, 32);

    // Форматируем total_price (строго 2 знака после запятой, точка как разделитель)
    const wsbTotal = body.total_price.toFixed(2);

    // Определяем wsb_test (0 или 1)
    const isTestMode = parseBoolLike(testMode) ?? false;
    const wsbTest = isTestMode ? '1' : '0';

    // Определяем URL для notify
    // Извлекаем project ID из SUPABASE_URL (https://xxxxx.supabase.co)
    const urlMatch = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/);
    if (!urlMatch) {
      throw new Error('Invalid SUPABASE_URL format');
    }
    const projectId = urlMatch[1];
    const notifyUrl = `https://${projectId}.supabase.co/functions/v1/webpay-notify`;

    console.log('Notify URL:', notifyUrl);

    // Формируем поля WebPay v2
    const webpayFields: Record<string, string> = {
      wsb_version: '2',
      wsb_storeid: storeId,
      wsb_order_num: body.order_number,
      wsb_currency_id: currencyId,
      wsb_total: wsbTotal,
      wsb_seed: wsbSeed,
      wsb_test: wsbTest,
      wsb_operation_type: 'payment', // обязательно
      wsb_return_url: `${baseUrl}/payment/success?order=${encodeURIComponent(body.order_number)}`,
      wsb_cancel_return_url: `${baseUrl}/payment/cancel?order=${encodeURIComponent(body.order_number)}`,
      wsb_notify_url: notifyUrl,
    };

    // Добавляем customer_id если есть
    if (body.customer_id) {
      webpayFields.wsb_customer_id = body.customer_id;
    }

    // Создаём подпись
    const signature = await createInitSignatureV2({
      wsb_seed: wsbSeed,
      wsb_storeid: storeId,
      wsb_customer_id: body.customer_id, // опционально
      wsb_order_num: body.order_number,
      wsb_test: wsbTest,
      wsb_currency_id: currencyId,
      wsb_total: wsbTotal,
      wsb_operation_type: 'payment',
      secret_key: secretKey,
    });

    webpayFields.wsb_signature = signature;

    console.log('WebPay fields created:', {
      wsb_version: webpayFields.wsb_version,
      wsb_storeid: webpayFields.wsb_storeid,
      wsb_order_num: webpayFields.wsb_order_num,
      wsb_total: webpayFields.wsb_total,
      wsb_test: webpayFields.wsb_test,
      wsb_operation_type: webpayFields.wsb_operation_type,
      has_signature: !!webpayFields.wsb_signature,
    });

    // Определяем action URL (sandbox или production)
    const actionUrl = isTestMode
      ? 'https://securesandbox.webpay.by'
      : 'https://payment.webpay.by'; // НЕ secure.webpay.by

    // Возвращаем данные для формы (stateless, не обновляем БД)
    return new Response(
      JSON.stringify({
        action: actionUrl,
        fields: webpayFields,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in webpay-create:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Internal server error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
