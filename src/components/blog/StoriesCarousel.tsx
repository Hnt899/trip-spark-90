import { useState, useEffect, useMemo, useRef } from "react";
import { CarouselNavButton } from "@/components/ui/carousel-nav-button";
import StoryModal from "./StoryModal";
import { cn } from "@/lib/utils";

export type CarouselStory = {
  id: string | number;
  /** Заголовок / название (для отображения) */
  city?: string;
  title?: string;
  /** Текст под карточкой (капсула снизу) */
  text: string;
  /** Картинки */
  images: string[];
  /** Ссылка (если есть — ведёт вместо модалки) */
  href?: string;
  /** Дата (опционально) */
  date?: string;
  /** Маршрут (опционально) */
  route?: string;
};

interface StoriesCarouselProps {
  stories: CarouselStory[];
}

const StoriesCarousel = ({ stories }: StoriesCarouselProps) => {
  const [selectedStory, setSelectedStory] = useState<CarouselStory | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [slideWidthPx, setSlideWidthPx] = useState(0);
  const [current, setCurrent] = useState(visibleCount);
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
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
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

  // Создаём клоны для бесконечного цикла: [tail, ...original, head]
  const trackItems = useMemo(() => {
    const head = stories.slice(0, visibleCount);
    const tail = stories.slice(-visibleCount);
    return [...tail, ...stories, ...head];
  }, [stories, visibleCount]);

  const totalOriginal = stories.length;
  const startAt = visibleCount;

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

  // Вычисляем текущий индекс для отображения точек
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
      handleNext();
    }

    if (distance < -minSwipeDistance) {
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
      const snap = current + totalOriginal;
      setCurrent(snap);
      if (trackRef.current) {
        trackRef.current.style.transition = "none";
        trackRef.current.style.transform = `translateX(-${(snap - startAt) * slideWidthPx}px)`;
        void trackRef.current.offsetHeight;
        trackRef.current.style.transition = "transform 500ms ease";
      }
    } else if (current >= totalOriginal + visibleCount) {
      const snap = current - totalOriginal;
      setCurrent(snap);
      if (trackRef.current) {
        trackRef.current.style.transition = "none";
        trackRef.current.style.transform = `translateX(-${(snap - startAt) * slideWidthPx}px)`;
        void trackRef.current.offsetHeight;
        trackRef.current.style.transition = "transform 500ms ease";
      }
    }
  };

  const handleStoryClick = (story: CarouselStory) => {
    if (story.href) {
      window.location.href = story.href;
    } else {
      setSelectedStory(story);
    }
  };

  const cardWidthPercent = 100.1 / visibleCount;

  if (!stories || stories.length === 0) return null;

  return (
    <>
      <div className="relative">
        <div
          className="overflow-hidden"
          ref={containerRef}
          style={{ padding: "4px 0" }}
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
                onClick={() => handleStoryClick(story)}
              >
                <div className="story-card-border">
                  <div className="relative w-full h-[500px] rounded-3xl overflow-hidden bg-white">
                    <img
                      src={story.images[0]}
                      alt={story.city || story.title || ""}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[calc(100%-2rem)]">
                      <div className="rounded-full bg-white/90 backdrop-blur-sm px-4 py-2">
                        <p className="text-sm font-medium text-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-[400px]">
                          {story.text || story.city || story.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CarouselNavButton direction="prev" onClick={handlePrev} />
        <CarouselNavButton direction="next" onClick={handleNext} />

        <div className="flex justify-center gap-2 mt-4 mb-4">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-primary/50 w-2",
              )}
              aria-label={`Перейти к истории ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {selectedStory && (
        <StoryModal
          story={selectedStory as any}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </>
  );
};

export default StoriesCarousel;