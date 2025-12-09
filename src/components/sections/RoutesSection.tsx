import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import stPetersburg from "@/assets/saint-petersburg.jpg";
import moscow from "@/assets/moscow.jpg";
import kazan from "@/assets/kazan.jpg";
import novgorod from "@/assets/novgorod.jpg";
import karelia from "@/assets/karelia.jpg";
import baikal1 from "@/assets/байкал1.jpg";
import vladivostok1 from "@/assets/владивосток 1.jpg";
import kaliningrad1 from "@/assets/калиниград 1.jpg";
import sochi from "@/assets/armenia.jpg";

const RoutesSection = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  const destinations = [
    {
      id: 1,
      name: "Санкт-Петербург",
      image: stPetersburg,
      price: "от 2 800 ₽",
      tag: "Популярно",
      tagColor: "bg-blue-500",
      from: "Москва",
    },
    {
      id: 2,
      name: "Казань",
      image: kazan,
      price: "от 2 940 ₽",
      tag: "Семейно",
      tagColor: "bg-purple-500",
      from: "Москва",
    },
    {
      id: 3,
      name: "Байкал",
      image: baikal1,
      price: "от 3 500 ₽",
      tag: "Природа",
      tagColor: "bg-green-500",
      from: "Иркутск",
    },
    {
      id: 4,
      name: "Великий Новгород",
      image: novgorod,
      price: "от 1 500 ₽",
      tag: "Бюджетно",
      tagColor: "bg-orange-500",
      from: "Москва",
    },
    {
      id: 5,
      name: "Владивосток",
      image: vladivostok1,
      price: "от 12 000 ₽",
      tag: "Экскурсии",
      tagColor: "bg-purple-500",
      from: "Москва",
    },
    {
      id: 6,
      name: "Калининград",
      image: kaliningrad1,
      price: "от 4 900 ₽",
      tag: "Популярно",
      tagColor: "bg-blue-500",
      from: "Москва",
    },
    {
      id: 7,
      name: "Карелия",
      image: karelia,
      price: "от 2 240 ₽",
      tag: "Природа",
      tagColor: "bg-green-500",
      from: "Санкт-Петербург",
    },
    {
      id: 8,
      name: "Сочи",
      image: sochi,
      price: "от 3 850 ₽",
      tag: "Пляжи",
      tagColor: "bg-cyan-500",
      from: "Москва",
    },
  ];

  // Дублируем для бесконечной карусели
  const duplicatedDestinations = [...destinations, ...destinations, ...destinations];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const getCardWidth = () => {
      // Всегда 3 карточки в ряду (как в Горящие направления)
      const gap = 24; // gap-6 = 24px
      return (scrollContainer.clientWidth - gap * 2) / 3;
    };

    const initializeScroll = () => {
      const cardWidth = getCardWidth();
      const gap = 24;
      const cardWithGap = cardWidth + gap;
      const initialScroll = destinations.length * cardWithGap;
      scrollContainer.scrollLeft = initialScroll;
    };

    initializeScroll();

    const handleScroll = () => {
      if (isScrolling.current) return;

      const cardWidth = getCardWidth();
      const gap = 24;
      const cardWithGap = cardWidth + gap;
      const singleSetWidth = destinations.length * cardWithGap;
      const { scrollLeft, clientWidth } = scrollContainer;

      if (scrollLeft >= singleSetWidth * 2 - clientWidth - 10) {
        isScrolling.current = true;
        const offset = scrollLeft - singleSetWidth * 2;
        scrollContainer.scrollLeft = singleSetWidth + offset;
        setTimeout(() => {
          isScrolling.current = false;
        }, 50);
      } else if (scrollLeft <= 10) {
        isScrolling.current = true;
        scrollContainer.scrollLeft = singleSetWidth * 2 + scrollLeft;
        setTimeout(() => {
          isScrolling.current = false;
        }, 50);
      }
    };

    const handleResize = () => {
      initializeScroll();
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current && !isScrolling.current) {
      const gap = 24;
      const cardWidth = (scrollRef.current.clientWidth - gap * 2) / 3;
      const scrollAmount = cardWidth + gap;
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current && !isScrolling.current) {
      const gap = 24;
      const cardWidth = (scrollRef.current.clientWidth - gap * 2) / 3;
      const scrollAmount = cardWidth + gap;
      scrollRef.current.scrollTo({
        left: scrollRef.current.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleSelectDestination = (from: string, to: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const params = new URLSearchParams({
      from,
      to,
      date: tomorrow.toISOString().split("T")[0],
      passengers: "1",
      ticketType: "all",
    });
    navigate(`/train-search?${params.toString()}`);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background via-background to-muted/20 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="container relative z-10">
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              Популярные направления
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
              Эти направления выбирают чаще всего
            </p>
            <p className="text-sm text-muted-foreground/80">
              Откройте для себя самые популярные маршруты России
            </p>
          </div>
        </div>

        <div className="relative flex items-center gap-4">
          {/* Стрелка влево */}
          <button
            onClick={scrollLeft}
            className="flex-shrink-0 z-20 bg-white/90 hover:bg-white shadow-xl rounded-full p-4 transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center -ml-[10px] border border-border/20"
            aria-label="Прокрутить влево"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>

          <div className="flex-1 relative overflow-visible">
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-hidden scrollbar-hide py-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                scrollBehavior: "smooth",
              }}
            >
              {duplicatedDestinations.map((destination, index) => (
                <div
                  key={`${destination.id}-${index}`}
                  className={cn(
                    "group relative flex-shrink-0 rounded-3xl overflow-hidden",
                    "bg-card border-2 border-transparent",
                    "hover:border-primary/30 hover:shadow-2xl",
                    "transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
                    "hover:-translate-y-4 hover:scale-[1.03] cursor-pointer",
                    "w-[calc((100%-3rem)/3)]",
                    "will-change-transform"
                  )}
                  onClick={() => handleSelectDestination(destination.from, destination.name)}
                >
                  {/* Фото направления */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
                    />
                    {/* Затемнение при hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:from-black/90 group-hover:via-black/60"></div>

                    {/* Тег */}
                    <div className="absolute top-4 left-4 z-10 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110">
                      <span
                        className={cn(
                          "px-4 py-2 rounded-full text-white text-sm font-bold shadow-xl backdrop-blur-sm transition-all duration-1000",
                          destination.tagColor
                        )}
                      >
                        {destination.tag}
                      </span>
                    </div>

                    {/* Название города */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                      <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-transform duration-1000 group-hover:scale-105">
                        {destination.name}
                      </h3>
                      <div className="flex items-center gap-2 text-white/90 text-sm mb-3 transition-all duration-1000 group-hover:text-white group-hover:gap-3">
                        <MapPin className="w-4 h-4 transition-transform duration-1000 group-hover:scale-110" />
                        <span>{destination.from} → {destination.name}</span>
                      </div>
                      <div className="text-2xl font-bold text-white drop-shadow-lg transition-transform duration-1000 group-hover:scale-105">
                        {destination.price}
                      </div>
                    </div>

                    {/* CTA кнопка при hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-20">
                      <Button
                        size="lg"
                        className="bg-white text-primary hover:bg-white/90 shadow-2xl font-bold text-base px-8 py-6 rounded-full transform transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 hover:scale-125"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectDestination(destination.from, destination.name);
                        }}
                      >
                        Выбрать даты
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-500 group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Стрелка вправо */}
          <button
            onClick={scrollRight}
            className="flex-shrink-0 z-20 bg-white/90 hover:bg-white shadow-xl rounded-full p-4 transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center border border-border/20"
            aria-label="Прокрутить вправо"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>
        </div>

        {/* Кнопка "Ещё" */}
        <div className="flex justify-center mt-12">
          <Button
            variant="default"
            size="lg"
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-bold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={() => {
              navigate("/routes/list");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Ещё направлений
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Мобильные кнопки навигации */}
        <div className="flex md:hidden justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            className="h-12 w-12 rounded-full"
            aria-label="Прокрутить влево"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            className="h-12 w-12 rounded-full"
            aria-label="Прокрутить вправо"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoutesSection;
