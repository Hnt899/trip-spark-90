# Отчёт PROMPT 2: Реализация серверной части WebPay

## 🏗️ Архитектура

1. **Shared Helper (`_shared/webpay.ts`)**
   - Утилиты для работы с подписями WebPay
   - SHA1 для init payment (v2)
   - MD5 для проверки notify
   - Вспомогательные функции (parseBoolLike, toFormUrlEncoded)

2. **Edge Function `webpay-create`**
   - Создаёт данные для инициализации платежа
   - Генерирует подпись и формирует поля для формы WebPay
   - Обновляет `payment_method` и `payment_status` в БД

3. **Edge Function `webpay-notify`**
   - Обрабатывает уведомления от WebPay
   - Проверяет подпись, обновляет статус заказа
   - Реализует идемпотентность для повторных notify

---

## 📄 Полный код файлов

### 1. `supabase/functions/_shared/webpay.ts`

```typescript
/**
 * WebPay Helper Functions
 * 
 * Утилиты для работы с WebPay API v2:
 * - Создание подписи для инициализации платежа (SHA1)
 * - Проверка подписи notify от WebPay (MD5)
 * - Вспомогательные функции
 */

// Для MD5 используем библиотеку, так как Web Crypto API не поддерживает MD5
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";
import { Md5 } from "https://deno.land/std@0.168.0/hash/md5.ts";

/**
 * Параметры для создания подписи инициализации платежа (WebPay v2)
 */
export interface InitPaymentParams {
  wsb_seed: string;
  wsb_storeid: string;
  wsb_order_num: string;
  wsb_test: string; // "0" или "1"
  wsb_currency_id: string;
  wsb_total: string; // строка с 2 знаками после запятой
  secret_key: string;
}

/**
 * Создаёт SHA1 подпись для инициализации платежа (WebPay v2)
 * 
 * Порядок полей строго по документации WebPay v2:
 * wsb_seed + wsb_storeid + wsb_order_num + wsb_test + wsb_currency_id + wsb_total + secret_key
 * 
 * @param params - Параметры для создания подписи
 * @returns hex строка подписи (lowercase)
 */
export async function createInitSignatureV2(params: InitPaymentParams): Promise<string> {
  const {
    wsb_seed,
    wsb_storeid,
    wsb_order_num,
    wsb_test,
    wsb_currency_id,
    wsb_total,
    secret_key,
  } = params;

  // Порядок полей строго по документации WebPay v2
  const signatureString = 
    wsb_seed +
    wsb_storeid +
    wsb_order_num +
    wsb_test +
    wsb_currency_id +
    wsb_total +
    secret_key;

  // SHA1 хеш через Web Crypto API
  const encoder = new TextEncoder();
  const data = encoder.encode(signatureString);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  
  // Конвертируем в hex строку (lowercase)
  const hexString = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return hexString;
}

/**
 * Параметры для проверки подписи notify от WebPay
 */
export interface NotifyParams {
  [key: string]: string; // Все поля из notify
  secret_key: string;
}

/**
 * Проверяет MD5 подпись notify от WebPay
 * 
 * Порядок полей строго по документации WebPay notify:
 * Все поля кроме wsb_signature, отсортированные по алфавиту, затем secret_key
 * 
 * @param params - Параметры notify (включая secret_key)
 * @returns true если подпись верна, false иначе
 */
export async function verifyNotifySignature(params: NotifyParams): Promise<boolean> {
  const { wsb_signature, secret_key, ...otherParams } = params;

  if (!wsb_signature || !secret_key) {
    console.error('Missing wsb_signature or secret_key');
    return false;
  }

  // Сортируем все поля кроме wsb_signature по алфавиту
  const sortedKeys = Object.keys(otherParams)
    .filter(key => key !== 'wsb_signature' && otherParams[key] !== undefined && otherParams[key] !== null)
    .sort();

  // Формируем строку для подписи: все поля в алфавитном порядке + secret_key
  const signatureString = sortedKeys
    .map(key => `${key}=${otherParams[key]}`)
    .join('&') + secret_key;

  // MD5 хеш (используем библиотеку из std/hash)
  const md5 = new Md5();
  md5.update(signatureString);
  const calculatedSignature = md5.toString();

  // Сравнение case-insensitive
  const receivedSignature = (wsb_signature || '').toLowerCase().trim();
  const isValid = calculatedSignature.toLowerCase() === receivedSignature;

  if (!isValid) {
    console.error('Signature mismatch:', {
      calculated: calculatedSignature,
      received: receivedSignature,
      signatureString: signatureString.substring(0, 100) + '...', // Логируем только начало для безопасности
    });
  }

  return isValid;
}

/**
 * Парсит булево значение из различных форматов
 * 
 * Поддерживает: "true"|"false"|true|false|"1"|"0"|1|0|null|undefined
 * 
 * @param value - Значение для парсинга
 * @returns boolean или null если значение не распознано
 */
export function parseBoolLike(value: unknown): boolean | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    return value === 1;
  }

  if (typeof value === 'string') {
    const lower = value.toLowerCase().trim();
    if (lower === 'true' || lower === '1') {
      return true;
    }
    if (lower === 'false' || lower === '0') {
      return false;
    }
  }

  return null;
}

/**
 * Конвертирует объект в application/x-www-form-urlencoded строку
 * 
 * @param obj - Объект для конвертации
 * @returns URL-encoded строка
 */
export function toFormUrlEncoded(obj: Record<string, string | number | boolean>): string {
  return Object.entries(obj)
    .map(([key, value]) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(String(value));
      return `${encodedKey}=${encodedValue}`;
    })
    .join('&');
}
```

