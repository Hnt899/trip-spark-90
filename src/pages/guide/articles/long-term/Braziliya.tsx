import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, MapPin, Music, Coffee, Info, Heart, DollarSign } from "lucide-react";

const Braziliya = () => {
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
          <span>Бразилия</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как живут в Бразилии</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=500&fit=crop" 
                  alt="Рио-де-Жанейро, Бразилия" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Бразилия — это страна контрастов, где роскошь соседствует с бедностью, а современные мегаполисы граничат с дикими джунглями. Жизнь в Бразилии полна энергии, музыки, танцев и позитивного отношения к жизни.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Бразильцы известны своим оптимизмом, открытостью и любовью к жизни, несмотря на все трудности. Жизнь здесь полна энергии, музыки, танцев и позитивного отношения к каждому дню. Бразилия — это страна, где празднуют жизнь каждый день, а не только по особым случаям.
              </p>
              <p className="text-base leading-relaxed">
                От тропических пляжей до шумных мегаполисов, от джунглей Амазонки до современных городов — Бразилия предлагает невероятное разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то спокойная пляжная жизнь или активная городская.
              </p>
            </CardContent>
          </Card>

          {/* Культура и образ жизни */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Music className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Культура и ритм жизни</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Бразилия — это страна музыки, карнавала и футбола. Здесь принято встречаться с друзьями, ходить на пляжи, слушать самбу и босса-нову, и наслаждаться каждым моментом жизни. Бразильцы очень общительны и открыты, легко заводят знакомства и всегда готовы помочь.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ритм жизни в Бразилии более расслабленный, чем в Европе или США. Здесь принято не торопиться, наслаждаться общением и проводить время с близкими. Пляжи — это не просто место для отдыха, а центр социальной жизни, где люди встречаются, общаются, играют в волейбол и наслаждаются закатами.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Бразилии:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Любовь к музыке и танцам — самба, форро, босса-нова звучат повсюду</li>
                  <li>Активная социальная жизнь — бразильцы любят собираться вместе</li>
                  <li>Пляжная культура — пляжи как место для встреч и отдыха</li>
                  <li>Страсть к футболу — это не просто спорт, а часть национальной идентичности</li>
                  <li>Карнавалы и праздники — бразильцы умеют праздновать</li>
                  <li>Дружелюбность и открытость — легко заводить знакомства</li>
                  <li>Размеренный темп жизни — меньше спешки, больше наслаждения моментом</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Бразильская культура очень разнообразна, что отражается в музыке, еде, традициях. Каждый регион имеет свои особенности, но общее — это жизнерадостность и открытость бразильцев. Иностранцы часто отмечают, как легко здесь чувствовать себя частью сообщества.
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
                Рио-де-Жанейро — один из самых красивых городов мира, где горы встречаются с океаном. Здесь можно жить в разных районах: Ипанема и Копакабана — популярные пляжные районы, Санта-Тереза — богемный район с колониальной архитектурой, Ботафого — более спокойный район с хорошей инфраструктурой. Рио предлагает активную ночную жизнь, множество ресторанов и культурных мероприятий.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Сан-Паулу — крупнейший город Бразилии, деловой и культурный центр. Здесь множество возможностей для работы, отличная инфраструктура, рестораны мирового уровня и активная культурная жизнь. Флорианополис — остров с красивыми пляжами, популярен среди цифровых кочевников и любителей сёрфинга. Сальвадор — исторический город с африканским влиянием, богатой культурой и музыкой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Бразилии варьируется в зависимости от города и района. В Рио и Сан-Паулу цены выше, чем в других городах. Можно снять квартиру или комнату, есть варианты на любой бюджет. Многие экспаты предпочитают жить в пляжных районах или в центре города, в зависимости от образа жизни.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop" 
                  alt="Бразилия, природа и пляжи" 
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
                Стоимость жизни в Бразилии сильно различается по регионам. Рио-де-Жанейро и Сан-Паулу дороже, чем другие города. Аренда квартиры может стоить от 300-800 долларов в месяц, в зависимости от района и размера. Еда в местных ресторанах недорогая, особенно если есть в местах для местных, а не в туристических.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Общественный транспорт развит в крупных городах, стоит недорого. Такси и Uber доступны. Интернет в городах хороший, что важно для работы. Медицинское обслуживание качественное, есть как государственные, так и частные клиники.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Бразилия относительно недорогая страна для долгосрочного пребывания, особенно если получать доход в валюте других стран. Курс бразильского реала часто позволяет иностранцам жить комфортно.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Экономическая ситуация может меняться, поэтому стоит следить за курсом валют. Также важно учитывать, что в некоторых районах безопасность может быть проблемой, поэтому стоит выбирать районы с хорошей репутацией.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Продукты в супермаркетах качественные, особенно фрукты и овощи, которые здесь очень вкусные и недорогие. Рестораны предлагают разнообразную кухню по разным ценам — от простых закусочных до ресторанов высокой кухни.
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
                  <h3 className="text-xl font-semibold mb-2">Пляжи и природа</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Бразилия славится своими пляжами — от знаменитых пляжей Рио до диких пляжей северо-востока. Можно заниматься сёрфингом, кайтсёрфингом, дайвингом или просто наслаждаться солнцем и океаном. Водопады Игуасу — одно из чудес природы, которое обязательно стоит посетить.
                  </p>
                  <p className="text-base leading-relaxed">
                    Амазонка — крупнейший тропический лес в мире, где можно отправиться в экскурсию, увидеть дикую природу и познакомиться с местными общинами. Пантанал — крупнейшее водно-болотное угодье, где можно увидеть ягуаров, кайманов и множество птиц.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Культура и музыка</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Бразилия — это страна музыки. Можно посетить концерты самбы, босса-новы, форро. Карнавал в Рио — одно из самых зрелищных событий в мире, но даже вне карнавала в городе всегда есть музыка и танцы.
                  </p>
                  <p className="text-base leading-relaxed">
                    Исторические города, такие как Ору-Прету, Парати, Сальвадор, предлагают возможность погрузиться в колониальную историю Бразилии. Музеи, галереи, театры — культурная жизнь очень активна, особенно в крупных городах.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Спорт и активность</h3>
                  <p className="text-base leading-relaxed">
                    Футбол — это религия в Бразилии. Посещение матча на стадионе Маракана в Рио или других стадионах — это незабываемый опыт. Также популярны пляжный волейбол, капоэйра, джиу-джитсу. Многие пляжи предлагают возможности для занятий спортом и активного отдыха.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Бразильская кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Бразильская кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Бразильская кухня очень разнообразна и отражает смесь культур. Фейжоада — национальное блюдо из чёрной фасоли с мясом. Шураско — бразильское барбекю, где мясо готовят на открытом огне. Асаи — ягода, которую едят как десерт или в смузи. Бригадейро — популярные конфеты из сгущённого молока.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Каждый регион имеет свои кулинарные традиции. На северо-востоке популярны морепродукты и африканские влияния. В Рио и Сан-Паулу можно найти кухню со всего мира. Бразильцы любят есть вместе, и еда — это важная часть социальной жизни.
              </p>
              <p className="text-base leading-relaxed">
                Кайпиринья — национальный коктейль из кашасы, лайма и сахара. Бразильский кофе известен во всём мире, и здесь его пьют много и часто. Фрукты в Бразилии невероятно вкусные и разнообразные — манго, папайя, маракуйя, гуава и многие другие.
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
                  <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
                  <p className="text-base leading-relaxed">
                    Бразилия — большая страна с разным уровнем безопасности в разных районах. Важно быть осторожным, особенно в крупных городах. Избегайте демонстрации дорогих вещей, будьте внимательны в общественном транспорте, выбирайте районы с хорошей репутацией для проживания.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальный язык — португальский. В туристических местах могут понимать английский, но знание португальского значительно упростит жизнь и общение с местными. Бразильский португальский имеет свои особенности в произношении и лексике.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Бразилия находится в Южном полушарии, поэтому сезоны противоположны северному. Климат варьируется от тропического на севере до умеренного на юге. В Рио и на побережье климат тёплый круглый год, в Сан-Паулу может быть прохладнее зимой.
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

export default Braziliya;
