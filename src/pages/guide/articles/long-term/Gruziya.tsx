import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Mountain, MapPin, Coffee, Wine, Heart } from "lucide-react";

const Gruziya = () => {
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
          <span>Грузия</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Грузия: понятный долгий отпуск</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop" 
                  alt="Тбилиси, Грузия" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Грузия — это страна, которая близка русскому сердцу. Близость культуры, гостеприимство местных жителей, потрясающая природа и отличная кухня делают её идеальным местом для долгого отпуска.
              </p>
              <p className="text-base leading-relaxed">
                Здесь легко чувствовать себя комфортно, понимать местных и наслаждаться всем лучшим, что может предложить эта прекрасная страна.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Грузинское гостеприимство</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Грузины известны своим гостеприимством. Здесь вам всегда рады, угостят лучшим, что есть в доме, и сделают всё, чтобы вы почувствовали себя как дома. Это создаёт особую атмосферу для долгого пребывания.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Радушное отношение к гостям</li>
                  <li>Богатые застолья (супра)</li>
                  <li>Дружелюбность и открытость</li>
                  <li>Готовность помочь и поддержать</li>
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
                <h2 className="text-2xl font-bold">Тбилиси и другие города</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Тбилиси — столица с особой атмосферой, старыми кварталами, серными банями и современными кафе. Батуми на побережье, Бакуриани в горах — каждый город предлагает свой уникальный опыт.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop" 
                  alt="Грузия, горы и природа" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wine className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Грузинская кухня и вино</h2>
              </div>
              <p className="text-base leading-relaxed">
                Грузинская кухня — это отдельная вселенная: хинкали, хачапури, шашлык, разнообразные салаты и закуски. Грузинское вино славится на весь мир, и дегустация в винодельнях — обязательный опыт.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gruziya;
