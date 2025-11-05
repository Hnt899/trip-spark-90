import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mountain, Camera, Heart, Star, Info } from "lucide-react";

const Interesnyemesta = () => {
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
          <Link to="/guide" className="hover:text-primary">Фишки России</Link>
          <span>/</span>
          <span>Интересные места</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Интересные места России, которые стоит посетить</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Россия — огромная страна с невероятным разнообразием природы, культуры и истории. Здесь есть места на любой вкус: от древних городов с богатой историей до нетронутых уголков дикой природы, от современных мегаполисов до уютных маленьких городов. Каждое место имеет свою уникальную атмосферу и историю.
              </p>
              <p className="text-base leading-relaxed">
                Путешествуя по России, можно открыть для себя невероятные места, о которых многие даже не знают. Это не только Москва и Санкт-Петербург, но и множество других городов, природных достопримечательностей и культурных объектов, которые стоят того, чтобы их увидеть.
              </p>
            </CardContent>
          </Card>

          {/* Природные достопримечательности */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Природные достопримечательности</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Россия богата уникальными природными объектами. Озеро Байкал — самое глубокое озеро в мире, которое часто называют "жемчужиной Сибири". Камчатка с её вулканами и гейзерами — это место, где можно увидеть настоящую дикую природу. Алтай с его горами и чистыми реками привлекает любителей активного отдыха.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Кавказские горы, Куршская коса, Ленские столбы, Плато Путорана — это лишь малая часть природных чудес России. Каждое место уникально и заслуживает внимания. Многие из них включены в список Всемирного наследия ЮНЕСКО.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Природные объекты ЮНЕСКО в России:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Озеро Байкал</li>
                  <li>Вулканы Камчатки</li>
                  <li>Золотые горы Алтая</li>
                  <li>Западный Кавказ</li>
                  <li>Ленские столбы</li>
                  <li>Плато Путорана</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Природные достопримечательности России — это возможность увидеть нетронутую природу, диких животных, уникальные ландшафты и почувствовать связь с природой.
              </p>
            </CardContent>
          </Card>

          {/* Исторические города */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Исторические города</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Россия богата историческими городами, каждый из которых имеет свою уникальную историю и архитектуру. Золотое кольцо России — это маршрут по старинным городам: Владимир, Суздаль, Ростов Великий, Ярославль, Кострома и другие. Эти города сохранили древнюю архитектуру и атмосферу старины.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Великий Новгород — один из древнейших городов России, где сохранились уникальные памятники древнерусской архитектуры. Псков с его крепостью и древними храмами — это место, где можно прикоснуться к истории. Казань сочетает русскую и татарскую культуры.
              </p>
              <p className="text-base leading-relaxed">
                Каждый исторический город России имеет свои особенности: уникальную архитектуру, традиции, кухню и атмосферу. Посещение этих городов — это путешествие в прошлое, возможность увидеть, как жили наши предки.
              </p>
            </CardContent>
          </Card>

          {/* Культурные объекты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Культурные объекты</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Россия богата культурными объектами: музеи, театры, галереи, архитектурные ансамбли. Эрмитаж в Санкт-Петербурге — один из крупнейших музеев мира. Третьяковская галерея в Москве — крупнейшая коллекция русского искусства. Большой театр — символ российского театрального искусства.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Кремль и Красная площадь в Москве, дворцы Петергофа, Царского Села, Павловска — это архитектурные шедевры, которые восхищают своей красотой. Монастыри и храмы — это не только религиозные, но и культурные объекты, которые хранят историю и искусство.
              </p>
              <p className="text-base leading-relaxed">
                Культурные объекты России — это возможность прикоснуться к искусству, истории и культуре страны, увидеть уникальные произведения искусства и архитектуры.
              </p>
            </CardContent>
          </Card>

          {/* Необычные места */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Необычные и малоизвестные места</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                В России есть множество необычных мест, о которых мало кто знает. Кунгурская ледяная пещера на Урале — это подземное царство льда и камня. Долина гейзеров на Камчатке — уникальное место, где из земли бьют горячие источники. Маньпупунёр — загадочные каменные столбы на Урале.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Калмыкия с её буддийскими храмами, Бурятия с её шаманскими традициями, республики Северного Кавказа с их уникальной культурой — это места, где можно открыть для себя совершенно другую Россию.
              </p>
              <p className="text-base leading-relaxed">
                Необычные места России — это возможность увидеть что-то уникальное, что не встречается больше нигде, и открыть для себя новые стороны этой огромной и разнообразной страны.
              </p>
            </CardContent>
          </Card>

          {/* Значение для туризма */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Почему стоит путешествовать по России</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Путешествие по России — это возможность открыть для себя огромную и разнообразную страну. Каждый регион имеет свою уникальную культуру, природу, историю и традиции. Путешествуя по России, можно увидеть, насколько она велика и разнообразна.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Это возможность прикоснуться к истории, увидеть уникальную природу, познакомиться с разными культурами и традициями. Путешествие по России — это не только отдых, но и обогащение, возможность узнать что-то новое о своей стране.
              </p>
              <p className="text-base leading-relaxed">
                Россия имеет огромный потенциал для туризма. Здесь есть всё: от пляжей на Чёрном море до горных вершин, от древних городов до современных мегаполисов, от дикой природы до культурных объектов мирового значения.
              </p>
            </CardContent>
          </Card>

          {/* Интересные факты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Интересные факты</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Самое большое озеро</h3>
                  <p className="text-base leading-relaxed">
                    Байкал — самое глубокое и одно из самых чистых озёр в мире. В нём содержится около 20% всей пресной воды на планете.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Золотое кольцо</h3>
                  <p className="text-base leading-relaxed">
                    Золотое кольцо России — это туристический маршрут по древним городам, который включает около 20 городов с богатой историей и культурой.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Объекты ЮНЕСКО</h3>
                  <p className="text-base leading-relaxed">
                    В России находится 30 объектов Всемирного наследия ЮНЕСКО, что делает её одной из самых богатых стран в этом плане.
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

export default Interesnyemesta;
