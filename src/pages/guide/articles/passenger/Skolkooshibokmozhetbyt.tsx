import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, CheckCircle, XCircle, Train, FileText, CreditCard } from "lucide-react";

const Skolkooshibokmozhetbyt = () => {
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
          <span>Сколько ошибок может быть в билете?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Сколько ошибок может быть в билете?</h1>

        <div className="space-y-8">
          {/* Основные правила */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Основные правила</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  При указании своих данных во время покупки билета можно ошибиться, но только особым образом и фиксированное число раз (приказ Минтранса России от 05.09.2022 № 352).
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Допустимые ошибки:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-6">
                    <li>Не больше <strong>одной ошибки</strong> в фамилии или в имени, или в отчестве</li>
                    <li>Не больше <strong>одной ошибки</strong> в серии или номере паспорта</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Какие ошибки допустимы */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Какие ошибки можно допустить</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  Допустима только <strong>одна ошибка</strong> одного из следующих типов:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Переставить местами соседние буквы</li>
                  <li>Переставить местами соседние цифры</li>
                  <li>Вставить в слово лишнюю букву</li>
                  <li>Вставить в номер лишнюю цифру</li>
                  <li>Пропустить букву</li>
                  <li>Пропустить цифру</li>
                </ul>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Например, указать отчество «Андреевич» вместо «Алексеевич» — это уже фатальная ошибка, так как это не одна ошибка, а несколько.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Исправление ошибок */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Train className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Исправление ошибок</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-base font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Одна ошибка
                  </p>
                  <p className="text-sm leading-relaxed">
                    Если со своими ошибками вы вписываетесь в эти лимиты, то на поезд дальнего следования вас посадят. Одну ошибку исправляют <strong>бесплатно</strong>.
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-base font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    Несколько ошибок
                  </p>
                  <p className="text-sm leading-relaxed mb-2">
                    Если ошибок несколько, то ошибку исправят уже <strong>платно</strong>:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-6">
                    <li>У проводника — <strong>200 ₽</strong></li>
                    <li>В кассе — <strong>304,7 ₽</strong></li>
                  </ul>
                  <p className="text-sm leading-relaxed mt-2">
                    Если не исправить ошибки, в поезд не посадят.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Какие ошибки могут исправить */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Какие ошибки могут исправить</h2>
              </div>

              <div className="space-y-4">
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>В ФИО и (или) номере документа пассажира</li>
                  <li>Имя и (или) отчество полностью неверные, а фамилия и номер документа написаны правильно</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Другие случаи */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Другие ошибки</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Покупка в кассе</p>
                      <p className="text-sm text-muted-foreground">
                        Если вы покупали билет в кассе и нашли в нём ошибку, то новый вам оформят бесплатно.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Перепутанные имя и фамилия у иностранца</p>
                      <p className="text-sm text-muted-foreground">
                        В теории нужен возврат, но на практике мы не знаем случаев отказа в посадке. Но мы не рекомендуем надеяться на авось, если есть время на возврат и новую покупку.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Смена фамилии</p>
                      <p className="text-sm text-muted-foreground">
                        Если вы оформляли билет на одну фамилию, а на посадку пришли уже с новой, то на поезд вас посадят. Главное, показать документ, подтверждающий факт изменения фамилии.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Новый паспорт</p>
                      <p className="text-sm text-muted-foreground">
                        Можно сесть в поезд по новому паспорту, поскольку в нём указаны сведения о старом.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-base font-semibold mb-1">Перепутанные местами имя и фамилия</p>
                      <p className="text-sm text-muted-foreground">
                        Перевозчик может допустить к посадке. Но лучше уточнить этот момент в кассе.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Когда нужно сдать билет */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Когда придётся сдать билет и купить новый</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  В следующих случаях придётся сдать билет и купить новый:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                  <li>Если вы пропустили указанные в документе данные (например, отчество)</li>
                  <li>Если в билете, оформленном на загранпаспорт или иностранный документ, данные введены на кириллице</li>
                  <li>Если неверно указано гражданство</li>
                  <li>Если неверно указан пол, а билет куплен в мужское либо женское купе</li>
                  <li>Если вы купили билет не по тому возрастному тарифу и это повлияло на стоимость</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Международные поезда */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Международные поезда</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важный момент:</strong> Всё это работает только в поездках по России. Если у вас хотя бы одна ошибка в билете на поезд международного сообщения, то поехать по нему уже не получится. Такой билет нужно сдавать и покупать новый — с правильными данными.
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

export default Skolkooshibokmozhetbyt;
