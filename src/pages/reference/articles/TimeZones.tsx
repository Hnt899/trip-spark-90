import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Globe, Info } from "lucide-react";

const TimeZones = () => {
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
          <span>Часовые пояса и ЖД</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Часовые пояса и ЖД</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                Раньше люди жили просто: вставали с восходом солнца, ложились спать с закатом, минуты и секунды обычного человека интересовали редко. 
                Путешествия длились месяцами и годами, готовились к ним основательно, да и не у каждого были возможность и желание посмотреть мир. 
                В каждом городе действовало свое время, зависело оно от географической долготы.
              </p>
              <p className="text-base leading-relaxed mt-3">
                Как же получилось так, что теперь мы не только считаем в поездке минуты, а еще и пользуемся понятием часовых поясов?
              </p>
            </CardContent>
          </Card>

          {/* История */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Роль железной дороги в введении часовых поясов
              </h2>
              <p className="text-base leading-relaxed">
                Оказывается, во всем «виновата» железная дорога. В 19 веке в Великобритании была уже достаточно разветвленная сеть железных дорог. 
                При этом расписание поездов составлялось свое для каждого города, и время там тоже было свое, местное. Получалась неразбериха: люди опаздывали, 
                машинисты путались, а там и до аварии недалеко...
              </p>
              <p className="text-base leading-relaxed mt-3">
                Руководство железной дороги долго искало выход, а потом предложило правительству ввести на территории всей страны единое время. Идея понравилась. 
                Решили, что установят такое время по данным Гринвичской обсерватории. (Greenwich Mean Time, GMT). Это время носило еще название «лондонского».
              </p>
            </CardContent>
          </Card>

          {/* Введение единого времени */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                Официальное введение единого времени
              </h2>
              <p className="text-base leading-relaxed">
                Официальной датой введения единого времени на всех железных дорогах Великобритании считается <strong>1 декабря 1847 года</strong>. Путаница прекратилась. 
                В остальных странах стандартное время ввели позже. Например, в Канаде и Америке его ввели в 1883 году. И тоже сначала на железной дороге. 
                Купить билет на поезд и приехать вовремя стало легко. В России часовые пояса появились только в <strong>1919 году</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Международная система */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                Международная система часовых поясов
              </h2>
              <p className="text-base leading-relaxed">
                Установить часовые пояса не только в пределах страны, но и по всему миру — это тоже идея железнодорожника, инженера сэра Сэнфорда Флеминга. 
                В <strong>1884 году</strong> на международной конференции договорились о том, что Гринвичский меридиан становится основным, долгота отсчитывается от него на восток и на запад на 180 градусов, 
                и новый астрономический день начинается в полночь, а не в полдень, как раньше, и состоит из 24 часов.
              </p>
            </CardContent>
          </Card>

          {/* РЖД */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed text-blue-900">
                В расписании поездов ОАО «РЖД» и на билете указано местное время.
              </p>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2 text-base">
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

export default TimeZones;
