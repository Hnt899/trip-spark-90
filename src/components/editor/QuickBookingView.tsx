import { useState } from "react";
import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { Plane, BedDouble, ExternalLink, Pencil, Trash2 } from "lucide-react";
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

export function QuickBookingView({
  node,
  updateAttributes,
  deleteNode,
  selected,
}: NodeViewProps) {
  const title1 = (node.attrs.title1 as string) || "Забронировать жильё";
  const title2 = (node.attrs.title2 as string) || "и купить билеты можно";
  const title3 = (node.attrs.title3 as string) || "на TudaSuda";
  const button1Text = (node.attrs.button1Text as string) || "Найти билеты";
  const button1Url = (node.attrs.button1Url as string) || "";
  const button2Text = (node.attrs.button2Text as string) || "Выбрать отель";
  const button2Url = (node.attrs.button2Url as string) || "";
  const bgGradient = (node.attrs.bgGradient as string) || "from-[#8A70F8] to-[#9B82F8]";

  const [open, setOpen] = useState(false);
  const [formTitle1, setFormTitle1] = useState(title1);
  const [formTitle2, setFormTitle2] = useState(title2);
  const [formTitle3, setFormTitle3] = useState(title3);
  const [formButton1Text, setFormButton1Text] = useState(button1Text);
  const [formButton1Url, setFormButton1Url] = useState(button1Url);
  const [formButton2Text, setFormButton2Text] = useState(button2Text);
  const [formButton2Url, setFormButton2Url] = useState(button2Url);

  const handleSave = () => {
    updateAttributes({
      title1: formTitle1,
      title2: formTitle2,
      title3: formTitle3,
      button1Text: formButton1Text,
      button1Url: formButton1Url,
      button2Text: formButton2Text,
      button2Url: formButton2Url,
    });
    setOpen(false);
  };

  const handleOpen = () => {
    setFormTitle1(title1);
    setFormTitle2(title2);
    setFormTitle3(title3);
    setFormButton1Text(button1Text);
    setFormButton1Url(button1Url);
    setFormButton2Text(button2Text);
    setFormButton2Url(button2Url);
    setOpen(true);
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
          <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity hover:opacity-100">
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
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-2 md:space-y-3">
              <h3 className="text-xl font-bold text-white md:text-2xl lg:text-3xl">{title1}</h3>
              <h3 className="text-xl font-bold text-white md:text-2xl lg:text-3xl">{title2}</h3>
              <h3 className="text-xl font-bold text-white md:text-2xl lg:text-3xl">{title3}</h3>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-center">
              <Button
                size="lg"
                className="w-full rounded-full bg-white px-4 py-4 text-base font-semibold text-[#8A70F8] hover:bg-white/90 sm:w-auto md:px-6 md:py-6 md:text-lg"
                onClick={() => button1Url && window.open(button1Url, '_blank')}
              >
                <Plane className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                {button1Text}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full border-white bg-white/10 px-4 py-4 text-base font-semibold text-white hover:bg-white/20 sm:w-auto md:px-6 md:py-6 md:text-lg"
                onClick={() => button2Url && window.open(button2Url, '_blank')}
              >
                <BedDouble className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                {button2Text}
              </Button>
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
              <Label htmlFor="qb-title1">Заголовок 1</Label>
              <Input
                id="qb-title1"
                value={formTitle1}
                onChange={(e) => setFormTitle1(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qb-title2">Заголовок 2</Label>
              <Input
                id="qb-title2"
                value={formTitle2}
                onChange={(e) => setFormTitle2(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qb-title3">Заголовок 3</Label>
              <Input
                id="qb-title3"
                value={formTitle3}
                onChange={(e) => setFormTitle3(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qb-btn1-text">Текст кнопки 1</Label>
              <Input
                id="qb-btn1-text"
                value={formButton1Text}
                onChange={(e) => setFormButton1Text(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qb-btn1-url">URL кнопки 1</Label>
              <Input
                id="qb-btn1-url"
                value={formButton1Url}
                onChange={(e) => setFormButton1Url(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qb-btn2-text">Текст кнопки 2</Label>
              <Input
                id="qb-btn2-text"
                value={formButton2Text}
                onChange={(e) => setFormButton2Text(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qb-btn2-url">URL кнопки 2</Label>
              <Input
                id="qb-btn2-url"
                value={formButton2Url}
                onChange={(e) => setFormButton2Url(e.target.value)}
                placeholder="https://..."
              />
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
    </>
  );
}
