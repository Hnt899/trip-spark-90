import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import instaImage from "@/assets/images/people/insta.jpg";
import { usePageSectionFields } from "@/contexts/PageCmsContext";
import { mediaOrFallback } from "@/lib/pageContentMerge";
import { cmsColorStyle } from "@/lib/cmsStyle";
import type { ProcessFields } from "@/types/pageContent";
import { CmsEditable } from "@/components/cms/CmsEditable";

const ProcessSection = () => {
  const f = usePageSectionFields<ProcessFields>("process");
  const title =
    f.title ||
    "Мы анализируем пользователей, общаемся с блогерами, чтобы собирать только лучшие маршруты";
  const paragraph =
    f.paragraph ||
    "Хотите узнавать о новых трендах раньше всех? Подписывайтесь на наш Instagram!";
  const ctaLabel = f.ctaLabel || "Перейти в Instagram";
  const ctaHref = f.ctaHref || "https://instagram.com/tudasuda";
  const imageSrc = mediaOrFallback(f.image, instaImage);
  const bottomText =
    f.bottomText ||
    "Если у вас было яркое путешествие, пишите нам в Instagram, и мы можем сделать про вас блог или сделать из вашего маршрута статью.";

  const openCta = () => {
    if (!ctaHref.trim()) return;
    window.open(ctaHref, "_blank", "noopener,noreferrer");
  };

  return (
    <CmsEditable sectionId="process">
      <section className="py-20 relative overflow-visible">
        <div className="container space-y-8 relative z-10">
          <div className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-8 shadow-xl">
            <div className="flex-1 w-full lg:w-auto">
              <h3
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#3F3F7F] mb-4 leading-tight"
                style={cmsColorStyle(f.titleColor)}
              >
                {title}
              </h3>
              <p
                className="text-lg text-[#3F3F7F]/80 mb-6 leading-relaxed"
                style={cmsColorStyle(f.paragraphColor)}
              >
                {paragraph}
              </p>
              <Button
                className="h-12 px-8 text-base font-semibold rounded-lg"
                onClick={openCta}
              >
                <Instagram className="w-5 h-5 mr-2" />
                {ctaLabel}
              </Button>
            </div>
            <div className="flex-shrink-0 w-48 h-48 lg:w-64 lg:h-64 relative">
              <div className="w-full h-full rounded-2xl overflow-hidden">
                <img
                  src={imageSrc}
                  alt="Персонаж с телефоном"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="space-y-6">
                <p
                  className="text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed font-medium"
                  style={cmsColorStyle(f.bottomColor)}
                >
                  {bottomText}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </CmsEditable>
  );
};

export default ProcessSection;