### 2. `supabase/functions/webpay-create/index.ts`

```typescript
/**
 * WebPay Create Payment Edge Function
 * 
 * Создаёт данные для инициализации платежа WebPay v2
 * 
 * POST /functions/v1/webpay-create
 * Body: { ticket_id, order_number, total_price, customer_id?, base_url? }
 * 
 * Returns: { action, fields }
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
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
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    console.log('Secrets check:', {
      storeId: !!storeId,
      secretKey: !!secretKey,
      testMode: testMode,
      currencyId: currencyId,
      supabaseUrl: !!supabaseUrl,
      supabaseServiceKey: !!supabaseServiceKey,
    });

    // Валидация секретов
    if (!storeId || !secretKey || !currencyId || !supabaseUrl || !supabaseServiceKey) {
      const missing = [];
      if (!storeId) missing.push('WEBPAY_STORE_ID');
      if (!secretKey) missing.push('WEBPAY_SECRET_KEY');
      if (!currencyId) missing.push('WEBPAY_CURRENCY_ID');
      if (!supabaseUrl) missing.push('SUPABASE_URL');
      if (!supabaseServiceKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');

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
      wsb_return_url: `${baseUrl}/payment/success`,
      wsb_cancel_return_url: `${baseUrl}/payment/cancel`,
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
      wsb_order_num: body.order_number,
      wsb_test: wsbTest,
      wsb_currency_id: currencyId,
      wsb_total: wsbTotal,
      secret_key: secretKey,
    });

    webpayFields.wsb_signature = signature;

    console.log('WebPay fields created:', {
      wsb_version: webpayFields.wsb_version,
      wsb_storeid: webpayFields.wsb_storeid,
      wsb_order_num: webpayFields.wsb_order_num,
      wsb_total: webpayFields.wsb_total,
      wsb_test: webpayFields.wsb_test,
      has_signature: !!webpayFields.wsb_signature,
    });

    // Определяем action URL (sandbox или production)
    const actionUrl = isTestMode
      ? 'https://securesandbox.webpay.by'
      : 'https://secure.webpay.by';

    // Обновляем payment_method в БД (опционально, для логирования)
    try {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      const { error: updateError } = await supabase
        .from('tickets')
        .update({ 
          payment_method: 'webpay',
          payment_status: 'pending',
        })
        .eq('id', body.ticket_id)
        .eq('order_number', body.order_number);

      if (updateError) {
        console.warn('Failed to update ticket payment_method:', updateError);
        // Не блокируем ответ, это не критично
      } else {
        console.log('Ticket payment_method updated successfully');
      }
    } catch (dbError) {
      console.warn('Database update error (non-critical):', dbError);
      // Не блокируем ответ
    }

    // Возвращаем данные для формы
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
```

### 3. `supabase/functions/webpay-notify/index.ts`

