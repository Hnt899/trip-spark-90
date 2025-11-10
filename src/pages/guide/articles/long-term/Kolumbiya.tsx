import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Music, MapPin, Coffee, Sun, Heart, Info, DollarSign } from "lucide-react";

const Kolumbiya = () => {
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
          <span>Колумбия</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Колумбия: отпуск латино</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=500&fit=crop" 
                  alt="Богота, Колумбия" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Колумбия — это страна ритма, танцев, кофе и яркой латиноамериканской культуры. Здесь можно погрузиться в энергичную атмосферу, попробовать лучший в мире кофе и насладиться дружелюбием местных жителей. Колумбийцы известны своим оптимизмом, открытостью и жизнерадостностью.
              </p>
              <p className="text-base leading-relaxed">
                От тропических пляжей до горных городов, от джунглей Амазонки до современных мегаполисов — Колумбия предлагает разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то активная городская жизнь или спокойная атмосфера на побережье.
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
                <h2 className="text-2xl font-bold">Культура и образ жизни</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Колумбия известна своей музыкой, танцами (сальса, бачата, кумбия), кофе и яркими карнавалами. Здесь жизнь течёт в ритме латино, где музыка и танцы — неотъемлемая часть повседневной жизни. Колумбийцы очень общительны, дружелюбны и открыты, легко заводят знакомства и всегда готовы помочь.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Колумбийская культура — это смесь индейских, африканских и европейских влияний, создающая уникальную идентичность. Здесь сильны семейные ценности, традиции и уважение к старшим. Колумбийцы гордятся своей страной, её историей и культурой, и с радостью делятся этим с гостями.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Колумбии:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Любовь к музыке и танцам — сальса, бачата звучат повсюду</li>
                  <li>Дружелюбность и открытость — колумбийцы очень общительны</li>
                  <li>Любовь к кофе — лучший кофе в мире</li>
                  <li>Яркие карнавалы и фестивали — умение праздновать</li>
                  <li>Активная социальная жизнь — любовь к общению</li>
                  <li>Размеренный темп жизни — меньше спешки</li>
                  <li>Доступность — относительно недорогая страна</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Колумбийцы очень жизнерадостны и умеют наслаждаться каждым моментом. Они любят собираться вместе, танцевать, слушать музыку и общаться. Многие экспаты отмечают, как легко здесь заводить знакомства и чувствовать себя частью сообщества.
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
                Богота — столица, расположенная высоко в горах, с прохладным климатом. Здесь множество музеев, галереи, театры, развитая инфраструктура. Медельин — город вечной весны, известный своей инновационностью и красивой природой. Картахена — прибрежный город с колониальной архитектурой, популярен среди экспатов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Кали — столица сальсы, привлекает любителей танцев и музыки. Санта-Марта — прибрежный город с пляжами и близостью к национальным паркам. Богота особенно популярна среди экспатов благодаря возможностям и инфраструктуре. Прибрежные города привлекают любителей пляжного отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Колумбии варьируется в зависимости от города. В Боготе и Медельине можно снять квартиру от 300-700 долларов в месяц, в других городах дешевле. Многие экспаты предпочитают жить в центре города или в районах с хорошей инфраструктурой.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=500&fit=crop" 
                  alt="Колумбия, природа" 
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
                Колумбия — относительно доступная страна для долгосрочного пребывания. Аренда жилья недорогая, еда в местных ресторанах очень дешёвая и вкусная. Продукты в супермаркетах качественные и недорогие. Транспорт развит, стоит дёшево.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Интернет в городах хороший, что важно для работы. Медицинское обслуживание качественное и доступное. Развлечения и услуги доступны по разным ценам — от бюджетных до роскошных.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Колумбия — относительно доступная страна для долгосрочного пребывания. При относительно небольших расходах можно жить комфортно, наслаждаясь культурой, природой и дружелюбием местных.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Курс колумбийского песо может меняться, но в целом страна остаётся доступной. В некоторых районах безопасность может быть проблемой, поэтому стоит выбирать районы с хорошей репутацией.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Еда в Колумбии отличная и очень дешёвая. Местные рестораны предлагают вкусную традиционную кухню по низким ценам. Фрукты и овощи свежие и недорогие. Рестораны для туристов дороже, но всё равно доступны.
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
                    Богота — столица с богатой историей, множеством музеев, галереи, театры. Золотой музей, Монсеррат, исторический центр — здесь каждый найдёт что-то интересное. Медельин — город вечной весны, известный инновациями и красивой природой. Картахена — прибрежный город с колониальной архитектурой, объект Всемирного наследия ЮНЕСКО.
                  </p>
                  <p className="text-base leading-relaxed">
                    Кали — столица сальсы, привлекает любителей танцев и музыки. Санта-Марта — прибрежный город с пляжами. Каждый город имеет свой характер и предлагает уникальный опыт.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Природа</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Колумбия славится своей природой — от тропических пляжей до горных вершин, от джунглей Амазонки до пустыни Татакоа. Национальные парки, такие как Тайрона, предлагают возможности для треккинга и наслаждения природой.
                  </p>
                  <p className="text-base leading-relaxed">
                    Кофейный треугольник — регион, где выращивают лучший кофе в мире. Можно посетить кофейные плантации, узнать о процессе производства. Природа Колумбии разнообразна и красива в любое время года.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Музыка и танцы</h3>
                  <p className="text-base leading-relaxed">
                    Колумбия — страна музыки и танцев. Сальса, бачата, кумбия звучат повсюду. Можно взять уроки танцев, посетить сальса-клубы, насладиться живой музыкой. Карнавалы и фестивали — важная часть культуры. Многие экспаты отмечают, что музыка и танцы делают жизнь в Колумбии особенной.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Колумбийская кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Колумбийская кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Колумбийская кухня — это вкусная и разнообразная еда. Бандеха паиса — национальное блюдо с мясом, бобами, рисом, яйцом. Арепа — кукурузные лепёшки, популярные на завтрак. Эмпанады — пирожки с различными начинками. Ахиако — суп с курицей и картофелем.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Колумбийский кофе — лучший в мире, и здесь его пьют много и часто. Фрукты в Колумбии невероятно вкусные и разнообразные — манго, папайя, маракуйя, гуава и многие другие. Колумбийская кухня сытная, вкусная и очень доступная.
              </p>
              <p className="text-base leading-relaxed">
                Рестораны предлагают разнообразную кухню — от традиционной колумбийской до интернациональной. Качество еды хорошее, цены доступные. Многие экспаты отмечают, что колумбийская кухня одна из лучших в регионе.
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
                    Колумбия стала намного безопаснее в последние годы, но стоит соблюдать обычные меры предосторожности. Важно выбирать районы с хорошей репутацией для проживания, быть внимательным в общественных местах. В целом, колумбийцы дружелюбны и готовы помочь.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальный язык — испанский. В туристических местах могут понимать английский, но знание испанского значительно упростит жизнь и общение с местными. Колумбийский испанский имеет свои особенности в произношении.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Климат в Колумбии разнообразен из-за высоты: в Боготе прохладно (15-20°C), на побережье жарко (25-30°C). В целом климат комфортный для долгого пребывания, особенно в городах с умеренным климатом, таких как Медельин, известный как город вечной весны.
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

export default Kolumbiya;
