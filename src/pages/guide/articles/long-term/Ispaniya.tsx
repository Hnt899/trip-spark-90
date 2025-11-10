import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, MapPin, Coffee, Waves, Heart, Info, DollarSign } from "lucide-react";

const Ispaniya = () => {
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
          <span>Испания</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как живут в Испании</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=500&fit=crop" 
                  alt="Барселона, Испания" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Испания — это страна солнца, сиесты, вкусной еды и размеренной жизни. Испанцы умеют наслаждаться каждым моментом, ценить общение с друзьями и семьёй, и не торопиться.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Жизнь в Испании — это баланс между работой и отдыхом, где послеобеденная сиеста и долгие вечерние прогулки — это неотъемлемая часть культуры. Испанцы умеют наслаждаться каждым моментом, ценить общение с друзьями и семьёй, и не торопиться.
              </p>
              <p className="text-base leading-relaxed">
                От средиземноморского побережья до горных регионов, от современных мегаполисов до живописных деревень — Испания предлагает разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то активная городская жизнь или спокойная атмосфера на побережье.
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
                Испанцы живут по своему ритму: поздний обед, сиеста, поздний ужин и активная вечерняя жизнь. Здесь принято много времени проводить на улице, в кафе и ресторанах, общаться с друзьями. Испанская культура — это культура общения, где социальные связи очень важны.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Испанцы известны своим дружелюбием, открытостью и жизнерадостностью. Здесь принято наслаждаться жизнью, праздновать, проводить время с близкими. Фестивали, праздники, карнавалы — важная часть испанской культуры. Каждый регион имеет свои традиции и особенности.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Испании:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Сиеста — послеобеденный отдых, особенно в небольших городах</li>
                  <li>Поздние обеды (14-15 часов) и ужины (21-22 часа)</li>
                  <li>Активная вечерняя жизнь — прогулки, тапас, общение</li>
                  <li>Любовь к фестивалям и праздникам — каждый город имеет свои</li>
                  <li>Общение и социальная активность — испанцы очень общительны</li>
                  <li>Любовь к футболу — это не просто спорт, а часть культуры</li>
                  <li>Размеренный темп жизни — меньше спешки, больше наслаждения</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Испанцы очень дружелюбны и открыты к общению. Они с радостью делятся своей культурой и традициями. Многие экспаты отмечают, как легко здесь заводить знакомства и чувствовать себя частью сообщества. Испанский образ жизни — это баланс между работой и отдыхом, где отдых не менее важен, чем работа.
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
                Барселона — столица Каталонии, привлекает творческих людей, стартаперов и экспатов. Здесь красивая архитектура (включая работы Гауди), пляжи, активная культурная жизнь, множество кафе и ресторанов. Районы Грасия, Эшампле, Борн популярны среди экспатов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Мадрид — столица Испании, деловой и культурный центр. Здесь множество музеев, галереи, театры, отличная инфраструктура. Валенсия — прибрежный город с красивой архитектурой, пляжами и развитой инфраструктурой. Севилья — столица Андалусии, известная своей архитектурой, фламенко и атмосферой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Испании варьируется в зависимости от города. В Барселоне и Мадриде цены выше (600-1200 евро в месяц), в других городах дешевле. Многие экспаты предпочитают жить в центре города или в районах с хорошей транспортной доступностью. Прибрежные города привлекают любителей пляжного отдыха.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=500&fit=crop" 
                  alt="Испания, архитектура и пляжи" 
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
                Стоимость жизни в Испании умеренная по сравнению с другими западноевропейскими странами. Аренда жилья — основная статья расходов. Еда в супермаркетах качественная и относительно недорогая. Рестораны доступны, особенно если есть в местах для местных, а не в туристических.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Общественный транспорт развит хорошо, стоит разумно. Многие предпочитают велосипед или ходьбу. Интернет быстрый и надёжный. Медицинское обслуживание качественное, покрывается страховкой. Образование высокого качества, многие университеты предлагают программы на английском.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Испания предлагает высокое качество жизни при разумных расходах. Климат отличный, еда вкусная, люди дружелюбны. Это делает Испанию привлекательной для долгосрочного пребывания.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Цены различаются по регионам — крупные города дороже. Налоги умеренные. Важно иметь медицинскую страховку для долгосрочного пребывания.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Продукты в супермаркетах качественные, особенно фрукты, овощи, оливковое масло, вино. Испанская кухня разнообразна и доступна. Тапас-бары предлагают вкусную еду по разумным ценам. Качество жизни высокое при относительно умеренных расходах.
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
                  <h3 className="text-xl font-semibold mb-2">Крупные города</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Барселона — город Гауди, с красивой архитектурой, пляжами, активной культурной жизнью. Мадрид — столица с музеями (Прадо, Рейна София), галереями, театрами. Севилья — столица Андалусии с архитектурой, фламенко, атмосферой. Валенсия — прибрежный город с современной архитектурой и пляжами.
                  </p>
                  <p className="text-base leading-relaxed">
                    Гранада — город с Альгамброй, красивейшим мавританским дворцом. Кордова — город с великолепной мечетью-собором. Толедо — исторический город с богатой историей. Каждый город имеет свой характер и предлагает уникальный опыт.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Побережье и пляжи</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Испания славится своими пляжами — от Средиземного моря до Атлантического океана. Коста-дель-Соль, Коста-Брава, Коста-Бланка — популярные прибрежные регионы. Можно заниматься водными видами спорта, наслаждаться солнцем и морем.
                  </p>
                  <p className="text-base leading-relaxed">
                    Балеарские острова (Майорка, Ибица) и Канарские острова предлагают тропический климат и красивые пляжи круглый год. Многие экспаты выбирают прибрежные города для долгосрочного пребывания, наслаждаясь климатом и образом жизни.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Культура и фестивали</h3>
                  <p className="text-base leading-relaxed">
                    Испания богата культурой и традициями. Фламенко, коррида (в некоторых регионах), фестивали — важная часть культуры. Ла Томатина, Сан-Фермин, Фальяс — известные фестивали. Музеи, галереи, театры — культурная жизнь очень активна. Испанцы умеют праздновать и наслаждаться жизнью.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Испанская кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Испанская кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Испанская кухня разнообразна и вкусна. Тапас — маленькие закуски, которые едят в барах, это не просто еда, а социальный опыт. Паэлья — рисовое блюдо с морепродуктами или мясом, особенно популярна в Валенсии. Хамон — вяленый окорок, деликатес Испании.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Каждый регион имеет свои кулинарные традиции. Гаспачо — холодный суп из томатов, популярен в Андалусии. Тортилья — омлет с картофелем. Чуррос — сладкие палочки, популярные на завтрак. Испанцы любят есть вместе, пробовать разные блюда и наслаждаться едой как социальным опытом.
              </p>
              <p className="text-base leading-relaxed">
                Вино — важная часть испанской кухни. Риоха, Рибера-дель-Дуэро — известные винодельческие регионы. Сангрия — популярный коктейль. Испанская кухня разнообразна, вкусна и доступна. Многие экспаты отмечают, что еда в Испании одна из лучших в Европе.
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
                    Для граждан России нужна шенгенская виза для поездок в Испанию. Для долгосрочного пребывания нужно оформить национальную визу и вид на жительство. Есть также визы для инвесторов и предпринимателей. Правила могут меняться, поэтому стоит проверять актуальную информацию.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальный язык — испанский, но в Каталонии также говорят на каталанском, в Галисии — на галисийском, в Стране Басков — на баскском. В туристических местах многие говорят по-английски, но для долгосрочного пребывания знание испанского очень важно.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
                  <p className="text-base leading-relaxed">
                    Испания — безопасная страна с низким уровнем преступности. Стоит соблюдать обычные меры предосторожности, особенно в крупных городах и туристических местах. В целом, можно чувствовать себя безопасно.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Климат в Испании разнообразен: на побережье средиземноморский (тёплое лето, мягкая зима), в центре континентальный (жаркое лето, холодная зима). В целом климат комфортный для долгого пребывания, особенно на побережье, где можно наслаждаться солнцем круглый год.
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

export default Ispaniya;
