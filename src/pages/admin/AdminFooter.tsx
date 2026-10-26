import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Save, Upload, Plus, Trash2, Pencil } from "lucide-react";
import { footerDefaults, mergeFooter } from "@/content/footer.defaults";
import type {
  FooterFields,
  SocialLink,
  FooterDocumentLink,
  ImportantLink,
} from "@/types/footerContent";
import { uploadImages } from "@/lib/uploadImages";

function newId(): string {
  return "s_" + Math.random().toString(36).slice(2, 10);
}

type StaticPageRow = {
  id: string;
  slug: string;
  title: string;
  status: string;
  updated_at: string;
};

export default function AdminFooter() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<FooterFields>(footerDefaults);

  const q = useQuery({
    queryKey: ["site-settings", "footer", "admin"],
    queryFn: async () => {
      try {
        return await apiFetch<Partial<FooterFields>>("/api/settings/footer");
      } catch {
        return {};
      }
    },
  });

  const pagesQ = useQuery({
    queryKey: ["admin-pages-list"],
    queryFn: () => apiFetch<StaticPageRow[]>("/api/admin/pages-list"),
    staleTime: 60_000,
  });

  useEffect(() => {
    if (q.data) setDraft(mergeFooter(footerDefaults, q.data));
  }, [q.data]);

  const saveMut = useMutation({
    mutationFn: (data: FooterFields) =>
      apiFetch<FooterFields>("/api/admin/settings/footer", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["site-settings", "footer"] });
      alert("Сохранено");
    },
    onError: (e: Error) => alert("Ошибка: " + e.message),
  });

  const updateSocial = (id: string, patch: Partial<SocialLink>) =>
    setDraft((d) => ({
      ...d,
      socials: d.socials.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));

  const addSocial = () =>
    setDraft((d) => ({
      ...d,
      socials: [
        ...d.socials,
        {
          id: newId(),
          label: "Новая соцсеть",
          url: "",
          bgColor: "bg-primary",
        },
      ],
    }));

  const removeSocial = (id: string) =>
    setDraft((d) => ({
      ...d,
      socials: d.socials.filter((s) => s.id !== id),
    }));

  const setDocument = (index: number, patch: Partial<FooterDocumentLink>) =>
    setDraft((d) => ({
      ...d,
      documents: d.documents.map((doc, i) =>
        i === index ? { ...doc, ...patch } : doc
      ),
    }));

  const setImportant = (index: number, patch: Partial<ImportantLink>) =>
    setDraft((d) => ({
      ...d,
      importantLinks: d.importantLinks.map((l, i) =>
        i === index ? { ...l, ...patch } : l
      ),
    }));

  const addImportant = () =>
    setDraft((d) => ({
      ...d,
      importantLinks: [...d.importantLinks, { label: "Новая ссылка", url: "" }],
    }));

  const removeImportant = (index: number) =>
    setDraft((d) => ({
      ...d,
      importantLinks: d.importantLinks.filter((_, i) => i !== index),
    }));

  const handleUploadImage = async (
    file: File,
    setUrl: (url: string) => void
  ) => {
    try {
      const urls = await uploadImages([file]);
      if (urls[0]) setUrl(urls[0]);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Ошибка загрузки");
    }
  };

  if (q.isLoading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const pages = pagesQ.data || [];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Подвал сайта</h1>
        <Button variant="outline" asChild>
          <Link to="/admin/dashboard">← В админку</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Основное</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label>Email поддержки</Label>
            <Input
              type="email"
              value={draft.email}
              onChange={(e) => setDraft({ ...draft, email: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label>Копирайт</Label>
            <Input
              value={draft.copyright}
              onChange={(e) =>
                setDraft({ ...draft, copyright: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Свободный блок (данные ИП и т.п.)</Label>
            <Textarea
              value={draft.freeText}
              onChange={(e) =>
                setDraft({ ...draft, freeText: e.target.value })
              }
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Соцсети</CardTitle>
            <CardDescription>
              Название, ссылка, иконки. Можно добавлять любые соцсети.
            </CardDescription>
          </div>
          <Button type="button" size="sm" onClick={addSocial}>
            <Plus className="mr-1 h-4 w-4" />
            Добавить соцсеть
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {draft.socials.map((s) => (
            <div key={s.id} className="rounded-md border p-3 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{s.label || "Без названия"}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSocial(s.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-1">
                  <Label className="text-xs">Название</Label>
                  <Input
                    value={s.label}
                    onChange={(e) =>
                      updateSocial(s.id, { label: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-1">
                  <Label className="text-xs">URL профиля</Label>
                  <Input
                    value={s.url}
                    onChange={(e) =>
                      updateSocial(s.id, { url: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-xs">Маленькая иконка (подвал)</Label>
                  <Input
                    value={s.iconSmall || ""}
                    onChange={(e) =>
                      updateSocial(s.id, { iconSmall: e.target.value })
                    }
                  />
                  <label className="inline-flex cursor-pointer items-center gap-1 text-xs text-primary">
                    <Upload className="h-3 w-3" />
                    Загрузить
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f)
                          handleUploadImage(f, (u) =>
                            updateSocial(s.id, { iconSmall: u })
                          );
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Большая иконка (блог)</Label>
                  <Input
                    value={s.iconLarge || ""}
                    onChange={(e) =>
                      updateSocial(s.id, { iconLarge: e.target.value })
                    }
                  />
                  <label className="inline-flex cursor-pointer items-center gap-1 text-xs text-primary">
                    <Upload className="h-3 w-3" />
                    Загрузить
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f)
                          handleUploadImage(f, (u) =>
                            updateSocial(s.id, { iconLarge: u })
                          );
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className="grid gap-1">
                <Label className="text-xs">Цвет фона (fallback)</Label>
                <Input
                  value={s.bgColor || ""}
                  onChange={(e) =>
                    updateSocial(s.id, { bgColor: e.target.value })
                  }
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Важные вопросы</CardTitle>
            <CardDescription>
              Выберите страницу — она откроется у пользователя при клике.
            </CardDescription>
          </div>
          <Button type="button" size="sm" onClick={addImportant}>
            <Plus className="mr-1 h-4 w-4" />
            Добавить ссылку
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {draft.importantLinks.map((l, i) => {
            const slug = l.url.startsWith("/p/")
              ? l.url.replace("/p/", "")
              : null;
            return (
              <div key={i} className="rounded-md border p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Ссылка {i + 1}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeImportant(i)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs">Текст</Label>
                  <Input
                    value={l.label}
                    onChange={(e) => setImportant(i, { label: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-xs">Страница</Label>
                  <div className="flex gap-2">
                    <Select
                      value={l.url}
                      onValueChange={(v) => setImportant(i, { url: v })}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Выберите страницу" />
                      </SelectTrigger>
                      <SelectContent>
                        {pages.map((p) => (
                          <SelectItem key={p.slug} value={`/p/${p.slug}`}>
                            {p.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {slug && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate(`/admin/static-pages/${slug}`)}
                        title="Открыть редактор"
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Просмотреть
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Юридические документы</CardTitle>
          <CardDescription>
            Выберите страницу — она откроется у пользователя при клике.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {draft.documents.map((d, i) => {
            const slug = d.fileUrl.startsWith("/p/")
              ? d.fileUrl.replace("/p/", "")
              : null;
            return (
              <div key={i} className="rounded-md border p-3 space-y-2">
                <div className="grid gap-2">
                  <Label>Название кнопки</Label>
                  <Input
                    value={d.label}
                    onChange={(e) => setDocument(i, { label: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Страница</Label>
                  <div className="flex gap-2">
                    <Select
                      value={d.fileUrl}
                      onValueChange={(v) => setDocument(i, { fileUrl: v })}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Выберите страницу" />
                      </SelectTrigger>
                      <SelectContent>
                        {pages.map((p) => (
                          <SelectItem key={p.slug} value={`/p/${p.slug}`}>
                            {p.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {slug && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate(`/admin/static-pages/${slug}`)}
                        title="Открыть редактор"
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Просмотреть
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={() => saveMut.mutate(draft)}
          disabled={saveMut.isPending}
        >
          {saveMut.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Сохранить
        </Button>
      </div>
    </div>
  );
}
