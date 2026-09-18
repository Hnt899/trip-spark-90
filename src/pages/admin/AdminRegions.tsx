import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Map, Pencil, Trash2, Plus, GripVertical } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Region {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

interface RouteInRegion {
  id: string;
  legacy_id?: string;
  slug?: string;
  name: string;
}

function SortableRegionRow({
  region,
  onEdit,
  onDelete,
}: {
  region: Region;
  onEdit: (r: Region) => void;
  onDelete: (r: Region) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: region.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 rounded-lg border bg-card p-3"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-muted-foreground hover:text-foreground"
      >
        <GripVertical className="h-5 w-5" />
      </button>
      <div className="flex-1">
        <div className="font-medium">{region.name}</div>
        <div className="text-sm text-muted-foreground">/{region.slug}</div>
      </div>
      <Button variant="ghost" size="icon" onClick={() => onEdit(region)}>
        <Pencil className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => onDelete(region)}>
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
    </div>
  );
}

export default function AdminRegions() {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRegion, setEditingRegion] = useState<Region | null>(null);
  const [deleteRegion, setDeleteRegion] = useState<Region | null>(null);
  const [deleteError, setDeleteError] = useState<{
    routeCount: number;
    routes: RouteInRegion[];
  } | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "" });
  const [formError, setFormError] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function slugify(str: string): string {
    const map: Record<string, string> = {
      а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e", ж: "zh",
      з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
      п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "c",
      ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu",
      я: "ya",
    };
    return String(str || "")
      .toLowerCase()
      .split("")
      .map((c) => (map[c] !== undefined ? map[c] : c))
      .join("")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-")
      .slice(0, 64);
  }

  const { data: regions = [] } = useQuery<Region[]>({
    queryKey: ["admin-regions"],
    queryFn: () => apiFetch<Region[]>("/api/admin/regions"),
  });

  const createMutation = useMutation({
    mutationFn: (data: { name: string; slug?: string }) =>
      apiFetch<Region>("/api/admin/regions", {
        method: "POST",
        body: JSON.stringify(data), // ← фикс: JSON.stringify
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-regions"] });
      queryClient.invalidateQueries({ queryKey: ["regions"] });
      setDialogOpen(false);
      setFormData({ name: "", slug: "" });
      setFormError("");
    },
    onError: (e: any) => {
      setFormError(e?.message || "Не удалось создать регион");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Region> }) =>
      apiFetch<Region>(`/api/admin/regions/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data), // ← фикс
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-regions"] });
      queryClient.invalidateQueries({ queryKey: ["regions"] });
      setDialogOpen(false);
      setEditingRegion(null);
      setFormData({ name: "", slug: "" });
      setFormError("");
    },
    onError: (e: any) => {
      setFormError(e?.message || "Не удалось сохранить регион");
    },
  });

  const reorderMutation = useMutation({
    mutationFn: (items: { id: string }[]) =>
      apiFetch<{ ok: boolean }>("/api/admin/regions/reorder", {
        method: "PUT",
        body: JSON.stringify({ items }), // ← фикс
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-regions"] });
      queryClient.invalidateQueries({ queryKey: ["regions"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiFetch<{ ok: boolean }>(`/api/admin/regions/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-regions"] });
      setDeleteRegion(null);
      setDeleteError(null);
    },
    onError: (e: any) => {
      // apiFetch бросает Error с полем status и, возможно, data
      if (e?.status === 409) {
        const count = e?.routeCount || e?.data?.routeCount || 0;
        setDeleteError({ routeCount: count, routes: [] });
      }
    },
  });

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = regions.findIndex((r) => r.id === active.id);
    const newIndex = regions.findIndex((r) => r.id === over.id);
    const newOrder = arrayMove(regions, oldIndex, newIndex).map((r) => ({
      id: r.id,
    }));
    reorderMutation.mutate(newOrder);
  }

  function openCreate() {
    setEditingRegion(null);
    setFormData({ name: "", slug: "" });
    setFormError("");
    setDialogOpen(true);
  }

  function openEdit(region: Region) {
    setEditingRegion(region);
    setFormData({ name: region.name, slug: region.slug });
    setFormError("");
    setDialogOpen(true);
  }

  function handleNameChange(value: string) {
    setFormData((f) => ({
      ...f,
      name: value,
      slug: f.slug || slugify(value),
    }));
  }

  function submitForm() {
    const name = formData.name.trim();
    if (!name) {
      setFormError("Введите название");
      return;
    }
    const slug = formData.slug.trim().toLowerCase() || slugify(name);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      setFormError("Slug: только латиница, цифры и дефисы");
      return;
    }
    setFormError("");
    if (editingRegion) {
      updateMutation.mutate({
        id: editingRegion.id,
        data: { name, slug },
      });
    } else {
      createMutation.mutate({ name, slug });
    }
  }

  function confirmDelete(region: Region) {
    setDeleteRegion(region);
    setDeleteError(null);
    deleteMutation.mutate(region.id);
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Map className="h-5 w-5" />
          Регионы
        </CardTitle>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Добавить регион
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingRegion ? "Редактировать регион" : "Новый регион"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium">Название</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Например: Центр"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-sm font-medium">Slug (URL)</label>
                <Input
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, slug: e.target.value }))
                  }
                  placeholder="Например: centr"
                />
                <p className="text-xs text-muted-foreground">
                  Только латиница, цифры и дефисы (автогенерация из названия)
                </p>
              </div>
              {formError ? (
                <p className="text-sm text-destructive">{formError}</p>
              ) : null}
              <Button
                type="button"
                onClick={submitForm}
                className="w-full"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "..."
                  : editingRegion
                    ? "Сохранить"
                    : "Создать"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={regions.map((r) => r.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {regions.map((region) => (
                <SortableRegionRow
                  key={region.id}
                  region={region}
                  onEdit={openEdit}
                  onDelete={confirmDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </CardContent>

      <AlertDialog
        open={!!deleteRegion}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteRegion(null);
            setDeleteError(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить регион?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteError ? (
                <div className="space-y-3">
                  <p className="font-medium text-destructive">
                    В регионе «{deleteRegion?.name}» есть {deleteError.routeCount}{" "}
                    маршрут(ов). Нельзя удалить регион, пока в нём есть маршруты.
                  </p>
                  <p className="text-sm">
                    Сначала перенесите маршруты в другой регион через страницу
                    редактирования маршрута.
                  </p>
                </div>
              ) : (
                `Вы уверены, что хотите удалить регион «${deleteRegion?.name}»? Это действие нельзя отменить.`
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}