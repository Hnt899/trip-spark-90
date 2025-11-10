import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Waves, Sun, MapPin, TreePine, Heart, Info, DollarSign, Coffee } from "lucide-react";

const KostaRika = () => {
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
          <span>Коста-Рика</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как живут в Коста-Рике</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=500&fit=crop" 
                  alt="Коста-Рика, природа" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Коста-Рика — это страна «чистой жизни» (pura vida), где природа и экология стоят на первом месте. Здесь можно жить в гармонии с природой, наслаждаться тропическим климатом и спокойным ритмом жизни. Костариканцы известны своим дружелюбием, оптимизмом и философией «pura vida» — наслаждения простыми радостями жизни.
              </p>
              <p className="text-base leading-relaxed">
                От тропических пляжей до горных лесов, от вулканов до джунглей — Коста-Рика предлагает разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то активный отдых на природе или спокойная атмосфера на побережье.
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
                Коста-Рика — это страна с философией «pura vida» (чистая жизнь), которая означает наслаждение простыми радостями, гармонию с природой и позитивное отношение к жизни. Костариканцы известны своим дружелюбием, оптимизмом и спокойным отношением к жизни. Здесь принято не торопиться, наслаждаться моментом и ценить природу.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Костариканская культура — это смесь испанских, индейских и африканских влияний, создающая уникальную идентичность. Здесь сильны семейные ценности, традиции и уважение к природе. Костариканцы гордятся своей страной, её природой и экологическими достижениями.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Коста-Рике:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Философия «pura vida» — наслаждение простыми радостями</li>
                  <li>Экологическое сознание — забота о природе</li>
                  <li>Дружелюбность и открытость — костариканцы очень общительны</li>
                  <li>Спокойный ритм жизни — меньше спешки</li>
                  <li>Любовь к природе — активный отдых на природе</li>
                  <li>Тропический климат — комфортно круглый год</li>
                  <li>Безопасность — одна из самых безопасных стран в регионе</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Костариканцы очень дружелюбны и открыты к общению. Они с радостью делятся своей культурой и традициями. Многие экспаты отмечают, как легко здесь чувствовать себя комфортно благодаря дружелюбию местных и философии «pura vida».
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
                Сан-Хосе — столица, расположенная в центральной долине, с умеренным климатом. Здесь развитая инфраструктура, множество возможностей для работы. Тамариндо — прибрежный город на Тихом океане, популярен среди сёрферов и экспатов. Монтеверде — горный город в облачном лесу, идеален для любителей природы.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Мануэль-Антонио — прибрежный город с национальным парком, популярен среди туристов и экспатов. Ла Фортуна — город у подножия вулкана Ареналь, известен горячими источниками. Сан-Хосе особенно популярен среди экспатов благодаря возможностям и инфраструктуре. Прибрежные города привлекают любителей пляжного отдыха и сёрфинга.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Коста-Рике варьируется в зависимости от района. В Сан-Хосе можно снять квартиру от 400-800 долларов в месяц, в прибрежных городах цены выше. Многие экспаты предпочитают жить в прибрежных городах или в горных районах с красивой природой.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=500&fit=crop" 
                  alt="Коста-Рика, джунгли" 
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
                Стоимость жизни в Коста-Рике выше, чем в других странах Центральной Америки, но ниже, чем в США или Европе. Аренда жилья — основная статья расходов. Еда в местных ресторанах доступна, продукты в супермаркетах качественные. Транспорт развит, стоит разумно.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Интернет в городах хороший, что важно для работы. Медицинское обслуживание качественное, покрывается страховкой. Развлечения и услуги доступны по разным ценам — от бюджетных до роскошных.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Коста-Рика предлагает высокое качество жизни при разумных расходах. Безопасность, природа, дружелюбие местных делают её привлекательной для долгосрочного пребывания.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Цены в туристических районах выше, чем в местных. Важно иметь медицинскую страховку. Экологическое сознание важно — страна стремится к устойчивому развитию.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Еда в Коста-Рике отличная и доступная. Местные рестораны предлагают вкусную традиционную кухню. Фрукты и овощи свежие и недорогие. Рестораны для туристов дороже, но всё равно доступны.
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
                  <h3 className="text-xl font-semibold mb-2">Природа и национальные парки</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Коста-Рика — лидер в области экологии и сохранения природы. Здесь множество национальных парков, заповедников, и страна стремится к углеродной нейтральности. Мануэль-Антонио, Корковадо, Тортугеро — известные национальные парки, где можно увидеть дикую природу.
                  </p>
                  <p className="text-base leading-relaxed">
                    Вулканы Ареналь, Поас, Ирасу — можно посетить и насладиться видами. Облачные леса Монтеверде — уникальная экосистема. Можно заниматься треккингом, наблюдением за птицами, зиплайнингом, рафтингом.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Пляжи и сёрфинг</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Коста-Рика славится своими пляжами на Тихом и Карибском побережьях. Тамариндо, Хако, Мануэль-Антонио — популярные места для сёрфинга. Можно заниматься сёрфингом, дайвингом, снорклингом, яхтингом.
                  </p>
                  <p className="text-base leading-relaxed">
                    Пляжи красивые, вода тёплая круглый год. Многие экспаты остаются в Коста-Рике именно из-за сёрфинга и пляжного образа жизни.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Активный отдых</h3>
                  <p className="text-base leading-relaxed">
                    Коста-Рика предлагает множество возможностей для активного отдыха: зиплайнинг, рафтинг, каякинг, велосипедные туры, походы. Горячие источники у вулкана Ареналь — популярное место для отдыха. Активный образ жизни — часть культуры Коста-Рики.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Костариканская кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Костариканская кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Костариканская кухня — это вкусная и здоровая еда. Галло пинто — рис с бобами, популярный завтрак. Касадо — традиционное блюдо с рисом, бобами, мясом, овощами. Севиче — маринованные морепродукты. Пати — пирожки с различными начинками.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Фрукты в Коста-Рике невероятно вкусные и разнообразные — манго, папайя, ананасы, бананы и многие другие. Кофе — важная часть культуры, костариканский кофе известен во всём мире. Костариканская кухня здоровая, вкусная и доступная.
              </p>
              <p className="text-base leading-relaxed">
                Рестораны предлагают разнообразную кухню — от традиционной костариканской до интернациональной. Качество еды хорошее, цены доступные. Многие экспаты отмечают, что еда в Коста-Рике отличная и здоровая.
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
                    Для граждан России виза не требуется для поездок до 90 дней. Для более длительного пребывания нужно оформить соответствующую визу. Есть также визы для пенсионеров и инвесторов. Правила могут меняться, поэтому стоит проверять актуальную информацию.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
                  <p className="text-base leading-relaxed">
                    Коста-Рика — одна из самых безопасных стран в Центральной Америке. Уровень преступности низкий. Стоит соблюдать обычные меры предосторожности, особенно в крупных городах. В целом, можно чувствовать себя безопасно.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальный язык — испанский. В туристических местах многие говорят по-английски, но знание испанского значительно упростит жизнь и общение с местными. Костариканский испанский имеет свои особенности в произношении.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Климат в Коста-Рике тропический, с двумя сезонами: сухой (декабрь-апрель) и влажный (май-ноябрь). Температура круглый год около 20-30°C, в зависимости от высоты. В целом климат комфортный для долгого пребывания, особенно на побережье, где можно наслаждаться солнцем круглый год.
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

export default KostaRika;
