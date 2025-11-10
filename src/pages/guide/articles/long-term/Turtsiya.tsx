import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Coffee, Heart, Info, DollarSign, Sun } from "lucide-react";

const Turtsiya = () => {
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
          <span>Турция</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Турция: долгий отпуск на стыке Европы и Азии</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=500&fit=crop" 
                  alt="Стамбул, Турция" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Турция — это страна на стыке Европы и Азии, где Восток встречается с Западом. Здесь можно остановиться надолго, наслаждаясь богатой историей, красивой природой, вкусной едой и гостеприимством местных жителей. Турки известны своим гостеприимством, дружелюбием и открытостью.
              </p>
              <p className="text-base leading-relaxed">
                От шумного Стамбула до тихих прибрежных городов, от горных курортов до пляжных курортов — Турция предлагает разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то активная городская жизнь или спокойная атмосфера на побережье.
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
                Турция — это страна с богатой историей и культурой, где Восток встречается с Западом. Турки известны своим гостеприимством, дружелюбием и открытостью. Здесь принято не торопиться, наслаждаться моментом и ценить общение с близкими.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Турецкая культура — это смесь османских, византийских и других влияний, создающая уникальную идентичность. Здесь сильны семейные ценности, традиции и уважение к старшим. Турки гордятся своей страной, её историей и культурой, и с радостью делятся этим с гостями.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Турции:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Гостеприимство — турки всегда рады гостям</li>
                  <li>Любовь к чаю — чайная культура важна</li>
                  <li>Традиционная кухня — турецкая кухня известна во всём мире</li>
                  <li>Богатая история — множество исторических мест</li>
                  <li>Разнообразие — от гор до побережья</li>
                  <li>Мягкий климат — комфортно круглый год</li>
                  <li>Доступность — относительно недорогая страна</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Турки очень дружелюбны и открыты к общению. Они с радостью делятся своей культурой и традициями. Многие экспаты отмечают, как легко здесь чувствовать себя комфортно благодаря дружелюбию местных и богатой культуре.
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
                Стамбул — крупнейший город, расположенный на двух континентах, с богатой историей и развитой инфраструктурой. Анталья, Бодрум, Мармарис — прибрежные города на Средиземном и Эгейском морях, популярны среди экспатов и туристов. Анкара — столица, современный город с развитой инфраструктурой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Измир — третий по величине город, портовый город с красивой набережной. Каппадокия — регион с уникальной природой, популярен среди туристов. Стамбул особенно популярен среди экспатов благодаря возможностям и инфраструктуре. Прибрежные города привлекают любителей пляжного отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Турции варьируется в зависимости от города. В Стамбуле можно снять квартиру от 300-700 долларов в месяц, в прибрежных городах цены выше. Многие экспаты предпочитают жить в центре города или в районах с хорошей инфраструктурой.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=500&fit=crop" 
                  alt="Турция, природа" 
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
                Турция — относительно доступная страна для долгосрочного пребывания. Аренда жилья недорогая, еда в местных ресторанах очень дешёвая и вкусная. Продукты в супермаркетах качественные и недорогие. Транспорт развит, стоит дёшево.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Интернет в городах хороший, что важно для работы. Медицинское обслуживание качественное и доступное. Развлечения и услуги доступны по разным ценам — от бюджетных до роскошных.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Турция — относительно доступная страна для долгосрочного пребывания. При относительно небольших расходах можно жить комфортно, наслаждаясь культурой, природой и дружелюбием местных.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Курс турецкой лиры может меняться, но в целом страна остаётся доступной. В туристических районах цены выше, чем в местных. Важно иметь медицинскую страховку.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Еда в Турции отличная и очень дешёвая. Местные рестораны предлагают вкусную традиционную кухню по низким ценам. Турецкая кухня известна во всём мире. Рестораны для туристов дороже, но всё равно доступны.
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
                    Стамбул — город на двух континентах, с богатой историей, множеством мечетей, дворцов, музеев. Собор Святой Софии, Голубая мечеть, дворец Топкапы — известные достопримечательности. Анкара — столица, современный город. Измир — портовый город с красивой набережной.
                  </p>
                  <p className="text-base leading-relaxed">
                    Каппадокия — регион с уникальной природой, пещерными городами и воздушными шарами. Эфес — древний город, объект Всемирного наследия ЮНЕСКО. Каждый город имеет свой характер и предлагает уникальный опыт.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Пляжи и природа</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Турция славится своими пляжами на Средиземном и Эгейском морях. Анталья, Бодрум, Мармарис — популярные места для пляжного отдыха. Можно заниматься сёрфингом, дайвингом, снорклингом, яхтингом.
                  </p>
                  <p className="text-base leading-relaxed">
                    Природа Турции разнообразна — от гор до побережья, от лесов до пустынь. Можно заниматься треккингом, наблюдением за птицами, рафтингом. Природа Турции красива в любое время года.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Культура и традиции</h3>
                  <p className="text-base leading-relaxed">
                    Турция богата культурой и традициями. Мечети, дворцы, музеи — важная часть культуры. Традиционные фестивали, праздники — важная часть культуры. Турецкая баня, чайная культура — популярные традиции. Турки умеют сочетать традиции и современность.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Турецкая кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Турецкая кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Турецкая кухня — одна из самых известных в мире. Кебаб, дёнер, баклава, турецкий чай — популярные блюда и напитки. Турецкая кухня известна своими специями, вкусами и ароматами. Местные рестораны предлагают вкусную традиционную кухню по низким ценам.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Турецкие сладости — баклава, лукум, халва — известны во всём мире. Турецкий чай — важная часть культуры, его пьют много и часто. Турецкая кухня разнообразна, вкусна и очень доступна. Многие экспаты отмечают, что еда в Турции одна из лучших в регионе.
              </p>
              <p className="text-base leading-relaxed">
                Рестораны предлагают разнообразную кухню — от традиционной турецкой до интернациональной. Качество еды хорошее, цены доступные. Уличная еда в Турции отличная и очень дешёвая.
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
                    Для граждан России виза не требуется для поездок до 60 дней. Для более длительного пребывания нужно оформить соответствующую визу. Есть также визы для работы и учёбы. Правила могут меняться, поэтому стоит проверять актуальную информацию.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
                  <p className="text-base leading-relaxed">
                    Турция — относительно безопасная страна. Стоит соблюдать обычные меры предосторожности, особенно в крупных городах. В целом, турки дружелюбны и готовы помочь.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальный язык — турецкий. В туристических местах многие говорят по-английски, но знание турецкого значительно упростит жизнь и общение с местными. Турецкий язык имеет свои особенности, но базовые фразы легко выучить.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Климат в Турции разнообразен: на побережье средиземноморский (жаркое лето, мягкая зима), в горах континентальный. В целом климат комфортный для долгого пребывания, особенно на побережье, где можно наслаждаться солнцем круглый год.
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

export default Turtsiya;
