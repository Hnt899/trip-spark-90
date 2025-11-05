import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, MapPin, Heart, Info, CheckCircle } from "lucide-react";

const Gastrotury = () => {
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
          <span>Гастротуры</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Гастротур: что это и с чем его едят</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Гастротур — это путешествие, главной целью которого является знакомство с местной кухней, кулинарными традициями и гастрономической культурой региона или страны. Это не просто поездка, чтобы поесть, а глубокое погружение в культуру через еду.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Гастротуризм стал одним из самых быстрорастущих видов туризма в мире. Люди всё больше хотят не просто увидеть достопримечательности, но и понять, как живут местные жители, что они едят, как готовят, какие традиции связаны с едой.
              </p>
              <p className="text-base leading-relaxed">
                Гастротур — это возможность открыть для себя новые вкусы, узнать историю блюд, попробовать продукты, которые нельзя найти в других местах, и научиться готовить местные деликатесы.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что включает гастротур</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Дегустации и экскурсии</h3>
                  <p className="text-base leading-relaxed">
                    Посещение ресторанов, кафе, столовых, где готовят аутентичные блюда. Экскурсии на местные рынки, фермы, производства, где можно увидеть, как создаются продукты. Дегустации вин, сыров, местных деликатесов.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Кулинарные мастер-классы</h3>
                  <p className="text-base leading-relaxed">
                    Обучение приготовлению местных блюд под руководством профессиональных поваров или местных жителей. Это не просто готовка, а погружение в традиции, изучение секретов и техник, которые передаются из поколения в поколение.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Знакомство с производителями</h3>
                  <p className="text-base leading-relaxed">
                    Посещение ферм, виноделен, сыроварен, пивоварен, где можно узнать, как производятся продукты, попробовать их прямо с производства и понять, что делает их особенными.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Культурный контекст</h3>
                  <p className="text-base leading-relaxed">
                    Изучение истории блюд, традиций их подачи, ритуалов, связанных с едой. Понимание, как еда связана с культурой, религией, историей региона.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Почему гастротуры так популярны</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Еда — это универсальный язык, который понятен всем. Через еду можно понять культуру, историю, традиции региона лучше, чем через любые экскурсии. Гастротур — это способ путешествовать глубже, чувствовать место, а не просто видеть его.
              </p>
              <p className="text-base leading-relaxed mb-4">
                В современном мире, где глобализация стирает различия, местная кухня остаётся одним из последних бастионов уникальности региона. Попробовать настоящую паэлью в Валенсии, съесть настоящие хинкали в Тбилиси, попробовать настоящую строганину в Якутии — это уникальные впечатления, которые нельзя получить дома.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Преимущества гастротуров:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Глубокое погружение в культуру через еду</li>
                  <li>Уникальные вкусовые впечатления</li>
                  <li>Возможность научиться готовить местные блюда</li>
                  <li>Знакомство с местными жителями и их традициями</li>
                  <li>Понимание истории и культуры региона</li>
                  <li>Эмоциональная связь с местом через вкусы и запахи</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как выбрать гастротур</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Определите свои интересы</h3>
                  <p className="text-base leading-relaxed">
                    Что вас интересует больше: вина, морепродукты, мясные блюда, десерты, уличная еда? Или вы хотите общий обзор кухни региона? Это поможет выбрать правильный гастротур.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Выберите регион</h3>
                  <p className="text-base leading-relaxed">
                    Каждая страна и регион имеет свою уникальную кухню. Италия славится пастой и пиццей, Япония — суши и раменом, Мексика — тако и специями. Выберите регион, кухня которого вас интересует.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Изучите программу</h3>
                  <p className="text-base leading-relaxed">
                    Хороший гастротур должен включать не только посещение ресторанов, но и мастер-классы, экскурсии, встречи с местными жителями. Убедитесь, что программа разнообразна и интересна.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Проверьте отзывы</h3>
                  <p className="text-base leading-relaxed">
                    Отзывы других путешественников помогут понять, насколько тур соответствует описанию и вашим ожиданиям. Обратите внимание на отзывы о качестве еды, организации и гидах.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Советы для первого гастротура</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Будьте открыты новому</h3>
                  <p className="text-base leading-relaxed">
                    Гастротур — это возможность попробовать то, что вы никогда не пробовали. Не бойтесь экспериментировать, даже если блюдо выглядит необычно. Часто самые странные на вид блюда оказываются самыми вкусными.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Не переедайте</h3>
                  <p className="text-base leading-relaxed">
                    В гастротуре обычно много дегустаций и приёмов пищи. Не старайтесь съесть всё сразу — лучше попробовать понемногу, чтобы почувствовать вкус каждого блюда. Помните, что еда — это не только еда, но и опыт.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Задавайте вопросы</h3>
                  <p className="text-base leading-relaxed">
                    Не стесняйтесь спрашивать о блюдах, их истории, способах приготовления. Повара и местные жители обычно с радостью делятся знаниями. Это поможет вам глубже понять кухню и культуру.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Делайте заметки</h3>
                  <p className="text-base leading-relaxed">
                    Записывайте названия блюд, которые вам понравились, рецепты, названия ресторанов. Это поможет вам воспроизвести впечатления дома или вернуться в понравившиеся места.
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

export default Gastrotury;
