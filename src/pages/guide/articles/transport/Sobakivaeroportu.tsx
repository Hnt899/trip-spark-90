import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Dog, AlertCircle, CheckCircle, Info } from "lucide-react";

const Sobakivaeroportu = () => {
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
          <Link to="/guide" className="hover:text-primary">Транспорт</Link>
          <span>/</span>
          <span>Собаки в аэропорту</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Кинологическая служба аэропорта</h1>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Служебные собаки в аэропортах — это не просто милые питомцы, а важная часть системы безопасности. Кинологическая служба аэропорта играет ключевую роль в обеспечении безопасности пассажиров и грузов.
              </p>
              <p className="text-base leading-relaxed">
                Специально обученные собаки помогают обнаруживать взрывчатые вещества, наркотики и другие опасные предметы, которые могут угрожать безопасности авиаперевозок.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Dog className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Работа кинологической службы</h2>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Кинологи со служебными собаками работают в различных зонах аэропорта:
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Досмотр багажа и ручной клади</li>
                    <li>Проверка грузовых отправлений</li>
                    <li>Патрулирование зон аэропорта</li>
                    <li>Проверка залов ожидания и других помещений</li>
                    <li>Осмотр транспортных средств</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Что умеют служебные собаки</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Обнаружение взрывчатых веществ</p>
                    <p className="text-sm text-muted-foreground">
                      Собаки обучены распознавать запахи различных взрывчатых веществ, даже в очень малых количествах
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Обнаружение наркотиков</p>
                    <p className="text-sm text-muted-foreground">
                      Специализированные собаки помогают выявлять наркотические вещества в багаже и грузах
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Патрулирование</p>
                    <p className="text-sm text-muted-foreground">
                      Собаки помогают охранять территорию аэропорта и обеспечивать безопасность пассажиров
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как работает команда кинолога и собаки</h2>
              </div>
              <p className="text-base leading-relaxed mb-4">
                Кинолог и его собака работают как единая команда. Собака использует своё исключительное обоняние для обнаружения опасных веществ, а кинолог интерпретирует поведение собаки и принимает решения.
              </p>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong>Важно:</strong> Служебные собаки проходят специальную подготовку и регулярную переподготовку. Они не агрессивны к людям и обучены работать в условиях аэропорта, среди большого количества пассажиров и багажа.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sobakivaeroportu;
