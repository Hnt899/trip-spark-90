import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Bus, MapPin, Users, Info } from "lucide-react";

const Progorodskoytransport = () => {
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
          <span>Про городской транспорт</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Про городской транспорт простыми словами</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Городской транспорт — это сложная система, которая обеспечивает передвижение людей по городу. Автобусы, троллейбусы, трамваи и маршрутки работают по специальным маршрутам и расписаниям, чтобы пассажиры могли быстро и удобно добраться до нужного места.
              </p>
              <p className="text-base leading-relaxed">
                Городской транспорт играет важную роль в жизни города, обеспечивая доступность различных районов, снижая нагрузку на дороги и предоставляя доступный способ передвижения для всех жителей.
              </p>
            </CardContent>
          </Card>

          {/* Виды городского транспорта */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Виды городского транспорта</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  В городах используются различные виды транспорта, каждый из которых имеет свои особенности и преимущества.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Автобусы — самый распространённый вид транспорта</li>
                    <li>Троллейбусы — экологичный транспорт на электричестве</li>
                    <li>Трамваи — рельсовый городской транспорт</li>
                    <li>Маршрутные такси — гибкие маршруты и расписание</li>
                  </ul>
                </div>
                <p className="text-base leading-relaxed">
                  Каждый вид транспорта имеет свои преимущества и используется в зависимости от условий города, пассажиропотока и инфраструктуры.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Автобусы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Автобусы</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Автобусы — это самый распространённый вид городского транспорта. Они могут работать на различных маршрутах, не требуя специальной инфраструктуры, что делает их очень гибкими.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Современные автобусы оснащены удобными сиденьями, системами кондиционирования, низким полом для удобства пассажиров и экологичными двигателями.
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Преимущества:</strong> Гибкость маршрутов, доступность, возможность быстрого изменения маршрутов в зависимости от потребностей пассажиров.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Троллейбусы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Троллейбусы</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Троллейбусы — это экологичный вид транспорта, работающий на электричестве. Они не загрязняют воздух и работают тихо, что делает их особенно подходящими для городских условий.
                </p>
                <p className="text-base leading-relaxed">
                  Троллейбусы требуют контактной сети, но могут работать на тех же маршрутах, что и автобусы, обеспечивая экологичную альтернативу.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Трамваи */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Трамваи</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Трамваи — это рельсовый городской транспорт, который обеспечивает надёжное и предсказуемое движение по фиксированным маршрутам. Они могут перевозить большое количество пассажиров.
                </p>
                <p className="text-base leading-relaxed">
                  Трамваи особенно эффективны на маршрутах с высоким пассажиропотоком. Современные трамваи комфортны, экологичны и могут работать в составе поездов для увеличения пропускной способности.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Маршрутные такси */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bus className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Маршрутные такси</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Маршрутные такси — это гибкий вид транспорта, который может работать по различным маршрутам с более частым расписанием. Они дополняют основной общественный транспорт.
                </p>
                <p className="text-base leading-relaxed">
                  Маршрутки особенно удобны для поездок в отдалённые районы или в часы, когда основной транспорт работает реже. Они обеспечивают дополнительную гибкость транспортной системы.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Организация работы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Организация работы городского транспорта</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Городской транспорт работает по установленным маршрутам и расписанию. Маршруты планируются с учётом пассажиропотока, доступности различных районов и удобства пассажиров.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Расписание движения составляется с учётом пиковых часов, когда пассажиропоток максимален, и межпиковых периодов. В часы пик частота движения увеличивается.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    Эффективная организация работы городского транспорта обеспечивает доступность всех районов города и удобство передвижения для пассажиров.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Важность городского транспорта */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Важность городского транспорта</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Городской транспорт играет важную роль в жизни города. Он обеспечивает доступность различных районов, снижает нагрузку на дороги, уменьшает загрязнение воздуха и предоставляет доступный способ передвижения.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Развитие городского транспорта способствует улучшению качества жизни в городе, делает его более привлекательным для жителей и способствует экономическому развитию.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Вывод:</strong> Городской транспорт — это не просто способ передвижения, а важная часть городской инфраструктуры, которая делает город более удобным, доступным и экологичным.
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

export default Progorodskoytransport;
