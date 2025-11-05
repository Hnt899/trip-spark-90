import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Wind, Info, AlertCircle, CheckCircle } from "lucide-react";

const Planery = () => {
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
          <span>Планеры</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Больше, чем вы бы хотели знать про планеры</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Планер — это летательный аппарат без двигателя, который использует восходящие потоки воздуха для полёта. Планерный спорт — это не просто хобби, а настоящее искусство, требующее мастерства, терпения и понимания природы.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Планеры могут летать на огромные расстояния, подниматься на высоту в несколько километров и оставаться в воздухе часами, используя только энергию восходящих потоков. Это один из самых чистых и экологичных видов авиации.
              </p>
              <p className="text-base leading-relaxed">
                Для новичка планер может показаться сложным, но на самом деле обучение доступно каждому. Это безопасный, захватывающий и невероятно красивый вид спорта, который открывает новые горизонты.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что такое планер</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Планер — это самолёт без двигателя, который использует аэродинамику для полёта. Он тяжелее воздуха, но благодаря специальной форме крыльев и использованию восходящих потоков может не только парить, но и набирать высоту.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Современные планеры изготавливаются из композитных материалов (стекловолокно, углеродное волокно), что делает их легкими, прочными и аэродинамически эффективными. Крылья планера имеют специальный профиль, который создаёт подъёмную силу даже при медленном движении.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-semibold mb-2">Основные характеристики планера:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Отсутствие двигателя — полёт только на энергии восходящих потоков</li>
                  <li>Высокое аэродинамическое качество — может преодолевать большие расстояния</li>
                  <li>Легкий вес — важнейший фактор для эффективного полёта</li>
                  <li>Длинные узкие крылья — создают максимальную подъёмную силу</li>
                  <li>Обтекаемый фюзеляж — минимизирует сопротивление</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wind className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как планер летает</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Планер не может взлететь самостоятельно — его нужно запустить. Есть несколько способов запуска: с помощью буксировочного самолёта, лебёдки или автостарта. После запуска планер использует три основных типа восходящих потоков для набора высоты.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Термики (тепловые потоки)</h3>
                  <p className="text-base leading-relaxed">
                    Самый распространённый тип восходящих потоков. Солнце нагревает землю, тёплый воздух поднимается вверх, создавая колонку восходящего воздуха. Планер может кружить внутри этой колонки, набирая высоту. Опытные пилоты могут набрать высоту в несколько километров, используя термики.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Динамические потоки</h3>
                  <p className="text-base leading-relaxed">
                    Возникают, когда ветер обтекает препятствия — горы, холмы. Восходящий поток образуется на наветренной стороне. Это позволяет планерам летать вдоль горных хребтов, поднимаясь вверх и оставаясь в воздухе часами.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Волновые потоки</h3>
                  <p className="text-base leading-relaxed">
                    Образуются при определённых условиях, когда ветер создаёт стоячие волны за горными хребтами. Это позволяет планерам подниматься на очень большие высоты — рекорд составляет более 15 километров!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">С чего начать</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Обучение полётам на планере начинается с теоретической подготовки. Вы изучите основы аэродинамики, метеорологии, навигации и авиационных правил. Это важная часть обучения, которая поможет вам понять, как и почему планер летает.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Первые полёты проходят с инструктором. Вы будете сидеть в двухместном учебном планере, где инструктор может в любой момент взять управление. Это безопасно и позволяет вам постепенно освоиться с управлением.
              </p>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Первые шаги:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Найти планерный клуб или школу в вашем регионе</li>
                  <li>Пройдите медицинскую комиссию (требования проще, чем для пилотов самолётов)</li>
                  <li>Начните с теоретического курса</li>
                  <li>Первые полёты с инструктором</li>
                  <li>Постепенное освоение навыков самостоятельного полёта</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Обучение обычно занимает несколько месяцев, в зависимости от частоты занятий и ваших способностей. После получения лицензии вы сможете летать самостоятельно, но многие продолжают учиться всю жизнь, совершенствуя навыки.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Безопасность</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Планерный спорт имеет отличную статистику безопасности. Планеры проходят строгие проверки, пилоты проходят серьёзное обучение, а каждый полёт тщательно планируется с учётом погодных условий.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Все планеры оснащены парашютами, которые можно использовать в экстренной ситуации. Современные планеры имеют прочную конструкцию и могут выдерживать значительные нагрузки. Важнейший фактор безопасности — это опыт пилота и правильная оценка погодных условий.
              </p>
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Никогда не летайте в условиях, которые превышают ваш уровень подготовки. Планерный спорт требует уважения к природе и понимания её сил. Опытные пилоты всегда предпочитают отменить полёт при сомнительных условиях, чем рисковать.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wind className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что делает планерный спорт особенным</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Планерный спорт — это не просто полёт, это взаимодействие с природой на самом глубоком уровне. Вы учитесь читать небо, понимать ветер, чувствовать воздух. Это медитативное и одновременно захватывающее занятие.
              </p>
              <p className="text-base leading-relaxed mb-4">
                В планере нет шума двигателя — только звук ветра и тишина. Вы видите мир с высоты птичьего полёта, понимаете, как работают природные силы. Это уникальный опыт, который невозможно получить другим способом.
              </p>
              <p className="text-base leading-relaxed">
                Планерное сообщество — это дружная семья энтузиастов, которые всегда готовы помочь и поделиться опытом. Это спорт, который объединяет людей разных возрастов и профессий любовью к полёту и небу.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Planery;
