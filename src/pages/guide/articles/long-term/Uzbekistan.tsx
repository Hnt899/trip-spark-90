import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Coffee, History, Heart, Info, DollarSign } from "lucide-react";

const Uzbekistan = () => {
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
          <span>Узбекистан</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Узбекистан: долгий отпуск</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop" 
                  alt="Самарканд, Узбекистан" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Узбекистан — это страна древних городов Шёлкового пути, красивой архитектуры, вкусной еды и гостеприимных людей. Здесь можно остановиться надолго, изучая историю, культуру и наслаждаясь восточной атмосферой. Узбеки известны своим гостеприимством, дружелюбием и открытостью.
              </p>
              <p className="text-base leading-relaxed">
                От древних городов до современных столиц, от пустынь до гор — Узбекистан предлагает разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то изучение истории или наслаждение восточной культурой.
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
                Узбекистан — это страна с богатой историей и культурой, где Восток встречается с Центральной Азией. Узбеки известны своим гостеприимством, дружелюбием и открытостью. Здесь принято не торопиться, наслаждаться моментом и ценить общение с близкими.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Узбекская культура — это смесь тюркских, персидских и других влияний, создающая уникальную идентичность. Здесь сильны семейные ценности, традиции и уважение к старшим. Узбеки гордятся своей страной, её историей и культурой, и с радостью делятся этим с гостями.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Узбекистане:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Гостеприимство — узбеки всегда рады гостям</li>
                  <li>Богатая история — древние города Шёлкового пути</li>
                  <li>Традиционная кухня — узбекская кухня известна во всём мире</li>
                  <li>Красивая архитектура — мечети, медресе, мавзолеи</li>
                  <li>Восточная атмосфера — уникальная культура</li>
                  <li>Дружелюбность — узбеки очень общительны</li>
                  <li>Доступность — очень недорогая страна</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Узбеки очень дружелюбны и открыты к общению. Они с радостью делятся своей культурой и традициями. Многие экспаты отмечают, как легко здесь чувствовать себя комфортно благодаря дружелюбию местных и богатой культуре.
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
                Ташкент — столица, современный город с развитой инфраструктурой, множеством возможностей для работы. Самарканд — древний город Шёлкового пути, известный своей архитектурой. Бухара — исторический город, объект Всемирного наследия ЮНЕСКО.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Хива — древний город, музей под открытым небом. Фергана — город в долине, известный своей культурой. Ташкент особенно популярен среди экспатов благодаря возможностям и инфраструктуре. Исторические города привлекают любителей истории и культуры.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Узбекистане очень доступна. В Ташкенте можно снять квартиру от 200-500 долларов в месяц, в других городах дешевле. Многие экспаты предпочитают жить в центре города или в районах с хорошей инфраструктурой.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop" 
                  alt="Узбекистан, архитектура" 
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
                Узбекистан — очень доступная страна для долгосрочного пребывания. Аренда жилья очень недорогая, еда в местных ресторанах очень дешёвая и вкусная. Продукты в супермаркетах качественные и недорогие. Транспорт развит, стоит дёшево.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Интернет в городах хороший, что важно для работы. Медицинское обслуживание качественное и доступное. Развлечения и услуги доступны по разным ценам — от бюджетных до роскошных.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Узбекистан — очень доступная страна для долгосрочного пребывания. При относительно небольших расходах можно жить комфортно, наслаждаясь культурой, историей и дружелюбием местных.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Курс узбекского сума может меняться, но в целом страна остаётся очень доступной. Близость к России делает Узбекистан особенно привлекательным для русскоязычных.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Еда в Узбекистане отличная и очень дешёвая. Местные рестораны предлагают вкусную традиционную кухню по низким ценам. Узбекская кухня известна во всём мире. Рестораны для туристов дороже, но всё равно доступны.
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
                  <h3 className="text-xl font-semibold mb-2">Древние города</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Самарканд, Бухара, Хива — города с богатой историей, где каждая мечеть, медресе и мавзолей рассказывают свою историю. Регистан в Самарканде, крепость Арк в Бухаре, Ичан-Кала в Хиве — известные достопримечательности.
                  </p>
                  <p className="text-base leading-relaxed">
                    Каждый город имеет свой характер и предлагает уникальный опыт. Древние города Шёлкового пути — это живая история, которую можно изучать бесконечно.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Архитектура</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Узбекистан славится своей архитектурой — мечети, медресе, мавзолеи, дворцы. Голубая мечеть в Самарканде, мавзолей Гур-Эмир, медресе Улугбека — известные памятники архитектуры.
                  </p>
                  <p className="text-base leading-relaxed">
                    Архитектура Узбекистана уникальна и красива. Можно изучать её бесконечно, наслаждаясь красотой и историей.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Культура и традиции</h3>
                  <p className="text-base leading-relaxed">
                    Узбекистан богат культурой и традициями. Традиционные фестивали, праздники — важная часть культуры. Узбекская музыка, танцы — важная часть культуры. Узбеки умеют сочетать традиции и современность, создавая уникальную культуру.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Узбекская кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Узбекская кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Узбекская кухня — одна из самых известных в мире. Плов, шашлык, манты, лагман — популярные блюда. Узбекская кухня известна своими специями, вкусами и ароматами. Местные рестораны предлагают вкусную традиционную кухню по низким ценам.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Узбекский плов — национальное блюдо, известное во всём мире. Узбекские сладости — халва, нават — популярны. Узбекская кухня разнообразна, вкусна и очень доступна. Многие экспаты отмечают, что еда в Узбекистане одна из лучших в регионе.
              </p>
              <p className="text-base leading-relaxed">
                Рестораны предлагают разнообразную кухню — от традиционной узбекской до интернациональной. Качество еды хорошее, цены доступные. Уличная еда в Узбекистане отличная и очень дешёвая.
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
                    Для граждан России виза не требуется для поездок до 60 дней. Для более длительного пребывания нужно оформить соответствующую визу. Правила могут меняться, поэтому стоит проверять актуальную информацию.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальный язык — узбекский. Многие узбеки говорят по-русски, особенно в крупных городах. Знание русского значительно упростит жизнь. Близость к России делает Узбекистан особенно понятным для русскоязычных.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
                  <p className="text-base leading-relaxed">
                    Узбекистан — безопасная страна с низким уровнем преступности. Можно чувствовать себя безопасно, особенно в крупных городах. Стоит соблюдать обычные меры предосторожности, как и в любой стране.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Климат в Узбекистане континентальный: жаркое лето (до 40°C) и холодная зима (до -10°C). В горах климат более прохладный. В целом климат комфортный для долгого пребывания, особенно весной и осенью.
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

export default Uzbekistan;
