import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { MapPin, Sun, Tent, Star, Sparkles, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const FIELDS = [
  { key: "season", label: "Идеальный сезон", icon: Sun, placeholder: "Май — Сентябрь" },
  { key: "format", label: "Формат", icon: Tent, placeholder: "Активный отдых" },
  { key: "comfort", label: "Комфорт", icon: Star, placeholder: "Высокий" },
  { key: "uniqueness", label: "Уникальность", icon: Sparkles, placeholder: "Редкое направление" },
] as const;

export function DestinationCardView({
  node,
  updateAttributes,
  deleteNode,
  selected,
}: NodeViewProps) {
  return (
    <NodeViewWrapper
      data-type="destination-card"
      className={`my-4 rounded-xl border-2 transition-colors ${
        selected ? "border-primary" : "border-slate-200 dark:border-slate-800"
      }`}
      draggable
      data-drag-handle=""
    >
      <div className="flex items-center justify-between rounded-t-xl border-b border-slate-200 bg-muted/50 px-4 py-2.5 dark:border-slate-800">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <MapPin className="h-4 w-4" />
          Карточка направления
        </div>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-destructive hover:text-destructive"
          onClick={deleteNode}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
        {FIELDS.map(({ key, label, icon: Icon, placeholder }) => (
          <div key={key} className="space-y-1.5">
            <Label className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Label>
            <Input
              value={(node.attrs[key] as string) || ""}
              onChange={(e) => updateAttributes({ [key]: e.target.value })}
              placeholder={placeholder}
              className="h-9"
            />
          </div>
        ))}
      </div>
    </NodeViewWrapper>
  );
}
