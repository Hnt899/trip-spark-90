import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, AlertCircle, CheckCircle, Globe } from "lucide-react";

const Vozitlipasportrf = () => {
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
          <span>Возить ли паспорт РФ за границу?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Почему стоит брать российский паспорт с собой в заграничную поездку?</h1>

        <div className="space-y-8">
          {/* Зачем нужен */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Зачем нужен паспорт РФ</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Хотя для выезда за границу используется заграничный паспорт, российский паспорт может понадобиться в различных ситуациях.
                </p>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Ситуации, когда может понадобиться</h3>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Обращение в консульство или посольство России</li>
                    <li>Доказательство российского гражданства</li>
                    <li>Получение помощи от консульства в экстренных ситуациях</li>
                    <li>Документирование при потере или краже заграничного паспорта</li>
                    <li>Подтверждение личности в сложных ситуациях</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Потеря заграничного паспорта */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Если потеряли заграничный паспорт</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  В случае потери или кражи заграничного паспорта российский паспорт поможет:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Быстрее восстановить заграничный паспорт в консульстве</li>
                  <li>Получить временный документ для возвращения в Россию</li>
                  <li>Доказать свое гражданство</li>
                  <li>Получить консульскую помощь</li>
                </ul>

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Без документов, подтверждающих гражданство, процесс получения нового заграничного паспорта может затянуться.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Консульская помощь */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Обращение в консульство</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  При обращении в консульство России за границей российский паспорт может потребоваться для:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Подтверждения гражданства</li>
                  <li>Оформления документов</li>
                  <li>Получения помощи в экстренных ситуациях</li>
                  <li>Доказательства личности</li>
                </ul>
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
                    <p className="text-base font-semibold mb-1">Берите с собой</p>
                    <p className="text-sm text-muted-foreground">
                      Рекомендуется брать российский паспорт с собой в поездку, хранить его отдельно от заграничного паспорта (например, в сейфе отеля).
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Сделайте копии</p>
                    <p className="text-sm text-muted-foreground">
                      Сделайте копии обоих паспортов и храните их отдельно от оригиналов, также сохраните сканы в облачном хранилище.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Безопасность</p>
                    <p className="text-sm text-muted-foreground">
                      Не носите оба паспорта вместе — храните российский паспорт в безопасном месте, а заграничный носите с собой.
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

export default Vozitlipasportrf;
