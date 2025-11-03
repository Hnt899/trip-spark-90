import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle, FileText, AlertCircle, Globe } from "lucide-react";

const Sovetyparanoikamperedpoezdkoy = () => {
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
          <span>Советы параноикам перед поездкой</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Советы путешественникам-параноикам</h1>

        <div className="space-y-8">
          {/* Документы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Документы</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Сделайте копии всех важных документов (паспорт, виза, страховка, билеты)</li>
                  <li>Храните копии отдельно от оригиналов</li>
                  <li>Сохраните скан-копии в облачном хранилище</li>
                  <li>Возьмите с собой фотографии документов на телефон</li>
                  <li>Сообщите родственникам маршрут и контакты отелей</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Финансы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Финансы</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Возьмите несколько банковских карт разных банков</li>
                  <li>Храните карты в разных местах</li>
                  <li>Имейте небольшой запас наличных в разных валютах</li>
                  <li>Сообщите банку о поездке, чтобы не заблокировали карту</li>
                  <li>Сохраните контакты банков для экстренной блокировки</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Контакты и связь */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Связь и контакты</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Сохраните контакты посольства России в стране назначения</li>
                  <li>Запишите номера экстренных служб страны</li>
                  <li>Сохраните контакты страховой компании</li>
                  <li>Возьмите с собой запасную SIM-карту или купите eSIM</li>
                  <li>Настройте роуминг или местную связь</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Безопасность */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Безопасность</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Изучите законы и обычаи страны назначения</li>
                  <li>Узнайте о районах, которых стоит избегать</li>
                  <li>Не носите все ценности с собой</li>
                  <li>Используйте сейф в отеле для документов и денег</li>
                  <li>Будьте осторожны с Wi-Fi в общественных местах</li>
                  <li>Не публикуйте информацию о местоположении в реальном времени</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Здоровье */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Здоровье</h2>
              <div className="space-y-3">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Оформите медицинскую страховку для поездок за границу</li>
                  <li>Возьмите необходимые лекарства с запасом</li>
                  <li>Возьмите рецепты на лекарства (при международных поездках)</li>
                  <li>Узнайте адреса ближайших аптек и больниц</li>
                  <li>Уточните требования к вакцинации</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Итоговый чеклист */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Итоговый чеклист</h2>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>✓ Все документы скопированы и сохранены</li>
                  <li>✓ Контакты посольств и экстренных служб записаны</li>
                  <li>✓ Банки уведомлены о поездке</li>
                  <li>✓ Медицинская страховка оформлена</li>
                  <li>✓ Родственники знают маршрут</li>
                  <li>✓ Ценности оставлены в безопасном месте</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sovetyparanoikamperedpoezdkoy;
