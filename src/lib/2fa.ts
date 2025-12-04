import { supabase } from './supabase';
import { logger } from './logger';

/**
 * Интерфейс для данных 2FA
 */
export interface TwoFactorAuthData {
  secret: string;
  backup_codes: string[];
  qr_code_url?: string; // URL для QR-кода (генерируется на клиенте)
}

/**
 * Библиотека для работы с двухфакторной аутентификацией (2FA)
 * 
 * Зачем это нужно:
 * - Защита от взлома аккаунта даже при утечке пароля
 * - Повышение уровня безопасности для критичных операций
 * - Соответствие современным стандартам безопасности
 * 
 * Как работает:
 * 1. Пользователь включает 2FA в настройках
 * 2. Генерируется секретный ключ и QR-код
 * 3. Пользователь сканирует QR-код в приложении (Google Authenticator, Authy и т.д.)
 * 4. При входе требуется не только пароль, но и код из приложения
 */
export const twoFactorAuth = {
  /**
   * Генерирует секретный ключ для 2FA
   * В реальном проекте это должно делаться через Edge Function с библиотекой speakeasy
   */
  async generateSecret(userId: string): Promise<TwoFactorAuthData> {
    try {
      const { data, error } = await supabase.rpc('generate_2fa_secret', {
        p_user_id: userId
      });

      if (error) {
        await logger.logError(error, userId, { action: 'generate_2fa_secret' });
        throw error;
      }

      // Генерируем QR-код URL (в реальном проекте используйте библиотеку qrcode)
      // Формат: otpauth://totp/AppName:user@example.com?secret=SECRET&issuer=AppName
      const issuer = 'TuDaSuDa';
      const accountName = userId; // Можно использовать email пользователя
      const qrCodeUrl = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(accountName)}?secret=${data.secret}&issuer=${encodeURIComponent(issuer)}`;

      await logger.logSecurityEvent('2FA secret generated', userId);

      return {
        secret: data.secret,
        backup_codes: data.backup_codes,
        qr_code_url: qrCodeUrl
      };
    } catch (error) {
      await logger.logError(error as Error, userId, { action: 'generate_2fa_secret' });
      throw error;
    }
  },

  /**
   * Проверяет, включена ли 2FA у пользователя
   */
  async isEnabled(userId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.rpc('is_2fa_enabled', {
        p_user_id: userId
      });

      if (error) {
        await logger.logError(error, userId, { action: 'is_2fa_enabled' });
        return false;
      }

      return data || false;
    } catch (error) {
      await logger.logError(error as Error, userId, { action: 'is_2fa_enabled' });
      return false;
    }
  },

  /**
   * Получает данные 2FA пользователя (только статус)
   */
  async get2FAData(userId: string): Promise<{ enabled: boolean } | null> {
    try {
      const { data, error } = await supabase
        .from('user_2fa')
        .select('enabled')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Запись не найдена - 2FA не настроена
          return { enabled: false };
        }
        await logger.logError(error, userId, { action: 'get_2fa_data' });
        return null;
      }

      return {
        enabled: data.enabled || false
      };
    } catch (error) {
      await logger.logError(error as Error, userId, { action: 'get_2fa_data' });
      return null;
    }
  },

  /**
   * Верифицирует TOTP токен через Edge Function
   */
  async verifyToken(userId: string, token: string): Promise<{ valid: boolean; error?: string }> {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
      
      const response = await fetch(`${supabaseUrl}/functions/v1/verify-2fa-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey,
        },
        body: JSON.stringify({ token })
      });

      const data = await response.json();

      if (!response.ok) {
        await logger.logError(new Error(data.error || 'Token verification failed'), userId, { action: 'verify_2fa_token' });
        return { valid: false, error: data.error || 'Ошибка верификации токена' };
      }

      if (data.valid) {
        await logger.logSecurityEvent('2FA token verified', userId);
      } else {
        await logger.logWarning('Invalid 2FA token attempt', userId);
      }

      return { valid: data.valid, error: data.error };
    } catch (error) {
      await logger.logError(error as Error, userId, { action: 'verify_2fa_token' });
      return { valid: false, error: (error as Error).message };
    }
  },

  /**
   * Включает 2FA (код уже проверен через verifyOtp)
   */
  async enable(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Создаем запись в user_2fa, если её нет
      const { error: insertError } = await supabase
        .from('user_2fa')
        .upsert({
          user_id: userId,
          secret: '', // Не используется в упрощенной версии
          enabled: true,
          backup_codes: [],
        }, {
          onConflict: 'user_id'
        });

      if (insertError) {
        // Если ошибка вставки, пробуем обновить через функцию
        const { error } = await supabase.rpc('enable_2fa', {
          p_user_id: userId
        });

        if (error) {
          await logger.logError(error, userId, { action: 'enable_2fa' });
          return { success: false, error: error.message };
        }
      }

      await logger.logSecurityEvent('2FA enabled', userId);
      return { success: true };
    } catch (error) {
      await logger.logError(error as Error, userId, { action: 'enable_2fa' });
      return { success: false, error: (error as Error).message };
    }
  },

  /**
   * Отключает 2FA
   */
  async disable(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.rpc('disable_2fa', {
        p_user_id: userId
      });

      if (error) {
        await logger.logError(error, userId, { action: 'disable_2fa' });
        return { success: false, error: error.message };
      }

      await logger.logSecurityEvent('2FA disabled', userId);
      return { success: true };
    } catch (error) {
      await logger.logError(error as Error, userId, { action: 'disable_2fa' });
      return { success: false, error: (error as Error).message };
    }
  },

  /**
   * Использует резервный код для входа
   */
  async useBackupCode(userId: string, code: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.rpc('use_backup_code', {
        p_user_id: userId,
        p_code: code
      });

      if (error) {
        await logger.logError(error, userId, { action: 'use_backup_code' });
        return false;
      }

      if (data) {
        await logger.logSecurityEvent('Backup code used', userId);
      } else {
        await logger.logWarning('Invalid backup code attempt', userId);
      }

      return data || false;
    } catch (error) {
      await logger.logError(error as Error, userId, { action: 'use_backup_code' });
      return false;
    }
  }
};

