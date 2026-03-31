import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CarouselNavButton, CarouselNavButtonsMobile } from "@/components/ui/carousel-nav-button";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import type { SectionSurface } from "@/lib/sectionSurface";
import {
  carouselDotClass,
  sectionCardLiftClass,
  sectionHeadingAccentClass,
  sectionHeadingBaseClass,
  sectionLeadClass,
  sectionShellClass,
  sectionYellowGlow,
} from "@/lib/sectionSurface";

interface EventsSectionProps {
  surface?: SectionSurface;
}

const EventsSection = ({ surface = "brand" }: EventsSectionProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const events = [
    {
      city: "Краснодар",
      age: "12+",
      price: "от 2500",
      artist: "ARTIC & ASTI",
      date: "23 октября",
      venue: "Ледовый дворец",
      color: "from-red-900 to-red-700",
    },
    {
      city: "Казань",
      age: "18+",
      price: "от 2500",
      artist: "Anna Asti. Шоу «Царица»",
      date: "9 ноября",
      venue: "Татнефть Арена",
      color: "from-pink-700 to-pink-500",
    },
    {
      city: "Петербург",
      age: "12+",
      price: "от 2500",
      artist: "Баста",
      date: "20 декабря",
      venue: "Газпром Арена",
      color: "from-orange-800 to-blue-900",
    },
    {
      city: "Москва",
      age: "16+",
      price: "от 3000",
      artist: "Сергей Лазарев",
      date: "5 ноября",
      venue: "Crocus City Hall",
      color: "from-purple-900 to-purple-600",
    },
    {
      city: "Екатеринбург",
      age: "18+",
      price: "от 2800",
      artist: "Макс Корж",
      date: "15 ноября",
      venue: "КРК Уралец",
      color: "from-blue-900 to-blue-600",
    },
    {
      city: "Нижний Новгород",
      age: "12+",
      price: "от 2200",
      artist: "Земфира",
      date: "18 ноября",
      venue: "КЗ Нагорный",
      color: "from-green-900 to-green-600",
    },
    {
      city: "Новосибирск",
      age: "16+",
      price: "от 2600",
      artist: "Би-2",
      date: "25 ноября",
      venue: "Дворец Спорта",
      color: "from-yellow-900 to-yellow-600",
    },
    {
      city: "Сочи",
      age: "18+",
      price: "от 3500",
      artist: "Мот",
      date: "1 декабря",
      venue: "Фестивальный",
      color: "from-teal-900 to-teal-600",
    },
    {
      city: "Уфа",
      age: "12+",
      price: "от 2400",
      artist: "Полина Гагарина",
      date: "8 декабря",
      venue: "Конгресс-Холл",
      color: "from-indigo-900 to-indigo-600",
    },
    {
      city: "Владивосток",
      age: "16+",
      price: "от 2900",
      artist: "Монеточка",
      date: "12 декабря",
      venue: "Фетисов Арена",
      color: "from-rose-900 to-rose-600",
    },
  ];

  // Десктоп конфиг
  const desktopVisibleCount = 3;
  const desktopCardWidthPercent = 100.1 / desktopVisibleCount;
  
  // Build clones for seamless loop: tail + original + head (для десктопа)
  const desktopTrackItems = useMemo(() => {
    const head = events.slice(0, desktopVisibleCount);
    const tail = events.slice(-desktopVisibleCount);
    return [...tail, ...events, ...head];
  }, []);

  const totalOriginal = events.length;
  const desktopStartAt = desktopVisibleCount;
  
  // Десктоп состояние
  const [desktopCurrent, setDesktopCurrent] = useState(desktopStartAt);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [slideWidthPx, setSlideWidthPx] = useState(0);

  // Мобильное состояние - простая логика
  const [mobileCurrent, setMobileCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setSlideWidthPx(w / desktopVisibleCount);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goToDesktop = (next: number) => {
    setIsAnimating(true);
    setDesktopCurrent(next);
  };

  const handlePrev = () => {
    if (isMobile) {
      setMobileCurrent((prev) => Math.max(0, prev - 1));
    } else {
      goToDesktop(desktopCurrent - 1);
    }
  };
  
  const handleNext = () => {
    if (isMobile) {
      setMobileCurrent((prev) => Math.min(events.length - 1, prev + 1));
    } else {
      goToDesktop(desktopCurrent + 1);
    }
  };

  // Обработчики для swipe на мобильной версии
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50; // Минимальное расстояние для свайпа

    if (distance > minSwipeDistance) {
      // Swipe left - следующая карточка
      setMobileCurrent((prev) => Math.min(events.length - 1, prev + 1));
    }
    
    if (distance < -minSwipeDistance) {
      // Swipe right - предыдущая карточка
      setMobileCurrent((prev) => Math.max(0, prev - 1));
    }
    
    // Сбрасываем значения
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (!isMobile) {
      // Десктоп логика
      if (desktopCurrent < desktopVisibleCount) {
        const snap = desktopCurrent + totalOriginal;
        setDesktopCurrent(snap);
        if (trackRef.current) {
          trackRef.current.style.transition = "none";
          trackRef.current.style.transform = `translateX(-${(snap - desktopStartAt) * slideWidthPx}px)`;
          void trackRef.current.offsetHeight;
          trackRef.current.style.transition = "transform 500ms ease";
        }
      } else if (desktopCurrent >= totalOriginal + desktopVisibleCount) {
        const snap = desktopCurrent - totalOriginal;
        setDesktopCurrent(snap);
        if (trackRef.current) {
          trackRef.current.style.transition = "none";
          trackRef.current.style.transform = `translateX(-${(snap - desktopStartAt) * slideWidthPx}px)`;
          void trackRef.current.offsetHeight;
          trackRef.current.style.transition = "transform 500ms ease";
        }
      }
    }
  };

  return (
    <section className={sectionShellClass(surface, "pt-20 pb-12 md:py-20")}>
      {/* Декоративные желтые пятна */}
      {surface === "brand" && (
      <div className="absolute inset-0 pointer-events-none hidden lg:block z-0">
        {/* Левое пятно - от центра поднимаемся вверх на 30px */}
        <div 
          className="absolute rounded-full blur-3xl"
          style={{
            width: '400px',
            height: '400px',
            left: '-150px',
            top: 'calc(50% - 30px)',
            transform: 'translateY(-50%)',
            background: '#F9B84F',
            opacity: 0.3,
          }}
        />
        {/* Правое пятно - от центра опускаемся вниз на 30px */}
        <div 
          className="absolute rounded-full blur-3xl"
          style={{
            width: '400px',
            height: '400px',
            right: '-100px',
            top: 'calc(50% + 30px)',
            transform: 'translateY(-50%)',
            background: '#F9B84F',
            opacity: 0.3,
          }}
        />
      </div>
      )}
      <div className="container relative z-10">
        <div className="text-center md:flex md:justify-between md:items-center mb-8">
          <div className="md:text-left">
            <h2 className={cn("text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 leading-tight pb-2", sectionHeadingBaseClass(surface))}>
              Повод для{" "}
              <span
                className={sectionHeadingAccentClass(surface)}
                style={surface === "brand" ? sectionYellowGlow : undefined}
              >
                путешествия
              </span>
            </h2>
            <p className={sectionLeadClass(surface)}>
              10 событий, ради которых стоит ровнуть в путь
            </p>
          </div>
          <Button 
            variant="ghost" 
            className={cn(
              "hidden md:flex items-center gap-2",
              surface === "light" && "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            )}
            onClick={() => navigate("/blog")}
          >
            Ещё <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Десктоп версия - 3 карточки (НЕ ТРОГАЕМ) */}
        <div className="hidden md:block relative">
          <div className="overflow-hidden" ref={containerRef}>
            <div
              ref={trackRef}
              className="flex"
              style={{
                transform: `translateX(-${(desktopCurrent - desktopStartAt) * slideWidthPx}px)`,
                transition: isAnimating ? "transform 500ms ease" : undefined,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {desktopTrackItems.map((event, index) => (
                <div
                  key={`${event.city}-${index}`}
                  className="pr-6 flex-shrink-0"
                  style={{ minWidth: `${desktopCardWidthPercent}%` }}
                >
                  <div 
                    className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer transition-transform duration-300"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.color}`}>
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>

                    <div className="relative h-full p-6 flex flex-col justify-between text-white">
                      <div className="flex justify-between items-start">
                        <h3 className="text-3xl font-bold">{event.city}</h3>
                        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">{event.age}</span>
                      </div>

                      <div className="space-y-2">
                        <p className="text-4xl font-bold">{event.price}</p>
                        <p className="text-xl font-semibold">{event.artist}</p>
                        <p className="text-sm opacity-90">{event.date} • {event.venue}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CarouselNavButton direction="prev" onClick={handlePrev} />
          <CarouselNavButton direction="next" onClick={handleNext} />
        </div>

        {/* Мобильная версия - карусель ТОЛЬКО для мобильных (одна карточка) */}
        <div className="md:hidden relative overflow-hidden px-2">
          <div 
            className="relative w-full overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              ref={mobileTrackRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${mobileCurrent * 100}%)`,
              }}
            >
              {events.map((event, index) => (
                <div
                  key={`${event.city}-${index}`}
                  className={cn(
                    "flex-shrink-0 w-full",
                    "group relative rounded-3xl overflow-hidden",
                    "bg-card border-2 border-transparent",
                    "transition-all duration-500 ease-out",
                    "cursor-pointer",
                    sectionCardLiftClass(surface)
                  )}
                >
                  {/* Изображение/градиент */}
                  <div className="relative h-64 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${event.color}`}>
                      <div className="absolute inset-0 bg-black/30"></div>
                    </div>
                    
                    {/* Возрастное ограничение */}
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 text-foreground px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">{event.age}</span>
                    </div>
                  </div>

                  {/* Контент */}
                  <div className="p-6">
                    {/* Город */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-semibold text-foreground">
                        {event.city}
                      </span>
                    </div>

                    {/* Артист */}
                    <p className="text-base text-foreground mb-4">
                      {event.artist}
                    </p>

                    {/* Дата и место */}
                    <p className="text-sm text-muted-foreground mb-4">
                      {event.date} • {event.venue}
                    </p>

                    {/* Цена */}
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-extrabold text-foreground">
                        {event.price} ₽
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Индикаторы для мобильной версии */}
          <div className="flex justify-center gap-2 mt-4 mb-4">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setMobileCurrent(index)}
                className={carouselDotClass(surface, index === mobileCurrent)}
                aria-label={`Перейти к карточке ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;