import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, User, Plus, Trash2, Edit, ExternalLink, MessageCircle, Send, Calendar, Shield } from "lucide-react";
import { twoFactorAuth } from "@/lib/2fa";
import { check2FARateLimit, resetRateLimit } from "@/lib/rateLimit";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Passenger {
  id: string;
  name: string;
  surname: string;
  patronymic?: string;
  passport_series: string;
  passport_number: string;
  birth_date: string;
  user_id: string;
  display_name?: string;
}

interface UserProfile {
  id: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  patronymic?: string;
  phone?: string;
  email?: string;
  birth_date?: string;
}

const Profile = () => {
  const { user, updatePassword, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingPassenger, setEditingPassenger] = useState<Passenger | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [profileForm, setProfileForm] = useState({
    first_name: "",
    last_name: "",
    patronymic: "",
    phone: "",
    email: "",
    birth_date: "",
  });

  // Состояния для 2FA
  const [twoFactorData, setTwoFactorData] = useState<{ enabled: boolean } | null>(null);
  const [show2FASetup, setShow2FASetup] = useState(false);
  const [twoFactorToken, setTwoFactorToken] = useState("");

  // Форма для нового пассажира
  const [formData, setFormData] = useState({
    display_name: "",
    name: "",
    surname: "",
    patronymic: "",
    gender: "",
    passport_series: "",
    passport_number: "",
    birth_date: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadPassengers();
      loadUserProfile();
      load2FAData();
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error("Error loading profile:", error);
    } else if (data) {
      setUserProfile(data);
      setProfileForm({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        patronymic: data.patronymic || "",
        phone: data.phone || "",
        email: data.email || "",
        birth_date: data.birth_date || "",
      });
    }
  };

  const loadPassengers = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from("passengers")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading passengers:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить пассажиров",
        variant: "destructive",
      });
    } else {
      setPassengers(data || []);
    }
    setLoading(false);
  };

  const handleSavePassenger = async () => {
    if (!user) return;

    if (!formData.name || !formData.surname || !formData.passport_series || !formData.passport_number || !formData.birth_date) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    if (editingPassenger) {
      // Обновление существующего пассажира
      const { error } = await supabase
        .from("passengers")
        .update({
          display_name: formData.display_name || null,
          name: formData.name,
          surname: formData.surname,
          patronymic: formData.patronymic || null,
          gender: formData.gender || null,
          passport_series: formData.passport_series,
          passport_number: formData.passport_number,
          birth_date: formData.birth_date,
        })
        .eq("id", editingPassenger.id);

      if (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось обновить пассажира",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Успешно",
          description: "Пассажир обновлен",
        });
        setEditingPassenger(null);
        resetForm();
        loadPassengers();
      }
    } else {
      // Создание нового пассажира
      const { error } = await supabase
        .from("passengers")
        .insert({
          user_id: user.id,
          display_name: formData.display_name || null,
          name: formData.name,
          surname: formData.surname,
          patronymic: formData.patronymic || null,
          gender: formData.gender || null,
          passport_series: formData.passport_series,
          passport_number: formData.passport_number,
          birth_date: formData.birth_date,
        });

      if (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось сохранить пассажира",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Успешно",
          description: "Пассажир сохранен",
        });
        resetForm();
        loadPassengers();
      }
    }
    setLoading(false);
  };

  const handleDeletePassenger = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этого пассажира?")) return;

    setLoading(true);
    const { error } = await supabase
      .from("passengers")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить пассажира",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Успешно",
        description: "Пассажир удален",
      });
      loadPassengers();
    }
    setLoading(false);
  };

  const handleEditPassenger = (passenger: Passenger) => {
    setEditingPassenger(passenger);
    setFormData({
      display_name: passenger.display_name || "",
      name: passenger.name,
      surname: passenger.surname,
      patronymic: passenger.patronymic || "",
      gender: (passenger as any).gender || "",
      passport_series: passenger.passport_series,
      passport_number: passenger.passport_number,
      birth_date: passenger.birth_date,
    });
  };

  const resetForm = () => {
    setFormData({
      display_name: "",
      gender: "",
      name: "",
      surname: "",
      patronymic: "",
      passport_series: "",
      passport_number: "",
      birth_date: "",
    });
    setEditingPassenger(null);
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    setLoading(true);
    
    // Обновляем телефон в auth.users, если он указан
    // Нормализуем номер телефона перед сохранением
    let normalizedPhone = profileForm.phone;
    if (profileForm.phone) {
      let phoneDigits = profileForm.phone.replace(/\D/g, ''); // Убираем все кроме цифр
      
      // Если номер начинается с 8, заменяем на +7
      if (phoneDigits.startsWith('8')) {
        normalizedPhone = '+7' + phoneDigits.substring(1);
      } else if (phoneDigits.startsWith('7')) {
        normalizedPhone = '+' + phoneDigits;
      } else {
        // Если номер без кода страны, добавляем +7
        normalizedPhone = '+7' + phoneDigits;
      }
      
      console.log('Normalizing phone:', { original: profileForm.phone, normalized: normalizedPhone });
      
      const { error: phoneError, data: phoneData } = await supabase.auth.updateUser({
        phone: normalizedPhone,
      });
      if (phoneError) {
        console.error("Error updating phone in auth:", phoneError);
        // Не прерываем выполнение, продолжаем сохранять в профиле
      } else {
        console.log("Phone updated in auth.users:", phoneData);
      }
      
      // Используем нормализованный номер для сохранения в профиле
      profileForm.phone = normalizedPhone;
    }

    // Обновляем email в auth.users, если он указан и отличается от текущего
    // Но не обновляем, если текущий email содержит @temp.com (это временный email для телефона)
    if (profileForm.email && profileForm.email !== user.email && !user.email?.includes('@temp.com')) {
      const { error: emailError } = await supabase.auth.updateUser({
        email: profileForm.email,
      });
      if (emailError) {
        console.error("Error updating email:", emailError);
      }
    }
    
    // Если у пользователя был временный email (@temp.com), но он указал реальный email в профиле
    if (user.email?.includes('@temp.com') && profileForm.email && !profileForm.email.includes('@temp.com')) {
      const { error: emailError } = await supabase.auth.updateUser({
        email: profileForm.email,
      });
      if (emailError) {
        console.error("Error updating email from temp:", emailError);
      }
    }
    
    // Готовим данные для сохранения
    const profileData = {
      first_name: profileForm.first_name || null,
      last_name: profileForm.last_name || null,
      patronymic: profileForm.patronymic || null,
      phone: normalizedPhone || null,
      email: profileForm.email || user.email || null,
      birth_date: profileForm.birth_date || null,
    };
    
    console.log('Saving profile data:', profileData);

    if (userProfile) {
      // Обновление существующего профиля
      const { data, error } = await supabase
        .from("user_profiles")
        .update(profileData)
        .eq("user_id", user.id)
        .select();

      if (error) {
        console.error("Error updating profile:", error);
        toast({
          title: "Ошибка",
          description: error.message || "Не удалось сохранить данные. Проверьте консоль браузера.",
          variant: "destructive",
        });
      } else {
        console.log("Profile updated successfully:", data);
        toast({
          title: "Успешно",
          description: "Данные сохранены",
        });
        setShowProfileDialog(false);
        loadUserProfile();
      }
    } else {
      // Создание нового профиля
      const { data, error } = await supabase
        .from("user_profiles")
        .insert({
          user_id: user.id,
          ...profileData,
        })
        .select();

      if (error) {
        console.error("Error creating profile:", error);
        toast({
          title: "Ошибка",
          description: error.message || "Не удалось сохранить данные. Проверьте консоль браузера.",
          variant: "destructive",
        });
      } else {
        console.log("Profile created successfully:", data);
        toast({
          title: "Успешно",
          description: "Данные сохранены",
        });
        setShowProfileDialog(false);
        loadUserProfile();
      }
    }
    setLoading(false);
  };

  const handleUpdatePassword = async () => {
    if (newPassword.length < 6) {
      toast({
        title: "Ошибка",
        description: "Пароль должен содержать минимум 6 символов",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await updatePassword(newPassword);
    setLoading(false);

    if (error) {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось изменить пароль",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Успешно",
        description: "Пароль изменен",
      });
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const load2FAData = async () => {
    if (!user) return;
    
    const data = await twoFactorAuth.get2FAData(user.id);
    setTwoFactorData(data);
  };

  const handleSetup2FA = async () => {
    if (!user) return;
    
    // Проверяем, есть ли у пользователя привязанная почта
    const userEmail = user.email;
    const profileEmail = userProfile?.email;
    
    // Определяем email для отправки кода
    const emailFor2FA = (userEmail && !userEmail.includes('@temp.com')) 
      ? userEmail 
      : (profileEmail && profileEmail.trim() !== '' ? profileEmail : null);
    
    if (!emailFor2FA) {
      toast({
        title: "Требуется привязать email",
        description: "Для включения двухфакторной аутентификации необходимо привязать email к аккаунту. Пожалуйста, добавьте email в личных данных.",
        variant: "destructive",
      });
      setShowProfileDialog(true);
      return;
    }
    
    // Проверяем rate limit для включения 2FA
    const rateLimitCheck = await check2FARateLimit(user.id);
    if (!rateLimitCheck.allowed) {
      toast({
        title: "Превышен лимит",
        description: rateLimitCheck.error || "Превышен лимит попыток включения 2FA",
        variant: "destructive",
      });
      return;
    }
    
    // Отправляем код на email для подтверждения включения 2FA
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: emailFor2FA,
        options: {
          shouldCreateUser: false
        }
      });

      if (error) {
        toast({
          title: "Ошибка",
          description: error.message || "Не удалось отправить код на email",
          variant: "destructive",
        });
      } else {
        setShow2FASetup(true);
        toast({
          title: "Код отправлен",
          description: `Мы отправили код подтверждения на ${emailFor2FA}`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось отправить код",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleEnable2FA = async () => {
    if (!user || twoFactorToken.length !== 8) return;
    
    // Определяем email для проверки кода
    const userEmail = user.email;
    const profileEmail = userProfile?.email;
    const emailFor2FA = (userEmail && !userEmail.includes('@temp.com')) 
      ? userEmail 
      : (profileEmail && profileEmail.trim() !== '' ? profileEmail : null);
    
    if (!emailFor2FA) {
      toast({
        title: "Ошибка",
        description: "Email не найден",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      // Проверяем код через Supabase
      const { data, error } = await supabase.auth.verifyOtp({
        email: emailFor2FA,
        token: twoFactorToken,
        type: 'email',
      });

      if (error) {
        toast({
          title: "Ошибка",
          description: error.message || "Неверный код",
          variant: "destructive",
        });
      } else {
        // Код верный - включаем 2FA в базе данных
        const result = await twoFactorAuth.enable(user.id);
        
        if (result.success) {
          // Сбрасываем rate limit при успешном включении
          resetRateLimit(`2fa_toggle:${user.id}`);
          
          toast({
            title: "Успешно",
            description: "Двухфакторная аутентификация включена",
          });
          setShow2FASetup(false);
          setTwoFactorToken("");
          await load2FAData();
        } else {
          toast({
            title: "Ошибка",
            description: result.error || "Не удалось включить 2FA",
            variant: "destructive",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось включить 2FA",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleDisable2FA = async () => {
    if (!user) return;
    
    if (!confirm("Вы уверены, что хотите отключить двухфакторную аутентификацию? Это снизит безопасность вашего аккаунта.")) {
      return;
    }
    
    setLoading(true);
    try {
      const result = await twoFactorAuth.disable(user.id);
      
      if (result.success) {
        toast({
          title: "Успешно",
          description: "Двухфакторная аутентификация отключена",
        });
        await load2FAData();
      } else {
        toast({
          title: "Ошибка",
          description: result.error || "Не удалось отключить 2FA",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось отключить 2FA",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8">Личный кабинет</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Данные пользователя
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Заполняем форму текущими данными
                    const currentEmail = userProfile?.email || user?.email || "";
                    // Убираем @temp.com из email для отображения, если это временный email
                    const displayEmail = currentEmail.replace('@temp.com', '');
                    setProfileForm({
                      first_name: userProfile?.first_name || "",
                      last_name: userProfile?.last_name || "",
                      patronymic: userProfile?.patronymic || "",
                      phone: userProfile?.phone || user?.phone || "",
                      email: userProfile?.email || (user?.email && !user.email.includes('@temp.com') ? user.email : ""),
                      birth_date: userProfile?.birth_date || "",
                    });
                    setShowProfileDialog(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {userProfile ? "Редактировать" : "Добавить данные"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Email:</span>
                <span className="font-medium">{userProfile?.email || user.email}</span>
              </div>
              {(userProfile?.phone || user.phone) && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Телефон:</span>
                  <span className="font-medium">{userProfile?.phone || user.phone}</span>
                </div>
              )}
              {userProfile?.first_name && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Имя:</span>
                  <span className="font-medium">
                    {userProfile.last_name} {userProfile.first_name} {userProfile.patronymic}
                  </span>
                </div>
              )}
              {userProfile?.birth_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Дата рождения:</span>
                  <span className="font-medium">
                    {new Date(userProfile.birth_date).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Изменить пароль</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new_password">Новый пароль</Label>
                <Input
                  id="new_password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm_password">Подтвердите пароль</Label>
                <Input
                  id="confirm_password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button onClick={handleUpdatePassword} disabled={loading}>
                Изменить пароль
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="orders">История заказов</TabsTrigger>
            <TabsTrigger value="passengers">Пассажиры</TabsTrigger>
            <TabsTrigger value="security">Безопасность</TabsTrigger>
            <TabsTrigger value="useful">Пригодится в поездке</TabsTrigger>
            <TabsTrigger value="contact">Связаться с нами</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>История заказов</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Здесь будет отображаться история ваших заказов билетов.
                </p>
                {/* TODO: Добавить загрузку заказов из базы данных */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="passengers" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Пассажиры</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="display_name">Имя для отображения (мама, папа, и т.д.)</Label>
                      <Input
                        id="display_name"
                        placeholder="Например: Мама"
                        value={formData.display_name}
                        onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="surname">Фамилия *</Label>
                      <Input
                        id="surname"
                        value={formData.surname}
                        onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patronymic">Отчество</Label>
                      <Input
                        id="patronymic"
                        value={formData.patronymic}
                        onChange={(e) => setFormData({ ...formData, patronymic: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Пол *</Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) => setFormData({ ...formData, gender: value })}
                      >
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Выберите пол" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Мужской</SelectItem>
                          <SelectItem value="female">Женский</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passport_series">Серия паспорта *</Label>
                      <Input
                        id="passport_series"
                        maxLength={4}
                        value={formData.passport_series}
                        onChange={(e) => setFormData({ ...formData, passport_series: e.target.value.replace(/\D/g, "") })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passport_number">Номер паспорта *</Label>
                      <Input
                        id="passport_number"
                        maxLength={6}
                        value={formData.passport_number}
                        onChange={(e) => setFormData({ ...formData, passport_number: e.target.value.replace(/\D/g, "") })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="birth_date">Дата рождения *</Label>
                      <Input
                        id="birth_date"
                        type="date"
                        value={formData.birth_date}
                        onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSavePassenger} disabled={loading}>
                      {editingPassenger ? "Сохранить изменения" : "Сохранить пассажира"}
                    </Button>
                    {editingPassenger && (
                      <Button onClick={resetForm} variant="outline">
                        Отмена
                      </Button>
                    )}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Сохраненные пассажиры</h3>
                  {loading && passengers.length === 0 ? (
                    <p className="text-muted-foreground">Загрузка...</p>
                  ) : passengers.length === 0 ? (
                    <p className="text-muted-foreground">Нет сохраненных пассажиров</p>
                  ) : (
                    <div className="space-y-2">
                      {passengers.map((passenger) => (
                        <Card key={passenger.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">
                                  {passenger.display_name && (
                                    <span className="text-muted-foreground">({passenger.display_name}) </span>
                                  )}
                                  {passenger.surname} {passenger.name} {passenger.patronymic}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Паспорт: {passenger.passport_series} {passenger.passport_number}
                                  {passenger.birth_date && ` • Дата рождения: ${new Date(passenger.birth_date).toLocaleDateString('ru-RU')}`}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleEditPassenger(passenger)}
                                  variant="ghost"
                                  size="sm"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  onClick={() => handleDeletePassenger(passenger.id)}
                                  variant="ghost"
                                  size="sm"
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Безопасность
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Двухфакторная аутентификация */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Двухфакторная аутентификация (2FA)</h3>
                      <p className="text-sm text-muted-foreground">
                        Дополнительная защита вашего аккаунта. При входе по паролю потребуется дополнительный код с вашей почты.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {twoFactorData?.enabled ? (
                        <span className="text-sm text-green-600 font-medium">Включена</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">Выключена</span>
                      )}
                    </div>
                  </div>

                  {!twoFactorData?.enabled ? (
                    <div className="space-y-4">
                      {/* Проверяем наличие email */}
                      {(() => {
                        const userEmail = user?.email;
                        const profileEmail = userProfile?.email;
                        // Проверяем наличие email (если аккаунт создан по телефону, email может отсутствовать)
                        const hasEmail = (userEmail && !userEmail.includes('@temp.com')) || 
                                         (profileEmail && profileEmail.trim() !== '');
                        
                        if (!hasEmail) {
                          return (
                            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                              <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
                                <strong>Требуется привязать email</strong>
                              </p>
                              <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                                Для включения двухфакторной аутентификации необходимо привязать email к аккаунту. 
                                Коды подтверждения будут отправляться на вашу почту.
                              </p>
                              <Button 
                                onClick={() => setShowProfileDialog(true)} 
                                variant="outline"
                                size="sm"
                              >
                                Привязать email
                              </Button>
                            </div>
                          );
                        }
                        
                        return (
                          <Button onClick={handleSetup2FA} disabled={loading}>
                            <Shield className="w-4 h-4 mr-2" />
                            Настроить 2FA
                          </Button>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Button 
                        onClick={handleDisable2FA} 
                        variant="destructive" 
                        disabled={loading}
                      >
                        Отключить 2FA
                      </Button>
                    </div>
                  )}
                </div>

                {/* Диалог настройки 2FA */}
                <Dialog open={show2FASetup} onOpenChange={setShow2FASetup}>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Настройка двухфакторной аутентификации</DialogTitle>
                      <DialogDescription>
                        Мы отправили код подтверждения на вашу почту. Введите код для включения 2FA.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="2fa_token">Введите код с почты</Label>
                        <Input
                          id="2fa_token"
                          placeholder="00000000"
                          value={twoFactorToken}
                          onChange={(e) => setTwoFactorToken(e.target.value.replace(/\D/g, "").slice(0, 8))}
                          maxLength={8}
                        />
                        <p className="text-xs text-muted-foreground">
                          Код отправлен на {userProfile?.email || user?.email}
                        </p>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShow2FASetup(false);
                            setTwoFactorToken("");
                          }}
                        >
                          Отмена
                        </Button>
                        <Button 
                          onClick={handleEnable2FA} 
                          disabled={loading || twoFactorToken.length !== 8}
                        >
                          Включить 2FA
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="useful" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Пригодится в поездке</CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <a href="http://localhost:8080/reference/trains" target="_blank" rel="noopener noreferrer">
                    Перейти на справочную
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Связаться с нами</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>Телефон: <a href="tel:+78001234567" className="text-primary hover:underline">+7 (800) 123-45-67</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>Email: <a href="mailto:support@tudasuda.ru" className="text-primary hover:underline">support@tudasuda.ru</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>Telegram: <a href="https://t.me/tudasuda_support" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@tudasuda_support</a></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>WhatsApp: <a href="https://wa.me/78001234567" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">+7 (800) 123-45-67</a></span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Личные данные</DialogTitle>
              <DialogDescription>
                Заполните ваши личные данные
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">Имя</Label>
                  <Input
                    id="first_name"
                    value={profileForm.first_name}
                    onChange={(e) => setProfileForm({ ...profileForm, first_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Фамилия</Label>
                  <Input
                    id="last_name"
                    value={profileForm.last_name}
                    onChange={(e) => setProfileForm({ ...profileForm, last_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patronymic">Отчество</Label>
                  <Input
                    id="patronymic"
                    value={profileForm.patronymic}
                    onChange={(e) => setProfileForm({ ...profileForm, patronymic: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birth_date">Дата рождения</Label>
                  <Input
                    id="birth_date"
                    type="date"
                    value={profileForm.birth_date}
                    onChange={(e) => setProfileForm({ ...profileForm, birth_date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+79001234567"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowProfileDialog(false)}
                >
                  Отмена
                </Button>
                <Button onClick={handleSaveProfile} disabled={loading}>
                  Сохранить
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;

