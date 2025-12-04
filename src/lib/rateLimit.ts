import { logger } from './logger';
import { supabase } from './supabase';

/**
 * Интерфейс для хранения попыток
 */
interface RateLimitEntry {
  count: number;
  resetAt: number;
  blockedUntil?: number;
}

/**
 * Rate Limiting на клиенте
 * 
 * ВАЖНО: Это базовая защита на клиенте. В продакшене нужен rate limiting на сервере!
 * Клиентская защита легко обходится, но помогает от случайных злоупотреблений.
 */
class RateLimiter {
  private storage: Map<string, RateLimitEntry> = new Map();
  private readonly CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 минут

  constructor() {
    // Периодическая очистка истекших записей
    setInterval(() => this.cleanup(), this.CLEANUP_INTERVAL);
  }

  /**
   * Проверяет, не превышен ли лимит
   * @param key - Уникальный ключ (email, phone, userId и т.д.)
   * @param maxAttempts - Максимальное количество попыток
   * @param windowMs - Окно времени в миллисекундах
   * @param blockDurationMs - Длительность блокировки после превышения (опционально)
   * @returns { allowed: boolean, remaining: number, resetAt: number, error?: string }
   */
  checkLimit(
    key: string,
    maxAttempts: number,
    windowMs: number,
    blockDurationMs?: number
  ): { allowed: boolean; remaining: number; resetAt: number; error?: string } {
    const normalizedKey = key.toLowerCase().trim();
    const now = Date.now();
    const entry = this.storage.get(normalizedKey);

    // Проверяем блокировку
    if (entry?.blockedUntil && entry.blockedUntil > now) {
      const minutesLeft = Math.ceil((entry.blockedUntil - now) / 60000);
      return {
        allowed: false,
        remaining: 0,
        resetAt: entry.blockedUntil,
        error: `Превышен лимит попыток. Попробуйте через ${minutesLeft} ${minutesLeft === 1 ? 'минуту' : 'минут'}.`
      };
    }

    // Если запись истекла или не существует, создаем новую
    if (!entry || entry.resetAt <= now) {
      this.storage.set(normalizedKey, {
        count: 1,
        resetAt: now + windowMs
      });
      return {
        allowed: true,
        remaining: maxAttempts - 1,
        resetAt: now + windowMs
      };
    }

    // Увеличиваем счетчик
    entry.count++;

    // Проверяем превышение лимита
    if (entry.count > maxAttempts) {
      if (blockDurationMs) {
        entry.blockedUntil = now + blockDurationMs;
      }
      
      // Логируем превышение
      logger.logSecurityEvent(
        'Rate limit exceeded',
        undefined,
        { key: normalizedKey, attempts: entry.count, maxAttempts, action: 'rate_limit_check' }
      );

      const minutesLeft = blockDurationMs 
        ? Math.ceil(blockDurationMs / 60000)
        : Math.ceil((entry.resetAt - now) / 60000);

      return {
        allowed: false,
        remaining: 0,
        resetAt: entry.blockedUntil || entry.resetAt,
        error: `Превышен лимит попыток (${maxAttempts} в ${Math.ceil(windowMs / 60000)} ${Math.ceil(windowMs / 60000) === 1 ? 'минуту' : 'минут'}). ${blockDurationMs ? `Заблокировано на ${minutesLeft} ${minutesLeft === 1 ? 'минуту' : 'минут'}.` : 'Попробуйте позже.'}`
      };
    }

    return {
      allowed: true,
      remaining: maxAttempts - entry.count,
      resetAt: entry.resetAt
    };
  }

  /**
   * Сбрасывает счетчик для ключа (при успешной операции)
   */
  reset(key: string): void {
    const normalizedKey = key.toLowerCase().trim();
    this.storage.delete(normalizedKey);
  }

  /**
   * Очищает истекшие записи
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.storage.entries()) {
      if (entry.resetAt <= now && (!entry.blockedUntil || entry.blockedUntil <= now)) {
        this.storage.delete(key);
      }
    }
  }

  /**
   * Получает информацию о текущем лимите
   */
  getInfo(key: string): { count: number; remaining: number; resetAt: number } | null {
    const normalizedKey = key.toLowerCase().trim();
    const entry = this.storage.get(normalizedKey);
    if (!entry) return null;

    return {
      count: entry.count,
      remaining: 0, // Нужно знать maxAttempts для расчета
      resetAt: entry.resetAt
    };
  }
}

// Создаем глобальный экземпляр
const rateLimiter = new RateLimiter();

/**
 * Константы для rate limiting
 */
export const RATE_LIMITS = {
  // Вход по паролю: 5 попыток в 15 минут, блокировка на 30 минут
  LOGIN_PASSWORD: {
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 минут
    blockDurationMs: 30 * 60 * 1000 // 30 минут блокировки
  },
  
  // Отправка OTP/SMS: 3 кода в час
  SEND_OTP: {
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000, // 1 час
    blockDurationMs: 60 * 60 * 1000 // 1 час блокировки
  },
  
  // Смена пароля: 3 попытки в час
  UPDATE_PASSWORD: {
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000, // 1 час
    blockDurationMs: 60 * 60 * 1000 // 1 час блокировки
  },
  
  // Включение/отключение 2FA: 3 попытки в час
  TOGGLE_2FA: {
    maxAttempts: 3,
    windowMs: 60 * 60 * 1000, // 1 час
    blockDurationMs: 60 * 60 * 1000 // 1 час блокировки
  },
  
  // Верификация OTP: 10 попыток в 15 минут
  VERIFY_OTP: {
    maxAttempts: 10,
    windowMs: 15 * 60 * 1000, // 15 минут
    blockDurationMs: 15 * 60 * 1000 // 15 минут блокировки
  }
};

