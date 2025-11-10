import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Waves, Sun, MapPin, TreePine, Heart, Info, DollarSign, Coffee } from "lucide-react";

const ShriLanka = () => {
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
          <span>Шри-Ланка</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Шри-Ланка: долгий отпуск на волне</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=500&fit=crop" 
                  alt="Шри-Ланка, пляжи" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Шри-Ланка — это остров сёрфинга, чая, природы и древней культуры. Здесь можно остановиться надолго, наслаждаясь волнами, красивыми пляжами, горными районами и дружелюбными людьми. Шриланкийцы известны своим гостеприимством, улыбчивостью и спокойным отношением к жизни.
              </p>
              <p className="text-base leading-relaxed">
                От пляжных курортов до горных чайных плантаций, от древних храмов до национальных парков — Шри-Ланка предлагает разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то сёрфинг на побережье или спокойная атмосфера в горах.
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
                Шри-Ланка — это страна с неторопливым ритмом жизни, где принято наслаждаться моментом, не торопиться и ценить простые радости. Шриланкийцы известны своим гостеприимством, улыбчивостью и спокойным отношением к жизни. Здесь принято не спешить, наслаждаться природой и общением с близкими.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шриланкийская культура — это смесь буддизма, индуизма и других влияний, создающая уникальную идентичность. Здесь сильны семейные ценности, традиции и уважение к природе. Шриланкийцы гордятся своей страной, её историей и культурой, и с радостью делятся этим с гостями.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Шри-Ланке:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Спокойный ритм жизни — неторопливость и наслаждение моментом</li>
                  <li>Гостеприимство и улыбчивость — шриланкийцы всегда улыбаются</li>
                  <li>Любовь к природе — красивые пляжи, горы, чайные плантации</li>
                  <li>Традиционная кухня — вкусная и разнообразная</li>
                  <li>Буддизм — важная часть культуры</li>
                  <li>Тропический климат — комфортно круглый год</li>
                  <li>Доступность — относительно недорогая страна</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Шриланкийцы очень дружелюбны и открыты к общению. Они с радостью делятся своей культурой и традициями. Многие экспаты отмечают, как легко здесь чувствовать себя комфортно благодаря дружелюбию местных и спокойной атмосфере.
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
                Коломбо — столица, современный город с развитой инфраструктурой, множеством возможностей для работы. Галле — прибрежный город с красивой крепостью, популярен среди туристов и экспатов. Унаватуна, Мирисса — прибрежные города, популярны среди сёрферов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Канди — город в горах, известный храмом Зуба Будды. Элла — горный город, популярен среди туристов. Коломбо особенно популярен среди экспатов благодаря возможностям и инфраструктуре. Прибрежные города привлекают любителей сёрфинга и пляжного отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Шри-Ланке варьируется в зависимости от города. В Коломбо можно снять квартиру от 200-500 долларов в месяц, в прибрежных городах цены выше. Многие экспаты предпочитают жить в прибрежных городах или в районах с красивой природой.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=500&fit=crop" 
                  alt="Шри-Ланка, природа" 
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
                Шри-Ланка — очень доступная страна для долгосрочного пребывания. Аренда жилья очень недорогая, еда в местных ресторанах очень дешёвая и вкусная. Продукты в супермаркетах качественные и недорогие. Транспорт развит, стоит дёшево.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Интернет в городах хороший, что важно для работы. Медицинское обслуживание качественное и доступное. Развлечения и услуги доступны по разным ценам — от бюджетных до роскошных.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Шри-Ланка — очень доступная страна для долгосрочного пребывания. При относительно небольших расходах можно жить комфортно, наслаждаясь природой, пляжами и дружелюбием местных.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Курс шриланкийской рупии может меняться, но в целом страна остаётся очень доступной. В туристических районах цены выше, чем в местных. Важно иметь медицинскую страховку.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Еда в Шри-Ланке отличная и очень дешёвая. Местные рестораны предлагают вкусную традиционную кухню по низким ценам. Шриланкийская кухня разнообразна и вкусна. Рестораны для туристов дороже, но всё равно доступны.
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
                  <h3 className="text-xl font-semibold mb-2">Сёрфинг и пляжи</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Шри-Ланка — рай для сёрферов. Здесь есть отличные споты для всех уровней, красивая природа и спокойная атмосфера. Унаватуна, Мирисса, Аругам-Бей — популярные места для сёрфинга. Можно заниматься сёрфингом, дайвингом, снорклингом.
                  </p>
                  <p className="text-base leading-relaxed">
                    Пляжи красивые, вода тёплая круглый год. Многие экспаты остаются в Шри-Ланке именно из-за сёрфинга и пляжного образа жизни.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Горы и чайные плантации</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Шри-Ланка богата природой — от побережья до гор, от чайных плантаций до национальных парков. Канди, Элла — горные города, известные своей природой. Чайные плантации — важная часть культуры.
                  </p>
                  <p className="text-base leading-relaxed">
                    Природа Шри-Ланки разнообразна и красива в любое время года. Можно заниматься треккингом, наблюдением за дикой природой, посещением чайных плантаций. Многие экспаты отмечают красоту природы и возможности для активного отдыха.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Культура и история</h3>
                  <p className="text-base leading-relaxed">
                    Шри-Ланка богата культурой и историей. Храмы, монастыри, древние города — важная часть культуры. Буддизм — важная часть культуры. Шриланкийцы умеют сочетать традиции и современность, создавая уникальную культуру.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Шриланкийская кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Шриланкийская кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Шриланкийская кухня — это вкусная и разнообразная еда. Рис и карри, хопперы, котту роти — популярные блюда. Шриланкийская кухня известна своими специями, вкусами и ароматами. Местные рестораны предлагают вкусную традиционную кухню по низким ценам.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Шриланкийский чай — важная часть культуры, известен во всём мире. Фрукты в Шри-Ланке невероятно вкусные и разнообразные. Шриланкийская кухня разнообразна, вкусна и очень доступна. Многие экспаты отмечают, что еда в Шри-Ланке отличная и недорогая.
              </p>
              <p className="text-base leading-relaxed">
                Рестораны предлагают разнообразную кухню — от традиционной шриланкийской до интернациональной. Качество еды хорошее, цены доступные. Уличная еда в Шри-Ланке отличная и очень дешёвая.
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
                    Для граждан России виза не требуется для поездок до 30 дней. Для более длительного пребывания нужно оформить соответствующую визу. Есть также визы для работы и учёбы. Правила могут меняться, поэтому стоит проверять актуальную информацию.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
                  <p className="text-base leading-relaxed">
                    Шри-Ланка — относительно безопасная страна. Стоит соблюдать обычные меры предосторожности, особенно в крупных городах. В целом, шриланкийцы дружелюбны и готовы помочь.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальные языки — сингальский и тамильский. В туристических местах многие говорят по-английски, но знание местных языков значительно упростит жизнь и общение с местными.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Климат в Шри-Ланке тропический: жарко и влажно круглый год (25-30°C). В горах климат более прохладный. В целом климат комфортный для долгого пребывания, особенно на побережье, где можно наслаждаться солнцем круглый год.
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

export default ShriLanka;
