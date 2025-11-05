import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, AlertCircle, CheckCircle, FileText, Globe, Info } from "lucide-react";

const Meditsinskayastrahovka = () => {
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
          <Link to="/guide" className="hover:text-primary">Разборы</Link>
          <span>/</span>
          <span>Медицинская страховка</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Медицинская страховка в путешествии</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card>
            <CardContent className="p-6">
              <p className="text-base leading-relaxed mb-4">
                Медицинская страховка для путешествий — это защита от непредвиденных расходов на лечение за границей. В некоторых странах она обязательна, в других — настоятельно рекомендуется.
              </p>
              <p className="text-base leading-relaxed">
                Правильно подобранная страховка может сэкономить вам десятки тысяч долларов и обеспечить доступ к качественной медицинской помощи в любой точке мира.
              </p>
            </CardContent>
          </Card>

          {/* Зачем нужна */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Зачем нужна медицинская страховка?</h2>
              </div>

              <div className="space-y-4">
                <p className="text-base leading-relaxed mb-4">
                  Медицинские услуги за границей могут стоить очень дорого. Даже простая медицинская помощь может обойтись в тысячи долларов, а серьёзное лечение или операция — в десятки или сотни тысяч.
                </p>
                
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                  <p className="text-sm font-semibold mb-2">Примеры стоимости лечения за границей:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                    <li>Приём врача: $200-500</li>
                    <li>Аппендицит: $15,000-30,000</li>
                    <li>Перелом ноги: $10,000-20,000</li>
                    <li>Стоматологическая помощь: $500-5000</li>
                    <li>Медицинская эвакуация: $50,000-150,000</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Медицинская страховка покрывает эти расходы, а также организует и оплачивает необходимую помощь, включая переводы на вашем языке и связь с родственниками.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Типы страховок */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Типы медицинских страховок</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Базовая страховка (Шенген)</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Минимальная страховка, необходимая для получения визы в страны Шенгенской зоны. Обычно покрывает экстренную медицинскую помощь на сумму от 30,000 евро.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed">
                      <strong>Когда подходит:</strong> Для краткосрочных поездок в страны Шенгена, когда требуется минимальное покрытие для визы.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Расширенная страховка</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Более полное покрытие, которое включает не только экстренную помощь, но и другие услуги: стоматологию, репатриацию, отмену поездки, потерю багажа.
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed">
                      <strong>Когда подходит:</strong> Для длительных поездок, путешествий в экзотические страны, активного отдыха или когда нужна дополнительная защита.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Спортивная страховка</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Специальная страховка для занятий экстремальными видами спорта: дайвинг, альпинизм, горные лыжи, парашютный спорт и другие.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm leading-relaxed">
                      <strong>Важно:</strong> Обычная страховка не покрывает травмы, полученные при занятиях экстремальными видами спорта. Для этого нужна специальная спортивная страховка.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Что покрывает */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Что обычно покрывает медицинская страховка</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Экстренная медицинская помощь</p>
                    <p className="text-sm text-muted-foreground">
                      Лечение внезапных заболеваний и травм, включая операции
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Скорая помощь и госпитализация</p>
                    <p className="text-sm text-muted-foreground">
                      Вызов скорой помощи, госпитализация и лечение в стационаре
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Медикаменты</p>
                    <p className="text-sm text-muted-foreground">
                      Лекарства, необходимые для лечения застрахованного случая
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Стоматологическая помощь</p>
                    <p className="text-sm text-muted-foreground">
                      Экстренное лечение зубов (обычно только в расширенных страховках)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Медицинская эвакуация</p>
                    <p className="text-sm text-muted-foreground">
                      Транспортировка в больницу или возврат на родину при необходимости
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Репатриация</p>
                    <p className="text-sm text-muted-foreground">
                      Возврат на родину в случае смерти или тяжёлой болезни
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Что НЕ покрывает */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Что обычно НЕ покрывает страховка</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Хронические заболевания</p>
                    <p className="text-sm text-muted-foreground">
                      Обострения заболеваний, которые были до начала поездки (если не заявлено отдельно)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Экстремальные виды спорта</p>
                    <p className="text-sm text-muted-foreground">
                      Травмы при занятиях экстремальным спортом без специальной страховки
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Алкогольное и наркотическое опьянение</p>
                    <p className="text-sm text-muted-foreground">
                      Травмы и лечение в состоянии опьянения
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Военные действия и терроризм</p>
                    <p className="text-sm text-muted-foreground">
                      Обычно не покрывается стандартной страховкой
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Косметические процедуры</p>
                    <p className="text-sm text-muted-foreground">
                      Пластические операции и косметическое лечение
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Беременность и роды</p>
                    <p className="text-sm text-muted-foreground">
                      Обычно не покрывается, кроме осложнений (в некоторых страховках)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-4">
                <p className="text-sm leading-relaxed">
                  <strong>Совет:</strong> Внимательно читайте условия страховки перед покупкой. Если у вас есть хронические заболевания или вы планируете заниматься экстремальным спортом, обязательно уточните, покрывает ли это ваша страховка.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Как выбрать */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как выбрать страховку</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Сумма покрытия</h3>
                  <p className="text-base leading-relaxed">
                    Минимум для стран Шенгена — 30,000 евро. Для США и других дорогих стран рекомендуется минимум $100,000-200,000. Чем выше сумма, тем надёжнее защита.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">География действия</h3>
                  <p className="text-base leading-relaxed">
                    Убедитесь, что страховка действует во всех странах вашего маршрута. Некоторые страховки не покрывают определённые регионы.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Срок действия</h3>
                  <p className="text-base leading-relaxed">
                    Страховка должна покрывать весь период вашей поездки, включая день вылета и возвращения.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Возраст застрахованных</h3>
                  <p className="text-base leading-relaxed">
                    Для людей старше 65-70 лет стоимость страховки значительно выше. Уточните условия для вашего возраста.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Сервисная компания</h3>
                  <p className="text-base leading-relaxed">
                    Выбирайте страховки с надёжными сервисными компаниями, имеющими круглосуточную поддержку на русском языке и хорошую репутацию.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Как использовать */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как использовать страховку в случае необходимости</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2">План действий:</p>
                  <ol className="list-decimal list-inside space-y-2 text-sm ml-4">
                    <li>Немедленно позвоните в сервисную компанию по телефону, указанному в полисе</li>
                    <li>Сообщите о ситуации и следуйте инструкциям оператора</li>
                    <li>Сохраните все документы и чеки из медицинского учреждения</li>
                    <li>Не оплачивайте услуги самостоятельно, если это возможно — сервисная компания может организовать прямой расчёт</li>
                    <li>Если пришлось оплатить самим, сохраните все документы для компенсации</li>
                  </ol>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Важно:</strong> Всегда держите при себе номер полиса и контактный телефон сервисной компании. Также сделайте фото или скан полиса и сохраните в телефоне.
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

export default Meditsinskayastrahovka;
