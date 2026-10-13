import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, Upload } from "lucide-react";
import { footerDefaults, mergeFooter } from "@/content/footer.defaults";
import type { FooterFields, SocialLink, FooterDocumentLink } from "@/types/footerContent";
import { uploadImages } from "@/lib/uploadImages";

export default function AdminFooter() {
  const qc = useQueryClient();
  const [draft, setDraft] = useState<FooterFields>(footerDefaults);
  const q = useQuery({
    queryKey: ["site-settings", "footer", "admin"],
    queryFn: async () => { try { return await apiFetch<Partial<FooterFields>>("/api/settings/footer"); } catch { return {}; } },
  });
  useEffect(() => { if (q.data) setDraft(mergeFooter(footerDefaults, q.data)); }, [q.data]);

  const saveMut = useMutation({
    mutationFn: (data: FooterFields) => apiFetch<FooterFields>("/api/admin/settings/footer", { method: "PUT", body: JSON.stringify(data) }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["site-settings", "footer"] }); alert("Сохранено"); },
    onError: (e: Error) => alert("Ошибка: " + e.message),
  });

  const setSocialUrl = (kind: SocialLink["kind"], url: string) => setDraft((d) => ({ ...d, socials: d.socials.map((s) => (s.kind === kind ? { ...s, url } : s)) }));
  const setDocument = (index: number, patch: Partial<FooterDocumentLink>) => setDraft((d) => ({ ...d, documents: d.documents.map((doc, i) => i === index ? { ...doc, ...patch } : doc) }));
  const handleUploadPdf = async (index: number, file: File) => {
    try { const urls = await uploadImages([file]); if (urls[0]) setDocument(index, { fileUrl: urls[0] }); }
    catch (e) { alert(e instanceof Error ? e.message : "Ошибка загрузки"); }
  };

  if (q.isLoading) return (<div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Подвал сайта</h1>
        <Button variant="outline" asChild><Link to="/admin/dashboard">← В админку</Link></Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Основное</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2"><Label>Email поддержки</Label>
            <Input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} placeholder="info@ts-trip.ru" /></div>
          <div className="grid gap-2"><Label>Копирайт</Label>
            <Input value={draft.copyright} onChange={(e) => setDraft({ ...draft, copyright: e.target.value })} /></div>
          <div className="grid gap-2"><Label>Свободный блок (данные ИП и т.п.)</Label>
            <Textarea value={draft.freeText} onChange={(e) => setDraft({ ...draft, freeText: e.target.value })} rows={4} /></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Соцсети</CardTitle><CardDescription>Оставьте URL пустым, чтобы скрыть иконку.</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          {draft.socials.map((s) => (
            <div key={s.kind} className="grid gap-2 sm:grid-cols-[120px_1fr] sm:items-center">
              <Label>{s.kind}</Label>
              <Input value={s.url} onChange={(e) => setSocialUrl(s.kind, e.target.value)} placeholder="https://..." />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Юридические документы</CardTitle><CardDescription>Загрузите PDF или оставьте URL пустым, чтобы скрыть кнопку.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {draft.documents.map((d, i) => (
            <div key={i} className="rounded-md border p-3 space-y-2">
              <div className="grid gap-2"><Label>Название кнопки</Label>
                <Input value={d.label} onChange={(e) => setDocument(i, { label: e.target.value })} /></div>
              <div className="grid gap-2"><Label>URL файла (PDF)</Label>
                <Input value={d.fileUrl} onChange={(e) => setDocument(i, { fileUrl: e.target.value })} placeholder="/uploads/..." /></div>
              <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-primary">
                <Upload className="h-3.5 w-3.5" />Загрузить PDF
                <input type="file" accept="application/pdf" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUploadPdf(i, f); e.target.value = ""; }} />
              </label>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={() => saveMut.mutate(draft)} disabled={saveMut.isPending}>
          {saveMut.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Сохранить
        </Button>
      </div>
    </div>
  );
}
