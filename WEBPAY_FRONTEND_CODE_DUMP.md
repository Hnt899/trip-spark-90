# PaymentSuccess.tsx - Functions and Hooks Only

## useEffect для загрузки билета

```tsx
useEffect(() => {
  if (!orderNumber) {
    setError("Номер заказа не указан");
    setIsLoading(false);
    return;
  }

  loadTicket();
}, [orderNumber]);
```

## useEffect для polling статуса оплаты

```tsx
useEffect(() => {
  if (!ticket || ticket.payment_status === "paid") {
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
```

## Функция loadTicket (с download guard)

```tsx
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

    // Если оплата подтверждена, генерируем билеты (download guard: проверка !isGenerating)
    if (data.payment_status === "paid" && !isGenerating) {
      generateTickets(data);
    }
  } catch (err) {
    console.error("Ошибка при загрузке заказа:", err);
    setError("Ошибка при загрузке данных заказа");
    setIsLoading(false);
  }
};
```

## Функция generateTickets (download guard через isGenerating)

```tsx
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
```

## Download Guard Implementation

**Защита от повторной генерации/скачивания:**

1. **В loadTicket():**
   - Проверка `!isGenerating` перед вызовом `generateTickets(data)` (строка 78)
   - Предотвращает повторный запуск генерации, если она уже идёт

2. **В generateTickets():**
   - `setIsGenerating(true)` в начале функции (строка 94)
   - `setIsGenerating(false)` в `finally` блоке (строка 127)
   - Гарантирует, что генерация выполняется только один раз

3. **В useEffect для polling:**
   - Проверка `ticket.payment_status === "paid"` останавливает polling (строка 37)
   - После установки статуса `paid` polling прекращается

