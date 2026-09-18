import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Globe } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SeoItem {
  id: string;
  page_key: string;
  title: string;
  description: string;
  updated_at?: string;
}

const PAGE_LABELS: Record<string, string> = {
  home: "Главная (home)",
  routes: "Маршруты (routes)",
  "routes-list": "Список маршрутов (routes-list)",
  blog: "Блог (blog)",
  reference: "Справочная информация (reference)",
  guide: "Путеводитель (guide)",
};

export default function AdminSEO() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SeoItem | null>(null);
  const [formData, setFormData] = useState({ title: "", description: "" });

  const { data: seoItems = [] } = useQuery<SeoItem[]>({
    queryKey: ["admin-seo"],
    queryFn: () => apiFetch<SeoItem[]>("/api/admin/seo"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ pageKey, data }: { pageKey: string; data: Partial<SeoItem> }) =>
      apiFetch<SeoItem>(`/api/admin/seo/${pageKey}`, {
        method: "PUT",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-seo"] });
      setDialogOpen(false);
      setEditingItem(null);
      setFormData({ title: "", description: "" });
    },
  });

  function openEdit(item: SeoItem) {
    setEditingItem(item);
    setFormData({ title: item.title, description: item.description });
    setDialogOpen(true);
  }

  function submitForm() {
    if (!editingItem) return;
    updateMutation.mutate({
      pageKey: editingItem.page_key,
      data: { title: formData.title, description: formData.description },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          SEO страниц
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {seoItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 rounded-lg border bg-card p-4"
            >
              <div className="flex-1 space-y-2">
                <div className="font-medium">{PAGE_LABELS[item.page_key] || item.page_key}</div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Title:</span> {item.title || "—"}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Description:</span>{" "}
                  {item.description ? item.description.slice(0, 100) + (item.description.length > 100 ? "..." : "") : "—"}
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Редактировать SEO: {editingItem && PAGE_LABELS[editingItem.page_key]}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Title (до 200 символов)</label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, title: e.target.value.slice(0, 200) }))
                  }
                  placeholder="Заголовок страницы"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description (до 500 символов)</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, description: e.target.value.slice(0, 500) }))
                  }
                  placeholder="Описание страницы для поисковиков"
                  rows={4}
                />
              </div>
              <Button onClick={submitForm} className="w-full" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Сохранение..." : "Сохранить"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
