import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Train, Plane, Bus, BedDouble } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import trainBackground from "@/assets/fon.png";
import heroTrain from "@/assets/hero-train.png";
import trainInterior from "@/assets/train-interior.jpg";
import skyBackground from "@/assets/fon-nebo.png";
import heroPlane from "@/assets/samolet.png";
import roadBackground from "@/assets/fon-doroga.png";
import heroBus from "@/assets/abobus.png";
import { cn } from "@/lib/utils";
import { cities } from "@/data/cities";

type TravelType = "train" | "flight" | "bus" | "hotel";

const HeroSection = () => {
  const navigate = useNavigate();
  const [travelType, setTravelType] = useState<TravelType>("train");
  const [tripType, setTripType] = useState<"round" | "one">("round");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [fromCity, setFromCity] = useState<string | undefined>();
  const [toCity, setToCity] = useState<string | undefined>();
  const [ticketType, setTicketType] = useState<string>("coupe");
  const [flightClass, setFlightClass] = useState<string>("economy");
  const [passengers, setPassengers] = useState<string>("1");
  const [hotelDestination, setHotelDestination] = useState<string>("Москва");
  const [guests, setGuests] = useState<string>("2");
  const [animationKey, setAnimationKey] = useState<number>(0);

  // Сбрасываем анимацию при изменении типа путешествия
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [travelType]);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      <div className="container relative pb-32 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                Путешествие<br />это легко!
              </h1>
              <div className="space-y-4">
                <p className="text-lg md:text-xl text-muted-foreground font-semibold mb-3">
                  Чем мы гордимся:
                </p>
                <ul className="space-y-2 text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Поиск расписания, выбор мест, безопасная оплата и ЭПД — в одном окне</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Готовые маршруты по регионам России</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Путеводители с обзорами городов и достопримечательностей</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Полезная справочная информация и советы от опытных путешественников</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Электронные билеты и быстрая регистрация</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Иконки типов поездок */}
            <div className="flex gap-4 flex-wrap mt-8 lg:mt-22">
              <button
                onClick={() => setTravelType("train")}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl transition-all",
                  travelType === "train"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                    travelType === "train"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <Train className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Ж/д билеты</span>
              </button>

              <button
                onClick={() => setTravelType("flight")}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl transition-all",
                  travelType === "flight"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                    travelType === "flight"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <Plane className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Авиабилеты</span>
              </button>

              <button
                onClick={() => setTravelType("bus")}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl transition-all",
                  travelType === "bus"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                    travelType === "bus"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <Bus className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Автобусы</span>
              </button>

              <button
                onClick={() => setTravelType("hotel")}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl transition-all",
                  travelType === "hotel"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                style={{ display: 'none' }}
                disabled
                aria-hidden="true"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                    travelType === "hotel"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <BedDouble className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Отели</span>
              </button>
            </div>
          </div>

          <div className="relative hidden lg:flex gap-4 animate-slide-in mr-[calc(50%-50vw)] pointer-events-none select-none">
            <div className="flex-1 relative overflow-visible">
              {travelType === "flight" ? (
                <>
                  {/* Фон (небо) - появляется первым */}
                  <img 
                    src={skyBackground} 
                    alt="Небо" 
                    className="rounded-2xl shadow-2xl w-full h-[800px] object-cover animate-fade-in pointer-events-none select-none"
                    draggable="false"
                    key={`sky-bg-${animationKey}`}
                  />
                  {/* Самолёт поверх фона - пролетает и становится на место */}
                  <img 
                    src={heroPlane} 
                    alt="Самолёт" 
                    className="absolute top-16 object-contain animate-plane-enter opacity-0 pointer-events-none select-none"
                    style={{ 
                      left: '-60%', 
                      height: '800px',
                      width: '182%',
                      maxWidth: 'none',
                      animationFillMode: 'forwards',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none'
                    }}
                    draggable="false"
                    key={`plane-${animationKey}`}
                  />
                </>
              ) : travelType === "bus" ? (
                <>
                  {/* Фон (дорога) - появляется первым */}
                  <img 
                    src={roadBackground} 
                    alt="Дорога" 
                    className="rounded-2xl shadow-2xl w-full h-[800px] object-cover animate-fade-in pointer-events-none select-none"
                    draggable="false"
                    key={`road-bg-${animationKey}`}
                  />
                  {/* Автобус поверх фона - выезжает и становится на место */}
                  <img 
                    src={heroBus} 
                    alt="Автобус" 
                    className="absolute top-0 object-contain animate-bus-enter opacity-0 pointer-events-none select-none"
                    style={{ 
                      left: '-40%', 
                      height: '1000px',
                      width: '135%',
                      maxWidth: 'none',
                      animationFillMode: 'forwards',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none'
                    }}
                    draggable="false"
                    key={`bus-${animationKey}`}
                  />
                </>
              ) : (
                <>
                  {/* Фон (железная дорога) - появляется первым */}
                  <img 
                    src={trainBackground} 
                    alt="Железная дорога" 
                    className="rounded-2xl shadow-2xl w-full h-[800px] object-cover animate-fade-in pointer-events-none select-none"
                    draggable="false"
                    key={`train-bg-${animationKey}`}
                  />
                  {/* Поезд поверх фона - выезжает и становится на место */}
                  <img 
                    src={heroTrain} 
                    alt="Современный поезд" 
                    className="absolute top-0 object-contain animate-train-enter opacity-0 pointer-events-none select-none"
                    style={{ 
                      left: '-60%', 
                      height: '800px',
                      width: '182%',
                      maxWidth: 'none',
                      animationFillMode: 'forwards',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none'
                    }}
                    draggable="false"
                    key={`train-${animationKey}`}
                  />
                </>
              )}
            </div>
            <div className="flex-1">
              <img 
                src={trainInterior} 
                alt="Интерьер поезда" 
                className="rounded-2xl shadow-2xl w-full h-[800px] object-cover pointer-events-none select-none"
                draggable="false"
              />
            </div>
          </div>
        </div>

        <div
          className={cn(
            "bg-card rounded-2xl shadow-xl border z-10 w-full mt-8",
            "flex flex-col",
            "lg:absolute lg:left-0 lg:right-[28%] lg:top-[66%] lg:transform lg:mt-0",
            "pointer-events-auto",
            travelType === "hotel" ? "p-4" : "p-4 gap-6"
          )}
        >
          {travelType === "hotel" ? (
            // Форма для отелей
            <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
              <div className="flex-1 border-r border-border pr-3">
                <label className="text-xs text-muted-foreground mb-1 block">Куда хотите поехать?</label>
                <Select value={hotelDestination} onValueChange={setHotelDestination}>
                  <SelectTrigger className="h-14 px-3 text-base font-semibold">
                    <SelectValue placeholder="Москва" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={`hotel-${city}`} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 border-r border-border pr-3">
                <label className="text-xs text-muted-foreground mb-1 block">Заезд – Выезд</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-14 px-4 justify-start text-left font-normal w-full",
                        !dateRange?.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from && dateRange?.to ? (
                        `${format(dateRange.from, "dd.MM", { locale: ru })} – ${format(dateRange.to, "dd.MM", { locale: ru })}`
                      ) : (
                        <span>Выберите даты</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      initialFocus
                      numberOfMonths={2}
                      disabled={(date) => date < new Date()}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex-1 pr-3">
                <label className="text-xs text-muted-foreground mb-1 block">Кто едет</label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="h-14 px-3 text-base font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 гость</SelectItem>
                    <SelectItem value="2">2 гостя</SelectItem>
                    <SelectItem value="3">3 гостя</SelectItem>
                    <SelectItem value="4">4 гостя</SelectItem>
                    <SelectItem value="5">5+ гостей</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="h-14 px-6 w-full lg:w-auto shrink-0 bg-primary hover:bg-primary/90 text-sm lg:text-base"
                onClick={() => {
                  if (!hotelDestination || !dateRange?.from || !dateRange?.to) {
                    return;
                  }
                  const params = new URLSearchParams({
                    destination: hotelDestination,
                    checkIn: format(dateRange.from, "yyyy-MM-dd"),
                    checkOut: format(dateRange.to, "yyyy-MM-dd"),
                    guests
                  });
                  navigate(`/hotel-search?${params.toString()}`);
                }}
              >
                Найти отели
              </Button>
            </div>
          ) : (
            // Форма для поездов, самолётов и автобусов
            <>
              <div className="flex gap-2 flex-wrap">
                <Button variant={tripType === "round" ? "default" : "outline"} size="sm" onClick={() => setTripType("round")}>
                  Туда-обратно
                </Button>
                <Button variant={tripType === "one" ? "default" : "outline"} size="sm" onClick={() => setTripType("one")}>
                  В одну сторону
                </Button>
              </div>

              <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
                <Select value={fromCity} onValueChange={setFromCity}>
                  <SelectTrigger className="h-14 min-w-[200px] flex-1">
                    <SelectValue placeholder="Откуда" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={`from-${city}`} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={toCity} onValueChange={setToCity}>
                  <SelectTrigger className="h-14 min-w-[200px] flex-1">
                    <SelectValue placeholder="Куда" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={`to-${city}`} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "h-14 px-4 justify-start text-left font-normal flex-1 min-w-[200px]",
                        !dateRange?.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        format(dateRange.from, "dd.MM.yyyy", { locale: ru })
                      ) : (
                        <span>Когда уезжаете?</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    {tripType === "round" ? (
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange}
                        initialFocus
                        numberOfMonths={2}
                        disabled={(date) => date < new Date()}
                        className="pointer-events-auto"
                      />
                    ) : (
                      <Calendar
                        mode="single"
                        selected={dateRange?.from}
                        onSelect={(date) => setDateRange(date ? { from: date, to: undefined } : undefined)}
                        initialFocus
                        numberOfMonths={2}
                        disabled={(date) => date < new Date()}
                        className="pointer-events-auto"
                      />
                    )}
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={tripType === "one"}
                      className={cn(
                        "h-14 px-4 justify-start text-left font-normal flex-1 min-w-[200px]",
                        !dateRange?.to && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.to && tripType === "round" ? (
                        format(dateRange.to, "dd.MM.yyyy", { locale: ru })
                      ) : (
                        <span>{tripType === "one" ? "—" : "Когда приезжаете?"}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  {tripType === "round" && (
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange}
                        initialFocus
                        numberOfMonths={2}
                        disabled={(date) => date < new Date()}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  )}
                </Popover>

                {travelType === "train" && (
                  <Select value={ticketType} onValueChange={setTicketType}>
                    <SelectTrigger className="h-14 w-full lg:w-[140px] lg:shrink-0">
                      <SelectValue placeholder="Класс" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="platzkart">Плацкарт</SelectItem>
                      <SelectItem value="coupe">Купе</SelectItem>
                      <SelectItem value="sv">СВ</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                {travelType === "flight" && (
                  <Select value={flightClass} onValueChange={setFlightClass}>
                    <SelectTrigger className="h-14 w-full lg:w-[160px] lg:shrink-0">
                      <SelectValue placeholder="Класс" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economy">Эконом</SelectItem>
                      <SelectItem value="comfort">Комфорт</SelectItem>
                      <SelectItem value="business">Бизнес</SelectItem>
                      <SelectItem value="first">Первый класс</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                <Select value={passengers} onValueChange={setPassengers}>
                  <SelectTrigger className="h-14 w-full lg:w-[160px] lg:shrink-0">
                    <SelectValue placeholder="Кто едет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 пассажир</SelectItem>
                    <SelectItem value="2">2 пассажира</SelectItem>
                    <SelectItem value="3">3 пассажира</SelectItem>
                    <SelectItem value="4">4 пассажира</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  className={cn(
                    "shrink-0 bg-primary hover:bg-primary/90 text-sm lg:text-base border-0",
                    travelType === "flight" ? "h-14 w-full lg:w-[160px] px-4" : "h-14 px-6 w-full lg:w-auto"
                  )}
                  onClick={() => {
                    if (!fromCity || !toCity || !dateRange?.from) {
                      return;
                    }
                    const params = new URLSearchParams({
                      from: fromCity,
                      to: toCity,
                      date: format(dateRange.from, "yyyy-MM-dd"),
                      passengers
                    });
                    if (travelType === "train") {
                      params.set("ticketType", ticketType);
                      navigate(`/train-search?${params.toString()}`);
                    } else if (travelType === "flight") {
                      params.set("class", flightClass);
                      navigate(`/flight-search?${params.toString()}`);
                    } else if (travelType === "bus") {
                      navigate(`/bus-search?${params.toString()}`);
                    }
                  }}
                >
                  {travelType === "train" && "Найти поезда"}
                  {travelType === "flight" && "Найти авиабилеты"}
                  {travelType === "bus" && "Найти автобусы"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;