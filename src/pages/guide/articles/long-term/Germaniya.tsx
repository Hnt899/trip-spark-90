import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Coffee, Info } from "lucide-react";

const Germaniya = () => {
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
          <span>Германия</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как живут в Германии</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=500&fit=crop" 
                  alt="Берлин, Германия" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Германия — это страна порядка, высокого качества жизни и развитой инфраструктуры. Немцы известны своей пунктуальностью, дисциплиной и стремлением к качеству во всём.
              </p>
              <p className="text-base leading-relaxed">
                Жизнь в Германии комфортна и предсказуема, с высоким уровнем безопасности, отличным общественным транспортом и развитой социальной системой.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Образ жизни в Германии</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Немцы ценят порядок, приватность и качество. Здесь принято планировать всё заранее, соблюдать правила и уважать личное пространство других. Работа и личная жизнь строго разделены.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Пунктуальность и планирование</li>
                  <li>Разделение работы и личной жизни</li>
                  <li>Любовь к природе и активному отдыху</li>
                  <li>Качество и надёжность</li>
                  <li>Экологическое сознание</li>
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
                <h2 className="text-2xl font-bold">Где жить</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Берлин, Мюнхен, Гамбург — крупные города с разнообразными возможностями. Берлин привлекает творческих людей, Мюнхен — высоким качеством жизни, Гамбург — портовой атмосферой.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=800&h=500&fit=crop" 
                  alt="Германия, природа и города" 
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

export default Germaniya;
