import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InfoCard from "@/components/blog/InfoCard";
import WideHighlightCard from "@/components/blog/WideHighlightCard";
import EventTile from "@/components/blog/EventTile";
import StoriesCarousel from "@/components/blog/StoriesCarousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  infoCards,
  siteNews,
  rzdNews,
  events,
  stories,
  tips,
} from "@/data/blogData";

const Blog = () => {
  // Состояния для слайдеров
  const [siteNewsIndex, setSiteNewsIndex] = useState(1); // Начинаем с 1, так как 0 - это клон последнего
  const [rzdNewsIndex, setRzdNewsIndex] = useState(1); // Начинаем с 1, так как 0 - это клон последнего
  const [tipsIndex, setTipsIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const rzdSliderRef = useRef<HTMLDivElement>(null);

  // Создаем массив с клонами для бесконечного цикла: [последний, ...оригиналы, первый]
  const infiniteSiteNews = [
    siteNews[siteNews.length - 1], // Клон последнего в начале
    ...siteNews,
    siteNews[0], // Клон первого в конце
  ];

  const infiniteRzdNews = [
    rzdNews[rzdNews.length - 1], // Клон последнего в начале
    ...rzdNews,
    rzdNews[0], // Клон первого в конце
  ];

  // Обработка перехода после завершения анимации для новостей сайта
  const handleSiteNewsTransitionEnd = () => {
    if (!sliderRef.current) return;
    
    // Если дошли до клона первого (последний индекс), переключаемся на первый оригинал без анимации
    if (siteNewsIndex >= infiniteSiteNews.length - 1) {
      sliderRef.current.style.transition = 'none';
      sliderRef.current.style.transform = `translateX(-100%)`;
      setSiteNewsIndex(1);
      // Восстанавливаем transition после небольшой задержки
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = 'transform 500ms ease-in-out';
        }
      }, 50);
    }
    // Если дошли до клона последнего (индекс 0), переключаемся на последний оригинал без анимации
    else if (siteNewsIndex === 0) {
      sliderRef.current.style.transition = 'none';
      sliderRef.current.style.transform = `translateX(-${siteNews.length * 100}%)`;
      setSiteNewsIndex(siteNews.length);
      // Восстанавливаем transition после небольшой задержки
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.style.transition = 'transform 500ms ease-in-out';
        }
      }, 50);
    }
  };

  // Обработка перехода после завершения анимации для новостей РЖД
  const handleRzdNewsTransitionEnd = () => {
    if (!rzdSliderRef.current) return;
    
    // Если дошли до клона первого (последний индекс), переключаемся на первый оригинал без анимации
    if (rzdNewsIndex >= infiniteRzdNews.length - 1) {
      rzdSliderRef.current.style.transition = 'none';
      rzdSliderRef.current.style.transform = `translateX(-100%)`;
      setRzdNewsIndex(1);
      // Восстанавливаем transition после небольшой задержки
      setTimeout(() => {
        if (rzdSliderRef.current) {
          rzdSliderRef.current.style.transition = 'transform 500ms ease-in-out';
        }
      }, 50);
    }
    // Если дошли до клона последнего (индекс 0), переключаемся на последний оригинал без анимации
    else if (rzdNewsIndex === 0) {
      rzdSliderRef.current.style.transition = 'none';
      rzdSliderRef.current.style.transform = `translateX(-${rzdNews.length * 100}%)`;
      setRzdNewsIndex(rzdNews.length);
      // Восстанавливаем transition после небольшой задержки
      setTimeout(() => {
        if (rzdSliderRef.current) {
          rzdSliderRef.current.style.transition = 'transform 500ms ease-in-out';
        }
      }, 50);
    }
  };

  // Автоматическое листание для новостей сайта
  useEffect(() => {
    const interval = setInterval(() => {
      setSiteNewsIndex((prev) => prev + 1);
    }, 5000); // Переключение каждые 5 секунд

    return () => clearInterval(interval);
  }, []);

  // Автоматическое листание для новостей РЖД
  useEffect(() => {
    const interval = setInterval(() => {
      setRzdNewsIndex((prev) => prev + 1);
    }, 5000); // Переключение каждые 5 секунд

    return () => clearInterval(interval);
  }, []);

  // Функции для слайдеров
  const nextSlide = (current: number, total: number, setter: (val: number) => void) => {
    setter((current + 1) % total);
  };

  const prevSlide = (current: number, total: number, setter: (val: number) => void) => {
    setter((current - 1 + total) % total);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14">
        {/* БЛОК 1: 3 информационные карточки */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Свежие обновления
          </h2>
          <p className="text-muted-foreground mb-8">
            Последние новости и важная информация
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infoCards.map((card) => (
              <InfoCard key={card.id} data={card} />
            ))}
          </div>
        </section>

        {/* БЛОК 2: Новости сайта - вытянутый слайдер */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Новости сайта
          </h2>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div 
                ref={sliderRef}
                className="flex transition-transform duration-500 ease-in-out will-change-transform"
                style={{ transform: `translateX(-${siteNewsIndex * 100}%)` }}
                onTransitionEnd={handleSiteNewsTransitionEnd}
              >
                {infiniteSiteNews.map((news, index) => (
                  <div key={`${news.id}-${index}`} className="min-w-full flex-shrink-0 w-full">
                    <WideHighlightCard data={news} noRounded={true} hideButton={true} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* БЛОК 3: Повод взять выходной - сетка мероприятий */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Повод взять выходной и отдохнуть
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Большой прямоугольник */}
            <EventTile
              data={events[0]}
              className="md:col-span-2 lg:col-span-2 md:row-span-2 h-[250px] sm:h-[300px] md:h-[500px]"
            />
            {/* Высокий срезанный слева */}
            <EventTile
              data={events[1]}
              className="md:col-span-1 lg:col-span-1 md:row-span-2 h-[250px] sm:h-[300px] md:h-[500px]"
            />
            {/* Квадрат с пузырём слева */}
            <EventTile
              data={events[2]}
              className="md:col-span-1 lg:col-span-1 h-[280px] sm:h-[340px] md:h-[300px]"
            />
            {/* Квадрат с текстом сверху */}
            <EventTile
              data={events[3]}
              className="md:col-span-1 lg:col-span-1 h-[280px] sm:h-[340px] md:h-[300px]"
            />
            {/* Квадрат с пузырём справа */}
            <EventTile
              data={events[4]}
              className="md:col-span-1 lg:col-span-1 h-[280px] sm:h-[340px] md:h-[300px]"
            />
            {/* Высокий срезанный справа */}
            <EventTile
              data={events[5]}
              className="md:col-span-1 lg:col-span-1 md:row-span-2 h-[250px] sm:h-[300px] md:h-[500px]"
            />
            {/* Широкий прямоугольник снизу */}
            <EventTile
              data={events[6]}
              className="md:col-span-2 lg:col-span-2 md:row-span-2 h-[250px] sm:h-[300px] md:h-[500px]"
            />
          </div>
        </section>

        {/* БЛОК 4: Новости РЖД - вытянутые карточки */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Новости РЖД
          </h2>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <div 
                ref={rzdSliderRef}
                className="flex transition-transform duration-500 ease-in-out will-change-transform"
                style={{ transform: `translateX(-${rzdNewsIndex * 100}%)` }}
                onTransitionEnd={handleRzdNewsTransitionEnd}
              >
                {infiniteRzdNews.map((news, index) => (
                  <div key={`${news.id}-${index}`} className="min-w-full flex-shrink-0 w-full">
                    <WideHighlightCard data={news} noRounded={true} hideButton={true} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* БЛОК 5: Сторисы наших пользователей */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Сторисы наших пользователей
          </h2>
          <StoriesCarousel stories={stories} />
        </section>

        {/* БЛОК 6: Советы опытных путешественников */}
        <section className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Советы опытных путешественников
          </h2>
          <div className="relative">
            <div className="overflow-hidden">
              <WideHighlightCard data={tips[tipsIndex]} buttonText="Читать совет" />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-md z-10 hidden md:flex"
              onClick={() => prevSlide(tipsIndex, tips.length, setTipsIndex)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-md z-10 hidden md:flex"
              onClick={() => nextSlide(tipsIndex, tips.length, setTipsIndex)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
