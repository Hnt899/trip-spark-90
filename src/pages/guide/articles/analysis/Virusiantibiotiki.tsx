import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Circle, AlertCircle, HelpCircle, Shield } from "lucide-react";

const Virusiantibiotiki = () => {
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
          <span>Вирус и антибиотики</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Вирус и антибиотики: нежный ликбез для паникующих</h1>

        <div className="space-y-8">
          {/* Кто такие вирусы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Кто такие вирусы?</h2>
              </div>

              <p className="text-base leading-relaxed mb-4">
                Вирусы — это крошечные неклеточные формы жизни, которые присутствуют повсюду. Они не могут существовать самостоятельно: для размножения вирусам обязательно нужна живая клетка-хозяин. Вирус проникает внутрь клетки и использует её механизмы для создания множества копий себя.
              </p>
              <p className="text-base leading-relaxed">
                Вирусы вызывают множество заболеваний: от простуды и гриппа до более серьёзных инфекций, таких как COVID-19, корь, ветрянка и многие другие.
              </p>
            </CardContent>
          </Card>

          {/* Можно ли вылечить вирус антибиотиком */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Можно ли вылечить вирус антибиотиком?</h2>
              </div>

              <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                <p className="text-base font-semibold text-red-900 mb-2">
                  Нет, антибиотики не действуют на вирусы.
                </p>
                <p className="text-sm leading-relaxed text-red-800">
                  Антибиотики созданы для борьбы с бактериями, а не с вирусами. Приём антибиотиков при вирусной инфекции не только не поможет, но и может навредить вашему здоровью.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Что делает антибиотик */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Circle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">А что делает антибиотик?</h2>
              </div>

              <p className="text-base leading-relaxed mb-4">
                Антибиотики — это лекарства, которые уничтожают или останавливают рост бактерий. Они работают, воздействуя на клеточные стенки, процессы деления или метаболизм бактерий.
              </p>
              <p className="text-base leading-relaxed">
                Бактерии — это одноклеточные организмы, которые могут жить самостоятельно. Они вызывают такие заболевания, как ангина, пневмония, цистит, различные кожные инфекции и другие бактериальные инфекции.
              </p>
            </CardContent>
          </Card>

          {/* Бактерии в организме */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Погодите, но ведь в организм «человек» входит огромная куча бактерий?</h2>
              </div>

              <p className="text-base leading-relaxed mb-4">
                Да, вы абсолютно правы! В организме человека живёт примерно 2,5 килограмма бактерий. Большинство из них — полезные бактерии (микрофлора), которые помогают нам переваривать пищу, вырабатывать витамины, защищать от патогенных микроорганизмов и поддерживать здоровье.
              </p>
              <p className="text-base leading-relaxed">
                Основные места обитания полезных бактерий: кишечник, ротовая полость, кожа, дыхательные пути. Эти бактерии жизненно важны для нормальной работы нашего организма.
              </p>
            </CardContent>
          </Card>

          {/* Как антибиотик отличает бактерии */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold">Стоп-стоп, а как антибиотик отличает «хорошие» бактерии от «плохих»?</h2>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Важно понимать:
                </p>
                <p className="text-sm leading-relaxed mb-3">
                  Антибиотики <strong>не отличают</strong> полезные бактерии от вредных. Они уничтожают все бактерии определённого типа, которые чувствительны к данному антибиотику.
                </p>
                <p className="text-sm leading-relaxed">
                  Именно поэтому при приёме антибиотиков страдает микрофлора кишечника, и врачи часто назначают пробиотики для её восстановления.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Почему назначают антибиотики при вирусных заболеваниях */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold">Почему тогда назначают антибиотики при вирусных заболеваниях?</h2>
              </div>

              <p className="text-base leading-relaxed mb-4">
                Врач может назначить антибиотики при вирусной инфекции в нескольких случаях:
              </p>
              <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4 mb-4">
                <li>Для профилактики бактериальных осложнений (например, пневмонии при гриппе)</li>
                <li>Если к вирусной инфекции присоединилась бактериальная (вторичная инфекция)</li>
                <li>При наличии хронических заболеваний, которые увеличивают риск бактериальных осложнений</li>
              </ul>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong>Помните:</strong> Антибиотики должен назначать только врач после осмотра и, при необходимости, анализов. Самолечение антибиотиками опасно и может привести к развитию устойчивости бактерий к лекарствам.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Как работает вирус */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Ок, как тогда работает вирус?</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Вирус проникает в клетку хозяина и встраивает свою генетическую информацию в клеточный аппарат. Затем клетка начинает производить новые вирусы вместо своих нормальных функций. Когда вирусов становится много, они разрывают клетку и выходят наружу, заражая соседние клетки.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Основные этапы жизненного цикла вируса:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
                    <li>Прикрепление к клетке-хозяину</li>
                    <li>Проникновение внутрь клетки</li>
                    <li>Размножение (репликация)</li>
                    <li>Выход новых вирусов из клетки</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Вакцинация */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">А если я не был привит от вирусной инфекции, то что тогда?</h2>
              </div>

              <p className="text-base leading-relaxed mb-4">
                Вакцинация — это самый эффективный способ защиты от вирусных инфекций. Вакцины учат вашу иммунную систему распознавать и бороться с вирусами до того, как вы заболеете.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Если вы не привиты, риск заболеть вирусной инфекцией значительно выше. При заражении ваша иммунная система будет бороться с вирусом самостоятельно, что может привести к более тяжёлому течению болезни.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong>Совет:</strong> Следуйте рекомендациям врачей по вакцинации. Это защитит не только вас, но и окружающих людей, особенно тех, кто по медицинским показаниям не может быть привит.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Главное */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Главное</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                    1
                  </div>
                  <p className="text-base leading-relaxed">
                    <strong>Антибиотики не лечат вирусные инфекции.</strong> Они эффективны только против бактерий.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                    2
                  </div>
                  <p className="text-base leading-relaxed">
                    <strong>Вирусы и бактерии — это разные микроорганизмы</strong> с разными механизмами действия и способами лечения.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                    3
                  </div>
                  <p className="text-base leading-relaxed">
                    <strong>Антибиотики должен назначать только врач</strong> после осмотра и диагностики.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5">
                    4
                  </div>
                  <p className="text-base leading-relaxed">
                    <strong>Вакцинация — лучшая защита</strong> от вирусных инфекций.
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

export default Virusiantibiotiki;
