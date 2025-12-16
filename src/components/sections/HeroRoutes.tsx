import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import RoutesHeader from "@/components/RoutesHeader";
import karelia from "@/assets/karelia.jpg";
import moscow from "@/assets/moscow.jpg";
import stPetersburg from "@/assets/saint-petersburg.jpg";
import kazan from "@/assets/kazan.jpg";

interface HeroSlide {
  titleLine1: string;
  titleLine2: string;
  rating: number;
  description: string;
  image: string;
}

const slides: HeroSlide[] = [
  {
    titleLine1: "Архангельская",
    titleLine2: "область",
    rating: 9.3,
    description:
      "Самый большой в стране музей деревянного зодчества, песчаные пляжи Белого моря, старейший колесный пароход России и отличные рестораны северной кухни.",
    image: karelia,
  },
  {
    titleLine1: "Москва",
    titleLine2: "",
    rating: 9.5,
    description:
      "Столица России с богатой историей, архитектурными памятниками, музеями мирового уровня и динамичной культурной жизнью.",
    image: moscow,
  },
  {
    titleLine1: "Санкт-",
    titleLine2: "Петербург",
    rating: 9.7,
    description:
      "Северная столица с великолепной архитектурой, дворцами, музеями и белыми ночами. Культурное сердце России.",
    image: stPetersburg,
  },
  {
    titleLine1: "Казань",
    titleLine2: "",
    rating: 9.4,
    description:
      "Тысячелетний город, где встречаются Восток и Запад. Современные комплексы и древние мечети создают неповторимый облик города.",
    image: kazan,
  },
];

const HeroRoutes = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPaused && !isDragging) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, isDragging]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Игнорируем клики на интерактивные элементы
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest('[role="button"]')
    ) {
      return;
    }

    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    setIsPaused(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50; // Минимальное расстояние для переключения слайда

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Свайп влево - следующий слайд
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        // Свайп вправо - предыдущий слайд
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }

    setIsDragging(false);
    setIsPaused(false);
    setStartX(0);
    setCurrentX(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
    setIsPaused(false);
  };

  // Touch events для мобильных устройств
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest('[role="button"]')
    ) {
      return;
    }

    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const diff = startX - currentX;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }

    setIsDragging(false);
    setIsPaused(false);
    setStartX(0);
    setCurrentX(0);
  };

  return (
    <section className="relative w-full">
      <RoutesHeader />
      <div
        ref={containerRef}
        className={`relative rounded-b-3xl overflow-hidden aspect-[21/9] md:aspect-[16/9] w-full ${
          isDragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => setIsPaused(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ userSelect: isDragging ? "none" : "auto", touchAction: "pan-x pan-y" }}
        >
          {/* Slides container */}
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Background image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Content */}
                <div className="absolute top-36 left-0 right-0 bottom-0 flex items-center">
                  <div className="container px-6 md:px-12">
                    <div className="max-w-3xl space-y-8 text-white">
                      {/* Title with rating badge */}
                      <div className="flex items-end gap-2 flex-wrap">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                          {slide.titleLine1}
                          {slide.titleLine2 && (
                            <>
                              <br />
                              {slide.titleLine2}
                            </>
                          )}
                        </h1>
                        {/* Star-shaped rating badge */}
                        <div className="relative flex-shrink-0 -ml-2 mb-1">
                          <svg
                            width="80"
                            height="80"
                            viewBox="0 0 80 80"
                            className="drop-shadow-lg"
                          >
                            <path
                              d="M40 0 L48 28 L76 28 L54 46 L62 74 L40 56 L18 74 L26 46 L4 28 L32 28 Z"
                              fill="#22C55E"
                              stroke="white"
                              strokeWidth="1"
                            />
                            <text
                              x="40"
                              y="50"
                              textAnchor="middle"
                              fill="white"
                              fontSize="24"
                              fontWeight="bold"
                              className="font-bold"
                            >
                              {slide.rating}
                            </text>
                          </svg>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed font-semibold tracking-wide">
                        {slide.description}
                      </p>

                      {/* CTA Button */}
                      <div>
                        <Button
                          size="lg"
                          className="px-10 py-8 text-xl md:text-2xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                          Узнать маршрут
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-primary w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>
        </div>
    </section>
  );
};

export default HeroRoutes;

