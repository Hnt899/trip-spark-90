import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Coffee, MapPin, Building2, Heart, Info, DollarSign } from "lucide-react";

const Serbiya = () => {
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
          <span>Сербия</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Сербия: долгий отпуск в стиле полако</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop" 
                  alt="Белград, Сербия" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Сербия — это страна с неторопливым ритмом жизни, где «полако» (медленно, не спеша) — это не просто слово, а философия жизни. Здесь можно остановиться надолго, наслаждаясь спокойной атмосферой, вкусной едой и дружелюбными людьми. Сербы известны своим гостеприимством, дружелюбием и умением наслаждаться жизнью.
              </p>
              <p className="text-base leading-relaxed">
                От столицы Белграда до горных курортов, от винодельческих регионов до исторических городов — Сербия предлагает разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то активная городская жизнь или спокойная атмосфера в небольших городах.
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
                В Сербии принято не торопиться, наслаждаться моментом, долго сидеть в кафе, общаться с друзьями и не спешить. Это создаёт особую расслабленную атмосферу. Сербы известны своим гостеприимством, дружелюбием и умением наслаждаться простыми радостями жизни.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Сербская культура — это смесь балканских, славянских и других влияний, создающая уникальную идентичность. Здесь сильны семейные ценности, традиции и уважение к старшим. Сербы гордятся своей страной, её историей и культурой, и с радостью делятся этим с гостями.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Сербии:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Философия «полако» — не торопиться, наслаждаться моментом</li>
                  <li>Гостеприимство и дружелюбие — сербы всегда рады гостям</li>
                  <li>Любовь к кафе — долгие посиделки с друзьями</li>
                  <li>Традиционная кухня — вкусная и сытная</li>
                  <li>Любовь к музыке — народная музыка и рок</li>
                  <li>Размеренный темп жизни — меньше спешки</li>
                  <li>Доступность — очень недорогая страна</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Сербы очень общительны и любят проводить время с друзьями и семьёй. Кафе — важная часть социальной жизни, где люди встречаются, общаются и наслаждаются моментом. Многие экспаты отмечают, как легко здесь чувствовать себя комфортно благодаря дружелюбию местных и философии «полако».
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
                Белград — столица, расположенная на слиянии рек Савы и Дуная, с богатой историей и активной ночной жизнью. Здесь множество кафе, ресторанов, клубов, развитая инфраструктура. Нови-Сад — второй по величине город, известный фестивалем EXIT и красивой архитектурой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ниш — исторический город с богатой историей. Златибор — горный курорт, популярен зимой и летом. Белград особенно популярен среди экспатов благодаря возможностям и инфраструктуре. Небольшие города привлекают любителей спокойной атмосферы.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Сербии очень доступна. В Белграде можно снять квартиру от 200-500 долларов в месяц, в других городах дешевле. Многие экспаты предпочитают жить в центре города или в районах с хорошей инфраструктурой.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop" 
                  alt="Сербия, природа" 
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
                Сербия — очень доступная страна для долгосрочного пребывания. Аренда жилья очень недорогая, еда в местных ресторанах очень дешёвая и вкусная. Продукты в супермаркетах качественные и недорогие. Транспорт развит, стоит дёшево.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Интернет в городах хороший, что важно для работы. Медицинское обслуживание качественное и доступное. Развлечения и услуги доступны по разным ценам — от бюджетных до роскошных.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Сербия — очень доступная страна для долгосрочного пребывания. При относительно небольших расходах можно жить комфортно, наслаждаясь культурой, едой и дружелюбием местных.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Курс сербского динара может меняться, но в целом страна остаётся очень доступной. Близость к России делает Сербию особенно привлекательной для русскоязычных.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Еда в Сербии отличная и очень дешёвая. Местные рестораны предлагают вкусную традиционную кухню по низким ценам. Кафе многочисленны и предлагают отличную атмосферу. Рестораны для туристов дороже, но всё равно доступны.
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
                    Белград — столица с богатой историей, крепостью Калемегдан, множеством кафе, ресторанов, клубов. Нови-Сад — второй по величине город, известный фестивалем EXIT и красивой архитектурой. Ниш — исторический город с крепостью и памятниками.
                  </p>
                  <p className="text-base leading-relaxed">
                    Каждый город имеет свой характер и предлагает уникальный опыт. Белград особенно популярен среди экспатов благодаря активной ночной жизни и возможностям.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Природа</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Сербия славится своей природой — от гор до рек, от лесов до равнин. Златибор — горный курорт, популярен зимой и летом. Национальные парки предлагают возможности для треккинга и наслаждения природой.
                  </p>
                  <p className="text-base leading-relaxed">
                    Реки Дунай и Сава предлагают возможности для водных видов спорта. Природа Сербии разнообразна и красива в любое время года. Многие экспаты отмечают красоту природы и возможности для активного отдыха.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Культура и фестивали</h3>
                  <p className="text-base leading-relaxed">
                    Сербия богата культурой и традициями. Фестиваль EXIT в Нови-Саде — один из крупнейших музыкальных фестивалей в Европе. Народная музыка, рок — важная часть культуры. Музеи, галереи, театры — культурная жизнь активна, особенно в Белграде.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Сербская кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Сербская кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Сербская кухня — это сытная и вкусная еда. Плескавица — сербский бургер, популярное блюдо. Чевапчичи — колбаски, популярные на гриле. Борек — пирог с различными начинками. Ракия — крепкий алкогольный напиток, популярный в Сербии.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Сарма — голубцы, популярное блюдо. Гибаница — сладкий пирог с сыром. Сербская кухня сытная, вкусная и очень доступная. Многие экспаты отмечают, что еда в Сербии отличная и недорогая.
              </p>
              <p className="text-base leading-relaxed">
                Рестораны предлагают разнообразную кухню — от традиционной сербской до интернациональной. Качество еды хорошее, цены доступные. Кафе многочисленны и предлагают отличную атмосферу для общения.
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
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальный язык — сербский. Многие сербы говорят по-русски или по-английски, особенно в крупных городах. Знание русского или английского значительно упростит жизнь. Близость к России делает Сербию особенно понятной для русскоязычных.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
                  <p className="text-base leading-relaxed">
                    Сербия — безопасная страна с низким уровнем преступности. Можно чувствовать себя безопасно, особенно в крупных городах. Стоит соблюдать обычные меры предосторожности, как и в любой стране.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Климат в Сербии континентальный: жаркое лето (до 30°C) и холодная зима (до -10°C). В горах климат более прохладный. В целом климат комфортный для долгого пребывания, особенно летом, когда можно наслаждаться природой и активным отдыхом.
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

export default Serbiya;
