import { useState, useEffect, useMemo, useRef } from "react";
import { StoryData } from "@/data/blogData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import StoryModal from "./StoryModal";

interface StoriesCarouselProps {
  stories: StoryData[];
}

const StoriesCarousel = ({ stories }: StoriesCarouselProps) => {
  const [selectedStory, setSelectedStory] = useState<StoryData | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [slideWidthPx, setSlideWidthPx] = useState(0);
  const [current, setCurrent] = useState(visibleCount); // Начинаем с visibleCount (первый оригинальный элемент)
  const [isAnimating, setIsAnimating] = useState(false);
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
        <div className="overflow-hidden" ref={containerRef} style={{ padding: '4px 0' }}>
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
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full -ml-4 w-10 h-10 rounded-full bg-white shadow-md z-10 hidden md:flex"
          onClick={handlePrev}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full ml-4 w-10 h-10 rounded-full bg-white shadow-md z-10 hidden md:flex"
          onClick={handleNext}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
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

