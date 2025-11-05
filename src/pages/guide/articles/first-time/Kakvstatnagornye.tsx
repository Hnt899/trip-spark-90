import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Snowflake, CheckCircle, AlertCircle, Info } from "lucide-react";

const Kakvstatnagornye = () => {
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
          <span>Как встать на горные лыжи</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как в первый раз встать на горные лыжи</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Горные лыжи — это захватывающий вид спорта, который даёт возможность наслаждаться горами, снегом и скоростью. Но первый раз на горных лыжах может быть пугающим и трудным. Однако с правильной подготовкой и инструктором вы сможете быстро освоить основы.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Помните: каждый опытный лыжник когда-то был новичком. Не бойтесь падать, не стесняйтесь просить помощи, и главное — получайте удовольствие от процесса обучения.
              </p>
              <p className="text-base leading-relaxed">
                Горные лыжи — это не только спорт, но и способ наслаждаться природой, горами, свежим воздухом. Это хобби, которое может подарить множество незабываемых моментов и стать частью вашей жизни на долгие годы.
              </p>
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
                  <h3 className="text-lg font-semibold mb-2">Возьмите уроки с инструктором</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Первый и самый важный совет — не пытайтесь учиться самостоятельно. Инструктор научит вас правильной технике, поможет избежать ошибок, которые сложно исправить потом, и самое главное — обеспечит безопасность.
                  </p>
                  <p className="text-base leading-relaxed">
                    Даже один-два урока с инструктором дадут вам базовые навыки и уверенность. Инструктор покажет, как правильно падать (да, это важно!), как тормозить, как поворачивать. Это инвестиция, которая окупится быстрее, чем вы думаете.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Выберите подходящий курорт</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Для первого раза выберите курорт с хорошими учебными склонами — широкими, пологими, с подъёмниками для новичков. Не пытайтесь сразу ехать на сложные склоны — это опасно и неэффективно.
                  </p>
                  <p className="text-base leading-relaxed">
                    Многие курорты имеют специальные учебные зоны с отдельными подъёмниками и инструкторами. Это идеальное место для первых шагов. Ищите курорты с обозначениями "beginner-friendly" или "для начинающих".
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Аренда или покупка оборудования</h3>
                  <p className="text-base leading-relaxed">
                    Для первого раза лучше арендовать оборудование в пункте проката на курорте. Там вам подберут лыжи, ботинки и палки по размеру, настроят крепления. Это дешевле, чем покупать, и вы сможете понять, подходит ли вам этот вид спорта, прежде чем делать серьёзные инвестиции.
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
                  <h3 className="text-lg font-semibold mb-2">Лыжи</h3>
                  <p className="text-base leading-relaxed">
                    Для начинающих подходят более короткие и мягкие лыжи — они легче в управлении. Длина лыж должна быть примерно на 10-15 см меньше вашего роста. Современные лыжи для новичков имеют особую конструкцию, которая облегчает обучение.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ботинки</h3>
                  <p className="text-base leading-relaxed">
                    Ботинки должны быть удобными, но не слишком свободными. Они должны плотно обхватывать ногу, но не давить. Правильно подобранные ботинки — это половина успеха. Неправильные ботинки могут испортить весь опыт.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Одежда</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Одевайтесь слоями. Первый слой — термобельё, которое отводит влагу. Второй слой — утеплитель (флис или пуховик). Третий слой — непромокаемая и непродуваемая куртка и штаны.
                  </p>
                  <p className="text-base leading-relaxed">
                    Не забывайте про перчатки, шапку или балаклаву, защитные очки или маску. На горе может быть холодно, ветрено и солнечно одновременно. Защита от солнца особенно важна — снег отражает ультрафиолет.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Шлем</h3>
                  <p className="text-base leading-relaxed">
                    Шлем обязателен, даже для новичков. Падения неизбежны, и шлем защитит вашу голову. Современные шлемы лёгкие, удобные и не мешают катанию. Не экономьте на безопасности.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Основы катания</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Стойка</h3>
                  <p className="text-base leading-relaxed">
                    Правильная стойка — это основа. Ноги на ширине плеч, немного согнуты в коленях, вес равномерно распределён. Руки впереди, палки держите правильно. Инструктор покажет вам правильную стойку — это первое, что вы должны освоить.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Торможение</h3>
                  <p className="text-base leading-relaxed">
                    "Плуг" — это базовый способ торможения для новичков. Носы лыж вместе, задники врозь, колени внутрь. Это создаёт сопротивление и замедляет движение. Освоение плуга — это первый большой шаг.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Повороты</h3>
                  <p className="text-base leading-relaxed">
                    Повороты начинаются с переноса веса и правильного движения коленей. Инструктор покажет вам, как правильно делать повороты. Не пытайтесь сразу делать крутые повороты — начинайте с широких, плавных.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Подъёмники</h3>
                  <p className="text-base leading-relaxed">
                    Подъёмники могут быть пугающими для новичков, но это часть опыта. Бугельные подъёмники требуют практики, кресельные — знания, как правильно садиться и выходить. Не стесняйтесь спрашивать помощи у других лыжников или персонала.
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
                <h2 className="text-2xl font-bold">Безопасность</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Безопасность — это приоритет номер один. Горные лыжи — это спорт с риском травм, но правильная подготовка и соблюдение правил значительно снижают риски.
              </p>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Правила безопасности:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Всегда носите шлем</li>
                  <li>Катайтесь только на склонах, соответствующих вашему уровню</li>
                  <li>Соблюдайте правила FIS (Международной федерации лыжного спорта)</li>
                  <li>Контролируйте скорость, особенно в людных местах</li>
                  <li>Смотрите вверх при пересечении склона</li>
                  <li>Не катайтесь в одиночку, особенно на незнакомых склонах</li>
                  <li>Останавливайтесь только в безопасных местах, где вас хорошо видно</li>
                  <li>Уважайте других лыжников и сноубордистов</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Падения неизбежны, особенно в начале. Научитесь правильно падать — инструктор покажет, как это делать безопасно. Не паникуйте при падении — это нормальная часть обучения.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Советы для первого дня</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Не переоценивайте себя</h3>
                  <p className="text-base leading-relaxed">
                    Начните с самых простых склонов. Не торопитесь переходить на более сложные трассы. Каждый должен пройти свой путь обучения, и нет ничего постыдного в том, чтобы кататься на учебных склонах столько, сколько нужно.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Делайте перерывы</h3>
                  <p className="text-base leading-relaxed">
                    Катание на лыжах физически утомительно, особенно для новичков. Делайте регулярные перерывы, отдыхайте, пейте воду. Усталость увеличивает риск травм.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Не бойтесь выглядеть глупо</h3>
                  <p className="text-base leading-relaxed">
                    Все новички выглядят неуклюже. Все падают. Все когда-то были на вашем месте. Не стесняйтесь — сосредоточьтесь на обучении и получении удовольствия. Опытные лыжники обычно с пониманием относятся к новичкам и готовы помочь.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Наслаждайтесь процессом</h3>
                  <p className="text-base leading-relaxed">
                    Помните, почему вы здесь — чтобы получить удовольствие! Не расстраивайтесь из-за ошибок. Каждый день на склоне — это прогресс. Наслаждайтесь горами, снегом, свежим воздухом. Это и есть главное.
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

export default Kakvstatnagornye;
