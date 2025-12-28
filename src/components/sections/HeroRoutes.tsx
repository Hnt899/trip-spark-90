import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

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
    <section id="hero-section" className="relative w-full pt-24 pb-8 md:pt-52 md:pb-12 bg-[#100A6F]/80 backdrop-blur-sm overflow-hidden">
      {/* Декоративные цветные пятна */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block z-0">
        {/* Левое пятно */}
        <div 
          className="absolute rounded-full blur-3xl"
          style={{
            width: '500px',
            height: '500px',
            left: '-150px',
            top: '200px',
            background: '#F9B84F',
            opacity: 0.3,
          }}
        />
        {/* Правое пятно */}
        <div 
          className="absolute rounded-full blur-3xl"
          style={{
            width: '450px',
            height: '450px',
            right: '-120px',
            top: '600px',
            background: '#F9B84F',
            opacity: 0.3,
          }}
        />
      </div>

      <div className="container px-4 md:px-6 relative z-10">

        {/* Мозаика из карточек */}
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
        
        {/* Мобильная версия */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:hidden">
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
      </div>
    </section>
  );
};

export default HeroRoutes;
