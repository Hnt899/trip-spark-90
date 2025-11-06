import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const fromCity = searchParams.get("from") || "Москва";
  const toCity = searchParams.get("to") || "Санкт-Петербург";
  const dateStr = searchParams.get("date");
  const carNumber = searchParams.get("carNumber") || "";
  const seatNumber = searchParams.get("seatNumber") || "";
  const seatType = searchParams.get("seatType") || "";
  const price = searchParams.get("price") || "0";
  const adults = searchParams.get("adults") || "1";
  const children = searchParams.get("children") || "0";
  const infants = searchParams.get("infants") || "0";

  const departureDate = dateStr ? new Date(dateStr) : new Date();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePay = () => {
    setIsProcessing(true);
    
    // Симуляция обработки оплаты
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      
      // Перенаправление на главную через 2 секунды
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 2000);
  };

  const formatDate = (date: Date) => {
    return format(date, "d MMM, EEE", { locale: ru });
  };

  const totalPrice = parseInt(price) * parseInt(adults) + (parseInt(price) * 0.7 * parseInt(children));

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Заказ успешно оформлен!</h1>
              <p className="text-muted-foreground">
                Вы будете перенаправлены на главную страницу...
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>

          {/* Информация о поездке */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Информация о поездке</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Маршрут</div>
                    <div className="text-sm text-muted-foreground">
                      {fromCity} → {toCity}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">Дата</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(departureDate)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Поезд</div>
                    <div className="text-sm text-muted-foreground">
                      022А Ночной экспресс
                    </div>
                  </div>
                  {carNumber && seatNumber && (
                    <div className="text-right">
                      <div className="font-medium">Место</div>
                      <div className="text-sm text-muted-foreground">
                        {carNumber} вагон, место {seatNumber} {seatType === "lower" ? "(нижнее)" : "(верхнее)"}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Пассажиры</div>
                    <div className="text-sm text-muted-foreground">
                      {adults} {adults === "1" ? "взрослый" : "взрослых"}
                      {children !== "0" && `, ${children} ${children === "1" ? "ребёнок" : "детей"}`}
                      {infants !== "0" && `, ${infants} ${infants === "1" ? "малыш" : "малышей"}`}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Стоимость */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Стоимость</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Билет{adults !== "1" ? "ы" : ""} ({adults} {adults === "1" ? "взрослый" : "взрослых"})
                  </span>
                  <span className="font-medium">
                    {parseInt(price).toLocaleString("ru-RU")} Р × {adults} = {(parseInt(price) * parseInt(adults)).toLocaleString("ru-RU")} Р
                  </span>
                </div>
                {children !== "0" && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Детские билеты ({children} {children === "1" ? "ребёнок" : "детей"})
                    </span>
                    <span className="font-medium">
                      {Math.round(parseInt(price) * 0.7).toLocaleString("ru-RU")} Р × {children} = {Math.round(parseInt(price) * 0.7 * parseInt(children)).toLocaleString("ru-RU")} Р
                    </span>
                  </div>
                )}
                <div className="border-t pt-3 flex items-center justify-between">
                  <span className="text-lg font-bold">Итого</span>
                  <span className="text-2xl font-bold">
                    {totalPrice.toLocaleString("ru-RU")} Р
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Кнопка оплаты */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => navigate(-1)}
              disabled={isProcessing}
            >
              Назад
            </Button>
            <Button
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-lg py-6"
              onClick={handlePay}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Обработка...
                </>
              ) : (
                `Оплатить ${totalPrice.toLocaleString("ru-RU")} Р`
              )}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;




