import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Waves, Sun, CheckCircle, AlertCircle, Info, Shield } from "lucide-react";

const Kakvpervyevstatna = () => {
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
          <span>Как впервые встать на сап</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как впервые встать на сап</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                SUP (Stand Up Paddleboarding) — сапбординг или гребля стоя на доске — это один из самых быстрорастущих водных видов спорта. Он сочетает в себе элементы сёрфинга и каякинга, но при этом доступен практически каждому, даже тем, кто никогда не занимался водными видами спорта.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Сап — это отличный способ провести время на воде, насладиться природой, получить физическую нагрузку и отдохнуть. Это спорт, который подходит для всех возрастов и уровней подготовки.
              </p>
              <p className="text-base leading-relaxed">
                Первый раз на сапе может показаться сложным, но на самом деле научиться стоять на доске и грести может почти любой. Главное — правильный подход, терпение и понимание основ.
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
                  <h3 className="text-lg font-semibold mb-2">Возьмите урок</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Для первого раза лучше взять урок с инструктором. Инструктор покажет правильную технику, поможет избежать ошибок, обеспечит безопасность. Даже один урок даст вам базовые навыки и уверенность.
                  </p>
                  <p className="text-base leading-relaxed">
                    Многие прокаты SUP предлагают уроки для новичков. Это инвестиция, которая быстро окупится — вы научитесь быстрее и избежите разочарований.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Выберите подходящее место</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Для первого раза выберите спокойную воду: озеро, тихую реку, залив без волн и течения. Избегайте открытого моря, сильного течения, волн — это для более опытных саперов.
                  </p>
                  <p className="text-base leading-relaxed">
                    Вода должна быть достаточно глубокой, чтобы не задеть дно веслом, но не слишком глубокой на случай падения. Идеальная глубина — 1-2 метра. Также выберите место, где нет сильного ветра — ветер усложняет управление доской.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Проверьте погоду</h3>
                  <p className="text-base leading-relaxed">
                    Выбирайте день с хорошей погодой: без сильного ветра, дождя, шторма. Идеальная погода для сапа — солнечная, с лёгким ветерком или без ветра. Вода должна быть достаточно тёплой, чтобы комфортно падать в неё.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Экипировка</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Доска</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Для новичков лучше подходит надувная доска (iSUP) — она более устойчивая, прощает ошибки, легче в транспортировке. Размер доски должен соответствовать вашему весу и росту. Более широкие и длинные доски более устойчивые.
                  </p>
                  <p className="text-base leading-relaxed">
                    Жёсткие доски (hardboard) более быстрые и маневренные, но менее устойчивые и требуют больше опыта. Для первого раза лучше выбрать надувную доску шириной не менее 32 дюймов.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Весло</h3>
                  <p className="text-base leading-relaxed">
                    Весло должно быть правильной длины — примерно на 15-20 см выше вашего роста. Лопасть весла должна быть направлена вперёд (не назад, как в каяке). Правильное весло облегчает греблю и делает её эффективнее.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Лиш (leash)</h3>
                  <p className="text-base leading-relaxed">
                    Лиш — это шнур, который соединяет вас с доской. Он критически важен для безопасности — если вы упадёте, доска не уплывёт от вас. Всегда используйте лиш, особенно на открытой воде.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Спасательный жилет</h3>
                  <p className="text-base leading-relaxed">
                    Даже если вы умеете плавать, спасательный жилет обязателен, особенно для новичков. Он не только поможет вам оставаться на плаву, но и даст уверенность. В некоторых местах жилет обязателен по закону.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Одежда</h3>
                  <p className="text-base leading-relaxed">
                    Одевайтесь по погоде. В тёплую погоду подойдут купальник или шорты с футболкой. В холодную — гидрокостюм или специальная одежда для водных видов спорта. Помните, что вы, скорее всего, промокнете, особенно в первый раз.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Waves className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как встать на доску</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Начните на коленях</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Не пытайтесь сразу встать. Начните на коленях — это поможет почувствовать баланс доски, понять, как она реагирует на ваши движения. Погребите на коленях, привыкните к доске.
                  </p>
                  <p className="text-base leading-relaxed">
                    Когда почувствуете уверенность на коленях, можете попробовать встать. Но не торопитесь — лучше больше времени провести на коленях, чем упасть сразу после того, как встанете.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Вставание</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Чтобы встать, поставьте руки на доску по бокам, встаньте на одно колено, затем на другое, затем медленно поднимитесь, поставив ноги параллельно друг другу на ширине плеч, примерно на середине доски.
                  </p>
                  <p className="text-base leading-relaxed">
                    Ноги должны быть параллельно друг другу, колени слегка согнуты. Стопы должны быть на одной линии, направлены вперёд. Не смотрите вниз — смотрите вперёд, это поможет держать баланс.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Баланс</h3>
                  <p className="text-base leading-relaxed">
                    Держите баланс, используя ноги и корпус. Не бойтесь немного качаться — это нормально. Используйте руки для баланса, но не перебарщивайте. Чем больше вы расслаблены, тем легче держать баланс.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Техника гребли</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Правильная стойка</h3>
                  <p className="text-base leading-relaxed">
                    Стойте прямо, ноги на ширине плеч, параллельно друг другу. Колени слегка согнуты. Вес равномерно распределён на обе ноги. Не наклоняйтесь слишком сильно вперёд или назад.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Техника гребка</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Запустите весло в воду перед собой, полностью погрузив лопасть. Потяните весло назад, используя силу корпуса, а не только рук. Выньте весло из воды, когда оно окажется у ваших ног.
                  </p>
                  <p className="text-base leading-relaxed">
                    Чередуйте гребки с левой и правой стороны. Чтобы идти прямо, делайте несколько гребков с одной стороны, затем несколько с другой. Чтобы повернуть, гребите больше с одной стороны.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Повороты</h3>
                  <p className="text-base leading-relaxed">
                    Чтобы повернуть, гребите больше с одной стороны, или делайте обратные гребки (гребите назад). Также можно сделать несколько шагов назад по доске — это поднимет нос и облегчит поворот.
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
                  <h3 className="text-lg font-semibold mb-2">Всегда носите лиш</h3>
                  <p className="text-base leading-relaxed">
                    Лиш критически важен — он не даст доске уплыть от вас, если вы упадёте. Всегда используйте лиш, особенно на открытой воде. На реках с сильным течением лиш может быть опасен, поэтому в таких местах лучше не использовать его.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Носите спасательный жилет</h3>
                  <p className="text-base leading-relaxed">
                    Даже если вы умеете плавать, спасательный жилет может спасти жизнь в экстренной ситуации. Он обязателен для детей, но рекомендуется для всех, особенно новичков.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Проверяйте погоду</h3>
                  <p className="text-base leading-relaxed">
                    Не выходите на воду в плохую погоду: при сильном ветре, дожде, шторме. Ветер может быстро унести вас от берега, а волны могут быть опасны. Всегда проверяйте прогноз погоды перед выходом.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Не пейте алкоголь</h3>
                  <p className="text-base leading-relaxed">
                    Алкоголь и водные виды спорта несовместимы. Алкоголь ухудшает координацию, реакцию, способность плавать. Это опасно для вас и для окружающих.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Не паникуйте при падении</h3>
                  <p className="text-base leading-relaxed">
                    Падение — это нормально, особенно в начале. Не паникуйте. Вы в воде, у вас есть лиш, доска рядом. Просто заберитесь обратно на доску. Чтобы залезть на доску, подтянитесь на ней, затем запрыгните на колени.
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
                <h2 className="text-2xl font-bold">Советы для первого раза</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Не бойтесь падать</h3>
                  <p className="text-base leading-relaxed">
                    Падения неизбежны, особенно в первый раз. Это нормально и не страшно. Вода смягчит падение. Главное — не паниковать и знать, как залезть обратно на доску.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Начните на мелководье</h3>
                  <p className="text-base leading-relaxed">
                    Начните там, где вода не глубже вашего роста. Так вы сможете встать, если упадёте, и это даст уверенность. Когда почувствуете уверенность, можете переходить на более глубокую воду.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Будьте терпеливы</h3>
                  <p className="text-base leading-relaxed">
                    Не ожидайте, что сразу начнёте легко стоять и грести. Это требует практики. Каждое падение — это опыт. Каждая попытка — это прогресс. Будьте терпеливы с собой.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Наслаждайтесь процессом</h3>
                  <p className="text-base leading-relaxed">
                    Сап — это не только спорт, но и способ наслаждаться природой, водой, солнцем. Не фокусируйтесь только на том, чтобы стоять — наслаждайтесь моментом, окружающей природой, ощущением воды под доской.
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

export default Kakvpervyevstatna;
