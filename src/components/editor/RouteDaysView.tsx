import { useCallback, useRef, useState } from "react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import {
  Route,
  Plus,
  Trash2,
  ChevronDown,
  ChevronRight,
  ImagePlus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { RouteDayItem } from "@/types/blogContent";

const DEFAULT_IMAGE = "/путь-no-bg-preview (carve.photos).png";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

async function uploadRouteImages(files: File[]): Promise<string[]> {
  const fd = new FormData();
  for (const f of files) fd.append("files", f);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    ?.split("=")[1];

  const headers: HeadersInit = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const url = `${API_BASE}/api/upload/route`;
  const res = await fetch(url, { method: "POST", headers, body: fd });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(
      (data as { error?: string }).error || "Upload failed",
    );
  }
  const data = (await res.json()) as { urls: string[] };
  return data.urls;
}

export function RouteDaysView({
  node,
  updateAttributes,
  deleteNode,
  selected,
}: NodeViewProps) {
  const days: RouteDayItem[] = node.attrs.days || [];
  const image = (node.attrs.image as string) || "";
  const [openDays, setOpenDays] = useState<Set<number>>(new Set([0]));
  const fileRef = useRef<HTMLInputElement>(null);

  const toggleDay = (index: number) => {
    setOpenDays((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const updateDay = useCallback(
    (index: number, patch: Partial<RouteDayItem>) => {
      const next = days.map((d, i) => (i === index ? { ...d, ...patch } : d));
      updateAttributes({ days: next });
    },
    [days, updateAttributes],
  );

  const addDay = useCallback(() => {
    const num = days.length + 1;
    const next = [
      ...days,
      {
        label: `День ${num}`,
        title: "",
        description: "",
        anchorIndex: days.length,
      },
    ];
    updateAttributes({ days: next });
    setOpenDays((prev) => new Set([...prev, days.length]));
  }, [days, updateAttributes]);

  const removeDay = useCallback(
    (index: number) => {
      const newDays = days
        .filter((_, i) => i !== index)
        .map((day, i) => ({
          ...day,
          anchorIndex: i,
        }));
      updateAttributes({ days: newDays });
      setOpenDays((prev) => {
        const next = new Set<number>();
        for (const v of prev) {
          if (v < index) next.add(v);
          else if (v > index) next.add(v - 1);
        }
        return next;
      });
    },
    [days, updateAttributes],
  );

  const handleImageFile = useCallback(
    async (files: FileList | null) => {
      if (!files?.length) return;
      try {
        const urls = await uploadRouteImages([files[0]]);
        if (urls[0]) updateAttributes({ image: urls[0] });
      } catch (e) {
        console.error("Route image upload failed", e);
      }
    },
    [updateAttributes],
  );

  const displayImage = image || DEFAULT_IMAGE;

  return (
    <NodeViewWrapper
      data-type="route-days"
      className={`my-4 rounded-xl border-2 transition-colors ${
        selected ? "border-primary" : "border-slate-200 dark:border-slate-800"
      }`}
      draggable
      data-drag-handle=""
    >
      <div className="flex items-center justify-between rounded-t-xl border-b border-slate-200 bg-muted/50 px-4 py-2.5 dark:border-slate-800">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Route className="h-4 w-4" />
          Маршрут по дням ({days.length})
        </div>
        <div className="flex gap-1">
          <Button type="button" size="sm" variant="secondary" onClick={addDay}>
            <Plus className="mr-1 h-4 w-4" />
            Добавить
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

      <div className="flex gap-0">
        <div className="relative w-48 shrink-0 border-r border-slate-200 dark:border-slate-800">
          <div
            className="group relative h-full min-h-[200px] cursor-pointer overflow-hidden bg-muted"
            onClick={() => fileRef.current?.click()}
          >
            <img
              src={displayImage}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <ImagePlus className="h-6 w-6 text-white" />
            </div>
          </div>
          {image && (
            <button
              type="button"
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-white shadow"
              onClick={() => updateAttributes({ image: "" })}
            >
              <X className="h-3 w-3" />
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageFile(e.target.files)}
          />
        </div>

        <div className="min-w-0 flex-1 divide-y divide-slate-200 dark:divide-slate-800">
          {days.map((day, i) => (
            <Collapsible key={i} open={openDays.has(i)} onOpenChange={() => toggleDay(i)}>
              <div className="flex items-center gap-2 px-3 py-2">
                <CollapsibleTrigger className="flex flex-1 items-center gap-2 text-left">
                  {openDays.has(i) ? (
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  <span className="text-xs font-medium text-primary">{day.label}</span>
                  <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                    {day.title || "(без заголовка)"}
                  </span>
                </CollapsibleTrigger>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 text-destructive hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeDay(i);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <CollapsibleContent>
                <div className="flex flex-col gap-2 px-3 pb-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Метка</Label>
                    <Input
                      value={day.label}
                      onChange={(e) => updateDay(i, { label: e.target.value })}
                      placeholder="День 1"
                      className="h-7 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Заголовок</Label>
                    <Input
                      value={day.title}
                      onChange={(e) => updateDay(i, { title: e.target.value })}
                      placeholder="Врата в Кёнигсберг"
                      className="h-7 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Описание</Label>
                    <Textarea
                      value={day.description}
                      onChange={(e) => updateDay(i, { description: e.target.value })}
                      placeholder="Прибытие в Калининград..."
                      className="min-h-[50px] resize-y text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Якорь (индекс)
                    </Label>
                    <Input
                      type="number"
                      min="0"
                      value={day.anchorIndex ?? i}
                      onChange={(e) =>
                        updateDay(i, { anchorIndex: Number(e.target.value) || 0 })
                      }
                      placeholder={`По умолчанию: ${i}`}
                      className="h-7 text-xs"
                    />
                    <p className="text-[10px] text-muted-foreground">
                      День {i + 1} → якорь #{i + 1} в тексте
                    </p>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}

          {days.length === 0 && (
            <div
              className="flex cursor-pointer flex-col items-center gap-2 py-8 text-muted-foreground"
              onClick={addDay}
            >
              <Plus className="h-6 w-6" />
              <p className="text-sm">Добавьте первый день</p>
            </div>
          )}
        </div>
      </div>
    </NodeViewWrapper>
  );
}