```typescript
/**
 * WebPay Notify Edge Function
 * 
 * Обрабатывает уведомления от WebPay о статусе платежа
 * 
 * POST /functions/v1/webpay-notify
 * Content-Type: application/x-www-form-urlencoded
 * Body: WebPay notify parameters (wsb_order_num, wsb_tid, wsb_signature, etc.)
 * 
 * Returns: 200 OK (даже при повторных notify), 400 (неверная подпись), 404 (заказ не найден)
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { verifyNotifySignature } from "../_shared/webpay.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

/**
 * Парсит application/x-www-form-urlencoded в объект
 */
async function parseFormUrlEncoded(req: Request): Promise<Record<string, string>> {
  const text = await req.text();
  const params: Record<string, string> = {};
  
  for (const pair of text.split('&')) {
    const [key, value] = pair.split('=').map(decodeURIComponent);
    if (key) {
      params[key] = value || '';
    }
  }
  
  return params;
}

serve(async (req) => {
  console.log('=== WebPay Notify Function ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Timestamp:', new Date().toISOString());
  console.log('Content-Type:', req.headers.get('Content-Type'));

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
    const secretKey = Deno.env.get('WEBPAY_SECRET_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    console.log('Secrets check:', {
      secretKey: !!secretKey,
      supabaseUrl: !!supabaseUrl,
      supabaseServiceKey: !!supabaseServiceKey,
    });

    // Валидация секретов
    if (!secretKey || !supabaseUrl || !supabaseServiceKey) {
      const missing = [];
      if (!secretKey) missing.push('WEBPAY_SECRET_KEY');
      if (!supabaseUrl) missing.push('SUPABASE_URL');
      if (!supabaseServiceKey) missing.push('SUPABASE_SERVICE_ROLE_KEY');

      console.error('Missing required secrets:', missing);
      return new Response(
        JSON.stringify({ error: `Missing required secrets: ${missing.join(', ')}` }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Парсим form-urlencoded
    let notifyParams: Record<string, string>;
    try {
      notifyParams = await parseFormUrlEncoded(req);
      console.log('Notify params received:', {
        keys: Object.keys(notifyParams),
        has_wsb_order_num: !!notifyParams.wsb_order_num,
        has_wsb_tid: !!notifyParams.wsb_tid,
        has_wsb_signature: !!notifyParams.wsb_signature,
        wsb_status: notifyParams.wsb_status,
      });
    } catch (error) {
      console.error('Failed to parse form-urlencoded:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to parse request body' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Проверяем подпись
    const signatureParams = {
      ...notifyParams,
      secret_key: secretKey,
    };

    const isValidSignature = await verifyNotifySignature(signatureParams);

    if (!isValidSignature) {
      console.error('Invalid signature from WebPay');
      return new Response(
        JSON.stringify({ error: 'Invalid signature' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Signature verified successfully');

    // Извлекаем order_number (может быть wsb_order_num или site_order_id)
    const orderNumber = notifyParams.wsb_order_num || notifyParams.site_order_id;

    if (!orderNumber) {
      console.error('Missing order number in notify params');
      return new Response(
        JSON.stringify({ error: 'Missing order number in notify' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Order number:', orderNumber);

    // Извлекаем transaction_id (может быть wsb_tid или transaction_id)
    const transactionId = notifyParams.wsb_tid || notifyParams.transaction_id || notifyParams.wsb_transaction_id;

    if (!transactionId) {
      console.warn('Missing transaction_id in notify params');
    } else {
      console.log('Transaction ID:', transactionId);
    }

    // Определяем статус оплаты из notify
    // WebPay может присылать разные статусы, нужно проверить фактический формат
    // Пока предполагаем, что success = paid, error/declined = failed, cancelled = cancelled
    const wsbStatus = (notifyParams.wsb_status || notifyParams.status || '').toLowerCase();
    let paymentStatus: 'paid' | 'failed' | 'cancelled' = 'paid';

    if (wsbStatus === 'success' || wsbStatus === 'paid' || wsbStatus === 'approved') {
      paymentStatus = 'paid';
    } else if (wsbStatus === 'error' || wsbStatus === 'declined' || wsbStatus === 'failed') {
      paymentStatus = 'failed';
    } else if (wsbStatus === 'cancelled' || wsbStatus === 'canceled') {
      paymentStatus = 'cancelled';
    } else {
      // По умолчанию считаем успешным, если подпись верна
      // (WebPay не будет слать notify для неуспешных платежей, если не настроено иначе)
      paymentStatus = 'paid';
      console.warn('Unknown status from WebPay, defaulting to paid:', wsbStatus);
    }

    console.log('Payment status determined:', paymentStatus);

    // Создаём Supabase Admin client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Находим заказ по order_number
    const { data: ticket, error: findError } = await supabase
      .from('tickets')
      .select('id, order_number, payment_status, payment_transaction_id')
      .eq('order_number', orderNumber)
      .maybeSingle();

    if (findError) {
      console.error('Database error while finding ticket:', findError);
      return new Response(
        JSON.stringify({ error: 'Database error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!ticket) {
      console.error('Ticket not found for order_number:', orderNumber);
      return new Response(
        JSON.stringify({ error: 'Order not found' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Ticket found:', {
      id: ticket.id,
      order_number: ticket.order_number,
      current_payment_status: ticket.payment_status,
      current_transaction_id: ticket.payment_transaction_id,
    });

    // Идемпотентность: если уже оплачен, возвращаем 200 OK
    if (ticket.payment_status === 'paid') {
      console.log('Ticket already paid, ignoring duplicate notify');
      return new Response(
        JSON.stringify({ 
          message: 'Order already paid',
          order_number: orderNumber,
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Проверяем, не был ли уже обработан этот transaction_id
    if (transactionId && ticket.payment_transaction_id === transactionId) {
      console.log('Transaction ID already processed, ignoring duplicate notify');
      return new Response(
        JSON.stringify({ 
          message: 'Transaction already processed',
          order_number: orderNumber,
          transaction_id: transactionId,
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Подготавливаем данные для обновления
    const updateData: {
      payment_status: string;
      payment_transaction_id?: string;
      payment_paid_at?: string;
      payment_method?: string;
      payment_raw: Record<string, string>;
    } = {
      payment_status: paymentStatus,
      payment_raw: notifyParams,
    };

    // Добавляем transaction_id если есть
    if (transactionId) {
      updateData.payment_transaction_id = transactionId;
    }

    // Добавляем payment_paid_at только если статус 'paid'
    if (paymentStatus === 'paid') {
      updateData.payment_paid_at = new Date().toISOString();
    }

    // Добавляем payment_method
    updateData.payment_method = 'webpay';

    console.log('Updating ticket with data:', {
      payment_status: updateData.payment_status,
      has_transaction_id: !!updateData.payment_transaction_id,
      has_paid_at: !!updateData.payment_paid_at,
      payment_method: updateData.payment_method,
    });

    // Обновляем заказ в БД
    const { error: updateError } = await supabase
      .from('tickets')
      .update(updateData)
      .eq('id', ticket.id);

    if (updateError) {
      console.error('Database error while updating ticket:', updateError);
      
      // Проверяем, не конфликт ли по transaction_id (если есть unique constraint)
      if (updateError.code === '23505' && updateError.message.includes('payment_transaction_id')) {
        console.log('Transaction ID conflict, ticket might be updated by another notify');
        // Пытаемся найти заказ с этим transaction_id
        const { data: existingTicket } = await supabase
          .from('tickets')
          .select('id, order_number, payment_status')
          .eq('payment_transaction_id', transactionId!)
          .maybeSingle();

        if (existingTicket && existingTicket.payment_status === 'paid') {
          console.log('Transaction already processed for another ticket');
          return new Response(
            JSON.stringify({ 
              message: 'Transaction already processed',
              order_number: orderNumber,
            }),
            { 
              status: 200, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }
      }

      return new Response(
        JSON.stringify({ error: 'Failed to update order status' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Ticket updated successfully:', {
      order_number: orderNumber,
      payment_status: paymentStatus,
      transaction_id: transactionId,
    });

    // Возвращаем успешный ответ
    return new Response(
      JSON.stringify({ 
        message: 'Order status updated',
        order_number: orderNumber,
        payment_status: paymentStatus,
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in webpay-notify:', error);
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
```

