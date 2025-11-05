import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Waves, Sun, MapPin, TreePine } from "lucide-react";

const KostaRika = () => {
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
          <span>Коста-Рика</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как живут в Коста-Рике</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=500&fit=crop" 
                  alt="Коста-Рика, природа" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Коста-Рика — это страна «чистой жизни» (pura vida), где природа и экология стоят на первом месте. Здесь можно жить в гармонии с природой, наслаждаться тропическим климатом и спокойным ритмом жизни.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TreePine className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Экология и природа</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Коста-Рика — лидер в области экологии и сохранения природы. Здесь множество национальных парков, заповедников, и страна стремится к углеродной нейтральности.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=500&fit=crop" 
                  alt="Коста-Рика, джунгли" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KostaRika;
