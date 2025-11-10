import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Sun, MapPin, Star, Info, Heart, DollarSign } from "lucide-react";

const Dubay = () => {
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
          <span>Дубай</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Дубай: долгий отпуск мирового масштаба</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop" 
                  alt="Дубай, ОАЭ" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Дубай — это город будущего, где роскошь сочетается с инновациями. Современные небоскрёбы, искусственные острова, самые высокие здания в мире и бесконечные возможности для развлечений делают его уникальным местом для долгого пребывания.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Дубай привлекает бизнесменов, экспатов и всех, кто хочет жить в комфорте и роскоши в окружении современной архитектуры. Это город, где мечты становятся реальностью, где роскошь доступна, а возможности безграничны.
              </p>
              <p className="text-base leading-relaxed">
                От небоскрёбов до искусственных островов, от роскошных отелей до современных коворкингов — Дубай предлагает всё для комфортной жизни и работы. Здесь можно найти свой ритм жизни, будь то активная деловая жизнь или спокойный отдых на пляже.
              </p>
            </CardContent>
          </Card>

          {/* Культура и образ жизни */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Культура и образ жизни</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Дубай предлагает высокий уровень жизни, безопасность, отличную инфраструктуру и множество развлечений. Здесь работают люди со всего мира, создавая уникальную международную атмосферу, где можно встретить представителей более 200 национальностей. Это делает Дубай космополитичным городом с богатым культурным разнообразием.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Образ жизни в Дубае — это баланс между работой и отдыхом, между деловой активностью и развлечениями. Здесь принято наслаждаться роскошью, но при этом ценить качество и комфорт. Дубай — это город возможностей, где можно реализовать свои амбиции и наслаждаться жизнью одновременно.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Дубае:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Высокий уровень безопасности — один из самых безопасных городов мира</li>
                  <li>Отличная инфраструктура — современные дороги, метро, аэропорты</li>
                  <li>Множество развлечений и шопинга — торговые центры, рестораны, развлекательные центры</li>
                  <li>Международное сообщество — легко найти единомышленников</li>
                  <li>Налоговые преимущества — отсутствие подоходного налога</li>
                  <li>Роскошь и комфорт — высокий уровень сервиса во всём</li>
                  <li>Космополитичность — смесь культур и традиций</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Дубай — это место, где традиции Востока встречаются с современностью Запада. Здесь уважают местные обычаи и традиции, но при этом создают комфортные условия для экспатов со всего мира. Это создаёт уникальную атмосферу, где каждый может найти своё место.
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
                Дубай разделён на районы, каждый со своим характером. Даунтаун — деловой центр с небоскрёбами, включая Бурдж-Халифа. Дубай Марина — современный район с небоскрёбами и набережной. Джумейра — престижный район с пляжами и виллами. Бизнес-Бей — деловой район с офисами и жилыми комплексами.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Старый Дубай (Дейра, Бур-Дубай) — исторический район с традиционными рынками и атмосферой. Дубай Хиллс, Дубай Лэнд — новые районы с современной инфраструктурой. Пальма Джумейра — искусственный остров с роскошными виллами и отелями.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Дубае варьируется в зависимости от района и типа жилья. Студия может стоить от 3000-6000 дирхамов в месяц, однокомнатная квартира — от 5000-10000, вилла — от 15000+. Многие экспаты предпочитают жить в современных районах с хорошей инфраструктурой и близостью к работе.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=800&h=500&fit=crop" 
                  alt="Дубай, современная архитектура" 
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
                Стоимость жизни в Дубае высокая, но компенсируется отсутствием подоходного налога и высокими зарплатами. Аренда жилья — основная статья расходов. Еда в ресторанах дорогая, но в супермаркетах можно найти продукты по разным ценам. Транспорт развит хорошо, метро и такси доступны.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Интернет быстрый и надёжный, что важно для работы. Медицинское обслуживание качественное, но дорогое, поэтому важна медицинская страховка. Образование высокого качества, есть международные школы. Развлечения и шопинг — широкий выбор, но цены высокие.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Отсутствие подоходного налога делает Дубай привлекательным для высокооплачиваемых специалистов. Высокое качество жизни, безопасность и возможности компенсируют высокую стоимость жизни.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Стоимость жизни высокая, особенно аренда жилья и развлечения. Важно иметь хороший доход или работу с компенсацией расходов. Медицинская страховка обязательна.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Продукты в супермаркетах разнообразны — от местных до импортных. Рестораны предлагают кухню со всего мира, от бюджетных до ресторанов высокой кухни. Качество сервиса высокое во всём, что делает жизнь комфортной.
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
                  <h3 className="text-xl font-semibold mb-2">Архитектура и достопримечательности</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Бурдж-Халифа — самое высокое здание в мире, откуда открывается потрясающий вид на город. Бурдж-эль-Араб — роскошный отель в форме паруса. Пальма Джумейра — искусственный остров, видимый из космоса. Дубай Марина — район с небоскрёбами и набережной.
                  </p>
                  <p className="text-base leading-relaxed">
                    Дубай Молл — один из крупнейших торговых центров в мире. Дубай Фонтан — музыкальный фонтан у подножия Бурдж-Халифа. Старый Дубай с традиционными рынками (золотой, специй) и музеями. Дубай Парк — тематические парки развлечений.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Пляжи и активный отдых</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Дубай славится своими пляжами — от общественных до частных пляжей при отелях. Можно заниматься водными видами спорта, яхтингом, дайвингом. Пустыня предлагает сафари, катание на верблюдах, сэндбординг.
                  </p>
                  <p className="text-base leading-relaxed">
                    Гольф-поля мирового класса, теннисные корты, фитнес-центры — возможности для спорта безграничны. Многие отели и жилые комплексы имеют собственные спортивные объекты. Активный образ жизни — часть культуры Дубая.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Шопинг и развлечения</h3>
                  <p className="text-base leading-relaxed">
                    Дубай — рай для шопинга. Торговые центры предлагают всё — от люксовых брендов до масс-маркета. Дубай Шопинг Фестиваль — ежегодное событие с большими скидками. Рестораны, бары, клубы — ночная жизнь очень активна. Культурные мероприятия, выставки, концерты — культурная жизнь разнообразна.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Кухня Дубая</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Дубай предлагает кухню со всего мира — от традиционной арабской до азиатской, европейской, латиноамериканской. Шаверма, фалафель, хумус — популярные блюда ближневосточной кухни. Рестораны высокой кухни предлагают блюда от знаменитых шеф-поваров.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Бранчи (поздние завтраки) — популярная традиция в Дубае, особенно по выходным. Многие рестораны предлагают бранчи с неограниченной едой и напитками. Качество еды высокое, сервис отличный. Можно найти рестораны на любой бюджет — от бюджетных до люксовых.
              </p>
              <p className="text-base leading-relaxed">
                Алкоголь доступен в ресторанах и барах при отелях, но не в обычных магазинах. Многие экспаты отмечают разнообразие и качество кухни в Дубае, что делает его привлекательным для гурманов.
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
                    Для долгосрочного пребывания нужна рабочая виза или резидентская виза. Работодатель обычно оформляет визу для сотрудников. Есть также визы для инвесторов и предпринимателей. Правила могут меняться, поэтому стоит проверять актуальную информацию.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Дубай расположен в пустыне, поэтому летом (май-сентябрь) очень жарко (до 45°C), а зимой (ноябрь-март) комфортно (20-30°C). Развитая система кондиционирования, закрытые торговые центры и пляжи делают жизнь комфортной круглый год. Многие предпочитают проводить лето в других странах.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
                  <p className="text-base leading-relaxed">
                    Дубай — один из самых безопасных городов в мире. Уровень преступности очень низкий. Однако важно уважать местные законы и обычаи, особенно касающиеся алкоголя, одежды и поведения в общественных местах.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальный язык — арабский, но английский широко используется, особенно в деловой среде. Многие экспаты обходятся английским, но знание арабского может быть полезно. В туристических и деловых районах английский понимают везде.
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

export default Dubay;
