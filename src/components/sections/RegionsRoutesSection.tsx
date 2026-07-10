import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { SectionSurface } from "@/lib/sectionSurface";
import { sectionHeadingAccentClass, sectionYellowGlow } from "@/lib/sectionSurface";
import { usePageSectionFields } from "@/contexts/PageCmsContext";
import { mediaOrFallback } from "@/lib/pageContentMerge";
import type { RegionsDayFields } from "@/types/pageContent";
import { CmsEditable } from "@/components/cms/CmsEditable";
import { cmsColorStyle } from "@/lib/cmsStyle";
import karelia from "@/assets/images/cities/karelia.jpg";
import moscow from "@/assets/images/cities/moscow.jpg";
import stPetersburg from "@/assets/images/cities/saint-petersburg.jpg";
import kazan from "@/assets/images/cities/kazan.jpg";
import novgorod from "@/assets/images/cities/novgorod.jpg";

interface RegionRoute {
  name: string;
  image: string;
  rating: number;
  href?: string;
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

/** Как рейтинг в первом блоке «Маршруты» (HeroRoutes): стекло, без зелёного */
function RegionRatingBadge({ rating }: { rating: number }) {
  return (
    <div className="absolute bottom-4 left-4 z-10">
      <span className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3 py-1.5 backdrop-blur-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] text-white">
        <span className="text-base font-bold tabular-nums leading-none">{rating}</span>
        <span className="text-white/70 text-xs leading-none">/10</span>
      </span>
    </div>
  );
}

const RegionsRoutesSection = ({ surface = "brand" }: { surface?: SectionSurface }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(450);
  const [mobileCurrent, setMobileCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);
  const f = usePageSectionFields<RegionsDayFields>("regionsDay");
  const titlePrefix = f.titlePrefix || "Make Your ";
  const titleAccent = f.titleAccent || "DAY";
  const displayRegions: RegionRoute[] =
    Array.isArray(f.items) && f.items.length > 0
      ? f.items.map((item, i) => ({
          name: item.name || regions[i]?.name || "",
          image: mediaOrFallback(item.image, regions[i]?.image ?? karelia),
          rating: typeof item.rating === "number" ? item.rating : regions[i]?.rating ?? 0,
          href: item.href || "/routes/list",
        }))
      : regions.map((r) => ({ ...r, href: "/routes/list" }));

  useEffect(() => {
    const updateCardWidth = () => {
      if (scrollContainerRef.current) {
        const screenWidth = window.innerWidth;
        
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
    <CmsEditable sectionId="regionsDay">
    <section className="pt-2 pb-20 md:py-20 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            <span className={surface === "light" ? "text-[#3F3F7F]" : "text-white"}>{titlePrefix}</span>
            <span
              className={f.accentColor?.trim() ? undefined : sectionHeadingAccentClass(surface)}
              style={
                cmsColorStyle(f.accentColor) ||
                (surface === "brand" && !f.accentColor?.trim() ? sectionYellowGlow : undefined)
              }
            >
              {titleAccent}
            </span>
          </h2>
          <p className={cn("text-base md:text-lg max-w-2xl mx-auto px-4", surface === "light" ? "text-[#3F3F7F]/80" : "text-white/80")}>
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
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg w-12 h-12 hidden lg:flex",
              surface === "light"
                ? "border-2 border-[#867DFF]/50 bg-white text-primary hover:bg-[#867DFF]/10 hover:border-[#867DFF]"
                : "border-0 bg-white/90 backdrop-blur-sm hover:bg-white",
            )}
            style={{ left: '-26px' }}
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </Button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {displayRegions.map((region, index) => {
              const href = region.href || "/routes/list";
              const card = (
                <Card className="h-full w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="relative">
                    <img
                      src={region.image}
                      alt={region.name}
                      className="w-full h-96 object-cover rounded-t-lg"
                    />
                    <RegionRatingBadge rating={region.rating} />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-foreground">{region.name}</h3>
                  </CardContent>
                </Card>
              );
              const wrapClass = "flex-shrink-0 block";
              const wrapStyle = { width: `${cardWidth}px` };
              return href.startsWith("http") ? (
                <a key={index} href={href} target="_blank" rel="noopener noreferrer" className={wrapClass} style={wrapStyle}>
                  {card}
                </a>
              ) : (
                <Link key={index} to={href} className={wrapClass} style={wrapStyle}>
                  {card}
                </Link>
              );
            })}
          </div>

          {/* Кнопка вправо */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollRight}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg w-12 h-12 hidden lg:flex",
              surface === "light"
                ? "border-2 border-[#867DFF]/50 bg-white text-primary hover:bg-[#867DFF]/10 hover:border-[#867DFF]"
                : "border-0 bg-white/90 backdrop-blur-sm hover:bg-white",
            )}
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
                setMobileCurrent((prev) => Math.min(displayRegions.length - 1, prev + 1));
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
              {displayRegions.map((region, index) => {
                const href = region.href || "/routes/list";
                const card = (
                  <Card className="flex-shrink-0 w-full overflow-hidden shadow-lg cursor-pointer">
                    <div className="relative">
                      <img
                        src={region.image}
                        alt={region.name}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                      <RegionRatingBadge rating={region.rating} />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-foreground">{region.name}</h3>
                    </CardContent>
                  </Card>
                );
                return (
                  <div key={index} className="w-full flex-shrink-0">
                    {href.startsWith("http") ? (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {card}
                      </a>
                    ) : (
                      <Link to={href}>{card}</Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Индикаторы для мобильной версии */}
          <div className="flex justify-center gap-2 mt-4 mb-4">
            {displayRegions.map((_, index) => (
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
    </CmsEditable>
  );
};

export default RegionsRoutesSection;
