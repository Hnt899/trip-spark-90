import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, MapPin, Coffee, Waves, Heart } from "lucide-react";

const Ispaniya = () => {
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
          <span>Испания</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как живут в Испании</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=500&fit=crop" 
                  alt="Барселона, Испания" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Испания — это страна солнца, сиесты, вкусной еды и размеренной жизни. Испанцы умеют наслаждаться каждым моментом, ценить общение с друзьями и семьёй, и не торопиться.
              </p>
              <p className="text-base leading-relaxed">
                Жизнь в Испании — это баланс между работой и отдыхом, где послеобеденная сиеста и долгие вечерние прогулки — это неотъемлемая часть культуры.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Ритм жизни в Испании</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Испанцы живут по своему ритму: поздний обед, сиеста, поздний ужин и активная вечерняя жизнь. Здесь принято много времени проводить на улице, в кафе и ресторанах, общаться с друзьями.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Сиеста — послеобеденный отдых</li>
                  <li>Поздние обеды (14-15 часов) и ужины (21-22 часа)</li>
                  <li>Активная вечерняя жизнь</li>
                  <li>Любовь к фестивалям и праздникам</li>
                  <li>Общение и социальная активность</li>
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
                Барселона, Мадрид, Валенсия, Севилья — каждый город предлагает свой характер и возможности. Прибрежные города привлекают пляжами, столицы — культурой и возможностями.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&h=500&fit=crop" 
                  alt="Испания, архитектура и пляжи" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Испанская кухня</h2>
              </div>
              <p className="text-base leading-relaxed">
                Тапас, паэлья, хамон, сангрия — испанская кухня разнообразна и вкусна. Испанцы любят есть вместе, пробовать разные блюда и наслаждаться едой как социальным опытом.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Ispaniya;
