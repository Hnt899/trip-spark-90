import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: "Привет! Я помогу с маршрутом и заказом билетов. Напиши свой вопрос 🙂",
};

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const historyPayload = [...messages, userMessage]
        .slice(-10)
        .map((msg) => ({ role: msg.role, content: msg.content }));

      const response = await fetch("http://localhost:4000/api/support/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: historyPayload,
        }),
      });

      if (!response.ok) {
        throw new Error("HF API error");
      }

      const data = await response.json();
      const replyText =
        data?.reply ||
        "Извините, не удалось получить ответ. Попробуйте ещё раз.";

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: replyText,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          "Не удалось связаться с сервером. Проверьте подключение и попробуйте снова.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsChatOpen(false);
    setInputValue(""); // историю НЕ трогаем
  };

  return (
    <div className="pointer-events-none">
      {!isChatOpen && (
        <button
          type="button"
          aria-label="Открыть чат с помощником"
          onClick={() => setIsChatOpen(true)}
          className="pointer-events-auto fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-500 text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary animate-[chatPulse_5s_ease-in-out_infinite]"
        >
          <MessageCircle className="h-7 w-7" />
          <span className="sr-only">Открыть чат</span>
        </button>
      )}

      {isChatOpen && (
        <div
          className="pointer-events-auto fixed bottom-6 right-6 flex w-[380px] max-w-[92vw] flex-col rounded-3xl border border-border bg-white/90 backdrop-blur-md shadow-2xl transition-all duration-300 animate-[chatWidgetIn_0.32s_ease-out] md:w-[400px]"
          style={{ maxHeight: "80vh", minHeight: "440px" }}
        >
          <header className="flex items-center justify-between rounded-t-3xl px-5 py-4 border-b bg-gradient-to-r from-blue-600 to-primary text-white shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 backdrop-blur">
                <Bot className="h-6 w-6" />
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold uppercase tracking-wide text-white/80">
                  Помощник
                </span>
                <div className="flex items-center gap-2 text-base font-semibold">
                  tudasuda
                </div>
                <div className="flex items-center gap-1 text-xs text-white/80">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_4px_rgba(52,211,153,0.25)]" />
                  online
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Закрыть чат</span>
            </button>
          </header>

          <div
            className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4 bg-gradient-to-b from-white/90 to-white"
            style={{ scrollbarWidth: "thin" }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm transition-transform duration-200 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-white text-foreground border"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl border bg-white px-4 py-3 text-sm text-foreground shadow-sm">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span>Печатаю ответ...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            className="border-t border-border bg-white/80 px-4 py-3 backdrop-blur"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-white px-3 py-2 shadow-inner focus-within:ring-2 focus-within:ring-primary/30">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите сообщение..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
              />
              <button
                type="submit"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:opacity-50"
                disabled={!inputValue.trim() || isLoading}
                aria-label="Отправить сообщение"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
