import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import karelia from "@/assets/karelia.jpg";
import moscow from "@/assets/moscow.jpg";
import stPetersburg from "@/assets/saint-petersburg.jpg";
import kazan from "@/assets/kazan.jpg";
import novgorod from "@/assets/novgorod.jpg";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const updateCardWidth = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.offsetWidth;
        const gap = 24;
        const visibleCards = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 1;
        const newWidth = (containerWidth - gap * (visibleCards - 1)) / visibleCards;
        setCardWidth(newWidth);
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
    <section className="py-20 bg-[#eef0f8]">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Готовые маршруты по регионам
          </h2>
          <Button variant="outline" className="bg-[#eef0f8] hover:bg-[#e0e4f0]">
            Все маршруты ({regions.length})
          </Button>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {regions.map((region, index) => (
              <Card
                key={index}
                className="flex-shrink-0 overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                style={{ width: `${cardWidth || 280}px` }}
              >
                <div className="relative">
                  <img
                    src={region.image}
                    alt={region.name}
                    className="w-full h-48 object-cover rounded-t-lg"
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

          <div className="flex justify-center gap-2 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              className="rounded-full bg-white shadow-md hover:bg-white w-12 h-12 border-0"
            >
              <ChevronLeft className="w-5 h-5 text-primary" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollRight}
              className="rounded-full bg-white shadow-md hover:bg-white w-12 h-12 border-0"
            >
              <ChevronRight className="w-5 h-5 text-primary" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RegionsRoutesSection;

