import armenia from "@/assets/armenia.jpg";
import china from "@/assets/china.jpg";
import karelia from "@/assets/karelia.jpg";

const InspirationSection = () => {
  const destinations = [
    {
      name: "Душевная Армения",
      description: "Ереван, Севан и древние монастыри",
      image: armenia,
    },
    {
      name: "Отпуск в Китае",
      description: "Что стоит знать перед первой поездкой",
      image: china,
    },
    {
      name: "Маршрут по Карелии",
      description: "Главные места для знакомства с республикой",
      image: karelia,
    },
    {
      name: "Золотое кольцо России",
      description: "Древние города и православные святыни",
      image: armenia,
    },
    {
      name: "Байкал зимой",
      description: "Невероятная красота ледяного озера",
      image: china,
    },
    {
      name: "Камчатка",
      description: "Вулканы, гейзеры и дикая природа",
      image: karelia,
    },
    {
      name: "Алтай",
      description: "Горы, озёра и бескрайние степи",
      image: armenia,
    },
    {
      name: "Крым",
      description: "Южное побережье и горные тропы",
      image: china,
    },
    {
      name: "Якутия",
      description: "Полюс холода и северное сияние",
      image: karelia,
    },
    {
      name: "Кавказ",
      description: "Эльбрус и горные аулы",
      image: armenia,
    },
  ];

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    e.preventDefault();
    container.scrollLeft += e.deltaY;
  };

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Вдохновение для следующей поездки
          </h2>
          <p className="text-muted-foreground">
            Найдите идеи и направления
          </p>
        </div>

        <div 
          className="overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide snap-x snap-mandatory"
          onWheel={handleWheel}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-8 pb-4" style={{ width: 'max-content' }}>
            {destinations.map((destination, index) => (
              <div 
                key={index}
                className="group cursor-pointer snap-start flex-shrink-0 w-[380px]"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">
                  {destination.name}
                </h3>
                <p className="text-muted-foreground">
                  {destination.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default InspirationSection;