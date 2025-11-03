import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LogIn, FileText, RefreshCw, Save, ShoppingBag, MessageCircle, Gift, Wallet, Trash2 } from "lucide-react";

const ProfilePurpose = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Всё о профиле GoTrip</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Всё о профиле GoTrip</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed">
                Покупать на GoTrip можно и без регистрации, но с профилем удобно управлять заказами, общаться с контакт-центром 
                и пользоваться другими опциями. Рассказываем, как создать профиль GoTrip и что в нём можно сделать.
              </p>
            </CardContent>
          </Card>

          {/* Содержание */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Содержание статьи:</h2>
              <ul className="space-y-2">
                <li>
                  <Link to="#login" className="text-primary hover:underline flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Как войти в профиль GoTrip
                  </Link>
                </li>
                <li>
                  <Link to="#orders" className="text-primary hover:underline flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Как посмотреть заказы и скачать документы
                  </Link>
                </li>
                <li>
                  <Link to="#return" className="text-primary hover:underline flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Как оформить возврат или обмен
                  </Link>
                </li>
                <li>
                  <Link to="#passengers" className="text-primary hover:underline flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    Как сохранить данные пассажиров
                  </Link>
                </li>
                <li>
                  <Link to="#services" className="text-primary hover:underline flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Как заказать дополнительные услуги
                  </Link>
                </li>
                <li>
                  <Link to="#contact" className="text-primary hover:underline flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Как связаться с контакт-центром или оставить отзыв
                  </Link>
                </li>
                <li>
                  <Link to="#loyalty" className="text-primary hover:underline flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    Как управлять программой лояльности
                  </Link>
                </li>
                <li>
                  <Link to="#wallet" className="text-primary hover:underline flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    Как проверить баланс и лимиты GoTrip Кошелька
                  </Link>
                </li>
                <li>
                  <Link to="#delete" className="text-primary hover:underline flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Как удалить профиль
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Как войти в профиль */}
          <Card id="login">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <LogIn className="w-6 h-6 text-primary" />
                Как войти в профиль GoTrip
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  При первой покупке профиль создаётся автоматически, даже если вы оформили заказ без регистрации. 
                  <strong> Логин — электронная почта</strong>, указанная при заказе. Чтобы восстановить доступ в профиль, нажмите 
                  <strong> «Не помню пароль»</strong> или <strong>«Быстрый вход без пароля»</strong>. На электронную почту или телефон, 
                  использованные при оформлении заказа, придёт одноразовый код. Потом вы сможете придумать свой пароль.
                </p>
                <p>
                  Если вы ещё ничего не покупали, в правом верхнем углу сайта нажмите <strong>«Зарегистрироваться»</strong>. 
                  Используйте для регистрации электронную почту или аккаунт в соцсетях. Чтобы попасть в профиль, нажмите там же <strong>«Войти»</strong>. 
                  В приложении регистрация и вход доступны в разделе <strong>«Профиль»</strong>.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Как посмотреть заказы */}
          <Card id="orders">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Как посмотреть заказы и скачать документы
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  В профиле всегда можно посмотреть список всех оформленных заказов. Это удобно, если письмо с билетами затерялось в почте. 
                  Нажмите <strong>«Мои заказы»</strong> в правом верхнем углу сайта. В приложении ищите раздел <strong>«Заказы»</strong> на панели внизу экрана.
                </p>
                <p>
                  В списке вы увидите как прошлые поездки, так и ожидающие оплату билеты. Ненужные заказы легко удалить из общего списка, 
                  нажав на крестик в правом верхнем углу карточки заказа.
                </p>
                <p>
                  Чтобы посмотреть подробную информацию о заказе, нажмите <strong>«Детали заказа»</strong>.
                </p>
                
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <p className="font-semibold mb-2">На странице заказа вы можете:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>уточнить номер заказа;</li>
                    <li>посмотреть детали поездки: время и место отправления и прибытия, список остановок, номер своего места и т.д.;</li>
                    <li>скачать билет или ваучер и сохранить на устройство или распечатать;</li>
                    <li>скачать отчётные документы для бухгалтерии.</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как оформить возврат */}
          <Card id="return">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-primary" />
                Как оформить возврат или обмен
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Если по правилам тарифа заказ можно вернуть или обменять, на детальной странице заказа вы увидите соответствующее кнопки. 
                  Если билет или бронь отеля невозвратные или срок возврата и обмена прошёл, кнопок не будет.
                </p>
                <p>
                  При возврате обычно удерживаются сборы перевозчика и сервиса. Сумму, которая вернётся, вы увидите перед подтверждением операции — 
                  это актуально для автобусных, ж/д билетов и броней отелей. Если вы отправили заявку на возврат или обмен авиабилета, операторы 
                  рассчитают размер сборов с учётом правил авиакомпании и пришлют письмо с расчётом. Возврат и обмен оформляются только после вашего согласия.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-semibold mb-2 text-blue-900">Подробнее про возврат и обмен:</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-900 ml-4">
                    <li>
                      <Link to="/reference/trains/how-to-return-ticket" className="text-blue-700 hover:underline">
                        Как вернуть ж/д билет
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как сохранить данные пассажиров */}
          <Card id="passengers">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Save className="w-6 h-6 text-primary" />
                Как сохранить данные пассажиров
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  При первой покупке на GoTrip паспортные данные пассажиров сохраняются автоматически, чтобы их не нужно было указывать при оформлении 
                  следующих заказов. Чтобы посмотреть информацию о пассажирах, в профиле на сайте нажмите вкладку <strong>«Пассажиры»</strong>. 
                  В приложении данные хранятся в разделе <strong>«Профиль»</strong>. При желании вы можете удалить ненужных пассажиров из списка.
                </p>
                <Link 
                  to="/reference/trains/auto-fill-passenger-data" 
                  className="text-primary hover:underline font-medium"
                >
                  Подробнее об автоматическом вводе данных пассажиров
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Дополнительные услуги */}
          <Card id="services">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-primary" />
                Как заказать дополнительные услуги
              </h2>
              
              <p className="text-base leading-relaxed">
                В разделе <strong>«Пригодится в поездке»</strong> вы найдёте ссылки на дополнительные услуги, например трансфер или страховки в поездку. 
                Этот раздел есть только на сайте.
              </p>
            </CardContent>
          </Card>

          {/* Контакт-центр */}
          <Card id="contact">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-primary" />
                Как связаться с контакт-центром или оставить отзыв
              </h2>
              
              <p className="text-base leading-relaxed">
                В профиле есть кнопка <strong>«Связаться с нами»</strong>, которая ведёт на форму обратной связи. Здесь вы можете задать любые вопросы о поездках. 
                Операторы ответят на указанную почту в течение нескольких дней. Для оперативной связи лучше писать в ВКонтакте или в чате мобильного приложения.
              </p>
            </CardContent>
          </Card>

          {/* Программа лояльности */}
          <Card id="loyalty">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Gift className="w-6 h-6 text-primary" />
                Как узнать статус программы лояльности
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Чтобы посмотреть статус в программе и количество баллов, перейдите в раздел <strong>«Бонусы и скидки»</strong> — он находится в меню слева 
                  на странице профиля. По центру страницы будут баннеры с количеством баллов, списком доступных привилегий и обменом баллов на сертификаты.
                </p>
                <p>
                  Вступить в программу лояльности больше нельзя, но она всё ещё работает для активных участников. Вместо программы лояльности можно открыть 
                  GoTrip Кошелёк, чтобы получать кешбэк 3% баллами за заказы. Эти баллы получится использовать для оплаты следующих покупок.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Кошелёк */}
          <Card id="wallet">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Wallet className="w-6 h-6 text-primary" />
                Как проверить баланс и лимиты GoTrip Кошелька
              </h2>
              
              <p className="text-base leading-relaxed">
                Если вы уже открыли GoTrip Кошелёк, в профиле появится одноимённый раздел — <strong>«Кошелёк»</strong>. Здесь можно пополнить баланс Кошелька, 
                узнать количество накопленных баллов кешбэка и проверить лимиты. Ещё есть блок с ответами на частые вопросы. Они подскажут, как пополнить 
                Кошелёк и заработать кешбэк.
              </p>
            </CardContent>
          </Card>

          {/* Удаление профиля */}
          <Card id="delete">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Trash2 className="w-6 h-6 text-primary" />
                Как удалить профиль
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Удалить профиль GoTrip можно в любой момент. Однако в этом случае вы потеряете доступ к истории заказов и баллам, которые накопили по программе лояльности.
                </p>
                <p>
                  Чтобы удалить профиль, на странице с личными данными нажмите <strong>«Удалить аккаунт»</strong>.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900">
                    Если вы пользовались GoTrip Кошельком, закройте его перед удалением аккаунта. Чтобы это сделать, сначала потратьте остаток денег и напишите контакт-центр.
                  </p>
                </div>
                <p>
                  Восстановить аккаунт можно в течение <strong>30 дней</strong>. Для этого войдите в профиль и нажмите кнопку <strong>«Восстановить аккаунт»</strong>.
                </p>
              </div>
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

export default ProfilePurpose;

