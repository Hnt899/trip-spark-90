import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Map, Info, AlertCircle } from "lucide-react";

const CarriageSchemes = () => {
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
          <span>Схемы вагонов ЖД</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Схемы вагонов ЖД</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                Отправляясь в путешествие на поезде, пассажиры могут самостоятельно выбрать нужные места в вагоне. 
                Удобнее всего это делать, заранее имея перед глазами схему вагона.
              </p>
              <p className="text-base leading-relaxed mt-3">
                При покупке билета на сайте TudaSuda пассажиры выбирают места или на схеме вагона поезда, или указывая только диапазон мест. 
                При выборе можно заранее увидеть, какие места уже заняты, а какие – свободны. Начало нумерации мест в вагоне начинается от купе проводника.
              </p>
            </CardContent>
          </Card>

          {/* Плацкарт */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Map className="w-6 h-6 text-primary" />
                Схема плацкарта поезда
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Самый популярный способ путешествия на поезде – в плацкарте. В нем <strong>54 места</strong>, из которых 18 - боковые. 
                  Традиционно четные места – верхние, а нечетные – нижние.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-amber-900">
                    <AlertCircle className="w-5 h-5 inline mr-2" />
                    Большой нелюбовью пассажиров пользуются места <strong>37 и 38</strong>. Мало того, что это сомнительные по комфорту «боковушки», 
                    так они еще и расположены около туалета. Однако направление популярное или ехать недолго, то эти места активно раскупаются наравне с другими.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Купе */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Map className="w-6 h-6 text-primary" />
                Схема купе поезда
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  В купейном вагоне <strong>36 мест</strong>, распределенных по 9 «отсекам». В одном купе 4 полки: две нижние и две верхние. 
                  Расположение мест в вагоне здесь организовано по тому же принципу, что и в плацкарте: четные - верхние, нечетные – нижние.
                </p>
                <p>
                  Верхние полки в купе часто продаются со скидкой и иногда даже сравниваются по стоимости с проездом в плацкарте. 
                  Розетки в вагоне есть не только около туалетов, но и в коридоре, поэтому подзарядить мобильный телефон можно будет без проблем.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* СВ */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Map className="w-6 h-6 text-primary" />
                Спальный вагон (СВ)
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Путешествие в СВ или люксе можно назвать одним из самых комфортных. В одном спальном вагоне одновременно могут ехать 
                  <strong> 18 человек</strong>, в каждом отсеке по два. Схема расположения мест здесь простая – верхних полок нет.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Международные поезда */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Map className="w-6 h-6 text-primary" />
                Международные поезда
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  В международных поездах можно встретить двухместные, трехместные и четырехместные купе. Такие поезда ходят в страны Балтии и Евросоюза. 
                  Принцип нумерации здесь такой же, как и в других поездах.
                </p>
                <p>
                  Однако в трехместных купе она отличается: средними будут места, заканчивающиеся на «3» и «4» - например, 13 и 14.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Скоростные поезда */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Map className="w-6 h-6 text-primary" />
                Скоростные поезда
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Скоростные поезда «Сапсан», «Ласточка» и «Стриж» оборудованы сидячими вагонами разных классов. При выборе места пассажира в первую очередь 
                  интересует, как он будет сидеть – против или по направлению движения поезда.
                </p>
                <p>
                  Чаще всего можно заранее выбрать интересующее расположение в вагоне, однако иногда при формировании поезда вагоны могут «перевернуться». 
                  В сидячем вагоне при выборе места нужно быть особенно внимательным, чтобы потом не быть всю дорогу придавленным соседскими коленями. 
                  Чаще всего на схеме указать нужные места в поезде не получится, поэтому нужно заранее знать «диапазон комфорта». Как правило, это середина.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Информация о схеме */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-blue-700" />
                Где найти схему вагона
              </h2>
              <p className="text-base leading-relaxed text-blue-900">
                Схема вагона с местами обычно висит около кассы на вокзале. Это не значит, что теперь придется туда ехать – при покупке билета на TudaSuda 
                вы сможете выбрать комфортное расположение мест в поезде на интерактивной схеме, где видны свободные полки, их ярус, а также перечислены услуги, 
                которые получает пассажир того или иного типа вагона.
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

export default CarriageSchemes;
