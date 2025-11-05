import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Film, Book, Info, Star } from "lucide-react";

const Cheburashka = () => {
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
          <span>Чебурашка</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Чебурашка: история любимого персонажа</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Чебурашка — один из самых узнаваемых и любимых персонажей советской и российской культуры. Этот необычный зверёк с большими ушами покорил сердца миллионов людей не только в России, но и по всему миру. История Чебурашки началась с книги, продолжилась в мультфильмах и стала частью культурного наследия страны.
              </p>
              <p className="text-base leading-relaxed">
                Персонаж появился благодаря писателю Эдуарду Успенскому, который придумал его для книги "Крокодил Гена и его друзья". С тех пор Чебурашка стал символом дружбы, доброты и взаимопомощи.
              </p>
            </CardContent>
          </Card>

          {/* История создания */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Book className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">История создания</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Чебурашка был создан писателем Эдуардом Успенским в 1966 году. Первая книга о нём и его друзьях — крокодиле Гене и девочке Гале — вышла в 1966 году. Название "Чебурашка" появилось случайно: Успенский увидел в детском саду игрушку, которую дети называли именно так, потому что она постоянно "чебурахался" — падала.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Изначально Успенский не знал, что это за зверёк, и поэтому описал его как "неизвестного науке зверя". Позже в мультфильмах Чебурашку сделали похожим на маленького медвежонка с огромными ушами, что стало его визитной карточкой.
              </p>
              <p className="text-base leading-relaxed">
                Книга быстро стала популярной, и в 1969 году режиссёр Роман Качанов создал первый кукольный мультфильм о Чебурашке. Именно мультфильм сделал персонажа по-настоящему знаменитым.
              </p>
            </CardContent>
          </Card>

          {/* Мультфильмы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Film className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Мультфильмы о Чебурашке</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Всего было создано четыре мультфильма о Чебурашке: "Крокодил Гена" (1969), "Чебурашка" (1971), "Шапокляк" (1974) и "Чебурашка идёт в школу" (1983). Все они были сделаны в технике кукольной анимации на студии "Союзмультфильм".
              </p>
              <p className="text-base leading-relaxed mb-4">
                Мультфильмы полюбились зрителям не только за интересные истории, но и за запоминающиеся песни. Песня "Голубой вагон" из первого мультфильма стала настоящим хитом и до сих пор известна практически каждому в России.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Интересный факт:</p>
                <p className="text-sm leading-relaxed">
                  Голос Чебурашки в мультфильмах принадлежал Кларе Румяновой. Она сумела создать уникальный, узнаваемый голос персонажа — высокий и немного наивный, который идеально подходит к образу маленького доброго зверька.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Мультфильмы о Чебурашке стали классикой советской анимации и до сих пор показывают детям по всему миру. Они учат дружбе, взаимопомощи и тому, что настоящие друзья всегда готовы помочь в трудную минуту.
              </p>
            </CardContent>
          </Card>

          {/* Культурное значение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Культурное значение</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Чебурашка стал не просто персонажем, а настоящим символом российской культуры. Его образ узнаваем во всём мире, особенно в Японии, где он стал очень популярным. В Японии даже создали свои мультфильмы о Чебурашке, и он стал талисманом японской олимпийской сборной.
              </p>
              <p className="text-base leading-relaxed mb-4">
                В России Чебурашка — это часть детства многих поколений. Его образ используется в рекламе, сувенирах, на различных мероприятиях. Памятники Чебурашке установлены в разных городах России, включая Раменское, где родился Эдуард Успенский.
              </p>
              <p className="text-base leading-relaxed">
                Чебурашка олицетворяет такие качества, как доброта, дружелюбие, готовность помочь и оптимизм. Его история учит, что даже маленький и необычный зверёк может стать настоящим другом и помочь другим.
              </p>
            </CardContent>
          </Card>

          {/* Современность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Чебурашка сегодня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                В 2023 году на экраны вышел новый полнометражный фильм "Чебурашка" режиссёра Дмитрия Дьяченко. Фильм стал очень популярным и показал, что персонаж по-прежнему актуален и любим зрителями.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Современные адаптации сохраняют основные черты персонажа, но привносят новые элементы, делая историю актуальной для нового поколения. Чебурашка продолжает оставаться символом дружбы и добра.
              </p>
              <p className="text-base leading-relaxed">
                Образ Чебурашки используется в образовательных программах, на детских мероприятиях и в различных проектах, направленных на воспитание детей. Он продолжает учить важным ценностям: дружбе, взаимопомощи и доброте.
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
                  <h3 className="text-lg font-semibold mb-2">Происхождение названия</h3>
                  <p className="text-base leading-relaxed">
                    Слово "чебурашка" происходит от старого русского слова "чебурахнуться" — то есть упасть, грохнуться. Это идеально описывает персонажа, который постоянно падал, когда его только что смастерили.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Популярность в Японии</h3>
                  <p className="text-base leading-relaxed">
                    В Японии Чебурашка настолько популярен, что его называют "Чебурашка-сан". Там выпускают множество товаров с его изображением, и он стал частью японской поп-культуры.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Памятники</h3>
                  <p className="text-base leading-relaxed">
                    Памятники Чебурашке установлены в нескольких городах России: в Раменском, Кременчуге и других. Они стали популярными местами для фотосессий и привлекают туристов.
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

export default Cheburashka;
