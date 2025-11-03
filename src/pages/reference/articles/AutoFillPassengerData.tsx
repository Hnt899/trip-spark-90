import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, LogIn, Search, CheckCircle, Zap } from "lucide-react";

const AutoFillPassengerData = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Автоматический ввод данных пассажиров</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Упрощенный ввод данных пассажиров</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed mb-4">
                Мы спросили наших клиентов, что можно изменить в процессе покупки билета. Одним из самых популярных ответов стал 
                <strong> «вводить меньше данных при оформлении билета, чтобы, например, не искать каждый раз паспорт»</strong>.
              </p>
              <p className="text-lg leading-relaxed">
                Мы выполнили это пожелание: теперь купить ж/д билет на GoTrip можно еще быстрее! Если вы уже покупали билеты на нашем сайте, 
                то на заполнение личных данных Вы потратите всего <strong>пару секунд и один клик</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Как пользоваться */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                Как пользоваться автовводом
              </h2>
              
              <div className="space-y-6">
                {/* Шаг 1 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <LogIn className="w-5 h-5 text-primary" />
                      Авторизуйтесь на сайте
                    </h3>
                    <p className="text-base leading-relaxed">
                      Если вы покупали билет на GoTrip, у вас автоматически появился личный кабинет. Введите свою электронную почту и пароль 
                      в соответствующие графы, после чего нажмите кнопку <strong>«Войти»</strong>.
                    </p>
                  </div>
                </div>

                {/* Шаг 2 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Search className="w-5 h-5 text-primary" />
                      Начните покупку ж/д билета
                    </h3>
                    <p className="text-base leading-relaxed">
                      Выберите, откуда и куда вы хотите ехать, на каком поезде и на каком месте.
                    </p>
                  </div>
                </div>

                {/* Шаг 3 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Введите фамилию пассажира
                    </h3>
                    <p className="text-base leading-relaxed">
                      На странице ввода данных начните вводить фамилию пассажира, которому ранее покупали билет на GoTrip.
                    </p>
                  </div>
                </div>

                {/* Шаг 4 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      Выберите из списка
                    </h3>
                    <p className="text-base leading-relaxed mb-3">
                      Система предложит вам выбрать пассажира из списка. При нажатии поля автоматически заполнятся: в них появятся 
                      <strong> номер и серия паспорта, место рождения</strong> и другие данные.
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-900 text-sm">
                        <strong>Удобно:</strong> Все данные заполнятся автоматически, вам не нужно искать паспорт или вводить информацию вручную.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Преимущества */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Преимущества автоввода</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Экономия времени — заполнение данных занимает несколько секунд</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Не нужно искать паспорт каждый раз</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Меньше вероятность ошибок в данных</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Удобно для частых покупок билетов</span>
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

export default AutoFillPassengerData;

