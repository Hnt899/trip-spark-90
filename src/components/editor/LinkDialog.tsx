import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

function normalizeHref(raw: string): string {
  const s = raw.trim();
  if (!s) return "";
  if (s.startsWith("/") || s.startsWith("#")) return s;
  if (/^(https?:|mailto:|tel:)/i.test(s)) return s;
  return `https://${s}`;
}

function isInternal(href: string): boolean {
  return href.startsWith("/") || href.startsWith("#");
}

export function LinkDialog({
  editor,
  open,
  onOpenChange,
}: {
  editor: Editor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [url, setUrl] = useState("");
  const [newTab, setNewTab] = useState(true);

  useEffect(() => {
    if (!open) return;
    const attrs = editor.getAttributes("link");
    const href = typeof attrs?.href === "string" ? attrs.href : "";
    setUrl(href);
    const target = attrs?.target;
    setNewTab(target === "_blank" || (href && !isInternal(href)));
  }, [open, editor]);

  const hasSelection = !editor.state.selection.empty;
  const hasLink = editor.isActive("link");
  const canApply = url.trim().length > 0 && (hasSelection || hasLink);

  const handleApply = () => {
    const href = normalizeHref(url);
    if (!href) return;
    const target = newTab && !isInternal(href) ? "_blank" : null;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href, target })
      .run();
    onOpenChange(false);
  };

  const handleRemove = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {hasLink ? "Изменить ссылку" : "Вставить ссылку"}
          </DialogTitle>
        </DialogHeader>

        {!hasSelection && !hasLink ? (
          <p className="py-4 text-sm text-muted-foreground">
            Сначала выделите слово или фразу в тексте, затем откройте это окно.
          </p>
        ) : (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com или /blog/statya"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && canApply) {
                    e.preventDefault();
                    handleApply();
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">
                Полный адрес, относительный (/blog/slug), mailto: или tel:.
              </p>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={newTab}
                onCheckedChange={(v) => setNewTab(!!v)}
                disabled={isInternal(url.trim())}
              />
              Открывать в новой вкладке
            </label>
          </div>
        )}

        <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-between">
          <div>
            {hasLink ? (
              <Button type="button" variant="ghost" onClick={handleRemove}>
                Удалить ссылку
              </Button>
            ) : null}
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Отмена
            </Button>
            <Button type="button" onClick={handleApply} disabled={!canApply}>
              {hasLink ? "Обновить" : "Вставить"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}