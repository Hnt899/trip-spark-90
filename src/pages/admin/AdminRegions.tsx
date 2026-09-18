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
  AlertDialogAction,
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { data: regions = [] } = useQuery<Region[]>({
    queryKey: ["admin-regions"],
    queryFn: () => apiFetch<Region[]>("/api/admin/regions"),
  });

  const createMutation = useMutation({
    mutationFn: (data: { name: string; slug?: string }) =>
      apiFetch<Region>("/api/admin/regions", {
        method: "POST",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-regions"] });
      setDialogOpen(false);
      setFormData({ name: "", slug: "" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Region> }) =>
      apiFetch<Region>(`/api/admin/regions/${id}`, {
        method: "PATCH",
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-regions"] });
      setDialogOpen(false);
      setEditingRegion(null);
      setFormData({ name: "", slug: "" });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: (items: { id: string }[]) =>
      apiFetch<{ ok: boolean }>("/api/admin/regions/reorder", {
        method: "PUT",
        body: { items },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-regions"] });
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
      if (e?.response?.status === 409) {
        const data = e.response.data;
        setDeleteError({
          routeCount: data.routeCount || 0,
          routes: [],
        });
      }
    },
  });

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = regions.findIndex((r) => r.id === active.id);
      const newIndex = regions.findIndex((r) => r.id === over.id);
      const newOrder = arrayMove(regions, oldIndex, newIndex).map((r, i) => ({
        id: r.id,
      }));
      reorderMutation.mutate(newOrder);
    }
  }

  function openCreate() {
    setEditingRegion(null);
    setFormData({ name: "", slug: "" });
    setDialogOpen(true);
  }

  function openEdit(region: Region) {
    setEditingRegion(region);
    setFormData({ name: region.name, slug: region.slug });
    setDialogOpen(true);
  }

  function submitForm() {
    if (!formData.name.trim()) return;
    if (editingRegion) {
      updateMutation.mutate({
        id: editingRegion.id,
        data: { name: formData.name, slug: formData.slug },
      });
    } else {
      createMutation.mutate({ name: formData.name, slug: formData.slug });
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
            <Button onClick={openCreate}>
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
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Например: Центр"
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
                  Только латиница, цифры и дефисы
                </p>
              </div>
              <Button onClick={submitForm} className="w-full">
                {editingRegion ? "Сохранить" : "Создать"}
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
                    В регионе &laquo;{deleteRegion?.name}&raquo; есть{" "}
                    {deleteError.routeCount} маршрут(ов). Нельзя удалить регион,
                    пока в нём есть маршруты.
                  </p>
                  <p className="text-sm">
                    Сначала перенесите маршруты в другой регион через страницу
                    редактирования маршрута.
                  </p>
                  {deleteError.routes.length > 0 && (
                    <div className="max-h-40 overflow-auto">
                      <ul className="list-inside list-disc text-sm">
                        {deleteError.routes.map((r) => (
                          <li key={r.id}>
                            <a
                              href={`/admin/routes/${r.legacy_id || r.id}`}
                              className="text-primary hover:underline"
                            >
                              {r.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                `Вы уверены, что хотите удалить регион «${deleteRegion?.name}»? Это действие нельзя отменить.`
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            {!deleteError && (
              <AlertDialogAction
                onClick={() => deleteMutation.mutate(deleteRegion!.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Удалить
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
