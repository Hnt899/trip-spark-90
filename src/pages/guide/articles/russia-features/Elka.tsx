import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { TreePine, Gift, Snowflake, Heart, Star, Info } from "lucide-react";

const Elka = () => {
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
          <span>Ёлка</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Ёлка: главный символ Нового года в России</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Новогодняя ёлка — это не просто украшение, а настоящий символ праздника в России. Для многих россиян Новый год не начинается до тех пор, пока в доме не появится наряженная ёлка с гирляндами, игрушками и звездой на макушке. Эта традиция имеет глубокие корни и особое значение для русской культуры.
              </p>
              <p className="text-base leading-relaxed">
                Ёлка объединяет семьи, создаёт атмосферу праздника и чуда, напоминает о детстве и традициях, передающихся из поколения в поколение. В России новогодняя ёлка — это не просто дерево, а целая история, полная обычаев и особенных моментов.
              </p>
            </CardContent>
          </Card>

          {/* История традиции */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TreePine className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">История традиции</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Традиция украшать ёлку на Новый год пришла в Россию из Германии в начале XVIII века, во времена правления Петра I. Однако широкое распространение она получила только в XIX веке, когда немецкие принцессы, выходившие замуж за русских царей, принесли эту традицию ко двору.
              </p>
              <p className="text-base leading-relaxed mb-4">
                В советское время традиция новогодней ёлки была возрождена после того, как в 1935 году её официально разрешили. С тех пор ёлка стала неотъемлемой частью празднования Нового года в каждой советской, а затем и российской семье.
              </p>
              <p className="text-base leading-relaxed">
                Сегодня ёлка — это символ не только Нового года, но и семейных ценностей, традиций и тепла домашнего очага. В каждом доме есть свои особенные игрушки, которые передаются из поколения в поколение, и каждая семья имеет свои традиции украшения ёлки.
              </p>
            </CardContent>
          </Card>

          {/* Традиции украшения */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Традиции украшения</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                В России существует множество традиций, связанных с украшением ёлки. На макушке обычно устанавливают звезду или ангела — символы светлого праздника. Гирлянды создают атмосферу волшебства, а разноцветные шары и игрушки делают ёлку яркой и нарядной.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Особое место занимают игрушки, которые передаются из поколения в поколение. Старые стеклянные шары, фигурки животных, ангелы и другие украшения хранят память о прошлых праздниках и делают ёлку особенной для каждой семьи.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Традиционные элементы:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Звезда или ангел на макушке</li>
                  <li>Гирлянды с огоньками</li>
                  <li>Стеклянные шары разных цветов</li>
                  <li>Игрушки в виде животных, фигурок, фруктов</li>
                  <li>Дождик или мишура</li>
                  <li>Снежинки и другие зимние украшения</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Процесс украшения ёлки — это особый ритуал, который часто превращается в семейное мероприятие. Вместе с детьми родители развешивают игрушки, вспоминают прошлые праздники и создают новую магию Нового года.
              </p>
            </CardContent>
          </Card>

          {/* Живая или искусственная */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Живая или искусственная ёлка?</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                В России популярны как живые, так и искусственные ёлки. Живая ёлка имеет особый запах хвои, который ассоциируется с Новым годом, и создаёт неповторимую атмосферу. Однако искусственные ёлки более практичны — их можно использовать много лет, они не осыпаются и не требуют особого ухода.
              </p>
              <p className="text-base leading-relaxed mb-4">
                В последние годы всё больше людей выбирают искусственные ёлки из соображений экологии и практичности. Современные искусственные ёлки выглядят очень реалистично и могут служить долгие годы.
              </p>
              <p className="text-base leading-relaxed">
                Независимо от выбора, главное — это атмосфера, которую создаёт ёлка в доме. Она становится центром праздника, вокруг которого собирается семья, открываются подарки и загадываются желания.
              </p>
            </CardContent>
          </Card>

          {/* Новогодние ёлки в городах */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Главные ёлки страны</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                В каждом городе России устанавливают главную новогоднюю ёлку, которая становится центром праздничных мероприятий. Самая известная — ёлка на Красной площади в Москве. Она привлекает тысячи туристов и местных жителей, создавая неповторимую атмосферу праздника.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Главные ёлки городов украшают особенно ярко: тысячи огней, гирлянды, игрушки и специальное освещение создают настоящую сказку. Вокруг них проходят ярмарки, концерты и другие праздничные мероприятия.
              </p>
              <p className="text-base leading-relaxed">
                Посещение главной городской ёлки — это традиция для многих семей. Дети и взрослые фотографируются на её фоне, катаются на катке рядом, покупают горячие напитки и наслаждаются праздничной атмосферой.
              </p>
            </CardContent>
          </Card>

          {/* Значение ёлки */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что значит ёлка для россиян</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Для россиян ёлка — это не просто украшение, а символ Нового года, детства и семейных традиций. Она напоминает о тёплых моментах, проведённых с близкими, о подарках под ёлкой, о загадывании желаний и о волшебстве праздника.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Ёлка объединяет семьи и создаёт особую атмосферу уюта и праздника. Она становится центром внимания в доме, вокруг неё собираются за праздничным столом, открывают подарки и встречают Новый год.
              </p>
              <p className="text-base leading-relaxed">
                Традиция украшать ёлку передаётся из поколения в поколение, создавая связь между прошлым и настоящим. Каждая игрушка на ёлке может рассказать свою историю, а сам процесс украшения становится ритуалом, который объединяет семью.
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
                  <h3 className="text-lg font-semibold mb-2">Первая ёлка в России</h3>
                  <p className="text-base leading-relaxed">
                    Первая публичная новогодняя ёлка в России была установлена в 1852 году в Санкт-Петербурге в здании Екатерингофского вокзала. Это событие положило начало традиции публичных новогодних ёлок.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Советский период</h3>
                  <p className="text-base leading-relaxed">
                    В 1920-х годах новогодняя ёлка была запрещена как "буржуазный пережиток", но в 1935 году традиция была восстановлена. С тех пор ёлка стала символом советского Нового года.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Самая высокая ёлка</h3>
                  <p className="text-base leading-relaxed">
                    Самая высокая новогодняя ёлка в России была установлена в Москве на Красной площади в 2016 году — её высота составила 46 метров. Это была настоящая ель, специально привезённая из Подмосковья.
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

export default Elka;
