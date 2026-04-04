import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { SectionSurface } from "@/lib/sectionSurface";
import moscow from "@/assets/images/cities/moscow.jpg";
import stPetersburg from "@/assets/images/cities/saint-petersburg.jpg";
import kazan from "@/assets/images/cities/kazan.jpg";
import novgorod from "@/assets/images/cities/novgorod.jpg";
import karelia from "@/assets/images/cities/karelia.jpg";
import armenia from "@/assets/images/cities/armenia.jpg";
import rostov from "@/assets/images/cities/rostov.jpg";
import china from "@/assets/images/cities/china.jpg";

/** Углы карточки на мобилке: поверх карточки (z-20), смещение внутрь к центру */
const MOBILE_CORNER_LAYOUT: { index: number; className: string }[] = [
  { index: 0, className: "left-1 top-7 z-20 -translate-x-1 -translate-y-3 sm:left-2 sm:top-9" },
  { index: 1, className: "right-1 top-7 z-20 translate-x-1 -translate-y-3 sm:right-2 sm:top-9" },
  { index: 2, className: "left-1 bottom-9 z-20 -translate-x-1 translate-y-3 sm:left-2 sm:bottom-11" },
  { index: 3, className: "right-1 bottom-9 z-20 translate-x-1 translate-y-3 sm:right-2 sm:bottom-11" },
];

const POLAROIDS = [
  { src: moscow, caption: "Москва", rotateClass: "-rotate-[8deg]" },
  { src: stPetersburg, caption: "Питер", rotateClass: "rotate-[7deg]" },
  { src: kazan, caption: "Казань", rotateClass: "-rotate-[5deg]" },
  { src: novgorod, caption: "Новгород", rotateClass: "rotate-[6deg]" },
  { src: karelia, caption: "Карелия", rotateClass: "-rotate-[6deg]" },
  { src: armenia, caption: "Сочи", rotateClass: "rotate-[5deg]" },
  { src: rostov, caption: "Ростов", rotateClass: "-rotate-[4deg]" },
  { src: china, caption: "Китай", rotateClass: "rotate-[6deg]" },
] as const;

/** lg+: слева и справа по 2×2, под наклоном и со сдвигами — как разбросали. */
const DESKTOP_POLAROID_LAYOUT: { index: number; className: string; frameClass: string }[] = [
  { index: 0, className: "left-[1%] top-[16%]", frameClass: "-rotate-[10deg] translate-x-1 -translate-y-1" },
  { index: 1, className: "left-[min(15vw,12.5rem)] top-[19%]", frameClass: "rotate-[12deg] -translate-x-0.5 translate-y-0.5" },
  { index: 2, className: "left-[2%] top-[42%]", frameClass: "rotate-[8deg] -translate-y-1.5" },
  { index: 3, className: "left-[min(14vw,11.5rem)] top-[46%]", frameClass: "-rotate-[7deg] translate-x-1 translate-y-1" },
  { index: 4, className: "right-[2%] top-[17%]", frameClass: "rotate-[9deg] -translate-x-1 -translate-y-0.5" },
  { index: 5, className: "right-[min(14vw,11.5rem)] top-[15%]", frameClass: "-rotate-[11deg] translate-y-1" },
  { index: 6, className: "right-[1%] top-[43%]", frameClass: "-rotate-[6deg] translate-x-0.5 translate-y-1" },
  { index: 7, className: "right-[min(13vw,11rem)] top-[47%]", frameClass: "rotate-[10deg] -translate-x-1 -translate-y-1" },
];

function Polaroid({
  src,
  caption,
  rotateClass,
  className,
  corner,
}: {
  src: string;
  caption: string;
  rotateClass: string;
  className?: string;
  /** Компактный вид для углов карточки на мобилке */
  corner?: boolean;
}) {
  return (
    <div className={cn("pointer-events-none select-none", className)} aria-hidden>
      <div
        className={cn(
          "bg-white shadow-[0_14px_36px_rgba(16,10,111,0.2),0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.06]",
          corner ? "p-1.5 pb-3" : "p-2 pb-5",
          rotateClass,
          "origin-center transition-transform duration-300 will-change-transform"
        )}
      >
        <div className="overflow-hidden rounded-[1px] bg-slate-100">
          <img
            src={src}
            alt=""
            className={cn(
              "block object-cover",
              corner
                ? "h-[4.25rem] w-[3.65rem]"
                : "h-20 w-[5.5rem] sm:h-24 sm:w-28 lg:h-[7.25rem] lg:w-[8.25rem]"
            )}
            loading="lazy"
            decoding="async"
          />
        </div>
        <p
          className={cn(
            "text-center font-medium italic tracking-wide text-slate-500",
            corner ? "mt-1 text-[7px] leading-tight" : "mt-2 text-[9px] sm:text-[10px] lg:text-[11px]"
          )}
        >
          {caption}
        </p>
      </div>
    </div>
  );
}

interface VerifiedSectionProps {
  surface?: SectionSurface;
  /** Без собственного градиента и фиолетовых пятен — фон задаёт страница /routes. */
  omitOuterChrome?: boolean;
}

