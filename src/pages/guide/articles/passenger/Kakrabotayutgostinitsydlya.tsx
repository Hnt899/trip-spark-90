import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Dog, Home, CheckCircle, DollarSign, Phone } from "lucide-react";

const Kakrabotayutgostinitsydlya = () => {
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
          <span>Как работают гостиницы для животных?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Где оставить животное на время поездки?</h1>

        <div className="space-y-8">
          {/* Гостиницы для животных */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Home className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Гостиницы для животных</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Специализированные гостиницы для животных предлагают временное размещение вашего питомца.
                </p>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Услуги</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Проживание в отдельных вольерах или комнатах</li>
                    <li>Кормление по графику</li>
                    <li>Выгул для собак</li>
                    <li>Ветеринарный уход при необходимости</li>
                    <li>Медицинское обслуживание</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Требования</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Ветеринарный паспорт с прививками</li>
                    <li>Справка о здоровье животного</li>
                    <li>Предоплата или залог</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Другие варианты */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Dog className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Другие варианты</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Передержка у друзей или родственников</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Если есть знакомые, готовые присмотреть за животным</li>
                    <li>Более комфортно для животного</li>
                    <li>Обычно дешевле</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">Передержка у зоонянь</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Профессиональные сиделки для животных</li>
                    <li>Присмотр на дому у вас или у зооняни</li>
                    <li>Индивидуальный подход</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">Дневные центры</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Для коротких поездок</li>
                    <li>Животное находится в центре днем</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как выбрать */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как выбрать</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Посетите гостиницу лично перед бронированием</li>
                  <li>Проверьте условия содержания животных</li>
                  <li>Узнайте о ветеринарном обслуживании</li>
                  <li>Почитайте отзывы других владельцев</li>
                  <li>Уточните стоимость и что входит в услуги</li>
                  <li>Убедитесь, что есть лицензия на деятельность</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Советы */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные советы</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Бронируйте заранее</p>
                    <p className="text-sm text-muted-foreground">
                      Особенно в сезон отпусков места в гостиницах для животных могут быть заняты. Бронируйте место заранее.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Держите связь</p>
                    <p className="text-sm text-muted-foreground">
                      Оставьте контакты для связи на случай экстренных ситуаций. Многие гостиницы отправляют фото и отчеты о состоянии животного.
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

export default Kakrabotayutgostinitsydlya;
