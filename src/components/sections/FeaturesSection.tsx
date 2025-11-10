import { Shield, Clock, Headphones } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Гарантия лучшей цены",
      description: "Мы сравниваем цены со всех доступных источников и гарантируем, что вы получите лучшую цену на рынке. Прозрачные тарифы без скрытых комиссий и дополнительных платежей. Если найдёте дешевле — вернём разницу.",
    },
    {
      icon: Clock,
      title: "Быстрое и удобное бронирование",
      description: "Оформление билетов занимает всего несколько минут. Простой и интуитивно понятный интерфейс, автоматическое заполнение данных, выбор мест на интерактивной схеме. Всё необходимое для комфортной поездки в одном месте.",
    },
    {
      icon: Headphones,
      title: "Поддержка 24/7",
      description: "Наша служба поддержки работает круглосуточно, семь дней в неделю. Помогаем с бронированием, изменениями, возвратами и любыми вопросами. Среднее время ответа — менее 2 минут. Чат, телефон и email всегда доступны.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Почему выбирают нас
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Мы делаем путешествия проще, быстрее и выгоднее. Тысячи довольных клиентов уже оценили наш сервис.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-card border rounded-2xl p-8 space-y-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center space-y-5">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all shadow-lg">
                    <feature.icon className="w-10 h-10 text-primary" strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;