import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Factory, Zap, Train, Info, Cog, Wrench } from "lucide-react";

const Zavodkabelya = () => {
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
          <Link to="/guide" className="hover:text-primary">Фишки России</Link>
          <span>/</span>
          <span>Завод кабеля</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Завод кабеля: как делают проводку для поездов</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Кабели и провода для железнодорожного транспорта — это не просто обычная проводка. Это сложные системы, которые должны выдерживать экстремальные условия эксплуатации: вибрации, перепады температур, влажность, химические воздействия. Заводы, которые производят кабели для поездов, используют специальные технологии и материалы.
              </p>
              <p className="text-base leading-relaxed">
                Производство кабелей для железнодорожного транспорта — это высокотехнологичный процесс, требующий точности, качества и соблюдения строгих стандартов. Каждый кабель, который используется в поезде, проходит тщательную проверку и должен соответствовать самым высоким требованиям безопасности.
              </p>
            </CardContent>
          </Card>

          {/* Зачем нужны специальные кабели */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем нужны специальные кабели для поездов</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Поезда — это сложные технические системы, которые работают в экстремальных условиях. Они постоянно находятся в движении, подвергаются вибрациям, перепадам температур от -50 до +50 градусов, воздействию влаги, пыли и химических веществ. Обычные кабели не выдержат таких условий.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Кабели в поездах используются для передачи электроэнергии, сигналов управления, связи, освещения и многих других целей. От их надёжности зависит безопасность пассажиров и работа всего поезда. Один неисправный кабель может привести к остановке поезда или даже к аварии.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особые требования к кабелям для поездов:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Устойчивость к вибрациям и механическим воздействиям</li>
                  <li>Работа в широком диапазоне температур</li>
                  <li>Защита от влаги и пыли</li>
                  <li>Огнестойкость и низкое дымовыделение</li>
                  <li>Долгий срок службы (до 30 лет и более)</li>
                  <li>Соответствие строгим стандартам безопасности</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Поэтому кабели для поездов изготавливают из специальных материалов с особыми защитными оболочками, которые обеспечивают надёжность и безопасность в любых условиях эксплуатации.
              </p>
            </CardContent>
          </Card>

          {/* Процесс производства */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Factory className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как производят кабели</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Производство кабелей для железнодорожного транспорта — это многоэтапный процесс, который начинается с подготовки сырья. Основные материалы — медь или алюминий для проводников, специальные пластмассы и резины для изоляции, защитные оболочки из различных материалов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Сначала изготавливают проводники — медные или алюминиевые жилы нужного сечения. Затем на них наносят изоляцию из специальных материалов, которые обеспечивают электрическую защиту и устойчивость к различным воздействиям.
              </p>
              <p className="text-base leading-relaxed mb-4">
                После этого кабели покрывают защитной оболочкой, которая защищает от механических повреждений, влаги, огня и других воздействий. Для некоторых типов кабелей используется дополнительная броня из стальных проволок или лент.
              </p>
              <p className="text-base leading-relaxed">
                На каждом этапе производства кабели проходят контроль качества. Проверяют их электрические характеристики, механические свойства, устойчивость к различным воздействиям. Только кабели, прошедшие все проверки, отправляются на железнодорожные предприятия.
              </p>
            </CardContent>
          </Card>

          {/* Типы кабелей */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Cog className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Типы кабелей для поездов</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                В поездах используются разные типы кабелей для разных целей. Силовые кабели передают электроэнергию для работы двигателей и других систем. Контрольные кабели передают сигналы управления и контроля. Кабели связи обеспечивают связь между различными системами поезда.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Особое место занимают кабели для систем безопасности: сигнализации, пожаротушения, аварийного освещения. Эти кабели должны быть особенно надёжными, так как от них зависит безопасность пассажиров.
              </p>
              <p className="text-base leading-relaxed">
                Каждый тип кабеля имеет свои особенности и требования. Например, кабели для систем отопления должны выдерживать высокие температуры, а кабели для наружных систем — низкие температуры и воздействие осадков.
              </p>
            </CardContent>
          </Card>

          {/* Контроль качества */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Контроль качества</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Качество кабелей для железнодорожного транспорта контролируется на всех этапах производства. Используются современные методы контроля: электрические измерения, механические испытания, испытания на воздействие различных факторов.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Кабели проходят испытания на вибрацию, перепады температур, воздействие влаги, огня и химических веществ. Проверяют их электрические характеристики, механическую прочность, долговечность.
              </p>
              <p className="text-base leading-relaxed">
                Только кабели, полностью соответствующие всем требованиям стандартов и технических условий, допускаются к использованию в поездах. Каждый кабель имеет сертификат качества и может быть использован только в тех системах, для которых он предназначен.
              </p>
            </CardContent>
          </Card>

          {/* Значение для транспорта */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Значение для железнодорожного транспорта</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Кабели — это кровеносная система поезда. Они обеспечивают работу всех систем: от двигателя до освещения, от систем безопасности до комфорта пассажиров. Без надёжных кабелей поезд не сможет работать.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Качество кабелей напрямую влияет на безопасность железнодорожного транспорта. Неисправный кабель может привести к остановке поезда, а в худшем случае — к аварии. Поэтому производство кабелей для поездов — это дело государственной важности.
              </p>
              <p className="text-base leading-relaxed">
                Заводы, которые производят кабели для железнодорожного транспорта, постоянно совершенствуют технологии, разрабатывают новые материалы и методы производства, чтобы обеспечить максимальную надёжность и безопасность.
              </p>
            </CardContent>
          </Card>

          {/* Интересные факты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Интересные факты</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Длина кабелей в поезде</h3>
                  <p className="text-base leading-relaxed">
                    В современном поезде может быть проложено несколько километров кабелей различного назначения. Это сложная сеть, которая соединяет все системы поезда.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Срок службы</h3>
                  <p className="text-base leading-relaxed">
                    Кабели для поездов рассчитаны на срок службы 30 лет и более. Они должны выдерживать миллионы циклов вибраций и перепадов температур.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Стандарты качества</h3>
                  <p className="text-base leading-relaxed">
                    Кабели для железнодорожного транспорта должны соответствовать строгим международным и российским стандартам. Каждое изделие проходит многоступенчатый контроль качества.
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

export default Zavodkabelya;
