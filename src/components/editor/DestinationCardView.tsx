import { useState } from "react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { MapPin, Sun, Tent, Star, Sparkles, Trash2, Pencil } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DEFAULT_FIELDS = [
  { key: "season", label: "Идеальный сезон", icon: Sun, placeholder: "Май — Сентябрь", emoji: "☀️" },
  { key: "format", label: "Формат", icon: Tent, placeholder: "Активный отдых", emoji: "🏕️" },
  { key: "comfort", label: "Комфорт", icon: Star, placeholder: "Высокий", emoji: "⭐" },
  { key: "uniqueness", label: "Уникальность", icon: Sparkles, placeholder: "Редкое направление", emoji: "✨" },
] as const;

const EMOJI_LIBRARY = [
  "☀️", "🌤️", "⛅", "🌈", "❄️", "🌨️", "🌸", "🌺", "🍂", "🍁",
  "🏕️", "⛺", "🏖️", "🏔️", "🏞️", "🏛️", "🗿", "🏰", "🏯", "🗼",
  "⭐", "🌟", "💫", "🔥", "💎", "👑", "🏆", "🎯", "📍", "🧭",
  "✨", "🎉", "🎊", "🎈", "🎁", "🏵️", "🌻", "🌷", "🌹", "💐",
  "🚗", "🚙", "🚌", "🚐", "🚎", "🚂", "✈️", "🚁", "🚢", "🚲",
  "👣", "🚶", "🧳", "🎒", "📸", "🗺️", "🧳", "🎫", "🏨", "🍽️",
];

interface FieldConfig {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  placeholder: string;
  emoji: string;
}

export function DestinationCardView({
  node,
  updateAttributes,
  deleteNode,
  selected,
}: NodeViewProps) {
  const [open, setOpen] = useState(false);
  const [formFields, setFormFields] = useState<Array<{ key: string; label: string; emoji: string }>>(
    () => DEFAULT_FIELDS.map(f => ({
      key: f.key,
      label: (node.attrs[`${f.key}_label`] as string) || f.label,
      emoji: (node.attrs[`${f.key}_emoji`] as string) || f.emoji,
    }))
  );

  const handleOpen = () => {
    setFormFields(DEFAULT_FIELDS.map(f => ({
      key: f.key,
      label: (node.attrs[`${f.key}_label`] as string) || f.label,
      emoji: (node.attrs[`${f.key}_emoji`] as string) || f.emoji,
    })));
    setOpen(true);
  };

  const handleSave = () => {
    const newAttrs: Record<string, string> = {};
    formFields.forEach(field => {
      newAttrs[`${field.key}_label`] = field.label;
      newAttrs[`${field.key}_emoji`] = field.emoji;
    });
    updateAttributes(newAttrs);
    setOpen(false);
  };

  const getFieldLabel = (key: string) => {
    return (node.attrs[`${key}_label`] as string) || DEFAULT_FIELDS.find(f => f.key === key)?.label || "";
  };

  const getFieldEmoji = (key: string) => {
    return (node.attrs[`${key}_emoji`] as string) || DEFAULT_FIELDS.find(f => f.key === key)?.emoji || "";
  };

  return (
    <>
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
          {DEFAULT_FIELDS.map(({ key, icon: Icon, placeholder }) => (
            <div key={key} className="space-y-1.5">
              <Label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="text-sm">{getFieldEmoji(key)}</span>
                <Icon className="h-3.5 w-3.5" />
                {getFieldLabel(key)}
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Настройки карточки направления</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {formFields.map((field, index) => (
              <div key={field.key} className="space-y-2">
                <Label>Поле {index + 1}</Label>
                <div className="flex gap-2">
                  <Select
                    value={field.emoji}
                    onValueChange={(emoji) => {
                      const next = [...formFields];
                      next[index].emoji = emoji;
                      setFormFields(next);
                    }}
                  >
                    <SelectTrigger className="w-[80px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="grid grid-cols-6 gap-1 p-2 max-h-[200px] overflow-y-auto">
                        {EMOJI_LIBRARY.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded hover:bg-muted"
                            onClick={() => {
                              const next = [...formFields];
                              next[index].emoji = emoji;
                              setFormFields(next);
                            }}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </SelectContent>
                  </Select>
                  <Input
                    value={field.label}
                    onChange={(e) => {
                      const next = [...formFields];
                      next[index].label = e.target.value;
                      setFormFields(next);
                    }}
                    placeholder="Название поля"
                    className="flex-1"
                  />
                </div>
              </div>
            ))}
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
