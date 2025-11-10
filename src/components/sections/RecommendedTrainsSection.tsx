import { Button } from "@/components/ui/button";
import { ArrowRight, Train } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const RecommendedTrainsSection = () => {
  const navigate = useNavigate();
  
  const handleViewTrain = (departureCity: string, arrivalCity: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const params = new URLSearchParams({
      from: departureCity,
      to: arrivalCity,
      date: format(tomorrow, "yyyy-MM-dd"),
      ticketType: "all",
      passengers: "1"
    });
    navigate(`/train-search?${params.toString()}`);
  };
  const trains = [
    {
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
      departure: "10:00",
      departureCity: "Нижний Новгород",
      arrival: "13:55",
      arrivalCity: "Москва",
      duration: "3ч 55м",
      returnDeparture: "22:40",
      returnDepartureCity: "Москва",
      returnArrival: "09:40",
      returnArrivalCity: "Нижний Новгород",
      returnDuration: "11ч 00м",
      price: "1 850 ₽",
      offers: 13,
    },
    {
      departure: "21:00",
      departureCity: "Казань",
      arrival: "19:00",
      arrivalCity: "Санкт-Петербург",
      duration: "22ч 00м",
      returnDeparture: "19:00",
      returnDepartureCity: "Санкт-Петербург",
      returnArrival: "21:10",
      returnArrivalCity: "Казань",
      returnDuration: "2ч 10м",
      price: "650 ₽",
      offers: 14,
    },
    {
      departure: "13:25",
      departureCity: "Тверь",
      arrival: "15:05",
      arrivalCity: "Москва",
      duration: "1ч 40м",
      returnDeparture: "09:00",
      returnDepartureCity: "Москва",
      returnArrival: "14:00",
      returnArrivalCity: "Тверь",
      returnDuration: "5ч 00м",
      price: "550 ₽",
      offers: 15,
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      {/* увеличенный контейнер */}
      <div className="mx-auto px-6 w-full max-w-[1700px]">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-3">
              Рекомендуемые поезда
            </h2>
            <p className="text-base text-muted-foreground">
              Подберите выгодные варианты поездок на поезда
            </p>
          </div>
          <Button variant="ghost" className="hidden md:flex items-center gap-2 text-base">
            Ещё <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="space-y-6">
          {trains.map((train, index) => (
            <div
              key={index}
              className="bg-card border rounded-2xl p-7 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                {/* Левая часть */}
                <div
                  className="grid w-full items-center gap-5
                  grid-cols-[auto_130px_190px_130px_auto_150px_190px_130px]
                  md:grid-cols-[auto_140px_200px_140px_auto_160px_200px_140px]
                  lg:grid-cols-[auto_150px_210px_150px_auto_170px_210px_150px]"
                >
                  <div className="w-12 h-12 bg-destructive rounded flex items-center justify-center ml-[65%]">
                    <Train className="w-6 h-6 text-white" />
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold">{train.departure}</p>
                    <p className="text-sm text-muted-foreground">
                      {train.departureCity}
                    </p>
                  </div>

                  <div className="w-[190px] md:w-[200px] lg:w-[210px] mx-auto">
                    <p className="text-sm text-muted-foreground mb-1 text-center">
                      {train.duration}
                    </p>
                    <div className="h-[2px] bg-border relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-border" />
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold">{train.arrival}</p>
                    <p className="text-sm text-muted-foreground">
                      {train.arrivalCity}
                    </p>
                  </div>

                  <div className="w-12 h-12 bg-destructive rounded flex items-center justify-center ml-[65%]">
                    <Train className="w-6 h-6 text-white" />
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold">{train.returnDeparture}</p>
                    <p className="text-sm text-muted-foreground">
                      {train.returnDepartureCity}
                    </p>
                  </div>

                  <div className="w-[190px] md:w-[200px] lg:w-[210px] mx-auto">
                    <p className="text-sm text-muted-foreground mb-1 text-center">
                      {train.returnDuration}
                    </p>
                    <div className="h-[2px] bg-border relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-border" />
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold">{train.returnArrival}</p>
                    <p className="text-sm text-muted-foreground">
                      {train.returnArrivalCity}
                    </p>
                  </div>
                </div>

                {/* Правая часть */}
                <div className="flex flex-col items-end gap-2 min-w-[190px] ml-[-2%]">
                  <p className="text-2xl font-bold text-foreground">
                    {train.price}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {train.offers} предложений
                  </p>
                  <Button 
                    variant="outline" 
                    className="h-9 px-4 text-sm"
                    onClick={() => handleViewTrain(train.departureCity, train.arrivalCity)}
                  >
                    Смотреть <ArrowRight className="w-4 h-4 ml-2" />
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
