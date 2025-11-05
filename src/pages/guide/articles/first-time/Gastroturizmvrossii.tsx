import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, MapPin, Heart, Coffee, Info } from "lucide-react";

const Gastroturizmvrossii = () => {
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
          <Link to="/guide" className="hover:text-primary">Первый раз</Link>
          <span>/</span>
          <span>Гастротуризм в России</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Гастротуризм в России: куда ехать, чтобы вкусно поесть</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Россия — это не только огромная страна с богатой историей и культурой, но и настоящий гастрономический кладезь. Каждый регион имеет свои уникальные кулинарные традиции, проверенные веками рецепты и особые продукты, которые нигде больше не попробуешь.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Гастротуризм в России — это возможность не просто попробовать местную еду, а погрузиться в культуру, историю и традиции региона через его кухню. Это путешествие, где каждый приём пищи становится открытием.
              </p>
              <p className="text-base leading-relaxed">
                От уральских пельменей до кавказского шашлыка, от карельских калиток до сибирских строганин — гастрономическая карта России невероятно разнообразна и увлекательна.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Кавказ: царство шашлыков и хинкали</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Кавказ — это настоящая гастрономическая Мекка России. Каждый регион Кавказа имеет свои уникальные блюда, но все они объединены любовью к мясу, специям и долгим застольям.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Грузинская кухня</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Грузинская кухня — это хинкали, хачапури, чурчхела и, конечно, грузинское вино. В Тбилиси, Владикавказе или других городах с грузинскими ресторанами можно попробовать настоящие хинкали — большие пельмени с мясом и бульоном внутри, которые едят руками.
                  </p>
                  <p className="text-base leading-relaxed">
                    Хачапури — это не просто сыр в тесте, а целое искусство. Аджарский хачапури с яйцом, мегрельский с двойным сыром, имеретинский — каждый регион Грузии имеет свой рецепт. Грузинское вино, которое делают в квеври (глиняных кувшинах), имеет особый вкус и историю.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Армянская кухня</h3>
                  <p className="text-base leading-relaxed">
                    Армянская кухня славится лавашом, долмой, хашем и армянским коньяком. Хаш — это наваристый суп из говяжьих ножек, который традиционно едят рано утром. Это целый ритуал, который стоит попробовать хотя бы раз.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Дагестанская кухня</h3>
                  <p className="text-base leading-relaxed">
                    Дагестан предлагает хинкал (не путать с хинкали!), чуду (тонкие лепёшки с начинкой), курзе и уникальные сыры. Дагестанская кухня разнообразна, так как в республике живут более 30 народов, каждый со своими традициями.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Урал: пельмени и пироги</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Урал — родина пельменей, которые здесь считаются настоящим блюдом, а не просто закуской. Уральские пельмени делают с разными начинками: классические с мясом, с рыбой, с грибами, и даже сладкие с ягодами.
              </p>
              <p className="text-base leading-relaxed mb-4">
                В Перми и Екатеринбурге можно найти рестораны, специализирующиеся на пельменях, где вам предложат десятки видов этого блюда. Уральские пироги — это отдельная история. Шаньги, перепичи, курники — каждое блюдо имеет свою историю и секрет приготовления.
              </p>
              <p className="text-base leading-relaxed">
                Уральская кухня — это также блюда из дичи, лесных грибов и ягод. Местные рестораны часто предлагают блюда, приготовленные по старинным рецептам, которые передавались из поколения в поколение.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Сибирь: строганина и омуль</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Сибирь предлагает уникальные блюда, которые могут удивить даже опытных гурманов. Строганина — это замороженная рыба, нарезанная тонкими ломтиками, традиционное блюдо народов Севера. Это не просто еда, а целая культура приготовления и подачи.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Байкальский омуль — легендарная рыба, которую можно попробовать в Иркутске и на Байкале. Омуль готовят разными способами: жарят, коптят, вялят, но самый традиционный способ — это омуль на рожнах, приготовленный на костре.
              </p>
              <p className="text-base leading-relaxed">
                Сибирские пельмени отличаются от уральских — они больше размером и имеют свою особую рецептуру. Сибирская кухня — это также блюда из дичи, дикоросов и уникальные способы заготовки продуктов на долгую зиму.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Карелия: калитки и рыба</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Карелия — это особая кухня, которая сочетает в себе финские, русские и карельские традиции. Калитки — это открытые пирожки из ржаного теста с различными начинками: картофелем, рисом, яйцами, творогом. Это традиционное карельское блюдо, которое обязательно стоит попробовать.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Карелия — это также рыба. Озеро Ладога и Онежское озеро богаты рыбой, и местные рестораны предлагают блюда из свежей рыбы: уху, жареную рыбу, пироги с рыбой. Карельская уха — это не просто суп, а целое искусство, где важна последовательность закладки ингредиентов.
              </p>
              <p className="text-base leading-relaxed">
                В Карелии также стоит попробовать карельские блюда из дичи, грибов и ягод. Местная кухня проста, но вкусна, и основана на использовании местных продуктов.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как организовать гастротур по России</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Планирование маршрута</h3>
                  <p className="text-base leading-relaxed">
                    Выберите регион, кухня которого вас интересует, или составьте маршрут, охватывающий несколько регионов. Россия большая, поэтому лучше сосредоточиться на одном-двух регионах за поездку.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Исследование местных ресторанов</h3>
                  <p className="text-base leading-relaxed">
                    Ищите не только рестораны для туристов, но и местные кафе, столовые, домашние ресторанчики. Часто самые вкусные блюда можно найти в неприметных местах, где готовят по семейным рецептам.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Посещение рынков</h3>
                  <p className="text-base leading-relaxed">
                    Местные рынки — это не только место покупки продуктов, но и возможность увидеть, какие продукты характерны для региона, попробовать местные деликатесы и пообщаться с местными жителями.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Мастер-классы и экскурсии</h3>
                  <p className="text-base leading-relaxed">
                    Во многих регионах можно найти кулинарные мастер-классы, где вас научат готовить местные блюда. Это отличный способ не только попробовать еду, но и понять её приготовление.
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

export default Gastroturizmvrossii;
