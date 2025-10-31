import { Button } from "@/components/ui/button";
import { ArrowRight, Train } from "lucide-react";

const RecommendedTrainsSection = () => {
  const trains = [
    {
      logo: "РЖД",
      departure: "07:10",
      departureCity: "Москва",
      arrival: "10:45",
      arrivalCity: "Санкт-Петербург",
      duration: "3ч 35м",
      returnDeparture: "15:30",
      returnDepartureCity: "Санкт-Петербург",
      returnArrival: "19:25",
      returnArrivalCity: "Москва",
      returnDuration: "3ч 55м",
      price: "2 950 ₽",
      offers: 12,
    },
    {
      logo: "РЖД",
      departure: "10:00",
      departureCity: "Нижний Новгород",
      arrival: "13:55",
      arrivalCity: "Москва",
      duration: "3ч 55м",
      returnDeparture: "22:40",
      returnDepartureCity: "Казань",
      returnArrival: "09:40",
      returnArrivalCity: "Москва",
      returnDuration: "11ч 00м",
      price: "1 850 ₽",
      offers: 13,
    },
    {
      logo: "РЖД",
      departure: "21:00",
      departureCity: "Казань",
      arrival: "19:00",
      arrivalCity: "Санкт-Петербург",
      duration: "22ч 00м",
      returnDeparture: "19:00",
      returnDepartureCity: "Тула",
      returnArrival: "21:10",
      returnArrivalCity: "Москва",
      returnDuration: "2ч 10м",
      price: "650 ₽",
      offers: 14,
    },
    {
      logo: "РЖД",
      departure: "13:25",
      departureCity: "Тверь",
      arrival: "15:05",
      arrivalCity: "Москва",
      duration: "1ч 40м",
      returnDeparture: "09:00",
      returnDepartureCity: "Пермь",
      returnArrival: "14:00",
      returnArrivalCity: "Екатеринбург",
      returnDuration: "5ч 00м",
      price: "550 ₽",
      offers: 15,
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Рекомендуемые поезда
            </h2>
            <p className="text-muted-foreground">
              Подберите выгодные варианты поездок на поезда
            </p>
          </div>
          <Button variant="ghost" className="hidden md:flex items-center gap-2">
            Ещё <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {trains.map((train, index) => (
            <div 
              key={index}
              className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-destructive rounded flex items-center justify-center">
                      <Train className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{train.departure}</p>
                      <p className="text-sm text-muted-foreground">{train.departureCity}</p>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center">
                      <p className="text-xs text-muted-foreground mb-1">{train.duration}</p>
                      <div className="w-full h-px bg-border relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-border"></div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-2xl font-bold">{train.arrival}</p>
                      <p className="text-sm text-muted-foreground">{train.arrivalCity}</p>
                    </div>
                  </div>

                  <div className="w-12 h-12 bg-destructive rounded flex items-center justify-center">
                    <Train className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{train.returnDeparture}</p>
                      <p className="text-sm text-muted-foreground">{train.returnDepartureCity}</p>
                    </div>
                    
                    <div className="flex-1 flex flex-col items-center">
                      <p className="text-xs text-muted-foreground mb-1">{train.returnDuration}</p>
                      <div className="w-full h-px bg-border relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-border"></div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-2xl font-bold">{train.returnArrival}</p>
                      <p className="text-sm text-muted-foreground">{train.returnArrivalCity}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 min-w-[200px]">
                  <p className="text-2xl font-bold text-foreground">{train.price}</p>
                  <p className="text-sm text-muted-foreground">{train.offers} предложений</p>
                  <Button variant="outline" className="w-full">
                    Смотреть предложение <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedTrainsSection;