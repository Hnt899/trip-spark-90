import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Snowflake, Calendar, AlertCircle, Gift } from "lucide-react";

const NewYearTravel = () => {
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
          <span>Как купить билеты на Новый год и Рождество</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Как купить билеты на Новый год и Рождество</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                Праздничные дни — отличный повод навестить родных, близких и друзей в других городах. Они наверняка соскучились и ждут в гости. 
                Удобнее всего путешествовать на поезде.
              </p>
            </CardContent>
          </Card>

          {/* Новый год */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Snowflake className="w-6 h-6 text-primary" />
                Поезд на Новый год и Рождество
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Новогодние праздники принято проводить в кругу семьи. Пора ехать в малые города, к родителям, к бабушкам и дедушкам — туда, где вас любят и всегда ждут. 
                  Перед поездкой изучите сезонные коэффициенты — так вы сможете подобрать билет по оптимальной цене.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900">
                    <AlertCircle className="w-5 h-5 inline mr-2" />
                    Перед новым годом билеты традиционно дорожают. Например, самые дорогие билеты в году продаются в плацкарт на 29-30 декабря, 
                    а в купе, люкс и СВ — на 30-31 декабря.
                  </p>
                </div>
                <p>
                  Иногда проводятся специальные акции, когда купить ж/д билеты можно по новогоднему тарифу — за цену ниже среднегодовой. 
                  Однако остановить человека, который хочет провести праздники с родными и близкими, эти цены неспособны. Поезда заполняются, иногда сложно найти билет даже в мягкий вагон. 
                  Поэтому подумайте о приобретении билетов заранее, чтобы ваши планы исполнились. Если билетов нет, не отчаивайтесь — в это время часто назначаются дополнительные поезда, 
                  чтобы каждый желающий успел на встречу с родными, близкими или друзьями.
                </p>
                <p>
                  Если ехать далеко вы не хотите, но идея встретить Новый год в поезде вас будоражит — купите билет с отправлением 31 декабря и прибытием 1 января. 
                  Например, на ночной поезд из Москвы в Санкт-Петербург. Опять же — закажите билеты заранее, потому что эта идея нравится не только вам, а еще десятку тысяч человек. 
                  Перед Новым годом вагоны украшают гирляндами и «дождиком», каждая проводница превращается в Снегурочку, а бригадир поезда — в Деда Мороза. 
                  Праздничный оливье можно попробовать в вагоне-ресторане.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Рождество */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Gift className="w-6 h-6 text-primary" />
                Католическое Рождество
              </h2>
              <p className="text-base leading-relaxed">
                Католическое Рождество отмечается 25 декабря (православное — 7 января). Отправляйтесь на рождественские праздники в Финляндию на поезде «Аллегро» — 
                в Хельсинки ежегодно проходят рождественские праздники, ярмарки и елочные базары. Запасайтесь духом Рождества и скорого Нового года заранее.
              </p>
            </CardContent>
          </Card>

          {/* Заключение */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed text-blue-900">
                Говорят: «как встретишь Новый год, так его и проведешь». Если вы мечтаете об удивительных путешествиях, то встретить Новый год в поезде — отличное начало пути к мечте.
              </p>
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

export default NewYearTravel;
