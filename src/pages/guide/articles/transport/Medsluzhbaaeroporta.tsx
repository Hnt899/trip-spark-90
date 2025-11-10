import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Ambulance, AlertCircle, CheckCircle } from "lucide-react";

const Medsluzhbaaeroporta = () => {
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
          <span>Медслужба аэропорта</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как работает медслужба аэропорта</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Медицинская служба аэропорта — это важная часть инфраструктуры, которая обеспечивает медицинскую помощь пассажирам, экипажам и персоналу аэропорта в любой ситуации.
              </p>
              <p className="text-base leading-relaxed">
                Медицинская служба работает круглосуточно, готовая оказать помощь в любой момент. От её работы зависит здоровье и безопасность тысяч людей, которые ежедневно проходят через аэропорт.
              </p>
            </CardContent>
          </Card>

          {/* Функции медицинской службы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Ambulance className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Функции медицинской службы</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Медицинская служба аэропорта выполняет множество важных функций, обеспечивая здоровье и безопасность всех, кто находится в аэропорту.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Экстренная медицинская помощь</p>
                      <p className="text-sm text-muted-foreground">
                        Оказание первой медицинской помощи при несчастных случаях, травмах, обострениях заболеваний и других экстренных ситуациях
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Медицинские осмотры перед полётом</p>
                      <p className="text-sm text-muted-foreground">
                        Проверка состояния здоровья пассажиров, которые могут иметь проблемы со здоровьем, и принятие решения о допуске к полёту
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Санитарный контроль</p>
                      <p className="text-sm text-muted-foreground">
                        Контроль санитарно-эпидемиологической обстановки в аэропорту, предотвращение распространения инфекций
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Медицинское сопровождение пассажиров с ограниченными возможностями</p>
                      <p className="text-sm text-muted-foreground">
                        Помощь пассажирам с ограниченными возможностями здоровья, обеспечение их комфорта и безопасности во время пребывания в аэропорту
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Медицинские пункты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Медицинские пункты</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  В аэропорту есть медицинские пункты, оборудованные всем необходимым для оказания медицинской помощи. В них работают квалифицированные врачи и медицинские сёстры.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Медицинские пункты оснащены современным оборудованием, медикаментами и средствами для оказания первой помощи. Они могут справиться с большинством медицинских ситуаций, которые могут возникнуть в аэропорту.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Медицинские пункты расположены в доступных местах, чтобы помощь можно было оказать быстро в случае необходимости.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Экстренная помощь */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Экстренная медицинская помощь</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Медицинская служба готова оказать экстренную помощь в любой момент. Врачи и медицинские сёстры дежурят круглосуточно и могут быстро прибыть в любую точку аэропорта.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  В случае серьёзных ситуаций медицинская служба координирует свои действия с городскими службами скорой помощи, обеспечивая транспортировку пациентов в больницы при необходимости.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    Быстрая реакция медицинской службы может спасти жизнь. Все сотрудники аэропорта обучены вызывать медицинскую помощь при необходимости.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Санитарный контроль */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Санитарный контроль</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Медицинская служба контролирует санитарно-эпидемиологическую обстановку в аэропорту, предотвращая распространение инфекционных заболеваний.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Это особенно важно в аэропортах, где ежедневно проходят тысячи людей из разных стран. Медицинская служба следит за чистотой, контролирует качество воды и пищи, проводит профилактические мероприятия.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Санитарный контроль помогает защитить здоровье пассажиров и персонала, предотвращая распространение заболеваний.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Помощь пассажирам с ограниченными возможностями */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Помощь пассажирам с ограниченными возможностями</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Медицинская служба обеспечивает медицинское сопровождение пассажиров с ограниченными возможностями здоровья, помогая им комфортно и безопасно пройти все процедуры в аэропорту.
                </p>
                <p className="text-base leading-relaxed">
                  Медицинские работники могут помочь с передвижением, оказать необходимую медицинскую помощь, обеспечить комфорт и безопасность во время ожидания рейса.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Важность медицинской службы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Ambulance className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Важность медицинской службы</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Медицинская служба аэропорта играет критически важную роль в обеспечении здоровья и безопасности всех, кто находится в аэропорту. Её работа может спасти жизни и предотвратить серьёзные проблемы со здоровьем.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Наличие квалифицированной медицинской помощи в аэропорту даёт пассажирам уверенность в том, что в случае необходимости им будет оказана помощь.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Вывод:</strong> Медицинская служба аэропорта — это не просто формальность, а важная часть системы безопасности и комфорта, которая защищает здоровье тысяч людей ежедневно.
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

export default Medsluzhbaaeroporta;
