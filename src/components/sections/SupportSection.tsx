import { Button } from "@/components/ui/button";
import { MessageCircle, CheckCircle2 } from "lucide-react";

const SupportSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="bg-card rounded-2xl p-8 md:p-12 border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Нужна помощь с заказом?
              </h2>
              <p className="text-muted-foreground text-lg">
                Онлайн-поддержка 24/7. Ответим за минуты и поможем со статусом билетов,
                возвратами и любыми вопросами.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Открыть чат
                </Button>
                <Button size="lg" variant="outline">
                  Проверить статус
                </Button>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-muted-foreground">Средний ответ — 2 минуты</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-muted-foreground">Чат, звонок и e-mail</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-muted-foreground">Решаем вопросы по возвратам</span>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 aspect-square flex items-center justify-center">
                <div className="w-full space-y-4">
                  <div className="bg-card p-4 rounded-xl border shadow-sm">
                    <p className="font-semibold mb-2">Поддержка 24/7</p>
                    <p className="text-sm text-muted-foreground">Здравствуйте!</p>
                  </div>
                  <div className="bg-card p-4 rounded-xl border shadow-sm">
                    <p className="text-sm text-muted-foreground">Задайте вопрос</p>
                  </div>
                  <div className="bg-card p-4 rounded-xl border shadow-sm">
                    <p className="text-sm text-muted-foreground">Проблемы с заказом?</p>
                  </div>
                  <div className="bg-card p-4 rounded-xl border shadow-sm">
                    <p className="text-sm text-muted-foreground">Нужна помощь сейчас</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;