import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, Flame, Calendar, Heart, Music, Info } from "lucide-react";

const Maslenitsa = () => {
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
          <span>Масленица</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Масленица: блины, костры и проводы зимы</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Масленица — один из самых ярких и весёлых праздников в России. Это неделя перед Великим постом, когда люди провожают зиму и встречают весну с блинами, кострами, катаниями с гор и народными гуляньями. Масленица — это праздник, который объединяет всех: и молодых, и старых, и горожан, и жителей деревень.
              </p>
              <p className="text-base leading-relaxed">
                Традиции Масленицы уходят корнями в глубокую древность, когда это был языческий праздник, связанный с проводами зимы и встречей весны. С приходом христианства Масленица стала преддверием Великого поста, но сохранила свои народные традиции и обряды.
              </p>
            </CardContent>
          </Card>

          {/* История праздника */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">История и традиции Масленицы</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Масленица — это древний славянский праздник, который отмечался ещё до принятия христианства на Руси. Он был связан с проводами зимы и встречей весны, с культом солнца и плодородия. С принятием христианства Масленица стала последней неделей перед Великим постом, когда можно было вдоволь есть и веселиться.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Каждый день Масленичной недели имеет своё название и традиции. Понедельник — встреча, вторник — заигрыши, среда — лакомка, четверг — разгул, пятница — тёщины вечёрки, суббота — золовкины посиделки, воскресенье — прощёное воскресенье и сжигание чучела Масленицы.
              </p>
              <p className="text-base leading-relaxed">
                Главный символ Масленицы — блины, круглые и золотистые, как солнце. Они символизируют возвращение солнца и тепла. Блины пекут каждый день, угощают гостей, дарят соседям и просто наслаждаются этим вкусным блюдом.
              </p>
            </CardContent>
          </Card>

          {/* Блины */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Блины — главное блюдо Масленицы</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Блины на Масленицу — это не просто еда, а настоящий ритуал. Их пекут каждый день, экспериментируя с рецептами и начинками. Классические блины делают из пшеничной или гречневой муки, добавляют молоко, яйца и немного масла. Тесто должно быть жидким, чтобы блины получались тонкими и нежными.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Начинки для блинов могут быть самыми разными: сметана, масло, мёд, варенье, икра, рыба, мясо, творог. Каждая хозяйка имеет свой секретный рецепт, который передаётся из поколения в поколение.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Традиционные начинки для блинов:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Сметана и масло</li>
                  <li>Мёд и варенье</li>
                  <li>Икра красная или чёрная</li>
                  <li>Рыба (солёная, копчёная)</li>
                  <li>Творог с изюмом</li>
                  <li>Мясо и грибы</li>
                  <li>Сыр и зелень</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Блины на Масленицу — это символ гостеприимства и радости. Ими угощают всех гостей, их дарят соседям, их едят в кругу семьи и друзей. Это блюдо, которое объединяет людей и создаёт атмосферу праздника.
              </p>
            </CardContent>
          </Card>

          {/* Костры и сжигание чучела */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Костры и сжигание чучела</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Один из самых ярких обрядов Масленицы — это сжигание чучела Зимы (Масленицы) в последний день праздника. Чучело изготавливают из соломы, наряжают в старую одежду и устанавливают на главной площади посёлка или города.
              </p>
              <p className="text-base leading-relaxed mb-4">
                В воскресенье, в последний день Масленицы, чучело сжигают на костре. Это символизирует проводы зимы и надежду на скорую весну. Вокруг костра водят хороводы, поют песни, играют в игры. Костер становится центром праздника, местом, где собираются все жители.
              </p>
              <p className="text-base leading-relaxed mb-4">
                В старину в костёр бросали старые вещи, чтобы избавиться от всего ненужного и начать новую жизнь с чистого листа. Также сжигали остатки блинов и другую еду, чтобы всё было чисто перед постом.
              </p>
              <p className="text-base leading-relaxed">
                Огонь на Масленицу — это символ очищения и обновления. Он несёт тепло и свет, согревает в холодный день и создаёт особую атмосферу праздника. Костер объединяет людей, создаёт чувство единства и радости.
              </p>
            </CardContent>
          </Card>

          {/* Народные гулянья */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Music className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Народные гулянья и развлечения</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Масленица — это время веселья и развлечений. На площадях устраивают ярмарки с торговыми рядами, где продают блины, сладости, сувениры и игрушки. Повсюду звучит музыка, играют гармонисты, поют песни.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Традиционные развлечения на Масленицу — это катание с гор, катание на санях, запряжённых лошадьми, кулачные бои, перетягивание каната, лазанье на столб за призами. Дети и взрослые играют в снежки, строят снежные крепости, катаются на коньках и лыжах.
              </p>
              <p className="text-base leading-relaxed">
                На площадях выступают артисты, показывают кукольные представления, устраивают конкурсы и игры. Всё это создаёт неповторимую атмосферу праздника, когда весь город или посёлок выходит на улицу, чтобы веселиться и провожать зиму.
              </p>
            </CardContent>
          </Card>

          {/* Значение праздника */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Значение Масленицы для русской культуры</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Масленица — это не просто праздник, а важная часть русской культуры и традиций. Она объединяет людей, создаёт чувство единства и принадлежности к общему народу. Это время, когда забываются разногласия, и все вместе веселятся и радуются.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Праздник учит ценить простые радости жизни: вкусные блины, тёплый огонь костра, весёлые игры, общение с близкими. Он напоминает о важности семейных традиций, гостеприимства и взаимопомощи.
              </p>
              <p className="text-base leading-relaxed">
                Масленица — это мост между прошлым и настоящим. Она сохраняет древние традиции, но при этом остаётся живым, актуальным праздником, который любят и отмечают люди всех возрастов.
              </p>
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
                  <h3 className="text-lg font-semibold mb-2">Прощёное воскресенье</h3>
                  <p className="text-base leading-relaxed">
                    Последний день Масленицы называется прощёным воскресеньем. В этот день люди просят прощения друг у друга за все обиды и проступки, чтобы начать Великий пост с чистой совестью.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Масленица в разных регионах</h3>
                  <p className="text-base leading-relaxed">
                    В разных регионах России Масленицу отмечают по-разному, но везде главными остаются блины, костры и веселье. В некоторых местах сохранились особые местные традиции и обряды.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Масленица за границей</h3>
                  <p className="text-base leading-relaxed">
                    Масленицу отмечают не только в России, но и в других славянских странах, а также в русских общинах по всему миру. Это праздник, который объединяет русских людей, где бы они ни находились.
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

export default Maslenitsa;
