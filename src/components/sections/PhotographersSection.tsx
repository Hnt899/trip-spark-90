import karelia from "@/assets/images/cities/karelia.jpg";
import type { SectionSurface } from "@/lib/sectionSurface";
import { cn } from "@/lib/utils";
import moscow from "@/assets/images/cities/moscow.jpg";
import stPetersburg from "@/assets/images/cities/saint-petersburg.jpg";
import kazan from "@/assets/images/cities/kazan.jpg";
import novgorod from "@/assets/images/cities/novgorod.jpg";
import armenia from "@/assets/images/cities/armenia.jpg";
import { usePageSectionFields } from "@/contexts/PageCmsContext";
import { mediaOrFallback } from "@/lib/pageContentMerge";
import { cmsColorStyle, cmsHeadingClass } from "@/lib/cmsStyle";
import type { PhotographersFields } from "@/types/pageContent";
import { CmsEditable } from "@/components/cms/CmsEditable";

interface Photographer {
  name: string;
  handle: string;
  avatar: string;
  image: string;
  href?: string;
}

const FALLBACK_PHOTOGRAPHERS: Photographer[] = [
  {
    name: "Андрей Белавин",
    handle: "@ted.ns",
    avatar: "https://i.pravatar.cc/150?img=13",
    image: karelia,
  },
  {
    name: "Сергей Шандин",
    handle: "@pictotravel",
    avatar: "https://i.pravatar.cc/150?img=14",
    image: moscow,
  },
  {
    name: "Георгий Шпикалов",
    handle: "@george_shpikalov",
    avatar: "https://i.pravatar.cc/150?img=15",
    image: stPetersburg,
  },
  {
    name: "Сергей Крылов",
    handle: "@skrylov_official",
    avatar: "https://i.pravatar.cc/150?img=16",
    image: kazan,
  },
  {
    name: "Константин Парфеньев",
    handle: "@parfenevk",
    avatar: "https://i.pravatar.cc/150?img=17",
    image: novgorod,
  },
  {
    name: "Дмитрий Огнев",
    handle: "@timonich",
    avatar: "https://i.pravatar.cc/150?img=18",
    image: armenia,
  },
];

const ANIMATION_DURATION = 30;
const CARD_WIDTH = 240;
const CARD_GAP = 24;

function PhotographerCard({
  photographer,
  surface,
}: {
  photographer: Photographer;
  surface: SectionSurface;
}) {
  const href = photographer.href?.trim();
  const open = () => {
    if (!href) return;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={cn("flex-shrink-0 group", href ? "cursor-pointer" : "cursor-default")}
      style={{
        width: `${CARD_WIDTH}px`,
        marginRight: `${CARD_GAP}px`,
      }}
      onClick={open}
      onKeyDown={(e) => {
        if (!href) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      role={href ? "link" : undefined}
      tabIndex={href ? 0 : undefined}
    >
      <div
        className={cn(
          "relative h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105",
          surface === "light"
            ? "border-2 border-[#867DFF]/35 bg-white"
            : "border border-white/10 bg-white/5 backdrop-blur-sm"
        )}
      >
        <img
          src={photographer.image}
          alt={photographer.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-white text-sm font-semibold truncate">{photographer.name}</div>
          <div className="text-white/70 text-xs truncate">{photographer.handle}</div>
        </div>
      </div>
    </div>
  );
}

const PhotographersSection = ({ surface = "brand" }: { surface?: SectionSurface }) => {
  const f = usePageSectionFields<PhotographersFields>("photographers");
  const eyebrow = f.eyebrow || "Photographers";
  const title = f.title || "Наши фотографы";
  const subtitle =
    f.subtitle ||
    "Живые кадры, реальная Россия и авторские точки зрения — выбирай, чьи фото вдохновляют.";

  const cmsItems = Array.isArray(f.items) ? f.items : [];
  const photographers: Photographer[] =
    cmsItems.length > 0
      ? cmsItems.map((item, i) => {
          const fallback = FALLBACK_PHOTOGRAPHERS[i];
          return {
            name: item.name || fallback?.name || "",
            handle: item.handle || fallback?.handle || "",
            avatar: mediaOrFallback(item.avatar, fallback?.avatar ?? ""),
            image: mediaOrFallback(item.image, fallback?.image ?? ""),
            href: item.href,
          };
        })
      : FALLBACK_PHOTOGRAPHERS;

  const duplicatedPhotographers = [...photographers, ...photographers, ...photographers];

  return (
    <CmsEditable sectionId="photographers">
      <section className="relative py-20 overflow-hidden">
        <div className="container relative z-10">
          <div className="mb-12">
            <div
              className={cn(
                "tracking-[0.28em] text-xs md:text-sm uppercase",
                surface === "light" ? "text-[#867DFF]/70" : "text-white/60"
              )}
              style={cmsColorStyle(f.eyebrowColor)}
            >
              {eyebrow}
            </div>
            <h2
              className={cmsHeadingClass(
                f.titleColor,
                cn(
                  "text-3xl md:text-4xl lg:text-5xl font-bold mt-2",
                  surface === "light" ? "heading-gradient" : "text-white"
                )
              )}
              style={cmsColorStyle(f.titleColor)}
            >
              {title}
            </h2>
            <p
              className={cn(
                "mt-3 max-w-2xl",
                surface === "light" ? "text-[#3F3F7F]/80" : "text-white/75"
              )}
              style={cmsColorStyle(f.subtitleColor)}
            >
              {subtitle}
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden mb-6">
          <div
            className="flex marquee-right"
            style={{
              width: "fit-content",
              animationDuration: `${ANIMATION_DURATION}s`,
            }}
          >
            {duplicatedPhotographers.map((photographer, index) => (
              <PhotographerCard
                key={`top-${index}`}
                photographer={photographer}
                surface={surface}
              />
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex marquee-left"
            style={{
              width: "fit-content",
              animationDuration: `${ANIMATION_DURATION}s`,
            }}
          >
            {duplicatedPhotographers.map((photographer, index) => (
              <PhotographerCard
                key={`bottom-${index}`}
                photographer={photographer}
                surface={surface}
              />
            ))}
          </div>
        </div>
      </section>
    </CmsEditable>
  );
};

export default PhotographersSection;
