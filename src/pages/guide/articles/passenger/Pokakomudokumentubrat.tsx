import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, User, Baby, CreditCard, AlertCircle, CheckCircle } from "lucide-react";

const Pokakomudokumentubrat = () => {
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
          <span>По какому документу брать билет?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">По какому документу брать билет?</h1>

        <div className="space-y-8">
          {/* Для взрослых */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Для взрослых пассажиров</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Основные документы</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li><strong>Паспорт гражданина РФ</strong> — основной документ для граждан России</li>
                    <li><strong>Заграничный паспорт</strong> — используется для поездок за границу или при отсутствии внутреннего паспорта</li>
                    <li><strong>Военный билет</strong> — для военнослужащих срочной службы</li>
                    <li><strong>Временное удостоверение личности</strong> — выдается при замене паспорта</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> При покупке билета указывайте данные точно так, как они записаны в документе. Ошибки в написании имени или фамилии могут привести к отказу в посадке.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Для детей */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Baby className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Для детей</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">До 14 лет</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li><strong>Свидетельство о рождении</strong> — основной документ</li>
                    <li><strong>Паспорт</strong> — если паспорт уже получен (с 14 лет)</li>
                    <li><strong>Заграничный паспорт</strong> — для поездок за границу</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">От 14 до 18 лет</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li><strong>Паспорт гражданина РФ</strong> — основной документ</li>
                    <li><strong>Свидетельство о рождении</strong> — может использоваться, если паспорт еще не получен</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Обратите внимание:</strong> Детям до 10 лет билет можно оформить без указания данных документа, но документ понадобится при посадке.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Для иностранных граждан */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Для иностранных граждан</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li><strong>Заграничный паспорт</strong> с визой (если требуется)</li>
                  <li><strong>Разрешение на временное проживание (РВП)</strong></li>
                  <li><strong>Вид на жительство</strong></li>
                  <li><strong>Документ беженца</strong></li>
                </ul>

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Важно:
                  </p>
                  <p className="text-sm leading-relaxed">
                    При поездках за границу проверьте срок действия документа и наличие необходимых виз заранее.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Электронная регистрация */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Электронная регистрация</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  При покупке билета с электронной регистрацией вам не нужно забирать бумажный билет в кассе. Для посадки в поезд достаточно предъявить документ, удостоверяющий личность, данные которого указаны при покупке.
                </p>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold mb-1">Преимущества электронной регистрации:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                        <li>Не нужно забирать билет в кассе</li>
                        <li>Экономия времени</li>
                        <li>Билет нельзя потерять</li>
                        <li>Можно показать данные билета на экране телефона</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Важные советы */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Важные советы</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Проверяйте данные при покупке</p>
                    <p className="text-sm text-muted-foreground">
                      Внимательно проверяйте написание имени и фамилии при покупке билета. Они должны точно совпадать с данными в документе.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Берите документ с собой</p>
                    <p className="text-sm text-muted-foreground">
                      Всегда берите с собой тот документ, данные которого указаны в билете. Без документа вас не допустят к посадке.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Срок действия документа</p>
                    <p className="text-sm text-muted-foreground">
                      Убедитесь, что документ не просрочен. Просроченный документ не принимается при посадке.
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

export default Pokakomudokumentubrat;
