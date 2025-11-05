import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Heart, Globe, CheckCircle, Info } from "lucide-react";

const Avtorskietury = () => {
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
          <span>Авторские туры</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что такое авторские туры и почему они вам нужны</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Авторские туры — это индивидуально разработанные путешествия, созданные опытными гидами, путешественниками или специалистами по определённым направлениям. В отличие от стандартных туров, они предлагают уникальный опыт и глубокое погружение в культуру, историю и природу места.
              </p>
              <p className="text-base leading-relaxed">
                Если вы устали от массового туризма и хотите увидеть страну глазами местного жителя, авторский тур — именно то, что вам нужно.
              </p>
            </CardContent>
          </Card>

          {/* Что такое авторские туры */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что такое авторские туры?</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Авторский тур — это путешествие, разработанное конкретным человеком (автором), который хорошо знает направление и имеет личный опыт путешествий по нему. Автор создаёт маршрут, подбирает места, продумывает логистику и часто сопровождает группу лично.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Ключевые характеристики:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Уникальный маршрут, разработанный автором</li>
                    <li>Небольшие группы (обычно до 15-20 человек)</li>
                    <li>Личный опыт и знания автора</li>
                    <li>Аутентичные места и опыт</li>
                    <li>Гибкость и индивидуальный подход</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Главное отличие:</strong> Авторский тур — это не просто поездка по готовому маршруту, а живой опыт, созданный человеком, который знает и любит место, о котором рассказывает.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Преимущества */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Преимущества авторских туров</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Уникальный опыт</p>
                      <p className="text-sm text-muted-foreground">
                        Вы увидите места, которые обычно не входят в стандартные туры, и получите опыт, который невозможно повторить самостоятельно
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Экспертные знания</p>
                      <p className="text-sm text-muted-foreground">
                        Автор делится своими знаниями, опытом и любовью к месту, рассказывая истории, которые вы не найдёте в путеводителях
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Небольшие группы</p>
                      <p className="text-sm text-muted-foreground">
                        Маленькие группы позволяют более тесное общение, индивидуальный подход и возможность задавать вопросы
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Гибкость маршрута</p>
                      <p className="text-sm text-muted-foreground">
                        Авторские туры часто более гибкие и могут изменяться в зависимости от интересов группы
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Аутентичность</p>
                      <p className="text-sm text-muted-foreground">
                        Вы познакомитесь с настоящей культурой, попробуете местную еду, встретитесь с местными жителями
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Экономия времени</p>
                      <p className="text-sm text-muted-foreground">
                        Вам не нужно планировать маршрут, бронировать отели и билеты — всё уже организовано
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Типы авторских туров */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Типы авторских туров</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Тематические туры</h3>
                  <p className="text-base leading-relaxed">
                    Туры, посвящённые определённой теме: архитектура, кулинария, история, искусство, природа, религия. Автор является экспертом в выбранной области.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Географические туры</h3>
                  <p className="text-base leading-relaxed">
                    Глубокое изучение конкретного региона или страны. Автор хорошо знает местность, её культуру, историю и особенности.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Активные туры</h3>
                  <p className="text-base leading-relaxed">
                    Туры для любителей активного отдыха: треккинг, велосипедные маршруты, водные виды спорта. Автор — опытный путешественник и инструктор.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Фотографические туры</h3>
                  <p className="text-base leading-relaxed">
                    Туры для фотографов, где автор помогает найти лучшие локации и моменты для съёмки, делится техниками и знаниями о местности.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Культурные и этнографические туры</h3>
                  <p className="text-base leading-relaxed">
                    Глубокое погружение в культуру и традиции местного населения. Встречи с местными жителями, участие в традиционных мероприятиях.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как выбрать */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как выбрать авторский тур</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Изучите автора</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Узнайте больше об авторе тура: его опыт, образование, предыдущие туры, отзывы участников. Хороший автор должен иметь глубокие знания о направлении.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Ознакомьтесь с программой</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Внимательно изучите программу тура. Убедитесь, что она соответствует вашим интересам и физическим возможностям. Обратите внимание на детали: что включено, что нет, как организованы переезды.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Прочитайте отзывы</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Отзывы предыдущих участников — отличный источник информации о качестве тура, организации, знаниях автора и общем впечатлении.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Уточните детали</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Не стесняйтесь задавать вопросы автору или организатору: о размере группы, условиях размещения, уровне физической нагрузки, включённых услугах.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Сравните цены</h3>
                  <p className="text-base leading-relaxed">
                    Авторские туры обычно дороже стандартных, но это оправдано уникальностью опыта и персональным подходом. Убедитесь, что цена соответствует предлагаемому сервису.
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Совет:</strong> Если автор предлагает личное общение перед туром (звонок, встреча), это хороший знак. Это показывает, что автор заинтересован в комфорте участников.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Для кого подходят */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Для кого подходят авторские туры</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Авторские туры подходят для разных типов путешественников:
                </p>
                
                <div className="space-y-3">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Для тех, кто хочет уникальный опыт</p>
                    <p className="text-sm text-muted-foreground">
                      Если вы устали от стандартных экскурсий и хотите увидеть что-то особенное
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Для энтузиастов и любителей глубокого изучения</p>
                    <p className="text-sm text-muted-foreground">
                      Если вас интересует конкретная тема или регион, и вы хотите узнать о нём как можно больше
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Для тех, кто предпочитает небольшие группы</p>
                    <p className="text-sm text-muted-foreground">
                      Если вам не нравятся большие туристические группы и вы хотите более персонального подхода
                    </p>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-1">Для новичков в самостоятельных путешествиях</p>
                    <p className="text-sm text-muted-foreground">
                      Если вы хотите путешествовать с опытным гидом, но получить аутентичный опыт
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Заключение */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Почему стоит попробовать авторский тур</h2>
              </div>

              <p className="text-base leading-relaxed mb-4">
                Авторские туры — это не просто способ путешествовать, это возможность открыть для себя новые места через призму опыта и знаний человека, который знает и любит это место.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Вы получите не только впечатления и фотографии, но и понимание места, его истории, культуры и души. Это путешествие, которое останется с вами на всю жизнь.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong>Помните:</strong> Лучший авторский тур — это тот, который создан с любовью и страстью к месту, о котором рассказывают. Найдите такого автора, и ваше путешествие станет незабываемым.
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

export default Avtorskietury;
