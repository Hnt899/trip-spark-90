import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfoCard from "@/components/blog/InfoCard";
import WideHighlightCard from "@/components/blog/WideHighlightCard";
import EventTile from "@/components/blog/EventTile";
import StoriesCarousel from "@/components/blog/StoriesCarousel";
import { Button } from "@/components/ui/button";
import { CarouselNavButton } from "@/components/ui/carousel-nav-button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  infoCards,
  siteNews,
  rzdNews,
  events,
  stories,
  tips,
} from "@/data/blogData";

const Blog = () => {
  // Состояния для слайдеров
  const [siteNewsIndex, setSiteNewsIndex] = useState(1); // Начинаем с 1, так как 0 - это клон последнего
  const [rzdNewsIndex, setRzdNewsIndex] = useState(1); // Начинаем с 1, так как 0 - это клон последнего
  const [tipsIndex, setTipsIndex] = useState(0); // Индекс для карусели советов
  const [infoCardsIndex, setInfoCardsIndex] = useState(0); // Индекс для карусели "Свежие обновления" на мобилке
  const [eventsIndex, setEventsIndex] = useState(0); // Индекс для карусели мероприятий на мобилке
  const [tipsTouchStart, setTipsTouchStart] = useState(0);
  const [tipsTouchEnd, setTipsTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const rzdSliderRef = useRef<HTMLDivElement>(null);
  const tipsSliderRef = useRef<HTMLDivElement>(null);
  const infoCardsCarouselRef = useRef<HTMLDivElement>(null);
  const eventsCarouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Создаем массив с клонами для бесконечного цикла: [последний, ...оригиналы, первый]
  const infiniteSiteNews = [
    siteNews[siteNews.length - 1], // Клон последнего в начале
    ...siteNews,
    siteNews[0], // Клон первого в конце
  ];

  const infiniteRzdNews = [
    rzdNews[rzdNews.length - 1], // Клон последнего в начале
    ...rzdNews,
    rzdNews[0], // Клон первого в конце
  ];

  // Обработка перехода после завершения анимации для новостей сайта
  const handleSiteNewsTransitionEnd = () => {
    if (!sliderRef.current) return;
    
    // Если дошли до клона первого (последний индекс), переключаемся на первый оригинал без анимации
    if (siteNewsIndex >= infiniteSiteNews.length - 1) {
      sliderRef.current.style.transition = 'none';
      sliderRef.current.style.transform = `translateX(-100%)`;
      setSiteNewsIndex(1);
      // Восстанавливаем transition после небольшой задержки
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = 'transform 500ms ease-in-out';
        }
      }, 50);
    }
    // Если дошли до клона последнего (индекс 0), переключаемся на последний оригинал без анимации
    else if (siteNewsIndex === 0) {
      sliderRef.current.style.transition = 'none';
      sliderRef.current.style.transform = `translateX(-${siteNews.length * 100}%)`;
      setSiteNewsIndex(siteNews.length);
      // Восстанавливаем transition после небольшой задержки
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = 'transform 500ms ease-in-out';
        }
      }, 50);
    }
  };

  // Обработка перехода после завершения анимации для новостей РЖД
  const handleRzdNewsTransitionEnd = () => {
    if (!rzdSliderRef.current) return;
    
    // Если дошли до клона первого (последний индекс), переключаемся на первый оригинал без анимации
    if (rzdNewsIndex >= infiniteRzdNews.length - 1) {
      rzdSliderRef.current.style.transition = 'none';
      rzdSliderRef.current.style.transform = `translateX(-100%)`;
      setRzdNewsIndex(1);
      // Восстанавливаем transition после небольшой задержки
      setTimeout(() => {
        if (rzdSliderRef.current) {
          rzdSliderRef.current.style.transition = 'transform 500ms ease-in-out';
        }
      }, 50);
    }
    // Если дошли до клона последнего (индекс 0), переключаемся на последний оригинал без анимации
    else if (rzdNewsIndex === 0) {
      rzdSliderRef.current.style.transition = 'none';
      rzdSliderRef.current.style.transform = `translateX(-${rzdNews.length * 100}%)`;
      setRzdNewsIndex(rzdNews.length);
      // Восстанавливаем transition после небольшой задержки
      setTimeout(() => {
        if (rzdSliderRef.current) {
          rzdSliderRef.current.style.transition = 'transform 500ms ease-in-out';
        }
      }, 50);
    }
  };

  // Автоматическое листание для новостей сайта
  useEffect(() => {
    const interval = setInterval(() => {
      setSiteNewsIndex((prev) => prev + 1);
    }, 5000); // Переключение каждые 5 секунд

    return () => clearInterval(interval);
  }, []);

  // Автоматическое листание для новостей РЖД
  useEffect(() => {
    const interval = setInterval(() => {
      setRzdNewsIndex((prev) => prev + 1);
    }, 5000); // Переключение каждые 5 секунд

    return () => clearInterval(interval);
  }, []);

  // Автоматическое листание для карточек "Свежие обновления" на мобилке
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setInfoCardsIndex((prev) => (prev + 1) % infoCards.length);
    }, 3000); // Переключение каждые 3 секунды

    return () => clearInterval(interval);
  }, [isMobile]);

  // Автоматическое листание для мероприятий на мобилке
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setEventsIndex((prev) => (prev + 1) % events.length);
    }, 3000); // Переключение каждые 3 секунды

    return () => clearInterval(interval);
  }, [isMobile]);

  // Автоматическое листание для советов
  useEffect(() => {
    const interval = setInterval(() => {
      setTipsIndex((prev) => (prev + 1) % tips.length);
    }, 3000); // Переключение каждые 3 секунды

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 pt-32 pb-10 md:pb-14">
        {/* БЛОК 1: 3 информационные карточки */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-2">
            Свежие обновления
          </h2>
          <p className="text-muted-foreground mb-8">
            Последние новости и важная информация
          </p>
          
          {/* Мобильная версия - карусель */}
          <div className="md:hidden relative overflow-hidden">
            <div 
              ref={infoCardsCarouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${infoCardsIndex * 100}%)`,
              }}
            >
              {infoCards.map((card) => (
                <div key={card.id} className="flex-shrink-0 w-full px-2">
                  <InfoCard data={card} />
                </div>
              ))}
            </div>
          </div>

          {/* Десктопная версия - сетка */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {infoCards.map((card) => (
              <InfoCard key={card.id} data={card} />
            ))}
          </div>
        </section>

        {/* БЛОК 2: Новости сайта - вытянутый слайдер */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
            Новости сайта
          </h2>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div 
                ref={sliderRef}
                className="flex transition-transform duration-500 ease-in-out will-change-transform"
                style={{ transform: `translateX(-${siteNewsIndex * 100}%)` }}
                onTransitionEnd={handleSiteNewsTransitionEnd}
              >
                {infiniteSiteNews.map((news, index) => (
                  <div key={`${news.id}-${index}`} className="min-w-full flex-shrink-0 w-full">
                    <WideHighlightCard data={news} noRounded={true} hideButton={true} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* БЛОК 3: Повод взять выходной - сетка мероприятий */}
        <section className="mb-16 md:mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">
              Повод взять выходной и отдохнуть
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto md:mx-0">
              Откройте для себя увлекательные события и мероприятия по всей России. Планируйте незабываемые выходные с TudaSuda.
            </p>
          </div>

          {/* Мобильная версия - карусель с точками */}
          <div className="md:hidden relative overflow-hidden px-2">
            <div 
              ref={eventsCarouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${eventsIndex * 100}%)`,
              }}
            >
              {events.map((event) => (
                <div key={event.id} className="flex-shrink-0 w-full px-2">
                  <EventTile
                    data={event}
                    className="h-[400px]"
                  />
                </div>
              ))}
            </div>

            {/* Индикаторы для мобильной версии */}
            <div className="flex justify-center gap-2 mt-4 mb-4">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setEventsIndex(index);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === eventsIndex
                      ? "bg-primary w-8"
                      : "bg-primary/50 w-2"
                  )}
                  aria-label={`Перейти к мероприятию ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Десктопная версия - сетка */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Большой прямоугольник */}
            <EventTile
              data={events[0]}
              className="md:col-span-2 lg:col-span-2 md:row-span-2 h-[250px] sm:h-[300px] md:h-[500px]"
            />
            {/* Высокий срезанный слева */}
            <EventTile
              data={events[1]}
              className="md:col-span-1 lg:col-span-1 md:row-span-2 h-[250px] sm:h-[300px] md:h-[500px]"
            />
            {/* Квадрат с пузырём слева */}
            <EventTile
              data={events[2]}
              className="md:col-span-1 lg:col-span-1 h-[280px] sm:h-[340px] md:h-[300px]"
            />
            {/* Квадрат с текстом сверху */}
            <EventTile
              data={events[3]}
              className="md:col-span-1 lg:col-span-1 h-[280px] sm:h-[340px] md:h-[300px]"
            />
            {/* Квадрат с пузырём справа */}
            <EventTile
              data={events[4]}
              className="md:col-span-1 lg:col-span-1 h-[280px] sm:h-[340px] md:h-[300px]"
            />
            {/* Высокий срезанный справа */}
            <EventTile
              data={events[5]}
              className="md:col-span-1 lg:col-span-1 md:row-span-2 h-[250px] sm:h-[300px] md:h-[500px]"
            />
            {/* Широкий прямоугольник снизу */}
            <EventTile
              data={events[6]}
              className="md:col-span-2 lg:col-span-2 md:row-span-2 h-[250px] sm:h-[300px] md:h-[500px]"
            />
          </div>
        </section>

        {/* БЛОК 4: Новости РЖД - вытянутые карточки */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
            Новости РЖД
          </h2>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div 
                ref={rzdSliderRef}
                className="flex transition-transform duration-500 ease-in-out will-change-transform"
                style={{ transform: `translateX(-${rzdNewsIndex * 100}%)` }}
                onTransitionEnd={handleRzdNewsTransitionEnd}
              >
                {infiniteRzdNews.map((news, index) => (
                  <div key={`${news.id}-${index}`} className="min-w-full flex-shrink-0 w-full">
                    <WideHighlightCard data={news} noRounded={true} hideButton={true} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* БЛОК 5: Сторисы наших пользователей */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-8">
            Сторисы наших пользователей
          </h2>
          <StoriesCarousel stories={stories} />
        </section>

        {/* БЛОК 6: Советы опытных путешественников */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
            Советы опытных путешественников
          </h2>
          <div className="relative">
            <div 
              className="overflow-hidden rounded-3xl"
              onTouchStart={(e) => setTipsTouchStart(e.targetTouches[0].clientX)}
              onTouchMove={(e) => setTipsTouchEnd(e.targetTouches[0].clientX)}
              onTouchEnd={() => {
                if (!tipsTouchStart || !tipsTouchEnd) return;
                
                const distance = tipsTouchStart - tipsTouchEnd;
                const minSwipeDistance = 50;

                if (distance > minSwipeDistance) {
                  // Swipe left - следующая карточка
                  setTipsIndex((prev) => Math.min(tips.length - 1, prev + 1));
                }
                
                if (distance < -minSwipeDistance) {
                  // Swipe right - предыдущая карточка
                  setTipsIndex((prev) => Math.max(0, prev - 1));
                }
                
                setTipsTouchStart(0);
                setTipsTouchEnd(0);
              }}
            >
              <div 
                ref={tipsSliderRef}
                className="flex transition-transform duration-500 ease-in-out will-change-transform"
                style={{ transform: `translateX(-${tipsIndex * 100}%)` }}
              >
                {tips.map((tip) => (
                  <div key={tip.id} className="min-w-full flex-shrink-0 w-full">
                    <WideHighlightCard data={tip} buttonText="Читать совет" />
                  </div>
                ))}
              </div>
            </div>

            {/* Индикаторы для советов */}
            <div className="flex justify-center gap-2 mt-4 mb-4">
              {tips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setTipsIndex(index);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === tipsIndex
                      ? "bg-primary w-8"
                      : "bg-primary/50 w-2"
                  )}
                  aria-label={`Перейти к совету ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
