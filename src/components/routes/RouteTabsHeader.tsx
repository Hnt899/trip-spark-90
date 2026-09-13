import type { RouteTab } from "@/types/blogContent";

type Props = {
  tabs: RouteTab[];
  activeTabId: string;
  onChange: (id: string) => void;
};

export default function RouteTabsHeader({ tabs, activeTabId, onChange }: Props) {
  if (!tabs || tabs.length === 0) {
    return null;
  }

  const allTabs = [
    { id: "__main__", title: "Маршрут" },
    ...tabs.map((t) => ({ id: t.id, title: t.title })),
  ];

  return (
    <div
      className="sticky top-[var(--site-header-height)] z-30 w-full border-b border-white/25"
      style={{
        background: "rgba(134, 125, 255, 0.55)",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
      }}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-6">
        <div
          className="flex items-center justify-start gap-2 overflow-x-auto py-5 scrollbar-hide md:justify-center"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {allTabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChange(tab.id)}
                className={
                  "shrink-0 rounded-full px-6 py-3 text-base font-semibold transition-all md:text-lg " +
                  (isActive
                    ? "bg-white/90 text-[#867DFF] shadow-[0_4px_16px_rgba(134,125,255,0.35)] backdrop-blur-md scale-105 border border-white/60"
                    : "bg-white/15 text-white hover:bg-white/25 border border-white/30 backdrop-blur-sm")
                }
              >
                {tab.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}