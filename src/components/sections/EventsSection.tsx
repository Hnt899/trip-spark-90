import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const EventsSection = () => {
  const events = [
    {
      city: "Краснодар",
      age: "12+",
      price: "от 2500",
      artist: "ARTIC & ASTI",
      date: "23 октября",
      venue: "Ледовый дворец",
      color: "from-red-900 to-red-700",
    },
    {
      city: "Казань",
      age: "18+",
      price: "от 2500",
      artist: "Anna Asti. Шоу «Царица»",
      date: "9 ноября",
      venue: "Татнефть Арена",
      color: "from-pink-700 to-pink-500",
    },
    {
      city: "Петербург",
      age: "12+",
      price: "от 2500",
      artist: "Баста",
      date: "20 декабря",
      venue: "Газпром Арена",
      color: "from-orange-800 to-blue-900",
    },
    {
      city: "Москва",
      age: "16+",
      price: "от 3000",
      artist: "Сергей Лазарев",
      date: "5 ноября",
      venue: "Crocus City Hall",
      color: "from-purple-900 to-purple-600",
    },
    {
      city: "Екатеринбург",
      age: "18+",
      price: "от 2800",
      artist: "Макс Корж",
      date: "15 ноября",
      venue: "КРК Уралец",
      color: "from-blue-900 to-blue-600",
    },
    {
      city: "Нижний Новгород",
      age: "12+",
      price: "от 2200",
      artist: "Земфира",
      date: "18 ноября",
      venue: "КЗ Нагорный",
      color: "from-green-900 to-green-600",
    },
    {
      city: "Новосибирск",
      age: "16+",
      price: "от 2600",
      artist: "Би-2",
      date: "25 ноября",
      venue: "Дворец Спорта",
      color: "from-yellow-900 to-yellow-600",
    },
    {
      city: "Сочи",
      age: "18+",
      price: "от 3500",
      artist: "Мот",
      date: "1 декабря",
      venue: "Фестивальный",
      color: "from-teal-900 to-teal-600",
    },
    {
      city: "Уфа",
      age: "12+",
      price: "от 2400",
      artist: "Полина Гагарина",
      date: "8 декабря",
      venue: "Конгресс-Холл",
      color: "from-indigo-900 to-indigo-600",
    },
    {
      city: "Владивосток",
      age: "16+",
      price: "от 2900",
      artist: "Монеточка",
      date: "12 декабря",
      venue: "Фетисов Арена",
      color: "from-rose-900 to-rose-600",
    },
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Повод для путешествия
            </h2>
            <p className="text-muted-foreground">
              10 событий, ради которых стоит ровнуть в путь
            </p>
          </div>
          <Button variant="ghost" className="hidden md:flex items-center gap-2">
            Ещё <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${event.color}`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                
                <div className="relative h-full p-6 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <h3 className="text-3xl font-bold">{event.city}</h3>
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {event.age}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-4xl font-bold">{event.price}</p>
                    <p className="text-xl font-semibold">{event.artist}</p>
                    <p className="text-sm opacity-90">{event.date}</p>
                    <p className="text-sm opacity-90">{event.venue}</p>
                  </div>
                </div>
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

export default EventsSection;