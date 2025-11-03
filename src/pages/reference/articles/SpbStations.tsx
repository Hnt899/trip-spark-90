import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Calendar, History } from "lucide-react";

const SpbStations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Вокзалы Санкт-Петербурга</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Вокзалы Санкт-Петербурга</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                С Санкт-Петербурга начиналось пассажирское движение на железных дорогах России.
              </p>
            </CardContent>
          </Card>

          {/* Витебский вокзал */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Витебский вокзал
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Самый первым был Витебский вокзал. Старейший вокзал России начинался с временного здания, размещенного на части плаца Семеновского полка. Это был <strong>1837 год</strong>, вокзал назывался Царскосельским.
                </p>
                <p>
                  Именно отсюда <strong>30 октября</strong> отправился самый первый в истории России пассажирский поезд. Затем в 1849-1852 году построили каменное здание по проекту архитектора К.А Тона, в 1870 его реконструировали, 
                  а в 1900 году Царскосельская дорога вместе с вокзалом перешла к Московско-Виндаво-Рыбинской, и вокзал решили перенести за Обводный канал. Но в итоге он остался на старом месте.
                </p>
                <p>
                  В <strong>1904 году</strong> на месте старого вокзала появился новый, теперь уже Витебский, и больше не перестраивался. Великолепное здание с отголосками стиля модерн, приметной часовой башней и замечательными интерьерами 
                  является историческим памятником. Автор проекта — архитектор С.А. Бржозовский.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Московский вокзал */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Московский вокзал Санкт-Петербурга
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Московский вокзал Санкт-Петербурга — <strong>третий по объему пассажирских перевозок</strong> в стране. С момента запуска Николаевской дороги, второй после Царскосельской, больше всего поездов ходит между Санкт-Петербургом и Москвой. 
                  Первый пассажирский поезд отправился в Москву <strong>1 ноября 1851 года</strong>.
                </p>
                <p>
                  Ленинградский вокзал в Москве и Московский вокзал в Санкт-Петербурге — близнецы. Они строились по одному проекту К.А Тона и оба в 1855 году назывались Николаевскими, как и сама дорога. 
                  В 1923 году дорога и вокзал стали Октябрьскими, а с 1930 года вокзал именуется Московским.
                </p>
                <p>
                  Расписание поездов Московского вокзала включает и скоростные «Сапсаны».
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Финляндский вокзал */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Финляндский вокзал
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Финляндский вокзал был построен в <strong>1870 году</strong>. До 1917 года на здесь работали только финны, т. к. дорога принадлежала княжеству Финляндскому.
                </p>
                <p>
                  Во время блокады Ленинграда вокзал оставался действующим. В 1943 году здесь встречали первый поезд с продовольствием. Здесь, в память о тех годах, установили и первый из 36 столбов — символов Дороги Жизни.
                </p>
                <p>
                  Бомбежки сильно разрушили здание, и в 1955-1960 году построили новое, реконструировав и всю территорию вокруг вокзала. Сейчас в расписании Финляндского вокзала из поездов дальнего следования остались только скоростные поезда «Аллегро» до Хельсинки, 
                  остальные переведены на Ладожский вокзал. Пригородный поток остается большим: это Приозерское, Сестрорецкое, Выборгское и Ладожское направления.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Балтийский вокзал */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Балтийский вокзал
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Балтийский вокзал похож на Восточный вокзал в Париже. Так придумал архитектор <strong>А. Кракау</strong>, который строил их оба. Дорогу на Петергоф, Ораниенбаум, Гатчину и Лугу решили строить в 1853 году. 
                  А первый поезд отправился с Балтийского вокзала <strong>21 июля 1857 года</strong>.
                </p>
                <p>
                  В 1930-е годы вокзал ждали изменения: вместо паровозной тяги поезда стали ходить на электрической, а здание вокзала реконструировали, чтобы справиться с потоком пассажиров. 
                  С 1933 года Балтийский вокзал принимает только пригородные поезда. Зато много: по объему пригородных перевозок он один из самых крупных в России и второй в Санкт-Петербурге.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ладожский вокзал */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Ладожский вокзал
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Ладожский вокзал был открыт к <strong>300-летию Санкт-Петербурга</strong> в мае 2003 года. Первый поезд прибыл на новый вокзал <strong>11 июня 2003 года</strong>. Это был «Лев Толстой», Москва—Хельсинки.
                </p>
                <p>
                  Ладожский — самый молодой и самый технологичный среди питерских вокзалов и единственный не тупиковый, а транзитный. Устройство вокзала — двухъярусное. Нижний ярус отдан пассажирам пригородных поездов, верхний — пассажирам поездов дальнего следования. 
                  А еще там просто красиво, просторно, удобно и есть все, что надо путешественнику. Автор проекта — архитектор И. Явейн.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Варшавский вокзал */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <History className="w-6 h-6 text-primary" />
                Варшавский вокзал
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Есть еще один вокзал в Санкт-Петербурге: Варшавский. Варшавская линия считалась «императорской». Отсюда уходили, в основном, поезда с вагонами 1 класса и личные поезда. Направления — Варшава и Париж, дорога в Европу.
                </p>
                <p>
                  В 2001 года вокзал закрылся на реконструкцию. Поезда перевели на другие вокзалы. С тех пор он не действует. Является памятником архитектуры. На территории открыт Музей железнодорожной техники и развлекательный комплекс «Варшавский экспресс».
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2 text-base">
                <li>
                  <Link to="/reference/trains/russian-stations" className="text-primary hover:underline">
                    Вокзалы России
                  </Link>
                </li>
                <li>
                  <Link to="/reference/trains/moscow-stations" className="text-primary hover:underline">
                    Вокзалы Москвы
                  </Link>
                </li>
                <li>
                  <Link to="/reference/trains/how-to-buy" className="text-primary hover:underline">
                    Покупка ж/д билетов
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SpbStations;
