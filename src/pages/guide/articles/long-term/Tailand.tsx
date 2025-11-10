import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Waves, Sun, MapPin, Coffee, Heart, Info, DollarSign } from "lucide-react";

const Tailand = () => {
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
          <Link to="/guide" className="hover:text-primary">Надолго в другую страну</Link>
          <span>/</span>
          <span>Таиланд</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Таиланд: долгий отпуск в стиле «сабай-сабай»</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=500&fit=crop" 
                  alt="Бангкок, Таиланд" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Таиланд — это страна улыбок, где «сабай-сабай» (хорошо, комфортно) — это образ жизни. Здесь можно остановиться надолго, наслаждаясь тропическим климатом, вкусной едой, красивыми пляжами и дружелюбными людьми. Таиландцы известны своим гостеприимством, улыбчивостью и спокойным отношением к жизни.
              </p>
              <p className="text-base leading-relaxed">
                От шумного Бангкока до тихих островов, от горных курортов до пляжных городов — Таиланд предлагает разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то активная городская жизнь или спокойная атмосфера на пляже.
              </p>
            </CardContent>
          </Card>

          {/* Культура и образ жизни */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Культура и образ жизни</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Таиланд предлагает расслабленный образ жизни, где можно работать из кафе, наслаждаться пляжами, изучать культуру и наслаждаться моментом. Таиландцы известны своим гостеприимством, улыбчивостью и спокойным отношением к жизни. Здесь принято не торопиться, наслаждаться моментом и ценить простые радости.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Тайская культура — это смесь буддизма, традиций и современности, создающая уникальную идентичность. Здесь сильны семейные ценности, традиции и уважение к старшим. Таиландцы гордятся своей страной, её историей и культурой, и с радостью делятся этим с гостями.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Таиланде:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Философия «сабай-сабай» — расслабленный образ жизни</li>
                  <li>Гостеприимство и улыбчивость — тайцы всегда улыбаются</li>
                  <li>Любовь к еде — тайская кухня известна во всём мире</li>
                  <li>Буддизм — важная часть культуры и образа жизни</li>
                  <li>Пляжный образ жизни — на побережье</li>
                  <li>Тропический климат — комфортно круглый год</li>
                  <li>Доступность — относительно недорогая страна</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Таиландцы очень дружелюбны и открыты к общению. Они с радостью делятся своей культурой и традициями. Многие экспаты отмечают, как легко здесь чувствовать себя комфортно благодаря дружелюбию местных и философии «сабай-сабай».
              </p>
            </CardContent>
          </Card>

          {/* Где остановиться */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Где остановиться надолго</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Бангкок — столица, огромный мегаполис с развитой инфраструктурой, множеством возможностей для работы. Чиангмай — город на севере, популярен среди экспатов благодаря спокойной атмосфере и красивой природе. Пхукет, Паттайя — прибрежные города, популярны среди туристов и экспатов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ко Самуи, Ко Панган — острова, популярны среди любителей пляжного отдыха. Хуахин — прибрежный город, популярен среди экспатов. Бангкок особенно популярен среди экспатов благодаря возможностям и инфраструктуре. Прибрежные города и острова привлекают любителей пляжного отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Таиланде варьируется в зависимости от города. В Бангкоке можно снять квартиру от 300-700 долларов в месяц, в прибрежных городах цены выше. Многие экспаты предпочитают жить в центре города или в районах с хорошей инфраструктурой.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=500&fit=crop" 
                  alt="Таиланд, пляжи" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Стоимость жизни */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Стоимость жизни</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Таиланд — относительно доступная страна для долгосрочного пребывания. Аренда жилья недорогая, еда в местных ресторанах очень дешёвая и вкусная. Продукты в супермаркетах качественные и недорогие. Транспорт развит, стоит дёшево.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Интернет в городах хороший, что важно для работы. Медицинское обслуживание качественное и доступное. Развлечения и услуги доступны по разным ценам — от бюджетных до роскошных.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Таиланд — относительно доступная страна для долгосрочного пребывания. При относительно небольших расходах можно жить комфортно, наслаждаясь культурой, природой и дружелюбием местных.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Курс тайского бата может меняться, но в целом страна остаётся доступной. В туристических районах цены выше, чем в местных. Важно иметь медицинскую страховку.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Еда в Таиланде отличная и очень дешёвая. Уличная еда — одна из лучших в мире, очень вкусная и доступная. Местные рестораны предлагают вкусную традиционную кухню по низким ценам. Рестораны для туристов дороже, но всё равно доступны.
              </p>
            </CardContent>
          </Card>

          {/* Что делать */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что посмотреть и чем заняться</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Города</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Бангкок — столица с богатой историей, множеством храмов, дворцов, рынков. Храмы Ват Пхо, Ват Арун, Большой дворец — известные достопримечательности. Чиангмай — город на севере, известный храмами и красивой природой. Аюттхая — древняя столица, объект Всемирного наследия ЮНЕСКО.
                  </p>
                  <p className="text-base leading-relaxed">
                    Каждый город имеет свой характер и предлагает уникальный опыт. Бангкок особенно популярен среди экспатов благодаря возможностям и инфраструктуре.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Пляжи и острова</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Таиланд славится своими пляжами и островами. Пхукет, Ко Самуи, Ко Панган, Ко Тао — популярные места для пляжного отдыха. Можно заниматься сёрфингом, дайвингом, снорклингом, яхтингом.
                  </p>
                  <p className="text-base leading-relaxed">
                    Пляжи красивые, вода тёплая круглый год. Многие экспаты остаются в Таиланде именно из-за пляжного образа жизни и возможности наслаждаться солнцем круглый год.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Культура и традиции</h3>
                  <p className="text-base leading-relaxed">
                    Таиланд богат культурой и традициями. Буддизм — важная часть культуры, множество храмов и монастырей. Тайский массаж, медитация — популярные практики. Фестивали, праздники — важная часть культуры. Таиландцы умеют праздновать и наслаждаться жизнью.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Тайская кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Тайская кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Тайская кухня — одна из самых известных в мире. Том ям, пад тай, зеленое карри — популярные блюда. Уличная еда в Таиланде отличная и очень дешёвая. Тайская кухня известна своими специями, балансом вкусов и ароматами.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Фрукты в Таиланде невероятно вкусные и разнообразные — манго, папайя, дуриан, рамбутан и многие другие. Тайская кухня разнообразна, вкусна и очень доступна. Многие экспаты отмечают, что еда в Таиланде одна из лучших в мире.
              </p>
              <p className="text-base leading-relaxed">
                Рестораны предлагают разнообразную кухню — от традиционной тайской до интернациональной. Качество еды хорошее, цены доступные. Уличная еда в Таиланде — это отдельный опыт, который стоит попробовать.
              </p>
            </CardContent>
          </Card>

          {/* Практические советы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Практические советы для долгого пребывания</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Виза</h3>
                  <p className="text-base leading-relaxed">
                    Для граждан России виза не требуется для поездок до 30 дней. Для более длительного пребывания нужно оформить соответствующую визу. Есть также визы для пенсионеров и инвесторов. Правила могут меняться, поэтому стоит проверять актуальную информацию.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
                  <p className="text-base leading-relaxed">
                    Таиланд — относительно безопасная страна. Стоит соблюдать обычные меры предосторожности, особенно в туристических районах. В целом, тайцы дружелюбны и готовы помочь.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальный язык — тайский. В туристических местах многие говорят по-английски, но знание тайского значительно упростит жизнь и общение с местными. Тайский язык имеет свои особенности, но базовые фразы легко выучить.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Климат в Таиланде тропический, с тремя сезонами: прохладный (ноябрь-февраль), жаркий (март-май), влажный (июнь-октябрь). Температура круглый год около 25-35°C. В целом климат комфортный для долгого пребывания, особенно в прохладный сезон.
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

export default Tailand;
