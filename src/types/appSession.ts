export interface AppUser {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
  /** Доступ к разделу /admin (также проверяется на сервере при каждом запросе) */
  is_admin?: boolean;
}

export interface AppSession {
  access_token: string;
  user: AppUser;
}
