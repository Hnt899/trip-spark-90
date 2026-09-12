import { useState } from "react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { Plane, BedDouble, Pencil, Trash2, ImagePlus, X } from "lucide-react";
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
import { uploadImages } from "@/lib/uploadImages";

export function QuickBookingView({
  node,
  updateAttributes,
  deleteNode,
  selected,
}: NodeViewProps) {
  const title = (node.attrs.title as string) || "Забронировать жильё и купить билеты можно на TudaSuda";
  const button1Text = (node.attrs.button1Text as string) || "Найти билеты";
  const button1Url = (node.attrs.button1Url as string) || "";
  const button2Text = (node.attrs.button2Text as string) || "Выбрать отель";
  const button2Url = (node.attrs.button2Url as string) || "";
  const image = (node.attrs.image as string) || "";
  const imageAlt = (node.attrs.imageAlt as string) || "";
  const bgGradient = (node.attrs.bgGradient as string) || "from-[#8A70F8] to-[#9B82F8]";

  const [open, setOpen] = useState(false);
  const [formTitle, setFormTitle] = useState(title);
  const [formButton1Text, setFormButton1Text] = useState(button1Text);
  const [formButton1Url, setFormButton1Url] = useState(button1Url);
  const [formButton2Text, setFormButton2Text] = useState(button2Text);
  const [formButton2Url, setFormButton2Url] = useState(button2Url);
  const [uploading, setUploading] = useState(false);

  const handleOpen = () => {
    setFormTitle(title);
    setFormButton1Text(button1Text);
    setFormButton1Url(button1Url);
    setFormButton2Text(button2Text);
    setFormButton2Url(button2Url);
    setOpen(true);
  };

  const handleSave = () => {
    updateAttributes({
      title: formTitle,
      button1Text: formButton1Text,
      button1Url: formButton1Url,
      button2Text: formButton2Text,
      button2Url: formButton2Url,
    });
    setOpen(false);
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      const urls = await uploadImages([files[0]]);
      if (urls[0]) updateAttributes({ image: urls[0] });
    } catch (e) {
      console.error("Image upload failed", e);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <NodeViewWrapper
        data-type="quick-booking"
        className={`my-6 rounded-2xl border-2 transition-colors ${
          selected ? "border-primary" : "border-transparent"
        }`}
        draggable
        data-drag-handle=""
      >
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${bgGradient} p-6 md:p-8`}>
          <div className="absolute right-2 top-2 z-10 flex gap-1 opacity-70 transition-opacity hover:opacity-100">
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
              className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
              onClick={deleteNode}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <h3 className="text-xl font-bold text-white md:text-2xl lg:text-3xl">
                {title}
              </h3>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="w-full rounded-full bg-white px-4 py-4 text-base font-semibold text-[#8A70F8] hover:bg-white/90 sm:w-auto md:px-6 md:py-6 md:text-lg"
                  onClick={() => button1Url && window.open(button1Url, "_blank")}
                >
                  <Plane className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  {button1Text}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full border-white bg-white/10 px-4 py-4 text-base font-semibold text-white hover:bg-white/20 hover:text-white sm:w-auto md:px-6 md:py-6 md:text-lg"
                  onClick={() => button2Url && window.open(button2Url, "_blank")}
                >
                  <BedDouble className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  {button2Text}
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              {image ? (
                                  <div className="group relative w-full max-w-[480px]">
                                  <img
                                    src={image}
                                    alt={imageAlt}
                                    className="w-full rounded-2xl object-cover"
                                    draggable={false}
                                  />
                                                    <button
                    type="button"
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-destructive text-white opacity-0 shadow transition-opacity group-hover:opacity-100"
                    onClick={() => updateAttributes({ image: "" })}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <Input
                    value={imageAlt}
                    onChange={(e) => updateAttributes({ imageAlt: e.target.value })}
                    placeholder="Alt-текст фото"
                    className="mt-2 text-xs"
                  />
                </div>
              ) : (
                <label className="flex w-full max-w-[480px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/40 bg-white/5 py-12 text-white/80 transition-colors hover:border-white/70 hover:bg-white/10">
                  <ImagePlus className="h-8 w-8" />
                  <span className="text-sm">
                    {uploading ? "Загрузка..." : "Загрузить фото"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e.target.files)}
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </NodeViewWrapper>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Настройки блока быстрой покупки</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="qb-title">Заголовок</Label>
              <textarea
                id="qb-title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                rows={3}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Забронировать жильё и купить билеты можно на TudaSuda"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="qb-btn1-text">Текст кнопки 1</Label>
                <Input
                  id="qb-btn1-text"
                  value={formButton1Text}
                  onChange={(e) => setFormButton1Text(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="qb-btn1-url">Ссылка кнопки 1</Label>
                <Input
                  id="qb-btn1-url"
                  value={formButton1Url}
                  onChange={(e) => setFormButton1Url(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="qb-btn2-text">Текст кнопки 2</Label>
                <Input
                  id="qb-btn2-text"
                  value={formButton2Text}
                  onChange={(e) => setFormButton2Text(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="qb-btn2-url">Ссылка кнопки 2</Label>
                <Input
                  id="qb-btn2-url"
                  value={formButton2Url}
                  onChange={(e) => setFormButton2Url(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Фото загружается кликом по блоку справа (в самом блоке, не в этом окне).
            </p>
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