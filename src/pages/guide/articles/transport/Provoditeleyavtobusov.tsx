import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Star, Info } from "lucide-react";

const Provoditeleyavtobusov = () => {
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
          <Link to="/guide" className="hover:text-primary">Транспорт</Link>
          <span>/</span>
          <span>Про водителей автобусов</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как водитель может резко улучшить впечатление от поездки в автобусе</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Водитель автобуса играет ключевую роль в создании впечатления от поездки. Вежливость, профессиональное вождение, внимание к пассажирам и позитивный настрой могут превратить обычную поездку в приятное путешествие.
              </p>
              <p className="text-base leading-relaxed">
                От работы водителя зависит не только безопасность поездки, но и комфорт пассажиров. Хороший водитель может сделать поездку приятной, а плохой — испортить впечатление даже от самого комфортного автобуса.
              </p>
            </CardContent>
          </Card>

          {/* Что делает хорошего водителя */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что делает хорошего водителя</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Хороший водитель автобуса обладает множеством качеств, которые делают поездку приятной и безопасной.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Плавное и аккуратное вождение</li>
                    <li>Внимательность к пассажирам</li>
                    <li>Вежливость и готовность помочь</li>
                    <li>Знание маршрута и остановок</li>
                    <li>Пунктуальность</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Все эти качества работают вместе, создавая положительное впечатление от поездки и обеспечивая безопасность пассажиров.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Плавное и аккуратное вождение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Плавное и аккуратное вождение</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Плавное и аккуратное вождение — это основа комфортной поездки. Резкие торможения, ускорения и повороты могут сделать поездку неприятной и даже опасной для пассажиров.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Хороший водитель предвидит дорожную ситуацию, плавно тормозит и ускоряется, аккуратно входит в повороты. Это особенно важно для стоящих пассажиров и людей с ограниченными возможностями.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Плавное вождение не только делает поездку комфортнее, но и повышает безопасность, снижая риск падений и травм пассажиров.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Внимательность к пассажирам */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Внимательность к пассажирам</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Внимательный водитель замечает, когда пассажирам нужна помощь: пожилым людям, людям с детьми, пассажирам с багажом. Он может подождать, пока пассажир сядет, или помочь с багажом.
                </p>
                <p className="text-base leading-relaxed">
                  Внимательность к пассажирам создаёт атмосферу заботы и делает поездку более приятной. Пассажиры чувствуют, что о них заботятся, что улучшает общее впечатление от поездки.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Вежливость и готовность помочь */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Вежливость и готовность помочь</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Вежливость водителя и его готовность помочь могут значительно улучшить впечатление от поездки. Доброжелательное отношение, готовность ответить на вопросы, помощь в ориентировании — всё это ценится пассажирами.
                </p>
                <p className="text-base leading-relaxed">
                  Вежливый водитель создаёт позитивную атмосферу в автобусе, что делает поездку приятной не только для отдельных пассажиров, но и для всех, кто находится в автобусе.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Знание маршрута */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Знание маршрута и остановок</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Хороший водитель хорошо знает свой маршрут и все остановки. Он может помочь пассажирам сориентироваться, подсказать, где лучше выйти, или предупредить о приближении нужной остановки.
                </p>
                <p className="text-base leading-relaxed">
                  Знание маршрута также помогает водителю выбирать оптимальные пути, избегая пробок и задержек, что делает поездку быстрее и эффективнее.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Пунктуальность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Пунктуальность</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Пунктуальность водителя важна для пассажиров, которые планируют свои поездки по расписанию. Соблюдение расписания делает общественный транспорт надёжным и предсказуемым.
                </p>
                <p className="text-base leading-relaxed">
                  Хороший водитель старается соблюдать расписание, но при этом не жертвует безопасностью и комфортом пассажиров ради скорости.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Влияние водителя на впечатление */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Влияние водителя на впечатление от поездки</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Водитель может резко улучшить впечатление от поездки, даже если автобус не самый новый или комфортный. Его отношение, профессионализм и внимание к пассажирам создают атмосферу, которая делает поездку приятной.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  С другой стороны, даже самый комфортный автобус не спасёт поездку, если водитель груб, невнимателен или водит неаккуратно.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Вывод:</strong> Водитель — это лицо общественного транспорта. Его профессионализм, вежливость и внимание к пассажирам могут превратить обычную поездку в приятное путешествие и создать положительное впечатление о городском транспорте в целом.
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

export default Provoditeleyavtobusov;
