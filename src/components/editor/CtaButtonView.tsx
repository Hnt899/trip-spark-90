import { useState } from "react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import type { CtaButtonVariant } from "@/types/blogContent";

export function CtaButtonView({
  node,
  updateAttributes,
  deleteNode,
  selected,
}: NodeViewProps) {
  const text = (node.attrs.text as string) || "Подробнее";
  const url = (node.attrs.url as string) || "";
  const variant = (node.attrs.variant as CtaButtonVariant) || "primary";

  const [open, setOpen] = useState(false);
  const [formText, setFormText] = useState(text);
  const [formUrl, setFormUrl] = useState(url);
  const [formVariant, setFormVariant] = useState<CtaButtonVariant>(variant);

  const handleSave = () => {
    updateAttributes({
      text: formText,
      url: formUrl,
      variant: formVariant,
    });
    setOpen(false);
  };

  const handleOpen = () => {
    setFormText(text);
    setFormUrl(url);
    setFormVariant(variant);
    setOpen(true);
  };

  const variantClasses =
    variant === "primary"
      ? "bg-gradient-to-r from-primary to-purple-600 text-white"
      : "bg-secondary text-secondary-foreground";

  return (
    <NodeViewWrapper
      data-type="cta-button"
      className={`my-4 rounded-lg border-2 p-4 transition-colors ${
        selected ? "border-primary" : "border-transparent"
      }`}
      draggable
      data-drag-handle=""
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-1 items-center justify-center">
          <div
            className={`inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-medium ${variantClasses}`}
          >
            <ExternalLink className="h-4 w-4" />
            {text}
          </div>
        </div>
        <div className="flex shrink-0 gap-1">
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
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      {url && (
        <p className="mt-1 text-center text-xs text-muted-foreground truncate">
          {url}
        </p>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Настройки CTA-кнопки</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="cta-text">Текст кнопки</Label>
              <Input
                id="cta-text"
                value={formText}
                onChange={(e) => setFormText(e.target.value)}
                placeholder="Подробнее"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta-url">URL ссылки</Label>
              <Input
                id="cta-url"
                value={formUrl}
                onChange={(e) => setFormUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label>Стиль кнопки</Label>
              <Select
                value={formVariant}
                onValueChange={(v) => setFormVariant(v as CtaButtonVariant)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary (градиент)</SelectItem>
                  <SelectItem value="secondary">Secondary (тёмный)</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
    </NodeViewWrapper>
  );
}
