import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { expandRichParagraphBlocks } from "@/lib/blogBodyExpand";
import type { BlogContentBlock } from "@/types/blogContent";
export interface AnchorItem {
  text: string;
  index: number;
  id: string;
}

function stripHtml(text: string) {
  return text.replace(/<[^>]*>/g, "").trim();
}

export function extractAnchors(blocks: BlogContentBlock[]): AnchorItem[] {
  const expanded = expandRichParagraphBlocks(blocks);
  const manual: AnchorItem[] = [];
  expanded.forEach((block, blockIndex) => {
    if (
      (block.type === "paragraph" || block.type === "heading") &&
      block.anchor
    ) {
      const plain =
        block.anchorLabel?.trim() ||
        stripHtml(block.type === "paragraph" ? block.text : block.text);
      if (!plain) return;
      manual.push({
        text: plain,
        index: blockIndex,
        id: `anchor-${blockIndex}`,
      });
    }
  });
  if (manual.length > 0) return manual;

  /** Запасной вариант: все заголовки в тексте */
  const headingAnchors: AnchorItem[] = [];
  expanded.forEach((block, blockIndex) => {
    if (block.type === "heading" && block.text.trim()) {
      const plain = stripHtml(block.text);
      if (!plain) return;
      headingAnchors.push({
        text: plain,
        index: blockIndex,
        id: `section-${blockIndex}`,
      });
    }
  });
  return headingAnchors;
}

interface ArticleTocSidebarProps {
  blocks: BlogContentBlock[];
  className?: string;
  variant?: "sidebar" | "top";
}

export default function ArticleTocSidebar({
  blocks,
  className,
  variant = "sidebar",
}: ArticleTocSidebarProps) {
  const anchors = useMemo(() => extractAnchors(blocks), [blocks]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (anchors.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = anchors.findIndex((a) => a.id === entry.target.id);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0.1 },
    );

    anchors.forEach((a) => {
      const el = document.getElementById(a.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [anchors]);

  if (anchors.length === 0) return null;

  const scrollToAnchor = (index: number) => {
    const a = anchors[index];
    const el = document.getElementById(a.id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(index);
    }
  };

  if (variant === "top") {
    return (
      <nav
        className={cn(
          "sticky top-[var(--site-header-height)] z-20 -mx-4 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:-mx-6 md:px-6",
          className,
        )}
      >
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {anchors.map((a, i) => (
            <button
              key={a.id}
              type="button"
              onClick={() => scrollToAnchor(i)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-sm transition-colors",
                active === i
                  ? "border-[#867DFF] bg-[#867DFF]/10 text-[#867DFF]"
                  : "border-slate-200 text-slate-600 hover:border-[#867DFF]/40",
              )}
            >
              {a.text}
            </button>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className={cn("w-[min(100%,11rem)]", className)} aria-label="Навигация по статье">
      <ul className="space-y-6">
        {anchors.map((a, i) => (
          <li key={a.id}>
            <button
              type="button"
              onClick={() => scrollToAnchor(i)}
              className="group flex w-full min-w-0 items-center gap-3 text-left"
            >
              <span
                className={cn(
                  "max-w-[8.5rem] shrink-0 text-sm italic leading-snug transition-colors",
                  active === i ? "font-semibold text-[#867DFF]" : "text-[#867DFF]/85",
                )}
              >
                {a.text}
              </span>
              <span
                className={cn(
                  "h-px min-w-[2.5rem] flex-1 transition-colors",
                  active === i ? "bg-[#867DFF]" : "bg-[#867DFF]/40 group-hover:bg-[#867DFF]/65",
                )}
                aria-hidden
              />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
