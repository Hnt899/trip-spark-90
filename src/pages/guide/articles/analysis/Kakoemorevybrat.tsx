import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Waves, Sun, MapPin, AlertCircle, Info } from "lucide-react";

const Kakoemorevybrat = () => {
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
          <Link to="/guide" className="hover:text-primary">Разборы</Link>
          <span>/</span>
          <span>Какое море выбрать</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Какое море выбрать для отдыха?</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Выбор моря для отдыха зависит от множества факторов: ваших предпочтений, времени года, бюджета, состава компании и целей поездки. Каждое море имеет свои особенности — климат, температуру воды, пляжи, достопримечательности и инфраструктуру.
              </p>
              <p className="text-base leading-relaxed">
                Давайте разберём основные моря и их характеристики, чтобы вы могли выбрать идеальное место для вашего отпуска.
              </p>
            </CardContent>
          </Card>

          {/* Чёрное море */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Waves className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Чёрное море</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Основные курорты</p>
                    <p className="text-sm text-muted-foreground">
                      Сочи, Анапа, Геленджик, Ялта, Евпатория, Одесса
                    </p>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Преимущества:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Тёплая вода летом (до 26-28°C)</li>
                    <li>Близость к дому, удобное транспортное сообщение</li>
                    <li>Развитая инфраструктура и множество развлечений</li>
                    <li>Относительно недорогой отдых</li>
                    <li>Богатая история и достопримечательности</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Особенности:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Солёность воды ниже, чем в других морях</li>
                    <li>Может быть прохладнее в начале и конце сезона</li>
                    <li>Галька на многих пляжах</li>
                  </ul>
                </div>

                <p className="text-base leading-relaxed">
                  <strong>Лучшее время:</strong> Июль — август для купания, май — июнь и сентябрь — октябрь для экскурсий и мягкого климата.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Средиземное море */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Средиземное море</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Популярные направления</p>
                    <p className="text-sm text-muted-foreground">
                      Турция, Греция, Кипр, Испания, Италия, Хорватия, Франция
                    </p>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Преимущества:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Тёплая вода почти круглый год</li>
                    <li>Красивые песчаные и галечные пляжи</li>
                    <li>Богатая культура и история</li>
                    <li>Отличная кухня и сервис</li>
                    <li>Разнообразие курортов на любой вкус и бюджет</li>
                  </ul>
                </div>

                <p className="text-base leading-relaxed">
                  <strong>Лучшее время:</strong> Май — октябрь, с пиком сезона в июле — августе. В Турции и Греции можно купаться с мая по октябрь.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Красное море */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Waves className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Красное море</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Основные курорты</p>
                    <p className="text-sm text-muted-foreground">
                      Египет (Шарм-эль-Шейх, Хургада), Израиль (Эйлат), Иордания (Акаба)
                    </p>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Преимущества:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Идеально для дайвинга и снорклинга</li>
                    <li>Богатый подводный мир и коралловые рифы</li>
                    <li>Тёплая вода круглый год (не ниже 20°C)</li>
                    <li>Сухой климат, мало осадков</li>
                    <li>Недорогой отдых в Египте</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Особенность:</strong> Красное море — одно из самых солёных морей в мире, что делает плавание лёгким. Подводный мир считается одним из лучших в мире для дайвинга.
                  </p>
                </div>

                <p className="text-base leading-relaxed">
                  <strong>Лучшее время:</strong> Круглый год, но наиболее комфортно с октября по май (не слишком жарко).
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Адриатическое море */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Waves className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Адриатическое море</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Популярные курорты</p>
                    <p className="text-sm text-muted-foreground">
                      Хорватия, Черногория, Албания, Италия (Адриатическое побережье)
                    </p>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Преимущества:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Кристально чистая вода</li>
                    <li>Красивая природа и пейзажи</li>
                    <li>Отличная инфраструктура в Хорватии</li>
                    <li>Богатая история и архитектура</li>
                    <li>Хорошо для семейного отдыха</li>
                  </ul>
                </div>

                <p className="text-base leading-relaxed">
                  <strong>Лучшее время:</strong> Июнь — сентябрь. Вода прогревается позже, чем в Средиземном море.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Балтийское море */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Waves className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Балтийское море</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Популярные курорты</p>
                    <p className="text-sm text-muted-foreground">
                      Куршская коса (Россия), Калининград, Польша, Литва, Латвия, Эстония
                    </p>
                  </div>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Преимущества:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Чистый воздух и красивая природа</li>
                    <li>Песчаные пляжи</li>
                    <li>Близко для жителей Центральной России</li>
                    <li>Исторические достопримечательности</li>
                    <li>Лечебные свойства воздуха и воды</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Особенность:</strong> Вода прохладная даже летом (обычно 17-20°C). Подходит больше для прогулок и оздоровления, чем для активного купания.
                  </p>
                </div>

                <p className="text-base leading-relaxed">
                  <strong>Лучшее время:</strong> Июль — август для самых тёплых дней. Для прогулок и экскурсий подходит весь сезон с мая по сентябрь.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Как выбрать */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Как выбрать море: основные критерии</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="text-base font-semibold mb-1">Температура воды</p>
                      <p className="text-sm text-muted-foreground">
                        Если вы хотите активно купаться, выбирайте моря с тёплой водой. Для дайвинга подойдёт Красное море, для семейного отдыха — Чёрное или Средиземное.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="text-base font-semibold mb-1">Время года</p>
                      <p className="text-sm text-muted-foreground">
                        Летом все моря прогреваются хорошо, но если вы едете в межсезонье, лучше выбрать Средиземное или Красное море.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="text-base font-semibold mb-1">Бюджет</p>
                      <p className="text-sm text-muted-foreground">
                        Чёрное море и Египет — наиболее доступные варианты. Средиземноморские курорты Европы дороже.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                      4
                    </div>
                    <div>
                      <p className="text-base font-semibold mb-1">Цель поездки</p>
                      <p className="text-sm text-muted-foreground">
                        Пляжный отдых, экскурсии, дайвинг, оздоровление — у каждого моря свои сильные стороны.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                      5
                    </div>
                    <div>
                      <p className="text-base font-semibold mb-1">Состав компании</p>
                      <p className="text-sm text-muted-foreground">
                        С детьми лучше выбирать спокойные моря с плавным заходом в воду. Молодёжи может быть интереснее места с активной ночной жизнью.
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

export default Kakoemorevybrat;
