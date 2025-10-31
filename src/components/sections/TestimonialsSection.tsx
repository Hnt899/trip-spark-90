import { Star } from "lucide-react";

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-secondary text-secondary-foreground">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Что говорят наши клиенты?
              </h2>
              <p className="text-secondary-foreground/80">
                Мы ценим обратную связь и постоянно улучшаем сервис.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-bold mb-2">200,000+</p>
                <p className="text-secondary-foreground/80">довольных клиентов</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">4,88</p>
                <p className="text-secondary-foreground/80 mb-2">Средняя оценка</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl border border-border/10">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-semibold">
                  М
                </div>
                <div>
                  <p className="font-semibold text-card-foreground">Марина</p>
                  <p className="text-sm text-muted-foreground">70X71</p>
                </div>
              </div>
              <p className="text-card-foreground">
                дешевые билеты и удобно покупать.
              </p>
            </div>

            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-border"></div>
              <div className="w-2 h-2 rounded-full bg-border"></div>
            </div>

            <div className="text-center text-sm text-secondary-foreground/60">
              01 — 03
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;