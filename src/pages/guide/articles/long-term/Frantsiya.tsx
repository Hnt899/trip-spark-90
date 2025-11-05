import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Coffee, Wine, Heart } from "lucide-react";

const Frantsiya = () => {
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
          <span>Франция</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как живут во Франции</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop" 
                  alt="Париж, Франция" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Франция — это страна искусства, культуры, вина и особого образа жизни. Французы ценят качество, эстетику и умение наслаждаться жизнью. Здесь можно остановиться надолго, погружаясь в французскую культуру и образ жизни.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Французский образ жизни</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Французы умеют наслаждаться жизнью: долгие обеды, качественная еда, вино, искусство и культура — это неотъемлемая часть их жизни.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop" 
                  alt="Франция, провинция" 
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

export default Frantsiya;
