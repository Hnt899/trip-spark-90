import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import karelia from "@/assets/karelia.jpg";
import moscow from "@/assets/moscow.jpg";
import stPetersburg from "@/assets/saint-petersburg.jpg";
import kazan from "@/assets/kazan.jpg";
import novgorod from "@/assets/novgorod.jpg";

interface RouteCard {
  id: string;
  title: string;
  description: string;
  image: string;
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
    id: "arkhangelsk",
    title: "Архангельская область",
    description: "Самый большой в стране музей деревянного зодчества, песчаные пляжи Белого моря, старейший колесный пароход России и отличные рестораны северной кухни.",
    image: karelia,
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
    rating: 9.4,
    href: "/routes/list",
    lgWidth: 400,
    lgHeight: 870,
    lgLeft: 1020,
    lgTop: 0,
  },
  {
    id: "any-city",
    title: "Любой город",
    description: "Откройте для себя уникальные маршруты по всей России. Каждый регион имеет свою неповторимую атмосферу и культурное наследие.",
    image: novgorod,
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
    <section id="hero-section" className="relative w-full py-8 md:py-12">
      <div className="container px-4 md:px-6">
        {/* Мозаика из карточек */}
        <div 
          ref={containerRef}
          className="relative w-full h-[1200px] hidden lg:block"
        >
          {routeCards.map((card) => (
            <Link
              key={card.id}
              to={card.href}
              data-card-id={card.id}
              className="group absolute rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-[220px] md:h-[260px]"
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
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                {/* Градиентные overlay для читаемости */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>

              {/* Контент карточки */}
              <div className="relative h-full flex flex-col justify-between p-4 md:p-6 lg:p-8 text-white">
                {/* Верхняя часть: рейтинг */}
                {card.rating && (
                  <div className="self-end">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                      <span className="text-lg md:text-xl font-bold">{card.rating}</span>
                      <span className="text-white/70 text-xs md:text-sm">/10</span>
                    </span>
                  </div>
                )}

                {/* Нижняя часть: заголовок и описание */}
                <div className="mt-auto">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2 md:mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    {card.title}
                  </h2>
                  <p className="text-sm md:text-base lg:text-lg leading-relaxed text-white/90 line-clamp-2 md:line-clamp-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
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
              className="group relative rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] h-[220px] md:h-[260px]"
            >
              {/* Фоновое изображение */}
              <div className="absolute inset-0">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                {/* Градиентные overlay для читаемости */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>

              {/* Контент карточки */}
              <div className="relative h-full flex flex-col justify-between p-4 md:p-6 text-white">
                {/* Верхняя часть: рейтинг */}
                {card.rating && (
                  <div className="self-end">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                      <span className="text-lg md:text-xl font-bold">{card.rating}</span>
                      <span className="text-white/70 text-xs md:text-sm">/10</span>
                    </span>
                  </div>
                )}

                {/* Нижняя часть: заголовок и описание */}
                <div className="mt-auto">
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-2 md:mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                    {card.title}
                  </h2>
                  <p className="text-sm md:text-base leading-relaxed text-white/90 line-clamp-2 md:line-clamp-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
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
