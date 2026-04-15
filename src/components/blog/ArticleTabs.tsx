import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogContentBlock } from "@/types/blogContent";

interface ArticleTabsProps {
  blocks: BlogContentBlock[];
  className?: string;
}

function extractH1Headings(blocks: BlogContentBlock[]) {
  const headings: { text: string; index: number }[] = [];
  blocks.forEach((block, i) => {
    if (block.type === "heading" && block.level === 1 && block.text.trim()) {
      const plainText = block.text.replace(/<[^>]*>/g, "").trim();
      headings.push({ text: plainText, index: i });
    }
  });
  return headings;
}

function slugFromText(text: string, index: number) {
  return `h1-${index}-${text
    .toLowerCase()
    .replace(/[^\w\sа-яё-]/gi, "")
    .replace(/\s+/g, "-")
    .slice(0, 60)}`;
}

export default function ArticleTabs({ blocks, className }: ArticleTabsProps) {
  const headings = useMemo(() => extractH1Headings(blocks), [blocks]);
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      setCanScrollLeft(el.scrollLeft > 2);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    };
    check();
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [headings]);

  useEffect(() => {
    if (headings.length < 2) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = headings.findIndex(
              (h) => slugFromText(h.text, h.index) === entry.target.id,
            );
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0.1 },
    );

    headings.forEach((h) => {
      const el = document.getElementById(slugFromText(h.text, h.index));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  const scrollToHeading = (index: number) => {
    const h = headings[index];
    const id = slugFromText(h.text, h.index);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(index);
    }
  };

  const scrollNav = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <nav
      className={cn(
        "sticky top-[var(--site-header-height)] z-20 -mx-4 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-800 dark:bg-background/95 md:-mx-6",
        className,
      )}
    >
      {/* Desktop */}
      <div className="relative hidden md:block">
        {canScrollLeft && (
          <button
            onClick={() => scrollNav("left")}
            className="absolute left-0 top-0 z-10 flex h-full w-8 items-center justify-center bg-gradient-to-r from-white to-transparent dark:from-background"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-1 overflow-x-auto px-4 py-2"
        >
          {headings.map((h, i) => (
            <button
              key={h.index}
              onClick={() => scrollToHeading(i)}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                active === i
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {h.text}
            </button>
          ))}
        </div>
        {canScrollRight && (
          <button
            onClick={() => scrollNav("right")}
            className="absolute right-0 top-0 z-10 flex h-full w-8 items-center justify-center bg-gradient-to-l from-white to-transparent dark:from-background"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Mobile: horizontal scroll with arrows */}
      <div className="relative md:hidden">
        {canScrollLeft && (
          <button
            onClick={() => scrollNav("left")}
            className="absolute left-0 top-0 z-10 flex h-full w-7 items-center justify-center bg-gradient-to-r from-white to-transparent dark:from-background"
          >
            <ChevronLeft className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
        <div
          ref={!scrollRef.current ? scrollRef : undefined}
          className="scrollbar-hide flex gap-1 overflow-x-auto px-3 py-2"
        >
          {headings.map((h, i) => (
            <button
              key={h.index}
              onClick={() => scrollToHeading(i)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-all",
                active === i
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {h.text}
            </button>
          ))}
        </div>
        {canScrollRight && (
          <button
            onClick={() => scrollNav("right")}
            className="absolute right-0 top-0 z-10 flex h-full w-7 items-center justify-center bg-gradient-to-l from-white to-transparent dark:from-background"
          >
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>
    </nav>
  );
}

export { slugFromText, extractH1Headings };
