import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, User, FileText, Globe, Calendar, Info } from "lucide-react";

const ChangeAfterPayment = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Как исправить ошибки в ж/д билете</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Как исправить ошибки в ж/д билете</h1>

        <div className="space-y-8">
          {/* Ошибки в ФИО и номере документа - одна ошибка */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-primary" />
                Ошибки в ФИО и номере документа
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Если ошибка одна
                  </h3>
                  <div className="space-y-4 text-base leading-relaxed">
                    <p>
                      По правилам ж/д перевозок, если в билете есть <strong>не более одной ошибки</strong> в ФИО и(или) в номере документа 
                      и поезд по России, это не помешает поездке.
                    </p>
                    
                    <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary">
                      <p className="font-semibold mb-2">Одной ошибкой считается:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>перестановка двух рядом стоящих букв или цифр,</li>
                        <li>неверная буква или цифра,</li>
                        <li>одна лишняя либо пропущенная буква или цифра.</li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-green-900">
                          Если билет перевозчика <strong>«ФПК»</strong> или <strong>«ДОСС»</strong> — ошибку можно безвозмездно исправить 
                          в кассе РЖД или у проводника до отправления поезда. Вам выдадут билет с верными данными. Ошибку в билете 
                          перевозчика <strong>«Гранд Сервис Экспресс»</strong> получится исправить только в кассе.
                        </p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-900">
                          Если билет перевозчика <strong>«Тверской экспресс»</strong>, <strong>«ПКС»</strong>, 
                          <strong> «Железные дороги Якутии»</strong> — исправлять ошибку не требуется, можно садиться в поезд.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    Если ошибок несколько
                  </h3>
                  <div className="space-y-4 text-base leading-relaxed">
                    <p>Если:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>в ФИО и(или) номере документа пассажира больше одной ошибки;</li>
                      <li>имя и(или) отчество полностью неверные, а фамилия и номер документа написаны правильно,</li>
                    </ul>
                    <p>
                      билет надо <strong>переоформить</strong>. Это можно сделать в кассе или у проводника перед отправлением заплатив сбор. 
                      Вам потребуется документ, на который вы оформляли билет, и номер заказа.
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-amber-900">
                        Если проводник отказывает исправлять ошибки или поезд отправился, обратитесь к начальнику поезда.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Другие ошибки в ФИО */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Другие ошибки в ФИО и номере документа
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Если перепутаны местами имя и фамилия, перевозчик может допустить к посадке. Но советуем уточнить этот момент в кассе.
                </p>
                <p>
                  Если в билете пропущено отчество, билет возможно платно переоформить.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-900">
                    Если в билете, оформленном на загранпаспорт или иностранный документ, данные введены на кириллице, 
                    билет придётся сдать и купить новый.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Другие типы ошибок */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-primary" />
                Другие типы ошибок
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Ошибка в типе документа</h3>
                  <p className="text-base leading-relaxed">
                    Если неверно указан тип документа, например загранпаспорт вместо общегражданского, но номер верный, можно идти на посадку.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Ошибка в гражданстве</h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-900">
                      Если неверно указано гражданство, билет придётся сдать и купить новый.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Ошибка в поле
                  </h3>
                  <p className="text-base leading-relaxed">
                    Если неверно указан пол, при этом билет в женское или мужское купе, билет лучше сдать и оформить новый. 
                    Если попытаться пройти по такому билету в поезд, то вас может не пустить проводник.
                  </p>
                  <p className="text-base leading-relaxed mt-2">
                    Если купе смешанное, то возможность исправления данных лучше уточнить в кассе.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Ошибка в дате рождения
                  </h3>
                  <div className="space-y-3 text-base leading-relaxed">
                    <p>
                      Если ошибка в дате рождения не влияет на тариф билета, советуем обратиться в кассу и уточнить возможность исправления данных.
                    </p>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-900">
                        Если ошибочно оформлен спецтариф — школьный, Junior, Senior и др., билет нужно сдать и купить новый. 
                        Пример: взрослому куплен детский билет.
                      </p>
                    </div>
                    <p>
                      Если ошибка в билете ребёнку до 5 лет без места, билет переоформляется в кассе.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Билет оформлен на старую фамилию */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <User className="w-6 h-6 text-primary" />
                Билет оформлен на старую фамилию
              </h2>
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  Если вы оформили документы на старую фамилию, а затем сменили её из-за брака или развода, то ничего дополнительно 
                  оформлять не надо. При посадке на поезд вам потребуются документы:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>новый паспорт, в котором указаны данные старого паспорта;</li>
                  <li>свидетельство о браке или расторжении брака.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Ошибки при путешествии за границу */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-6 h-6 text-primary" />
                Ошибки при путешествии за границу
              </h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  Если поезд едет в Беларусь, Казахстан, Кыргызстан, Молдову, Таджикистан или Узбекистан, обратитесь в кассу и уточните, 
                  можно ли исправить данные пассажира в билете. Понадобятся паспорт и билет. Если касса находится за рубежом, билет должен 
                  быть на бланке — его нужно получить заранее в России.
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-900">
                    Если поезд в другие страны, билет с ошибкой придётся сдать и купить новый.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Полезные ссылки */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/reference/trains/how-to-return-ticket" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <Info className="w-4 h-4" />
                    Как вернуть билет на поезд
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/reference/trains/documents-for-purchase" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Документы для покупки билетов
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

export default ChangeAfterPayment;

