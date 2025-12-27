import { Layers, Shield, Headphones, FileText, MapPin, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const FeaturesSection = () => {
  const features = [
    {
      icon: Layers,
      title: "Всё в одном месте",
      description: "Поиск, бронирование и оплата за минуты",
      fullDescription: "TudaSuda объединяет все необходимые функции для путешествий в одном удобном интерфейсе. Вы можете найти билеты, выбрать места, оплатить заказ и получить электронные билеты — всё это без перехода на другие сайты. Наш сервис работает с ж/д, авиа и автобусными перевозчиками, предоставляя единую точку доступа ко всем видам транспорта.",
      gradient: "from-blue-500 to-cyan-400",
      bgGradient: "from-blue-50 to-cyan-50",
      iconBg: "bg-blue-500",
    },
    {
      icon: Shield,
      title: "Лучшая цена",
      description: "Гарантируем выгодные тарифы без скрытых платежей",
      fullDescription: "Мы сравниваем цены со всех доступных источников и гарантируем, что вы получите лучшую цену на рынке. Прозрачные тарифы без скрытых комиссий и дополнительных платежей. Если вы найдёте дешевле на другом сайте — мы вернём разницу. Наша система автоматически отслеживает изменения цен и предлагает наиболее выгодные варианты.",
      gradient: "from-purple-500 to-pink-400",
      bgGradient: "from-purple-50 to-pink-50",
      iconBg: "bg-purple-500",
    },
    {
      icon: Headphones,
      title: "Поддержка 24/7",
      description: "Помогаем в любое время, отвечаем за 2 минуты",
      fullDescription: "Наша служба поддержки работает круглосуточно, семь дней в неделю. Мы помогаем с бронированием, изменениями, возвратами и любыми вопросами. Среднее время ответа — менее 2 минут. С нами можно связаться через чат, телефон или email. Наши специалисты всегда готовы помочь вам с любыми вопросами, связанными с путешествиями.",
      gradient: "from-orange-500 to-red-400",
      bgGradient: "from-orange-50 to-red-50",
      iconBg: "bg-orange-500",
    },
    {
      icon: FileText,
      title: "Электронные билеты",
      description: "Мгновенная выдача и быстрая регистрация",
      fullDescription: "Получите электронные билеты мгновенно после оплаты. Не нужно ждать доставки или идти в кассу — билеты приходят на вашу почту и сохраняются в личном кабинете. Быстрая регистрация на рейс прямо через наш сервис. Все документы хранятся в безопасном облачном хранилище, доступ к которому у вас есть в любое время.",
      gradient: "from-green-500 to-emerald-400",
      bgGradient: "from-green-50 to-emerald-50",
      iconBg: "bg-green-500",
    },
    {
      icon: MapPin,
      title: "Готовые маршруты",
      description: "Проверенные маршруты по всей России",
      fullDescription: "Мы предлагаем готовые маршруты по регионам России, которые были проверены тревел-блогерами и журналистами. Каждый маршрут включает подробную информацию о достопримечательностях, удобствах и советы от опытных путешественников. Вы можете выбрать готовый маршрут или создать свой собственный на основе наших рекомендаций.",
      gradient: "from-indigo-500 to-blue-400",
      bgGradient: "from-indigo-50 to-blue-50",
      iconBg: "bg-indigo-500",
    },
    {
      icon: BookOpen,
      title: "Путеводители",
      description: "Подробные обзоры городов и достопримечательностей",
      fullDescription: "Подробные путеводители с обзорами городов и достопримечательностей помогут вам спланировать идеальное путешествие. Мы собрали информацию о лучших местах для посещения, ресторанах, отелях и развлечениях. Наши путеводители регулярно обновляются и содержат актуальную информацию от местных экспертов и путешественников.",
      gradient: "from-pink-500 to-rose-400",
      bgGradient: "from-pink-50 to-rose-50",
      iconBg: "bg-pink-500",
    },
  ];

  const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null);

  return (
    <section id="features-section" className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-12 md:mb-16 space-y-3">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Почему выбирают <span className="text-[#0D0D6E]">Tuda</span><span className="text-[#867DFF]">Suda?</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Всё для комфортного путешествия туда и обратно
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => setSelectedFeature(feature)}
              className={cn(
                "animate-in fade-in slide-in-from-bottom-4 duration-500",
                "group relative rounded-3xl p-8 md:p-10",
                "border-2 border-transparent",
                "hover:border-primary/20 hover:shadow-2xl",
                "transition-all duration-500 ease-out",
                "hover:-translate-y-3 hover:scale-[1.02]",
                "cursor-pointer overflow-visible",
                `bg-gradient-to-br ${feature.bgGradient}`
              )}
            >
              {/* Матовый задник при hover - растянут вниз */}
              <div className={cn(
                "absolute inset-0 rounded-3xl opacity-0",
                "group-hover:opacity-100 transition-opacity duration-500",
                "bg-white/60 backdrop-blur-sm",
                "-top-6 -bottom-6 -left-6 -right-6",
                "z-[-1]"
              )}></div>

              {/* Иконка */}
              <div className="mb-8 relative">
                <div className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center",
                  "shadow-lg group-hover:shadow-xl",
                  "transition-all duration-300",
                  "group-hover:scale-110 group-hover:rotate-3",
                  feature.iconBg,
                  "relative z-10"
                )}>
                  <feature.icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
                {/* Свечение вокруг иконки - растянуто вниз */}
                <div className={cn(
                  "absolute top-0 left-0 right-0 bottom-0 rounded-2xl blur-xl opacity-0",
                  "group-hover:opacity-50 transition-opacity duration-300",
                  `bg-gradient-to-br ${feature.gradient}`,
                  "-top-2 -left-2 -right-2 -bottom-36"
                )}></div>
              </div>

              {/* Заголовок */}
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Описание */}
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {feature.description}
              </p>

              {/* Декоративная линия внизу */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Модальное окно с детальной информацией */}
      <Dialog open={!!selectedFeature} onOpenChange={(open) => !open && setSelectedFeature(null)}>
        <DialogContent className="max-w-2xl">
          {selectedFeature && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center",
                    "shadow-lg",
                    selectedFeature.iconBg
                  )}>
                    <selectedFeature.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                  <DialogTitle className="text-2xl md:text-3xl">
                    {selectedFeature.title}
                  </DialogTitle>
                </div>
              </DialogHeader>
              <DialogDescription className="text-base leading-relaxed text-foreground">
                {selectedFeature.fullDescription}
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FeaturesSection;
