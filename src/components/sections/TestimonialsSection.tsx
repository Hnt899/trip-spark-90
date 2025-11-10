import { Star, Users, Clock, Shield, TrendingUp, Award, Heart } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    { name: "Марина", date: "01.11.2025", text: "Дешевые билеты и удобно покупать. Всё прошло быстро!" },
    { name: "Алексей", date: "28.10.2025", text: "Отличный сервис! Нашёл билеты за минуты." },
    { name: "Елена", date: "25.10.2025", text: "Поддержка ответила мгновенно, помогли с возвратом." },
    { name: "Дмитрий", date: "22.10.2025", text: "Удобный интерфейс, понятно даже новичку." },
    { name: "Анна", date: "20.10.2025", text: "Лучший сервис для покупки ж/д билетов!" },
    { name: "Сергей", date: "18.10.2025", text: "Быстро, надёжно, без лишних действий." },
    { name: "Ольга", date: "15.10.2025", text: "Цены действительно выгодные, проверяла на других сайтах." },
    { name: "Иван", date: "12.10.2025", text: "Пользуюсь постоянно, никогда не подводили." },
    { name: "Татьяна", date: "10.10.2025", text: "Удобное приложение, всё под рукой." },
    { name: "Михаил", date: "08.10.2025", text: "Отличная работа службы поддержки!" },
    { name: "Наталья", date: "05.10.2025", text: "Рекомендую всем друзьям и знакомым!" },
    { name: "Владимир", date: "02.10.2025", text: "Простота и скорость – вот что нужно!" },
    { name: "Светлана", date: "29.09.2025", text: "Забронировала билеты за пару минут." },
    { name: "Андрей", date: "26.09.2025", text: "Прозрачные цены, никаких скрытых комиссий." },
    { name: "Мария", date: "23.09.2025", text: "Очень довольна сервисом, спасибо!" },
  ];

  return (
    <section className="py-20 bg-secondary text-secondary-foreground overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Что говорят наши клиенты?
              </h2>
              <p className="text-secondary-foreground/80">
                Мы ценим обратную связь и постоянно улучшаем сервис.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">200,000+</p>
                  <p className="text-sm text-secondary-foreground/80">довольных клиентов</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">4,88</p>
                  <p className="text-sm text-secondary-foreground/80 mb-1">Средняя оценка</p>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">2 мин</p>
                  <p className="text-sm text-secondary-foreground/80">среднее время ответа</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">99.8%</p>
                  <p className="text-sm text-secondary-foreground/80">успешных бронирований</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">150+</p>
                  <p className="text-sm text-secondary-foreground/80">городов России</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">5 лет</p>
                  <p className="text-sm text-secondary-foreground/80">на рынке</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">98%</p>
                  <p className="text-sm text-secondary-foreground/80">рекомендуют нас</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">24/7</p>
                  <p className="text-sm text-secondary-foreground/80">поддержка клиентов</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] overflow-hidden">
            <div className="animate-scroll-vertical space-y-3 hover:[animation-play-state:paused]">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="bg-card p-5 rounded-xl border border-border/10">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-base font-semibold text-card-foreground">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.date}</p>
                    </div>
                  </div>
                  <p className="text-card-foreground">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;