const VerifiedSection = ({ surface = "brand", omitOuterChrome = false }: VerifiedSectionProps) => {
  const navigate = useNavigate();
  const isLight = surface === "light";

  return (
    <section
      className={cn(
        "relative py-16 pb-24 md:py-24 md:pb-28 lg:pb-24",
        isLight
          ? "overflow-x-clip overflow-y-visible bg-white"
          : omitOuterChrome
            ? "overflow-x-clip overflow-y-visible bg-transparent"
            : "overflow-x-clip overflow-y-visible bg-gradient-to-br from-[#100A6F] via-[#1a1a3e] to-[#100A6F]"
      )}
    >
      {/* Декоративные пятна */}
      {!isLight && !omitOuterChrome && (
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute rounded-full blur-3xl"
          style={{
            width: '500px',
            height: '500px',
            left: '-200px',
            top: '20%',
            background: 'rgba(138, 112, 248, 0.2)',
          }}
        />
        <div 
          className="absolute rounded-full blur-3xl"
          style={{
            width: '400px',
            height: '400px',
            right: '-150px',
            bottom: '20%',
            background: 'rgba(107, 92, 230, 0.2)',
          }}
        />
      </div>
      )}
      {isLight && (
        <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
          <div
            className="absolute rounded-full blur-3xl opacity-40"
            style={{
              width: "420px",
              height: "420px",
              left: "-120px",
              top: "30%",
              background: "rgba(138, 112, 248, 0.14)",
            }}
          />
          <div
            className="absolute rounded-full blur-3xl opacity-40"
            style={{
              width: "380px",
              height: "380px",
              right: "-100px",
              bottom: "25%",
              background: "rgba(16, 10, 111, 0.1)",
            }}
          />
        </div>
      )}

      {/* Десктоп: по 4 полароида слева и справа (2×2), под углом — под карточкой */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] hidden overflow-x-clip overflow-y-visible lg:block"
        aria-hidden
      >
        <div className="relative h-full min-h-[560px] w-full xl:min-h-[580px]">
          {DESKTOP_POLAROID_LAYOUT.map(({ index, className, frameClass }) => {
            const p = POLAROIDS[index];
            return (
              <Polaroid
                key={`desktop-${p.caption}`}
                src={p.src}
                caption={p.caption}
                rotateClass={frameClass}
                className={cn("absolute", className)}
              />
            );
          })}
        </div>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="relative mx-auto w-full max-w-6xl overflow-visible pt-6 pb-14 sm:pb-16 lg:pt-0 lg:pb-0">
          <div className="relative z-10 mx-auto max-w-4xl overflow-visible">
          <div
            className={cn(
              "relative z-0 rounded-3xl p-8 text-center md:p-10 lg:p-12 lg:z-10",
              isLight
                ? "bg-white border border-slate-200/90 shadow-[0_16px_56px_rgba(16,10,111,0.12)]"
                : "bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
            )}
          >
                {/* Бейдж "Проверено TudaSuda" */}
                <div
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 backdrop-blur-sm border",
                    isLight
                      ? "bg-primary/5 border-primary/25"
                      : "bg-primary/20 border-primary/40"
                  )}
                >
                  <span
                    className={cn(
                      "text-sm md:text-base font-medium",
                      isLight ? "text-slate-700" : "text-white/90"
                    )}
                  >
                    Проверено
                  </span>
                  <span className="text-base md:text-lg font-bold heading-gradient">
                    TudaSuda
                  </span>
                </div>

                {/* Заголовок */}
                {isLight ? (
                  <h2 className="heading-gradient text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-tight tracking-tight">
                    Готовые маршруты для путешествий
                  </h2>
                ) : (
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 leading-tight">
                    Готовые маршруты для путешествий
                  </h2>
                )}

                {/* Описание */}
                <p
                  className={cn(
                    "text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto",
                    isLight ? "text-slate-600" : "text-white/80"
                  )}
                >
                  Проверенные тревел-блогерами и журналистами маршруты по всей России.
                  Каждый маршрут включает подробную информацию о достопримечательностях и советы от опытных путешественников.
                </p>

                {/* Кнопка */}
                <Button
                  onClick={() => navigate("/routes")}
                  size="lg"
                  className="bg-gradient-to-r from-primary via-purple-600 to-primary hover:from-primary/90 hover:via-purple-600/90 hover:to-primary/90 text-white px-8 md:px-12 py-6 md:py-8 text-base md:text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Все маршруты
                </Button>
          </div>

          {/* Мобилка: поляроиды поверх карточки, заходят на неё у углов */}
          {MOBILE_CORNER_LAYOUT.map(({ index, className }) => {
            const p = POLAROIDS[index];
            return (
              <Polaroid
                key={`mobile-corner-${p.caption}`}
                src={p.src}
                caption={p.caption}
                rotateClass={p.rotateClass}
                corner
                className={cn("absolute lg:hidden", className)}
              />
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifiedSection;

