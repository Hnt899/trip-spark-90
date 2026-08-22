import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon, Minus, Plus, Search, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import PlaceAutocomplete, { type SelectedPlace } from "./PlaceAutocomplete";

export type FlightSearchFormVariant = "hero" | "header-desktop" | "header-mobile";

interface FlightSearchFormProps {
  variant?: FlightSearchFormVariant;
  showTripTypeToggle?: boolean;
  tripType?: "round" | "one"; // добавляем проп для управления извне
  onFromLabelChange?: (label: string | undefined) => void;
  onToLabelChange?: (label: string | undefined) => void;
  onSearchComplete?: () => void;
}

// ===== СТИЛИ ДЛЯ КРАСИВОГО СКРОЛЛБАРА =====
const scrollbarStyles = `
  .city-dropdown-scroll::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  .city-dropdown-scroll::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }
  .city-dropdown-scroll::-webkit-scrollbar-thumb {
    background: #887BFF;
    border-radius: 10px;
    transition: background 0.2s;
  }
  .city-dropdown-scroll::-webkit-scrollbar-thumb:hover {
    background: #100877;
  }
  .city-dropdown-scroll {
    scrollbar-width: thin;
    scrollbar-color: #887BFF transparent;
  }
`;

// ===== СТИЛИ ДЛЯ МОБИЛЬНОЙ АДАПТАЦИИ =====
const mobileStyles = `
  @media (max-width: 480px) {
    /* Скрываем текст "Авиабилеты" в табе, оставляем только иконку */
    .tab-text {
      display: none;
    }
    
    /* Форма на мобилках — колонка */
    .flight-form-row {
      flex-direction: column !important;
      gap: 8px !important;
    }
    
    /* Все поля — 100% ширины */
    .flight-form-row .flex-1,
    .flight-form-row .min-w-0 {
      width: 100% !important;
      flex: 1 1 100% !important;
      min-width: 0 !important;
    }
    
    /* Кнопка "Найти" — на всю ширину */
    .flight-search-btn {
      width: 100% !important;
      justify-content: center !important;
    }
    
    /* Даты, пассажиры, класс — каждый на отдельной строке */
    .flight-form-extra {
      flex-direction: column !important;
      gap: 8px !important;
    }
    
    .flight-form-extra > * {
      width: 100% !important;
      flex: 1 1 100% !important;
    }
    
    /* Отступы внутри формы */
    .flight-form-container {
      padding-left: 12px !important;
      padding-right: 12px !important;
    }

    /* Переключатель "Туда — сюда" на мобилках */
    .trip-type-toggle {
      flex-wrap: wrap !important;
      justify-content: center !important;
    }
  }
`;

