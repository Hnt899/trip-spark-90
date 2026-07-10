import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadImages } from "@/lib/uploadImages";
import { CmsColorField } from "@/components/cms/CmsColorField";
import { apiFetch } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Upload } from "lucide-react";

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {multiline ? (
        <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function MediaField({
  label,
  value,
  onChange,
  accept,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  accept: string;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="URL или загрузите файл"
      />
      <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-primary">
        <Upload className="h-3.5 w-3.5" />
        {busy ? "Загрузка…" : "Загрузить файл"}
        <input
          type="file"
          accept={accept}
          className="hidden"
          disabled={busy}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setBusy(true);
            try {
              const urls = await uploadImages([file]);
              if (urls[0]) onChange(urls[0]);
            } catch (err) {
              console.error(err);
              alert(err instanceof Error ? err.message : "Ошибка загрузки");
            } finally {
              setBusy(false);
              e.target.value = "";
            }
          }}
        />
      </label>
    </div>
  );
}

/** Double-click header to rename (updates the underlying string). */
function DblRename({
  value,
  onChange,
  hint = "Двойной клик — переименовать",
}: {
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  useEffect(() => {
    if (!editing) setDraft(value);
  }, [value, editing]);

  if (editing) {
    return (
      <Input
        autoFocus
        value={draft}
        className="h-7 text-xs font-semibold"
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => {
          onChange(draft.trim() || value);
          setEditing(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onChange(draft.trim() || value);
            setEditing(false);
          }
          if (e.key === "Escape") setEditing(false);
        }}
      />
    );
  }

  return (
    <p
      title={hint}
      onDoubleClick={() => {
        setDraft(value);
        setEditing(true);
      }}
      className="cursor-text rounded px-0.5 text-xs font-semibold hover:bg-muted"
    >
      {value || "Без названия"}
    </p>
  );
}

function patchItem(
  items: unknown[],
  i: number,
  patch: Record<string, unknown>,
  onPatch: (p: Record<string, unknown>) => void,
  key = "items"
) {
  const next = [...items] as Record<string, unknown>[];
  next[i] = { ...(next[i] as object), ...patch };
  onPatch({ [key]: next });
}

type AdminRouteRow = {
  id: string;
  legacy_id: string | null;
  slug: string;
  name: string;
  rating: number;
  cover_image_url: string | null;
  status?: string;
};

type AdminBlogRow = {
  id: string;
  slug: string;
  title: string;
  cover_image_url: string | null;
};

