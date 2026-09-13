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
    <div className="sticky top-[var(--site-header-height)] z-30 bg-white/95 backdrop-blur border-b">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-3 px-4 bg-[#EEEDF5] rounded-2xl scrollbar-hide">
          {allTabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
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
