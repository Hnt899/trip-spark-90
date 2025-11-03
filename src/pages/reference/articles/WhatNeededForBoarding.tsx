import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, FileText, User, AlertCircle, Info } from "lucide-react";

const WhatNeededForBoarding = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Что нужно для посадки в поезд</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что нужно для посадки в поезд</h1>

        <div className="space-y-8">
          {/* Введение */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-lg leading-relaxed mb-4">
                Список документов для посадки в поезд различается в зависимости от статуса электронной регистрации. 
                Зарегистрироваться на рейс можно сразу во время покупки билетов на сайте или позже в личном кабинете, 
                если до отправления поезда с начальной станции осталось не меньше часа.
              </p>
              <Link 
                to="/reference/trains/electronic-registration" 
                className="text-primary hover:underline font-medium"
              >
                Подробнее об электронной регистрации
              </Link>
            </CardContent>
          </Card>

          {/* Если не прошли электронную регистрацию */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Если вы не прошли электронную регистрацию
              </h2>
              
              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-primary space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                    1
                  </div>
                  <p>
                    <strong>Билет на бланке</strong> (можно распечатать в терминале регистрации на вокзале или получить в кассе, 
                    назвав 14-значный код заказа);
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                    2
                  </div>
                  <p>
                    <strong>Оригинал удостоверяющего личность документа</strong>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Если прошли электронную регистрацию */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-primary" />
                Если вы прошли электронную регистрацию
              </h2>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700 text-sm">
                    1
                  </div>
                  <p className="text-green-900">
                    Распечатка, фото или демонстрация на экране мобильного телефона <strong>посадочного купона</strong>.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700 text-sm">
                    2
                  </div>
                  <p className="text-green-900">
                    <strong>Оригинал удостоверения личности</strong>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Документы для оформления билета */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-primary" />
                Документы для оформления билета
              </h2>
              
              <p className="text-base leading-relaxed mb-4">
                В обоих случаях вам понадобится удостоверение личности, данные которого вы указали при оформлении билетов. 
                Чтобы купить билет на сайте, можно использовать следующие документы:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <ul className="list-disc list-inside space-y-2 text-base ml-4">
                  <li>внутренний паспорт гражданина РФ;</li>
                  <li>заграничный паспорт для поездок заграницу, в том числе для детей до 14 лет;</li>
                  <li>свидетельство о рождении или его нотариально заверенная копия — для детей до 14 лет для поездок по России;</li>
                  <li>паспорт иностранного гражданина;</li>
                  <li>временное удостоверение личности;</li>
                  <li>удостоверение моряка;</li>
                  <li>военный билет военнослужащих и курсантов;</li>
                </ul>
                <ul className="list-disc list-inside space-y-2 text-base ml-4">
                  <li>удостоверение военнослужащего;</li>
                  <li>справка об освобождении из мест лишения свободы;</li>
                  <li>удостоверение личности лица без гражданства;</li>
                  <li>временное удостоверение личности;</li>
                  <li>свидетельство о предоставлении временного убежища;</li>
                  <li>удостоверение беженца;</li>
                  <li>справка об утере паспорта.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Особые случаи */}
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="w-6 h-6 text-primary" />
                Особые случаи
              </h2>
              
              <div className="space-y-4 text-base leading-relaxed">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-blue-900">Ребёнку исполнилось 14 лет</h3>
                  <p className="text-blue-900">
                    Если ребёнку исполнилось 14 лет и он ещё не успел получить паспорт, для посадки в поезд в течение 
                    <strong> 90 дней после дня рождения</strong> можно использовать свидетельство о рождении или его копию. 
                    Если в билете указаны данные свидетельства, но на руках есть готовый паспорт, билет нужно переоформить.
                  </p>
                  <Link 
                    to="/reference/trains/change-after-payment" 
                    className="text-blue-700 hover:underline font-medium mt-2 inline-block"
                  >
                    Подробнее о переоформлении билетов
                  </Link>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h3 className="font-semibold mb-2 text-amber-900 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Ошибки в билете
                  </h3>
                  <p className="text-amber-900">
                    Если в билете есть ошибки, их нужно исправить в кассе и у проводника или начальника поезда.
                  </p>
                  <Link 
                    to="/reference/trains/change-after-payment" 
                    className="text-amber-700 hover:underline font-medium mt-2 inline-block"
                  >
                    Как исправить ошибки в ж/д билете
                  </Link>
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
                    to="/reference/trains/electronic-registration" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Электронная регистрация
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/reference/trains/how-to-get-ticket" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Как получить ж/д билет
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/reference/trains/printed-ticket" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Как получить билет в печатном виде
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/reference/trains/change-after-payment" 
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Как исправить ошибки в ж/д билете
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA кнопка */}
          <div className="flex justify-center pt-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold">
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

export default WhatNeededForBoarding;

