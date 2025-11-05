import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Flower2, Calendar, MapPin, Sun, Leaf, Info } from "lucide-react";

const GdeKogdaChtoraspuskaetsya = () => {
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
          <Link to="/guide" className="hover:text-primary">Фишки России</Link>
          <span>/</span>
          <span>Где, когда, что распускается</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Где, когда, что распускается в России</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Россия — огромная страна, которая простирается через несколько климатических зон. Из-за этого весна и цветение приходят в разные регионы в разное время. То, что распускается в Краснодарском крае в марте, в Сибири может зацвести только в мае или даже июне.
              </p>
              <p className="text-base leading-relaxed">
                Знание о том, когда и где что цветёт, помогает планировать путешествия, наслаждаться природой и понимать ритмы российской природы. Каждый регион имеет свои особенности цветения, которые зависят от климата, почвы и других факторов.
              </p>
            </CardContent>
          </Card>

          {/* Ранняя весна на юге */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Ранняя весна на юге России</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                В южных регионах России — Краснодарском крае, Крыму, Ростовской области — весна приходит рано. Уже в конце февраля — начале марта начинают распускаться подснежники, крокусы, мимоза. В марте цветут магнолии, тюльпаны, нарциссы.
              </p>
              <p className="text-base leading-relaxed mb-4">
                В апреле на юге уже полно цветущих садов: вишня, абрикос, персик, яблони. Поля покрываются цветами: маки, васильки, ромашки. Это время, когда природа оживает после зимы, и всё вокруг наполняется красками и ароматами.
              </p>
              <p className="text-base leading-relaxed">
                Южные регионы России — это место, где можно увидеть раннее цветение и насладиться весной, когда в других частях страны ещё лежит снег. Особенно красивы цветущие сады в Крыму и на Северном Кавказе.
              </p>
            </CardContent>
          </Card>

          {/* Средняя полоса */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Flower2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Центральная Россия</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                В средней полосе России — Московской, Тульской, Рязанской и других областях — весна приходит позже. Первые цветы появляются в конце марта — начале апреля: подснежники, мать-и-мачеха, медуница. В апреле распускаются одуванчики, фиалки, ландыши.
              </p>
              <p className="text-base leading-relaxed mb-4">
                В мае цветут яблони, вишни, черёмуха, сирень. Леса покрываются ковром из цветов: ветреница, хохлатка, гусиный лук. Это время, когда природа средней полосы России особенно красива — зелень свежая, воздух наполнен ароматами цветов.
              </p>
              <p className="text-base leading-relaxed">
                Особенно красивы в это время подмосковные леса и сады, где можно увидеть цветущие яблони и вишни, насладиться ароматом сирени и полюбоваться весенними цветами.
              </p>
            </CardContent>
          </Card>

          {/* Север и Урал */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Север и Урал</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                На севере России и Урале весна приходит поздно. Первые цветы появляются только в конце апреля — начале мая. Это подснежники, мать-и-мачеха, медуница. В мае начинают распускаться деревья: берёза, ольха, ива.
              </p>
              <p className="text-base leading-relaxed mb-4">
                В июне на севере и Урале наступает настоящая весна. Цветут яблони, черёмуха, сирень. Леса покрываются цветами: ландыши, незабудки, ромашки. Это время короткого, но яркого лета, когда природа быстро расцветает и радует своей красотой.
              </p>
              <p className="text-base leading-relaxed">
                Особенно красивы в это время уральские леса и сады, где можно увидеть цветущие яблони и вишни, насладиться ароматом сирени и полюбоваться весенними цветами в условиях прохладного климата.
              </p>
            </CardContent>
          </Card>

          {/* Сибирь */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Сибирь и Дальний Восток</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                В Сибири и на Дальнем Востоке весна приходит очень поздно. Первые цветы появляются только в мае, а иногда и в начале июня. Это подснежники, мать-и-мачеха, медуница, которые спешат зацвести в короткое время до лета.
              </p>
              <p className="text-base leading-relaxed mb-4">
                В июне в Сибири начинается цветение деревьев и кустарников. Цветут яблони, черёмуха, сирень, но период цветения короткий — лето быстро переходит в жаркое время, а затем и в осень. Природа Сибири спешит использовать каждое тёплое мгновение.
              </p>
              <p className="text-base leading-relaxed">
                Особенно красивы в это время сибирские леса и сады, где можно увидеть короткое, но яркое цветение. Багульник, рододендрон, различные дикие цветы создают неповторимую картину сибирской природы.
              </p>
            </CardContent>
          </Card>

          {/* Календарь цветения */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Календарь цветения по регионам</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Юг России (Краснодарский край, Крым)</h3>
                  <p className="text-base leading-relaxed">
                    Март: подснежники, крокусы, мимоза, магнолии. Апрель: тюльпаны, нарциссы, вишня, абрикос. Май: яблони, сирень, пионы.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Средняя полоса (Москва, Центральная Россия)</h3>
                  <p className="text-base leading-relaxed">
                    Апрель: подснежники, мать-и-мачеха, одуванчики. Май: яблони, вишни, черёмуха, сирень, ландыши.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Урал и Север</h3>
                  <p className="text-base leading-relaxed">
                    Май: подснежники, мать-и-мачеха, медуница. Июнь: яблони, черёмуха, сирень, ландыши.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Сибирь и Дальний Восток</h3>
                  <p className="text-base leading-relaxed">
                    Май-июнь: подснежники, мать-и-мачеха. Июнь: яблони, черёмуха, сирень, багульник.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Интересные факты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Интересные факты</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Разница в сроках</h3>
                  <p className="text-base leading-relaxed">
                    Разница в сроках цветения между югом и севером России может составлять до 2-3 месяцев. То, что цветёт на юге в марте, на севере зацветёт только в мае-июне.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Короткое лето</h3>
                  <p className="text-base leading-relaxed">
                    В Сибири и на севере период цветения очень короткий — природа спешит использовать каждое тёплое мгновение для цветения и плодоношения.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Миграция цветения</h3>
                  <p className="text-base leading-relaxed">
                    Можно наблюдать "миграцию" цветения с юга на север — то, что цветёт в одном регионе, через несколько недель зацветёт в другом, расположенном севернее.
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

export default GdeKogdaChtoraspuskaetsya;