/**
 * Проверяет rate limit для входа по паролю
 */
export const checkLoginRateLimit = async (emailOrPhone: string): Promise<{ allowed: boolean; error?: string }> => {
  const key = `login:${emailOrPhone}`;
  const limit = RATE_LIMITS.LOGIN_PASSWORD;
  const result = rateLimiter.checkLimit(key, limit.maxAttempts, limit.windowMs, limit.blockDurationMs);
  
  if (!result.allowed) {
    await logger.logSecurityEvent(
      'Login rate limit exceeded',
      undefined,
      { emailOrPhone: emailOrPhone.replace(/(.{2})(.*)(.{2})/, '$1***$3'), attempts: limit.maxAttempts }
    );
  }
  
  return { allowed: result.allowed, error: result.error };
};

/**
 * Проверяет rate limit для отправки OTP
 */
export const checkOTPRateLimit = async (emailOrPhone: string): Promise<{ allowed: boolean; error?: string }> => {
  const key = `otp:${emailOrPhone}`;
  const limit = RATE_LIMITS.SEND_OTP;
  
  // Также проверяем в базе данных (более надежно)
  const normalizedPhone = emailOrPhone.includes('@') 
    ? emailOrPhone.toLowerCase() 
    : emailOrPhone.replace(/\D/g, '');
  
  // Проверяем количество отправленных кодов за последний час
  if (!emailOrPhone.includes('@')) {
    // Для SMS проверяем в таблице verification_codes
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data, error } = await supabase
      .from('verification_codes')
      .select('id')
      .eq('phone', normalizedPhone)
      .gte('created_at', oneHourAgo);
    
    if (!error && data && data.length >= limit.maxAttempts) {
      await logger.logSecurityEvent(
        'OTP rate limit exceeded (database)',
        undefined,
        { phone: normalizedPhone.replace(/(.{3})(.*)(.{2})/, '$1***$3'), count: data.length }
      );
      return {
        allowed: false,
        error: `Превышен лимит отправки кодов (${limit.maxAttempts} в час). Попробуйте позже.`
      };
    }
  }
  
  // Проверяем клиентский лимит
  const result = rateLimiter.checkLimit(key, limit.maxAttempts, limit.windowMs, limit.blockDurationMs);
  
  if (!result.allowed) {
    await logger.logSecurityEvent(
      'OTP rate limit exceeded',
      undefined,
      { emailOrPhone: emailOrPhone.replace(/(.{2})(.*)(.{2})/, '$1***$3'), attempts: limit.maxAttempts }
    );
  }
  
  return { allowed: result.allowed, error: result.error };
};

/**
 * Проверяет rate limit для смены пароля
 */
export const checkPasswordUpdateRateLimit = async (userId: string): Promise<{ allowed: boolean; error?: string }> => {
  const key = `password_update:${userId}`;
  const limit = RATE_LIMITS.UPDATE_PASSWORD;
  const result = rateLimiter.checkLimit(key, limit.maxAttempts, limit.windowMs, limit.blockDurationMs);
  
  if (!result.allowed) {
    await logger.logSecurityEvent(
      'Password update rate limit exceeded',
      userId,
      { attempts: limit.maxAttempts }
    );
  }
  
  return { allowed: result.allowed, error: result.error };
};

/**
 * Проверяет rate limit для включения/отключения 2FA
 */
export const check2FARateLimit = async (userId: string): Promise<{ allowed: boolean; error?: string }> => {
  const key = `2fa_toggle:${userId}`;
  const limit = RATE_LIMITS.TOGGLE_2FA;
  const result = rateLimiter.checkLimit(key, limit.maxAttempts, limit.windowMs, limit.blockDurationMs);
  
  if (!result.allowed) {
    await logger.logSecurityEvent(
      '2FA toggle rate limit exceeded',
      userId,
      { attempts: limit.maxAttempts }
    );
  }
  
  return { allowed: result.allowed, error: result.error };
};

/**
 * Проверяет rate limit для верификации OTP
 */
export const checkOTPVerifyRateLimit = async (emailOrPhone: string): Promise<{ allowed: boolean; error?: string }> => {
  const key = `otp_verify:${emailOrPhone}`;
  const limit = RATE_LIMITS.VERIFY_OTP;
  const result = rateLimiter.checkLimit(key, limit.maxAttempts, limit.windowMs, limit.blockDurationMs);
  
  if (!result.allowed) {
    await logger.logSecurityEvent(
      'OTP verify rate limit exceeded',
      undefined,
      { emailOrPhone: emailOrPhone.replace(/(.{2})(.*)(.{2})/, '$1***$3'), attempts: limit.maxAttempts }
    );
  }
  
  return { allowed: result.allowed, error: result.error };
};

/**
 * Сбрасывает rate limit при успешной операции
 */
export const resetRateLimit = (key: string): void => {
  rateLimiter.reset(key);
};

