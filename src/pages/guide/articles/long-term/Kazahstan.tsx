import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mountain, Building2, Coffee, Heart, Info, DollarSign } from "lucide-react";

const Kazahstan = () => {
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
          <span>Казахстан</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Казахстан: долгий красивый отпуск</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop" 
                  alt="Алматы, Казахстан" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Казахстан — это огромная страна с разнообразной природой, от степей до гор, от пустынь до озёр. Близость к России, схожесть культуры и красивые пейзажи делают её интересным местом для долгого пребывания. Здесь легко чувствовать себя комфортно, понимать местных и наслаждаться всем лучшим, что может предложить эта прекрасная страна.
              </p>
              <p className="text-base leading-relaxed">
                От современных столиц до древних городов, от степей до гор — Казахстан предлагает разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то активная городская жизнь или спокойная атмосфера в горах.
              </p>
            </CardContent>
          </Card>

          {/* Культура и образ жизни */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Культура и образ жизни</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Казахстан — это страна с богатой историей и культурой, где традиции кочевников соседствуют с современностью. Казахи известны своим гостеприимством, дружелюбием и уважением к традициям. Здесь сильны семейные ценности, традиции и уважение к старшим.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Казахская культура — это смесь тюркских, монгольских и русских влияний, создающая уникальную идентичность. Казахи гордятся своей историей, культурой и языком, и с радостью делятся этим с гостями. Близость к России делает Казахстан особенно понятным для русскоязычных путешественников.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Казахстане:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Гостеприимство и дружелюбие — казахи всегда рады гостям</li>
                  <li>Близость к России — схожая культура и язык</li>
                  <li>Богатая история и культура — традиции кочевников живы</li>
                  <li>Разнообразная природа — от степей до гор</li>
                  <li>Традиционная кухня — вкусная и сытная</li>
                  <li>Размеренный темп жизни — меньше спешки</li>
                  <li>Доступность — относительно недорогая страна</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Казахи очень общительны и любят проводить время с друзьями и семьёй. Традиционные праздники, такие как Наурыз, важная часть культуры. Многие экспаты отмечают, как легко здесь чувствовать себя комфортно благодаря близости культуры и языка.
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
                Нур-Султан (Астана) — современная столица с футуристической архитектурой. Здесь множество современных зданий, развитая инфраструктура, хорошие возможности для работы. Алматы — бывшая столица, зелёный город у подножия гор, с особой атмосферой, множеством парков и кафе.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шымкент — третий по величине город, спокойный и недорогой. Актау — прибрежный город на Каспийском море. Алматы особенно популярен среди экспатов благодаря климату, природе и атмосфере. Нур-Султан привлекает тех, кто ищет современность и возможности.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Казахстане очень доступна. В Алматы и Нур-Султане можно снять квартиру от 200-500 долларов в месяц, в других городах дешевле. Многие экспаты предпочитают жить в центре города или в районах с хорошей инфраструктурой.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop" 
                  alt="Казахстан, природа" 
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
                Казахстан — очень доступная страна для долгосрочного пребывания. Аренда жилья недорогая, еда в местных ресторанах очень дешёвая и вкусная. Продукты в супермаркетах качественные и недорогие. Транспорт развит, стоит дёшево.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Интернет в городах хороший, что важно для работы. Медицинское обслуживание качественное и доступное. Развлечения и услуги доступны по разным ценам — от бюджетных до роскошных.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Казахстан — очень доступная страна для долгосрочного пребывания. При относительно небольших расходах можно жить комфортно, наслаждаясь природой и культурой.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Курс тенге может меняться, но в целом страна остаётся очень доступной. Близость к России делает Казахстан особенно привлекательным для русскоязычных.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Еда в Казахстане отличная и очень дешёвая. Местные рестораны предлагают вкусную традиционную кухню по низким ценам. Фрукты и овощи свежие и недорогие. Рестораны для туристов дороже, но всё равно доступны.
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
                    Нур-Султан — современная столица с футуристической архитектурой, включая Байтерек, Хан Шатыр, Дворец мира и согласия. Алматы — зелёный город у подножия гор, с парками, кафе, близостью к природе. Медео — высокогорный каток, Чимбулак — горнолыжный курорт.
                  </p>
                  <p className="text-base leading-relaxed">
                    Туркестан — древний город с мавзолеем Ходжи Ахмеда Ясави. Байконур — космодром, откуда запускают ракеты. Каждый город имеет свой характер и предлагает уникальный опыт.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Природа</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Казахстан — огромная страна с разнообразной природой. Алтайские горы на востоке, степи в центре, пустыни на юге, озёра и реки. Большое Алматинское озеро, Чарынский каньон, Капчагайское водохранилище — красивые места для отдыха.
                  </p>
                  <p className="text-base leading-relaxed">
                    Можно заниматься треккингом, альпинизмом, горнолыжным спортом, рыбалкой, охотой. Природа Казахстана разнообразна и красива в любое время года. Многие экспаты отмечают красоту природы и возможности для активного отдыха.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Культура и традиции</h3>
                  <p className="text-base leading-relaxed">
                    Казахстан богат культурой и традициями. Наурыз — главный праздник, отмечаемый весной. Традиционная музыка, танцы, ремёсла — важная часть культуры. Музеи, галереи, театры — культурная жизнь активна, особенно в крупных городах.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Казахская кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Казахская кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Казахская кухня — это сытная и вкусная еда, отражающая традиции кочевников. Бешбармак — национальное блюдо из мяса и лапши. Плов — рисовое блюдо с мясом и овощами. Манты — пельмени на пару. Шашлык — мясо, приготовленное на углях.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Кумыс — кисломолочный напиток из кобыльего молока, традиционный напиток. Борщ, пельмени, салаты — влияние русской кухни. Казахская кухня сытная, вкусная и очень доступная. Многие экспаты отмечают, что еда в Казахстане отличная и недорогая.
              </p>
              <p className="text-base leading-relaxed">
                Рестораны предлагают разнообразную кухню — от традиционной казахской до русской, узбекской, корейской. Качество еды хорошее, цены доступные. Многие экспаты отмечают, что казахская кухня одна из лучших в регионе.
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
                    Для граждан России виза не требуется для поездок до 90 дней. Для более длительного пребывания нужно оформить соответствующую визу. Правила могут меняться, поэтому стоит проверять актуальную информацию.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальные языки — казахский и русский. Русский язык широко используется, особенно в городах, что делает Казахстан особенно понятным для русскоязычных путешественников. Знание русского значительно упростит жизнь.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
                  <p className="text-base leading-relaxed">
                    Казахстан — безопасная страна с низким уровнем преступности. Можно чувствовать себя безопасно, особенно в крупных городах. Стоит соблюдать обычные меры предосторожности, как и в любой стране.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Климат в Казахстане континентальный: жаркое лето (до 35°C) и холодная зима (до -30°C). В Алматы климат мягче благодаря близости к горам. В целом климат комфортный для долгого пребывания, особенно в Алматы, где климат более мягкий.
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

export default Kazahstan;
