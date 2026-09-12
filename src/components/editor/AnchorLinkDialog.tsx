import { useEffect, useMemo, useState } from "react";
import type { Editor } from "@tiptap/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

type OrdinaryOption = {
  id: string;      // "anchor-1"
  label: string;
  ordinal: number;
};

type TableRowOption = {
  /** Уникальный идентификатор опции: "tableRow-0", "tableRow-1" — по счёту всех строк всех таблиц */
  key: string;
  /** Уже присвоенный id, если есть (t-anchor-N) */
  existingId: string | null;
  /** Номер строки в таблице (1-based для отображения) */
  rowNumberInTable: number;
  /** Номер таблицы (1-based) */
  tableNumber: number;
  /** Первые 40 символов первой ячейки — для подписи */
  preview: string;
  /** Позиция строки в документе (для присвоения id) */
  pos: number;
};

export function AnchorLinkDialog({
  editor,
  open,
  onOpenChange,
}: {
  editor: Editor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [type, setType] = useState<"ordinary" | "table">("ordinary");
  const [selectedOrdinary, setSelectedOrdinary] = useState<string>("");
  const [selectedTableKey, setSelectedTableKey] = useState<string>("");
  const [manualTitle, setManualTitle] = useState<string>("");

  // ---------- Обычные якоря ----------
  const ordinaryAnchors: OrdinaryOption[] = useMemo(() => {
    const out: OrdinaryOption[] = [];
    let ordinal = 0;
    editor.state.doc.forEach((node) => {
      if (
        (node.type.name === "paragraph" || node.type.name === "heading") &&
        node.attrs.anchor
      ) {
        ordinal += 1;
        const lbl = String(node.attrs.anchorLabel || node.textContent || "").trim();
        out.push({
          id: `anchor-${ordinal}`,
          ordinal,
          label: lbl ? lbl.slice(0, 60) : "(без названия)",
        });
      }
    });
    return out;
  }, [editor, open]);

  // ---------- Все строки всех таблиц ----------
  const tableRows: TableRowOption[] = useMemo(() => {
    const out: TableRowOption[] = [];
    let rowCounter = 0;
    let tableCounter = 0;
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name !== "table") return true;
      tableCounter += 1;
      const currentTableNumber = tableCounter;
      let rowInTable = 0;
      node.forEach((rowNode, offset) => {
        if (rowNode.type.name !== "tableRow") return;
        rowCounter += 1;
        rowInTable += 1;
        const rowPos = pos + 1 + offset;
        const existingId = rowNode.attrs?.tableAnchorId
          ? String(rowNode.attrs.tableAnchorId)
          : null;
        const firstCell = rowNode.firstChild;
        const preview = firstCell
          ? firstCell.textContent.trim().slice(0, 40)
          : "";
        out.push({
          key: `tableRow-${rowCounter}`,
          existingId,
          rowNumberInTable: rowInTable,
          tableNumber: currentTableNumber,
          preview,
          pos: rowPos,
        });
      });
      return true;
    });
    return out;
  }, [editor, open]);

  // ---------- Подсчёт занятых id и предложение нового ----------
  const usedIds = useMemo(() => {
    const s = new Set<number>();
    for (const r of tableRows) {
      if (r.existingId) {
        const m = r.existingId.match(/^t-anchor-(\d+)$/);
        if (m) s.add(parseInt(m[1], 10));
      }
    }
    return s;
  }, [tableRows]);

  const nextFreeId = useMemo(() => {
    let n = 1;
    while (usedIds.has(n)) n += 1;
    return n;
  }, [usedIds]);

  // Сброс при открытии
  useEffect(() => {
    if (!open) return;
    setSelectedOrdinary(ordinaryAnchors[0]?.id || "");
    setSelectedTableKey(tableRows[0]?.key || "");
    const firstRow = tableRows[0];
    setManualTitle(
      firstRow && firstRow.existingId ? firstRow.existingId : `t-anchor-${nextFreeId}`,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // При смене выбранной строки обновляем manualTitle
  useEffect(() => {
    if (type !== "table") return;
    const row = tableRows.find((r) => r.key === selectedTableKey);
    if (!row) return;
    setManualTitle(row.existingId || `t-anchor-${nextFreeId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTableKey, type]);

  // ---------- Сохранение ----------
  const handleSave = () => {
    if (type === "ordinary") {
      if (!selectedOrdinary) {
        onOpenChange(false);
        return;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: `#${selectedOrdinary}` })
        .run();
      onOpenChange(false);
      return;
    }

    // Табличный
    const row = tableRows.find((r) => r.key === selectedTableKey);
    if (!row) {
      onOpenChange(false);
      return;
    }

    const id = row.existingId || manualTitle.trim() || `t-anchor-${nextFreeId}`;
    if (!/^t-anchor-\d+$/.test(id)) {
      // просто игнорим — можно было бы показать ошибку
      return;
    }

    // Присваиваем id строке, если ещё нет
    if (!row.existingId) {
      editor
        .chain()
        .focus()
        .command(({ tr, state }) => {
          const node = state.doc.nodeAt(row.pos);
          if (!node) return false;
          tr.setNodeMarkup(row.pos, undefined, {
            ...node.attrs,
            tableAnchorId: id,
          });
          return true;
        })
        .run();
    }

    // Ставим ссылку
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: `#${id}` })
      .run();
    onOpenChange(false);
  };

  const handleRemove = () => {
    editor.chain().focus().unsetLink().run();
    onOpenChange(false);
  };

  const hasSelection = !editor.state.selection.empty;
  const hasLink = editor.isActive("link");
  const selectedRow = tableRows.find((r) => r.key === selectedTableKey);
  const willCreateNew = selectedRow && !selectedRow.existingId;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {hasLink ? "Изменить ссылку" : "Вставить ссылку на якорь"}
          </DialogTitle>
        </DialogHeader>

        {!hasSelection && !hasLink ? (
          <p className="py-4 text-sm text-muted-foreground">
            Сначала выделите слово или фразу в тексте, затем откройте это окно.
          </p>
        ) : (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Тип якоря</Label>
              <RadioGroup
                value={type}
                onValueChange={(v) => setType(v as "ordinary" | "table")}
                className="flex gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="ordinary" id="anchor-type-ordinary" />
                  <Label htmlFor="anchor-type-ordinary" className="cursor-pointer">
                    Обычный ({ordinaryAnchors.length})
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="table" id="anchor-type-table" />
                  <Label htmlFor="anchor-type-table" className="cursor-pointer">
                    Табличный ({tableRows.length})
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {type === "ordinary" ? (
              <div className="space-y-2">
                <Label>Куда вести</Label>
                {ordinaryAnchors.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    В документе нет обычных якорей. Поставьте якорь на абзац или заголовок
                    (кнопка «Якорь» в тулбаре).
                  </p>
                ) : (
                  <div className="max-h-60 space-y-1 overflow-y-auto rounded-md border p-2">
                    {ordinaryAnchors.map((a) => (
                      <label
                        key={a.id}
                        className="flex cursor-pointer items-center gap-2 rounded p-1.5 text-sm hover:bg-muted"
                      >
                        <input
                          type="radio"
                          name="anchor-target-ordinary"
                          value={a.id}
                          checked={selectedOrdinary === a.id}
                          onChange={() => setSelectedOrdinary(a.id)}
                        />
                        <span className="shrink-0 font-mono text-xs text-muted-foreground">
                          #{a.id}
                        </span>
                        <span className="flex-1 truncate">{a.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Строка таблицы</Label>
                {tableRows.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    В документе нет таблиц. Сначала вставьте таблицу (кнопка «Таблица» в тулбаре).
                  </p>
                ) : (
                  <>
                    <div className="max-h-60 space-y-1 overflow-y-auto rounded-md border p-2">
                      {tableRows.map((r) => (
                        <label
                          key={r.key}
                          className="flex cursor-pointer items-center gap-2 rounded p-1.5 text-sm hover:bg-muted"
                        >
                          <input
                            type="radio"
                            name="anchor-target-table"
                            value={r.key}
                            checked={selectedTableKey === r.key}
                            onChange={() => setSelectedTableKey(r.key)}
                          />
                          <span className="flex-1 truncate">
                            Т{r.tableNumber}. Строка {r.rowNumberInTable}
                            {r.preview ? ` — ${r.preview}` : ""}
                          </span>
                          {r.existingId ? (
                            <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
                              {r.existingId}
                            </span>
                          ) : (
                            <span className="shrink-0 text-[10px] text-primary/60">
                              новый
                            </span>
                          )}
                        </label>
                      ))}
                    </div>

                    {selectedRow ? (
                      <div className="space-y-1">
                        <Label htmlFor="table-anchor-id" className="text-xs">
                          ID якоря (можно изменить вручную)
                        </Label>
                        <Input
                          id="table-anchor-id"
                          value={manualTitle}
                          onChange={(e) => setManualTitle(e.target.value)}
                          className="h-8 font-mono text-xs"
                          placeholder={`t-anchor-${nextFreeId}`}
                          disabled={!!selectedRow.existingId}
                        />
                        {selectedRow.existingId ? (
                          <p className="text-[11px] text-muted-foreground">
                            У этой строки уже есть якорь: {selectedRow.existingId}
                          </p>
                        ) : (
                          <p className="text-[11px] text-muted-foreground">
                            {willCreateNew
                              ? "Якорь будет создан при сохранении ссылки"
                              : ""}
                          </p>
                        )}
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            )}
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              disabled={
                (!hasSelection && !hasLink) ||
                (type === "ordinary" && !selectedOrdinary) ||
                (type === "table" && !selectedRow)
              }
            >
              Сохранить
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}