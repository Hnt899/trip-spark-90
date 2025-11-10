import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Droplet, Snowflake, AlertCircle, Info } from "lucide-react";

const Zachemoblivayutsamoletpered = () => {
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
          <span>Зачем обливают самолёт перед вылетом</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Зачем конкретно обливают самолёт перед вылетом</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Обливание самолёта специальной жидкостью перед вылетом — это процедура противообледенительной обработки, которая необходима в холодную погоду для предотвращения образования льда на поверхности самолёта.
              </p>
              <p className="text-base leading-relaxed">
                Эта процедура критически важна для безопасности полёта. Обледенение самолёта может привести к серьёзным проблемам и даже катастрофе, поэтому противообледенительная обработка обязательна в определённых условиях.
              </p>
            </CardContent>
          </Card>

          {/* Зачем это нужно */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем это нужно</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Обледенение самолёта представляет серьёзную опасность для безопасности полёта. Лёд на поверхности самолёта может вызвать множество проблем.
                </p>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                  <p className="text-sm leading-relaxed mb-2">
                    <strong>Опасность обледенения:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Лёд увеличивает вес самолёта</li>
                    <li>Нарушает аэродинамику, снижая подъёмную силу</li>
                    <li>Может заблокировать подвижные части (рули, закрылки)</li>
                    <li>Забивает датчики скорости и высоты</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Все эти факторы могут привести к потере управления самолётом или невозможности взлёта, что делает противообледенительную обработку критически важной процедурой.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Противообледенительная жидкость */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Противообледенительная жидкость</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Специальная жидкость содержит вещества, которые препятствуют образованию льда и удаляют уже образовавшийся лёд. Она наносится на критические поверхности самолёта: крылья, хвостовое оперение, двигатели и другие важные части.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Противообледенительная жидкость имеет специальный состав, который позволяет ей эффективно работать при низких температурах. Она создаёт защитный слой, который предотвращает образование льда в течение определённого времени.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Время действия противообледенительной жидкости ограничено. Если самолёт не взлетает в течение этого времени, обработку необходимо повторить.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Когда проводится обработка */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Когда проводится противообледенительная обработка</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Противообледенительная обработка проводится в определённых условиях: при температуре воздуха ниже определённого значения, при наличии осадков (снег, дождь, изморозь), при высокой влажности.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Решение о необходимости обработки принимается на основе метеорологических условий и визуального осмотра самолёта. Пилоты и наземные службы оценивают риск обледенения и принимают решение.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    Обработка может быть обязательной или профилактической, в зависимости от условий и требований авиакомпании.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Процесс обработки */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Процесс противообледенительной обработки</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Обработка проводится специальными машинами, которые распыляют противообледенительную жидкость на поверхности самолёта. Машины могут подниматься на нужную высоту, чтобы обработать все критические поверхности.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Обработка начинается с удаления уже образовавшегося льда, если он есть, а затем наносится защитный слой жидкости, который предотвращает образование нового льда.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Обработка должна быть завершена непосредственно перед взлётом, чтобы жидкость не успела стечь или потерять эффективность.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Критические поверхности */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <Snowflake className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Критические поверхности</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Особое внимание при обработке уделяется критическим поверхностям самолёта, обледенение которых наиболее опасно.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Критические поверхности:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Крылья — обледенение критически влияет на подъёмную силу</li>
                    <li>Хвостовое оперение — необходимо для управления самолётом</li>
                    <li>Двигатели — обледенение может нарушить работу</li>
                    <li>Рули и закрылки — подвижные части, которые должны работать свободно</li>
                    <li>Датчики — обледенение может исказить показания</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Все эти поверхности тщательно обрабатываются, чтобы обеспечить безопасность полёта.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Безопасность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Info className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Безопасность полёта</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Противообледенительная обработка — это не просто формальность, а критически важная процедура безопасности. Без неё полёт в условиях обледенения может быть крайне опасным.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Все авиакомпании и аэропорты имеют строгие процедуры противообледенительной обработки, которые должны соблюдаться в обязательном порядке.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Вывод:</strong> Обливание самолёта перед вылетом — это не прихоть, а необходимость, которая защищает жизни пассажиров и экипажа. Эта процедура является неотъемлемой частью обеспечения безопасности полётов в холодную погоду.
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

export default Zachemoblivayutsamoletpered;
