import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { generateRzdStyleTicket } from "@/lib/generateRzdStyleTicket";
import type { EpdData } from "@/types/epd";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderNumber = searchParams.get("order");
  
  const hasGeneratedRef = useRef(false);
  const [ticket, setTicket] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pollingCount, setPollingCount] = useState(0);
  const maxPollingAttempts = 15; // 15 попыток × 2 секунды = 30 секунд

  // Загрузка билета
  useEffect(() => {
    if (!orderNumber) {
      setError("Номер заказа не указан");
      setIsLoading(false);
      return;
    }

    loadTicket();
  }, [orderNumber]);

  // Polling для проверки статуса оплаты
  useEffect(() => {
    if (!ticket || ticket.payment_status === "paid" || hasGeneratedRef.current) {
      return;
    }

    if (pollingCount >= maxPollingAttempts) {
      setError("Время ожидания истекло. Пожалуйста, обновите страницу или проверьте статус заказа в профиле.");
      return;
    }

    const intervalId = setInterval(() => {
      setPollingCount((prev) => prev + 1);
      loadTicket();
    }, 2000); // каждые 2 секунды

    return () => clearInterval(intervalId);
  }, [ticket, pollingCount]);

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

      // Если оплата подтверждена, генерируем билеты
      if (data.payment_status === "paid" && !hasGeneratedRef.current) {
        hasGeneratedRef.current = true;
        generateTickets(data);
      }
    } catch (err) {
      console.error("Ошибка при загрузке заказа:", err);
      setError("Ошибка при загрузке данных заказа");
      setIsLoading(false);
    }
  };

  const generateTickets = async (ticketData: any) => {
    if (!ticketData.tickets_data || !Array.isArray(ticketData.tickets_data)) {
      setError("Данные билетов не найдены");
      return;
    }

    setIsGenerating(true);

    try {
      // Генерируем PDF для каждого билета
      for (let i = 0; i < ticketData.tickets_data.length; i++) {
        const epd: EpdData = ticketData.tickets_data[i];

        // Генерируем PDF
        const pdfUrl = await generateRzdStyleTicket(epd);

        // Автоматически скачиваем PDF
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = `ticket_${epd.orderNumber}_${i + 1}.pdf`;
        link.style.display = "none";
        document.body.appendChild(link);

        // Добавляем задержку между скачиваниями
        await new Promise((resolve) => {
          setTimeout(() => {
            link.click();
            setTimeout(() => {
              document.body.removeChild(link);
              URL.revokeObjectURL(pdfUrl);
              resolve(undefined);
            }, 100);
          }, i * 300); // Задержка 300мс между каждым скачиванием
        });
      }
    } catch (err) {
      console.error("Ошибка при генерации билетов:", err);
      setError("Ошибка при генерации билетов. Попробуйте скачать их из профиля.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
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
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Ошибка</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button onClick={() => navigate("/")}>На главную</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!ticket) {
    return null;
  }

  // Ожидание подтверждения оплаты
  if (ticket.payment_status !== "paid") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-12">
          <div className="max-w-2xl mx-auto text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
            <h1 className="text-2xl font-bold mb-2">Ожидаем подтверждение оплаты</h1>
            <p className="text-muted-foreground mb-4">
              Мы получили ваш запрос и проверяем статус оплаты...
            </p>
            <p className="text-sm text-muted-foreground">
              Заказ: <span className="font-mono">{orderNumber}</span>
            </p>
            {pollingCount >= maxPollingAttempts && (
              <div className="mt-6">
                <p className="text-sm text-destructive mb-4">
                  Время ожидания истекло. Пожалуйста, проверьте статус заказа в профиле.
                </p>
                <Button onClick={() => navigate("/profile")}>Перейти в профиль</Button>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Оплата подтверждена
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12">
        <div className="max-w-2xl mx-auto text-center">
          <Card>
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Заказ успешно оплачен!</h1>
                <p className="text-muted-foreground mb-4">
                  Заказ № <span className="font-mono font-semibold">{orderNumber}</span>
                </p>
              </div>

              {isGenerating && (
                <div className="mb-6">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Генерация и скачивание билетов...</p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {!isGenerating && !error && (
                <div className="mb-6">
                  <p className="text-muted-foreground mb-4">
                    Билеты были автоматически скачаны. Проверьте папку "Загрузки".
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Вы также можете скачать билеты в любое время из вашего профиля.
                  </p>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <Button onClick={() => navigate("/profile")} variant="outline">
                  В профиль
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

export default PaymentSuccess;

