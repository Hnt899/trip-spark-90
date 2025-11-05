import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mountain, Coffee, Heart, Info } from "lucide-react";

const Armeniya = () => {
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
          <span>Армения</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Армения: долгий отпуск по-соседски</h1>

        <div className="space-y-8">
          {/* Введение с фото */}
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&h=500&fit=crop" 
                  alt="Ереван, Армения" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Армения — это удивительная страна с древней историей, гостеприимными людьми и красивой природой. Близость к России, схожесть менталитета и относительно недорогая жизнь делают её отличным выбором для долгосрочного пребывания. Армения была первой страной в мире, принявшей христианство как государственную религию, и эта история чувствуется везде.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Армения манит своими горами, древними монастырями, вкусной кухней и тёплым отношением к гостям. Здесь вы не будете чувствовать себя чужим — армяне очень радушны и всегда готовы помочь. Русский язык здесь понимают многие, что значительно упрощает адаптацию.
              </p>
              <p className="text-base leading-relaxed">
                Страна небольшая, но разнообразная: от гор до озёр, от древних храмов до современных городов. Жизнь здесь течёт размеренно, без суеты, что идеально подходит для долгого отпуска.
              </p>
            </CardContent>
          </Card>

          {/* Образ жизни */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Образ жизни в Армении</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Армяне известны своим гостеприимством и семейными традициями. Здесь принято много времени проводить с семьёй, друзьями, наслаждаться едой и общением. Жизнь течёт размеренно и спокойно. Гость в армянском доме — это священное понятие, и вас всегда будут угощать лучшим, что есть в доме.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Армянская культура очень семейно-ориентированная. Воскресные обеды с большой семьёй, праздники, которые отмечают все вместе, крепкие связи между поколениями — это неотъемлемая часть жизни. Армяне гордятся своей историей и культурой и с радостью делятся ею с гостями.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Армении:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Гостеприимство и радушное отношение к иностранцам</li>
                  <li>Крепкие семейные связи и уважение к старшим</li>
                  <li>Любовь к долгим застольям с множеством блюд</li>
                  <li>Размеренный ритм жизни без спешки</li>
                  <li>Уважение к традициям и истории</li>
                  <li>Русский язык понимают многие, что упрощает общение</li>
                  <li>Близость культуры к русской, что делает адаптацию легче</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Армянские застолья — это особое искусство. Стол всегда ломится от еды, тосты длинные и философские, и вечеринка может длиться часами. Это время общения, дружбы и радости. Если вас пригласили на такое застолье — это большая честь.
              </p>
            </CardContent>
          </Card>

          {/* Где жить */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Ереван — идеальный город для долгого пребывания</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Ереван — столица Армении, город, который сочетает современность с древней историей. Город розового туфа построен из розового камня, что придаёт ему особый колорит. Здесь есть всё необходимое для комфортной жизни: хорошая инфраструктура, множество кафе и ресторанов, культурных мероприятий и при этом доступные цены.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Центр Еревана компактный и удобный для пеших прогулок. Площадь Республики — сердце города, где вечером можно увидеть поющий фонтан. Каскад — архитектурный комплекс с лестницами, фонтанами и скульптурами, откуда открывается прекрасный вид на город и гору Арарат.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Ереване очень доступна. Можно снять хорошую квартиру в центре за 200-400 долларов в месяц. Еда, транспорт, развлечения — всё стоит недорого. Многие экспаты выбирают Ереван именно из-за соотношения качества жизни и цены.
              </p>
              <p className="text-base leading-relaxed">
                В Ереване много кафе, где можно работать, встречаться с друзьями или просто отдыхать. Кафе на улице — это центр общественной жизни, особенно в тёплое время года. Интернет в городе быстрый, что важно для цифровых кочевников.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop" 
                  alt="Армения, горы и монастыри" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Что посмотреть */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что посмотреть</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Древние монастыри</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Армения — первая страна в мире, принявшая христианство как государственную религию в 301 году. Здесь множество древних монастырей, которые являются не только религиозными центрами, но и архитектурными шедеврами. Гегард — монастырь, частично высеченный в скале, включённый в список ЮНЕСКО.
                  </p>
                  <p className="text-base leading-relaxed">
                    Татев — монастырь IX века, к которому ведёт самая длинная канатная дорога в мире. Нораванк — монастырь XIII века в ущелье с красными скалами. Каждый монастырь уникален и рассказывает свою историю. Посещение этих мест — это не просто экскурсия, а погружение в историю и духовность.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Гора Арарат</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Символ Армении, священная гора Арарат, видна из многих точек страны и создаёт незабываемые пейзажи. Хотя гора сейчас находится на территории Турции, для армян она остаётся символом родины и истории. Вид на Арарат из Еревана, особенно на закате, — это зрелище, которое остаётся в памяти.
                  </p>
                  <p className="text-base leading-relaxed">
                    По библейской легенде, именно на Арарате остановился Ноев ковчег после потопа. Эта связь с библейской историей делает гору особо значимой для армян.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Озеро Севан</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Высокогорное озеро Севан — жемчужина Армении, расположенное на высоте 1900 метров. Это одно из крупнейших пресноводных высокогорных озёр в мире. Летом здесь можно купаться, загорать, кататься на лодке, а также попробовать знаменитую севанскую форель.
                  </p>
                  <p className="text-base leading-relaxed">
                    На берегу озера стоит монастырь Севанаванк, откуда открывается потрясающий вид. Окрестности озера идеальны для пеших прогулок и пикников. Севан — это место, куда едут, чтобы отдохнуть от городской суеты и насладиться природой.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Горные маршруты</h3>
                  <p className="text-base leading-relaxed">
                    Армения — горная страна, и здесь множество возможностей для треккинга и альпинизма. Гора Арагац — самая высокая точка Армении, популярное место для походов. Дилижанский национальный парк предлагает красивые лесные маршруты. В горах можно найти древние крепости, водопады и пещеры.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Армянская кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Армянская кухня — это настоящая находка для гурманов. Она разнообразна, сытна и полна вкусов. Лаваш — тонкий хлеб, который выпекают в тонире (глиняной печи) и который включён в список нематериального наследия ЮНЕСКО. Хаш — наваристый суп из говяжьих ножек, который едят ранним утром.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Долма — виноградные листья, фаршированные мясом и рисом. Хоровац (шашлык) готовят на углях, и это настоящий ритуал. Армянские сыры разнообразны и вкусны. Сладости, такие как гата, пахлава, различные варенья, — это отдельная тема.
              </p>
              <p className="text-base leading-relaxed">
                Армянский коньяк известен во всём мире, и его обязательно стоит попробовать. Армянское вино тоже заслуживает внимания — виноделие здесь имеет тысячелетнюю историю. Кофе в Армении варят по-восточному, и это тоже часть культуры.
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
                <h2 className="text-2xl font-bold">Практические советы</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальный язык — армянский, но русский язык понимают многие, особенно старшее поколение. В туристических местах и среди молодёжи часто говорят по-английски. Базовое знание русского значительно упростит общение.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Виза</h3>
                  <p className="text-base leading-relaxed">
                    Для граждан России виза не требуется для поездок до 180 дней. Армения входит в ЕАЭС, что упрощает многие формальности.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Стоимость жизни</h3>
                  <p className="text-base leading-relaxed">
                    Армения — очень доступная страна. Аренда квартиры в Ереване стоит от 200-400 долларов в месяц. Еда, транспорт, развлечения — всё недорого. Можно комфортно жить на 500-800 долларов в месяц.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Континентальный климат с жарким летом и холодной зимой. В Ереване летом может быть очень жарко, а зимой прохладно. В горах всегда прохладнее. Лучшее время для посещения — с апреля по октябрь.
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

export default Armeniya;
