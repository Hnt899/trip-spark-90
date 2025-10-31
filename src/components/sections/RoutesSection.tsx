import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import stPetersburg from "@/assets/saint-petersburg.jpg";
import moscow from "@/assets/moscow.jpg";
import kazan from "@/assets/kazan.jpg";
import novgorod from "@/assets/novgorod.jpg";

const RoutesSection = () => {
  // 14 маршрутов (искусственно расширяем список, переиспользуя изображения)
  const base = [
    { name: "Санкт-Петербург", image: stPetersburg },
    { name: "Москва", image: moscow },
    { name: "Казань", image: kazan },
    { name: "Великий Новгород", image: novgorod },
  ];
  const extraNames = [
    "Нижний Новгород",
    "Самара",
    "Ростов-на-Дону",
    "Екатеринбург",
    "Новосибирск",
    "Сочи",
    "Краснодар",
    "Пермь",
    "Тюмень",
    "Владивосток",
  ];
  const routes = [
    ...base,
    ...extraNames.map((n, i) => ({ name: n, image: base[i % base.length].image })),
  ];

  // Slider config: 4 карточки одновременно
  const visibleCount = 4;
  const gapPx = 24; // gap-6 = 1.5rem = 24px
  const trackItems = useMemo(() => {
    const head = routes.slice(0, visibleCount);
    const tail = routes.slice(-visibleCount);
    return [...tail, ...routes, ...head];
  }, []);
  const totalOriginal = routes.length;
  const startAt = visibleCount;
  const [current, setCurrent] = useState(startAt);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [slideWidthPx, setSlideWidthPx] = useState(0);

  useEffect(() => {
    const update = () => {
      const w = containerRef.current?.offsetWidth ?? 0;
      const contentWidth = Math.max(0, w - gapPx * (visibleCount - 1));
      setSlideWidthPx(contentWidth / visibleCount);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goTo = (next: number) => {
    setIsAnimating(true);
    setCurrent(next);
  };
  const handlePrev = () => goTo(current - 1.1);
  const handleNext = () => goTo(current + 1.1);
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

  return (
    <section className="py-20">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Популярные маршруты
            </h2>
            <p className="text-muted-foreground">
              Эти популярные направления предлагают многое
            </p>
          </div>
          <Button variant="ghost" className="hidden md:flex items-center gap-2">
            Ещё <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={containerRef}>
            <div
              ref={trackRef}
              className="flex gap-6"
              style={{
                transform: `translateX(-${(current - startAt) * slideWidthPx}px)`,
                transition: isAnimating ? "transform 500ms ease" : undefined,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {trackItems.map((route, index) => (
                <div key={`${route.name}-${index}`} className="flex-shrink-0" style={{ width: `${slideWidthPx}px` }}>
                  <div className="relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer transition-transform duration-300">
                    <img src={route.image} alt={route.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold">{route.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 -translate-x-full top-1/2 -translate-y-1/2 hidden lg:flex bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 translate-x-full top-1/2 -translate-y-1/2 hidden lg:flex bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
            onClick={handleNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoutesSection;