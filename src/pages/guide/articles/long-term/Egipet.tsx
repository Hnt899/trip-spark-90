import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, MapPin, History, Waves, Info } from "lucide-react";

const Egipet = () => {
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
          <Link to="/guide" className="hover:text-primary">Надолго в другую страну</Link>
          <span>/</span>
          <span>Египет</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Египет: долгий отпуск по местному времени</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=500&fit=crop" 
                  alt="Египет, пирамиды" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Египет — это страна с древнейшей историей, где время течёт по-другому. Здесь можно задержаться надолго, наслаждаясь тёплым климатом, богатой культурой, Красным морем и невероятными историческими памятниками.
              </p>
              <p className="text-base leading-relaxed">
                Жизнь в Египте неспешна, здесь принято наслаждаться моментом и не торопиться.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <History className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Древняя история и культура</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Египет предлагает уникальную возможность погрузиться в древнюю историю. Пирамиды Гизы, Луксор, Карнак, Долина Царей — каждый день можно открывать для себя что-то новое из истории древней цивилизации.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Пирамиды и сфинксы</li>
                  <li>Древние храмы и гробницы</li>
                  <li>Богатая история и археология</li>
                  <li>Традиционная культура</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Waves className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Красное море и дайвинг</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Красное море — одно из лучших мест в мире для дайвинга и снорклинга. Коралловые рифы, разнообразная морская жизнь и кристально чистая вода привлекают любителей подводного плавания со всего мира.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1563551964492-395a2b8e0ffa?w=800&h=500&fit=crop" 
                  alt="Египет, Красное море" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Где жить</h2>
              </div>
              <p className="text-base leading-relaxed">
                Хургада, Шарм-эль-Шейх на побережье Красного моря, Каир для изучения истории — разные города предлагают разные возможности для долгосрочного пребывания.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Egipet;
