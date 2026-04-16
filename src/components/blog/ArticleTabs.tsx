import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Link2 } from "lucide-react";
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

  return (
    <nav
      className={cn(
        "sticky top-[var(--site-header-height)] z-20 -mx-4 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-800 dark:bg-background/95 md:-mx-6 md:px-6",
        className,
      )}
    >
      <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-violet-500/5 to-transparent p-3 shadow-sm">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary/80">
          <Link2 className="h-3.5 w-3.5" />
          Навигация по статье
        </div>
        <div className="grid gap-2">
          {headings.map((h, i) => (
            <button
              key={h.index}
              onClick={() => scrollToHeading(i)}
              className={cn(
                "w-full rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                active === i
                  ? "border-primary/40 bg-primary text-primary-foreground"
                  : "border-slate-200 bg-white/80 text-slate-700 hover:border-primary/30 hover:bg-primary/5 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200",
              )}
            >
              {h.text}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export { slugFromText, extractH1Headings };