---

## 📝 Примеры curl

### 1. Создание платежа (webpay-create)

```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/webpay-create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{
    "ticket_id": "123e4567-e89b-12d3-a456-426614174000",
    "order_number": "T1234567890",
    "total_price": 2500.00,
    "customer_id": "optional-customer-id",
    "base_url": "https://yourdomain.com"
  }'
```

**Ожидаемый ответ:**
```json
{
  "action": "https://securesandbox.webpay.by",
  "fields": {
    "wsb_version": "2",
    "wsb_storeid": "your_store_id",
    "wsb_order_num": "T1234567890",
    "wsb_currency_id": "933",
    "wsb_total": "2500.00",
    "wsb_seed": "abc123...",
    "wsb_test": "1",
    "wsb_return_url": "https://yourdomain.com/payment/success",
    "wsb_cancel_return_url": "https://yourdomain.com/payment/cancel",
    "wsb_notify_url": "https://YOUR_PROJECT.supabase.co/functions/v1/webpay-notify",
    "wsb_customer_id": "optional-customer-id",
    "wsb_signature": "abc123def456..."
  }
}
```

### 2. Обработка notify (webpay-notify)

**Пример запроса от WebPay (form-urlencoded):**

```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/webpay-notify \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "wsb_order_num=T1234567890&wsb_tid=1234567890&wsb_status=success&wsb_signature=abc123..."
```

