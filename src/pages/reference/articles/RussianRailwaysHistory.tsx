import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { History, Train, Calendar, Route } from "lucide-react";

const RussianRailwaysHistory = () => {
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
          <span>История железных дорог России</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">История железных дорог России</h1>

        <div className="space-y-8">
          {/* Начало */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <History className="w-6 h-6 text-primary" />
                Начало истории
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  История железных дорог началась в России в <strong>1834 году</strong>. Тогда горное ведомство пригласило в Петербург известного инженера Франца фон Герстнера. 
                  Он объездил множество городов, вплоть до Урала, а потом подал царю Николаю I серьезный отчет. Вот оттуда цитата: 
                  «…нет такой страны в мире, где железные дороги были бы более выгодны и даже необходимы, чем в России, так как они дают возможность сокращать большие расстояния путем увеличения скорости передвижения...» 
                  Это совпадало с целями правительства: нужно было объединять, заселять и осваивать огромные территории.
                </p>
                <p>
                  Решили построить сначала небольшую линию и посмотреть, как железная дорога перенесет русские зимы. Это и была знаменитая <strong>Царскосельская</strong>, в 1836 году. 
                  Первый поезд на паровой тяге первые несколько дней до Царского села и обратно в Петербург водил сам инженер фон Герстнер.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Развитие */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                Развитие железных дорог
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Колея европейских дорог повторяет ширину еще римских повозок. В России решили не повторяться, сделать колею шире — так можно перевезти больше грузов, 
                  да и пассажирам ехать удобнее. В <strong>1845 году</strong> в России уже строились свои паровозы, а второй половине XIX века и вовсе начался железнодорожный бум. 
                  Для строительства железных дорог привлекли частные компании.
                </p>
                <p>
                  На деньги, вырученные от продажи Аляски, был образован специальный фонд, который выдавал кредиты под строительство жд магистралей. 
                  Строились и мосты через крупные реки.
                </p>
                <p>
                  Была проложена «хлебная» дорога — в Поволжье. Построили стратегически важную Оренбургскую железную дорогу — военный и торговый путь в Азию.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Транссиб */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Route className="w-6 h-6 text-primary" />
                Транссибирская магистраль
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Для освоения Сибири и Дальнего Востока в <strong>1857 году</strong> приняли решение строить Транссиб. Эта дорога по своей протяженности и быстроте сооружения 
                  до сих пор не знает равных в мире. Траннсиб был признан величайшим техническим достижением рубежа XIX и XX веков.
                </p>
                <p>
                  Развитие железных дорог связано с именами <strong>П.П. Мельникова</strong> и <strong>С.Ю. Витте</strong>. При Мельникове строились самые дешевые дороги, 
                  а Витте предложит сделать государственную монополию на железнодорожные тарифы и ввести принцип, которым до сих пор определяется цена на железнодорожные билеты: 
                  чем дальше, тем дешевле.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Война */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" />
                Великая Отечественная война
              </h2>
              <p className="text-base leading-relaxed">
                Строительство дорог не прекращалось и во время Великой Отечественной войны: проложили Северо-Печорскую дорогу до Воркуты, а это — уголь для металлургии, 
                построили Волжскую рокаду, обеспечившую всем необходимым Сталинградский фронт, дорогу по ледовой переправе от Шлиссельбурга, по которой шли грузы в блокадный Ленинград. 
                Если собрать все военные эшелоны в один состав, то им можно обмотать Землю по экватору четыре раза.
              </p>
            </CardContent>
          </Card>

          {/* Современность */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Train className="w-6 h-6 text-primary" />
                Современность
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Сейчас около <strong>80% сети ОАО «РЖД»</strong> — это то, что было построено до 1917 года. В советские времена тоже строили новые дороги, но, в основном, в союзных республиках. 
                  Самая крупная стройка советских времен на территории России — <strong>Байкало-Амурская магистраль</strong>, (1974-1984), давшая новый толчок освоению Сибири.
                </p>
                <p>
                  Сейчас железные дороги развиваются в духе времени. Запускаются скоростные магистрали, внедряются новые технологии. Билет на поезд можно купить онлайн. 
                  Садясь в поезд, представьте, какой огромный «багаж» есть у железной дороги.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2 text-base">
                <li>
                  <Link to="/reference/trains/how-to-buy" className="text-primary hover:underline">
                    Покупка ж/д билетов
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RussianRailwaysHistory;
