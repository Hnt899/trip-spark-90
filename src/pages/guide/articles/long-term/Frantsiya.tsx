import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Coffee, Wine, Heart, Info, DollarSign } from "lucide-react";

const Frantsiya = () => {
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
          <span>Франция</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как живут во Франции</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop" 
                  alt="Париж, Франция" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Франция — это страна искусства, культуры, вина и особого образа жизни. Французы ценят качество, эстетику и умение наслаждаться жизнью. Здесь можно остановиться надолго, погружаясь в французскую культуру и образ жизни. Французы известны своим умением наслаждаться каждым моментом, ценить качество и красоту.
              </p>
              <p className="text-base leading-relaxed">
                От шумного Парижа до тихих провинциальных городков, от альпийских курортов до средиземноморского побережья — Франция предлагает разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то активная городская жизнь или спокойная атмосфера в провинции.
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
                Французы умеют наслаждаться жизнью: долгие обеды, качественная еда, вино, искусство и культура — это неотъемлемая часть их жизни. Французы известны своим умением наслаждаться каждым моментом, ценить качество и красоту. Здесь принято не торопиться, наслаждаться моментом и ценить простые радости.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Французская культура — это смесь традиций и современности, создающая уникальную идентичность. Здесь сильны семейные ценности, традиции и уважение к искусству. Французы гордятся своей страной, её историей и культурой, и с радостью делятся этим с гостями.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни во Франции:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Умение наслаждаться жизнью — долгие обеды, вино, искусство</li>
                  <li>Ценность качества — качественная еда, вино, продукты</li>
                  <li>Любовь к искусству и культуре — музеи, театры, галереи</li>
                  <li>Традиционная кухня — французская кухня известна во всём мире</li>
                  <li>Разнообразие — от городов до провинции</li>
                  <li>Мягкий климат — комфортно круглый год</li>
                  <li>Высокое качество жизни — комфортно и удобно</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Французы очень ценят качество и эстетику. Они умеют наслаждаться каждым моментом, будь то обед в ресторане, прогулка по городу или посещение музея. Многие экспаты отмечают, как легко здесь чувствовать себя комфортно благодаря французскому образу жизни.
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
                Париж — столица, город искусства и культуры, с развитой инфраструктурой, множеством возможностей для работы. Лион — второй по величине город, известный своей кухней и историей. Марсель — портовый город на Средиземном море, популярен среди экспатов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ницца, Канны — прибрежные города на Лазурном берегу, популярны среди туристов и экспатов. Бордо — город вина, известный своими винодельнями. Тулуза — город на юге, известный своей архитектурой. Париж особенно популярен среди экспатов благодаря возможностям и инфраструктуре. Прибрежные города привлекают любителей пляжного отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья во Франции варьируется в зависимости от города. В Париже можно снять квартиру от 800-1500 долларов в месяц, в других городах дешевле. Многие экспаты предпочитают жить в центре города или в районах с хорошей инфраструктурой.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop" 
                  alt="Франция, провинция" 
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
                Франция — страна с высоким уровнем жизни, но и высокими расходами. Аренда жилья дорогая, особенно в Париже. Еда в ресторанах качественная, но дорогая. Продукты в супермаркетах качественные, но дороже, чем в других странах. Транспорт развит, стоит разумно.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Интернет в городах отличный, что важно для работы. Медицинское обслуживание качественное, покрывается страховкой. Развлечения и услуги доступны по разным ценам — от бюджетных до роскошных.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Франция предлагает высокое качество жизни. Безопасность, инфраструктура, культура, искусство делают её привлекательной для долгосрочного пребывания.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Расходы во Франции высокие, особенно в Париже. Важно иметь медицинскую страховку. Качество жизни высокое, но требует соответствующих расходов.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Еда во Франции отличная и качественная. Местные рестораны предлагают вкусную традиционную кухню, но цены высокие. Французская кухня известна во всём мире. Продукты в супермаркетах качественные, но дороже, чем в других странах.
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
                    Париж — столица с богатой историей, множеством музеев, галереи, театры. Эйфелева башня, Лувр, Нотр-Дам — известные достопримечательности. Лион — город с богатой историей и кухней. Марсель — портовый город на Средиземном море.
                  </p>
                  <p className="text-base leading-relaxed">
                    Бордо — город вина, известный своими винодельнями. Тулуза — город на юге, известный своей архитектурой. Каждый город имеет свой характер и предлагает уникальный опыт. Париж особенно популярен среди экспатов благодаря возможностям и инфраструктуре.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Искусство и культура</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Франция славится своим искусством и культурой. Лувр, Орсе, Центр Помпиду — известные музеи. Театры, оперы, концертные залы — культурная жизнь активна, особенно в Париже.
                  </p>
                  <p className="text-base leading-relaxed">
                    Французское искусство, литература, кино — важная часть культуры. Можно изучать искусство и культуру бесконечно, наслаждаясь богатством французской культуры.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Природа и вино</h3>
                  <p className="text-base leading-relaxed">
                    Франция богата природой — от альпийских гор до средиземноморского побережья, от виноградников до лесов. Винные регионы — Бордо, Бургундия, Шампань — популярны среди туристов. Можно наслаждаться природой, вином и французским образом жизни.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Французская кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Французская кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Французская кухня — одна из самых известных в мире. Круассаны, багеты, сыры, вино — популярные блюда и напитки. Французская кухня известна своими вкусами, ароматами и качеством. Местные рестораны предлагают вкусную традиционную кухню, но цены высокие.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Французские сыры, вино — важная часть культуры. Французская кухня разнообразна, вкусна и качественна. Многие экспаты отмечают, что еда во Франции одна из лучших в мире.
              </p>
              <p className="text-base leading-relaxed">
                Рестораны предлагают разнообразную кухню — от традиционной французской до интернациональной. Качество еды отличное, но цены высокие. Французская кухня — это искусство, которое стоит попробовать.
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
                    Для граждан России требуется виза для поездок во Францию. Для более длительного пребывания нужно оформить соответствующую визу. Есть также визы для работы и учёбы. Правила могут меняться, поэтому стоит проверять актуальную информацию.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
                  <p className="text-base leading-relaxed">
                    Франция — безопасная страна с низким уровнем преступности. Стоит соблюдать обычные меры предосторожности, особенно в крупных городах. В целом, можно чувствовать себя безопасно.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальный язык — французский. В туристических местах многие говорят по-английски, но знание французского значительно упростит жизнь и общение с местными. Французский язык имеет свои особенности, но базовые фразы легко выучить.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Климат во Франции умеренный: мягкое лето (20-25°C) и прохладная зима (5-10°C). На побережье климат более мягкий. В горах климат более прохладный. В целом климат комфортный для долгого пребывания, особенно весной и осенью.
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

export default Frantsiya;
