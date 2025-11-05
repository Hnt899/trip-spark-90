import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, MapPin, Music, Coffee, Info } from "lucide-react";

const Braziliya = () => {
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
          <span>Бразилия</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как живут в Бразилии</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=500&fit=crop" 
                  alt="Рио-де-Жанейро, Бразилия" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Бразилия — это страна контрастов, где роскошь соседствует с бедностью, а современные мегаполисы граничат с дикими джунглями. Жизнь в Бразилии полна энергии, музыки, танцев и позитивного отношения к жизни.
              </p>
              <p className="text-base leading-relaxed">
                Бразильцы известны своим оптимизмом, открытостью и любовью к жизни, несмотря на все трудности.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Music className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Культура и ритм жизни</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Бразилия — это страна музыки, карнавала и футбола. Здесь принято встречаться с друзьями, ходить на пляжи, слушать самбу и босса-нову, и наслаждаться каждым моментом жизни.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Любовь к музыке и танцам</li>
                  <li>Активная социальная жизнь</li>
                  <li>Пляжная культура</li>
                  <li>Страсть к футболу</li>
                  <li>Карнавалы и праздники</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Где жить в Бразилии</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Рио-де-Жанейро, Сан-Паулу, Флорианополис — крупные города с развитой инфраструктурой. Прибрежные города предлагают красивую природу и пляжную жизнь.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop" 
                  alt="Бразилия, природа и пляжи" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Особенности жизни</h2>
              </div>
              <p className="text-base leading-relaxed">
                Бразилия — большая и разнообразная страна. Климат, образ жизни и культура сильно различаются по регионам. Важно быть готовым к контрастам и научиться ориентироваться в местных особенностях.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Braziliya;
