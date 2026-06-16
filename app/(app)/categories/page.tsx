"use client";

import { useState } from "react";
import { ContentContainer } from "@/components/layout/content-container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { CategoryForm } from "@/components/products/category-form";
import { useCategoryStore } from "@/stores/category-store";
import { useProductStore } from "@/stores/product-store";
import { useToast } from "@/components/ui/toast";
import { Plus, Tag, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import type { Category } from "@/types/category";


export const dynamic = "force-dynamic";
export default function CategoriesPage() {
  const categories = useCategoryStore((s) => s.categories);
  const products = useProductStore((s) => s.products);
  const toggleActive = useCategoryStore((s) => s.toggleActive);
  const deleteCategory = useCategoryStore((s) => s.deleteCategory);
  const { toast } = useToast();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [deleting, setDeleting] = useState<Category | null>(null);

  const handleAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleEdit = (c: Category) => {
    setEditing(c);
    setFormOpen(true);
  };

  const handleDelete = () => {
    if (!deleting) return;
    const hasProducts = products.some((p) => p.category === deleting.name);
    if (hasProducts) {
      toast({
        type: "error",
        title: "Tidak dapat menghapus",
        description: `Kategori "${deleting.name}" masih digunakan produk.`,
      });
      setDeleting(null);
      return;
    }
    deleteCategory(deleting.id);
    toast({ type: "success", title: "Kategori dihapus", description: deleting.name });
    setDeleting(null);
  };

  const handleToggle = (c: Category) => {
    toggleActive(c.id);
    toast({
      type: "info",
      title: c.isActive ? "Kategori dinonaktifkan" : "Kategori diaktifkan",
      description: c.name,
    });
  };

  const productCount = (categoryName: string) =>
    products.filter((p) => p.category === categoryName).length;

  return (
    <ContentContainer>
      <PageHeader
        title="Kategori"
        description={`${categories.length} kategori terdaftar`}
        actions={
          <Button onClick={handleAdd} size="sm">
            <Plus className="h-4 w-4" />
            Tambah Kategori
          </Button>
        }
      />

      {categories.length === 0 ? (
        <EmptyState
          title="Belum ada kategori"
          description="Tambah kategori untuk mengelompokkan menu"
          icon={Tag}
          action={
            <Button onClick={handleAdd} variant="outline" size="sm">
              <Plus className="h-4 w-4" />
              Tambah Kategori
            </Button>
          }
          className="mt-6 rounded-xl border border-dashed border-border py-12"
        />
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Card key={c.id} className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base font-semibold text-white"
                  style={{ backgroundColor: c.color ?? "#5B3924" }}
                >
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{c.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {productCount(c.name)} produk
                      </p>
                    </div>
                    {!c.isActive && <Badge variant="secondary">Non-aktif</Badge>}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 flex-1 text-xs"
                  onClick={() => handleToggle(c)}
                >
                  {c.isActive ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  {c.isActive ? "Nonaktifkan" : "Aktifkan"}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleEdit(c)}
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-destructive hover:text-destructive"
                  onClick={() => setDeleting(c)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CategoryForm open={formOpen} onOpenChange={setFormOpen} category={editing} />
      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(v) => !v && setDeleting(null)}
        title="Hapus kategori?"
        description={`Kategori "${deleting?.name}" akan dihapus dari daftar.`}
        onConfirm={handleDelete}
      />
    </ContentContainer>
  );
}