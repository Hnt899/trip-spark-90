import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
}

const ChatWidget = () => {
  const initialMessages = useMemo<ChatMessage[]>(
    () => [
      {
        id: "welcome",
        sender: "bot",
        text: "Привет! Я помогу с маршрутом и заказом билетов. Напиши свой вопрос 🙂",
      },
    ],
    []
  );

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const replyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => () => {
    if (replyTimeoutRef.current) {
      clearTimeout(replyTimeoutRef.current);
    }
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    replyTimeoutRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "Я — демо-бот, реальная логика ответа ещё не подключена.",
        },
      ]);
    }, 1200);
  };

  const handleClose = () => {
    setIsChatOpen(false);
    setMessages(initialMessages);
    setInputValue("");
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
        <div className="pointer-events-auto fixed bottom-6 right-6 flex w-[380px] max-w-[92vw] flex-col rounded-3xl border border-border bg-white/90 backdrop-blur-md shadow-2xl transition-all duration-300 animate-[chatWidgetIn_0.32s_ease-out] md:w-[400px]" style={{ maxHeight: "80vh", minHeight: "440px" }}>
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
                  <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_4px_rgba(52,211,153,0.25)]"></span>
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

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4 bg-gradient-to-b from-white/90 to-white" style={{ scrollbarWidth: "thin" }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm transition-transform duration-200 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-white text-foreground border"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
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
                disabled={!inputValue.trim()}
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
