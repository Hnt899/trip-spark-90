import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Cloud, Train, Camera, Coffee, Lightbulb } from "lucide-react";

const Vladivostok = () => {
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
          <span>Владивосток</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Владивосток</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем ехать во Владивосток</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Владивосток — столица Приморского края, крупнейший город Дальнего Востока России, расположенный на побережье Японского моря. Основанный в 1860 году, город стал важным портом и военно-морской базой. Владивосток — это "ворота России в Азию", уникальный город, где европейская культура встречается с азиатской.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Город известен своим уникальным расположением на сопках с видом на море, красивыми мостами, включая знаменитый Русский мост, и богатой историей. Владивосток — конечная точка Транссибирской магистрали, что делает его важным транспортным узлом.
              </p>
              <p className="text-base leading-relaxed">
                Если вы хотите увидеть "дальневосточную столицу", познакомиться с уникальной культурой Дальнего Востока, насладиться морепродуктами и морскими пейзажами, посетить уникальные достопримечательности — Владивосток станет незабываемым местом для путешествия.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cloud className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат Владивостока</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Владивосток расположен в зоне муссонного климата с влиянием моря. Лето (июнь-август) тёплое и влажное, со средней температурой 18-20°C, часто бывают туманы и дожди. Лето — лучшее время для посещения пляжей и морских прогулок.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Зима (декабрь-февраль) холодная и сухая, со средней температурой около -12°C, морозы могут опускаться до -20°C. Зимой город покрыт снегом, но из-за близости к морю климат мягче, чем в континентальных районах. Весна и осень прохладные и переменчивые.
              </p>
              <p className="text-base leading-relaxed">
                Лучшее время для посещения — с июня по сентябрь, когда погода наиболее комфортна. Однако и зимой Владивосток красив, особенно в период новогодних праздников. Летом особенно приятно прогуливаться по набережной и наслаждаться морским воздухом.
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
                Самолётом: международный аэропорт Кневичи принимает рейсы из многих городов России и Азии. От аэропорта до центра можно доехать на автобусе или такси за 40-50 минут. Поездом: Владивосток — конечная точка Транссибирской магистрали, принимает поезда из всех регионов России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Из Москвы поезд идёт около 6-7 суток. Автобусом: междугородние автобусы прибывают на автовокзал. Автомобилем: из Москвы по трассе (очень длинный путь через всю страну).
              </p>
              <p className="text-base leading-relaxed">
                Внутри города удобно передвигаться на автобусах, троллейбусах, трамваях и маршрутках. Также популярны морские прогулки и поездки на острова. Центр города расположен на сопках, что создаёт уникальный ландшафт.
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
                Русский мост — один из самых длинных вантовых мостов в мире, соединяющий материк с островом Русский. Мост является символом города и предлагает потрясающие виды. Золотой мост — ещё один знаменитый мост через бухту Золотой Рог.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Владивостокская крепость — комплекс фортификационных сооружений, один из крупнейших в мире. Набережная Цесаревича — популярное место для прогулок с видом на море и мосты. Площадь Борцов Революции — главная площадь города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Приморский океанариум на острове Русский — один из крупнейших океанариумов в мире. Музей истории Дальнего Востока, Музей Тихоокеанского флота — интересные места для знакомства с историей региона.
              </p>
              <p className="text-base leading-relaxed">
                Также стоит посетить: маяк на острове Скрыплёва, парк "Минный городок", фуникулёр с видом на город. За пределами города — природные достопримечательности Приморья, включая Уссурийский заповедник.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Развлечения во Владивостоке</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Театры: Приморский театр драмы, Театр оперы и балета, Театр кукол. В городе проходят многочисленные фестивали и культурные события, включая фестиваль "Меридианы Тихого", джазовые концерты.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Морские прогулки и экскурсии — обязательный пункт программы. Пляжи и морские курорты в окрестностях города. Ночная жизнь: множество баров, клубов и ресторанов в центре города, особенно популярны заведения с видом на море.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шопинг: торговые центры "Авангард", "Калина Молл", "Седанка Сити" предлагают широкий выбор магазинов. Парки: парк "Минный городок", парк Победы — отличные места для отдыха.
              </p>
              <p className="text-base leading-relaxed">
                Спорт: стадион "Динамо", водные виды спорта. Рыбалка и дайвинг — популярные развлечения. Также популярны экскурсии по островам и природным достопримечательностям Приморья.
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
                Дальневосточная кухня славится морепродуктами: свежие крабы, креветки, морские ежи, гребешки, трепанги. Популярны блюда из рыбы, особенно лосось, минтай, камбала. Классические рестораны: "Крабовая Ловушка", "Паллада", "Океан" предлагают блюда из морепродуктов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Азиатская кухня: благодаря близости к Азии, во Владивостоке много ресторанов японской, китайской, корейской кухни. Суши, роллы, корейская лапша — популярные блюда. Современная кухня: множество ресторанов с авторской кухней.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Уличная еда: шаурма, бургеры, пирожки на каждом шагу. Сладости: местные конфеты, торты. Напитки: крафтовое пиво, традиционный чай. Особенность: обязательно попробуйте живых крабов, морских ежей и другие дары моря.
              </p>
              <p className="text-base leading-relaxed">
                Рыбный рынок — отличное место для покупки свежих морепродуктов. Здесь можно купить крабов, креветок, рыбу и другие дары моря прямо с улова.
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
                Владивосток — крупнейший город Дальнего Востока России, население превышает 600 тысяч человек. Город был основан в 1860 году как военный пост. Владивосток — конечная точка Транссибирской магистрали, самая дальняя точка от Москвы среди крупных городов России.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Русский мост — один из самых длинных вантовых мостов в мире, его длина составляет 3,1 км. Мост соединяет материк с островом Русский и является символом города. Золотой мост — ещё один знаменитый мост, один из самых больших вантовых мостов в мире.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Владивосток — крупная военно-морская база Тихоокеанского флота России. Город расположен на сопках, что создаёт уникальный ландшафт. Владивосток часто называют "российским Сан-Франциско" из-за холмистого рельефа и мостов.
              </p>
              <p className="text-base leading-relaxed">
                Владивосток — важный порт, через который проходит значительная часть торговли России с Азией. Город является важным транспортным узлом, связывающим Россию с Китаем, Японией и другими странами Азии. Разница во времени с Москвой составляет 7 часов.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Vladivostok;
