import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Coffee, Info, Heart, DollarSign } from "lucide-react";

const Germaniya = () => {
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
          <Link to="/guide" className="hover:text-primary">Надолго в другую страну</Link>
          <span>/</span>
          <span>Германия</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как живут в Германии</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=500&fit=crop" 
                  alt="Берлин, Германия" 
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
              </div>
              <p className="text-base leading-relaxed mb-4">
                Германия — это страна порядка, высокого качества жизни и развитой инфраструктуры. Немцы известны своей пунктуальностью, дисциплиной и стремлением к качеству во всём.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Жизнь в Германии комфортна и предсказуема, с высоким уровнем безопасности, отличным общественным транспортом и развитой социальной системой. Немцы известны своей пунктуальностью, дисциплиной и стремлением к качеству во всём, что делает Германию привлекательной для долгосрочного пребывания.
              </p>
              <p className="text-base leading-relaxed">
                От современных мегаполисов до живописных провинциальных городов, от Альп до побережья Балтийского моря — Германия предлагает разнообразие для долгосрочного пребывания. Здесь можно найти свой ритм жизни, будь то активная городская жизнь или спокойная атмосфера в небольших городах.
              </p>
            </CardContent>
          </Card>

          {/* Культура и образ жизни */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Культура и образ жизни</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Немцы ценят порядок, приватность и качество. Здесь принято планировать всё заранее, соблюдать правила и уважать личное пространство других. Работа и личная жизнь строго разделены — немцы умеют наслаждаться свободным временем и не приносят работу домой.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Немецкая культура — это культура эффективности и качества. Здесь всё работает как часы: общественный транспорт приходит вовремя, услуги оказываются качественно, товары служат долго. Немцы гордятся своей страной, её историей и достижениями, но при этом открыты к другим культурам.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold mb-2">Особенности жизни в Германии:</p>
                <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                  <li>Пунктуальность и планирование — всё заранее и вовремя</li>
                  <li>Разделение работы и личной жизни — баланс важен</li>
                  <li>Любовь к природе и активному отдыху — велосипеды, походы, спорт</li>
                  <li>Качество и надёжность — немцы ценят долговечность</li>
                  <li>Экологическое сознание — разделение мусора, велосипеды, зелёная энергия</li>
                  <li>Прямолинейность в общении — честность ценится выше вежливости</li>
                  <li>Любовь к пиву и фестивалям — Октоберфест, рождественские рынки</li>
                </ul>
              </div>
              <p className="text-base leading-relaxed">
                Немцы могут показаться сдержанными поначалу, но они дружелюбны и готовы помочь. Важно уважать их правила и традиции, и тогда можно легко интегрироваться в местное сообщество. Немецкое общество очень организовано, что делает жизнь предсказуемой и комфортной.
              </p>
            </CardContent>
          </Card>

          {/* Где остановиться */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Где остановиться надолго</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Берлин — столица, привлекающая творческих людей, стартаперов и экспатов. Здесь относительно недорогое жильё (по сравнению с другими европейскими столицами), активная культурная жизнь, множество кафе, ресторанов и коворкингов. Берлин — это город возможностей, где легко найти единомышленников.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Мюнхен — город с высоким качеством жизни, но и высокими ценами. Здесь красивая архитектура, близость к Альпам, отличная инфраструктура. Гамбург — портовый город с особой атмосферой, развитой культурной жизнью. Кёльн, Франкфурт, Дюссельдорф — крупные города с хорошими возможностями для работы и жизни.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Аренда жилья в Германии варьируется в зависимости от города. В Берлине можно снять квартиру от 600-1200 евро в месяц, в Мюнхене цены выше (800-1500 евро). В небольших городах жильё дешевле. Многие экспаты предпочитают жить в центре города или в районах с хорошей транспортной доступностью.
              </p>
              <div className="mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=800&h=500&fit=crop" 
                  alt="Германия, природа и города" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Стоимость жизни */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Стоимость жизни</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Стоимость жизни в Германии выше, чем в Восточной Европе, но ниже, чем в Швейцарии или скандинавских странах. Аренда жилья — основная статья расходов. Еда в супермаркетах качественная и относительно недорогая. Рестораны дороже, но качество еды отличное.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Общественный транспорт развит отлично, стоит разумно. Многие предпочитают велосипед — это дешёво, экологично и удобно. Интернет быстрый и надёжный. Медицинское обслуживание качественное, покрывается страховкой. Образование высокого качества, многие университеты бесплатные.
              </p>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <p className="text-sm leading-relaxed mb-2">
                  <strong>Преимущество:</strong> Германия предлагает высокое качество жизни при разумных расходах. Социальная система развита, что обеспечивает безопасность и стабильность. Качество товаров и услуг высокое, что делает жизнь комфортной.
                </p>
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Цены различаются по регионам — юг и крупные города дороже. Налоги высокие, но это компенсируется качеством общественных услуг. Важно иметь медицинскую страховку.
                </p>
              </div>
              <p className="text-base leading-relaxed">
                Продукты в супермаркетах качественные, особенно молочные продукты, хлеб, мясо. Немцы ценят качество и готовы платить за него. Рестораны предлагают разнообразную кухню — от традиционной немецкой до интернациональной. Кафе и бары многочисленны, особенно в крупных городах.
              </p>
            </CardContent>
          </Card>

          {/* Что делать */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что посмотреть и чем заняться</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Крупные города</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Берлин — столица с богатой историей, множеством музеев, галерей, театров. Бранденбургские ворота, Рейхстаг, Музейный остров — здесь каждый найдёт что-то интересное. Мюнхен — столица Баварии, известная Октоберфестом, красивой архитектурой и близостью к Альпам.
                  </p>
                  <p className="text-base leading-relaxed">
                    Гамбург — портовый город с особой атмосферой, развитой культурной жизнью. Кёльн — город с великолепным собором и карнавалом. Дрезден — город искусства и архитектуры. Каждый город имеет свой характер и предлагает уникальный опыт.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Природа и активный отдых</h3>
                  <p className="text-base leading-relaxed mb-2">
                    Альпы на юге Германии предлагают возможности для горнолыжного спорта, треккинга, альпинизма. Чёрный лес (Шварцвальд) — регион с красивой природой, идеален для походов. Балтийское и Северное моря — побережье с пляжами и курортами.
                  </p>
                  <p className="text-base leading-relaxed">
                    Немцы любят активный отдых — велосипедные маршруты пронизывают всю страну, множество пешеходных троп, возможности для водных видов спорта. Природа Германии разнообразна и доступна — от гор до моря, от лесов до рек.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Культура и история</h3>
                  <p className="text-base leading-relaxed">
                    Германия богата историей и культурой. Множество замков (Нойшванштайн, Гейдельберг), исторических городов (Ротенбург-об-дер-Таубер, Бамберг), музеев и галерей. Музыкальные фестивали, театры, опера — культурная жизнь очень активна. Рождественские рынки — особое явление, которое стоит увидеть.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Немецкая кухня */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Немецкая кухня</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Немецкая кухня — это сытная и вкусная еда. Братурст (колбаски), шницель, квашеная капуста, кнедлики — традиционные блюда. Каждый регион имеет свои кулинарные традиции: баварская кухня отличается от северной, а швабская — от саксонской.
              </p>
              <p className="text-base leading-relaxed mb-4">
                Немцы любят хлеб — здесь множество сортов, от ржаного до белого. Пиво — важная часть культуры, особенно в Баварии. Вино также популярно, особенно в регионах вдоль Рейна и Мозеля. Немецкая кухня сытная и качественная, с акцентом на местные продукты.
              </p>
              <p className="text-base leading-relaxed">
                В крупных городах можно найти кухню со всего мира — от азиатской до латиноамериканской. Немцы ценят качество еды и готовы платить за хорошие продукты. Рестораны предлагают разнообразное меню, от традиционных блюд до современных интерпретаций.
              </p>
            </CardContent>
          </Card>

          {/* Практические советы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Практические советы для долгого пребывания</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Виза</h3>
                  <p className="text-base leading-relaxed">
                    Для граждан России нужна шенгенская виза для поездок в Германию. Для долгосрочного пребывания нужно оформить национальную визу и вид на жительство. Правила могут меняться, поэтому стоит проверять актуальную информацию в консульстве.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Язык</h3>
                  <p className="text-base leading-relaxed">
                    Официальный язык — немецкий. В крупных городах и туристических местах многие говорят по-английски, но для долгосрочного пребывания знание немецкого очень важно. Немецкий язык поможет в работе, общении с местными и интеграции в общество.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Безопасность</h3>
                  <p className="text-base leading-relaxed">
                    Германия — очень безопасная страна с низким уровнем преступности. Можно чувствовать себя безопасно, особенно в крупных городах. Стоит соблюдать обычные меры предосторожности, как и в любой стране.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Климат</h3>
                  <p className="text-base leading-relaxed">
                    Климат в Германии умеренный, с тёплым летом (20-25°C) и прохладной зимой (0-5°C). В горах холоднее, на побережье мягче. В целом климат комфортный для долгого пребывания, хотя зима может быть пасмурной и дождливой.
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

export default Germaniya;
