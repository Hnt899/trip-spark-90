import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Users, Globe, Star, Eye } from "lucide-react";

const Pochemumyputeshestvuem = () => {
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
          <Link to="/guide" className="hover:text-primary">Разборы</Link>
          <span>/</span>
          <span>Почему мы путешествуем</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Почему мы путешествуем: отвечают учёные</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Путешествия — одна из самых древних и универсальных человеческих потребностей. Люди путешествовали всегда: в поисках пищи, новых земель, торговли, знаний или просто ради приключений.
              </p>
              <p className="text-base leading-relaxed">
                Современная наука — психология, нейробиология, антропология — помогает нам понять, почему путешествия так важны для человека и как они влияют на наш мозг, здоровье и благополучие.
              </p>
            </CardContent>
          </Card>

          {/* Психологические причины */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Психологические причины</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Стремление к новым впечатлениям</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Человеческий мозг устроен так, что новые впечатления и опыт активируют центры удовольствия. Когда мы видим что-то новое, наш мозг выделяет дофамин — нейромедиатор, связанный с удовольствием и мотивацией.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed">
                      Путешествия дают постоянный поток новых стимулов: новые места, запахи, звуки, вкусы, люди. Это создаёт состояние «потока» и удовольствия.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Потребность в переменах</h3>
                  <p className="text-base leading-relaxed">
                    Рутина и однообразие могут приводить к выгоранию и депрессии. Путешествия — это способ разорвать повседневный цикл, взглянуть на свою жизнь со стороны и получить новые перспективы.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Самореализация и личностный рост</h3>
                  <p className="text-base leading-relaxed">
                    Путешествия заставляют нас выходить из зоны комфорта, решать нестандартные задачи, адаптироваться к новым условиям. Это развивает уверенность в себе, стрессоустойчивость и креативность.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Антропологические причины */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Антропологические причины</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  С точки зрения антропологии, стремление к путешествиям заложено в нас эволюционно:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Миграция и поиск ресурсов</p>
                    <p className="text-sm text-muted-foreground">
                      Наши предки постоянно перемещались в поисках пищи, воды и лучших условий для жизни. Это инстинктивное поведение сохранилось в нас до сих пор.
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Расширение социальных связей</p>
                    <p className="text-sm text-muted-foreground">
                      Встречи с новыми людьми и группами были важны для выживания и обмена знаниями, ресурсами и опытом.
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Культурный обмен</p>
                    <p className="text-sm text-muted-foreground">
                      Взаимодействие с другими культурами позволяло перенимать полезные практики, технологии и идеи.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Нейробиологические эффекты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как путешествия влияют на мозг</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Нейропластичность</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Исследования показывают, что новые впечатления и опыт создают новые нейронные связи в мозге. Это делает мозг более гибким, улучшает память и когнитивные способности.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Снижение стресса</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Путешествия позволяют отдохнуть от повседневных стрессов. Изменение обстановки снижает уровень кортизола (гормона стресса) и способствует восстановлению.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Повышение креативности</h3>
                  <p className="text-base leading-relaxed">
                    Исследователи обнаружили, что люди, которые путешествуют, особенно в другие культуры, демонстрируют более высокую креативность и способность к решению проблем.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Научный факт:</strong> Исследование, проведённое Адама Галински из Колумбийского университета, показало, что люди, которые жили за границей, лучше решают творческие задачи, чем те, кто никогда не покидал свою страну.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Социальные причины */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Социальные и эмоциональные причины</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Укрепление отношений</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Совместные путешествия укрепляют связи между людьми. Общие приключения создают общие воспоминания, которые становятся основой для крепких отношений.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Развитие эмпатии</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Встречи с людьми из других культур и социальных групп расширяют наше понимание мира и развивают способность понимать и сочувствовать другим.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Создание воспоминаний</h3>
                  <p className="text-base leading-relaxed">
                    Психологи обнаружили, что люди ценят опыт больше, чем материальные вещи. Воспоминания о путешествиях становятся частью нашей личности и источником радости на всю жизнь.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Философские причины */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Философские и духовные причины</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Многие философы и мыслители отмечали важность путешествий для личностного развития:
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <p className="text-sm font-semibold mb-2">Поиск смысла</p>
                  <p className="text-sm leading-relaxed mb-3">
                    Путешествия позволяют нам увидеть мир с разных точек зрения и найти свой путь и смысл в жизни. Они помогают понять, что важно лично для нас.
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <p className="text-sm font-semibold mb-2">Самопознание</p>
                  <p className="text-sm leading-relaxed mb-3">
                    Вдали от привычной среды мы можем увидеть себя по-новому, понять свои сильные и слабые стороны, свои истинные желания и ценности.
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Чувство приключения</p>
                  <p className="text-sm leading-relaxed">
                    Стремление к приключениям и неизвестности — это часть человеческой природы. Путешествия дают нам возможность почувствовать себя первооткрывателями и исследователями.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Здоровье и благополучие */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Star className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Путешествия и здоровье</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Исследования показывают, что путешествия положительно влияют на физическое и психическое здоровье:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Снижение риска сердечно-сосудистых заболеваний</p>
                      <p className="text-sm text-muted-foreground">
                        Регулярные отпуска и путешествия снижают риск инфарктов и других проблем с сердцем
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Улучшение психического здоровья</p>
                      <p className="text-sm text-muted-foreground">
                        Путешествия помогают справляться с депрессией, тревожностью и выгоранием
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Повышение иммунитета</p>
                      <p className="text-sm text-muted-foreground">
                        Умеренный контакт с новыми патогенами во время путешествий может укрепить иммунную систему
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Улучшение сна</p>
                      <p className="text-sm text-muted-foreground">
                        Отдых от повседневного стресса нормализует режим сна и улучшает его качество
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Заключение */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Вывод</h2>
              <p className="text-base leading-relaxed mb-4">
                Путешествия — это не просто способ провести время или отдохнуть. Это фундаментальная потребность человека, заложенная в нас на биологическом, психологическом и культурном уровне.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Наука подтверждает: путешествия делают нас здоровее, умнее, счастливее и более открытыми к миру. Они развивают наш мозг, укрепляют отношения, расширяют горизонты и помогают нам лучше понимать себя и других.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong>Помните:</strong> Путешествия — это не роскошь, а необходимость для полноценной и счастливой жизни. Как сказал Святой Августин: «Мир — это книга, и те, кто не путешествуют, читают только одну её страницу».
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pochemumyputeshestvuem;
