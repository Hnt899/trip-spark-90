import { apiFetch } from './api';
import { logger } from './logger';

export interface TwoFactorAuthData {
  secret: string;
  backup_codes: string[];
  qr_code_url?: string;
}

export const twoFactorAuth = {
  async generateSecret(userId: string): Promise<TwoFactorAuthData> {
    try {
      const data = await apiFetch<{ secret: string; backup_codes: string[] }>(
        '/api/2fa/generate-secret',
        { method: 'POST' }
      );
      if (!data?.secret) {
        throw new Error('No secret returned');
      }
      const issuer = 'TuDaSuDa';
      const accountName = userId;
      const qrCodeUrl = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(accountName)}?secret=${data.secret}&issuer=${encodeURIComponent(issuer)}`;

      await logger.logSecurityEvent('2FA secret generated', userId);
      return {
        secret: data.secret,
        backup_codes: data.backup_codes || [],
        qr_code_url: qrCodeUrl
      };
    } catch (error) {
      await logger.logError(error as Error, userId, { action: 'generate_2fa_secret' });
      throw error;
    }
  },

  async isEnabled(userId: string): Promise<boolean> {
    try {
      const { data } = await apiFetch<{ data: boolean }>(
        '/api/rpc/is_2fa_enabled',
        {
          method: 'POST',
          body: JSON.stringify({ p_user_id: userId }),
        }
      );
      return !!data;
    } catch (error) {
      await logger.logError(error as Error, userId, { action: 'is_2fa_enabled' });
      return false;
    }
  },

  async get2FAData(userId: string): Promise<{ enabled: boolean } | null> {
    try {
      const data = await apiFetch<{ enabled: boolean }>('/api/2fa/status');
      return { enabled: data.enabled || false };
    } catch (error) {
      await logger.logError(error as Error, userId, { action: 'get_2fa_data' });
      return null;
    }
  },

  async verifyToken(userId: string, token: string): Promise<{ valid: boolean; error?: string }> {
    try {
      const data = await apiFetch<{ valid: boolean; error?: string }>(
        '/api/2fa/verify-totp',
        {
          method: 'POST',
          body: JSON.stringify({ token }),
        }
      );
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

  async enable(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      await apiFetch('/api/2fa/enable', { method: 'POST', body: '{}' });
      await logger.logSecurityEvent('2FA enabled', userId);
      return { success: true };
    } catch (error) {
      await logger.logError(error as Error, userId, { action: 'enable_2fa' });
      return { success: false, error: (error as Error).message };
    }
  },

  async disable(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      await apiFetch('/api/2fa/disable', { method: 'POST', body: '{}' });
      await logger.logSecurityEvent('2FA disabled', userId);
      return { success: true };
    } catch (error) {
      await logger.logError(error as Error, userId, { action: 'disable_2fa' });
      return { success: false, error: (error as Error).message };
    }
  },

  async useBackupCode(userId: string, code: string): Promise<boolean> {
    try {
      const { data } = await apiFetch<{ data: boolean }>(
        '/api/2fa/use-backup',
        {
          method: 'POST',
          body: JSON.stringify({ code }),
        }
      );
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
