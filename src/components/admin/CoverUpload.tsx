import { useCallback, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImagePlus, Loader2, X } from "lucide-react";
import { uploadImages } from "@/lib/uploadImages";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function CoverUpload({
  value,
  onChange,
  label = "Обложка",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = useCallback(
    async (file: File) => {
      setError("");
      setUploading(true);
      try {
        const [url] = await uploadImages([file]);
        onChange(url);
      } catch (e) {
        setError((e as Error).message || "Ошибка загрузки");
      } finally {
        setUploading(false);
      }
    },
    [onChange],
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) handleFile(file);
    },
    [handleFile],
  );

  return (
    <div className="grid gap-2">
      <Label>{label}</Label>

      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
          <img
            src={value}
            alt="Обложка"
            className="h-40 w-full object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2 h-7 w-7"
            onClick={() => onChange("")}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50/50 px-4 py-8 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/30"
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          ) : (
            <ImagePlus className="h-8 w-8 text-slate-400" />
          )}
          <span>
            {uploading
              ? "Загрузка…"
              : "Нажмите или перетащите изображение"}
          </span>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="или вставьте URL: https://..."
        className="text-xs"
      />

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
