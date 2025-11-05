import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Mountain, MapPin, AlertCircle, CheckCircle, Info, Package } from "lucide-react";

const Kakpoytipeshkomv = () => {
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
          <span>Как пойти пешком в горы</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как в первый раз пойти пешком в горы</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Поход в горы — это уникальный опыт, который позволяет увидеть природу с другой стороны, испытать себя, отдохнуть от городской суеты и получить незабываемые впечатления. Но первый поход в горы требует подготовки и знаний.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Горы могут быть опасными, если не знать, как себя вести. Но с правильной подготовкой и пониманием основ безопасности поход в горы станет одним из самых ярких приключений в вашей жизни.
              </p>
              <p className="text-base leading-relaxed">
                Не нужно быть опытным альпинистом, чтобы пойти в горы. Многие маршруты доступны для начинающих, главное — правильно подготовиться, выбрать подходящий маршрут и знать основы безопасности.
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
                  <h3 className="text-lg font-semibold mb-2">Начните с простых маршрутов</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Для первого похода выберите простой маршрут: не слишком длинный, не слишком сложный, с хорошей тропой. Идеально подойдут маршруты категории сложности 1-2, которые занимают один день или с одной ночёвкой.
                  </p>
                  <p className="text-base leading-relaxed">
                    Изучите маршрут заранее: посмотрите карту, отзывы других туристов, описание маршрута. Убедитесь, что маршрут подходит для вашего уровня подготовки. Не пытайтесь сразу идти на сложные маршруты — это может быть опасно.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Идите с опытными людьми</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Лучший способ начать — пойти с опытными туристами или в организованной группе с гидом. Опытные товарищи помогут вам, подскажут, научат основам, и в случае проблем вы не останетесь одни.
                  </p>
                  <p className="text-base leading-relaxed">
                    Многие туристические клубы и организации проводят походы для новичков. Это отличный способ начать, познакомиться с единомышленниками и получить опыт.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Подготовьтесь физически</h3>
                  <p className="text-base leading-relaxed">
                    Поход в горы требует физической подготовки. Начните регулярно ходить пешком, подниматься по лестницам, делать упражнения на выносливость. Хорошая физическая форма сделает поход более приятным и безопасным.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что взять с собой</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Одежда</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Одевайтесь слоями — это позволяет регулировать температуру в зависимости от погоды и нагрузки. Первый слой — термобельё, которое отводит влагу. Второй слой — утеплитель (флис). Третий слой — непромокаемая и непродуваемая куртка.
                  </p>
                  <p className="text-base leading-relaxed">
                    Обязательно возьмите запасную одежду — в горах может быть холодно, мокро, ветрено. Не забывайте про шапку, перчатки, тёплые носки. В горах погода может меняться очень быстро.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Обувь</h3>
                  <p className="text-base leading-relaxed">
                    Кроссовки для бега не подойдут для гор. Нужны треккинговые ботинки с хорошей подошвой, которая не скользит. Ботинки должны быть удобными, но не слишком новыми — разносите их заранее. Плохая обувь может испортить весь поход.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Рюкзак</h3>
                  <p className="text-base leading-relaxed">
                    Для однодневного похода достаточно рюкзака на 20-30 литров. Для многодневного — 40-60 литров. Рюкзак должен сидеть удобно, иметь регулируемые лямки, поддерживать спину. Правильно упакованный рюкзак — это комфорт.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Еда и вода</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Вода — это критически важно. Берите достаточно воды, плюс запас. В горах можно найти источники, но не всегда. Еда должна быть лёгкой, калорийной, не скоропортящейся.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Что взять из еды:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>Орехи, сухофрукты, шоколад — для быстрого пополнения энергии</li>
                      <li>Хлеб, сыр, колбаса — для полноценного обеда</li>
                      <li>Энергетические батончики</li>
                      <li>Горячие напитки в термосе (в холодную погоду)</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Необходимое снаряжение</h3>
                  <p className="text-base leading-relaxed">
                    Фонарик (даже если идёте днём), аптечка, карта, компас или GPS, нож, спички или зажигалка, солнцезащитный крем, очки, свисток (для сигнала о помощи). Для ночёвки — палатка, спальник, коврик.
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
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Сообщите о своих планах</h3>
                  <p className="text-base leading-relaxed">
                    Перед походом обязательно сообщите кому-то (родственникам, друзьям) куда вы идёте, когда планируете вернуться. Оставьте маршрут и контакты. Если что-то случится, люди будут знать, где вас искать.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Не ходите в одиночку</h3>
                  <p className="text-base leading-relaxed">
                    Особенно для первого похода лучше идти с группой или хотя бы с одним компаньоном. В горах может случиться что угодно, и в одиночку справиться с проблемами намного сложнее.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Проверяйте погоду</h3>
                  <p className="text-base leading-relaxed">
                    Погода в горах непредсказуема. Перед походом обязательно проверьте прогноз погоды. Если прогноз плохой — лучше отложить поход. Не рискуйте в плохую погоду, особенно если у вас мало опыта.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Знайте свои пределы</h3>
                  <p className="text-base leading-relaxed">
                    Не пытайтесь идти дальше, чем можете. Усталость снижает внимание и увеличивает риск травм. Если чувствуете усталость — остановитесь, отдохните. Лучше вернуться раньше, чем попасть в опасную ситуацию.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Оставайтесь на тропе</h3>
                  <p className="text-base leading-relaxed">
                    Не сходите с маркированной тропы, особенно если вы новичок. Тропы прокладываются по безопасным маршрутам. Сход с тропы может привести к опасным ситуациям, включая возможность заблудиться.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Техника ходьбы</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Темп</h3>
                  <p className="text-base leading-relaxed">
                    Идите в своём темпе. Не пытайтесь угнаться за более быстрыми членами группы. Лучший темп — тот, при котором вы можете идти долгое время без чрезмерной усталости. Постоянный темп лучше, чем быстрые рывки и остановки.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Дыхание</h3>
                  <p className="text-base leading-relaxed">
                    На подъёмах дышите глубже и чаще. Не задерживайте дыхание. Если чувствуете одышку — остановитесь, отдохните, восстановите дыхание. Правильное дыхание — это ключ к комфортному подъёму.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Отдых</h3>
                  <p className="text-base leading-relaxed">
                    Делайте короткие остановки каждые 30-60 минут. Во время остановок не садитесь сразу — лучше походить немного, чтобы не остыть. Длинные остановки делайте только на обед или в особенно красивых местах.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Спуск</h3>
                  <p className="text-base leading-relaxed">
                    Спуск может быть более опасным, чем подъём. Не спешите, идите медленно, ставьте ноги уверенно. Используйте палки для дополнительной опоры. На спуске нагрузка на колени больше, поэтому будьте осторожны.
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
                <h2 className="text-2xl font-bold">Что делать в экстренных ситуациях</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Заблудились</h3>
                  <p className="text-base leading-relaxed">
                    Если вы заблудились, не паникуйте. Остановитесь, сядьте, успокойтесь. Попробуйте найти ориентиры, вспомнить, где вы были. Если не можете найти дорогу — оставайтесь на месте, не уходите дальше. Используйте свисток для сигнала.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Травма</h3>
                  <p className="text-base leading-relaxed">
                    Если кто-то получил травму, оцените ситуацию. Если травма серьёзная и движение невозможно — оставайтесь на месте, вызывайте помощь. Если возможно двигаться — двигайтесь медленно, помогая пострадавшему.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Плохая погода</h3>
                  <p className="text-base leading-relaxed">
                    Если погода резко ухудшилась — найдите укрытие, переждите. Не пытайтесь продолжать движение в сильный дождь, снег, туман. Лучше остановиться и дождаться улучшения погоды.
                  </p>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-4">
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Номер экстренной службы в России — 112. Сохраните его в телефоне. Если вы в горах и нужна помощь — звоните. Но помните, что помощь может идти долго, поэтому лучше избегать ситуаций, когда она нужна.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Этикет в горах</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                В горах действуют особые правила этикета, которые помогают сохранять природу и обеспечивают безопасность всех:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Не оставляйте мусор — уносите всё с собой</li>
                  <li>Не рвите растения, не ломайте ветки</li>
                  <li>Не пугайте животных</li>
                  <li>Уважайте других туристов, не мешайте им</li>
                  <li>Приветствуйте встречных туристов</li>
                  <li>Не шумите — наслаждайтесь тишиной гор</li>
                  <li>Разводите костры только в разрешённых местах</li>
                  <li>Не оставляйте следов своего пребывания</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Kakpoytipeshkomv;
