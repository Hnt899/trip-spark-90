import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, AlertCircle, CheckCircle, XCircle, FileText, Globe } from "lucide-react";

const Nadolipokupatobratnyy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/guide" className="hover:text-primary">Путеводитель</Link>
          <span>/</span>
          <Link to="/guide" className="hover:text-primary">Полезно пассажиру</Link>
          <span>/</span>
          <span>Надо ли покупать обратный билет?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Надо ли покупать обратный билет?</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Надо ли в принципе его покупать и законно ли требовать его у пассажира? Давайте разбираться.
                </p>
                <p className="text-base leading-relaxed">
                  Поговорим сразу про два случая: когда обратный билет у вас требует авиакомпания и когда обратный билет требуют при прохождении границы.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Требования страны */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Требования страны</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Некоторые страны и правда не «просят», а прямо обязывают вас иметь обратный билет.
                </p>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Почему авиакомпании требуют обратный билет:
                  </p>
                  <p className="text-sm leading-relaxed">
                    Авиакомпании про это, разумеется, знают. Тут история такая: если в страну вас не впустили, авиакомпания обязана за свой счёт перевезти вас обратно туда, откуда вы прилетели. Ну или вывезти в третью страну, чтобы не оставлять в транзитной зоне.
                  </p>
                </div>
                <p className="text-base leading-relaxed">
                  Некоторые страны, например, Южная Корея, ещё и выписывают штраф авиакомпании за каждого такого пассажира и плюсуют туда оплату за нахождение в аэропорту до обратного рейса.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>В этой ситуации спорить действительно бессмысленно.</strong> Если страна требует обратный билет, а авиакомпания отказывает вам в посадке из-за его отсутствия, лучше купить обратный билет.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Решение пограничной службы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Решение пограничной службы</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Теперь о странах, где решение «пустить-не пустить» принимает пограничная служба.
                </p>
                <p className="text-base leading-relaxed">
                  Их задача — проверить, что вы не собираетесь остаться в стране нелегально. Для этого они могут попросить:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Обратный билет</li>
                  <li>Бронь гостиницы</li>
                  <li>Доказательство наличия средств на поездку</li>
                  <li>Другие документы, подтверждающие ваши намерения</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Наличие обратного билета повышает вероятность успешного въезда, но не гарантирует его. Пограничная служба может отказать во въезде и при наличии обратного билета, если у неё есть другие основания для отказа.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как узнать требования */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как узнать требования конкретной страны</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Чтобы узнать требования конкретной страны, воспользуйтесь базой данных Timatic, доступной на сайтах авиакомпаний.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Совет:</strong> Проверьте требования страны перед покупкой билета. Это поможет избежать проблем при посадке на рейс или прохождении границы.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Если отказали в посадке */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold">Если авиакомпания отказала в посадке</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Если авиакомпания отказала в посадке из-за отсутствия обратного билета, запросите письменное объяснение.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Отсутствие заветной бумажки, конечно, играют не в вашу пользу. Лучше направить энергию на получение заветной бумажки. В противном случае у вас не будет оснований для жалобы и всё это будет выглядеть так, будто вы не пришли или опоздали на рейс — тут о возврате денег речи уже нет.
                  </p>
                </div>
                <p className="text-base leading-relaxed">
                  С бумажкой можно попытаться добиться компенсации в законном порядке.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Резюме */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Резюме</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Если страна требует обратный билет</p>
                      <p className="text-sm text-muted-foreground">
                        Лучше купить обратный билет, чтобы избежать проблем при посадке на рейс.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Если решение принимает пограничная служба</p>
                      <p className="text-sm text-muted-foreground">
                        Обратный билет повышает вероятность успешного въезда, но не гарантирует его.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Проверьте требования заранее</p>
                      <p className="text-sm text-muted-foreground">
                        Используйте базу данных Timatic на сайтах авиакомпаний, чтобы узнать требования конкретной страны.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Если отказали в посадке</p>
                      <p className="text-sm text-muted-foreground">
                        Запросите письменное объяснение, чтобы иметь возможность обратиться за компенсацией.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Nadolipokupatobratnyy;
