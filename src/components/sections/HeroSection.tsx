import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import trainBackground from "@/assets/fon.png";
import heroTrain from "@/assets/hero-train.png";
import trainInterior from "@/assets/train-interior.jpg";
import { cn } from "@/lib/utils";
import { cities } from "@/data/cities";

const HeroSection = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<"round" | "one">("round");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [fromCity, setFromCity] = useState<string | undefined>();
  const [toCity, setToCity] = useState<string | undefined>();
  const [ticketType, setTicketType] = useState<string>("coupe");
  const [passengers, setPassengers] = useState<string>("1");

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      <div className="container relative pb-32 lg:pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                Найдите билет на поезд онлайн
              </h1>
              <div className="space-y-4">
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                  Поиск расписания, выбор мест, безопасная оплата и ЭПД — в одном окне. 
                  Откройте для себя готовые маршруты по регионам России, путеводители с обзорами городов и достопримечательностей, 
                  полезную справочную информацию и советы от опытных путешественников.
                </p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:flex gap-4 animate-slide-in mr-[calc(50%-50vw)]">
            <div className="flex-1 relative overflow-visible">
              {/* Фон (железная дорога) - появляется первым */}
              <img 
                src={trainBackground} 
                alt="Железная дорога" 
                className="rounded-2xl shadow-2xl w-full h-[800px] object-cover animate-fade-in"
              />
              {/* Поезд поверх фона - выезжает и становится на место */}
              <img 
                src={heroTrain} 
                alt="Современный поезд" 
                className="absolute top-0 object-contain animate-train-enter opacity-0"
                style={{ 
                  left: '-60%', 
                  height: '800px',
                  width: '182%',
                  maxWidth: 'none',
                  animationFillMode: 'forwards'
                }}
              />
            </div>
            <div className="flex-1">
              <img 
                src={trainInterior} 
                alt="Интерьер поезда" 
                className="rounded-2xl shadow-2xl w-full h-[800px] object-cover"
              />
            </div>
          </div>
        </div>

        <div
          className={cn(
            "bg-card p-4 rounded-2xl shadow-xl border z-10 w-full mt-8",
            "flex flex-col gap-6",
            "lg:absolute lg:left-0 lg:right-[28%] lg:top-1/2 lg:translate-y-[10%] lg:transform lg:mt-0"
          )}
        >
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
              className="h-14 px-8 w-full lg:w-auto shrink-0 bg-primary hover:bg-primary/90"
              onClick={() => {
                if (!fromCity || !toCity || !dateRange?.from) {
                  return;
                }
                const params = new URLSearchParams({
                  from: fromCity,
                  to: toCity,
                  date: format(dateRange.from, "yyyy-MM-dd"),
                  ticketType,
                  passengers
                });
                navigate(`/train-search?${params.toString()}`);
              }}
            >
              Найти поезда
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;