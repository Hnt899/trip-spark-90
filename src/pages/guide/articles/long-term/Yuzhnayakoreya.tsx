import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Coffee, Zap, Heart, Info, DollarSign } from "lucide-react";

const Yuzhnayakoreya = () => {
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
          <span>Южная Корея</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как живут в Южной Корее</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=500&fit=crop" 
                  alt="Сеул, Южная Корея" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Южная Корея — это страна высоких технологий, K-pop, вкусной еды и быстрого ритма жизни. Здесь можно остановиться надолго, наслаждаясь современностью, культурой и возможностями, которые предлагает эта динамичная страна. Корейцы известны своим трудолюбием, вежливостью и высоким уровнем культуры.
              </p>
              <p className="text-base leading-relaxed">
                От шумного Сеула до тихих провинциальных городов, от горных курортов до прибрежных городов — Южная Корея предлагает разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то активная городская жизнь или спокойная атмосфера в провинции.
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
                Южная Корея — одна из самых технологически развитых стран мира. Здесь отличный интернет, современная инфраструктура и высокий уровень жизни. Корейцы известны своим трудолюбием, вежливостью и высоким уровнем культуры. Здесь принято уважать традиции, но при этом быть открытым к новому.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Корейская культура — это смесь традиций и современности, создающая уникальную идентичность. Здесь сильны семейные ценности, традиции и уважение к старшим. Корейцы гордятся своей страной, её историей и культурой, и с радостью делятся этим с гостями.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Южной Корее:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Высокие технологии — отличный интернет, современная инфраструктура</li>
                  <li>Быстрый ритм жизни — динамичная и активная жизнь</li>
                  <li>Вежливость и уважение — корейцы очень вежливы</li>
                  <li>Любовь к еде — корейская кухня известна во всём мире</li>
                  <li>K-pop и культура — важная часть современной культуры</li>
                  <li>Высокое качество жизни — комфортно и удобно</li>
                  <li>Доступность — относительно недорогая страна</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Корейцы очень вежливы и уважительны. Они с радостью делятся своей культурой и традициями. Многие экспаты отмечают, как легко здесь чувствовать себя комфортно благодаря вежливости местных и высокому уровню безопасности.
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
                Сеул — столица, огромный мегаполис с развитой инфраструктурой, множеством возможностей для работы. Пусан — второй по величине город, портовый город с красивой набережной. Инчхон — город с аэропортом, популярен среди экспатов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Тэгу, Кванджу — крупные города, известные своей культурой. Чеджу — остров, популярен среди туристов и экспатов. Сеул особенно популярен среди экспатов благодаря возможностям и инфраструктуре. Прибрежные города привлекают любителей природы.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Южной Корее варьируется в зависимости от города. В Сеуле можно снять квартиру от 500-1000 долларов в месяц, в других городах дешевле. Многие экспаты предпочитают жить в центре города или в районах с хорошей инфраструктурой.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=500&fit=crop" 
                  alt="Южная Корея, современность" 
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
                Южная Корея — относительно доступная страна для долгосрочного пребывания. Аренда жилья разумная, еда в местных ресторанах доступна и вкусная. Продукты в супермаркетах качественные и недорогие. Транспорт развит, стоит дёшево.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Интернет в городах отличный, что важно для работы. Медицинское обслуживание качественное и доступное. Развлечения и услуги доступны по разным ценам — от бюджетных до роскошных.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Южная Корея предлагает высокое качество жизни при разумных расходах. Безопасность, инфраструктура, технологии делают её привлекательной для долгосрочного пребывания.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Курс корейской воны может меняться, но в целом страна остаётся доступной. В Сеуле цены выше, чем в других городах. Важно иметь медицинскую страховку.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Еда в Южной Корее отличная и доступная. Местные рестораны предлагают вкусную традиционную кухню по разумным ценам. Корейская кухня известна во всём мире. Рестораны для туристов дороже, но всё равно доступны.
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
                    Сеул — столица с богатой историей, множеством дворцов, храмов, музеев. Дворец Кёнбоккун, храм Чонмё, район Мёндон — известные достопримечательности. Пусан — портовый город с красивой набережной. Инчхон — город с аэропортом, популярен среди экспатов.
                  </p>
                  <p className="text-base leading-relaxed">
                    Тэгу, Кванджу — крупные города, известные своей культурой. Чеджу — остров, популярен среди туристов. Каждый город имеет свой характер и предлагает уникальный опыт. Сеул особенно популярен среди экспатов благодаря возможностям и инфраструктуре.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Природа</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Южная Корея богата природой — от гор до побережья, от лесов до островов. Национальные парки, горы, пляжи — возможности для активного отдыха. Чеджу — остров с красивой природой, популярен среди туристов.
                  </p>
                  <p className="text-base leading-relaxed">
                    Природа Южной Кореи разнообразна и красива в любое время года. Можно заниматься треккингом, наблюдением за птицами, посещением горячих источников. Многие экспаты отмечают красоту природы и возможности для активного отдыха.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Культура и K-pop</h3>
                  <p className="text-base leading-relaxed">
                    Южная Корея богата культурой и традициями. K-pop, K-drama — важная часть современной культуры. Храмы, дворцы, музеи — важная часть культуры. Корейцы умеют сочетать традиции и современность, создавая уникальную культуру.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Корейская кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Корейская кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Корейская кухня — одна из самых известных в мире. Кимчи, бибимбап, корейский барбекю — популярные блюда. Корейская кухня известна своими специями, вкусами и ароматами. Местные рестораны предлагают вкусную традиционную кухню по разумным ценам.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Кимчи — национальное блюдо, известное во всём мире. Корейская кухня разнообразна, вкусна и доступна. Многие экспаты отмечают, что еда в Южной Корее отличная и недорогая.
              </p>
              <p className="text-base leading-relaxed">
                Рестораны предлагают разнообразную кухню — от традиционной корейской до интернациональной. Качество еды хорошее, цены доступные. Уличная еда в Южной Корее отличная и очень дешёвая.
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
                    Южная Корея — одна из самых безопасных стран в Азии. Уровень преступности очень низкий. Можно чувствовать себя безопасно в любое время суток. Корейцы дружелюбны и готовы помочь.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальный язык — корейский. В туристических местах многие говорят по-английски, но знание корейского значительно упростит жизнь и общение с местными. Корейский язык имеет свои особенности, но базовые фразы легко выучить.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Климат в Южной Корее умеренный: жаркое и влажное лето (25-30°C) и холодная зима (0-5°C). В горах климат более прохладный. В целом климат комфортный для долгого пребывания, особенно весной и осенью.
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

export default Yuzhnayakoreya;
