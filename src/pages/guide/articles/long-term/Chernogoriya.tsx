import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Waves, Mountain, MapPin, Coffee, Heart, Info, DollarSign } from "lucide-react";

const Chernogoriya = () => {
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
          <span>Черногория</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Черногория: долгий отпуск на Адриатике</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=500&fit=crop" 
                  alt="Котор, Черногория" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Черногория — это маленькая страна с большой душой, где Адриатическое побережье встречается с горами. Здесь можно остановиться надолго, наслаждаясь красивой природой, чистым морем и спокойной атмосферой. Черногорцы известны своим гостеприимством, дружелюбием и спокойным отношением к жизни.
              </p>
              <p className="text-base leading-relaxed">
                От прибрежных городов до горных курортов, от пляжей до национальных парков — Черногория предлагает разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то пляжный отдых или активный отдых в горах.
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
                Черногория — это страна с неторопливым ритмом жизни, где принято наслаждаться моментом, не торопиться и ценить простые радости. Черногорцы известны своим гостеприимством, дружелюбием и спокойным отношением к жизни. Здесь принято не спешить, наслаждаться природой и общением с близкими.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Черногорская культура — это смесь балканских, средиземноморских и других влияний, создающая уникальную идентичность. Здесь сильны семейные ценности, традиции и уважение к природе. Черногорцы гордятся своей страной, её природой и историей, и с радостью делятся этим с гостями.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Черногории:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Спокойный ритм жизни — неторопливость и наслаждение моментом</li>
                  <li>Гостеприимство и дружелюбие — черногорцы всегда рады гостям</li>
                  <li>Любовь к природе — красивые пляжи, горы, национальные парки</li>
                  <li>Традиционная кухня — вкусная и сытная</li>
                  <li>Разнообразие — от побережья до гор</li>
                  <li>Мягкий климат — комфортно круглый год</li>
                  <li>Доступность — относительно недорогая страна</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Черногорцы очень дружелюбны и открыты к общению. Они с радостью делятся своей культурой и традициями. Многие экспаты отмечают, как легко здесь чувствовать себя комфортно благодаря дружелюбию местных и спокойной атмосфере.
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
                Подгорица — столица, современный город с развитой инфраструктурой. Котор — прибрежный город с красивой бухтой, популярен среди туристов и экспатов. Будва — прибрежный город с пляжами, популярен среди туристов. Герцег-Нови — прибрежный город на севере, известный своей архитектурой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Тиват — прибрежный город с аэропортом, популярен среди экспатов. Жабляк — горный курорт, популярен зимой и летом. Котор особенно популярен среди экспатов благодаря красоте и атмосфере. Прибрежные города привлекают любителей пляжного отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Черногории варьируется в зависимости от города. В прибрежных городах можно снять квартиру от 300-700 долларов в месяц, в столице дешевле. Многие экспаты предпочитают жить в прибрежных городах или в районах с красивой природой.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=500&fit=crop" 
                  alt="Черногория, горы и море" 
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
                Черногория — относительно доступная страна для долгосрочного пребывания. Аренда жилья разумная, еда в местных ресторанах доступна и вкусная. Продукты в супермаркетах качественные и недорогие. Транспорт развит, стоит дёшево.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Интернет в городах хороший, что важно для работы. Медицинское обслуживание качественное и доступное. Развлечения и услуги доступны по разным ценам — от бюджетных до роскошных.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Черногория — относительно доступная страна для долгосрочного пребывания. При относительно небольших расходах можно жить комфортно, наслаждаясь природой, морем и дружелюбием местных.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Курс евро может меняться, но в целом страна остаётся доступной. В туристических районах цены выше, чем в местных. Важно иметь медицинскую страховку.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Еда в Черногории отличная и доступная. Местные рестораны предлагают вкусную традиционную кухню по разумным ценам. Черногорская кухня сытная и вкусная. Рестораны для туристов дороже, но всё равно доступны.
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
                  <h3 className="text-xl font-semibold mb-2">Пляжи и побережье</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Черногория славится своими красивыми пляжами, чистой водой и живописными прибрежными городами. Котор, Будва, Герцег-Нови — каждый город имеет свой характер. Можно заниматься плаванием, дайвингом, снорклингом, яхтингом.
                  </p>
                  <p className="text-base leading-relaxed">
                    Пляжи красивые, вода чистая. Многие экспаты остаются в Черногории именно из-за пляжного образа жизни и возможности наслаждаться морем круглый год.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Горы и природа</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Черногория богата природой — от побережья до гор, от лесов до национальных парков. Дурмитор — национальный парк с красивыми горами и озёрами. Жабляк — горный курорт, популярен зимой и летом.
                  </p>
                  <p className="text-base leading-relaxed">
                    Природа Черногории разнообразна и красива в любое время года. Можно заниматься треккингом, альпинизмом, рафтингом. Многие экспаты отмечают красоту природы и возможности для активного отдыха.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Культура и история</h3>
                  <p className="text-base leading-relaxed">
                    Черногория богата культурой и историей. Котор — объект Всемирного наследия ЮНЕСКО, известный своей архитектурой. Монастыри, церкви, крепости — важная часть культуры. Черногорцы умеют сочетать традиции и современность.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Черногорская кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Черногорская кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Черногорская кухня — это сытная и вкусная еда. Чевапчичи, плескавица, борек — популярные блюда. Черногорская кухня известна своими вкусами и ароматами. Местные рестораны предлагают вкусную традиционную кухню по разумным ценам.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Черногорские сыры, вино — важная часть культуры. Черногорская кухня разнообразна, вкусна и доступна. Многие экспаты отмечают, что еда в Черногории отличная и недорогая.
              </p>
              <p className="text-base leading-relaxed">
                Рестораны предлагают разнообразную кухню — от традиционной черногорской до интернациональной. Качество еды хорошее, цены доступные. Морепродукты в прибрежных городах отличные и свежие.
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
                    Для граждан России виза не требуется для поездок до 30 дней. Для более длительного пребывания нужно оформить соответствующую визу. Правила могут меняться, поэтому стоит проверять актуальную информацию.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
                  <p className="text-base leading-relaxed">
                    Черногория — безопасная страна с низким уровнем преступности. Можно чувствовать себя безопасно, особенно в прибрежных городах. Стоит соблюдать обычные меры предосторожности, как и в любой стране.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальный язык — черногорский. Многие черногорцы говорят по-русски или по-английски, особенно в туристических местах. Знание русского или английского значительно упростит жизнь. Близость к России делает Черногорию особенно понятной для русскоязычных.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Климат в Черногории средиземноморский на побережье: жаркое лето (25-30°C) и мягкая зима (10-15°C). В горах климат более прохладный. В целом климат комфортный для долгого пребывания, особенно на побережье, где можно наслаждаться солнцем круглый год.
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

export default Chernogoriya;
