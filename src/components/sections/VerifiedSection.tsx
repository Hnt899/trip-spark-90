import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const VerifiedSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#100A6F] via-[#1a1a3e] to-[#100A6F] relative overflow-hidden">
      {/* Декоративные фиолетовые пятна */}
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
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-10 lg:p-12 text-center shadow-2xl">
            {/* Бейдж "Проверено TudaSuda" */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/20 border border-primary/40 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-sm md:text-base text-white/90 font-medium">
                Проверено
              </span>
              <span className="text-base md:text-lg font-bold bg-gradient-to-r from-[#F9B84F] via-[#FFD700] to-[#F9B84F] bg-clip-text text-transparent drop-shadow-lg">
                TudaSuda
              </span>
            </div>
            
            {/* Заголовок */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 md:mb-8 leading-tight">
              Готовые маршруты для путешествий
            </h2>
            
            {/* Описание */}
            <p className="text-base md:text-lg text-white/80 mb-8 md:mb-10 max-w-2xl mx-auto">
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

