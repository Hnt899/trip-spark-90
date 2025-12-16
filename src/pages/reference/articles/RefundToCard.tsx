import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, CreditCard, Clock } from "lucide-react";

const RefundToCard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Почему деньги возвращаются на карту, которой оплачен заказ</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Почему деньги возвращаются на карту, с которой производилась оплата</h1>

        <div className="space-y-8">
          {/* Основная информация */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <Shield className="w-12 h-12 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-lg leading-relaxed mb-4">
                    Мы заботимся о сохранности ваших денег. Возврат автоматически происходит на ту карту, которой вы воспользовались при покупке билета, 
                    потому что иначе мы не сможем быть уверены в том, что они окажутся у вас.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-900 flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>
                        Срок возврата — до <strong>30 календарных дней</strong> с момента оформления заявки на возврат железнодорожных билетов.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/reference/trains/how-to-return-ticket" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Узнайте больше о правилах возврата ж/д билетов
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA кнопка */}
          <div className="flex justify-center pt-4">
            <Button asChild size="lg" className="px-8 py-6 text-lg font-semibold">
              <Link to="/routes/list">
                Перейти к покупке ж/д билетов
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundToCard;

