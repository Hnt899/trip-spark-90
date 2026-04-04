import { cn } from "@/lib/utils";

/** brand — фиолетовый фон (страница маршрутов и т.п.); light — белый фон (главная). */
export type SectionSurface = "brand" | "light";

export const sectionYellowGlow = {
  textShadow:
    "0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6), 0 0 30px rgba(255, 215, 0, 0.4)",
} as const;

/** Цвета логотипа: тёмно-синий и фиолетовый (градиент только из них). */
export const logoGradientText =
  "bg-gradient-to-r from-[#100A6F] via-[#4A3FAD] to-[#8A70F8] bg-clip-text text-transparent";

/** Акцент в заголовке: на светлом — градиент логотипа; на бренде — жёлтый с свечением (через style). */
export function sectionHeadingAccentClass(surface: SectionSurface): string {
  return surface === "light" ? logoGradientText : "text-[#FFD700]";
}

export function sectionHeadingBaseClass(surface: SectionSurface): string {
  return surface === "light" ? "text-slate-900" : "text-white";
}

export function sectionLeadClass(surface: SectionSurface): string {
  return surface === "light" ? "text-neutral-950 dark:text-neutral-100" : "text-white";
}

export function sectionShellClass(surface: SectionSurface, paddingClass: string): string {
  return cn(
    paddingClass,
    "relative overflow-hidden",
    surface === "light" ? "bg-white" : "bg-[#100A6F]/80 backdrop-blur-sm"
  );
}

/** Белые/светлые карточки на белом фоне — тень и обводка. */
export function sectionCardLiftClass(surface: SectionSurface): string {
  return surface === "light"
    ? "shadow-[0_8px_32px_rgba(16,10,111,0.08)] border-slate-200/85 border"
    : "";
}

export function carouselDotClass(surface: SectionSurface, active: boolean): string {
  if (surface === "light") {
    return cn(
      "h-2 rounded-full transition-all duration-300",
      active ? "bg-primary w-8" : "bg-slate-300 w-2"
    );
  }
  return cn(
    "h-2 rounded-full transition-all duration-300",
    active ? "bg-white w-8" : "bg-white/50 w-2"
  );
}
