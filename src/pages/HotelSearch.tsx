import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSearchParams } from "react-router-dom";
import { BedDouble } from "lucide-react";

const HotelSearch = () => {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <BedDouble className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Поиск отелей</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            Система поиска отелей находится в разработке.
          </p>
          {(destination || checkIn || checkOut || guests) && (
            <div className="bg-muted p-6 rounded-lg text-left">
              <h2 className="font-semibold mb-4">Параметры поиска:</h2>
              <ul className="space-y-2 text-muted-foreground">
                {destination && <li>Направление: <span className="text-foreground font-medium">{destination}</span></li>}
                {checkIn && <li>Заезд: <span className="text-foreground font-medium">{checkIn}</span></li>}
                {checkOut && <li>Выезд: <span className="text-foreground font-medium">{checkOut}</span></li>}
                {guests && <li>Гости: <span className="text-foreground font-medium">{guests}</span></li>}
              </ul>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HotelSearch;

