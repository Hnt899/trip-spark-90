import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import karelia from "@/assets/images/cities/karelia.jpg";
import moscow from "@/assets/images/cities/moscow.jpg";
import stPetersburg from "@/assets/images/cities/saint-petersburg.jpg";
import kazan from "@/assets/images/cities/kazan.jpg";
import novgorod from "@/assets/images/cities/novgorod.jpg";

interface RegionRoute {
  name: string;
  image: string;
  rating: number;
}

const regions: RegionRoute[] = [
  { name: "Архангельская область", image: karelia, rating: 9.3 },
  { name: "Мурманская область", image: karelia, rating: 9.3 },
  { name: "ХМАО - Югра", image: karelia, rating: 9.9 },
  { name: "Калининградская область", image: karelia, rating: 9.3 },
  { name: "Краснодарский край", image: karelia, rating: 10 },
  { name: "Москва", image: moscow, rating: 9.5 },
  { name: "Санкт-Петербург", image: stPetersburg, rating: 9.7 },
  { name: "Казань", image: kazan, rating: 9.4 },
  { name: "Великий Новгород", image: novgorod, rating: 9.2 },
];

const RegionsRoutesSection = () => {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(450);
  const [mobileCurrent, setMobileCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateCardWidth = () => {
      if (scrollContainerRef.current) {
        const screenWidth = window.innerWidth;
        const gap = 24;
        
        if (screenWidth >= 1024) {
          // Для больших экранов - уменьшенные карточки для 3 штук с местом для кнопок по бокам
          // Используем фиксированную ширину карточек, чтобы оставить место для кнопок
          const newWidth = 385; // Уменьшенная ширина карточек, чтобы все 3 поместились
          setCardWidth(newWidth);
        } else if (screenWidth >= 768) {
          // Для средних экранов - уменьшенные карточки
          const newWidth = 320;
          setCardWidth(newWidth);
        } else {
          // Для маленьких экранов - уменьшенные карточки
          const newWidth = 280;
          setCardWidth(newWidth);
        }
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = cardWidth + 24;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = cardWidth + 24;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const newIndex = Math.round(scrollLeft / (cardWidth + 24));
        setCurrentIndex(newIndex);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [cardWidth]);

  return (
    <section className="pt-2 pb-20 md:py-20 bg-[#100A6F]/80 backdrop-blur-sm relative overflow-hidden">
      {/* Декоративные желтые пятна */}
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

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            <span className="text-white">Make Your </span>
            <span className="text-[#FFD700]" style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.4)' }}>
              DAY
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto px-4">
            Откройте для себя уникальные регионы России и создайте незабываемое путешествие
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Десктопная версия - горизонтальный скролл */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative">
          {/* Кнопка влево */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollLeft}
            className="absolute top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white w-12 h-12 border-0 hidden lg:flex"
            style={{ left: '-26px' }}
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </Button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {regions.map((region, index) => (
              <Card
                key={index}
                className="flex-shrink-0 overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                style={{ width: `${cardWidth}px` }}
              >
                <div className="relative">
                  <img
                    src={region.image}
                    alt={region.name}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1 font-semibold">
                    <span>★</span>
                    <span>{region.rating}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-foreground">{region.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Кнопка вправо */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            className="absolute top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white w-12 h-12 border-0 hidden lg:flex"
            style={{ right: '-15px' }}
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </Button>
        </div>

        {/* Мобильная версия - карусель с точками */}
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
                setMobileCurrent((prev) => Math.min(regions.length - 1, prev + 1));
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
              {regions.map((region, index) => (
                <Card
                  key={index}
                  className="flex-shrink-0 w-full overflow-hidden shadow-lg cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={region.image}
                      alt={region.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1 font-semibold">
                      <span>★</span>
                      <span>{region.rating}</span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-foreground">{region.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Индикаторы для мобильной версии */}
          <div className="flex justify-center gap-2 mt-4 mb-4">
            {regions.map((_, index) => (
              <button
                key={index}
                onClick={() => setMobileCurrent(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === mobileCurrent
                    ? "bg-white w-8"
                    : "bg-white/50 w-2"
                )}
                aria-label={`Перейти к карточке ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionsRoutesSection;

