import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import karelia from "@/assets/images/cities/karelia.jpg";
import kareliaGrafika from "@/assets/images/cities/graphics/karelia grafika.jpg";
import moscow from "@/assets/images/cities/moscow.jpg";
import moscowGrafika from "@/assets/images/cities/graphics/moscov grafika.jpg";
import stPetersburg from "@/assets/images/cities/saint-petersburg.jpg";
import piterGrafika from "@/assets/images/cities/graphics/piter grafika.jpg";
import kazan from "@/assets/images/cities/kazan.jpg";
import kazanGrafika from "@/assets/images/cities/graphics/kazan grafika.jpg";
import novgorod from "@/assets/images/cities/novgorod.jpg";
import rostov from "@/assets/images/cities/rostov.jpg";
import rostovGrafika from "@/assets/images/cities/graphics/rostov grafika.jpg";
import sochi from "@/assets/images/cities/soci.jpg";
import sochiGrafika from "@/assets/images/cities/graphics/soci grafika.jpg";

interface RouteCard {
  id: string;
  title: string;
  description: string;
  image: string;
  hoverImage?: string; // Графическое изображение при наведении
  rating?: number;
  href: string;
  // Размеры в пикселях для lg
  lgWidth: number;
  lgHeight: number;
  lgLeft: number;
  lgTop: number;
}

const routeCards: RouteCard[] = [
  {
    id: "sochi",
    title: "Сочи",
    description: "Черноморский курорт с субтропическим климатом, горнолыжными склонами, пляжами и богатой историей. Идеальное место для отдыха в любое время года.",
    image: sochi,
    hoverImage: sochiGrafika,
    rating: 9.3,
    href: "/routes/list",
    lgWidth: 1050,
    lgHeight: 300,
    lgLeft: -70,
    lgTop: 0,
  },
  {
    id: "kazan",
    title: "Казань",
    description: "Тысячелетний город, где встречаются Восток и Запад. Современные комплексы и древние мечети создают неповторимый облик города.",
    image: kazan,
    hoverImage: kazanGrafika,
    rating: 9.4,
    href: "/routes/list",
    lgWidth: 400,
    lgHeight: 870,
    lgLeft: 1020,
    lgTop: 0,
  },
  {
    id: "rostov",
    title: "Ростов-на-Дону",
    description: "Южная столица России, город на берегу Дона с богатой историей и архитектурными памятниками.",
    image: rostov,
    hoverImage: rostovGrafika,
    rating: 9.2,
    href: "/routes/list",
    lgWidth: 400,
    lgHeight: 880,
    lgLeft: -70,
    lgTop: 324,
  },
  {
    id: "moscow",
    title: "Москва",
    description: "Столица России с богатой историей, архитектурными памятниками, музеями мирового уровня и динамичной культурной жизнью.",
    image: moscow,
    hoverImage: moscowGrafika,
    rating: 9.5,
    href: "/routes/list",
    lgWidth: 600,
    lgHeight: 550,
    lgLeft: 380,
    lgTop: 324,
  },
  {
    id: "spb",
    title: "Санкт-Петербург",
    description: "Северная столица с великолепной архитектурой, дворцами, музеями и белыми ночами. Культурное сердце России.",
    image: stPetersburg,
    hoverImage: piterGrafika,
    rating: 9.7,
    href: "/routes/list",
    lgWidth: 1050,
    lgHeight: 300,
    lgLeft: 380,
    lgTop: 898,
  },
];

