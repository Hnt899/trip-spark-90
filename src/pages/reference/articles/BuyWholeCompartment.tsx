import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Baby, AlertCircle, Calendar } from "lucide-react";

const BuyWholeCompartment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Можно ли выкупить целое купе</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Можно ли выкупить целое купе</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed">
                Иногда бывают ситуации, когда нужно выкупить все места в купе на одного пассажира. Это особенно актуально, когда вы едете с крупной собакой. 
                Она должна быть в наморднике и с поводком. Дополнительная оплата за провоз животного не взимается.
              </p>
            </CardContent>
          </Card>

          {/* С детьми */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                Поездка с детьми
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Другой случай, когда вы едете один с двумя детьми и не желаете, чтобы четвёртое место в купе занимал кто-то посторонний. 
                  Для этого на странице <strong>«Выбор мест»</strong> укажите два взрослых билета и оба их оформите на себя. Просто продублируйте данные пассажиров. 
                  Оставшиеся два места заполните на своих детей.
                </p>
                <p>
                  При покупке четырёх мест в купе на одного пассажира ситуация аналогичная. Укажите 4 взрослых билета и везде введите свои паспортные данные.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900">
                    Если вы купили все места в купе на себя, то проводник не имеет права «подселять» к вам других пассажиров во время движения. 
                    Предоставить оплаченные вами места другим пассажирам работники железной дороги могут только с вашего согласия. При этом вы можете получить 
                    обратно стоимость проезда за оставшееся расстояние.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* С ребёнком до 5 лет */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Baby className="w-6 h-6 text-primary" />
                Поездка с ребёнком до 5 лет
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Если вы едете один с ребенком до 5 лет, которому полагается билет без места, то можно немного сэкономить. Купите три взрослых билета на себя 
                  и один детский билет с местом на ребенка. Это не нарушает правила.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900">
                    Если же в этой ситуации вы возьмете три взрослых билета на себя и один детский без места на ребенка, то четвёртое место в купе останется 
                    свободным и его придется докупать отдельным заказом.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Важное предупреждение */}
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-900">
                <AlertCircle className="w-6 h-6" />
                Важно
              </h2>
              <p className="text-base leading-relaxed text-red-900">
                Обратите внимание: при поездке с детьми дополнительные билеты необходимо оформить на себя, а не на детей. Не пытайтесь сэкономить, купив три места 
                на своего ребенка. Это нарушает правила перевозки пассажиров.
              </p>
            </CardContent>
          </Card>

          {/* Совет по покупке */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Когда лучше покупать
              </h2>
              
              <p className="text-base leading-relaxed">
                Если вы решили выкупить купе целиком, то лучше это сделать сразу после открытия продаж на нужный поезд (за 45 или 90 дней). Чем ближе дата отправления, 
                тем ниже вероятность, что в вагоне останутся полностью свободные купе.
              </p>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/reference/trains/no-tickets" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Что делать, если билетов нет
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA кнопка */}
          <div className="flex justify-center pt-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold">
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

export default BuyWholeCompartment;

