import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Globe, FileText, AlertCircle } from "lucide-react";

const PassportIssues = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Что делать при отсутствии, замене или утере паспорта</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что делать при отсутствии, замене или утере паспорта</h1>

        <div className="space-y-8">
          {/* Граждане РФ */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-primary" />
                Гражданам РФ
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  В случае отсутствия гражданского паспорта (он просрочен, утерян или находится на замене) для покупки ж/д билета и посадки в поезд можно использовать 
                  <strong> загранпаспорт</strong> или действующий <strong>военный билет</strong> (если вы проходите службу в текущий момент). Загранпаспорт действует даже в том случае, 
                  если ваша поездка по территории России. Купить билет по этим документам можно онлайн на TudaSuda.
                </p>
                
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold mb-2">Если загранпаспорта или военного билета нет:</h3>
                  <p>
                    Вам нужно обратиться в паспортный стол и получить <strong>временное удостоверение личности</strong>. В нем должны быть ваша фотография, ФИО и номер удостоверения. 
                    Если на момент поездки паспорт еще не будет получен, вы можете оформить билет и сесть в поезд по временному удостоверению.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                    <p className="text-amber-900">
                      Обратите внимание: купить билет по временному удостоверению можно только в кассе ж/д вокзала.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Если к поездке вы планируете получить готовый паспорт:</h3>
                  <p>
                    Вы можете оформить билет по данным старого паспорта (он должен быть действителен на момент покупки). Потом, при посадке на поезд, нужно показать проводнику ту страницу 
                    нового паспорта, в которой есть штамп о ранее выданных паспортах — на ней указаны серия и номер старого паспорта.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-blue-900">Если вы поменяли фамилию:</h3>
                  <p className="text-blue-900">
                    Если в новом паспорте будет указана новая фамилия, при посадке по новому паспорту или временному удостоверению также нужно предъявить оригинал 
                    <strong> свидетельства о браке</strong> или <strong>свидетельства о перемене имени</strong>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Иностранным гражданам */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                Иностранным гражданам
              </h2>
              
              <p className="text-base leading-relaxed">
                Если на руках нет других документов, которые могут подтверждать личность за границей, вам нужно обратиться в консульство для получения нового паспорта/временного удостоверения 
                личности или другого документа, удостоверяющего личность. По этим документам можно купить билет и сесть в поезд.
              </p>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/reference/trains/documents-for-purchase" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Документы для покупки билетов
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/reference/trains/what-needed-for-boarding" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Что нужно для посадки в поезд
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA кнопка */}
          <div className="flex justify-center pt-4">
            <Button asChild size="lg" className="px-8 py-6 text-lg font-semibold">
              <Link to="/routes/list">
                Перейти к покупке ж/д билетов
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PassportIssues;