const HeroRoutes = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [mobileCurrent, setMobileCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateCardSizes = () => {
      if (window.innerWidth >= 1024 && containerRef.current) {
        const gap = 24; // Расстояние между карточками в пикселях
        const cards = containerRef.current.querySelectorAll('[data-card-id]');
        cards.forEach((card) => {
          const cardElement = card as HTMLElement;
          const cardId = cardElement.getAttribute('data-card-id');
          const routeCard = routeCards.find(c => c.id === cardId);
          
          if (routeCard) {
            cardElement.style.width = `${routeCard.lgWidth}px`;
            cardElement.style.height = `${routeCard.lgHeight}px`;
            cardElement.style.left = `${routeCard.lgLeft}px`;
            cardElement.style.top = `${routeCard.lgTop}px`;
          }
        });
      }
    };

    updateCardSizes();
    window.addEventListener('resize', updateCardSizes);
    return () => window.removeEventListener('resize', updateCardSizes);
  }, []);

  return (
    <section id="hero-section" className="relative w-full pt-24 pb-8 md:pt-52 md:pb-12 overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        {/* Заголовок только на мобилке */}
        <div className="md:hidden text-center mb-6">
          <h2 className="text-3xl font-extrabold">
            <span className="text-[#FFD700]" style={{ textShadow: '0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.4)' }}>
              Лучшие
            </span>{" "}
            <span className="text-white">маршруты</span>
          </h2>
        </div>

        {/* Мозаика из карточек - десктопная версия */}
        <div 
          ref={containerRef}
          className="relative w-full h-[1200px] hidden lg:block z-10"
        >
          {routeCards.map((card) => (
            <Link
              key={card.id}
              to={card.href}
              data-card-id={card.id}
              className="group absolute rounded-xl md:rounded-2xl overflow-hidden shadow-lg border-2 border-[#867DFF] h-[220px] md:h-[260px]"
              style={{
                width: '100%',
                height: '220px',
              }}
            >
              {/* Фоновое изображение */}
              <div className="absolute inset-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center"
                />
                {/* Градиентные overlay для читаемости */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>

              {/* Фиолетовый overlay при наведении */}
              <div className="absolute inset-0 bg-[#867DFF] origin-top transform scale-y-0 group-hover:scale-y-100 transition-transform duration-1000 ease-out z-10" />

              {/* Графическое изображение при наведении (только для Казани) */}
              {card.hoverImage && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                  <img
                    src={card.hoverImage}
                    alt={card.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              )}

              {/* Контент карточки */}
              <div className="relative h-full flex flex-col p-4 md:p-6 lg:p-8 text-white z-30">
                {/* Верхняя часть: название и рейтинг */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    {card.title}
                  </h2>
                  {card.rating && (
                    <div className="shrink-0">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                        <span className="text-lg md:text-xl font-bold">{card.rating}</span>
                        <span className="text-white/70 text-xs md:text-sm">/10</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Описание под названием */}
                <div>
                  <p className="text-sm md:text-base lg:text-lg leading-relaxed text-white/90 line-clamp-2 md:line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ textShadow: '0 0 4px #867DFF, 0 0 4px #867DFF, 0 0 4px #867DFF, 0 0 4px #867DFF, 0 2px 8px rgba(0,0,0,0.5)' }}>
                    {card.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Мобильная версия - сетка для md */}
        <div className="hidden md:grid md:grid-cols-2 gap-4 md:gap-6 lg:hidden">
          {routeCards.map((card) => (
            <Link
              key={card.id}
              to={card.href}
              className="group relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg border-2 border-[#867DFF] h-[220px] md:h-[260px]"
            >
              {/* Фоновое изображение */}
              <div className="absolute inset-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center"
                />
                {/* Градиентные overlay для читаемости */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>

              {/* Фиолетовый overlay при наведении */}
              <div className="absolute inset-0 bg-[#867DFF] origin-top transform scale-y-0 group-hover:scale-y-100 transition-transform duration-1000 ease-out z-10" />

              {/* Графическое изображение при наведении */}
              {card.hoverImage && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                  <img
                    src={card.hoverImage}
                    alt={card.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              )}

              {/* Контент карточки */}
              <div className="relative h-full flex flex-col p-4 md:p-6 text-white z-20">
                {/* Верхняя часть: название и рейтинг */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    {card.title}
                  </h2>
                  {card.rating && (
                    <div className="shrink-0">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                        <span className="text-lg md:text-xl font-bold">{card.rating}</span>
                        <span className="text-white/70 text-xs md:text-sm">/10</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Описание под названием */}
                <div>
                  <p className="text-sm md:text-base leading-relaxed text-white/90 line-clamp-2 md:line-clamp-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {card.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Мобильная версия - карусель (только для маленьких экранов) */}
        <div className="md:hidden relative overflow-hidden px-2">
          <div 
            className="relative w-full overflow-hidden"
            onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
            onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
            onTouchEnd={() => {
              if (!touchStart || !touchEnd) return;
              
              const distance = touchStart - touchEnd;
              const minSwipeDistance = 50;

              if (distance > minSwipeDistance) {
                setMobileCurrent((prev) => Math.min(routeCards.length - 1, prev + 1));
              }
              
              if (distance < -minSwipeDistance) {
                setMobileCurrent((prev) => Math.max(0, prev - 1));
              }
              
              setTouchStart(0);
              setTouchEnd(0);
            }}
          >
            <div 
              ref={mobileTrackRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${mobileCurrent * 100}%)`,
              }}
            >
              {routeCards.map((card, index) => (
                <Link
                  key={card.id}
                  to={card.href}
                  className={cn(
                    "flex-shrink-0 w-full",
                    "group relative rounded-xl overflow-hidden shadow-lg border-2 border-[#867DFF] h-[220px]"
                  )}
                >
                  {/* Фоновое изображение */}
                  <div className="absolute inset-0">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover object-center"
                    />
                    {/* Градиентные overlay для читаемости */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  </div>

                  {/* Фиолетовый overlay при наведении */}
                  <div className="absolute inset-0 bg-[#867DFF] origin-top transform scale-y-0 group-hover:scale-y-100 transition-transform duration-1000 ease-out z-10" />

                  {/* Графическое изображение при наведении */}
                  {card.hoverImage && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                      <img
                        src={card.hoverImage}
                        alt={card.title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  )}

                  {/* Контент карточки */}
                  <div className="relative h-full flex flex-col p-4 text-white z-20">
                    {/* Верхняя часть: название и рейтинг */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h2 className="text-2xl font-bold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                        {card.title}
                      </h2>
                      {card.rating && (
                        <div className="shrink-0">
                          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3 py-1.5 backdrop-blur-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                            <span className="text-lg font-bold">{card.rating}</span>
                            <span className="text-white/70 text-xs">/10</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Описание под названием */}
                    <div>
                      <p className="text-sm leading-relaxed text-white/90 line-clamp-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Индикаторы для мобильной версии */}
          <div className="flex justify-center gap-2 mt-4 mb-6">
            {routeCards.map((_, index) => (
              <button
                key={index}
                onClick={() => setMobileCurrent(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === mobileCurrent
                    ? "bg-white w-8"
                    : "bg-white/50 w-2"
                )}
                aria-label={`Перейти к карточке ${index + 1}`}
              />
            ))}
          </div>

          {/* Кнопка "Смотреть все маршруты" для мобильной версии */}
          <div className="flex justify-center mb-4">
            <Button
              onClick={() => navigate("/routes/list")}
              className="!bg-white hover:!bg-white/90 !text-[#fffffff] font-semibold px-6 py-2 rounded-lg shadow-lg"
            >
              Смотреть все маршруты
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroRoutes;