function DayItemLinkPicker({
  kind,
  refId,
  onPick,
}: {
  kind: string;
  refId: string;
  onPick: (patch: Record<string, unknown>) => void;
}) {
  const routesQ = useQuery({
    queryKey: ["admin-routes-picker"],
    queryFn: () => apiFetch<AdminRouteRow[]>("/api/admin/routes"),
  });
  const blogQ = useQuery({
    queryKey: ["admin-blog-picker"],
    queryFn: () => apiFetch<AdminBlogRow[]>("/api/admin/blog/posts"),
  });

  const mode = kind === "route" || kind === "blog" ? kind : "custom";

  return (
    <div className="space-y-2 rounded-md bg-muted/40 p-2">
      <Label className="text-xs text-muted-foreground">Привязка</Label>
      <Select
        value={mode}
        onValueChange={(v) => {
          if (v === "custom") {
            onPick({ kind: "custom", refId: "" });
          } else {
            onPick({ kind: v, refId: "" });
          }
        }}
      >
        <SelectTrigger className="h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="custom">Своя ссылка</SelectItem>
          <SelectItem value="route">Маршрут из CMS</SelectItem>
          <SelectItem value="blog">Статья блога</SelectItem>
        </SelectContent>
      </Select>

      {mode === "route" && (
        <Select
          value={refId || undefined}
          onValueChange={(id) => {
            const row = (routesQ.data || []).find((r) => r.id === id);
            if (!row) return;
            const pathId = row.legacy_id || row.slug || row.id;
            onPick({
              kind: "route",
              refId: row.id,
              name: row.name,
              href: `/routes/${pathId}`,
              rating: row.rating ?? 0,
              image: row.cover_image_url || "",
            });
          }}
        >
          <SelectTrigger className="h-8">
            <SelectValue placeholder={routesQ.isLoading ? "Загрузка…" : "Выберите маршрут"} />
          </SelectTrigger>
          <SelectContent>
            {(routesQ.data || []).map((r) => (
              <SelectItem key={r.id} value={r.id}>
                {r.name}
                {r.status === "published" ? "" : " (черновик)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {mode === "blog" && (
        <Select
          value={refId || undefined}
          onValueChange={(id) => {
            const row = (blogQ.data || []).find((r) => r.id === id);
            if (!row) return;
            onPick({
              kind: "blog",
              refId: row.id,
              name: row.title,
              href: `/blog/${row.slug}`,
              image: row.cover_image_url || "",
            });
          }}
        >
          <SelectTrigger className="h-8">
            <SelectValue placeholder={blogQ.isLoading ? "Загрузка…" : "Выберите статью"} />
          </SelectTrigger>
          <SelectContent>
            {(blogQ.data || []).map((r) => (
              <SelectItem key={r.id} value={r.id}>
                {r.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <p className="text-[10px] text-muted-foreground leading-snug">
        Выберите маршрут или статью — название, ссылка и фото подставятся сами. Либо режим «Своя
        ссылка» и укажите URL вручную.
      </p>
    </div>
  );
}

export function AdminPageSectionFields({
  sectionId,
  fields,
  onPatch,
}: {
  sectionId: string;
  fields: Record<string, unknown>;
  onPatch: (patch: Record<string, unknown>) => void;
}) {
  const str = (key: string) => String(fields[key] ?? "");

  if (sectionId === "hero") {
    return (
      <div className="space-y-3">
        <Field label="Заголовок" value={str("title")} onChange={(v) => onPatch({ title: v })} />
        <CmsColorField label="Цвет заголовка" value={str("titleColor")} onChange={(v) => onPatch({ titleColor: v })} />
        <MediaField label="Видео: поезд" value={str("videoTrain")} onChange={(v) => onPatch({ videoTrain: v })} accept="video/mp4,video/webm" />
        <MediaField label="Видео: самолёт" value={str("videoFlight")} onChange={(v) => onPatch({ videoFlight: v })} accept="video/mp4,video/webm" />
        <MediaField label="Видео: автобус" value={str("videoBus")} onChange={(v) => onPatch({ videoBus: v })} accept="video/mp4,video/webm" />
      </div>
    );
  }

  if (sectionId === "features") {
    const items = Array.isArray(fields.items) ? fields.items : [];
    return (
      <div className="space-y-3">
        <Field label="Заголовок" value={str("title")} onChange={(v) => onPatch({ title: v })} />
        <CmsColorField label="Цвет заголовка" value={str("titleColor")} onChange={(v) => onPatch({ titleColor: v })} />
        <Field label="Подзаголовок" value={str("subtitle")} onChange={(v) => onPatch({ subtitle: v })} multiline />
        <CmsColorField label="Цвет подзаголовка" value={str("subtitleColor")} onChange={(v) => onPatch({ subtitleColor: v })} />
        {items.map((raw, i) => {
          const it = raw as Record<string, string>;
          return (
            <div key={i} className="space-y-2 rounded-md border p-3">
              <p className="text-xs font-semibold text-muted-foreground">Карточка {i + 1}</p>
              <DblRename
                value={it.title || `Карточка ${i + 1}`}
                onChange={(v) => patchItem(items, i, { title: v }, onPatch)}
              />
              <Field label="Заголовок" value={it.title || ""} onChange={(v) => patchItem(items, i, { title: v }, onPatch)} />
              <CmsColorField label="Цвет заголовка" value={it.titleColor || ""} onChange={(v) => patchItem(items, i, { titleColor: v }, onPatch)} />
              <Field label="Описание" value={it.description || ""} onChange={(v) => patchItem(items, i, { description: v }, onPatch)} multiline />
              <CmsColorField label="Цвет описания" value={it.descriptionColor || ""} onChange={(v) => patchItem(items, i, { descriptionColor: v }, onPatch)} />
              <Field label="Полный текст (модалка)" value={it.fullDescription || ""} onChange={(v) => patchItem(items, i, { fullDescription: v }, onPatch)} multiline />
              <CmsColorField label="Цвет фона карточки" value={it.bgColor || ""} onChange={(v) => patchItem(items, i, { bgColor: v }, onPatch)} />
              <CmsColorField label="Цвет иконки" value={it.iconBgColor || ""} onChange={(v) => patchItem(items, i, { iconBgColor: v }, onPatch)} />
            </div>
          );
        })}
      </div>
    );
  }

  if (sectionId === "recommendedTrains") {
    const items = Array.isArray(fields.items) ? fields.items : [];
    return (
      <div className="space-y-3">
        <Field label="Заголовок" value={str("title")} onChange={(v) => onPatch({ title: v })} />
        <CmsColorField label="Цвет заголовка" value={str("titleColor")} onChange={(v) => onPatch({ titleColor: v })} />
        <Field label="Подзаголовок" value={str("subtitle")} onChange={(v) => onPatch({ subtitle: v })} multiline />
        <CmsColorField label="Цвет подзаголовка" value={str("subtitleColor")} onChange={(v) => onPatch({ subtitleColor: v })} />
        {items.map((raw, i) => {
          const it = raw as Record<string, string | number>;
          const pairLabel = `${String(it.from || "")} → ${String(it.to || "")}`;
          return (
            <div key={i} className="space-y-2 rounded-md border p-3">
              <DblRename
                value={pairLabel}
                onChange={(v) => {
                  const parts = v.split(/\s*→\s*|\s*->\s*/);
                  if (parts.length >= 2) {
                    patchItem(items, i, {
                      from: parts[0].trim(),
                      to: parts.slice(1).join("→").trim(),
                    }, onPatch);
                  } else {
                    patchItem(items, i, { from: v.trim() }, onPatch);
                  }
                }}
              />
              <Field label="Откуда" value={String(it.from || "")} onChange={(v) => patchItem(items, i, { from: v }, onPatch)} />
              <Field label="Куда" value={String(it.to || "")} onChange={(v) => patchItem(items, i, { to: v }, onPatch)} />
              <Field label="Описание" value={String(it.description || "")} onChange={(v) => patchItem(items, i, { description: v }, onPatch)} />
              <Field label="Тег" value={String(it.tag || "")} onChange={(v) => patchItem(items, i, { tag: v }, onPatch)} />
              <Field label="Скидка %" value={String(it.discount ?? "")} onChange={(v) => patchItem(items, i, { discount: Number(v) || 0 }, onPatch)} />
              <Field label="Старая цена" value={String(it.oldPrice || "")} onChange={(v) => patchItem(items, i, { oldPrice: v }, onPatch)} />
              <Field label="Новая цена" value={String(it.newPrice || "")} onChange={(v) => patchItem(items, i, { newPrice: v }, onPatch)} />
              <Field label="Ссылка (опц.)" value={String(it.href || "")} onChange={(v) => patchItem(items, i, { href: v }, onPatch)} />
              <MediaField label="Фото" value={String(it.image || "")} accept="image/*" onChange={(v) => patchItem(items, i, { image: v }, onPatch)} />
            </div>
          );
        })}
      </div>
    );
  }

  if (sectionId === "routesSection") {
    const routes = Array.isArray(fields.routes) ? fields.routes : [];
    return (
      <div className="space-y-3">
        <Field label="Заголовок" value={str("title")} onChange={(v) => onPatch({ title: v })} />
        <CmsColorField label="Цвет заголовка" value={str("titleColor")} onChange={(v) => onPatch({ titleColor: v })} />
        <Field label="Подзаголовок" value={str("subtitle")} onChange={(v) => onPatch({ subtitle: v })} multiline />
        <CmsColorField label="Цвет подзаголовка" value={str("subtitleColor")} onChange={(v) => onPatch({ subtitleColor: v })} />
        {routes.map((raw, i) => {
          const it = raw as Record<string, string | number | boolean>;
          const pairLabel = `${String(it.from || "")} → ${String(it.to || "")}`;
          return (
            <div key={i} className="space-y-2 rounded-md border p-3">
              <DblRename
                value={pairLabel}
                onChange={(v) => {
                  const parts = v.split(/\s*→\s*|\s*->\s*/);
                  if (parts.length >= 2) {
                    patchItem(
                      routes,
                      i,
                      { from: parts[0].trim(), to: parts.slice(1).join("→").trim() },
                      onPatch,
                      "routes"
                    );
                  } else {
                    patchItem(routes, i, { from: v.trim() }, onPatch, "routes");
                  }
                }}
              />
              <Field label="Откуда" value={String(it.from || "")} onChange={(v) => patchItem(routes, i, { from: v }, onPatch, "routes")} />
              <Field label="Куда" value={String(it.to || "")} onChange={(v) => patchItem(routes, i, { to: v }, onPatch, "routes")} />
              <Field label="В пути" value={String(it.duration || "")} onChange={(v) => patchItem(routes, i, { duration: v }, onPatch, "routes")} />
              <Field label="Цена от" value={String(it.minPrice ?? "")} onChange={(v) => patchItem(routes, i, { minPrice: Number(v) || 0 }, onPatch, "routes")} />
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={it.isPopular === true}
                  onCheckedChange={(c) => patchItem(routes, i, { isPopular: c === true }, onPatch, "routes")}
                  id={`pop-${i}`}
                />
                <Label htmlFor={`pop-${i}`} className="text-xs">
                  Популярный (обводка)
                </Label>
              </div>
              <CmsColorField label="Цвет обводки" value={String(it.borderColor || "")} onChange={(v) => patchItem(routes, i, { borderColor: v }, onPatch, "routes")} />
              <CmsColorField label="Цвет текста" value={String(it.textColor || "")} onChange={(v) => patchItem(routes, i, { textColor: v }, onPatch, "routes")} />
              <CmsColorField label="Цвет цены" value={String(it.priceColor || "")} onChange={(v) => patchItem(routes, i, { priceColor: v }, onPatch, "routes")} />
            </div>
          );
        })}
      </div>
    );
  }

  if (sectionId === "events") {
    const items = Array.isArray(fields.items) ? fields.items : [];
    return (
      <div className="space-y-3">
        <Field label="Заголовок" value={str("title")} onChange={(v) => onPatch({ title: v })} />
        <CmsColorField label="Цвет заголовка" value={str("titleColor")} onChange={(v) => onPatch({ titleColor: v })} />
        <Field label="Подзаголовок" value={str("subtitle")} onChange={(v) => onPatch({ subtitle: v })} multiline />
        <CmsColorField label="Цвет подзаголовка" value={str("subtitleColor")} onChange={(v) => onPatch({ subtitleColor: v })} />
        <Field label="Кнопка «Ещё»" value={str("moreLabel")} onChange={(v) => onPatch({ moreLabel: v })} />
        <Field label="Ссылка «Ещё»" value={str("moreHref")} onChange={(v) => onPatch({ moreHref: v })} />
        {items.map((raw, i) => {
          const it = raw as Record<string, string>;
          return (
            <div key={i} className="space-y-2 rounded-md border p-3">
              <p className="text-xs font-semibold">{it.city || `Событие ${i + 1}`}</p>
              <Field label="Город" value={it.city || ""} onChange={(v) => patchItem(items, i, { city: v }, onPatch)} />
              <Field label="Возраст" value={it.age || ""} onChange={(v) => patchItem(items, i, { age: v }, onPatch)} />
              <Field label="Цена" value={it.price || ""} onChange={(v) => patchItem(items, i, { price: v }, onPatch)} />
              <Field label="Артист / событие" value={it.artist || ""} onChange={(v) => patchItem(items, i, { artist: v }, onPatch)} />
              <Field label="Дата" value={it.date || ""} onChange={(v) => patchItem(items, i, { date: v }, onPatch)} />
              <Field label="Площадка" value={it.venue || ""} onChange={(v) => patchItem(items, i, { venue: v }, onPatch)} />
              <Field label="Ссылка (клик)" value={it.href || ""} onChange={(v) => patchItem(items, i, { href: v }, onPatch)} />
              <Field label="Градиент (tailwind, запасной)" value={it.color || ""} onChange={(v) => patchItem(items, i, { color: v }, onPatch)} />
              <CmsColorField label="Цвет заставки" value={it.bgColor || ""} onChange={(v) => patchItem(items, i, { bgColor: v }, onPatch)} />
              <MediaField label="Фото заставки" value={it.image || ""} accept="image/*" onChange={(v) => patchItem(items, i, { image: v }, onPatch)} />
              <CmsColorField label="Цвет текста" value={it.textColor || ""} onChange={(v) => patchItem(items, i, { textColor: v }, onPatch)} />
            </div>
          );
        })}
      </div>
    );
  }

  if (sectionId === "inspiration") {
    const items = Array.isArray(fields.items) ? fields.items : [];
    return (
      <div className="space-y-3">
        <Field label="Заголовок" value={str("title")} onChange={(v) => onPatch({ title: v })} />
        <CmsColorField label="Цвет заголовка" value={str("titleColor")} onChange={(v) => onPatch({ titleColor: v })} />
        <Field label="Подзаголовок" value={str("subtitle")} onChange={(v) => onPatch({ subtitle: v })} multiline />
        <CmsColorField label="Цвет подзаголовка" value={str("subtitleColor")} onChange={(v) => onPatch({ subtitleColor: v })} />
        {items.map((raw, i) => {
          const it = raw as Record<string, string>;
          return (
            <div key={i} className="space-y-2 rounded-md border p-3">
              <p className="text-xs font-semibold">{it.name || `Маршрут ${i + 1}`}</p>
              <Field label="Название" value={it.name || ""} onChange={(v) => patchItem(items, i, { name: v }, onPatch)} />
              <CmsColorField label="Цвет названия" value={it.titleColor || ""} onChange={(v) => patchItem(items, i, { titleColor: v }, onPatch)} />
              <Field label="Описание" value={it.description || ""} onChange={(v) => patchItem(items, i, { description: v }, onPatch)} multiline />
              <CmsColorField label="Цвет описания" value={it.descriptionColor || ""} onChange={(v) => patchItem(items, i, { descriptionColor: v }, onPatch)} />
              <Field label="Ссылка" value={it.href || ""} onChange={(v) => patchItem(items, i, { href: v }, onPatch)} />
              <MediaField label="Фото" value={it.image || ""} accept="image/*" onChange={(v) => patchItem(items, i, { image: v }, onPatch)} />
            </div>
          );
        })}
      </div>
    );
  }

  if (sectionId === "testimonials") {
    const items = Array.isArray(fields.items) ? fields.items : [];
    return (
      <div className="space-y-3">
        <Field label="Заголовок" value={str("title")} onChange={(v) => onPatch({ title: v })} />
        <CmsColorField label="Цвет заголовка" value={str("titleColor")} onChange={(v) => onPatch({ titleColor: v })} />
        <Field label="Подзаголовок" value={str("subtitle")} onChange={(v) => onPatch({ subtitle: v })} multiline />
        <CmsColorField label="Цвет подзаголовка" value={str("subtitleColor")} onChange={(v) => onPatch({ subtitleColor: v })} />
        {items.map((raw, i) => {
          const it = raw as Record<string, unknown>;
          const gallery = Array.isArray(it.gallery) ? (it.gallery as string[]) : [];
          return (
            <div key={i} className="space-y-2 rounded-md border p-3">
              <p className="text-xs font-semibold">{String(it.name || `Отзыв ${i + 1}`)}</p>
              <Field label="ID" value={String(it.id ?? "")} onChange={(v) => patchItem(items, i, { id: Number(v) || v }, onPatch)} />
              <Field label="Имя" value={String(it.name || "")} onChange={(v) => patchItem(items, i, { name: v }, onPatch)} />
              <Field label="Текст на карточке" value={String(it.text || "")} onChange={(v) => patchItem(items, i, { text: v }, onPatch)} multiline />
              <Field label="Маршрут" value={String(it.route || "")} onChange={(v) => patchItem(items, i, { route: v }, onPatch)} />
              <Field label="Дата" value={String(it.date || "")} onChange={(v) => patchItem(items, i, { date: v }, onPatch)} />
              <MediaField label="Аватар" value={String(it.avatar || "")} accept="image/*" onChange={(v) => patchItem(items, i, { avatar: v }, onPatch)} />
              <MediaField label="Фото карточки" value={String(it.photo || "")} accept="image/*" onChange={(v) => patchItem(items, i, { photo: v }, onPatch)} />
              <Field label="Текст внутри отзыва" value={String(it.body || "")} onChange={(v) => patchItem(items, i, { body: v }, onPatch)} multiline />
              <MediaField
                label="Доп. фото в отзыве (добавить)"
                value=""
                accept="image/*"
                onChange={(v) => patchItem(items, i, { gallery: [...gallery, v] }, onPatch)}
              />
              {gallery.length > 0 && (
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {gallery.map((g, gi) => (
                    <li key={gi} className="flex items-center gap-2">
                      <span className="truncate flex-1">{g}</span>
                      <button
                        type="button"
                        className="text-destructive"
                        onClick={() =>
                          patchItem(
                            items,
                            i,
                            { gallery: gallery.filter((_, x) => x !== gi) },
                            onPatch
                          )
                        }
                      >
                        удалить
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (sectionId === "blogInvite") {
    return (
      <div className="space-y-3">
        <Field label="Бейдж" value={str("badge")} onChange={(v) => onPatch({ badge: v })} />
        <Field label="Заголовок" value={str("title")} onChange={(v) => onPatch({ title: v })} />
        <CmsColorField label="Цвет заголовка" value={str("titleColor")} onChange={(v) => onPatch({ titleColor: v })} />
        <Field label="Абзац 1" value={str("paragraph1")} onChange={(v) => onPatch({ paragraph1: v })} multiline />
        <Field label="Абзац 2" value={str("paragraph2")} onChange={(v) => onPatch({ paragraph2: v })} multiline />
        <CmsColorField label="Цвет текста" value={str("textColor")} onChange={(v) => onPatch({ textColor: v })} />
        <Field label="Кнопка" value={str("ctaLabel")} onChange={(v) => onPatch({ ctaLabel: v })} />
        <Field label="Ссылка" value={str("ctaHref")} onChange={(v) => onPatch({ ctaHref: v })} />
      </div>
    );
  }

  if (sectionId === "support") {
    return (
      <div className="space-y-3">
        <Field label="Заголовок" value={str("title")} onChange={(v) => onPatch({ title: v })} />
        <CmsColorField label="Цвет заголовка" value={str("titleColor")} onChange={(v) => onPatch({ titleColor: v })} />
        <Field label="Подзаголовок" value={str("subtitle")} onChange={(v) => onPatch({ subtitle: v })} />
        <CmsColorField label="Цвет подзаголовка" value={str("subtitleColor")} onChange={(v) => onPatch({ subtitleColor: v })} />
        <Field label="Описание 1" value={str("description1")} onChange={(v) => onPatch({ description1: v })} multiline />
        <Field label="Описание 2" value={str("description2")} onChange={(v) => onPatch({ description2: v })} multiline />
        <CmsColorField label="Цвет описаний" value={str("textColor")} onChange={(v) => onPatch({ textColor: v })} />
        <Field label="Заголовок контактов" value={str("contactHeading")} onChange={(v) => onPatch({ contactHeading: v })} />
        <Field label="CTA чата" value={str("chatCta")} onChange={(v) => onPatch({ chatCta: v })} />
      </div>
    );
  }

  if (sectionId === "verified") {
    return (
      <div className="space-y-3">
        <Field label="Бейдж слева" value={str("badgeLeft")} onChange={(v) => onPatch({ badgeLeft: v })} />
        <Field label="Бейдж справа" value={str("badgeRight")} onChange={(v) => onPatch({ badgeRight: v })} />
        <Field label="Заголовок" value={str("title")} onChange={(v) => onPatch({ title: v })} />
        <CmsColorField label="Цвет заголовка" value={str("titleColor")} onChange={(v) => onPatch({ titleColor: v })} />
        <Field label="Описание" value={str("description")} onChange={(v) => onPatch({ description: v })} multiline />
        <CmsColorField label="Цвет описания" value={str("descriptionColor")} onChange={(v) => onPatch({ descriptionColor: v })} />
        <Field label="Кнопка" value={str("ctaLabel")} onChange={(v) => onPatch({ ctaLabel: v })} />
        <Field label="Ссылка" value={str("ctaHref")} onChange={(v) => onPatch({ ctaHref: v })} />
      </div>
    );
  }

  if (sectionId === "routesHero") {
    const advantages = Array.isArray(fields.advantages) ? fields.advantages : [];
    return (
      <div className="space-y-3">
        <Field label="Заголовок, строка 1" value={str("titleLine1")} onChange={(v) => onPatch({ titleLine1: v })} />
        <Field label="Заголовок, строка 2" value={str("titleLine2")} onChange={(v) => onPatch({ titleLine2: v })} />
        <CmsColorField label="Цвет заголовка" value={str("titleColor")} onChange={(v) => onPatch({ titleColor: v })} />
        <MediaField label="Видео или URL" value={str("videoUrl")} onChange={(v) => onPatch({ videoUrl: v })} accept="video/mp4,video/webm" />
        {advantages.map((adv, i) => {
          const a = adv as Record<string, string>;
          return (
            <div key={i} className="space-y-2 rounded-md border p-3">
              <p className="text-xs font-semibold">Плашка {i + 1}</p>
              <Field label="Число" value={a.number || ""} onChange={(v) => patchItem(advantages, i, { number: v }, onPatch, "advantages")} />
              <Field label="Заголовок" value={a.title || ""} onChange={(v) => patchItem(advantages, i, { title: v }, onPatch, "advantages")} />
              <Field label="Описание" value={a.description || ""} multiline onChange={(v) => patchItem(advantages, i, { description: v }, onPatch, "advantages")} />
              <CmsColorField label="Цвет текста" value={a.textColor || ""} onChange={(v) => patchItem(advantages, i, { textColor: v }, onPatch, "advantages")} />
            </div>
          );
        })}
      </div>
    );
  }

  if (sectionId === "heroRoutes") {
    const cards = Array.isArray(fields.cards) ? fields.cards : [];
    return (
      <div className="space-y-3">
        <Field label="Мобильный заголовок (акцент)" value={str("mobileTitleAccent")} onChange={(v) => onPatch({ mobileTitleAccent: v })} />
        <Field label="Мобильный заголовок (остальное)" value={str("mobileTitleRest")} onChange={(v) => onPatch({ mobileTitleRest: v })} />
        <CmsColorField label="Цвет акцента" value={str("accentColor")} onChange={(v) => onPatch({ accentColor: v })} />
        {cards.map((card, i) => {
          const c = card as Record<string, string>;
          return (
            <div key={c.id || i} className="space-y-2 rounded-md border p-3">
              <DblRename
                value={c.title || c.id || `Карточка ${i + 1}`}
                onChange={(v) => patchItem(cards, i, { title: v }, onPatch, "cards")}
              />
              <Field label="Название" value={c.title || ""} onChange={(v) => patchItem(cards, i, { title: v }, onPatch, "cards")} />
              <CmsColorField label="Цвет названия" value={c.titleColor || ""} onChange={(v) => patchItem(cards, i, { titleColor: v }, onPatch, "cards")} />
              <Field label="Описание" value={c.description || ""} multiline onChange={(v) => patchItem(cards, i, { description: v }, onPatch, "cards")} />
              <Field label="Ссылка" value={c.href || ""} onChange={(v) => patchItem(cards, i, { href: v }, onPatch, "cards")} />
              <MediaField label="Фото" value={c.image || ""} accept="image/*" onChange={(v) => patchItem(cards, i, { image: v }, onPatch, "cards")} />
              <MediaField label="Фото hover" value={c.hoverImage || ""} accept="image/*" onChange={(v) => patchItem(cards, i, { hoverImage: v }, onPatch, "cards")} />
            </div>
          );
        })}
      </div>
    );
  }

  if (sectionId === "regionsDay") {
    const items = Array.isArray(fields.items) ? fields.items : [];
    return (
      <div className="space-y-3">
        <Field label="Префикс" value={str("titlePrefix")} onChange={(v) => onPatch({ titlePrefix: v })} />
        <Field label="Акцент" value={str("titleAccent")} onChange={(v) => onPatch({ titleAccent: v })} />
        <CmsColorField label="Цвет акцента" value={str("accentColor")} onChange={(v) => onPatch({ accentColor: v })} />
        {items.map((item, i) => {
          const it = item as Record<string, string | number>;
          return (
            <div key={String(it.id || i)} className="space-y-2 rounded-md border p-3">
              <DblRename
                value={String(it.name || `Карточка ${i + 1}`)}
                onChange={(v) => patchItem(items, i, { name: v }, onPatch)}
              />
              <DayItemLinkPicker
                kind={String(it.kind || "custom")}
                refId={String(it.refId || "")}
                onPick={(patch) => patchItem(items, i, patch, onPatch)}
              />
              <Field label="Название" value={String(it.name || "")} onChange={(v) => patchItem(items, i, { name: v }, onPatch)} />
              <Field label="Рейтинг" value={String(it.rating ?? "")} onChange={(v) => patchItem(items, i, { rating: Number(v) || 0 }, onPatch)} />
              <Field
                label="Ссылка"
                value={String(it.href || "")}
                onChange={(v) => patchItem(items, i, { href: v, kind: "custom" }, onPatch)}
              />
              <MediaField label="Фото" value={String(it.image || "")} accept="image/*" onChange={(v) => patchItem(items, i, { image: v }, onPatch)} />
            </div>
          );
        })}
      </div>
    );
  }

  if (sectionId === "process") {
    return (
      <div className="space-y-3">
        <Field label="Заголовок" value={str("title")} onChange={(v) => onPatch({ title: v })} multiline />
        <CmsColorField label="Цвет заголовка" value={str("titleColor")} onChange={(v) => onPatch({ titleColor: v })} />
        <Field label="Абзац" value={str("paragraph")} onChange={(v) => onPatch({ paragraph: v })} multiline />
        <CmsColorField label="Цвет абзаца" value={str("paragraphColor")} onChange={(v) => onPatch({ paragraphColor: v })} />
        <Field label="Кнопка" value={str("ctaLabel")} onChange={(v) => onPatch({ ctaLabel: v })} />
        <Field label="Ссылка" value={str("ctaHref")} onChange={(v) => onPatch({ ctaHref: v })} />
        <MediaField label="Изображение" value={str("image")} onChange={(v) => onPatch({ image: v })} accept="image/*" />
        <Field label="Нижний текст" value={str("bottomText")} onChange={(v) => onPatch({ bottomText: v })} multiline />
        <CmsColorField label="Цвет нижнего текста" value={str("bottomColor")} onChange={(v) => onPatch({ bottomColor: v })} />
      </div>
    );
  }

  if (sectionId === "photographers") {
    const items = Array.isArray(fields.items) ? fields.items : [];
    return (
      <div className="space-y-3">
        <Field label="Eyebrow" value={str("eyebrow")} onChange={(v) => onPatch({ eyebrow: v })} />
        <CmsColorField label="Цвет eyebrow" value={str("eyebrowColor")} onChange={(v) => onPatch({ eyebrowColor: v })} />
        <Field label="Заголовок" value={str("title")} onChange={(v) => onPatch({ title: v })} />
        <CmsColorField label="Цвет заголовка" value={str("titleColor")} onChange={(v) => onPatch({ titleColor: v })} />
        <Field label="Подзаголовок" value={str("subtitle")} onChange={(v) => onPatch({ subtitle: v })} multiline />
        <CmsColorField label="Цвет подзаголовка" value={str("subtitleColor")} onChange={(v) => onPatch({ subtitleColor: v })} />
        {items.map((item, i) => {
          const it = item as Record<string, string>;
          return (
            <div key={i} className="space-y-2 rounded-md border p-3">
              <p className="text-xs font-semibold">Фотограф {i + 1}</p>
              <Field label="Имя" value={it.name || ""} onChange={(v) => patchItem(items, i, { name: v }, onPatch)} />
              <Field label="Хэндл" value={it.handle || ""} onChange={(v) => patchItem(items, i, { handle: v }, onPatch)} />
              <Field label="Ссылка" value={it.href || ""} onChange={(v) => patchItem(items, i, { href: v }, onPatch)} />
              <MediaField label="Аватар" value={it.avatar || ""} accept="image/*" onChange={(v) => patchItem(items, i, { avatar: v }, onPatch)} />
              <MediaField label="Фото" value={it.image || ""} accept="image/*" onChange={(v) => patchItem(items, i, { image: v }, onPatch)} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <p className="text-sm text-muted-foreground">
      Для этого блока пока доступны только показ/скрытие и порядок.
    </p>
  );
}
