import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Train, Plane, Bus } from "lucide-react";
import { useRef, useState } from "react";
import trainVideo from "@/assets/video/поезд.mp4";
import flightVideo from "@/assets/video/самолёт новый.mp4";
import busVideo from "@/assets/video/автобус.mp4";
import { cn } from "@/lib/utils";
import { usePageSectionFields } from "@/contexts/PageCmsContext";
import { mediaOrFallback } from "@/lib/pageContentMerge";
import type { HeroFields } from "@/types/pageContent";
import { CmsEditable } from "@/components/cms/CmsEditable";
import { cmsColorStyle } from "@/lib/cmsStyle";
import FlightSearchForm from "@/components/flight/FlightSearchForm";

type TravelType = "train" | "flight" | "bus";

const HeroSection = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const hero = usePageSectionFields<HeroFields>("hero");
  const titleText = hero.title || "Путешествие это легко!";
  const titleColor = hero.titleColor;
  const trainSrc = mediaOrFallback(hero.videoTrain, trainVideo);
  const flightSrc = mediaOrFallback(hero.videoFlight, flightVideo);
  const busSrc = mediaOrFallback(hero.videoBus, busVideo);
  const travelType: TravelType = "flight";

  // ===== СОСТОЯНИЕ ДЛЯ ПЕРЕКЛЮЧАТЕЛЯ =====
  const [tripType, setTripType] = useState<"round" | "one">("round");

  return (
    <CmsEditable sectionId="hero">
      <section id="hero-section" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Фон с видео и затемнением под формой */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            key={flightSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-top"
            style={{
              objectPosition: "center 30%",
              height: "120%",
              transform: "translateY(-10%)",
            }}
          >
            <source src={flightSrc} type="video/mp4" />
          </video>
          {/* Затемнение фона под формой */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="max-w-4xl mx-auto">
            {/* H1 */}
            <div className="text-center mb-12">
              <h1
                className={cn(
                  "font-extrabold text-5xl md:text-6xl leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]",
                  !titleColor?.trim() && "text-white"
                )}
                style={cmsColorStyle(titleColor)}
              >
                {titleColor?.trim() ? (
                  titleText
                ) : (
                  (() => {
                    const text = titleText;
                    const letters = text.split("");
                    const animationDuration = 0.23;
                    const totalCycleDuration = letters.length * animationDuration;
                    const spaceIdx = text.indexOf(" ");
                    const firstWordEnd = spaceIdx > 0 ? spaceIdx : Math.min(text.length, 12);

                    return (
                      <>
                        <span className="whitespace-nowrap inline-block">
                          {letters.slice(0, firstWordEnd).map((letter, index) => {
                            const delay = index * animationDuration;
                            return (
                              <span
                                key={index}
                                className="inline-block"
                                style={{
                                  animation: `letterWave ${totalCycleDuration}s ease-in-out ${delay}s infinite`,
                                  animationFillMode: "both",
                                }}
                              >
                                {letter === " " ? "\u00A0" : letter}
                              </span>
                            );
                          })}
                        </span>
                        {letters.slice(firstWordEnd).map((letter, index) => {
                          const delay = (firstWordEnd + index) * animationDuration;
                          return (
                            <span
                              key={firstWordEnd + index}
                              className="inline-block"
                              style={{
                                animation: `letterWave ${totalCycleDuration}s ease-in-out ${delay}s infinite`,
                                animationFillMode: "both",
                              }}
                            >
                              {letter === " " ? "\u00A0" : letter}
                            </span>
                          );
                        })}
                      </>
                    );
                  })()
                )}
              </h1>
            </div>

            {/* Форма поиска — только авиа (поезда и автобусы скрыты) */}
            <div ref={formRef} className="bg-black/40 backdrop-blur-xl rounded-lg ring-1 ring-white/10 ring-offset-0 p-4 md:p-5 space-y-4">
              <Tabs value={travelType} defaultValue="flight" className="w-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 pb-3 border-b border-white/10">
                  {/* ===== ОДНА СТРОКА: Кнопка "Авиабилеты" + Переключатель ===== */}
                  <div className="flex items-center justify-between w-full">
                    {/* Кнопка "Авиабилеты" (только одна!) */}
                    <TabsList className="flex items-center gap-1 bg-white/10 p-1 h-10">
                    <TabsTrigger
  value="flight"
  className="flex items-center justify-center text-sm font-medium px-3 py-1.5 rounded-md bg-gradient-to-r from-[#100877] to-[#887BFF] text-white shadow-sm whitespace-nowrap"
  style={{ color: 'white' }}
>
  <Plane className="h-5 w-5 mr-2" />
  Авиабилеты
</TabsTrigger>
                      <TabsTrigger value="train" className="hidden" aria-hidden>
                        <Train className="h-5 w-5" />
                      </TabsTrigger>
                      <TabsTrigger value="bus" className="hidden" aria-hidden>
                        <Bus className="h-5 w-5" />
                      </TabsTrigger>
                    </TabsList>

                    {/* Переключатель "Туда — суда / В одну сторону" - только для десктопа */}
                    <div className="hidden md:inline-flex items-center gap-1 rounded-md p-1 bg-white/10">
                      <button
                        type="button"
                        onClick={() => setTripType("round")}
                        className={cn(
                          "px-4 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap",
                          tripType === "round"
                            ? "bg-white/20"
                            : "text-white/70 hover:text-white"
                        )}
                      >
                        <span style={{ color: tripType === "round" ? "#100877" : "white" }}>Туда</span>
                        <span style={{ color: tripType === "round" ? "#887BFF" : "white" }}> — суда</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => { setTripType("one"); }}
                        className={cn(
                          "px-4 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap",
                          tripType === "one"
                            ? "bg-white/20 text-white"
                            : "text-white/70 hover:text-white"
                        )}
                      >
                        В одну сторону
                      </button>
                    </div>

                    {/* Dropdown для мобильной версии */}
                    <div className="md:hidden">
                      <Select value={tripType} onValueChange={(v) => setTripType(v as "round" | "one")}>
                        <SelectTrigger className="h-10 w-[180px] bg-white/10 border-white/20 text-white [&>svg]:text-white">
                          <SelectValue placeholder="Тип поездки" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a2e] border-white/20 text-white">
                          <SelectItem value="round">Туда — суда</SelectItem>
                          <SelectItem value="one">В одну сторону</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <TabsContent value="train" className="hidden" aria-hidden />
                <TabsContent value="flight" className="mt-0">
                  <FlightSearchForm 
                    variant="hero" 
                    showTripTypeToggle={false}
                    tripType={tripType}
                  />
                </TabsContent>
                <TabsContent value="bus" className="hidden" aria-hidden />
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </CmsEditable>
  );
};

export default HeroSection;