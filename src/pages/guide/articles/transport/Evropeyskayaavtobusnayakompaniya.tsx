import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Bus, Globe, Users, Info } from "lucide-react";

const Evropeyskayaavtobusnayakompaniya = () => {
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
          <span>Европейская автобусная компания</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как европейская автобусная компания работает в России</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Европейские автобусные компании, работающие в России, привносят международные стандарты обслуживания, современные автобусы и новые подходы к организации перевозок. Их работа на российском рынке имеет свои особенности и преимущества.
              </p>
              <p className="text-base leading-relaxed">
                Приход европейских компаний на российский рынок способствует повышению качества обслуживания и развитию конкуренции, что в конечном итоге выгодно пассажирам.
              </p>
            </CardContent>
          </Card>

          {/* Особенности работы в России */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Особенности работы в России</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Европейские компании адаптируют свои услуги к российским условиям: требованиям законодательства, особенностям дорог, климата и предпочтениям пассажиров, сохраняя при этом высокие стандарты качества.
                </p>
                <p className="text-base leading-relaxed">
                  Эта адаптация требует понимания местных особенностей и готовности работать в условиях, которые могут отличаться от европейских.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Международные стандарты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Международные стандарты обслуживания</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Европейские компании привносят международные стандарты обслуживания, которые включают высокий уровень комфорта, вежливость персонала, пунктуальность, информационность и другие аспекты качественного обслуживания.
                </p>
                <p className="text-base leading-relaxed">
                  Эти стандарты становятся эталоном для российского рынка и способствуют повышению общего уровня обслуживания в отрасли.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Современные автобусы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Современные автобусы</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Европейские компании используют современные автобусы, оснащённые удобными креслами, системами кондиционирования, Wi-Fi, розетками для зарядки устройств и другими удобствами.
                </p>
                <p className="text-base leading-relaxed">
                  Эти автобусы обеспечивают высокий уровень комфорта для пассажиров и соответствуют современным требованиям к безопасности и экологичности.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Новые подходы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Новые подходы к организации перевозок</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Европейские компании привносят новые подходы к организации перевозок: онлайн-бронирование, мобильные приложения, гибкое расписание, программы лояльности и другие инновации.
                </p>
                <p className="text-base leading-relaxed">
                  Эти подходы делают поездки более удобными и доступными для пассажиров, повышая привлекательность автобусных перевозок.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Адаптация к российским условиям */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Адаптация к российским условиям</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Работа в России требует адаптации к местным условиям: особенностям дорог, климата, законодательства, предпочтениям пассажиров. Европейские компании успешно адаптируются, сохраняя при этом высокие стандарты.
                </p>
                <p className="text-base leading-relaxed">
                  Эта адаптация включает обучение персонала, выбор подходящих автобусов, разработку маршрутов с учётом местных особенностей и другие аспекты.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Конкуренция и развитие рынка */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Конкуренция и развитие рынка</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Приход европейских компаний на российский рынок способствует развитию конкуренции, что в конечном итоге выгодно пассажирам. Конкуренция стимулирует улучшение качества обслуживания и снижение цен.
                </p>
                <p className="text-base leading-relaxed">
                  Это способствует развитию всего рынка автобусных перевозок в России, повышая общий уровень обслуживания и доступность поездок.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Преимущества для пассажиров */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Преимущества для пассажиров</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Работа европейских компаний в России приносит множество преимуществ для пассажиров: высокий уровень комфорта, современные автобусы, качественное обслуживание, удобное бронирование, пунктуальность.
                </p>
                <p className="text-base leading-relaxed">
                  Все эти преимущества делают поездки более приятными и удобными, повышая привлекательность автобусных перевозок как альтернативы другим видам транспорта.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Перспективы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Перспективы развития</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Работа европейских автобусных компаний в России имеет хорошие перспективы. Рынок автобусных перевозок в России растёт, и европейские компании могут внести значительный вклад в его развитие.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Их опыт, технологии и стандарты могут способствовать дальнейшему повышению качества обслуживания и развитию всего рынка.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Вывод:</strong> Европейские автобусные компании, работающие в России, привносят международные стандарты и современные подходы, способствуя развитию рынка и повышению качества обслуживания, что в конечном итоге выгодно всем: пассажирам, компаниям и рынку в целом.
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

export default Evropeyskayaavtobusnayakompaniya;
