import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Heart, CheckCircle, Info, AlertCircle } from "lucide-react";

const Kaknachatbegat = () => {
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
          <span>Как начать бегать</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как начать бегать (да, и зачем)</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Бег — это один из самых доступных и эффективных видов физической активности. Вам не нужно дорогое оборудование, специальные места или много времени. Просто наденьте кроссовки и выйдите на улицу. Но начать бегать может быть сложнее, чем кажется.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Многие начинают бегать с энтузиазмом, но быстро бросают из-за усталости, боли или отсутствия мотивации. Но с правильным подходом бег может стать частью вашей жизни и принести множество преимуществ.
              </p>
              <p className="text-base leading-relaxed">
                Бег — это не только способ улучшить физическую форму, но и возможность снять стресс, очистить голову, побыть наедине с собой или наоборот — найти единомышленников. Это простое, но мощное средство для улучшения здоровья и качества жизни.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем бегать</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Физическое здоровье</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Бег улучшает сердечно-сосудистую систему, укрепляет мышцы и кости, помогает контролировать вес, улучшает иммунитет. Регулярный бег снижает риск многих заболеваний, включая болезни сердца, диабет, некоторые виды рака.
                  </p>
                  <p className="text-base leading-relaxed">
                    Бег также улучшает качество сна, повышает уровень энергии в течение дня, помогает поддерживать здоровый вес. Это один из самых эффективных способов улучшить общее физическое здоровье.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Психическое здоровье</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Бег — это мощный антидепрессант. Во время бега выделяются эндорфины — "гормоны счастья", которые улучшают настроение и снижают стресс. Бег помогает справляться с тревогой и депрессией.
                  </p>
                  <p className="text-base leading-relaxed">
                    Бег — это также время для размышлений, медитации, очищения головы. Многие бегуны говорят, что лучшие идеи приходят во время бега. Это время для себя, когда можно отключиться от проблем и просто быть.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Достижение целей</h3>
                  <p className="text-base leading-relaxed">
                    Бег даёт возможность ставить цели и достигать их. Первый километр без остановки, первая 5-километровая пробежка, первый полумарафон — каждое достижение даёт уверенность и мотивацию двигаться дальше.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">С чего начать</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Проверьте здоровье</h3>
                  <p className="text-base leading-relaxed">
                    Если у вас есть проблемы со здоровьем, особенно с сердцем, суставами или лишний вес, проконсультируйтесь с врачом перед началом бега. Врач поможет определить, готовы ли вы к бегу, и даст рекомендации.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Начните с ходьбы</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Если вы давно не занимались спортом, не начинайте сразу с бега. Начните с быстрой ходьбы. Ходите 20-30 минут несколько раз в неделю, постепенно увеличивая темп.
                  </p>
                  <p className="text-base leading-relaxed">
                    Когда ходьба станет комфортной, начните чередовать ходьбу и бег. Например, 1 минута бега, 2 минуты ходьбы. Постепенно увеличивайте время бега и уменьшайте время ходьбы.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Программа для начинающих</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Используйте программу типа "Couch to 5K" (с дивана до 5 км). Это проверенная программа, которая помогает новичкам постепенно перейти от ходьбы к бегу на 5 километров за 9 недель.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Примерная программа первой недели:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>День 1: 5 минут ходьбы, 1 минута бега × 8, 5 минут ходьбы</li>
                      <li>День 2: Отдых или лёгкая ходьба</li>
                      <li>День 3: Повторить день 1</li>
                      <li>День 4: Отдых</li>
                      <li>День 5: Повторить день 1</li>
                      <li>День 6-7: Отдых</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Не переусердствуйте</h3>
                  <p className="text-base leading-relaxed">
                    Самая большая ошибка новичков — пытаться бежать слишком быстро, слишком долго, слишком часто. Это приводит к усталости, травмам и разочарованию. Начинайте медленно, постепенно увеличивайте нагрузку. Лучше бегать три раза в неделю регулярно, чем каждый день и быстро выгореть.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Экипировка</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Кроссовки</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Самое важное — это хорошие беговые кроссовки. Они должны быть удобными, подходить по размеру, иметь хорошую амортизацию. Не экономьте на кроссовках — плохие кроссовки могут привести к травмам.
                  </p>
                  <p className="text-base leading-relaxed">
                    Лучше покупать кроссовки в специализированном магазине, где консультант поможет подобрать обувь с учётом вашего типа стопы и техники бега. Кроссовки нужно менять каждые 500-800 километров.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Одежда</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Одевайтесь по погоде, но помните, что во время бега вам будет жарче. Одежда должна быть удобной, не натирать, отводить влагу. Избегайте хлопка — он впитывает пот и становится тяжёлым.
                  </p>
                  <p className="text-base leading-relaxed">
                    В тёплую погоду — лёгкая футболка и шорты. В холодную — несколько слоёв, включая куртку. В тёмное время суток используйте светоотражающие элементы.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Дополнительное оборудование</h3>
                  <p className="text-base leading-relaxed">
                    Для начала вам не нужно ничего кроме кроссовок. Позже можно добавить фитнес-браслет или часы для отслеживания пульса и расстояния, но это не обязательно. Главное — начать бегать.
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
                <h2 className="text-2xl font-bold">Типичные ошибки начинающих</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Слишком быстрый старт</h3>
                  <p className="text-base leading-relaxed">
                    Многие начинают бегать слишком быстро, думая, что это сделает их лучше. На самом деле, для большинства новичков лучше бегать медленнее, но дольше. Вы должны быть able поддерживать разговор во время бега.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Игнорирование боли</h3>
                  <p className="text-base leading-relaxed">
                    Есть разница между дискомфортом усталости и болью от травмы. Если что-то болит — остановитесь, отдохните. Если боль не проходит — обратитесь к врачу. Не бегайте через боль — это может привести к серьёзным травмам.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Отсутствие разминки и заминки</h3>
                  <p className="text-base leading-relaxed">
                    Разминка перед бегом и растяжка после — это не роскошь, а необходимость. Разминка подготавливает мышцы к нагрузке, заминка помогает восстановлению. Не пренебрегайте этим.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Нереалистичные ожидания</h3>
                  <p className="text-base leading-relaxed">
                    Не ожидайте, что сразу начнёте бегать легко и быстро. Прогресс требует времени. Будьте терпеливы с собой. Каждый маленький шаг — это прогресс. Не сравнивайте себя с другими — сравнивайте себя с собой вчерашним.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как поддерживать мотивацию</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ставьте реалистичные цели</h3>
                  <p className="text-base leading-relaxed">
                    Не ставьте слишком амбициозные цели сразу. Лучше ставить маленькие, достижимые цели и постепенно их увеличивать. Каждое достижение даёт мотивацию для следующего шага.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ведите дневник</h3>
                  <p className="text-base leading-relaxed">
                    Записывайте свои пробежки: расстояние, время, как вы себя чувствовали. Это поможет видеть прогресс и мотивирует продолжать. Со временем вы увидите, как далеко продвинулись.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Найдите компанию</h3>
                  <p className="text-base leading-relaxed">
                    Бег с друзьями или в беговом клубе может быть более мотивирующим, чем бег в одиночку. Компания делает бег более интересным и помогает не пропускать тренировки.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Наслаждайтесь процессом</h3>
                  <p className="text-base leading-relaxed">
                    Не превращайте бег в рутину. Меняйте маршруты, слушайте музыку или подкасты, бегайте в разных местах. Наслаждайтесь тем, что вы делаете что-то хорошее для себя.
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

export default Kaknachatbegat;
