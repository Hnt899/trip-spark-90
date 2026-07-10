import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PAGE_CMS_PALETTE } from "@/types/pageContent";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function CmsColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [unlocked, setUnlocked] = useState(false);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <button
          type="button"
          className="text-[10px] text-primary underline-offset-2 hover:underline"
          onClick={() => setUnlocked((u) => !u)}
        >
          {unlocked ? "Палитра" : "Любой цвет"}
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          title="Сброс (как в дизайне)"
          onClick={() => onChange("")}
          className={cn(
            "h-6 w-6 rounded border border-dashed border-muted-foreground/40",
            !value && "ring-2 ring-[#867DFF]"
          )}
        />
        {PAGE_CMS_PALETTE.map((c) => (
          <button
            key={c}
            type="button"
            title={c}
            onClick={() => onChange(c)}
            className={cn(
              "h-6 w-6 rounded border border-black/10",
              value === c && "ring-2 ring-[#867DFF] ring-offset-1"
            )}
            style={{ background: c }}
          />
        ))}
      </div>
      {unlocked && (
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#100A6F"}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 w-10 cursor-pointer rounded border"
          />
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#100A6F или пусто"
            className="h-8"
          />
        </div>
      )}
    </div>
  );
}
