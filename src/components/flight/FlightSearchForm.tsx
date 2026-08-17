import { useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon, Minus, Plus, Search, ChevronDown, MapPin, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export type FlightSearchFormVariant = "hero" | "header-desktop" | "header-mobile";

interface FlightSearchFormProps {
  variant?: FlightSearchFormVariant;
  showTripTypeToggle?: boolean;
  onFromLabelChange?: (label: string | undefined) => void;
  onToLabelChange?: (label: string | undefined) => void;
  onSearchComplete?: () => void;
}

// ===== ВАШ СПИСОК ГОРОДОВ =====
const cityToIata: Record<string, string> = {
  "Москва": "MOW",
  "Санкт-Петербург": "LED",
  "Казань": "KZN",
  "Сочи": "AER",
  "Екатеринбург": "SVX",
  "Новосибирск": "OVB",
  "Нижний Новгород": "GOJ",
  "Самара": "KUF",
  "Ростов-на-Дону": "ROV",
  "Владивосток": "VVO",
  "Краснодар": "KRR",
  "Уфа": "UFA",
  "Пермь": "PEE",
  "Волгоград": "VOG",
  "Воронеж": "VOZ",
};

const popularCities = Object.keys(cityToIata);

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

// ===== КРАСИВЫЙ ВЫПАДАЮЩИЙ СПИСОК =====
const CityDropdown = ({
  value,
  onChange,
  onSelect,
  placeholder,
  error,
  variant,
}: {
  value: string;
  onChange: (val: string) => void;
  onSelect: (city: string, code: string) => void;
  placeholder: string;
  error?: string;
  variant: FlightSearchFormVariant;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const isHero = variant === "hero";

  const filteredCities = popularCities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (city: string) => {
    setSearchTerm("");
    setIsOpen(false);
    onSelect(city, cityToIata[city]);
  };

  return (
    <div className="relative flex-1 min-w-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between rounded-md border px-3 py-2 text-left transition-colors",
          isHero
            ? "h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            : "h-10 bg-background border-input text-foreground",
          error && "border-red-400 focus-visible:ring-red-400"
        )}
      >
        <span className="truncate flex items-center gap-2">
          <MapPin className={cn(
            "h-4 w-4",
            isHero ? "text-white/50" : "text-muted-foreground"
          )} />
          {value || placeholder}
        </span>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform",
          isOpen && "rotate-180",
          isHero ? "text-white/50" : "text-muted-foreground"
        )} />
      </button>

      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}

      {isOpen && (
        <div className={cn(
          "absolute z-50 mt-1 w-full rounded-md border shadow-lg max-h-60 overflow-auto city-dropdown-scroll",
          isHero
            ? "bg-[#1a1a2e] border-white/20 text-white"
            : "bg-white border-[#887BFF]/20 text-foreground",
        )}>
          <div className="sticky top-0 z-10 p-2 bg-inherit border-b border-[#887BFF]/10">
            <input
              type="text"
              className={cn(
                "w-full rounded-md px-3 py-1.5 text-sm outline-none",
                isHero
                  ? "bg-white/10 text-white placeholder:text-white/50"
                  : "bg-[#F5F3FF] text-foreground placeholder:text-muted-foreground border border-[#887BFF]/20 focus:border-[#887BFF]"
              )}
              placeholder="Поиск города..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {filteredCities.length === 0 ? (
            <div className="px-4 py-3 text-sm text-muted-foreground">Ничего не найдено</div>
          ) : (
            filteredCities.map((city) => (
              <button
                key={city}
                className={cn(
                  "w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors",
                  isHero
                    ? "hover:bg-white/10"
                    : "hover:bg-[#F5F3FF] hover:text-[#100877]",
                  value === city && (isHero ? "bg-white/5" : "bg-[#F0EDFF] text-[#100877]")
                )}
                onClick={() => handleSelect(city)}
              >
                <div>
                  <p className="font-medium">{city}</p>
                  <p className={cn(
                    "text-xs",
                    isHero ? "text-white/50" : "text-muted-foreground"
                  )}>
                    {cityToIata[city]} · {city === "Москва" || city === "Санкт-Петербург" ? "Россия" : "РФ"}
                  </p>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

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
  onFromLabelChange,
  onToLabelChange,
  onSearchComplete,
}: FlightSearchFormProps) => {
  const isMobile = useIsMobile();
  const isHero = variant === "hero";
  const isHeaderMobile = variant === "header-mobile";

  const [tripType, setTripType] = useState<"round" | "one">("round");
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromCode, setFromCode] = useState<string | null>(null);
  const [toCode, setToCode] = useState<string | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [flightClass, setFlightClass] = useState<"economy" | "business">("economy");
  const [errors, setErrors] = useState<{ from?: string; to?: string; general?: string }>({});

  const handleFromSelect = (city: string, code: string) => {
    setFromText(city);
    setFromCode(code);
    onFromLabelChange?.(city);
    if (errors.from) setErrors((prev) => ({ ...prev, from: undefined }));
  };

  const handleToSelect = (city: string, code: string) => {
    setToText(city);
    setToCode(code);
    onToLabelChange?.(city);
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
    if (!fromText.trim()) {
      setErrors({ from: "Укажите город вылета" });
      return;
    }
    if (!toText.trim()) {
      setErrors({ to: "Укажите город прибытия" });
      return;
    }
    if (fromText.trim().toLowerCase() === toText.trim().toLowerCase()) {
      setErrors({ general: "Города вылета и прибытия не могут совпадать" });
      return;
    }
    if (!fromCode) {
      setErrors({ from: "Выберите город из списка" });
      return;
    }
    if (!toCode) {
      setErrors({ to: "Выберите город из списка" });
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

    const flightSearch = `${fromCode}${dateToken}${toCode}${passengerToken}`;

    const url = `https://avia.ts-travel.online/?flightSearch=${flightSearch}`;
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
      
      <div className="flex flex-col gap-3 w-full">
        
       {/* ===== ОДНА СТРОКА: Кнопка "Авиабилеты" + Переключатель ===== */}
<div className="flex items-center justify-between w-full">
  {/* Кнопка "Авиабилеты" (только одна!) */}
  <button
    type="button"
    className="flex items-center justify-center text-sm font-medium px-3 py-1.5 rounded-md bg-gradient-to-r from-[#100877] to-[#887BFF] text-white shadow-sm whitespace-nowrap"
  >
    <Plane className="h-5 w-5 mr-2" />
    Авиабилеты
  </button>

  {/* Переключатель "Туда — сюда / В одну сторону" */}
  <div className="inline-flex items-center gap-1 rounded-md p-1 bg-white/10">
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

        {/* ===== СТРОКА 2: Города ===== */}
        {errors.general && (
          <p className="text-sm text-red-400 rounded-md bg-red-500/10 px-3 py-2">{errors.general}</p>
        )}
        <div className={cn("flex gap-2", isHeaderMobile ? "flex-col" : "flex-col sm:flex-row")}>
          <CityDropdown
            value={fromText}
            onChange={setFromText}
            onSelect={handleFromSelect}
            placeholder="Откуда"
            error={errors.from}
            variant={variant}
          />
          <CityDropdown
            value={toText}
            onChange={setToText}
            onSelect={handleToSelect}
            placeholder="Куда"
            error={errors.to}
            variant={variant}
          />
        </div>

        {/* ===== СТРОКА 3: Даты, Пассажиры, Класс, Кнопка ===== */}
        <div className={cn("flex gap-2", isHeaderMobile ? "flex-col" : "flex-col sm:flex-row sm:items-stretch")}>
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
            <SelectTrigger className={cn(selectTriggerClass, isHeaderMobile ? "w-full" : "sm:w-36")}>
              <SelectValue placeholder="Класс" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="economy">Эконом</SelectItem>
              <SelectItem value="business">Бизнес</SelectItem>
            </SelectContent>
          </Select>

          <Button type="button" onClick={handleSearch} className={cn("shrink-0 font-semibold", isHero ? "h-11 px-6 text-sm rounded-md" : isHeaderMobile ? "w-full h-12 rounded-xl text-base" : "h-10 px-4 rounded-md")}>
            <Search className={cn("mr-2", isHeaderMobile ? "h-5 w-5" : "h-4 w-4")} />
            {isHeaderMobile ? "Найти билеты" : "Найти"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default FlightSearchForm;