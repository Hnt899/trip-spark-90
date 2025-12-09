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
          <div ref={formRef} className="bg-white rounded-2xl shadow-2xl border-2 border-primary/20 p-6 md:p-8 space-y-6">
            {/* Табы для категорий */}
            <Tabs value={travelType} onValueChange={(value) => setTravelType(value as TravelType)} defaultValue="train" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 h-14">
                <TabsTrigger 
                  value="train" 
                  className="flex items-center gap-2 text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <Train className="h-5 w-5" />
                  <span className="hidden sm:inline">Ж/д билеты</span>
                  <span className="sm:hidden">Ж/д</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="flight"
                  className="flex items-center gap-2 text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <Plane className="h-5 w-5" />
                  <span className="hidden sm:inline">Авиабилеты</span>
                  <span className="sm:hidden">Авиа</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="bus"
                  className="flex items-center gap-2 text-base font-semibold data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  <Bus className="h-5 w-5" />
                  <span>Автобусы</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="train" className="mt-6 space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    variant={tripType === "round" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setTripType("round")}
                    className="font-semibold"
                  >
                    Туда-обратно
                  </Button>
                  <Button 
                    variant={tripType === "one" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setTripType("one")}
                    className="font-semibold"
                  >
                    В одну сторону
                  </Button>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <Select value={fromCity} onValueChange={setFromCity}>
                        <SelectTrigger className="h-14 text-base font-medium">
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
                        <SelectTrigger className="h-14 text-base font-medium">
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

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "h-14 px-4 justify-start text-left font-medium flex-1 text-base",
                            !dateRange?.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-5 w-5 shrink-0" />
                          <span className="truncate">
                            {dateRange?.from ? (
                              format(dateRange.from, "dd.MM.yyyy", { locale: ru })
                            ) : (
                              "Когда уезжаете?"
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
                              "h-14 px-4 justify-start text-left font-medium flex-1 text-base",
                              !dateRange?.to && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-5 w-5 shrink-0" />
                            <span className="truncate">
                              {dateRange?.to ? (
                                format(dateRange.to, "dd.MM.yyyy", { locale: ru })
                              ) : (
                                "Когда приезжаете?"
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
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="sm:flex-1">
                      <Select value={ticketType} onValueChange={setTicketType}>
                        <SelectTrigger className="h-14 text-base font-medium">
                          <SelectValue placeholder="Класс" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="platzkart">Плацкарт</SelectItem>
                          <SelectItem value="coupe">Купе</SelectItem>
                          <SelectItem value="sv">СВ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="sm:flex-1">
                      <Select value={passengers} onValueChange={setPassengers}>
                        <SelectTrigger className="h-14 text-base font-medium">
                          <SelectValue placeholder="Кто едет" />
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
                      className="h-14 px-6 sm:px-8 bg-primary hover:bg-primary/90 text-base font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                      disabled={!fromCity || !toCity || !dateRange?.from}
                    >
                      <Search className="h-5 w-5 mr-2" />
                      Найти поезда
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="flight" className="mt-6 space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    variant={tripType === "round" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setTripType("round")}
                    className="font-semibold"
                  >
                    Туда-обратно
                  </Button>
                  <Button 
                    variant={tripType === "one" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setTripType("one")}
                    className="font-semibold"
                  >
                    В одну сторону
                  </Button>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <Select value={fromCity} onValueChange={setFromCity}>
                        <SelectTrigger className="h-14 text-base font-medium">
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
                        <SelectTrigger className="h-14 text-base font-medium">
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

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "h-14 px-4 justify-start text-left font-medium flex-1 text-base",
                            !dateRange?.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-5 w-5 shrink-0" />
                          <span className="truncate">
                            {dateRange?.from ? (
                              format(dateRange.from, "dd.MM.yyyy", { locale: ru })
                            ) : (
                              "Когда уезжаете?"
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
                              "h-14 px-4 justify-start text-left font-medium flex-1 text-base",
                              !dateRange?.to && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-5 w-5 shrink-0" />
                            <span className="truncate">
                              {dateRange?.to ? (
                                format(dateRange.to, "dd.MM.yyyy", { locale: ru })
                              ) : (
                                "Когда приезжаете?"
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
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="sm:flex-1">
                      <Select value={flightClass} onValueChange={setFlightClass}>
                        <SelectTrigger className="h-14 text-base font-medium">
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

                    <div className="sm:flex-1">
                      <Select value={passengers} onValueChange={setPassengers}>
                        <SelectTrigger className="h-14 text-base font-medium">
                          <SelectValue placeholder="Кто едет" />
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
                      className="h-14 px-6 sm:px-8 bg-primary hover:bg-primary/90 text-base font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                      disabled={!fromCity || !toCity || !dateRange?.from}
                    >
                      <Search className="h-5 w-5 mr-2" />
                      Найти авиабилеты
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bus" className="mt-6 space-y-4">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <Select value={fromCity} onValueChange={setFromCity}>
                        <SelectTrigger className="h-14 text-base font-medium">
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
                        <SelectTrigger className="h-14 text-base font-medium">
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

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "h-14 px-4 justify-start text-left font-medium flex-1 text-base",
                            !dateRange?.from && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-5 w-5 shrink-0" />
                          <span className="truncate">
                            {dateRange?.from ? (
                              format(dateRange.from, "dd.MM.yyyy", { locale: ru })
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

                    <div className="sm:flex-1">
                      <Select value={passengers} onValueChange={setPassengers}>
                        <SelectTrigger className="h-14 text-base font-medium">
                          <SelectValue placeholder="Кто едет" />
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
                      className="h-14 px-6 sm:px-8 bg-primary hover:bg-primary/90 text-base font-bold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                      disabled={!fromCity || !toCity || !dateRange?.from}
                    >
                      <Search className="h-5 w-5 mr-2" />
                      Найти автобусы
                    </Button>
                  </div>
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
