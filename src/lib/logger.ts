import { supabase } from './supabase';

/**
 * Уровни логирования
 */
export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  SECURITY = 'security'
}

/**
 * Интерфейс для записи лога
 */
interface LogEntry {
  level: LogLevel;
  message: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  timestamp?: Date;
}

/**
 * Библиотека для логирования событий безопасности
 * 
 * Зачем это нужно:
 * - Отслеживание всех важных событий (входы, ошибки, подозрительная активность)
 * - Аудит безопасности (кто и когда заходил)
 * - Расследование инцидентов
 * - Анализ ошибок и проблем
 */
export const logger = {
  /**
   * Основная функция логирования
   * Сохраняет лог в Supabase таблицу security_logs
   */
  async log(entry: LogEntry): Promise<void> {
    try {
      const logData = {
        level: entry.level,
        message: entry.message,
        user_id: entry.userId || null,
        ip_address: entry.ip || null,
        user_agent: entry.userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : null),
        metadata: entry.metadata || {},
        created_at: (entry.timestamp || new Date()).toISOString()
      };

      // Сохраняем в Supabase
      const { error } = await supabase
        .from('security_logs')
        .insert(logData);

      if (error) {
        // Если не удалось сохранить в БД, выводим в консоль
        console.error('[Logger] Failed to save log:', error);
      }

      // Также выводим в консоль для разработки (только в dev режиме)
      if (import.meta.env.DEV) {
        const emoji = {
          [LogLevel.INFO]: 'ℹ️',
          [LogLevel.WARN]: '⚠️',
          [LogLevel.ERROR]: '❌',
          [LogLevel.SECURITY]: '🔒'
        }[entry.level] || '📝';
        
        console.log(
          `${emoji} [${entry.level.toUpperCase()}] ${entry.message}`,
          entry.metadata || ''
        );
      }
    } catch (err) {
      // В случае критической ошибки просто выводим в консоль
      console.error('[Logger] Critical error:', err);
    }
  },

  /**
   * Логирование попытки входа
   */
  async logLoginAttempt(
    emailOrPhone: string, 
    success: boolean, 
    userId?: string,
    ip?: string
  ): Promise<void> {
    await this.log({
      level: LogLevel.SECURITY,
      message: `Login attempt: ${success ? 'SUCCESS' : 'FAILED'}`,
      userId,
      ip,
      metadata: { 
        emailOrPhone: emailOrPhone.replace(/(.{2})(.*)(.{2})/, '$1***$3'), // Маскируем email/телефон
        success 
      },
      timestamp: new Date()
    });
  },

  /**
   * Логирование события безопасности
   */
  async logSecurityEvent(
    event: string, 
    userId?: string, 
    metadata?: Record<string, any>,
    ip?: string
  ): Promise<void> {
    await this.log({
      level: LogLevel.SECURITY,
      message: event,
      userId,
      ip,
      metadata,
      timestamp: new Date()
    });
  },

  /**
   * Логирование ошибки
   */
  async logError(
    error: string | Error,
    userId?: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    const errorMessage = error instanceof Error ? error.message : error;
    const errorStack = error instanceof Error ? error.stack : undefined;

    await this.log({
      level: LogLevel.ERROR,
      message: errorMessage,
      userId,
      metadata: {
        ...metadata,
        stack: errorStack
      },
      timestamp: new Date()
    });
  },

  /**
   * Логирование предупреждения
   */
  async logWarning(
    message: string,
    userId?: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.log({
      level: LogLevel.WARN,
      message,
      userId,
      metadata,
      timestamp: new Date()
    });
  },

  /**
   * Логирование информационного события
   */
  async logInfo(
    message: string,
    userId?: string,
    metadata?: Record<string, any>
  ): Promise<void> {
    await this.log({
      level: LogLevel.INFO,
      message,
      userId,
      metadata,
      timestamp: new Date()
    });
  }
};

