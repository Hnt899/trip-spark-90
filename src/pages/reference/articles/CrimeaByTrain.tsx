import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Train, Bus, ArrowRight, AlertCircle, Map } from "lucide-react";

const CrimeaByTrain = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Как добраться в Крым на поезде</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Как добраться в Крым в 2024 году: 4 способа</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                Крымский полуостров соединён с остальной территорией России Крымским мостом, который состоит из автомобильного и железнодорожного мостов. 
                Есть четыре способа добраться на полуостров общественным транспортом.
              </p>
            </CardContent>
          </Card>

          {/* Способ 1: Прямой поезд */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                1. Прямой поезд
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  В Крым можно добраться без пересадок на поездах <strong>«Таврия»</strong> частного перевозчика «Гранд Сервис Экспресс».
                </p>
                <p>
                  В составе «Таврии» ходят плацкартные вагоны, купе, СВ и купе для маломобильных пассажиров. Поезда бывают одноэтажные и двухэтажные. 
                  В вагонах есть кондиционеры, биотуалеты и розетки. В зависимости от класса обслуживания в стоимость проезда входит питание. 
                  В поездах работают вагоны-рестораны, где можно заказать горячую еду, закуски и напитки.
                </p>
                <p>
                  «Таврии» отправляются из крупных городов России: Москвы, Санкт-Петербурга, Перми, Омска, Мурманска, Екатеринбурга, Смоленска, 
                  Воронежа, Ростова-на-Дону и т.д. Конечные станции в Крыму — Симферополь, Севастополь, Евпатория, Феодосия. 
                  Поезда останавливаются в Джанкое, Владиславовке, Бахчисарае и других населённых пунктах.
                </p>
                <Button asChild variant="outline" className="mt-4">
                  <Link to="/routes/list">
                    Купить билеты на «Таврии»
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-blue-900">
                    Билеты на прямые поезда в Крым пользуются популярностью. Если билеты раскуплены или продажи ещё не открылись, 
                    подпишитесь на бесплатное уведомление от GoTrip. Мы пришлём напоминание, когда откроются продажи или кто-то сдаст билет. 
                    Или оформите предзаказ билетов.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Способ 2: Единый билет */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Bus className="w-6 h-6 text-primary" />
                2. Единый билет: поезд + автобус
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900">
                    <AlertCircle className="w-5 h-5 inline mr-2" />
                    В 2024 году продажи единых билетов в Крым приостановили.
                  </p>
                </div>
                <p>
                  Мультимодальный маршрут включает проезд на поезде до Анапы, а оттуда на автобусе в Симферополь. 
                  Отправление автобусов состыковано с расписанием поездов дальнего следования. Перевозку организует «Единая транспортная дирекция», 
                  перевозчик — ООО «БэстВектор».
                </p>
                <p>
                  Единые билеты в Крым продаёт РЖД. Продажа билетов заканчивается за 24 часа до отправления рейса. 
                  Ребёнку до 5 лет оформляется безденежный (бесплатный) билет с отдельным местом. Возраст ребёнка определяется на день начала поездки.
                </p>
                <p className="text-sm text-muted-foreground">
                  Горячая линия «Единой транспортной дирекции» по билетам: +7 (800) 600-1-006
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Способ 3: С пересадкой */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Map className="w-6 h-6 text-primary" />
                3. Поездка с самостоятельной пересадкой: поезд + автобус
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Добраться в Крым можно с пересадкой, купив два отдельных билета: сначала на поезд до Краснодара или Анапы, а оттуда на автобус до курортов Крыма.
                </p>
                <div className="flex gap-4">
                  <Button asChild variant="outline">
                    <Link to="/routes/list">
                      Купить ж/д билеты
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/routes/list">
                      Купить билеты на автобус
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Способ 4: Прямой автобус */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Bus className="w-6 h-6 text-primary" />
                4. Прямой автобус
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  В Крым из разных городов России ходят автобусы. Расписание и билеты есть на GoTrip, например:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Москва — Симферополь</li>
                  <li>Воронеж — Симферополь</li>
                  <li>Ростов-на-Дону — Симферополь</li>
                </ul>
                <p>
                  Чтобы поездка была комфортной, выбирайте перевозчика по рейтингу и отзывам. При выборе рейса на GoTrip нажмите на ссылку «Отзывы». 
                  В откликах пассажиров обратите внимание на упоминание кондиционера в салоне автобуса и любые важные для вас детали.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CrimeaByTrain;
