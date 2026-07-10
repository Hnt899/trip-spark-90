import { Layers, Shield, Headphones, FileText, MapPin, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SectionSurface } from "@/lib/sectionSurface";
import {
  carouselDotClass,
  sectionLeadClass,
  sectionShellClass,
} from "@/lib/sectionSurface";
import { usePageSectionFields } from "@/contexts/PageCmsContext";
import type { FeaturesFields } from "@/types/pageContent";
import { CmsEditable } from "@/components/cms/CmsEditable";
import { cmsColorStyle, cmsHeadingClass } from "@/lib/cmsStyle";

interface FeaturesSectionProps {
  surface?: SectionSurface;
}

const DEFAULT_FEATURES = [
  {
    icon: Layers,
    title: "Всё в одном месте",
    description: "Поиск, бронирование и оплата за минуты",
    fullDescription:
      "TudaSuda объединяет все необходимые функции для путешествий в одном удобном интерфейсе. Вы можете найти билеты, выбрать места, оплатить заказ и получить электронные билеты — всё это без перехода на другие сайты. Наш сервис работает с ж/д, авиа и автобусными перевозчиками, предоставляя единую точку доступа ко всем видам транспорта.",
    gradient: "from-blue-500 to-cyan-400",
    bgGradient: "from-blue-50 to-cyan-50",
    iconBg: "bg-blue-500",
  },
  {
    icon: Shield,
    title: "Лучшая цена",
    description: "Гарантируем выгодные тарифы без скрытых платежей",
    fullDescription:
      "Мы сравниваем цены со всех доступных источников и гарантируем, что вы получите лучшую цену на рынке. Прозрачные тарифы без скрытых комиссий и дополнительных платежей. Если вы найдёте дешевле на другом сайте — мы вернём разницу. Наша система автоматически отслеживает изменения цен и предлагает наиболее выгодные варианты.",
    gradient: "from-purple-500 to-pink-400",
    bgGradient: "from-purple-50 to-pink-50",
    iconBg: "bg-purple-500",
  },
  {
    icon: Headphones,
    title: "Поддержка 24/7",
    description: "Помогаем в любое время, отвечаем за 2 минуты",
    fullDescription:
      "Наша служба поддержки работает круглосуточно, семь дней в неделю. Мы помогаем с бронированием, изменениями, возвратами и любыми вопросами. Среднее время ответа — менее 2 минут. С нами можно связаться через чат, телефон или email. Наши специалисты всегда готовы помочь вам с любыми вопросами, связанными с путешествиями.",
    gradient: "from-orange-500 to-red-400",
    bgGradient: "from-orange-50 to-red-50",
    iconBg: "bg-orange-500",
  },
  {
    icon: FileText,
    title: "Электронные билеты",
    description: "Мгновенная выдача и быстрая регистрация",
    fullDescription:
      "Получите электронные билеты мгновенно после оплаты. Не нужно ждать доставки или идти в кассу — билеты приходят на вашу почту и сохраняются в личном кабинете. Быстрая регистрация на рейс прямо через наш сервис. Все документы хранятся в безопасном облачном хранилище, доступ к которому у вас есть в любое время.",
    gradient: "from-green-500 to-emerald-400",
    bgGradient: "from-green-50 to-emerald-50",
    iconBg: "bg-green-500",
  },
  {
    icon: MapPin,
    title: "Готовые маршруты",
    description: "Проверенные маршруты по всей России",
    fullDescription:
      "Мы предлагаем готовые маршруты по регионам России, которые были проверены тревел-блогерами и журналистами. Каждый маршрут включает подробную информацию о достопримечательностях, удобствах и советы от опытных путешественников. Вы можете выбрать готовый маршрут или создать свой собственный на основе наших рекомендаций.",
    gradient: "from-indigo-500 to-blue-400",
    bgGradient: "from-indigo-50 to-blue-50",
    iconBg: "bg-indigo-500",
  },
  {
    icon: BookOpen,
    title: "Путеводители",
    description: "Подробные обзоры городов и достопримечательностей",
    fullDescription:
      "Подробные путеводители с обзорами городов и достопримечательностей помогут вам спланировать идеальное путешествие. Мы собрали информацию о лучших местах для посещения, ресторанах, отелях и развлечениях. Наши путеводители регулярно обновляются и содержат актуальную информацию от местных экспертов и путешественников.",
    gradient: "from-pink-500 to-rose-400",
    bgGradient: "from-pink-50 to-rose-50",
    iconBg: "bg-pink-500",
  },
] as const;

