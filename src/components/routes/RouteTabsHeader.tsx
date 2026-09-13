import type { RouteTab } from "@/types/blogContent";

type Props = {
  tabs: RouteTab[];
  activeTabId: string;
  onChange: (id: string) => void;
};

export default function RouteTabsHeader({ tabs, activeTabId, onChange }: Props) {
  // Если табов нет (кроме основного) — не рендерим шапку
  if (!tabs || tabs.length === 0) {
    return null;
  }

  const allTabs = [
    { id: "__main__", title: "Маршрут" },
    ...tabs.map((t) => ({ id: t.id, title: t.title })),
  ];

  return (
    <div className="sticky top-[calc(var(--site-header-height)+3.5rem)] z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="my-3 flex gap-2 overflow-x-auto rounded-2xl bg-[#EEEDF5] px-4 py-3 scrollbar-hide">
          {allTabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChange(tab.id)}
                className={`rounded-full px-4 py-2 font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-[#867DFF] text-white shadow-sm"
                    : "text-[#100A6F] hover:bg-white/60"
                }`}
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