import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import heroTrain from "@/assets/hero-train.jpg";
import trainInterior from "@/assets/train-interior.jpg";

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Найдите билет на поезд онлайн
              </h1>
              <p className="text-lg text-muted-foreground">
                Поиск расписания, выбор мест, безопасная оплата и ЭПД — в одном окне.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-lg space-y-4 border">
              <div className="flex gap-4 items-center flex-wrap">
                <Select defaultValue="round">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Туда-обратно" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="round">Туда-обратно</SelectItem>
                    <SelectItem value="one">В одну сторону</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="economy">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Эконом" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Эконом</SelectItem>
                    <SelectItem value="business">Бизнес</SelectItem>
                    <SelectItem value="first">Первый класс</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="1">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="0 сумок" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 сумок</SelectItem>
                    <SelectItem value="1">1 сумка</SelectItem>
                    <SelectItem value="2">2 сумки</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Откуда" defaultValue="Станция отправления" />
                <Input placeholder="Куда" defaultValue="Станция назначения" />
                <Input type="date" defaultValue="2025-10-15" />
                <Input type="date" defaultValue="2025-11-15" />
              </div>

              <Button className="w-full" size="lg">
                Найти поезда
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block animate-slide-in">
            <div className="relative">
              <img 
                src={heroTrain} 
                alt="Современный поезд" 
                className="rounded-2xl shadow-2xl w-full"
              />
              <img 
                src={trainInterior} 
                alt="Интерьер поезда" 
                className="absolute -bottom-6 -right-6 w-1/2 rounded-xl shadow-xl border-4 border-background"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;