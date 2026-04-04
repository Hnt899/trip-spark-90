import { useState, useEffect } from "react";
import video from "@/assets/video/video.mp4";
import { useIsMobile } from "@/hooks/use-mobile";

const advantages = [
  {
    number: "50",
    title: "готовых маршрутов для путешествий",
    description: "Подробные маршруты по самым интересным местам России, проверенные опытными путешественниками и журналистами",
  },
  {
    number: "108",
    title: "туров по регионам за 4 года",
    description: "Более ста проверенных туров по всем уголкам нашей страны с детальными отзывами и рекомендациями",
  },
  {
    number: "250+",
    title: "блогеров и журналистов",
    description: "Наша команда состоит из профессиональных тревел-блогеров, журналистов и экспертов по путешествиям",
  },
];

const RoutesHeroSection = () => {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [nextCardReady, setNextCardReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setNextCardReady(false);
      
      // Небольшая задержка перед началом анимации следующей карточки
      setTimeout(() => {
        setNextCardReady(true);
      }, 10);
      
      // После завершения анимации меняем индекс
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % advantages.length);
        setIsAnimating(false);
        setNextCardReady(false);
      }, 600); // Время анимации
    }, 5000); // Смена каждые 5 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="routes-hero-section" className="relative py-20 pb-2 md:pb-20 overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
            <span className="block mb-1 md:mb-2">Создавайте свои</span>
            <span className="block">истории с TudaSuda</span>
          </h1>
        </div>

        <div className="flex flex-col items-center relative" style={{ paddingBottom: isMobile ? 0 : '100px' }}>
          <div className={`w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/10 relative z-10 ${isMobile ? 'mb-8' : ''}`}>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>

          {/* Плашки с преимуществами - накладываются на видео для десктопа */}
          {!isMobile && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl flex justify-center items-end pointer-events-none z-20 px-4" style={{ bottom: '-60px' }}>
              <div className="w-full max-w-4xl relative" style={{ minHeight: '320px' }}>
                {advantages.map((advantage, index) => {
                  const isActive = index === currentIndex;
                  const isNext = index === (currentIndex + 1) % advantages.length;
                  
                  // Рендерим только активную карточку или следующую во время анимации
                  if (!isActive && !(isNext && isAnimating)) {
                    return null;
                  }

                  // Определяем класс анимации и начальное состояние
                  let animationClass = '';
                  let initialStyle: React.CSSProperties = {
                    transform: 'translateX(0)',
                    opacity: 1,
                    filter: 'brightness(1)',
                    willChange: 'auto',
                  };
                  
                  if (isActive && isAnimating) {
                    // Активная карточка уезжает влево
                    animationClass = 'anim-tinLeftOut';
                    initialStyle.willChange = 'transform, opacity';
                  } else if (isNext && isAnimating) {
                    // Следующая карточка начинается справа, затем анимируется
                    initialStyle = { 
                      transform: 'translateX(120%)', 
                      opacity: 0,
                      filter: 'brightness(1)',
                      willChange: 'transform, opacity',
                    };
                    if (nextCardReady) {
                      animationClass = 'anim-slideInRight';
                    }
                  } else if (isActive) {
                    // Активная карточка на месте - видима
                    initialStyle.willChange = 'auto';
                  }

                  return (
                    <div
                      key={index}
                      className={`absolute bottom-0 left-0 right-0 flex items-end justify-center ${animationClass}`}
                      style={{
                        zIndex: isActive ? 10 : 9,
                        ...initialStyle,
                      }}
                    >
                      <div className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-3xl px-6 py-6 md:px-12 md:py-10 shadow-2xl w-full" style={{ filter: 'brightness(1)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                        <div className="text-center">
                          <div 
                            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-2 md:mb-4"
                            style={{
                              color: '#867DFF',
                              textShadow: '0 0 20px rgba(134, 125, 255, 0.6), 0 0 40px rgba(134, 125, 255, 0.4), 0 0 60px rgba(134, 125, 255, 0.2)',
                            }}
                          >
                            {advantage.number}
                          </div>
                          <div className="text-white text-lg md:text-2xl lg:text-3xl font-semibold mb-2 md:mb-4 drop-shadow-md">
                            {advantage.title}
                          </div>
                          <div className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
                            {advantage.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Плашки с преимуществами - ниже видео для мобильной версии */}
          {isMobile && (
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="w-full relative" style={{ minHeight: '320px' }}>
                {advantages.map((advantage, index) => {
                  const isActive = index === currentIndex;
                  const isNext = index === (currentIndex + 1) % advantages.length;
                  
                  // Рендерим только активную карточку или следующую во время анимации
                  if (!isActive && !(isNext && isAnimating)) {
                    return null;
                  }

                  // Определяем класс анимации и начальное состояние
                  let animationClass = '';
                  let initialStyle: React.CSSProperties = {
                    transform: 'translateX(0)',
                    opacity: 1,
                    filter: 'brightness(1)',
                    willChange: 'auto',
                  };
                  
                  if (isActive && isAnimating) {
                    // Активная карточка уезжает влево
                    animationClass = 'anim-tinLeftOut';
                    initialStyle.willChange = 'transform, opacity';
                  } else if (isNext && isAnimating) {
                    // Следующая карточка начинается справа, затем анимируется
                    initialStyle = { 
                      transform: 'translateX(120%)', 
                      opacity: 0,
                      filter: 'brightness(1)',
                      willChange: 'transform, opacity',
                    };
                    if (nextCardReady) {
                      animationClass = 'anim-slideInRight';
                    }
                  } else if (isActive) {
                    // Активная карточка на месте - видима
                    initialStyle.willChange = 'auto';
                  }

                  return (
                    <div
                      key={index}
                      className={`absolute top-0 left-0 right-0 flex items-start justify-center ${animationClass}`}
                      style={{
                        zIndex: isActive ? 10 : 9,
                        ...initialStyle,
                      }}
                    >
                      <div className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-3xl px-6 py-6 md:px-12 md:py-10 shadow-2xl w-full" style={{ filter: 'brightness(1)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
                        <div className="text-center">
                          <div 
                            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-2 md:mb-4"
                            style={{
                              color: '#867DFF',
                              textShadow: '0 0 20px rgba(134, 125, 255, 0.6), 0 0 40px rgba(134, 125, 255, 0.4), 0 0 60px rgba(134, 125, 255, 0.2)',
                            }}
                          >
                            {advantage.number}
                          </div>
                          <div className="text-white text-lg md:text-2xl lg:text-3xl font-semibold mb-2 md:mb-4 drop-shadow-md">
                            {advantage.title}
                          </div>
                          <div className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
                            {advantage.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoutesHeroSection;

