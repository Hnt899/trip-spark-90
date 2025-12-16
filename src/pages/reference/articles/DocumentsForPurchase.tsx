import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const DocumentsForPurchase = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-12 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/reference" className="hover:text-primary">Справочная</Link>
          <span>/</span>
          <Link to="/reference/trains" className="hover:text-primary">Поезда</Link>
          <span>/</span>
          <span>Документы для покупки билетов</span>
        </div>
        <h1 className="text-4xl font-bold mb-8">Документы для покупки билетов</h1>

        <div className="space-y-8">
          {/* Основные инструкции */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Как заполнять данные при оформлении билета</h2>
              <div className="space-y-4 text-base leading-relaxed">
                <p>
                  <strong>Римские цифры</strong> (например, XII, II, V, X) вводятся заглавными латинскими буквами. 
                  Символы "№" и "/" не используются.
                </p>
                <p>
                  Если билет оформляется по <strong>российскому загранпаспорту</strong> или <strong>иностранному документу</strong>, 
                  полное имя (ФИО) заполняется латинскими буквами:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Если ФИО в документе уже на латинице, вводите его точно так же, как указано в документе.</li>
                  <li>Если ФИО в документе на кириллице или национальном алфавите, его необходимо транслитерировать в латиницу 
                      согласно правилам, указанным ниже.</li>
                  <li>Если в документе есть отчество (патроним), его необходимо заполнить.</li>
                  <li>При поездке по России или странам СНГ с загранпаспортом отчество указывается, если оно есть в российском паспорте, 
                      с использованием транслитерации.</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Правила транслитерации - особенности */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Особенности транслитерации</h2>
              <div className="space-y-3 text-base">
                <p>
                  <strong>Символ "Ц" (Це)</strong> транслитерируется как <strong>"TS"</strong>.
                </p>
                <p>
                  <strong>Символы "Ь", "'", "`"</strong> (мягкий знак, апостроф) <strong>не транслитерируются</strong> и 
                  <strong> не указываются</strong> при оформлении билета.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Таблица транслитерации кириллицы */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Правила транслитерации кириллицы</h2>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 font-semibold bg-muted p-2 rounded">
                      <div>Кириллица</div>
                      <div>Латиница</div>
                    </div>
                    {[
                      ["А", "A"], ["Б", "B"], ["В", "V"], ["Г", "G"],
                      ["Д", "D"], ["Е", "E"], ["Ё", "E"], ["Ж", "ZH"],
                      ["З", "Z"], ["И", "I"], ["Й", "I"], ["К", "K"],
                      ["Л", "L"], ["М", "M"], ["Н", "N"], ["О", "O"],
                    ].map(([cyr, lat]) => (
                      <div key={cyr} className="grid grid-cols-2 gap-2 border-b pb-1">
                        <div className="font-medium">{cyr}</div>
                        <div>{lat}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 font-semibold bg-muted p-2 rounded">
                      <div>Кириллица</div>
                      <div>Латиница</div>
                    </div>
                    {[
                      ["П", "P"], ["Р", "R"], ["С", "S"], ["Т", "T"],
                      ["У", "U"], ["Ф", "F"], ["Х", "KH"], ["Ц", "TS"],
                      ["Ч", "CH"], ["Ш", "SH"], ["Щ", "SHCH"], ["Ъ", "IE"],
                      ["Ы", "Y"], ["Ь", ""], ["Э", "E"], ["Ю", "IU"],
                    ].map(([cyr, lat]) => (
                      <div key={cyr} className="grid grid-cols-2 gap-2 border-b pb-1">
                        <div className="font-medium">{cyr}</div>
                        <div>{lat || "(не указывается)"}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 font-semibold bg-muted p-2 rounded">
                      <div>Кириллица</div>
                      <div>Латиница</div>
                    </div>
                    {[
                      ["Я", "IA"], ["Ң", "N"], ["Ө", "O"], ["Ў", "U"],
                      ["Ґ", "G"], ["Є", "IE"], ["Ї", "I"], ["Љ", "LJ"],
                      ["Њ", "NJ"], ["Ә", "A"], ["Ұ", "U"],
                    ].map(([cyr, lat]) => (
                      <div key={cyr} className="grid grid-cols-2 gap-2 border-b pb-1">
                        <div className="font-medium">{cyr}</div>
                        <div>{lat}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 font-semibold bg-muted p-2 rounded">
                      <div>Национальный</div>
                      <div>Латиница</div>
                    </div>
                    {[
                      ["À", "A"], ["Á", "A"], ["Â", "A"], ["Ã", "A"],
                      ["Ä", "A"], ["Å", "A"], ["Ā", "A"], ["Ă", "A"],
                      ["Ą", "A"], ["Æ", "AE"], ["Ç", "C"], ["Ć", "C"],
                      ["Ĉ", "C"], ["Ċ", "C"], ["Č", "C"], ["Ď", "D"],
                    ].map(([nat, lat]) => (
                      <div key={nat} className="grid grid-cols-2 gap-2 border-b pb-1">
                        <div className="font-medium">{nat}</div>
                        <div>{lat}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Дополнительные правила национального алфавита */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Правила транслитерации национального алфавита</h2>
              <div className="overflow-x-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 font-semibold bg-muted p-2 rounded">
                      <div>Знак</div>
                      <div>Латиница</div>
                    </div>
                    {[
                      ["Đ", "D"], ["Ě", "E"], ["Ė", "E"], ["Ę", "E"],
                      ["È", "E"], ["É", "E"], ["Ê", "E"], ["Ë", "E"],
                      ["Ì", "I"], ["Í", "I"], ["Î", "I"], ["Ï", "I"],
                      ["Ĝ", "G"], ["Ğ", "G"], ["Ġ", "G"], ["Ģ", "G"],
                    ].map(([sign, lat]) => (
                      <div key={sign} className="grid grid-cols-2 gap-2 border-b pb-1">
                        <div className="font-medium">{sign}</div>
                        <div>{lat}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 font-semibold bg-muted p-2 rounded">
                      <div>Знак</div>
                      <div>Латиница</div>
                    </div>
                    {[
                      ["Ħ", "H"], ["Ĥ", "H"], ["Ĩ", "I"], ["Ī", "I"],
                      ["Ĭ", "I"], ["Į", "I"], ["Ľ", "L"], ["Ł", "L"],
                      ["Ń", "N"], ["Ñ", "N"], ["Ņ", "N"], ["Ň", "N"],
                      ["Ō", "O"], ["Õ", "O"], ["Ő", "O"], ["Ò", "O"],
                    ].map(([sign, lat]) => (
                      <div key={sign} className="grid grid-cols-2 gap-2 border-b pb-1">
                        <div className="font-medium">{sign}</div>
                        <div>{lat}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 font-semibold bg-muted p-2 rounded">
                      <div>Знак</div>
                      <div>Латиница</div>
                    </div>
                    {[
                      ["Ó", "O"], ["Ô", "O"], ["Ŏ", "O"], ["Ö", "O"],
                      ["Ø", "O"], ["Œ", "OE"], ["Ŕ", "R"], ["Ř", "R"],
                      ["Ś", "S"], ["Ş", "S"], ["Š", "S"], ["ß", "SS"],
                      ["Ţ", "T"], ["Ť", "T"], ["Þ", "TH"], ["Ü", "U"],
                    ].map(([sign, lat]) => (
                      <div key={sign} className="grid grid-cols-2 gap-2 border-b pb-1">
                        <div className="font-medium">{sign}</div>
                        <div>{lat}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2 font-semibold bg-muted p-2 rounded">
                      <div>Знак</div>
                      <div>Латиница</div>
                    </div>
                    {[
                      ["Ů", "U"], ["Ų", "U"], ["Û", "U"], ["Ū", "U"],
                      ["Ŭ", "U"], ["Ỳ", "Y"], ["Ź", "Z"], ["Ż", "Z"],
                      ["Ž", "Z"],
                    ].map(([sign, lat]) => (
                      <div key={sign} className="grid grid-cols-2 gap-2 border-b pb-1">
                        <div className="font-medium">{sign}</div>
                        <div>{lat}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Дополнительная информация */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Полезные ссылки</h2>
              <div className="space-y-4">
                <Link 
                  to="/reference/trains/absent-passport" 
                  className="block text-primary hover:underline text-lg"
                >
                  Что делать при отсутствии, замене или утере паспорта
                </Link>
              </div>
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

export default DocumentsForPurchase;

