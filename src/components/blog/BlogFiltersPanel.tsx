import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { blogTagGroups } from "@/data/blogArticles";
import { cn } from "@/lib/utils";

export interface BlogFiltersPanelProps {
  selectedTagIds: Set<string>;
  onToggleTag: (tagId: string) => void;
  onlyEditorsPick: boolean;
  onOnlyEditorsPick: (value: boolean) => void;
  onClear: () => void;
  className?: string;
}

export function BlogFiltersPanelInner({
  selectedTagIds,
  onToggleTag,
  onlyEditorsPick,
  onOnlyEditorsPick,
  onClear,
  className,
}: BlogFiltersPanelProps) {
  const activeCount =
    selectedTagIds.size + (onlyEditorsPick ? 1 : 0);

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          Рубрики и теги
        </p>
        {activeCount > 0 ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-primary"
            onClick={onClear}
          >
            Сбросить
          </Button>
        ) : null}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-slate-900/40">
        <div className="flex items-center gap-2">
          <Checkbox
            id="filter-editors-pick"
            checked={onlyEditorsPick}
            onCheckedChange={(v) => onOnlyEditorsPick(v === true)}
          />
          <Label
            htmlFor="filter-editors-pick"
            className="cursor-pointer text-sm font-medium leading-none"
          >
            Только выбор редакции
          </Label>
        </div>
        <p className="mt-1.5 pl-6 text-xs text-muted-foreground">
          Показать материалы из блока «Выбор редакции».
        </p>
      </div>

      {blogTagGroups.map((group) => (
        <div key={group.id}>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {group.title}
          </h3>
          <ul className="space-y-2">
            {group.tags.map((tag) => {
              const checked = selectedTagIds.has(tag.id);
              return (
                <li key={tag.id}>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`blog-tag-${tag.id}`}
                      checked={checked}
                      onCheckedChange={() => onToggleTag(tag.id)}
                    />
                    <Label
                      htmlFor={`blog-tag-${tag.id}`}
                      className="cursor-pointer text-sm font-normal leading-snug"
                    >
                      {tag.label}
                    </Label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