const PassengerRow = ({ label, hint, value, min, max, onChange, variant }: any) => (
  <div className="flex items-center justify-between gap-3 py-2">
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className={cn("text-xs", variant === "hero" ? "text-white/60" : "text-muted-foreground")}>{hint}</p>
    </div>
    <div className="flex items-center gap-2">
      <Button type="button" variant="outline" size="icon" className="h-8 w-8" disabled={value <= min} onClick={() => onChange(value - 1)}>
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-6 text-center text-sm font-semibold tabular-nums">{value}</span>
      <Button type="button" variant="outline" size="icon" className="h-8 w-8" disabled={value >= max} onClick={() => onChange(value + 1)}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

const FlightSearchForm = ({
  variant = "hero",
  showTripTypeToggle = true,
  tripType: externalTripType,
  onFromLabelChange,
  onToLabelChange,
  onSearchComplete,
}: FlightSearchFormProps) => {
  const isMobile = useIsMobile();
  const isHero = variant === "hero";
  const isHeaderMobile = variant === "header-mobile";

  const [tripType, setTripType] = useState<"round" | "one">(externalTripType || "round");
  const [fromPlace, setFromPlace] = useState<SelectedPlace | null>(null);
  const [toPlace, setToPlace] = useState<SelectedPlace | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [flightClass, setFlightClass] = useState<"economy" | "business">("economy");
  const [errors, setErrors] = useState<{ from?: string; to?: string; general?: string }>({});

  // Синхронизируем с внешним tripType
  useEffect(() => {
    if (externalTripType) {
      setTripType(externalTripType);
    }
  }, [externalTripType]);

  const handleFromChange = (place: SelectedPlace | null) => {
    setFromPlace(place);
    if (place) {
      onFromLabelChange?.(place.label);
    }
    if (errors.from) setErrors((prev) => ({ ...prev, from: undefined }));
  };

  const handleToChange = (place: SelectedPlace | null) => {
    setToPlace(place);
    if (place) {
      onToLabelChange?.(place.label);
    }
    if (errors.to) setErrors((prev) => ({ ...prev, to: undefined }));
  };

  const passengersLabel = () => {
    const total = passengers.adults + passengers.children + passengers.infants;
    const suffix =
      total % 10 === 1 && total % 100 !== 11 ? "пассажир" :
      total % 10 >= 2 && total % 10 <= 4 && (total % 100 < 10 || total % 100 >= 20) ? "пассажира" : "пассажиров";
    return `${total} ${suffix}`;
  };

  const handleSearch = () => {
    if (!fromPlace) {
      setErrors({ from: "Выберите город из списка" });
      return;
    }
    if (!toPlace) {
      setErrors({ to: "Выберите город из списка" });
      return;
    }
    if (fromPlace.code === toPlace.code) {
      setErrors({ general: "Города вылета и прибытия не могут совпадать" });
      return;
    }

    setErrors({});

    const departDateObj = departureDate || new Date(Date.now() + 86400000);
    const day = String(departDateObj.getDate()).padStart(2, "0");
    const month = String(departDateObj.getMonth() + 1).padStart(2, "0");
    const dateToken = `${day}${month}`;

    const adults = Math.min(passengers.adults || 1, 9);
    const children = Math.min(passengers.children || 0, 9);
    const infants = Math.min(passengers.infants || 0, 9);
    const passengerToken = `${adults}${children}${infants}`;

    const flightSearch = `${fromPlace.code}${dateToken}${toPlace.code}${passengerToken}`;

    const url = `https://avia.ts-trip.com/?flightSearch=${flightSearch}`;
    window.location.href = url;
    onSearchComplete?.();
  };

  const fieldTriggerClass = cn(
    "justify-start text-left font-normal rounded-md w-full",
    isHero ? "h-11 px-3 text-sm bg-white/10 border-white/20 text-white" :
    isHeaderMobile ? "h-12 text-base" : "h-10 text-sm"
  );

  const selectTriggerClass = cn(
    isHero ? "h-11 bg-white/10 border-white/20 text-white text-sm [&>svg]:text-white/70" :
    isHeaderMobile ? "h-12 text-base" : "h-10 text-sm"
  );

  return (
    <>
      <style>{scrollbarStyles}</style>
      <style>{mobileStyles}</style>
      
      <div className="flex flex-col gap-3 w-full flight-form-container">
        
        {/* ===== ВЕРХНЯЯ СТРОКА: Заголовок "Авиабилеты" + Переключатель ===== */}
        {showTripTypeToggle && (
          <div className="flex items-center justify-between w-full">
            {/* Заголовок слева */}
            <h2 className="text-2xl font-bold text-white">
              <span className="tab-text">Авиабилеты</span>
              <span className="inline-block sm:hidden">✈️</span>
            </h2>

            {/* Переключатель справа */}
            <div className="inline-flex items-center gap-1 rounded-md p-1 bg-white/10 trip-type-toggle">
              <button
                type="button"
                onClick={() => setTripType("round")}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap",
                  tripType === "round"
                    ? "bg-white/20"
                    : "text-white/70 hover:text-white"
                )}
              >
                <span style={{ color: tripType === "round" ? "#100877" : "white" }}>Туда</span>
                <span style={{ color: tripType === "round" ? "#887BFF" : "white" }}> — сюда</span>
              </button>
              <button
                type="button"
                onClick={() => { setTripType("one"); setReturnDate(undefined); }}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap",
                  tripType === "one"
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white"
                )}
              >
                В одну сторону
              </button>
            </div>
          </div>
        )}

        {/* ===== СТРОКА 2: Города ===== */}
        {errors.general && (
          <p className="text-sm text-red-400 rounded-md bg-red-500/10 px-3 py-2">{errors.general}</p>
        )}
        <div className={cn("flex gap-2 flight-form-row", isHeaderMobile ? "flex-col" : "flex-col sm:flex-row")}>
          <PlaceAutocomplete
            value={fromPlace}
            onChange={handleFromChange}
            placeholder="Откуда"
            error={errors.from}
            variant={variant}
          />
          <PlaceAutocomplete
            value={toPlace}
            onChange={handleToChange}
            placeholder="Куда"
            error={errors.to}
            variant={variant}
          />
        </div>

        {/* ===== СТРОКА 3: Даты, Пассажиры, Класс, Кнопка ===== */}
        <div className={cn("flex gap-2 flight-form-extra", isHeaderMobile ? "flex-col" : "flex-col sm:flex-row sm:items-stretch")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn(fieldTriggerClass, !departureDate && (isHero ? "text-white/50" : "text-muted-foreground"))}>
                <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                <span className="truncate">
                  {departureDate ? format(departureDate, "dd.MM.yyyy", { locale: ru }) : "Дата вылета"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className={cn("w-auto p-0", isHeaderMobile && "z-[200]")} align="start">
              <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus numberOfMonths={isMobile || isHeaderMobile ? 1 : 2} disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} />
            </PopoverContent>
          </Popover>

          {tripType === "round" && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn(fieldTriggerClass, !returnDate && (isHero ? "text-white/50" : "text-muted-foreground"))}>
                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {returnDate ? format(returnDate, "dd.MM.yyyy", { locale: ru }) : "Дата возврата"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className={cn("w-auto p-0", isHeaderMobile && "z-[200]")} align="start">
                <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus numberOfMonths={isMobile || isHeaderMobile ? 1 : 2} disabled={(date) => {
                  const today = new Date(new Date().setHours(0, 0, 0, 0));
                  if (date < today) return true;
                  if (departureDate && date < departureDate) return true;
                  return false;
                }} />
              </PopoverContent>
            </Popover>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn(fieldTriggerClass, isHeaderMobile ? "w-full" : "sm:min-w-[160px]")}>
                <span className="truncate">{passengersLabel()}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72" align="start">
              <PassengerRow label="Взрослые" hint="12+ лет" value={passengers.adults} min={1} max={9} variant={variant} onChange={(adults: number) => setPassengers((prev) => ({ ...prev, adults }))} />
              <PassengerRow label="Дети" hint="2–11 лет" value={passengers.children} min={0} max={9} variant={variant} onChange={(children: number) => setPassengers((prev) => ({ ...prev, children }))} />
              <PassengerRow label="Младенцы" hint="до 2 лет, без места" value={passengers.infants} min={0} max={passengers.adults} variant={variant} onChange={(infants: number) => setPassengers((prev) => ({ ...prev, infants }))} />
            </PopoverContent>
          </Popover>

          <Select value={flightClass} onValueChange={(v) => setFlightClass(v as "economy" | "business")}>
            <SelectTrigger className={cn(selectTriggerClass, isHeaderMobile ? "w-full" : "sm:w-36", isHero && "bg-white/10 border-white/20 text-white [&>svg]:text-white")}>
              <SelectValue placeholder="Класс" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a2e] border-white/20 text-white">
              <SelectItem value="economy">Эконом</SelectItem>
              <SelectItem value="business">Бизнес</SelectItem>
            </SelectContent>
          </Select>

          <Button type="button" onClick={handleSearch} className={cn("shrink-0 font-semibold flight-search-btn", isHero ? "h-11 px-6 text-sm rounded-md" : isHeaderMobile ? "w-full h-12 rounded-xl text-base" : "h-10 px-4 rounded-md")}>
            <Search className={cn("mr-2", isHeaderMobile ? "h-5 w-5" : "h-4 w-4")} />
            {isHeaderMobile ? "Найти билеты" : "Найти"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default FlightSearchForm;