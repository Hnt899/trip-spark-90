import { useState, useEffect, useMemo, useRef } from "react";
import { StoryData } from "@/data/blogData";
import { CarouselNavButton } from "@/components/ui/carousel-nav-button";
import StoryModal from "./StoryModal";
import { cn } from "@/lib/utils";

interface StoriesCarouselProps {
  stories: StoryData[];
}

const StoriesCarousel = ({ stories }: StoriesCarouselProps) => {
  const [selectedStory, setSelectedStory] = useState<StoryData | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [slideWidthPx, setSlideWidthPx] = useState(0);
  const [current, setCurrent] = useState(visibleCount); // Начинаем с visibleCount (первый оригинальный элемент)
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Определяем количество видимых карточек в зависимости от размера экрана
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  // Вычисляем ширину слайда
  useEffect(() => {
    const update = () => {
      const w = containerRef.current?.offsetWidth ?? 0;
      setSlideWidthPx(w / visibleCount);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [visibleCount]);

  // Создаем клоны для бесконечного цикла: [tail, ...original, head]
  const trackItems = useMemo(() => {
    const head = stories.slice(0, visibleCount);
    const tail = stories.slice(-visibleCount);
    return [...tail, ...stories, ...head];
  }, [stories, visibleCount]);

  const totalOriginal = stories.length;
  const startAt = visibleCount; // Начальная позиция (первый оригинальный элемент)

  // Обновляем current при изменении visibleCount
  useEffect(() => {
    setCurrent(visibleCount);
  }, [visibleCount]);

  const goTo = (next: number) => {
    setIsAnimating(true);
    setCurrent(next);
  };

  const handlePrev = () => goTo(current - 1);
  const handleNext = () => goTo(current + 1);

  // Вычисляем текущий индекс для отображения точек (нормализованный)
  const getCurrentIndex = () => {
    if (current < visibleCount) {
      return current + stories.length;
    } else if (current >= stories.length + visibleCount) {
      return current - stories.length;
    }
    return current - visibleCount;
  };

  const currentIndex = getCurrentIndex();

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swipe left - следующая карточка
      handleNext();
    }
    
    if (distance < -minSwipeDistance) {
      // Swipe right - предыдущая карточка
      handlePrev();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  const goToIndex = (index: number) => {
    goTo(index + visibleCount);
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (current < visibleCount) {
      // Перешли в левые клоны -> переключаемся на соответствующий оригинальный элемент
      const snap = current + totalOriginal;
      setCurrent(snap);
      if (trackRef.current) {
        trackRef.current.style.transition = "none";
        trackRef.current.style.transform = `translateX(-${(snap - startAt) * slideWidthPx}px)`;
        void trackRef.current.offsetHeight; // Принудительный reflow
        trackRef.current.style.transition = "transform 500ms ease";
      }
    } else if (current >= totalOriginal + visibleCount) {
      // Перешли в правые клоны -> переключаемся на соответствующий оригинальный элемент
      const snap = current - totalOriginal;
      setCurrent(snap);
      if (trackRef.current) {
        trackRef.current.style.transition = "none";
        trackRef.current.style.transform = `translateX(-${(snap - startAt) * slideWidthPx}px)`;
        void trackRef.current.offsetHeight; // Принудительный reflow
        trackRef.current.style.transition = "transform 500ms ease";
      }
    }
  };

  const cardWidthPercent = 100.1 / visibleCount;

  return (
    <>
      <div className="relative">
        <div 
          className="overflow-hidden" 
          ref={containerRef} 
          style={{ padding: '4px 0' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={trackRef}
            className="flex"
            style={{
              transform: `translateX(-${(current - startAt) * slideWidthPx}px)`,
              transition: isAnimating ? "transform 500ms ease" : undefined,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {trackItems.map((story, index) => (
              <div
                key={`${story.id}-${index}`}
                className="pr-4 flex-shrink-0 cursor-pointer group"
                style={{ 
                  width: `${cardWidthPercent}%`,
                  minWidth: `${cardWidthPercent}%`,
                }}
                onClick={() => setSelectedStory(story)}
              >
                <div className="story-card-border">
                  <div className="relative w-full h-[500px] rounded-3xl overflow-hidden bg-white">
                    <img
                      src={story.images[0]}
                      alt={story.city}
                      className="w-full h-full object-cover"
                    />
                    {/* Капсула с текстом */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                      <div className="rounded-full bg-white/90 backdrop-blur-sm px-4 py-2">
                        <p className="text-sm font-medium text-foreground whitespace-nowrap">
                          {story.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Навигационные кнопки */}
        <CarouselNavButton direction="prev" onClick={handlePrev} />
        <CarouselNavButton direction="next" onClick={handleNext} />

        {/* Индикаторы для сторис */}
        <div className="flex justify-center gap-2 mt-4 mb-4">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-primary/50 w-2"
              )}
              aria-label={`Перейти к истории ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Модальное окно сториса */}
      {selectedStory && (
        <StoryModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </>
  );
};

export default StoriesCarousel;

