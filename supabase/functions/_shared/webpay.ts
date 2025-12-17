/**
 * WebPay Helper Functions
 * 
 * Утилиты для работы с WebPay API v2:
 * - Создание подписи для инициализации платежа (SHA1)
 * - Проверка подписи notify от WebPay (MD5)
 * - Вспомогательные функции
 */

import { encodeHex } from "https://deno.land/std@0.224.0/encoding/hex.ts";
import md5 from "https://esm.sh/md5@2.3.0";

/**
 * Параметры для создания подписи инициализации платежа (WebPay v2)
 */
export interface InitPaymentParams {
  wsb_seed: string;
  wsb_storeid: string;
  wsb_customer_id?: string; // опционально
  wsb_order_num: string;
  wsb_test: string; // "0" или "1"
  wsb_currency_id: string;
  wsb_total: string; // строка с 2 знаками после запятой
  wsb_operation_type: "payment"; // обязательно
  secret_key: string;
}

/**
 * Вычисляет SHA-1 хеш и возвращает hex строку
 * 
 * @param data - Строка для хеширования
 * @returns hex строка (lowercase)
 */
async function sha1Hex(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-1", dataBuffer);
  return encodeHex(new Uint8Array(hashBuffer));
}

/**
 * Вычисляет MD5 хеш и возвращает hex строку
 * 
 * Web Crypto API не поддерживает MD5, поэтому используем библиотеку из npm
 * 
 * @param data - Строка для хеширования
 * @returns hex строка (lowercase)
 */
async function md5Hex(data: string): Promise<string> {
  // Используем библиотеку md5 из npm через esm.sh
  // Функция синхронная, но делаем async для единообразия API
  return md5(data);
}

/**
 * Создаёт SHA1 подпись для инициализации платежа (WebPay v2)
 * 
 * Порядок полей строго по документации WebPay v2:
 * wsb_seed + wsb_storeid + wsb_customer_id + wsb_order_num + wsb_test + wsb_currency_id + wsb_total + wsb_operation_type + secret_key
 * 
 * Примечание: wsb_customer_id включается в подпись, если указан. Если нет - используется пустая строка.
 * 
 * @param params - Параметры для создания подписи
 * @returns hex строка подписи (lowercase)
 */
export async function createInitSignatureV2(params: InitPaymentParams): Promise<string> {
  const {
    wsb_seed,
    wsb_storeid,
    wsb_customer_id = '', // если не указан - пустая строка
    wsb_order_num,
    wsb_test,
    wsb_currency_id,
    wsb_total,
    wsb_operation_type,
    secret_key,
  } = params;

  // Порядок полей строго по документации WebPay v2
  // Конкатенация ЗНАЧЕНИЙ (не key=value!)
  const signatureString = 
    wsb_seed +
    wsb_storeid +
    wsb_customer_id +
    wsb_order_num +
    wsb_test +
    wsb_currency_id +
    wsb_total +
    wsb_operation_type +
    secret_key;

  return await sha1Hex(signatureString);
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
 * Порядок полей строго по документации WebPay notify (конкатенация ЗНАЧЕНИЙ):
 * batch_timestamp + currency_id + amount + payment_method + order_id + site_order_id + transaction_id + payment_type + rrn + card (если есть) + secret_key
 * 
 * Если какого-то поля нет в notify - используется пустая строка.
 * Поле card включается только если присутствует в notify.
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

  // Порядок полей строго по документации WebPay notify
  // Конкатенация ЗНАЧЕНИЙ (не key=value, не сортировка!)
  const fieldOrder = [
    'batch_timestamp',
    'currency_id',
    'amount',
    'payment_method',
    'order_id',
    'site_order_id',
    'transaction_id',
    'payment_type',
    'rrn',
  ];

  // Собираем строку для подписи в фиксированном порядке
  let signatureString = fieldOrder
    .map(fieldName => otherParams[fieldName] || '') // если поля нет - пустая строка
    .join('');

  // Добавляем card если есть (после rrn, перед secret_key)
  if (otherParams.card) {
    signatureString += otherParams.card;
  }

  signatureString += secret_key;

  // MD5 хеш через md5Hex
  const calculatedSignature = await md5Hex(signatureString);

  // Сравнение case-insensitive
  const receivedSignature = (wsb_signature || '').toLowerCase().trim();
  const isValid = calculatedSignature.toLowerCase() === receivedSignature;

  if (!isValid) {
    console.error('Signature mismatch:', {
      calculated: calculatedSignature,
      received: receivedSignature,
      fieldOrder: fieldOrder,
      availableFields: Object.keys(otherParams),
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
