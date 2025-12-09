import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Calendar, MapPin, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import moscow from "@/assets/moscow.jpg";
import stPetersburg from "@/assets/saint-petersburg.jpg";
import kazan from "@/assets/kazan.jpg";
import novgorod from "@/assets/novgorod.jpg";
import karelia from "@/assets/karelia.jpg";
import armenia from "@/assets/armenia.jpg";

const RecommendedTrainsSection = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  const destinations = [
    {
      from: "Москва",
      to: "Санкт-Петербург",
      image: stPetersburg,
      oldPrice: "3 500 ₽",
      newPrice: "2 800 ₽",
      discount: 20,
      tag: "Популярно",
      tagColor: "bg-blue-500",
      description: "Быстрое и комфортное путешествие",
    },
    {
      from: "Москва",
      to: "Казань",
      image: kazan,
      oldPrice: "4 200 ₽",
      newPrice: "2 940 ₽",
      discount: 30,
      tag: "Горящее",
      tagColor: "bg-red-500",
      description: "Скидка на билеты до конца месяца",
    },
    {
      from: "Санкт-Петербург",
      to: "Москва",
      image: moscow,
      oldPrice: "3 800 ₽",
      newPrice: "3 040 ₽",
      discount: 20,
      tag: "Популярно",
      tagColor: "bg-blue-500",
      description: "Ежедневные рейсы",
    },
    {
      from: "Москва",
      to: "Великий Новгород",
      image: novgorod,
      oldPrice: "2 500 ₽",
      newPrice: "1 500 ₽",
      discount: 40,
      tag: "Бюджетно",
      tagColor: "bg-green-500",
      description: "Отличная цена для путешествия",
    },
    {
      from: "Санкт-Петербург",
      to: "Карелия",
      image: karelia,
      oldPrice: "3 200 ₽",
      newPrice: "2 240 ₽",
      discount: 30,
      tag: "Экскурсии",
      tagColor: "bg-purple-500",
      description: "Красивые пейзажи и природа",
    },
    {
      from: "Москва",
      to: "Сочи",
      image: armenia,
      oldPrice: "5 500 ₽",
      newPrice: "3 850 ₽",
      discount: 30,
      tag: "Горящее",
      tagColor: "bg-red-500",
      description: "Отдых у моря по выгодной цене",
    },
    {
      from: "Казань",
      to: "Москва",
      image: moscow,
      oldPrice: "4 000 ₽",
      newPrice: "2 800 ₽",
      discount: 30,
      tag: "Популярно",
      tagColor: "bg-blue-500",
      description: "Комфортные поезда",
    },
    {
      from: "Москва",
      to: "Нижний Новгород",
      image: novgorod,
      oldPrice: "2 800 ₽",
      newPrice: "1 680 ₽",
      discount: 40,
      tag: "Бюджетно",
      tagColor: "bg-green-500",
      description: "Экономия до 40%",
    },
  ];

  const handleSelectDates = (from: string, to: string) => {
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

  // Дублируем карточки для бесконечной карусели
  const duplicatedDestinations = [...destinations, ...destinations, ...destinations];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Функция для получения ширины карточки в зависимости от размера экрана
    const getCardWidth = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        // На десктопе: 3 карточки, учитываем gap между ними
        return (scrollContainer.clientWidth - 48) / 3; // 48 = 2 * gap (gap-6 = 24px)
      } else if (width >= 768) {
        // На планшете: 2 карточки
        return (scrollContainer.clientWidth - 24) / 2;
      } else {
        // На мобильных: 1 карточка
        return scrollContainer.clientWidth;
      }
    };

    // Устанавливаем начальную позицию на вторую группу карточек (середина)
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

      // Если прокрутили до конца (третья группа), переходим к началу второй группы
      if (scrollLeft >= singleSetWidth * 2 - clientWidth - 10) {
        isScrolling.current = true;
        const offset = scrollLeft - singleSetWidth * 2;
        scrollContainer.scrollLeft = singleSetWidth + offset;
        setTimeout(() => {
          isScrolling.current = false;
        }, 50);
      }
      // Если прокрутили до начала (первая группа), переходим к концу второй группы
      else if (scrollLeft <= 10) {
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
      const width = window.innerWidth;
      const gap = 24;
      let cardWidth: number;
      
      if (width >= 1024) {
        // На десктопе: 3 карточки
        cardWidth = (scrollRef.current.clientWidth - 48) / 3;
      } else if (width >= 768) {
        // На планшете: 2 карточки
        cardWidth = (scrollRef.current.clientWidth - 24) / 2;
      } else {
        // На мобильных: 1 карточка
        cardWidth = scrollRef.current.clientWidth;
      }
      
      const scrollAmount = cardWidth + gap;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current && !isScrolling.current) {
      const width = window.innerWidth;
      const gap = 24;
      let cardWidth: number;
      
      if (width >= 1024) {
        // На десктопе: 3 карточки
        cardWidth = (scrollRef.current.clientWidth - 48) / 3;
      } else if (width >= 768) {
        // На планшете: 2 карточки
        cardWidth = (scrollRef.current.clientWidth - 24) / 2;
      } else {
        // На мобильных: 1 карточка
        cardWidth = scrollRef.current.clientWidth;
      }
      
      const scrollAmount = cardWidth + gap;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="container relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
            Горящие направления
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Специальные предложения и скидки на популярные маршруты
          </p>
        </div>

        <div className="relative flex items-center gap-4">
          {/* Стрелка влево */}
          <button
            onClick={scrollLeft}
            className="flex-shrink-0 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center -ml-[10px]"
            aria-label="Прокрутить влево"
          >
            <ArrowLeft className="h-6 w-6 text-primary" />
          </button>

          <div className="flex-1 relative overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-hidden scrollbar-hide pb-4 scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
            {duplicatedDestinations.map((destination, index) => {
              return (
              <div
                key={index}
                className={cn(
                  "group relative flex-shrink-0 rounded-3xl overflow-hidden",
                  "bg-card border-2 border-transparent",
                  "hover:border-primary/30 hover:shadow-2xl",
                  "transition-all duration-500 ease-out",
                  "hover:-translate-y-2 cursor-pointer",
                  // На мобильных: 1 карточка, на планшете: 2, на десктопе: 3
                  "w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
                )}
                onClick={() => handleSelectDates(destination.from, destination.to)}
              >
                {/* Изображение */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={`${destination.from} - ${destination.to}`}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-700",
                      "group-hover:scale-110"
                    )}
                  />
                  {/* Затемнение при hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500"></div>
                  
                  {/* Тег */}
                  <div className={cn(
                    "absolute top-4 left-4 px-3 py-1.5 rounded-full text-white text-sm font-bold shadow-lg",
                    destination.tagColor
                  )}>
                    {destination.tag}
                  </div>

                  {/* Скидка */}
                  <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-xl">
                    <div className="flex items-center gap-1">
                      <TrendingDown className="h-5 w-5 text-red-500" />
                      <span className="text-2xl font-extrabold text-red-500">
                        -{destination.discount}%
                      </span>
                    </div>
                  </div>

                  {/* Кнопка при hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Button
                      size="lg"
                      className="bg-white text-primary hover:bg-white/90 shadow-xl font-bold text-base px-6"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectDates(destination.from, destination.to);
                      }}
                    >
                      <Calendar className="h-5 w-5 mr-2" />
                      Выбрать даты
                    </Button>
                  </div>
                </div>

                {/* Контент */}
                <div className="p-6">
                  {/* Маршрут */}
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {destination.from} → {destination.to}
                    </span>
                  </div>

                  {/* Описание */}
                  <p className="text-sm text-muted-foreground mb-4">
                    {destination.description}
                  </p>

                  {/* Цены */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl md:text-3xl font-extrabold text-foreground">
                      {destination.newPrice}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {destination.oldPrice}
                    </span>
                  </div>
                </div>
              </div>
              );
            })}
            </div>
          </div>

          {/* Стрелка вправо */}
          <button
            onClick={scrollRight}
            className="flex-shrink-0 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center"
            aria-label="Прокрутить вправо"
          >
            <ArrowRight className="h-6 w-6 text-primary" />
          </button>
        </div>

        {/* Мобильные кнопки навигации */}
        <div className="flex lg:hidden justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            className="h-12 w-12 rounded-full"
            aria-label="Прокрутить влево"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            className="h-12 w-12 rounded-full"
            aria-label="Прокрутить вправо"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

    </section>
  );
};

export default RecommendedTrainsSection;
