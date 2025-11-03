import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, AlertCircle, Globe, Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";

const ChtodelatEsliukrali = () => {
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
          <span>Что делать, если украли документы?</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Что делать, если украли документы?</h1>

        <div className="space-y-8">
          {/* Немедленные действия */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold">Немедленные действия</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-base font-semibold mb-2 text-red-900">
                    Если вы обнаружили, что документы украдены, действуйте немедленно:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-base leading-relaxed ml-2">
                    <li>Немедленно обратитесь в местную полицию и напишите заявление о краже документов</li>
                    <li>Получите справку из полиции о факте кражи — она понадобится для восстановления документов</li>
                    <li>Свяжитесь с консульством или посольством своей страны, если вы за границей</li>
                    <li>Сообщите о краже банкам, если вместе с документами пропали банковские карты</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* В России */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Если вы находитесь в России</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Восстановление паспорта РФ</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Для восстановления паспорта РФ вам нужно:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Обратиться в отделение МВД по месту пребывания или жительства</li>
                    <li>Предоставить справку из полиции о краже документов</li>
                    <li>Предоставить фотографии установленного образца</li>
                    <li>Заплатить госпошлину за выдачу паспорта</li>
                    <li>Предоставить документы, подтверждающие гражданство (если возможно)</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Сроки восстановления:</strong> Обычно восстановление паспорта занимает 10–30 дней, в зависимости от места подачи заявления.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* За границей */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Если вы находитесь за границей</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Обращение в консульство</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Немедленно обратитесь в консульство или посольство России в стране вашего пребывания:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Свяжитесь с консульством по телефону горячей линии</li>
                    <li>Сообщите о краже документов и вашем местоположении</li>
                    <li>Получите временный документ для возвращения в Россию</li>
                    <li>При необходимости получите консульский паспорт</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Важно:
                  </p>
                  <p className="text-sm leading-relaxed">
                    Без документов вы не сможете пересечь границу, поэтому обязательно получите временный документ в консульстве перед выездом из страны.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Возвращение домой */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Как вернуться домой</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Билеты на транспорт</h3>
                  <p className="text-base leading-relaxed mb-3">
                    Если у вас нет документов, свяжитесь с перевозчиком:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-base leading-relaxed ml-4">
                    <li>Предоставьте справку из полиции о краже документов</li>
                    <li>Предоставьте временный документ из консульства</li>
                    <li>Перевозчик может разрешить посадку при наличии этих документов</li>
                    <li>В некоторых случаях может потребоваться дополнительное подтверждение личности</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    <strong>Совет:</strong> Сохраняйте все документы, подтверждающие кражу и вашу личность — они могут понадобиться при посадке на транспорт и прохождении пограничного контроля.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Полезные советы */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные советы</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Делайте копии документов</p>
                    <p className="text-sm text-muted-foreground">
                      Перед поездкой сделайте копии всех важных документов и храните их отдельно от оригиналов, а также сохраните скан-копии в облачном хранилище.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Сохраните контакты консульств</p>
                    <p className="text-sm text-muted-foreground">
                      Перед поездкой за границу сохраните контакты консульства России в стране назначения на телефон.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold mb-1">Действуйте быстро</p>
                    <p className="text-sm text-muted-foreground">
                      Чем быстрее вы сообщите о краже в полицию и консульство, тем быстрее сможете восстановить документы и вернуться домой.
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

export default ChtodelatEsliukrali;
