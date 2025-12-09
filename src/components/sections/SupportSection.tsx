import { Button } from "@/components/ui/button";
import { MessageCircle, CheckCircle2, Headphones, Mail, Phone, Zap, Shield, Bot, Loader2, Send, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

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

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000/api/support/chat"
    : "/api/support/chat";

const SupportSection = () => {
  const { toast } = useToast();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const phoneNumber = "+7 (800) 123-45-67";
  const emailAddress = "support@tudasuda.ru";

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

      const response = await fetch(API_URL, {
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
        throw new Error("API error");
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

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phoneNumber);
      setCopiedPhone(true);
      toast({
        title: "Номер скопирован",
        description: phoneNumber,
      });
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch (err) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать номер",
        variant: "destructive",
      });
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopiedEmail(true);
      toast({
        title: "Email скопирован",
        description: emailAddress,
      });
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать email",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="container relative z-10">
          {/* Заголовок */}
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              Нужна помощь с заказом?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Наш умный бот поможет вам быстро и эффективно
            </p>
          </div>

          {/* Основной контент */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Левая часть - Кнопки и информация */}
            <div className="space-y-6">
              {/* Главная CTA кнопка - Чат с ботом */}
              <Button
                size="lg"
                onClick={() => setIsChatOpen(true)}
                className="w-full h-20 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Bot className="w-7 h-7 mr-3" />
                Открыть чат с ботом
              </Button>

              {/* Статус бота */}
              <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-6 border border-primary/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-foreground">Умный бот-помощник</p>
                    <p className="text-sm text-muted-foreground">Работает круглосуточно</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <Zap className="w-5 h-5" />
                  <span className="font-semibold">Помогает с любыми вопросами</span>
                </div>
              </div>

              {/* Способы связи */}
              <div className="grid grid-cols-3 gap-4">
                <div
                  onClick={() => setIsChatOpen(true)}
                  className="h-20 bg-card rounded-xl p-4 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center justify-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-2 transition-colors">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <p className="font-semibold text-sm">Чат</p>
                  <p className="text-xs text-muted-foreground mt-1">Быстро</p>
                </div>
                <div
                  onClick={handleCopyPhone}
                  className="h-20 bg-card rounded-xl p-4 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center justify-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-2 transition-colors">
                    {copiedPhone ? (
                      <Check className="w-6 h-6 text-green-600" />
                    ) : (
                      <Phone className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <p className="font-semibold text-sm">Звонок</p>
                  <p className="text-xs text-muted-foreground mt-1">{copiedPhone ? "Скопировано!" : "Скопировать"}</p>
                </div>
                <div
                  onClick={handleCopyEmail}
                  className="h-20 bg-card rounded-xl p-4 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center justify-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-2 transition-colors">
                    {copiedEmail ? (
                      <Check className="w-6 h-6 text-green-600" />
                    ) : (
                      <Mail className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <p className="font-semibold text-sm">Email</p>
                  <p className="text-xs text-muted-foreground mt-1">{copiedEmail ? "Скопировано!" : "Скопировать"}</p>
                </div>
              </div>

              {/* Преимущества */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-foreground">Решаем вопросы по возвратам и изменениям</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">Помогаем со статусом билетов и бронированием</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <Headphones className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <span className="text-foreground">Консультируем по любым вопросам</span>
                </div>
              </div>
            </div>

            {/* Правая часть - Визуал с ботом */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 via-purple-500/10 to-primary/10 p-8 border border-primary/20">
                {/* Абстрактный tech-фон */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
                </div>
                
                {/* Иконки бота */}
                <div className="relative z-10 space-y-6">
                  {/* Центральная иконка бота */}
                  <div className="flex justify-center">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-2xl animate-pulse">
                      <Bot className="w-16 h-16 text-white" />
                    </div>
                  </div>

                  {/* Вокруг иконки - элементы */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                      <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-xs font-semibold text-foreground">Чат</p>
                    </div>
                    <div className="bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                      <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-foreground">24/7</p>
                    </div>
                    <div className="bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg">
                      <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-foreground">Надёжно</p>
                    </div>
                  </div>

                  {/* Текст */}
                  <div className="text-center space-y-2">
                    <p className="text-lg font-bold text-foreground">Умный бот-помощник</p>
                    <p className="text-sm text-muted-foreground">Помогает с любыми вопросами</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Диалог с ботом */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0">
          <DialogHeader className="px-6 py-4 border-b bg-gradient-to-r from-primary to-purple-600 text-white">
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="text-lg font-semibold">Бот-помощник TudaSuda</div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="h-2 w-2 rounded-full bg-green-300"></span>
                  online
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-white/90 to-white"
            style={{ scrollbarWidth: "thin" }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
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
            className="border-t border-border bg-white/80 px-4 py-3"
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
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
                disabled={!inputValue.trim() || isLoading}
                aria-label="Отправить сообщение"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SupportSection;
