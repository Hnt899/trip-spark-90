import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Users, Shield, Info } from "lucide-react";

const Prosluzhbyterminala = () => {
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
          <span>Про службы терминала</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что внутри лучшего регионального аэропорта страны: службы терминала</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Современный аэропорт — это сложная система множества служб, которые работают согласованно для обеспечения комфорта и безопасности пассажиров. Каждая служба имеет свою важную роль в работе аэропорта.
              </p>
              <p className="text-base leading-relaxed">
                Все службы терминала работают круглосуточно, обеспечивая бесперебойную работу аэропорта и комфорт пассажиров на всех этапах их пребывания в аэропорту.
              </p>
            </CardContent>
          </Card>

          {/* Службы терминала */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Службы терминала</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  В терминале аэропорта работают множество различных служб, каждая из которых выполняет свою важную функцию.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Служба регистрации и багажа</li>
                    <li>Служба безопасности</li>
                    <li>Таможенная служба</li>
                    <li>Пограничный контроль</li>
                    <li>Медицинская служба</li>
                    <li>Информационные службы</li>
                    <li>Службы сервиса и обслуживания</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Все эти службы работают слаженно, обеспечивая эффективную работу аэропорта и комфорт пассажиров.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Служба регистрации и багажа */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Служба регистрации и багажа</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Служба регистрации и багажа — это первая служба, с которой сталкиваются пассажиры в аэропорту. Она обеспечивает регистрацию пассажиров на рейс, оформление багажа и выдачу посадочных талонов.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Современные системы регистрации позволяют пассажирам зарегистрироваться онлайн или на стойках самообслуживания, что ускоряет процесс и делает его более удобным.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Совет:</strong> Рекомендуется прибывать в аэропорт заранее, чтобы успеть пройти регистрацию и сдать багаж без спешки. Для международных рейсов рекомендуется прибывать за 2-3 часа до вылета.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Служба безопасности */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Служба безопасности</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Служба безопасности обеспечивает досмотр пассажиров и их багажа перед посадкой на рейс. Это критически важная служба, которая защищает безопасность полётов.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Досмотр включает проверку ручной клади, багажа, личный досмотр пассажиров. Современные системы досмотра используют рентгеновские сканеры, металлодетекторы и другие технологии.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    Все процедуры досмотра направлены на обеспечение безопасности полётов. Сотрудничество пассажиров с службой безопасности помогает сделать процесс быстрее и эффективнее.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Таможенная служба */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Таможенная служба</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Таможенная служба контролирует перемещение товаров через границу, обеспечивая соблюдение таможенного законодательства и взимание необходимых пошлин.
                </p>
                <p className="text-base leading-relaxed">
                  Пассажиры должны декларировать товары, подлежащие декларированию, и соблюдать правила ввоза и вывоза товаров. Таможенная служба работает на международных рейсах.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Пограничный контроль */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Пограничный контроль</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Пограничный контроль проверяет документы пассажиров при пересечении границы, обеспечивая соблюдение иммиграционных правил и безопасность страны.
                </p>
                <p className="text-base leading-relaxed">
                  Пассажиры должны иметь действительные документы: паспорт, визу (если требуется) и другие необходимые документы. Пограничный контроль работает на международных рейсах.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Медицинская служба */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Медицинская служба</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Медицинская служба аэропорта обеспечивает медицинскую помощь пассажирам и персоналу в случае необходимости. В аэропорту есть медицинские пункты и дежурные врачи.
                </p>
                <p className="text-base leading-relaxed">
                  Медицинская служба также контролирует санитарно-эпидемиологическую обстановку в аэропорту и может оказывать помощь в экстренных ситуациях.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Информационные службы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Информационные службы</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Информационные службы предоставляют пассажирам актуальную информацию о рейсах, задержках, терминалах, услугах аэропорта и других важных деталях.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Информация предоставляется через информационные табло, объявления, информационные стойки, мобильные приложения и веб-сайты аэропорта.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    Информационные службы помогают пассажирам ориентироваться в аэропорту и получать необходимую информацию своевременно.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Службы сервиса и обслуживания */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Службы сервиса и обслуживания</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Службы сервиса и обслуживания обеспечивают комфорт пассажиров в аэропорту. К ним относятся магазины, кафе, рестораны, бизнес-залы, комнаты отдыха и другие услуги.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Современные аэропорты предлагают широкий спектр услуг для пассажиров: от базовых удобств до премиальных сервисов в бизнес-залах.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Все службы терминала работают для обеспечения комфорта и безопасности пассажиров. Их слаженная работа делает пребывание в аэропорту приятным и безопасным.
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

export default Prosluzhbyterminala;
