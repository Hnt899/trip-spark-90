import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const VerifiedSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-32 bg-[#100A6F]/80 backdrop-blur-sm relative overflow-visible">
      {/* Декоративные желтые пятна */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block z-0">
        {/* Левое пятно - от центра поднимаемся вверх на 30px */}
        <div 
          className="absolute rounded-full blur-3xl"
          style={{
            width: '400px',
            height: '400px',
            left: '-150px',
            top: 'calc(50% - 30px)',
            transform: 'translateY(-50%)',
            background: '#F9B84F',
            opacity: 0.3,
          }}
        />
        {/* Правое пятно - от центра опускаемся вниз на 30px */}
        <div 
          className="absolute rounded-full blur-3xl"
          style={{
            width: '400px',
            height: '400px',
            right: '-100px',
            top: 'calc(50% + 30px)',
            transform: 'translateY(-50%)',
            background: '#F9B84F',
            opacity: 0.3,
          }}
        />
      </div>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#F9B84F]   backdrop-blur-x2 border border-[#F9B84F]/50 rounded-3xl p-8 md:p-10 lg:p-12 text-center shadow-2xl" style={{ boxShadow: '0 20px 60px rgba(249, 184, 79, 0.3)' }}>
            <p className="text-2xl md:text-3xl lg:text-4xl text-[#1a1a1a] mb-4 font-light tracking-wide" style={{ fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif' }}>
              <span className="text-[#1a1a1a]">Проверено</span>{" "}
              <span className="text-[#0D0D6E] font-bold">
                Tuda
              </span>
              {" - "}
              <span className="text-[#867DFF] font-bold">
                Suda
              </span>
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl text-[#1a1a1a] font-semibold mb-10 md:mb-12 leading-tight underline decoration-[#1a1a1a]" style={{ fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, serif', fontWeight: 600 }}>
              Готовые маршруты для путешествий
            </p>
            <Button
              onClick={() => navigate("/routes")}
              className="bg-gradient-to-r from-[#867DFF] to-[#6B5CE6] hover:from-[#867DFF]/90 hover:to-[#6B5CE6]/90 text-white px-12 py-8 text-lg md:text-xl font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
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

