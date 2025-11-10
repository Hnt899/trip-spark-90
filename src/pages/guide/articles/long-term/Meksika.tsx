import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Sun, MapPin, Coffee, Heart, Info, DollarSign } from "lucide-react";

const Meksika = () => {
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
          <span>Мексика</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Мексика: долгий отпуск в ритме сальсы</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1518105779142-d975f22f1a0f?w=800&h=500&fit=crop" 
                  alt="Мехико, Мексика" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Мексика — это страна ярких красок, музыки, танцев и вкусной еды. Здесь можно погрузиться в латиноамериканскую культуру, насладиться тропическим климатом и богатой историей. Мексиканцы известны своим оптимизмом, открытостью и жизнерадостностью.
              </p>
              <p className="text-base leading-relaxed">
                От тропических пляжей до горных городов, от древних пирамид до современных мегаполисов — Мексика предлагает разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то активная городская жизнь или спокойная атмосфера на побережье.
              </p>
            </CardContent>
          </Card>

          {/* Культура и образ жизни */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Music className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Культура и образ жизни</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Мексика известна своей музыкой, танцами, праздниками и фестивалями. Жизнь здесь полна энергии и цвета. Мексиканцы очень общительны, дружелюбны и открыты, легко заводят знакомства и всегда готовы помочь. Здесь принято наслаждаться жизнью, праздновать и проводить время с близкими.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Мексиканская культура — это смесь индейских, испанских и других влияний, создающая уникальную идентичность. Здесь сильны семейные ценности, традиции и уважение к старшим. Мексиканцы гордятся своей страной, её историей и культурой, и с радостью делятся этим с гостями.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Мексике:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Любовь к музыке и танцам — мариачи, сальса звучат повсюду</li>
                  <li>Яркие праздники и фестивали — День мёртвых, карнавалы</li>
                  <li>Дружелюбность и открытость — мексиканцы очень общительны</li>
                  <li>Любовь к еде — мексиканская кухня известна во всём мире</li>
                  <li>Активная социальная жизнь — любовь к общению</li>
                  <li>Размеренный темп жизни — меньше спешки</li>
                  <li>Доступность — относительно недорогая страна</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Мексиканцы очень жизнерадостны и умеют наслаждаться каждым моментом. Они любят собираться вместе, праздновать, слушать музыку и общаться. Многие экспаты отмечают, как легко здесь заводить знакомства и чувствовать себя частью сообщества.
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
                Мехико — столица, огромный мегаполис с богатой историей, множеством музеев, галереи, театры. Здесь развитая инфраструктура, множество возможностей для работы. Канкун, Плайя-дель-Кармен — прибрежные города на Карибском море, популярны среди экспатов и туристов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Гвадалахара — второй по величине город, известный мариачи и текилой. Оахака — колониальный город с богатой культурой. Пуэбла — исторический город с красивой архитектурой. Мехико особенно популярен среди экспатов благодаря возможностям и инфраструктуре. Прибрежные города привлекают любителей пляжного отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Мексике варьируется в зависимости от города. В Мехико можно снять квартиру от 400-800 долларов в месяц, в прибрежных городах цены выше. Многие экспаты предпочитают жить в центре города или в районах с хорошей инфраструктурой.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1518105779142-d975f22f1a0f?w=800&h=500&fit=crop" 
                  alt="Мексика, пляжи" 
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
                Мексика — относительно доступная страна для долгосрочного пребывания. Аренда жилья недорогая, еда в местных ресторанах очень дешёвая и вкусная. Продукты в супермаркетах качественные и недорогие. Транспорт развит, стоит дёшево.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Интернет в городах хороший, что важно для работы. Медицинское обслуживание качественное и доступное. Развлечения и услуги доступны по разным ценам — от бюджетных до роскошных.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Мексика — относительно доступная страна для долгосрочного пребывания. При относительно небольших расходах можно жить комфортно, наслаждаясь культурой, природой и дружелюбием местных.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Курс мексиканского песо может меняться, но в целом страна остаётся доступной. В некоторых районах безопасность может быть проблемой, поэтому стоит выбирать районы с хорошей репутацией.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Еда в Мексике отличная и очень дешёвая. Местные рестораны предлагают вкусную традиционную кухню по низким ценам. Фрукты и овощи свежие и недорогие. Рестораны для туристов дороже, но всё равно доступны.
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
                  <h3 className="text-xl font-semibold mb-2">Города и история</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Мехико — столица с богатой историей, множеством музеев, галереи, театры. Теотиуакан — древние пирамиды недалеко от Мехико. Чичен-Ица — древний город майя, объект Всемирного наследия ЮНЕСКО. Оахака, Пуэбла — колониальные города с красивой архитектурой.
                  </p>
                  <p className="text-base leading-relaxed">
                    Гвадалахара — город мариачи и текилы. Канкун, Плайя-дель-Кармен — прибрежные города на Карибском море. Каждый город имеет свой характер и предлагает уникальный опыт.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Пляжи и природа</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Мексика славится своими пляжами на Карибском и Тихом побережьях. Канкун, Плайя-дель-Кармен, Тулум — популярные места для пляжного отдыха. Можно заниматься сёрфингом, дайвингом, снорклингом, яхтингом.
                  </p>
                  <p className="text-base leading-relaxed">
                    Природа Мексики разнообразна — от тропических джунглей до пустынь, от гор до побережья. Можно заниматься треккингом, наблюдением за птицами, рафтингом. Природа Мексики красива в любое время года.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Культура и фестивали</h3>
                  <p className="text-base leading-relaxed">
                    Мексика богата культурой и традициями. День мёртвых — один из самых известных праздников в мире. Карнавалы, фестивали, музыка — важная часть культуры. Мариачи, сальса звучат повсюду. Мексиканцы умеют праздновать и наслаждаться жизнью.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Мексиканская кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Мексиканская кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Мексиканская кухня — одна из самых известных в мире. Тако, буррито, энчилада, кесадилья — популярные блюда. Гуакамоле, сальса, начос — популярные закуски. Мексиканская кухня известна своими специями и яркими вкусами.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Текила, мескаль — популярные напитки. Моле — сложный соус с множеством ингредиентов. Чуррос — сладкие палочки. Мексиканская кухня разнообразна, вкусна и очень доступна. Многие экспаты отмечают, что еда в Мексике одна из лучших в мире.
              </p>
              <p className="text-base leading-relaxed">
                Рестораны предлагают разнообразную кухню — от традиционной мексиканской до интернациональной. Качество еды хорошее, цены доступные. Уличная еда в Мексике отличная и очень дешёвая.
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
                    Для граждан России виза не требуется для поездок до 180 дней. Для более длительного пребывания нужно оформить соответствующую визу. Есть также визы для пенсионеров и инвесторов. Правила могут меняться, поэтому стоит проверять актуальную информацию.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
                  <p className="text-base leading-relaxed">
                    Мексика — большая страна с разным уровнем безопасности в разных районах. Важно выбирать районы с хорошей репутацией для проживания, быть внимательным в общественных местах. В целом, мексиканцы дружелюбны и готовы помочь.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальный язык — испанский. В туристических местах многие говорят по-английски, но знание испанского значительно упростит жизнь и общение с местными. Мексиканский испанский имеет свои особенности в произношении.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Климат в Мексике разнообразен: на побережье тропический (жарко круглый год), в горах умеренный. В целом климат комфортный для долгого пребывания, особенно на побережье, где можно наслаждаться солнцем круглый год.
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

export default Meksika;
