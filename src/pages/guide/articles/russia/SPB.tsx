import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const SPB = () => {
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
          <Link to="/guide" className="hover:text-primary">Россия</Link>
          <span>/</span>
          <span>Санкт-Петербург</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Санкт-Петербург</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать в Санкт-Петербург</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Санкт-Петербург — культурная столица России, город с уникальной атмосферой и богатейшим историческим наследием. Основанный Петром Великим в 1703 году, он стал символом европейской России. Здесь вы найдёте величественные дворцы, знаменитые музеи, разводные мосты и белые ночи.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Петербург — это город, который вдохновлял Пушкина, Достоевского, Чайковского. Его архитектура в стиле барокко и классицизма создаёт неповторимую атмосферу. Эрмитаж, Русский музей, Мариинский театр — это мировые сокровища культуры.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть "Северную Венецию" с её каналами и мостами, прикоснуться к истории Российской империи, насладиться культурными событиями мирового уровня — Санкт-Петербург станет идеальным выбором для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Санкт-Петербурга</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Санкт-Петербург расположен в зоне умеренного климата с влиянием Балтийского моря. Лето (июнь-август) умеренно тёплое, со средней температурой 17-19°C. Именно в это время происходят знаменитые белые ночи — с конца мая до середины июля, когда солнце почти не заходит за горизонт.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) мягче, чем в Москве, но пасмурная и влажная, со средней температурой около -5°C. Снег часто чередуется с дождём. Весна и осень прохладные и дождливые, но именно осенью Петербург особенно красив золотыми листьями.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — период белых ночей (конец мая — начало июля), когда город особенно романтичен. Однако и зимой, и летом, и осенью Петербург прекрасен по-своему. Зимой можно насладиться рождественскими ярмарками и катками, а осенью — прогуляться по паркам в золотых листьях.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как добраться</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Самолётом: международный аэропорт Пулково принимает рейсы из многих городов России и мира. От аэропорта до центра можно доехать на автобусе или такси за 30-40 минут. Поездом: главный вокзал — Московский, также есть Ладожский, Витебский, Балтийский и Финляндский вокзалы.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы ходит скоростной поезд "Сапсан" (4 часа) и обычные поезда (8-9 часов). Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе М-11, время в пути около 8-10 часов.
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на метро, автобусах, троллейбусах и трамваях. Также популярны речные прогулки по каналам и рекам города. Петербург — компактный город, многие достопримечательности находятся в пешей доступности друг от друга.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Достопримечательности</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Эрмитаж — один из крупнейших музеев мира, расположенный в Зимнем дворце. Коллекция насчитывает более 3 миллионов экспонатов. Дворцовая площадь и Зимний дворец — символы имперского Петербурга. Исаакиевский собор — крупнейший православный храм города, с которого открывается потрясающий вид на город.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Петропавловская крепость — место основания города, с собором, где похоронены русские императоры. Невский проспект — главная улица города, протянувшаяся на 4,5 км. Казанский собор, храм Спаса на Крови, Русский музей — всё это на Невском и рядом.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Петергоф — знаменитый пригород с фонтанами и дворцами. Царское Село (Пушкин) с Екатерининским дворцом и Янтарной комнатой. Павловск — парковый ансамбль. Кронштадт — город-крепость на острове.
              </p>
              <p className="text-base leading-relaxed">
                Разводные мосты — одна из главных достопримечательностей. Ночью мосты разводятся для прохода судов, что создаёт незабываемое зрелище. Особенно красивы Дворцовый, Благовещенский и Троицкий мосты.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения в Санкт-Петербурге</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Мариинский театр — один из ведущих оперных и балетных театров мира. Александринский, Михайловский, БДТ — также знаменитые театры с богатой историей. В Петербурге проходят многочисленные фестивали, концерты и культурные события.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Музеи: помимо Эрмитажа, стоит посетить Русский музей, Кунсткамеру, Этнографический музей, музей Фаберже. Современные пространства: Эрарта, Лофт Проект ЭТАЖИ — центры современного искусства.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ночная жизнь: множество баров, клубов и ресторанов на Невском проспекте и в центре города. Летом особенно популярны открытые террасы с видом на Неву. Речные прогулки по каналам и рекам — обязательный пункт программы.
              </p>
              <p className="text-base leading-relaxed">
                Парки: Летний сад, Марсово поле, парк Елагина острова. Зимой работают катки, летом можно покататься на лодках. Фестивали: в период белых ночей проходят многочисленные фестивали, концерты под открытым небом, праздники.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Петербургская кухня сочетает русские традиции с европейскими влияниями. Классические рестораны: "Палкинъ", "Европа", "Русская рюмочная" предлагают традиционные блюда — борщ, пельмени, бефстроганов, котлеты по-киевски.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Современная кухня: множество ресторанов с авторской кухней, фьюжн-концепциями. "Cococo", "Mansarda", "Terrassa" — популярные заведения с панорамными видами на город. Уличная еда: шаурма, пирожки, бургеры на каждом шагу.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Сладости: обязательно попробуйте питерские конфеты, торты из знаменитых кондитерских. "Север", "Карамель" — известные кондитерские. Напитки: крафтовое пиво, коктейли в барах, традиционный чай.
              </p>
              <p className="text-base leading-relaxed">
                Рыба и морепродукты: Петербург славится свежей рыбой из Балтийского моря. Рестораны с морепродуктами предлагают отличные блюда из рыбы, креветок, мидий.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Интересные факты</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Санкт-Петербург — самый северный город-миллионник в мире. Он построен на 42 островах, через которые протекает более 90 рек и каналов, через которые перекинуто около 800 мостов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Белые ночи — уникальное явление, когда в период с конца мая по середину июля солнце практически не заходит за горизонт. Это создаёт особую романтическую атмосферу и делает город особенно привлекательным для туристов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Петербург трижды менял название: Санкт-Петербург (1703-1914), Петроград (1914-1924), Ленинград (1924-1991), и снова Санкт-Петербург с 1991 года. Исторический центр города включён в список Всемирного наследия ЮНЕСКО.
              </p>
              <p className="text-base leading-relaxed">
                Эрмитаж настолько велик, что если провести у каждого экспоната по одной минуте, понадобится около 11 лет, чтобы увидеть всё. Невский проспект — одна из самых прямых улиц в мире, её длина составляет 4,5 км.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SPB;
