import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle, Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const orderNumber = searchParams.get("order");
  
  const [ticket, setTicket] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderNumber) {
      setError("Номер заказа не указан");
      setIsLoading(false);
      return;
    }

    loadTicket();
  }, [orderNumber]);

  const loadTicket = async () => {
    if (!orderNumber) return;

    try {
      const { data, error: fetchError } = await supabase
        .from("tickets")
        .select("*")
        .eq("order_number", orderNumber)
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      if (!data) {
        setError("Заказ не найден");
        setIsLoading(false);
        return;
      }

      setTicket(data);
      setIsLoading(false);

      // Если статус pending - обновляем на cancelled
      if (data.payment_status === "pending" && user?.id === data.user_id) {
        await updateTicketStatus(data.id);
      }
    } catch (err) {
      console.error("Ошибка при загрузке заказа:", err);
      setError("Ошибка при загрузке данных заказа");
      setIsLoading(false);
    }
  };

  const updateTicketStatus = async (ticketId: string) => {
    setIsUpdating(true);

    try {
      const { error: updateError } = await supabase
        .from("tickets")
        .update({ payment_status: "cancelled" })
        .eq("id", ticketId)
        .eq("payment_status", "pending"); // обновляем только если ещё pending

      if (updateError) {
        throw updateError;
      }

      // Обновляем локальное состояние
      setTicket((prev: any) => prev ? { ...prev, payment_status: "cancelled" } : null);
    } catch (err) {
      console.error("Ошибка при обновлении статуса:", err);
      // Не показываем ошибку пользователю, это некритично
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRetry = () => {
    // Возвращаемся на checkout с теми же параметрами
    // Можно попробовать восстановить параметры из URL или из ticket
    if (ticket) {
      navigate(`/checkout?from=${ticket.from_city}&to=${ticket.to_city}&date=${ticket.departure_date}`);
    } else {
      navigate("/");
    }
  };

  if (isLoading || isUpdating) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Загрузка данных заказа...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error && !ticket) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold mb-2">Ошибка</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => navigate("/")}>На главную</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <XCircle className="w-10 h-10 text-orange-600" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Оплата отменена</h1>
                <p className="text-muted-foreground mb-4">
                  {orderNumber && (
                    <>
                      Заказ № <span className="font-mono font-semibold">{orderNumber}</span>
                    </>
                  )}
                </p>
                <p className="text-muted-foreground">
                  Вы отменили процесс оплаты. Заказ не был оплачен.
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={handleRetry} variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Попробовать снова
                </Button>
                <Button onClick={() => navigate("/")}>
                  На главную
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentCancel;

