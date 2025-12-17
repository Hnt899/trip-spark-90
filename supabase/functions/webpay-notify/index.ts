/**
 * WebPay Notify Edge Function
 * 
 * Обрабатывает уведомления от WebPay о статусе платежа
 * 
 * POST /functions/v1/webpay-notify
 * Content-Type: application/x-www-form-urlencoded
 * Body: WebPay notify parameters (site_order_id, transaction_id, wsb_signature, etc.)
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

    // Парсим form-urlencoded через URLSearchParams
    let notifyParams: Record<string, string>;
    try {
      const bodyText = await req.text();
      const params = new URLSearchParams(bodyText);
      notifyParams = Object.fromEntries(params.entries());
      
      console.log('Notify params received:', {
        keys: Object.keys(notifyParams),
        has_site_order_id: !!notifyParams.site_order_id,
        has_wsb_order_num: !!notifyParams.wsb_order_num,
        has_transaction_id: !!notifyParams.transaction_id,
        has_wsb_signature: !!notifyParams.wsb_signature,
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

    // Извлекаем order_number (приоритет: site_order_id, затем wsb_order_num)
    const orderNumber = notifyParams.site_order_id || notifyParams.wsb_order_num;

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

    // Извлекаем transaction_id
    const transactionId = notifyParams.transaction_id || notifyParams.wsb_tid;

    if (!transactionId) {
      console.warn('Missing transaction_id in notify params');
    } else {
      console.log('Transaction ID:', transactionId);
    }

    // Определяем статус оплаты из notify
    // Используем только документированные значения WebPay
    // Если notify пришёл и подпись валидна - это успешная оплата (paid)
    // Если есть явное поле success/fail - используем его
    let paymentStatus: 'paid' | 'failed' | 'cancelled' = 'paid';
    
    // Проверяем явные статусы из документации WebPay
    const statusField = notifyParams.status || notifyParams.payment_status;
    if (statusField) {
      const statusLower = statusField.toLowerCase();
      if (statusLower === 'success' || statusLower === 'paid' || statusLower === 'approved') {
        paymentStatus = 'paid';
      } else if (statusLower === 'failed' || statusLower === 'error' || statusLower === 'declined') {
        paymentStatus = 'failed';
      } else if (statusLower === 'cancelled' || statusLower === 'canceled') {
        paymentStatus = 'cancelled';
      }
      // Если статус не распознан - оставляем 'paid' (по умолчанию для валидного notify)
    }
    // Если нет явного статуса - считаем успешным (WebPay обычно шлёт notify только для успешных платежей)

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
