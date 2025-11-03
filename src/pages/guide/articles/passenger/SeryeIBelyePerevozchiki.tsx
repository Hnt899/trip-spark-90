import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Shield, XCircle } from "lucide-react";

const SeryeIBelyePerevozchiki = () => {
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
          <span>«Серые» и «белые» перевозчики?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Кто такие «серые» и «белые» перевозчики?</h1>

        <div className="space-y-8">
          {/* Белые перевозчики */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">«Белые» перевозчики</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  «Белые» перевозчики — это официальные компании, которые работают легально и соблюдают все требования законодательства.
                </p>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Признаки «белого» перевозчика</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Официальная регистрация в качестве перевозчика</li>
                    <li>Лицензия на перевозку пассажиров</li>
                    <li>Страхование ответственности перед пассажирами</li>
                    <li>Выдача официальных билетов с фискальными чеками</li>
                    <li>Соблюдение правил безопасности</li>
                    <li>Уплата налогов и отчислений</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Преимущества:</strong> Защита прав пассажиров, возможность получить компенсацию при проблемах, гарантии безопасности.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Серые перевозчики */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold">«Серые» перевозчики</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  «Серые» перевозчики — это компании или частные лица, которые работают неофициально или частично уклоняются от соблюдения требований.
                </p>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Признаки «серого» перевозчика</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Билеты без фискальных чеков или с поддельными чеками</li>
                    <li>Отсутствие официальной документации</li>
                    <li>Слишком низкие цены (ниже рыночных)</li>
                    <li>Отсутствие страховки</li>
                    <li>Нерегулярные рейсы</li>
                    <li>Отказ предоставить официальные документы</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Риски:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-6">
                    <li>Отсутствие защиты прав пассажиров</li>
                    <li>Невозможность получить компенсацию при проблемах</li>
                    <li>Нарушения правил безопасности</li>
                    <li>Отсутствие страховки</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как отличить */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как отличить</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Проверка перевозчика</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Проверьте наличие компании в официальных реестрах</li>
                    <li>Уточните наличие лицензии на перевозку</li>
                    <li>Проверьте наличие страховки</li>
                    <li>Обратите внимание на выдачу официальных билетов</li>
                    <li>Проверьте отзывы других пассажиров</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Совет:</strong> Покупайте билеты через официальные платформы, такие как GoTrip, которые работают только с проверенными перевозчиками.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Рекомендации */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Рекомендации</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Выбирайте проверенных перевозчиков</p>
                    <p className="text-sm text-muted-foreground">
                      Отдавайте предпочтение известным компаниям с хорошей репутацией и официальной регистрацией.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Будьте осторожны с очень дешевыми билетами</p>
                    <p className="text-sm text-muted-foreground">
                      Если цена слишком низкая по сравнению с конкурентами, это может быть признаком неофициальной деятельности.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Проверяйте документы</p>
                    <p className="text-sm text-muted-foreground">
                      Убедитесь, что вам выдают официальный билет с фискальным чеком и всей необходимой информацией.
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

export default SeryeIBelyePerevozchiki;
