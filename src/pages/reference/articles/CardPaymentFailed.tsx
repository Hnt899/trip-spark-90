import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle, CreditCard, Shield, RefreshCw, Info } from "lucide-react";

const CardPaymentFailed = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Что делать, если оплата пластиковой картой не проходит</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что делать, если оплата пластиковой картой не проходит</h1>

        <div className="space-y-8">
          {/* Проверить правильность ввода пароля */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-primary" />
                Проверить правильность ввода одноразового пароля
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Иногда при платеже банк просит дополнительно подтвердить операцию. Это делается для дополнительной защиты вашего счета от мошенников. 
                  Такая технология называется <strong>3D Secure</strong>. Банк присылает вам СМС с кодом, введя который, вы подтверждаете платеж. 
                  Возможно, вы перепутали символы. Повторите ввод данных карты для получения нового кода и оплатите заказ.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900">
                    Одноразовый пароль (код) присылает вам банк. Если у вас возникли вопросы, связанные с получением или вводом кода, 
                    пожалуйста, позвоните представителю своего банка.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Попробовать оплатить еще раз */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-primary" />
                Попробовать оплатить заказ ещё раз
              </h2>
              <p className="text-base leading-relaxed">
                Внимательно сравните данные на карте с теми, что вы вписали в поля на сайте. Ошибка могла вкрасться в номер карты или её срок действия.
              </p>
            </CardContent>
          </Card>

          {/* Убедиться, что на карточке есть деньги */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-primary" />
                Убедиться, что на карточке есть деньги
              </h2>
              <p className="text-base leading-relaxed">
                Проверьте баланс через интернет-банкинг или мобильный банк. Или проконсультируйтесь с представителями своего банка.
              </p>
            </CardContent>
          </Card>

          {/* Выяснить, можно ли расплачиваться в интернете */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                Выяснить, можно ли расплачиваться этой картой в интернете
              </h2>
              <p className="text-base leading-relaxed">
                Некоторые карты не предназначены или не активированы для оплаты товаров и услуг через интернет. Задайте этот вопрос сотрудникам 
                вашего банка по телефону и активируйте услугу.
              </p>
            </CardContent>
          </Card>

          {/* Проверить ограничения */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-primary" />
                Проверить, не наложены ли на ваш счёт какие-либо ограничения
              </h2>
              <p className="text-base leading-relaxed">
                Часто банки накладывают ограничения на действия с пластиковыми картами. Например, это лимит, сколько вы можете потратить в день или в месяц. 
                Пролистайте договор о выпуске вашей пластиковой карты или позвоните с вопросом в свой банк.
              </p>
            </CardContent>
          </Card>

          {/* Попробовать другую карту */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-primary" />
                Попробовать оплатить другой карточкой
              </h2>
              <p className="text-base leading-relaxed">
                Иногда возникают ошибки на стороне банка или платежного шлюза, через который проводится платеж. Возможно, с другой картой повезет больше.
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
                    to="/reference/trains/how-to-pay" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Как оплатить ж/д билет
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

export default CardPaymentFailed;

