import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { SectionSurface } from "@/lib/sectionSurface";
import { sectionHeadingAccentClass } from "@/lib/sectionSurface";

interface VerifiedSectionProps {
  surface?: SectionSurface;
}

const VerifiedSection = ({ surface = "brand" }: VerifiedSectionProps) => {
  const navigate = useNavigate();
  const isLight = surface === "light";

  return (
    <section
      className={cn(
        "py-16 md:py-24 relative overflow-hidden",
        isLight ? "bg-white" : "bg-gradient-to-br from-[#100A6F] via-[#1a1a3e] to-[#100A6F]"
      )}
    >
      {/* Декоративные пятна */}
      {!isLight && (
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
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className={cn(
              "rounded-3xl p-8 md:p-10 lg:p-12 text-center",
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
              <span className="text-base md:text-lg font-bold bg-gradient-to-r from-[#F9B84F] via-[#FFD700] to-[#F9B84F] bg-clip-text text-transparent drop-shadow-lg">
                TudaSuda
              </span>
            </div>
            
            {/* Заголовок */}
            {isLight ? (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 leading-tight text-slate-900">
                <span className={sectionHeadingAccentClass("light")}>Готовые маршруты</span>
                {" "}
                <span className="text-slate-900">для путешествий</span>
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
        </div>
      </div>
    </section>
  );
};

export default VerifiedSection;

