import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Info } from "lucide-react";

const TicketOnForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Как читать билет</span>
        </div>
        <h1 className="text-4xl font-bold mb-6">Как читать билет</h1>

        <div className="space-y-8">
          {/* Первая строка */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Первая строка
              </h2>
              <div className="bg-muted/50 p-4 rounded-lg mb-4 font-mono text-sm">
                126 4А 24.06 22.00 17П 000302.6 000185.6 01 ПОЛНЫЙ
              </div>
              <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
                <li><strong>126</strong> — служебный номер поезда;</li>
                <li><strong>4А</strong> — дата и время отправления поезда;</li>
                <li><strong>24.06 22.00</strong> — дата и время отправления;</li>
                <li><strong>17П</strong> — номер вагона и его тип;</li>
                <li><strong>000302.6 000185.6</strong> — стоимость билета и плацкарты;</li>
                <li><strong>01</strong> — количество человек, на которых выписан данный билет;</li>
                <li><strong>ПОЛНЫЙ</strong> — наименование документа («полный» при покупке билета за полную стоимость).</li>
              </ul>
            </CardContent>
          </Card>

          {/* Вторая строка */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Вторая строка
              </h2>
              <div className="bg-muted/50 p-4 rounded-lg mb-4 font-mono text-sm">
                ЧЕРЕПОВ 1-МОСКВА ЯР (2010290-2000002) КЛ.ОБСЛ .3П
              </div>
              <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
                <li><strong>ЧЕРЕПОВ 1-МОСКВА ЯР</strong> — названия станций отправления и назначения, сокращенные до 12 знаков;</li>
                <li><strong>(2010290-2000002)</strong> — семизначные коды станций отправления и назначения;</li>
                <li><strong>КЛ.ОБСЛ .3П</strong> — обозначение класса обслуживания (для фирменных поездов — «ФИРМ»).</li>
              </ul>
            </CardContent>
          </Card>

          {/* Третья строка */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Третья строка
              </h2>
              <div className="bg-muted/50 p-4 rounded-lg mb-4 font-mono text-sm">
                МЕСТА 030 СЕВ СЕВ РАОП
              </div>
              <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
                <li><strong>МЕСТА 030</strong> — номера мест;</li>
                <li><strong>СЕВ</strong> — защитный символ;</li>
                <li><strong>СЕВ РАОП</strong> — сокращенное название дороги, в вагон которой оформлен билет.</li>
              </ul>
            </CardContent>
          </Card>

          {/* Четвертая строка */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Четвертая строка
              </h2>
              <div className="bg-muted/50 p-4 rounded-lg mb-4 font-mono text-xs">
                ЯГ 763553 424 71 0144113 240607 0837 0021Я 05/ФПА/Н
              </div>
              <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
                <li><strong>ЯГ 763553</strong> — серия и номер бланка билета;</li>
                <li><strong>424</strong> — защитный код для выявления поддельных проездных документов;</li>
                <li><strong>71 0144113</strong> — шифр документа и его номер в запросе на продажу;</li>
                <li><strong>240607</strong> — дата оформления билета (в формате ддммгг);</li>
                <li><strong>0837</strong> — время оформления билета (в формате ччмм);</li>
                <li><strong>0021Я 05/ФПА/Н</strong> — код вычислительного центра, оформившего билет; код вычислительного центра, выдавшего места; номер пункта продажи; номер билетно-кассового терминала; информация о стоимости проезда; символ «Н», если стоимость проезда считается в национальной валюте.</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">
                Для всех запросов в систему «Экспресс» нумерация сквозная — она ежесуточно обнуляется в 00:00.
              </p>
            </CardContent>
          </Card>

          {/* Пятая строка */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Пятая строка
              </h2>
              <div className="bg-muted/50 p-4 rounded-lg mb-4 font-mono text-sm">
                ПН 1902=======/ТИТОВ=ЮВ
              </div>
              <p className="text-base leading-relaxed">
                <strong>ПН 1902=======/ТИТОВ=ЮВ</strong> — паспортные данные пассажиров (вид документа, его серия и номер, фамилия, инициалы).
              </p>
            </CardContent>
          </Card>

          {/* Шестая и седьмая строки */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Шестая и седьмая строки
              </h2>
              <div className="bg-muted/50 p-4 rounded-lg mb-4 font-mono text-xs">
                Н-553.2 РУБ В Т.Ч. СТР. 2.3; ТАРИФ РФ+КСБ 500.5 В Т.Ч. НДС 76.35 РУБ<br />
                СЕРВИС 50.4 В Т.Ч. НДС 7.69 РУБ С БЕЛЬЕМ У0
              </div>
              <ul className="list-disc list-inside space-y-2 text-base leading-relaxed">
                <li><strong>Н-553.2 РУБ</strong> — полная стоимость билета с указанием валюты (десятые доли отделены точкой);</li>
                <li><strong>ТАРИФ</strong> — тарифная стоимость проезда (стоимость билета и плацкарты);</li>
                <li><strong>+КСБ</strong> — величина комиссионного сбора;</li>
                <li><strong>+СТРСБ</strong> — величина страхового сбора;</li>
                <li><strong>+УСЛ</strong> — стоимость сервисных услуг;</li>
                <li><strong>В Т. Ч. СТР. 2.3 РУБ+НСП</strong> — если взимается налог с продаж;</li>
                <li><strong>Символ «У»</strong> — при оформлении билета в вагон с дополнительными услугами;</li>
                <li><strong>У0</strong> — количество наборов питания, положенных пассажиру по билету. Если стоит обозначение У0, питание в вагоне не предоставляется.</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">
                Cтоимость проезда может указываться в швейцарских франках или национальной валюте.
              </p>
            </CardContent>
          </Card>

          {/* Восьмая строка */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" />
                Восьмая строка
              </h2>
              <div className="bg-muted/50 p-4 rounded-lg mb-4 font-mono text-sm">
                ПРИБЫТИЕ ПОЕЗДОМ 125 *4 29.06 В 09.27
              </div>
              <p className="text-base leading-relaxed">
                <strong>ПРИБЫТИЕ ПОЕЗДОМ 125 *4 29.06 В 09.27</strong> — время прибытия пассажира в пункт назначения.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-blue-900 text-sm">
                  <Info className="w-4 h-4 inline mr-2" />
                  Для станций, находящихся в России, Киргизии и на Петропавловском отделении Южно-Уральской железной дороги, указано московское время. 
                  Для стран СНГ и Балтии указывается местное время.
                </p>
                <p className="text-blue-900 text-sm mt-2">
                  Если поезд отправляется по старому графику, а приходит уже по новому, время прибытия не указывается.
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                На билетах, оформляемых через билетно-кассовые терминалы, подключенные к АСУ «Экспресс-3», в правом нижнем углу печатается штриховой код.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TicketOnForm;
