import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import stPetersburg from "@/assets/saint-petersburg.jpg";
import moscow from "@/assets/moscow.jpg";
import kazan from "@/assets/kazan.jpg";
import novgorod from "@/assets/novgorod.jpg";

const RoutesSection = () => {
  const routes = [
    {
      name: "Санкт-Петербург",
      image: stPetersburg,
    },
    {
      name: "Москва",
      image: moscow,
    },
    {
      name: "Казань",
      image: kazan,
    },
    {
      name: "Великий Новгород",
      image: novgorod,
    },
  ];

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {routes.map((route, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src={route.image} 
                  alt={route.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold">
                  {route.name}
                </h3>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute -left-6 top-1/2 -translate-y-1/2 hidden lg:flex bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-6 top-1/2 -translate-y-1/2 hidden lg:flex bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoutesSection;