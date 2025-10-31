import { Shield, Clock, Headphones } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Гарантия лучшей цены",
      description: "Прозрачные тарифы и выгодные предложения.",
    },
    {
      icon: Clock,
      title: "Быстрое и удобное бронирование",
      description: "Оформление за минуты — без лишних шагов.",
    },
    {
      icon: Headphones,
      title: "Поддержка 24/7",
      description: "Мы на связи круглосуточно, семь дней в неделю.",
    },
  ];

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Почему выбирают нас
          </h2>
          <p className="text-muted-foreground text-lg">
            Эти популярные направления предлагают многое
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 space-y-4 hover:bg-muted/50 rounded-xl transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;