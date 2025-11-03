import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Info } from "lucide-react";

const RussianStations = () => {
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
          <span>Вокзалы России</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Вокзалы России</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-base leading-relaxed">
                Слово «вокзал» встречается только на дорогах России. В официальных документах принят термин «пассажирское здание». Но это скучно и громоздко. 
                И сами вокзалы с момента своего появления у нас никогда не считались только техническими сооружениями. Сюда приходят не только узнать расписание поездов или купить жд билет. 
                Столько эмоций связано с вокзалами!
              </p>
              <p className="text-base leading-relaxed mt-3">
                По сложившейся традиции строить вокзалы в России поручали известным архитекторам. Каждая дорога старалась иметь свое «лицо», свой стиль оформления, свой типаж построек.
              </p>
            </CardContent>
          </Card>

          {/* Петрозаводск */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Петрозаводск
              </h2>
              <p className="text-base leading-relaxed">
                Вокзал — настоящие «ворота города». Он не противоречит окружающей застройке, а органично влит в ансамбль площади Гагарина, и является его архитектурной доминантой. 
                И вокзал же дает начало главной оси города — проспекту Ленина. Построен в 1955 году, в стиле неоклассицизма, признан памятником архитектуры. Автор проекта — В.П. Ципулин.
              </p>
            </CardContent>
          </Card>

          {/* Самара */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Самара
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Самый новый из вокзалов России. Он же — самый высокий в Европе. На высоте <strong>95 метров</strong> расположена смотровая площадка, откуда открывается великолепная панорама всего города.
                </p>
                <p>
                  По вокзалу легко передвигаться с багажом: вместо привычных лестниц — пандусы, идущие спиралью с этажа на этаж. Или лифт. Расписание поездов, где Самара является начальной или конечной точкой путешествия, 
                  легко увидеть на больших электронных табло. В музей Куйбышевской железной дороги, находящийся под самым куполом, водят экскурсии.
                </p>
                <p>
                  Вечером, благодаря иллюминации, вокзал представляет собой фантастическое зрелище.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Липецк */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Липецк
              </h2>
              <p className="text-base leading-relaxed">
                Липецкий вокзал считается памятником советского футуризма. Такими чертами, в представлении архитекторов, должны были обладать города будущего.
              </p>
            </CardContent>
          </Card>

          {/* Новосибирск */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Новосибирск
              </h2>
              <p className="text-base leading-relaxed">
                Памятник труду трех поколений архитекторов, каждый из которых добавлял вокзалу Новосибирска красоты. В результате получился исторический музей под открытым небом и важная туристическая достопримечательность города. 
                Скульптуры, макет первого паровоза Царскосельской дороги, памятные таблички, роскошные интерьеры, свет, мрамор и чистота — все это новосибирский вокзал.
              </p>
            </CardContent>
          </Card>

          {/* Красноярск */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Красноярск
              </h2>
              <p className="text-base leading-relaxed">
                Не только сам красноярский вокзал, но и вся привокзальная площадь — гордость города. Просторно, удобно, основательно и есть чем порадовать глаз. Построен вокзал в неорусском стиле архитектором Сергеем Соловьевым. 
                А встретит вас лев. С серпом и лопатой. Это символ города.
              </p>
            </CardContent>
          </Card>

          {/* Омск */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Омск
              </h2>
              <p className="text-base leading-relaxed">
                Вокзал Омска — самый эклектичный по своему внешнему облику: тут смешались и советский модернизм, и конструктивизм, и неоклассицизм. Тот, кто видел здание вокзала в конце XIX века, сейчас бы его не узнал, 
                оно трижды перестраивалось. Тот же, кто зайдет внутрь (например, посмотреть расписание поездов Омск —Новосибирск), обнаружит почти царский дворец.
              </p>
            </CardContent>
          </Card>

          {/* Челябинск */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Челябинск
              </h2>
              <p className="text-base leading-relaxed">
                Челябинский вокзал наоборот, отличается своей строгостью. И считается образцом функциональности. А внутри находится музей камня, фонтан и замечательный зимний сад.
              </p>
            </CardContent>
          </Card>

          {/* Сочи и Симферополь */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-primary" />
                Сочи и Симферополь
              </h2>
              <p className="text-base leading-relaxed">
                Вокзалы в Сочи и в Симферополе — близнецы. Построены они в 1950-е годы и оба создают атмосферу восточной сказки. Высокая башня с часами, цветы, пальмы, много воздуха и света. Хочется и самому почувствовать себя султаном.
              </p>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2 text-base">
                <li>
                  <Link to="/reference/trains/moscow-stations" className="text-primary hover:underline">
                    Вокзалы Москвы
                  </Link>
                </li>
                <li>
                  <Link to="/reference/trains/spb-stations" className="text-primary hover:underline">
                    Вокзалы Санкт-Петербурга
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

export default RussianStations;
