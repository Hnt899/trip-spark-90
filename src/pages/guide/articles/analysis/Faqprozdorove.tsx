import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, Plane, Building2, FileText, Shield, AlertCircle } from "lucide-react";

const Faqprozdorove = () => {
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
          <span>FAQ про здоровье</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">FAQ про здоровье</h1>

        <div className="space-y-8">
          {/* Вакцинация от COVID-19 */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Нужно ли делать прививку от COVID-19, чтобы путешествовать?</h2>
              </div>

              <p className="text-base leading-relaxed mb-4">
                Вакцинация от COVID-19 является добровольной. Однако требования к вакцинации или наличию отрицательного теста могут различаться в зависимости от:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4 mb-4">
                <li>Страны назначения — некоторые страны требуют подтверждение вакцинации или отрицательный ПЦР-тест</li>
                <li>Перевозчика — авиакомпании и другие перевозчики могут устанавливать свои требования</li>
                <li>Действующих санитарно-эпидемиологических правил</li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong>Совет:</strong> Перед поездкой обязательно уточните актуальные требования страны назначения и перевозчика на официальных сайтах и в консульствах.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Вакцинация в командировке */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Можно ли привиться, если я в командировке или в долгой поездке?</h2>
              </div>

              <p className="text-base leading-relaxed mb-4">
                Да, вакцинация доступна в любом регионе России, независимо от места вашей регистрации. Вы можете привиться по месту пребывания:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4 mb-4">
                <li>В поликлинике по месту временного пребывания</li>
                <li>В мобильных пунктах вакцинации</li>
                <li>В частных медицинских центрах (платно)</li>
              </ul>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> При себе нужно иметь паспорт. Прививка делается бесплатно по программе ОМС в государственных медицинских учреждениях.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Посещение реанимации */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Мой родственник попал в реанимацию. Можно ли приехать и его навестить?</h2>
              </div>

              <p className="text-base leading-relaxed mb-4">
                С 1 июня 2019 года посещение пациентов в отделениях реанимации разрешено. Однако возможность посещения зависит от нескольких факторов:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4 mb-4">
                <li>Состояния пациента — врач оценивает, не навредит ли посещение больному</li>
                <li>Эпидемиологической обстановки — могут быть временные ограничения</li>
                <li>Правил конкретного медицинского учреждения</li>
              </ul>
              <div className="space-y-3">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Как организовать посещение:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                    <li>Свяжитесь с лечащим врачом пациента или заведующим отделением</li>
                    <li>Уточните время, когда возможно посещение</li>
                    <li>Соблюдайте все требования больницы (сменная одежда, бахилы, маски)</li>
                  </ol>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Помните:</strong> Решение о возможности посещения принимает медицинский персонал, исходя из интересов пациента.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Медицинская помощь в дороге */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Я боюсь, что заболею в дороге. Как мне тогда получить бесплатную помощь?</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Медицинская помощь по полису ОМС (Обязательного медицинского страхования) доступна во всех регионах России, независимо от места вашей регистрации.
                </p>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3">Как получить помощь:</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Обратитесь в любую поликлинику или вызовите скорую помощь</li>
                    <li>Предъявите полис ОМС и паспорт</li>
                    <li>Получите необходимую медицинскую помощь бесплатно</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Важно:
                  </p>
                  <p className="text-sm leading-relaxed">
                    Экстренная медицинская помощь оказывается бесплатно всем гражданам России, даже без полиса, если есть угроза жизни.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Что делать без полиса */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">А если у меня с собой нет медполиса?</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Если у вас нет полиса ОМС при себе, это не означает, что вам откажут в помощи:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4 mb-4">
                  <li>Достаточно предъявить паспорт — по данным в паспорте медики могут проверить наличие полиса в базе</li>
                  <li>Экстренная помощь оказывается бесплатно всем, даже без документов</li>
                  <li>Полис можно восстановить позже через сайт госуслуг или страховую компанию</li>
                </ul>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Как восстановить полис:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                    <li>Обратитесь в страховую компанию, выдавшую полис</li>
                    <li>Или в любую страховую компанию, работающую в системе ОМС</li>
                    <li>Можно оформить временное свидетельство сразу же</li>
                  </ol>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Совет:</strong> Сделайте фотографию или скан полиса ОМС и сохраните в телефоне на случай, если забудете оригинал.
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

export default Faqprozdorove;
