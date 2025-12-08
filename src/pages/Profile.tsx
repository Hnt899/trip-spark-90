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
import { Mail, Phone, User, Plus, Trash2, Edit, ExternalLink, MessageCircle, Send, Calendar, Shield, Download, CheckCircle2, Train, Plane, Bus, MoreHorizontal, RefreshCw, ArrowLeft, Gift, X } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import ConfirmRegistrationModal from "@/components/profile/ConfirmRegistrationModal";
import DownloadTicketModal from "@/components/profile/DownloadTicketModal";
import ExchangeTicketModal from "@/components/profile/ExchangeTicketModal";
import RefundTicketModal from "@/components/profile/RefundTicketModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { EpdData } from "@/types/epd";
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

  // Состояния для истории заказов
  interface TicketOrder {
    id: string;
    order_number: string;
    transport_type: "train" | "flight" | "bus";
    total_price: number;
    tickets_data: EpdData[];
    from_city: string;
    to_city: string;
    departure_date: string;
    electronic_registration_status: "pending" | "confirmed";
    order_status: "active" | "refunded" | "exchanged";
    created_at: string;
  }
  const [ticketOrders, setTicketOrders] = useState<TicketOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  
  // Состояния для сертификатов
  interface Certificate {
    id: string;
    certificate_code: string;
    transport_type: "train" | "flight" | "bus";
    amount: number;
    status: "active" | "used" | "expired";
    used_at: string | null;
    expires_at: string;
    created_at: string;
  }
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [displayedCertificates, setDisplayedCertificates] = useState<Certificate[]>([]);
  const [loadingCertificates, setLoadingCertificates] = useState(false);
  const [certificateFilter, setCertificateFilter] = useState<"all" | "train" | "flight" | "bus">("all");
  
  const [confirmRegistrationModal, setConfirmRegistrationModal] = useState<{
    open: boolean;
    orderId: string | null;
    routeInfo: string;
  }>({ open: false, orderId: null, routeInfo: "" });
  const [downloadTicketModal, setDownloadTicketModal] = useState<{
    open: boolean;
    tickets: EpdData[];
  }>({ open: false, tickets: [] });
  const [exchangeTicketModal, setExchangeTicketModal] = useState<{
    open: boolean;
    orderId: string;
    orderNumber: string;
    totalPrice: number;
    transportType: string;
  }>({ open: false, orderId: "", orderNumber: "", totalPrice: 0, transportType: "" });
  const [refundTicketModal, setRefundTicketModal] = useState<{
    open: boolean;
    orderId: string;
    orderNumber: string;
    totalPrice: number;
    transportType: string;
  }>({ open: false, orderId: "", orderNumber: "", totalPrice: 0, transportType: "" });

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
      loadTicketOrders();
      loadCertificates();
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

  const loadTicketOrders = async () => {
    if (!user) return;
    setLoadingOrders(true);
    try {
      const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading ticket orders:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить историю заказов",
          variant: "destructive",
        });
      } else {
        // Устанавливаем order_status в 'active' по умолчанию для существующих записей
        const ordersWithStatus = (data || []).map(order => ({
          ...order,
          order_status: order.order_status || 'active',
        }));
        setTicketOrders(ordersWithStatus);
      }
    } catch (error) {
      console.error("Error loading ticket orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const loadCertificates = async () => {
    if (!user) return;
    setLoadingCertificates(true);
    try {
      // Автоматически списываем истекшие сертификаты
      await supabase.rpc('expire_old_certificates');

      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading certificates:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить сертификаты",
          variant: "destructive",
        });
      } else {
        setCertificates(data || []);
        setDisplayedCertificates(data || []);
      }
    } catch (error) {
      console.error("Error loading certificates:", error);
    } finally {
      setLoadingCertificates(false);
    }
  };

  // Фильтрация сертификатов
  useEffect(() => {
    if (certificateFilter === "all") {
      setDisplayedCertificates(certificates);
    } else {
      setDisplayedCertificates(certificates.filter(c => c.transport_type === certificateFilter));
    }
  }, [certificateFilter, certificates]);

  const handleConfirmRegistration = async (orderId: string) => {
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from("tickets")
        .update({ electronic_registration_status: "confirmed" })
        .eq("id", orderId)
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Успешно",
        description: "Электронная регистрация подтверждена",
      });
      setConfirmRegistrationModal({ open: false, orderId: null, routeInfo: "" });
      await loadTicketOrders();
    } catch (error) {
      console.error("Error confirming registration:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось подтвердить регистрацию",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefundTicket = async (orderId: string, orderNumber: string, totalPrice: number, transportType: string) => {
    if (!user) return;
    setLoading(true);
    try {
      console.log("Updating ticket to refunded, orderId:", orderId);
      
      // Получаем данные билета
      const { data: ticketData, error: ticketError } = await supabase
        .from("tickets")
        .select("*")
        .eq("id", orderId)
        .eq("user_id", user.id)
        .single();

      if (ticketError || !ticketData) {
        throw ticketError || new Error("Билет не найден");
      }

      // Рассчитываем сумму сертификата (с вычетом сервисного сбора)
      const serviceFee = Math.round(totalPrice * 0.1); // 10% сервисный сбор
      const certificateAmount = totalPrice - serviceFee;

      // Создаем сертификат через RPC функцию
      const { data: certificateData, error: certError } = await supabase.rpc('create_certificate', {
        p_user_id: user.id,
        p_transport_type: transportType,
        p_amount: certificateAmount,
        p_order_id: orderId
      });

      if (certError) {
        console.error("Error creating certificate:", certError);
        throw certError;
      }

      // certificateData может быть массивом, берем первый элемент
      const certificate = Array.isArray(certificateData) ? certificateData[0] : certificateData;
      console.log("Certificate created:", certificate);

      // Обновляем статус билета
      const { data, error } = await supabase
        .from("tickets")
        .update({ order_status: "refunded" })
        .eq("id", orderId)
        .eq("user_id", user.id)
        .select();

      if (error) {
        console.error("Error updating ticket:", error);
        throw error;
      }

      console.log("Ticket updated successfully:", data);

      toast({
        title: "Успешно",
        description: `Сертификат добавлен на сумму ${certificateAmount.toLocaleString("ru-RU")} ₽. Посмотрите его в графе "Сертификаты".`,
      });
      setRefundTicketModal({ open: false, orderId: "", orderNumber: "", totalPrice: 0, transportType: "" });
      await loadTicketOrders();
      await loadCertificates(); // Обновляем список сертификатов
    } catch (error: any) {
      console.error("Error refunding ticket:", error);
      toast({
        title: "Ошибка",
        description: error?.message || "Не удалось обработать возврат билета. Проверьте консоль браузера.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExchangeTicket = async (orderId: string, orderNumber: string, totalPrice: number, transportType: string) => {
    if (!user) return;
    setLoading(true);
    try {
      console.log("Updating ticket to exchanged, orderId:", orderId);
      
      // Получаем данные билета
      const { data: ticketData, error: ticketError } = await supabase
        .from("tickets")
        .select("*")
        .eq("id", orderId)
        .eq("user_id", user.id)
        .single();

      if (ticketError || !ticketData) {
        throw ticketError || new Error("Билет не найден");
      }

      // Рассчитываем сумму сертификата (с вычетом сервисного сбора)
      const serviceFee = Math.round(totalPrice * 0.1); // 10% сервисный сбор
      const certificateAmount = totalPrice - serviceFee;

      // Создаем сертификат через RPC функцию
      const { data: certificateData, error: certError } = await supabase.rpc('create_certificate', {
        p_user_id: user.id,
        p_transport_type: transportType,
        p_amount: certificateAmount,
        p_order_id: orderId
      });

      if (certError) {
        console.error("Error creating certificate:", certError);
        throw certError;
      }

      // certificateData может быть массивом, берем первый элемент
      const certificate = Array.isArray(certificateData) ? certificateData[0] : certificateData;
      console.log("Certificate created:", certificate);

      // Обновляем статус билета
      const { data, error } = await supabase
        .from("tickets")
        .update({ order_status: "exchanged" })
        .eq("id", orderId)
        .eq("user_id", user.id)
        .select();

      if (error) {
        console.error("Error updating ticket:", error);
        throw error;
      }

      console.log("Ticket updated successfully:", data);

      toast({
        title: "Успешно",
        description: `Сертификат добавлен на сумму ${certificateAmount.toLocaleString("ru-RU")} ₽. Посмотрите его в графе "Сертификаты".`,
      });
      setExchangeTicketModal({ open: false, orderId: "", orderNumber: "", totalPrice: 0, transportType: "" });
      await loadTicketOrders();
      await loadCertificates(); // Обновляем список сертификатов
    } catch (error: any) {
      console.error("Error exchanging ticket:", error);
      toast({
        title: "Ошибка",
        description: error?.message || "Не удалось обработать обмен билета. Проверьте консоль браузера.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTransportTypeLabel = (type: string) => {
    switch (type) {
      case "train":
        return "Поезд";
      case "flight":
        return "Самолёт";
      case "bus":
        return "Автобус";
      default:
        return type;
    }
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case "train":
        return <Train className="w-4 h-4" />;
      case "flight":
        return <Plane className="w-4 h-4" />;
      case "bus":
        return <Bus className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getOrderStatus = (order: TicketOrder): "active" | "confirmed" | "refunded" | "exchanged" => {
    // Если есть явный статус возврата или обмена
    if (order.order_status === "refunded") return "refunded";
    if (order.order_status === "exchanged") return "exchanged";
    
    // Если электронная регистрация подтверждена
    if (order.electronic_registration_status === "confirmed") return "confirmed";
    
    // По умолчанию - активный заказ
    return "active";
  };

  const getStatusConfig = (status: "active" | "confirmed" | "refunded" | "exchanged") => {
    switch (status) {
      case "active":
        return {
          label: "Билет куплен",
          borderColor: "border-gray-300 dark:border-gray-600",
          bgColor: "bg-gray-50 dark:bg-gray-800/50",
          textColor: "text-gray-700 dark:text-gray-300",
          icon: null,
        };
      case "confirmed":
        return {
          label: "Электронная регистрация подтверждена",
          borderColor: "border-green-500 dark:border-green-600",
          bgColor: "bg-green-50 dark:bg-green-900/20",
          textColor: "text-green-700 dark:text-green-400",
          icon: <CheckCircle2 className="w-4 h-4" />,
        };
      case "refunded":
        return {
          label: "Возврат средств",
          borderColor: "border-red-500 dark:border-red-600",
          bgColor: "bg-red-50 dark:bg-red-900/20",
          textColor: "text-red-700 dark:text-red-400",
          icon: <ArrowLeft className="w-4 h-4" />,
        };
      case "exchanged":
        return {
          label: "Обмен билета",
          borderColor: "border-red-500 dark:border-red-600",
          bgColor: "bg-red-50 dark:bg-red-900/20",
          textColor: "text-red-700 dark:text-red-400",
          icon: <RefreshCw className="w-4 h-4" />,
        };
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="orders">История заказов</TabsTrigger>
            <TabsTrigger value="passengers">Пассажиры</TabsTrigger>
            <TabsTrigger value="certificates">Сертификаты</TabsTrigger>
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
                {loadingOrders ? (
                  <p className="text-muted-foreground">Загрузка...</p>
                ) : ticketOrders.length === 0 ? (
                  <p className="text-muted-foreground">У вас пока нет заказов</p>
                ) : (
                  <div className="space-y-4">
                    {ticketOrders.map((order) => {
                      const routeInfo = `${order.from_city} — ${order.to_city}`;
                      const orderDate = format(new Date(order.created_at), "dd.MM.yyyy", { locale: ru });
                      const ticketsCount = order.tickets_data?.length || 0;
                      const status = getOrderStatus(order);
                      const statusConfig = getStatusConfig(status);
                      
                      return (
                        <div
                          key={order.id}
                          className={`rounded-lg ${statusConfig.borderColor} border-2 overflow-hidden bg-card shadow-sm`}
                        >
                          <div className="overflow-hidden">
                            {/* Статус билета */}
                            <div className={`${statusConfig.bgColor} ${statusConfig.textColor} px-4 py-2 border-b ${statusConfig.borderColor} border-b-2`}>
                              <div className="flex items-center gap-2 text-sm font-medium">
                                {statusConfig.icon && statusConfig.icon}
                                <span>{statusConfig.label}</span>
                              </div>
                            </div>
                            
                            {/* Основная информация о заказе */}
                            <div className="p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{orderDate}</span>
                                    <span className="text-muted-foreground">|</span>
                                    <span>{ticketsCount} {ticketsCount === 1 ? "билет" : ticketsCount < 5 ? "билета" : "билетов"}</span>
                                    <span className="text-muted-foreground">|</span>
                                    <div className="flex items-center gap-1">
                                      {getTransportIcon(order.transport_type)}
                                      <span>{getTransportTypeLabel(order.transport_type)}</span>
                                    </div>
                                    <span className="text-muted-foreground">|</span>
                                    <span className="font-semibold">{order.total_price.toLocaleString("ru-RU")} ₽</span>
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {routeInfo}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Заказ № {order.order_number}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {order.electronic_registration_status === "pending" && status !== "refunded" && status !== "exchanged" && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        setConfirmRegistrationModal({
                                          open: true,
                                          orderId: order.id,
                                          routeInfo,
                                        });
                                      }}
                                    >
                                      <CheckCircle2 className="w-4 h-4 mr-2" />
                                      Подтвердить электронную регистрацию
                                    </Button>
                                  )}
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 w-8 p-0"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onClick={() => {
                                          setDownloadTicketModal({
                                            open: true,
                                            tickets: order.tickets_data || [],
                                          });
                                        }}
                                      >
                                        <Download className="w-4 h-4 mr-2" />
                                        Скачать билеты
                                      </DropdownMenuItem>
                                      {status !== "refunded" && status !== "exchanged" && (
                                        <>
                                          <DropdownMenuItem
                                            onClick={() => {
                                              setExchangeTicketModal({
                                                open: true,
                                                orderId: order.id,
                                                orderNumber: order.order_number,
                                                totalPrice: order.total_price,
                                                transportType: order.transport_type,
                                              });
                                            }}
                                          >
                                            <RefreshCw className="w-4 h-4 mr-2" />
                                            Обменять билет
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            onClick={() => {
                                              setRefundTicketModal({
                                                open: true,
                                                orderId: order.id,
                                                orderNumber: order.order_number,
                                                totalPrice: order.total_price,
                                                transportType: order.transport_type,
                                              });
                                            }}
                                          >
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Вернуть деньги за билет
                                          </DropdownMenuItem>
                                        </>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
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

          <TabsContent value="certificates" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Сертификаты
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingCertificates ? (
                  <p className="text-muted-foreground">Загрузка...</p>
                ) : certificates.length === 0 ? (
                  <p className="text-muted-foreground">У вас пока нет сертификатов</p>
                ) : (
                  <div className="space-y-4">
                    {/* Фильтр по категориям */}
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant={certificateFilter === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCertificateFilter("all")}
                      >
                        Все
                      </Button>
                      <Button
                        variant={certificateFilter === "train" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCertificateFilter("train")}
                      >
                        <Train className="w-4 h-4 mr-2" />
                        Поезд
                      </Button>
                      <Button
                        variant={certificateFilter === "flight" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCertificateFilter("flight")}
                      >
                        <Plane className="w-4 h-4 mr-2" />
                        Самолёт
                      </Button>
                      <Button
                        variant={certificateFilter === "bus" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCertificateFilter("bus")}
                      >
                        <Bus className="w-4 h-4 mr-2" />
                        Автобус
                      </Button>
                    </div>

                    {/* Список сертификатов */}
                    <div className="space-y-3">
                      {displayedCertificates.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">
                          Нет сертификатов в выбранной категории
                        </p>
                      ) : (
                        displayedCertificates.map((cert) => {
                        const isExpired = new Date(cert.expires_at) < new Date();
                        const statusConfig = {
                          active: { label: "Активен", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
                          used: { label: "Использован", color: "text-gray-600", bg: "bg-gray-50", border: "border-gray-200" },
                          expired: { label: "Истёк", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
                        };
                        const config = statusConfig[cert.status] || statusConfig.active;
                        const transportIcon = cert.transport_type === "train" ? <Train className="w-4 h-4" /> :
                                             cert.transport_type === "flight" ? <Plane className="w-4 h-4" /> :
                                             <Bus className="w-4 h-4" />;
                        const transportLabel = cert.transport_type === "train" ? "Поезд" :
                                              cert.transport_type === "flight" ? "Самолёт" :
                                              "Автобус";

                        return (
                          <Card key={cert.id} className={`${config.border} border-2`}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center gap-2">
                                    <Gift className="w-4 h-4 text-primary" />
                                    <span className="font-mono font-semibold text-lg">{cert.certificate_code}</span>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${config.bg} ${config.color}`}>
                                      {config.label}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    {transportIcon}
                                    <span className="text-muted-foreground">{transportLabel}</span>
                                    <span className="text-muted-foreground">|</span>
                                    <span className="font-semibold">{cert.amount.toLocaleString("ru-RU")} ₽</span>
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    Создан: {new Date(cert.created_at).toLocaleDateString('ru-RU')}
                                    {cert.used_at && (
                                      <> • Использован: {new Date(cert.used_at).toLocaleDateString('ru-RU')}</>
                                    )}
                                    {!cert.used_at && (
                                      <> • Истекает: {new Date(cert.expires_at).toLocaleDateString('ru-RU')}</>
                                    )}
                                  </div>
                                  {cert.status === "active" && isExpired && (
                                    <div className="text-xs text-red-600">
                                      Сертификат истёк и будет списан
                                    </div>
                                  )}
                                  {cert.status === "used" && (
                                    <div className="text-xs text-muted-foreground">
                                      Сертификат будет списан через 24 часа после использования
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })
                    )}
                    </div>
                  </div>
                )}
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

        {/* Модалка подтверждения электронной регистрации */}
        <ConfirmRegistrationModal
          open={confirmRegistrationModal.open}
          onClose={() => {
            setConfirmRegistrationModal({ open: false, orderId: null, routeInfo: "" });
          }}
          onConfirm={() => {
            if (confirmRegistrationModal.orderId) {
              handleConfirmRegistration(confirmRegistrationModal.orderId);
            }
          }}
          routeInfo={confirmRegistrationModal.routeInfo}
        />

        {/* Модалка скачивания билетов */}
        <DownloadTicketModal
          open={downloadTicketModal.open}
          onClose={() => {
            setDownloadTicketModal({ open: false, tickets: [] });
          }}
          tickets={downloadTicketModal.tickets}
        />

        {/* Модалка обмена билета */}
        <ExchangeTicketModal
          open={exchangeTicketModal.open}
          onClose={() => {
            setExchangeTicketModal({ open: false, orderId: "", orderNumber: "", totalPrice: 0, transportType: "" });
          }}
          onConfirm={() => {
            if (exchangeTicketModal.orderId) {
              handleExchangeTicket(
                exchangeTicketModal.orderId,
                exchangeTicketModal.orderNumber,
                exchangeTicketModal.totalPrice,
                exchangeTicketModal.transportType
              );
            }
          }}
          orderNumber={exchangeTicketModal.orderNumber}
          totalPrice={exchangeTicketModal.totalPrice}
        />

        {/* Модалка возврата денег */}
        <RefundTicketModal
          open={refundTicketModal.open}
          onClose={() => {
            setRefundTicketModal({ open: false, orderId: "", orderNumber: "", totalPrice: 0, transportType: "" });
          }}
          onConfirm={() => {
            if (refundTicketModal.orderId) {
              handleRefundTicket(
                refundTicketModal.orderId,
                refundTicketModal.orderNumber,
                refundTicketModal.totalPrice,
                refundTicketModal.transportType
              );
            }
          }}
          orderNumber={refundTicketModal.orderNumber}
          totalPrice={refundTicketModal.totalPrice}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Profile;

