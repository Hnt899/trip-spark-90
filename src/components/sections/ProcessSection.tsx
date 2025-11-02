import { Card, CardContent } from "@/components/ui/card";
import turist from "@/assets/turist.png";

const ProcessSection = () => {
  return (
    <section className="py-20 bg-[#eef0f8]">
      <div className="container space-y-8">
        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              GoTrip вместе с тревел-блогерами и журналистами протестировали маршруты,
              которые составили представители регионов
            </h2>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <p className="text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed font-medium">
                  После каждой поездки мы собираем <span className="font-bold">подробные отзывы</span> с оценками и впечатлениями участников.
                </p>
                <p className="text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed font-medium">
                  А потом публикуем <span className="font-bold">проверенные маршруты</span>, чтобы вы смогли их повторить.
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-md">
                  <img
                    src={turist}
                    alt="Турист на горе"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ProcessSection;

