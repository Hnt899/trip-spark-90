import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, Heart, Leaf, Info, ChefHat } from "lucide-react";

const Kvashenayakapusta = () => {
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
          <span>Квашеная капуста</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Квашеная капуста: традиционное русское блюдо</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Квашеная капуста — это не просто еда, а настоящая русская традиция, которая прошла через века и сохранилась до наших дней. Это блюдо ассоциируется с домашним уютом, бабушкиными рецептами и зимними вечерами. Квашеная капуста — это неотъемлемая часть русской кухни и культуры питания.
              </p>
              <p className="text-base leading-relaxed">
                В России квашеная капуста была и остаётся одним из самых популярных блюд, особенно в зимний период. Она не только вкусна, но и очень полезна, богата витаминами и помогает поддерживать здоровье в холодное время года.
              </p>
            </CardContent>
          </Card>

          {/* История и традиции */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">История и традиции</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Квашеная капуста имеет давнюю историю в России. Ещё в древности люди заметили, что капуста, заквашенная с солью, долго хранится и сохраняет свои полезные свойства. Это было особенно важно в условиях долгих русских зим, когда свежих овощей не было.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Традиционно капусту квасили осенью, после сбора урожая. Весь процесс был важным семейным событием: собирались всей семьёй, нарезали капусту, добавляли морковь, соль и специи, затем укладывали в большие бочки или кадки и оставляли кваситься.
              </p>
              <p className="text-base leading-relaxed">
                В каждой семье был свой рецепт, передававшийся из поколения в поколение. Некоторые добавляли яблоки, клюкву или бруснику, другие — тмин или укроп. Но основа всегда оставалась одинаковой: капуста, соль и время.
              </p>
            </CardContent>
          </Card>

          {/* Процесс квашения */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как квасят капусту</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Процесс квашения капусты довольно прост, но требует времени и терпения. Свежую капусту мелко нарезают, добавляют натёртую морковь, соль и специи, затем всё тщательно перемешивают и мнут руками, чтобы капуста пустила сок.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Подготовленную капусту укладывают в ёмкость (раньше использовали деревянные бочки, сейчас чаще стеклянные банки или эмалированные кастрюли), плотно утрамбовывают и оставляют при комнатной температуре на несколько дней. За это время начинается процесс брожения.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Основные ингредиенты:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Белокочанная капуста</li>
                  <li>Морковь</li>
                  <li>Соль (примерно 2% от веса капусты)</li>
                  <li>Специи (тмин, укроп, лавровый лист — по желанию)</li>
                  <li>Дополнительно: яблоки, клюква, брусника</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Во время квашения важно периодически протыкать капусту, чтобы выпустить образующийся газ. Готовая квашеная капуста имеет кисловатый вкус, хрустящую текстуру и приятный аромат. Хранят её в прохладном месте.
              </p>
            </CardContent>
          </Card>

          {/* Польза для здоровья */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Польза для здоровья</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Квашеная капуста — это настоящий кладезь витаминов и полезных веществ. Она богата витамином C, который особенно важен в зимний период, когда свежих овощей и фруктов мало. Исторически квашеная капуста спасала русских людей от цинги во время долгих зим.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Кроме того, квашеная капуста содержит пробиотики — полезные бактерии, которые улучшают пищеварение и поддерживают здоровье кишечника. Она также богата клетчаткой, витаминами группы B, калием и другими микроэлементами.
              </p>
              <p className="text-base leading-relaxed">
                Регулярное употребление квашеной капусты способствует укреплению иммунитета, улучшению пищеварения и общему оздоровлению организма. Это делает её особенно ценной в условиях русской зимы.
              </p>
            </CardContent>
          </Card>

          {/* Как едят квашеную капусту */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как едят квашеную капусту</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Квашеная капуста — универсальное блюдо, которое можно есть как самостоятельное, так и в составе различных блюд. Её подают как закуску, добавляют в салаты, используют как начинку для пирогов и вареников.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Классическое сочетание — квашеная капуста с картошкой, жареной или варёной. Также популярны блюда, где квашеная капуста тушится с мясом, сосисками или сардельками. Щи из квашеной капусты — одно из самых известных русских блюд.
              </p>
              <p className="text-base leading-relaxed">
                Квашеную капусту часто заправляют растительным маслом, луком или добавляют к ней другие овощи. Она отлично сочетается с мясными блюдами и является неотъемлемой частью традиционного русского застолья.
              </p>
            </CardContent>
          </Card>

          {/* Культурное значение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Культурное значение</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Квашеная капуста — это не просто еда, а часть русской культуры и традиций. Она ассоциируется с домашним уютом, семейными традициями и русской кухней. Для многих россиян запах квашеной капусты — это запах детства и бабушкиного дома.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Это блюдо часто упоминается в русской литературе и фольклоре. Оно стало символом простой, но вкусной и полезной русской кухни. Квашеная капуста — это то, что объединяет разные поколения и напоминает о корнях.
              </p>
              <p className="text-base leading-relaxed">
                Даже сегодня, когда доступны самые разные продукты, квашеная капуста остаётся популярной. Многие продолжают квасить её дома, следуя семейным рецептам, а другие покупают готовую, но всегда с любовью и уважением к традиции.
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
                  <h3 className="text-lg font-semibold mb-2">Витамин C</h3>
                  <p className="text-base leading-relaxed">
                    Квашеная капуста содержит больше витамина C, чем свежая. Это происходит благодаря процессу квашения, который способствует сохранению и даже увеличению количества витаминов.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Щи из квашеной капусты</h3>
                  <p className="text-base leading-relaxed">
                    Щи из квашеной капусты — одно из самых известных русских блюд. Это суп, который готовили на Руси веками и который до сих пор популярен в России.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Традиция квашения</h3>
                  <p className="text-base leading-relaxed">
                    В старину квашение капусты было важным событием осени. Собирались всей деревней, помогали друг другу, и это было не только работой, но и праздником, возможностью пообщаться и поделиться новостями.
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

export default Kvashenayakapusta;
