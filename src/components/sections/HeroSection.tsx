import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarIcon, Train, Plane, Bus, Search, ArrowDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import trainVideo from "@/assets/video/поезд.mp4";
import flightVideo from "@/assets/video/самолёт новый.mp4";
import busVideo from "@/assets/video/автобус.mp4";
import { cn } from "@/lib/utils";
import { cities } from "@/data/cities";

type TravelType = "train" | "flight" | "bus";

const HeroSection = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [travelType, setTravelType] = useState<TravelType>("train");
  const [tripType, setTripType] = useState<"round" | "one">("round");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [fromCity, setFromCity] = useState<string | undefined>();
  const [toCity, setToCity] = useState<string | undefined>();
  const [ticketType, setTicketType] = useState<string>("coupe");
  const [flightClass, setFlightClass] = useState<string>("economy");
  const [passengers, setPassengers] = useState<string>("1");

  // Сброс даты возврата для автобусов
  useEffect(() => {
    if (travelType === "bus" && dateRange?.to) {
      setDateRange({ from: dateRange.from, to: undefined });
    }
  }, [travelType]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSearch = () => {
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
      if (dateRange?.to) {
        params.set("returnDate", format(dateRange.to, "yyyy-MM-dd"));
      }
      navigate(`/flight-search?${params.toString()}`);
    } else if (travelType === "bus") {
      navigate(`/bus-search?${params.toString()}`);
    }
  };

  return (
    <section id="hero-section" className="relative min-h-screen flex items-center overflow-hidden" style={{ marginTop: '-96px', paddingTop: '96px' }}>
      {/* Фон с видео и затемнением под формой */}
      <div className="absolute inset-0 z-0 overflow-hidden" style={{ top: '-96px', height: 'calc(100% + 96px)' }}>
        <video
          key={travelType}
          autoPlay
          loop
          muted
          playsInline
          className={cn(
            "w-full h-full object-cover",
            travelType === "flight" && "object-top"
          )}
          style={
            travelType === "flight"
              ? {
                  objectPosition: "center 30%",
                  height: "120%",
                  transform: "translateY(-10%)",
                }
              : undefined
          }
        >
          {travelType === "flight" && (
            <source src={flightVideo} type="video/mp4" />
          )}
          {travelType === "bus" && (
            <source src={busVideo} type="video/mp4" />
          )}
          {travelType === "train" && (
            <source src={trainVideo} type="video/mp4" />
          )}
        </video>
        {/* Затемнение фона под формой */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      <div className="container relative z-10 py-20">
        <div className="max-w-4xl mx-auto">
          {/* H1 */}
          <div className="text-center mb-12">
            <h1 className="text-white font-extrabold text-5xl md:text-6xl leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]">
              {(() => {
                const text = "Путешествие это легко!";
                const letters = text.split("");
                const animationDuration = 0.23;
                const totalCycleDuration = letters.length * animationDuration;
                
                return letters.map((letter, index) => {
                  const delay = index * animationDuration;
                  return (
                    <span
                      key={index}
                      className="inline-block"
                      style={{
                        animation: `letterWave ${totalCycleDuration}s ease-in-out ${delay}s infinite`,
                        animationFillMode: "both",
                      }}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                  );
                });
              })()}
            </h1>
          </div>

          {/* Форма поиска */}
          <div ref={formRef} className="bg-black/40 backdrop-blur-xl rounded-lg ring-1 ring-white/10 ring-offset-0 p-4 md:p-5 space-y-4">
            <Tabs value={travelType} onValueChange={(value) => setTravelType(value as TravelType)} defaultValue="train" className="w-full">
              {/* Верхний уровень: Тип транспорта и маршрут */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 pb-3 border-b border-white/10">
                {/* Табы для категорий транспорта */}
                <TabsList className="grid w-full md:w-auto grid-cols-3 bg-white/10 p-1 h-10 gap-1">
                <TabsTrigger 
                  value="train" 
                    className={cn(
                      "flex items-center gap-1.5 text-sm font-medium px-3 transition-all rounded-md",
                      "data-[state=active]:!text-white",
                      travelType === "train"
                        ? "travel-tab-gradient text-white"
                        : "text-white/70 hover:text-white"
                    )}
                >
                    <Train className="h-4 w-4" />
                    <span className="hidden sm:inline">Ж/д</span>
                  <span className="sm:hidden">Ж/д</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="flight"
                    className={cn(
                      "flex items-center gap-1.5 text-sm font-medium px-3 transition-all rounded-md",
                      "data-[state=active]:!text-white",
                      travelType === "flight"
                        ? "travel-tab-gradient text-white"
                        : "text-white/70 hover:text-white"
                    )}
                >
                    <Plane className="h-4 w-4" />
                    <span className="hidden sm:inline">Авиа</span>
                  <span className="sm:hidden">Авиа</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="bus"
                    className={cn(
                      "flex items-center gap-1.5 text-sm font-medium px-3 transition-all rounded-md",
                      "data-[state=active]:!text-white",
                      travelType === "bus"
                        ? "travel-tab-gradient text-white"
                        : "text-white/70 hover:text-white"
                    )}
                >
                    <Bus className="h-4 w-4" />
                    <span>Автобус</span>
                </TabsTrigger>
              </TabsList>

              {/* Сегментированный переключатель маршрута */}
              {(travelType === "train" || travelType === "flight") && (
                <div className="flex items-center gap-1 bg-white/10 rounded-md p-1">
                  <button
                    onClick={() => setTripType("round")}
                    className={cn(
                      "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                      tripType === "round"
                        ? "bg-white/20 text-white"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    <span className={cn(
                      tripType === "round" ? "text-[#0D0D6E]" : "text-white/70"
                    )}>Туда</span>
                    <span className={cn(
                      "mx-1",
                      tripType === "round" ? "text-white/50" : "text-white/50"
                    )}>-</span>
                    <span className={cn(
                      tripType === "round" ? "text-[#867DFF]" : "text-white/70"
                    )}>сюда</span>
                  </button>
                  <button
                    onClick={() => setTripType("one")}
                    className={cn(
                      "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                      tripType === "one"
                        ? "bg-white/20 text-white"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    В одну сторону
                  </button>
                </div>
              )}
                </div>

              {/* Нижний уровень: Поля ввода */}
              <TabsContent value="train" className="mt-0 space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                      <Select value={fromCity} onValueChange={setFromCity}>
                      <SelectTrigger className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm [&>svg]:text-white/70 rounded-md">
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
                    </div>

                    <div className="flex-1">
                      <Select value={toCity} onValueChange={setToCity}>
                      <SelectTrigger className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm [&>svg]:text-white/70 rounded-md">
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
                    </div>
                  </div>

                <div className="flex flex-col sm:flex-row gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                          "h-11 px-3 justify-start text-left font-normal flex-1 text-sm bg-white/10 border-white/20 text-white rounded-md",
                          !dateRange?.from && "text-white/50"
                          )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                          <span className="truncate">
                            {dateRange?.from ? (
                            format(dateRange.from, "dd.MM", { locale: ru })
                            ) : (
                            "Дата туда"
                            )}
                          </span>
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
                          />
                        ) : (
                          <Calendar
                            mode="single"
                            selected={dateRange?.from}
                            onSelect={(date) => setDateRange(date ? { from: date, to: undefined } : undefined)}
                            initialFocus
                            numberOfMonths={2}
                            disabled={(date) => date < new Date()}
                          />
                        )}
                      </PopoverContent>
                    </Popover>

                    {tripType === "round" && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                            "h-11 px-3 justify-start text-left font-normal flex-1 text-sm bg-white/10 border-white/20 text-white rounded-md",
                            !dateRange?.to && "text-white/50"
                            )}
                          >
                          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                            <span className="truncate">
                              {dateRange?.to ? (
                              format(dateRange.to, "dd.MM", { locale: ru })
                              ) : (
                              "Дата обратно"
                              )}
                            </span>
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
                          />
                        </PopoverContent>
                      </Popover>
                    )}

                  <div className="sm:w-32">
                      <Select value={ticketType} onValueChange={setTicketType}>
                      <SelectTrigger className="h-11 bg-white/10 border-white/20 text-white text-sm [&>svg]:text-white/70">
                          <SelectValue placeholder="Класс" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="platzkart">Плацкарт</SelectItem>
                          <SelectItem value="coupe">Купе</SelectItem>
                          <SelectItem value="sv">СВ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                  <div className="sm:w-36">
                      <Select value={passengers} onValueChange={setPassengers}>
                      <SelectTrigger className="h-11 bg-white/10 border-white/20 text-white text-sm [&>svg]:text-white/70">
                        <SelectValue placeholder="Пассажиры" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 пассажир</SelectItem>
                          <SelectItem value="2">2 пассажира</SelectItem>
                          <SelectItem value="3">3 пассажира</SelectItem>
                          <SelectItem value="4">4 пассажира</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={handleSearch}
                      className="h-11 px-6 text-sm font-medium transition-all rounded-md"
                      disabled={!fromCity || !toCity || !dateRange?.from}
                    >
                    <Search className="h-4 w-4 mr-2" />
                    Найти
                    </Button>
                </div>
              </TabsContent>

              <TabsContent value="flight" className="mt-0 space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                      <Select value={fromCity} onValueChange={setFromCity}>
                      <SelectTrigger className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm [&>svg]:text-white/70 rounded-md">
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
                    </div>

                    <div className="flex-1">
                      <Select value={toCity} onValueChange={setToCity}>
                      <SelectTrigger className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm [&>svg]:text-white/70 rounded-md">
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
                    </div>
                  </div>

                <div className="flex flex-col sm:flex-row gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                          "h-11 px-3 justify-start text-left font-normal flex-1 text-sm bg-white/10 border-white/20 text-white rounded-md",
                          !dateRange?.from && "text-white/50"
                          )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                          <span className="truncate">
                            {dateRange?.from ? (
                            format(dateRange.from, "dd.MM", { locale: ru })
                            ) : (
                            "Дата туда"
                            )}
                          </span>
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
                          />
                        ) : (
                          <Calendar
                            mode="single"
                            selected={dateRange?.from}
                            onSelect={(date) => setDateRange(date ? { from: date, to: undefined } : undefined)}
                            initialFocus
                            numberOfMonths={2}
                            disabled={(date) => date < new Date()}
                          />
                        )}
                      </PopoverContent>
                    </Popover>

                    {tripType === "round" && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                            "h-11 px-3 justify-start text-left font-normal flex-1 text-sm bg-white/10 border-white/20 text-white rounded-md",
                            !dateRange?.to && "text-white/50"
                            )}
                          >
                          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                            <span className="truncate">
                              {dateRange?.to ? (
                              format(dateRange.to, "dd.MM", { locale: ru })
                              ) : (
                              "Дата обратно"
                              )}
                            </span>
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
                          />
                        </PopoverContent>
                      </Popover>
                    )}

                  <div className="sm:w-32">
                      <Select value={flightClass} onValueChange={setFlightClass}>
                      <SelectTrigger className="h-11 bg-white/10 border-white/20 text-white text-sm [&>svg]:text-white/70">
                          <SelectValue placeholder="Класс" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">Эконом</SelectItem>
                          <SelectItem value="comfort">Комфорт</SelectItem>
                          <SelectItem value="business">Бизнес</SelectItem>
                          <SelectItem value="first">Первый класс</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                  <div className="sm:w-36">
                      <Select value={passengers} onValueChange={setPassengers}>
                      <SelectTrigger className="h-11 bg-white/10 border-white/20 text-white text-sm [&>svg]:text-white/70">
                        <SelectValue placeholder="Пассажиры" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 пассажир</SelectItem>
                          <SelectItem value="2">2 пассажира</SelectItem>
                          <SelectItem value="3">3 пассажира</SelectItem>
                          <SelectItem value="4">4 пассажира</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={handleSearch}
                      className="h-11 px-6 text-sm font-medium transition-all rounded-md"
                      disabled={!fromCity || !toCity || !dateRange?.from}
                    >
                    <Search className="h-4 w-4 mr-2" />
                    Найти
                    </Button>
                </div>
              </TabsContent>

              <TabsContent value="bus" className="mt-0 space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1">
                      <Select value={fromCity} onValueChange={setFromCity}>
                      <SelectTrigger className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm [&>svg]:text-white/70 rounded-md">
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
                    </div>

                    <div className="flex-1">
                      <Select value={toCity} onValueChange={setToCity}>
                      <SelectTrigger className="h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm [&>svg]:text-white/70 rounded-md">
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
                    </div>
                  </div>

                <div className="flex flex-col sm:flex-row gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                          "h-11 px-3 justify-start text-left font-normal flex-1 text-sm bg-white/10 border-white/20 text-white rounded-md",
                          !dateRange?.from && "text-white/50"
                          )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                          <span className="truncate">
                            {dateRange?.from ? (
                            format(dateRange.from, "dd.MM", { locale: ru })
                            ) : (
                              "Дата поездки"
                            )}
                          </span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange?.from}
                          onSelect={(date) => setDateRange(date ? { from: date, to: undefined } : undefined)}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>

                  <div className="sm:w-36">
                      <Select value={passengers} onValueChange={setPassengers}>
                      <SelectTrigger className="h-11 bg-white/10 border-white/20 text-white text-sm [&>svg]:text-white/70">
                        <SelectValue placeholder="Пассажиры" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 пассажир</SelectItem>
                          <SelectItem value="2">2 пассажира</SelectItem>
                          <SelectItem value="3">3 пассажира</SelectItem>
                          <SelectItem value="4">4 пассажира</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={handleSearch}
                      className="h-11 px-6 text-sm font-medium transition-all rounded-md"
                      disabled={!fromCity || !toCity || !dateRange?.from}
                    >
                    <Search className="h-4 w-4 mr-2" />
                    Найти
                    </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Кнопка прокрутки к форме (если форма не видна) */}
      <button
        onClick={scrollToForm}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 bg-white/90 hover:bg-white text-primary rounded-full p-3 shadow-lg hover:shadow-xl transition-all animate-bounce"
        aria-label="Перейти к форме поиска"
      >
        <ArrowDown className="h-6 w-6" />
      </button>
    </section>
  );
};

export default HeroSection;
