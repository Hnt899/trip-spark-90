import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  collectDocAnchors,
  focusAnchorAt,
  removeAnchorAt,
  setAnchorLabelAt,
  type EditorAnchorItem,
} from "@/lib/tiptapAnchors";

export function AnchorEditorSidebar({ editor }: { editor: Editor }) {
  const [anchors, setAnchors] = useState<EditorAnchorItem[]>([]);

  useEffect(() => {
    const sync = () => setAnchors(collectDocAnchors(editor));
    sync();
    editor.on("update", sync);
    editor.on("selectionUpdate", sync);
    return () => {
      editor.off("update", sync);
      editor.off("selectionUpdate", sync);
    };
  }, [editor]);

  return (
    <aside
      className={cn(
        "w-full shrink-0 rounded-xl border border-[#867DFF]/35 bg-[#867DFF]/[0.04] p-3 sm:w-[200px] sm:p-3.5",
      )}
      aria-label="Якоря статьи"
    >
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#867DFF]">
        <Link2 className="h-3.5 w-3.5" aria-hidden />
        Якоря
      </div>

      {anchors.length === 0 ? (
        <p className="text-xs leading-relaxed text-muted-foreground">
          Выделите абзац или заголовок и нажмите «Якорь» в тулбаре. Название в списке можно
          менять отдельно от текста статьи.
        </p>
      ) : (
        <ul className="space-y-3">
          {anchors.map((anchor, index) => (
            <li key={anchor.pos} className="space-y-1.5">
              <div className="flex items-center gap-1">
                <span className="w-4 shrink-0 text-[10px] font-medium text-[#867DFF]/70">
                  {index + 1}
                </span>
                <Input
                  value={anchor.anchorLabel}
                  onChange={(e) => setAnchorLabelAt(editor, anchor.pos, e.target.value)}
                  onFocus={() => focusAnchorAt(editor, anchor.pos)}
                  className="h-8 border-[#867DFF]/30 text-sm italic text-[#867DFF] placeholder:text-[#867DFF]/40"
                  placeholder="Название якоря"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={() => removeAnchorAt(editor, anchor.pos)}
                  aria-label="Удалить якорь"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              {anchor.previewText ? (
                <p
                  className="line-clamp-2 pl-5 text-[11px] leading-snug text-muted-foreground"
                  title={anchor.previewText}
                >
                  Текст: {anchor.previewText}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
