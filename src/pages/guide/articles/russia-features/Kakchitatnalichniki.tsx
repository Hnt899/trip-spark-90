import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Book, Heart, Info, Building2, Eye } from "lucide-react";

const Kakchitatnalichniki = () => {
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
          <span>Как читать наличники</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как читать наличники: язык деревянной резьбы</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Наличники — это резные деревянные доски, которые обрамляют окна в традиционных русских домах. Они не только украшают дом, но и несут в себе глубокий смысл. Каждый узор, каждый символ имеет своё значение, связанное с древними верованиями, оберегами и пожеланиями благополучия.
              </p>
              <p className="text-base leading-relaxed">
                Умение "читать" наличники — это способ понять старинную русскую культуру, верования и традиции. Это искусство, которое передавалось из поколения в поколение и сохранилось до наших дней в старинных деревнях и городах России.
              </p>
            </CardContent>
          </Card>

          {/* Что такое наличники */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Home className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что такое наличники</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Наличники — это резные доски, которые обрамляют окна снаружи дома. Они состоят из нескольких частей: верхняя часть (очелье или кокошник), боковые части (вертикальные доски) и нижняя часть (подоконная доска или фартук). Каждая часть может быть украшена резьбой с определённым смыслом.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Традиционно наличники изготавливались из дерева — сосны, липы, осины. Мастера вырезали узоры вручную, используя специальные инструменты. Каждый мастер имел свой стиль, но при этом соблюдал общие традиции и символы.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Части наличника:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li><strong>Очелье (кокошник)</strong> — верхняя часть, часто самая украшенная</li>
                  <li><strong>Боковые доски</strong> — вертикальные элементы по бокам окна</li>
                  <li><strong>Подоконная доска (фартук)</strong> — нижняя часть под окном</li>
                  <li><strong>Навершие</strong> — декоративный элемент на самом верху</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Наличники не только украшали дом, но и служили оберегами, защищающими жилище от злых духов и невзгод. Каждый символ имел своё значение и предназначение.
              </p>
            </CardContent>
          </Card>

          {/* Основные символы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Основные символы на наличниках</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                В резьбе наличников используются различные символы, каждый из которых имеет своё значение. Солнце — символ жизни, света и тепла. Часто изображается в виде круга с лучами или розетки. Вода — символ чистоты и жизни, изображается в виде волнистых линий.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Растительные мотивы — это символы роста, плодородия и жизни. Дерево жизни — символ связи между небом и землёй, рода и семьи. Виноград — символ изобилия и радости. Цветы и листья — символы красоты и жизни.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Звериные мотивы тоже имеют своё значение. Конь — символ солнца и добра. Птицы — символы души и связи с небом. Змеи — символы мудрости и защиты. Каждый символ в сочетании с другими создаёт целостную картину оберега и пожелания.
              </p>
              <p className="text-base leading-relaxed">
                Геометрические узоры — ромбы, треугольники, кресты — также имеют символическое значение. Ромб — символ плодородия, крест — символ защиты, треугольник — символ единства земли, неба и подземного мира.
              </p>
            </CardContent>
          </Card>

          {/* Региональные особенности */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Региональные особенности</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                В разных регионах России наличники имеют свои особенности. В Поволжье распространены наличники с богатой растительной резьбой, в Сибири — более простые геометрические узоры, на Русском Севере — сложные сюжетные композиции.
              </p>
              <p className="text-base leading-relaxed mb-4">
                В каждом регионе мастера развивали свой стиль, но при этом сохраняли общие традиции и символы. Это создавало уникальное разнообразие русской деревянной архитектуры, где каждый дом был неповторим.
              </p>
              <p className="text-base leading-relaxed">
                Изучение наличников разных регионов позволяет понять, как развивалась русская культура, как сохранялись и передавались традиции, как местные особенности влияли на искусство резьбы по дереву.
              </p>
            </CardContent>
          </Card>

          {/* Как читать наличники */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Book className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как читать наличники</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Чтение наличников — это умение понимать язык символов. Нужно знать значение основных символов и понимать, как они сочетаются друг с другом. Обычно наличники читаются сверху вниз: от неба (очелье) к земле (подоконная доска).
              </p>
              <p className="text-base leading-relaxed mb-4">
                Верхняя часть наличника (очелье) часто символизирует небо, солнце, связь с высшими силами. Боковые части — это связь между небом и землёй, защита от злых сил. Нижняя часть — земля, плодородие, благополучие.
              </p>
              <p className="text-base leading-relaxed">
                При чтении наличников важно учитывать не только отдельные символы, но и общую композицию. Мастера создавали целостные образы, где каждый элемент дополняет другие, создавая единое послание — оберег для дома и его жителей.
              </p>
            </CardContent>
          </Card>

          {/* Современность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Наличники сегодня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Сегодня традиция резных наличников продолжает жить. Многие мастера возрождают старинные техники и создают наличники по старинным образцам. В некоторых регионах создаются мастерские и школы, где обучают искусству резьбы по дереву.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Старинные наличники сохраняются в музеях деревянного зодчества, в старинных деревнях и городах. Они являются важной частью культурного наследия России и помогают понять традиции и верования наших предков.
              </p>
              <p className="text-base leading-relaxed">
                Изучение наличников — это не только изучение искусства, но и понимание русской культуры, верований и традиций. Это способ сохранить и передать знания о том, как жили и думали наши предки, что они ценили и чего желали.
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
                  <h3 className="text-lg font-semibold mb-2">Обережная функция</h3>
                  <p className="text-base leading-relaxed">
                    Наличники не только украшали дом, но и служили оберегами. Считалось, что резные узоры защищают дом от злых духов и невзгод. Окна считались "глазами" дома, и наличники защищали их.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Традиции мастеров</h3>
                  <p className="text-base leading-relaxed">
                    Искусство резьбы по дереву передавалось из поколения в поколение. Мастера имели свои секреты и стили, но при этом соблюдали общие традиции и символы. Каждый мастер оставлял свой след в этом искусстве.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Музеи наличников</h3>
                  <p className="text-base leading-relaxed">
                    В России есть музеи деревянного зодчества, где можно увидеть старинные наличники и узнать об их значении. Это помогает сохранить это искусство и передать знания будущим поколениям.
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

export default Kakchitatnalichniki;