type FeatureCard = {
  icon: (typeof DEFAULT_FEATURES)[number]["icon"];
  title: string;
  description: string;
  fullDescription: string;
  gradient: string;
  bgGradient: string;
  iconBg: string;
  bgColor?: string;
  iconBgColor?: string;
  titleColor?: string;
  descriptionColor?: string;
};

const FeaturesSection = ({ surface = "brand" }: FeaturesSectionProps) => {
  const f = usePageSectionFields<FeaturesFields>("features");
  const sectionTitle = f.title || "Почему выбирают TudaSuda?";
  const sectionSubtitle = f.subtitle || "Всё для комфортного путешествия туда и обратно";

  const features: FeatureCard[] = DEFAULT_FEATURES.map((def, i) => {
    const cms = f.items?.[i];
    return {
      icon: def.icon,
      title: cms?.title || def.title,
      description: cms?.description || def.description,
      fullDescription: cms?.fullDescription || def.fullDescription,
      gradient: def.gradient,
      bgGradient: def.bgGradient,
      iconBg: def.iconBg,
      bgColor: cms?.bgColor,
      iconBgColor: cms?.iconBgColor,
      titleColor: cms?.titleColor,
      descriptionColor: cms?.descriptionColor,
    };
  });

  const [selectedFeature, setSelectedFeature] = useState<FeatureCard | null>(null);
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isMobile) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMobile, features.length]);

  return (
    <CmsEditable sectionId="features">
      <section id="features-section" className={sectionShellClass(surface, "pt-16 pb-0 md:py-24")}>
        {surface === "brand" && (
          <div className="absolute inset-0 pointer-events-none hidden lg:block z-0">
            <div
              className="absolute rounded-full blur-3xl"
              style={{
                width: "400px",
                height: "400px",
                left: "-150px",
                top: "calc(50% - 30px)",
                transform: "translateY(-50%)",
                background: "#F9B84F",
                opacity: 0.3,
              }}
            />
            <div
              className="absolute rounded-full blur-3xl"
              style={{
                width: "400px",
                height: "400px",
                right: "-100px",
                top: "calc(50% + 30px)",
                transform: "translateY(-50%)",
                background: "#F9B84F",
                opacity: 0.3,
              }}
            />
          </div>
        )}

        <div className="container relative z-10">
          <div className="text-center mb-12 md:mb-16 space-y-3">
            <h2
              className={cmsHeadingClass(
                f.titleColor,
                "heading-gradient text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
              )}
              style={cmsColorStyle(f.titleColor)}
            >
              {sectionTitle}
            </h2>
            <p
              className={cn("text-base md:text-lg max-w-2xl mx-auto", sectionLeadClass(surface))}
              style={cmsColorStyle(f.subtitleColor)}
            >
              {sectionSubtitle}
            </p>
          </div>

          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2">
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
                  !feature.bgColor && `bg-gradient-to-br ${feature.bgGradient}`
                )}
                style={feature.bgColor ? { background: feature.bgColor } : undefined}
              >
                <div
                  className={cn(
                    "absolute inset-0 rounded-3xl opacity-0",
                    "group-hover:opacity-100 transition-opacity duration-500",
                    "bg-white/60 backdrop-blur-sm",
                    "-top-6 -bottom-6 -left-6 -right-6",
                    "z-[-1]"
                  )}
                ></div>

                <div className="mb-8 relative">
                  <div
                    className={cn(
                      "w-20 h-20 rounded-2xl flex items-center justify-center",
                      "shadow-lg group-hover:shadow-xl",
                      "transition-all duration-300",
                      "group-hover:scale-110 group-hover:rotate-3",
                      !feature.iconBgColor && feature.iconBg,
                      "relative z-10"
                    )}
                    style={feature.iconBgColor ? { background: feature.iconBgColor } : undefined}
                  >
                    <feature.icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                  </div>
                  <div
                    className={cn(
                      "absolute top-0 left-0 right-0 bottom-0 rounded-2xl blur-xl opacity-0",
                      "group-hover:opacity-50 transition-opacity duration-300",
                      `bg-gradient-to-br ${feature.gradient}`,
                      "-top-2 -left-2 -right-2 -bottom-36"
                    )}
                  ></div>
                </div>

                <h3
                  className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300"
                  style={cmsColorStyle(feature.titleColor)}
                >
                  {feature.title}
                </h3>

                <p
                  className="text-muted-foreground text-base md:text-lg leading-relaxed"
                  style={cmsColorStyle(feature.descriptionColor)}
                >
                  {feature.description}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl"></div>
              </div>
            ))}
          </div>

          <div className="sm:hidden relative overflow-hidden px-2">
            <div className="relative w-full overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedFeature(feature)}
                    className={cn(
                      "flex-shrink-0 w-full",
                      "group relative rounded-3xl p-8",
                      "border-2 border-transparent",
                      "cursor-pointer",
                      !feature.bgColor && `bg-gradient-to-br ${feature.bgGradient}`
                    )}
                    style={feature.bgColor ? { background: feature.bgColor } : undefined}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 rounded-3xl opacity-0",
                        "group-active:opacity-100 transition-opacity duration-500",
                        "bg-white/60 backdrop-blur-sm",
                        "-top-6 -bottom-6 -left-6 -right-6",
                        "z-[-1]"
                      )}
                    ></div>

                    <div className="mb-8 relative">
                      <div
                        className={cn(
                          "w-20 h-20 rounded-2xl flex items-center justify-center",
                          "shadow-lg",
                          "transition-all duration-300",
                          !feature.iconBgColor && feature.iconBg,
                          "relative z-10"
                        )}
                        style={feature.iconBgColor ? { background: feature.iconBgColor } : undefined}
                      >
                        <feature.icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>
                      <div
                        className={cn(
                          "absolute top-0 left-0 right-0 bottom-0 rounded-2xl blur-xl opacity-30",
                          `bg-gradient-to-br ${feature.gradient}`,
                          "-top-2 -left-2 -right-2 -bottom-36"
                        )}
                      ></div>
                    </div>

                    <h3
                      className="text-2xl font-bold text-foreground mb-4"
                      style={cmsColorStyle(feature.titleColor)}
                    >
                      {feature.title}
                    </h3>

                    <p
                      className="text-muted-foreground text-base leading-relaxed"
                      style={cmsColorStyle(feature.descriptionColor)}
                    >
                      {feature.description}
                    </p>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-b-3xl"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-4 mb-4">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    if (intervalRef.current) {
                      clearInterval(intervalRef.current);
                    }
                    intervalRef.current = setInterval(() => {
                      setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
                    }, 3000);
                  }}
                  className={carouselDotClass(surface, index === currentIndex)}
                  aria-label={`Перейти к карточке ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <Dialog open={!!selectedFeature} onOpenChange={(open) => !open && setSelectedFeature(null)}>
          <DialogContent className="max-w-2xl">
            {selectedFeature && (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center",
                        "shadow-lg",
                        !selectedFeature.iconBgColor && selectedFeature.iconBg
                      )}
                      style={
                        selectedFeature.iconBgColor
                          ? { background: selectedFeature.iconBgColor }
                          : undefined
                      }
                    >
                      <selectedFeature.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                    <DialogTitle
                      className="text-2xl md:text-3xl"
                      style={cmsColorStyle(selectedFeature.titleColor)}
                    >
                      {selectedFeature.title}
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <DialogDescription
                  className="text-base leading-relaxed text-foreground"
                  style={cmsColorStyle(selectedFeature.descriptionColor)}
                >
                  {selectedFeature.fullDescription}
                </DialogDescription>
              </>
            )}
          </DialogContent>
        </Dialog>
      </section>
    </CmsEditable>
  );
};

export default FeaturesSection;
