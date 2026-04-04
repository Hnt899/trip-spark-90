import { useRef, useEffect, useState } from "react";
import { MapPin, Calendar, Heart, ChevronRight, ChevronLeft, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import person1 from "@/assets/images/people/просто сотрудник 1.jpg";
import person2 from "@/assets/images/people/просто сотрудник 2.jpg";
import person3 from "@/assets/images/people/просто сотрудник 3.jpg";
import person4 from "@/assets/images/people/просто сотрудник 4.jpg";
import person5 from "@/assets/images/people/просто сотрудник 5.jpg";
import person6 from "@/assets/images/people/просто сотрудник 6.jpg";
import person7 from "@/assets/images/people/просто сотрудник 7.jpg";
import person8 from "@/assets/images/people/просто сотрудник 8.jpg";
import person9 from "@/assets/images/people/просто сотрудник 9.jpg";
import person10 from "@/assets/images/people/просто сотрудник 10.jpg";
import person11 from "@/assets/images/people/просто сотрудник 11.jpg";
import moscow from "@/assets/images/cities/moscow.jpg";
import stPetersburg from "@/assets/images/cities/saint-petersburg.jpg";
import kazan from "@/assets/images/cities/kazan.jpg";
import novgorod from "@/assets/images/cities/novgorod.jpg";
import karelia from "@/assets/images/cities/karelia.jpg";
import baikal1 from "@/assets/images/routes/байкал1.jpg";
import vladivostok1 from "@/assets/images/routes/владивосток 1.jpg";
import kaliningrad1 from "@/assets/images/routes/калиниград 1.jpg";
import trainInterior from "@/assets/images/transport/train-interior.jpg";
import sochi from "@/assets/images/cities/armenia.jpg";
import type { SectionSurface } from "@/lib/sectionSurface";
import {
  carouselDotClass,
  sectionCardLiftClass,
  sectionLeadClass,
  sectionShellClass,
} from "@/lib/sectionSurface";

interface TestimonialsSectionProps {
  surface?: SectionSurface;
}

const TestimonialsSection = ({ surface = "brand" }: TestimonialsSectionProps) => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const isMobile = useIsMobile();
  const [mobileCurrent, setMobileCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);

  const testimonials = [
    {
      id: 1,
      name: "Марина",
      avatar: person1,
      photo: stPetersburg,
      text: "Вот такой вид из окна поезда Москва — Санкт-Петербург",
      route: "Москва → Санкт-Петербург",
      date: "15 ноября 2024",
    },
    {
      id: 2,
      name: "Алексей",
      avatar: person2,
      photo: kazan,
      text: "Поездка прошла идеально, буду ездить через TudaSuda!",
      route: "Москва → Казань",
      date: "12 ноября 2024",
    },
    {
      id: 3,
      name: "Елена",
      avatar: person3,
      photo: trainInterior,
      text: "Удобные места, чисто, комфортно. Всё как на фото!",
      route: "Санкт-Петербург → Москва",
      date: "10 ноября 2024",
    },
    {
      id: 4,
      name: "Дмитрий",
      avatar: person4,
      photo: baikal1,
      text: "Невероятные виды! Поездка на Байкал — это что-то особенное",
      route: "Иркутск → Байкал",
      date: "8 ноября 2024",
    },
    {
      id: 5,
      name: "Анна",
      avatar: person5,
      photo: novgorod,
      text: "Отличная цена и сервис. Рекомендую всем друзьям!",
      route: "Москва → Великий Новгород",
      date: "5 ноября 2024",
    },
    {
      id: 6,
      name: "Сергей",
      avatar: person6,
      photo: vladivostok1,
      text: "Дальневосточные приключения начались! Владивосток ждёт",
      route: "Москва → Владивосток",
      date: "3 ноября 2024",
    },
    {
      id: 7,
      name: "Ольга",
      avatar: person7,
      photo: kaliningrad1,
      text: "Европейский колорит в России. Калининград — это магия!",
      route: "Москва → Калининград",
      date: "1 ноября 2024",
    },
    {
      id: 8,
      name: "Иван",
      avatar: person8,
      photo: karelia,
      text: "Красивые пейзажи Карелии. Природа здесь просто потрясающая",
      route: "Санкт-Петербург → Карелия",
      date: "29 октября 2024",
    },
    {
      id: 9,
      name: "Татьяна",
      avatar: person9,
      photo: moscow,
      text: "Быстро, удобно, без проблем. TudaSuda — мой выбор!",
      route: "Санкт-Петербург → Москва",
      date: "27 октября 2024",
    },
    {
      id: 10,
      name: "Михаил",
      avatar: person10,
      photo: stPetersburg,
      text: "Белые ночи в Питере. Это нужно видеть своими глазами!",
      route: "Москва → Санкт-Петербург",
      date: "25 октября 2024",
    },
    {
      id: 11,
      name: "Наталья",
      avatar: person11,
      photo: sochi,
      text: "Комфортная поездка, отличный сервис. Обязательно вернусь!",
      route: "Москва → Сочи",
      date: "23 октября 2024",
    },
  ];

  // Дублируем отзывы для бесконечной карусели
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const getCardWidth = () => {
      // Всегда 3 карточки в ряду, gap = 16px (1rem)
      const gap = 16;
      const containerWidth = scrollContainer.clientWidth;
      return (containerWidth - gap * 2) / 3;
    };

    const initializeScroll = () => {
      const cardWidth = getCardWidth();
      const gap = 16;
      const cardWithGap = cardWidth + gap;
      const initialScroll = testimonials.length * cardWithGap;
      scrollContainer.scrollLeft = initialScroll;
    };

    initializeScroll();

    const handleScroll = () => {
      if (isScrolling.current) return;

      const cardWidth = getCardWidth();
      const gap = 16;
      const cardWithGap = cardWidth + gap;
      const singleSetWidth = testimonials.length * cardWithGap;
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
      isScrolling.current = true;
      const gap = 16; // gap-4 = 16px = 1rem
      const containerWidth = scrollRef.current.clientWidth;
      // Ширина одной карточки: (containerWidth - 2*gap) / 3
      const cardWidth = (containerWidth - gap * 2) / 3;
      // Прокручиваем ровно на одну карточку + gap
      const scrollAmount = cardWidth + gap;
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll = Math.round(currentScroll - scrollAmount);
      
      scrollRef.current.scrollTo({ 
        left: targetScroll, 
        behavior: "smooth" 
      });
      
      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current && !isScrolling.current) {
      isScrolling.current = true;
      const gap = 16; // gap-4 = 16px = 1rem
      const containerWidth = scrollRef.current.clientWidth;
      // Ширина одной карточки: (containerWidth - 2*gap) / 3
      const cardWidth = (containerWidth - gap * 2) / 3;
      // Прокручиваем ровно на одну карточку + gap
      const scrollAmount = cardWidth + gap;
      const currentScroll = scrollRef.current.scrollLeft;
      const targetScroll = Math.round(currentScroll + scrollAmount);
      
      scrollRef.current.scrollTo({ 
        left: targetScroll, 
        behavior: "smooth" 
      });
      
      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    }
  };

  return (
    <section className={sectionShellClass(surface, "py-20")}>
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
        <div className="mb-12 text-center">
          <h2
            className={cn(
              "heading-gradient text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 leading-tight pb-2 tracking-tight",
            )}
          >
            Живые истории путешествий
          </h2>
          <p className={cn("text-lg md:text-xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150", sectionLeadClass(surface))}>
            Реальные люди, реальные эмоции, реальные путешествия
          </p>
        </div>

        {/* Десктоп версия */}
        <div className="hidden md:flex relative items-center gap-4">
          {/* Стрелка влево */}
          <button
            onClick={scrollLeft}
            className="flex-shrink-0 z-20 bg-white hover:bg-white shadow-lg rounded-full w-12 h-12 transition-all duration-300 hover:scale-110 flex items-center justify-center -ml-[10px]"
            aria-label="Прокрутить влево"
          >
            <ChevronLeft className="h-5 w-5 text-blue-600" />
          </button>

          <div className="flex-1 relative overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-hidden scrollbar-hide pb-4 snap-x snap-mandatory"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                scrollBehavior: "smooth",
              }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className={cn(
                    "group relative flex-shrink-0 rounded-2xl overflow-hidden",
                    "bg-card border border-border/50",
                    "hover:border-primary/30",
                    "transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
                    "cursor-pointer",
                    sectionCardLiftClass(surface),
                    "w-[calc((100%-2rem)/3)] min-w-[calc((100%-2rem)/3)] max-w-[calc((100%-2rem)/3)]",
                    "snap-start",
                    "animate-in fade-in slide-in-from-bottom-4",
                    "will-change-transform"
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationDuration: "600ms",
                    animationFillMode: "both",
                  }}
                >
                  {/* Фото в стиле Instagram Story */}
                  <div className="relative h-64 rounded-t-2xl overflow-hidden">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.route}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Градиентный оверлей для читаемости текста */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:opacity-90 pointer-events-none"></div>
                    {/* Затемнение при hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 pointer-events-none"></div>

                    {/* Аватар и имя пользователя в стиле Instagram */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10 transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:opacity-0 group-hover:pointer-events-none">
                      <div className="w-12 h-12 rounded-full border-2 border-white/50 overflow-hidden shadow-lg transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-white font-semibold text-sm drop-shadow-lg bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                        {testimonial.name}
                      </span>
                    </div>

                    {/* Кнопка "Читать" при hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                      <Button
                        size="lg"
                        variant="outline"
                        className="bg-white text-[#8A70F8] hover:bg-white hover:text-[#8A70F8] border-white shadow-xl font-bold text-base px-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/testimonials/${testimonial.id}`);
                        }}
                      >
                        <BookOpen className="h-5 w-5 mr-2 text-[#8A70F8]" />
                        Читать
                      </Button>
                    </div>
                  </div>

                  {/* Контент карточки */}
                  <div className="p-5 space-y-3 transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:bg-gradient-to-b from-transparent to-card/50">
                    {/* Текст отзыва */}
                    <p className="text-foreground text-sm leading-relaxed font-medium transition-colors duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:text-foreground/90">
                      {testimonial.text}
                    </p>

                    {/* Маршрут и дата */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-border/30 transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:border-primary/20">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:text-foreground/80 group-hover:gap-3">
                        <MapPin className="w-3.5 h-3.5 transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 group-hover:text-primary" />
                        <span>{testimonial.route}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:text-foreground/80 group-hover:gap-3">
                        <Calendar className="w-3.5 h-3.5 transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 group-hover:text-primary" />
                        <span>{testimonial.date}</span>
                      </div>
                    </div>

                    {/* Лайк в стиле соцсетей */}
                    <div className="flex items-center gap-2 pt-2">
                      <div className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] cursor-pointer group/like hover:gap-2">
                        <Heart className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-125 hover:fill-primary" />
                        <span className="text-xs font-medium transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">Нравится</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Стрелка вправо */}
          <button
            onClick={scrollRight}
            className="flex-shrink-0 z-20 bg-white hover:bg-white shadow-lg rounded-full w-12 h-12 transition-all duration-300 hover:scale-110 flex items-center justify-center -ml-[7px]"
            aria-label="Прокрутить вправо"
          >
            <ChevronRight className="h-5 w-5 text-blue-600" />
          </button>
        </div>

        {/* Мобильная версия - карусель ТОЛЬКО для мобильных (одна карточка) */}
        <div className="md:hidden relative overflow-hidden px-2">
          <div 
            className="relative w-full overflow-hidden"
            onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
            onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
            onTouchEnd={() => {
              if (!touchStart || !touchEnd) return;
              
              const distance = touchStart - touchEnd;
              const minSwipeDistance = 50;

              if (distance > minSwipeDistance) {
                setMobileCurrent((prev) => Math.min(testimonials.length - 1, prev + 1));
              }
              
              if (distance < -minSwipeDistance) {
                setMobileCurrent((prev) => Math.max(0, prev - 1));
              }
              
              setTouchStart(0);
              setTouchEnd(0);
            }}
          >
            <div 
              ref={mobileTrackRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${mobileCurrent * 100}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  onClick={() => navigate(`/testimonials/${testimonial.id}`)}
                  className={cn(
                    "flex-shrink-0 w-full",
                    "group relative rounded-3xl overflow-hidden",
                    "bg-card border-2 border-transparent",
                    "transition-all duration-500 ease-out",
                    "cursor-pointer",
                    sectionCardLiftClass(surface)
                  )}
                >
                  {/* Изображение */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.route}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Аватар и имя пользователя */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                      <div className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden shadow-lg">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-white font-semibold text-sm drop-shadow-lg bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                        {testimonial.name}
                      </span>
                    </div>
                  </div>

                  {/* Контент */}
                  <div className="p-6">
                    {/* Текст отзыва */}
                    <p className="text-foreground text-sm leading-relaxed font-medium mb-4">
                      {testimonial.text}
                    </p>

                    {/* Маршрут и дата */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-border/30 mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{testimonial.route}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{testimonial.date}</span>
                      </div>
                    </div>

                    {/* Лайк */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Heart className="w-4 h-4" />
                        <span className="text-xs font-medium">Нравится</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Индикаторы для мобильной версии */}
          <div className="flex justify-center gap-2 mt-4 mb-4">
            {testimonials.map((_, index) => (
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

export default TestimonialsSection;
