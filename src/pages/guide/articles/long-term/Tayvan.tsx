import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Coffee, Mountain, Heart, Info, DollarSign } from "lucide-react";

const Tayvan = () => {
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
          <span>Тайвань</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Тайвань глазами россиянки</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=500&fit=crop" 
                  alt="Тайбэй, Тайвань" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Тайвань — это остров, который сочетает традиционную китайскую культуру с современностью. Здесь можно остановиться надолго, наслаждаясь безопасностью, удобством, вкусной едой и красивой природой. Тайваньцы известны своим дружелюбием, вежливостью и высоким уровнем культуры.
              </p>
              <p className="text-base leading-relaxed">
                От современного Тайбэя до горных курортов, от прибрежных городов до исторических мест — Тайвань предлагает разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то активная городская жизнь или спокойная атмосфера в горах.
              </p>
            </CardContent>
          </Card>

          {/* Культура и образ жизни */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Культура и образ жизни</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Тайвань предлагает высокий уровень безопасности, отличную инфраструктуру, вкусную уличную еду и дружелюбных людей. Тайваньцы известны своим дружелюбием, вежливостью и высоким уровнем культуры. Здесь принято уважать традиции, но при этом быть открытым к новому.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Тайваньская культура — это смесь традиционной китайской культуры и современности, создающая уникальную идентичность. Здесь сильны семейные ценности, традиции и уважение к старшим. Тайваньцы гордятся своей страной, её историей и культурой, и с радостью делятся этим с гостями.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Тайване:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Высокий уровень безопасности — одна из самых безопасных стран в Азии</li>
                  <li>Отличная инфраструктура — современные технологии и удобства</li>
                  <li>Дружелюбность и вежливость — тайваньцы очень общительны</li>
                  <li>Любовь к еде — тайваньская кухня известна во всём мире</li>
                  <li>Традиции и современность — сочетание старого и нового</li>
                  <li>Высокое качество жизни — комфортно и удобно</li>
                  <li>Доступность — относительно недорогая страна</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Тайваньцы очень дружелюбны и открыты к общению. Они с радостью делятся своей культурой и традициями. Многие экспаты отмечают, как легко здесь чувствовать себя комфортно благодаря дружелюбию местных и высокому уровню безопасности.
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
                Тайбэй — столица, современный мегаполис с развитой инфраструктурой, множеством возможностей для работы. Гаосюн — второй по величине город, портовый город с красивой набережной. Тайчжун — город в центре острова, известный своей культурой и едой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Тайнань — исторический город, бывшая столица. Хуалянь — прибрежный город на востоке, известный красивой природой. Тайбэй особенно популярен среди экспатов благодаря возможностям и инфраструктуре. Прибрежные города привлекают любителей природы.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Тайване варьируется в зависимости от города. В Тайбэе можно снять квартиру от 500-1000 долларов в месяц, в других городах дешевле. Многие экспаты предпочитают жить в центре города или в районах с хорошей инфраструктурой.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=500&fit=crop" 
                  alt="Тайвань, природа" 
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
                Тайвань — относительно доступная страна для долгосрочного пребывания. Аренда жилья разумная, еда в местных ресторанах очень дешёвая и вкусная. Продукты в супермаркетах качественные и недорогие. Транспорт развит, стоит дёшево.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Интернет в городах отличный, что важно для работы. Медицинское обслуживание качественное и доступное. Развлечения и услуги доступны по разным ценам — от бюджетных до роскошных.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Тайвань предлагает высокое качество жизни при разумных расходах. Безопасность, инфраструктура, дружелюбие местных делают его привлекательным для долгосрочного пребывания.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Курс тайваньского доллара может меняться, но в целом страна остаётся доступной. В Тайбэе цены выше, чем в других городах. Важно иметь медицинскую страховку.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Еда в Тайване отличная и очень дешёвая. Уличная еда — одна из лучших в мире, очень вкусная и доступная. Местные рестораны предлагают вкусную традиционную кухню по низким ценам. Рестораны для туристов дороже, но всё равно доступны.
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
                    Тайбэй — столица с богатой историей, множеством храмов, музеев, небоскрёбов. Тайбэй 101, Национальный дворец-музей, храмы — известные достопримечательности. Гаосюн — портовый город с красивой набережной. Тайчжун — город в центре острова, известный своей культурой.
                  </p>
                  <p className="text-base leading-relaxed">
                    Тайнань — исторический город, бывшая столица. Каждый город имеет свой характер и предлагает уникальный опыт. Тайбэй особенно популярен среди экспатов благодаря возможностям и инфраструктуре.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Природа</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Тайвань славится своей природой — от гор до побережья, от лесов до горячих источников. Тароко — национальный парк с красивыми ущельями. Алишань — горный курорт, известный рассветами. Горячие источники — популярное место для отдыха.
                  </p>
                  <p className="text-base leading-relaxed">
                    Природа Тайваня разнообразна и красива в любое время года. Можно заниматься треккингом, наблюдением за птицами, велосипедными турами. Многие экспаты отмечают красоту природы и возможности для активного отдыха.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Культура и традиции</h3>
                  <p className="text-base leading-relaxed">
                    Тайвань богат культурой и традициями. Храмы, монастыри — важная часть культуры. Традиционные фестивали, праздники — важная часть культуры. Тайваньцы умеют сочетать традиции и современность, создавая уникальную культуру.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Тайваньская кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Тайваньская кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Тайваньская кухня — это вкусная и разнообразная еда. Уличная еда в Тайване отличная и очень дешёвая. Боба, даньцзымянь, гуабао — популярные блюда. Тайваньская кухня известна своими вкусами и ароматами.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Фрукты в Тайване невероятно вкусные и разнообразные. Тайваньская кухня разнообразна, вкусна и очень доступна. Многие экспаты отмечают, что еда в Тайване одна из лучших в Азии.
              </p>
              <p className="text-base leading-relaxed">
                Рестораны предлагают разнообразную кухню — от традиционной тайваньской до интернациональной. Качество еды хорошее, цены доступные. Уличная еда в Тайване — это отдельный опыт, который стоит попробовать.
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
                    Для граждан России виза не требуется для поездок до 14 дней. Для более длительного пребывания нужно оформить соответствующую визу. Есть также визы для работы и учёбы. Правила могут меняться, поэтому стоит проверять актуальную информацию.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
                  <p className="text-base leading-relaxed">
                    Тайвань — одна из самых безопасных стран в Азии. Уровень преступности очень низкий. Можно чувствовать себя безопасно в любое время суток. Тайваньцы дружелюбны и готовы помочь.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальный язык — китайский (мандарин). В туристических местах многие говорят по-английски, но знание китайского значительно упростит жизнь и общение с местными. Тайваньский китайский имеет свои особенности в произношении.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Климат в Тайване субтропический: жаркое и влажное лето (25-35°C) и мягкая зима (15-20°C). В горах климат более прохладный. В целом климат комфортный для долгого пребывания, особенно весной и осенью.
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

export default Tayvan;
