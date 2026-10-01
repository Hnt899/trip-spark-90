import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plane, Train, Bus } from "lucide-react";
import { useRef, useState } from "react";
import heroImage from "@/assets/images/transport/samoletzxc.png";
import { cn } from "@/lib/utils";
import { usePageSectionFields } from "@/contexts/PageCmsContext";
import { mediaOrFallback } from "@/lib/pageContentMerge";
import type { HeroFields } from "@/types/pageContent";
import { CmsEditable } from "@/components/cms/CmsEditable";
import { cmsColorStyle } from "@/lib/cmsStyle";
import FlightSearchForm from "@/components/flight/FlightSearchForm";

// URL поддомена с White Label для автобусов/поездов
const BUS_PORTAL_URL = "https://trainandbus.ts-trip.ru/";

const HeroSection = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const hero = usePageSectionFields<HeroFields>("hero");
  const titleText = hero.title || "Путешествие это легко!";
  const titleColor = hero.titleColor;
  const heroSrc = mediaOrFallback(hero.videoFlight, heroImage);

  const [travelType, setTravelType] = useState<"flight" | "bus">("flight");
  const [tripType, setTripType] = useState<"round" | "one">("round");

  return (
    <CmsEditable sectionId="hero">
      <section id="hero-section" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Фон */}
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
            {/* H1 */}
            <div className="text-center mb-12">
              <h1
                className={cn(
                  "font-extrabold text-5xl md:text-6xl leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]",
                  !titleColor?.trim() && "text-white"
                )}
                style={cmsColorStyle(titleColor)}
              >
                {titleColor?.trim()
                  ? titleText
                  : (() => {
                      const text = titleText;
                      const letters = text.split("");
                      const animationDuration = 0.23;
                      const totalCycleDuration = letters.length * animationDuration;
                      const spaceIdx = text.indexOf(" ");
                      const firstWordEnd =
                        spaceIdx > 0 ? spaceIdx : Math.min(text.length, 12);

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
                    })()}
              </h1>
            </div>

            {/* Форма поиска */}
            <div
              ref={formRef}
              className="bg-black/40 backdrop-blur-xl rounded-lg ring-1 ring-white/10 ring-offset-0 p-4 md:p-5 space-y-4"
            >
              {/* ===== ВЕРХНЯЯ СТРОКА: ДВЕ КНОПКИ ===== */}
              <div className="w-full pb-3 border-b border-white/10">
                <div className="flex items-center justify-between w-full gap-2 flex-wrap">
                  {/* Левая часть: кнопка «Авиабилеты» + кнопка «Поезда/Автобусы» */}
                  <div className="flex items-center gap-1 bg-white/10 p-1 rounded-md flex-shrink-0">
                    {/* Кнопка 1: Авиабилеты */}
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

                    {/* Кнопка 2: Поезда/Автобусы — редирект на поддомен */}
                    <button
                      type="button"
                      onClick={() => {
                        window.location.href = BUS_PORTAL_URL;
                      }}
                      aria-label="Поезда и автобусы"
                      className={cn(
                        "flex items-center justify-center h-9 px-2 md:px-3 rounded-md transition-all",
                        "text-white/70 hover:text-white"
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

                  {/* Правая часть: переключатели (только для авиабилетов) */}
                  <div
                    className={cn(
                      "flex items-center gap-2 flex-1 justify-end min-w-0",
                      travelType !== "flight" && "invisible"
                    )}
                  >
                    {/* Десктоп */}
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

                    {/* Мобилка */}
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

              {/* ===== НИЖНЯЯ ЧАСТЬ: ФОРМА АВИАБИЛЕТОВ ===== */}
              <div className="mt-4">
                <FlightSearchForm
                  variant="hero"
                  showTripTypeToggle={false}
                  tripType={tripType}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </CmsEditable>
  );
};

export default HeroSection;