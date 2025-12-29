import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import instaImage from "@/assets/images/people/insta.jpg";

const ProcessSection = () => {
  return (
    <section className="py-20 bg-[#100A6F]/80 backdrop-blur-sm relative overflow-visible">
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

      <div className="container space-y-8 relative z-10">
        {/* Блок о нашей работе и приглашение в Instagram */}
        <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-8 shadow-xl">
          <div className="flex-1 w-full lg:w-auto">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#3F3F7F] mb-4 leading-tight">
              Мы анализируем <span className="text-[#867DFF]">пользователей</span>, общаемся с <span className="text-[#867DFF]">блогерами</span>, чтобы собирать только <span className="text-[#867DFF]">лучшие маршруты</span>
            </h3>
            <p className="text-lg text-[#3F3F7F]/80 mb-6 leading-relaxed">
              Хотите узнавать о <span className="font-semibold text-[#867DFF]">новых трендах</span> раньше всех? Подписывайтесь на наш Instagram!
            </p>
            <Button 
              className="h-12 px-8 bg-gradient-to-r from-[#867DFF] to-[#6B5CE6] hover:from-[#867DFF]/90 hover:to-[#6B5CE6]/90 text-white rounded-lg text-base font-semibold"
              onClick={() => window.open('https://instagram.com/tudasuda', '_blank')}
            >
              <Instagram className="w-5 h-5 mr-2" />
              Перейти в Instagram
            </Button>
          </div>
          <div className="flex-shrink-0 w-48 h-48 lg:w-64 lg:h-64 relative">
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <img
                src={instaImage}
                alt="Персонаж с телефоном"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-8">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed font-medium">
                Если у вас было <span className="font-bold">яркое путешествие</span>, пишите нам в <span className="font-bold">Instagram</span>, и мы можем сделать про вас <span className="font-bold">блог</span> или сделать из вашего маршрута <span className="font-bold">статью</span>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProcessSection;

