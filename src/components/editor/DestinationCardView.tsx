import { useState } from "react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import {
  MapPin, Sun, Tent, Star, Sparkles, Trash2, Pencil,
  Calendar, Compass, Backpack, Heart, Camera, Utensils,
  Mountain, Waves, TreePine, Cloud, Snowflake, Flame,
  Award, Gem, Crown, Ticket, Clock, Users, Route,
  type LucideIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const ICON_LIBRARY: Record<string, LucideIcon> = {
  Sun, Tent, Star, Sparkles, MapPin, Calendar, Compass, Backpack,
  Heart, Camera, Utensils, Mountain, Waves, TreePine, Cloud,
  Snowflake, Flame, Award, Gem, Crown, Ticket, Clock, Users, Route,
};

export const ICON_KEYS = Object.keys(ICON_LIBRARY);

export function getIcon(name: string | undefined | null, fallback: LucideIcon): LucideIcon {
  if (!name) return fallback;
  return ICON_LIBRARY[name] || fallback;
}

const DEFAULT_FIELDS = [
  { key: "season",     label: "Идеальный сезон", icon: "Sun",      iconFallback: Sun,      placeholder: "Май — Сентябрь" },
  { key: "format",     label: "Формат",          icon: "Tent",     iconFallback: Tent,     placeholder: "Активный отдых" },
  { key: "comfort",    label: "Комфорт",         icon: "Star",     iconFallback: Star,     placeholder: "Высокий" },
  { key: "uniqueness", label: "Уникальность",    icon: "Sparkles", iconFallback: Sparkles, placeholder: "Редкое направление" },
] as const;

function IconPicker({
  value,
  fallback,
  onChange,
}: {
  value: string;
  fallback: LucideIcon;
  onChange: (name: string) => void;
}) {
  const Current = getIcon(value, fallback);
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-9 w-9 shrink-0"
          aria-label="Выбрать иконку"
        >
          <Current className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-2" align="start">
        <div className="grid max-h-[280px] grid-cols-6 gap-1 overflow-y-auto">
          {ICON_KEYS.map((name) => {
            const Icon = ICON_LIBRARY[name];
            const active = name === value;
            return (
              <button
                key={name}
                type="button"
                title={name}
                onClick={() => {
                  onChange(name);
                  setOpen(false);
                }}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-md transition-colors",
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function DestinationCardView({
  node,
  updateAttributes,
  deleteNode,
  selected,
}: NodeViewProps) {
  const [open, setOpen] = useState(false);

  const buildForm = () =>
    DEFAULT_FIELDS.map((f) => ({
      key: f.key,
      label: (node.attrs[`${f.key}_label`] as string) || f.label,
      icon:  (node.attrs[`${f.key}_icon`] as string) || f.icon,
    }));

  const [form, setForm] = useState(buildForm);

  const handleOpen = () => {
    setForm(buildForm());
    setOpen(true);
  };

  const handleSave = () => {
    const attrs: Record<string, string> = {};
    form.forEach((f) => {
      attrs[`${f.key}_label`] = f.label;
      attrs[`${f.key}_icon`]  = f.icon;
    });
    updateAttributes(attrs);
    setOpen(false);
  };

  const getLabel = (key: string, fallback: string) =>
    (node.attrs[`${key}_label`] as string) || fallback;

  const getIconName = (key: string, fallback: string) =>
    (node.attrs[`${key}_icon`] as string) || fallback;

  return (
    <>
      <NodeViewWrapper
        data-type="destination-card"
        className={cn(
          "my-4 rounded-xl border-2 transition-colors",
          selected ? "border-primary" : "border-slate-200 dark:border-slate-800",
        )}
        draggable
        data-drag-handle=""
      >
        <div className="flex items-center justify-between rounded-t-xl border-b border-slate-200 bg-muted/50 px-4 py-2.5 dark:border-slate-800">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Карточка направления
          </div>
          <div className="flex gap-1">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              className="h-8 w-8"
              onClick={handleOpen}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
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
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          {DEFAULT_FIELDS.map((f) => {
            const Icon = getIcon(getIconName(f.key, f.icon), f.iconFallback);
            return (
              <div key={f.key} className="space-y-1.5">
                <Label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" />
                  {getLabel(f.key, f.label)}
                </Label>
                <Input
                  value={(node.attrs[f.key] as string) || ""}
                  onChange={(e) => updateAttributes({ [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  className="h-9"
                />
              </div>
            );
          })}
        </div>
      </NodeViewWrapper>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Настройки карточки направления</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {form.map((f, index) => {
              const fallback = DEFAULT_FIELDS[index].iconFallback;
              return (
                <div key={f.key} className="space-y-2">
                  <Label>Поле {index + 1}</Label>
                  <div className="flex gap-2">
                    <IconPicker
                      value={f.icon}
                      fallback={fallback}
                      onChange={(name) => {
                        const next = [...form];
                        next[index] = { ...next[index], icon: name };
                        setForm(next);
                      }}
                    />
                    <Input
                      value={f.label}
                      onChange={(e) => {
                        const next = [...form];
                        next[index] = { ...next[index], label: e.target.value };
                        setForm(next);
                      }}
                      placeholder="Название поля"
                      className="flex-1"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button type="button" onClick={handleSave}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 