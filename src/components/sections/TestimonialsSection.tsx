import { useRef, useEffect } from "react";
import { MapPin, Calendar, Heart, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import person1 from "@/assets/люди/просто сотрудник 1.jpg";
import person2 from "@/assets/люди/просто сотрудник 2.jpg";
import person3 from "@/assets/люди/просто сотрудник 3.jpg";
import person4 from "@/assets/люди/просто сотрудник 4.jpg";
import person5 from "@/assets/люди/просто сотрудник 5.jpg";
import person6 from "@/assets/люди/просто сотрудник 6.jpg";
import person7 from "@/assets/люди/просто сотрудник 7.jpg";
import person8 from "@/assets/люди/просто сотрудник 8.jpg";
import person9 from "@/assets/люди/просто сотрудник 9.jpg";
import person10 from "@/assets/люди/просто сотрудник 10.jpg";
import person11 from "@/assets/люди/просто сотрудник 11.jpg";
import moscow from "@/assets/moscow.jpg";
import stPetersburg from "@/assets/saint-petersburg.jpg";
import kazan from "@/assets/kazan.jpg";
import novgorod from "@/assets/novgorod.jpg";
import karelia from "@/assets/karelia.jpg";
import baikal1 from "@/assets/байкал1.jpg";
import vladivostok1 from "@/assets/владивосток 1.jpg";
import kaliningrad1 from "@/assets/калиниград 1.jpg";
import trainInterior from "@/assets/train-interior.jpg";
import sochi from "@/assets/armenia.jpg";

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

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
      // Всегда 3 карточки в ряду
      const gap = 16;
      return (scrollContainer.clientWidth - gap * 2) / 3;
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
      const gap = 16;
      const cardWidth = (scrollRef.current.clientWidth - gap * 2) / 3;
      const scrollAmount = cardWidth + gap;
      scrollRef.current.scrollTo({ 
        left: scrollRef.current.scrollLeft - scrollAmount, 
        behavior: "smooth" 
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current && !isScrolling.current) {
      const gap = 16;
      const cardWidth = (scrollRef.current.clientWidth - gap * 2) / 3;
      const scrollAmount = cardWidth + gap;
      scrollRef.current.scrollTo({ 
        left: scrollRef.current.scrollLeft + scrollAmount, 
        behavior: "smooth" 
      });
    }
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container relative z-10">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
            Живые истории путешествий
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
            Реальные люди, реальные эмоции, реальные путешествия
          </p>
        </div>

        <div className="relative flex items-center gap-4">
          {/* Стрелка влево */}
          <button
            onClick={scrollLeft}
            className="flex-shrink-0 z-20 bg-white hover:bg-white shadow-md rounded-full w-12 h-12 transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center -ml-[10px]"
            aria-label="Прокрутить влево"
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
          </button>

          <div className="flex-1 relative overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-hidden scrollbar-hide pb-4"
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
                    "hover:shadow-2xl hover:border-primary/30",
                    "transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
                    "hover:-translate-y-3 hover:scale-[1.02] cursor-pointer",
                    "w-[calc((100%-2rem)/3)]",
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
                    <div 
                      className="absolute transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
                      style={{ 
                        top: '-10%', 
                        left: '-10%', 
                        width: '120%', 
                        height: '120%',
                        transformOrigin: 'center center'
                      }}
                    >
                      <img
                        src={testimonial.photo}
                        alt={testimonial.route}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Градиентный оверлей для читаемости текста */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:opacity-90 pointer-events-none"></div>

                    {/* Аватар и имя пользователя в стиле Instagram */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10 transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105">
                      <div className="w-12 h-12 rounded-full border-2 border-white/50 overflow-hidden shadow-lg transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:border-white/80 group-hover:shadow-xl">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
                        />
                      </div>
                      <span className="text-white font-semibold text-sm drop-shadow-lg bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-[1000ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:bg-black/50 group-hover:px-4">
                        {testimonial.name}
                      </span>
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
            className="flex-shrink-0 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 hidden md:flex items-center justify-center"
            aria-label="Прокрутить вправо"
          >
            <ArrowRight className="h-5 w-5 text-primary" />
          </button>
        </div>

        {/* Мобильные кнопки навигации */}
        <div className="flex md:hidden justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            className="h-12 w-12 rounded-full bg-white shadow-md hover:bg-white"
            aria-label="Прокрутить влево"
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            className="h-12 w-12 rounded-full bg-white shadow-md hover:bg-white"
            aria-label="Прокрутить вправо"
          >
            <ArrowRight className="h-5 w-5 text-primary" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
