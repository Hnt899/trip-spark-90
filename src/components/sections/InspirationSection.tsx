import armenia from "@/assets/armenia.jpg";
import china from "@/assets/china.jpg";
import karelia from "@/assets/karelia.jpg";
import { useEffect, useRef, useState } from "react";

const InspirationSection = () => {
  const destinations = [
    {
      name: "Душевная Армения",
      description: "Ереван, Севан и древние монастыри",
      image: armenia,
    },
    {
      name: "Отпуск в Китае",
      description: "Что стоит знать перед первой поездкой",
      image: china,
    },
    {
      name: "Маршрут по Карелии",
      description: "Главные места для знакомства с республикой",
      image: karelia,
    },
    {
      name: "Золотое кольцо России",
      description: "Древние города и православные святыни",
      image: armenia,
    },
    {
      name: "Байкал зимой",
      description: "Невероятная красота ледяного озера",
      image: china,
    },
    {
      name: "Камчатка",
      description: "Вулканы, гейзеры и дикая природа",
      image: karelia,
    },
    {
      name: "Алтай",
      description: "Горы, озёра и бескрайние степи",
      image: armenia,
    },
    {
      name: "Крым",
      description: "Южное побережье и горные тропы",
      image: china,
    },
    {
      name: "Якутия",
      description: "Полюс холода и северное сияние",
      image: karelia,
    },
    {
      name: "Кавказ",
      description: "Эльбрус и горные аулы",
      image: armenia,
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const scrollPositionRef = useRef(0);
  const isJumpingRef = useRef(false);

  // Скорость автоскролла в пикселях в секунду
  const speedPxPerSec = 50;
  
  // Создаем тройной контент для бесшовного перехода: оригинал-копия-оригинал
  // Это позволяет делать переход в середине, когда визуально контент идентичен
  const duplicatedDestinations = [...destinations, ...destinations, ...destinations];

  // Нативный обработчик wheel с passive: false для надежной блокировки скролла страницы
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheelNative = (e: WheelEvent) => {
      const isScrolling = container.scrollWidth > container.clientWidth;
      
      if (isScrolling) {
        // Блокируем скролл страницы
        e.preventDefault();
        e.stopPropagation();
        
        // Останавливаем автоскролл
        setIsPaused(true);
        if (resumeTimeoutRef.current) {
          window.clearTimeout(resumeTimeoutRef.current);
        }

        // Получаем текущую позицию (может быть в любой из трех копий)
        const singleContentWidth = container.scrollWidth / 3;
        let currentScroll = container.scrollLeft;
        
        // Нормализуем позицию для обработки переходов
        // Если мы в третьей копии, переключаемся на первую (как в автоскролле)
        const transitionPoint = singleContentWidth * 2;
        if (currentScroll >= transitionPoint) {
          currentScroll = currentScroll - singleContentWidth;
          container.scrollLeft = currentScroll;
        }
        
        // Плавная горизонтальная прокрутка колесиком
        const scrollDelta = e.deltaY * 1;
        const targetScroll = currentScroll + scrollDelta;
        
        // Используем объект для хранения изменяемых значений
        const animState = {
          startScroll: currentScroll,
          targetScroll: targetScroll,
          startTime: null as number | null,
        };
        
        const duration = 100;
        
        const animate = (currentTime: number) => {
          if (animState.startTime === null) animState.startTime = currentTime;
          const elapsed = currentTime - animState.startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing функция для плавности
          const ease = 1 - Math.pow(1 - progress, 3);
          
          // Вычисляем новую позицию скролла
          const distance = animState.targetScroll - animState.startScroll;
          let newScroll = animState.startScroll + distance * ease;
          
          // Проверяем переходы через границы (точно так же, как в автоскролле)
          // Если дошли до конца второй копии, мгновенно переключаемся на первую
          // Визуально контент идентичен, поэтому переход незаметен
          if (newScroll >= transitionPoint) {
            // Мгновенно переключаемся на эквивалентную позицию в первой копии
            const adjustedScroll = newScroll - singleContentWidth;
            container.scrollLeft = adjustedScroll;
            scrollPositionRef.current = adjustedScroll;
            // Обновляем startScroll, чтобы анимация продолжалась от новой позиции
            animState.startScroll = adjustedScroll;
          } else if (newScroll < 0) {
            // Скроллим назад за начало первой копии -> переключаемся на конец второй
            const adjustedScroll = newScroll + singleContentWidth;
            container.scrollLeft = adjustedScroll;
            scrollPositionRef.current = adjustedScroll;
            // Обновляем startScroll, чтобы анимация продолжалась от новой позиции
            animState.startScroll = adjustedScroll;
          } else {
            // Применяем позицию к контейнеру
            container.scrollLeft = newScroll;
            scrollPositionRef.current = newScroll;
          }
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            // После завершения анимации финальная проверка границ
            const finalScroll = container.scrollLeft;
            if (finalScroll >= transitionPoint) {
              container.scrollLeft = finalScroll - singleContentWidth;
              scrollPositionRef.current = finalScroll - singleContentWidth;
            } else if (finalScroll < 0) {
              container.scrollLeft = finalScroll + singleContentWidth;
              scrollPositionRef.current = finalScroll + singleContentWidth;
            }
          }
        };
        
        requestAnimationFrame(animate);

        // Возобновить автоскролл через 2 секунды после последнего движения
        resumeTimeoutRef.current = window.setTimeout(() => {
          setIsPaused(false);
        }, 2000);
      }
    };

    container.addEventListener('wheel', handleWheelNative, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheelNative);
    };
  }, []);

  // Автоматический скролл с бесконечным циклом
  useEffect(() => {
    if (!containerRef.current || !scrollContentRef.current) return;
    
    // Инициализируем начальную позицию
    const container = containerRef.current;
    if (container.scrollLeft === 0) {
      scrollPositionRef.current = 0;
    }

    const tick = (ts: number) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.1);
      lastTsRef.current = ts;

      if (!isPaused && !isJumpingRef.current && containerRef.current && scrollContentRef.current) {
        const container = containerRef.current;
        const content = scrollContentRef.current;
        const singleContentWidth = content.scrollWidth / 3; // ширина одной копии (теперь 3 копии)
        const totalMaxScroll = content.scrollWidth - container.clientWidth;
        const singleMaxScroll = singleContentWidth - container.clientWidth;
        
        if (singleMaxScroll > 0) {
          const currentScroll = container.scrollLeft;
          
          // Просто продолжаем скроллить без ограничений
          scrollPositionRef.current += speedPxPerSec * dt;
          container.scrollLeft = scrollPositionRef.current;
          
          // Когда дошли до конца второй копии (начало третьей), 
          // мгновенно (но незаметно) переключаемся на начало первой копии
          // Визуально контент идентичен, поэтому переход незаметен
          const transitionPoint = singleContentWidth * 2; // граница между второй и третьей копией
          
          if (container.scrollLeft >= transitionPoint) {
            isJumpingRef.current = true;
            
            // Мгновенно переключаемся на эквивалентную позицию в первой копии
            // Вычитаем одну ширину копии, чтобы остаться в визуально том же месте
            const newPosition = container.scrollLeft - singleContentWidth;
            container.scrollLeft = newPosition;
            scrollPositionRef.current = newPosition;
            
            // Сразу продолжаем скролл без задержки
            isJumpingRef.current = false;
          }
        }
      }
      
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = null;
      lastTsRef.current = null;
      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }
    };
  }, [isPaused, speedPxPerSec]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Вдохновение для следующей поездки
          </h2>
          <p className="text-muted-foreground text-lg">
            Найдите идеи и направления
          </p>
        </div>

        <div 
          ref={containerRef}
          className="overflow-x-auto overflow-y-hidden scrollbar-hide"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'auto' }}
        >
          <div ref={scrollContentRef} className="flex gap-8 pb-4" style={{ width: 'max-content' }}>
            {duplicatedDestinations.map((destination, index) => (
              <div 
                key={index}
                className="group cursor-pointer snap-start flex-shrink-0 w-[380px]"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[4/3] mb-4">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-1">
                  {destination.name}
                </h3>
                <p className="text-muted-foreground text-base">
                  {destination.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default InspirationSection;