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
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <div 
              key={index}
              className="group cursor-pointer"
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
    </section>
  );
};

export default InspirationSection;