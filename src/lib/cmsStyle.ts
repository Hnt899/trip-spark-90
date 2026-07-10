import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";
import { PAGE_CMS_PALETTE } from "@/types/pageContent";

export function cmsColorStyle(color?: string | null): CSSProperties | undefined {
  const c = typeof color === "string" ? color.trim() : "";
  return c ? { color: c } : undefined;
}

/** If custom color set — drop gradient heading class. */
export function cmsHeadingClass(color: string | undefined | null, base: string) {
  const c = typeof color === "string" ? color.trim() : "";
  return c ? base.replace(/heading-gradient/g, "").trim() : base;
}

export function cmsBgStyle(
  bgColor?: string | null,
  image?: string | null
): CSSProperties | undefined {
  const img = typeof image === "string" ? image.trim() : "";
  if (img) {
    return {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.45)), url(${img})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  const c = typeof bgColor === "string" ? bgColor.trim() : "";
  return c ? { background: c } : undefined;
}

export { PAGE_CMS_PALETTE };

export function cnHeading(color: string | undefined | null, ...classes: (string | false | undefined)[]) {
  return cn(cmsHeadingClass(color, cn(...classes)), !color?.trim() && undefined);
}
