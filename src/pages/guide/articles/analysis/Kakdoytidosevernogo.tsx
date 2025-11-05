import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation, Snowflake, Plane, MapPin, AlertCircle, Info, Users } from "lucide-react";

const Kakdoytidosevernogo = () => {
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
          <span>Как дойти до Северного полюса</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как дойти до Северного полюса от дрейфующей базы «Барнео»</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Северный полюс — одна из самых труднодоступных точек на Земле. Это не конкретное место на суше, а точка в Северном Ледовитом океане, покрытая дрейфующими льдами. Добраться до него можно несколькими способами, один из которых — от дрейфующей ледовой базы «Барнео».
              </p>
              <p className="text-base leading-relaxed">
                Дрейфующая база «Барнео» (также известная как «Barneo») — это уникальная временная станция, которая создаётся каждый год на льду в районе Северного полюса для научных исследований и туристических экспедиций.
              </p>
            </CardContent>
          </Card>

          {/* Что такое Барнео */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что такое база «Барнео»</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  «Барнео» — это временная российская ледовая база, которая создаётся ежегодно в апреле на дрейфующих льдах Северного Ледовитого океана, примерно в 100 километрах от Северного полюса.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Особенности базы:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Создаётся на дрейфующих льдах каждый год заново</li>
                    <li>Работает около месяца (обычно апрель)</li>
                    <li>Имеет взлётно-посадочную полосу для самолётов</li>
                    <li>Используется для научных исследований и туризма</li>
                    <li>Расположена примерно в 89° северной широты</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> База дрейфует вместе со льдом, поэтому её точное местоположение постоянно меняется. Координаты отслеживаются и передаются пилотам и экспедициям.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как добраться до Барнео */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как добраться до базы «Барнео»</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Добраться до базы «Барнео» можно только самолётом. Обычно маршрут выглядит так:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="text-base font-semibold mb-1">Перелёт в Лонгйир (Шпицберген) или Мурманск</p>
                      <p className="text-sm text-muted-foreground">
                        Из России или Норвегии вылетаете в один из этих городов, которые служат отправными точками
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="text-base font-semibold mb-1">Чартерный рейс до «Барнео»</p>
                      <p className="text-sm text-muted-foreground">
                        Специальный чартерный самолёт (обычно Ан-74 или Ил-76) доставляет вас на ледовую базу
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="text-base font-semibold mb-1">Посадка на льду</p>
                      <p className="text-sm text-muted-foreground">
                        Самолёт садится прямо на подготовленную взлётно-посадочную полосу, вырубленную во льду
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Условия:</strong> Погода должна быть благоприятной. Из-за сложных метеоусловий рейсы могут задерживаться или отменяться. Поездка требует гибкости в планировании.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Путь до полюса */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Navigation className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">От «Барнео» до Северного полюса</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  От базы «Барнео» до Северного полюса примерно 100 километров. Добраться можно несколькими способами:
                </p>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">1. Вертолётом (самый быстрый способ)</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Вертолёт доставляет туристов прямо на Северный полюс. Это самый комфортный и быстрый вариант, занимающий около часа полёта.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed">
                      Обычно это часть организованных туристических программ. Вы приземляетесь на полюсе, проводите там некоторое время, делаете фотографии и возвращаетесь.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">2. Пешком на лыжах</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Это самый сложный и экстремальный способ. Путешествие на лыжах от «Барнео» до Северного полюса занимает около 7-10 дней.
                  </p>
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Требования к участникам:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-6">
                      <li>Отличная физическая подготовка</li>
                      <li>Опыт выживания в экстремальных условиях</li>
                      <li>Знание техники передвижения на лыжах</li>
                      <li>Умение работать в команде</li>
                      <li>Готовность к холоду (температура может опускаться до -40°C)</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">3. На собачьих упряжках</h3>
                  <p className="text-base leading-relaxed">
                    Традиционный способ передвижения в Арктике. Это уникальный опыт, но требует много времени и специальной подготовки.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Что взять с собой */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что взять с собой</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Одежда</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4 mb-4">
                    <li>Термобельё из синтетических материалов (не хлопок!)</li>
                    <li>Флисовые и пуховые слои утепления</li>
                    <li>Ветро- и влагозащитный верхний слой</li>
                    <li>Тёплые рукавицы и перчатки</li>
                    <li>Тёплая шапка, балаклава или маска для лица</li>
                    <li>Тёплая обувь с хорошей изоляцией</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Снаряжение</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4 mb-4">
                    <li>Солнцезащитные очки (снег отражает до 90% УФ-излучения!)</li>
                    <li>Крем от солнца с высоким SPF</li>
                    <li>Личные вещи и аптечка</li>
                    <li>Камера (в холоде батареи разряжаются быстро, берите запасные)</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Совет:</strong> Большинство туроператоров предоставляют подробный список необходимого снаряжения. Следуйте их рекомендациям — они основаны на многолетнем опыте работы в Арктике.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Опасности и риски */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Опасности и риски</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Основные опасности:</p>
                  <ul className="list-disc list-inside space-y-2 text-sm ml-4">
                    <li><strong>Экстремальный холод</strong> — температура может опускаться до -40°C и ниже</li>
                    <li><strong>Трещины во льду</strong> — лёд дрейфует и может трескаться</li>
                    <li><strong>Плохая видимость</strong> — белая мгла и метели могут затруднить навигацию</li>
                    <li><strong>Опасность обморожения</strong> — открытые участки кожи могут обморозиться за минуты</li>
                    <li><strong>Ограниченная связь</strong> — спутниковая связь работает не всегда</li>
                    <li><strong>Задержки рейсов</strong> — погода может отменить или задержать вылет</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Все экспедиции должны иметь опытных гидов, медицинскую поддержку и спутниковую связь для экстренных случаев. Никогда не отправляйтесь в такое путешествие самостоятельно без соответствующей подготовки.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Организация поездки */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как организовать поездку</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Поездка на Северный полюс — это сложная и дорогостоящая экспедиция, которую лучше всего организовывать через специализированные туроператоры:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Выбор туроператора</p>
                      <p className="text-sm text-muted-foreground">
                        Выберите оператора с опытом работы в Арктике и хорошей репутацией. Проверьте отзывы и сертификаты.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Подготовка</p>
                      <p className="text-sm text-muted-foreground">
                        Пройдите медицинское обследование и подготовьтесь физически. Некоторые операторы проводят предварительную подготовку.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Страхование</p>
                      <p className="text-sm text-muted-foreground">
                        Обязательно оформите специальную страховку, покрывающую экстремальные виды туризма и медицинскую эвакуацию.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Стоимость:</strong> Поездка на Северный полюс стоит десятки тысяч долларов. Это включает перелёты, размещение на базе, питание, снаряжение и сопровождение гидов.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Что вас ждёт */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Что вас ждёт на Северном полюсе</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Достижение Северного полюса — это незабываемый опыт:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4 mb-4">
                  <li>Стояние на самой северной точке планеты</li>
                  <li>Уникальные фотографии и видеосъёмка</li>
                  <li>Возможность совершить кругосветное путешествие всего за несколько шагов</li>
                  <li>Невероятные пейзажи бескрайних льдов и ледяных полей</li>
                  <li>Ощущение достижения одной из самых труднодоступных точек Земли</li>
                  <li>Сертификат о достижении Северного полюса</li>
                </ul>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Помните:</strong> Северный полюс — это не просто географическая точка. Это место, где сходятся все меридианы, где день и ночь длятся по полгода, где вы можете одновременно быть во всех часовых поясах. Это опыт, который останется с вами на всю жизнь.
                  </p>
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

export default Kakdoytidosevernogo;
