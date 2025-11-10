import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Mountain, MapPin, Tent, Coffee, Heart, Info, DollarSign } from "lucide-react";

const KyrgyzstanKirgiziya = () => {
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
          <span>Кыргызстан (Киргизия)</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Киргизия: долгий отпуск без спешки</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop" 
                  alt="Бишкек, Киргизия" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Киргизия — это страна гор, чистого воздуха и неторопливого ритма жизни. Здесь можно остановиться надолго, наслаждаясь природой, гостеприимством местных и спокойной атмосферой. Близость к России, схожесть культуры и красивые пейзажи делают её интересным местом для долгого пребывания.
              </p>
              <p className="text-base leading-relaxed">
                От горных вершин до озёр, от степи до лесов — Киргизия предлагает разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то активный отдых в горах или спокойная атмосфера у озера.
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
                Киргизия — это страна с богатой историей и культурой, где традиции кочевников соседствуют с современностью. Киргизы известны своим гостеприимством, дружелюбием и уважением к традициям. Здесь сильны семейные ценности, традиции и уважение к старшим.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Киргизская культура — это смесь тюркских, монгольских и русских влияний, создающая уникальную идентичность. Киргизы гордятся своей историей, культурой и языком, и с радостью делятся этим с гостями. Близость к России делает Киргизию особенно понятной для русскоязычных путешественников.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Киргизии:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Гостеприимство и дружелюбие — киргизы всегда рады гостям</li>
                  <li>Близость к России — схожая культура и язык</li>
                  <li>Богатая история и культура — традиции кочевников живы</li>
                  <li>Горная природа — чистый воздух и красивые пейзажи</li>
                  <li>Традиционная кухня — вкусная и сытная</li>
                  <li>Неторопливый ритм жизни — меньше спешки</li>
                  <li>Доступность — очень недорогая страна</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Киргизы очень общительны и любят проводить время с друзьями и семьёй. Традиционные праздники, такие как Нооруз, важная часть культуры. Многие экспаты отмечают, как легко здесь чувствовать себя комфортно благодаря близости культуры и языка.
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
                Бишкек — столица, спокойный город с хорошей инфраструктурой. Здесь можно жить в центре или в районах с хорошей транспортной доступностью. Ош — второй по величине город, спокойный и недорогой. Каракол — город у озера Иссык-Куль, популярен среди любителей природы.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Чолпон-Ата — курортный город на берегу Иссык-Куля, популярен летом. Бишкек особенно популярен среди экспатов благодаря инфраструктуре и возможностям. Прибрежные города у Иссык-Куля привлекают любителей природы и активного отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Киргизии очень доступна. В Бишкеке можно снять квартиру от 150-400 долларов в месяц, в других городах дешевле. Многие экспаты предпочитают жить в центре города или в районах с хорошей инфраструктурой.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop" 
                  alt="Киргизия, горы" 
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
                Киргизия — одна из самых доступных стран для долгосрочного пребывания. Аренда жилья очень недорогая, еда в местных ресторанах очень дешёвая и вкусная. Продукты в супермаркетах качественные и недорогие. Транспорт развит, стоит дёшево.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Интернет в городах хороший, что важно для работы. Медицинское обслуживание качественное и доступное. Развлечения и услуги доступны по разным ценам — от бюджетных до роскошных.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Киргизия — одна из самых доступных стран для долгосрочного пребывания. При относительно небольших расходах можно жить комфортно, наслаждаясь природой и культурой.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Курс сома может меняться, но в целом страна остаётся очень доступной. Близость к России делает Киргизию особенно привлекательной для русскоязычных.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Еда в Киргизии отличная и очень дешёвая. Местные рестораны предлагают вкусную традиционную кухню по низким ценам. Фрукты и овощи свежие и недорогие. Рестораны для туристов дороже, но всё равно доступны.
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
                  <h3 className="text-xl font-semibold mb-2">Горы и природа</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Киргизия — страна гор, где можно заниматься треккингом, альпинизмом, наслаждаться озёрами и красивыми пейзажами. Озеро Иссык-Куль — жемчужина страны, одно из крупнейших высокогорных озёр в мире. Здесь можно купаться, заниматься водными видами спорта, наслаждаться природой.
                  </p>
                  <p className="text-base leading-relaxed">
                    Горы Тянь-Шаня предлагают возможности для треккинга, альпинизма, горнолыжного спорта. Каньон Сказка, водопад Барскаун, озеро Сон-Куль — красивые места для отдыха. Природа Киргизии разнообразна и красива в любое время года. Многие экспаты отмечают красоту природы и возможности для активного отдыха.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Города</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Бишкек — столица, спокойный город с парками, музеями, кафе. Ош — второй по величине город, известный базаром и историей. Каракол — город у озера Иссык-Куль, популярен среди любителей природы.
                  </p>
                  <p className="text-base leading-relaxed">
                    Каждый город имеет свой характер и предлагает уникальный опыт. Бишкек особенно популярен среди экспатов благодаря инфраструктуре и возможностям.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Культура и традиции</h3>
                  <p className="text-base leading-relaxed">
                    Киргизия богата культурой и традициями. Нооруз — главный праздник, отмечаемый весной. Традиционная музыка, танцы, ремёсла — важная часть культуры. Музеи, галереи — культурная жизнь активна, особенно в Бишкеке.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Киргизская кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Киргизская кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Киргизская кухня — это сытная и вкусная еда, отражающая традиции кочевников. Бешбармак — национальное блюдо из мяса и лапши. Плов — рисовое блюдо с мясом и овощами. Манты — пельмени на пару. Шашлык — мясо, приготовленное на углях.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Кумыс — кисломолочный напиток из кобыльего молока, традиционный напиток. Борщ, пельмени, салаты — влияние русской кухни. Киргизская кухня сытная, вкусная и очень доступная. Многие экспаты отмечают, что еда в Киргизии отличная и недорогая.
              </p>
              <p className="text-base leading-relaxed">
                Рестораны предлагают разнообразную кухню — от традиционной киргизской до русской, узбекской, корейской. Качество еды хорошее, цены доступные. Многие экспаты отмечают, что киргизская кухня одна из лучших в регионе.
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
                    Официальные языки — киргизский и русский. Русский язык широко используется, особенно в городах, что делает Киргизию особенно понятной для русскоязычных путешественников. Знание русского значительно упростит жизнь.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
                  <p className="text-base leading-relaxed">
                    Киргизия — безопасная страна с низким уровнем преступности. Можно чувствовать себя безопасно, особенно в крупных городах. Стоит соблюдать обычные меры предосторожности, как и в любой стране.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Климат в Киргизии континентальный: жаркое лето (до 30°C) и холодная зима (до -20°C). В горах климат более прохладный. В целом климат комфортный для долгого пребывания, особенно летом, когда можно наслаждаться природой и озером Иссык-Куль.
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

export default KyrgyzstanKirgiziya;
