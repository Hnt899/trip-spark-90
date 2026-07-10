import { cn } from "@/lib/utils";
import { usePageCms } from "@/contexts/PageCmsContext";
import type { ReactNode, MouseEvent } from "react";

/** Clickable outline in page CMS edit mode. */
export function CmsEditable({
  sectionId,
  className,
  children,
}: {
  sectionId: string;
  className?: string;
  children: ReactNode;
}) {
  const cms = usePageCms();
  if (!cms?.editMode) {
    return <>{children}</>;
  }
  const selected = cms.selectedSectionId === sectionId;
  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    cms.setSelectedSectionId(sectionId);
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          cms.setSelectedSectionId(sectionId);
        }
      }}
      className={cn(
        "relative outline outline-2 outline-offset-2 transition-colors",
        selected
          ? "outline-[#867DFF] bg-[#867DFF]/5"
          : "outline-transparent hover:outline-[#867DFF]/60",
        className
      )}
      data-cms-section={sectionId}
    >
      {children}
      <span className="pointer-events-none absolute right-2 top-2 z-50 rounded bg-[#100A6F] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white opacity-90">
        {sectionId}
      </span>
    </div>
  );
}
