import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, Bot, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Loader2, Send } from "lucide-react";

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
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Общая подложка секции - легкий градиент */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5"></div>
        
        {/* Chat bubble паттерн на фоне (декоративный) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl"></div>
          <div className="absolute top-40 left-20 w-24 h-24 rounded-full bg-purple-500/5 blur-2xl"></div>
          <div className="absolute bottom-20 right-1/4 w-40 h-40 rounded-full bg-primary/5 blur-3xl"></div>
          {/* Chat bubble формы */}
          <div className="absolute top-1/4 left-1/4 w-20 h-16 rounded-2xl rounded-tl-none bg-primary/3 rotate-12 blur-sm"></div>
          <div className="absolute bottom-1/3 right-1/3 w-16 h-12 rounded-2xl rounded-tr-none bg-purple-500/3 -rotate-12 blur-sm"></div>
        </div>

        <div className="container relative z-10">
          {/* Общая карточка на всю ширину */}
          <div className="rounded-3xl border border-border/50 bg-card/80 backdrop-blur-sm p-6 md:p-8 lg:p-12 shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Левая часть: Смысл + шаги */}
              <div className="space-y-8">
                {/* Заголовок */}
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-4 bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                    Умный бот-помощник 24/7
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground">
                    Решаем вопросы быстро и эффективно, работаем круглосуточно
                  </p>
                </div>

                {/* Какие вопросы решаем */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                    Помогаем с
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">Возвратами и изменениями билетов</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">Статусом бронирования и билетов</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">Любыми вопросами по путешествиям</span>
                    </div>
                  </div>
                </div>

                {/* Преимущества бота */}
                <div className="rounded-lg border border-border/50 bg-muted/30 p-5">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                    Почему выбирают нас
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                      <div className="text-xs text-muted-foreground">Работаем круглосуточно</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary mb-1">&lt;2 мин</div>
                      <div className="text-xs text-muted-foreground">Среднее время ответа</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary mb-1">95%</div>
                      <div className="text-xs text-muted-foreground">Вопросов решает бот</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary mb-1">100%</div>
                      <div className="text-xs text-muted-foreground">Безопасность данных</div>
                    </div>
                  </div>
                </div>

                {/* Описание бота */}
                <div className="space-y-3">
                  <p className="text-sm text-foreground leading-relaxed">
                    Наш умный бот-помощник использует технологии искусственного интеллекта для быстрого решения ваших вопросов. Он понимает контекст, помнит историю диалога и может помочь с выбором билетов, маршрутов и планированием путешествий.
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    Если бот не сможет решить вопрос самостоятельно, он мгновенно подключит живого оператора, который продолжит диалог без потери контекста. Все ваши данные защищены и обрабатываются в соответствии с требованиями безопасности.
                  </p>
                </div>
              </div>

              {/* Правая часть: Превью интерфейса (демонстрационное) */}
              <div className="relative">
                {/* Подпись "Превью" */}
                <div className="text-xs text-muted-foreground mb-3 text-center lg:text-left font-medium">
                  Пример диалога / Превью
                </div>
                
                {/* Макет чата - демо-экран (увеличенный) */}
                <div className="rounded-xl border-2 border-border bg-muted/30 p-6 md:p-8 shadow-md">
                  {/* Заголовок демо-экрана */}
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border/50">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Демо-чат</p>
                      <p className="text-xs text-muted-foreground">Пример интерфейса</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Сообщение бота */}
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-lg bg-card border border-border px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="w-5 h-5 text-primary" />
                          <span className="text-sm font-semibold text-foreground">Бот-помощник</span>
                        </div>
                        <p className="text-sm text-foreground">Привет! Я помогу с маршрутом и заказом билетов. Напиши свой вопрос 🙂</p>
                      </div>
                    </div>
                    
                    {/* Вопрос пользователя */}
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-lg bg-primary text-primary-foreground px-4 py-3 shadow-sm">
                        <p className="text-sm">Подскажи лучшие места для путешествий на юг России</p>
                      </div>
                    </div>
                    
                    {/* Ответ бота про юг России */}
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-lg bg-card border border-border px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="w-5 h-5 text-primary" />
                          <span className="text-sm font-semibold text-foreground">Бот-помощник</span>
                        </div>
                        <p className="text-sm text-foreground mb-2">Отличный выбор! На юге России много красивых мест: Сочи, Анапа, Геленджик, Крым. Какое направление вас интересует?</p>
                      </div>
                    </div>
                    
                    {/* Выбор пользователя */}
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-lg bg-primary text-primary-foreground px-4 py-3 shadow-sm">
                        <p className="text-sm">Сочи</p>
                      </div>
                    </div>
                    
                    {/* Ответ бота про Сочи и билеты */}
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-lg bg-card border border-border px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="w-5 h-5 text-primary" />
                          <span className="text-sm font-semibold text-foreground">Бот-помощник</span>
                        </div>
                        <p className="text-sm text-foreground mb-2">Сочи — прекрасный выбор! Там отличные пляжи, горы и развлечения. Рекомендую взять билеты на поезд — комфортно и выгодно, особенно ночные рейсы. Могу подобрать лучшие варианты прямо сейчас!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Разделительная линия */}
            <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

            {/* CTA-зона - акцентная панель */}
            <div className="rounded-2xl bg-gradient-to-r from-primary/5 via-purple-500/5 to-primary/5 border border-primary/10 p-6 md:p-8 shadow-sm">
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Выберите способ связи
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Мы поможем решить ваш вопрос быстро и эффективно
                  </p>
                </div>

                {/* Кнопки CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Главный CTA - Чат */}
                  <Button
                    size="lg"
                    onClick={() => setIsChatOpen(true)}
                    className="flex-1 rounded-full font-semibold shadow-md hover:shadow-lg transition-shadow"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Открыть чат с ботом
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  {/* Вторичные CTA */}
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleCopyPhone}
                    className="flex-1 rounded-full hover:bg-gradient-to-r hover:from-primary hover:to-purple-600 hover:text-white hover:border-transparent transition-all group"
                  >
                    <Phone className="w-5 h-5 mr-2 group-hover:text-white" />
                    <span className={cn(copiedPhone && "font-semibold", "group-hover:text-white")}>
                      {copiedPhone ? "Скопировано!" : "Позвонить"}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground group-hover:text-white/90">24/7</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleCopyEmail}
                    className="flex-1 rounded-full hover:bg-gradient-to-r hover:from-primary hover:to-purple-600 hover:text-white hover:border-transparent transition-all group"
                  >
                    <Mail className="w-5 h-5 mr-2 group-hover:text-white" />
                    <span className={cn(copiedEmail && "font-semibold", "group-hover:text-white")}>
                      {copiedEmail ? "Скопировано!" : "Написать"}
                    </span>
                    <span className="ml-2 text-xs text-muted-foreground group-hover:text-white/90">ответ в течение дня</span>
                  </Button>
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
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-white text-foreground border"
                  )}
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

