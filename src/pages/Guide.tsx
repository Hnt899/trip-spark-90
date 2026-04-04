import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { createSlug } from "@/utils/slugify";
import { Search, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Структура данных по разделам
const guideSections = {
  all: {
    id: "all",
    title: "Все",
    description: "Все статьи путеводителя",
    articles: [] as string[], // Будет заполнено динамически
    category: "all"
  },
  passenger: {
    id: "passenger",
    title: "Полезно пассажиру",
    description: "Ответы на частые вопросы пассажиров",
    articles: [
      "Что делать, если я заболел в дороге?",
      "Что делать, если украли документы?",
      "По какому документу брать билет?",
      "Где искать потерянные вещи?",
      "Как работает страховка в билете?",
      "Как получить медицинскую помощь?",
      "Ручная кладь больше нормы?",
      "Какие бывают возвраты билетов?",
      "Как сесть на промежуточной станции?",
      "Где покупать билет на электричку?",
      "Почему возврат денег делают 30 дней?",
      "Где мой возврат?",
      "Что делать, если укусила змея?",
      "Что делать, если укусил клещ?",
      "Что делать, если мой багаж повредили?",
      "Советы параноикам перед поездкой",
      "Какие услуги входят в ж/д билет?",
      "Когда покупать билеты на поезда?",
      "Что делать, если потерял свой билет?",
      "Сколько ошибок может быть в билете?",
      "Билет без электронной регистрации?",
      "Надо ли покупать обратный билет?",
      "Пересадка или стыковка?",
      "Как перевезти букет?",
      "Как перевезти банки с закатками?",
      "Как проверяют билеты на автобус?",
      "Если попал в ДТП в автобусе?",
      "Можно ли провезти 18 литров пива?",
      "Можно ли пить в транспорте?",
      "Что делать, если автобус не приехал?",
      "«Серые» и «белые» перевозчики?",
      "Как кормят в самолёте?",
      "Как покупать eSIM перед поездкой?",
      "Нужно ли прививаться перед поездкой?",
      "Смена фамилии, как купить билет?",
      "Возить ли паспорт РФ за границу?",
      "Как летать с маленьким ребёнком?",
      "Как перевезти животное?",
      "Как работают гостиницы для животных?",
      "Что делать, если опоздали на самолет?",
      "Что делать, если авиарейс задержали?",
      "Путешествовать на инвалидном кресле?",
      "Как путешествуют слепые?",
      "Что надо знать про безопасность?",
      "Зачем открывать шторку иллюминатора?",
      "Где посадка, если пассажиру плохо?",
      "Как поехать в страну без турпакетов?"
    ],
    category: "passenger"
  },
  analysis: {
    id: "analysis",
    title: "Разборы",
    description: "Глубокие разборы тем о путешествиях",
    articles: [
      "Вирус и антибиотики",
      "FAQ про здоровье",
      "Племена Амазонки",
      "Какое море выбрать",
      "Полётов больше, авиапроисшествий — нет",
      "Метеорология и полёты",
      "Медицинская страховка",
      "Авторские туры",
      "Почему мы путешествуем",
      "Как дойти до Северного полюса",
      "Поездки людей с ограничениями по здоровью"
    ],
    category: "analysis"
  },
  transport: {
    id: "transport",
    title: "Транспорт",
    description: "Всё о поездах, самолётах и автобусах",
    articles: [
      "Питание вагона",
      "ЭП2ДМ",
      "Новые плацкарты 1-ВМ",
      "Новые плацкарты Т",
      "Капсульный вагон",
      "Плацкарт-ёлочка",
      "Разные электрички",
      "Как были устроены паровозы",
      "Ретропоезд с паровозом",
      "Ласточки",
      "Штабной вагон",
      "В кабине машиниста",
      "Яхрома ЭР2К-980",
      "Маршрутизация на ЖД",
      "Вагон-электростанция",
      "Локомотивы",
      "Л и П - паровозы прошлого",
      "Аэроэкспресс",
      "MC-21",
      "Собаки в аэропорту",
      "Аэропорт Внуково",
      "Экипаж перед вылетом",
      "Как работает диспетчер",
      "По каким правилам летит самолёт",
      "Про центры управления",
      "Про службы терминала",
      "Медслужба аэропорта",
      "Ty-214",
      "Автоматизация HEL",
      "Зачем обливают самолёт перед вылетом?",
      "Как посадить самолёт?",
      "Ty-144",
      "Навигация самолёта",
      "Ty-154",
      "Ан-2",
      "Boeing 737 NG",
      "Airbus A320",
      "Европейская автобусная компания",
      "Про городской транспорт",
      "Про водителей автобусов",
      "Отечественные микроавтобусы",
      "Ездовые собаки"
    ],
    category: "transport"
  },
  "long-term": {
    id: "long-term",
    title: "Надолго в другую страну",
    description: "Гайды для длительного пребывания за границей",
    articles: [
      "Аргентина",
      "Армения",
      "Бали",
      "Бразилия",
      "Грузия",
      "Германия",
      "Дубай",
      "Египет",
      "Испания",
      "Казахстан",
      "Кыргызстан (Киргизия)",
      "Колумбия",
      "Коста-Рика",
      "Мексика",
      "Португалия",
      "Сербия",
      "Таиланд",
      "Тайвань",
      "Турция",
      "Узбекистан",
      "Франция",
      "Черногория",
      "Шри-Ланка",
      "Южная Корея"
    ],
    category: "long-term"
  },
  "first-time": {
    id: "first-time",
    title: "Первый раз",
    description: "С чего начать новое хобби или активность",
    articles: [
      "Планеры",
      "Гастротуризм в России",
      "Гастротуры",
      "Как взойти на Эверест",
      "На мотоцикле",
      "Как встать на горные лыжи",
      "Как начать бегать",
      "Как пойти пешком в горы",
      "Как впервые встать на сап"
    ],
    category: "first-time"
  },
  "russia-features": {
    id: "russia-features",
    title: "Фишки России",
    description: "Интересные особенности и традиции России",
    articles: [
      "Чебурашка",
      "Ёлка",
      "Квашеная капуста",
      "Дальнобойщики по зимникам",
      "Масленица",
      "Завод кабеля",
      "Интересные места",
      "Космос как конструкция",
      "Где, когда, что распускается",
      "Это что за борщевик",
      "Как читать наличники"
    ],
    category: "russia-features"
  },
  russia: {
    id: "russia",
    title: "Россия",
    description: "Путеводители по городам России",
    articles: [
      "Москва",
      "Санкт-Петербург",
      "Крым",
      "Симферополь",
      "Севастополь",
      "Майкоп",
      "Казань",
      "Екатеринбург",
      "Краснодар",
      "Ростов-на-Дону",
      "Владивосток",
      "Самара",
      "Нижний Новгород",
      "Новосибирск",
      "Красноярск",
      "Иркутск",
      "Калининград",
      "Петропавловск-Камчатский",
      "Якутск",
      "Махачкала",
      "Мурманск",
      "Хабаровск",
      "Рязань",
      "Касимов",
      "Ставрополь",
      "Ярославль",
      "Волгоград",
      "Пермь",
      "Тюмень",
      "Сыктывкар",
      "Воронеж",
      "Владимир",
      "Суздаль",
      "Ижевск",
      "Томск",
      "Тула",
      "Тверь",
      "Абакан",
      "Челябинск",
      "Улан-Удэ",
      "Архангельск",
      "Уфа",
      "Горно-Алтайск"
    ],
    category: "russia"
  }
};

// Популярные статьи для первого экрана
const popularArticles = [
  { title: "Что делать, если я заболел в дороге?", section: "passenger" },
  { title: "По какому документу брать билет?", section: "passenger" },
  { title: "Как работает страховка в билете?", section: "passenger" },
  { title: "Москва", section: "russia" },
  { title: "Санкт-Петербург", section: "russia" }
];

const Guide = () => {
  // Собираем все статьи для раздела "Все"
  const allArticles: string[] = [];
  Object.values(guideSections).forEach(section => {
    if (section.id !== "all") {
      allArticles.push(...section.articles);
    }
  });
  guideSections.all.articles = allArticles;

  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Обработка sticky навигации (только для десктопа)
  useEffect(() => {
    if (isMobile) return; // Не делаем sticky на мобилке
    
    const handleScroll = () => {
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect();
        // Становится sticky когда верх элемента достигает верха экрана
        setIsSticky(rect.top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Проверяем начальное состояние
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Фильтрация статей по поисковому запросу
  const filterArticles = (articles: string[]) => {
    if (!searchQuery.trim()) return articles;
    const query = searchQuery.toLowerCase();
    return articles.filter(article => 
      article.toLowerCase().includes(query)
    );
  };

  // Получить все статьи для поиска
  const getAllArticles = () => {
    const allArticles: Array<{ title: string; section: string; category: string }> = [];
    const seenTitles = new Set<string>();
    
    Object.values(guideSections).forEach(section => {
      section.articles.forEach(article => {
        // Убираем дубликаты по названию, но сохраняем правильную категорию
        if (!seenTitles.has(article)) {
          seenTitles.add(article);
          // Пропускаем раздел "all", так как у него нет правильной категории
          if (section.id !== "all" && section.category && section.category !== "all") {
            allArticles.push({
              title: article,
              section: section.id,
              category: section.category
            });
          }
        }
      });
    });
    return allArticles;
  };

  // Найти категорию статьи по названию
  const findArticleCategory = (title: string): string => {
    // Ищем статью во всех разделах (кроме "all")
    for (const section of Object.values(guideSections)) {
      if (section.id !== "all" && section.category && section.category !== "all") {
        if (section.articles.includes(title)) {
          return section.category;
        }
      }
    }
    // Если не нашли, возвращаем дефолтную категорию
    return "passenger";
  };

  // Поиск по всем статьям
  const searchResults = searchQuery.trim() 
    ? getAllArticles().filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 10) // Ограничиваем до 10 результатов для выпадающего меню
    : [];

  // Обработка изменений поиска
  useEffect(() => {
    if (searchQuery.trim().length > 0 && searchResults.length > 0) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchQuery, searchResults.length]);

  // Закрытие выпадающего меню при клике вне области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    if (showSearchResults) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSearchResults]);


  // Получить URL для статьи
  const getArticleUrl = (title: string, category?: string) => {
    // Всегда находим правильную категорию через поиск в разделах
    // Это гарантирует, что мы получим правильный URL независимо от переданной категории
    const foundCategory = findArticleCategory(title);
    
    // Используем найденную категорию (она всегда будет правильной)
    return `/guide/${foundCategory}/${createSlug(title)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container pt-20 md:pt-32 pb-12 max-w-6xl">

        {/* Десктопная версия - закреплённая навигация с табами */}
        {!isMobile && (
          <div 
            ref={tabsRef}
            className={cn(
              "mb-6 transition-all fixed left-0 right-0 z-50",
              isSticky ? 'bg-background/95 backdrop-blur-sm py-3 border-b shadow-sm' : 'bg-transparent py-0',
              'top-[105px]'
            )}
          >
            {/* Внешний скролл на всю ширину окна; фиолетовый блок w-max — не режет подписи */}
            <div className="w-full overflow-x-auto overflow-y-visible overscroll-x-contain px-3 sm:px-4 md:px-6 lg:px-10 pb-1 scroll-smooth [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-muted-foreground/25">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="mx-auto block w-max max-w-none"
              >
                <TabsList
                  ref={tabsListRef}
                  className={cn(
                    "inline-flex h-auto flex-nowrap items-center justify-center rounded-2xl p-2.5 md:p-3.5 gap-2 md:gap-2.5 lg:gap-3 backdrop-blur-md",
                    "bg-transparent guide-tabs-rail w-max shrink-0 overflow-visible ring-1 ring-white/15 text-white"
                  )}
                >
                {Object.values(guideSections).map((section) => (
                  <TabsTrigger 
                    key={section.id} 
                    value={section.id}
                    className={cn(
                      "rounded-full font-semibold hover:opacity-100 transition-colors whitespace-nowrap shrink-0 overflow-visible",
                      "px-3.5 py-2.5 text-sm md:px-4 md:py-3 md:text-base lg:px-5 lg:py-3.5 lg:text-lg"
                    )}
                    style={{
                      backgroundColor: activeTab === section.id ? '#897CFF' : 'transparent',
                      color: activeTab === section.id ? '#F9C850' : 'white',
                    }}
                  >
                    {section.title}
                  </TabsTrigger>
                ))}
                </TabsList>
              </Tabs>
            </div>
          </div>
        )}

        {/* Заголовок */}
        <div className="mb-8 mt-8 md:mt-24">
          <h1 className="heading-gradient text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Путеводитель TudaSuda
          </h1>
        </div>

        {/* Поиск */}
        <div className="mb-6 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Поиск по путеводителю..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim().length > 0) {
                  setShowSearchResults(true);
                  // Автоматически переключаем на раздел "Все" при начале поиска
                  if (activeTab !== "all") {
                    setActiveTab("all");
                  }
                } else {
                  setShowSearchResults(false);
                }
              }}
              onFocus={() => {
                if (searchQuery.trim() && searchResults.length > 0) {
                  setShowSearchResults(true);
                }
              }}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 z-10"
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchResults(false);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          {/* Выпадающее меню с результатами поиска */}
          {showSearchResults && searchResults.length > 0 && (
            <div 
              ref={searchResultsRef}
              className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-[1000] max-h-[400px] overflow-y-auto"
            >
              <div className="p-4">
                <div className="text-sm text-muted-foreground mb-3">
                  Найдено: {searchResults.length}
                </div>
                <div className="space-y-2">
                  {searchResults.map((result, idx) => (
                    <Link
                      key={idx}
                      to={getArticleUrl(result.title, result.category)}
                      onClick={() => {
                        setSearchQuery("");
                        setShowSearchResults(false);
                      }}
                      className="block px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors text-sm"
                    >
                      {result.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Описание */}
        <div className="mb-8">
          
        </div>

        {/* Популярные статьи */}
        <section className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">Популярные темы</h2>
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
            {popularArticles.map((article, idx) => {
              const section = guideSections[article.section as keyof typeof guideSections];
              return (
                  <Link
                  key={idx}
                  to={getArticleUrl(article.title, section.category)}
                  className="px-3 md:px-4 py-2 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors font-medium text-sm md:text-base"
                >
                  {article.title}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Контент по разделам */}
        <div>
          {Object.values(guideSections).map((section) => {
            const filteredArticles = filterArticles(section.articles);
            const isActive = activeTab === section.id;

            if (!isActive) return null;

            return (
              <Card key={section.id} className="mb-6">
                <CardContent className="p-6">
                  {/* Мобильная версия - выпадающее меню над описанием */}
                  {isMobile && (
                    <div className="mb-4">
                      <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between px-4 py-3 h-auto text-base font-medium"
                            style={{
                              backgroundColor: 'rgba(32, 8, 255, 0.4)',
                              borderColor: 'rgba(32, 8, 255, 0.3)',
                              color: 'white'
                            }}
                          >
                            <span>{guideSections[activeTab as keyof typeof guideSections]?.title || "Все"}</span>
                            <ChevronDown 
                              className={cn(
                                "h-5 w-5 text-primary transition-transform",
                                mobileMenuOpen && "rotate-180"
                              )}
                              style={{ color: '#897CFF' }}
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[calc(100vw-2rem)] max-w-none">
                          {Object.values(guideSections).map((sectionItem) => (
                            <DropdownMenuItem
                              key={sectionItem.id}
                              onClick={() => {
                                setActiveTab(sectionItem.id);
                                setMobileMenuOpen(false);
                              }}
                              className={cn(
                                "px-4 py-3 text-base cursor-pointer",
                                activeTab === sectionItem.id && "bg-primary/10 font-medium"
                              )}
                            >
                              {sectionItem.title}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}

                  <div className="mb-4">
                    <h2 className="text-2xl font-bold mb-2 hidden md:block">{section.title}</h2>
                    <p className="text-muted-foreground text-center md:text-left">{section.description}</p>
                  </div>

                  {/* Accordion для статей - всегда раскрыт для активной вкладки */}
                  <Accordion 
                    type="single" 
                    collapsible 
                    value={section.id}
                  >
                    <AccordionItem value={section.id} className="border-none">
                      <AccordionTrigger className="hover:no-underline py-2">
                        <span className="text-sm text-muted-foreground">
                          {filteredArticles.length} {filteredArticles.length === 1 ? 'статья' : filteredArticles.length < 5 ? 'статьи' : 'статей'}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap gap-2 md:gap-3 pt-4">
                          {filteredArticles.map((article, idx) => (
                            <Link
                              key={idx}
                              to={getArticleUrl(article, section.category)}
                              className="px-3 md:px-4 py-2 bg-purple-100 text-purple-900 rounded-lg hover:bg-purple-200 transition-colors text-sm md:text-base"
                            >
                              {article}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Guide;
