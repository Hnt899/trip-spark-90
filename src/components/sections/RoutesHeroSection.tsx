import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RoutesHeroSection = () => {
  return (
    <section className="py-20 bg-[#eef0f8]">
      <div className="container">
        <Card className="mb-12 shadow-lg">
          <CardContent className="p-8 md:p-12 text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-[#FF8C00]">Проверено GoTrip</span>
              {" — "}
              <span className="text-foreground">
                маршруты по регионам России с честными оценками тревел-блогеров и журналистов
              </span>
            </h1>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-5xl font-bold text-foreground mb-2">50</div>
              <div className="text-foreground text-lg">
                готовых маршрутов для путешествий
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-5xl font-bold text-foreground mb-2">108</div>
              <div className="text-foreground text-lg">
                туров по регионам за 4 года
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-5xl font-bold text-foreground mb-2">250+</div>
              <div className="text-foreground text-lg">
                блогеров и журналистов
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RoutesHeroSection;

