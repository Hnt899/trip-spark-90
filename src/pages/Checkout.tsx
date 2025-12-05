import { useEffect, useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Clock, CheckCircle2, Loader2, Bell } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import PassengerForm, { PassengerData } from "@/components/checkout/PassengerForm";
import SelectPassengerModal from "@/components/checkout/SelectPassengerModal";
import BuyerForm, { BuyerData } from "@/components/checkout/BuyerForm";
import AdditionalServices, { AdditionalServicesData } from "@/components/checkout/AdditionalServices";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { generateRzdStyleTicket } from "@/lib/generateRzdStyleTicket";
import type { EpdData } from "@/types/epd";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showAdditionalServices, setShowAdditionalServices] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [selectPassengerModalOpen, setSelectPassengerModalOpen] = useState(false);
  const [currentPassengerIndex, setCurrentPassengerIndex] = useState<number | null>(null);
  const [consentChecked, setConsentChecked] = useState(false);

  const fromCity = searchParams.get("from") || "Москва";
  const toCity = searchParams.get("to") || "Санкт-Петербург";
  const dateStr = searchParams.get("date");
  const carNumber = searchParams.get("carNumber") || "";
  const seatNumber = searchParams.get("seatNumber") || "";
  const seatType = searchParams.get("seatType") || "";
  const price = searchParams.get("price") || "0";
  const adults = parseInt(searchParams.get("adults") || "1");
  const children = parseInt(searchParams.get("children") || "0");
  const infants = parseInt(searchParams.get("infants") || "0");

  const departureDate = dateStr ? new Date(dateStr) : new Date();

  // Проверка, был ли выбран номер места
  const hasSelectedSeat = carNumber && seatNumber;

  // Инициализация данных пассажиров
  const totalPassengers = adults + children + infants;
  
  // Защита от случая, когда нет пассажиров - используем useMemo для стабильности
  const safeAdults = useMemo(() => Math.max(1, adults), [adults]);
  const safeChildren = useMemo(() => Math.max(0, children), [children]);
  const safeInfants = useMemo(() => Math.max(0, infants), [infants]);
  const safeTotalPassengers = useMemo(() => safeAdults + safeChildren + safeInfants, [safeAdults, safeChildren, safeInfants]);
  
  const createPassengerData = (adultsCount: number, childrenCount: number, infantsCount: number): PassengerData[] => {
    const initial: PassengerData[] = [];
    for (let i = 0; i < adultsCount; i++) {
      initial.push({
        surname: "",
        name: "",
        patronymic: "",
        noPatronymic: false,
        gender: "",
        birthDate: "",
        documentType: "",
        documentSeries: "",
        documentNumber: "",
      });
    }
    for (let i = 0; i < childrenCount; i++) {
      initial.push({
        surname: "",
        name: "",
        patronymic: "",
        noPatronymic: false,
        gender: "",
        birthDate: "",
        documentType: "",
        documentSeries: "",
        documentNumber: "",
      });
    }
    for (let i = 0; i < infantsCount; i++) {
      initial.push({
        surname: "",
        name: "",
        patronymic: "",
        noPatronymic: false,
        gender: "",
        birthDate: "",
        documentType: "",
        documentSeries: "",
        documentNumber: "",
      });
    }
    return initial;
  };
  
  const [passengers, setPassengers] = useState<PassengerData[]>(() => 
    createPassengerData(safeAdults, safeChildren, safeInfants)
  );
  
  // Состояние для имен отображения пассажиров
  const [passengerDisplayNames, setPassengerDisplayNames] = useState<string[]>(() => 
    Array(safeAdults + safeChildren + safeInfants).fill("")
  );
  
  // Обновляем пассажиров при изменении параметров URL
  useEffect(() => {
    const expectedLength = safeAdults + safeChildren + safeInfants;
    setPassengers((prevPassengers) => {
      // Сохраняем заполненные данные, если количество пассажиров не изменилось
      if (prevPassengers.length === expectedLength) {
        // Количество не изменилось, сохраняем данные
        return prevPassengers;
      }
      // Количество изменилось, обновляем массив
      return createPassengerData(safeAdults, safeChildren, safeInfants);
    });
    // Обновляем массив имен отображения при изменении количества
    setPassengerDisplayNames((prevNames) => {
      if (prevNames.length === expectedLength) {
        return prevNames;
      }
      return Array(expectedLength).fill("");
    });
    // Обновляем массив ошибок дубликатов при изменении количества
    setDuplicateErrors((prevErrors) => {
      if (prevErrors.length === expectedLength) {
        return prevErrors;
      }
      return Array(expectedLength).fill("");
    });
    // Сбрасываем ошибки при изменении количества пассажиров
    setErrors((prevErrors) => {
      if (prevErrors.passengers.length === expectedLength) {
        return prevErrors;
      }
      return {
        passengers: Array(expectedLength).fill(null).map(() => ({})),
        buyer: prevErrors.buyer,
      };
    });
  }, [safeAdults, safeChildren, safeInfants]);

  const [buyer, setBuyer] = useState<BuyerData>({
    surname: "",
    name: "",
    email: "",
    phone: "",
  });

  const [additionalServices, setAdditionalServices] = useState<AdditionalServicesData>({
    insurance: "",
    refund: "",
  });

  const [errors, setErrors] = useState<{
    passengers: Partial<Record<keyof PassengerData, string>>[];
    buyer: Partial<Record<keyof BuyerData, string>>;
  }>({
    passengers: [],
    buyer: {},
  });
  
  // Отдельное состояние для ошибок дубликатов
  const [duplicateErrors, setDuplicateErrors] = useState<string[]>(() => 
    Array(safeAdults + safeChildren + safeInfants).fill("")
  );

  const [hasShownAuthWarning, setHasShownAuthWarning] = useState(false);

  const [hasLoadedProfile, setHasLoadedProfile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Проверка авторизации при выборе места (только один раз)
    if (hasSelectedSeat && !user && !hasShownAuthWarning) {
      setHasShownAuthWarning(true);
      toast({
        title: "Требуется авторизация",
        description: "Для выбора места необходимо сначала зарегистрироваться",
        variant: "destructive",
      });
    }

    // Загрузка профиля пользователя (только один раз для каждого пользователя)
    if (user?.id && !hasLoadedProfile) {
      setHasLoadedProfile(true);
      loadUserProfile();
    } else if (!user?.id) {
      setHasLoadedProfile(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, hasSelectedSeat]);

  const loadUserProfile = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      
      // Обновляем профиль только если данные изменились
      setUserProfile((prevProfile) => {
        if (prevProfile?.id === data?.id) {
          return prevProfile;
        }
        return data;
      });

      // Автозаполнение данных покупателя только если они пустые
      if (data) {
        setBuyer((prevBuyer) => {
          // Заполняем только если все поля пустые
          const isEmpty = !prevBuyer.surname && !prevBuyer.name && !prevBuyer.email && !prevBuyer.phone;
          if (!isEmpty) {
            return prevBuyer;
          }
          return {
            surname: (data.last_name || "").toUpperCase(),
            name: (data.first_name || "").toUpperCase(),
            email: data.email || user.email || "",
            phone: data.phone || "",
          };
        });
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    }
  };

  const handlePassengerChange = (index: number, data: PassengerData) => {
    const newPassengers = [...passengers];
    newPassengers[index] = data;
    setPassengers(newPassengers);
    
    // Проверка на дубликаты
    const duplicateIndex = newPassengers.findIndex((p, i) => 
      i !== index &&
      p.surname.trim() &&
      p.name.trim() &&
      p.documentSeries.trim() &&
      p.documentNumber.trim() &&
      p.surname.trim() === data.surname.trim() &&
      p.name.trim() === data.name.trim() &&
      p.documentSeries.trim() === data.documentSeries.trim() &&
      p.documentNumber.trim() === data.documentNumber.trim()
    );
    
    // Очищаем ошибки для этого пассажира
    const newErrors = [...errors.passengers];
    const newDuplicateErrors = [...duplicateErrors];
    
    if (duplicateIndex !== -1) {
      // Устанавливаем ошибку дубликата
      newDuplicateErrors[index] = "Данные пассажира уже используются в другой карточке";
      newDuplicateErrors[duplicateIndex] = "Данные пассажира уже используются в другой карточке";
      // Очищаем обычные ошибки для этих пассажиров
      newErrors[index] = {};
      newErrors[duplicateIndex] = {};
    } else {
      // Очищаем ошибку дубликата
      newDuplicateErrors[index] = "";
      // Очищаем ошибку дубликата у других пассажиров, если она была
      newDuplicateErrors.forEach((err, i) => {
        if (i !== index && err === "Данные пассажира уже используются в другой карточке") {
          newDuplicateErrors[i] = "";
        }
      });
      newErrors[index] = {};
    }
    setErrors({ ...errors, passengers: newErrors });
    setDuplicateErrors(newDuplicateErrors);
  };

  const handleBuyerChange = (data: BuyerData) => {
    setBuyer(data);
    // Очищаем ошибки покупателя
    setErrors({ ...errors, buyer: {} });
  };

  const validatePassenger = (passenger: PassengerData, index: number): Partial<Record<keyof PassengerData, string>> => {
    const passengerErrors: Partial<Record<keyof PassengerData, string>> = {};
    
    if (!passenger.surname.trim()) {
      passengerErrors.surname = "Заполните обязательные поля";
    }
    if (!passenger.name.trim()) {
      passengerErrors.name = "Заполните обязательные поля";
    }
    if (!passenger.noPatronymic && !passenger.patronymic.trim()) {
      passengerErrors.patronymic = "Заполните обязательные поля";
    }
    if (!passenger.gender) {
      passengerErrors.gender = "Заполните обязательные поля";
    }
    if (!passenger.birthDate) {
      passengerErrors.birthDate = "Заполните обязательные поля";
    }
    if (!passenger.documentType) {
      passengerErrors.documentType = "Заполните обязательные поля";
    }
    if (!passenger.documentSeries.trim() || !passenger.documentNumber.trim()) {
      passengerErrors.documentSeries = "Заполните обязательные поля";
    }

    return passengerErrors;
  };

  const validateBuyer = (): Partial<Record<keyof BuyerData, string>> => {
    const buyerErrors: Partial<Record<keyof BuyerData, string>> = {};
    
    if (!buyer.surname.trim()) {
      buyerErrors.surname = "Заполните обязательные поля";
    }
    if (!buyer.name.trim()) {
      buyerErrors.name = "Заполните обязательные поля";
    }
    if (!buyer.email.trim()) {
      buyerErrors.email = "Заполните обязательные поля";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email)) {
      buyerErrors.email = "Заполните обязательные поля";
    }
    if (!buyer.phone.trim()) {
      buyerErrors.phone = "Заполните обязательные поля";
    }

    return buyerErrors;
  };

  // Функция только для проверки (без setState)
  const checkFormValid = (): boolean => {
    const passengerErrors = passengers.map((p, i) => validatePassenger(p, i));
    const buyerErrors = validateBuyer();

    const hasPassengerErrors = passengerErrors.some(e => Object.keys(e).length > 0);
    const hasBuyerErrors = Object.keys(buyerErrors).length > 0;

    return !hasPassengerErrors && !hasBuyerErrors;
  };

  // Функция для валидации с установкой ошибок (вызывается только при submit)
  const validateAll = (): boolean => {
    const passengerErrors = passengers.map((p, i) => validatePassenger(p, i));
    const buyerErrors = validateBuyer();

    setErrors({
      passengers: passengerErrors,
      buyer: buyerErrors,
    });

    const hasPassengerErrors = passengerErrors.some(e => Object.keys(e).length > 0);
    const hasBuyerErrors = Object.keys(buyerErrors).length > 0;

    return !hasPassengerErrors && !hasBuyerErrors;
  };

  const handleContinue = () => {
    if (!validateAll()) {
      toast({
        title: "Ошибка валидации",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    if (!consentChecked) {
      toast({
        title: "Требуется согласие",
        description: "Необходимо дать согласие на обработку персональных данных",
        variant: "destructive",
      });
      return;
    }

    setShowAdditionalServices(true);
    window.scrollTo(0, 0);
  };

  const handlePay = async () => {
    if (!validateAll()) {
      toast({
        title: "Ошибка валидации",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    if (!additionalServices.insurance || !additionalServices.refund) {
      toast({
        title: "Выберите опции",
        description: "Необходимо выбрать опцию в каждой карточке дополнительных услуг",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Симуляция обработки оплаты
    setTimeout(async () => {
      setIsProcessing(false);
      setIsCompleted(true);

      // Генерация и скачивание PDF билета
      try {
        // Генерируем номер заказа
        const orderNumber = `T${Date.now().toString().slice(-10)}`;
        
        // Получаем данные первого пассажира (для билета)
        const firstPassenger = passengers[0];
        if (!firstPassenger) {
          throw new Error("Нет данных пассажира");
        }

        // Формируем полное имя пассажира
        const passengerFullName = `${firstPassenger.surname} ${firstPassenger.name} ${firstPassenger.patronymic || ""}`.trim();
        
        // Получаем тип документа
        const documentType = firstPassenger.documentType === "passport" ? "паспорт" : 
                            firstPassenger.documentType === "license" ? "права" : 
                            firstPassenger.documentType || "паспорт";

        // Форматируем дату рождения (без РФ)
        const birthDateFormatted = firstPassenger.birthDate 
          ? format(new Date(firstPassenger.birthDate), "dd.MM.yyyy", { locale: ru })
          : "";

        // Получаем время отправления и прибытия (используем fallback значения)
        const depTime = "00:25"; // Можно получить из routeId, но пока используем fallback
        const arrTime = "09:26"; // Можно получить из routeId, но пока используем fallback
        
        // Форматируем даты
        const depDateFormatted = format(departureDate, "dd.MM.yyyy", { locale: ru });
        const arrDateFormatted = format(departureDate, "dd.MM.yyyy", { locale: ru });

        // Получаем названия станций (используем fallback)
        const depStation = `${fromCity} (вокзал)`;
        const arrStation = `${toCity} (вокзал)`;
        const depAddress = `г. ${fromCity}, вокзал`;
        const arrAddress = `г. ${toCity}, вокзал`;

        // Собираем данные для билета
        const epd: EpdData = {
          orderNumber,
          trainNumber: "022А", // Fallback, можно получить из routeId
          trainName: "Ночной экспресс", // Fallback, можно получить из routeId
          carriage: carNumber || "1",
          seat: seatNumber || "1",
          seatType: seatType === "upper" ? "Верхнее" : seatType === "lower" ? "Нижнее" : "Место",
          depTime,
          depDate: depDateFormatted,
          depCity: fromCity,
          depStation,
          depAddress,
          depTz: "+3",
          arrTime,
          arrDate: arrDateFormatted,
          arrCity: toCity,
          arrStation,
          arrAddress,
          arrTz: "+3",
          passengerFullName,
          documentType,
          documentSeries: firstPassenger.documentSeries || "",
          documentNumber: firstPassenger.documentNumber || "",
          birthDate: birthDateFormatted,
          routeShort: `${fromCity} — ${toCity}`,
          infoText: "Вы зарегистрированы на рейс. Билет можно распечатать или показать на экране мобильного устройства. При посадке предъявите проводнику документ, удостоверяющий личность.",
        };

        // Генерируем PDF
        console.log("Начинаем генерацию PDF билета...", epd);
        const pdfUrl = await generateRzdStyleTicket(epd);
        console.log("PDF сгенерирован, URL:", pdfUrl);

        // Автоматически скачиваем PDF
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = `ticket_${orderNumber}.pdf`;
        link.style.display = "none";
        document.body.appendChild(link);
        
        // Небольшая задержка перед кликом для надежности
        setTimeout(() => {
          link.click();
          setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(pdfUrl);
          }, 100);
        }, 100);
      } catch (error) {
        console.error("Ошибка при генерации билета:", error);
        // Не блокируем редирект, даже если билет не сгенерировался
      }
      
      // Перенаправление на главную через 2 секунды
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 2000);
  };

  const formatDate = (date: Date) => {
    return format(date, "d MMM, EEE", { locale: ru });
  };

  const basePrice = parseInt(price) * adults + (parseInt(price) * 0.7 * children);
  
  // Добавляем стоимость дополнительных услуг
  const additionalServicesPrice = 
    (additionalServices.insurance === "yes" ? 299 : 0) +
    (additionalServices.refund === "yes" ? 550 : 0);
  
  const totalPrice = basePrice + additionalServicesPrice;

  const isFormValid = () => {
    return checkFormValid() && consentChecked;
  };

  const getPassengerType = (index: number): "adult" | "child" | "infant" => {
    if (index < safeAdults) return "adult";
    if (index < safeAdults + safeChildren) return "child";
    return "infant";
  };

  const handleSelectPassenger = (index: number) => {
    if (!user) {
      toast({
        title: "Требуется авторизация",
        description: "Для выбора сохраненного пассажира необходимо войти в аккаунт",
        variant: "destructive",
      });
      return;
    }
    setCurrentPassengerIndex(index);
    setSelectPassengerModalOpen(true);
  };

  const handlePassengerSelected = (passengerData: PassengerData, displayName?: string) => {
    if (currentPassengerIndex !== null) {
      handlePassengerChange(currentPassengerIndex, passengerData);
      // Обновляем имя отображения
      const newDisplayNames = [...passengerDisplayNames];
      newDisplayNames[currentPassengerIndex] = displayName || "";
      setPassengerDisplayNames(newDisplayNames);
    }
    setSelectPassengerModalOpen(false);
    setCurrentPassengerIndex(null);
  };

  const handleUseAccountData = () => {
    if (userProfile) {
      setBuyer({
        surname: (userProfile.last_name || "").toUpperCase(),
        name: (userProfile.first_name || "").toUpperCase(),
        email: userProfile.email || user?.email || "",
        phone: userProfile.phone || "",
      });
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Заказ успешно оформлен!</h1>
              <p className="text-muted-foreground">
                Вы будете перенаправлены на главную страницу...
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (showAdditionalServices) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

            {/* Информация о поездке (компактная) */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium">{fromCity} — {toCity}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(departureDate)} • {safeTotalPassengers} {safeTotalPassengers === 1 ? "пасс" : "пасс"}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Дополнительные услуги */}
            <AdditionalServices
              data={additionalServices}
              onChange={setAdditionalServices}
              totalPassengers={safeTotalPassengers}
            />

            {/* Стоимость и кнопка оплаты */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">
                      {totalPrice.toLocaleString("ru-RU")} ₽
                    </div>
                    <div className="text-sm text-muted-foreground">
                      за {safeTotalPassengers} {safeTotalPassengers === 1 ? "пассажира" : "пассажиров"}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="consent"
                      checked={consentChecked}
                      onCheckedChange={(checked) => setConsentChecked(checked === true)}
                    />
                    <Label htmlFor="consent" className="text-sm cursor-pointer">
                      Даю согласие на обработку персональных данных
                    </Label>
                  </div>

                  <Button
                    className={cn(
                      "w-full text-lg py-6",
                      isProcessing || !additionalServices.insurance || !additionalServices.refund || !consentChecked
                        ? "bg-purple-300 hover:bg-purple-300 cursor-not-allowed opacity-60"
                        : "bg-purple-600 hover:bg-purple-700"
                    )}
                    onClick={handlePay}
                    disabled={isProcessing || !additionalServices.insurance || !additionalServices.refund || !consentChecked}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Обработка...
                      </>
                    ) : (
                      `Продолжить`
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая «Перейти к оплате», вы соглашаетесь с публичной офертой. В цену
                    включён сервисный сбор
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Защита от пустого массива пассажиров
  if (passengers.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Ошибка</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Не удалось загрузить данные о пассажирах. Пожалуйста, вернитесь назад и попробуйте снова.
                </p>
                <Button onClick={() => navigate(-1)} className="mt-4">
                  Назад
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Заполните данные</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Левая колонка - Формы */}
            <div className="lg:col-span-2 space-y-6">
              {/* Формы пассажиров */}
              {passengers.map((passenger, index) => (
                <PassengerForm
                  key={index}
                  passengerNumber={index + 1}
                  passengerType={getPassengerType(index)}
                  data={passenger}
                  onChange={(data) => handlePassengerChange(index, data)}
                  errors={errors.passengers[index] || {}}
                  onSelectFromSaved={() => handleSelectPassenger(index)}
                  showSelectButton={!!user}
                  displayName={passengerDisplayNames[index]}
                  duplicateError={duplicateErrors[index]}
                />
              ))}

              {/* Форма покупателя */}
              <BuyerForm
                data={buyer}
                onChange={handleBuyerChange}
                errors={errors.buyer}
                userData={userProfile ? {
                  firstName: userProfile.first_name,
                  lastName: userProfile.last_name,
                  email: userProfile.email || user?.email,
                  phone: userProfile.phone,
                } : undefined}
                onUseAccountData={handleUseAccountData}
              />
            </div>

            {/* Правая колонка - Информация о поездке и стоимость */}
            <div className="space-y-6">
              {/* Информация о поездке */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Bell className="w-5 h-5 text-purple-600" />
                    <div>
                      <div className="font-medium">{fromCity} — {toCity}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(departureDate)} • {safeTotalPassengers} {safeTotalPassengers === 1 ? "пасс" : "пасс"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Стоимость */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold mb-2">
                      {totalPrice.toLocaleString("ru-RU")} ₽
                    </div>
                    <div className="text-sm text-muted-foreground">
                      за {safeTotalPassengers} {safeTotalPassengers === 1 ? "пассажира" : "пассажиров"}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox
                      id="consent"
                      checked={consentChecked}
                      onCheckedChange={(checked) => setConsentChecked(checked === true)}
                    />
                    <Label htmlFor="consent" className="text-sm cursor-pointer">
                      Даю согласие на обработку персональных данных
                    </Label>
                  </div>

                  <Button
                    className={cn(
                      "w-full text-lg py-6",
                      isFormValid()
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-purple-300 hover:bg-purple-300 cursor-not-allowed opacity-60"
                    )}
                    onClick={handleContinue}
                    disabled={!isFormValid()}
                  >
                    Перейти к оплате
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Нажимая «Перейти к оплате», вы соглашаетесь с публичной офертой. В цену
                    включён сервисный сбор
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Модальное окно выбора пассажира */}
      {user && (
        <SelectPassengerModal
          open={selectPassengerModalOpen}
          onClose={() => {
            setSelectPassengerModalOpen(false);
            setCurrentPassengerIndex(null);
          }}
          onSelect={handlePassengerSelected}
          userId={user.id}
        />
      )}
    </div>
  );
};

export default Checkout;














