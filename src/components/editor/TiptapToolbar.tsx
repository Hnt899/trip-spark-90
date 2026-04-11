import type { Editor } from "@tiptap/react";
import type { ReactNode } from "react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  ImagePlus,
  GalleryHorizontal,
  Undo2,
  Redo2,
} from "lucide-react";

function Tip({
  children,
  label,
  shortcut,
  description,
}: {
  children: ReactNode;
  label: string;
  shortcut?: string;
  description: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side="bottom"
        sideOffset={8}
        className="max-w-56 px-3 py-2.5"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium">{label}</span>
          {shortcut && (
            <kbd className="rounded border border-border/60 bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
              {shortcut}
            </kbd>
          )}
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

export function TiptapToolbar({ editor }: { editor: Editor }) {
  return (
    <TooltipProvider delayDuration={600}>
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5">
        <Tip
          label="Жирный"
          shortcut="Ctrl+B"
          description="Выделяет текст жирным шрифтом для акцентов и важных фраз."
        >
          <Toggle
            size="sm"
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            aria-label="Жирный"
          >
            <Bold className="h-4 w-4" />
          </Toggle>
        </Tip>

        <Tip
          label="Курсив"
          shortcut="Ctrl+I"
          description="Наклонный шрифт — для названий, терминов и мягких выделений."
        >
          <Toggle
            size="sm"
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            aria-label="Курсив"
          >
            <Italic className="h-4 w-4" />
          </Toggle>
        </Tip>

        <Tip
          label="Зачёркнутый"
          shortcut="Ctrl+Shift+S"
          description="Перечёркивает текст — для устаревшей или удалённой информации."
        >
          <Toggle
            size="sm"
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            aria-label="Зачёркнутый"
          >
            <Strikethrough className="h-4 w-4" />
          </Toggle>
        </Tip>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <Tip
          label="Заголовок 1"
          shortcut="Ctrl+Alt+1"
          description="Самый крупный заголовок — для основного названия раздела."
        >
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 1 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            aria-label="Заголовок 1"
          >
            <Heading1 className="h-4 w-4" />
          </Toggle>
        </Tip>

        <Tip
          label="Заголовок 2"
          shortcut="Ctrl+Alt+2"
          description="Средний заголовок — для подразделов внутри статьи."
        >
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 2 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            aria-label="Заголовок 2"
          >
            <Heading2 className="h-4 w-4" />
          </Toggle>
        </Tip>

        <Tip
          label="Заголовок 3"
          shortcut="Ctrl+Alt+3"
          description="Малый заголовок — для мелких подтем и пунктов."
        >
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 3 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            aria-label="Заголовок 3"
          >
            <Heading3 className="h-4 w-4" />
          </Toggle>
        </Tip>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <Tip
          label="Маркированный список"
          shortcut="Ctrl+Shift+8"
          description="Список с точками — для перечислений без порядка."
        >
          <Toggle
            size="sm"
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            aria-label="Маркированный список"
          >
            <List className="h-4 w-4" />
          </Toggle>
        </Tip>

        <Tip
          label="Нумерованный список"
          shortcut="Ctrl+Shift+7"
          description="Список с цифрами — для пошаговых инструкций и рейтингов."
        >
          <Toggle
            size="sm"
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            aria-label="Нумерованный список"
          >
            <ListOrdered className="h-4 w-4" />
          </Toggle>
        </Tip>

        <Tip
          label="Цитата"
          shortcut="Ctrl+Shift+B"
          description="Выделенный блок цитаты — для важных высказываний и примечаний."
        >
          <Toggle
            size="sm"
            pressed={editor.isActive("blockquote")}
            onPressedChange={() =>
              editor.chain().focus().toggleBlockquote().run()
            }
            aria-label="Цитата"
          >
            <Quote className="h-4 w-4" />
          </Toggle>
        </Tip>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <Tip
          label="Разделитель"
          description="Горизонтальная линия — визуально отделяет разделы статьи друг от друга."
        >
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-9 px-2.5"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Minus className="h-4 w-4" />
          </Button>
        </Tip>

        <Tip
          label="Изображение"
          description="Вставляет блок для одной картинки. Можно также перетащить файл прямо в текст."
        >
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-9 px-2.5"
            onClick={() =>
              editor.commands.insertBlogImage({ src: "", alt: "", caption: "" })
            }
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
        </Tip>

        <Tip
          label="Галерея"
          description="Блок с несколькими фотографиями в виде сетки. Загрузите изображения внутрь."
        >
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-9 px-2.5"
            onClick={() => editor.commands.insertBlogGallery({ slides: [] })}
          >
            <GalleryHorizontal className="h-4 w-4" />
          </Button>
        </Tip>

        <div className="ml-auto flex items-center gap-0.5">
          <Tip
            label="Отменить"
            shortcut="Ctrl+Z"
            description="Возвращает последнее действие назад."
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-9 px-2.5"
              disabled={!editor.can().undo()}
              onClick={() => editor.chain().focus().undo().run()}
            >
              <Undo2 className="h-4 w-4" />
            </Button>
          </Tip>

          <Tip
            label="Повторить"
            shortcut="Ctrl+Y"
            description="Повторяет отменённое действие заново."
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-9 px-2.5"
              disabled={!editor.can().redo()}
              onClick={() => editor.chain().focus().redo().run()}
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </Tip>
        </div>
      </div>
    </TooltipProvider>
  );
}
