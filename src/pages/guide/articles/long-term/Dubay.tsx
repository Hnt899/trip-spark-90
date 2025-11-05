import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Sun, MapPin, Star, Info } from "lucide-react";

const Dubay = () => {
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
          <span>Дубай</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Дубай: долгий отпуск мирового масштаба</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=500&fit=crop" 
                  alt="Дубай, ОАЭ" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Дубай — это город будущего, где роскошь сочетается с инновациями. Современные небоскрёбы, искусственные острова, самые высокие здания в мире и бесконечные возможности для развлечений делают его уникальным местом для долгого пребывания.
              </p>
              <p className="text-base leading-relaxed">
                Дубай привлекает бизнесменов, экспатов и всех, кто хочет жить в комфорте и роскоши в окружении современной архитектуры.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Особенности жизни в Дубае</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Дубай предлагает высокий уровень жизни, безопасность, отличную инфраструктуру и множество развлечений. Здесь работают люди со всего мира, создавая международную атмосферу.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Высокий уровень безопасности</li>
                  <li>Отличная инфраструктура</li>
                  <li>Множество развлечений и шопинга</li>
                  <li>Международное сообщество</li>
                  <li>Налоговые преимущества</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sun className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Климат и особенности</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Дубай расположен в пустыне, поэтому летом здесь очень жарко. Однако развитая система кондиционирования, закрытые торговые центры и пляжи делают жизнь комфортной круглый год.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=800&h=500&fit=crop" 
                  alt="Дубай, современная архитектура" 
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

export default Dubay;