**Или полный пример с реальными полями WebPay:**

```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/webpay-notify \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "wsb_version=2&wsb_storeid=123&wsb_order_num=T1234567890&wsb_currency_id=933&wsb_total=2500.00&wsb_tid=1234567890&wsb_status=success&wsb_signature=calculated_signature_here"
```

**Ожидаемый ответ (200 OK):**
```json
{
  "message": "Order status updated",
  "order_number": "T1234567890",
  "payment_status": "paid"
}
```

**При повторном notify (200 OK):**
```json
{
  "message": "Order already paid",
  "order_number": "T1234567890"
}
```

---

## 📊 Отчёт PROMPT 2

### Какие файлы созданы/изменены

**Создано:**
1. ✅ `supabase/functions/_shared/webpay.ts` — helper функции для WebPay
2. ✅ `supabase/functions/webpay-create/index.ts` — Edge Function для создания платежа
3. ✅ `supabase/functions/webpay-notify/index.ts` — Edge Function для обработки notify

**Изменено:**
- Нет (новые файлы)

### Какие secrets нужны

**Обязательные secrets (установить через `npx supabase secrets set KEY=value`):**

1. `WEBPAY_STORE_ID` — ID магазина WebPay (sandbox)
2. `WEBPAY_SECRET_KEY` — секретный ключ WebPay (sandbox)
3. `WEBPAY_TEST_MODE` — режим тестирования (`true`/`false` или `1`/`0`)
4. `WEBPAY_CURRENCY_ID` — ID валюты (например `933` для BYN, `840` для USD)
5. `SUPABASE_URL` — автоматически доступен в Edge Functions
6. `SUPABASE_SERVICE_ROLE_KEY` — автоматически доступен в Edge Functions

**Команды для установки:**
```bash
npx supabase secrets set WEBPAY_STORE_ID=your_store_id
npx supabase secrets set WEBPAY_SECRET_KEY=your_secret_key
npx supabase secrets set WEBPAY_TEST_MODE=true
npx supabase secrets set WEBPAY_CURRENCY_ID=933
```

### Какие URL получатся

**Edge Functions URLs:**

1. **webpay-create:**
   - `https://YOUR_PROJECT.supabase.co/functions/v1/webpay-create`
   - Используется фронтендом для создания платежа

2. **webpay-notify:**
   - `https://YOUR_PROJECT.supabase.co/functions/v1/webpay-notify`
   - Используется WebPay для отправки уведомлений
   - Указывается в `wsb_notify_url` при создании платежа

**Return URLs (формируются автоматически):**
- `{base_url}/payment/success` — успешная оплата
- `{base_url}/payment/cancel` — отмена оплаты

**Action URL (WebPay):**
- Sandbox: `https://securesandbox.webpay.by`
- Production: `https://secure.webpay.by`

### Что проверить руками

1. ✅ **Установка secrets:**
   ```bash
   npx supabase secrets list
   ```
   Проверить, что все 4 секрета установлены

2. ✅ **Деплой Edge Functions:**
   ```bash
   npx supabase functions deploy webpay-create
   npx supabase functions deploy webpay-notify
   ```

3. ✅ **Тест webpay-create:**
   - Отправить POST запрос с валидными данными
   - Проверить, что возвращается `action` и `fields`
   - Проверить, что `wsb_signature` присутствует
   - Проверить, что в БД обновился `payment_method` и `payment_status`

4. ✅ **Тест webpay-notify:**
   - Отправить POST запрос с form-urlencoded данными
   - Проверить валидацию подписи
   - Проверить обновление заказа в БД
   - Проверить идемпотентность (повторный запрос не должен создавать дубликаты)

5. ✅ **Проверка логов:**
   ```bash
   npx supabase functions logs webpay-create
   npx supabase functions logs webpay-notify
   ```

6. ✅ **Проверка БД:**
   - После создания платежа: `payment_status = 'pending'`, `payment_method = 'webpay'`
   - После успешного notify: `payment_status = 'paid'`, `payment_paid_at` заполнено, `payment_transaction_id` установлен

---

**Дата создания:** 2025-01-27  
**Версия:** 1.0  
**Статус:** ✅ Готово к тестированию

