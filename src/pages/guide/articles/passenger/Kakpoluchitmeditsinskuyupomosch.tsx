import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Phone, MapPin, AlertCircle, Clock, Globe, Stethoscope } from "lucide-react";

const Kakpoluchitmeditsinskuyupomosch = () => {
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
          <Link to="/guide" className="hover:text-primary">Полезно пассажиру</Link>
          <span>/</span>
          <span>Как получить медицинскую помощь?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как получить медицинскую помощь в путешествии?</h1>

        <div className="space-y-8">
          {/* В России */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">В России</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Экстренная медицинская помощь</h3>
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                    <p className="text-xl font-bold text-red-900 mb-2">103 или 112</p>
                    <p className="text-sm text-red-900">
                      Вызов скорой медицинской помощи. Звонок бесплатный с любого телефона.
                    </p>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Скорая помощь выезжает по вызову круглосуточно</li>
                    <li>Медицинская помощь оказывается бесплатно при наличии полиса ОМС</li>
                    <li>При отсутствии полиса услуги оплачиваются самостоятельно</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">В поезде</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Обратитесь к проводнику вагона</li>
                    <li>Проводник может вызвать медицинскую помощь на ближайшей станции</li>
                    <li>На многих поездах есть аптечка первой помощи</li>
                    <li>В критических ситуациях поезд может сделать внеплановую остановку</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* За границей */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">За границей</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Экстренные номера</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li><strong>112</strong> — единый номер экстренных служб в странах ЕС</li>
                    <li><strong>911</strong> — в США, Канаде и некоторых других странах</li>
                    <li>Уточните номер скорой помощи в стране пребывания заранее</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Медицинская страховка</h3>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <p className="text-sm font-semibold mb-2">Очень важно:</p>
                    <p className="text-sm leading-relaxed mb-2">
                      Перед поездкой обязательно оформите медицинскую страховку для поездок за границу. Без страховки медицинские услуги могут стоить очень дорого.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                      <li>Страховка покрывает экстренную медицинскую помощь</li>
                      <li>При наступлении страхового случая сразу звоните в страховую компанию</li>
                      <li>Сохраните контакты страховой компании и номер полиса</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Обращение в консульство</h3>
                  <p className="text-base leading-relaxed mb-3">
                    В сложных ситуациях вы можете обратиться в консульство России:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Консульство может помочь найти русскоязычного врача</li>
                    <li>Оказать содействие в связи с родственниками</li>
                    <li>Помочь в оформлении документов для возвращения в Россию</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Что делать до поездки */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что сделать до поездки</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Оформите медицинскую страховку (особенно для поездок за границу)</li>
                  <li>Возьмите с собой необходимые лекарства и рецепты</li>
                  <li>Сохраните контакты страховой компании и экстренных служб</li>
                  <li>Узнайте адреса ближайших медицинских учреждений по маршруту</li>
                  <li>Если у вас есть хронические заболевания, возьмите выписку из медицинской карты</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Полезные советы */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные советы</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Держите под рукой контакты</p>
                    <p className="text-sm text-muted-foreground">
                      Сохраните в телефон номера экстренных служб, страховой компании и консульства страны пребывания.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Знайте, где находится помощь</p>
                    <p className="text-sm text-muted-foreground">
                      Узнайте адреса ближайших больниц и аптек по маршруту вашего путешествия.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Не откладывайте</p>
                    <p className="text-sm text-muted-foreground">
                      При серьезных проблемах со здоровьем не пытайтесь заниматься самолечением — сразу обращайтесь за медицинской помощью.
                    </p>
                  </div>
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

export default Kakpoluchitmeditsinskuyupomosch;
