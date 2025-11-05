import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Waves, Sun, MapPin, Heart, Info } from "lucide-react";

const Bali = () => {
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
          <span>Бали</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Бали: долгий отпуск в поисках своей волны</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=500&fit=crop" 
                  alt="Бали, Индонезия - пляжи и природа" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Бали — это остров мечты для многих путешественников, ищущих баланс между работой, отдыхом и духовным развитием. Здесь можно остаться надолго, наслаждаясь тропическим климатом, красивой природой и особой атмосферой.
              </p>
              <p className="text-base leading-relaxed">
                Бали привлекает цифровых кочевников, йогов, серферов и всех, кто хочет замедлить темп жизни и найти свой ритм.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Waves className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Образ жизни на Бали</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Жизнь на Бали течёт неспешно. Здесь принято рано вставать, заниматься йогой или сёрфингом, работать в коворкингах или на пляже, и наслаждаться простыми радостями жизни. Балийцы известны своим дружелюбием и духовностью.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Ранний подъём и активное утро</li>
                  <li>Йога и медитация</li>
                  <li>Сёрфинг и водные виды спорта</li>
                  <li>Работа из коворкингов или кафе</li>
                  <li>Спокойные вечера и здоровое питание</li>
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
                <h2 className="text-2xl font-bold">Где остановиться</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Чангу, Семиньяк, Убуд — популярные районы для долгосрочного пребывания. Убуд предлагает спокойную атмосферу в джунглях, а прибрежные районы — близость к пляжам и сёрфингу.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop" 
                  alt="Бали, рисовые террасы и храмы" 
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
                <h2 className="text-2xl font-bold">Что делать на Бали</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Сёрфинг</h3>
                  <p className="text-base leading-relaxed">
                    Бали — рай для сёрферов всех уровней. Здесь множество сёрф-спотов для начинающих и продвинутых.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Йога и велнес</h3>
                  <p className="text-base leading-relaxed">
                    Остров славится своими йога-студиями, спа-центрами и центрами велнеса.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Исследование природы</h3>
                  <p className="text-base leading-relaxed">
                    Рисовые террасы, вулканы, водопады, храмы — на Бали есть множество мест для исследования.
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

export default Bali;
