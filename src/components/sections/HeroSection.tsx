import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plane, Train, Bus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import heroImage from "@/assets/images/transport/samoletzxc.png";
import { cn } from "@/lib/utils";
import { usePageSectionFields } from "@/contexts/PageCmsContext";
import { mediaOrFallback } from "@/lib/pageContentMerge";
import type { HeroFields } from "@/types/pageContent";
import { CmsEditable } from "@/components/cms/CmsEditable";
import { cmsColorStyle } from "@/lib/cmsStyle";
import FlightSearchForm from "@/components/flight/FlightSearchForm";
import WhiteLabelBusPortal from "@/components/WhiteLabelBusPortal";

type TravelType = "train" | "flight" | "bus";

const BUS_MODE: "inline" | "redirect" = "inline";
const BUS_PORTAL_URL = "https://trainandbus.ts-trip.ru/";

function renderAnimatedTitle(text: string) {
  const animationDuration = 0.23;
  const words = text.split(/\s+/).filter(Boolean);
  const totalLetters = words.reduce((acc, w) => acc + w.length, 0);
  const totalCycleDuration = totalLetters * animationDuration;

  let letterIndex = 0;

  return (
    <>
      {words.map((word, wordIdx) => {
        const wordNode = (
          <span key={`w-${wordIdx}`} className="inline-block whitespace-nowrap">
            {word.split("").map((letter, idx) => {
              const delay = letterIndex * animationDuration;
              letterIndex += 1;
              return (
                <span
                  key={`l-${idx}`}
                  className="inline-block"
                  style={{
                    animation: `letterWave ${totalCycleDuration}s ease-in-out ${delay}s infinite`,
                    animationFillMode: "both",
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </span>
        );
        return wordIdx < words.length - 1 ? (
          <span key={`sp-${wordIdx}`}>
            {wordNode}
            {" "}
          </span>
        ) : (
          wordNode
        );
      })}
    </>
  );
}

const HeroSection = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const hero = usePageSectionFields<HeroFields>("hero");
  const titleText = hero.title || "Путешествие это легко!";
  const titleColor = hero.titleColor;
  const heroSrc = mediaOrFallback(hero.videoFlight, heroImage);

  const location = useLocation();
  const [travelType, setTravelType] = useState<TravelType>("flight");
  const [tripType, setTripType] = useState<"round" | "one">("round");

  // Если пришли с location.state.travelType — переключаем вкладку
  useEffect(() => {
    const state = location.state as { travelType?: "flight" | "bus" } | null;
    if (state?.travelType) {
      setTravelType(state.travelType);
      // Чистим state из history, чтобы при F5 не залипало
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleBusClick = () => {
    if (BUS_MODE === "redirect") {
      window.location.href = BUS_PORTAL_URL;
      return;
    }
    setTravelType("bus");
  };

  return (
    <CmsEditable sectionId="hero">
      <section id="hero-section" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            key={heroSrc}
            src={heroSrc}
            alt=""
            className={cn(
              "w-full h-full object-cover",
              "object-[75%_30%] md:object-[center_30%]"
            )}
            style={{ height: "120%", transform: "translateY(-10%)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1
                className={cn(
                  "font-extrabold text-5xl md:text-6xl leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]",
                  !titleColor?.trim() && "text-white"
                )}
                style={cmsColorStyle(titleColor)}
              >
                {titleColor?.trim() ? titleText : renderAnimatedTitle(titleText)}
              </h1>
            </div>

            <div
              ref={formRef}
              className="bg-black/40 backdrop-blur-xl rounded-lg ring-1 ring-white/10 ring-offset-0 p-4 md:p-5 space-y-4"
            >
              <div className="w-full pb-3 border-b border-white/10">
                <div className="flex items-center justify-between w-full gap-2 flex-wrap">
                  <div className="flex items-center gap-1 bg-white/10 p-1 rounded-md flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => setTravelType("flight")}
                      aria-label="Авиабилеты"
                      className={cn(
                        "flex items-center justify-center h-9 px-2 md:px-3 rounded-md transition-all gap-2",
                        travelType === "flight"
                          ? "bg-gradient-to-r from-[#0B5FD9] via-[#0A8FE8] to-[#0FB5F0] text-white shadow-sm"
                          : "text-white/70 hover:text-white"
                      )}
                    >
                      <Plane className="h-5 w-5" />
                      <span className="hidden md:inline text-sm font-medium">
                        Авиабилеты
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleBusClick}
                      aria-label="Поезда и автобусы"
                      className={cn(
                        "flex items-center justify-center h-9 px-2 md:px-3 rounded-md transition-all",
                        travelType === "bus"
                          ? "bg-gradient-to-r from-[#0B5FD9] via-[#0A8FE8] to-[#0FB5F0] text-white shadow-sm"
                          : "text-white/70 hover:text-white"
                      )}
                    >
                      <span className="flex items-center gap-1">
                        <Train className="h-5 w-5" />
                        <span className="hidden md:inline text-sm font-medium">
                          Поезда
                        </span>
                      </span>
                      <span className="mx-1 text-white/40">/</span>
                      <span className="flex items-center gap-1">
                        <Bus className="h-5 w-5" />
                        <span className="hidden md:inline text-sm font-medium">
                          Автобусы
                        </span>
                      </span>
                    </button>
                  </div>

                  <div
                    className={cn(
                      "flex items-center gap-2 flex-1 justify-end min-w-0",
                      travelType !== "flight" && "invisible"
                    )}
                  >
                    <div className="hidden md:flex items-center gap-1 rounded-md p-1 bg-white/10 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => setTripType("round")}
                        className={cn(
                          "px-4 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap",
                          tripType === "round"
                            ? "bg-gradient-to-r from-[#0B5FD9] via-[#0A8FE8] to-[#0FB5F0] text-white shadow-sm"
                            : "text-white/70 hover:text-white/90"
                        )}
                      >
                        Туда — Обратно
                      </button>
                      <button
                        type="button"
                        onClick={() => setTripType("one")}
                        className={cn(
                          "px-4 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap",
                          tripType === "one"
                            ? "bg-gradient-to-r from-[#0B5FD9] via-[#0A8FE8] to-[#0FB5F0] text-white shadow-sm"
                            : "text-white/70 hover:text-white/90"
                        )}
                      >
                        В одну сторону
                      </button>
                    </div>

                    <div className="md:hidden flex-1 min-w-0 max-w-[180px]">
                      <Select
                        value={tripType}
                        onValueChange={(v) => setTripType(v as "round" | "one")}
                      >
                        <SelectTrigger className="w-full h-10 bg-white/10 border-white/20 text-white [&>svg]:text-white">
                          <SelectValue placeholder="Тип поездки" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a2e] border-white/20 text-white">
                          <SelectItem value="round">Туда — Обратно</SelectItem>
                          <SelectItem value="one">В одну сторону</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                {travelType === "flight" && (
                  <FlightSearchForm
                    variant="hero"
                    showTripTypeToggle={false}
                    tripType={tripType}
                  />
                )}
                {travelType === "bus" && <WhiteLabelBusPortal />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </CmsEditable>
  );
};

export default HeroSection;