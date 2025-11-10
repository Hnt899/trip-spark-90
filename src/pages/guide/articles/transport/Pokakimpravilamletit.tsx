import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, FileText, Shield, Info } from "lucide-react";

const Pokakimpravilamletit = () => {
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
          <span>По каким правилам летит самолёт</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">По каким правилам летит самолёт в России</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Полёты самолётов в России строго регламентированы правилами и стандартами, которые обеспечивают безопасность воздушного движения. Эти правила устанавливаются на международном и национальном уровне.
              </p>
              <p className="text-base leading-relaxed">
                Соблюдение этих правил обязательно для всех участников воздушного движения: авиакомпаний, экипажей, диспетчеров и других служб. Это обеспечивает безопасность и эффективность авиационных перевозок.
              </p>
            </CardContent>
          </Card>

          {/* Основные правила и стандарты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Основные правила и стандарты</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Авиационные правила в России основаны на международных стандартах и национальном законодательстве.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Международные стандарты ИКАО (ICAO)</li>
                    <li>Воздушный кодекс РФ</li>
                    <li>Федеральные авиационные правила</li>
                    <li>Правила полётов и использования воздушного пространства</li>
                    <li>Требования к экипажам и техническому состоянию самолётов</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Эти правила охватывают все аспекты авиационной деятельности: от проектирования самолётов до организации полётов и управления воздушным движением.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Международные стандарты ИКАО */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Международные стандарты ИКАО</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Международная организация гражданской авиации (ИКАО) устанавливает международные стандарты и рекомендуемые практики для обеспечения безопасности и эффективности международных полётов.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Россия, как член ИКАО, обязана соблюдать эти стандарты. Они включают правила навигации, связи, управления воздушным движением, сертификации самолётов и подготовки экипажей.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Соблюдение стандартов ИКАО обеспечивает совместимость и безопасность международных полётов, позволяя самолётам разных стран безопасно летать в едином воздушном пространстве.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Воздушный кодекс РФ */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Воздушный кодекс РФ</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Воздушный кодекс Российской Федерации — это основной закон, регулирующий использование воздушного пространства и авиационную деятельность в России.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Кодекс определяет права и обязанности участников воздушного движения, правила использования воздушного пространства, требования к авиационной технике и экипажам, ответственность за нарушение правил.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    Воздушный кодекс устанавливает правовую основу для всех аспектов авиационной деятельности в России, обеспечивая безопасность и порядок в воздушном пространстве.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Федеральные авиационные правила */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Федеральные авиационные правила</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Федеральные авиационные правила (ФАП) детализируют требования Воздушного кодекса и устанавливают конкретные стандарты для различных аспектов авиационной деятельности.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">ФАП по сертификации</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Правила сертификации самолётов, двигателей, оборудования и аэродромов, устанавливающие требования к их конструкции, производству и эксплуатации.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">ФАП по лётной годности</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Правила, определяющие требования к техническому состоянию самолётов, их обслуживанию и ремонту для обеспечения безопасности полётов.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">ФАП по подготовке экипажей</h3>
                    <p className="text-base leading-relaxed">
                      Правила, устанавливающие требования к обучению, квалификации и медицинскому освидетельствованию членов экипажей.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Правила полётов */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Правила полётов</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Правила полётов устанавливают порядок выполнения полётов, требования к экипажам, правила визуальных и приборных полётов, требования к навигации и связи.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Основные требования правил полётов:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Обязательное получение разрешения на полёт</li>
                    <li>Соблюдение установленных маршрутов и высот</li>
                    <li>Поддержание связи с диспетчерскими службами</li>
                    <li>Соблюдение минимальных безопасных высот</li>
                    <li>Соблюдение правил видимости и погодных минимумов</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Эти правила обеспечивают, что все полёты выполняются безопасно и организованно, с учётом всех факторов, влияющих на безопасность.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Управление воздушным движением */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Управление воздушным движением</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Все полёты в контролируемом воздушном пространстве выполняются под управлением диспетчерских служб. Диспетчеры координируют движение самолётов, обеспечивая безопасные интервалы и предотвращая конфликты.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Экипажи обязаны выполнять все команды диспетчеров, за исключением случаев, когда это угрожает безопасности полёта. Диспетчеры имеют право изменять маршрут, высоту и скорость самолёта для обеспечения безопасности.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> В случае возникновения аварийной ситуации пилот имеет право отступить от правил и команд диспетчера для обеспечения безопасности полёта, но должен немедленно сообщить об этом диспетчеру.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Требования к экипажам */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Требования к экипажам</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Все члены экипажа должны иметь соответствующие лицензии, сертификаты и медицинские справки. Требования к квалификации и здоровью экипажей строго регламентированы.
                </p>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Лицензии и сертификаты</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Пилоты должны иметь действующие лицензии, соответствующие типу самолёта и условиям полёта. Лицензии требуют регулярного продления и подтверждения квалификации.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Медицинское освидетельствование</h3>
                    <p className="text-base leading-relaxed mb-2">
                      Все члены экипажа должны проходить регулярное медицинское освидетельствование для подтверждения пригодности к полётам.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Подготовка и переподготовка</h3>
                    <p className="text-base leading-relaxed">
                      Экипажи должны проходить регулярную подготовку и переподготовку, включая тренировки на тренажёрах и изучение новых процедур.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Требования к техническому состоянию */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Требования к техническому состоянию самолётов</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Все самолёты должны иметь действующие сертификаты лётной годности и проходить регулярное техническое обслуживание в соответствии с установленными требованиями.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Перед каждым полётом самолёт проходит проверку технического состояния. Все обнаруженные неисправности должны быть устранены до вылета.
                </p>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Критично:</strong> Полёт на неисправном самолёте строго запрещён. Безопасность всегда важнее соблюдения расписания.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Безопасность — главный приоритет */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Безопасность — главный приоритет</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Все правила разработаны с единственной целью — обеспечить максимальную безопасность полётов. Они регулируют всё: от технических требований к самолётам до подготовки экипажей и управления воздушным движением.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Соблюдение этих правил обязательно для всех участников воздушного движения. Нарушение правил может привести к серьёзным последствиям и строгой ответственности.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Вывод:</strong> Авиационные правила — это не просто формальность, а основа безопасности полётов. Их соблюдение защищает жизни пассажиров и экипажей, обеспечивая надёжность и безопасность авиационных перевозок.
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

export default Pokakimpravilamletit;
