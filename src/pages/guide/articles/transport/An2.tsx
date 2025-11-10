import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, History, CheckCircle, Star } from "lucide-react";

const An2 = () => {
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
          <span>Ан-2</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Ан-2: советский бестселлер</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Ан-2 — это легендарный биплан, который стал одним из самых массовых самолётов в истории авиации. Производившийся с 1947 года, этот самолёт до сих пор используется во многих странах мира благодаря своей надёжности и универсальности.
              </p>
              <p className="text-base leading-relaxed">
                Ан-2 — это настоящий долгожитель авиации, который продолжает работать спустя более 70 лет после начала производства. Его простота, надёжность и универсальность сделали его незаменимым для многих задач.
              </p>
            </CardContent>
          </Card>

          {/* Уникальные характеристики */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Уникальные характеристики</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ан-2 обладает уникальными характеристиками, которые делают его особенным самолётом.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Может взлетать и садиться на короткие неподготовленные площадки</li>
                    <li>Исключительная надёжность и простота конструкции</li>
                    <li>Универсальность: может использоваться для различных задач</li>
                    <li>Рекорд длительности производства — более 50 лет</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Эти характеристики делают Ан-2 идеальным для работы в труднодоступных местах, где другие самолёты не могут работать.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Короткие взлёт и посадка */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Короткие взлёт и посадка</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ан-2 может взлетать и садиться на очень короткие неподготовленные площадки, что делает его незаменимым для работы в отдалённых и труднодоступных местах.
                </p>
                <p className="text-base leading-relaxed">
                  Эта способность позволяет Ан-2 работать там, где другие самолёты не могут: на небольших аэродромах, полевых площадках, в тайге, тундре и других труднодоступных местах.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Надёжность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Исключительная надёжность</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ан-2 известен своей исключительной надёжностью и простотой конструкции. Простая и проверенная конструкция делает его лёгким в обслуживании и ремонте.
                </p>
                <p className="text-base leading-relaxed">
                  Эта надёжность позволяет Ан-2 работать в самых суровых условиях, где другие самолёты могут не справиться.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Универсальность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <History className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Универсальность</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ан-2 может использоваться для самых различных задач: перевозка пассажиров и грузов, сельскохозяйственные работы, тушение пожаров, санитарная авиация, обучение пилотов и многое другое.
                </p>
                <p className="text-base leading-relaxed">
                  Эта универсальность делает Ан-2 незаменимым для многих задач, особенно в отдалённых регионах, где нет других вариантов транспорта.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Рекорд производства */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Рекорд длительности производства</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ан-2 производился более 50 лет, что является рекордом для пассажирских самолётов. За это время было построено более 18 000 самолётов в различных странах.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Производство продолжалось в СССР, Польше и Китае, что говорит о популярности и востребованности этого самолёта.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Интересный факт:</strong> Ан-2 до сих пор производится в Китае под названием Y-5, что делает его одним из самых долгоживущих самолётов в истории авиации.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Применение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Применение Ан-2</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ан-2 используется во многих странах мира для самых различных задач. Он особенно популярен в отдалённых регионах, где нет развитой инфраструктуры.
                </p>
                <p className="text-base leading-relaxed">
                  Самолёт работает в России, странах СНГ, Китае и многих других странах, продолжая служить людям спустя десятилетия после начала производства.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Наследие */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <History className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Наследие Ан-2</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Ан-2 оставил огромное наследие в истории авиации. Он стал символом надёжности, простоты и универсальности, показав, что хороший самолёт может служить десятилетиями.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Опыт создания и эксплуатации Ан-2 используется при разработке новых самолётов, особенно для работы в труднодоступных местах.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Вывод:</strong> Ан-2 — это не просто самолёт, а легенда авиации, которая продолжает работать и служить людям спустя более 70 лет после начала производства. Он остаётся символом надёжности и универсальности.
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

export default An2;
