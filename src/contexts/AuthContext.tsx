import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (emailOrPhone: string) => Promise<{ error: any }>;
  verifyOTP: (emailOrPhone: string, token: string, isRegistration: boolean) => Promise<{ error: any; user?: User }>;
  signOut: () => Promise<void>;
  updatePassword: (newPassword: string) => Promise<{ error: any }>;
  signInWithPassword: (emailOrPhone: string, password: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем сессию при загрузке
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
      }
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session) {
        // Сохраняем токен в куки
        Cookies.set('sb_session', session.access_token, { expires: 30 }); // 30 дней
        Cookies.set('sb_refresh_token', session.refresh_token, { expires: 30 });
      }
      
      setLoading(false);
    });

    // Слушаем изменения авторизации
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session) {
        // Сохраняем токен в куки
        Cookies.set('sb_session', session.access_token, { expires: 30 }); // 30 дней
        Cookies.set('sb_refresh_token', session.refresh_token, { expires: 30 });
      } else {
        // Удаляем токены из куки
        Cookies.remove('sb_session');
        Cookies.remove('sb_refresh_token');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Функция для нормализации номера телефона в формат E.164 (+7XXXXXXXXXX)
  const normalizePhoneForSMS = (phone: string): string => {
    // Убираем все символы кроме цифр
    const digits = phone.replace(/\D/g, '');
    
    // Если номер начинается с 8, заменяем на +7
    if (digits.startsWith('8')) {
      return '+7' + digits.substring(1);
    } else if (digits.startsWith('7')) {
      return '+' + digits;
    } else {
      // Если номер без кода страны, добавляем +7
      return '+7' + digits;
    }
  };

  const signIn = async (emailOrPhone: string) => {
    const isEmail = emailOrPhone.includes('@');
    
    if (isEmail) {
      // Отправка OTP на email (используем Supabase)
      const { error } = await supabase.auth.signInWithOtp({
        email: emailOrPhone,
        options: {
          shouldCreateUser: true,
          // Не указываем emailRedirectTo, чтобы отправлялся код, а не ссылка
        }
      });
      return { error };
    } else {
      // Отправка SMS OTP на телефон через МТС Exolve
      const normalizedPhone = normalizePhoneForSMS(emailOrPhone);
      console.log('Sending SMS OTP via МТС Exolve to:', normalizedPhone);
      
      // Генерируем 6-значный код подтверждения
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Отправляем SMS через Edge Function
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
      
      // Текст сообщения с кодом
      // Избегаем явного упоминания "код подтверждения" для лучшей доставляемости с мобильного номера
      // Операторы блокируют OTP-сообщения с мобильных номеров
      const smsMessage = `Ваш код: ${verificationCode}`;
      
      const functionUrl = `${supabaseUrl}/functions/v1/send-sms-exolve`;
      console.log('Calling Edge Function:', functionUrl);
      console.log('Request body:', { phone: normalizedPhone, messageLength: smsMessage.length });
      
      try {
        const response = await fetch(functionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'apikey': supabaseAnonKey,
          },
          body: JSON.stringify({
            phone: normalizedPhone,
            message: smsMessage
          })
        });
        
        console.log('Edge Function response status:', response.status);
        console.log('Edge Function response ok:', response.ok);
        
        let result;
        try {
          result = await response.json();
        } catch (jsonError) {
          console.error('Failed to parse response as JSON:', jsonError);
          const text = await response.text();
          console.error('Response text:', text);
          return { error: { message: 'Неверный ответ от сервера. Проверьте логи Edge Function.' } };
        }
        
        if (!response.ok || !result.success) {
          console.error('SMS sending error:', result);
          
          // Обрабатываем разные типы ошибок
          let errorMessage = 'Не удалось отправить SMS';
          
          if (result.error) {
            // Если error это строка, используем её
            if (typeof result.error === 'string') {
              errorMessage = result.error;
            } else if (typeof result.error === 'object') {
              // Если error это объект, пытаемся извлечь понятное сообщение
              errorMessage = result.error.message || result.error.error || JSON.stringify(result.error);
            }
          } else if (result.details) {
            // Если есть details, используем их
            if (typeof result.details === 'string') {
              errorMessage = result.details;
            } else {
              errorMessage = JSON.stringify(result.details);
            }
          }
          
          // Проверяем на специфичные ошибки
          if (errorMessage.includes('401') || errorMessage.includes('авторизации')) {
            errorMessage = 'Ошибка авторизации: Неверный или истекший API ключ МТС Exolve. Обратитесь к администратору.';
          } else if (errorMessage.includes('timeout')) {
            errorMessage = 'Превышено время ожидания. Проверьте подключение к интернету.';
          } else if (errorMessage.includes('Network error')) {
            errorMessage = 'Ошибка сети. Проверьте подключение к интернету.';
          }
          
          return { error: { message: errorMessage } };
        }
        
        console.log('SMS sent successfully via МТС Exolve, message_id:', result.message_id);
        
        // Сохраняем код в БД
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10); // Код действителен 10 минут
        
        const { error: dbError } = await supabase
          .from('verification_codes')
          .insert({
            phone: normalizedPhone,
            code: verificationCode,
            expires_at: expiresAt.toISOString(),
            used: false
          });
        
        if (dbError) {
          console.error('Error saving verification code:', dbError);
          return { error: { message: 'Не удалось сохранить код подтверждения' } };
        }
        
        console.log('Verification code saved to database');
        return { error: null };
      } catch (error: any) {
        console.error('Error calling SMS function:', error);
        
        let errorMessage = 'Ошибка при отправке SMS';
        if (error.message) {
          errorMessage += ': ' + error.message;
        } else if (error.toString) {
          errorMessage += ': ' + error.toString();
        } else {
          errorMessage += ': Неизвестная ошибка';
        }
        
        // Проверяем на специфичные ошибки
        if (errorMessage.includes('401') || errorMessage.includes('авторизации')) {
          errorMessage = 'Ошибка авторизации: Неверный или истекший API ключ МТС Exolve. Обратитесь к администратору.';
        } else if (errorMessage.includes('timeout') || errorMessage.includes('Timeout')) {
          errorMessage = 'Превышено время ожидания ответа от сервера. Проверьте подключение к интернету.';
        } else if (errorMessage.includes('Network') || errorMessage.includes('Failed to fetch')) {
          errorMessage = 'Ошибка сети. Проверьте подключение к интернету и доступность сервера.';
        }
        
        return { error: { message: errorMessage } };
      }
    }
  };

  const verifyOTP = async (emailOrPhone: string, token: string, isRegistration: boolean) => {
    const isEmail = emailOrPhone.includes('@');
    
    let data, error;
    
    if (isEmail) {
      // Верификация email OTP (используем Supabase)
      // Supabase сам определяет тип OTP при отправке (signup для новых, email для существующих)
      // Пробуем оба типа, начиная с предполагаемого
      const primaryType = isRegistration ? 'signup' : 'email';
      const fallbackType = isRegistration ? 'email' : 'signup';
      
      // Пробуем сначала предполагаемый тип
      ({ data, error } = await supabase.auth.verifyOtp({
        email: emailOrPhone,
        token,
        type: primaryType as 'email' | 'signup',
      }));
      
      // Если не сработало, пробуем альтернативный тип
      if (error && !data?.user) {
        console.log(`Primary OTP type ${primaryType} failed, trying ${fallbackType}`);
        ({ data, error } = await supabase.auth.verifyOtp({
          email: emailOrPhone,
          token,
          type: fallbackType as 'email' | 'signup',
        }));
      }
    } else {
      // Верификация SMS OTP через нашу БД
      const normalizedPhone = normalizePhoneForSMS(emailOrPhone);
      console.log('Verifying SMS OTP for:', normalizedPhone);
      
      // Ищем код в БД
      const { data: codeData, error: codeError } = await supabase
        .from('verification_codes')
        .select('*')
        .eq('phone', normalizedPhone)
        .eq('code', token)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (codeError || !codeData) {
        console.error('Code verification error:', codeError);
        return { 
          error: { message: 'Неверный код подтверждения или код истек' },
          user: undefined 
        };
      }
      
      // Помечаем код как использованный
      await supabase
        .from('verification_codes')
        .update({ used: true })
        .eq('id', codeData.id);
      
      // Создаем или находим пользователя в Supabase
      // Используем временный email для создания аккаунта
      const tempEmail = normalizedPhone.replace(/\D/g, '') + '@temp.com';
      
      // Генерируем постоянный пароль на основе номера телефона (для консистентности)
      const phoneDigits = normalizedPhone.replace(/\D/g, '');
      const tempPassword = 'phone_' + phoneDigits + '_' + phoneDigits.slice(-4);
      
      // Проверяем, существует ли пользователь, ища его в профилях
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('user_id, email')
        .eq('phone', normalizedPhone)
        .maybeSingle();
      
      if (existingProfile?.user_id) {
        // Пользователь существует - пробуем войти
        // Сначала пробуем с нашим паролем
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: tempEmail,
          password: tempPassword
        });
        
        if (signInError && signInError.message?.includes('Invalid login credentials')) {
          // Пароль не подходит - используем OTP для входа
          const { error: otpError } = await supabase.auth.signInWithOtp({
            email: tempEmail,
            options: { shouldCreateUser: false }
          });
          
          if (otpError) {
            console.error('OTP sign in error:', otpError);
            return { error: { message: 'Не удалось войти. Попробуйте зарегистрироваться заново.' }, user: undefined };
          }
          
          // OTP отправлен - нужно попросить пользователя ввести код из email
          return { error: { message: 'Проверьте email для входа' }, user: undefined };
        } else if (signInError) {
          console.error('Sign in error:', signInError);
          return { error: signInError, user: undefined };
        } else {
          // Успешный вход
          data = signInData;
          error = null;
        }
      } else {
        // Новый пользователь - создаем
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: tempEmail,
          password: tempPassword,
          options: {
            data: {
              phone: normalizedPhone,
              temp_password: tempPassword
            }
          }
        });
        
        if (signUpError) {
          console.error('Sign up error:', signUpError);
          return { error: signUpError, user: undefined };
        }
        
        data = signUpData;
        error = signUpError;
      }
      
      // Сохраняем номер телефона в профиле
      if (data?.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .upsert({
            user_id: data.user.id,
            phone: normalizedPhone,
            email: tempEmail
          }, {
            onConflict: 'user_id'
          });
        
        if (profileError) {
          console.error('Error saving phone to profile:', profileError);
        } else {
          console.log('Phone saved to profile:', normalizedPhone);
        }
      }
    }

    if (data?.user && !data.user.user_metadata?.has_password) {
      // Генерируем автоматический пароль
      const autoPassword = Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-12);
      await supabase.auth.updateUser({
        password: autoPassword,
        data: { has_password: false, auto_password: autoPassword }
      });
    }

    return { error, user: data?.user ?? undefined };
  };

  // Функция для нормализации номера телефона
  const normalizePhone = (phone: string): string[] => {
    // Убираем все символы кроме цифр
    const digits = phone.replace(/\D/g, '');
    
    // Генерируем варианты форматов
    const variants: string[] = [];
    
    // Если номер начинается с 8, заменяем на 7
    if (digits.startsWith('8')) {
      const with7 = '7' + digits.substring(1);
      variants.push('+' + with7);
      variants.push(with7);
      variants.push('8' + digits.substring(1));
    } else if (digits.startsWith('7')) {
      variants.push('+' + digits);
      variants.push(digits);
      variants.push('8' + digits.substring(1));
    } else {
      // Если номер без кода страны, добавляем варианты
      variants.push('+7' + digits);
      variants.push('7' + digits);
      variants.push('8' + digits);
      variants.push(digits);
    }
    
    return [...new Set(variants)]; // Убираем дубликаты
  };

  const signInWithPassword = async (emailOrPhone: string, password: string) => {
    const isEmail = emailOrPhone.includes('@');
    
    if (isEmail) {
      // Вход по email
      const { error } = await supabase.auth.signInWithPassword({
        email: emailOrPhone,
        password,
      });
      return { error };
    } else {
      // Вход по телефону - нормализуем номер и ищем в разных форматах
      const phoneVariants = normalizePhone(emailOrPhone);
      console.log('Phone variants to search:', phoneVariants);
      
      // Сначала пробуем найти пользователя по номеру в user_profiles
      let foundUser = null;
      
      for (const phoneVariant of phoneVariants) {
        const { data: usersData, error: searchError } = await supabase
          .from('user_profiles')
          .select('email, user_id, phone')
          .eq('phone', phoneVariant)
          .maybeSingle();

        console.log(`Searching for phone ${phoneVariant} in profiles:`, { 
          usersData, 
          searchError,
          errorCode: searchError?.code,
          errorMessage: searchError?.message,
          hasData: !!usersData,
          hasEmail: usersData?.email 
        });

        if (!searchError && usersData && usersData.email) {
          foundUser = usersData;
          console.log('✅ Found user by phone in profiles:', foundUser);
          break;
        } else if (searchError) {
          console.log(`❌ Search error for ${phoneVariant}:`, searchError);
        } else if (usersData && !usersData.email) {
          console.log(`⚠️ Found user but no email:`, usersData);
        } else {
          console.log(`ℹ️ No user found for phone ${phoneVariant}`);
        }
      }

      // Если не нашли в user_profiles, но пользователь мог привязать номер через auth.users
      // Попробуем найти через поиск всех профилей, где phone похож на наш номер
      if (!foundUser) {
        console.log('Trying to find by phone pattern - searching all profiles');
        const digitsOnly = emailOrPhone.replace(/\D/g, '');
        // Ищем по последним 10 цифрам (без кода страны)
        if (digitsOnly.length >= 10) {
          const last10Digits = digitsOnly.slice(-10);
          console.log('Searching for last 10 digits:', last10Digits);
          
          const { data: allProfiles, error: searchAllError } = await supabase
            .from('user_profiles')
            .select('email, user_id, phone');
          
          console.log('All profiles search result:', { 
            count: allProfiles?.length || 0, 
            profiles: allProfiles,
            error: searchAllError,
            errorCode: searchAllError?.code,
            errorMessage: searchAllError?.message
          });
          
          if (!searchAllError && allProfiles && allProfiles.length > 0) {
            // Ищем вручную по разным вариантам
            console.log('Checking', allProfiles.length, 'profiles for phone match');
            for (const profile of allProfiles) {
              if (profile.phone) {
                const profileDigits = profile.phone.replace(/\D/g, '');
                const profileLast10 = profileDigits.slice(-10);
                console.log(`Comparing: profile phone="${profile.phone}" (digits: ${profileDigits}, last10: ${profileLast10}) vs input last10="${last10Digits}"`);
                
                if (profileLast10 === last10Digits) {
                  foundUser = profile;
                  console.log('✅ Found user by phone pattern match:', foundUser);
                  break;
                }
              }
            }
          } else if (searchAllError) {
            console.error('Error searching all profiles:', searchAllError);
          } else {
            console.log('No profiles found in database');
          }
        }
      }

      // Если не нашли в user_profiles, пробуем найти через auth.users по номеру
      // Для этого нужно использовать admin API или искать через user_profiles по всем записям
      // Но сначала попробуем через @temp.com (для пользователей, зарегистрированных через телефон)
      if (!foundUser) {
        console.log('Not found in profiles, trying @temp.com variants');
        for (const phoneVariant of phoneVariants) {
          const digitsOnly = phoneVariant.replace(/\D/g, '');
          const tempEmail = digitsOnly + '@temp.com';
          console.log('Trying temp email:', tempEmail);
          const { error } = await supabase.auth.signInWithPassword({
            email: tempEmail,
            password,
          });
          
          // Если успешно - возвращаем без ошибки
          if (!error) {
            console.log('Login successful with temp email');
            return { error: null };
          } else {
            console.log('Temp email login failed:', error);
          }
        }
      }

      // Если нашли пользователя в профилях, входим по его email
      if (foundUser && foundUser.email) {
        console.log('Logging in with email from profile:', foundUser.email);
        const { error } = await supabase.auth.signInWithPassword({
          email: foundUser.email,
          password,
        });
        if (error) {
          console.error('Login error with profile email:', error);
        }
        return { error };
      }

      // Если ничего не сработало, возвращаем ошибку с подсказкой
      console.error('All login attempts failed');
      return { 
        error: { 
          message: 'Неверный номер телефона или пароль. Если вы регистрировались через email, используйте email для входа. Если номер не привязан, добавьте его в личном кабинете.' 
        } 
      };
    }
  };

  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
      data: { has_password: true }
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    Cookies.remove('sb_session');
    Cookies.remove('sb_refresh_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        verifyOTP,
        signOut,
        updatePassword,
        signInWithPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

