import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Mountain, AlertCircle, CheckCircle, Info, Users } from "lucide-react";

const Kakvzoytinaeverest = () => {
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
          <Link to="/guide" className="hover:text-primary">Первый раз</Link>
          <span>/</span>
          <span>Как взойти на Эверест</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как взойти на Эверест</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Восхождение на Эверест — это не просто подъём на гору, это одно из самых сложных и опасных приключений на планете. Эверест, или Джомолунгма, высотой 8848 метров — высочайшая вершина мира, и восхождение на неё требует невероятной подготовки, опыта и решимости.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Это не то, что можно сделать спонтанно или без подготовки. Восхождение на Эверест требует многолетнего опыта альпинизма, серьёзной физической подготовки, значительных финансовых затрат и, что самое главное, понимания всех рисков.
              </p>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Восхождение на Эверест опасно для жизни. Каждый год люди гибнут при попытке взойти на вершину. Это не туристическая прогулка, а серьёзное альпинистское восхождение, требующее максимальной подготовки и опыта.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что нужно для восхождения</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Опыт альпинизма</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Прежде чем думать об Эвересте, вам нужно иметь опыт восхождений на другие высокие горы. Обычно требуется опыт восхождений на вершины высотой 6000-7000 метров, умение работать с верёвками, ледорубами, кошками, опыт акклиматизации на больших высотах.
                  </p>
                  <p className="text-base leading-relaxed">
                    Рекомендуется пройти восхождения на такие горы, как Эльбрус, Килиманджаро, Аконкагуа, или другие семитысячники. Это поможет понять, как ваш организм реагирует на высоту, и набрать необходимый опыт.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Физическая подготовка</h3>
                  <p className="text-base leading-relaxed">
                    Физическая форма должна быть на высочайшем уровне. Вам предстоит нести тяжёлый рюкзак, работать в условиях кислородного голодания, переносить экстремальные температуры. Тренировки должны включать кардио, силовые упражнения, тренировки на выносливость, работу с высотой.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Финансовые затраты</h3>
                  <p className="text-base leading-relaxed">
                    Восхождение на Эверест — это очень дорогое предприятие. Стоимость может составлять от 30 000 до 100 000 долларов и более, в зависимости от компании, маршрута и уровня сервиса. В стоимость входят пермиты, услуги гидов, шерпы, оборудование, питание, страховка.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Время</h3>
                  <p className="text-base leading-relaxed">
                    Восхождение на Эверест занимает около двух месяцев. Это включает время на акклиматизацию, установку лагерей, ожидание благоприятной погоды. Вам нужно будет взять длительный отпуск или иметь возможность работать удалённо.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Маршруты восхождения</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Южный маршрут (Непал)</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Самый популярный маршрут, начинается с базового лагеря на южной стороне горы в Непале. Этот маршрут технически проще северного, но более опасен из-за ледопада Кхумбу — одного из самых опасных участков на Эвересте.
                  </p>
                  <p className="text-base leading-relaxed">
                    Маршрут проходит через несколько лагерей, установленных на разных высотах для акклиматизации. Южный маршрут требует разрешения от правительства Непала и работы с непальскими шерпами.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Северный маршрут (Тибет, Китай)</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Маршрут с тибетской стороны более технически сложный, но считается более безопасным, так как здесь нет ледопада Кхумбу. Однако он требует работы на большей высоте в течение более длительного времени.
                  </p>
                  <p className="text-base leading-relaxed">
                    Северный маршрут требует разрешения от китайских властей и работы с тибетскими шерпами. Этот маршрут менее популярен, но некоторые альпинисты предпочитают его из-за меньшего количества людей.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Опасности восхождения</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Высотная болезнь</h3>
                  <p className="text-base leading-relaxed">
                    На высоте более 8000 метров начинается "зона смерти", где организм не может нормально функционировать без дополнительного кислорода. Высотная болезнь может привести к отёку лёгких или мозга, что смертельно опасно.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Экстремальные погодные условия</h3>
                  <p className="text-base leading-relaxed">
                    Температура может опускаться до -40°C и ниже. Сильные ветра, снежные бури, отсутствие видимости — всё это делает восхождение крайне опасным. Окно для восхождения очень узкое — обычно это май, когда погода наиболее стабильна.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Лавины и обвалы</h3>
                  <p className="text-base leading-relaxed">
                    Ледопад Кхумбу на южном маршруте постоянно меняется, ледяные глыбы падают, создавая опасность. Лавины могут сойти в любой момент. Это одна из главных причин смертности на Эвересте.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Физическое истощение</h3>
                  <p className="text-base leading-relaxed">
                    Длительное пребывание на большой высоте, тяжелые нагрузки, недосып, плохое питание — всё это истощает организм. Многие альпинисты не доходят до вершины из-за физического истощения.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Процесс восхождения</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Восхождение на Эверест — это не один подъём, а серия подъёмов и спусков для акклиматизации. Процесс занимает несколько недель:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <ol className="list-decimal list-inside space-y-2 text-sm ml-4">
                  <li>Прибытие в базовый лагерь и акклиматизация</li>
                  <li>Подъём в лагерь 1, ночёвка, спуск в базовый лагерь</li>
                  <li>Подъём в лагерь 2, ночёвка, спуск</li>
                  <li>Подъём в лагерь 3, ночёвка, спуск</li>
                  <li>Подъём в лагерь 4, ночёвка, спуск</li>
                  <li>Ожидание благоприятной погоды для штурма вершины</li>
                  <li>Штурм вершины из лагеря 4</li>
                  <li>Спуск в базовый лагерь</li>
                </ol>
              </div>
              <p className="text-base leading-relaxed">
                Каждый подъём и спуск помогает организму адаптироваться к высоте. Без правильной акклиматизации шансы на успех минимальны, а риск смерти максимален. Штурм вершины обычно происходит рано утром, чтобы успеть подняться и спуститься до темноты.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Выбор компании и гида</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Выбор компании для восхождения критически важен. Хорошая компания обеспечит безопасность, опытных гидов, качественное оборудование и правильную акклиматизацию. Плохая компания может поставить вашу жизнь под угрозу.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ищите компании с хорошей репутацией, опытом, сертифицированными гидами. Проверьте отзывы, статистику успешных восхождений, безопасность. Не экономьте на безопасности — это может стоить жизни.
              </p>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong>Помните:</strong> Восхождение на Эверест — это не достижение, которое можно купить. Это требует многолетней подготовки, опыта и понимания рисков. Многие опытные альпинисты считают, что лучше восходить на другие вершины, которые не менее интересны, но более безопасны.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Kakvzoytinaeverest;
