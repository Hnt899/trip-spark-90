import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, MapPin, History, Waves, Info, Heart, DollarSign, Coffee } from "lucide-react";

const Egipet = () => {
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
          <span>Египет</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Египет: долгий отпуск по местному времени</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=500&fit=crop" 
                  alt="Египет, пирамиды" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Египет — это страна с древнейшей историей, где время течёт по-другому. Здесь можно задержаться надолго, наслаждаясь тёплым климатом, богатой культурой, Красным морем и невероятными историческими памятниками.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Жизнь в Египте неспешна, здесь принято наслаждаться моментом и не торопиться. Египтяне известны своим гостеприимством и дружелюбием, что создаёт особую атмосферу для долгосрочного пребывания. Здесь можно погрузиться в древнюю историю, наслаждаться тёплым климатом и красивой природой.
              </p>
              <p className="text-base leading-relaxed">
                От древних пирамид до современных курортов, от пустыни до Красного моря — Египет предлагает разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то изучение истории, дайвинг в Красном море или просто наслаждение тёплым климатом.
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
                Египет — это страна с богатой историей и культурой, где древние традиции соседствуют с современностью. Египтяне известны своим гостеприимством, дружелюбием и умением наслаждаться жизнью. Здесь принято не торопиться, наслаждаться моментом и ценить общение с людьми.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Египетская культура — это смесь арабских, африканских и средиземноморских влияний. Здесь сильны семейные ценности, традиции и уважение к старшим. Египтяне гордятся своей историей и культурой, и с радостью делятся этим с гостями.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Египте:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Гостеприимство и дружелюбие — египтяне всегда рады гостям</li>
                  <li>Неспешный ритм жизни — время течёт по-другому</li>
                  <li>Богатая история и культура — древние традиции живы</li>
                  <li>Любовь к общению — египтяне общительны и открыты</li>
                  <li>Традиционная кухня — вкусная и разнообразная</li>
                  <li>Тёплый климат — солнце круглый год</li>
                  <li>Доступность — относительно недорогая страна</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Египтяне очень общительны и любят проводить время с друзьями и семьёй. Чай и кофе — важная часть социальной жизни, и приглашение на чай — это знак дружбы. Многие экспаты отмечают, как легко здесь заводить знакомства и чувствовать себя частью сообщества.
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
                Хургада — популярный курорт на Красном море, идеален для любителей дайвинга и пляжного отдыха. Здесь развитая инфраструктура, множество отелей, ресторанов и развлечений. Шарм-эль-Шейх — более престижный курорт с роскошными отелями и отличными условиями для дайвинга.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Каир — столица, идеальна для изучения истории и культуры. Здесь можно жить в разных районах: Замалек — престижный район на острове, Маади — спокойный район с виллами, Новый Каир — современный район с хорошей инфраструктурой. Александрия — прибрежный город с особой атмосферой и историей.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Египте очень доступна. В Каире можно снять квартиру от 200-500 долларов в месяц, в курортных городах цены выше, но всё равно доступны. Многие экспаты предпочитают жить в курортных городах на побережье или в Каире для изучения истории.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1563551964492-395a2b8e0ffa?w=800&h=500&fit=crop" 
                  alt="Египет, Красное море" 
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
                Египет — очень доступная страна для долгосрочного пребывания. Аренда жилья недорогая, еда в местных ресторанах очень дешёвая и вкусная. Продукты в супермаркетах качественные и недорогие. Транспорт развит, стоит дёшево.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Интернет в городах хороший, что важно для работы. Медицинское обслуживание качественное и доступное. Развлечения и туристические услуги доступны по разным ценам — от бюджетных до роскошных.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Египет — одна из самых доступных стран для долгосрочного пребывания. При относительно небольших расходах можно жить комфортно, наслаждаясь тёплым климатом, историей и природой.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Курс египетского фунта может меняться, но в целом страна остаётся очень доступной. В туристических районах цены выше, чем в местных.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Еда в Египте отличная и очень дешёвая. Местные рестораны предлагают вкусную традиционную кухню по низким ценам. Фрукты и овощи свежие и недорогие. Рестораны для туристов дороже, но всё равно доступны.
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
                  <h3 className="text-xl font-semibold mb-2">Древняя история</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Египет предлагает уникальную возможность погрузиться в древнюю историю. Пирамиды Гизы, Сфинкс — символы древнего Египта. Луксор — город с множеством храмов и гробниц, включая Долину Царей. Карнак — крупнейший храмовый комплекс древнего мира.
                  </p>
                  <p className="text-base leading-relaxed">
                    Абу-Симбел — храмы, высеченные в скале. Эдфу, Ком-Омбо, Филы — другие древние храмы, которые стоит посетить. Египетский музей в Каире — крупнейшая коллекция древнеегипетских артефактов. Каждый день можно открывать для себя что-то новое из истории древней цивилизации.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Красное море и дайвинг</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Красное море — одно из лучших мест в мире для дайвинга и снорклинга. Коралловые рифы, разнообразная морская жизнь и кристально чистая вода привлекают любителей подводного плавания со всего мира. Хургада, Шарм-эль-Шейх, Дахаб — популярные места для дайвинга.
                  </p>
                  <p className="text-base leading-relaxed">
                    Можно получить сертификат дайвера, арендовать оборудование или присоединиться к дайв-турам. Подводный мир Красного моря невероятно красив и разнообразен. Многие экспаты остаются в Египте именно из-за дайвинга.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Пустыня и природа</h3>
                  <p className="text-base leading-relaxed">
                    Пустыня Сахара предлагает сафари, катание на верблюдах, ночёвки под звёздами. Оазисы в пустыне — места, где можно отдохнуть от жары. Нил — река жизни, круизы по Нилу — популярный способ увидеть Египет. Природа Египта разнообразна и красива.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Египетская кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Египетская кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Египетская кухня — это вкусная и разнообразная еда. Фул медамес — бобы с чесноком и лимоном, популярный завтрак. Кошари — смесь риса, макарон, чечевицы и соуса. Тамия — египетские фалафели. Шаверма, кебаб — популярные блюда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Молохея — зелёный суп, национальное блюдо. Фатта — блюдо с хлебом, мясом и соусом. Египетский хлеб (аиш) — свежий и вкусный. Десерты — басбуса, кунафа, пахлава. Египетская кухня сытная, вкусная и очень доступная.
              </p>
              <p className="text-base leading-relaxed">
                Чай и кофе — важная часть культуры. Египетский чай с мятой — популярный напиток. Кофе по-египетски крепкий и ароматный. Многие экспаты отмечают, что египетская кухня одна из лучших в регионе.
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
                    Для граждан России виза на 30 дней выдаётся по прилёту. Для более длительного пребывания можно оформить визу на 90 дней или делать виза-ран. Правила могут меняться, поэтому стоит проверять актуальную информацию.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    В Египте жаркий пустынный климат. Летом (май-сентябрь) очень жарко (до 40°C), зимой (ноябрь-март) комфортно (20-25°C). На побережье Красного моря климат мягче. В целом климат тёплый круглый год, что делает Египет привлекательным для долгого пребывания.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
                  <p className="text-base leading-relaxed">
                    Египет относительно безопасная страна, особенно в туристических районах. Стоит соблюдать обычные меры предосторожности, быть внимательным в общественных местах. В целом, египтяне дружелюбны и готовы помочь.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальный язык — арабский. В туристических местах многие говорят по-английски. Знание базового арабского поможет в общении с местными и сделает пребывание более комфортным. Египтяне ценят попытки говорить на их языке.
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

export default Egipet;
