import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Train, CreditCard, Smartphone, MapPin, CheckCircle } from "lucide-react";

const Gdepokupatbiletna = () => {
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
          <Link to="/guide" className="hover:text-primary">Полезно пассажиру</Link>
          <span>/</span>
          <span>Где покупать билет на электричку?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Где покупать билет на электричку?</h1>

        <div className="space-y-8">
          {/* Онлайн */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Онлайн</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li><strong>Сайт TudaSuda</strong> — удобная покупка билетов онлайн</li>
                  <li><strong>Официальный сайт РЖД</strong> — покупка билетов на пригородные поезда</li>
                  <li><strong>Мобильное приложение</strong> — покупка билетов через приложение</li>
                </ul>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Преимущества:</strong> Удобство, экономия времени, возможность покупки заранее.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* В кассе */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">В кассе на станции</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Билеты на электричку можно купить в кассе на любой железнодорожной станции или остановочном пункте.
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Кассы работают обычно с раннего утра до позднего вечера</li>
                  <li>Можно купить билет как заранее, так и непосредственно перед поездкой</li>
                  <li>Принимаются наличные и банковские карты</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* В автомате */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">В терминале самообслуживания</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  На многих станциях установлены терминалы самообслуживания для покупки билетов.
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Работают круглосуточно</li>
                  <li>Принимают банковские карты</li>
                  <li>Интерфейс интуитивно понятный</li>
                  <li>Помогают избежать очередей</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* В вагоне */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">У контроллера в вагоне</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Если вы не успели купить билет заранее, можно купить его у контроллера в вагоне.
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Дополнительная плата за покупку билета в вагоне обычно не взимается</li>
                  <li>Контроллер имеет право проверить документы</li>
                  <li>Лучше покупать билет заранее, чтобы избежать неудобств</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gdepokupatbiletna;
